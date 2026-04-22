const axios = require('axios');
const http = require('http');
const https = require('https');
const { provinceMetadataByCode } = require('../../config/provinceMetadata');
const { isWorkersRuntime } = require('../../config/runtimeConfig');

// 地图数据读取要同时兼顾三件事：
// 1. 优先走私有 Apps Script 拿到最新数据；
// 2. 私有源慢或失败时可回退到公开源；
// 3. 不把上游接口因为前端并发访问而打爆。
// 地图数据缓存放在 service 层，避免每次请求都直打 Apps Script。
let cachedData = null;
let lastFetchTime = 0;
let inFlightRequest = null;
let lastForceRefreshTime = 0;
const cacheDurationMs = 300000;
// 即使用户手动点刷新，也给上游 Apps Script 一个冷却时间，避免被连续击穿。
const forceRefreshCooldownMs = 30000;
const defaultUpstreamRequestTimeoutMs = 25000;
const provinceAliasToLegacyName = buildProvinceAliasToLegacyNameMap();
let ProxyAgentConstructor = null;
let cachedProxyAgent = null;
let cachedIpv4HttpAgent = null;
let cachedIpv4HttpsAgent = null;

function normalizeProvinceAlias(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '')
    .replace(/[（(][^）)]*[）)]/g, '')
    .replace(
      /(维吾尔自治区|維吾爾自治區|壮族自治区|壯族自治區|回族自治区|回族自治區|特别行政区|特別行政區|自治区|自治區|省|市|province|municipality|autonomousregion|specialadministrativeregion)$/giu,
      ''
    )
    .toLowerCase();
}

function addProvinceAlias(aliasMap, alias, legacyName) {
  const normalizedAlias = String(alias || '').trim();

  if (!normalizedAlias) {
    return;
  }

  aliasMap.set(normalizedAlias, legacyName);

  const compactAlias = normalizeProvinceAlias(normalizedAlias);
  if (compactAlias) {
    aliasMap.set(compactAlias, legacyName);
  }
}

function buildProvinceAliasToLegacyNameMap() {
  const aliasMap = new Map();

  // 历史数据、GeoJSON 和翻译文案里省份写法不完全一致，这里统一收口做兼容映射。
  Object.entries(provinceMetadataByCode).forEach(([code, metadata]) => {
    const aliases = new Set([
      code,
      metadata.legacyName,
      ...Object.values(metadata.shortLabels || {}),
      ...Object.values(metadata.fullLabels || {})
    ]);

    if (code === '710000') {
      aliases.add('臺灣（ROC）');
      aliases.add('台湾');
    }

    aliases.forEach((alias) => {
      addProvinceAlias(aliasMap, alias, metadata.legacyName);
    });
  });

  return aliasMap;
}

function normalizeProvinceNameToLegacy(provinceName) {
  const normalizedProvinceName = String(provinceName || '').trim();

  if (!normalizedProvinceName) {
    return '';
  }

  return provinceAliasToLegacyName.get(normalizedProvinceName)
    || provinceAliasToLegacyName.get(normalizeProvinceAlias(normalizedProvinceName))
    || normalizedProvinceName;
}

function normalizeProvinceStatistics(items) {
  const mergedStatistics = new Map();

  (Array.isArray(items) ? items : []).forEach((item) => {
    const province = normalizeProvinceNameToLegacy(item && item.province);
    const count = Number(item && item.count);

    if (!province) {
      return;
    }

    if (!mergedStatistics.has(province)) {
      mergedStatistics.set(province, {
        ...item,
        province,
        count: Number.isFinite(count) ? count : 0
      });
      return;
    }

    const existingItem = mergedStatistics.get(province);
    existingItem.count += Number.isFinite(count) ? count : 0;
  });

  return [...mergedStatistics.values()];
}

function resolveNumericValue(...candidates) {
  for (const value of candidates) {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
      return numericValue;
    }
  }

  return null;
}

// 远端没有提供 last_synced 时，用当前抓取时间兜底，保证前端总能显示相对时间。
function resolveLastSyncedTimestamp(lastSynced, fallbackTimestamp) {
  const numericLastSynced = Number(lastSynced);
  return Number.isFinite(numericLastSynced) && numericLastSynced > 0 ? numericLastSynced : fallbackTimestamp;
}

function normalizeMapDataSourceUrl(dataSourceUrl) {
  const normalizedUrl = String(dataSourceUrl || '').trim();
  return normalizedUrl && normalizedUrl !== '/api/map-data' ? normalizedUrl : '';
}

function resolveMapDataSources({ googleScriptUrl, publicMapDataUrl }) {
  const preferredSourceUrl = normalizeMapDataSourceUrl(googleScriptUrl);
  const fallbackSourceUrl = normalizeMapDataSourceUrl(publicMapDataUrl);

  if (!preferredSourceUrl && !fallbackSourceUrl) {
    throw new Error('未配置有效的地圖數據源');
  }

  return {
    preferredSourceUrl,
    fallbackSourceUrl
  };
}

function hasProxyConfiguration() {
  return [
    process.env.HTTPS_PROXY,
    process.env.https_proxy,
    process.env.HTTP_PROXY,
    process.env.http_proxy,
    process.env.ALL_PROXY,
    process.env.all_proxy
  ].some((value) => typeof value === 'string' && value.trim());
}

function getProxyAgent() {
  if (!cachedProxyAgent) {
    if (!ProxyAgentConstructor) {
      ({ ProxyAgent: ProxyAgentConstructor } = require('proxy-agent'));
    }

    cachedProxyAgent = new ProxyAgentConstructor();
  }

  return cachedProxyAgent;
}

function getIpv4HttpAgent() {
  if (!cachedIpv4HttpAgent) {
    cachedIpv4HttpAgent = new http.Agent({ family: 4 });
  }

  return cachedIpv4HttpAgent;
}

function getIpv4HttpsAgent() {
  if (!cachedIpv4HttpsAgent) {
    cachedIpv4HttpsAgent = new https.Agent({ family: 4 });
  }

  return cachedIpv4HttpsAgent;
}

function createUpstreamStatusError(statusCode) {
  const error = new Error(`地圖數據源返回 ${statusCode}`);
  error.isUpstreamStatusError = true;
  error.statusCode = statusCode;
  return error;
}

function getRequestErrorDiagnostics(error) {
  const details = [];

  function collectDiagnostics(currentError) {
    if (!currentError || typeof currentError !== 'object') {
      return;
    }

    if (currentError.name) {
      details.push(`name=${currentError.name}`);
    }

    if (currentError.code) {
      details.push(`code=${currentError.code}`);
    }

    if (currentError.statusCode) {
      details.push(`status=${currentError.statusCode}`);
    }

    if (currentError.message) {
      details.push(`message=${currentError.message}`);
    }

    if (Array.isArray(currentError.errors)) {
      currentError.errors.forEach(collectDiagnostics);
    }

    if (currentError.cause && currentError.cause !== currentError) {
      collectDiagnostics(currentError.cause);
    }
  }

  collectDiagnostics(error);

  return [...new Set(details)].join(', ');
}

async function fetchJsonDirect(dataSourceUrl, upstreamTimeoutMs = defaultUpstreamRequestTimeoutMs) {
  const response = await fetch(dataSourceUrl, {
    signal: AbortSignal.timeout(upstreamTimeoutMs)
  });

  if (!response.ok) {
    throw createUpstreamStatusError(response.status);
  }

  return response.json();
}

async function fetchJsonWithAxios(dataSourceUrl, config, upstreamTimeoutMs = defaultUpstreamRequestTimeoutMs) {
  const response = await axios.get(dataSourceUrl, {
    timeout: upstreamTimeoutMs,
    responseType: 'json',
    validateStatus: () => true,
    ...config
  });

  if (response.status < 200 || response.status >= 300) {
    throw createUpstreamStatusError(response.status);
  }

  return response.data;
}

async function fetchJsonThroughProxy(dataSourceUrl, upstreamTimeoutMs = defaultUpstreamRequestTimeoutMs) {
  const proxyAgent = getProxyAgent();

  return fetchJsonWithAxios(dataSourceUrl, {
    proxy: false,
    httpAgent: proxyAgent,
    httpsAgent: proxyAgent
  }, upstreamTimeoutMs);
}

async function fetchJsonDirectIpv4(dataSourceUrl, upstreamTimeoutMs = defaultUpstreamRequestTimeoutMs) {
  return fetchJsonWithAxios(dataSourceUrl, {
    proxy: false,
    httpAgent: getIpv4HttpAgent(),
    httpsAgent: getIpv4HttpsAgent()
  }, upstreamTimeoutMs);
}

async function fetchMapPayloadFromSource(dataSourceUrl, {
  mapDataNodeTransportOverrides = false,
  upstreamTimeoutMs = defaultUpstreamRequestTimeoutMs
} = {}) {
  const strategies = [];
  let lastError = null;
  const workersRuntime = isWorkersRuntime();
  const shouldUseNodeTransportOverrides = !workersRuntime && mapDataNodeTransportOverrides;

  if (shouldUseNodeTransportOverrides && hasProxyConfiguration()) {
    // 某些自托管环境只能经由代理访问外部 Google 资源，优先尝试代理链路。
    strategies.push({
      name: 'proxy-agent',
      request: () => fetchJsonThroughProxy(dataSourceUrl, upstreamTimeoutMs)
    });
  }

  if (shouldUseNodeTransportOverrides) {
    // 直连时优先固定 IPv4，可规避部分环境下 IPv6 出站不稳定的问题。
    strategies.push({
      name: 'direct-ipv4',
      request: () => fetchJsonDirectIpv4(dataSourceUrl, upstreamTimeoutMs)
    });
  } else {
    strategies.push({
      name: 'direct-fetch',
      request: () => fetchJsonDirect(dataSourceUrl, upstreamTimeoutMs)
    });
  }

  if (workersRuntime) {
    strategies.push({
      name: 'direct-fetch-retry',
      request: () => fetchJsonDirect(dataSourceUrl, upstreamTimeoutMs)
    });
  }

  const attemptDiagnostics = [];

  for (const strategy of strategies) {
    try {
      return await strategy.request();
    } catch (error) {
      lastError = error;

      if (error && error.isUpstreamStatusError) {
        throw error;
      }

      attemptDiagnostics.push(`${strategy.name}: ${getRequestErrorDiagnostics(error) || 'unknown error'}`);
    }
  }

  // 这里会把每种传输策略的失败摘要串起来，方便支持人员直接从一条日志里看到完整尝试链路。
  const finalError = new Error(`地圖數據源請求失敗：${attemptDiagnostics.join(' | ')}`);
  finalError.cause = lastError;
  throw finalError;
}

// Apps Script 可能返回数组，也可能返回 JSON 字符串，这里统一兜底。
function normalizeRawData(rawData) {
  if (Array.isArray(rawData)) {
    return rawData;
  }

  if (typeof rawData === 'string') {
    return JSON.parse(rawData);
  }

  throw new Error('預期收到陣列但得到其他類型');
}

function buildNormalizedMapResponse(responseBody, now, sourceName) {
  const rawData = normalizeRawData(responseBody.data);
  const avgAge = resolveNumericValue(responseBody.avg_age);
  const schoolNum = resolveNumericValue(responseBody.schoolNum, responseBody.SchoolNum);
  const formNum = resolveNumericValue(responseBody.formNum, responseBody.FormNum);

  // 这里输出的是前端消费契约：
  // 字段名、统计结构和 source/fallback 标记都在这里一次性标准化。
  return {
    avg_age: Number.isFinite(avgAge) ? avgAge : 0,
    schoolNum: Number.isFinite(schoolNum) ? schoolNum : 0,
    formNum: Number.isFinite(formNum) ? formNum : 0,
    last_synced: resolveLastSyncedTimestamp(responseBody.last_synced, now),
    statistics: normalizeProvinceStatistics(responseBody.statistics),
    statisticsForm: normalizeProvinceStatistics(responseBody.statisticsForm),
    data: cleanMapData(rawData),
    source: sourceName,
    preferredSource: 'google-script',
    isSourceFallback: sourceName !== 'google-script'
  };
}

function writeCache(payload, now) {
  cachedData = payload;
  lastFetchTime = now;
}

function getSourcePriority(sourceName) {
  return sourceName === 'google-script' ? 2 : 1;
}

function shouldPromoteCachedPayload(candidatePayload) {
  if (!cachedData) {
    return true;
  }

  const candidatePriority = getSourcePriority(candidatePayload && candidatePayload.source);
  const currentPriority = getSourcePriority(cachedData && cachedData.source);

  if (candidatePriority !== currentPriority) {
    return candidatePriority > currentPriority;
  }

  return Number(candidatePayload && candidatePayload.last_synced) >= Number(cachedData && cachedData.last_synced);
}

async function fetchMapPayloadFromNamedSource(sourceName, dataSourceUrl, options) {
  const responseBody = await fetchMapPayloadFromSource(dataSourceUrl, options);
  return buildNormalizedMapResponse(responseBody, Date.now(), sourceName);
}

function createCandidatePromise(sourceName, dataSourceUrl, options) {
  // race 里不直接抛错，而是包装成 result 对象，便于区分“先失败”和“先成功”的分支。
  return fetchMapPayloadFromNamedSource(sourceName, dataSourceUrl, options)
    .then((payload) => ({
      ok: true,
      sourceName,
      payload
    }))
    .catch((error) => ({
      ok: false,
      sourceName,
      error
    }));
}

function promotePreferredPayloadInBackground(candidatePromise) {
  candidatePromise.then((result) => {
    if (!result.ok || result.sourceName !== 'google-script') {
      return;
    }

    if (shouldPromoteCachedPayload(result.payload)) {
      writeCache(result.payload, Date.now());
    }
  }).catch(() => {
    // 背景升级失败不应影响已返回给前端的临时数据。
  });
}

function pickFirstNonEmptyValue(item, keys) {
  if (!item || typeof item !== 'object') {
    return '';
  }

  for (const key of keys) {
    const value = item[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    if (value !== undefined && value !== null) {
      const text = String(value).trim();
      if (text) {
        return text;
      }
    }
  }

  return '';
}

// 对外 API 只暴露前端真正需要的字段，原始表格列不直接透出。
function cleanMapData(rawData) {
  return rawData
    .filter((item) => item && (item.lat || item['緯度']))
    // 同时兼容新字段名与历史中文列名，方便表结构渐进迁移。
    .map((item) => ({
      name: pickFirstNonEmptyValue(item, ['name', 'schoolName', '學校名稱', '学校名称']) || '未填寫名稱',
      addr: pickFirstNonEmptyValue(item, ['addr', 'schoolAddress', '學校地址', '机构地址', '機構地址']) || '無地址',
      province: normalizeProvinceNameToLegacy(pickFirstNonEmptyValue(item, ['province', '省份', '機構所在省份', '机构所在省份'])),
      prov: pickFirstNonEmptyValue(item, ['prov', 'region', '區、縣', '城市 / 區縣', '城市 / 区县', '機構所在城市 / 區縣', '机构所在城市 / 区县']),
      city: pickFirstNonEmptyValue(item, ['city', 'cityName', '城市 / 區縣', '城市 / 区县', '機構所在城市 / 區縣', '机构所在城市 / 区县']),
      county: pickFirstNonEmptyValue(item, ['county', 'countyName', '縣區', '县区', '機構所在縣區', '机构所在县区']),
      else: pickFirstNonEmptyValue(item, ['else', 'other', '其他', '其他補充', '其他补充']),
      lat: parseFloat(item.lat || item['緯度']),
      lng: parseFloat(item.lng || item['經度']),
      experience: pickFirstNonEmptyValue(item, ['experience', '請問您在那裏都經歷了什麼？', '個人在校經歷描述', '个人在校经历描述']),
      HMaster: pickFirstNonEmptyValue(item, ['HMaster', 'headmasterName', '校長名字', '負責人/校長姓名', '负责人/校长姓名']),
      scandal: pickFirstNonEmptyValue(item, ['scandal', '學校的醜聞', '醜聞及暴力行為詳細描述', '丑闻及暴力行为详细描述']),
      contact: pickFirstNonEmptyValue(item, ['contact', 'contactInformation', '學校的聯繫方式', '機構聯繫方式', '机构联系方式']),
      inputType: pickFirstNonEmptyValue(item, ['inputType', 'identity', '請問您是什麽身份？', '請問您是作為什麼身份來填寫本表單？', '请问您是作为什么身份来填写本表单？']),
      dateStart: pickFirstNonEmptyValue(item, ['dateStart', '首次被送入日期', 'First Date Sent There']),
      dateEnd: pickFirstNonEmptyValue(item, ['dateEnd', '離開日期', '离开日期', 'Departure Date'])
    }));
}

// 公开地图接口的主逻辑：读取远端数据、清洗、缓存、失败时尽量回退到缓存。
async function getMapData({
  forceRefresh = false,
  googleScriptUrl,
  mapDataNodeTransportOverrides = false,
  publicMapDataUrl,
  upstreamTimeoutMs = defaultUpstreamRequestTimeoutMs
}) {
  const now = Date.now();

  // 常规请求优先命中缓存，避免每次页面访问都走网络。
  if (!forceRefresh && cachedData && now - lastFetchTime < cacheDurationMs) {
    return cachedData;
  }

  // 强制刷新也受冷却保护，避免多个用户同时点刷新时频繁命中上游。
  if (forceRefresh && cachedData && now - lastForceRefreshTime < forceRefreshCooldownMs) {
    return cachedData;
  }

  // 并发请求复用同一个 Promise，避免同一时间发出多次相同抓取。
  if (inFlightRequest) {
    return cachedData && !forceRefresh ? cachedData : inFlightRequest;
  }

  if (forceRefresh) {
    lastForceRefreshTime = now;
  }

  const request = (async () => {
    try {
      const { preferredSourceUrl, fallbackSourceUrl } = resolveMapDataSources({
        googleScriptUrl,
        publicMapDataUrl
      });
      const requestOptions = {
        mapDataNodeTransportOverrides,
        upstreamTimeoutMs
      };

      if (!preferredSourceUrl) {
        // 只有公开源时，接口仍然可用，但前端会失去“后台升级到私有源”的机会。
        const fallbackPayload = await fetchMapPayloadFromNamedSource('public-map-data', fallbackSourceUrl, requestOptions);
        writeCache(fallbackPayload, now);
        return fallbackPayload;
      }

      if (!fallbackSourceUrl) {
        // 只有私有源时，任何上游抖动都会直接暴露给调用方，因此正式环境更推荐同时保留公开回退源。
        const preferredPayload = await fetchMapPayloadFromNamedSource('google-script', preferredSourceUrl, requestOptions);
        writeCache(preferredPayload, now);
        return preferredPayload;
      }

      const preferredCandidatePromise = createCandidatePromise('google-script', preferredSourceUrl, requestOptions);
      const fallbackCandidatePromise = createCandidatePromise('public-map-data', fallbackSourceUrl, requestOptions);
      // 谁先完成先决定首屏响应，但更高优先级的数据仍可能在后台提升缓存。
      const firstCompletedResult = await Promise.race([
        preferredCandidatePromise,
        fallbackCandidatePromise
      ]);

      if (firstCompletedResult.ok) {
        if (firstCompletedResult.sourceName === 'google-script') {
          writeCache(firstCompletedResult.payload, now);
          return firstCompletedResult.payload;
        }

        // 公開數據先返回，私有源继续在后台完成后升级缓存。
        writeCache(firstCompletedResult.payload, now);
        promotePreferredPayloadInBackground(preferredCandidatePromise);
        return firstCompletedResult.payload;
      }

      const secondaryResult = await (
        firstCompletedResult.sourceName === 'google-script'
          ? fallbackCandidatePromise
          : preferredCandidatePromise
      );

      if (secondaryResult.ok) {
        writeCache(secondaryResult.payload, now);
        return secondaryResult.payload;
      }

      // 两个源都失败时保留 firstCompletedResult 的原始错误，
      // 这样状态码或最早的网络异常不会被后续包装淹没。
      throw firstCompletedResult.error;
    } catch (error) {
      // 抓取失败但本地仍有旧缓存时，优先保服务可用而不是直接报错。
      if (cachedData) {
        return cachedData;
      }

      if (error instanceof SyntaxError) {
        throw new Error('數據解析失敗');
      }

      throw error;
    }
  })();

  inFlightRequest = request;

  try {
    return await request;
  } finally {
    if (inFlightRequest === request) {
      inFlightRequest = null;
    }
  }
}

module.exports = {
  getMapData,
  normalizeProvinceNameToLegacy,
  resolveLastSyncedTimestamp,
  resetMapDataCache() {
    cachedData = null;
    inFlightRequest = null;
    lastFetchTime = 0;
    lastForceRefreshTime = 0;
    cachedProxyAgent = null;
    cachedIpv4HttpAgent = null;
    cachedIpv4HttpsAgent = null;
  },
  getRequestErrorDiagnostics,
  hasProxyConfiguration,
  fetchMapPayloadFromSource,
  resolveMapDataSources,
  buildNormalizedMapResponse
};
