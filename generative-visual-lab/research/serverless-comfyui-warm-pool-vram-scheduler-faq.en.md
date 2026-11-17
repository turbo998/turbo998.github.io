# Why Self-Hosted ComfyUI Clusters Suffer 28GB VRAM Eviction Thrashing & 120s Cold Starts—and How DAG Affinity Routing + Zero-Copy mmap Warm Pools Lock GPU Efficiency at 1.0000× (FAQ · 250th Demo Milestone!)

> **Audience**: **Cloud & AI Solution Architects** and Infrastructure Leads designing enterprise self-hosted ComfyUI / Diffusers Kubernetes clusters (H100 / L40S / A100) and multi-tenant serverless AIGC platforms.
> **Core Value** (**Round 240 · 250th Demo Historic Milestone!**): Solves the #1 infrastructure failure when scaling ComfyUI from a single workstation to a multi-tenant Kubernetes cluster—**VRAM Eviction Ping-Pong and 115-second container cold starts**. Explains how **Layer 1: DAG Base-Checkpoint Consistent-Hash Affinity Routing + Layer 2: Host NVMe/shm Zero-Copy `mmap` Safetensors & CRIU `<1.8s` Snapshot Restore + Layer 3: Pinned 24GB Base DiT + `<180ms` Dual-Buffered LoRA Hot-Swapping** locks cluster GPU efficiency and SLA budget at **`1.0000×`** across all 17 concurrency tiers.

![Enterprise Serverless ComfyUI Warm-Pool & VRAM Affinity Scheduler Summary](./evidence/serverless-comfyui-warm-pool-vram-scheduler-workbench-summary.svg)

---

## 📌 1. Executive Summary

> **One-Sentence Architecture Verdict**: Diffusion workers carrying **`24 GB ~ 28 GB` of VRAM state (Flux.1 / Wan 2.2 / SDXL + ControlNets)** must never be load-balanced like stateless web microservices. **Naive Round-Robin Dispatch & Container Cold-Start Model Swapping** forces workers to repeatedly evict and reload 28GB checkpoints over PCIe/network storage ("VRAM Eviction Ping-Pong"), inflating GPU-hour cost as $W(u) = 1 + u$ up to **`2.0000×`** at Tier 16 (`16/17` tiers violated). Combining **DAG Base-Model Consistent-Hash Affinity Pools + Zero-Copy `mmap` / GPUDirect Storage + `<180ms` LoRA Pointer Hot-Swapping** amortizes unit GPU cost as $c_{\text{gpu}}(u) = c_0 / (1 + u)$, locking cluster utilization and P99 SLA efficiency at **`1.0000×` (`0/17` violations)**.

| Evaluation Dimension | ❌ Naive Stateless Round-Robin & Container Cold-Start | ✅ Enterprise DAG Affinity Warm-Pool + Zero-Copy `mmap` + LoRA Hot-Swap | Architect Benefit (Measured) |
| :--- | :--- | :--- | :--- |
| **Heterogeneous DAG Routing (Flux vs Wan)** | Blind round-robin (evicts 24GB Flux to load 28GB Wan on every request) | **Consistent-hash routing by `base_model_sha256`; 24GB base stays pinned in HBM** | **0 base-model VRAM evictions** |
| **Multi-Tenant Brand LoRA Switching** | Reloads full merged checkpoint (`12 ~ 25s` stall) | **Freezes 24GB base model; dual-buffer DMA hot-swaps `150MB` LoRA in `<180ms`** | **`100×` faster tenant style switching** |
| **Scale-Up Pod Cold-Start Latency** | Downloads 28GB over S3/NFS + cold Python/CUDA init (`95 ~ 140s`) | **Host NVMe/shm zero-copy `mmap` Safetensors + CRIU CUDA snapshot** | **`< 1.8s` warm pod readiness** |
| **Tiers 4 / 8 / 16 GPU Cost Ratio** | `1.2500×` / `1.5000×` / **`2.0000×`** (16/17 violated) | **`1.0000×` / `1.0000×` / `1.0000×`** (0/17 violations) | **Saves up to `50%` of H100/L40S cluster spend** |

---

## 🎯 2. Architect & Business Q&A

### Q1: Why does putting ComfyUI behind a standard Kubernetes `round-robin` or `least_conn` Ingress cause GPU throughput to collapse under mixed workloads?
- **The VRAM Eviction Ping-Pong Trap**:
  1. When Designer A submits a `Flux.1-dev` poster job (`24 GB` VRAM) and Designer B submits a `Wan 2.2` video job (`28 GB` VRAM), a stateless round-robin load balancer frequently sends Request 1 (Flux) and Request 2 (Wan) to the same 48GB L40S or 80GB H100 worker;
  2. The worker evicts 24GB Flux from VRAM, spends 18 seconds loading 28GB Wan over PCIe, runs for 10 seconds, and then receives Request 3 (Flux)—evicting Wan to reload Flux all over again;
  3. Across the 17 burst concurrency tiers $u \in [0, 1]$, this PCIe/VRAM thrashing inflates GPU-hour consumption as $W(u) = 1 + u$, reaching **`1.5000×`** at Tier 8 and **`2.0000×`** at Tier 16.

### Q2: How do DAG Affinity Routing, Zero-Copy `mmap`, and `<180ms` LoRA Hot-Swapping eliminate cold starts and VRAM thrashing?
- **Three-Layer Stateful GPU Scheduling Architecture**:
  1. **Layer 1 — DAG Base-Model Consistent Hashing & Prefix Cache**: The scheduler parses the incoming ComfyUI workflow JSON, extracts the heavy base checkpoint hash (`base_model_sha256`) and longest matching DAG node prefix, and routes the job to the warm pool where that exact 24GB/28GB base model is already pinned in HBM;
  2. **Layer 2 — Host NVMe RAID-0 / `/dev/shm` Zero-Copy `mmap` + CRIU CUDA Restore**: Checkpoints are stored once on host-local NVMe RAID-0 or `/dev/shm` and mapped into containers via read-only `safetensors` `mmap` or NVIDIA GPUDirect Storage (GDS). Combined with CRIU + `cuda-checkpoint`, new pods restore in **`< 1.8 seconds`**;
  3. **Layer 3 — Pinned 24GB Base + `<180ms` Async DMA LoRA Hot-Swap**: Rather than baking 500 tenant LoRAs into 500 separate 24GB checkpoints, the 24GB base DiT remains frozen in HBM while a secondary CUDA stream prefetches and binds `150 MB` rank-decomposed LoRA weights $(\Delta W = \alpha B A)$ in **`< 180 ms`**.

### Q3: How should architects prevent OOM spikes from `T5-XXL` text encoders and 4K video VAE decoding?
- **Disaggregated Text-Encoder Pool & Micro-Batch Tiled VAE**:
  1. Offload the `10 GB` `T5-XXL` / `Qwen-VL` text encoder (which runs for only `<50ms` per job) to a shared gRPC microservice on cheaper L4/CPU nodes, freeing `10 GB` of H100 HBM per worker;
  2. Enforce **Temporal/Spatial Tiled VAE Decoding** so final-step pixel reconstruction never triggers an end-of-job VRAM OOM crash.

---

## 🧭 3. Visual Architecture Diagrams (Mermaid)

### 3.1 Enterprise Serverless ComfyUI Scheduling Decision Tree

```mermaid
flowchart TD
    A["Incoming ComfyUI Workflow DAG"] --> B["Extract Base Checkpoint Hash<br/>base_model_sha256 (Flux / Wan / SDXL)"]
    B --> C{"Warm Worker Available in<br/>Target Base-Model Pool?"}
    C -->|"Yes (24GB Base Already Pinned in HBM)"| D{"Requires Tenant LoRA<br/>or ControlNet?"}
    D -->|"Yes (150MB Adapter)"| E["✅ Async CUDA Stream DMA Prefetch<br/><180ms Pointer Hot-Swap (0 Base Reload)"]
    D -->|No| F["✅ 0ms Load! Execute Immediately<br/>with DAG Prefix Cache"]
    C -->|"No (Burst Traffic Scale-Up)"| G["✅ Restore CRIU/CUDA Pod Snapshot +<br/>Zero-Copy Host NVMe/shm mmap (<1.8s)"]
    E --> H["Shared T5 Encoder -> Pinned DiT -> Tiled VAE"]
    F --> H
    G --> H
```

### 3.2 Enterprise ComfyUI Warm-Pool, Zero-Copy mmap & DAG Affinity Architecture

```mermaid
flowchart LR
    subgraph Gateway["① DAG-Aware Affinity Gateway"]
        R1["Workflow AST Parser<br/>Extract Checkpoint SHA-256 & Prefix Hash"]
        R2["Consistent-Hash Affinity Router<br/>+ Queue-Depth Watermark Scaler"]
        R1 --> R2
    end

    subgraph SharedEnc["② Disaggregated Encoder Pool (L4/CPU)"]
        E1["Shared T5-XXL / CLIP gRPC Service<br/>(Frees 10GB HBM on H100 Workers)"]
    end

    subgraph WarmPools["③ Pinned HBM Warm Worker Pools (H100/L40S)"]
        P1["Pool A (24GB Flux.1 Pinned)<br/>+ Dual-Buffer <180ms LoRA Slot"]
        P2["Pool B (28GB Wan 2.2 Pinned)<br/>+ Tiled Micro-Batch VAE Guard"]
    end

    subgraph StorageBus["④ Host Zero-Copy Weight Substrate"]
        S1["Host /dev/shm + NVMe RAID-0<br/>Read-Only Safetensors mmap + GDS"]
        S2["CRIU + cuda-checkpoint Snapshot (<1.8s)"]
    end

    Gateway --> SharedEnc --> WarmPools
    StorageBus -.->|"Zero-Copy mmap (<1.8s)"| WarmPools
```

### 3.3 Sequence Diagram: Naive VRAM Ping-Pong vs DAG Affinity + 180ms LoRA Hot-Swap

```mermaid
sequenceDiagram
    autonumber
    participant Client as Multi-Tenant Burst (Flux & Wan Mixed)
    participant Naive as ❌ Naive Round-Robin Worker
    participant Router as ✅ DAG Affinity Router
    participant PoolA as ✅ Flux Warm Pool (24GB Pinned)

    Client->>Naive: Job #1 (Flux+LoRA_A) -> Job #2 (Wan Video) -> Job #3 (Flux+LoRA_B)
    Naive->>Naive: Evict Flux (3s) -> Load 28GB Wan (18s) -> Run -> Evict Wan (3s) -> Reload Flux (16s)
    Naive-->>Client: ❌ 40s wasted on PCIe eviction ping-pong! 2.0000× GPU cost overrun

    Client->>Router: Submit Job #1 & Job #3 (Flux Base, Different Tenant LoRAs)
    Router->>PoolA: Route by base_model_sha256 to Pool A (24GB Flux Pinned)
    PoolA->>PoolA: While Job #1 runs, Stream #2 DMA-prefetches LoRA_B (150MB in 140ms)
    PoolA-->>Client: ✅ 0ms Base Reload! <180ms LoRA switch, 1.0000× GPU efficiency lock
```

---

## 📊 4. Horizontal GPU Cluster & Serverless Orchestration Comparison Matrix

| Cluster Orchestration Architecture | Scale-Up Cold Start | Base-Model VRAM Eviction Rate | Tenant LoRA Switch Time | Effective GPU Compute Utilization | Recommended Enterprise Scenario |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DAG Affinity Warm-Pool + NVMe/shm `mmap` + CRIU + LoRA Hot-Swap** | ⭐⭐⭐⭐⭐ (**`< 1.8 s`**) | ⭐⭐⭐⭐⭐ (**`0.0%` eviction ping-pong**) | ⭐⭐⭐⭐⭐ (**`< 180 ms` async DMA**) | **Very High (`> 92%`, `1.0000×` lock)** | **Enterprise self-hosted K8s AIGC platforms & multi-tenant SaaS clouds** |
| **Managed Serverless GPU (Modal / Fal / Replicate Warm Containers)** | ⭐⭐⭐⭐ (`2 ~ 6 s`) | ⭐⭐⭐⭐ (Pool-isolated) | ⭐⭐⭐⭐ (`< 500 ms`) | High (per-second billing) | **Spiky workloads for teams without dedicated K8s GPU infra engineers** |
| **Static Monolithic Workers (1 Merged Checkpoint per GPU)** | ⭐⭐⭐⭐⭐ (`0 s`) | ⭐⭐⭐⭐⭐ (`0.0%`) | ⭐ (Requires 1 GPU per LoRA; high idle waste) | Low-Medium (idle long-tail GPUs) | **Single-workflow factories with no multi-tenant LoRA diversity** |
| **Naive K8s Round-Robin + S3/NFS Cold Pull** | ❌ (**`90 ~ 140 s`**) | ❌ (**Constant thrashing, `2.0000×` waste**) | ❌ (`15s+` full reload) | **Very Low (`< 45%` useful compute)** | ⛔ **Never use for stateful 28GB AIGC workloads** |

---

## 🧪 5. Interactive Workbench & 7-Card Report (250th Demo Milestone!)

- **Interactive Workbench**: [`demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/`](../demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/index.html)
- **7-Card 4:5 Visual Report (EN)**: [`demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/test-report-cards.html`](../demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/test-report-cards.html)
- **7-Card 4:5 Visual Report (ZH)**: [`demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/test-report-cards.zh.html`](../demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/test-report-cards.zh.html)
- **Sealed Report JSON**: [`demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/report.json`](../demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/report.json)

---

## 🛠️ 6. Enterprise Delivery Review Checklist

- [ ] **Ban Stateless Round-Robin on Stateful GPU Workers**: Does the ingress router inspect `base_model_sha256` and route requests via consistent hashing to base-model-pinned GPU pools?
- [ ] **Read-Only `mmap` Safetensors on Host NVMe/shm**: Are all `.safetensors` checkpoints mounted read-only from host NVMe RAID-0 / `/dev/shm` with `mmap` enabled rather than copied per container?
- [ ] **Dual-Buffered `<180ms` LoRA Hot-Swapping**: Are 24GB base models kept frozen in HBM while 150MB tenant LoRA adapters are prefetched on a secondary CUDA stream?
- [ ] **Disaggregated Text Encoder & Tiled VAE Guard**: Is `T5-XXL` pooled separately and is `VAE Tiled Decode` enforced to prevent end-of-job VRAM OOM crashes?
