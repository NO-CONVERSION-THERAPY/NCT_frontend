const express = require('express');
const {
  applySensitivePageHeaders,
  createRateLimiter,
  sensitiveRobotsPolicy
} = require('../../config/security');
const {
  buildGoogleFormPrefillUrl,
  encodeGoogleFormFields,
  submitToGoogleForm
} = require('../services/formService');
const { validateFormProtection } = require('../services/formProtectionService');
const {
  buildInstitutionCorrectionGoogleFormFields,
  InstitutionCorrectionStorageUnavailableError,
  saveInstitutionCorrectionSubmission,
  validateInstitutionCorrectionSubmission
} = require('../services/institutionCorrectionService');
const { logAuditEvent } = require('../services/auditLogService');
const {
  isNctBackendServiceConfigured,
  submitCorrection
} = require('../services/nctBackendService');
const {
  buildSubmissionDiagnostics,
  getSubmitTargets,
  shouldBuildGoogleFallbackUrl
} = require('../services/submissionTargetService');
const { renderFrontendPage } = require('../services/frontendRenderer');

function normalizeInstitutionCorrectionTargetError({ error, req }) {
  if (error instanceof InstitutionCorrectionStorageUnavailableError) {
    return {
      error: req.t('institutionCorrection.errors.storageUnavailable'),
      reasonCode: 'storage_unavailable'
    };
  }

  return {
    error: error && error.message
      ? error.message
      : req.t('institutionCorrection.errors.submitFailed'),
    reasonCode: 'submit_failed'
  };
}

function buildInstitutionCorrectionFailureStatusCode(resultsByTarget) {
  const failedTargetResults = Object.values(resultsByTarget || {}).filter((result) => !result?.ok);

  if (
    failedTargetResults.length > 0
    && failedTargetResults.every((result) => result.reasonCode === 'storage_unavailable')
  ) {
    return 503;
  }

  return 500;
}

async function submitInstitutionCorrectionToConfiguredTargets({
  correctionGoogleFormUrl,
  correctionSubmitTarget,
  encodedPayload,
  req,
  values
}) {
  const targets = getSubmitTargets(correctionSubmitTarget);
  const settledResults = await Promise.allSettled(targets.map(async (target) => {
    if (target === 'google') {
      await submitToGoogleForm(correctionGoogleFormUrl, encodedPayload);
      return {
        target
      };
    }

    const storageResult = await saveInstitutionCorrectionSubmission({ req, values });
    return {
      target,
      bindingName: storageResult.bindingName,
      submissionId: storageResult.submissionId
    };
  }));
  const resultsByTarget = Object.create(null);
  const successfulTargets = [];

  settledResults.forEach((result, index) => {
    const target = targets[index];

    if (result.status === 'fulfilled') {
      successfulTargets.push(target);
      resultsByTarget[target] = {
        ok: true,
        bindingName: result.value?.bindingName || '',
        submissionId: result.value?.submissionId || ''
      };
      return;
    }

    resultsByTarget[target] = {
      ok: false,
      ...normalizeInstitutionCorrectionTargetError({
        error: result.reason,
        req
      })
    };
  });

  return {
    resultsByTarget,
    successfulTargets
  };
}

function renderInstitutionCorrectionFailurePage({
  correctionGoogleFormUrl,
  correctionSubmitTarget,
  encodedPayload,
  errorMessage,
  req,
  res,
  showSubmissionDiagnostics,
  statusCode,
  submissionDiagnostics,
  title
}) {
  const pageTitle = req.t('pageTitles.institutionCorrectionError', { title });
  const fallbackUrl = shouldBuildGoogleFallbackUrl({
    submitTarget: correctionSubmitTarget,
    googleFormUrl: correctionGoogleFormUrl,
    encodedPayload
  })
    ? buildGoogleFormPrefillUrl(correctionGoogleFormUrl, encodedPayload)
    : '';

  res.status(statusCode);

  return renderFrontendPage({
    legacyData: {
      backFormUrl: '/map/correction',
      errorMessage,
      fallbackUrl,
      pageRobots: sensitiveRobotsPolicy,
      showSubmissionDiagnostics,
      submissionDiagnostics,
      title: pageTitle
    },
    legacyView: 'institution_correction_submit_error',
    pageProps: {
      backFormUrl: '/map/correction',
      errorMessage,
      fallbackUrl,
      showSubmissionDiagnostics,
      submissionDiagnostics
    },
    pageRobots: sensitiveRobotsPolicy,
    pageType: 'correction-error',
    req,
    res,
    title: pageTitle
  });
}

function createInstitutionCorrectionRoutes({
  correctionGoogleFormUrl,
  correctionSubmitTarget,
  debugMod,
  formProtectionMaxAgeMs,
  formProtectionMinFillMs,
  formProtectionSecret,
  rateLimitRedisUrl,
  submitRateLimitMax,
  title
}) {
  const router = express.Router();
  const showSubmissionDiagnostics = debugMod === 'true';
  const submitLimiter = createRateLimiter({
    max: submitRateLimitMax,
    redisUrl: rateLimitRedisUrl,
    storePrefix: 'institution-correction-submit-rate-limit:',
    getMessage(req) {
      return req.t('server.tooManyRequests');
    },
    onLimit(req, status, message) {
      logAuditEvent(req, 'institution_correction_rate_limited', { status, message });
    }
  });

  router.post(['/map/correction/submit', '/correction/submit'], submitLimiter, async (req, res) => {
    applySensitivePageHeaders(res);
    logAuditEvent(req, 'institution_correction_received', {
      submitTarget: correctionSubmitTarget
    });

    if (isNctBackendServiceConfigured()) {
      try {
        const submissionResult = await submitCorrection({
          body: req.body,
          req
        });
        const submissionDiagnostics = buildSubmissionDiagnostics({
          req,
          resultsByTarget: submissionResult.resultsByTarget || {},
          successfulTargets: submissionResult.successfulTargets || []
        });

        if (!Array.isArray(submissionResult.successfulTargets) || submissionResult.successfulTargets.length === 0) {
          const statusCode = submissionResult.statusCode || 500;
          const errorMessage = statusCode === 503
            ? req.t('institutionCorrection.errors.storageUnavailable')
            : req.t('institutionCorrection.errors.submitFailed');

          logAuditEvent(req, 'institution_correction_submit_failed', {
            failedTargets: submissionDiagnostics.failedTargets.map((target) => target.id),
            status: statusCode
          });

          return renderInstitutionCorrectionFailurePage({
            correctionGoogleFormUrl,
            correctionSubmitTarget,
            encodedPayload: submissionResult.encodedPayload || '',
            errorMessage,
            req,
            res,
            showSubmissionDiagnostics,
            statusCode,
            submissionDiagnostics,
            title
          });
        }

        logAuditEvent(req, 'institution_correction_submit_succeeded', {
          failedTargets: submissionDiagnostics.failedTargets.map((target) => target.id),
          status: 200,
          successfulTargets: submissionDiagnostics.successfulTargets.map((target) => target.id)
        });

        return renderFrontendPage({
          legacyData: {
            pageRobots: sensitiveRobotsPolicy,
            showSubmissionDiagnostics,
            submissionDiagnostics,
            title: req.t('pageTitles.institutionCorrectionSuccess', { title })
          },
          legacyView: 'institution_correction_submit',
          pageProps: {
            showSubmissionDiagnostics,
            submissionDiagnostics
          },
          pageRobots: sensitiveRobotsPolicy,
          pageType: 'correction-success',
          req,
          res,
          title: req.t('pageTitles.institutionCorrectionSuccess', { title })
        });
      } catch (error) {
        if (error.statusCode === 400) {
          const details = Array.isArray(error.payload && error.payload.details) ? error.payload.details : [];
          const protectionReason = error.payload && error.payload.reason;

          if (details.length > 0) {
            logAuditEvent(req, 'institution_correction_validation_failed', {
              errorCount: details.length,
              status: 400
            });
            return res.status(400).send(`${req.t('institutionCorrection.errors.submitFailedPrefix')}${details.join('；')}`);
          }

          logAuditEvent(req, 'institution_correction_protection_failed', {
            reason: protectionReason || 'invalid_token',
            status: 400
          });
          return res.status(400).send(req.t('server.invalidFormSubmission'));
        }

        logAuditEvent(req, 'institution_correction_submit_failed', {
          error: error.message,
          status: error.statusCode || 502
        });
        console.error('Institution correction submit proxy error:', error.message);

        return renderInstitutionCorrectionFailurePage({
          correctionGoogleFormUrl,
          correctionSubmitTarget,
          encodedPayload: '',
          errorMessage: req.t('institutionCorrection.errors.submitFailed'),
          req,
          res,
          showSubmissionDiagnostics,
          statusCode: error.statusCode || 502,
          submissionDiagnostics: buildSubmissionDiagnostics({
            req,
            resultsByTarget: Object.fromEntries(
              getSubmitTargets(correctionSubmitTarget).map((target) => [target, {
                ok: false,
                error: error.message
              }])
            ),
            successfulTargets: []
          }),
          title
        });
      }
    }

    const protectionResult = validateFormProtection({
      token: req.body.form_token,
      honeypotValue: req.body.website,
      secret: formProtectionSecret,
      minFillMs: formProtectionMinFillMs,
      maxAgeMs: formProtectionMaxAgeMs
    });

    if (!protectionResult.ok) {
      logAuditEvent(req, 'institution_correction_protection_failed', {
        ageMs: protectionResult.ageMs,
        reason: protectionResult.reason,
        status: 400
      });
      return res.status(400).send(req.t('server.invalidFormSubmission'));
    }

    const { errors, values } = validateInstitutionCorrectionSubmission(req.body, req.t);
    if (errors.length > 0) {
      logAuditEvent(req, 'institution_correction_validation_failed', {
        errorCount: errors.length,
        status: 400
      });
      return res.status(400).send(`${req.t('institutionCorrection.errors.submitFailedPrefix')}${errors.join('；')}`);
    }

    let encodedPayload = '';

    try {
      const fields = buildInstitutionCorrectionGoogleFormFields(values, req.t);
      encodedPayload = encodeGoogleFormFields(fields);

      const submissionResult = await submitInstitutionCorrectionToConfiguredTargets({
        correctionGoogleFormUrl,
        correctionSubmitTarget,
        encodedPayload,
        req,
        values
      });
      const submissionDiagnostics = buildSubmissionDiagnostics({
        req,
        resultsByTarget: submissionResult.resultsByTarget,
        successfulTargets: submissionResult.successfulTargets
      });

      if (submissionResult.successfulTargets.length === 0) {
        const statusCode = buildInstitutionCorrectionFailureStatusCode(submissionResult.resultsByTarget);
        const errorMessage = statusCode === 503
          ? req.t('institutionCorrection.errors.storageUnavailable')
          : req.t('institutionCorrection.errors.submitFailed');

        logAuditEvent(req, 'institution_correction_submit_failed', {
          failedTargets: submissionDiagnostics.failedTargets.map((target) => target.id),
          status: statusCode
        });

        return renderInstitutionCorrectionFailurePage({
          correctionGoogleFormUrl,
          correctionSubmitTarget,
          encodedPayload,
          errorMessage,
          req,
          res,
          showSubmissionDiagnostics,
          statusCode,
          submissionDiagnostics,
          title
        });
      }

      logAuditEvent(req, 'institution_correction_submit_succeeded', {
        failedTargets: submissionDiagnostics.failedTargets.map((target) => target.id),
        status: 200,
        successfulTargets: submissionDiagnostics.successfulTargets.map((target) => target.id)
      });

      return renderFrontendPage({
        legacyData: {
          pageRobots: sensitiveRobotsPolicy,
          showSubmissionDiagnostics,
          submissionDiagnostics,
          title: req.t('pageTitles.institutionCorrectionSuccess', { title })
        },
        legacyView: 'institution_correction_submit',
        pageProps: {
          showSubmissionDiagnostics,
          submissionDiagnostics
        },
        pageRobots: sensitiveRobotsPolicy,
        pageType: 'correction-success',
        req,
        res,
        title: req.t('pageTitles.institutionCorrectionSuccess', { title })
      });
    } catch (error) {
      const normalizedError = normalizeInstitutionCorrectionTargetError({ error, req });
      const statusCode = error instanceof InstitutionCorrectionStorageUnavailableError ? 503 : 500;

      logAuditEvent(req, 'institution_correction_submit_failed', {
        error: normalizedError.error,
        status: statusCode
      });
      console.error('Institution correction submit error:', error.message);

      return renderInstitutionCorrectionFailurePage({
        correctionGoogleFormUrl,
        correctionSubmitTarget,
        encodedPayload,
        errorMessage: normalizedError.error,
        req,
        res,
        showSubmissionDiagnostics,
        statusCode,
        submissionDiagnostics: buildSubmissionDiagnostics({
          req,
          resultsByTarget: Object.fromEntries(
            getSubmitTargets(correctionSubmitTarget).map((target) => [target, {
              ok: false,
              ...normalizedError
            }])
          ),
          successfulTargets: []
        }),
        title
      });
    }
  });

  return router;
}

module.exports = createInstitutionCorrectionRoutes;
