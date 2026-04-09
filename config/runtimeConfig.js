const path = require('path');

function normalizeRuntimeTarget(value) {
  return String(value || '').trim().toLowerCase();
}

function isLikelyWorkersRuntimeFromGlobals() {
  return typeof navigator !== 'undefined'
    && navigator
    && navigator.userAgent === 'Cloudflare-Workers';
}

function isWorkersRuntime() {
  const runtimeTarget = normalizeRuntimeTarget(process.env.RUNTIME_TARGET);

  // 运行时识别尽量宽松一些，便于本地调试、Workers 构建和未来迁移时共用。
  return runtimeTarget === 'workers'
    || String(process.env.CF_PAGES || '').trim() === '1'
    || isLikelyWorkersRuntimeFromGlobals();
}

function normalizeBundleRelativePath(relativePath) {
  return String(relativePath || '')
    .replace(/^\.?\/*/, '')
    .replace(/\\/g, '/');
}

function resolveProjectPath(relativePath) {
  if (isWorkersRuntime()) {
    // Workers 打包后静态文件位于 /bundle 下，不能继续依赖 Node 侧的 __dirname 相对关系。
    return path.posix.join('/bundle', normalizeBundleRelativePath(relativePath));
  }

  return path.join(__dirname, '..', relativePath);
}

module.exports = {
  isWorkersRuntime,
  resolveProjectPath
};
