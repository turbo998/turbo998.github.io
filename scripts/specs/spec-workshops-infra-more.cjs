'use strict';
const { stage: s, entry } = require('./policy.cjs');

const INFRA_MORE = {
  'workshops/azure-agent-infra/index': entry(
    'infra',
    'Azure AI Agent Infrastructure Playbook · 6 Hosting Tiers, Sandbox Isolation & Capacity Governance',
    'Azure AI 智能体基础设施选型手册 · 六大托管层级、强隔离沙箱与并发容量治理',
    [
      s('WORKLOAD PROFILE', '负载特征与合规分类', 'Latency, Statefulness & Untrusted Code', '时延预算、状态驻留时长与不可信代码评估', 'Classifies stateless tool routers, long-running workflows & arbitrary code execution', '区分无状态工具编排、长周期有状态任务与任意生成代码执行三类负载边界', 'selects runtime', '匹配托管计算底座'),
      s('HOSTING SPECTRUM', 'Azure 六层托管底座', 'Foundry · ACA · AKS · Functions · E2B', 'Foundry 托管、ACA 会话、AKS 与弹性沙箱', 'Maps managed PaaS simplicity vs Kubernetes/Kata/MicroVM kernel-level control', '对比全托管智能体服务、ACA 动态会话与 AKS Kata/E2B 微虚机控制粒度', 'enforces boundary', '施加网络与身份隔离'),
      s('ISOLATION PLANE', '内核与网络信任边界', 'Hypervisor/Kata Boundary & Private VNet', '虚拟化内核隔离、专网注入与出口管控', 'Prevents container escape, lateral movement & credential exfiltration across sessions', '阻断容器逃逸、东西向横向移动与跨租户会话敏感凭据外泄风险', 'governs scale', '输出十万级定容模型'),
      s('SCALE & FINOPS', '并发伸缩与单元成本', 'Warm-Pool Cold Start (<200ms) & Session TCO', '温池秒级唤醒、镜像加速与单会话成本', 'Balances warm-pool idle cost against P99 startup latency and regional VM quota', '权衡预热池常驻开销、P99 沙箱拉起时延与区域虚拟核配额利用率')
    ],
    [
      ['Never Run LLM-Generated Code in Shared Pods', '严禁在共享容器内核直接执行生成代码', 'Untrusted Python/shell execution requires Hyper-V, Kata, or Firecracker MicroVM boundaries.', '执行模型动态生成脚本必须启用微虚机或硬件虚拟化级强隔离沙箱。'],
      ['Tier Runtime by Control vs Ops Overhead', '按运维复杂度与控制粒度分层选型', 'Start on Foundry/ACA Dynamic Sessions; graduate to AKS + E2B/Nomad above custom density needs.', '常规企业编排优先采用托管服务与动态会话，超大规模高密定制再下沉至自建集群。'],
      ['Size Warm Pools Against Burst Slope', '围绕并发突发斜率设计预热温池', 'Warm-pool depth must cover burst arrivals during VMSS scale-out provisioning windows.', '预热沙箱水位需覆盖底层节点扩容就绪时间窗内的最大瞬时请求增量。']
    ]
  ),
  'workshops/azure-agent-infra/demo': entry(
    'infra',
    'AKSClaw × E2B Sandbox Simulation Workbench · Control Plane, MicroVM Isolation & Blast-Radius Telemetry',
    'AKSClaw × E2B 沙箱架构仿真工作台 · 控制面编排、微虚机隔离边界与故障半径遥测',
    [
      s('AGENT REQUEST', '智能体任务调度入口', 'Gateway Auth & Session Lease Request', 'API 网关鉴权与沙箱会话租约申请', 'Validates Entra token, quota limits & template snapshot ID before allocation', '校验调用方身份、租户并发配额与预构建环境快照标识', 'claims microVM', '从温池认领微虚机'),
      s('E2B / KATA POOL', '微虚机快照与温池', 'Snapshot Restore & Kernel Isolation', '内存快照毫秒级恢复与独立内核边界', 'Dedicated guest kernel, ephemeral filesystem & cgroup CPU/memory throttling', '每会话独立客户机内核、临时文件系统与计算内存硬限额隔离', 'filters egress', '受控通过网络出口墙'),
      s('EGRESS & SECRET', '零信任网络与凭据代理', 'FQDN Allowlist & Scoped Proxy Injection', '域名白名单过滤与凭据代理免落盘注入', 'Blocks metadata IMDS (`169.254.169.254`), raw socket scans & raw secret env vars', '阻断云主机元数据探测与内网扫描，敏感凭据经边界代理注入不落入沙箱内存', 'handles faults', '执行心跳续租与回收'),
      s('HEARTBEAT & GC', '租约心跳与断连自愈', 'Nomad/AKS Lease Fencing & Pause/Resume', '心跳续租防脑裂、断连保留与超时回收', 'Retains disconnected state within TTL; fences zombie sandboxes deterministically', '短时网络闪断保留上下文，租约到期强制隔离并销毁残留计算实例')
    ],
    [
      ['Block Cloud IMDS & East-West Subnets', '默认封禁实例元数据与内网东西向网段', 'Sandbox NICs must deny 169.254.169.254 and internal cluster CIDRs at the host tap.', '宿主机虚拟网卡层必须默认丢弃云元数据地址与集群内部管理网段流量。'],
      ['Snapshot Restore Eliminates Cold-Install Tax', '内存快照恢复替代在线安装依赖包', 'Pre-baked runtime snapshots cut environment boot from tens of seconds to ~150ms.', '通过预烘焙运行时内存快照将重依赖环境启动从数十秒压缩至百毫秒级。'],
      ['Lease Fencing Prevents Orphaned Compute', '租约栅栏机制杜绝僵尸沙箱计费泄漏', 'Deterministic TTL fencing reclaims partitioned worker nodes without split-brain writes.', '网络分区或客户端异常退出时，基于租约栅栏安全回收算力并防止双写冲突。']
    ]
  ),
  'workshops/azure-agent-infra/selector': entry(
    'infra',
    'Azure Agent Infra Selector & 100K-Sandbox Sizer · Decision Tree, VM SKU Packing & Monthly TCO',
    'Azure 智能体底座选型器与十万沙箱定容台 · 多维决策树、虚机装箱密度与月度成本测算',
    [
      s('DECISION INPUTS', '架构约束输入矩阵', 'Concurrency, Isolation, Cold-Start & Ops', '并发规模、隔离等级、冷启动与运维预算', 'Scores workload requirements across security tier, session duration & regional SKU quota', '输入目标并发数、不可信代码等级、单会话驻留时长与团队平台运维能力', 'ranks runtimes', '评分推荐最佳底座'),
      s('RUNTIME MATRIX', '六大托管方案评分对比', 'ACA Sessions vs AKS Kata vs E2B VMSS', '托管会话、AKS Kata 与 E2B 集群评分矩阵', 'Quantifies cold-start P95, max session lifetime, VNet integration & ops burden', '横向对比各方案冷启动时延、最长会话时限、专网集成能力与平台维护负担', 'packs VM SKUs', '计算节点装箱密度'),
      s('100K BIN-PACKING', '十万级沙箱装箱模型', 'vCPU Oversubscription, RAM & Snapshot IOPS', 'CPU 超卖比、内存预留与快照存储吞吐', 'Computes worker node count, NVMe cache bandwidth & warm-pool buffer at 1K–100K scale', '测算千级至十万级活跃沙箱所需的宿主虚机台数、本地盘带宽与温池冗余比例', 'projects TCO', '输出月度成本拐点'),
      s('FINOPS CROSSOVER', '托管计费与自建 TCO 拐点', 'Per-Second PaaS vs Reserved VM Break-Even', '按秒托管计费对比预留实例自建成本拐点', 'Identifies utilization threshold where reserved VMSS/AKS undercuts per-session billing', '定位持续并发利用率跨过何种阈值时自建预留节点池开始优于按秒托管计费')
    ],
    [
      ['RAM & Page-Cache Dictate True Node Density', '内存与快照页缓存决定真实单机密度', 'Sandbox bin-packing hits memory and disk-restore IOPS limits well before vCPU saturation.', '高密沙箱装箱往往先触及物理内存与快照读取 IOPS 上限，而非 CPU 利用率上限。'],
      ['Explicit PaaS-to-IaaS Break-Even Curve', '用量化利用率拐点替代主观自建冲动', 'Low/spiky duty cycles win on ACA Dynamic Sessions; high steady concurrency favors VMSS.', '低频突发负载优先采用按秒计费托管会话，高稳态并发底座再切换至预留虚机池。'],
      ['Regional Quota & Subnet IP Planning', '十万沙箱必须前置规划子网 IP 与配额', '100K sandboxes require CNI overlay / NAT port budgets and multi-zone vCPU quota splits.', '超大规模并发需提前设计覆盖网络地址空间、SNAT 端口池与跨可用区配额拆分。']
    ]
  ),
  'workshops/benchmarks/llm-inference-engine-pd-sizer': entry(
    'infra',
    'LLM Serving Engine (vLLM / SGLang / TRT-LLM) & PD Disaggregation Sizer · RadixAttention, Dynamo & Mooncake',
    'LLM 推理引擎选型（vLLM / SGLang / TRT-LLM）与 PD 分离定容台 · 前缀复用与跨机 KV 测算',
    [
      s('ENGINE SELECTION', '三大推理引擎选型', 'vLLM v1 vs SGLang vs TensorRT-LLM', '通用生态、前缀树结构化加速与极致算子对比', 'Compares ecosystem breadth, RadixAttention/compressed FSM speedups & FP8/NVFP4 kernels', '对比模型适配广度、多轮智能体前缀树缓存/结构化解码效率与底层算子峰值性能', 'models KV cache', '建模前缀命中与显存'),
      s('KV & PREFIX MATH', 'KV 缓存与前缀命中率', 'GQA/MLA Footprint & Prefix Cache Reuse', 'GQA/MLA 单词元字节数与前缀复用削峰', 'Effective prefill FLOPs scale by (1 − hit_rate); shared system/tool prompts cut TTFT', '前缀缓存命中直接削减重复预填充算力，显著降低多轮工具调用首字时延', 'sizes P:D pools', '推演最优 P:D 卡数比'),
      s('DYNAMO + MOONCAKE', 'PD 分离控制与传输面', 'NVIDIA Dynamo Router & Mooncake/NIXL RDMA', 'KV 感知全局路由与零拷贝分层 KV 池', 'Routes requests to warm prefix nodes and streams KV blocks across RDMA/NVMe tiers', '优先路由至已驻留前缀的节点，并通过 RDMA 异步完成预填充到解码池交接', 'outputs cluster BOM', '输出集群配置清单'),
      s('CLUSTER BOM', 'GPU 卡数与单价账本', 'P-Pool + D-Pool GPUs, NICs & $/1M Tokens', '预填充卡、解码卡、网卡带宽与百万词元成本', 'Outputs exact prefill/decode GPU split, required Gb/s NIC count & compliant goodput', '实时给出预填充/解码卡配比、所需 RDMA 网卡速率及达标百万词元推理成本')
    ],
    [
      ['Agentic Multi-Turn Workloads Favor Radix/KV Routing', '多轮智能体场景优先前缀感知调度', 'High shared-prompt overlap makes SGLang RadixAttention + KV-aware routing decisive.', '工具定义与历史上下文高度重合时，前缀树复用与缓存亲和路由收益最显著。'],
      ['TRT-LLM Excels at Locked SKU Peak Efficiency', '固定模型与旗舰卡极致压榨优选 TRT-LLM', 'Delivers lowest per-token cost on Hopper/Blackwell when model architecture is stable.', '在模型版本收敛且追求单卡极致 FP8/FP4 吞吐密度时具备明显算子优势。'],
      ['Size RDMA Fabric Simultaneously With P:D Split', '定容 P:D 卡数必须同步校核网卡带宽', 'Under-provisioned NIC bandwidth turns disaggregated KV handoff into a TTFT bottleneck.', '网卡有效带宽不足会使跨机 KV 传输耗时超过预填充计算本身，抵消分离收益。']
    ]
  ),
  'workshops/benchmarks/mai-image-2-7-commercial-edit-bench': entry(
    'benchmarks',
    'MAI-Image-2.7 & 2.7-Flash Commercial Image Editing Benchmark · 121 Live Runs Across Identity, Text & Relighting',
    'MAI-Image-2.7 与 2.7-Flash 商业图像编辑评测工作台 · 121 轮商品主体、文字与光影实测',
    [
      s('COMMERCIAL SUITE', '商业修图封存测试集', 'Editable & ServImage (121 Live Runs)', '商业商品编辑与多轮指令评测集（121 轮）', 'Product background swap, bilingual poster typography, multi-turn mask-free edits & relighting', '覆盖电商换背景、中英海报文字保真、无掩码局部精修与环境光重打光真实任务', 'executes live API', '调用双档模型实测'),
      s('TIER COMPARISON', '旗舰版与极速版对照', 'MAI-Image-2.7 vs MAI-Image-2.7-Flash', '标准高精模型对比 Flash 低时延高性价比模型', 'Measures quality retention vs end-to-end generation latency & per-image API cost', '同题对比两档模型在主体结构保持、边缘融合度与端到端出图耗时上的真实差距', 'scores fidelity', '多维指标定量打分'),
      s('FIDELITY AUDIT', '主体锁死与字形核验', 'SKU Geometry Lock, Glyph Accuracy & Lighting', '非编辑区像素保持、字形准确率与阴影一致性', 'Flags unintended background drift, logo distortion, plastic skin & floating contact shadows', '重点审计非编辑区篡改、品牌标识形变、文字笔画错乱与接触阴影悬浮等商业痛点', 'routes tiers', '制定分层调用策略'),
      s('ROUTING PLAYBOOK', '企业商业视觉分层路由', 'Interactive Drafts on Flash → Hero Master on 2.7', '交互预览走 Flash、主图定稿走 2.7 标准版', 'Cuts iterative design latency while locking hero-asset compliance on final export', '高频交互探索使用 Flash 秒级反馈，终版投放物料切换高精模型叠加质检门禁')
    ],
    [
      ['Non-Edited Region Preservation Is Critical', '商业修图首要底线是不篡改商品本体', 'Enterprise e-commerce requires strict pixel/SKU geometry invariance outside target instructions.', '相比纯创意生图，商业编辑的核心准入标准是商品轮廓、材质与标识零漂移。'],
      ['Flash Tier Unlocks Sub-Second Designer Loops', 'Flash 档位打通设计师实时交互闭环', 'MAI-Image-2.7-Flash handles layout/lighting exploration before final high-precision render.', '以低成本低时延档位承接前序十余轮构图光影试错，显著压降单套成片综合成本。'],
      ['Pair Pixel Editing With Deterministic Typography', '高精度局部修图仍建议配合矢量文字层', 'Even with strong glyph accuracy, regulated price/legal copy belongs on SVG/Remotion layers.', '涉及促销价格与法规声明的严谨排版，生产架构仍应将生成底板与矢量文字分层合成。']
    ]
  ),
  'workshops/deepinfer-v41-economics/index': entry(
    'infra',
    'DeepSeek DeepInfer $38/GPU-Hour Economics · E/P/D Disaggregation, Wide-EP MLA & 155T/Day Cost Ledger',
    'DeepSeek DeepInfer 单卡 $38/小时单元经济模型 · E/P/D 解耦、大跨度专家并行与成本总账',
    [
      s('MODEL PRIMITIVES', '算法与显存压缩底座', 'MLA KV Compression + FP8 Sparse MoE', '多头潜在注意力（MLA）与细粒度稀疏 MoE', 'Compresses KV cache footprint dramatically while activating only a fraction of total parameters', '大幅压缩单请求 KV 显存占用并仅激活少量路由专家，从根源抬高单卡并发上限', 'disaggregates pools', '支撑大规模池化解耦'),
      s('WIDE-EP & PD SPLIT', '跨节点大专家并行与分离', 'Prefill EP32/64 + Decode Wide-EP144 (DeepEP)', '预填充池与超宽专家并行解码池异构协同', 'Overlaps IB RDMA dispatch/combine with computation across dozens of H800 GPUs', '通过通信算子与矩阵计算深度重叠掩盖跨机专家分发时延，吃满显存带宽与算力', 'shapes diurnal load', '结合昼夜潮汐调度'),
      s('CACHE & DIURNAL OPS', '前缀硬盘缓存与昼夜复用', '56%+ Disk Prefix Hit & Day/Night Pool Shift', '高命中率分布式前缀缓存与昼夜算力削峰填谷', 'Offloads shared prefixes to 3FS/SSD and reallocates night inference GPUs to training/RL', '超半数输入词元命中前缀缓存免除重复计算，夜间低谷期算力动态切回训练研究任务', 'computes margin', '核算单卡营收毛利'),
      s('UNIT LEDGER', '单卡小时营收与成本拆解', 'Compliant Goodput × Price vs ~$2/GPU-Hr Cost', '有效吞吐乘客单价对比基础设施折旧电费', 'Deconstructs theoretical $38/GPU-hr ceiling vs real-world utilization, discounts & SLA bounds', '清晰拆解理论营收上限与实际负载波动、缓存折扣率及双机容灾冗余后的真实毛利边界')
    ],
    [
      ['Co-Design of Model Architecture & Serving Stack', '模型结构与系统通信协同设计是高毛利前提', 'MLA and fine-grained MoE were explicitly co-designed around H800 NVLink/IB bandwidth limits.', '高吞吐并非单纯软件调优，而是注意力压缩、稀疏度与网卡带宽协同设计的产物。'],
      ['Theoretical Ceiling ≠ Realized Blended Margin', '区分峰值理论毛利与全天候综合净收益', 'Off-peak discounts, cache-hit pricing, and failover headroom reduce realized $/GPU-hour.', '评估推理经济账必须扣除非高峰闲置、命中缓存低单价与高可用冗余节点的折损。'],
      ['Wide-EP Requires Lossless RDMA & Load Balance', '大跨度专家并行高度依赖无损网络与均衡器', 'Replicating Wide-EP gains demands RDMA NICs, kernel overlap, and hot-expert replication.', '复现超宽专家并行吞吐必须同时具备高性能 RDMA 网络、重叠通信算子与动态专家均衡。']
    ]
  ),
  'workshops/foundry-local/index': entry(
    'infra',
    'Foundry Local On-Device AI & Copilot+ PC Workbench · NPU/iGPU/CPU Hardware Sizer, Model Catalog & Hybrid Router',
    'Foundry Local 端侧 AI 与 Copilot+ PC 就绪度工作台 · NPU/GPU/CPU 定容评估与云边协同路由',
    [
      s('DEVICE HARDWARE', '终端异构算力画像', 'NPU (40+ TOPS) + iGPU/dGPU + Unified RAM', '端侧 NPU、核显/独显与系统可用内存评估', 'Profiles Qualcomm Hexagon, Intel Lunar Lake, AMD Ryzen AI & Apple/RTX memory envelopes', '检测终端 NPU 算力档位、显存/共享内存上限与电池供电热设计功耗约束', 'matches runtime', '匹配推理执行提供方'),
      s('LOCAL RUNTIME', '端侧运行时与量化目录', 'ONNX Runtime GenAI (QNN/WebGPU/DirectML)', 'ONNX Runtime 跨硬件后端与 INT4/Q8 模型库', 'Maps Phi-4-mini, Qwen, Whisper & embedding INT4/Q4_K_M models to optimal execution provider', '将端侧小语言模型、语音与向量模型按量化位宽精准映射至 NPU 或 GPU 执行后端', 'gates escalation', '执行隐私与复杂度分流'),
      s('CLOUD-EDGE ROUTER', '云边混合隐私与质量路由', 'Zero-Egress PII Local vs Azure Foundry Cloud', '敏感数据本地闭环与复杂推理云端升档', 'Keeps offline/PII drafting, summarization & classification on NPU; escalates complex multi-step tasks', '机密文档摘要、意图分类与离线辅助留驻端侧，超长上下文与复杂工具编排平滑升档云端', 'saves cloud TCO', '沉淀成本与时延收益'),
      s('FLEET READINESS', '企业终端机群准入与降本', 'Fleet SKU Audit & Cloud Token Offload ROI', '企业办公终端硬件盘点与云词元卸载率测算', 'Calculates % of high-frequency copilot turns offloaded to zero-marginal-cost endpoint NPUs', '测算企业存量与新购终端可本地承接的高频请求占比及对应的云端推理账单节降')
    ],
    [
      ['OS Memory Headroom Caps Real Local Model Size', '操作系统与应用常驻内存决定真实可跑模型上限', 'A 16 GB laptop leaves ~4–6 GB safe budget after OS/browser/Teams—favor 1.5B–4B INT4 models.', '16GB 办公终端扣除系统与办公软件后安全推理预算仅约 4–6GB，应首选 3B–4B 量化模型。'],
      ['NPU Wins on Sustained Wattage, GPU on Peak Prefill', 'NPU 胜在后台低功耗常驻，GPU 胜在突发吞吐', 'Route background continuous indexing/drafting to NPU to preserve laptop battery and thermals.', '长时后台总结与实时转写优先调度 NPU 避免风扇啸叫与掉电，短时重负载可调用 GPU。'],
      ['Use Local SLM as Privacy Filter & Router', '以端侧小模型充当云端前沿模型的隐私前置层', 'Scrub PII and classify simple intents locally before incurring cloud token or network latency.', '先在本地完成敏感字段脱敏与简单意图拦截，仅将脱敏后的高难度请求发往云端大模型。']
    ]
  ),
  'workshops/tpu-7day-sprint/index': entry(
    'infra',
    'Google Cloud TPU & AI Hypercomputer Architecture Track · MXU Systolic Arrays, ICI 3D Torus & XLA SPMD',
    'TPU 与 AI Hypercomputer 架构专题（7 模块）· 脉动阵列、ICI 三维环面互连与 XLA 编译栈',
    [
      s('CHIP MICROARCH', '芯片微架构与存储层', 'MXU Systolic Array, VMEM & HBM', '矩阵乘法脉动阵列、片上缓存与高带宽显存', 'Fixed-pipeline BF16/INT8 systolic dataflow eliminates warp scheduling overhead vs SIMT GPUs', '通过固定数据流脉动阵列大幅提高乘加能效比，强依赖编译器静态排布片上 VMEM 数据复用', 'interconnects pods', '经光交换构建三维环面'),
      s('ICI & OCS POD', '跨芯片光互连拓扑', '3D Torus ICI & Optical Circuit Switches (OCS)', '芯片间直连（ICI）三维环面与光路交换重构', 'Reconfigures slice topologies optically around failed racks and matches 3D parallelism axes', '利用光路交换机动态绕过故障机柜并按模型并行维度重塑三维环面物理拓扑', 'compiles via XLA', '由静态图编译器调度'),
      s('XLA & PALLAS', '静态图编译与分片契约', 'JAX / PyTorch-XLA GSPMD & Pallas Kernels', 'XLA 全图静态编译、GSPMD 分片与自定义算子', 'Requires stable tensor shapes to avoid costly XLA recompilation stalls; Pallas fuses custom ops', '依赖固定张量形状分桶避免动态重编译卡顿，通过 Pallas 编写显存融合自定义算子', 'runs production', '对比 GPU 选型与调度'),
      s('HYPERCOMPUTER OPS', '集群编排与异构选型对比', 'GKE Kueue Multislice, Checkpointing & TCO', '多切片联合调度、异步容错与 TPU/GPU 选型对比', 'Compares TPU v5p/Trillium vs NVIDIA H100/B200 across dense/MoE training & prefixed serving', '横向对比 TPU 与同代 GPU 在大模型预训练、长序列训练与大批量推理下的性价比与迁移成本')
    ],
    [
      ['Pad Dynamic Shapes Into Fixed Buckets for XLA', '在 TPU 上必须对动态输入长度做固定分桶填充', 'Unbounded variable sequence lengths trigger repeated XLA graph recompilations that stall serving.', '任意变长输入会频繁触发 XLA 全图重编译阻塞推理，生产环境必须配置幂次长度分桶。'],
      ['Align Tensor Mesh Axes to Physical 3D Torus', '将并行切分维度精确对齐物理三维环面坐标', 'Map FSDP/DP, TP, and PP axes onto contiguous ICI torus dimensions to avoid wrap-around congestion.', '将高频张量并行与全分片数据并行映射至物理相邻环面链路，最大化跨芯片集体通信效率。'],
      ['Evaluate Ecosystem Migration Cost Alongside FLOP/$', '选型须同时核算算子移植成本与硬件性价比', 'Custom CUDA kernels require Pallas/JAX rewrites; standard Transformer/JAX stacks port cleanly.', '重度依赖定制 CUDA 算子的工作负载需评估 Pallas 重写周期，标准架构则可高效享受 ICI 扩展红利。']
    ]
  )
};

module.exports = { INFRA_MORE };
