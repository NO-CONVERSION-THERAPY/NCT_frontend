// Vercel 的 Express 自动识别要求入口文件直接导入 `express`。
require('express');

module.exports = require('./app/server');
