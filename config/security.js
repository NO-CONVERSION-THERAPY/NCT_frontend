const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { createClient } = require('redis');

// Helmet 的 CSP 在这里统一配置，避免散落在入口文件里。
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com', 'https://cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com', 'https://cdn.jsdelivr.net'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https:'],
      fontSrc: ["'self'", 'data:', 'https:'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'", 'https://docs.google.com'],
      frameAncestors: ["'none'"]
    }
  },
  referrerPolicy: {
    // OSM 瓦片服务要求跨站请求保留来源站点，不能继续使用 Helmet 默认的 no-referrer。
    policy: 'strict-origin-when-cross-origin'
  }
};

const requestBodyLimits = {
  json: '50kb',
  urlencoded: '50kb'
};
const sensitiveRobotsPolicy = '';
const sensitiveResponseHeaders = {
  'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
  'Surrogate-Control': 'no-store'
};

// 复用 Redis client 和 rate-limit store，避免每个 limiter 单独建连接。
const redisClientCache = new Map();
const rateLimitStoreCache = new Map();

function getRedisRateLimitStore({ redisUrl, prefix = 'rate-limit:' } = {}) {
  if (!redisUrl) {
    // 未配置 Redis 时自动退回到进程内限流，单实例可用，但多实例之间不会共享计数。
    return undefined;
  }

  const storeCacheKey = `${redisUrl}|${prefix}`;
  if (rateLimitStoreCache.has(storeCacheKey)) {
    return rateLimitStoreCache.get(storeCacheKey);
  }

  let redisClientEntry = redisClientCache.get(redisUrl);
  if (!redisClientEntry) {
    const client = createClient({ url: redisUrl });

    client.on('error', (error) => {
      console.error('Redis rate limit client error:', error.message);
    });

    const connection = client.connect().catch((error) => {
      // 如果这里报错，首个命中该 limiter 的请求通常也会失败；
      // 排障时优先检查 RATE_LIMIT_REDIS_URL、网络连通性和 Redis ACL。
      console.error('Redis rate limit connect failed:', error.message);
      throw error;
    });

    redisClientEntry = { client, connection };
    redisClientCache.set(redisUrl, redisClientEntry);
  }

  const store = new RedisStore({
    // express-rate-limit 只关心 sendCommand 接口，这里把连接初始化细节封装掉。
    prefix,
    sendCommand: (...args) => redisClientEntry.connection.then(() => redisClientEntry.client.sendCommand(args))
  });

  rateLimitStoreCache.set(storeCacheKey, store);
  return store;
}

// 所有限流都收敛到这一层，路由只负责传策略参数和返回文案。
function createRateLimiter({
  windowMs = 15 * 60 * 1000,
  max,
  onLimit,
  getMessage,
  sendLimitResponse,
  skip,
  redisUrl,
  store,
  storePrefix
}) {
  let middleware;

  return function lazyRateLimiter(req, res, next) {
    try {
      // Workers 不允許在 global scope 裡啟動 express-rate-limit 的內部 timer，
      // 因此把真正的 middleware 初始化延後到首次請求時再完成。
      if (!middleware) {
        // 真正创建 limiter 的时机被推迟到首个请求，
        // 因此“配置错误只在流量进入后暴露”是预期行为，不是随机故障。
        middleware = rateLimit({
          windowMs,
          max: Number.isFinite(max) && max > 0 ? max : 5,
          skip,
          store: store || getRedisRateLimitStore({ redisUrl, prefix: storePrefix }),
          validate: {
            creationStack: false
          },
          standardHeaders: true,
          legacyHeaders: false,
          handler(limitedReq, limitedRes, _next, options) {
            const message = typeof getMessage === 'function'
              ? getMessage(limitedReq)
              : '請求過於頻繁，請稍後再試。';

            if (typeof onLimit === 'function') {
              onLimit(limitedReq, options.statusCode, message);
            }

            if (typeof sendLimitResponse === 'function') {
              return sendLimitResponse(limitedReq, limitedRes, options.statusCode, message);
            }

            return limitedRes.status(options.statusCode).send(message);
          }
        });
      }

      return middleware(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

// 表单提交限流单独封装，方便在 route 层直接创建并接审计回调。
function createSubmitRateLimiter({ max, onLimit, getMessage, redisUrl }) {
  return createRateLimiter({
    max,
    onLimit,
    getMessage,
    redisUrl,
    storePrefix: 'submit-rate-limit:'
  });
}

function applySensitivePageHeaders(res) {
  // 预览页、确认页、维护页都不应被缓存，避免令牌和动态状态被中间层复用。
  res.set(sensitiveResponseHeaders);
  return res;
}

module.exports = {
  applySensitivePageHeaders,
  createRateLimiter,
  getRedisRateLimitStore,
  createSubmitRateLimiter,
  helmetConfig,
  requestBodyLimits,
  sensitiveRobotsPolicy
};
