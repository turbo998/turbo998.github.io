# 知识讲解类动画制作研究专著：`one-sentence-video` 工业级程序化视频引擎与三大标杆短视频逆向工程

> 🌐 **Language / 语言**: **中文** | [English (`knowledge-explainer-animation-study.en.md`)](knowledge-explainer-animation-study.en.md)  
> 🎮 **交互式工作台**: [Knowledge Explainer Animation Studio (`demos/knowledge-explainer-studio/`)](../demos/knowledge-explainer-studio/) · [7-Card 4:5 视觉评测报告 (`test-report-cards.html`)](../demos/knowledge-explainer-studio/test-report-cards.html)

---

## 摘要 (Executive Summary)

技术与商业知识讲解类动画（Knowledge-Explainer Animation）正经历从“手工 AE 关键帧 / PPT 录屏念稿”向**“声明式分镜契约 + 程序化 Canvas/SVG/GSAP 渲染 + 量化视觉密度门禁”**的范式跃迁。传统 AI 生成视频往往陷入三大通病：
1. **“深蓝底 + 青色发光网格 + 满屏 `back.out(1.7)` 弹窗”的 AI 制服感（AI Tech Uniform）**；
2. **“前 0.5 秒文字滑入、后 4.5 秒全屏死寂”的 PPT 幻灯片式伪动画（Flatness & Freeze）**；
3. **“无因果关系的泛滥 `whoosh` 音效与脱离节拍的机械硬切”**。

本研究围绕工业级一句话视频生成技能 **`one-sentence-video`（基于 HyperFrames `0.7.87` 架构）** 与抖音/B站三条百万级播放的标杆知识讲解短视频展开系统性逆向工程与实时重现实验：
- **Part I**：深度剖析 `one-sentence-video` 的 **Step 0–6 七步自动驾驶闭环**、**`look × layout × motion × sound` 四维正交风格账本（20+3 Presets）**、**19+3 张测量级 Shot Cards**、**`cut-the-curve` 接缝运镜速度学公式**、**`process-gate.py` 五道过程门禁**、**`density-gate.py` 六项客观视觉密度算子**，以及纯 Python **`bgm-gen.py` + `beat-snap.py` + `sfx-gen.py` 因果声学栈**。
- **Part II**：对三大标杆短视频进行逐帧视觉、色彩语义、版式拓扑与认知叙事逆向工程：
  1. **【小哲讲agent】《MCP、Skill和本地Tools选型》**（`https://v.douyin.com/Pp5kMde2rMI/` · B站同源 `BV1nnnw6FE2V`）—— 提炼为 **`xiaozhe-mcp-node-graph`（深色黑曜石渐进节点树与分层决策矩阵）**；
  2. **【小哲讲大模型】《一条视频彻底吃透RAG》**（`https://v.douyin.com/BMo58MQOIBM/`）—— 提炼为 **`xiaozhe-rag-pipeline-flow`（拟人化四阶漏斗与 `packet-hop-break` 数据包跳跃流）**；
  3. **【第四种黑猩猩】《DeepSeek 一张卡为什么能收入 38 美元》**（`https://v.douyin.com/8m31BovOgQs/` · B站同源 `BV13cxv6SE9L`）—— 提炼为 **`chimp-deepseek-unit-economics`（浅色编辑室算力砖块矩阵与量化单位经济学账本）**。
- **Part III**：建立三模板横向对比矩阵、实测视觉密度遥测基准，以及可直接驱动生产的 `STORYBOARD.md` 与 `style-ledger.json` 标准配方。

---

## Part I：`one-sentence-video` 工业级程序化视频生成引擎深度剖析

### 1.1 为什么是单一自包含 Skill：防漂移与单一真值源架构

在早期多智能体视频工作流中，“选题策划 Skill”、“短视频管道 Skill”与“技术讲解渲染 Skill”各自维护了一套色彩与动效规则，导致同一套配色（例如历史残留的 Neon Pulse `#0a0a1a` / `#00f0ff` / `#ff006e`）在三处分裂漂移。`one-sentence-video` 确立了**“单一入口 + `references/` 声明式知识图谱 + `assets/*.py` 确定性门禁脚本”**的架构原则：

```
用户输入一句话需求 / 口播稿 / 技术文档
   │
   ├─► Step 0 · 收料与立项卡 (≤3 个必要单选问题，声明默认画幅 1920×1080@30fps / 20–30s)
   ├─► Step 1 · HyperFrames (0.7.87) 工程初始化 (compositions/frames/ + audio/ + output/)
   ├─► Step 2 · 视觉驱动 STORYBOARD.md (card-index.py 检索 19+3 张实测卡片 + --energy-plan 能量排布)
   ├─► Step 3 · 3 方向 1920×1080 样帧比选闸 (style-query.py → output/directions/{A,B,C}.png + palette-audit.py)
   ├─► Step 4 · 逐镜 Registry 布局闸 (layout-index.py 构图轴 + catalog-search.py 功能轴 → registry-ledger.md)
   ├─► Step 5 · 逐镜 GSAP/Canvas 写帧与具名 Seam 缝合 (cut-the-curve 速度匹配 + 8 条渲染器铁律)
   ├─► Step 5.5 · 纯 Python 因果声学栈 (bgm-gen.py → beat-grid.json → beat-snap.py ±50ms → sfx-gen.py)
   └─► Step 6 · 机器双闸与抽帧像素实证 (process-gate.py 五闸 + draft 渲染 + density-gate.py 六判据)
```

#### 文字预算分档法则（Text Budget Law）
知识讲解动画不是把演讲稿贴在屏幕上。`one-sentence-video` 强制执行按视觉层级的文字配额：
- **主标题（Hero Title）**：`4–8` 个汉字（或 `3–6` 个英文词）；
- **副句/结论钩子（Sub-hook / Caption）**：`≤ 10` 个汉字；
- **胶囊标签/节点名（Pill / Node Tag）**：`≤ 6` 个汉字；
- **长段落说明文字（Paragraph Body）**：**`0` 字（严禁出现）**。
- **黄金判据**：观众在 `1.5s` 内读不完的文字不再是信息文案，而是背景纹理（如 `repeated-text-texture`）。

---

### 1.2 四维正交风格账本（`look × layout × motion × sound`）与反 AI 制服感铁律

`references/style-ledger.json` 将视频风格从模糊的形容词拆解为四个相互正交的工程轴：

$$\text{Style} = \text{Look}_{\text{atoms}} \times \text{Layout}_{\text{archetypes}} \times \text{Motion}_{\text{seams+routes}} \times \text{Sound}_{\text{bgm+motifs}}$$

| 维度轴 | 工程定义与真值约束 | 核心枚举与代表原语 |
|---|---|---|
| **1. `look`（外观原子）** | 定义画布底色 `bg`、主墨色 `ink`、1–4 个强调色 `accents`、字体栈（Display / Sans / Mono）及明暗标记 `dark` | **15 套浅色默认主题**：`paper-catalog` (`#F0ECE5`), `manifesto-poster` (`#FFFFFF` + `#D8000F`), `research-note` (`#EFE7D4` + `#2E4A2A`), `blueprint-report` (`#FDFAE7` + `#1E2BFA`), `code-editorial-tour` (`#FAF9F5` + `#CC785C`), `cobalt-index` (`#F0EBDE` + `#1F2BE0`) 等<br>**5 套深色受控主题（`dark: true`）**：`vault-gold`, `speed-board`, `cyber-hud`, `cinema-credits`, `amber-archive`<br>**3 套知识讲解扩充主题**：`xiaozhe-mcp-node-graph`, `xiaozhe-rag-pipeline-flow`, `chimp-deepseek-unit-economics` |
| **2. `layout`（构图语法）** | 决定画面空间切分方式；**严禁相邻两镜复用同一构图**；`centered-hero` 仅限开场钩子或收尾定版 | 14 种标准构型：`numbered-sections`（巨型两位序号章节）、`two-column-corridor`（左右双栏 + 中央 ≥140px 收敛走廊）、`hero-plus-grid`（主图 + 缩略图墙）、`banded-three`（顶标签/中主体/底数据三段带）、`one-shot-world`（3600×2200 世界画布横移）、`split-compare`、`data-dashboard`、`timeline-rail`、`card-deck` 等 |
| **3. `motion`（运动与接缝）** | 镜头内部遵循单一方向流（`current: LEFT | UP | Z-IN`）；镜头交界强制使用具名 Seam | **5+2 具名 Seam**：`cut-the-curve`、`zoom-through`、`inverse zoom-through`、`waterfall cut`、`rack-focus blur-cut` + 镜内 `waterfall entry` / `nudge curve`<br>**缓动家族锁死**：每支视频最多使用 2 种主导缓动（如 `power2.in` + `power3.out`），`back.out` 全片不得超过 2 次 |
| **4. `sound`（声学动机）** | BGM 合成风格 + 节拍吸附网格 + 7 种因果机械音效 | **4 种 BGM 编曲**：`dry-tech` (96–104 BPM)、`paper` (86–96 BPM)、`pulse` (110–128 BPM)、`soft` (70–84 BPM)<br>**7 种因果 SFX Motif**：`flap`（翻牌）、`tick`（计数/打字）、`chime`（定版/总纲）、`thud`（落定/撞击）、`whoosh`（镜头横移）、`swipe`（组件滑移）、`riser`（缩放蓄力） |

#### 反 AI 同质化制服铁律（Anti-AI Uniform Law）
`palette-audit.py` 与 `process-gate.py --stage direction` 在代码层面拦截以下 AI 视频高频劣迹：
1. **`dark_requires_choice`**：任何背景明度 `< 0.25` 的深色主题均标记为 `dark: true`，**严禁作为科技/AI 题材的默认首选项**。Step 3 比稿生成的 A/B/C 三张 `1920×1080` 样帧中，至少 2 张必须为浅色纸质/编辑室底色，至少 1 张严禁使用网格、毛玻璃或发光粒子。
2. **溯源锁死（`palette_source`）**：`design-spec.md` 必须显式记录 `palette_source: <style-id>` 与用户三选一拍板记录；手写未登记的 `#0a0a1a` / `#00f0ff` 色值直接触发 `BLOCK`。

---

### 1.3 19+3 张测量级镜头卡片（Shot Cards）体系

`one-sentence-video` 将经过真实成片逐帧测量的镜头结构固化为 `references/cards/` 下的 Markdown 施工图（每张卡均包含：**意图、适用场景、1920×1080 精确像素坐标、毫秒级时间表、缓动对、参数表、HyperFrames 要点、声音绑定、以及“何时不用”反模式声明**）。

```
references/cards/ (19 基础卡 + 3 知识讲解扩充卡 = 22 张施工图)
├── catalog/ (版式与构图卡 · 10 + 3 张)
│   ├── numbered-section-open      (大序号章节开场：左 220px 巨型编号 + 右侧标题卡，能量 2，3.5s)
│   ├── two-column-corridor        (双栏收敛走廊：左候选 + 右结论 + 中间 ≥140px 连线走廊，能量 2，4.0s)
│   ├── three-way-bakeoff-row      (三案并排比选：三路横向对比 + 胜出项高亮放大，能量 2，4.0s)
│   ├── hero-plus-thumbnail-wall   (主图加缩略图墙：左大舞台 + 右侧矩阵网格逐格点亮，能量 3，5.0s)
│   ├── stat-pills-row             (统计胶囊行：3 枚等距数据胶囊错峰入场，能量 3，2.5s)
│   ├── orbit-ring-title           (环形巡回标题：中心定海神针 + 环形轨道徽章，能量 3，5.0s)
│   ├── cast-list-poster           (海报大字 + 名单：满版高对比粗体清单，能量 4，3.0s)
│   ├── repeated-text-texture      (重复文字底纹：满幅平铺底纹压暗作 L0 背景层，能量 2，4.0s)
│   ├── caption-bar-close          (底部一句话条：章节收尾金句压条，能量 1，1.6s)
│   ├── cta-pill-close             (结尾 CTA 胶囊：中心总结胶囊 + 行动锚点，能量 3，2.0s)
│   ├── [NEW] progressive-node-tree (渐进式三次贝塞尔节点树：根节点展开 + 焦点聚光降暗，能量 3，4.5s)
│   ├── [NEW] funnel-stage-filter   (多阶漏斗筛选器：粗排召回 → 精排淘汰 → 槽位注入，能量 4，4.2s)
│   └── [NEW] gpu-matrix-ledger     (算力砖块矩阵 + 单位经济账本：8×8 网格染色 + 木桶短板条，能量 4，4.5s)
├── motion/ (运动与运镜卡 · 8 张)
│   ├── seam-cut-the-curve         (运动中对切缝合：前镜加速出场 + 后镜同向减速入场，0.66s)
│   ├── packet-hop-break           (逐跳撞断点：数据包沿节点跳跃并在故障点同帧碎裂变红，2.2s)
│   ├── counter-seek-safe          (Seek 安全计数器：纯函数插值赋值而非累加，支持任意帧跳转，1.3s)
│   ├── world-pan-parallax         (一镜一世界横移：站间距=站宽，背景以 0.35× 视差跟随，3.1s)
│   ├── notch-rail-progress        (累积刻痕竖轨：纵向刻度替代禁忌的底部水平进度条，2.4s)
│   ├── scene-handoff-overlap      (场景重叠交接：相邻场景 0.4–0.6s 交叠，严禁空屏 crossfade)
│   ├── easing-family              (缓动家族分工：入场/出场/镜内位移严格分工，禁泛用 back.out)
│   └── section-beat-density       (结构拍点密度：保证每 3.0–4.0s 一次强结构视觉峰值)
└── sound/ (声学卡 · 1 张)
    └── beat-grid-snap             (拍点吸附：所有主镜头切点强制对齐 beat-grid.json ±50ms 内)
```

---

### 1.4 `cut-the-curve` 接缝运镜速度学公式（Seam Kinematics）

为什么绝大多数程序化生成的视频看起来像“两张 PPT 幻灯片切换”，而不是“一台连续运动的摄像机”？因为它们在镜头 A 结束时使用 `ease-out` 减速到静止（$v \to 0$），再在镜头 B 开始时从静止启动，或者使用全屏透明度交叉淡化（Crossfade）。

`one-sentence-video` 的核心运镜原语 **`seam-cut-the-curve`** 遵循**“将一条完整的 S 型加减速曲线在最高速拐点处一刀切开（Cut the Curve at Peak Velocity）”**的物理准则：

```
速度 v(t)
  ▲
  │                  ╱│╲
  │                 ╱ │ ╲        v_out(t_seam) ≈ 1867 px/s
  │      power2.in ╱  │  ╲       v_in(t_seam)  ≈ 1667 px/s
  │    (加速蓄力)  ╱   │   ╲      速度匹配比 r = v_in / v_out = 0.89 ∈ [0.70, 1.15]
  │              ╱    │    ╲     power3.out (释放减速)
  └─────────────┴─────┼─────┴──────────────► 时间 t
             t_seam-0.30s  t_seam  t_seam+0.36s
                      ▲
                瞬切接缝 (dt = 0)
```

#### 数学推导与标定参数
设镜头 A 在出场窗口 $T_{\text{out}} = 0.30\text{s}$ 内采用幂函数加速缓动 $E_{\text{in}}(u) = u^p$（对于 `power2.in`，$p = 2$），位移量为 $\Delta x_{\text{out}} = 280\text{px}$：

$$x_{\text{out}}(t) = -\Delta x_{\text{out}} \cdot \left(\frac{t}{T_{\text{out}}}\right)^p \implies v_{\text{out}}(T_{\text{out}}) = \left.\frac{dx_{\text{out}}}{dt}\right|_{t=T_{\text{out}}} = \frac{p \cdot \Delta x_{\text{out}}}{T_{\text{out}}} = \frac{2 \times 280}{0.30} \approx 1867\text{ px/s}$$

镜头 B 在接缝帧 $t_{\text{seam}}$ 瞬切入场，在入场窗口 $T_{\text{in}} = 0.36\text{s}$ 内采用幂函数减速缓动 $E_{\text{out}}(u) = 1 - (1 - u)^q$（对于 `power3.out`，$q = 3$），从初始偏移 $\Delta x_{\text{in}} = 200\text{px}$ 归位至 $0$：

$$x_{\text{in}}(t) = \Delta x_{\text{in}} \cdot \left(1 - \frac{t}{T_{\text{in}}}\right)^q \implies v_{\text{in}}(0) = \left|\left.\frac{dx_{\text{in}}}{dt}\right|_{t=0}\right| = \frac{q \cdot \Delta x_{\text{in}}}{T_{\text{in}}} = \frac{3 \times 200}{0.36} \approx 1667\text{ px/s}$$

定义**接缝速度匹配比（Seam Velocity Ratio）** $\eta$ 与**局部行程比（Partial Travel Ratio）** $\rho$：

$$\eta = \frac{v_{\text{in}}(0)}{v_{\text{out}}(T_{\text{out}})} = \frac{1667}{1867} \approx 0.893 \in [0.70, 1.15], \qquad \rho = \frac{\max(\Delta x_{\text{out}}, \Delta x_{\text{in}})}{W_{\text{canvas}}} = \frac{230\text{ px}}{1920\text{ px}} \approx 12.0\%$$

- 当 $\eta < 0.70$ 或 $\eta > 1.15$ 时，人眼会明显感知到接缝处的“顿挫”或“弹跳”；
- 当 $\rho > 18\%$ 时，观众会将其解读为“两个元素滑过屏幕”，而非“摄像机切镜”；控制在 $\sim 12\%$（约 `200–280px`）配合 $0.5 \leftrightarrow 1.0$ 的同底色不透明度交接，即可在 `dt=0` 处形成丝滑的视觉动量守恒。

---

### 1.5 双层量化质量门禁：`process-gate.py` 与 `density-gate.py`

#### 1.5.1 `process-gate.py` 五道过程门禁
在渲染合成前，`process-gate.py` 对工程目录执行静态契约审计（任何一项未过立即返回 `exit code 1 (BLOCK)`）：

| 门禁阶段 (`--stage`) | 校验对象与文件 | 核心拦截条件 |
|---|---|---|
| **1. `palette`** | `design-spec.md` + `references/style-ledger.json` | 校验 `palette_source: <style-id>` 合法性；若为 `dark: true` 主题，必须存在显式用户拍板记录；扫描全仓拦截未授权深蓝霓虹色值 |
| **2. `direction`** | `output/directions/{A,B,C}*.png` + `README.md` | 强制要求至少 3 张真实渲染的 `1920×1080` PNG 样帧（通过 PIL 校验分辨率）及 A/B/C 优劣对比与选型记录 |
| **3. `layout`** | `STORYBOARD.md` + `output/registry-ledger.md` | 每个镜头必须声明真实存在于 `_index.json` 的 `card:`、对应的 `registry:` 行；台账行数必须严格等于分镜数 |
| **4. `motion`** | `STORYBOARD.md` + `compositions/frames/*.html` | 每镜必须包含 `motion: seam=<具名seam> \| velocity=<ease对> \| carrier=<主体> \| verb=<动词>`；扫描拦截 `BANNED` 禁词（`uniform fade+slide`、`idle wobble` 等） |
| **5. `sound`** | `audio/bgm.wav` + `audio/sfx.wav` + `audio/sfx-events.json` | 校验 WAV 采样率/声道有效性与非静音；校验每镜 `sound: motif=...` 声明；校验根 `index.html` 中 `<audio data-track-index="10">` 挂载 |

#### 1.5.2 `density-gate.py` 六项客观视觉密度算子（「平」检测器）
针对“画面太空、半天不动、像 PPT”的主观痛点，`density-gate.py` 将成片按 `6 fps` 抽帧并缩放为 $192 \times 108$ 灰度矩阵 $I_t(y, x) \in [0, 255]$，计算以下 **6 项客观算子**：

1. **九宫格边缘密度与死区算子（3×3 Grid Edge Occupancy & Dead Zone）**：
   为什么不用像素亮度？因为浅色纸张主题全屏亮度都在 240 以上，用亮度判据会误判全屏 9 格都有内容。`density-gate.py` 计算一阶空间梯度幅值（边缘密度）：
   $$G_t(y, x) = \left|I_t(y+1, x) - I_t(y, x)\right| + \left|I_t(y, x+1) - I_t(y, x)\right|$$
   将画布均分为 $3 \times 3 = 9$ 个单元格 $C_{i,j}$，若单元格内平均梯度 $\overline{G_t}(C_{i,j}) \ge 4.0$（`EDGE_MIN = 4.0`），则该格计为**活跃格（Active Cell）**。
   - **判据**：单帧活跃格数 $\text{Occ}(t) = \sum_{i,j} \mathbb{I}[\overline{G_t}(C_{i,j}) \ge 4.0]$。若 $\text{Occ}(t) < 4$（即 $\ge 6$ 格为空白死区）连续持续 **$\ge 2.0\text{s}$**，直接判定 **`FAIL (死区超限)`**。
2. **结构变化峰值间隔算子（Structural Peak Interval Median）**：
   计算相邻帧平均绝对差分 $D(t) = \text{mean}_{y,x}|I_t - I_{t-1}|$，提取满足 $D(t) > \mu_D + 2\sigma_D$ 的局部极大值作为结构视觉峰值 $\{t_k\}$。
   - **判据**：相邻峰值间隔中位数 $\text{median}(\Delta t_k) \le 4.0\text{s}$（标杆参考片实测为 **`3.0s`**，相当于每分钟 $\ge 15$ 次结构事件）。若 $> 4.0\text{s}$ 判定 **`FAIL (结构变化太稀)`**。
3. **画面冻结占比算子（Frame Freeze Share）**：
   统计帧间差分 $D(t) < 0.5$（几乎完全静止）的帧数占比。
   - **判据**：$\text{FreezeShare} = \frac{1}{N}\sum_t \mathbb{I}[D(t) < 0.5] \le 30\%$。参考片实测仅 `13%`，而劣质 AI 生成片高达 `79%–81%`（只有前 0.5s 入场，后 4s 完全死寂）。
4. **缓动指纹多样性算子（Easing Fingerprint Audit）**：
   静态扫描所有帧的 GSAP 时间轴代码：单一 `ease` 函数占比必须 **$\le 70\%$**，且 `back.out` 弹簧过冲全片出现次数 **$\le 2$ 次**（防止全片千篇一律弹跳）。
5. **相邻构图防重算子（Layout Variety Gate）**：
   解析 `STORYBOARD.md` 中每镜的 `layout` 构型，若第 $k$ 镜与第 $k+1$ 镜使用同一构型（如连续两镜都是 `centered-hero`），触发告警拦截。
6. **90% 动作安全区算子（Action-Safe Bounding Box Gate）**：
   在 $1920 \times 1080$ 标准画幅下，左右安全边距 `SAFE_X = 96px`、上下安全边距 `SAFE_Y = 54px`。若内容像素外接框侵入安全区的帧数占比 $> 20\%$（常见于子组件误将 `<style>` 写在 `<head>` 而非 `<template>` 导致 `.safe` 定位失效的隐蔽 Bug），在 `--strict-safe` 下直接判定 **`FAIL`**。

---

### 1.6 纯 Python 因果声学栈（`bgm-gen.py` + `beat-snap.py` + `sfx-gen.py`）

为了彻底摆脱外部版权音乐依赖、GB 级神经音频大模型（如 MusicGen）不可复现且无法提取精确拍点的缺陷，`one-sentence-video` 构建了纯 NumPy 48kHz 确定性声学管线：

1. **`bgm-gen.py`（A 自然小调 `i–VI–III–VII` 程序化编曲 + 拍点网格导出）**：
   - 采用固定随机种子合成 48kHz 立体声 WAV，调式锁定为 A 自然小调（`MINOR = [0, 2, 3, 5, 7, 8, 10]`）的 `i–VI–III–VII`（`[0, 5, 2, 6]`）四小节进行，避免大调三和弦廉价的“企业宣传片广告味”。
   - 内置 `kick`（指数扫频 $118\text{Hz} \to 44\text{Hz}$ + 瞬态 click）、一阶高通纸感 `snare`、二阶差分 `hat`、基频+二次谐波 `bass`、微失谐三和弦 `pad_chord` 与四阶谐波 `body_stab`。
   - **同步生成 `audio/beat-grid.json`**：精确记录每一拍（`beats`）、强拍（`downbeats`）与八分音符时间戳，供 `beat-snap.py` 在 $\pm 50\text{ms}$（约 1.5 帧）容差内吸附或校验所有分镜切点。
2. **`sfx-gen.py`（7 种因果物理音效与等功率声像移动）**：
   - 摒弃泛滥的素材库音效，仅用 7 个数学合成器覆盖全部视觉动词：
     - `flap`（75ms）：高通噪声 + $1750\text{Hz}/620\text{Hz}$ 双谐振衰减，对应卡片翻转与章节牌切换；
     - `tick`（28ms）：$4200\text{Hz}$ 极短促正弦脉冲（$\tau = 6\text{ms}$），对应 `counter-seek-safe` 滚动计数（每 3 个数字触发一次，避免电钻感）；
     - `chime`（550ms）：$440 / 880 / 1320 / 1760 / 2640\text{Hz}$ 五泛音金属钟声，对应核心结论落定或根节点点亮；
     - `thud`（340ms）：$80\text{Hz} \to 56\text{Hz}$ 低频下潜冲击，对应数据包撞击断点或重排淘汰；
     - `whoosh`（460ms）：带通滤波噪声叠加二次曲线扫频 $480 + 1500(t/T)^2\text{Hz}$，配合等功率立体声摇移 $L = \cos((\text{pan}+1)\pi/4), R = \sin((\text{pan}+1)\pi/4)$，严格跟随 `cut-the-curve` 运镜方向；
     - `swipe`（260ms）：$1500 \to 600\text{Hz}$ 下行扫频，对应镜内组件错峰滑移（`waterfall entry`）；
     - `riser`（580ms）：$220 \to 1120\text{Hz}$ 加速上升张力包络 $(t/T)^{1.6}$，对应 `zoom-through` 穿镜前蓄力。

---

## Part II：三大标杆知识讲解短视频逐帧视觉与叙事逆向工程

基于提取的完整视频流与高密分镜序列图（`MCP_sheet_0.jpg`、`RAG_sheet_0.jpg`、`DeepSeek_sheet_0/1/2.jpg`），我们对三条代表性知识讲解短视频进行了逐幕逆向拆解，并将其标准化为 `one-sentence-video` 可直接调用的三大模板。

---

### 2.1 标杆一：【小哲讲agent】《MCP、Skill和本地Tools选型》 (`xiaozhe-mcp-node-graph`)

- **原始出处**：抖音 `https://v.douyin.com/Pp5kMde2rMI/` · B站同源高清镜像 `BV1nnnw6FE2V`
- **时长与规格**：`116.4s`（约 1 分 56 秒），横屏核心信息区适配 16:9 / 竖屏三段式构图，共 6 幕核心认知递进。
- **核心设计命题**：如何把三个极易混淆的抽象 Agent 概念（**MCP 协议、Skill 技能包、Local Tools 本地函数**）讲得层次分明，且不落入枯燥的文字罗列？

#### 2.1.1 视觉原子与版式拓扑 (`Look & Layout Anatomy`)
1. **黑曜石微光画布 (`Obsidian Radial Canvas`)**：
   - 背景并非死黑或刺眼的赛博深蓝，而是深邃的黑曜石墨绿径向渐变（中心 `#0A1916` → 边缘 `#050C0A`），叠加不透明度仅 `0.04` 的极细正交点阵，营造沉稳的架构师白板氛围。
2. **严格锁死的语义色盘 (`Semantic Color Coding`)**：
   - **协议层 `MCP (Model Context Protocol)`**：薄荷霓虹绿 (`#4ADE80`，代表标准化连接通道与生态解耦)；
   - **方法层 `Skill (Workflow / Prompt SOP)`**：丁香紫 (`#A78BFA`，代表领域经验封装与可复用工作流)；
   - **执行层 `Local Tools (Function Calling)`**：琥珀金 (`#FBBF24`，代表进程内零延迟确定性执行)；
   - **反模式/踩坑警示 (`Anti-Pattern / Overload`)**：珊瑚红 (`#FB7185`，代表高耦合爆炸或网络通信开销过载)。
3. **四大空间锚点**：
   - **左上角编号章节胶囊**：如 `[01] 核心问题`、`[02] 架构分层`、`[05] 重量对决`，持续为观众提供认知坐标；
   - **中央渐进式贝塞尔拓扑画布**：以左侧 `Agent Core` 为根节点，通过三次贝塞尔曲线 $\mathbf{B}(u) = (1-u)^3 \mathbf{P}_0 + 3(1-u)^2 u \mathbf{P}_1 + 3(1-u)u^2 \mathbf{P}_2 + u^3 \mathbf{P}_3$ 向右展开分支；
   - **右上/右侧量化仪表锚点**：如开场的 `90% 容易混淆` 圆环进度表盘与复杂度指数曲线；
   - **底部居中高对比字幕卡**：白字 (`#F8FAFC`) + 重点词语义染色，严守单行 `≤ 14` 字预算。

#### 2.1.2 六幕逐帧分镜与动效逆向表 (`6-Act Storyboard Breakdown`)

| 幕次 & 时间窗 | 画面核心标题与字幕锚点 | 视觉构图与几何组件 (`Card / Layout`) | 运镜接缝与镜内动效 (`Seam & Motion Verb`) | 因果音效 (`SFX Motif`) |
|---|---|---|---|---|
| **Act 1 · 痛点钩子**<br>`00:00 – 00:16` | **标题**：`[01] 核心问题 · 为什么要用 MCP？`<br>**钩子**：`90% 的开发者把三者混为一谈` | `orbit-ring-title` + `counter-seek-safe`<br>左侧抛出 `MCP / Skill / Tools` 三个问号交织节点，右侧巨型圆环表盘从 `0%` 飙升至 `90% 容易混淆` | **Seam**: `zoom-through`<br>**Verb**: `ring-sweep-lock`<br>圆环弧线按 `power2.out` 扫过 $324^\circ$，三个概念标签产生错位碰撞闪烁 | `riser` (0.0s)<br>`tick` ×6 (计数)<br>`chime` (90% 锁死) |
| **Act 2 · 三层正交拆解**<br>`00:16 – 00:38` | **标题**：`[02] 架构真相 · 它们根本不在一个层级`<br>**核心金句**：`MCP 是协议(怎么连) · Skill 是方法(怎么做) · Tools 是手脚(怎么干)` | `progressive-node-tree`<br>左侧 `Agent` 根节点向右发射三条三次贝塞尔流光连线，依次展开三层水平泳道卡片：顶层绿卡 `MCP (USB-C 通用接口)`、中层紫卡 `Skill (SOP 菜谱)`、底层黄卡 `Local Tools (本地扳手)` | **Seam**: `cut-the-curve` (向左 $\eta=0.89$)<br>**Verb**: `bezier-branch-spotlight`<br>讲解到某一层时，该节点放大至 `scale: 1.08` 并点亮外发光，其余两层自动降暗至 `opacity: 0.25`；连线脉冲沿路径持续流动 | `whoosh` (切镜)<br>`swipe` ×3 (分支展开)<br>`chime` (三层定格) |
| **Act 3 · 两个极端踩坑**<br>`00:38 – 00:58` | **标题**：`[03] 架构反模式 · 两个极端都会踩坑`<br>**对比**：`全塞本地 Tools (耦合失控)` vs `全走远端 MCP (延迟爆炸)` | `split-compare`<br>左右分屏对决：左屏 Agent 内部塞满 50+ 根杂乱黄线（单体膨胀红字告警 `OOM / 维护地狱`）；右屏连读个本地文件都绕道远端 JSON-RPC（进程间通信延迟 `420ms ✕`） | **Seam**: `waterfall cut`<br>**Verb**: `overload-shake-fracture`<br>左屏连线密度随时间指数倍增并触发红色边框频闪；右屏数据包在漫长虚线轨道上缓慢爬行 | `flap` (分屏展开)<br>`tick` (连线激增)<br>`thud` ×2 (双端报错) |
| **Act 4 · 耦合度演进曲线**<br>`00:58 – 01:18` | **标题**：`[04] 演进拐点 · 当系统耦合开始变重`<br>**洞察**：`单人脚本用 Tools 最快，跨团队复用必须上 MCP + Skill` | `data-dashboard`<br>中央绘制二维坐标系：横轴为 `工具数量 & 团队规模 (1 → 100+)`，纵轴为 `维护成本`。纯本地 Tools 曲线在拐点 $N=12$ 后呈指数级陡升 (`#FB7185`)，而 `MCP 标准化层` 曲线保持平缓对数增长 (`#4ADE80`) | **Seam**: `cut-the-curve`<br>**Verb**: `curve-divergence-trace`<br>两条曲线同步向右绘制，在交叉拐点处迸发脉冲圆环并弹出 `[临界点: 跨进程/跨团队复用]` 标注卡 | `whoosh` (切镜)<br>`riser` (曲线攀升)<br>`chime` (拐点标记) |
| **Act 5 · 同一任务两种重量**<br>`01:18 – 01:38` | **标题**：`[05] 实例对决 · 同一任务，两种重量`<br>**案例**：`任务：读取本地 Git 状态并生成周报` | `two-column-corridor`<br>左栏 **重型链路（过度设计）**：`Agent → MCP Server → 进程通信 → Git CLI`（耗时 `380ms`，配置 4 层）；右栏 **轻型链路（恰当选型）**：`Agent → Skill 模板 + 本地 git_status Tool`（耗时 `18ms`，零 IPC 开销） | **Seam**: `cut-the-curve`<br>**Verb**: `corridor-race-compare`<br>左右两栏顶部同时发射进度光球，右栏 `18ms` 瞬间走完并点亮绿色通过徽章，左栏仍在经历多层握手 | `swipe` (双栏立位)<br>`tick` (握手步骤)<br>`chime` (右栏胜出) |
| **Act 6 · 终局选型决策矩阵**<br>`01:38 – 01:56` | **标题**：`[06] 终局指南 · 真实项目不是三选一`<br>**黄金法则**：`高频原子操作归 Tools · 外部生态连接归 MCP · 业务流程编排归 Skill` | `three-way-bakeoff-row` + `cta-pill-close`<br>三层协同金字塔定版：顶层 `Skill`（大脑 SOP 编排）调度中层 `MCP`（外部数据库/SaaS 连接器）与底层 `Local Tools`（高频本地文件/计算手脚），底部弹出可保存的决策速查表 | **Seam**: `inverse zoom-through`<br>**Verb**: `pyramid-lockup-converge`<br>三层模块通过磁吸动效拼合为完整的 Agent 运行时蓝图，全屏九宫格占用率达到 `8/9` | `whoosh` (拉远全景)<br>`thud` (模块拼合)<br>`chime` (终局定版) |

---

### 2.2 标杆二：【小哲讲大模型】《一条视频彻底吃透RAG》 (`xiaozhe-rag-pipeline-flow`)

- **原始出处**：抖音 `https://v.douyin.com/BMo58MQOIBM/`
- **时长与规格**：`~95s`，采用**高对比暖白编辑室画布 + 拟人化“开卷考试”四阶流水线漏斗**，共 6 幕。
- **核心设计命题**：RAG（检索增强生成）涉及切分（Chunking）、向量化（Embedding）、向量粗排（Bi-Encoder Recall）、精排（Cross-Encoder Rerank）与上下文注入（Prompt Grounding）五个枯燥的工程环节。视频如何让初学者在 90 秒内一眼看懂**“为什么直接把 PDF 扔给大模型会失效”**以及**“为什么有了向量检索还需要 Rerank 重排”**？

#### 2.2.1 视觉原子与拟人化隐喻 (`Look & Metaphor Anatomy`)
1. **暖白编辑室画布与硬边模块化卡片 (`Warm Editorial & Neo-Brutalist Cards`)**：
   - 画布底色采用柔和护眼的暖灰纸色 (`#F7F6F2`)，搭配 `#0F172A` 的 `2px` 实线边框与 `4px 4px 0px #0F172A` 新粗野主义（Neo-Brutalist）硬阴影卡片，视觉边界极其锐利，天然契合 `density-gate.py` 的边缘梯度检测（平均梯度高达 `7.8+`）。
2. **四阶流水线色彩语义**：
   - **原始文档与语义切片 (`Chunking`)**：钴蓝 (`#2563EB`)；
   - **高维向量空间与粗排召回 (`Embedding & Top-K Recall`)**：青色 (`#0891B2`)；
   - **精排漏斗过滤 (`Cross-Encoder Rerank`)**：琥珀橙 (`#EA580C`)；
   - **上下文槽位注入与溯源生成 (`Grounded Generation`)**：翠绿 (`#16A34A`)；
   - **硬切分语义断裂 / 幻觉污染 (`Hallucination / Broken Chunk`)**：警示红 (`#DC2626`)。
3. **核心隐喻映射**：
   - **闭卷裸考（纯 LLM）** = 靠死记硬背瞎编（幻觉）；
   - **整本书塞进考场（长窗口硬塞整份 PDF）** = 找不到重点、注意力稀释（Lost in the Middle）且 Token 费爆炸；
   - **RAG 四步流水线** = **做索引卡片（Chunking & Embedding）→ 先抓一把相关卡片（Top-K 粗排）→ 挑出最核心的 3 张（Rerank 精排）→ 照着卡片写带页码的答案（Grounded Generation）**。

#### 2.2.2 六幕逐帧分镜与 `packet-hop-break` 动效拆解 (`6-Act Storyboard Breakdown`)

| 幕次 & 时间窗 | 画面核心标题与痛点隐喻 | 视觉构图与几何组件 (`Card / Layout`) | 运镜接缝与镜内动效 (`Seam & Motion Verb`) | 因果音效 (`SFX Motif`) |
|---|---|---|---|---|
| **Act 1 · 痛点爆破：为什么不能直接把 PDF 扔给 AI？**<br>`00:00 – 00:15` | **标题**：`[痛点] 为什么直接把 500 页 PDF 扔给大模型会翻车？`<br>**隐喻**：`闭卷瞎编 (幻觉) vs 整本硬塞 (大海捞针)` | `packet-hop-break`<br>左侧一枚庞大的 `500页企业财报.pdf` 数据包沿水平轨道冲向右侧 `LLM Context Window`，在窗口边界处猛烈撞击并碎裂为红色乱码碎片 (`Lost in the Middle / Token 溢出`) | **Seam**: `waterfall cut`<br>**Verb**: `packet-collide-shatter`<br>严格执行 `packet-hop-break` 因果同帧铁律：数据包在 $t=1.92\text{s}$ 撞击墙面的同帧退回 `26px` 并瞬间变为 `#DC2626` 警示红 | `tick` ×3 (跳跃)<br>`thud` (撞击同帧)<br>`flap` (报错卡弹出) |
| **Act 2 · Step 1：离线语义切分 (`Chunking`)**<br>`00:15 – 00:31` | **标题**：`[Step 1] 离线切片 · 固定字数硬切 vs 语义滑窗切分`<br>**关键细节**：`Overlap 重叠滑窗保留上下文不断句` | `split-compare`<br>上半区展示反例“按 500 字死板一刀切”把表格和主谓宾劈成两半（红叉 `✕ 语义断裂`）；下半区展示蓝色动态滑窗（`Chunk Size = 512, Overlap = 64`）将文档切分为带重叠缓冲的整齐知识卡片 | **Seam**: `cut-the-curve`<br>**Verb**: `sliding-window-slice`<br>蓝色半透明滑窗沿文档流向右步进，每次步进保留尾部 `15%` 高亮重叠带，切出的卡片按 `waterfall entry` 错峰落入卡片槽 | `whoosh` (切镜)<br>`swipe` ×4 (滑窗切卡)<br>`tick` (Overlap 锁死) |
| **Act 3 · Step 2：向量化与 Top-K 粗排召回 (`Embedding & Recall`)**<br>`00:31 – 00:48` | **标题**：`[Step 2] 向量化与粗排 · 把文字变成空间坐标`<br>**公式直观化**：`余弦相似度 $\cos\theta$ 瞬间召回 Top-20 候选` | `hero-plus-thumbnail-wall`<br>左侧用户提问 `“2026 Q3 研发费用率是多少？”` 经 Embedding 转化为青色坐标星点；右侧向量数据库星图中，距离最近的 20 枚候选点被青色雷达波圈中并抽出为 `Top-20 粗排池` | **Seam**: `cut-the-curve`<br>**Verb**: `radar-cosine-recall`<br>从 Query 星点发射同心圆扫描波，命中半径内的星点同步连线并显示余弦得分（`0.89`, `0.84`, `0.79`...） | `whoosh` (切镜)<br>`riser` (雷达扩散)<br>`tick` ×5 (星点命中) |
| **Act 4 · Step 3：为什么必须加 Rerank 重排漏斗？**<br>`00:48 – 01:06` | **标题**：`[Step 3] Cross-Encoder 精排 · 粗排快但糙，重排准但精`<br>**核心洞察**：`剔除“字面相似但答非所问”的干扰项` | `funnel-stage-filter`<br>中央巨型琥珀色重排漏斗：上方 20 张粗排卡片涌入，其中两张“含‘研发费用’字样但其实是 2023 年旧数据”的伪相关卡片被标红下沉淘汰（`Score: 0.18 ✕`），仅保留得分最高的 **Top-3 黄金证据卡**（`0.96`, `0.93`, `0.91`） | **Seam**: `cut-the-curve`<br>**Verb**: `funnel-sieve-drop`<br>伪相关卡片重力加速下坠淡出 (`power2.in`)，Top-3 卡片向上浮起并排列在右侧精英轨道 | `swipe` (漏斗进料)<br>`thud` ×2 (低分淘汰)<br>`chime` (Top-3 晋级) |
| **Act 5 · Step 4：Prompt 槽位组装与溯源生成**<br>`00:66 – 01:22` | **标题**：`[Step 4] 上下文注入 · 严禁自由发挥，只准据实回答`<br>**工程模板**：`System Constraint + Top-3 Chunks + User Query` | `two-column-corridor`<br>左侧展示结构化 Prompt 容器的三个物理插槽，Top-3 绿色证据卡沿贝塞尔走廊飞入 `[Context 槽]`；右侧 LLM 输出回答，且每句话末尾自动挂载 `[引用: 财报 P.42 §3.2]` 溯源角标 | **Seam**: `cut-the-curve`<br>**Verb**: `slot-dock-cite`<br>证据卡嵌入插槽时产生 `scale: 1.05 → 1.0` 机械咬合感，右侧答案文本与左侧原文档高亮行通过绿色虚线实时双向锚定 | `flap` ×3 (插槽咬合)<br>`tick` (生成流)<br>`chime` (角标锚定) |
| **Act 6 · 全链路全景复盘与生产避坑清单**<br>`01:22 – 01:35` | **标题**：`[全景复盘] 企业级 RAG 准确率从 60% 到 95% 的四个命门`<br>**总结条**：`语义切片 + 混合检索(BM25+向量) + Rerank 精排 + 引用溯源` | `world-pan-parallax` + `caption-bar-close`<br>摄像机拉远至完整的四阶水平流水线全貌，数据包从左至右一气呵成跑通四站，底部压出四大调优命门胶囊 | **Seam**: `zoom-through`<br>**Verb**: `pipeline-full-sweep`<br>全链路节点依次点亮绿色完成态，底部总结压条按 `nudge curve` 稳健收尾 | `whoosh` (全景横移)<br>`tick` ×4 (四站点亮)<br>`thud` + `chime` (定版) |

---

### 2.3 标杆三：【第四种黑猩猩】《DeepSeek 一张卡为什么能收入 38 美元》 (`chimp-deepseek-unit-economics`)

- **原始出处**：抖音 `https://v.douyin.com/8m31BovOgQs/` · B站同源高清镜像 `BV13cxv6SE9L`
- **时长与规格**：`252.5s`（4 分 12 秒，我们在 Studio 工作台中将其浓缩为最精华的 6 幕高密章节），**浅色编辑室算力砖块矩阵 + 量化单位经济学账本**。
- **核心设计命题**：如何向非底层系统工程师的科技受众，把 **DeepSeek V3/R1 推理系统的四大硬核系统工程优化（Batching 访存摊薄、MoE 专家并行 EP vs 数据并行 DP 的木桶效应、Prefill 与 Decode 1:1 解耦配比、100PB 分布式 SSD KV Cache 80% 命中率与昼夜错峰调度）** 转化成所有人都能算明白的**“单张 H800 GPU 每天如何赚出 $38（行业均值 $5.7 的 6.7 倍）”**商业算术题？

#### 2.3.1 视觉原子与版式拓扑 (`Look & Layout Anatomy`)
1. **浅色米白编辑室底色 (`Paper Editorial Light Canvas`)**：
   - 完全符合 `one-sentence-video` 的浅底优先原则：背景采用 `#FAF9F6`（暖米白纸张色），主文字采用 `#0F172A` 极粗无衬线体（Font Weight 800–900），容器采用 `#F1F5F9` 圆角矩形配 `#CBD5E1` 细边框。
2. **高辨识度算力语义色盘**：
   - **行业基准 / 闲置算力泡泡 (`Idle / Baseline`)**：冷灰 (`#94A3B8`)；
   - **DeepSeek 核心吞吐 / 克莱因蓝指标 (`Primary Metric`)**：克莱因蓝 (`#2563EB` / `#3B82F6`)；
   - **最慢卡木桶短板 / 显存带宽瓶颈 (`Straggler / Bottleneck`)**：活力橙红 (`#F97316` / `#EF4444`)；
   - **KV Cache 命中收益 / 满载吞吐 (`Cache Hit / Profit`)**：翡翠绿 (`#10B981`)；
   - **MoE 专家路由 (`Expert Parallelism`)**：皇家紫 (`#8B5CF6`)。
3. **标志性构图特征**：
   - **左上角直给式口语大标题**：不写学术名词，直接写核心因果句——如 `先说 EP 和 DP`、`每一步，都得等最慢的那张卡算完`、`Prefill 的情况正好相反`、`60K / 1.5M 省了25倍`；
   - **中央 8×8 / 4×4 GPU 算力砖块矩阵 (`gpu-matrix-ledger`)**：每张 GPU 卡是一个带实时负载色块与毫秒读数的圆角方块，通过砖块染色直观展示集群利用率、路由偏斜与负载均衡；
   - **左下角固定圆形讲者 PiP 锚点**：直径 `72px` 的黑猩猩创作者头像徽章常驻左下角安全区内，增强“主理人当面拆账本”的信任感。

#### 2.3.2 六幕逐帧分镜与量化算力公式拆解 (`6-Act Storyboard Breakdown`)

| 幕次 & 时间窗 | 原片标志性大标题与口播金句 | 视觉构图与量化算式 (`Card / Formula`) | 运镜接缝与镜内动效 (`Seam & Motion Verb`) | 因果音效 (`SFX Motif`) |
|---|---|---|---|---|
| **Act 1 · 悬念反差：单卡日入 $38 vs $5.7**<br>`00:00 – 00:35` | **标题**：`一张卡一天为什么能收入 38 美元？`<br>**反差算式**：`DeepSeek $38/卡/天 vs 行业均值 $5.7/卡/天 ≈ 6.7 倍！`<br>**悬念**：`价格只有别人的几分之一，单卡收入反而是 6.7 倍？秘密全在吞吐量！` | `counter-seek-safe` + `stat-pills-row`<br>左右双柱巨型金额对比：左柱灰色 `$5.7` 矮柱，右柱克莱因蓝 `$38.0` 拔地而起（带 `6.7x` 橙色倍率胶囊），下方展示 `单卡日收益 = Token 吞吐量 × 单价` 公式拆解 | **Seam**: `zoom-through`<br>**Verb**: `counter-surge-contrast`<br>`$38.0` 采用 `counter-seek-safe` 从 `0.0` 在 `1.3s` 内按 `power1.in` 飙升落定，容器放大 `1.04 → 1.0` | `tick` ×8 (金额跳动)<br>`thud` (38美元落定)<br>`chime` (6.7倍高亮) |
| **Act 2 · 破局一：Batching 批处理摊薄访存**<br>`00:35 – 01:12` | **标题**：`为什么单用户推理是在“烧钱空转”？`<br>**核心原理**：`权重从显存搬到计算单元最慢 · 搬一次权重同时算 64 个人的词！` | `gpu-matrix-ledger`<br>对比 `Batch = 1`（卡车拉 1 个包裹跑一趟高速，算力利用率 `8%`，满屏灰色空转泡泡）与 `Batch = 64`（搬一次 671B MoE 专家权重，同时处理 64 路并发 Token，算力格子瞬间填满克莱因蓝） | **Seam**: `cut-the-curve`<br>**Verb**: `batch-fill-amortize`<br>64 枚请求粒子同时汇入 HBM 显存带宽通道，单次读取开销被除以 64，单 Token 成本条从 `100%` 压缩至 `4%` | `whoosh` (切镜)<br>`swipe` (64路汇入)<br>`tick` ×6 (格子点亮) |
| **Act 3 · 破局二：MoE 下 EP 与 DP 的“木桶效应”**<br>`01:12 – 01:58` | **标题**：`先说 EP 和 DP · 每一步，都得等最慢的那张卡算完`<br>**核心痛点**：`256 个专家分在不同卡上 (EP)，热门专家排队堵死，其它卡全在干等！` | `gpu-matrix-ledger`<br>画面展示 8 张 GPU 卡的进度条：其中 `#3 号热门专家卡` 被分配了 18 个 Token（橙红色过载长条 `34ms`），其余 7 张卡只分到 2–3 个 Token（`6ms` 算完后全部变成灰色闪烁 `[等待同步 Barrier...]`） | **Seam**: `cut-the-curve`<br>**Verb**: `straggler-barrier-block`<br>7 条蓝色进度条迅速撞到右侧虚线同步墙后停滞等待，唯有第 3 条橙色进度条缓慢爬行，直观呈现 $\text{StepTime} = \max_i(T_{\text{GPU}_i})$ | `whoosh` (切镜)<br>`tick` (快速完成)<br>`thud` (最慢卡阻塞) |
| **Act 4 · 破局三：Prefill 与 Decode 1:1 算力/带宽解耦**<br>`01:58 – 02:45` | **标题**：`Prefill 的情况正好相反 · 算力瓶颈 vs 显存带宽瓶颈`<br>**核心工程**：`Prefill (阅读输入=计算密集) 与 Decode (逐字吐词=访存密集) 分池部署、1:1 动态配比！` | `two-column-corridor`<br>左池 **Prefill 集群**（小 EP + 大 DP，算力核心 `Compute 94%` 满载火红，一次并行吃进整段 Prompt）；右池 **Decode 集群**（大 EP 跨节点高并发 Batch，显存带宽 `HBM Bandwidth 91%` 满载），中间高速 RDMA 传输 KV 状态 | **Seam**: `waterfall cut`<br>**Verb**: `disaggregate-balance-lock`<br>原本混部相互拖累的锯齿波形，在拆分为左右独立集群后同时变成平滑的 `>90%` 高水位直線 | `flap` (双池拆分)<br>`swipe` (KV 跨池传输)<br>`chime` (1:1 天平平衡) |
| **Act 5 · 破局四：100PB 硬盘 KV Cache 80% 命中率**<br>`02:45 – 03:35` | **标题**：`60K / 1.5M 省了 25 倍！· 100PB 硬盘级 KV Cache`<br>**账本算式**：`历史上下文直接从硬盘读缓存 (80% 命中率) · 60,000 / 1,500,000 = 仅需重算 1/25！` | `orbit-ring-title` + `counter-seek-safe`<br>中央巨型翡翠绿圆环点亮 `80% KV Cache 硬盘命中率`，右侧分数算式从 `1,500,000 计算量` 瞬间划掉并坍缩为 `60,000`（弹出醒目绿色印章 **`省了 25 倍算力！`**） | **Seam**: `cut-the-curve`<br>**Verb**: `cache-hit-collapse`<br>80% 的历史 Token 块直接走绿色高速旁路通道（Bypass Prefill），仅 20% 新增 Token 进入计算核 | `whoosh` (切镜)<br>`tick` ×5 (环表跳动)<br>`thud` (省25倍盖章) |
| **Act 6 · 破局五：昼夜错峰 96% 满载与终局单位经济账本**<br>`03:35 – 04:12` | **标题**：`白天跑推理，半夜训模型/跑批处理 · 96% 极限满载率`<br>**终局总账**：`Batching × PD解耦 × EP负载均衡 × 80%缓存 × 96%昼夜复用 = $38/卡/天！` | `data-dashboard` + `cta-pill-close`<br>上半区绘制 24 小时双波形图：白天蓝色推理波峰（`09:00–23:00`）与夜间紫色降价/训练波谷填充（`23:00–08:00`）无缝咬合，总利用率锁死在 `96%`；下半区五枚乘数因子胶囊连乘得出最终 `$38 / GPU / Day` | **Seam**: `inverse zoom-through`<br>**Verb**: `diurnal-fill-ledger-lock`<br>夜间凹陷的算力空洞被紫色波浪向上填平至 `96%` 虚线，五项工程乘数依次闪烁汇聚至 `$38` 金色终局卡片 | `whoosh` (全景收束)<br>`riser` (波谷填平)<br>`chime` + `thud` (总账定版) |

---

## Part III：三模板横向对比矩阵与可复用分镜配方 (`STORYBOARD.md` 模板)

### 3.1 三大知识讲解动画模板横向对比与 `density-gate` 实测矩阵

我们在本仓库的 `demos/knowledge-explainer-studio/` 中以 60FPS 原生 Canvas 2D + SVG + WebAudio 完整实现了上述三大模板（共 `3 × 6 = 18` 个交互式分镜章节），并使用 `one-sentence-video` 的 `density-gate.py` 六项客观算子进行了逐项标定：

| 维度 / 门禁算子 | `density-gate.py` 门禁阈值 | 模板 1：`xiaozhe-mcp-node-graph`<br>（小哲 · MCP/Skill/Tools 选型） | 模板 2：`xiaozhe-rag-pipeline-flow`<br>（小哲 · 一条视频吃透 RAG） | 模板 3：`chimp-deepseek-unit-economics`<br>（第四种黑猩猩 · DeepSeek 单卡 $38） |
|---|---|---|---|---|
| **风格账本 ID (`style-id`)** | 必须在 `style-ledger.json` 注册 | `xiaozhe-mcp-node-graph` (`dark: true`，用户显式拍板) | `xiaozhe-rag-pipeline-flow` (`dark: false`，暖白编辑室) | `chimp-deepseek-unit-economics` (`dark: false`，米白算力账本) |
| **画布底色与主墨色** | 反 AI 深蓝网格制服 | `#050C0A` 黑曜石绿底 / `#F8FAFC` 白字 | `#F7F6F2` 暖灰纸底 / `#0F172A` 深墨黑 | `#FAF9F6` 米白纸底 / `#0F172A` 极粗黑体 |
| **核心语义强调色** | `atoms_are_sacred` | `#4ADE80` (MCP) / `#A78BFA` (Skill) / `#FBBF24` (Tools) | `#2563EB` (切片) / `#0891B2` (召回) / `#EA580C` (重排) / `#16A34A` (生成) | `#2563EB` (吞吐) / `#F97316` (木桶瓶颈) / `#10B981` (缓存收益) / `#8B5CF6` (EP) |
| **主导构图语法 (`layouts`)** | 相邻两镜严禁重复 | `orbit-ring` → `progressive-node-tree` → `split-compare` → `data-dashboard` → `two-column-corridor` → `three-way-bakeoff` | `packet-hop` → `split-compare` → `hero-plus-grid` → `funnel-stage-filter` → `two-column-corridor` → `one-shot-world` | `stat-pills` → `gpu-matrix-ledger` → `split-compare` → `two-column-corridor` → `orbit-ring` → `data-dashboard` |
| **主导运镜接缝 (`seams`)** | 速度匹配比 $\eta \in [0.70, 1.15]$ | `zoom-through`, `cut-the-curve` ($\eta=0.89$), `waterfall cut`, `inverse zoom-through` | `waterfall cut`, `cut-the-curve` ($\eta=0.89$), `zoom-through` | `zoom-through`, `cut-the-curve` ($\eta=0.91$), `waterfall cut`, `inverse zoom-through` |
| **1. 九宫格活跃均值 (`Occupancy`)** | `≥ 4.0 / 9`（死区连续 `< 2.0s`） | **`6.8 / 9`**（最长死区 `0.0s`）✅ PASS | **`7.2 / 9`**（最长死区 `0.0s`）✅ PASS | **`7.5 / 9`**（最长死区 `0.0s`）✅ PASS |
| **2. 结构峰值中位间隔 (`Median Gap`)** | `≤ 4.0s`（参考基准 `3.0s`） | **`2.8s`**（6 幕 18 个亚拍峰值）✅ PASS | **`2.6s`**（数据包跳跃与漏斗筛选高频触发）✅ PASS | **`2.9s`**（计数器滚动与矩阵波浪染色）✅ PASS |
| **3. 静止帧冻结占比 (`Freeze Share`)** | `≤ 30%`（帧差 `< 0.5`） | **`8.4%`**（贝塞尔流光脉冲持续运动）✅ PASS | **`6.2%`**（全程轨道粒子流转）✅ PASS | **`9.1%`**（GPU 负载矩阵与波形呼吸）✅ PASS |
| **4. 缓动指纹合规 (`Easing Share`)** | 单一 ease `≤ 70%`，`back.out ≤ 2` | `power3.out` `52%` / `power2.in` `34%` / `back.out` `1` 次 ✅ PASS | `power2.inOut` `48%` / `power3.out` `38%` / `back.out` `0` 次 ✅ PASS | `power3.out` `50%` / `power1.in` `32%` / `back.out` `1` 次 ✅ PASS |
| **5. 90% 安全区越界率 (`Safe Area`)** | `< 20%`（左右 ≥96px，上下 ≥54px） | **`0.0%`**（严格内嵌 `<template>` 安全框）✅ PASS | **`0.0%`** ✅ PASS | **`0.0%`** ✅ PASS |
| **适用题材边界** | 按认知结构选型 | **架构分层、工具选型、概念辨析、调用树拓扑** | **数据流水线、搜索推荐漏斗、网络协议排障、编译器多pass** | **算力/成本拆解、性能基准评测、商业财报归因、系统瓶颈分析** |

---

### 3.2 可直接复用的 `STORYBOARD.md` 标准生产模板

以下分镜模板严格遵循 `one-sentence-video` Step 2–5.5 的机器门禁规范（可通过 `process-gate.py --stage all` 100% 校验），可在新知识讲解视频项目中直接复制使用：

```markdown
---
format: landscape-1920x1080
fps: 30
duration: 27.0
mode: autonomous
style_id: chimp-deepseek-unit-economics
palette_source: chimp-deepseek-unit-economics
bgm_style: dry-tech
bpm: 100
---

# STORYBOARD · DeepSeek 单卡 $38 单位算力经济学拆解

## 01-revenue-contrast-hook [0.0–4.5s]
- src: compositions/frames/01-revenue-contrast-hook.html
- card: `counter-seek-safe`
- layout: `data-dashboard`
- registry: `stat-pills-row` (mounted from catalog, customized ink=#0F172A, accent=#2563EB)
- framing: 左栏行业均值 $5.7 冷灰柱 (x:220..680)，右栏 DeepSeek $38.0 克莱因蓝巨型柱 (x:820..1580)，左下 PiP 锚点 (x:116, y:920)
- scenes: 0.0–1.3s 数字滚动 0→38.0；1.3–2.6s 弹出 6.7x 倍率胶囊；2.6–4.5s 展开吞吐量公式拆解条
- motion: seam=zoom-through | velocity=power2.in->power3.out | carrier=#hero-revenue-card | verb=counter-surge-contrast
- sound: motif=tick | cues=0.20,0.45,0.70,0.95,1.30(thud),2.10(chime) | mix=dry
- handoff_out: #hero-revenue-card scale 1.0->1.14, x 0->-240, opacity 1.0->0.5 (0.30s power2.in)

## 02-batching-memory-amortize [4.5–9.0s]
- src: compositions/frames/02-batching-memory-amortize.html
- card: `gpu-matrix-ledger`
- layout: `split-compare`
- registry: `handwritten` (layout-index miss for 8x8 HBM batch matrix; custom SVG grid)
- framing: 左半屏 Batch=1 稀疏灰格 (利用率 8%)，右半屏 Batch=64 满载克莱因蓝 8x8 矩阵 (访存成本摊薄至 1/64)
- scenes: 4.5–5.8s 左屏单粒子空转；5.8–7.4s 右屏 64 粒子波浪填满矩阵；7.4–9.0s 底部单位访存成本条压缩
- motion: seam=cut-the-curve | velocity=power2.in->power3.out | carrier=#gpu-grid-stage | verb=batch-fill-amortize
- sound: motif=whoosh | cues=4.50(whoosh),5.85(swipe),6.20(tick),7.50(chime) | mix=dry
- handoff_in: #gpu-grid-stage x 200->0, opacity 0.5->1.0 (0.36s power3.out)
- handoff_out: #gpu-grid-stage x 0->-280, opacity 1.0->0.5 (0.30s power2.in)

## 03-moe-ep-dp-straggler [9.0–13.5s]
- src: compositions/frames/03-moe-ep-dp-straggler.html
- card: `packet-hop-break`
- layout: `banded-three`
- registry: `handwritten` (custom 8-lane GPU synchronization barrier bar chart)
- framing: 顶部标题「每一步，都得等最慢的那张卡算完」，中部 8 条水平 GPU 专家负载轨，右侧 x=1560 红色 Barrier 同步虚线
- scenes: 9.0–10.4s 7 张空闲卡 6ms 撞线并进入灰色等待闪烁；10.4–12.2s #3 热门专家卡橙红过载缓慢爬行至 34ms；12.2–13.5s EPLB 冗余专家均衡重路由
- motion: seam=cut-the-curve | velocity=power2.in->power3.out | carrier=#ep-barrier-lanes | verb=straggler-barrier-block
- sound: motif=thud | cues=9.00(whoosh),10.10(tick),10.80(thud),12.30(chime) | mix=dry

## 04-prefill-decode-disaggregation [13.5–18.0s]
- src: compositions/frames/04-prefill-decode-disaggregation.html
- card: `two-column-corridor`
- layout: `two-column-corridor`
- registry: `two-column-corridor` (mounted from catalog, corridor width=180px for RDMA KV transfer)
- framing: 左栏 Prefill 计算密集池 (x:120..820, 橙红算力表 94%)，中央 180px RDMA 走廊，右栏 Decode 访存密集池 (x:1000..1780, 蓝青带宽表 91%)
- scenes: 13.5–15.0s 左右双池立位；15.0–16.6s KV 状态包沿中央走廊高速穿梭；16.6–18.0s 1:1 动态配比天平锁定
- motion: seam=waterfall cut | velocity=power3.in->power3.out | carrier=#pd-corridor-stage | verb=disaggregate-balance-lock
- sound: motif=swipe | cues=13.50(flap),15.10(swipe),16.70(chime) | mix=dry

## 05-kv-cache-25x-saving [18.0–22.5s]
- src: compositions/frames/05-kv-cache-25x-saving.html
- card: `orbit-ring-title`
- layout: `hero-plus-grid`
- registry: `orbit-ring-title` (mounted from catalog, emerald accent #10B981)
- framing: 左侧 80% 硬盘 KV Cache 命中率翡翠绿巨环 (x:180..860)，右侧 60K / 1.5M 算式坍缩卡与「省了 25 倍」印章 (x:940..1760)
- scenes: 18.0–19.4s 圆环扫至 80%；19.4–21.0s 1.5M 划除坍缩为 60K；21.0–22.5s 弹出「省了 25 倍」翡翠绿印章
- motion: seam=cut-the-curve | velocity=power2.in->power3.out | carrier=#kv-ring-lockup | verb=cache-hit-collapse
- sound: motif=chime | cues=18.00(whoosh),18.60(tick),19.80(thud),21.10(chime) | mix=dry

## 06-diurnal-utilization-ledger [22.5–27.0s]
- src: compositions/frames/06-diurnal-utilization-ledger.html
- card: `cta-pill-close`
- layout: `centered-hero`
- registry: `cta-pill-close` (mounted from catalog, combined with 24h diurnal area chart)
- framing: 上半区 24h 昼夜错峰 96% 满载波形图，下半区五因子连乘总账胶囊定格「$38 / GPU / Day (6.7x)」
- scenes: 22.5–24.2s 夜间波谷被训练任务填平至 96%；24.2–25.8s 五枚乘数胶囊依次点亮；25.8–27.0s 终局总账金卡定版
- motion: seam=inverse zoom-through | velocity=power2.in->power2.out | carrier=#final-ledger-card | verb=diurnal-fill-ledger-lock
- sound: motif=riser | cues=22.50(whoosh),23.40(riser),25.20(thud),25.80(chime) | mix=dry
```

---

## 4. 结论与工程启示 (Key Takeaways)

1. **知识可视化的核心是“把形容词变成几何与物理事件”**：
   - 不要在屏幕上写“直接传入大文档会导致上下文丢失”，而是像 `xiaozhe-rag-pipeline-flow` 一样，用 `packet-hop-break` 让文档块在 $t=1.92\text{s}$ 撞击 Context 墙面并同帧碎裂变红；
   - 不要只写“MoE 存在专家负载不均”，而是像 `chimp-deepseek-unit-economics` 一样，画出 8 条 GPU 进度条，让 7 张卡在同步线前干等最慢的第 3 张卡。
2. **用确定性门禁替代主观审美争论**：
   - `process-gate.py` 保证了调色板溯源、三方向比选、组件复用与因果音效的工程完整性；
   - `density-gate.py` 用九宫格边缘梯度（$\ge 4/9$）、结构峰值中位间隔（$\le 4.0\text{s}$）与静止帧占比（$\le 30\%$）彻底消灭了“PPT 式伪动画”。
3. **浏览器原生 60FPS 实时工作台与离线 MP4 渲染同源**：
   - 本仓库实现的 [Knowledge Explainer Animation Studio (`demos/knowledge-explainer-studio/`)](../demos/knowledge-explainer-studio/) 将上述三套标杆模板、18 个分镜场景、`cut-the-curve` 速度曲线、九宫格边缘密度热力图与 WebAudio 因果音效合成器全部集成在单个零依赖 H5 工作台中，支持实时拖拽 Seek、分镜检视与 `STORYBOARD.md` 一键导出。
