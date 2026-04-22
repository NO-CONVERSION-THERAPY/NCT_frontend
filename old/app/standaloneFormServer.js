const app = require('./standaloneFormApp');
const {
  appPort,
  debugMod,
  formDryRun,
  formId,
  formProtectionSecretConfigured,
  formSubmitTarget,
  googleScriptUrl,
  maintenanceMode,
  nctBackendServiceUrl,
  rateLimitRedisUrl
} = require('../config/appConfig');

module.exports = app;

if (require.main === module) {
  app.listen(appPort, () => {
    if (debugMod === 'true') {
      console.warn('警告！当前正在运行独立表单 Workers 入口的调试模式。');
    }
    if (maintenanceMode) {
      console.warn('警告！MAINTENANCE_MODE=true，独立表单将返回 503 维护页。');
    }
    if (!googleScriptUrl) {
      console.warn('警告！未设置 GOOGLE_SCRIPT_URL，独立表单自动补全将直接使用公开地图 API。');
    }
    if (!formProtectionSecretConfigured) {
      console.warn('警告！未设置 FORM_PROTECTION_SECRET，独立表单正在使用派生密钥。');
    }
    if (!formDryRun && (formSubmitTarget === 'google' || formSubmitTarget === 'both') && !formId) {
      console.warn('警告！FORM_DRY_RUN=false 但缺少 FORM_ID，独立表单正式提交会失败。');
    }
    if (rateLimitRedisUrl) {
      console.log('独立表单已启用 Redis 共享限流存储。');
    }
    if (nctBackendServiceUrl) {
      console.log('独立表单后端服务已切换到：', nctBackendServiceUrl);
    } else {
      console.warn('提示：未配置 NCT_BACKEND_SERVICE_URL，独立表单仍使用本地后端逻辑。');
    }

    console.log(`Standalone form server is running at http://localhost:${appPort}`);
  });
}
