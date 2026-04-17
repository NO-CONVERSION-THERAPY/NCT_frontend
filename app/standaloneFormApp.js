const express = require('express');
const ejs = require('ejs');
const helmet = require('helmet');
const {
  apiUrl,
  debugMod,
  formDryRun,
  formSubmitTarget,
  formProtectionMaxAgeMs,
  formProtectionMinFillMs,
  formProtectionSecret,
  googleFormUrl,
  googleScriptUrl,
  isWorkersRuntime,
  maintenanceMode,
  maintenanceNotice,
  maintenanceRetryAfterSeconds,
  mapDataNodeTransportOverrides,
  mapDataUpstreamTimeoutMs,
  mapReadRateLimitMax,
  pageReadRateLimitMax,
  publicMapDataUrl,
  rateLimitRedisUrl,
  submitRateLimitMax,
  title,
  trustProxy
} = require('../config/appConfig');
const { paths } = require('../config/fileConfig');
const { helmetConfig, requestBodyLimits } = require('../config/security');
const { createBundledStaticMiddleware } = require('./middleware/bundledStatic');
const { createI18nMiddleware } = require('./middleware/i18n');
const { createMaintenanceMiddleware } = require('./middleware/maintenance');
const createFormRoutes = require('./routes/formRoutes');
const createStandaloneFormApiRoutes = require('./routes/standaloneFormApiRoutes');
const createStandaloneFormPageRoutes = require('./routes/standaloneFormPageRoutes');
const { primeEjsTemplateCache } = require('./services/templateCache');

const configuredAssetVersion = String(process.env.ASSET_VERSION || '').trim();
const assetVersion = configuredAssetVersion && configuredAssetVersion !== '0'
  ? configuredAssetVersion
  : String(Date.now());

const app = express();

app.disable('x-powered-by');
app.locals.assetVersion = assetVersion;
app.locals.frontendVariant = 'legacy';
app.locals.frontendVariantRequested = 'legacy';
app.locals.reactFrontendBuilt = false;
app.locals.reactFrontendAssets = {
  scriptHref: '',
  styleHref: ''
};
app.set('trust proxy', trustProxy);
app.use(helmet(helmetConfig));
app.use(createI18nMiddleware());

app.set('views', paths.views);
if (isWorkersRuntime) {
  app.use(createBundledStaticMiddleware({ rootDirectory: paths.public }));
} else {
  app.use(express.static(paths.public));
}
app.use(createMaintenanceMiddleware({
  maintenanceMode,
  maintenanceNotice,
  maintenanceRetryAfterSeconds,
  title
}));
app.engine('ejs', (filePath, data, callback) => ejs.renderFile(filePath, data, {
  cache: true,
  views: [paths.views]
}, callback));
app.enable('view cache');
app.set('view engine', 'ejs');
primeEjsTemplateCache(paths.views);

app.use(express.urlencoded({ extended: true, limit: requestBodyLimits.urlencoded }));
app.use(express.json({ limit: requestBodyLimits.json }));

app.use(createStandaloneFormPageRoutes({
  apiUrl,
  debugMod,
  formProtectionSecret,
  googleFormUrl,
  pageReadRateLimitMax,
  rateLimitRedisUrl,
  title
}));
app.use(createFormRoutes({
  debugMod,
  enabledFlowNames: ['workerStandalone'],
  formDryRun,
  formSubmitTarget,
  formProtectionMaxAgeMs,
  formProtectionMinFillMs,
  formProtectionSecret,
  googleFormUrl,
  rateLimitRedisUrl,
  submitRateLimitMax,
  title
}));
app.use(createStandaloneFormApiRoutes({
  googleScriptUrl,
  mapDataNodeTransportOverrides,
  mapDataUpstreamTimeoutMs,
  mapReadRateLimitMax,
  publicMapDataUrl,
  rateLimitRedisUrl
}));

app.use((req, res) => {
  res.status(404).type('text/plain; charset=utf-8').send(req.t('common.notFound'));
});

module.exports = app;
