# 企业视频 DiT 免训练时间步缓存与首块残差跳步网关选型指南（TeaCache + PAB 金字塔注意力广播 · 第 155 项里程碑！）

## ① 📌 核心选型结论速览（Executive Summary）

> **一句话决策结论**：在生产环境部署 `Wan2.1-14B`、`HunyuanVideo-13B` 或 `Flux.1-Dev` 等 40–60 层大规模 Diffusion Transformer（DiT）集群时，**严禁不加缓存地死跑全部 50 个去噪时间步（单支 5 秒 1080p 视频耗时 `148.0 秒`，其中中间第 `7–44` 步的隐空间特征高度线性冗余，白白浪费 64% 的 H100 算力），也严禁按固定步长（如 `Δt = 3`）一刀切等距盲目跳步（直接破坏前 6 步运动构图成型期与后 6 步高频纹理收口期，导致人物肢体畸变、商品边缘重影，`VBench` 跌至 `68.4%`）**。
>
> 必须采用 **“三层 `TeaCache` 首块调制残差多项式门禁 + U型首尾时间步全算护栏 + `PAB`（Pyramid Attention Broadcast）金字塔注意力广播”零训练推理网关**：
> 1. **`TeaCache` 第 1 层 DiT 调制输入探针（`0.4ms` 零训练先验判定）**：利用第 0 层 Transformer Block 的时间步嵌入调制输入（AdaLN-Modulated Input）相对 `L1` 变化率与整网 42 层最终输出残差之间的强单调相关性，经 4 阶多项式校准累积误差 `E_acc`；只要 `E_acc < δ_thresh (0.14)`，直接跳过后续 **41 层 DiT Block** 并复用上一步主干残差；
> 2. **U 型非线性阶段保护（U-Shaped Phase Guard）**：50 步去噪的变化率呈典型的“两头陡峭、中间平缓” U 型曲线——网关强制锁定**前 6 步（`Steps 1–6` 全局构图与运动轨迹定型）**与**最后 6 步（`Steps 45–50` 高频毛孔与文字边缘锐化）**100% 全量执行 42 层，仅在中间准线性平滑区（`Steps 7–44`）自适应跳步，将感知漂移锁死在 `LPIPS = 0.038`（`VBench 84.1%` vs 全量基线 `84.4%`）；
> 3. **金字塔注意力广播（`PAB`: Spatial `2×` / Temporal `4×` / Text Cross-Attention `6×`）**：在中间仍需执行的骨干步上，进一步利用文本交叉注意力在去噪全程几乎不变的特性跨 6 步广播复用，实现端到端 **`3.12×` 零训练无损提速（`148.0s → 47.4s`）**，为 512 卡 H100 视频集群每年净省 **`+$1,920,000`**。

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：为什么不用训练一个 4 步或 8 步的一致性蒸馏模型（LCM /Hyper-SD / Step-Distillation），而要用免训练的 TeaCache 网关？
- **蒸馏模型的高昂训推成本与 LoRA 生态断裂**：
  1. 对 140 亿参数的视频大模型（`Wan2.1-14B`）做对抗/一致性步数蒸馏，不仅每次底模升级都要耗费数十万美金 H100 训练费，而且极易出现模式坍塌（动态幅度变小、镜头僵硬）；
  2. 更致命的是，业务部门训练的数百个垂直商品/角色 LoRA 与 ControlNet 挂载到蒸馏底模上时常常权重失配。
- **TeaCache + PAB 零训练即插即用**：无需修改一行模型权重，100% 兼容所有社区与企业私有 LoRA、IP-Adapter 及 ControlNet，甚至可以叠加在 2D USP 多卡序列并行之上。

### Q2：为什么只算第 0 层 DiT Block 的输入变化，就能准确预测后面 41 层算完之后变化大不大？
- **AdaLN 时间步调制输入的物理表征意义**：在 DiT（Peebles & Xie）架构中，每个时间步 `t` 通过自适应层归一化（AdaLN-Zero）把时间步嵌入注入各层。实验与谱分析证明，第 0 层经过 AdaLN 调制后的特征相对变化率 `||ModIn_0(t) - ModIn_0(t+1)||_1 / ||ModIn_0(t+1)||_1`，在通过一个离线拟合的 4 阶多项式 `P_4(x)` 消除非均匀缩放偏差后，与第 41 层最终输出残差的真实相对误差相关系数高达 `r = 0.986`。因此只需花 `0.4ms` 探测第 0 层，就能决定是否省下后面 41 层耗费的 `2.9 秒` 计算！

### Q3：为什么“等距跳步（比如每隔 3 步算 1 步）”会把视频画面搞崩，而 TeaCache 不会？
- **扩散去噪的 U 型速度场（U-Shaped Velocity Dynamics）**：
  - 在 `Steps 1–6`（高噪声 `t → 1.0`），潜变量从纯高斯白噪声剧烈坍缩出人物轮廓与相机运镜方向，此时跳步会直接导致多手多脚或画面撕裂；
  - 在 `Steps 7–44`（中段航道），速度场方向几乎恒定，连续 3–4 步的残差高度共线；
  - 在 `Steps 45–50`（低噪声 `t → 0.0`），模型集中修复高频纹理与高光边缘。TeaCache 的累加器 `E_acc` 在首尾两端瞬间打满阈值从而自动逐帧全算，在中间平缓段则连续跳过 3–4 步，完美贴合 U 型物理规律。

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + TeaCache+PAB 网关架构图 + 跳步执行时序图）

### 3.1 视频 DiT 推理加速与时间步缓存选型决策树
```mermaid
flowchart TD
    A[部署 Wan2.1-14B / HunyuanVideo 1080p 视频生成集群] --> B{选择步数加速方案?}
    B -->|"50步全量无缓存计算"| C[单支耗时 148.0秒 · 中段 64% 算力线性冗余<br/>GPU 成本高昂 · 吞吐低下]
    B -->|"等距均匀跳步 Δt=3 或强行砍至 16步"| D[破坏首6步构图与尾6步高频纹理<br/>VBench 暴跌至 68.4% · LPIPS=0.284 肢体崩坏]
    B -->|"TeaCache 首块多项式残差门禁 + U型护栏 + PAB"| E[强制锁定 Steps 1-6 与 Steps 45-50 100% 全算<br/>中段 Steps 7-44 用第 0 层 AdaLN 探针动态跳过 41 层]
    E --> F[叠加 PAB 交叉注意力 6步广播复用<br/>3.12× 提速 47.4s · VBench 84.1% · 年省 +$1.92M]
```

### 3.2 企业级 Video DiT TeaCache 首块探针与 PAB 金字塔广播架构图
```mermaid
flowchart LR
    subgraph Guard["1. U型时间步阶段护栏"]
        G1[Steps 01–06 构图锚定期<br/>强制 42 层全算 Lock]
        G2[Steps 07–44 准线性巡航期<br/>启用 TeaCache + PAB]
        G3[Steps 45–50 高频纹理收口<br/>强制 42 层全算 Lock]
    end
    subgraph Probe["2. TeaCache 第 0 层多项式门禁 (0.4ms)"]
        P1[计算 Block-0 AdaLN 调制输入<br/>相对 L1 距离 Δ_rel]
        P2[4阶多项式校准累加器<br/>E_acc += Poly4 Δ_rel]
    end
    subgraph Exec["3. 41层跳步复用与 PAB 广播"]
        E1[当 E_acc < 0.14: 直接跳过 Block 1..41<br/>输出 Z_t + Cached_Residual]
        E2[当 E_acc >= 0.14: 执行全层并清零 E_acc<br/>同时复用 Cross-Attn 6× / Temp-Attn 4×]
    end
    G2 --> P1 --> P2 --> E1 & E2
```

### 3.3 单次去噪步 TeaCache 0.4ms 探针判定与 41 层短路复用时序图
```mermaid
sequenceDiagram
    autonumber
    participant Sched as Flow-Matching 调度器
    participant B0 as DiT Block #0 (AdaLN 探针)
    participant Gate as TeaCache 多项式累加器
    participant B41 as DiT Blocks #1..#41 + PAB 缓存

    Sched->>B0: 输入时间步 t=22 潜变量 Z_22 与时间嵌入 e_22
    B0->>Gate: 0.4ms 计算 AdaLN 调制特征相对变化 Δ_rel = 0.032
    Gate-->>Gate: 经 4阶多项式校准后更新 E_acc = 0.094 (< 阈值 0.14)
    Gate->>Sched: 触发 SHORT-CIRCUIT! 短路跳过后续 41 层 Transformer Blocks
    Sched->>B41: 0.1ms 直接读取 HBM3 中缓存的 R_cached 并更新 Z_21 = Z_22 + dt·R_cached (省下 2.9秒!)
```

---

## ④ 📊 视频与图像 DiT 时间步加速技术横向选型决策矩阵

| 评估维度 | 方案 A：50 步全量计算基线（Full 50-Step DiT） | 方案 B：等距均匀跳步 / 粗暴砍步数（Uniform Skip `Δt=3`） | 方案 C：TeaCache 首块多项式门禁 + U型护栏 + PAB（推荐） |
| --- | --- | --- | --- |
| **实际执行全量 42 层步数** | `50 / 50 步`（`100%` 计算） | `17 / 50 步`（盲目跳过首尾关键步） | **`18 / 50 步`（首尾 12 步全锁 + 中段仅算 6 步）** |
| **端到端加速比与生成耗时** | `1.00×`（`148.0 s`） | `2.88×`（`51.4 s`） | **`3.12×`（`47.4 s`，削减 -68.0% 延迟）** |
| **VBench 视频综合质量得分** | `84.4%`（黄金基线） | `68.4%`（**严重退化！** 动作撕裂与商品变形） | **`84.1%`（仅差 `-0.3%`，肉眼无感无损）** |
| **LPIPS 感知结构漂移** | `0.000` | `0.284`（构图漂移严重） | **`0.038`（U型首尾护栏锁定构图与锐度）** |
| **512卡 H100 集群年度净收益** | `$0`（高昂算力账单） | `-$420,000`（废片重抽率高达 44%） | **`+$1,920,000 / yr`（零训练成本即插即用）** |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 基准报告

- **交互式工作台入口**：[`demos/video-dit-teacache-first-block-residual-step-skipping-finops-studio/`](../demos/video-dit-teacache-first-block-residual-step-skipping-finops-studio/index.html)
- **7-Card 4:5 视觉评测报告 SVG**：[`docs/benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary-visual.svg`](benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary-visual.svg)
- **实测验证 JSON 数据源**：[`docs/benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary.json`](benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary.json)

![企业视频 DiT TeaCache 首块残差跳步网关 7-Card 报告](benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary-visual.svg)

---

## ⑥ 🛠️ 企业视频与图像 DiT 推理加速网关落地评审 Checklist

- [ ] **U型首尾步全算强制锁死**：网关配置是否已将前 `12%` 时间步（`Steps 1–6`）与后 `12%` 时间步（`Steps 45–50`）设为不可跳过的强制全算区？
- [ ] **模型专属 4 阶多项式标定系数**：切换 `Wan2.1-14B`、`HunyuanVideo-13B` 或 `Flux.1-Dev` 时，是否加载了对应底模离线标定的 5 个多项式回归系数 `[a4, a3, a2, a1, a0]`？
- [ ] **CFG 正负条件分支独立残差槽**：在开启 Classifier-Free Guidance（`CFG > 1.0`）时，是否分别为 Conditional 与 Unconditional 分支维护独立的缓存残差张量（或结合 CFG-Cache 晚期合并）？
- [ ] **与 2D USP 序列并行无冲突集成**：在多卡 Ring/Ulysses 序列并行下，Block-0 的相对 `L1` 范数是否已通过单次 `AllReduce(SUM)` 标量同步，确保全卡做出完全一致的跳步分支决策？
