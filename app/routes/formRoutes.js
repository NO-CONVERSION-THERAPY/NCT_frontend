const express = require('express');
const {
  applySensitivePageHeaders,
  createRateLimiter,
  createSubmitRateLimiter,
  sensitiveRobotsPolicy
} = require('../../config/security');
const {
  buildGoogleFormPrefillUrl,
  buildConfirmationFields,
  buildGoogleFormFields,
  encodeGoogleFormFields,
  submitToGoogleForm,
  validateSubmission
} = require('../services/formService');
const { saveFormSubmission } = require('../services/formSubmissionStorageService');
const {
  issueFormConfirmationToken,
  validateFormConfirmation
} = require('../services/formConfirmationService');
const { validateFormProtection } = require('../services/formProtectionService');
const { logAuditEvent } = require('../services/auditLogService');
const { renderFrontendPage } = require('../services/frontendRenderer');
const {
  buildSubmissionDiagnostics,
  getSubmitTargets,
  redactGoogleFormUrl,
  shouldBuildGoogleFallbackUrl
} = require('../services/submissionTargetService');

function encodeConfirmationPayload(confirmationState) {
  return Buffer.from(JSON.stringify(confirmationState || {}), 'utf8').toString('base64url');
}

function decodeConfirmationPayload(payload) {
  const decodedPayload = Buffer.from(String(payload || '').trim(), 'base64url').toString('utf8');

  try {
    const parsedPayload = JSON.parse(decodedPayload);
    if (parsedPayload && typeof parsedPayload === 'object' && typeof parsedPayload.encodedPayload === 'string') {
      return {
        encodedPayload: parsedPayload.encodedPayload,
        submissionValues: parsedPayload.submissionValues && typeof parsedPayload.submissionValues === 'object'
          ? parsedPayload.submissionValues
          : null
      };
    }
  } catch (_error) {
    // 兼容旧确认页：旧版本只把 encoded payload 本身做了 base64url 包装。
  }

  return {
    encodedPayload: decodedPayload,
    submissionValues: null
  };
}

function renderFormFlowPage({
  flow,
  legacyData = {},
  legacyView,
  pageProps = {},
  pageRobots,
  pageType,
  req,
  res,
  title
}) {
  const resolvedTitle = title || legacyData.title || req.t('common.siteName');

  if (flow.renderMode === 'legacy') {
    return res.render(legacyView, {
      ...legacyData,
      title: resolvedTitle
    });
  }

  return renderFrontendPage({
    legacyData,
    legacyView,
    pageProps,
    pageRobots,
    pageType,
    req,
    res,
    title: resolvedTitle
  });
}

async function submitToConfiguredTargets({
  encodedPayload,
  formSubmitTarget,
  googleFormUrl,
  req,
  submissionValues
}) {
  const targets = getSubmitTargets(formSubmitTarget);
  const settledResults = await Promise.allSettled(targets.map(async (target) => {
    if (target === 'google') {
      await submitToGoogleForm(googleFormUrl, encodedPayload);
      return {
        target
      };
    }

    if (!submissionValues) {
      throw new Error('Missing validated submission values for D1 persistence.');
    }

    const storageResult = await saveFormSubmission({ req, values: submissionValues });
    return {
      target,
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
        submissionId: result.value?.submissionId || ''
      };
      return;
    }

    resultsByTarget[target] = {
      ok: false,
      error: result.reason?.message || String(result.reason || 'Unknown submission error.')
    };
  });

  return {
    resultsByTarget,
    successfulTargets
  };
}

function buildFailedResultsByTarget(formSubmitTarget, errorMessage) {
  return Object.fromEntries(
    getSubmitTargets(formSubmitTarget).map((target) => [target, {
      ok: false,
      error: errorMessage
    }])
  );
}

function resolveFlowTitle(req, flow, fallbackTitle = '') {
  if (!flow || !flow.titleKey || !req || typeof req.t !== 'function') {
    return fallbackTitle;
  }

  const translatedTitle = req.t(flow.titleKey);
  return translatedTitle && translatedTitle !== flow.titleKey
    ? translatedTitle
    : fallbackTitle;
}

function shouldUseEnhancedQuestionnaire(flow, body) {
  return Boolean(
    flow
    && (flow.standaloneEnhancements || String(body && body.form_variant || '').trim() === 'react_portal_enhanced')
  );
}

function renderSubmitFailurePage({
  encodedPayload,
  flow,
  formSubmitTarget,
  googleFormUrl,
  req,
  res,
  showSubmissionDiagnostics,
  submissionDiagnostics,
  title
}) {
  const flowTitle = resolveFlowTitle(req, flow, title);
  const pageTitle = req.t('pageTitles.submitError', { title: flowTitle });
  const fallbackUrl = shouldBuildGoogleFallbackUrl({ submitTarget: formSubmitTarget, googleFormUrl, encodedPayload })
    ? buildGoogleFormPrefillUrl(googleFormUrl, encodedPayload)
    : '';

  res.status(500);

  return renderFormFlowPage({
    flow,
    legacyData: {
      backFormUrl: flow.backFormUrl,
      fallbackUrl,
      pageRobots: sensitiveRobotsPolicy,
      showSubmissionDiagnostics,
      submissionDiagnostics,
      title: pageTitle
    },
    legacyView: flow.views.error,
    pageProps: {
      backFormUrl: flow.backFormUrl,
      fallbackUrl,
      showSubmissionDiagnostics,
      submissionDiagnostics
    },
    pageRobots: sensitiveRobotsPolicy,
    pageType: flow.pageTypes.error,
    req,
    res,
    title: pageTitle
  });
}

function buildFormFlowConfigs() {
  return {
    default: {
      backFormUrl: '/form',
      confirmPath: '/submit/confirm',
      pageTypes: {
        confirm: 'submit-confirm',
        error: 'submit-error',
        preview: 'submit-preview',
        success: 'submit-success'
      },
      renderMode: 'frontend',
      submitPath: '/submit',
      views: {
        confirm: 'submit_confirm',
        error: 'submit_error',
        preview: 'submit_preview',
        success: 'submit'
      }
    },
    standalone: {
      backFormUrl: '/form/standalone',
      confirmPath: '/form/standalone/submit/confirm',
      pageTypes: {
        confirm: 'submit-confirm',
        error: 'submit-error',
        preview: 'submit-preview',
        success: 'submit-success'
      },
      renderMode: 'legacy',
      standaloneEnhancements: true,
      submitPath: '/form/standalone/submit',
      titleKey: 'form.standalone.title',
      views: {
        confirm: 'standalone_submit_confirm',
        error: 'standalone_submit_error',
        preview: 'standalone_submit_preview',
        success: 'standalone_submit_success'
      }
    },
    workerStandalone: {
      backFormUrl: '/',
      confirmPath: '/submit/confirm',
      pageTypes: {
        confirm: 'submit-confirm',
        error: 'submit-error',
        preview: 'submit-preview',
        success: 'submit-success'
      },
      renderMode: 'legacy',
      standaloneEnhancements: true,
      submitPath: '/submit',
      titleKey: 'form.standalone.title',
      views: {
        confirm: 'standalone_submit_confirm',
        error: 'standalone_submit_error',
        preview: 'standalone_submit_preview',
        success: 'standalone_submit_success'
      }
    }
  };
}

function registerSubmissionFlowRoutes({
  confirmLimiter,
  flow,
  formDryRun,
  formProtectionMaxAgeMs,
  formProtectionMinFillMs,
  formProtectionSecret,
  formSubmitTarget,
  googleFormUrl,
  router,
  showSubmissionDiagnostics,
  submitLimiter,
  title
}) {
  router.post(flow.submitPath, submitLimiter, async (req, res) => {
    applySensitivePageHeaders(res);

    // 每次进入提交路由都先记录一条审计日志，便于后续排查来源 IP 和路径。
    logAuditEvent(req, 'submit_received', {
      dryRun: formDryRun,
      flow: flow.submitPath
    });

    const protectionResult = validateFormProtection({
      token: req.body.form_token,
      honeypotValue: req.body.website,
      secret: formProtectionSecret,
      minFillMs: formProtectionMinFillMs,
      maxAgeMs: formProtectionMaxAgeMs
    });

    if (!protectionResult.ok) {
      logAuditEvent(req, 'submit_protection_failed', {
        ageMs: protectionResult.ageMs,
        flow: flow.submitPath,
        reason: protectionResult.reason,
        status: 400
      });
      return res.status(400).send(req.t('server.invalidFormSubmission'));
    }

    let encodedPayload = '';

    try {
      // 先把请求体校验并规范化成 Google Form 需要的值。
      const { errors, values } = validateSubmission(req.body, req.t, {
        standaloneEnhancements: shouldUseEnhancedQuestionnaire(flow, req.body)
      });
      if (errors.length > 0) {
        logAuditEvent(req, 'submit_validation_failed', {
          errorCount: errors.length,
          flow: flow.submitPath,
          status: 400
        });
        return res.status(400).send(`${req.t('server.submitFailedPrefix')}${errors.join('；')}`);
      }

      const fields = buildGoogleFormFields(values, req.t);
      const confirmationFields = buildConfirmationFields(values, req.t);
      encodedPayload = encodeGoogleFormFields(fields);

      // 干跑模式下直接渲染预览页，不真正请求 Google。
      if (formDryRun) {
        const pageTitle = req.t('pageTitles.submitPreview', { title: resolveFlowTitle(req, flow, title) });

        logAuditEvent(req, 'submit_preview_rendered', {
          fieldCount: fields.length,
          flow: flow.submitPath,
          status: 200
        });

        return renderFormFlowPage({
          flow,
          legacyData: {
            backFormUrl: flow.backFormUrl,
            encodedPayload,
            fields,
            googleFormUrl: redactGoogleFormUrl(googleFormUrl),
            pageRobots: sensitiveRobotsPolicy,
            title: pageTitle
          },
          legacyView: flow.views.preview,
          pageProps: {
            backFormUrl: flow.backFormUrl,
            encodedPayload,
            fields,
            googleFormUrl: redactGoogleFormUrl(googleFormUrl)
          },
          pageRobots: sensitiveRobotsPolicy,
          pageType: flow.pageTypes.preview,
          req,
          res,
          title: pageTitle
        });
      }

      const confirmationPayload = encodeConfirmationPayload({
        encodedPayload,
        submissionValues: values
      });
      // 生产模式下强制多一步确认，给用户最后一次核对机会，也阻止客户端改包直接提交。
      const confirmationToken = issueFormConfirmationToken({
        payload: confirmationPayload,
        secret: formProtectionSecret
      });
      const pageTitle = req.t('pageTitles.submitConfirm', { title: resolveFlowTitle(req, flow, title) });

      logAuditEvent(req, 'submit_confirmation_rendered', {
        fieldCount: fields.length,
        flow: flow.submitPath,
        status: 200
      });

      return renderFormFlowPage({
        flow,
        legacyData: {
          backFormUrl: flow.backFormUrl,
          confirmationPayload,
          confirmationToken,
          confirmAction: flow.confirmPath,
          fields: confirmationFields,
          pageRobots: sensitiveRobotsPolicy,
          title: pageTitle
        },
        legacyView: flow.views.confirm,
        pageProps: {
          backFormUrl: flow.backFormUrl,
          confirmationPayload,
          confirmationToken,
          confirmAction: flow.confirmPath,
          fields: confirmationFields
        },
        pageRobots: sensitiveRobotsPolicy,
        pageType: flow.pageTypes.confirm,
        req,
        res,
        title: pageTitle
      });
    } catch (error) {
      logAuditEvent(req, 'submit_failed', {
        error: error.message,
        flow: flow.submitPath,
        status: 500
      });
      // 详细错误保留在服务端日志里，对外仍返回统一失败文案。
      console.error('Submission Error:', error.response ? error.response.data : error.message);
      return renderSubmitFailurePage({
        encodedPayload,
        flow,
        formSubmitTarget,
        googleFormUrl,
        req,
        res,
        showSubmissionDiagnostics,
        submissionDiagnostics: buildSubmissionDiagnostics({
          req,
          resultsByTarget: buildFailedResultsByTarget(formSubmitTarget, error.message),
          successfulTargets: []
        }),
        title
      });
    }
  });

  router.post(flow.confirmPath, confirmLimiter, async (req, res) => {
    applySensitivePageHeaders(res);

    logAuditEvent(req, 'submit_confirm_received', {
      dryRun: formDryRun,
      flow: flow.confirmPath
    });

    const confirmationPayload = String(req.body.confirmation_payload || '').trim();
    const confirmationToken = String(req.body.confirmation_token || '').trim();
    const confirmationResult = validateFormConfirmation({
      token: confirmationToken,
      payload: confirmationPayload,
      secret: formProtectionSecret,
      maxAgeMs: formProtectionMaxAgeMs
    });

    if (!confirmationResult.ok) {
      logAuditEvent(req, 'submit_confirm_validation_failed', {
        ageMs: confirmationResult.ageMs,
        flow: flow.confirmPath,
        reason: confirmationResult.reason,
        status: 400
      });
      return res.status(400).send(req.t('server.invalidFormSubmission'));
    }

    let encodedPayload = '';
    let submissionValues = null;

    try {
      const decodedConfirmationPayload = decodeConfirmationPayload(confirmationPayload);
      encodedPayload = decodedConfirmationPayload.encodedPayload;
      submissionValues = decodedConfirmationPayload.submissionValues;

      const submissionResult = await submitToConfiguredTargets({
        encodedPayload,
        formSubmitTarget,
        googleFormUrl,
        req,
        submissionValues
      });
      const submissionDiagnostics = buildSubmissionDiagnostics({
        req,
        resultsByTarget: submissionResult.resultsByTarget,
        successfulTargets: submissionResult.successfulTargets
      });

      if (submissionResult.successfulTargets.length === 0) {
        logAuditEvent(req, 'submit_failed', {
          failedTargets: submissionDiagnostics.failedTargets.map((target) => target.id),
          flow: flow.confirmPath,
          status: 500
        });
        return renderSubmitFailurePage({
          encodedPayload,
          flow,
          formSubmitTarget,
          googleFormUrl,
          req,
          res,
          showSubmissionDiagnostics,
          submissionDiagnostics,
          title
        });
      }

      logAuditEvent(req, 'submit_succeeded', {
        failedTargets: submissionDiagnostics.failedTargets.map((target) => target.id),
        flow: flow.confirmPath,
        status: 200,
        successfulTargets: submissionDiagnostics.successfulTargets.map((target) => target.id)
      });
      const successPageTitle = flow.renderMode === 'legacy'
        ? req.t('submitSuccess.title')
        : title;

      return renderFormFlowPage({
        flow,
        legacyData: {
          backFormUrl: flow.backFormUrl,
          pageRobots: sensitiveRobotsPolicy,
          showSubmissionDiagnostics,
          submissionDiagnostics,
          title: successPageTitle
        },
        legacyView: flow.views.success,
        pageProps: {
          backFormUrl: flow.backFormUrl,
          showSubmissionDiagnostics,
          submissionDiagnostics
        },
        pageRobots: sensitiveRobotsPolicy,
        pageType: flow.pageTypes.success,
        req,
        res,
        title: successPageTitle
      });
    } catch (error) {
      logAuditEvent(req, 'submit_failed', {
        error: error.message,
        flow: flow.confirmPath,
        status: 500
      });
      console.error('Submission Error:', error.response ? error.response.data : error.message);
      return renderSubmitFailurePage({
        encodedPayload,
        flow,
        formSubmitTarget,
        googleFormUrl,
        req,
        res,
        showSubmissionDiagnostics,
        submissionDiagnostics: buildSubmissionDiagnostics({
          req,
          resultsByTarget: buildFailedResultsByTarget(formSubmitTarget, error.message),
          successfulTargets: []
        }),
        title
      });
    }
  });
}

// 表單提交流程：限流 -> 校验 -> 干跑预览或确认页 -> 最终提交 -> 审计日志。
function createFormRoutes({
  debugMod,
  enabledFlowNames = ['default', 'standalone'],
  formDryRun,
  formSubmitTarget,
  formProtectionMaxAgeMs,
  formProtectionMinFillMs,
  formProtectionSecret,
  googleFormUrl,
  rateLimitRedisUrl,
  submitRateLimitMax,
  title
}) {
  const router = express.Router();
  const showSubmissionDiagnostics = debugMod === 'true';
  const submitLimiter = createSubmitRateLimiter({
    max: submitRateLimitMax,
    redisUrl: rateLimitRedisUrl,
    getMessage(req) {
      return req.t('server.tooManyRequests');
    },
    onLimit(req, status, message) {
      logAuditEvent(req, 'submit_rate_limited', { status, message });
    }
  });
  const confirmLimiter = createRateLimiter({
    max: submitRateLimitMax,
    redisUrl: rateLimitRedisUrl,
    storePrefix: 'submit-confirm-rate-limit:',
    getMessage(req) {
      return req.t('server.tooManyRequests');
    },
    onLimit(req, status, message) {
      logAuditEvent(req, 'submit_confirm_rate_limited', { status, message });
    }
  });

  const flows = buildFormFlowConfigs();

  enabledFlowNames
    .map((flowName) => flows[flowName])
    .filter(Boolean)
    .forEach((flow) => {
    registerSubmissionFlowRoutes({
      confirmLimiter,
      flow,
      formDryRun,
      formProtectionMaxAgeMs,
      formProtectionMinFillMs,
      formProtectionSecret,
      formSubmitTarget,
      googleFormUrl,
      router,
      showSubmissionDiagnostics,
      submitLimiter,
      title
    });
    });

  return router;
}

module.exports = createFormRoutes;
