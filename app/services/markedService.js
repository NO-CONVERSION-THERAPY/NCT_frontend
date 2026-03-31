const fs = require('fs');
const path = require('path')
const { paths } = require('../../config/fileConfig');
const { marked, sanitizeHtml } = require('../../config/markedConfig');

// ==============================
// 读取 data.json（标签+项目数据）
// ==============================
const getPortTags = () => {
  const data = fs.readFileSync(paths.data, 'utf-8');
  return JSON.parse(data);
};

// ==============================
// 读取 MD 文件 → 转安全 HTML
// ==============================
const renderMarkdownFile = (name) => {
  const filePath = path.join(paths.prot, `${name}.md`);
  if (!fs.existsSync(filePath)) return '';

  const content = fs.readFileSync(filePath, 'utf-8');
  const rawHtml = config.marked.parse(content);
  return config.sanitizeHtml(rawHtml);
};

// ==============================
// 读取单篇报告（/blog/xxx）
// ==============================
const getSingleReport = (id) => {
  const mdPath = path.join(paths.prot, `${id}.md`);
  if (!fs.existsSync(mdPath)) return null;

  const content = fs.readFileSync(mdPath, 'utf-8');
  const rawHtml = marked.parse(content);

  return {
    title: id,
    html: sanitizeHtml(rawHtml)
  };
};

module.exports = {
  getPortTags,
  renderMarkdownFile,
  getSingleReport
};