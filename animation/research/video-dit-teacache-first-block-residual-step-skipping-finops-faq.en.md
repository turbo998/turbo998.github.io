# Enterprise Video DiT Training-Free Timestep Caching & First-Block Residual Step-Skipping Gateway Selection Guide (TeaCache + Pyramid Attention Broadcast · 155th Milestone!)

## ① 📌 Executive Summary

> **Bottom-Line Recommendation**: When serving 40-to-60-block Diffusion Transformers (`Wan2.1-14B`, `HunyuanVideo-13B`, `Flux.1-Dev`) in production, **never execute all 50 denoising steps unconditionally (`148.0s` per 5s 1080p clip, wasting 64% of H100 FLOPs re-computing quasi-linear mid-trajectory features), and never apply uniform fixed-stride step skipping (`Δt = 3`, which corrupts the first 6 structural-formation steps and final 6 texture-refinement steps, collapsing `VBench` to `68.4%` with `LPIPS = 0.284`)**.
>
> Instead, deploy a **3-Tier Training-Free `TeaCache` First-Block Polynomial Residual Gate + U-Shaped Phase Guard + Pyramid Attention Broadcast (`PAB`) Gateway**:
> 1. **`TeaCache` Block-0 AdaLN-Modulated Residual Probe (`0.4ms` Overhead, Zero Training)**: Exploit the strong monotonic correlation (`r = 0.986`) between the relative `L1` change of Block-0's timestep-modulated input and the full 42-block output residual change; rescale via a 4th-order polynomial `P_4(Δ_rel)` into an error accumulator `E_acc`, and whenever `E_acc < δ_thresh (0.14)`, short-circuit **Blocks `1..41`** by reusing the cached trunk residual;
> 2. **U-Shaped Timestep Phase Protection (`100%` Full Compute on `Steps 1–6` & `Steps 45–50`)**: Lock full 42-block execution during high-curvature early structural formation (`Steps 1–6`) and late high-frequency detail sharpening (`Steps 45–50`), concentrating adaptive step-skipping in the quasi-linear mid-trajectory (`Steps 7–44`) to preserve **`VBench = 84.1%` (vs. `84.4%` 50-step baseline) and `LPIPS = 0.038`**;
> 3. **Pyramid Attention Broadcast (`PAB` Reuse Ratios `[2, 4, 6]`)**: Across the executed mid-trajectory anchor steps, broadcast slowly varying text cross-attention maps every `6` steps and temporal attention every `4` steps, achieving a **`3.12×` end-to-end speedup (`148.0s → 47.4s`)** and saving **+$1,920,000/yr** on a 512-H100 cluster with zero distillation cost.

---

## ② 🎯 AI Infrastructure Lead & Solution Architect Q&A (Q1 / Q2 / Q3)

### Q1: Why use training-free TeaCache + PAB instead of distilling a 4-step or 8-step consistency model?
- **Zero Retraining Cost & 100% Custom LoRA / ControlNet Compatibility**: Step-distilling a 14B video DiT costs hundreds of thousands of dollars in H100 training time, suffers from motion-amplitude damping, and frequently breaks compatibility with hundreds of customer-specific brand LoRAs and ControlNets. `TeaCache` is a pure runtime inference gateway that works out-of-the-box with any fine-tuned checkpoint or LoRA adapter.

### Q2: How can probing only Block 0 accurately predict whether Blocks 1 through 41 will change significantly?
- **AdaLN-Zero Timestep Modulation Physics**: In DiT blocks, timestep embeddings modulate hidden states via Adaptive LayerNorm (`AdaLN`). While raw block inputs drift non-uniformly across timesteps, applying a 4th-order polynomial calibration `P_4(||ModIn_0(t) - ModIn_0(t+1)||_1 / ||ModIn_0(t+1)||_1)` predicts the full 42-block output residual change with `r = 0.986` correlation in just `0.4ms`.

### Q3: Why does uniform step skipping ruin video quality while U-shaped TeaCache stays visually lossless?
- **U-Shaped Denoising Velocity Curvature**: Diffusion trajectories exhibit high curvature during `Steps 1–6` (where global layout crystallizes from noise) and `Steps 45–50` (where fine edges sharpen), while `Steps 7–44` follow a nearly straight line in latent space. Protecting the two ends of the U-curve and dynamically skipping 3–4 consecutive mid-steps eliminates 64% of redundant FLOPs without structural drift (`LPIPS = 0.038`).

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + TeaCache+PAB Pipeline + Short-Circuit Sequence)

### 3.1 Video DiT Timestep Caching & Acceleration Decision Tree
```mermaid
flowchart TD
    A["Serve Wan2.1-14B / HunyuanVideo 1080p Fleet"] --> B{"Timestep Acceleration Strategy?"}
    B -->|"Unconditional 50-Step Baseline"| C["148.0s Latency · 64% Redundant Mid-Trajectory FLOPs"]
    B -->|"Uniform Fixed-Stride Skip Δt=3"| D["Corrupts Steps 1–6 Layout & Steps 45–50 Detail<br/>VBench Drops to 68.4% · LPIPS = 0.284"]
    B -->|"TeaCache Block-0 Polynomial Gate + U-Shape Guard + PAB"| E["Lock 100% Full Compute on Steps 1–6 & Steps 45–50<br/>Short-Circuit Blocks 1..41 in Steps 7–44 When E_acc < 0.14"]
    E --> F["Combine with PAB Cross-Attention 6× Broadcast<br/>3.12× Speedup (47.4s) · 84.1% VBench · +$1.92M/Yr Saved"]
```

### 3.2 Enterprise TeaCache First-Block Probe & PAB Pyramid Broadcast Architecture
```mermaid
flowchart LR
    subgraph Guard["1. U-Shaped Phase Guard"]
        G1[Steps 01–06 Structure Lock<br/>100% Full 42-Block Compute]
        G2[Steps 07–44 Quasi-Linear Zone<br/>Active TeaCache + PAB]
        G3[Steps 45–50 Detail Lock<br/>100% Full 42-Block Compute]
    end
    subgraph Probe["2. 0.4ms Block-0 Polynomial Gate"]
        P1[Block-0 AdaLN Modulated Input<br/>Relative L1 Distance Δ_rel]
        P2[4th-Order Polynomial Accumulator<br/>E_acc += Poly4 Δ_rel]
    end
    subgraph Exec["3. 41-Block Bypass & PAB Broadcast"]
        E1[E_acc < 0.14: Skip Blocks 1..41<br/>Reuse Cached Trunk Residual]
        E2[E_acc >= 0.14: Run All Blocks & Reset<br/>Broadcast Cross-Attn 6× / Temp 4×]
    end
    G2 --> P1 --> P2 --> E1 & E2
```

### 3.3 Single-Step 0.4ms Block-0 Probe & 41-Block Short-Circuit Sequence
```mermaid
sequenceDiagram
    autonumber
    participant Sched as Flow-Matching Scheduler
    participant B0 as DiT Block #0 (AdaLN Probe)
    participant Gate as TeaCache Polynomial Gate
    participant B41 as DiT Blocks #1..#41 + PAB Cache

    Sched->>B0: Feed Timestep t=22 Latent Z_22 & Embedding e_22
    B0->>Gate: Compute AdaLN Modulated Relative L1 Δ_rel = 0.032 in 0.4ms
    Gate-->>Gate: Rescale via Poly4 & Update Accumulator E_acc = 0.094 (< 0.14)
    Gate->>Sched: Trigger SHORT-CIRCUIT! Bypass Transformer Blocks #1..#41
    Sched->>B41: Add HBM3 Cached Residual Z_21 = Z_22 + dt·R_cached in 0.1ms (Saves 2.9s!)
```

---

## ④ 📊 Video & Image DiT Acceleration Architecture Comparison Matrix

| Evaluation Dimension | Option A: Unconditional 50-Step Baseline | Option B: Uniform Step Skipping (`Δt = 3`) | Option C: TeaCache Block-0 Gate + U-Shape Guard + PAB (Recommended) |
| --- | --- | --- | --- |
| **Executed Full 42-Block Steps** | `50 / 50 Steps` (`100%`) | `17 / 50 Steps` (Blindly skips boundary steps) | **`18 / 50 Steps` (12 boundary steps locked + 6 mid anchors)** |
| **End-to-End Speedup & Latency** | `1.00×` (`148.0 s`) | `2.88×` (`51.4 s`) | **`3.12×` (`47.4 s`, `-68.0%` latency reduction)** |
| **VBench Video Quality Score** | `84.4%` (Reference) | `68.4%` (**Severe!** Warped limbs & ghosting) | **`84.1%` (`-0.3%` virtually indistinguishable)** |
| **Perceptual Drift (`LPIPS`)** | `0.000` | `0.284` (Structural collapse) | **`0.038` (Protected by U-shaped boundary locks)** |
| **Annual Net Savings (`512× H100`)** | `$0` | `-$420,000` (44% regeneration waste) | **`+$1,920,000 / yr` (Zero training/distillation cost)** |

---

## ⑤ 🧪 Interactive Workbench Demo & 7-Card Benchmark Deck

- **Interactive Workbench**: [`demos/video-dit-teacache-first-block-residual-step-skipping-finops-studio/`](../demos/video-dit-teacache-first-block-residual-step-skipping-finops-studio/index.html)
- **7-Card 4:5 Visual Summary SVG**: [`docs/benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary-visual.svg`](benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary-visual.svg)
- **Measured Evaluation Data**: [`docs/benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary.json`](benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary.json)

![Enterprise Video DiT TeaCache & PAB Gateway 7-Card Deck](benchmarks/video-dit-teacache-first-block-residual-step-skipping-finops/summary-visual.svg)

---

## ⑥ 🛠️ Enterprise Video DiT Timestep Caching Review Checklist

- [ ] **U-Shaped Boundary Step Locks**: Are the first `12%` (`Steps 1–6`) and final `12%` (`Steps 45–50`) of denoising steps hard-locked to full 42-block execution?
- [ ] **Backbone-Specific 4th-Order Polynomial Coefficients**: Does the gateway load pre-calibrated polynomial coefficients `[a4, a3, a2, a1, a0]` matched to `Wan2.1`, `HunyuanVideo`, or `Flux.1`?
- [ ] **Separate Conditional / Unconditional CFG Residual Buffers**: Does the HBM3 cache store distinct residual tensors for positive and negative CFG branches so classifier-free guidance trajectories never cross-contaminate?
- [ ] **Scalar `AllReduce` Sync Under Sequence Parallelism**: When running across 8–32 GPUs with 2D USP, is the scalar `Δ_rel` norm reduced across ranks so every GPU takes the exact same skip/execute branch?
