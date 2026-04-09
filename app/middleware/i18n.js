const {
  defaultLanguage,
  getLanguageOptions,
  getMessages,
  parseCookieHeader,
  resolveLanguage,
  serializeLanguageCookie,
  translate
} = require('../../config/i18n');

function resolveAssetVersion(value) {
  const normalizedValue = String(value || '').trim();
  return normalizedValue && normalizedValue !== '0'
    ? normalizedValue
    : String(Date.now());
}

function createI18nMiddleware() {
  return function i18nMiddleware(req, res, next) {
    const cookies = parseCookieHeader(req.headers.cookie);
    const queryLanguage = resolveLanguage(req.query.lang);
    const cookieLanguage = resolveLanguage(cookies.lang);
    // 链接参数优先于 cookie，保证用户点进任意带 lang 的链接都能立即切换语言。
    const language = queryLanguage || cookieLanguage || defaultLanguage;

    if (queryLanguage && queryLanguage !== cookieLanguage) {
      res.append('Set-Cookie', serializeLanguageCookie(queryLanguage));
    }

    req.lang = language;
    req.t = (key, variables) => translate(language, key, variables);

    // 模板和前端脚本共享同一份本地化上下文，减少每个页面单独拼装。
    res.locals.lang = language;
    res.locals.t = req.t;
    res.locals.assetVersion = resolveAssetVersion(
      req.app && req.app.locals ? req.app.locals.assetVersion : ''
    );
    res.locals.clientMessages = getMessages(language);
    res.locals.languageOptions = getLanguageOptions(language);

    next();
  };
}

module.exports = {
  createI18nMiddleware,
  resolveAssetVersion
};
