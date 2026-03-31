const path = require('path');
const marked = require('marked');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// 初始化 HTML 安全过滤工具
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// 自定义 Markdown 渲染器（图片转 figure 标签）
const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  return `
    <figure>
      <img src="${href}" alt="${text}">
      <figcaption>${text}</figcaption>
    </figure>
  `;
};

// Marked 配置
marked.setOptions({
  renderer,
  mangle: false,
  headerIds: false
});


module.exports = {
  purify,
  marked,
  sanitizeHtml: (html) => purify.sanitize(html)
};