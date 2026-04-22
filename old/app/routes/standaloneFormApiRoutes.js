const express = require('express');
const cors = require('cors');
const { createRateLimiter } = require('../../config/security');
const { logAuditEvent } = require('../services/auditLogService');

function createStandaloneFormApiRoutes({
  mapReadRateLimitMax,
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
  const mapReadRateLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000,
    max: mapReadRateLimitMax,
    redisUrl: rateLimitRedisUrl,
    storePrefix: 'standalone-form-map-read-rate-limit:',
    getMessage(req) {
      return req.t('server.tooManyRequests');
    },
    onLimit(req, status, message) {
      logAuditEvent(req, 'map_read_rate_limited', { status, message });
    },
    sendLimitResponse(_req, res, statusCode, message) {
      return res.status(statusCode).json({ error: message });
    }
  });
  router.options('/api/map-data', publicMapDataCors);

  /*
  router.get('/api/area-options', async (req, res) => {
    // Retired: the standalone form now reads /content/area-selector.json directly.
  });
  */

  router.get('/api/area-options', (_req, res) => {
    return res.status(410).json({
      error: 'The area options API has been retired. Use /content/area-selector.json instead.'
    });
  });

  /*
  router.get('/api/map-data', publicMapDataCors, mapReadRateLimiter, refreshRateLimiter, async (req, res) => {
    // Retired: the standalone form now reads the public JSON map source directly.
  });
  */

  router.get('/api/map-data', publicMapDataCors, mapReadRateLimiter, (_req, res) => {
    return res.status(410).json({
      error: `The map aggregation API has been retired. Read the public JSON source directly: ${publicMapDataUrl}`
    });
  });

  return router;
}

module.exports = createStandaloneFormApiRoutes;
