# Organic SDF Booleans Without Normal Creases: C¹ Quadratic Polynomial Smooth-Min vs Hard min(dA, dB) FAQ

> **Document Scope**: A practical architecture decision guide and first-principles Signed Distance Field (SDF) Constructive Solid Geometry (CSG) reference for AI Solution Architects, WebGL2/WebGPU raymarching engineers, procedural modelers, and technical artists. Modeled after `ib-vs-ethernet-roce-selection-faq.md`, this guide explains in plain English **why combining two implicit primitives with a hard `min(d_A, d_B)` creates a razor-sharp `90.13°` surface normal crease along the seam**, and how **bounded-support $C^1$ quadratic polynomial smooth-min (`smin`) + closed-form analytical gradient blending** achieves `0.09°` seam continuity, `0.000000 u` far-field bloat, and a `3.74x` CPU speedup over finite differences.

![C1 Quadratic Polynomial smin vs Hard Boolean Union Summary](evidence/smooth-sdf-union-summary.svg)

---

## ① 📌 Executive Summary

1. **The Core Insight in One Sentence**: **In a Signed Distance Field (SDF), the surface normal is the spatial gradient $\mathbf{n}(\mathbf{x}) = \nabla d(\mathbf{x})$; because the standard union operator $d = \min(d_A, d_B)$ is only $C^0$ continuous, its gradient snaps instantaneously from $\nabla d_A$ to $\nabla d_B$ across the medial locus $d_A = d_B$, creating a sharp specular crease**. Replacing `min` with a **bounded-support $C^1$ quadratic polynomial smooth minimum (`smin-quadratic`)** subtracts a localized fillet term $\frac{k}{4}h^2$ only inside the transition band $|d_A - d_B| < k$, guaranteeing continuous surface normals across the seam while preserving **`0.000000 u` far-field boundary bloat** outside the band.
2. **When Is $C^1$ Quadratic Polynomial `smin` Mandatory?**
   - Whenever blending organic shapes, fluid droplets (metaballs), character limb joints, or procedural clay primitives in real-time SDF raymarching or neural implicit CSG pipelines (see Marschner et al., SIGGRAPH Asia 2023 and Schirmer et al., `arXiv:2511.07206`, Nov 2025) where specular lighting must flow smoothly across joints without bloating distant geometry.
3. **Key Measured Findings**:
   - In our standalone 25-Rib 3D Implicit Surface Normal Bench ([`demos/smooth-sdf-union/`](../demos/smooth-sdf-union/index.html), `57` 3D solids, half-separation $s = 0.85\text{ u}$, sphere radius $R = 1.20\text{ u}$, blend radius $k = 0.50\text{ u}$):
     - **$C^1$ Quadratic Polynomial Smooth-Min (`smin-quadratic`)**: Lifts the $x = 0$ medial neck fillet by **`+0.1694 u`**, reduces the normal angle change across $x = -0.0005 \to +0.0005\text{ u}$ to **`0.09°`**, and maintains **`0.000000 u` far-field bloat** at the outer poles $x = \pm(s + R)$.
     - **Hard Boolean Union (`hard-min`)**: Produces `0.0000 u` fillet lift and a **`90.13°` normal crease jump** across $x = 0$, tearing specular highlights along the joint.
   - **Analytical Gradient CPU Latency**: Blending primitive normals analytically via $(1-w)\nabla d_A + w\nabla d_B$ agrees with 4-tap central finite differences within **`4.21e-11`** while completing `8,192` 25-rib passes in **`35.49 ms`** vs **`132.64 ms`** (**`3.74x` faster**).

---

## ② 🎯 Architect & Customer First-Principles Q&A

### Q1: Why does `min(d_A, d_B)` connect two shapes in position, yet still show a harsh crease line under lighting?

**First-Principles Explanation**:
Our eyes judge whether a surface is smooth not by its position, but by **how light reflects off its surface normal $\mathbf{n}(\mathbf{x}) = \nabla d(\mathbf{x})$**.
- When you unite Left Sphere $A$ and Right Sphere $B$ using $d(\mathbf{x}) = \min(d_A(\mathbf{x}), d_B(\mathbf{x}))$:
  - Just `0.0005 u` to the left of the center plane ($d_A < d_B$), `min` picks Sphere $A$ exclusively, so the normal points **up and right** $(+0.71, +0.71, 0)$.
  - Just `0.0005 u` to the right of the center plane ($d_B < d_A$), `min` switches allegiance 100% to Sphere $B$, so the normal points **up and left** $(-0.71, +0.71, 0)$.
  - Across a zero-width seam, the surface normal snaps by **`90.13°`**! Under physically based rendering (PBR), adjacent pixels sample environment-map reflections $90^\circ$ apart, producing an unmistakable razor-sharp crease.

---

### Q2: How do Quadratic Polynomial `smin`, Exponential `Log-Sum-Exp smin`, and Neural SDF CSG compare?

| Dimension | 1. $C^1$ Quadratic Polynomial `smin` (`smin-quadratic`, Quilez) | 2. Exponential Smooth-Min (`Log-Sum-Exp smin`) | 3. Neural SDF CSG Regularization (Marschner et al., SIGGRAPH Asia 2023) |
| :--- | :--- | :--- | :--- |
| **Mathematical Form** | $h = \frac{\max(k - |a-b|, 0)}{k},\; \min(a,b) - \frac{k}{4}h^2$ | $-\frac{1}{\alpha}\ln\!\left(e^{-\alpha a} + e^{-\alpha b}\right)$ | Closest-point loss regularizing an MLP to remain an exact Eikonal SDF after CSG |
| **Bounded Support (Zero Bloat)** | **Exact bounded support**: for $|a - b| \ge k$, $h = 0$ (**`0.000000 u` distant bloat**) | **Unbounded global bloat**: exponential tails never reach 0, inflating distant shapes | Preserves unit gradient $\|\nabla f\| = 1$ everywhere for exact offset surfaces |
| **Arithmetic Cost & Stability** | **1 `max`, 1 subtract, 1 square**; zero overflow risk | Requires `exp` + `log`; prone to floating-point underflow/overflow | Requires neural network optimization |
| **Best Engineering Fit** | **All real-time WebGL2/WebGPU SDF raymarching, metaballs & character joints** | Analytic $C^\infty$ optimization problems only | **Offline neural CAD & exact constant-radius mitered/filleted offsets** |

---

### Q3: How does the $C^1$ quadratic polynomial `smin` and its analytical gradient work under the hood?

Implemented in `demos/smooth-sdf-union/model.ts`:

1. **Bounded-Support Quadratic Distance Blend**:
   For signed distances $a = d_A(\mathbf{x})$, $b = d_B(\mathbf{x})$ and blend radius $k > 0$:
   $$h = \frac{\max\bigl(k - |a - b|,\; 0\bigr)}{k} \in [0, 1], \qquad \operatorname{smin}(a, b, k) = \min(a, b) - \frac{k}{4} h^2$$
2. **Closed-Form Analytical Gradient Weight**:
   Differentiating with respect to $\mathbf{x}$ yields the exact linear interpolation weight $w \in [0, 1]$:
   $$w = \operatorname{clamp}\!\left(\frac{1}{2} + \frac{a - b}{2k},\; 0,\; 1\right), \qquad \nabla \operatorname{smin}(a, b, k) = (1 - w)\nabla d_A(\mathbf{x}) + w\,\nabla d_B(\mathbf{x})$$
   At the medial seam $a = b$, $w = 0.5$, so the horizontal components of $\nabla d_A$ and $\nabla d_B$ cancel out and the normal points straight up $(0, 1, 0)$ with $C^1$ continuity—eliminating 4-tap or 6-tap finite-difference evaluations (**`3.74x` speedup**).

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence Flow)

### 3.1 Implicit Boolean Operator Selection Decision Tree (`flowchart TD`)

```mermaid
flowchart TD
    Start[Need to combine two 3D signed distance primitives d_A and d_B] --> Q1{Should the intersection seam be a sharp crease or an organic fillet?}
    Q1 -->|Sharp mechanical crease: bricks / hard-surface cuts| HardMin[Use standard hard boolean min d_A, d_B]
    Q1 -->|Smooth organic fillet: droplets / limbs / clay sculpting| Q2{Must primitives outside the blend radius k keep exact dimensions?}

    Q2 -->|Yes: real-time rendering with zero distant bloat| PolySmin[Use Bounded-Support C1 Quadratic Polynomial smin + Analytical Gradient]
    Q2 -->|Need G2 curvature continuity for Class-A reflections| CubicSmin[Use C2 Cubic Polynomial smin]
```

### 3.2 Hard Boolean `min(d_A, d_B)` vs $C^1$ Quadratic Polynomial `smin` Pipeline (`flowchart LR`)

```mermaid
flowchart LR
    subgraph HardPipeline[Naive Baseline: Hard min d_A, d_B Causes 90° Normal Crease]
        direction TB
        H1[Evaluate sphere distances d_A and d_B, take d = min d_A, d_B] --> H2[Gradient jumps instantaneously from ∇d_A to ∇d_B at x = 0]
        H2 --> H3[Surface normal snaps by 90.13° across seam with 0 fillet lift]
        H3 --> H4[Result: Specular highlight tears along a sharp V-shaped crease!]
    end

    subgraph SminPipeline[Production Pipeline: C1 Quadratic Polynomial smin + Analytical Normal]
        direction TB
        S1[Compute bounded support h = max k - abs a-b, 0 / k] --> S2[Subtract quadratic fillet k * h^2 / 4, lifting neck by +0.1694 u]
        S2 --> S3[Blend normals analytically via w = clamp 0.5 + a-b / 2k]
        S3 --> S4[Result: 0.09° seam continuity, 0.000000 u far bloat, 3.74x faster than FD!]
    end
```

### 3.3 Frame-Level Iso-Surface Root-Finding & Normal Needle Sequence (`sequenceDiagram`)

```mermaid
sequenceDiagram
    participant UI as Separation Scrubber / Clock
    participant Solver as SDF Union Solver (model.ts)
    participant Grad as Analytical Gradient Blender
    participant GL as Three.js WebGL2 3D Optical Bench

    UI->>Solver: Pass halfSep s = 0.85 u, blendRadius k = 0.50 u, mode = smin-quadratic
    loop 25 Cross-Section Ribs (x in [-maxSpan, +maxSpan])
        Solver->>Solver: Bisect zero-isosurface height y(x) where smin(d_A, d_B, k) = 0
        Solver->>Grad: Compute derivative weight w = clamp(0.5 + (d_A - d_B)/(2k), 0, 1)
        Grad-->>Solver: Return unit normal n = normalize((1-w)∇d_A + w∇d_B)
    end
    Solver->>GL: Scale 25 profile rib pillars, orient 25 normal needles, and report 0.09° seam jump
```

---

## ④ 📊 Architect Decision Matrix

| Evaluation Dimension | $C^1$ Quadratic `smin` (`smin-quadratic` Analytical) | 4-Tap Central Finite Diff (`4-Tap FD` Baseline) | Hard Boolean Union (`hard-min`) | Exponential Smooth-Min (`Log-Sum-Exp`) |
| :--- | :--- | :--- | :--- | :--- |
| **Medial Seam ($x=0$) Normal Jump** | **`0.09°` ($C^1$ smooth continuity)** | `0.09°` (within `4.21e-11`) | **`90.13°` (sharp crease tear)** | `0.09°` |
| **Medial Neck Fillet Lift $\Delta y(0)$** | **`+0.1694 u` (smooth organic bridge)** | `+0.1694 u` | `0.0000 u` (sharp valley) | Depends on $\alpha$ |
| **Far-Field Boundary Bloat Error** | **`0.000000 u` (exact bounded support)** | `0.000000 u` | `0.000000 u` | **`> 0.015 u` (global bloat)** |
| **SDF Evaluations per Normal** | **`1` pass (closed-form weight $w$)** | `4` (2D) or `6` (3D) passes | `1` pass | Requires `exp` and `log` |
| **CPU Latency for 8,192 25-Rib Passes** | **`35.49 ms` (median of 7 runs)** | `132.64 ms` (`3.74x` slower) | `24.10 ms` (broken seam lighting) | `~95 ms` |
| **Recommended Engineering Role** | **Default for organic SDF modeling & joint fillets** | Black-box SDFs without analytic derivatives | Hard-surface mechanical cuts only | Avoid in real-time shaders |

---

## ⑤ 🧪 Capability Showcase Demo & Benchmark Findings (with 7-Card Report)

### 5.1 Interactive 25-Rib 3D Implicit Surface Normal Bench (`demos/smooth-sdf-union/`)

We built a standalone interactive 3D WebGL2 implicit surface bench at **[`demos/smooth-sdf-union/`](../demos/smooth-sdf-union/index.html)** (**57 3D solid parts**):
- **25 Zero-Isosurface Profile Ribs**: Tracks the exact $d(x, y) = 0$ cross-section and highlights ribs inside the active $|d_A - d_B| < k$ fillet zone.
- **25 Analytical Surface Normal Needles**: Shows the exact unit normal $\mathbf{n}(x)$ at every rib. In `smin-quadratic` mode, the needles fan smoothly across the bridge (`0.09°` seam step, `+0.1694 u` fillet lift); switching to `hard-min` collapses the bridge and snaps the center needles by **`90.13°`**.
- **Atomic Config Validation & Export**: Rejects invalid blend radii (`blendRadius = 2.2`) while preserving valid state, and exports `SMOOTH_SDF_UNION_SPEC.json`.

| Light Theme — $C^1$ Quadratic `smin` (`0.09°` Smooth Seam) | Light Theme — Hard Boolean `min` (`90.13°` Normal Crease) |
| :---: | :---: |
| ![Light Theme Quadratic smin](evidence/smooth-sdf-union/light-smin-quadratic.png) | ![Light Theme Hard min](evidence/smooth-sdf-union/light-hard-min.png) |

| Dark Theme — $C^1$ Quadratic `smin` (`0.09°` Smooth Seam) | Dark Theme — Hard Boolean `min` (`90.13°` Normal Crease) |
| :---: | :---: |
| ![Dark Theme Quadratic smin](evidence/smooth-sdf-union/dark-smin-quadratic.png) | ![Dark Theme Hard min](evidence/smooth-sdf-union/dark-hard-min.png) |

### 5.2 7-Card 4:5 Visual Benchmark Reports & Sealed Data

- 📊 **English 7-Card 4:5 Visual Report**: [`demos/smooth-sdf-union/test-report-cards.html`](../demos/smooth-sdf-union/test-report-cards.html)
- 📊 **Chinese 7-Card 4:5 Visual Report**: [`demos/smooth-sdf-union/test-report-cards.zh.html`](../demos/smooth-sdf-union/test-report-cards.zh.html)
- 📁 **Sealed Benchmark Data**: [`demos/smooth-sdf-union/report.json`](../demos/smooth-sdf-union/report.json) (`13 / 13` deterministic checks passed, zero console/page errors).

---

## ⑥ 🛠️ Appendix: Architect Quick-Verification Checklist

- [ ] **Bounded-Support Zero-Bloat Test**: Verify that for $|d_A - d_B| \ge k$, `smin(d_A, d_B, k)` equals `min(d_A, d_B)` to machine precision (`0.000000 u` distant bloat)?
- [ ] **Analytical Normal Blending**: Reuse $w = \operatorname{clamp}(0.5 + (d_A - d_B)/(2k), 0, 1)$ to blend primitive gradients $(1-w)\nabla d_A + w\nabla d_B$ instead of running finite-difference stencils?
- [ ] **Material & Color Synchronization**: Use the exact same blend weight $w$ to interpolate albedo and roughness across the fillet?
- [ ] **De Morgan Smooth Subtraction/Intersection**: Implement smooth intersection and subtraction via $\operatorname{smax}(a, b, k) = -\operatorname{smin}(-a, -b, k)$?
- [ ] **Conservative Raymarch Step Factor**: Account for slight sub-unit gradient norms inside the fillet zone during sphere tracing?

---

## References

1. **Geometric INRs for SDFs (Computers & Graphics / arXiv 2025)**: Luiz Schirmer et al., *"Geometric implicit neural representations for signed distance functions"*, [`arXiv:2511.07206`](https://arxiv.org/abs/2511.07206).
2. **CSG on Neural SDFs (SIGGRAPH Asia 2023)**: Zoë Marschner, Silvia Sellán, Hsueh-Ti Derek Liu, and Alec Jacobson, *"Constructive Solid Geometry on Neural Signed Distance Fields"*, ACM SIGGRAPH Asia 2023 (`doi:10.1145/3610548.3618170`).
3. **Polynomial Smooth Minimum**: Inigo Quilez, *"Smooth Minimum (smin) for Signed Distance Functions"*, Iñigo Quilez Articles on Computer Graphics.
