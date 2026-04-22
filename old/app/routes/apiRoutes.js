const express = require('express');
const cors = require('cors');
const { applySensitivePageHeaders, createRateLimiter } = require('../../config/security');
const { issueFormProtectionToken } = require('../services/formProtectionService');
const { logAuditEvent } = require('../services/auditLogService');
const {
  isNctBackendServiceConfigured,
  requestFrontendRuntime,
  translateText
} = require('../services/nctBackendService');
const { translateDetailItems } = require('../services/textTranslationService');

// API 路由只负责把 service 层返回的数据转成 HTTP 响应。
function createApiRoutes({
  formProtectionSecret,
  publicMapDataUrl,
  rateLimitRedisUrl
}) {
  const router = express.Router();
  const publicMapDataCors = cors({
    origin: '*',
    methods: ['GET'],
    maxAge: 86400,
    optionsSuccessStatus: 204
  });
  const translateRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 80,
    redisUrl: rateLimitRedisUrl,
    storePrefix: 'translate-rate-limit:',
    getMessage(req) {
      return req.t('server.tooManyRequests');
    },
    sendLimitResponse(_req, res, statusCode, message) {
      return res.status(statusCode).json({ error: message });
    }
  });

  router.get('/api/frontend-runtime', (req, res) => {
    const scope = typeof req.query.scope === 'string' ? req.query.scope.trim() : 'form';

    if (scope !== 'form' && scope !== 'correction') {
      return res.status(400).json({ error: 'Unsupported frontend runtime scope.' });
    }

    applySensitivePageHeaders(res);

    if (isNctBackendServiceConfigured()) {
      return requestFrontendRuntime(scope)
        .then((payload) => res.json(payload))
        .catch((error) => {
          console.error('Frontend runtime proxy error:', error.message);
          return res.status(error.statusCode || 502).json({
            error: error.message
          });
        });
    }

    return res.json({
      formProtectionToken: issueFormProtectionToken({ secret: formProtectionSecret }),
      scope
    });
  });

  router.options('/api/map-data', publicMapDataCors);

  /*
  router.get('/api/area-options', async (req, res) => {
    // Retired: province / city / county linkage now lives in /content/area-selector.json
    // and is loaded directly by the frontend.
  });
  */

  router.get('/api/area-options', (_req, res) => {
    return res.status(410).json({
      error: 'The area options API has been retired. Use /content/area-selector.json instead.'
    });
  });

  /*
  router.get('/api/map-data', publicMapDataCors, mapReadRateLimiter, refreshRateLimiter, async (req, res) => {
    // Retired: the frontend now reads the public JSON map source directly instead of routing
    // map aggregation traffic through the application backend.
  });
  */

  router.get('/api/map-data', publicMapDataCors, (_req, res) => {
    return res.status(410).json({
      error: `The map aggregation API has been retired. Read the public JSON source directly: ${publicMapDataUrl}`
    });
  });

  router.post('/api/translate-text', translateRateLimiter, async (req, res) => {
    try {
      const items = Array.isArray(req.body.items) ? req.body.items : [];
      const targetLanguage = req.body.targetLanguage;

      // 详情翻译只允许一小批文本，既限制成本，也避免被当成通用翻译接口滥用。
      const validItems = items
        .map((item) => ({
          fieldKey: typeof item.fieldKey === 'string' ? item.fieldKey : '',
          text: typeof item.text === 'string' ? item.text.trim() : ''
        }))
        .filter((item) => item.fieldKey && item.text)
        .slice(0, 6);

      if (validItems.length === 0) {
        return res.json({ translations: [] });
      }

      if (isNctBackendServiceConfigured()) {
        const payload = await translateText({
          items: validItems,
          targetLanguage
        });
        return res.json(payload);
      }

      const translations = await translateDetailItems({
        items: validItems,
        targetLanguage
      });

      return res.json({ translations });
    } catch (error) {
      // 翻译接口失败默认只影响增强体验，不应影响页面主功能；
      // 支持排障时要区分“翻译不可用”和“页面本身不可用”这两类问题。
      console.error('Translation API Error:', error.message);
      return res.status(500).json({ error: req.t('map.list.translationUnavailable') });
    }
  });

  return router;
}

module.exports = createApiRoutes;
