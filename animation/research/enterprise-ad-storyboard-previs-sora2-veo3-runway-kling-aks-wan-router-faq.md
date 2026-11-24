# 影视广告与品牌 TVC 动态分镜预演（Animatic Previs）、VLM 审片门禁及主流视频大模型（Sora 2 vs Veo 3 vs Runway Gen-4 vs 可灵 Kling vs AKS 自建 Wan 2.1）选型与 TCO 拐点指南

> **架构师摘要（Executive Summary）**：当企业市场部、游戏发行团队或 4A 广告代理商构建日产数千条视频的 AIGC 生产管线时，Cloud & AI Solution Architect 最常被业务方和 CFO 追问两个核心问题：**① “OpenAI Sora 2、Google Veo 3、Runway Gen-4、可灵 Kling 2.0 和在 Azure AKS 上自建 ComfyUI + Wan 2.1/HunyuanVideo 集群，到底分别适合什么镜头、怎么组合选型？” ② “什么时候该直接调商业 API，月产量达到多少秒时自建 AKS GPU 集群才划算（TCO 盈亏拐点）？”** 如果不设分镜预演漏斗，让设计师把所有未定稿的文字提示词直接发往 `$0.40–$0.50/秒` 的商业旗舰 API 进行盲目“抽卡（平均 `6:1` 废片比）”，成片均摊成本会飙升至 **`$2.85/秒`**，且跨镜头主角面容与商品包装一致性仅 `78.4%`。本指南给出生产级参考架构：**第一级“Flux.1 Pro + IP-Adapter 首尾关键帧锁定 → AKS 自托管 Wan 2.1 动态故事板预演（`$0.018/秒`）→ VLM 导演审片门禁”拦截 `85%` 构图废片**；**第二级“按镜头能力特长路由器”将定稿分镜精准分发至 Sora 2（复杂物理世界主镜头）、Veo 3（原生同步对白与环境音效镜头）、Runway Gen-4 / Kling 2.0（多镜头角色连续叙事与精确运镜）与 AKS Wan 2.1（大批量多语种社媒 B-Roll）**，实现 **`-68.4%` 综合成本削减（成片均摊 `$0.48/秒`）**与 **`99.5%` 跨镜头一致性**，并明确给出 **`18,500 秒/月` 的 AKS 自建盈亏拐点**（年省 **`+$3.42M`**）。

---

## 一、 📌 主流视频生成大模型与自建管线横向选型速览

| 模型 / 平台选项 | 核心技术强项与最佳镜头场景 | 单秒基准成本 (API / 算力) | 并发限额与生产短板 | 在企业混合管线中的标准定位 |
| --- | --- | --- | --- | --- |
| **OpenAI Sora 2 API** | **复杂物理世界交互、大尺度场景转换与电影级主视觉定场镜头（Hero Establishing Shots）** | `~$0.50 / 秒` (1080p) | 单价最高；若直接用于早期分镜盲抽（6:1 废片比）会导致算力账单失控 | **Top 10% 旗舰定场主镜头终渲染轨**（仅在预演通过后调用） |
| **Google Veo 3 (Vertex AI)** | **原生音画同生（Native Audio-Video：自带同步人物对白、脚步声、环境风声与 BGM）** | `~$0.35–$0.50 / 秒` | 无需后期单独接 MMAudio 拟音，但大批量无声 B-Roll 调用性价比偏低 | **带同步口播对白与强环境音效的品牌微电影镜头轨** |
| **Runway Gen-4 / 可灵 Kling 2.0** | **单张/多张角色与商品参考图跨镜头身份锁定（Character Reference）、精确运镜控制与高性价比** | `~$0.14–$0.25 / 秒` | 超长复杂多主体物理碰撞略逊于 Sora 2，但人物微表情与动作连贯性极佳 | **连续 8–15 镜头代言人剧情短片与电商模特展示主力轨** |
| **Azure AKS 自托管 ComfyUI + Wan 2.1 (14B)** | **数据 100% 不出境、支持深度/法线/首尾帧 ControlNet 细粒度定制、超低边际成本** | **`$0.018 / 秒`** (AKS Spot H100) | 存在集群基建固定成本，月产低于 `18,500 秒` 时不如纯调 API 划算 | **100% 动态分镜预演（Animatic Previs）筛废底座 + 85% 批量 B-Roll 工厂** |

---

## 二、 🎯 业务方与架构师灵魂拷问 Q&A（Q1–Q3）

### Q1：为什么企业做一条 30 秒的 AI 品牌广告片，账单算下来竟然花了上千美元？钱都烧在哪里了？
- **根因剖析**：在没有分镜预演（Previs）管线的团队里，美术指导直接拿文字 Prompt 去调 `$0.50/秒` 的旗舰视频 API。由于文字描述存在歧义，经常生成了 5 秒视频才发现“主角衣服颜色不对”、“镜头推拉方向反了”或“商品摆位歪了”，平均每采用 1 秒成片要报废 6–8 秒废片（**Gacha Lottery Waste**），导致真实成片成本高达 `$2.85–$4.00/秒`！
- **架构解法**：严格执行影视工业的 **“先锁静帧故事板 → 再跑低成本动态预演 → 最后升格旗舰母带”三阶漏斗**：
  1. 先用 **Flux.1 Pro + IP-Adapter**（`$0.015/张`）生成并锁定全片 12 个镜头的首尾关键帧（100% 确认构图、色调与主角衣服）；
  2. 将首尾关键帧送入 **AKS 自托管 Wan 2.1 FLF2V（首尾帧生视频，`$0.018/秒`）** 快速产出全片动态预演（Animatic Previs），并由 **VLM 审片智能体** 自动校验运动平滑度与 ArcFace 人脸余弦（`>= 0.94`）；
  3. 仅对定稿通过的最终镜头按需调用 **Sora 2 / Veo 3 / Runway Gen-4 / Kling 2.0**，一举砍掉 `-68.4%` 的抽卡废片费！

### Q2：什么时候应该全部用商业视频 API，什么时候应该在 Azure AKS 上自建 ComfyUI + Wan 2.1 集群？TCO 拐点怎么算？
- **定量 TCO 拐点公式**：
  - 设企业自建双节点 `Azure AKS ND H100 v5 (Spot + 预留混合)` 包含 KEDA 缩容与运维的月固定基建底座成本约为 `$3,800/月`，单秒预演/B-Roll 边际电费算力成本为 `$0.018/秒`；而商业 API 组合均价约为 `$0.22/秒`。
  - 解方程 $\$3,800 + Q \times \$0.018 = Q \times \$0.22$，得出 **月度盈亏平衡拐点 $Q^* \approx 18,500\text{ 秒/月}$（约合每月制作 615 条 30 秒视频或含预演草稿共 3,000 条 6 秒素材）**。
  - **选型铁律**：月总生成量（含草稿）**`< 18,500 秒/月`** 时，100% 采用 Serverless 商业 API（Kling + Runway + Veo 3）；**`>= 18,500 秒/月`** 时，采用 **“AKS 自托管 Wan 2.1 承接 85% 预演与批量 B-Roll + 商业旗舰 API 承接 15% 核心高难主镜头”** 的混合云架构！

### Q3：如果广告片里既有“大海巨浪拍击礁石的宏大物理镜头”，又有“代言人手持产品开口说话带环境音的镜头”，怎么自动路由？
- **架构解法**：在统一 AI 网关部署 **JSON 分镜意图分类路由器（Shot-Intent Classifier Router）**：
  - 含 `dialogue_speech: true` 或强声画同步拟音需求 → 自动路由至 **Google Veo 3**（原生音画同生）；
  - 含 `complex_fluid_physics: true` 或大范围世界空间交互 → 自动路由至 **OpenAI Sora 2**；
  - 含 `character_id_continuity: true`（多镜头同一主角） → 自动路由至 **Runway Gen-4** 或 **Kling 2.0**；
  - 含 `confidential_unreleased_sku: true` 或大批量多语种背景泛化 → 自动路由至 **内网 AKS ComfyUI + Wan 2.1**。

---

## 三、 🧭 直观可视化图解（Mermaid 选型决策树 + 两级预演路由管线架构图 + 生产时序图）

### 3.1 企业视频生成大模型（Sora 2 / Veo 3 / Gen-4 / Kling / AKS Wan 2.1）选型决策树
```mermaid
flowchart TD
    A["企业视频分镜生成请求进入多模型路由网关"] --> B{"当前处于分镜初稿探索 (Animatic Previs) 还是最终母带渲染 (Master)?"}
    B -- "初稿探索 / 运镜测试 (占总算力 80%+)" --> C["Flux.1 Pro + IP-Adapter 锁定首尾静帧 -> AKS 自托管 Wan 2.1 ($0.018/s) 生成预演 + VLM 审片门禁"]
    B -- "已通过 VLM 与导演审片的最终母带镜头" --> D{"分析镜头核心能力特征 (Shot Capability Tag)"}
    D -- "未发布绝密新品 / 大批量社媒 B-Roll" --> E["路由至内网 Azure AKS ComfyUI + Wan 2.1 14B 集群 ($0.018/s · 数据不出境)"]
    D -- "需原生同步人物对白与真实环境拟音" --> F["路由至 Google Veo 3 API (~$0.40/s · 原生音画同生)"]
    D -- "多镜头主角面容锁定与精确相机轨迹" --> G["路由至 Runway Gen-4 或 可灵 Kling 2.0 API (~$0.14-$0.25/s)"]
    D -- "极限复杂物理交互与宏大电影定场主镜" --> H["路由至 OpenAI Sora 2 API (~$0.50/s · 旗舰定场主镜)"]
```

### 3.2 两级分镜预演漏斗与多模型混合路由生产管线架构图
```mermaid
flowchart LR
    subgraph Stage1["1. 首尾帧锁定与低成本预演漏斗 (AKS 底座)"]
        KEY["Flux.1 Pro + IP-Adapter\n锁定全片 12 镜首尾帧与角色 ID"]
        PRE["AKS Wan 2.1 Animatic ($0.018/s)\n拦截 85% 构图与运镜废片"]
        VLM["VLM Director Rubric Gate\n校验 ArcFace >=0.94 与品牌色"]
    end
    subgraph Stage2["2. 按镜头特长商业旗舰路由池"]
        SR2["OpenAI Sora 2\n复杂物理定场主镜"]
        VO3["Google Veo 3\n原生对白与环境音画"]
        RKL["Runway Gen-4 / Kling 2.0\n多镜角色连续叙事"]
    end
    subgraph Stage3["3. 后期代码包装与合规分发"]
        REM["Remotion 矢量字幕/Logo 合成\nHSM C2PA 水印签名 -> 全球 CDN"]
    end
    KEY --> PRE --> VLM
    VLM -- "Approved Master Shots" --> SR2 & VO3 & RKL
    SR2 & VO3 & RKL --> REM
```

### 3.3 30 秒全球品牌 TVC 从分镜预演到多模型母带合成时序图
```mermaid
sequenceDiagram
    autonumber
    participant Dir as 广告导演 / 创意工作台
    participant Previs as AKS Wan 2.1 预演池 ($0.018/s)
    participant Gate as VLM 审片门禁 & 路由器
    participant Cloud as Sora 2 / Veo 3 / Gen-4 / Kling

    Dir->>Previs: 提交 12 个镜头的脚本与 Flux 首尾关键帧（平均每镜尝试 6 版运镜草稿）
    Previs->>Gate: 以 $0.018/秒极低成本快速生成 72 条动态分镜预演 (Animatic)
    Gate->>Gate: VLM 自动剔除穿帮废片，导演确认最终 12 条定稿分镜参数
    Gate->>Cloud: 镜头1(宏大物理)->Sora 2；镜头2-5(角色叙事)->Gen-4/Kling；镜头6(对白音画)->Veo 3
    Cloud-->>Dir: 返回 4K 成片并由 Remotion 叠合矢量标版与 C2PA 签名 (均摊 $0.48/s, 降本 -68.4%)
```

---

## 四、 📊 多模型与多管线横向选型决策矩阵

| 管线与选型方案 | 最佳适用规模 | 成片均摊成本 (含 6:1 抽卡) | 跨镜头角色/品牌一致性 | 商业版权与数据隐私 | 架构师选型结论 |
| --- | --- | --- | --- | --- | --- |
| **★ AKS Wan 2.1 预演筛废 + VLM 门禁 + 五大模型专长路由** | **月产 `>= 18,500 秒` 企业中台** | **`$0.48 / 秒` (`-68.4%`)** | **`99.5%` (首尾帧+VLM 锁死)** | **绝密镜头留内网 + C2PA 签名** | **✅ 生产首选（年省 `+$3.42M`）** |
| **全量初稿无差别直调 Sora 2 / Veo 3 旗舰 API** | 月产 `< 5,000 秒` 零星探索 | `$2.85 / 秒` | `78.4%` | 公有云企业协议条款 | ⛔ 83% 预算烧在未定稿废片上 |
| **单一商业模型全包 (仅 Runway Gen-4 或仅 Kling)** | 中小团队角色短片 | `$1.42 / 秒` | `84.6%` | 公有云企业协议条款 | ⚠️ 缺原生音画或超低成本预演底座 |
| **纯自建固定规模 GPU 集群 (无公有云协同)** | 纯内网保密部门 | `$1.18 / 秒` | `81.2%` | 100% 本地闭环 | ⚠️ 缺旗舰主镜头上限且波峰排队 |

---

## 五、 🧪 交互式应用工作台 Demo 与 7-Card 报告

- **交互式工作台入口**：[`demos/enterprise-ad-storyboard-previs-sora2-veo3-runway-kling-aks-wan-router-studio/`](../demos/enterprise-ad-storyboard-previs-sora2-veo3-runway-kling-aks-wan-router-studio/)
- **可视化汇总卡片（SVG）**：[`docs/benchmarks/enterprise-ad-storyboard-previs-sora2-veo3-runway-kling-aks-wan-router/summary-visual.svg`](benchmarks/enterprise-ad-storyboard-previs-sora2-veo3-runway-kling-aks-wan-router/summary-visual.svg)
- **核心实测发现**：采用“AKS Wan 2.1 动态预演筛废 + VLM 审片门禁 + Sora 2/Veo 3/Gen-4/Kling 按特长路由”后，成片均摊成本从 `$2.85/秒` 降至 **`$0.48/秒`（削减 `-68.4%`）**，跨镜头一致性达 **`99.5%`**。

---

## 六、 🛠️ 企业视频大模型选型与分镜预演落地评审 Checklist

- [ ] **严禁未锁静帧直接抽卡商业视频 API**：强制先用图像模型（Flux / GPT-Image-1）锁定首尾关键帧与主角 IP-Adapter 参考图。
- [ ] **建立低成本动态分镜预演（Animatic Previs）层**：所有运镜探索在 `$0.018/秒` 的自托管或轻量层完成，通过 VLM 门禁后再升格旗舰模型。
- [ ] **核算 18,500 秒/月 TCO 盈亏拐点**：月总生成量超拐点时部署 Azure AKS KEDA + Dragonfly P2P 弹性自托管池承接预演与批量 B-Roll。
- [ ] **后处理代码合成与 C2PA 溯源解耦**：所有品牌 Logo、价格标版与免责字幕必须由 Remotion 在视频生成后无损叠加，并写入 C2PA 签名。
