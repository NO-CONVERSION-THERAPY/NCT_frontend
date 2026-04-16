const { createAbsoluteUrl } = require('./sitemapService');

function generateRobotsTxt(siteUrl) {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Crawl-delay: 5',
    `Sitemap: ${createAbsoluteUrl(siteUrl, '/sitemap.xml')}`
  ];

  return `${lines.join('\n')}\n`;
}

module.exports = {
  generateRobotsTxt
};
