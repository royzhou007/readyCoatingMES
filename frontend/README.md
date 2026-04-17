# MES Frontend

这是一个基于 `Vite` 的多页面静态前端项目，页面源码直接放在项目根目录下，以多个 `.html` 文件组成完整业务流程。

## 项目特点

- 入口页为 [index.html](/D:/project/mes/frontend/index.html)
- 其余业务页面同样作为独立页面参与构建
- 使用 [vite.config.js](/D:/project/mes/frontend/vite.config.js) 自动收集根目录下所有 `.html` 文件作为多页面入口
- 生产构建输出目录为 `dist`
- 已提供 [vercel.json](/D:/project/mes/frontend/vercel.json) 用于 Vercel 部署

## 环境要求

- Node.js `18` 或更高版本
- npm `9` 或更高版本

## 安装依赖

```bash
npm install
```

## 本地开发

启动 Vite 开发服务器：

```bash
npm run dev
```

默认会启动本地开发服务，首页入口为：

- `index.html`

项目是多页面结构，开发时也可以直接访问其他页面，例如：

- `jinguan.html`
- `derust.html`
- `coating.html`
- `packaging.html`
- `workorders.html`

## 生产构建

```bash
npm run build
```

构建完成后，产物输出到：

```bash
dist/
```

## 本地预览构建产物

```bash
npm run preview
```

## Vercel 部署

本项目已经适配为可直接部署到 Vercel。

建议配置如下：

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

项目中已经包含 [vercel.json](/D:/project/mes/frontend/vercel.json)，通常导入仓库后 Vercel 会自动识别这些配置。

## 目录说明

```text
frontend/
├─ index.html
├─ *.html
├─ package.json
├─ vite.config.js
├─ vercel.json
├─ .gitignore
└─ dist/
```

说明：

- 根目录下的每个 `.html` 文件都会被视为一个独立页面入口
- 页面之间主要通过相对路径互相跳转
- 当前项目大量使用 CDN 资源，例如 Tailwind、Font Awesome、Google Fonts

## 注意事项

- 如果新增页面，直接在根目录增加新的 `.html` 文件即可，Vite 构建时会自动纳入
- 如果页面里新增本地图片、脚本或样式文件，建议使用相对路径并在构建前确认路径存在
- `dist/`、`node_modules/` 和临时检查脚本已在 [.gitignore](/D:/project/mes/frontend/.gitignore) 中忽略
