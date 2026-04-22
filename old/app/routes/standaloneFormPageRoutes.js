const express = require('express');
const {
  applySensitivePageHeaders,
  createRateLimiter,
  sensitiveRobotsPolicy
} = require('../../config/security');
const { logAuditEvent } = require('../services/auditLogService');
const { buildFormPageViewModel } = require('../services/formPageViewModel');
const {
  buildGoogleFormFields,
  buildGoogleFormPrefillUrl,
  encodeGoogleFormFields
} = require('../services/formService');

function translateWithFallback(t, key, fallbackValue = '') {
  if (typeof t !== 'function') {
    return fallbackValue;
  }

  const translatedValue = t(key);
  return translatedValue && translatedValue !== key ? translatedValue : fallbackValue;
}

function buildDebugSampleSubmissionValues(t) {
  return {
    birthDate: '2008-01-01',
    googleFormAge: 17,
    birthYear: '2008',
    birthMonth: '1',
    birthDay: '1',
    provinceCode: '350000',
    province: translateWithFallback(t, 'data.provinceNames.350000', '福建'),
    cityCode: '350500',
    city: '泉州市',
    countyCode: '350504',
    county: '洛江区',
    schoolName: t('debug.samples.form.schoolName'),
    identity: translateWithFallback(t, 'form.identityOptions.self', 'Survivor'),
    sex: translateWithFallback(t, 'form.sexOptions.male', 'Male'),
    schoolAddress: t('debug.samples.form.schoolAddress'),
    experience: t('debug.samples.form.experience'),
    dateStart: '2026-04-21',
    dateEnd: '2026-04-25',
    headmasterName: t('debug.samples.form.headmasterName'),
    contactInformation: t('debug.samples.form.contactInformation'),
    scandal: t('debug.samples.form.scandal'),
    other: t('debug.samples.form.other')
  };
}

function buildDebugSubmitErrorPreviewUrl({ googleFormUrl, t }) {
  const values = buildDebugSampleSubmissionValues(t);
  return buildGoogleFormPrefillUrl(googleFormUrl, encodeGoogleFormFields(buildGoogleFormFields(values, t)));
}

function getStandaloneSurveyTitle(req, fallbackTitle = '') {
  if (!req || typeof req.t !== 'function') {
    return fallbackTitle;
  }

  const translatedTitle = req.t('form.standalone.title');
  return translatedTitle && translatedTitle !== 'form.standalone.title'
    ? translatedTitle
    : fallbackTitle;
}

function createStandaloneFormPageRoutes({
  apiUrl,
  debugMod,
  formProtectionSecret,
  googleFormUrl,
  pageReadRateLimitMax,
  rateLimitRedisUrl,
  title
}) {
  const router = express.Router();
  const pageReadLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000,
    max: pageReadRateLimitMax,
    redisUrl: rateLimitRedisUrl,
    storePrefix: 'standalone-form-page-read-rate-limit:',
    getMessage(req) {
      return req.t('server.tooManyRequests');
    },
    onLimit(req, status, message) {
      logAuditEvent(req, 'page_read_rate_limited', { status, message });
    }
  });

  function renderStandaloneFormPage(req, res) {
    const standaloneTitle = getStandaloneSurveyTitle(req, title);
    const pageTitle = req.t('pageTitles.form', { title: standaloneTitle });
    const viewModel = buildFormPageViewModel({
      apiUrl,
      formProtectionSecret,
      req,
      title: pageTitle
    });

    applySensitivePageHeaders(res);

    return res.render('standalone_form', {
      ...viewModel,
      submitAction: '/submit'
    });
  }

  router.get(['/', '/form/standalone'], pageReadLimiter, renderStandaloneFormPage);

  router.get('/debug', pageReadLimiter, (req, res) => {
    if (debugMod !== 'true') {
      return res.status(404).send(req.t('common.notFound'));
    }

    applySensitivePageHeaders(res);

    return res.render('standalone_debug', {
      apiUrl,
      debugTools: [
        {
          description: req.t('submitSuccess.message'),
          href: '/debug/submit-success',
          pathLabel: '/debug/submit-success',
          title: req.t('submitSuccess.title')
        },
        {
          description: req.t('submitError.intro'),
          href: '/debug/submit-error',
          pathLabel: '/debug/submit-error',
          title: req.t('submitError.title')
        }
      ],
      pageRobots: sensitiveRobotsPolicy,
      title: req.t('pageTitles.debug', { title: getStandaloneSurveyTitle(req, title) })
    });
  });

  router.get('/debug/submit-success', pageReadLimiter, (req, res) => {
    if (debugMod !== 'true') {
      return res.status(404).send(req.t('common.notFound'));
    }

    applySensitivePageHeaders(res);

    return res.render('standalone_submit_success', {
      backFormUrl: '/debug',
      pageRobots: sensitiveRobotsPolicy,
      showSubmissionDiagnostics: false,
      submissionDiagnostics: null,
      title: req.t('submitSuccess.title')
    });
  });

  router.get('/debug/submit-error', pageReadLimiter, (req, res) => {
    if (debugMod !== 'true') {
      return res.status(404).send(req.t('common.notFound'));
    }

    applySensitivePageHeaders(res);

    return res.render('standalone_submit_error', {
      backFormUrl: '/debug',
      fallbackUrl: buildDebugSubmitErrorPreviewUrl({
        googleFormUrl,
        t: req.t
      }),
      pageRobots: sensitiveRobotsPolicy,
      showSubmissionDiagnostics: false,
      submissionDiagnostics: null,
      title: req.t('pageTitles.submitError', { title: getStandaloneSurveyTitle(req, title) })
    });
  });

  router.get('/healthz', (_req, res) => {
    res
      .type('text/plain; charset=utf-8')
      .set('Cache-Control', 'no-store')
      .send('ok');
  });

  return router;
}

module.exports = createStandaloneFormPageRoutes;
