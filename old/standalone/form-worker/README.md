# Standalone Form Worker

这个目录是独立表单填写页的专用 Workers 入口包。它会把表单页面直接挂在 `/`，并复用主仓库中的服务端校验、地区联动、自动补全和提交逻辑。

## 目录内容

- `worker.mjs`：Cloudflare Workers 入口
- `wrangler.jsonc`：专用 Workers 配置
- `.dev.vars.example`：本地开发变量示例
- `package.json`：独立调试 / 部署脚本

## 本地调试

1. 在当前目录复制 `.dev.vars.example` 为 `.dev.vars`
2. 填入至少这些变量：
   - `FORM_PROTECTION_SECRET`
   - `PUBLIC_MAP_DATA_URL` 或 `GOOGLE_SCRIPT_URL`

如果你想覆盖内置默认主表单，也可以额外填写：

- `FORM_ID` 或 `FORM_ID_ENCRYPTED`
3. 运行：

```bash
npm run dev
```

或者从仓库根目录运行：

```bash
npm run dev:workers:standalone-form
```

## 部署

```bash
npm run deploy
```

或者从仓库根目录运行：

```bash
npm run deploy:workers:standalone-form
```

## GitHub 直连部署到 Workers

如果你已经把整个仓库上传到 GitHub，推荐在 Cloudflare 里单独新建一个 Worker，并把它连接到同一个仓库。这个独立 Worker 只部署当前目录对应的问卷入口，不影响主站的其它入口。

### 1. 连接仓库

1. 进入 Cloudflare `Workers & Pages`
2. 新建一个 Worker
3. 选择 `Connect to Git`
4. 选择你的 GitHub 仓库和生产分支，例如 `main`

### 2. Build 设置

在 Worker 的 `Settings > Build` 中推荐这样填写：

- `Root directory`：`.`
- `Build command`：留空
- `Deploy command`：`npm run deploy:workers:standalone-form`
- `Non-production branch deploy command`：`npx wrangler versions upload -c standalone/form-worker/wrangler.jsonc`

说明：

- `Root directory` 需要指向仓库根目录，而不是 `standalone/form-worker`
- 原因是这个独立问卷 Worker 会复用根目录下的服务端代码、模板、静态资源和依赖

### 3. 运行时变量

在 Worker 的 `Settings > Variables & Secrets` 中配置运行时变量，不要只填到 Build Variables。

建议至少配置：

- `RUNTIME_TARGET=workers`
- `FRONTEND_VARIANT=legacy`
- `FORM_DRY_RUN=false`
- `FORM_SUBMIT_TARGET=google`
- `FORM_PROTECTION_SECRET`：使用 Secret
- `FORM_ID` 或 `FORM_ID_ENCRYPTED`：可选；留空时会使用内置默认主表单
- `SITE_URL=https://<your-worker>.<your-subdomain>.workers.dev`
- `DEBUG_MOD=false`
- `PUBLIC_MAP_DATA_URL` 或 `GOOGLE_SCRIPT_URL`

如果你只是先让问卷单独上线，推荐先使用：

- `FORM_SUBMIT_TARGET=google`

这样不需要先配置 D1，就可以先把提交链路跑通。

### 4. 可选：启用 D1 落库

如果你希望问卷提交同时写入 D1：

1. 创建 D1 数据库
2. 把返回的 `database_name` 和 `database_id` 填入当前目录的 `wrangler.jsonc`
3. 运行远程 migrations

示例命令：

```bash
npx wrangler d1 create <database-name>
npx wrangler d1 migrations apply <database-name> --remote --config standalone/form-worker/wrangler.jsonc
```

完成后，再把 `FORM_SUBMIT_TARGET` 改成 `d1` 或 `both`。

### 5. 部署结果

部署完成后，这个独立 Worker 的首页 `/` 就是问卷填写页。

## 说明

- 这个包使用了根目录的源码、模板、D1 migrations 和静态资源，但部署入口、Wrangler 配置和本地 `.dev.vars` 都独立放在这里。
- `wrangler.jsonc` 通过 `base_dir` 指向仓库根目录，只把独立表单实际需要的模板和静态文件打进 bundle。
- Cloudflare 文档说明：`base_dir` 会决定 `rules` 的匹配根目录，`.dev.vars` 需要与 Wrangler 配置文件位于同一目录。
