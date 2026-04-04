const rateLimit = require('express-rate-limit');

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
  }
};

const requestBodyLimits = {
  json: '50kb',
  urlencoded: '50kb'
};

function createRateLimiter({
  windowMs = 15 * 60 * 1000,
  max,
  onLimit,
  getMessage,
  sendLimitResponse,
  skip
}) {
  return rateLimit({
    windowMs,
    max: Number.isFinite(max) && max > 0 ? max : 5,
    skip,
    standardHeaders: true,
    legacyHeaders: false,
    handler(req, res, _next, options) {
      const message = typeof getMessage === 'function'
        ? getMessage(req)
        : '請求過於頻繁，請稍後再試。';

      if (typeof onLimit === 'function') {
        onLimit(req, options.statusCode, message);
      }

      if (typeof sendLimitResponse === 'function') {
        return sendLimitResponse(req, res, options.statusCode, message);
      }

      return res.status(options.statusCode).send(message);
    }
  });
}

// 表单提交限流单独封装，方便在 route 层直接创建并接审计回调。
function createSubmitRateLimiter({ max, onLimit, getMessage }) {
  return createRateLimiter({
    max,
    onLimit,
    getMessage
  });
}

module.exports = {
  createRateLimiter,
  createSubmitRateLimiter,
  helmetConfig,
  requestBodyLimits
};
