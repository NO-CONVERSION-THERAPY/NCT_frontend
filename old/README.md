# Legacy Frontend Backup

这个目录用于保留 React 改造前的旧前端，便于随时恢复和对照。

当前备份内容：

- `old/frontend-legacy/views`
- `old/frontend-legacy/public/css`
- `old/frontend-legacy/public/js`
- `old/frontend-legacy/public/favicon.svg`

切换回旧前端的方法：

1. 在 `.env` 中设置 `FRONTEND_VARIANT="legacy"`
2. 重启服务

切换回新版 React 前端的方法：

1. 运行 `npm run frontend:build`
2. 在 `.env` 中设置 `FRONTEND_VARIANT="react"`
3. 重启服务

说明：

- 旧前端是按改造前目录结构原样复制的，不建议直接在这里继续开发。
- 正在使用的服务端会根据 `FRONTEND_VARIANT` 决定渲染 React 新版还是 legacy 旧版。
