# 刘春茗 · UI/UX 交互作品集

交互式个人作品集网站，已配置相对路径与按类型分包构建输出（HTML / JS / CSS / MD / 图片 / SVG / 视频），可直接部署到 GitHub Pages。

## 本地开发与构建

```bash
npm install
npm run dev      # 启动本地开发预览
npm run build    # 构建生成按文件类型分类的 dist/ 静态部署目录
```

## `dist/` 打包目录结构

- `dist/index.html`：HTML 入口文件
- `dist/README.md`：Markdown 文档
- `dist/css/style.css`：合并压缩后的 CSS 样式文件
- `dist/js/app.js`：打包后的 JS 交互与组件脚本
- `dist/images/`：所有页面图片（WebP / JPG）
- `dist/svg/`：所有独立 SVG 图标与水印素材
- `dist/media/`：镜头转场视频（MP4）

## GitHub Pages 部署

- **直接部署静态成品**：将 `dist/` 目录中的全部内容上传到 GitHub 公开仓库根目录，在 **Settings → Pages** 中选择 `Deploy from a branch`（`main` 分支 `/ (root)`）。
- **自动构建部署**：推送完整源码仓库至 `main` 分支，在 **Settings → Pages** 中将 Source 设为 **GitHub Actions**（工作流已预置在 `.github/workflows/deploy.yml`）。
