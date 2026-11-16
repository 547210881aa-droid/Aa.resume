# 刘春茗 · UI/UX 交互作品集

面向 GitHub Pages 静态部署的交互式个人作品集网站，包含首屏拖拽工牌微信二维码交互、丝滑镜头切屏动效、叮咚买菜运营视觉长图、窝友自驾 UX 项目展示，以及 WebGL2 全息边框生活切片相册。

## 打包目录结构（用于 GitHub Pages 部署）

进入已打包好的 `dist/` 目录即可看到按文件类型分开整理的完整静态网站：

```text
dist/
├── index.html          # 页面入口 HTML
├── README.md           # 说明文档（MD）
├── .nojekyll           # GitHub Pages 静态服务配置
├── css/
│   └── style.css       # 样式表与本地化嵌入字体（CSS）
├── js/
│   └── app.js          # 交互脚本、React 与 WebGL2 卡片核心（JS）
├── images/             # 所有 WebP / JPG 图片（含 portfolio、life、名片头像）
├── svg/                # 页面内所有 SVG 图标与水印文件
└── media/
    └── hero_trans.mp4  # 镜头转场视频
```

## GitHub Pages 上线步骤

### 方式一：直接上传 `dist` 纯静态目录（推荐，最简单）
1. 在 GitHub 新建一个公开仓库（Public）。
2. 打开本项目的 `dist/` 文件夹，将里面的全部文件与子文件夹（`index.html`、`README.md`、`css/`、`js/`、`images/`、`svg/`、`media/`）上传至仓库根目录。
3. 打开仓库 **Settings → Pages → Build and deployment**，将 **Source** 选为 **Deploy from a branch**（`main` 分支 `/ (root)`）并保存。
4. 等待约 1 分钟，即可通过 `https://你的用户名.github.io/仓库名/` 公开访问。

### 方式二：上传完整源码并通过 GitHub Actions 自动构建
1. 将整个项目源码推送到 GitHub 仓库的 `main` 或 `master` 分支。
2. 打开仓库 **Settings → Pages → Build and deployment**，将 **Source** 选为 **GitHub Actions** 即可自动完成构建与发布。
