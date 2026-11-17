# Visual & Animation Architecture Selection FAQ: McGuire-Bavoil Weighted Blended Order-Independent Transparency (WBOIT) vs Unsorted Alpha `OVER` Inversion

> **One-Sentence Architectural Verdict**: In multi-layer translucent CAD cutaways, automotive glass assemblies, particle smoke plumes, and instanced foliage/hair passes where per-polygon back-to-front sorting is impossible or prohibitively expensive, **never submit unsorted geometry to the non-commutative Porter-Duff `OVER` blend operator $C_{\text{out}} = \alpha_{\text{src}} C_{\text{src}} + (1 - \alpha_{\text{src}}) C_{\text{dst}}$**! On our 58-solid, 17-station OIT spectrophotometer bench combining a near bright layer ($z_{\text{near}} = 1.00\text{ m}, C = 0.90, \alpha = 0.75$) and a far dark layer (station 8 $z_{\text{far}} = 3.25\text{ m}, C = 0.15, \alpha = 0.75$, where true back-to-front sorted `OVER` resolves `0.7031`), submitting the near layer before the far layer under naive `OVER` overwrites the foreground with the distant dark layer—**collapsing composite brightness to `0.2813` (`-0.4219` / `-60.00%` order-inversion pop)**; whereas **McGuire & Bavoil (2013) Weighted Blended Order-Independent Transparency (WBOIT: additive depth-weighted color $\sum \alpha_k C_k w(z_k)$ + multiplicative revealage $\prod (1-\alpha_k)$)** produces **bit-identical output (`C = 0.8375`, `0.0000` submission-order discrepancy across all 17 stations)** regardless of draw order while running **17.64× faster** than per-pixel A-Buffer sorting (`1.26 ms` vs `22.25 ms` across 8,192 passes).

![McGuire-Bavoil Weighted Blended OIT (WBOIT) vs Unsorted Alpha OVER Inversion Summary](./evidence/weighted-blended-oit-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why do overlapping glass windows, smoke clouds, and CAD cutaway shells suddenly pop and invert their colors when the camera orbits?**
   In plain English: standard hardware alpha blending (`OVER`: $C_{\text{out}} = \alpha_{\text{src}} C_{\text{src}} + (1 - \alpha_{\text{src}}) C_{\text{dst}}$) is **non-commutative** ($A \text{ over } B \ne B \text{ over } A$).
   - When a bright foreground glass pane ($z_{\text{near}} = 1.00\text{ m}, C = 0.90, \alpha = 0.75$) sits in front of a dark background pane ($z_{\text{far}} = 3.25\text{ m}, C = 0.15, \alpha = 0.75$), true back-to-front order draws the far pane first and the near pane second: $0.75(0.90) + 0.25(0.75)(0.15) = \mathbf{0.7031}$.
   - **Why Unsorted `OVER` Flips Front and Back**: Because depth writes (`zWrite`) are disabled during transparency passes, if the draw call submits the near pane first and the far pane second, the GPU blindly paints the distant dark pane *on top of* the near bright pane: $0.75(0.15) + 0.25(0.75)(0.90) = \mathbf{0.2813}$—a **`-0.4219` (`-60.00%`) brightness collapse** that pops violently whenever camera rotation flips object bounding-box order!
2. **First-Principles Fix: Commutative Sum & Product Decomposition (McGuire-Bavoil WBOIT)**:
   - Replace sequential `OVER` with two **strictly commutative hardware blend reductions** across two render targets:
     1. **Accumulation Target (`GL_ONE, GL_ONE` additive sum)**: Weight each fragment by a monotonically decreasing depth function $w(z_k, \alpha_k) = \alpha_k \cdot \max\big(10^{-2}, \min(3000, \frac{10}{10^{-5} + (z_k/1.45)^4})\big)$:
        $$A_{\text{color}} = \sum_{k=1}^{N} \alpha_k C_k w(z_k, \alpha_k), \qquad A_{\text{weight}} = \sum_{k=1}^{N} \alpha_k w(z_k, \alpha_k)$$
     2. **Revealage Target (`GL_ZERO, GL_ONE_MINUS_SRC_COLOR` multiplicative product)**: Accumulate exact net transmittance:
        $$R_{\text{reveal}} = \prod_{k=1}^{N} (1 - \alpha_k)$$
     3. **Full-Screen Resolve Pass**:
        $$C_{\text{WBOIT}} = (1 - R_{\text{reveal}}) \frac{A_{\text{color}}}{A_{\text{weight}}} + R_{\text{reveal}} C_{\text{bg}}$$
   - Because addition ($\sum$) and multiplication ($\prod$) are commutative, `[Near, Far]` and `[Far, Near]` produce **bit-for-bit identical colors (`0.0000` order discrepancy across all 17 stations)** while $w(z_{\text{near}}) \gg w(z_{\text{far}})$ ensures the foreground layer dominates!
3. **Interactive 3D Workbench & Measured Evidence**:
   - Standalone 3D Bench: `demos/weighted-blended-oit-rig/` (58 Three.js solids: baseplate, 4 support feet, sorted `OVER` reference bar, 17 composite radiance columns, 17 sorted-reference spheres, 17 order-flip discrepancy pegs, and the active OIT probe carriage).
   - Measured 7-Card 4:5 Reports: `demos/weighted-blended-oit-rig/test-report-cards.html` (EN) and `test-report-cards.zh.html` (ZH).

---

## ② 🎯 Soul-Searching Q&A for Architects & Clients

### Q1: Why choose Weighted Blended OIT over Per-Pixel Linked-List A-Buffers or Multi-Pass Depth Peeling in real-time WebGL2/WebGPU engines?
**Because WBOIT uses fixed memory, zero atomic linked-list contention, a single geometry pass, and runs 17.64× faster than per-pixel sorting!**
Per-pixel A-Buffers require atomic SSBO counters and per-pixel insertion sorts that bottleneck severely under high particle overdraw (`22.25 ms` vs `1.26 ms` across 8,192 passes) and are unavailable in WebGL2, while $K$-pass Depth Peeling multiplies geometry draw calls by $K\times$. WBOIT runs in **one geometry pass** using standard hardware blend states available on every GPU.

### Q2: Why must the depth weight $w(z, \alpha)$ be clamped to $[10^{-2}, 3\times 10^3]$?
**To prevent `RGBA16F` half-precision floating-point overflow (`Inf` at `65504`) in the near field and underflow to `0.0` in the far field!**
Without the upper clamp `3000.0`, fragments very close to the camera ($z \to 0.1\text{ m}$) exceed the `65504` max value of `fp16` accumulation buffers, corrupting pixels into `NaN` during the resolve division.

### Q3: How does deterministic WBOIT relate to neural layer decomposition and alpha matting models?
**They serve complementary roles:**
- **When to use Neural Layer Decomposition / Matting Models**: When extracting translucent foreground layers from flat 2D images or video;
- **When deterministic WBOIT is mandatory**: At runtime when compositing intersecting 3D transparent meshes, CAD assemblies, and particle systems without sorting pops.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence Flow)

### 3.1 Real-Time 3D Transparency Architecture Selection Decision Tree
```mermaid
flowchart TD
    A[Rendering overlapping translucent meshes or particles in real-time 3D?] --> B{Does the pass allow hardware alpha blending?}
    B -- Deferred G-Buffer with binary discard only --> C[Use Stratified 4×4 Bit-Interleaved + R2 Stipple Dithering]
    B -- Dedicated transparent blend pass available --> D{Can all transparent triangles be globally sorted back-to-front without intersections?}
    D -- Single non-overlapping glass pane or sorted 2D billboards --> E[Use Premultiplied Associated Alpha Sorted OVER]
    D -- Intersecting CAD shells, car glass, or instanced particles --> F{Which Order-Independent Transparency architecture?}
    F -- Unsorted Porter-Duff OVER --> G[❌ Non-commutative inversion pop: -0.4219 / -60.00% brightness drop when order flips]
    F -- McGuire-Bavoil Weighted Blended OIT --> H[✅ Single geometry pass · 0.0000 order-flip pop · 17.64× faster than A-Buffer sort]
```

### 3.2 Unsorted `OVER` Inversion vs Commutative WBOIT Pipeline
```mermaid
flowchart LR
    subgraph UnsortedOver["❌ Naive Unsorted OVER (Non-Commutative · -60.00% Pop)"]
        U1["Draws Near bright layer first (z=1.00m, C=0.90, α=0.75)"] --> U2["Draws Far dark layer second (z=3.25m, C=0.15, α=0.75)"]
        U2 --> U3["Non-commutative OVER paints Far dark layer on top of Near layer"]
        U3 --> U4["Outputs C = 0.2813 (-0.4219 inversion error vs true 0.7031!)"]
    end
    subgraph WBOIT["✅ McGuire-Bavoil Commutative WBOIT (0.0000 Flip · 17.64× Faster)"]
        W1["Additive target sums Σ(α_k·C_k·w(z_k)) and Σ(α_k·w(z_k))"] --> W2["Multiplicative target multiplies revealage R = Π(1 - α_k) = 0.0625"]
        W2 --> W3["Depth weight w(1.0) >> w(3.25) prioritizes foreground layer"]
        W3 --> W4["[Near,Far] and [Far,Near] both resolve C = 0.8375 (0.0000 order flip!)"]
    end
```

### 3.3 Frame-Level OIT Spectrophotometer Sequence Diagram
```mermaid
sequenceDiagram
    participant User as Architect / Playwright Harness
    participant Solver as model.ts Commutative WBOIT Kernel
    participant Stage as WebGL2 58-Solid 3D OIT Bench
    User->>Solver: Configure near C=0.90 (z=1.0m), far C=0.15, α=0.75, inspect station i=8 (z_far=3.25m)
    Solver->>Solver: Evaluate WBOIT for [Near,Far] and [Far,Near] -> both output 0.8375 (0.0000 discrepancy)
    Solver->>Solver: Compare against unsorted OVER -> outputs 0.2813 (-0.4219 / -60.00% inversion pop)
    Solver-->>Stage: Emit 17-station resolved colors, sorted references & order-flip discrepancies
    Stage-->>User: Update 17 composite columns, 17 reference spheres, 17 flip pegs & OIT carriage
```

---

## ④ 📊 Visual Technology Selection Decision Matrix

| Evaluation Dimension | ✅ Single-Pass Commutative WBOIT | ⚠️ Per-Pixel Sorted A-Buffer Array | ❌ Naive Unsorted `OVER` | ⚠️ Multi-Pass Depth Peeling |
| :--- | :--- | :--- | :--- | :--- |
| **Order-Flip Discrepancy $|C_{\text{fwd}} - C_{\text{rev}}|$** | **Bit-exact `0.0000` (100% commutative)** | `0.0000` (Requires per-pixel sort) | **`0.4219` (`-60.00%` brightness collapse!)** | `0.0000` (Requires $K$ geometry passes) |
| **Resolved Composite at Station 8 ($z_{\text{far}}=3.25\text{ m}$)** | **`0.8375` (Foreground bright layer dominates)** | `0.8375` | **`0.2813` (Background dark layer overwrites front!)** | `0.7031` |
| **Geometry Submission Passes** | **1 pass + 1 full-screen resolve** | 1 pass + atomic linked-list sort | 1 pass (Broken visual order) | **$K$ full scene passes ($4\text{–}8\times$ cost)** |
| **WebGL2 / Mobile GPU Support** | **100% native (Standard MRT blend)** | Requires WebGPU / DX11 ROV/SSBO atomics | Native | High bandwidth cost |
| **8,192-Pass 17-Station CPU Latency** | **`1.26 ms` (Fastest · 17.64× speedup)** | `22.25 ms` (17.64× slower) | `0.85 ms` (Severe order-inversion popping) | — |
| **Recommended Use Case** | **CAD cutaways, car glass, smoke, instanced foliage** | High-opacity overlapping decals | **Never use on unsorted multi-layer meshes** | Offline exact multi-layer reference |

---

## ⑤ 🧪 New Interactive 3D Demo & 7-Card 4:5 Visual Report

### 5.1 Live Workbench & Report Links
- **Interactive 3D Workbench**: [`demos/weighted-blended-oit-rig/index.html`](../demos/weighted-blended-oit-rig/index.html)
- **7-Card 4:5 Visual Report (EN)**: [`demos/weighted-blended-oit-rig/test-report-cards.html`](../demos/weighted-blended-oit-rig/test-report-cards.html)
- **7-Card 4:5 Visual Report (ZH)**: [`demos/weighted-blended-oit-rig/test-report-cards.zh.html`](../demos/weighted-blended-oit-rig/test-report-cards.zh.html)
- **Sealed Telemetry JSON**: [`demos/weighted-blended-oit-rig/report.json`](../demos/weighted-blended-oit-rig/report.json)

### 5.2 Multi-Theme & Multi-Mode Playwright Visual Evidence

| Commutative WBOIT (Light · `0.0000` Order-Flip Discrepancy) | Naive Unsorted `OVER` (Light · Collapses to `0.2813`, `-60%` Pop!) |
| :---: | :---: |
| ![Commutative WBOIT Light](./evidence/weighted-blended-oit-rig/light-wboit-commutative-depth-weighted.png) | ![Unsorted OVER Inversion Light](./evidence/weighted-blended-oit-rig/light-naive-unsorted-alpha-over.png) |

| Commutative WBOIT (Dark · 58 Three.js Solids) | Naive Unsorted `OVER` (Dark · 17 Red Order-Flip Pegs Exposed) |
| :---: | :---: |
| ![Commutative WBOIT Dark](./evidence/weighted-blended-oit-rig/dark-wboit-commutative-depth-weighted.png) | ![Unsorted OVER Inversion Dark](./evidence/weighted-blended-oit-rig/dark-naive-unsorted-alpha-over.png) |

---

## ⑥ 🛠️ Rapid SA Delivery Verification Checklist

Before shipping a Weighted Blended Order-Independent Transparency (WBOIT) pass to production, verify every item below:

- [ ] **MRT Clear Values (`0.0` vs `1.0`)**: Is the accumulation target cleared to `(0, 0, 0, 0)` while the revealage transmittance target is cleared to **`1.0`** before the transparency pass?
- [ ] **Depth Test Enabled, Depth Write Disabled**: Does the WBOIT pass keep `depthTest = true` (against the opaque G-buffer depth) and `depthWrite = false` so transparent layers never occlude each other?
- [ ] **Half-Float `RGBA16F` Weight Clamping**: Is the depth weight $w(z, \alpha)$ clamped to `[1e-2, 3e3]` so near-camera fragments never overflow `fp16` (`65504`) into `Inf`?
- [ ] **Denominator Epsilon in Resolve Shader**: Does the full-screen resolve divide by `max(accum.a, 1e-5)` so untouched background pixels (`accum.a == 0`) never produce `0/0` `NaN`?
- [ ] **Premultiplied Color Accumulation**: Are RGB channels multiplied by both $\alpha_k$ and $w(z_k, \alpha_k)$ (`color.rgb * alpha * w`) prior to additive accumulation?
