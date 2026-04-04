require('dotenv').config();

function resolveTrustProxy(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (!normalizedValue || normalizedValue === 'false' || normalizedValue === 'off' || normalizedValue === 'no') {
    return false;
  }

  if (normalizedValue === 'true' || normalizedValue === 'on' || normalizedValue === 'yes') {
    return true;
  }

  if (/^\d+$/.test(normalizedValue)) {
    return Number.parseInt(normalizedValue, 10);
  }

  return value.trim();
}

// 所有运行时环境变量统一从这里读，避免业务代码四处直接碰 process.env。
const debugMod = process.env.DEBUG_MOD || 'false';
const title = process.env.TITLE;
const formDryRun = process.env.FORM_DRY_RUN === 'true';
const submitRateLimitMax = Number(process.env.SUBMIT_RATE_LIMIT_MAX || 5);
const formId = process.env.FORM_ID || '1FAIpQLScggjQgYutXQrjQDrutyxL0eLaFMktTMRKsFWPffQGavUFspA';
const googleFormUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
const appPort = Number(process.env.PORT || 3000);
const publicMapDataUrl = process.env.PUBLIC_MAP_DATA_URL || 'https://nct.hosinoneko.me/api/map-data';
const siteUrl = String(process.env.SITE_URL || 'https://nct.hosinoneko.me').replace(/\/+$/, '');
const apiUrl = debugMod === 'true' || !googleScriptUrl ? publicMapDataUrl : '/api/map-data';
const trustProxy = resolveTrustProxy(process.env.TRUST_PROXY || (process.env.VERCEL ? '1' : 'false'));

module.exports = {
  appPort,
  apiUrl,
  debugMod,
  formDryRun,
  formId,
  googleFormUrl,
  googleScriptUrl,
  publicMapDataUrl,
  siteUrl,
  submitRateLimitMax,
  trustProxy,
  title
};
