# No-Torsion Old

这个目录现在是从 `No-Torsion` 根目录拆出来的独立 legacy 项目，保留：

- `Express 5` 服务端
- 旧版 `EJS + public/js` 前端
- 原有 standalone / worker / 测试与配置文件

## 运行

```bash
cd old
npm install
npm start
```

默认会以 `FRONTEND_VARIANT=legacy` 启动旧版页面。

## 测试

```bash
cd old
npm test
```

## 说明

- 根目录 `No-Torsion` 现在只负责新的静态 Vite + React 前端。
- 新的表单提交流程已经迁到 `nct-api-sql-sub` 的 Hono 后端。
- 如果你还需要旧版 Express 页面或旧提交流程，请在这个 `old/` 项目里维护。
