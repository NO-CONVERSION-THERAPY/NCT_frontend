const ejs = require('ejs');
const fs = require('fs');
const nodePath = require('path');

function collectEjsTemplatePaths(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = nodePath.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectEjsTemplatePaths(absolutePath);
    }

    return absolutePath.endsWith('.ejs') ? [absolutePath] : [];
  });
}

function primeEjsTemplateCache(viewsDirectory) {
  const templatePaths = collectEjsTemplatePaths(viewsDirectory);

  // EJS 模板在启动阶段预编译并写入缓存，减轻首个请求的模板解析开销。
  for (const templatePath of templatePaths) {
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = ejs.compile(templateSource, {
      cache: true,
      filename: templatePath,
      views: [viewsDirectory]
    });

    ejs.cache.set(templatePath, compiledTemplate);
  }
}

module.exports = {
  primeEjsTemplateCache
};
