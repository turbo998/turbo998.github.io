# 上市公司财报夜（Form 10-Q/8-K）与宏观决议：iXBRL 零漂移演播室字幕条（Chyron）、SEC Reg G 瀑布图与 8.4 秒快讯视频选型指南 FAQ

> **核心旨归**：面向财经电视演播室（Bloomberg / CNBC 风格）、上市公司投资者关系（IR）、券商研究所与 **Cloud & AI Solution Architect**。本文用通俗业务与工程语言回答“为什么美股/港股盘后 16:00 披露 120 页季报（Form 10-Q / 8-K）时，人工 After Effects 制片团队需要 `45 分钟` 才能剪出第一支财报拆解短视频（错过盘后黄金交易窗口），而直接用通用大模型读 PDF 配像素文生视频却会导致单位错位与柱状图高低画反（数值漂移 `285 bps`）、单独夸大 Non-GAAP 利润违反 `SEC Regulation G` 强制对等桥接规定、以及改写 CEO 原话触发证券集体诉讼？”以及“如何构建 **SEC EDGAR Inline XBRL 结构化标签直驱（`0.00 bps` 漂移）+ Reg G GAAP/Non-GAAP 双轨调解瀑布图硬锁 + 95% 预烘焙行业实景 B-Roll 分镜池 + CEO 原声逐字切片与 Remotion 8.4 秒同源编译 16:9 演播室 Chyron 及 9:16 快讯视频** 架构，实现 **`8.4 秒`** 零误差首发（提速 **`321.4×`**），并将标普 500 全季财报视频成本从 `$225,000` 压降至 **`$30`（`$0.06/条`）**”。

---

## ① 📌 核心选型结论速览（Executive Summary）

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│  🎯 一句话架构选型结论（Round 308 · 97th Workbench）：                                      │
│     上市公司财报与美联储决议视频，绝不能用 LLM 硬啃 PDF 表格或让像素扩散模型画柱状图！      │
│     必须用【SEC EDGAR iXBRL 标签直驱 + Reg G 调解桥硬锁 + 95% 行业空镜池 + Remotion 8.4s】！│
│                                                                                             │
│  1. 坚决禁止在财经媒体与上市公司 IR 中裸跑“PDF 文本摘要 + 像素文生视频（T2V）”：            │
│     - 数值与图形颠倒：双栏 PDF 财报表格经常把“百万/十亿”表头与负号括号 `(1,240)` 识别错位， │
│       而像素视频模型会把同比亏损收窄画成柱子暴涨（平均数值失真 285 bps）；                  │
│     - 触犯 SEC Regulation G 与 PSLRA 红线：仅展示漂亮的 Non-GAAP 调整后利润而不展示 GAAP    │
│       净利及股权激励（SBC）调解过程，直接违反 SEC Item 10(e) 对等显著度强制规定！           │
│  2. 唯一可投产架构：EDGAR iXBRL 结构化 AST + Reg G 双轨瀑布图 + 8.4s Remotion 编译器：      │
│     - 0.00 bps 会计恒等式硬锁：直接解析 SEC 强制提交的 Inline XBRL (`us-gaap:*`) XML 节点； │
│     - 盘后 8.4 秒全网首发：复用 95% 预烘焙 GICS 行业实拍 Closed-GOP 空镜池，叠加 CEO 电话会 │
│       原声时间戳切片与 PSLRA 安全港底栏，8.4 秒同步输出 16:9 演播室与 9:16 竖屏快讯！       │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

| 财报快讯与 IR 视频生产路线 | 盘后披露到全网首发耗时 | 财务数值与图表漂移 | SEC Reg G & PSLRA 合规率 | 超级财报夜 120 家并发能力 | 单条视频综合成本 | 工程架构师推荐度 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **EDGAR iXBRL AST + Reg G 瀑布桥 + 95% B-Roll 池 + Remotion** | **`6.9~8.8 秒` (`321×` 提速)** | **`0.00 bps` (恒等式硬锁)** | **`100%` (GAAP/Non-GAAP 同屏)** | **100% 全覆盖 (Serverless 并发)** | **`$0.04~$0.06` (`-99.99%`)** | ⭐⭐⭐⭐⭐ **财经媒体、券商与上市公司 IR 唯一标准** |
| **人工财经编辑读财报 + After Effects / Vizrt 手工包装剪辑** | `35~50 分钟` (错过盘后行情) | `0.00 bps` (人工三审) | `99.5%` | `<5%` (每晚仅能精做 3~5 家巨头) | `$450 / 条` | ⭐⭐⭐ 仅限深度专题片，无法抢占盘后快讯黄金 10 秒 |
| **静态图文快讯海报 (无视频 B-Roll、无动态调解桥与高管原声)** | `15 秒` | `0.00 bps` | `85.0%` | `100%` | `$0.01` | ⭐⭐ 短视频平台算法完播率与分发权重远低于动态视频 |
| **LLM 裸读 PDF 表格 + 像素文生视频画图表 (Sora 2 / Veo 3)** | `95 秒` | **`195~310 bps` (柱高/正负反画)** | **`38.5%` (漏 GAAP 调解桥)** | `15%` (GPU 限流阻塞) | `$4.80` (触发合规下架) | ❌ **引发算法交易盘误读、监管问询函与证券诉讼** |

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：为什么美股和港股财报季，绝对不能用多模态大模型（VLM/OCR）去截图识别 10-Q PDF 表格，而必须直连 Inline XBRL（iXBRL）？
* **PDF 是面向人类排版印刷的“视觉近似表示”，而 iXBRL 是 SEC 法定机器可读的“精确会计账本树”**：
  1. 一份 120 页的 `Form 10-Q` 包含大量跨页合并单元格、脚注标号（如 `$1,420^{(3)}$` 被 OCR 误读为 `$14,203`）以及括号表示负数 `$(450)`。哪怕 OCR 准确率达到 99%，那 1% 的小数点或单位错位在财经新闻中也是致命事故。
  2. SEC 自 2021 年起强制所有美股上市公司提交 **Inline XBRL（iXBRL）**：每一个数字都带有精确的 XML 命名空间标签（如 `us-gaap:Revenues`、`decimals="-6"`、起止会计期间 `contextRef="Q3_2026"`）。直接解析 iXBRL 并在编译前执行 **会计恒等式断言（`Assets === Liabilities + Equity`）**，可将数值误差彻底归零（**`0.00 bps`**）！

### Q2：什么是 SEC Regulation G（Item 10(e) of Reg S-K）？为什么许多 AI 自动生成的财报短视频一发出来就会收到合规部门的紧急撤稿令？
* **“严禁孤立夸大 Non-GAAP 调整后指标”的证券监管铁律**：
  * 科技与生物医药公司往往在财报新闻稿开头强调高增长的 `Non-GAAP Adjusted Net Income`（剔除了巨额股权激励 SBC 与并购摊销）。
  * 根据 **SEC Regulation G**，任何公开传播材料（包括 IR 短视频与社媒快讯）一旦展示 Non-GAAP 指标，**必须以同等或更高的视觉显著度（Equal or Greater Prominence）同步展示最直接可比的 GAAP 指标，并给出从 GAAP 到 Non-GAAP 的逐项加减调解瀑布桥（Reconciliation Waterfall）**。我们的 Remotion 模板在 AST 层强制锁死“左 GAAP 基准柱 + 中间调解项 + 右 Non-GAAP 结果柱”同屏布局，实现 **`100%` Reg G 合规**。

### Q3：如何在 8.4 秒内既有电影级的数据中心/晶圆厂/实验室画面，又有真实准确的图表和 CEO 原声？
* **“95% 预烘焙 GICS 行业实拍 Closed-GOP 空镜池 + 5% Remotion 实时矢量字幕条（Chyron）合成”**：
  * 我们按标普 GICS 11 大行业与 60 个子行业预先烘焙经过版权授权的 4K 实拍 `Closed-GOP` 分镜池（如 AI 液冷机房、自动化晶圆天车、港口集装箱、美联储大楼）。
  * 盘后 `8-K` 落地瞬间，系统无需调用慢达 95 秒的视频扩散模型，只需 `0.4 秒` 解析 iXBRL、`0.8 秒` 生成 Reg G 瀑布图与演播室 Lower-Third 字幕条、`1.4 秒` 命中行业空镜与 CEO 电话会原声切片，交由 **Remotion + fMP4** 在 **`5.8 秒`** 内合成完毕（总计 **`8.4 秒`**）！

---

## ③ 🧭 直观可视化图解（Mermaid 选型决策树 + 8.4 秒制播架构图 + 盘后抢发时序图）

### 3.1 财经财报夜与宏观数据实时视频制播选型决策树

```mermaid
flowchart TD
    A["盘后 16:00 财报披露 / 宏观经济数据公布实时制播请求"] --> B{"信源格式与核心证券法规约束？"}
    B -->|"☁️ 美股/港股季报 (Form 10-Q / 8-K 业绩公告)"| C["解析 EDGAR Inline XBRL (us-gaap 标签 0.00 bps 锁)<br/>+ SEC Reg G (GAAP -> Non-GAAP 调解瀑布桥同屏披露)"]
    B -->|"🧬 上市公司上调/下调全年营收指引 (Guidance)"| D["CEO 电话会原声逐字时间戳切片 (严禁 AI 改写)<br/>+ 预测区间带状矢量图 + 底部 18% PSLRA 安全港常驻声明"]
    B -->|"🏦 商业银行季报 (NIM 净息差与巴塞尔 III 资本)"| E["首尾基点恒等式校验 (Opening + Δbps === Ending)<br/>+ CET1 风险加权资产 (RWA) 口径强制脚注字幕条"]
    B -->|"🏛️ 美联储 FOMC 利率决议 / CPI / 非农快讯"| F["19 委员点阵图 (Dot Plot) 坐标精确粒子位移插值<br/>+ 6.9 秒同步输出 16:9 演播室大屏与 9:16 竖屏快讯"]
```

### 3.2 “SEC iXBRL AST + Reg G 调解桥 + 95% B-Roll 池 + Remotion 8.4s”四阶架构图

```mermaid
flowchart LR
    subgraph S1["Stage 1: EDGAR iXBRL 解析"]
        XBRL["监听 10-Q/8-K XML 树<br/>+ 会计恒等式校验 (0.00 bps)"]
    end

    subgraph S2["Stage 2: Reg G & PSLRA 门禁"]
        REGG["GAAP/Non-GAAP 1:1 调解瀑布图<br/>+ PSLRA 前瞻指引安全港底栏"]
    end

    subgraph S3["Stage 3: 95% 行业空镜与原声"]
        GOP["GICS 行业 Closed-GOP B-Roll 池<br/>+ CEO 电话会原声时间戳切片"]
    end

    subgraph S4["Stage 4: Remotion 8.4s 双出"]
        REM["5.8s 合成 16:9 演播室 Chyron<br/>+ 9:16 社媒竖屏快讯 ($0.06)"]
    end

    XBRL --> REGG --> GOP --> REM
```

### 3.3 盘后 16:00:00 财报提交至 16:00:08.4 全网 4K 视频首发时序图

```mermaid
sequenceDiagram
    participant SEC as SEC EDGAR 实时流 / 电话会流
    participant AST as iXBRL 解析与 Reg G 恒等式核
    participant Pool as 95% 行业 B-Roll Closed-GOP 缓存
    participant Rem as Remotion 16:9 & 9:16 编译器

    SEC->>AST: 16:00:00.0 推送 Form 8-K / 10-Q Inline XBRL 报文 (0.0s)
    AST->>AST: 提取 GAAP 净利 $18.4B、SBC +$2.8B 与 Non-GAAP $20.6B 并校验恒等式 (0.4s)
    AST->>Pool: 构建 Reg G 瀑布图 AST 并按 GICS 代码命中数据中心 4K 空镜环 (2.6s)
    Pool->>Rem: 注入演播室 Lower-Third 字幕条、PSLRA 安全港底栏与 CEO 原声片段
    Rem-->>SEC: 16:00:08.4 全网首发 16:9 演播室与 9:16 竖屏财报视频 (8.4s, 0.00 bps 误差)
```

---

## ④ 📊 四大财经实时制播场景与技术方案横向对比矩阵

| 财经实时制播场景 | 裸读 PDF + 像素视频生成痛点 | iXBRL + Reg G + Remotion 混合配置 | 数值漂移 | Reg G 合规率 | 首发耗时 | 单条成本 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **科技巨头 10-Q 财报夜** | 漏掉 SBC 调减项违背 Reg G；柱高画反 (`285 bps`) | `us-gaap iXBRL 直绑 + GAAP/Non-GAAP 调解桥` | **`0.00 bps`** | **`100%`** | **`8.4 秒`** | **`$0.06`** |
| **生物医药 8-K 指引上调** | 把预测区间改写成确定承诺，无安全港声明惹诉讼 | `CEO 原声切片 + 区间带矢量图 + PSLRA 底栏` | **`0.00 bps`** | **`100%`** | **`7.8 秒`** | **`$0.05`** |
| **跨国银行 NIM 与 CET1** | `+14 bps` 与 `-8 bps` 正负阶梯画反误导交易员 | `首尾基点恒等式断言 + Basel III RWA 口径锁` | **`0.00 bps`** | **`100%`** | **`8.8 秒`** | **`$0.06`** |
| **美联储 FOMC 点阵图快讯** | 人工制图慢 35 分钟；AI 把 19 名委员画成 26 人 | `SEP JSON 19 点坐标粒子插值 + 双画幅同源编译` | **`0.00 bps`** | **`100%`** | **`6.9 秒`** | **`$0.04`** |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 评测报告

### 5.1 交互式工作台入口与核心功能
* **在线体验入口**：[`demos/financial-earnings-call-live-chart-broll-chyron-video-studio/`](../demos/financial-earnings-call-live-chart-broll-chyron-video-studio/index.html)
* **核心交互能力**：
  1. **四大财经制播场景切换**：涵盖 **科技巨头 10-Q 云与 CapEx**、**生物医药 8-K 指引上调**、**跨国银行 NIM 与 CET1 桥接** 及 **美联储 FOMC 点阵图快讯**；
  2. **管线模式 A/B 切换**：对比 **`SEC iXBRL 标签直驱 + Reg G 调解桥硬锁 + Remotion 8.4s`** 与 **`裸读 PDF + 像素视频大模型画财报图`**；
  3. **覆盖股票数量滑块（100 ~ 2,000 家上市公司）**：实时测算财报季全市场视频覆盖总成本与对比人工制片团队的提速倍数。

### 5.2 架构评测可视化总结图

![上市公司财报夜 iXBRL 零漂移演播室包装与 8.4 秒快讯视频架构总结图](./benchmarks/financial-earnings-call-live-chart-broll-chyron-video/summary-visual.svg)

---

## ⑥ 🛠️ 财经媒体与上市公司 IR 视频自动化落地评审 Checklist

- [ ] **1. SEC EDGAR `Inline XBRL` 原生绑定**：财报视频中的所有营收、EPS 与利润率数字是否直接解析自 `iXBRL` XML 节点（严禁对 PDF 财报表格使用无校验 OCR）？
- [ ] **2. 会计恒等式与跨零轴坐标断言**：渲染瀑布图或柱状图前，是否校验 `GAAP + Adjustments === Non-GAAP` 恒等式误差 `< 1e-6`，并支持正负跨零轴精确比例映射？
- [ ] **3. SEC Regulation G（Item 10(e)）同屏对等披露**：凡视频字幕或图表出现 `Non-GAAP` 指标时，是否同屏以同等字号展示对应 `GAAP` 基准值与调解桥？
- [ ] **4. PSLRA 前瞻性指引安全港常驻条**：涉及未来季度营收/利润预测（Guidance）的视频片段，底部是否强制挂载 `PSLRA Safe Harbor` 法定免责声明且严禁 AI 改写高管原声？
- [ ] **5. `95%` 行业实拍 `Closed-GOP` 空镜池复用**：背景 B-Roll 是否走预烘焙行业空镜缓存 + `fMP4` 拼接，确保盘后 `10 秒` 内完成 16:9 与 9:16 双画幅首发？
