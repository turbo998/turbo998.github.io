'use strict';
const { stage: s, entry } = require('./policy.cjs');

const INFRA_SPECS = {
  'ai-infra-h5/ai-infra-learning-hub': entry(
    'infra',
    'AI Infrastructure Sizing & Network Workbench · Serving Engines, PD Split, MoE & RDMA Fabric',
    'AI 基础设施定容与网络工作台 · 推理引擎、PD 分离、MoE 并行与无损智算网络',
    [
      s('SLO & TRAFFIC', '业务 SLO 与流量建模', 'TTFT / TPOT & Peak Concurrency', '首字/解码时延约束与并发峰值转换', 'Converts RPM/TPM business demand into concurrent KV slots & compliant goodput bounds', '将业务 TPM/并发折算为活跃 KV 槽位需求与达标有效吞吐（Goodput）边界', 'sizes GPUs', '推导显存与算力边界'),
      s('GPU & PARALLELISM', '显存与并行策略定容', 'Roofline Bounds & TP/PP/DP/EP', '显存/带宽/算力三界限与并行切分', 'Weights + KV cache + activations fit; FP8/MXFP4 MoE expert routing via DeepEP', '权重、KV 缓存与激活显存预算；FP8/MXFP4 量化与专家并行负载均衡', 'decouples pools', '进入预填充/解码池'),
      s('PD DISAGGREGATION', 'PD 分离与分层缓存', 'Dynamic P:D Ratio & KV Offload', '动态 P:D 配比与跨级 KV 缓存卸载', 'Dynamo NIXL / Mooncake layer-wise RDMA KV transfer + NVMe/DRAM prefix tiering', '逐层异步 RDMA KV 传输与高频前缀缓存分级卸载（LMCache/Mooncake）', 'runs over fabric', '承载于高速互连网络'),
      s('CLUSTER FABRIC', '无损互连与容错自愈', 'NVLink Scale-Up & IB/RoCEv2 Scale-Out', '机内 NVLink 与跨机 IB/RoCEv2 网络', '400G/800G optical/copper topology, Adaptive Routing/DCQCN & NCCL watchdog recovery', '机内高带宽域与跨机无损以太网/IB 拥塞控制及训练/推理故障自愈')
    ],
    [
      ['Size by Compliant Goodput, Not Peak TPS', '按达标 Goodput 而非裸吞吐定容', 'Cluster capacity must be bounded by throughput achieved within P95 TTFT and TPOT SLOs.', '生产定容必须以同时满足 P95 首字时延与每词元间隔约束下的有效吞吐为准。'],
      ['Three Independent Hardware Ceilings', '显存容量、带宽与算力三道独立水位', 'Prefill is compute-bound, decode is HBM-bandwidth-bound, and long context is KV-capacity-bound.', '预填充受限于算力，解码受限于显存带宽，长上下文并发受限于 KV 显存容量。'],
      ['Normalize Bit vs Byte Fabric Bandwidth', '统一 GB/s 与 Gb/s 跨层互连口径', 'Always reconcile 900 GB/s NVLink byte rates against 400/800 Gb/s NIC line rates before PD sizing.', '计算跨机 KV 传输与集合通信耗时前，必须统一字节每秒与比特每秒单位口径。']
    ]
  ),
  'h5-academy/index': entry(
    'infra',
    'AI Infra Six-Module Sizing Lab · SLO Metrics → Concurrency → GPU Bounds → PD → Parallelism → RDMA',
    'AI 基础设施六模块定容实验台 · 时延指标 → 并发折算 → 显存三界限 → PD 分离 → 并行 → 网络',
    [
      s('01-02 DEMAND', '指标口径与并发折算', 'TTFT/TPOT SLOs & TPM→Concurrency', '用户体验指标与 TPM 到并发映射', 'Little’s Law N = λ·W converts business TPM into active inflight request concurrency', '利用利特尔法则将业务每分钟词元需求换算为集群瞬时并发请求数', 'bounds GPU', '输入单机定容方程'),
      s('03-04 SERVING', 'GPU 三界限与 PD 分离', 'HBM Fit, Bandwidth & KV Handoff', '显存/带宽界限与 PD 分离 KV 交接', 'Separates compute-heavy prefill from bandwidth-bound decode across dedicated pools', '拆分算力密集型预填充与带宽密集型解码池，核算跨节点 KV 传输开销', 'scales across', '映射分布式并行'),
      s('05 PARALLELISM', '四维分布式切分', 'TP · PP · DP · EP Trade-Offs', '张量/流水/数据/专家并行权衡', 'Keeps TP inside NVLink domain; routes MoE all-to-all across EP with load balancing', '将高频张量并行收敛于机内 NVLink 域，跨机采用流水/数据/专家并行', 'maps to NICs', '对齐物理网络带宽'),
      s('06 AI FABRIC', '智算网络协议与无损传输', 'NVLink vs IB vs RoCEv2 (PFC/ECN)', '机内互连与跨机 RDMA 拥塞控制', 'Reconciles GB/s vs Gb/s, PFC/DCQCN tuning & rail-optimized leaf-spine fabrics', '统一带宽单位口径，评估叶脊轨优化拓扑与 PFC/ECN 无损流控边界')
    ],
    [
      ['Hand-Checkable Capacity Equations', '全链路公式可手算复核', 'Every slider links directly to closed-form memory, Little’s Law, and transfer-time math.', '所有交互推演均对应显式数学公式，便于架构评审现场手算复核。'],
      ['Conditional Teaching Models', '明确标注教学模型边界', 'Separates analytical sizing bounds from SKU-specific kernel measurements.', '清晰区分理论瓶颈水位估算与特定驱动/算子版本的实机压测数据。'],
      ['Offline Zero-Dependency Delivery', '零外部请求离线自包含', 'Strict SHA-256 CSP ensures safe execution in air-gapped enterprise architecture reviews.', '通过严格 CSP 脚本哈希校验，支持内网离线环境零外部依赖打开。']
    ]
  ),
  'h5-academy/01-metrics': entry(
    'infra',
    'Module 01 · Inference Latency & Throughput Metrics: TTFT, TPOT, E2E & SLO-Compliant Goodput',
    '模块 01 · 推理性能核心指标口径：TTFT、TPOT、端到端时延与达标有效吞吐（Goodput）',
    [
      s('PREFILL BOUND', '首字响应阶段', 'TTFT (Queue + Prefill Compute)', '首字时延 TTFT（排队 + 预填充）', 'Governed by prompt length, queueing delay & prefill FLOPs utilization', '受输入上下文长度、调度排队深度与预填充矩阵算力约束', 'enters decode', '进入逐词生成阶段'),
      s('DECODE CADENCE', '流式输出阶段', 'TPOT / ITL (HBM Bandwidth Bound)', '词元间隔 TPOT（显存带宽受限）', 'Human reading pace (~15–30 tok/s) sets per-stream P95 TPOT ceiling (≤35–50 ms)', '人类阅读与下游流式消费速率决定单流 P95 TPOT 必须稳定在阈值内', 'sums to E2E', '累加形成总时延'),
      s('END-TO-END', '请求完整周期', 'E2E = TTFT + (Output−1) × TPOT', '端到端总耗时合成关系', 'Long reasoning chains amplify small TPOT regressions into multi-second delays', '长思维链或代码生成场景会将微小的 TPOT 退化放大为数秒级感知卡顿', 'filters goodput', '裁定达标有效吞吐'),
      s('GOODPUT GATE', '生产验收口径', 'SLO-Compliant Goodput vs Raw TPS', '达标有效吞吐对比裸峰值吞吐', 'Counts only requests meeting both P95 TTFT and P95 TPOT targets simultaneously', '仅统计同时满足首字时延与词元间隔双项 P95 SLA 的有效词元吞吐')
    ],
    [
      ['Batching Trades TPOT for Raw TPS', '盲目拉大批次会恶化单用户体验', 'Pushing batch size maximizes GPU TPS on paper while violating interactive TPOT SLOs.', '过度增大批处理虽能抬高整卡裸吞吐，但会直接击穿单路交互 TPOT 水位。'],
      ['Dual-SLO Acceptance Contract', '首字与流式速率双指标验收', 'Interactive copilots and voice agents require joint P95 TTFT + P95 TPOT gates.', '对话助手与实时语音场景必须同时锁定 P95 TTFT 与 P95 TPOT 双重门禁。'],
      ['Goodput Drives True $/1M Tokens', '有效吞吐决定真实推理单价', 'Hardware TCO must be divided by SLO-compliant goodput rather than unthrottled benchmark TPS.', '核算百万词元基础设施成本时，分母必须采用达标有效吞吐而非极限压测吞吐。']
    ]
  ),
  'h5-academy/02-tpm-tps-capacity': entry(
    'infra',
    'Module 02 · Business Traffic to Cluster Capacity: TPM, Little’s Law Concurrency & Burst Headroom',
    '模块 02 · 业务流量到集群并发折算：TPM、利特尔法则并发槽位与峰值突发冗余',
    [
      s('BUSINESS TRAFFIC', '业务侧流量输入', 'Active Users, RPM & Prompt/Gen Mix', '活跃用户数、每分钟请求与输入输出比', 'Separates input prefill tokens from output decode tokens per request profile', '区分单次请求的平均输入词元数（预填充负载）与输出词元数（解码驻留时长）', 'applies Little Law', '代入利特尔法则'),
      s('CONCURRENCY', '瞬时并发槽位', 'N_conc = RPS × E2E_Duration', '集群瞬时活跃并发请求数推导', 'Longer output generation holds KV cache slots far longer than short Q&A', '长输出任务长期占用活跃 KV 缓存槽位，使瞬时并发呈倍数级膨胀', 'adds burst factor', '叠加峰谷突发系数'),
      s('PEAK HEADROOM', '日内波峰与突发系数', 'Peak-to-Average & Queueing Margin', '业务早高峰系数与排队安全水位', 'Applies 2×–4× diurnal peak multiplier + M/G/c queueing headroom (<75% load)', '计入办公/交易波峰倍数并预留排队缓冲，避免高负载非线性排队雪崩', 'maps to replicas', '折算实例副本数'),
      s('CLUSTER SIZING', '推理副本与配额规划', 'Replica Count & PTU/GPU Quota', '推理引擎副本数与云端配额映射', 'Divides peak concurrent streams & TPS by per-replica compliant goodput', '以峰值并发流与峰值 TPS 分别除以单副本达标容量并取上界定容')
    ],
    [
      ['50 TPS/User ≠ 50 TPS/Cluster', '单流速率与集群总吞吐不可混同', 'Cluster TPS equals concurrent active streams multiplied by per-stream token speed.', '集群总吞吐等于瞬时活跃并发流数乘以单流生成速率，而非单用户速率。'],
      ['Duration Multiplies KV Residency', '请求驻留时长直接放大显存并发', 'Doubling output length doubles request residency time and active KV cache footprint.', '输出词元翻倍会直接延长请求驻留时间，使并发 KV 显存占用同步翻倍。'],
      ['Keep Utilization Below Queueing Knee', '控制在排队曲线拐点以下运行', 'Operating above ~75–80% saturation causes tail TTFT queueing latency to spike exponentially.', '集群稳态利用率超过排队拐点后，微小流量抖动即可引发尾部排队时延激增。']
    ]
  ),
  'h5-academy/03-gpu-sizing': entry(
    'infra',
    'Module 03 · Three GPU Sizing Bounds: HBM Capacity Fit, Memory-Bandwidth Decode & Compute Prefill',
    '模块 03 · GPU 定容三道独立水位线：显存容量边界、显存带宽解码上限与算力预填充上限',
    [
      s('BOUND 1 · HBM FIT', '第一界 · 显存容量水位', 'Weights + KV Cache + Overhead', '模型权重、并发 KV 缓存与运行时开销', 'M_total = P·bytes + B·S·2·L·H_kv·bytes + CUDA/activation workspace', '核算模型参数字节、GQA/MLA 压缩后并发 KV 缓存与框架预留显存', 'checks bandwidth', '校验解码带宽上限'),
      s('BOUND 2 · BANDWIDTH', '第二界 · 显存带宽水位', 'Decode TPOT ≥ Weight_Bytes / BW_eff', '解码单步受限于权重读取有效带宽', 'Small batches read full active weights per token; MoE reads only routed experts', '稠密模型每步读取全量权重，MoE 仅读取激活专家从而大幅降低带宽压力', 'checks FLOPs', '校验预填充算力上限'),
      s('BOUND 3 · COMPUTE', '第三界 · 矩阵算力水位', 'Prefill TTFT ≥ 2·P_act·S_in / TFLOPS', '长上下文预填充受限于 Tensor Core 算力', 'Long prompts shift bottleneck to BF16/FP8 GEMM & quadratic/paged attention', '长提示词输入将瓶颈推向矩阵乘法峰值算力与注意力计算吞吐', 'takes max replicas', '三界取最大值定卡'),
      s('FINAL SKU COUNT', '最终卡数决策', 'N_GPU = max(N_mem, N_bw, N_comp)', '三道水位取上界锁定 GPU 数量与卡型', 'Identifies dominant bottleneck before choosing H100/H200/B200 or MI300X', '明确当前负载主导瓶颈后，针对性选择高显存（H200/MI300X）或高算力卡型')
    ],
    [
      ['Fitting in VRAM Does Not Guarantee SLA', '显存装得下不代表时延能达标', 'Quantizing to fit fewer GPUs can still fail TPOT or TTFT under production concurrency.', '仅按显存装得下压减卡数，往往会在高并发下触发带宽或预填充算力违约。'],
      ['GQA/MLA & Quantization Shrink KV Slope', 'GQA/MLA 与量化显著压降并发显存斜率', 'FP8 KV cache and MLA/GQA dramatically increase max concurrent context per HBM GiB.', '采用 GQA/MLA 架构与 FP8 KV 量化可成倍提升单卡可承载的长上下文并发度。'],
      ['Match GPU SKU to Dominant Bound', '按主导瓶颈匹配异构硬件规格', 'Memory-capacity/bandwidth-bound workloads favor H200/MI300X; prefill-heavy favors B200/FP8.', '长上下文与解码受限负载优先大显存高带宽卡，重预填充负载优先高算力卡。']
    ]
  ),
  'h5-academy/04-pd-disaggregation': entry(
    'infra',
    'Module 04 · Prefill-Decode Disaggregation: Interference Elimination, KV Transfer Budget & P:D Ratio',
    '模块 04 · 预填充与解码（PD）分离：干扰消除机制、跨机 KV 传输账本与动态配比',
    [
      s('COLOCATED PAIN', '混部架构核心痛点', 'Prefill Stalls Decode ITL Tail', '长提示预填充抢占阻塞解码流式节拍', 'Chunked prefill mitigates spikes partially but couples compute & bandwidth scaling', '同池混部下长上下文预填充会周期性挤占解码微批次，拉高 P99 词元抖动', 'splits pools', '拆分为独立资源池'),
      s('DEDICATED POOLS', '异构解耦资源池', 'Compute Prefill Pool + BW Decode Pool', '算力型预填充池与高带宽解码池独立扩缩', 'Tunes TP/chunking independently for TTFT on P-nodes and batch/TPOT on D-nodes', '预填充池针对首字吞吐调优并行度，解码池针对大批次流式稳定性独立调优', 'transfers KV', '经 RDMA 交接 KV'),
      s('KV HANDOFF', '跨节点 KV 状态交接', 'T_xfer = KV_Bytes / BW_RDMA (Overlap)', '逐层异步流式传输隐藏网络耗时', 'Layer-wise NIXL/Mooncake RDMA pipelines KV send concurrently with prefill compute', '通过逐层计算与 RDMA 零拷贝发送流水重叠，将跨机交接开销压入毫秒级', 'balances ratio', '动态调节 P:D 配比'),
      s('BREAK-EVEN GATE', '分离收益判定边界', 'When PD Split Beats Colocated Pool', 'PD 分离净收益成立的负载与网络门槛', 'Requires RDMA fabric; wins on long-prompt / strict-TPOT / multi-node scale', '需具备高速 RDMA 网络；在长输入、严苛 P99 TPOT 与多机规模下收益显著')
    ],
    [
      ['Eliminates Cross-Phase Interference', '彻底隔离预填充对流式解码的抢占', 'Decode nodes run uninterrupted memory-bound steps without prefill compute stalls.', '解码节点专注稳态逐词生成，消除大段提示词涌入造成的流式卡顿毛刺。'],
      ['Network Bandwidth Can Become New Cliff', '慢速网络会让 KV 搬运反噬收益', 'Without RDMA/RoCEv2 or layer-wise overlap, KV cache transfer inflates TTFT.', '若缺乏 RDMA 网络与逐层流水掩盖，全量 KV 跨机拷贝将直接推高首字时延。'],
      ['Traffic Shifts Require Elastic P:D Ratios', '固定静态配比易造成单侧池空转', 'RAG-heavy vs reasoning-heavy traffic demands dynamic P:D pool rebalancing.', '重检索长输入与重推理长输出场景所需 P:D 比例迥异，需支持弹性池调度。']
    ]
  ),
  'h5-academy/05-parallelism-acceleration': entry(
    'infra',
    'Module 05 · Distributed Parallelism & Acceleration: TP, PP, DP, MoE EP & Speculative Decoding',
    '模块 05 · 分布式并行与推理加速：TP、PP、DP、MoE 专家并行（EP）与投机解码',
    [
      s('INTRA-NODE TP', '机内张量并行（TP）', 'AllReduce Every Layer Over NVLink', '逐层高频全归约收敛于机内 NVLink', 'Lowers single-request latency & splits weights, bounded by 8-GPU NVSwitch domain', '同时切分权重并降低单请求时延，通信频次极高故一般限制在单机 NVLink 域内', 'pipelines stages', '跨机衔接流水/数据并行'),
      s('PP & DP REPLICAS', '流水线与数据并行', 'PP Point-to-Point & DP Traffic Scaling', '跨机点对点激活传递与独立副本扩容', 'PP fits giant models across nodes; DP scales linear RPS with prefix-aware routing', '流水并行用于超大模型跨机装卡，数据并行线性扩展并发吞吐并配合前缀亲和路由', 'routes experts', '耦合 MoE 专家并行'),
      s('MOE EP + EPLB', 'MoE 专家并行与均衡', 'DeepEP All-to-All & Redundant Hot Experts', '跨卡专家分发通信与热点专家副本均衡', 'Routes tokens to top-k experts; dynamic EPLB prevents straggler GPU bottlenecks', '按词元路由激活稀疏专家，通过动态负载均衡与热门专家冗余消除木桶效应', 'accelerates decode', '叠加投机解码加速'),
      s('SPECULATIVE MTP', '投机解码与多词预测', 'Draft/MTP Propose + Target Parallel Verify', '轻量草稿/MTP 预测与目标模型单步核验', 'Converts spare compute into 1.6×–2.5× lossless decode speedup at low-to-mid batch', '利用解码阶段闲置算力一次校验多个候选词元，在中低并发下实现无损提速')
    ],
    [
      ['Never Stretch TP Across Slow Ethernet', '避免跨慢速机间网络拉通张量并行', 'Cross-node TP stalls on per-layer AllReduce latency; keep TP ≤ NVLink domain size.', '跨机跑高频逐层 AllReduce 会严重拖慢解码，跨节点应优先切分 PP、DP 或 EP。'],
      ['MoE Efficiency Hinges on Expert Balance', 'MoE 真实吞吐取决于专家负载均衡', 'Skewed token routing leaves 1 hot GPU at 100% while 7 peer GPUs idle waiting.', '专家热度倾斜会导致单卡打满而其余卡空等，生产环境需启用 EPLB 动态均衡。'],
      ['Speculative Decoding Has a Batch Ceiling', '投机解码在高并发满载下收益收敛', 'As batch size saturates Tensor Cores, draft verification overhead erodes net speedup.', '当大并发批处理已吃满算力时，校验候选词元的额外计算会抵消投机加速收益。']
    ]
  ),
  'h5-academy/06-rdma-roce-nvlink': entry(
    'infra',
    'Module 06 · AI Cluster Interconnects: NVLink Scale-Up, InfiniBand vs RoCEv2 & Lossless Fabric Tuning',
    '模块 06 · 智算集群互连网络：NVLink 机内纵向扩展、InfiniBand 与 RoCEv2 无损调优',
    [
      s('UNIT NORMALIZATION', '带宽口径统一换算', 'Bytes/s (GB/s) vs Bits/s (Gb/s ÷ 8)', '字节带宽（GB/s）与网卡线速（Gb/s）对齐', '900 GB/s NVLink bidirectional vs 400 Gb/s (= 50 GB/s) per-NIC unidirectional payload', '先区分双向总带宽与单向有效载荷带宽，避免相差 8 倍至 16 倍的算账错误', 'scales up', '构建机内超节点域'),
      s('SCALE-UP DOMAIN', '机内超节点互连', 'NVLink / NVSwitch (8–72 GPUs)', 'NVSwitch 全互连低延迟共享显存域', 'Sub-microsecond latency & hundreds of GB/s per GPU for TP AllReduce & intra-rack EP', '提供亚微秒延迟与百 GB/s 级点对点带宽，承载张量并行与高频专家通信', 'scales out', '跨机连接叶脊网络'),
      s('SCALE-OUT RDMA', '跨机 RDMA 网络选型', 'InfiniBand NDR/XDR vs RoCEv2 Ethernet', 'InfiniBand 硬件流控对比 RoCEv2 无损以太网', 'Credit-based lossless IB + SHARP vs RoCEv2 PFC + ECN/DCQCN + Adaptive Routing', '对比基于信用的 IB 零丢包网络与以太网 PFC/ECN 拥塞控制及自适应路由方案', 'wires topology', '落地轨优化物理拓扑'),
      s('RAIL TOPOLOGY', '叶脊轨优化与故障隔离', '1:1 Non-Blocking Rail-Optimized Fabric', '无收敛叶脊轨优化与光模块冗余', 'Aligns GPU rank rails to leaf switches to minimize spine hops and tail jitter', '同号网卡直连同组轨交换机减少跨脊跳数，提升集合通信与 KV 传输尾部稳定性')
    ],
    [
      ['Divide Gb/s by 8 Before Sizing Transfers', '先将 Gb/s 除以 8 再计算传输耗时', 'A 400 Gb/s NIC delivers ~45–48 GB/s effective RDMA goodput after protocol headers.', '单张 400Gb/s 网卡扣除协议开销后单向有效 RDMA 吞吐约为 45–48 GB/s。'],
      ['RoCEv2 Requires Coordinated ECN + PFC', 'RoCEv2 生产稳定依赖 ECN 先于 PFC 触发', 'Tune ECN marking below PFC pause thresholds and enable packet spraying / AR.', '必须令 ECN 降速早于 PFC 反压触发，并结合包喷洒或自适应路由化解哈希极化。'],
      ['Match Topology to Workload Traffic Matrix', '按通信矩阵特征选择网络建设规格', 'All-to-all training/MoE EP demands non-blocking rail fabrics; pure DP tolerates oversubscription.', '大规模训练与跨机 MoE 需 1:1 无收敛轨优化网络；纯独立副本推理可适度收敛。']
    ]
  ),
  'workshops/foundry-estimated-cost/index': entry(
    'infra',
    'Azure Monitor FoundryModelEstimatedCost · Telemetry Pipeline, Cache-Aware Pricing & FinOps Guardrails',
    'Azure Monitor FoundryModelEstimatedCost · 平台遥测链路、缓存感知计价核验与 FinOps 生产护栏',
    [
      s('PLATFORM METRIC', '免费平台指标采集', 'Models - Usage · PT1M–P1D (<2m)', 'Models - Usage · 分钟至天粒度（<2 分钟）', 'Free Azure Monitor metric on AIServices & standalone OpenAI with 93-day retention', '覆盖 AIServices 与独立 OpenAI 账户的免费平台指标，具备 93 天原生保留期', 'prices tokens', '折算缓存与规格单价'),
      s('CACHE & SKU ENGINE', '缓存与部署规格计价', 'Prompt-Cache Discount & 1.10× DataZone', '前缀缓存折扣与 DataZone 1.10× 溢价', 'Eliminates +68.73% naive DIY KQL over-estimation at 55.1% gpt-4.1-mini cache hit', '在 55.1% 缓存命中下消除自建 KQL +68.73% 虚高误判，精准反映 1.1000× 区域倍率', 'verifies accuracy', '对账线上实测矩阵'),
      s('EMPIRICAL PARITY', '多模型真机对账矩阵', '0.0000% Retail Variance (1–121 Burst)', '单次至 121 并发批次 0.0000% 零售误差', 'Verified across gpt-5.4 ($0.69022), gpt-5.4-mini, gpt-4.1 & 3P Kimi-K2.6 reasoning', '跨 gpt-5.4、gpt-4.1 及第三方 Kimi-K2.6 思维链核验实现零零售价偏差', 'enforces guardrails', '落地五大工程护栏'),
      s('FINOPS GUARDRAILS', '预览期边界与告警编排', 'REST Metrics API + PT5M metricAlerts', 'REST 指标查询 + PT5M 预算阈值告警', 'Avoids DS Export 95.1% drop, HTTP 400 ProjectId=* trap & $0 embedding/image blind spots', '规避 AzureMetrics 导出 95.1% 漏采、ProjectId=* 400 陷阱及向量/生图 $0 盲区')
    ],
    [
      ['Query Metrics REST API Directly, Not AzureMetrics', '直接查询 Metrics API 而非诊断导出表', 'Diagnostic Settings export drops ~95.1% of cost records; bind dashboards and PT5M alerts to native platform metrics.', '诊断设置导出至 Log Analytics 会丢失约 95.1% 记录，生产看板与 PT5M 告警应直连平台指标。'],
      ['Native Metric Fixes Prompt-Cache Over-Billing Math', '原生计价消除自建 Token 乘算虚高', 'Naive total-token KQL over-estimates cached workloads by +68.73% because cached input tokens bill at steep discounts.', '自建总词元 KQL 忽略缓存输入折扣会导致高达 +68.73% 的成本虚高，原生指标已精确扣减。'],
      ['Pair With AgentModelEstimatedCost & Scope Guards', '配合项目级指标并规避通配符陷阱', 'Query per-model without ProjectId eq \'*\', supplement embeddings/images separately, and use AgentModelEstimatedCost per project.', '避免 ProjectId=* 触发 HTTP 400，单独补齐向量/生图计费，并结合项目级 AgentModelEstimatedCost 分摊。']
    ]
  )
};

module.exports = { INFRA_SPECS };
