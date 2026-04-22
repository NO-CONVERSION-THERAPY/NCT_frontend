const {
  nctBackendServiceTimeoutMs,
  nctBackendServiceToken,
  nctBackendServiceUrl
} = require('../../config/appConfig');
const { getClientIp } = require('./auditLogService');

class NctBackendServiceError extends Error {
  constructor(message, { payload = null, statusCode = 500 } = {}) {
    super(message);
    this.name = 'NctBackendServiceError';
    this.payload = payload;
    this.statusCode = statusCode;
  }
}

function isNctBackendServiceConfigured() {
  return Boolean(nctBackendServiceUrl);
}

function buildBackendUrl(pathname) {
  return new URL(pathname.replace(/^\/+/, ''), `${nctBackendServiceUrl}/`).toString();
}

function buildRequestContext(req) {
  return {
    clientIp: getClientIp(req),
    lang: typeof req.lang === 'string' ? req.lang : '',
    sourcePath: req.originalUrl || req.path || '',
    userAgent: req.get ? req.get('user-agent') : req.headers?.['user-agent']
  };
}

async function requestBackend(pathname, body) {
  if (!isNctBackendServiceConfigured()) {
    throw new NctBackendServiceError('NCT backend service is not configured.', {
      statusCode: 503
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), nctBackendServiceTimeoutMs);

  try {
    const response = await fetch(buildBackendUrl(pathname), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(nctBackendServiceToken
          ? {
              Authorization: `Bearer ${nctBackendServiceToken}`
            }
          : {})
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    const text = await response.text();
    let payload = null;

    try {
      payload = text ? JSON.parse(text) : null;
    } catch (_error) {
      payload = null;
    }

    if (!response.ok) {
      throw new NctBackendServiceError(
        payload && payload.error ? payload.error : `Backend request failed with ${response.status}.`,
        {
          payload,
          statusCode: response.status
        }
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof NctBackendServiceError) {
      throw error;
    }

    throw new NctBackendServiceError(
      error && error.name === 'AbortError'
        ? 'NCT backend service timed out.'
        : (error && error.message ? error.message : 'NCT backend service request failed.'),
      {
        statusCode: 502
      }
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function requestBackendGet(pathname, searchParams = {}) {
  if (!isNctBackendServiceConfigured()) {
    throw new NctBackendServiceError('NCT backend service is not configured.', {
      statusCode: 503
    });
  }

  const url = new URL(buildBackendUrl(pathname));
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string' && value) {
      url.searchParams.set(key, value);
    }
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), nctBackendServiceTimeoutMs);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(nctBackendServiceToken
          ? {
              Authorization: `Bearer ${nctBackendServiceToken}`
            }
          : {})
      },
      signal: controller.signal
    });
    const text = await response.text();
    let payload = null;

    try {
      payload = text ? JSON.parse(text) : null;
    } catch (_error) {
      payload = null;
    }

    if (!response.ok) {
      throw new NctBackendServiceError(
        payload && payload.error ? payload.error : `Backend request failed with ${response.status}.`,
        {
          payload,
          statusCode: response.status
        }
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof NctBackendServiceError) {
      throw error;
    }

    throw new NctBackendServiceError(
      error && error.name === 'AbortError'
        ? 'NCT backend service timed out.'
        : (error && error.message ? error.message : 'NCT backend service request failed.'),
      {
        statusCode: 502
      }
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function requestFrontendRuntime(scope) {
  return requestBackendGet('/api/no-torsion/frontend-runtime', { scope });
}

async function prepareFormSubmission({ body, req }) {
  return requestBackend('/api/no-torsion/form/prepare', {
    body,
    requestContext: buildRequestContext(req)
  });
}

async function confirmFormSubmission({ confirmationPayload, confirmationToken }) {
  try {
    const payload = await requestBackend('/api/no-torsion/form/confirm', {
      confirmationPayload,
      confirmationToken
    });
    return {
      ...payload,
      statusCode: 200
    };
  } catch (error) {
    if (error instanceof NctBackendServiceError && error.payload && error.payload.resultsByTarget) {
      return {
        ...error.payload,
        statusCode: error.statusCode
      };
    }

    throw error;
  }
}

async function submitCorrection({ body, req }) {
  try {
    const payload = await requestBackend('/api/no-torsion/correction/submit', {
      body,
      requestContext: buildRequestContext(req)
    });
    return {
      ...payload,
      statusCode: 200
    };
  } catch (error) {
    if (error instanceof NctBackendServiceError && error.payload && error.payload.resultsByTarget) {
      return {
        ...error.payload,
        statusCode: error.statusCode
      };
    }

    throw error;
  }
}

async function translateText({ items, targetLanguage }) {
  return requestBackend('/api/no-torsion/translate-text', {
    items,
    targetLanguage
  });
}

module.exports = {
  confirmFormSubmission,
  isNctBackendServiceConfigured,
  NctBackendServiceError,
  prepareFormSubmission,
  requestFrontendRuntime,
  submitCorrection,
  translateText
};
