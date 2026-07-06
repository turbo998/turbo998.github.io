# Qi Chen — Personal Site / 个人网站

双语（中/英）静态个人网站：技术作品、职业履历、AI 趋势分享。纯 HTML/CSS/JS，无构建步骤。

## 结构

```
website/
├── index.html          # 英文主页
├── zh.html             # 中文主页
├── style.css           # 共享样式（浅色、编号分节、技术报告风格）
├── main.js             # GitHub 仓库实时拉取 + 静态兜底数据
├── assets/
│   └── photo.jpg       # 个人照片（导航头像 / 档案卡 / OG 分享图）
├── articles/
│   ├── harness-engineering.html      # 第一篇文章（中文）
│   ├── harness-engineering.en.html   # 第一篇文章（英文）
│   ├── template.html                 # 文章模板（中文）
│   └── template.en.html              # 文章模板（英文）
└── README.md
```

## 本地预览

```bash
cd website
python -m http.server 8765
# 打开 http://localhost:8765
```

## 部署到 GitHub Pages（推荐）

1. 在 GitHub 新建仓库（如 `turbo998.github.io`，则网址直接是 https://turbo998.github.io）：

```bash
cd website
git init
git add .
git commit -m "Personal site: bilingual portfolio + GitHub showcase"
git remote add origin https://github.com/turbo998/turbo998.github.io.git
git push -u origin main
```

2. 仓库 Settings → Pages → Source 选 `main` 分支根目录，保存。
3. 几分钟后访问 https://turbo998.github.io 。

若用其他仓库名（如 `homepage`），网址为 `https://turbo998.github.io/homepage/`。

## 写新文章

1. 复制 `articles/template.html` 为 `articles/<slug>.html`（英文版复制 `template.en.html` 命名为 `<slug>.en.html`），可参考已发布的 `harness-engineering.html`。
2. 替换标题、meta description、正文；保持编号分节（01/02/03…）风格。
3. 在 `index.html` / `zh.html` 的 Writing（分享与著作）区块加一个 `.pub` 条目链接过去。

## GitHub 作品区维护

`main.js` 会实时调用 GitHub API 拉取 `turbo998` 的公开仓库（按更新时间排序，Fork 除外）。无需手动更新；如需：

- **置顶精选**：编辑 `main.js` 里的 `FEATURED` 数组（按数组顺序展示在最前）。
- **中文描述**：编辑 `ZH_DESC` 映射（中文页优先显示这里的描述）。
- **兜底快照**：API 限流/离线时展示 `FALLBACK` 数组，可定期同步一次。
