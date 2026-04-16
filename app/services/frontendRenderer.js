function escapeInlineJson(json) {
  return String(json || '')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function serializeInlineJson(value) {
  return escapeInlineJson(JSON.stringify(value));
}

function shouldUseReactFrontend(req) {
  return Boolean(req && req.app && req.app.locals && req.app.locals.frontendVariant === 'react');
}

function buildReactBootstrap({ req, res, title, pageType, pageProps }) {
  return {
    apiUrl: pageProps && typeof pageProps.apiUrl === 'string' ? pageProps.apiUrl : '',
    assetVersion: res.locals.assetVersion || '',
    currentPath: req.originalUrl || req.path || '/',
    i18n: res.locals.clientMessages || {},
    lang: res.locals.lang || 'zh-CN',
    languageOptions: res.locals.languageOptions || [],
    pageProps: pageProps || {},
    pageTitle: title || '',
    pageType,
    siteName: req.t('common.siteName')
  };
}

function buildReactViewModel({ req, res, title, pageType, pageProps, pageRobots, structuredData }) {
  const reactAssets = req.app && req.app.locals ? req.app.locals.reactFrontendAssets || {} : {};

  return {
    pageRobots,
    reactBootstrapJson: serializeInlineJson(buildReactBootstrap({
      req,
      res,
      title,
      pageType,
      pageProps
    })),
    reactScriptHref: reactAssets.scriptHref || '',
    reactStyleHref: reactAssets.styleHref || '',
    structuredDataJson: structuredData ? serializeInlineJson(structuredData) : '',
    title
  };
}

function renderFrontendPage({
  legacyData = {},
  legacyView,
  pageProps = {},
  pageRobots,
  pageType,
  req,
  res,
  structuredData,
  title
}) {
  const resolvedTitle = title || legacyData.title || req.t('common.siteName');

  if (shouldUseReactFrontend(req) && pageType) {
    return res.render('react_app', buildReactViewModel({
      req,
      res,
      title: resolvedTitle,
      pageType,
      pageProps,
      pageRobots,
      structuredData
    }));
  }

  return res.render(legacyView, {
    ...legacyData,
    title: resolvedTitle
  });
}

module.exports = {
  renderFrontendPage,
  shouldUseReactFrontend
};
