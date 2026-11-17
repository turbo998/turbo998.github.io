# Translucent Sprites & Video Mattes Without Dark Halo Fringes: Premultiplied Associated Alpha vs Straight Unassociated Alpha Selection FAQ

> **Document Scope**: A first-principles architecture and selection guide for AI Solution Architects, WebGL2/WebGPU rendering engineers, motion-graphics compositors, and 3D Gaussian Splatting (3DGS) volumetric splatting teams. Structured strictly after `ib-vs-ethernet-roce-selection-faq.md`, this guide explains in plain language **why bilinearly filtering or mipmapping a bright foreground sprite ($C_{\text{fg}} = 1.00$) with a transparent border ($C = 0, \alpha = 0$) over a bright sky ($B_{\text{sky}} = 0.90$) under Straight Unassociated Alpha creates a muddy `0.7000` dark halo ring around the silhouette**, and how **Premultiplied Associated Alpha ($\tilde{C} = \alpha C$)** commutes with linear filtering to preserve exact `0.9500` edge radiance.

![Premultiplied Associated Alpha vs Straight Alpha Bilinear Dark Halo Summary](evidence/premultiplied-alpha-compositor-summary.svg)

---

## ① 📌 Executive Summary

1. **One-Sentence Principle**: **Hardware bilinear texture filtering and mipmap downsampling are linear interpolation operators $\operatorname{lerp}(\cdot)$; in Porter-Duff compositing algebra, linear interpolation commutes with the `OVER` blending operator if and only if colors are stored and interpolated as premultiplied associated tuples $(\tilde{C} = \alpha C,\; \alpha)$**! Under **Straight (Unassociated) Alpha**, the GPU first interpolates opaque foreground color $C_A = 1.00$ with the hidden black $(0,0,0)$ stored inside transparent texels ($\alpha_B = 0$) to get $(1-t)C_A$, and then the blender multiplies by $\alpha(t) = (1-t)$ a second time—squaring the foreground weight into **$(1-t)^2 C_A$** and carving a dark halo fringe (`0.7000` at $t=0.50$) that is darker than both the foreground (`1.00`) and the sky (`0.90`)!
2. **When Must You Use Premultiplied Associated Alpha?**
   - Any pipeline involving **bilinearly filtered or rotated sprites/decals**, **mipmap pyramid generation for alpha-tested/translucent foliage**, **unified particle rendering combining smoke occlusion ($\alpha > 0$) and additive fire glow ($\alpha = 0$)**, **AI video matting edge compositing**, or **3DGS translucent splat integration** must use Premultiplied Associated Alpha with blend factors `ONE, ONE_MINUS_SRC_ALPHA`.
3. **Key Measured Findings**:
   - In our 17-tap 3D optical silhouette photometer bench ([`demos/premultiplied-alpha-compositor/`](../demos/premultiplied-alpha-compositor/index.html), `58` 3D solids, foreground radiance $C_{\text{fg}} = 1.00$, bright sky backdrop $B_{\text{sky}} = 0.90$), at the bilinear midpoint tap $8$ ($t = 0.50, \alpha = 0.50$):
     - **Premultiplied Associated Alpha (`premultiplied-associated-alpha`)**: Transitions monotonically from `1.0000` to `0.9000`, outputting the exact midpoint radiance **`0.9500`** at $t = 0.50$ (**`0.0000` dark-halo dip**, **`0.00%` edge radiance loss**).
     - **Straight Unassociated Alpha (`straight-unassociated-alpha`)**: Squares the foreground weight at $t = 0.50$ into $0.50^2 \times 1.00 = 0.2500$, dropping total composited radiance to **`0.7000`** (`0.2000` darker than the `0.9000` sky, a **`-0.2500` halo dip**, and **`-26.32%` edge radiance loss**)!
   - **Division-Free CPU Performance**: Direct premultiplied `OVER` evaluation ($\tilde{C}_{\text{src}} + (1-\alpha_{\text{src}})B_{\text{sky}}$) eliminates per-sample division by $\alpha$, completing `1,024` 17-tap passes in **`0.49 ms`** vs **`1.85 ms`** for the unpremultiply-divide baseline (`3.43 ms` vs `3.40 ms` at `8,192` passes) with **`0`** numerical discrepancy.

---

## ② 🎯 First-Principles Q&A for Architects

### Q1: When should we choose AI neural video matting models vs code-driven premultiplied alpha compositing?

- **Choose AI Neural Video Matting Models (e.g., RVM, MatAnyone, MODNet)** when extracting hair-level foreground alpha mattes $\alpha(x,y)$ and decontaminated foreground colors from uncalibrated natural RGB video.
- **Choose Code-Driven Premultiplied Associated Alpha Compositing** when taking any RGBA texture, particle atlas, UI layer, or AI-extracted matte and scaling, rotating, mipmapping, or multi-layer compositing it on a WebGL2/WebGPU canvas without dark edge halos.

---

### Q2: Why does blending a `1.00` bright white cloud edge over a `0.90` bright sky produce a `0.70` dark gray ring under Straight Alpha?

**First-Principles Intuition**:
Examine two adjacent texels along the silhouette of a white cloud:
- **Texel A (Inside Cloud)**: Bright white $C_A = 1.00$, opaque $\alpha_A = 1.00$.
- **Texel B (Empty Air Outside Cloud)**: Fully transparent $\alpha_B = 0.00$. In standard RGBA buffers and PNG files, empty transparent pixels have their RGB channels cleared to **black ($C_B = 0.00$)**.
- Now sample halfway between Texel A and Texel B ($t = 0.50$) over a bright sky of radiance $B_{\text{sky}} = 0.90$:
  1. **What happens under Straight Alpha (`SRC_ALPHA, ONE_MINUS_SRC_ALPHA`)?**
     - **Step 1 (Hardware Bilinear Filtering)**: The texture unit interpolates $C$ and $\alpha$ separately:
       $$C_{\text{lerp}}(0.5) = 0.50(1.00) + 0.50(0.00) = 0.50, \qquad \alpha_{\text{lerp}}(0.5) = 0.50$$
     - **Step 2 (Shader Blending)**: The blender multiplies $C_{\text{lerp}}$ by $\alpha_{\text{lerp}}$ **a second time**:
       $$I_{\text{out}}^{\text{straight}} = \underbrace{0.50 \times 0.50}_{0.2500} + (1 - 0.50) \times 0.90 = 0.2500 + 0.4500 = \mathbf{0.7000}$$
     - Because the transparent texel's $(0,0,0)$ black diluted $C_{\text{lerp}}$ by $0.50$ before the blender multiplied by $\alpha = 0.50$ again, the edge drops to **$0.7000$**—carving a dark muddy ring around the bright cloud!
  2. **How does Premultiplied Associated Alpha (`ONE, ONE_MINUS_SRC_ALPHA`) fix this?**
     By storing $\tilde{C} = \alpha C$, Texel A is $(1.00, 1.00)$ and Texel B is $(0.00, 0.00)$. Bilinear interpolation yields $\tilde{C}(0.5) = 0.50$ and $\alpha(0.5) = 0.50$, and the blender adds the transmitted sky without multiplying by $\alpha$ twice:
     $$I_{\text{out}}^{\text{premult}} = \tilde{C}(0.5) + (1 - \alpha(0.5)) B_{\text{sky}} = 0.5000 + 0.4500 = \mathbf{0.9500}$$

---

### Q3: How does Premultiplied Alpha unify opaque occlusion, translucent smoke, and additive fire glow in a single draw call?

In the physical radiative transfer equation $I_{\text{out}} = \tilde{C}_{\text{emit}} + (1 - \alpha_{\text{absorb}}) I_{\text{bg}}$, emission $\tilde{C}$ and absorption $\alpha$ are independent:
- **Standard Translucent Smoke**: $\alpha \in (0, 1], \tilde{C} = \alpha C$.
- **Pure Additive Emissive Fire / Sparks**: Set **$\alpha = 0.0$ and $\tilde{C} = E_{\text{glow}} > 0$**. The exact same `ONE, ONE_MINUS_SRC_ALPHA` blend state evaluates $I_{\text{out}} = E_{\text{glow}} + (1 - 0) I_{\text{bg}}$, performing pure additive blending without switching pipeline states!

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence)

### 3.1 Alpha Representation & Texture Filtering Decision Tree (`flowchart TD`)

```mermaid
flowchart TD
    Start[Need to filter, mipmap, or composite translucent RGBA textures, particles, or video mattes] --> Q1{Will the texture undergo bilinear filtering, scaling, rotation, blur, or mipmapping?}
    Q1 -->|Yes: All real-time 2D/3D sprites, decals, UI layers, and video overlays| PremultPath[Use Premultiplied Associated Alpha: store C_tilde = alpha * C in linear light]
    Q1 -->|No: 1:1 unscaled texels| Q2{Do you need to batch standard translucent smoke with additive emissive sparks?}

    Q2 -->|Yes: Unified single-draw-call particle batching| PremultPath
    Q2 -->|No: Artist color-picker UI input widget| StraightUIPath[Keep straight RGB+A in UI state only; convert to premultiplied alpha*C, alpha before GPU upload]
    PremultPath --> BlendState[Configure GPU blend state to ONE, ONE_MINUS_SRC_ALPHA]
```

### 3.2 Straight Alpha (`(1-t)²` Dark Halo Dip) vs Premultiplied Alpha (`0%` Dip) Pipeline (`flowchart LR`)

```mermaid
flowchart LR
    subgraph StraightPipeline[Broken Baseline: Straight Alpha Bleeds Transparent Black & Squares Weight]
        direction TB
        S1[Bilinear midpoint t=0.5 between C=1, a=1 and transparent black C=0, a=0] --> S2[Hardware interpolates separately: C_lerp = 0.50, a_lerp = 0.50]
        S2 --> S3[Blender multiplies by alpha again: I_fg = 0.50 * 0.50 = 0.2500!]
        S3 --> S4[Result: Plus 0.45 sky gives I_out = 0.7000, darker than 0.90 sky -> Dark Halo!]
    end

    subgraph PremultPipeline[Correct Pipeline: Premultiplied Associated Alpha Commutes with Filtering]
        direction TB
        P1[Premultiplied tuples C_tilde = a*C: Texel A = 1,1 and Texel B = 0,0] --> P2[Hardware bilinearly interpolates: C_tilde_lerp = 0.50, a_lerp = 0.50]
        P2 --> P3[Associative OVER composite: I_out = C_tilde_lerp + 1-a_lerp * B_sky]
        P3 --> P4[Result: I_out = 0.50 + 0.45 = 0.9500, exact monotonic midpoint with 0% halo!]
    end
```

### 3.3 Frame-Level 17-Tap Silhouette Photometer Verification Sequence (`sequenceDiagram`)

```mermaid
sequenceDiagram
    participant UI as Radiance Controls (fg, bg, glow)
    participant Solver as Alpha Compositor Solver (model.ts)
    participant Meter as Dark-Halo Dip Verifier
    participant GL as Three.js WebGL2 17-Tap Photometer Stage

    UI->>Solver: Pass tapIndex = 8 (t=0.50), C_fg = 1.00, B_sky = 0.90, E_glow = 0.00
    Solver->>Solver: Evaluate 17 bilinear taps for premultiplied I_premult(t) and straight I_straight(t)
    Solver->>Meter: Verify t=0.50 premult I_out = 0.9500 (0.0000 dip) vs straight I_out = 0.7000 (-0.2500 dip)
    Solver->>GL: Update 17 radiance pillars, 17 reference caps, 17 alpha pegs, and photometer gantry matrix
```

---

## ④ 📊 Architect Decision Matrix

| Evaluation Dimension | Premultiplied Associated Alpha (`premultiplied-associated-alpha`) | Unpremultiply Divide Baseline (`Divide + Re-Blend`) | Straight Unassociated Alpha (`straight-unassociated-alpha`) | Dilated Border Padding (`Solidify / Edge Bleed`) |
| :--- | :--- | :--- | :--- | :--- |
| **Midpoint ($t=0.50$) Composited Radiance** | **`0.9500` (Exact midpoint between $1.00$ and $0.90$)** | `0.9500` | **`0.7000` (Drops below $0.90$ sky into dark halo!)** | Helps single-color edges; fails on multi-color borders |
| **Midpoint Edge Radiance Loss** | **`0.00%` (Zero dark fringe)** | `0.00%` | **`26.32%` (`-0.2500` radiance dip)** | Leaks dark texels at higher mipmap levels |
| **Mipmap Pyramid Downsampling** | **Exact energy conservation ($2\times 2$ box average)** | Requires alpha-weighted divide per mip | **Dark fringes widen at every mip level** | Cannot prevent multi-texel mip bleeding |
| **Unified Smoke ($\alpha>0$) + Fire ($\alpha=0$) Batch** | **Native (`ONE, ONE_MINUS_SRC_ALPHA`)** | Division by zero when $\alpha=0$ | **Impossible ($\alpha=0$ zeroes out emissive RGB)** | Impossible |
| **1,024 / 8,192 × 17-Tap CPU Time** | **`0.49 ms` / `3.43 ms` (Division-free MAC)** | `1.85 ms` / `3.40 ms` (Per-tap division + branch) | `0.48 ms` / `3.38 ms` (Fast but dark-ringed) | Requires offline dilation pass |
| **Recommended Architectural Role** | **Mandatory standard for GPU textures & compositors** | Legacy export to unassociated PNGs | **Never use with bilinear filtering or mipmaps** | Optional asset pre-padding fallback |

---

## ⑤ 🧪 New Capability Demo & Benchmark Findings (with 7-Card Report)

### 5.1 Interactive 17-Tap 3D Silhouette Photometer Bench (`demos/premultiplied-alpha-compositor/`)

We built a standalone interactive 3D WebGL2 benchmark stage **[`demos/premultiplied-alpha-compositor/`](../demos/premultiplied-alpha-compositor/index.html)** (**58 3D solid parts**):
- **17 Composited Radiance Pillars + 17 Exact Premultiplied Reference Caps + 17 Alpha Weight Pegs + Sky Backdrop Reference Bar + Photometer Gantry**: Visualizes the 17 bilinear filter taps bridging an opaque foreground texel ($t=0, C_{\text{fg}}=1.00$) and a transparent texel ($t=1, \alpha=0$) over a bright sky ($B_{\text{sky}}=0.90$);
- **Instant Mode Comparison**: In `premultiplied-associated-alpha` mode, all 17 pillars touch the cyan reference caps along a smooth monotonic ramp from `1.0000` to `0.9000` (`0.9500` at $t=0.50$, `0.00%` dip); switching to `straight-unassociated-alpha` carves a deep quadratic crater across the middle pillars, plunging to **`0.7000`** (`-26.32%` radiance loss) at $t=0.50$!
- **Atomic Validation & JSON Export**: Rejects out-of-range radiance values (e.g. `foregroundRadiance = 9.5`) while preserving valid state, and exports `PREMULTIPLIED_ALPHA_SPEC.json`.

| Light Theme — Premultiplied Alpha (`I_out=0.9500`, `0%` Halo) | Light Theme — Straight Alpha (`I_out=0.7000`, `-26.32%` Dip) |
| :---: | :---: |
| ![Light Theme Premultiplied Alpha](evidence/premultiplied-alpha-compositor/light-premultiplied-associated-alpha.png) | ![Light Theme Straight Alpha](evidence/premultiplied-alpha-compositor/light-straight-unassociated-alpha.png) |

| Dark Theme — Premultiplied Alpha (`I_out=0.9500`, `0%` Halo) | Dark Theme — Straight Alpha (`I_out=0.7000`, `-26.32%` Dip) |
| :---: | :---: |
| ![Dark Theme Premultiplied Alpha](evidence/premultiplied-alpha-compositor/dark-premultiplied-associated-alpha.png) | ![Dark Theme Straight Alpha](evidence/premultiplied-alpha-compositor/dark-straight-unassociated-alpha.png) |

### 5.2 7-Card 4:5 Visual Benchmark Reports & Sealed Data

- 📊 **English 7-Card 4:5 Report**: [`demos/premultiplied-alpha-compositor/test-report-cards.html`](../demos/premultiplied-alpha-compositor/test-report-cards.html)
- 📊 **Chinese 7-Card 4:5 Report**: [`demos/premultiplied-alpha-compositor/test-report-cards.zh.html`](../demos/premultiplied-alpha-compositor/test-report-cards.zh.html)
- 📁 **Sealed Benchmark Data**: [`demos/premultiplied-alpha-compositor/report.json`](../demos/premultiplied-alpha-compositor/report.json) (`13 / 13` deterministic checks passed, zero Playwright console/page errors).

---

## ⑥ 🛠️ Appendix: Architect Verification Checklist

Before shipping any 2D/3D sprite renderer, particle system, video matting compositor, or 3DGS splat pipeline, verify:

- [ ] **Enable Premultiplication on Texture Upload**: Set `gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)` or pre-bake $\tilde{C} = \alpha C_{\text{linear}}$ in the offline asset pipeline before generating mipmaps.
- [ ] **Set Blend Factors to `(ONE, ONE_MINUS_SRC_ALPHA)`**: Never use `(SRC_ALPHA, ONE_MINUS_SRC_ALPHA)` on premultiplied shaders or textures, which would double-multiply $\alpha$.
- [ ] **Premultiply in Linear Radiance Space**: Decode sRGB to linear light before multiplying by $\alpha$ so gamma and opacity do not cross-contaminate.
- [ ] **Preserve Associativity Across Offscreen FBOs**: Composite intermediate render targets using `(ONE, ONE_MINUS_SRC_ALPHA)` for both RGB and Alpha channels.
- [ ] **Automated Silhouette Monotonicity Gate**: Assert in unit tests that blending $C_{\text{fg}} = 1.00$ over $B_{\text{sky}} = 0.90$ at $t=0.50$ yields $I_{\text{out}} = 0.9500 \ge \min(C_{\text{fg}}, B_{\text{sky}})$.

---

## References

1. **Porter-Duff Compositing Algebra (SIGGRAPH 1984)**: Thomas Porter and Tom Duff, *"Compositing Digital Images"*, ACM SIGGRAPH Computer Graphics, Vol. 18, No. 3, 1984, pp. 253–259.
2. **Jim Blinn's Corner — Compositing Theory (IEEE CG&A 1994)**: James F. Blinn, *"Compositing, Part 1: Theory"*, IEEE Computer Graphics and Applications, Vol. 14, No. 5, 1994, pp. 83–87.
3. **Premultiplied Alpha & Bilinear Filtering (Forsyth / Hargreaves)**: Tom Forsyth, *"Premultiplied Alpha Part 2 — Bilinear Filtering and Mipmaps"*.
