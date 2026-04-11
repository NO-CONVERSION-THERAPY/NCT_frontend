const fs = require('fs');
const path = require('path');

function createBundledStaticMiddleware({
  rootDirectory,
  cacheControl = 'public, max-age=0'
} = {}) {
  if (!(typeof rootDirectory === 'string' && rootDirectory.trim())) {
    throw new Error('createBundledStaticMiddleware requires a rootDirectory.');
  }

  const normalizedRoot = path.resolve(rootDirectory);

  return function bundledStaticMiddleware(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    const requestPath = typeof req.path === 'string'
      ? req.path
      : '/';

    if (!requestPath || requestPath === '/') {
      return next();
    }

    const relativePath = requestPath.replace(/^\/+/, '');

    if (!relativePath || relativePath.includes('\0')) {
      return next();
    }

    const absolutePath = path.resolve(normalizedRoot, relativePath);
    const insideRoot = absolutePath === normalizedRoot
      || absolutePath.startsWith(`${normalizedRoot}${path.sep}`);

    if (!insideRoot) {
      return next();
    }

    let fileStats;

    try {
      fileStats = fs.statSync(absolutePath);
    } catch (error) {
      if (error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')) {
        return next();
      }

      return next(error);
    }

    if (!fileStats.isFile()) {
      return next();
    }

    try {
      const fileBuffer = fs.readFileSync(absolutePath);
      const fileExtension = path.extname(absolutePath) || 'application/octet-stream';

      res.type(fileExtension);
      res.set('Cache-Control', cacheControl);
      res.set('Last-Modified', fileStats.mtime.toUTCString());

      return res.send(fileBuffer);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = {
  createBundledStaticMiddleware
};
