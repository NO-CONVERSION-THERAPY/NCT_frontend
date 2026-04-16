(() => {
// 地图页脚本承担了“数据读取 + 地图渲染 + 图表统计 + 列表筛选”四类职责，
// 因此这里的注释重点放在模块协作关系和降级策略上，而不是重复解释 Leaflet / Chart API。
const SCHOOL_MARKER_SCALE = 0.75;
const SCHOOL_MARKER_DEFAULT_OPACITY = 0.75;
const SCHOOL_MARKER_MAX_OPACITY = 1.0;
const SCHOOL_MARKER_SHADOW_URL = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
const SCHOOL_MARKER_DEFAULT_COLOR = '#36a2eb';
const SCHOOL_MARKER_REPORT_MIN_COLOR = '#fca5a5';
const SCHOOL_MARKER_REPORT_MAX_COLOR = '#FF0000';

const PROVINCE_DENSITY_FILL_OPACITY = 0.75;

function toHexChannel(value) {
    return Math.round(value).toString(16).padStart(2, '0');
}

function interpolateHexColor(startColor, endColor, ratio) {
    const normalizedRatio = Math.min(1, Math.max(0, ratio));
    const startChannels = [
        parseInt(startColor.slice(1, 3), 16),
        parseInt(startColor.slice(3, 5), 16),
        parseInt(startColor.slice(5, 7), 16)
    ];
    const endChannels = [
        parseInt(endColor.slice(1, 3), 16),
        parseInt(endColor.slice(3, 5), 16),
        parseInt(endColor.slice(5, 7), 16)
    ];

    return `#${startChannels.map((startChannel, index) => {
        return toHexChannel(startChannel + ((endChannels[index] - startChannel) * normalizedRatio));
    }).join('')}`;
}

function getProvinceDensityColor(density, maxDensity) {
    if (!(density > 0) || !(maxDensity > 0)) {
        return 'transparent';
    }

    const densityRatio = density / maxDensity;
    return interpolateHexColor('#FED976', '#800026', densityRatio);
}

// 地图页所有按钮、统计文案和字段标签都从服务端注入的 I18N 字典读取，
// 这样前端无需再发一次“加载翻译包”的请求。
const i18n = window.I18N;
const MAP_DATA_REFRESH_INTERVAL_SECONDS = 300;
const PREFERRED_SOURCE_BACKGROUND_CHECK_INTERVAL_MS = 15000;
const PREFERRED_SOURCE_FORCE_REFRESH_INTERVAL_MS = 120000;
const { getElapsedSeconds, renderLastSyncedValue } = window.MapTimeUtils;
const {
    buildRecordDetailRouteUrl,
    buildRecordPaginationHtml,
    escapeHtml,
    formatMessage,
    getRecordRegionSummary
} = window.MapRecordDetail;
const {
    buildSchoolReportStats,
    getSchoolReportStats,
    groupSchoolRecords
} = window.MapRecordStats;
const {
    buildProvinceDensityMap,
    getFeatureProvinceDisplayName,
    getProvinceCodeFromFeature,
    getProvinceDisplayName
} = window.MapProvinceUtils || {};
const themeMediaQuery = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
const currentMapSearchParams = new URLSearchParams(window.location.search);

let mapTileLayer = null;
let provinceLayer = null;
let provinceFillLayer = null;
let provinceFillRenderer = null;
let provinceBorderRenderer = null;
const chartInstances = [];
const schoolMarkerIconCache = new Map();
const TILE_ERROR_THRESHOLD = 6;
const BASE_TILE_PROVIDERS = {
    dark: [
        {
            name: 'carto-dark',
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            options: {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                subdomains: 'abcd'
            }
        },
        {
            name: 'carto-light',
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            options: {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                subdomains: 'abcd'
            }
        },
        {
            name: 'osm-standard',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            options: {
                attribution: '© OpenStreetMap'
            }
        }
    ],
    light: [
        {
            name: 'osm-standard',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            options: {
                attribution: '© OpenStreetMap'
            }
        },
        {
            name: 'carto-light',
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            options: {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                subdomains: 'abcd'
            }
        }
    ]
};
let mapTileProviderIndex = 0;

function isPreferredMapSourcePending(payload) {
    return Boolean(
        payload
        && payload.isSourceFallback === true
        && payload.preferredSource === 'google-script'
    );
}

function isValidMapPayload(payload) {
    return Boolean(
        payload
        && Array.isArray(payload.data)
        && Array.isArray(payload.statistics)
        && typeof payload.avg_age === 'number'
        && typeof payload.last_synced === 'number'
    );
}

function startPreferredSourceUpgradeWatcher(initialPayload) {
    if (!isPreferredMapSourcePending(initialPayload) || typeof window.fetchSharedMapDataFromNetwork !== 'function') {
        return;
    }

    // 页面首次可能拿到公开回退数据，这个后台轮询会在私有源恢复后主动刷新页面。
    let stopped = false;
    let nextForceRefreshTimestamp = Date.now() + PREFERRED_SOURCE_FORCE_REFRESH_INTERVAL_MS;

    async function pollForPreferredSource() {
        if (stopped) {
            return;
        }

        const shouldForceRefresh = Date.now() >= nextForceRefreshTimestamp;

        try {
            const latestPayload = await window.fetchSharedMapDataFromNetwork({
                forceRefresh: shouldForceRefresh
            });

            if (shouldForceRefresh) {
                nextForceRefreshTimestamp = Date.now() + PREFERRED_SOURCE_FORCE_REFRESH_INTERVAL_MS;
            }

            if (isValidMapPayload(latestPayload) && latestPayload.source === 'google-script') {
                stopped = true;
                window.location.reload();
                return;
            }
        } catch (error) {
            if (shouldForceRefresh) {
                nextForceRefreshTimestamp = Date.now() + PREFERRED_SOURCE_FORCE_REFRESH_INTERVAL_MS;
            }

            console.warn('后台切换私有地图数据源失败:', error);
        }

        window.setTimeout(pollForPreferredSource, PREFERRED_SOURCE_BACKGROUND_CHECK_INTERVAL_MS);
    }

    window.setTimeout(pollForPreferredSource, PREFERRED_SOURCE_BACKGROUND_CHECK_INTERVAL_MS);
}

function scaleMarkerDimension(value) {
    return Math.round(value * SCHOOL_MARKER_SCALE);
}

function createSchoolMarkerSvgDataUrl(fillColor) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
            <path
                d="M12.5 0C5.596 0 0 5.596 0 12.5C0 20.774 12.5 41 12.5 41C12.5 41 25 20.774 25 12.5C25 5.596 19.404 0 12.5 0Z"
                fill="${fillColor}"
                stroke="rgba(255,255,255,0.95)"
                stroke-width="1.5"
            />
            <circle cx="12.5" cy="12.5" r="4.5" fill="rgba(255,255,255,0.92)" />
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createSchoolMarkerIcon(fillColor) {
    return L.icon({
        iconUrl: createSchoolMarkerSvgDataUrl(fillColor),
        shadowUrl: SCHOOL_MARKER_SHADOW_URL,
        iconSize: [scaleMarkerDimension(25), scaleMarkerDimension(41)],
        iconAnchor: [scaleMarkerDimension(12), scaleMarkerDimension(41)],
        popupAnchor: [scaleMarkerDimension(1), scaleMarkerDimension(-34)],
        tooltipAnchor: [scaleMarkerDimension(16), scaleMarkerDimension(-28)],
        shadowSize: [scaleMarkerDimension(41), scaleMarkerDimension(41)],
        shadowAnchor: [scaleMarkerDimension(13), scaleMarkerDimension(41)],
        className: 'school-marker-icon'
    });
}

function getSchoolMarkerReportCount(schoolReportStats) {
    return Number(schoolReportStats && schoolReportStats.selfCount || 0)
        + Number(schoolReportStats && schoolReportStats.agentCount || 0);
}

function getSchoolMarkerReportRatio(schoolReportStats, maxReportedMarkerCount) {
    const reportedMarkerCount = getSchoolMarkerReportCount(schoolReportStats);
    return reportedMarkerCount > 0 && maxReportedMarkerCount > 0
        ? Math.min(1, reportedMarkerCount / maxReportedMarkerCount)
        : 0;
}

function getSchoolMarkerColor(schoolReportStats, maxReportedMarkerCount) {
    const reportRatio = getSchoolMarkerReportRatio(schoolReportStats, maxReportedMarkerCount);

    if (!(reportRatio > 0)) {
        return SCHOOL_MARKER_DEFAULT_COLOR;
    }

    return interpolateHexColor(
        SCHOOL_MARKER_REPORT_MIN_COLOR,
        SCHOOL_MARKER_REPORT_MAX_COLOR,
        reportRatio
    );
}

function getSchoolMarkerOpacity(schoolReportStats, maxReportedMarkerCount) {
    const reportRatio = getSchoolMarkerReportRatio(schoolReportStats, maxReportedMarkerCount);
    return SCHOOL_MARKER_DEFAULT_OPACITY
        + ((SCHOOL_MARKER_MAX_OPACITY - SCHOOL_MARKER_DEFAULT_OPACITY) * reportRatio);
}

function getSchoolMarkerIcon(fillColor) {
    if (!schoolMarkerIconCache.has(fillColor)) {
        schoolMarkerIconCache.set(fillColor, createSchoolMarkerIcon(fillColor));
    }

    return schoolMarkerIconCache.get(fillColor);
}

// 底图、边框和图表主题都跟随系统深色模式一起切换。
function isDarkMode() {
    return Boolean(themeMediaQuery && themeMediaQuery.matches);
}

function addThemeChangeListener(listener) {
    if (!themeMediaQuery) {
        return;
    }

    if (typeof themeMediaQuery.addEventListener === 'function') {
        themeMediaQuery.addEventListener('change', listener);
        return;
    }

    if (typeof themeMediaQuery.addListener === 'function') {
        themeMediaQuery.addListener(listener);
    }
}

// 统一管理地图和图表的配色，避免多个组件各自判断深浅色模式。
function getThemeColors() {
    return isDarkMode()
        ? {
            legend: '#d7e3f0',
            axis: '#a9bdd1',
            axisStrong: '#d7e3f0',
            grid: 'rgba(148, 163, 184, 0.22)',
            mapOutline: '#d6e4f0',
            error: '#e6eef7'
        }
        : {
            legend: '#30485f',
            axis: '#5a6d80',
            axisStrong: '#30485f',
            grid: 'rgba(112, 136, 163, 0.14)',
            mapOutline: 'white',
            error: '#2c3e50'
        };
}

function setMapTileFallbackState(isUnavailable) {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        return;
    }

    mapElement.classList.toggle('map--tiles-unavailable', Boolean(isUnavailable));
}

// 深浅色主题使用不同底图源，但对外保持同一个挂载接口。
function getBaseTileProviders(minZoom) {
    const themeKey = isDarkMode() ? 'dark' : 'light';

    return BASE_TILE_PROVIDERS[themeKey].map((provider) => ({
        ...provider,
        options: {
            ...provider.options,
            maxZoom: 20,
            minZoom
        }
    }));
}

function createBaseTileLayer(minZoom) {
    const providers = getBaseTileProviders(minZoom);
    const activeProvider = providers[Math.min(mapTileProviderIndex, providers.length - 1)];

    return L.tileLayer(activeProvider.url, activeProvider.options);
}

function registerBaseTileLayerEvents(targetMap, minZoom) {
    const providers = getBaseTileProviders(minZoom);
    const activeProvider = providers[mapTileProviderIndex];
    let hasLoadedAnyTile = false;
    let tileErrorCount = 0;
    let fallbackHandled = false;

    mapTileLayer.on('tileload', () => {
        hasLoadedAnyTile = true;
        tileErrorCount = 0;
        setMapTileFallbackState(false);
    });

    mapTileLayer.on('tileerror', () => {
        if (hasLoadedAnyTile || fallbackHandled) {
            return;
        }

        tileErrorCount += 1;
        if (tileErrorCount < TILE_ERROR_THRESHOLD) {
            return;
        }

        fallbackHandled = true;
        const nextProviderIndex = mapTileProviderIndex + 1;

        if (nextProviderIndex >= providers.length) {
            setMapTileFallbackState(true);
            console.warn(`地图底图加载失败，所有备用瓦片源都不可用。当前主题起始源：${activeProvider.name}`);
            return;
        }

        mapTileProviderIndex = nextProviderIndex;
        console.warn(`地图底图加载失败，切换到备用瓦片源：${providers[nextProviderIndex].name}`);
        mountBaseTileLayer(targetMap, minZoom, { preserveProviderIndex: true });
    });
}

function mountBaseTileLayer(targetMap, minZoom, { preserveProviderIndex = false } = {}) {
    if (!preserveProviderIndex) {
        mapTileProviderIndex = 0;
    }

    if (mapTileLayer) {
        mapTileLayer.off();
        targetMap.removeLayer(mapTileLayer);
    }

    setMapTileFallbackState(false);
    mapTileLayer = createBaseTileLayer(minZoom);
    registerBaseTileLayerEvents(targetMap, minZoom);
    mapTileLayer.addTo(targetMap);
}

// 搜索时同样忽略大小写和空白，兼容姓名、地址、地区的混合检索。
function normalizeSearchText(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, '');
}

function getSearchTokens(searchText) {
    return String(searchText || '')
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((token) => normalizeSearchText(token))
        .filter(Boolean);
}

// inputType 为空时视为历史批量数据，这样能兼容旧数据结构。
function matchesInputType(item, expectedInputType) {
    if (!expectedInputType) return true;
    if (expectedInputType === '批量数据') return !item.inputType;
    return item.inputType === expectedInputType;
}

// 搜索词会在多字段聚合后的字符串里逐个匹配，支持组合搜索。
function matchesSearch(item, searchText) {
    const searchTokens = getSearchTokens(searchText);
    if (searchTokens.length === 0) return true;

    const searchableFields = [
        item.name,
        item.experience,
        item.HMaster,
        item.province,
        getProvinceDisplay(item.province),
        item.prov,
        item.addr,
        item.scandal,
        item.contact,
        item.else,
        item.inputType,
        getInputTypeDisplay(item.inputType)
    ];

    const searchableText = searchableFields.map((field) => normalizeSearchText(field)).join(' ');
    return searchTokens.every((token) => searchableText.includes(token));
}

function getInputTypeDisplay(value) {
    if (!value || value === '批量数据') {
        return i18n.data.inputTypes.bulk;
    }

    if (value === '受害者本人') {
        return i18n.data.inputTypes.self;
    }

    if (value === '受害者的代理人') {
        return i18n.data.inputTypes.agent;
    }

    return value;
}

function getProvinceDisplay(value) {
    if (typeof getProvinceDisplayName === 'function') {
        // 省份显示名优先走前端元数据工具，保证地图 GeoJSON、列表和统计图用同一套本地化规则。
        const localizedProvinceName = getProvinceDisplayName(value, window.APP_LANG);
        if (localizedProvinceName) {
            return localizedProvinceName;
        }
    }

    return i18n.data.provinceNames[value] || value || '';
}

function getProvinceLabelLatLng(feature, layer) {
    const center = feature?.properties?.center;
    if (Array.isArray(center) && center.length >= 2) {
        return L.latLng(center[1], center[0]);
    }

    return layer.getBounds().getCenter();
}

function bindProvinceLabel(feature, layer) {
    const provinceName = typeof getFeatureProvinceDisplayName === 'function'
        ? getFeatureProvinceDisplayName(feature, window.APP_LANG)
        : feature?.properties?.name || feature?.properties?.province || '';

    if (!provinceName) {
        return;
    }

    const labelLatLng = getProvinceLabelLatLng(feature, layer);
    layer.bindTooltip(escapeHtml(provinceName), {
        permanent: true,
        direction: 'center',
        className: 'map-province-label',
        interactive: false,
        opacity: 1
    });
    layer.openTooltip(labelLatLng);
}

function getRecordAnchorId(index) {
    return `record-${index}`;
}

function buildPopupFieldHtml(label, value) {
    const normalizedValue = String(value || '').trim();
    if (!normalizedValue) {
        return '';
    }

    return `
        <div class="map-record-field">
            <div class="map-record-field__label">${escapeHtml(label)}</div>
            <div class="map-record-field__value map-record-field__value--prewrap">${escapeHtml(normalizedValue)}</div>
        </div>
    `;
}

function buildPopupSummaryBodyHtml(record) {
    const regionText = [String(record && (record.city || record.prov) || '').trim(), String(record && record.county || '').trim()]
        .filter(Boolean)
        .join(' / ');
    const summaryFieldsHtml = [
        buildPopupFieldHtml(i18n.map.list.fields.headmaster, record && record.HMaster),
        buildPopupFieldHtml(i18n.map.list.fields.province, getProvinceDisplay(record && record.province)),
        buildPopupFieldHtml(i18n.map.list.fields.region, regionText),
        buildPopupFieldHtml(i18n.map.list.fields.address, record && record.addr),
        buildPopupFieldHtml(i18n.map.list.fields.contact, record && record.contact)
    ].filter(Boolean).join('');

    return summaryFieldsHtml
        ? `<div class="map-record-fields">${summaryFieldsHtml}</div>`
        : '';
}

function normalizePopupSummaryText(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function getPopupSummaryRegionText(record) {
    return [String(record && (record.city || record.prov) || '').trim(), String(record && record.county || '').trim()]
        .filter(Boolean)
        .join(' / ');
}

function getPopupSummaryPageKey(record) {
    return [
        record && record.HMaster,
        getProvinceDisplay(record && record.province),
        getPopupSummaryRegionText(record),
        record && record.addr,
        record && record.contact
    ]
        .map((value) => normalizePopupSummaryText(value))
        .join('::');
}

function getPopupSummaryPages(records) {
    const uniquePages = [];
    const seenKeys = new Set();

    (Array.isArray(records) ? records : []).forEach((record) => {
        const pageKey = getPopupSummaryPageKey(record);

        if (seenKeys.has(pageKey)) {
            return;
        }

        seenKeys.add(pageKey);
        uniquePages.push(record);
    });

    return uniquePages;
}

function createGroupedMarkerPopup(group, targetGroupIndex) {
    const popupContent = document.createElement('div');
    const popupPages = getPopupSummaryPages(group && group.pages);
    const popupPageCount = Math.max(1, popupPages.length);
    const shouldShowPopupPagination = popupPageCount > 1;
    let currentPageIndex = 0;

    popupContent.className = 'custom-popup custom-popup--record';

    function stopPopupInteractionPropagation(event) {
        if (!event) {
            return;
        }

        event.stopPropagation();

        if (typeof L !== 'undefined' && L.DomEvent && typeof L.DomEvent.stopPropagation === 'function') {
            L.DomEvent.stopPropagation(event);
        }
    }

    function stopPopupInteraction(event) {
        if (!event) {
            return;
        }

        event.preventDefault();
        stopPopupInteractionPropagation(event);

        if (typeof L !== 'undefined' && L.DomEvent && typeof L.DomEvent.preventDefault === 'function') {
            L.DomEvent.preventDefault(event);
        }
    }

    function bindPopupControl(node, handler) {
        if (!node) {
            return;
        }

        ['pointerdown', 'mousedown', 'touchstart'].forEach((eventName) => {
            node.addEventListener(eventName, stopPopupInteractionPropagation);
        });

        node.addEventListener('click', (event) => {
            stopPopupInteraction(event);
            handler();
        });
    }

    function bindPopupNavigationLink(node) {
        if (!node) {
            return;
        }

        ['pointerdown', 'mousedown', 'touchstart'].forEach((eventName) => {
            node.addEventListener(eventName, stopPopupInteractionPropagation);
        });

        node.addEventListener('click', stopPopupInteractionPropagation);
    }

    function renderPopupPage() {
        const currentRecord = popupPages[currentPageIndex] || group.summaryRecord || {};
        const regionSummary = getRecordRegionSummary(currentRecord, getProvinceDisplay);
        const detailHref = buildRecordDetailRouteUrl(currentRecord, {
            queryEntries: currentMapSearchParams,
            returnTo: getRecordAnchorId(targetGroupIndex)
        });
        const paginationHtml = shouldShowPopupPagination
            ? buildRecordPaginationHtml(i18n, currentPageIndex, popupPageCount)
            : '';

        popupContent.innerHTML = `
            <div class="custom-popup__header">
                <b>${escapeHtml(group.summaryRecord.name || currentRecord.name || '')}</b>
                ${regionSummary ? `<small>${escapeHtml(regionSummary)}</small>` : ''}
            </div>
            <div class="custom-popup__body">
                ${buildPopupSummaryBodyHtml(currentRecord)}
            </div>
            <div class="custom-popup__actions">
                <a
                    href="${escapeHtml(detailHref)}"
                    class="custom-popup__detail-link"
                    data-popup-detail-link="true"
                >${escapeHtml(i18n.map.list.viewDetails)}</a>
            </div>
            ${paginationHtml}
        `;

        const prevButton = popupContent.querySelector('[data-page-action="prev"]');
        const nextButton = popupContent.querySelector('[data-page-action="next"]');
        const detailLink = popupContent.querySelector('[data-popup-detail-link]');

        bindPopupControl(prevButton, () => {
            if (currentPageIndex <= 0) {
                return;
            }

            currentPageIndex -= 1;
            renderPopupPage();
        });

        bindPopupControl(nextButton, () => {
            if (currentPageIndex >= popupPageCount - 1) {
                return;
            }

            currentPageIndex += 1;
            renderPopupPage();
        });

        bindPopupNavigationLink(detailLink);
    }

    renderPopupPage();

    if (typeof L !== 'undefined' && L.DomEvent) {
        L.DomEvent.disableClickPropagation(popupContent);
        L.DomEvent.disableScrollPropagation(popupContent);
    }

    return popupContent;
}

function showMapDataError(message) {
    const safeMessage = escapeHtml(message || i18n.map.list.loadFailed);
    const lastSyncedElement = document.getElementById('lastSynced');
    const avgAgeElement = document.getElementById('avgAge');
    const schoolNumElement = document.getElementById('schoolNum');
    const mapElement = document.getElementById('map');
    const { error: errorColor } = getThemeColors();

    if (lastSyncedElement) {
        lastSyncedElement.textContent = safeMessage;
    }

    if (avgAgeElement) {
        avgAgeElement.textContent = safeMessage;
    }

    if(schoolNumElement) {
        schoolNumElement.textContent = safeMessage;
    }

    if (mapElement) {
        mapElement.innerHTML = `<p style="padding: 1rem; text-align: center; color: ${errorColor};">${safeMessage}</p>`;
    }
}

// 各类图表都通过工厂函数生成配置，这样主题切换时更容易统一更新。
function createPieChartOptions() {
    const themeColors = getThemeColors();

    return {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 8,
                right: 8,
                bottom: 8,
                left: 8
            }
        },
        radius: '78%',
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 12,
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    color: themeColors.legend,
                    font: {
                        size: 11
                    }
                }
            }
        }
    };
}

function createProvincePieChartOptions() {
    const themeColors = getThemeColors();

    return {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 4,
                right: 4,
                bottom: 4,
                left: 4
            }
        },
        radius: '90%',
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 10,
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    color: themeColors.legend,
                    font: {
                        size: 10
                    }
                }
            }
        }
    };
}

function createBarChartOptions() {
    const themeColors = getThemeColors();

    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        layout: {
            padding: {
                top: 8,
                right: 12,
                bottom: 8,
                left: 8
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label(context) {
                        return `${context.label}: ${context.parsed.x}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    color: themeColors.axis
                },
                grid: {
                    color: themeColors.grid
                },
                border: {
                    display: false
                }
            },
            y: {
                ticks: {
                    color: themeColors.axisStrong,
                    font: {
                        size: 12
                    }
                },
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        }
    };
}

function syncExistingChartTheme() {
    const themeColors = getThemeColors();

    chartInstances.forEach((chart) => {
        if (chart.options?.plugins?.legend?.labels) {
            chart.options.plugins.legend.labels.color = themeColors.legend;
        }

        if (chart.config.type === 'bar' && chart.options?.scales) {
            chart.options.scales.x.ticks.color = themeColors.axis;
            chart.options.scales.x.grid.color = themeColors.grid;
            chart.options.scales.y.ticks.color = themeColors.axisStrong;
        }

        chart.update('none');
    });
}

//const categories = []; // 存放省份名
//const selfData = [];   // 存放本人填写数
//const agentData = [];  // 存放代理人填写数

const map = L.map('map', {
    // Workers 部署里省级 GeoJSON 偶发出现 SVG 路径存在但不可见的情况，
    // 这里优先使用 Canvas 渲染，并继续保留后面的尺寸重算兜底。
    preferCanvas: true
}).setView([37.5, 109], 4); // 預設視角
const CNprov = window.ASSET_VERSION
    ? `/cn.json?v=${encodeURIComponent(window.ASSET_VERSION)}`
    : '/cn.json';
let pendingMapLayoutRefreshId = 0;

function getMarkerPopupWidthOptions() {
    const mapWidth = Math.max(0, Math.floor(map.getSize().x || 0));
    const viewportWidth = Math.max(0, Math.floor(window.innerWidth || 0));
    const horizontalViewportPadding = viewportWidth > 0 && viewportWidth <= 650 ? 24 : 56;
    const minPopupWidth = 180;
    const desiredWidth = Math.floor(mapWidth * 0.75);
    const maxSafeWidth = Math.max(minPopupWidth, viewportWidth - horizontalViewportPadding);
    const popupWidth = Math.max(minPopupWidth, Math.min(desiredWidth, maxSafeWidth));

    return {
        minWidth: popupWidth,
        maxWidth: popupWidth
    };
}

function ensureProvincePanes() {
    // 省份底色、边框、学校标记和 tooltip 分 pane 管理，才能稳定控制层级关系。
    if (!map.getPane('provinceFillPane')) {
        map.createPane('provinceFillPane');
    }

    if (!map.getPane('provinceBorderPane')) {
        map.createPane('provinceBorderPane');
    }

    if (!map.getPane('schoolShadowPane')) {
        map.createPane('schoolShadowPane');
    }

    if (!map.getPane('schoolMarkerPane')) {
        map.createPane('schoolMarkerPane');
    }

    if (!map.getPane('schoolTooltipPane')) {
        map.createPane('schoolTooltipPane');
    }

    map.getPane('provinceFillPane').style.zIndex = '625';
    map.getPane('provinceFillPane').style.pointerEvents = 'none';
    map.getPane('provinceBorderPane').style.zIndex = '640';
    map.getPane('provinceBorderPane').style.pointerEvents = 'none';
    map.getPane('schoolShadowPane').style.zIndex = '670';
    map.getPane('schoolMarkerPane').style.zIndex = '675';
    // 学校悬浮名称始终压过省份层、标记层和弹窗阴影层。
    map.getPane('schoolTooltipPane').style.zIndex = '800';
    map.getPane('schoolTooltipPane').style.pointerEvents = 'none';
}

function ensureProvinceRenderers() {
    if (!provinceFillRenderer) {
        provinceFillRenderer = L.canvas({
            padding: 0.5,
            pane: 'provinceFillPane'
        });
    }

    if (!provinceBorderRenderer) {
        provinceBorderRenderer = L.svg({
            pane: 'provinceBorderPane'
        });
    }
}

function getProvinceFillOpacity(density) {
    return density > 0 ? PROVINCE_DENSITY_FILL_OPACITY : 0;
}

function scheduleMapLayoutRefresh(delayMs = 0) {
    window.clearTimeout(pendingMapLayoutRefreshId);
    pendingMapLayoutRefreshId = window.setTimeout(() => {
        // 某些浏览器在容器显隐、pageshow 或主题切换后会把 Leaflet 图层尺寸算错，这里统一重算。
        map.invalidateSize({ pan: false, animate: false });

        if (provinceFillLayer && typeof provinceFillLayer.bringToFront === 'function') {
            provinceFillLayer.bringToFront();
        }

        if (provinceLayer && typeof provinceLayer.bringToFront === 'function') {
            provinceLayer.bringToFront();
        }
    }, delayMs);
}

ensureProvincePanes();
ensureProvinceRenderers();
mountBaseTileLayer(map, 4);
map.whenReady(() => {
    scheduleMapLayoutRefresh();
});

window.addEventListener('load', () => {
    scheduleMapLayoutRefresh(64);
}, { once: true });

window.addEventListener('pageshow', () => {
    scheduleMapLayoutRefresh(64);
});

window.addEventListener('resize', () => {
    scheduleMapLayoutRefresh(120);
});

addThemeChangeListener(() => {
    mountBaseTileLayer(map, 4);

    if (provinceLayer) {
        provinceLayer.setStyle({
            color: getThemeColors().mapOutline
        });
    }

    syncExistingChartTheme();
    scheduleMapLayoutRefresh(32);
});

let provList = Array.from({ length: 40 }, () => Array(2).fill());
window.getSharedMapData()
    .then(jsonResponse => {
        startPreferredSourceUpgradeWatcher(jsonResponse);
        const data = jsonResponse.data;
        const provinceCountSource = Array.isArray(jsonResponse.statistics) && jsonResponse.statistics.length > 0
            ? jsonResponse.statistics
            : data;
        const provinceDensityMap = typeof buildProvinceDensityMap === 'function'
            ? buildProvinceDensityMap(provinceCountSource)
            : new Map();
        const maxProvinceDensity = Math.max(0, ...provinceDensityMap.values());

        
        
        fetch(CNprov)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`地图图层返回 ${response.status}`);
                }

                return response.json();
            })
            .then(dataP => {
                provinceFillLayer = L.geoJSON(dataP, {
                    renderer: provinceFillRenderer,
                    interactive: false,
                    style: function(feature) {
                        const provinceCode = typeof getProvinceCodeFromFeature === 'function'
                            ? getProvinceCodeFromFeature(feature)
                            : '';
                        const density = provinceDensityMap.get(provinceCode) || 0;

                        return {
                            fillColor: getProvinceDensityColor(density, maxProvinceDensity),
                            weight: 0,
                            opacity: 0,
                            color: 'transparent',
                            // 保持固定的 25% alpha，零密度省份不着色。
                            fillOpacity: getProvinceFillOpacity(density)
                        };
                    }
                }).addTo(map);

                provinceLayer = L.geoJSON(dataP, {
                    renderer: provinceBorderRenderer,
                    interactive: false,
                    style: function(feature) {
                        return {
                            weight: 2,
                            opacity: 1,
                            color: getThemeColors().mapOutline,
                            dashArray: '3',
                            fillOpacity: 0
                        };
                    },
                    onEachFeature: function(feature, layer) {
                        bindProvinceLabel(feature, layer);
                    }
                }).addTo(map);

                if (typeof provinceFillLayer.bringToFront === 'function') {
                    provinceFillLayer.bringToFront();
                }

                if (typeof provinceLayer.bringToFront === 'function') {
                    provinceLayer.bringToFront();
                }

                const provinceBounds = provinceLayer.getBounds();
                if (provinceBounds && typeof provinceBounds.isValid === 'function' && provinceBounds.isValid()) {
                    map.fitBounds(provinceBounds.pad(0.03), {
                        animate: false,
                        maxZoom: 4
                    });
                }

                scheduleMapLayoutRefresh(32);
                //addMarkers(data);
            })
            .catch(err => console.error('加载地图数据失败:', err));

        const statistics = jsonResponse.statistics
        // 省份统计优先使用后端聚合结果，而不是前端自己从明细里二次汇总。
        const provinceChart = new Chart(document.getElementById('prov'), {//帶批處理的各省數據，這個可以表示所有的分佈數據
            type: 'pie',
            data: {
                labels: statistics.map(item => getProvinceDisplay(item.province)),
                datasets:[{
                    data: statistics.map(item => item.count),
                    backgroundColor: [
                        '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff',
                        '#ff9f40', '#4ed5b0', '#f44336', '#8bc34a', '#2196f3',
                        '#e91e63', '#00bcd4', '#cddc39', '#ff5722', '#795548',
                        '#607d8b', '#8bc34a', '#b39ddb', '#ffab91', '#d1c4e9',
                        '#fff59d', '#ffe0b2', '#b2dfdb', '#cfd8dc', '#ffccbc',
                        '#f8bbd0', '#e1bee7', '#d1c4e9', '#c8e6c9', '#ffecb3',
                        '#fff9c4', '#f0f4c3', '#d7ccc8', '#f5f5f5', '#eeeeee'
                    ]
                }]
            },
            options: createProvincePieChartOptions()
        });
        chartInstances.push(provinceChart);

        const statisticsForm = jsonResponse.statisticsForm;
        const provinceChartForm = new Chart(document.getElementById('provForm'), {//提交的表單的各省數據
            type: 'pie',
            data: {
                labels: statisticsForm.map(item => getProvinceDisplay(item.province)),
                datasets:[{
                    data: statisticsForm.map(item => item.count),
                    backgroundColor: [
                        '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff',
                        '#ff9f40', '#4ed5b0', '#f44336', '#8bc34a', '#2196f3',
                        '#e91e63', '#00bcd4', '#cddc39', '#ff5722', '#795548',
                        '#607d8b', '#8bc34a', '#b39ddb', '#ffab91', '#d1c4e9',
                        '#fff59d', '#ffe0b2', '#b2dfdb', '#cfd8dc', '#ffccbc',
                        '#f8bbd0', '#e1bee7', '#d1c4e9', '#c8e6c9', '#ffecb3',
                        '#fff9c4', '#f0f4c3', '#d7ccc8', '#f5f5f5', '#eeeeee'
                    ]
                }]
            },
            options: createProvincePieChartOptions()
        });
        chartInstances.push(provinceChartForm);

        const lastSyncedElement = document.getElementById('lastSynced');
        let lastSyncedTime = Number(jsonResponse.last_synced);
        let refreshInProgress = false;

        async function forceRefreshMapData() {
            if (refreshInProgress) {
                return;
            }

            // 防止用户连续点击刷新导致重复请求和重复 reload。
            refreshInProgress = true;
            timeUpdate();

            try {
                await window.getSharedMapData({ forceRefresh: true });
                window.location.reload();
            } catch (error) {
                console.error('地图数据刷新失败:', error);
                refreshInProgress = false;
                timeUpdate();
            }
        }

        // “上次同步时间”显示每秒重绘一次，并根据状态切换成刷新按钮。
        function timeUpdate() {
            const elapsed = getElapsedSeconds(lastSyncedTime);
            renderLastSyncedValue(lastSyncedElement, {
                elapsedSeconds: elapsed,
                refreshInProgress,
                onRefresh: forceRefreshMapData,
                i18n,
                refreshIntervalSeconds: MAP_DATA_REFRESH_INTERVAL_SECONDS
            });
        }

        setInterval(timeUpdate, 1000);
        timeUpdate();
        
        document.getElementById('avgAge').textContent = formatMessage(i18n.map.stats.ageValue, {
            age: jsonResponse.avg_age.toFixed(2)
        });
        document.getElementById('schoolNum').textContent = jsonResponse.schoolNum;
    

        let count_num0 = 0;
        let count_num1 = 0;
        data.forEach(item => {
            if(item.inputType == '受害者本人') count_num0++;
            if(item.inputType == '受害者的代理人')count_num1++;
        })
        const updatedFormChart = new Chart(document.getElementById('updatedForm'), {
        type: 'bar',
            data: {
                labels: [
                    i18n.map.tags.self,
                    i18n.map.tags.agent
                ],
                datasets: [{
                    label: i18n.map.stats.submittedForms,
                    data: [count_num0, count_num1],
                    backgroundColor: ['#ff6384','#36a2eb'],
                    borderRadius: 999,
                    borderSkipped: false,
                    barPercentage: 0.7,
                    categoryPercentage: 0.72
                }]
            },
            options: createBarChartOptions()
        });
        chartInstances.push(updatedFormChart);
        
        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const inputType = urlParams.get('inputType');// 找筛选条件
        const inputSearch = (urlParams.get('search') || '').trim();
        // 地图 marker 和列表详情共用同一份筛选结果，保证锚点能一一对应。
        const filteredData = data.filter((item) => matchesInputType(item, inputType) && matchesSearch(item, inputSearch));
        const schoolReportStatsBySchool = typeof buildSchoolReportStats === 'function'
            ? buildSchoolReportStats(data)
            : new Map();
        const maxReportedMarkerCount = Math.max(0, ...Array.from(schoolReportStatsBySchool.values()).map((schoolReportStats) => {
            return getSchoolMarkerReportCount(schoolReportStats);
        }));
        const groupedFilteredData = groupSchoolRecords(filteredData);
        groupedFilteredData.forEach((group, index) => {
            const item = group.summaryRecord;
            const schoolReportStats = typeof getSchoolReportStats === 'function'
                ? getSchoolReportStats(schoolReportStatsBySchool, item)
                : { selfCount: 0, agentCount: 0 };
            // marker 的颜色和透明度表达“该学校被重复举报的相对强度”，不是简单的分类色。
            const schoolMarkerColor = getSchoolMarkerColor(schoolReportStats, maxReportedMarkerCount);
            const marker = L.marker([item.lat, item.lng], {
                icon: getSchoolMarkerIcon(schoolMarkerColor),
                opacity: getSchoolMarkerOpacity(schoolReportStats, maxReportedMarkerCount),
                pane: 'schoolMarkerPane',
                shadowPane: 'schoolShadowPane'
            }).addTo(map);

            // 1. 鼠標指到圖標：顯示標題 (Tooltip)
            marker.bindTooltip(`<strong>${escapeHtml(item.name)}</strong>`, {
                sticky: true,
                direction: 'top',
                pane: 'schoolTooltipPane'
            });

            marker.bindPopup(createGroupedMarkerPopup(group, index), getMarkerPopupWidthOptions());
        });
    })
    .catch(error => {
        console.error('地图数据加载失败:', error);
        showMapDataError(i18n.map.list.loadFailed);
    });
})();
