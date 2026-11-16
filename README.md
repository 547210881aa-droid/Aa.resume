# Haldoren 作品集 · GitHub Pages 部署包

此包为编译后的静态站点，包含 HTML、JS、CSS、图片、SVG 和转场视频，无需安装依赖。

## 部署
1. 解压 github-pages-complete.zip，把内部全部文件上传到 GitHub 仓库根目录，确保 index.html 在根目录。
2. 在仓库 Settings → Pages 选择 Deploy from a branch，选择 main 分支与 / (root)，保存。
3. 等待 GitHub Pages 发布后访问提供的网址。

## 文件
- index.html：页面结构。
- js/：已编译 JavaScript（包含 React 运行时）。
- css/：样式。
- images/：网站图片。
- svg/：独立 SVG 及内联 SVG 导出副本。内联版本为保留原样式仍留在页面中；导出副本可能需要页面 CSS。
- media/：原始动画视频，部署时不可省略。

分包仅用于分类下载；部署推荐使用完整包。没有包含 AI Studio 历史截图、环境变量或开发依赖。
原始 TypeScript/TSX 保留在用户提供的原始压缩包中。
