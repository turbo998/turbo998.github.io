# 企业 Kubernetes GPU 算力切分与装箱（NVIDIA MIG × CUDA MPS × K8s DRA）：硬件显存隔离与 FinOps 选型指南（NVIDIA KAI / Run:ai / Volcano 架构）

## ① 📌 核心选型结论速览（Executive Summary）

> **一句话决策结论**：在运行数百个中轻量级 AI 推理微服务（Whisper 语音识别、BGE 重排、SAM-2 抠图、7B 量化大模型）的企业 Kubernetes GPU 集群中，**严禁继续使用传统的整卡独占分配（`nvidia.com/gpu: 1`，单 Pod 仅用 `8–16GB` 显存却霸占整张 `80GB H100`，导致集群平均 SM 算力利用率低至 `18.4%`，256 个 Pod 烧掉 256 张 H100），也严禁在跨租户生产环境盲目开启软件时间片轮转（`Time-Slicing`，所有共享 Pod 共用同一个显卡全局故障域，任何一个邻居触发显存 OOM 或非法地址访问 `CUDA Xid 31` 都会瞬间杀死同卡全部 8 个生产容器，且上下文切换引发 `+312ms` 的 `p99` 尾延迟抖动）**。
>
> 必须采用 **“三层外层 `NVIDIA MIG` 硬件物理隔离 + 内层同信任域 `CUDA MPS` 算力配额复用 + Kubernetes `DRA`（Dynamic Resource Allocation）潮汐动态重分片”混合架构**：
> 1. **跨租户硬边界：`NVIDIA MIG`（Multi-Instance GPU，`1g.10gb` / `2g.20gb` / `3g.40gb`）硬件级物理隔离**：在芯片物理层将单张 H100/A100 的流式多处理器（SM）、L2 缓存 bank、HBM3 显存控制器与片上交叉开关（Crossbar）硬切分为最多 7 个完全独立的硬件实例——跨实例 OOM 连坐崩溃率从每月 `19 次` 降至 **`0 次`**，`p99` 尾延迟抖动锁死在 **`5.8 ms`**；
> 2. **同团队/同流水线内嵌加速：`CUDA MPS`（Multi-Process Service）线程百分比限流**：在同一个 `MIG 2g.20gb` 或 `3g.40gb` 硬件安全舱内部，对属于同一业务流水线的可信进程（如 `BiRefNet 抠图 + Depth 估计 + OCR`）开启 `CUDA MPS` 并通过 `CUDA_MPS_ACTIVE_THREAD_PERCENTAGE` 锁定各自 SM 占用上限，消除时间片上下文切换开销；
> 3. **K8s `DRA` 与 `mig-parted` 潮汐几何重配置**：根据白天在线小模型高峰（自动切分为 `7× 1g.10gb`）与夜间批量微调高峰（在线重拼接为 `2× 3g.40gb` 或整卡 `80GB`）动态调整节点 MIG 拓扑，将 256 个推理 Pod 所需物理 H100 从 `256 张` 压降至 **`58 张`（利用率跃升至 `79.6%`）**，每年为企业净省 **`+$2,860,000`**。

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：Time-Slicing（时间片共享）、CUDA MPS 和 NVIDIA MIG 三者到底有什么本质区别？什么时候该用哪个？
- **Time-Slicing（分时复用）**：纯软件轮转，**无显存隔离、无故障隔离、无带宽隔离**。每当切换进程时需挂起整卡上下文，仅适合开发环境 Jupyter Notebook 闲时共享，**严禁用于生产 SLA 推理**。
- **CUDA MPS（多进程服务）**：多个进程共享同一个 CUDA Context 从而能同时在 SM 上并发执行核函数（无切换开销），且支持按百分比限制每个进程的 SM 算力与显存上限；但**仍共享同一个 GPU 硬件错误域（Fatal Fault Domain）**——若一个进程触发底层页表异常，同组 MPS 进程会一起崩溃。因此**仅适合同一团队内部可信微服务的紧凑拼车**。
- **NVIDIA MIG（多实例 GPU）**：从硅片物理晶体管层面切分独立的内存通道、L2 Cache 与 SM，具备**云厂商级的硬件故障与 QoS 强隔离**，是跨部门、跨客户多租户推理的唯一合规底座。

### Q2：为什么很多企业开了静态 MIG 之后，还是有 34% 的 GPU 切片空置分不出去（俄罗斯方块碎片问题）？
- **静态 Node Label 的“木桶僵化”**：如果运维人员把节点固定打标为 `all-1g.10gb`，当来了一个需要 `20GB` 显存的 7B 模型 Pod 时就无法调度；反之若固定切为 `3g.40gb`，大量的 `4GB` 小模型又会浪费显存。
- **Kubernetes `DRA` + `nvidia-mig-parted` 按需即时铸造**：通过 Kubernetes Dynamic Resource Allocation (`ResourceClaim`)，调度器根据待调度 Pod 队列的真实显存需求，通过 `NVML` API 在 `1.2 秒` 内将空闲 H100 节点动态重切为 `1× 3g.40gb + 1× 2g.20gb + 2× 1g.10gb` 的异构精确组合，碎片率趋近于零。

### Q3：如何向 CFO 和基础设施 VP 直观证明 GPU 切分改造没有牺牲业务 SLA 反而省下 $286 万？
- **硅片级可视化沙盘 + Remotion FinOps 周报视频**：工作台直接把单张 H100 的 7 个计算切片与 8 个 10GB 显存条可视化为物理硅片拓扑，实时对比“整卡独占 81.6% 黑硅闲置”、“Time-Slicing 红色连坐爆炸”与“MIG+MPS 绿色硬件防火墙”，一键导出 15 秒 CFO 算力降本汇报视频。

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + MIG×MPS×DRA 架构图 + 动态切分时序图）

### 3.1 Kubernetes GPU 切分与多租户共享架构选型决策树
```mermaid
flowchart TD
    A[Kubernetes 集群部署中轻量 AI 推理与流水线 Pod] --> B{容器间信任关系与显存需求?}
    B -->|整卡独占 nvidia.com/gpu: 1| C[单 Pod 仅用 8GB 却霸占 80GB H100<br/>SM 利用率仅 18.4% · 256 Pod 烧掉 256 张卡]
    B -->|跨部门/多租户不可信负载<br/>要求零 OOM 连坐与严格 p99 SLA| D[启用 NVIDIA MIG 硬件物理切分<br/>1g.10gb / 2g.20gb / 3g.40gb 独立显存控制器]
    B -->|同一团队可信 AIGC 串联流水线<br/>抠图 + 深度 + OCR 需零切换并发| E[在单个 MIG 硬件切片内部开启 CUDA MPS<br/>绑定 ACTIVE_THREAD_PERCENTAGE 紧凑装箱]
    D & E --> F[顶层接入 K8s DRA + mig-parted 潮汐动态重分片<br/>利用率升至 79.6% · 0 连坐崩溃 · 年省 +$2.86M]
```

### 3.2 企业级 K8s DRA 动态 MIG 硬件隔离与内层 MPS 混合架构图
```mermaid
flowchart LR
    subgraph Sched["1. K8s DRA 与潮汐拓扑控制面"]
        S1[KAI / Volcano / Run:ai 调度器<br/>感知 Pod 显存与 SM 算力声明]
        S2[mig-parted 动态重分片控制器<br/>1.2s 在线切换异构 MIG 几何]
    end
    subgraph Silicon["2. 单张 H100-80GB 硅片双层隔离底座"]
        M1[MIG 3g.40gb 硬件隔离舱 #1<br/>内嵌 MPS: 2× 7B LLM 并发]
        M2[MIG 2g.20gb 硬件隔离舱 #2<br/>内嵌 MPS: 抠图+深度+OCR 流水线]
        M3[2× MIG 1g.10gb 硬件隔离舱 #3/#4<br/>独立承载 SAM-2 与 Whisper]
    end
    subgraph FinOps["3. QoS 保障与 CFO 算力账本"]
        F1[硬件级 HBM3 / L2 Cache 护栏<br/>0 跨租户 OOM · 5.8ms p99 抖动]
        F2[256 Pod 仅需 58 张物理 H100<br/>利用率 79.6% · 年省 +$2.86M]
    end
    S1 --> S2 --> M1 & M2 & M3 --> F1 & F2
```

### 3.3 K8s DRA 按需动态铸造 MIG 切片与阻断恶意 OOM 时序图
```mermaid
sequenceDiagram
    autonumber
    participant Dev as 算法团队提交 ResourceClaim
    participant DRA as K8s DRA + mig-parted 插件
    participant NVML as H100 NVML 硬件固件层
    participant Pod as 租户 A 与租户 B 生产容器

    Dev->>DRA: 请求 1× 20GB 视觉流水线切片 + 2× 10GB 语音切片
    DRA->>NVML: 下发异构切分指令 (1× 3g.40gb + 1× 2g.20gb + 2× 1g.10gb)
    NVML-->>Pod: 1.2s 完成物理 HBM3 内存控制器与 L2 缓存硬隔离挂载
    Pod->>NVML: 租户 B (1g.10gb) 代码内存泄漏触发极端 OOM 与非法指针!
    NVML-->>Pod: 硬件防火墙将故障 100% 锁死在 1g.10gb 实例内 -> 隔壁 3g.40gb 租户 A 零抖动 (5.8ms p99)!
```

---

## ④ 📊 Kubernetes GPU 共享与切分技术栈横向选型决策矩阵

| 评估维度 | 方案 A：整卡独占分配（`nvidia.com/gpu: 1`） | 方案 B：软件时间片轮转（`Time-Slicing`） | 方案 C：K8s DRA 动态 `MIG` 硬件隔离 + 内层 `MPS`（推荐） |
| --- | --- | --- | --- |
| **承载 256 个推理 Pod 所需 H100** | `256 张 H100`（1 Pod 占 1 卡） | `64 张 H100` | **`58 张 H100`（削减 -77.3% 物理 GPU 采购量）** |
| **集群平均 SM 算力利用率** | `18.4%`（81.6% 昂贵硅片空转） | `54.2%` | **`79.6%`（异构 MIG + 内层 MPS 消除碎片）** |
| **跨租户 OOM / 故障连坐崩溃** | `0 次 / 月`（物理分卡） | `19 次 / 月`（**致命！** 1 个 Pod OOM 全卡 8 容器团灭） | **`0 次 / 月`（独立 HBM3 内存控制器与 L2 硬件物理墙）** |
| **吵闹邻居引发的 `p99` 尾延迟抖动** | `4.2 ms` | `+312.0 ms`（上下文抢占与显存带宽争抢） | **`5.8 ms`（硬件级显存带宽交叉开关锁死）** |
| **256-Pod 集群年度 FinOps 净收益** | `-$1,420,000 / yr`（严重算力浪费） | `+$420,000 / yr`（频繁生产事故赔付抵消） | **`+$2,860,000 / yr`** |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 基准报告

- **交互式工作台入口**：[`demos/kubernetes-gpu-mig-time-slicing-mps-bin-packing-finops-video-studio/`](../demos/kubernetes-gpu-mig-time-slicing-mps-bin-packing-finops-video-studio/index.html)
- **7-Card 4:5 视觉评测报告 SVG**：[`docs/benchmarks/kubernetes-gpu-mig-time-slicing-mps-bin-packing-finops-video/summary-visual.svg`](benchmarks/kubernetes-gpu-mig-time-slicing-mps-bin-packing-finops-video/summary-visual.svg)
- **实测验证 JSON 数据源**：[`docs/benchmarks/kubernetes-gpu-mig-time-slicing-mps-bin-packing-finops-video/summary.json`](benchmarks/kubernetes-gpu-mig-time-slicing-mps-bin-packing-finops-video/summary.json)

![企业 Kubernetes GPU MIG × MPS × DRA 算力装箱工作台 7-Card 报告](benchmarks/kubernetes-gpu-mig-time-slicing-mps-bin-packing-finops-video/summary-visual.svg)

---

## ⑥ 🛠️ 企业 Kubernetes GPU 虚拟化与混部落地评审 Checklist

- [ ] **生产多租户禁用裸 Time-Slicing 铁律**：Admission Webhook 是否已拦截任何面向外部客户 SLA 的生产 Namespace 使用无硬件隔离的 `Time-Slicing` 策略？
- [ ] **外层 MIG + 内层 MPS 双层信任边界划分**：是否严格遵循“跨团队/跨租户走 `MIG` 硬件物理切片，同团队可信流水线子容器在单个 MIG 切片内走 `CUDA MPS`”的黄金架构准则？
- [ ] **DCGM 切片级精准指标采集**：Prometheus 是否已升级至支持 `DCGM_FI_PROF_GR_ENGINE_ACTIVE` 按每个 `GPU_I_ID`（MIG 实例 ID）独立采集真实 SM 利用率，而非只看粗糙的整卡 `nvidia-smi`？
- [ ] **潮汐 `mig-parted` 零中断优雅排空**：早晚高峰自动重切节点 MIG 几何规格前，控制器是否先拉起备用切片完成 Readiness 探针切换后再执行 `NVML` 重分片？
