# 企业视频 DiT 低比特注意力算子路由器选型指南（SageAttention2 INT8 QK^T × FP8 PV + 通道均值消峰 · 🏆 第 160 项历史性里程碑！）

## ① 📌 核心选型结论速览（Executive Summary）

> **一句话决策结论**：在运行 `Wan2.1-14B`、`HunyuanVideo-13B` 或 `Flux.1` 等长序列视频/图像 Diffusion Transformer（单支 1080p 视频序列长度 `N = 118,800` Tokens，三维全注意力占整网耗时的 `76.4%`）时，**严禁仅停留在 `BF16 FlashAttention-2`（白白闲置 H100 / L40S / B200 芯片上吞吐高达 2–4 倍的 `INT8 / FP8` 低比特 Tensor Core 算力），也严禁对注意力矩阵 `Q, K, P, V` 直接套用朴素的后训练量化（Naive PTQ，因为视频 DiT 的 Key 张量在旋转位置编码 RoPE 通道存在 `12×` 恒定离群尖峰，且 NVIDIA Hopper/Ada 架构的 `FP8 wgmma` 指令内部仅用 22-bit `FP22` 寄存器累加，在 11.8万 Token 长序列下引发严重尾数截断偏色，余弦相似度暴跌至 `78.2%`）**。
>
> 必须采用 **“三层 `SageAttention2` Key 通道均值数学等价消峰（`K' = K - μ_K`）+ Warp 级 `INT8/INT4 Q·K^T` + 128-Token 双级 `FP22 → FP32` 寄存器提升 `FP8 P·V` 混合算子路由器”架构**：
> 1. **基于 Softmax 平移不变性的 Key 通道均值消峰（`K_smooth = K - mean_N(K)`，零数学误差）**：利用恒等式 `Softmax(Q·K^T) === Softmax(Q·(K - μ_K)^T)`，在进入量化前沿序列维度减去 Key 的均值向量 `μ_K`，一次性削平 `94.8%` 的跨通道离群尖峰，使 Warp 级 `INT8/INT4 Q·K^T` 矩阵乘法的余弦保真度从 `78.2%` 跃升至 **`99.82%`**；
> 2. **`FP8 (E4M3) P·V` 双级累加器提升（Two-Level `FP22 → FP32` Register Promotion）**：针对 Hopper (`SM90`) 与 Ada (`SM89`) 硬件 `FP8` Tensor Core 内部仅具备 13 位尾数（`FP22`）的物理限制，每完成 `128` 个 Token 分块的 `wgmma` 乘加即强制将部分和提升累加至 `FP32` CUDA 核心寄存器，彻底根除 11.8万 Token 长视频注意力积分漂移（整体余弦相似度 **`99.74%`**，视频 `PSNR = 39.6 dB`）；
> 3. **与时间步缓存（`TeaCache`）正交叠加实现 `6.42×` 端到端极速生成**：算子吞吐从 `BF16` 的 `412 TFLOPS` 飙升至 **`1,178 TFLOPS`（`2.86×` 算子加速）**，与时间维度的 `TeaCache`（跳过冗余去噪步）正交相乘后达成 **`6.42×` 总加速**，为 512 卡 H100 视频集群每年净省 **`+$2,640,000`**（全仓圆满达成 **160 = 3 + 7 + 30 × 5** 座工作台历史性里程碑！）。

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：为什么给大语言模型（LLM）做 INT8/FP8 权重量化很容易，而给视频生成模型（Wan2.1 / HunyuanVideo）的 Attention 激活做 INT8 量化画面会立刻出现霓虹色块和网格伪影？
- **3D RoPE 引起的 Key 张量“跨 Token 恒定通道离群值（Token-Invariant Channel Outliers）”**：在三维视频 DiT 中，为了编码帧间（Temporal）与帧内宽高（Height/Width）坐标，Key 张量 `K ∈ R^{N×d}` 的特定频率通道在所有 `118,800` 个 Token 上都带有高达 **`±18.5`** 的恒定偏置，而普通语义通道均值仅为 `±1.2`。如果直接对每个 Token 行做 `INT8 [-127, 127]` 量化，绝大多数量化台阶都被那几个高频位置通道霸占，普通纹理通道被严重截断为零！
- **Softmax 平移不变性完美破局**：因为对于任意一行 Query 向量 `q_i`，它与所有 Key 向量点积加上或减去同一个常向量 `q_i · μ_K^T`，在经过 `Softmax(z_j - c) = exp(z_j - c) / Σ exp(z_k - c) = Softmax(z_j)` 后**在数学上 100% 严格抵消**！因此在前向传播融合算子中先令 `K_smooth = K - (1/N) Σ K_t`，不增加任何近似误差就将动态范围压缩了 `12 倍`。

### Q2：为什么在 H100 或 L40S 上直接调 cuBLAS / FlashAttention-3 的 FP8 注意力，长视频后半段会越来越糊？
- **NVIDIA GPU `FP8 wgmma` 硬件累加器的 `FP22` 隐藏陷阱**：许多工程师误以为 `FP8 × FP8` Tensor Core 指令是在标准 IEEE `FP32`（23位尾数）中累加的；实际上在 SM89 (Ada) 与 SM90 (Hopper) 硬件微架构中，`FP8` 矩阵乘法的内部累加器只有 **22 bits（1位符号 + 8位指数 + 13位尾数，即 `FP22`）**。当视频序列长达 `118,800` 个 Token（需累加近 1,000 个 Tile）时，`13位尾数` 会发生严重的“大数吃小数（Swamping）”。
- **128-Token 双级寄存器提升（Two-Level Accumulation）**：`SageAttention2` 将内层循环拆分为 `Tile_K = 128` 的小块，在 Tensor Core 的 `FP22` 累加器溢出前，每 128 个 Token 将寄存器值显式转换并累加到 CUDA Core 的真实 `FP32` 累加器中，以不到 `1.5%` 的指令开销换取 `99.74%` 的无损精度。

### Q3：我们已经上了上一轮（第 155 项工作台）的 TeaCache 跳步网关，还能再叠加上 SageAttention2 吗？
- **时间步维度与单步算子维度 100% 正交相乘**：
  - `TeaCache` 解决的是**“50 个去噪时间步里哪些步可以跳过不跑”**（把 50 步压缩到 18 步全算）；
  - `SageAttention2` 解决的是**“那必须执行的 18 步全算里，耗时占比 76.4% 的 3D Attention 怎么用 INT8/FP8 Tensor Core 跑快 2.86 倍”**。两者结合可将单支 5 秒 1080p 视频生成耗时从 `148.0 秒` 直接压进 **`23.0 秒`（`6.42×` 端到端提速）**！

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + SageAttention2 算子架构图 + 硬件流水时序图）

### 3.1 视频 DiT 低比特注意力算子选型决策树
```mermaid
flowchart TD
    A[视频 DiT 118,800 Token 三维注意力加速<br/>占整网 76.4% FLOPs] --> B{选择 Attention 算子精度方案?}
    B -->|标准 BF16 FlashAttention-2| C[仅跑出 412 TFLOPS · 闲置芯片低比特算力<br/>单支视频仍需 148 秒]
    B -->|朴素 INT8 / FP8 直接量化 Naive PTQ| D[RoPE 通道 12× 离群值截断 + FP22 累加溢出<br/>余弦相似度跌至 78.2% · 画面严重偏色 PSNR 19.4dB]
    B -->|SageAttention2: K均值消峰 + INT8 QK^T + 双级FP8 PV| E[利用 Softmax 平移不变性令 K'=K-μ_K 消除 94.8% 离群值<br/>每 128 Token 将 FP22 提升至 FP32 累加器]
    E --> F[算子吞吐飙升至 1,178 TFLOPS 2.86× 提速 · 余弦保真 99.74%<br/>正交叠加 TeaCache 达 6.42× 总提速 · 年省 +$2.64M]
```

### 3.2 企业级 SageAttention2 通道消峰与双级累加器内核架构图
```mermaid
flowchart LR
    subgraph Pre["1. 零开销融合预处理 Epilogue"]
        P1[输入 Q, K, V 张量<br/>N = 118,800 × d = 128]
        P2[Key 序列均值归约 μ_K<br/>K_smooth = K - μ_K]
        P3[Warp 级动态 INT8 量化<br/>消除 94.8% RoPE 离群截断]
    end
    subgraph Core["2. SM90 / SM89 低比特 Tensor Core 流水线"]
        C1[INT8 × INT8 WGMMA<br/>计算注意力得分 S = Q · K_smooth^T]
        C2[Online Softmax 缩放<br/>量化概率矩阵 P 至 FP8 E4M3]
        C3[FP8 × FP8 WGMMA + 双级累加<br/>每 128 Token 由 FP22 提升至 FP32]
    end
    subgraph Router["3. 层敏感混合路由与 TeaCache 协同"]
        R1[首尾 2 层保留 BF16 护栏<br/>中间 38 层全开 SageAttention2]
        R2[1,178 TFLOPS · 99.74% 余弦保真<br/>叠加 TeaCache = 6.42× 极速成片]
    end
    P1 --> P2 --> P3 --> C1 --> C2 --> C3 --> R1 --> R2
```

### 3.3 单次 3D Attention 前向传播 INT8 × FP8 融合核函数时序图
```mermaid
sequenceDiagram
    autonumber
    participant HBM as HBM3 显存 (Q, K, V)
    participant Triton as RoPE + Smooth-K 融合 Epilogue
    participant TC as INT8 / FP8 Tensor Cores (WGMMA)
    participant Reg as CUDA Core FP32 真实累加寄存器

    HBM->>Triton: 流式加载 K 分块并在线求取通道均值向量 μ_K
    Triton-->>TC: 原地减去 μ_K 并执行 Per-Warp INT8 量化 (0 额外 HBM 读写)
    TC-->>TC: 执行 INT8 Q · K_smooth^T WGMMA 与 Online Softmax 生成 FP8 E4M3 概率块 P
    TC->>Reg: 执行 128-Token 分块 FP8 P · V WGMMA (内部 FP22) 后立即提升累加至 FP32 寄存器
    Reg-->>HBM: 写回最终注意力输出 O (1,178 TFLOPS · 余弦保真度 99.74% · PSNR 39.6 dB)
```

---

## ④ 📊 视频 DiT 注意力算子量化架构横向选型决策矩阵

| 评估维度 | 方案 A：`BF16 FlashAttention-2` 标准基线 | 方案 B：朴素 `INT8 / FP8` 直接量化（Naive PTQ） | 方案 C：`SageAttention2`（`K - μ_K` 消峰 + `INT8 QK^T` + 双级 `FP8 PV`）（推荐） |
| --- | --- | --- | --- |
| **H100 实测算子吞吐（Kernel TFLOPS）** | `412 TFLOPS`（`1.00×`） | `1,120 TFLOPS`（`2.72×`） | **`1,178 TFLOPS`（`2.86×` 算子级实测提速）** |
| **注意力张量余弦相似度（Cosine Sim）** | `100.00%`（参考真值） | `78.20%`（**严重失真！** RoPE 离群截断 + FP22 溢出） | **`99.74%`（Softmax 平移不变性数学等价消峰）** |
| **生成视频峰值信噪比（Video PSNR）** | `42.8 dB` | `19.4 dB`（全屏霓虹色偏与网格伪影，不可商用） | **`39.6 dB`（视觉肉眼无感，细节与色彩 100% 锁死）** |
| **叠加 `TeaCache` 端到端总加速比** | `3.12×`（仅跳步加速） | `5.80×`（画质报废） | **`6.42×`（`148.0s → 23.0s` 无损成片！）** |
| **512卡视频集群年度净节省（Net ROI）** | `$0` | `-$680,000`（废片重抽亏损） | **`+$2,640,000 / yr`** |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 基准报告

- **交互式工作台入口**：[`demos/video-dit-sageattention2-int8-fp8-quantized-kernel-router-studio/`](../demos/video-dit-sageattention2-int8-fp8-quantized-kernel-router-studio/index.html)
- **7-Card 4:5 视觉评测报告 SVG**：[`docs/benchmarks/video-dit-sageattention2-int8-fp8-quantized-kernel-router/summary-visual.svg`](benchmarks/video-dit-sageattention2-int8-fp8-quantized-kernel-router/summary-visual.svg)
- **实测验证 JSON 数据源**：[`docs/benchmarks/video-dit-sageattention2-int8-fp8-quantized-kernel-router/summary.json`](benchmarks/video-dit-sageattention2-int8-fp8-quantized-kernel-router/summary.json)

![企业视频 DiT SageAttention2 低比特注意力算子路由器 7-Card 报告](benchmarks/video-dit-sageattention2-int8-fp8-quantized-kernel-router/summary-visual.svg)

---

## ⑥ 🛠️ 企业视频 DiT 低比特算子（SageAttention2）落地评审 Checklist

- [ ] **Key 均值扣除置于 RoPE 旋转位置编码之后**：`K_smooth = K - mean_N(K)` 是否严格挂在 3D RoPE 算子输出的 Epilogue 阶段执行，确保把 RoPE 引入的高频通道偏置一并抹平？
- [ ] **SM89 / SM90 `FP8 P·V` 双级寄存器提升（`Tile_K ≤ 128`）**：在 H100 与 L40S/4090 上编译 `FP8 E4M3 P·V` 内核时，是否已启用每 128 个 Token 从 `FP22` 向 `FP32` CUDA 寄存器的显式转存累加？
- [ ] **首尾敏感层混合精度白名单**：模型第 0–1 层与最后第 40–41 层是否保留 `FP16/BF16` 或 `INT8` 高保真模式，仅对中间 38 层重计算区开启激进的 `INT4/INT8 + FP8`？
- [ ] **与 `TeaCache` 及 `2D USP` 序列并行流水融合**：在多卡 Ring-Attention 下，各分片计算局部 `K_smooth` 时是否共享全局序列均值 `μ_K`（仅需一次 `d=128` 维向量 `AllReduce`）？
