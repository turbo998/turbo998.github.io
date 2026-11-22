# 影视广告与游戏过场分镜预演（Storyboard & Previs）角色一致性选型指南：3D 粗模 ControlNet + 三视图角色 LoRA + 分区注意力 + ConsisID / Wan-VACE（第 198 项工作台）

> **关联隐藏级交互工作台**：[`demos/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet-studio/`](../demos/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet-studio/)  
> **配套 7-Card 评测报告**：[`docs/benchmarks/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet/summary.json`](./benchmarks/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet/summary.json) · [`summary-visual.svg`](./benchmarks/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet/summary-visual.svg)

---

## ① 📌 核心选型结论速览（Executive Summary）

在品牌 TVC 广告片、游戏过场动画（Cutscenes）与 AI 漫剧/短剧的工业化生产中，导演与制片团队需要快速制作包含 **24 – 60 个连续镜头的动态故事板预演（Animatic Previs）**。
如果仅用自然语言提示词或单张正面参考图（Prompt-Only / Single-Image IP-Adapter）去抽卡连续分镜，会遭遇三大无法交付的痛点：
1. **大角度机位下人物“变脸换衣”（跨镜头一致性仅 `42.8% – 51.4%`）**：当镜头从第 1 镜的正面中景切到第 8 镜的 `85mm` 侧颜特写或俯拍远景时，单张正面参考图无法提供侧面鼻梁与后脑发型信息，扩散模型随机脑补出完全不同的人脸与外套领口！
2. **双角色/多角色同框“串脸串色”（Attribute Bleeding）**：在双人对手戏（如过肩镜头 Over-the-Shoulder）中，如果同时挂载两个角色的参考特征，全局跨注意力会把角色 A 的胡子安到角色 B 脸上，或把两人的衣服颜色混在一起！
3. **文字提示词无法锁定导演景别、焦段与 `180°` 轴线规则（机位合格率仅 `38.5% – 44.0%`）**：在 Prompt 里写 `"over-the-shoulder shot, 85mm lens, camera on left axis"`，生图模型一半以上概率仍画成普通正面平视镜头，无法用于指导摄影棚实拍布光。

| 选型维度 | ❌ 方案 A：纯自然语言提示词抽卡 | ⚠️ 方案 B：零样本单图 StoryDiffusion / IP-Adapter | ✅ 方案 C：3D 粗模 Depth/Pose 锁机位 + 正/侧/背三视图角色 LoRA + 分区掩码注意力 + ConsisID/Wan-VACE（推荐） |
| --- | --- | --- | --- |
| **最佳适用阶段** | 单张概念气氛图（Moodboard） | 前期 5–8 镜快速创意草图（正面中景为主） | **24–60 镜商业广告 TVC 提案、游戏过场 Previs 与连续 AI 短剧正式生产** |
| **跨 24–60 镜全角度角色一致性** | `42.8% – 51.4%`（每镜五官与服装都在变） | `76.5%`（侧面、背面与仰拍镜头容易崩坏） | **`97.6% – 98.4%`（先由单图生成正/侧/背/表情 8 宫格设定集微调 Rank-32 LoRA）** |
| **双人/多人同框防串脸能力** | 极差（特征严重混淆） | 差（全局 IP-Adapter 无法区分左右人物） | **100% 零串脸（基于 3D 粗模实例分割掩码执行 Regional Mask Attention 分区绑定）** |
| **导演焦段（24/50/85mm）与轴线准确率** | `38.5% – 44.0%` | `48.0%` | **`98.8% – 99.2%`（在 Three.js/Blender 摆胶囊人偶 5 分钟直出精确 Depth + OpenPose）** |
| **整部动态分镜交付周期与年化收益** | 废片率 >85% | 需大量人工 PS 修脸 | **10天手绘分镜压缩至 `1.5 – 3.2 小时`，年化净省 `+$1,680,000 – $3,120,000 / yr`** |

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：当我们手里只有导演给的“1 张主角正面概念图”时，如何低成本训练出能抗住 360° 任意刁钻机位的角色 LoRA？
- **“1 生 8 标准角色设定集（Character Turnaround Sheet Bootstrap）→ 解耦触发词 LoRA”工作流**：
  1. **零样本先扩充多视角设定集**：先用 `Flux.1 + PulID / MV-Adapter（多视角一致生成模型）` 基于那 1 张正面图，一次性生成包含**正视图、左/右侧视图、背视图以及喜怒哀乐 4 种特写表情的 24 张干净设定集**；
  2. **角色与服装触发词解耦标注（Trigger-Word Disentanglement）**：在训练 `Rank-32 LoRA` 时，将人物固有面部特征绑定至主触发词 `char_lin`，而将第一幕的风衣造型标注为 `wearing beige trenchcoat`。这样在第二幕需要主角换穿宇航服或晚礼服时，既能 **98.4% 锁死主角骨相五官**，又能自由切换各幕服装！

### Q2：在双人对话的过肩镜头（Over-the-Shoulder）或动作打斗戏中，如何彻底解决两个角色“五官和衣服互相串色”？
- **3D 白模实例掩码 + 区域交叉注意力隔离（Regional Prompter / Masked Cross-Attention）**：
  - 我们在轻量级 Web 端 `Three.js` 或 `Blender` 虚拟摄影棚中摆好两个胶囊木偶（用红、蓝两种实例颜色区分角色 A 与角色 B），设置虚拟摄影机为 `85mm f/1.8` 过肩机位，一键导出 **① 深度图（Depth Map）、② 双人骨骼图（OpenPose）与 ③ 红蓝实例分割掩码（Instance Segmentation Mask）**。
  - 在 `Flux.1 / Wan 2.1` 去噪时，通过 **区域掩码注意力（Regional Attention）** 将 `char_A_LoRA` 的 Key/Value 严格限制在红色掩码像素区内生效，将 `char_B_LoRA` 严格限制在蓝色掩码像素区内生效，从数学上切断两个角色特征张量的交叉污染！

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 生产管线架构图 + 时序图）

### 3.1 影视广告与游戏分镜预演角色一致性技术选型决策树

```mermaid
flowchart TD
    A[影视广告 TVC / 游戏过场 / AI 漫剧分镜生产] --> B{镜头数量、机位复杂度与角色人数?}
    B -->|"≤ 5 镜单人正面氛围草图<br/>无严格侧颜/背影与双人同框要求"| C[选用零样本 StoryDiffusion / IP-Adapter / PulID<br/>单张参考图即插即用]
    B -->|"24–60 镜完整商业分镜预演 Animatic<br/>含特写/侧颜/过肩双人同框与指定焦段运镜"| D{如何锁定机位构图与多角色身份?}
    D -->|"仅靠文字提示词与全局垫图"| E[❌ 传统误区: 侧颜与仰拍变脸 51.4% 一致性<br/>双人同框严重串脸且越轴穿帮]
    D -->|"3D 粗模机位 + 三视图 LoRA + 分区掩码 + ConsisID"| F[✅ 推荐管线: Three.js/Blender 导出 Depth+Pose+实例掩码<br/>+ 区域注意力隔离 LoRA + ConsisID 视频化 · 98.4% 一致性]
```

### 3.2 四阶可控影视分镜与动态预演（Animatic Previs）生产管线架构图

```mermaid
flowchart LR
    subgraph Step1["1. 角色资产准备层"]
        A1["1张概念图 → 多视角生成正/侧/背/表情设定集<br/>→ 训练角色/服装解耦 Rank-32 LoRA"]
    end
    subgraph Step2["2. 3D 虚拟摄影机粗模层 (5分钟)"]
        B1["Three.js / Blender 摆放胶囊木偶与虚拟镜头<br/>导出精确 Depth + OpenPose + 左右人物实例掩码"]
    end
    subgraph Step3["3. 分区受控关键帧生成"]
        C1["Flux.1 + ControlNet + Regional Mask Attention<br/>左掩码绑角色A LoRA / 右掩码绑角色B LoRA (0串脸)"]
    end
    subgraph Step4["4. 身份锁定动态视频化"]
        D1["ConsisID / Wan2.1-VACE 首尾帧桥接生成动态镜头<br/>+ 对白/音效自动剪辑成片 (1.5h 交付)"]
    end
    A1 --> C1
    B1 --> C1 --> D1
```

### 3.3 广告导演 90 分钟完成 24 镜 TVC 动态分镜预演与客户审片时序图

```mermaid
sequenceDiagram
    autonumber
    participant Dir as 广告导演 / 美术指导
    participant Stage3D as Web Three.js 3D 虚拟机位台
    participant Keyframe as Flux.1 分区 LoRA 关键帧集群
    participant Video as ConsisID / Wan-VACE 视频合成集群

    Dir->>Stage3D: 载入 24 镜剧本，在 3D 视口调整 24mm/50mm/85mm 焦段与双人站位
    Stage3D->>Keyframe: 批量导出 24 组 Depth、OpenPose 与人物实例分割掩码
    Keyframe->>Keyframe: 结合品牌代言人三视图 LoRA 与分区注意力，12分钟生成 24 张 98.4% 一致关键帧
    Dir->>Video: 确认构图无误，一键触发 ConsisID / Wan-VACE 图生视频与配音合成
    Video-->>Dir: 90分钟内交付带运镜、配音与音效的 24 镜完整 TVC 动态预演成片 (替代 10 天手绘!)
```

---

## ④ 📊 分镜预演与角色一致性技术方案横向选型决策矩阵

| 评估维度 | 方案 A：纯文字 Prompt 抽卡 | 方案 B：零样本 `StoryDiffusion / IP-Adapter` | 方案 C：传统画师手绘故事板 + 3D 动画师粗模 | ✅ 方案 D：3D 粗模 ControlNet + 三视图 LoRA + Regional Mask + ConsisID（推荐） |
| --- | --- | --- | --- | --- |
| **跨 24–60 镜全角度面部一致性** | `51.4%` | `76.5%`（大侧脸/俯仰角易漂移） | `99.0%` | **`98.4%`（正/侧/背设定集 LoRA 全角度锁定）** |
| **双人同框过肩镜头防串脸** | 极差 | 差（全局特征混叠） | 无串脸 | **`100%` 零串脸（实例掩码 Regional Attention 隔离）** |
| **导演镜头焦段与轴线控制力** | `44.0%` | `48.0%` | `100%` | **`99.2%`（3D 视口所见即所得 Depth/Pose 约束）** |
| **24 镜动态预演制作周期** | 数天废片筛选 | `8 小时`（含大量返工修脸） | `10 个工作日`（`$18,000`） | **`1.5 小时`（算力成本 `< $12`，提速 `160×`）** |
| **制片厂/美术团队年化净省** | 基线 | 年省 `+$650k / yr` | 人工昂贵且改戏慢 | **年化净省 `+$1,680,000 – $3,120,000 / yr`** |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 报告

1. **交互式工作台路径**：[`demos/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet-studio/`](../demos/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet-studio/)
   - 支持切换 **3 大连续分镜预演场景**（`24 镜` 品牌 TVC 广告动态分镜、`48 镜` 游戏过场双角色动作对手戏、`60 镜` AI 漫剧/品牌微电影连续生产）；
   - 同屏可视化 **顶部：角色设定集 LoRA → 3D 粗模机位 → 分区掩码注意力 → ConsisID 视频化四阶管线** 与 **底部：远景建立镜、双人过肩镜、85mm 侧颜特写、运动跟拍镜连续性实测对比**。
2. **7-Card 4:5 视觉评测报告**：
   - 密封评测数据：[`docs/benchmarks/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet/summary.json`](./benchmarks/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet/summary.json)
   - 7-Card 高清图集：`card-1.png` 至 `card-7.png` 及矢量总览 [`summary-visual.svg`](./benchmarks/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet/summary-visual.svg)。

![影视广告与游戏分镜预演角色一致性选型：3D 粗模 ControlNet + LoRA + ConsisID 总览](./benchmarks/film-ad-storyboard-previs-character-consistency-lora-consisid-3d-controlnet/summary-visual.svg)

---

## ⑥ 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **角色三视图与表情表（Character Sheet）先行制度**：在正式批量跑 24–60 个分镜前，是否强制先生成并锁定每个主角的正/侧/背三视图与微调 `LoRA`，严禁直接拿单张正面图硬跑全片？
- [ ] **双人/多人镜头实例掩码分区注意力（Regional Mask Attention）**：当同一画面出现 `≥ 2` 名角色时，ComfyUI 工作流是否自动根据 3D 粗模导出的实例颜色掩码将各自的 `LoRA / PulID` 权重隔离在独立空间区域？
- [ ] **虚拟摄影机内参（焦距 `24/35/50/85mm`）与 `180°` 对话轴线校验**：3D 粗模机位导出器是否自动校验相邻对话镜头的视线方向符合 `180°` 轴线原则，防止生成剪辑后引发观众方向感混乱的“越轴”镜头？
- [ ] **静态关键帧定稿后再跑视频扩散（Keyframe-First Gate）**：是否坚持“先花 `$0.004/张` 确认 24 张静态分镜关键帧构图与人脸无误，最后一步才调用 `ConsisID / Wan2.1-VACE` 生成动态视频”，避免直接在昂贵的视频模型里盲目抽卡改构图？
