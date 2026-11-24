# 企业级 Agent 生成式动态 UI（Generative UI / A2UI / MCP Apps）渲染技术栈选型指南：声明式 JSON 组件树 + Vega-Lite/ELK 图谱 DSL + 预热 CSP 沙箱 vs LLM 裸写 HTML/JS（第 224 项工作台）

> **核心选型结论速览**：当 Cloud & AI Solution Architect 为企业构建 FinOps 成本助手、云架构巡检 Copilot、BI 数据分析师或 CRM 审批 Agent 时，业务方迫切希望 Agent 直接在对话流中输出 **可交互的动态可视化界面（Generative UI）**，而非满屏枯燥的 Markdown 表格。
> **严禁在生产环境中让大模型每轮对话从零手写 400 行裸 HTML/Tailwind/Chart.js 代码直接注入页面，也严禁频繁拉起云端 Python 容器画静态 Matplotlib PNG 截图**——这两类粗放方案会导致三大工程灾难：① **首屏长达 `7,400ms–8,500ms` 的白屏等待与高昂 Token/容器账单（`$0.018–$0.032/轮`）**；② **`31.5%` 的样式崩坏率（暗色模式白底白字、移动端溢出、4K 屏静态位图发虚）**；③ **致命的提示词注入 XSS 与企业敏感数据外泄风险**。
> 架构师应构建 **“88 / 10 / 2 三级企业生成式 UI 渲染架构”**：
> 1. **Tier 1（占 88% 常规交互轮次）：`A2UI / AG-UI` 声明式 JSON 组件树流式渲染（`165ms` 首屏）**：宿主前端预编译 40+ 个严格遵循企业 Figma Design Tokens 的原生 React/D3/Rive 组件，大模型仅流式输出 `180 Tokens` 的强类型 JSON 参数，实现 **44.8倍首屏提速、`100%` 视觉规范合规与 `-84.4%` Token 降本**；
> 2. **Tier 2（占 10% 复杂拓扑与多维图表）：`Vega-Lite / ELK.js` 声明式可视化 DSL（`210ms` 首屏）**：浏览器端 SVG/Canvas 2D 直接渲染可框选下钻的矢量架构拓扑与统计图，一键导出可编辑 PPTX；
> 3. **Tier 3（占 2% 定制计算器/微件）：预热双层 `CSP default-src 'none'` 零外联 MCP Apps 安全沙箱（`320ms` 首屏，年省 `+$2.36M`）**！

---

## 一、 📌 核心选型结论速览

| 评估维度 | 方案 A：云端 Python 容器生成静态图片 (`Code Interpreter Matplotlib PNG`) | 方案 B：LLM 每轮裸写全量 HTML/JS 代码 (`Raw HTML/Tailwind Iframe`) | 方案 C：三级混合架构（`88% A2UI 声明式组件流` + `10% Vega/ELK DSL` + `2% 预热 CSP 沙箱`）（推荐） |
| --- | --- | --- | --- |
| **首屏可交互渲染延迟 (TTFP)** | `8,500 ms`（容器启动 + Python 绘图 + 上传） | `7,400 ms`（必须等 3,500 Token 闭合 `</html>` 才能显示） | **`165 ms – 320 ms`（Partial-JSON 边流式吐字边渲染骨架与图表）** |
| **企业设计规范与暗色模式合规** | `62.0%`（字号不统一、4K 屏锯齿发虚） | `68.5%`（`31.5%` 概率出现白底白字或布局错位） | **`99.5% – 100.0%`（宿主预编译组件 100% 绑定企业 Design Tokens）** |
| **交互下钻与双向状态回传** | **零交互**（死图片，改个筛选条件又要等 8.5 秒） | 脆弱（点按钮往往报错或重跑整段 HTML） | **原生 60fps 悬停/下钻 + 强类型 `onAction` 事件秒级回传 Agent** |
| **企业安全与防数据外泄 (CSP)** | 安全但笨重 | ⛔ **高危（Prompt Injection 可窃取 Cookie 外传）** | **100% 免疫（Tier 1/2 无脚本执行；Tier 3 强制 `default-src 'none'`）** |
| **单轮生成式 UI 综合成本** | `$0.032 / 轮` | `$0.018 / 轮` | **`$0.0028 / 轮`（成本直降 `-84.4%`，年省 `+$2.36M`）** |

---

## 二、 🎯 业务方与架构师灵魂拷问 Q&A

### Q1：为什么让大模型直接写 HTML/React 代码（像玩具版 Artifacts 一样）在企业生产系统里走不通？
**A**：在个人玩具 Demo 里觉得“模型写 HTML 很酷”，但一上企业生产环境就会撞上三堵墙：
1. **Token 税与等待焦虑**：画一个带 4 个 KPI 卡片和一张柱状图的面板，其实有效业务数据只有 30 个数字（约 `180 Tokens`）；如果让模型手写 HTML/Tailwind/Chart.js，它每次都要重复写出 `3,500 Tokens` 的样板标签代码，用户对着空白框干等 `7.4 秒`！
2. **UI 一致性灾难**：同一个问题问两次，模型第一次用蓝色圆角卡片、第二次用灰色直角表格，且 `31.5%` 的生成结果在企业暗色主题下出现“浅灰背景配白色文字”的不可读缺陷；
3. **采用 `A2UI / AG-UI` 声明式组件注册表**：前端团队把 `KpiRibbon`、`FinOpsApprovalCard`、`D3Sankey`、`RiveStatusOrb` 写成标准预编译组件并暴露 JSON Schema。大模型只负责填数据，不仅 `165ms` 极速上屏，而且永远保持设计师像素级审美！

### Q2：如果用户问的是千变万化的 BI 数据分布或云资源依赖拓扑，预定义的卡片不够用怎么办？
**A**：进入 **Tier 2：声明式可视化语法层（Declarative Visualization Grammar：`Vega-Lite` + `ELK.js` + `Mermaid`）**：
- 千万不要退化到“跑云端 Python 画静态 PNG”或“让模型手写 500 行 D3.js 命令式 DOM 操作代码”！
- 让大模型输出 `40 行` 标准 **`Vega-Lite` JSON 规约** 或 **`ELK.js` 节点边 JSON**，浏览器端的预置图形引擎在 `210ms` 内即可将其编译为支持 60fps 缩放、框选联动过滤（Brush & Link）以及一键导出 `.svg / .pptx` 的交互式画布！

### Q3：对于那 2% 确实需要模型现场编写全新交互模拟器（如 MCP Apps 扩展微件）的场景，如何构建金融级安全沙箱？
**A**：必须实施 **“三道安全铁闸（Triple-Gate MCP App Sandbox）”**：
1. **双层 Null-Origin Iframe 隔离**：外层与内层 `iframe` 均设置 `sandbox="allow-scripts"`（严禁开启 `allow-same-origin`），使沙箱拥有完全独立的透明 `null` 源，无法读取宿主 `localStorage`、`IndexedDB` 或 `document.cookie`；
2. **零外联 CSP 铁幕**：在沙箱 HTML 头部硬编码注入 `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:;">`——即使模型被恶意文档注入了木马脚本，由于 `connect-src` 和外链 `img-src` 被彻底封死，攻击者 **0% 可能将内网数据发往外部服务器**！
3. **预热沙箱池（Pre-Warmed Iframe Pool）**：提前在后台初始化好带企业主题 CSS 变量的隐藏沙箱实例，收到代码后 `320ms` 瞬时挂载！

---

## 三、 🧭 直观可视化图解（Mermaid 决策树 + 管线架构图 + 时序图）

### 3.1 企业级 Agent 生成式动态 UI（Generative UI）三级路由决策树
```mermaid
flowchart TD
    A["用户向企业 Agent 发起业务查询或操作请求"] --> B{"Agent 响应所需的视觉交互形态?"}
    B -->|常规业务看板 / 审批单 / 状态卡片 88% 流量| C["Tier 1: A2UI / AG-UI 声明式 JSON 组件流<br/>流式输出 180-Token Props 映射宿主 React/D3/Rive 组件 (165ms)"]
    B -->|多维数据探索 / 云架构与血缘拓扑 10% 流量| D["Tier 2: 声明式可视化语法 DSL<br/>输出 Vega-Lite / ELK.js AST 由端侧 SVG/Canvas 渲染 (210ms)"]
    B -->|长尾定制交互计算器 / 专属沙盘 2% 流量| E["Tier 3: 预热双层 Null-Origin CSP 安全沙箱<br/>强制 default-src 'none' 零外联 + JSON-RPC 2.0 桥接 (320ms)"]
    C & D & E --> F["用户在 UI 上点击筛选/审批 -> 触发强类型 Action 事件秒级回传 Agent"]
```

### 3.2 三级混合生成式 UI 渲染与安全隔离管线架构图
```mermaid
flowchart LR
    subgraph Agent["1. 结构化输出路由器"]
        LLM["Enterprise Agent"] --> SCH["JSON Schema / Tool Call 约束输出"]
    end
    subgraph HostUI["2. 宿主原生与 DSL 渲染层 (98% 流量)"]
        SCH -->|Tier 1: 88%| A2UI["A2UI 组件注册表:<br/>KPI / 表单 / Rive 状态机 (165ms)"]
        SCH -->|Tier 2: 10%| DSL["Vega-Lite & ELK.js 引擎:<br/>60fps 矢量图表与正交拓扑 (210ms)"]
    end
    subgraph Sandbox["3. 零信任 MCP App 沙箱 (2% 流量)"]
        SCH -->|Tier 3: 2%| CSP["Null-Origin 双层 Iframe:<br/>CSP default-src 'none' (320ms)"]
    end
```

### 3.3 165ms 增量流式 A2UI 渲染与双向事件交互时序图
```mermaid
sequenceDiagram
    participant User as 架构师 / 业务主管
    participant Host as 宿主前端 (A2UI 组件注册表)
    participant Agent as 企业 FinOps & 架构 Agent

    User->>Agent: "展示本月多云 GPU 超支部门，并给我一键降级审批卡片"
    Agent-->>Host: 60ms 开始流式推送 Partial JSON: { component: "FinOpsApprovalDeck", ... }
    Host->>Host: 165ms 立即挂载原生暗色模式骨架屏、D3 预算条与 Rive 告警徽章
    Agent-->>Host: 流式补全剩余部门明细数据 (共仅消耗 180 Tokens, $0.0028)
    User->>Host: 拖动滑块将阈值设为 85% 并点击 [批准自动降级]
    Host->>Agent: 发送强类型事件 { action: "approve_soft_cap", threshold: 0.85 } (无需重绘整页!)
```

---

## 四、 📊 多模型/多技术栈横向选型决策矩阵

| Generative UI 渲染技术栈 | 首屏渲染延迟 | 视觉规范合规率 | 交互流畅度与可编辑性 | 安全性 (防 XSS/外泄) | 单轮推理成本 | 适用场景 |
| --- | --- | --- | --- | --- | --- | --- |
| **1. Tier 1: `A2UI / AG-UI` 声明式 JSON 组件注册表** | **`165 ms`** | **`100.0%`** | **60fps 原生组件 + 双向事件** | **100% 免疫 (无代码执行)** | **`$0.0028`** | **88% 企业看板、表单、审批、状态卡片** |
| **2. Tier 2: `Vega-Lite / ELK.js` 声明式可视化 DSL** | **`210 ms`** | **`99.8%`** | **60fps 缩放过滤 + 导 PPTX** | **100% 免疫 (纯 AST 语法)** | **`$0.0032`** | **10% 统计分布图、云架构与数据血缘拓扑** |
| **3. Tier 3: 预热双层 `CSP default-src 'none'` 沙箱** | `320 ms` | `99.5%` | 高自由度定制模拟器 | **零网络外联锁死** | `$0.0065` | **2% 长尾专属交互模拟器 (`MCP Apps`)** |
| **4. LLM 裸写 HTML/JS / 云端 Python 静态 PNG** | `7,400–8,500 ms` | `62.0%–68.5%` | 静态死图或频繁报错 | ⛔ **高危 (易遭注入外泄)** | `$0.018–$0.032` | ⛔ **严禁作为企业生产主力方案** |

---

## 五、 🧪 交互式应用工作台 Demo 与 7-Card 报告

- **交互式工作台入口**：[`demos/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe-studio/`](../demos/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe-studio/)
- **可视化总结图**：[`docs/benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary-visual.svg`](benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary-visual.svg)
- **密封评测数据**：[`docs/benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary.json`](benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary.json)

![Summary Visual](benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary-visual.svg)

---

## 六、 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **遵循 88 / 10 / 2 生成式 UI 分流原则**：88% 交互走 `A2UI` 声明式组件注册表，10% 图表拓扑走 `Vega-Lite / ELK.js` DSL，仅 `<2%` 定制微件走安全沙箱。
- [ ] **启用增量 Partial-JSON 流式解析上屏**：不等 JSON 完全闭合即先行挂载组件骨架与已完成的数据行，将首屏感知延迟控制在 `200ms` 以内。
- [ ] **淘汰云端 Python 容器生成静态 Matplotlib PNG 图表**：全面改用端侧矢量 DSL 渲染，支持本地零延迟悬停、框选过滤与一键导出可编辑 SVG/PPTX。
- [ ] **定制代码沙箱强制执行 `sandbox="allow-scripts"` + `CSP default-src 'none'`**：彻底切断沙箱内一切外部网络请求与宿主 Cookie 访问权限。
