function normalizeIp(value) {
  const normalizedValue = String(value || '').trim();

  if (!normalizedValue) {
    return 'unknown';
  }

  return normalizedValue.replace(/^::ffff:/, '');
}

// 只使用 Express 已解析过的客户端地址，避免直接信任可伪造的代理头。
function getClientIp(req) {
  return normalizeIp(req.ip || req.socket?.remoteAddress || 'unknown');
}

// 审计日志只记录提交行为的关键元信息，不直接打印整份表单内容。
function logAuditEvent(req, event, details = {}) {
  const entry = {
    time: new Date().toISOString(),
    ip: getClientIp(req),
    method: req.method,
    path: req.originalUrl || req.path,
    event,
    ...details
  };

  console.info('[audit]', JSON.stringify(entry));
}

module.exports = {
  getClientIp,
  logAuditEvent
};
