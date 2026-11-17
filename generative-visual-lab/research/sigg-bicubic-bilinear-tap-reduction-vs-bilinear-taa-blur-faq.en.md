# Visual & Animation Architecture Selection FAQ: Sigg-Jiménez Hardware-Bilinear-Merged Bicubic Catmull-Rom Resampling vs 1-Tap Bilinear TAA Blur Collapse

> **One-Sentence Architectural Verdict**: In real-time Temporal Anti-Aliasing (TAA) history reprojection (Unreal Engine 5 `SampleHistoryCatmullRom`, Call of Duty, Frostbite, Unity HDRP) and high-sharpness post-processing pipelines, **never resample the recursive TAA history buffer with naive 1-tap hardware bilinear filtering, nor pay for 16 separate point-sampled texel fetches to evaluate a $4\times 4$ Bicubic Catmull-Rom kernel**! On our 58-solid, 17-station history microdensitometer bench inspecting a high-frequency texture crest (curvature $\kappa = 0.16$, peak $C(0.50) = 1.0000$) across 17 sub-texel stations ($u \in [0.00, 1.00]$) over $K = 8$ recursive TAA history frames, naive 1-tap bilinear resampling attenuates midpoint station 8 ($u = 0.50$) by $-4.00\%$ per frame—**collapsing the crest from `1.0000` down to `0.96^8 = 0.7214` (`-0.2786` / `27.86%` Vaseline blur loss across `15/17` interior sub-texel stations)**; whereas **Phillipp Sigg & Markus Hadwiger (GPU Gems 2, 2005) / Jorge Jiménez (SIGGRAPH 2016) hardware-bilinear weight merging ($W_{12}\cdot\text{lerp}(T_0, T_1, w_2/(w_1+w_2)) \equiv w_1 T_0 + w_2 T_1$)** preserves exact **`C_hist = 1.0000` across all 8 recursive frames (`0/17` blurred stations)** while running **3.69× faster** than 16-tap tensor-product bicubic evaluation (`2.76 ms` vs `10.19 ms` across 8,192 passes, agreement within `4.44e-15`).

![Sigg-Jiménez Hardware-Bilinear Bicubic Resampling vs 1-Tap Bilinear TAA Blur Summary](./evidence/bicubic-bilinear-tap-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why does enabling TAA with standard bilinear history lookup make brick walls, foliage, and fabric textures blur as if smeared with Vaseline the moment the camera pans slowly?**
   In plain English: **TAA feeds its resampled history buffer back into itself every frame, turning a small single-pass bilinear low-pass filter into an exponential multi-frame blur cascade**:
   - Consider a parabolic texture detail crest $f(x) = 1.0 - 0.16(x - 0.5)^2$ whose true peak at sub-texel midpoint $u = 0.50$ (station 8) is `1.0000`, flanked by integer texels $T_0 = T_1 = 0.9600$ and outer texels $T_{-1} = T_2 = 0.6400$.
   - A single 1-tap hardware bilinear lookup at $u = 0.50$ averages $T_0$ and $T_1$ into `0.9600` (losing $-4.00\%$ of peak contrast on Frame 1).
   - Over $K = 8$ consecutive frames of slow sub-texel camera motion (`0.13 seconds` at 60 Hz), recursive bilinear resampling erodes the crest to:
     $$C_{\text{bilinear}}^{(8)}(0.50) = 0.96^8 = \mathbf{0.7214}$$
     wiping out **`27.86%` (`-0.2786`) of the texture crest across `15/17` sub-texel stations**!
2. **First-Principles Fix: Merging Positive Catmull-Rom Weights into Shifted Hardware Bilinear Taps (Sigg & Hadwiger 2005 / Jiménez 2016)**:
   - Catmull-Rom cubic interpolation has quadratic polynomial reproduction: at $u = 0.50$, its weights $(-\frac{1}{16}, +\frac{9}{16}, +\frac{9}{16}, -\frac{1}{16})$ reconstruct the exact parabola crest $\frac{-0.64 + 8.64 + 8.64 - 0.64}{16} = \mathbf{1.0000}$ across any number of recursive frames!
   - Furthermore, because the central weights $w_1(u) > 0$ and $w_2(u) > 0$ are strictly positive for all $u \in [0, 1]$, they can be evaluated via **one hardware bilinear fetch** of combined weight $W_{12} = w_1 + w_2$ at shifted UV offset $s_{12} = \frac{w_2}{w_1 + w_2} \in [0, 1]$—reducing a 16-tap 2D bicubic filter down to **5 hardware bilinear taps** while locking **`C_hist = 1.0000` (`0/17` blurred stations)**!
3. **Interactive 3D Workbench & Measured Evidence**:
   - Standalone 3D Bench: `demos/bicubic-bilinear-tap-rig/` (58 Three.js solids: baseplate, 4 support feet, `1.0000` crest sharpness reference bar, 17 resampled crest columns, 17 Sigg-Jiménez bicubic reference spheres, 17 blur loss pegs, and the active microdensitometer carriage).
   - Measured 7-Card 4:5 Reports: `demos/bicubic-bilinear-tap-rig/test-report-cards.html` (EN) and `test-report-cards.zh.html` (ZH).

---

## ② 🎯 Soul-Searching Q&A for Architects & Clients

### Q1: Why can positive weights $(w_1, w_2)$ be merged into a single hardware bilinear fetch while negative lobes $(w_0, w_3)$ cannot be merged with positive lobes?
**Because GPU hardware bilinear interpolators clamp or require interpolation fractions $s \in [0, 1]$, which only holds when both weights have the same sign ($w_1 > 0, w_2 > 0 \implies 0 \le \frac{w_2}{w_1 + w_2} \le 1$)!**

### Q2: Why is Sigg-Hadwiger bilinear-merged evaluation 3.69× faster than 16-tap tensor-product bicubic evaluation?
**Because collapsing the $4\times 4$ 2D tensor loop into merged bilinear terms eliminates redundant weight multiplications and texture fetches!**
Across 8,192 17-station passes, Sigg bilinear-merged evaluation runs in **`2.76 ms`** versus **`10.19 ms`** for 16-tap tensor-product bicubic evaluation (**3.69× speedup**, with `4.44e-15` agreement).

### Q3: How does 5-Tap Bicubic Catmull-Rom history resampling interact with neural temporal upscalers?
**Both deterministic TAA/TSR and neural temporal upscalers use 5-tap Catmull-Rom history reprojection to warp previous-frame feature/color buffers without recursive bilinear softening.**

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence Flow)

### 3.1 TAA History Resampling Filter Selection Decision Tree
```mermaid
flowchart TD
    A["Resampling a texture or history buffer at sub-texel coordinates?"] --> B{"Is the buffer recursively fed back across multiple frames?"}
    B -- "Single-pass non-recursive bloom downsample" --> C["Standard hardware bilinear taps suffice"]
    B -- "Recursive multi-frame TAA history buffer reprojection" --> D{"Which resampling kernel is used?"}
    D -- "Naive 1-Tap Hardware Bilinear" --> E["❌ Recursive Vaseline blur: erodes u=0.50 crest to 0.7214 -27.86% after 8 frames"]
    D -- "Brute-force 16-tap 4×4 point-sampled bicubic" --> F["⚠️ Preserves sharpness but 16 texture fetches / 3.69× slower"]
    D -- "Sigg-Jimenez Hardware-Bilinear-Merged 5-Tap Bicubic" --> G["✅ Locks 8-frame crest at C_hist=1.0000 · 0 blur · 3.69× faster"]
```

### 3.2 1-Tap Bilinear Recursive Blur vs Sigg-Jiménez Bilinear-Merged Bicubic Pipeline
```mermaid
flowchart LR
    subgraph BilinearBlur["❌ Naive 1-Tap Bilinear History (27.86% 8-Frame Blur Collapse)"]
        B1["Parabolic crest C(0.50)=1.0000, flanking texels T0=T1=0.9600"] --> B2["Single bilinear pass averages T0 & T1 to 0.9600 (-4% peak loss)"]
        B2 --> B3["Compounds over K=8 recursive TAA frames: 0.96^8 = 0.7214!"]
        B3 --> B4["Loses -0.2786 peak contrast across 15/17 sub-texel stations!"]
    end
    subgraph SiggBicubic["✅ Sigg-Jiménez Bilinear-Merged Bicubic (1.0000 Sharp · 3.69× Faster)"]
        S1["Merge positive weights w1, w2 > 0 into W12 = w1 + w2 = 1.125"] --> S2["Shift hardware bilinear UV to s12 = w2 / (w1 + w2) = 0.5000"]
        S2 --> S3["Add outer negative lobes w0=w3=-0.0625 to restore exact 1.0000 crest"]
        S3 --> S4["Retains C_hist = 1.0000 across all 8 recursive frames (4.44e-15 error)"]
    end
```

### 3.3 Frame-Level History Microdensitometer Sequence Diagram
```mermaid
sequenceDiagram
    participant User as Architect / Playwright Harness
    participant Solver as model.ts Sigg Bicubic Kernel
    participant Stage as WebGL2 58-Solid 3D Microdensitometer Bench
    User->>Solver: Set curvature kappa=0.16, history frames K=8, inspect station i=8 (u=0.50)
    Solver->>Solver: Sigg merged bicubic resolves W12=1.125, s12=0.50 -> 8-frame C_hist = 1.0000
    Solver->>Solver: Compare against 1-tap bilinear -> C_bilinear = 0.96^8 = 0.7214 (-0.2786 blur loss)
    Solver-->>Stage: Emit 17-station shifted offsets, merged weights, radiances & blur losses
    Stage-->>User: Update 17 crest columns, 17 bicubic spheres, 17 blur pegs & carriage
```

---

## ④ 📊 Visual Technology Selection Decision Matrix

| Evaluation Dimension | ✅ Sigg-Jiménez Bilinear-Merged Bicubic | ⚠️ 16-Tap Point-Sampled Bicubic | ❌ Naive 1-Tap Hardware Bilinear | ⚠️ 4-Tap Cubic B-Spline |
| :--- | :--- | :--- | :--- | :--- |
| **8-Frame Crest at Station 8 ($u=0.50$)** | **Exact `1.0000` (100% sharpness)** | `1.0000` (`4.44e-15` diff) | **`0.7214` (`-27.86%` Vaseline blur!)** | `0.5132` (Heavily smoothed) |
| **Blur-Corrupted Sub-Texel Stations (of 17)** | **`0 / 17` (Zero contrast loss)** | `0 / 17` | **`15 / 17` (All non-integer offsets blurred)** | `17 / 17` |
| **2D Hardware Texture Fetches Required** | **`5` (Cross) or `9` (Full) bilinear taps** | `16` point-sampled taps | `1` bilinear tap (Blurs in motion) | `4` bilinear taps (Over-blurs) |
| **Quadratic Polynomial Reproduction** | **Exact (0th, 1st & 2nd order)** | Exact | 1st-order only | Smoothing only |
| **8,192-Pass 17-Station CPU Latency** | **`2.76 ms` (Fastest · 3.69× speedup)** | `10.19 ms` (3.69× slower) | `0.85 ms` (Severe motion blur) | `2.60 ms` |
| **Recommended Use Case** | **All TAA history & sharp LUT resampling** | Offline verification | **Never use in recursive history loops** | Soft shadow blurring only |

---

## ⑤ 🧪 New Interactive 3D Demo & 7-Card 4:5 Visual Report

### 5.1 Live Workbench & Report Links
- **Interactive 3D Workbench**: [`demos/bicubic-bilinear-tap-rig/index.html`](../demos/bicubic-bilinear-tap-rig/index.html)
- **7-Card 4:5 Visual Report (EN)**: [`demos/bicubic-bilinear-tap-rig/test-report-cards.html`](../demos/bicubic-bilinear-tap-rig/test-report-cards.html)
- **7-Card 4:5 Visual Report (ZH)**: [`demos/bicubic-bilinear-tap-rig/test-report-cards.zh.html`](../demos/bicubic-bilinear-tap-rig/test-report-cards.zh.html)
- **Sealed Telemetry JSON**: [`demos/bicubic-bilinear-tap-rig/report.json`](../demos/bicubic-bilinear-tap-rig/report.json)

### 5.2 Multi-Theme & Multi-Mode Playwright Visual Evidence

| Sigg-Jiménez Bicubic (Light · Retains Full `1.0000` Parabolic Crest at Station 8 across 8 Frames, `0` Blur) | Naive 1-Tap Bilinear (Light · Collapses to a `0.7214` Sunken Trough across 15 Interior Stations!) |
| :---: | :---: |
| ![Sigg Bicubic Light](./evidence/bicubic-bilinear-tap-rig/light-sigg-jimenez-bicubic-bilinear-taps.png) | ![Naive Bilinear Blur Light](./evidence/bicubic-bilinear-tap-rig/light-naive-1tap-bilinear-history.png) |

| Sigg-Jiménez Bicubic (Dark · 58 Three.js Solids) | Naive 1-Tap Bilinear (Dark · 15 Red Recursive Blur Loss Pegs Exposed) |
| :---: | :---: |
| ![Sigg Bicubic Dark](./evidence/bicubic-bilinear-tap-rig/dark-sigg-jimenez-bicubic-bilinear-taps.png) | ![Naive Bilinear Blur Dark](./evidence/bicubic-bilinear-tap-rig/dark-naive-1tap-bilinear-history.png) |

---

## ⑥ 🛠️ Rapid SA Delivery Verification Checklist

Before shipping a TAA history resampling pass to production, verify every item below:

- [ ] **Use 5-Tap Hardware-Bilinear-Merged Catmull-Rom**: Does the history reprojection shader combine the positive central $2\times 2$ weights into shifted bilinear lookups (`s12 = w2 / (w1 + w2)`) rather than using a single bilinear tap?
- [ ] **Half-Texel Center Alignment (`floor(uv * texSize - 0.5) + 0.5`)**: Are sub-texel fractions `u` computed relative to texel centers (`+0.5`) so repeated reprojection never drifts diagonally?
- [ ] **5-Tap Corner-Drop Weight Renormalization**: When omitting the 4 tiny corner taps $(w_0(u)w_0(v), \dots)$, is the 5-tap sum divided by `W_center + W_left + W_right + W_top + W_bottom` to guarantee exact constant-color preservation?
- [ ] **Pair with $3\times 3$ Variance / AABB Clamping**: Is the bicubic history sample clamped to the current frame's $3\times 3$ YCoCg neighborhood box (Round 48) to prevent negative-lobe ringing around bright HDR edges?
- [ ] **Static-Pixel Fast Path**: When motion vector length and jitter delta are zero, does the shader avoid unnecessary sub-texel resampling?
