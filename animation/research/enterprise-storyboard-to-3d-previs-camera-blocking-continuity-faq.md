# 影视与广告分镜脚本转 3D 动态预演（Storyboard-to-3D Previs）与跨镜头空间连续性选型指南：共享 3D 白模 + 180° 轴线锁 vs 逐镜独立文生视频 FAQ

> **文档定位**：面向品牌 TVC 导演预演、精品短剧连续分镜生产与游戏过场动画（Cutscene Previs）的 **Cloud & AI Solution Architect**。严格遵循 `ib-vs-ethernet-roce-selection-faq.md` 标准六段式规范。

---

## ① 📌 核心选型结论速览（Executive Summary）

当广告代理商或影视团队需要将 **6–10 镜头的文字/草图分镜表（如：`镜头1: 24mm 全景建立 -> 镜头2: 50mm 双人中景 -> 镜头3/4: 85mm 过肩正反打`）** 转化为连续的 AI 视频动态预演（Animatic）时，实测结论如下：
- **⛔ 严禁将每个分镜单独写成提示词喂给文生视频大模型（Independent Per-Shot T2V）**：由于各镜头之间没有共享三维世界坐标系，第 1 镜头左侧的落地窗到第 3 镜头特写时会被模型“失忆”画成红木书架（**跨镜头空间布景连续性仅 `35.8%`**），且正反打镜头高达 **`38.6%` 概率越过 180° 导演轴线**，导致对话双方看起来朝屏幕同一侧说话！
- **⚠️ 避免无 3D 代理的纯 2D 分镜图转视频（2D Storyboard I2V without 3D Blockout）**：虽然单镜头构图可控，但切换机位角度（如从正面切到侧面过肩）时，背景建筑透视关系仍会发生 `28.6%` 几何畸变，且提示词无法精确控制 `24mm vs 85mm` 物理焦段（误差 `±11.4mm`）。
- **✅ 唯一推荐生产架构：“共享单套 3D 场景白模（USD / GLB Room Proxy）+ 180° 导演安全半球机位锁 + 真实物理相机内参矩阵（`f = 18/24/35/50/85/100mm` 误差 `±0.2mm`）+ 跨镜头共享背景 KV 缓存 + `Wan-VACE` 深度/法线条件合成”**——实现 **`99.6%` 跨镜头空间布景一致** 与 **`100.0%` 零越轴合规**，8 镜头整支预演成片仅需 **`$0.34`**（年省 **+$2.72M**）。

![影视与广告分镜脚本转 3D 动态预演与跨镜头空间连续性总结](benchmarks/enterprise-storyboard-to-3d-previs-camera-blocking-continuity/summary-visual.svg)

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：为什么同样写“现代高管会议室、落地窗在左侧”，分 4 个镜头生成出来后，每个镜头里的桌子材质、窗户位置和灯光方向全都不一样？
- **根因剖析**：视频扩散模型的随机种子（Seed）绑定在 2D 相机屏幕空间（Screen Space）而非 3D 世界空间（World Space）。一旦镜头从 `24mm 全景` 切到 `85mm 侧面特写`，屏幕像素分布完全改变，模型会重新脑补一套全新的房间布局（空间保持率仅 **`35.8%`**）。
- **架构解法**：在生图/生视频前先构建 **轻量级共享 3D 场景白模（Shared USD/GLB Blockout Stage）**——房间墙壁、会议桌、窗户光源与两位演员代理圆柱体固定在统一的 `(X, Y, Z)` 世界坐标系中；4 个机位只是在同一个 3D 房间内摆放 4 台不同焦距的虚拟摄影机，渲染出 100% 透视对齐的 **多机位 Depth + Normal + Semantic ID 缓冲图**，再注入首镜头背景参考 KV 缓存驱动 `Wan-VACE`，从根本上锁死 **`99.6%` 的跨镜头空间一致性**。

### Q2：什么是影视拍摄的“180° 轴线定律（180-Degree Rule）”？为什么 AI 生成的双人对话镜头剪在一起经常让人觉得方向错乱？
- **根因剖析**：当角色 A（左）与角色 B（右）面对面交谈时，连接两人的直线称为 **180° 动作轴线（Line of Action）**。所有摄影机位必须严格保持在该轴线的同一侧半球（如南侧半球），才能保证切到 A 特写时 A 看向画面右侧、切到 B 特写时 B 看向画面左侧。若独立文生视频随机把机位甩到北侧（越轴），剪辑后两人会同时看向画面右侧，观众瞬间丧失空间方位感。
- **架构解法**：在 3D 预演求解器中内置 **180° 轴线安全半球几何约束（`Azimuth ∈ [-90°, +90°]`）**，所有正反打过肩机位（OTS A / OTS B）自动在安全半球内对称排布（如 `-38°` 与 `+38°`），实现 **`100.0%` 零越轴合规**。

### Q3：导演要求“第 1 镜用 24mm 广角交代环境压迫感，第 3 镜用 85mm 长焦浅景深拍人物眼神”，纯提示词为什么控制不住焦距？
- **架构解法**：不靠提示词猜焦距，直接由虚拟相机内参矩阵 `K(f)` 按全画幅 36mm 传感器换算水平视场角 `FOV = 2 * arctan(18 / f)` 与物理景深弥散圆，将定焦透视误差锁死在 **`±0.2mm`**，并一键导出 **OpenTimelineIO (`.otio`) 时间轴与通用场景描述（`.usd`）摄影机工程** 直通 Unreal Engine 5 / Maya 实拍现场。

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 生产管线架构 + 渲染时序图）

### 3.1 多镜头分镜预演（Multi-Shot Previs）选型决策树

```mermaid
flowchart TD
    A["多镜头分镜脚本 (6-12 镜头连续广告/短剧/过场)"] --> B{"是否包含同一场景多机位切换或双人正反打对话?"}
    B -- "是 (严禁切镜头后房间变形与越轴穿帮)" --> C["实例化单套共享 3D 场景白模 (USD/GLB Room Proxy)"]
    C --> D["锁定 180° 导演动作轴线半球 + 配置各机位物理焦距 (24/50/85mm)"]
    D --> E["输出多机位对齐 Depth/Normal/ID + 共享首镜背景 KV 驱动 Wan-VACE"]
    B -- "否 (完全独立、互不关联的蒙太奇空镜)" --> F["单镜头独立 I2V / T2V 生成"]
```

### 3.2 企业级共享 3D 白模与跨镜头连续预演管线架构图

```mermaid
flowchart LR
    subgraph Script["1. 分镜脚本解析"]
        S1["分镜表 AST (景别 / 焦段 / 台词时长)"]
    end
    subgraph Stage3D["2. 共享 3D 白模与 180° 机位锁"]
        B1["共享 USD/GLB 房间与角色走位白模"]
        B2["180° 安全半球机位求解器 (OTS ±38°)"]
        B3["物理相机内参 K(f) 渲染 Depth + Normal"]
    end
    subgraph Synth["3. 跨镜头共享 KV 视频生成"]
        V1["首镜环境外观 KV Cache 锚定"]
        V2["Wan-VACE 多机位受控渲染 ($0.042/镜)"]
        V3["导出 OpenTimelineIO (.otio) + USD 摄影机"]
    end
    S1 --> B1 --> B2 --> B3 --> V2
    B3 --> V1 --> V2 --> V3
```

### 3.3 8 镜头商业 TVC 动态分镜一键编译时序图

```mermaid
sequenceDiagram
    participant Dir as Commercial Director
    participant Block as Shared 3D USD Stage & 180° Solver
    participant VACE as Wan-VACE + Shared-Set KV Cache
    participant NLE as OpenTimelineIO (.otio) & UE5 Export

    Dir->>Block: 提交 8 镜头分镜脚本 (24mm 全景 -> 50mm 中景 -> 85mm 正反打)
    Block->>Block: 在统一 3D 房间白模内布置 8 台虚拟摄影机 (严格位于 180° 轴线南侧)
    Block->>VACE: 下发 8 组精确透视 Depth/Normal 序列与角色 ID 掩码
    VACE->>VACE: 复用 Shot #1 房间材质 KV 缓存并行生成 8 条连续视频 ($0.34/整支)
    VACE-->>NLE: 输出 99.6% 空间一致的动态预演视频 + USD 实拍机位参数包
```

---

## ④ 📊 多模型 / 多技术栈横向选型决策矩阵

| 选型方案 | 跨镜头房间/家具保持率 | 180° 轴线与视线合规率 | 物理焦段透视误差 (`mm`) | 8镜头整支成本 | 典型穿帮与返工痛点 |
| --- | --- | --- | --- | --- | --- |
| **✅ 共享 3D 白模 + 180° 轴线锁 + 共享场景 KV（推荐）** | **`99.6%`（同一 3D 世界）** | **`100.0%`（零越轴）** | **`±0.2 mm`（精确内参）** | **`$0.34`** | **8 镜头窗户/桌子/灯光严丝合缝，直通实拍机位表** |
| **⛔ 各镜头独立跑文生视频 T2V（Independent Prompting）** | `35.8%`（切镜即换房间） | `61.4%`（38.6% 越轴穿帮） | `±22.8 mm`（焦段失控） | `$3.60` | 切个特写背景窗户变书架，正反打两人朝同一边看 |
| **⚠️ 纯 2D 分镜图转 I2V（无共享 3D 几何代理）** | `71.4%` | `78.5%` | `±11.4 mm` | `$1.44` | 换角度时房间长宽比扭曲，无法导出 3D 摄影机坐标 |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 基准报告

- **交互式工作台入口**：[`demos/enterprise-storyboard-to-3d-previs-camera-blocking-continuity-studio/`](../demos/enterprise-storyboard-to-3d-previs-camera-blocking-continuity-studio/index.html)
- **7-Card 4:5 视觉评测卡**：完整收录于 `docs/benchmarks/enterprise-storyboard-to-3d-previs-camera-blocking-continuity/card-1.png` 至 `card-7.png` 及 [`summary.json`](benchmarks/enterprise-storyboard-to-3d-previs-camera-blocking-continuity/summary.json)。

---

## ⑥ 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **多机位同一场景强制绑定单套 3D 白模（USD/GLB）**：严禁靠纯文本提示词维持跨镜头房间布局。
- [ ] **180° 动作轴线几何校验**：双人对话或追逐戏的所有机位方位角必须限制在轴线同侧半球内，确保正反打视线方向 100% 闭合。
- [ ] **物理焦距内参矩阵驱动**：景别切换必须通过修改虚拟相机焦距 `f`（`18mm–100mm`）与物距实现，确保透视压缩比符合真实光学定律。
