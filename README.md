# Qi Chen — Personal Site / 个人网站

双语（中/英）静态个人网站：技术作品、职业履历、AI 趋势分享。纯 HTML/CSS/JS，无构建步骤。

## 结构

```
website/
├── index.html          # 英文主页
├── zh.html             # 中文主页
├── writing.html        # Writing & Talks（英文）
├── zh-writing.html     # 分享与著作（中文）
├── style.css           # 共享样式（浅色、编号分节、技术报告风格）
├── main.js             # GitHub 仓库实时拉取 + 静态兜底数据
├── assets/
│   └── photo.jpg       # 个人照片（导航头像 / 档案卡 / OG 分享图）
├── articles/
│   ├── harness-engineering.html      # 第一篇文章（中文）
│   ├── harness-engineering.en.html   # 第一篇文章（英文）
│   ├── template.html                 # 文章模板（中文）
│   └── template.en.html              # 文章模板（英文）
├── workshops/
│   └── azure-vm-modernization/        # Azure VM 合作伙伴培训完整离线包
│       ├── workshop.html             # 同页三语课程
│       ├── calculator.html           # 本地评估计算器
│       ├── demo.html                 # 六案例自动演示入口
│       ├── Azure-VM-Partner-Workshop.zip  # 原始已核验下载包
│       ├── README.md                 # 字段口径、边界、维护说明
│       ├── sample-data/              # 三语模拟数据及 HTML/PDF 报告
│       ├── templates/                # CSV/XLSX 导入模板
│       ├── screenshots/              # 真实离线浏览器截图
│       ├── source/                   # 源码、测试与依赖 lockfile
│       └── third-party-licenses/     # 配合 THIRD_PARTY_NOTICES.txt 保留许可
└── README.md
```

## 本地预览

```bash
python -m http.server 8765
# 打开 http://localhost:8765
```

在仓库根目录运行上述命令；无需构建站点或 Workshop 页面。

## Workshop / 合作伙伴培训

分类：**分享与著作 / Writing & Talks → Workshop / 合作伙伴培训（Partner training）**。
主题标签：**Azure infrastructure（Azure 基础设施）· VM modernization（VM 现代化）· Cost optimization（成本优化）**。

中英文入口分别位于 [分享与著作](zh-writing.html) 和 [Writing & Talks](writing.html)，首页沿用现有导航链接。

| 资源 | 仓库相对路径 |
| --- | --- |
| 三语课程 | [workshops/azure-vm-modernization/workshop.html](workshops/azure-vm-modernization/workshop.html?lang=zh-CN) |
| 本地评估计算器 | [workshops/azure-vm-modernization/calculator.html](workshops/azure-vm-modernization/calculator.html?lang=zh-CN) |
| 自动演示 | [workshops/azure-vm-modernization/demo.html](workshops/azure-vm-modernization/demo.html?lang=zh-CN) |
| 完整离线 ZIP | [workshops/azure-vm-modernization/Azure-VM-Partner-Workshop.zip](workshops/azure-vm-modernization/Azure-VM-Partner-Workshop.zip) |
| 使用、数据口径与维护 | [workshops/azure-vm-modernization/README.md](workshops/azure-vm-modernization/README.md) |

三份 HTML 均自包含；下载 ZIP 并解压，直接用较新的 Edge/Chrome 双击 `azure-vm-partner-workshop` 目录内的 HTML，不需要服务器、Node.js、联网、登录或 Azure 权限。保留完整目录以访问样例、模板、报告和跨工具链接。页面顶部可原地切换简体 / 繁體 / English，也可通过 `?lang=zh-CN`、`?lang=zh-TW`、`?lang=en` 指定初始语言。GitHub 仓库文件视图不执行 HTML；在线页面是否可用取决于现有静态站点部署，本次上传不启用 GitHub Pages，也不更改仓库私有可见性。

**边界与隐私：** 客户输入在浏览器本地处理，不上传、不默认缓存到浏览器存储、不写入后端；刷新或关闭会丢失未导出的数据。所有样例、客户名称和价格都是虚构教学数据。原始材料中的具体涨幅、日期及商务处理规则尚未获得足够公开资料核验，仅用于明确标注的培训情景，**不是已确认的 Azure 政策或官方报价**。计算结果是固定用量比较，不是实际账单预测或部署许可；合同价、区域/配额/容量、应用性能和迁移前提需要单独验证。默认导出报告已脱敏，外发前仍需审查。

发布包不包含原始邮件、内部邮件摘录或链接、内部客户清单、凭据、`node_modules`、构建缓存或测试输出。源码维护命令见包内 README；运行现成页面无需安装依赖。第三方许可与通知随包保留。

下载 ZIP 原样保留，共 9,807,438 字节、256 个文件条目，含 37 张 PNG 截图；SHA-256：
`ba996b06697fcf0c926d9fdbf14ec67c5d76a2729cac291a2bd65648391332b5`。

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
3. 在 `writing.html` / `zh-writing.html` 的 Writing（分享与著作）列表中加一个 `.pub` 条目链接过去；首页已经链接到这两个分类页。

## GitHub 作品区维护

`main.js` 会实时调用 GitHub API 拉取 `turbo998` 的公开仓库（按更新时间排序，Fork 除外）。无需手动更新；如需：

- **置顶精选**：编辑 `main.js` 里的 `FEATURED` 数组（按数组顺序展示在最前）。
- **中文描述**：编辑 `ZH_DESC` 映射（中文页优先显示这里的描述）。
- **兜底快照**：API 限流/离线时展示 `FALLBACK` 数组，可定期同步一次。
