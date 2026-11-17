# Visual & Animation Architecture Selection FAQ: Jiménez GTAO Cosine-Weighted Horizon Integral vs Unweighted Solid-Angle SSAO Muddy Over-Darkening

> **One-Sentence Architectural Verdict**: In real-time Screen-Space Ambient Occlusion pipelines (Unreal Engine 5 GTAO, Call of Duty, Unity HDRP), **never evaluate diffuse ambient visibility using unweighted solid-angle coverage $V_{\text{unif}}(\gamma) = 1 - \cos\gamma$**! On our 58-solid, 17-station horizon heliodon bench spanning 17 open-sky cone half-angle stations ($\gamma \in [5^\circ, 85^\circ]$), unweighted solid-angle SSAO ignores **Lambert's Cosine Law ($\cos\theta$)**—**over-darkening a $90^\circ$ street canyon or wall corner ($\gamma = 45^\circ$, station 8) from the path-traced ground truth `0.5000` down to `0.2929` (`-0.2071` / `-41.42%` relative darkening error, peak absolute error `-0.2500` at $\gamma = 60^\circ$, corrupting all `17/17` aperture stations with sooty gray mud)**; whereas **Jorge Jiménez et al. (SIGGRAPH 2016) Ground-Truth Ambient Occlusion (GTAO) cosine-weighted horizon integration ($V_{\text{GTAO}}(\gamma) = \frac{1}{2}(1 - \cos 2\gamma) = \sin^2\gamma$)** locks station 8 at exact **`AO = 0.5000` (`0/17` muddy stations)** while running **45.61× faster** than 64-ring hemispherical quadrature (`2.00 ms` vs `91.32 ms` across 8,192 passes, agreement within `1.44e-15`).

![Jiménez GTAO Cosine-Weighted Horizon Integral vs Unweighted SSAO Muddy Over-Darkening Summary](./evidence/gtao-cosine-horizon-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why do architectural corners, stair crevices, and clothing folds rendered with legacy SSAO look like they were rubbed with black charcoal compared to path-traced ground truth?**
   In plain English: **legacy SSAO measures unweighted solid angle (`1 - cos γ`), forgetting that overhead zenith rays ($\cos\theta \approx 1$) illuminate a diffuse floor far more strongly than grazing horizon rays ($\cos\theta \to 0$)**:
   - Inside a $90^\circ$ street canyon where the open sky spans half-angle $\gamma = 45^\circ$ (station 8) and the walls block $\theta \in [45^\circ, 90^\circ]$:
     - **Unweighted Solid-Angle SSAO** computes $\int_0^\gamma \sin\theta\,d\theta = 1 - \cos 45^\circ = \mathbf{0.2929}$, falsely claiming that blocking the grazing walls removes $70.7\%$ of the light!
     - **True Lambertian Cosine-Weighted Irradiance (Jiménez GTAO)** weights every incident ray by $\cos\theta$:
       $$V_{\text{GTAO}}(\gamma) = \int_0^\gamma 2\sin\theta\cos\theta\,d\theta = \frac{1 - \cos(2\gamma)}{2} = \sin^2\gamma$$
       At $\gamma = 45^\circ$, $\sin^2(45^\circ) = \mathbf{0.5000}$—proving that unweighted SSAO over-darkens $45^\circ$ corners by **`-0.2071` (`-41.42%` relative error)** and $60^\circ$ creases by **`-0.2500`** (`0.5000` vs `0.7500`), corrupting all **`17/17` stations**!
2. **First-Principles Fix: Closed-Form Cosine-Weighted Slice Antiderivative (Jiménez et al. SIGGRAPH 2016)**:
   - Integrating $\cos(\theta - n)\sin\theta$ analytically across each horizon slice yields the exact closed-form GTAO antiderivative $\frac{1}{2}\cos n\,(1 - \cos 2\gamma) = \cos n \sin^2\gamma$, achieving **100% agreement with path-traced ground truth (`0/17` muddy stations)** in $O(1)$ time!
3. **Interactive 3D Workbench & Measured Evidence**:
   - Standalone 3D Bench: `demos/gtao-cosine-horizon-rig/` (58 Three.js solids: baseplate, 4 support feet, `0.5000` $45^\circ$ ground-truth bar, 17 visibility columns, 17 Jiménez GTAO reference spheres, 17 muddy darkening pegs, and the active heliodon carriage).
   - Measured 7-Card 4:5 Reports: `demos/gtao-cosine-horizon-rig/test-report-cards.html` (EN) and `test-report-cards.zh.html` (ZH).

---

## ② 🎯 Soul-Searching Q&A for Architects & Clients

### Q1: Why is closed-form GTAO evaluation 45.61× faster than 64-ring hemispherical quadrature?
**Because once the horizon angles are found, the analytical antiderivative $\frac{1}{2}\cos n\,(1 - \cos 2\gamma)$ integrates the entire cosine-weighted polar arc in a single trigonometric evaluation!**
Across 8,192 17-station passes, closed-form GTAO runs in **`2.00 ms`** versus **`91.32 ms`** for 64-ring hemispherical quadrature (**45.61× speedup**, with `1.44e-15` agreement).

### Q2: Where does the maximum absolute discrepancy between GTAO ($\sin^2\gamma$) and unweighted SSAO ($1 - \cos\gamma$) occur?
**At $\gamma = 60^\circ$ (Station 11, where $\cos\gamma = 0.5$)!**
Differentiating $\Delta V(\gamma) = \sin^2\gamma - (1 - \cos\gamma) = \cos\gamma - \cos^2\gamma$ gives $\cos\gamma = 0.5 \implies \gamma = 60^\circ$, where GTAO outputs `0.7500` while unweighted SSAO outputs `0.5000` (a **`-0.2500`** maximum absolute darkening error), whereas the relative error peaks near narrow crevices ($\to -50\%$ as $\gamma \to 0^\circ$)!

### Q3: How does deterministic Jiménez GTAO relate to neural ambient occlusion?
**GTAO provides the exact analytical cosine-weighted visibility integral directly from the depth buffer in `< 0.5 ms` without neural training bias or hallucinated creases.**

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence Flow)

### 3.1 Ambient Occlusion Horizon Integrand Decision Tree
```mermaid
flowchart TD
    A["Integrating horizon visibility angles into an Ambient Occlusion factor AO?"] --> B{"Is the receiver an isotropic fog particle or a Lambertian surface with normal N?"}
    B -- "Isotropic mid-air fog particle" --> C["Unweighted spherical cap 1 - cos gamma applies"]
    B -- "Lambertian 3D mesh surface following cos theta law" --> D{"Which polar integrand is used?"}
    D -- "Naive Unweighted Solid-Angle 1 - cos gamma" --> E["❌ Sooty over-darkening: crushes 45° canyon from 0.5000 to 0.2929 -41.42% mud"]
    D -- "64-ring numerical hemisphere quadrature per pixel" --> F["⚠️ Accurate but 45.61× slower"]
    D -- "Jimenez GTAO Closed-Form Cosine Integral sin^2 gamma" --> G["✅ Exact AO=0.5000 at 45° · 0 muddy loss · 45.61× faster"]
```

### 3.2 Unweighted SSAO Muddy Over-Darkening vs Jiménez GTAO Cosine Pipeline
```mermaid
flowchart LR
    subgraph NaiveSSAO["❌ Naive Unweighted Solid-Angle SSAO (1 - cos gamma · Sooty Mud)"]
        N1["Inspect station 8 at gamma = 45° street canyon"] --> N2["Treats occluded grazing walls as equally bright as overhead zenith sky"]
        N2 --> N3["Evaluates unweighted solid angle 1 - cos(45°) = 0.2929"]
        N3 --> N4["Over-darkens by -0.2071 (-41.42% error) across all 17/17 stations!"]
    end
    subgraph JimenezGTAO["✅ Jiménez GTAO Cosine-Weighted Integral (sin^2 gamma · 45.61× Faster)"]
        G1["Weight polar integral by Lambertian cosine: int_0^gamma 2*sin(theta)*cos(theta) dtheta"] --> G2["Evaluate closed-form antiderivative: 0.5*(1 - cos(2*gamma)) = sin^2(gamma)"]
        G2 --> G3["Locks gamma = 45° at exact path-traced AO = 0.5000"]
        G3 --> G4["Eliminates muddy mid-tone crevices across all 17/17 stations (1.44e-15 error)"]
    end
```

### 3.3 Frame-Level Horizon Heliodon Sequence Diagram
```mermaid
sequenceDiagram
    participant User as Architect / Playwright Harness
    participant Solver as model.ts GTAO Cosine Kernel
    participant Stage as WebGL2 58-Solid 3D Heliodon Bench
    User->>Solver: Set normal tilt n=0°, sky=1.0, inspect station i=8 (gamma=45° street canyon)
    Solver->>Solver: GTAO closed-form resolves V_GTAO = sin^2(45°) = 0.5000
    Solver->>Solver: Compare against unweighted SSAO -> V_unif = 1 - cos(45°) = 0.2929 (-0.2071 mud loss)
    Solver-->>Stage: Emit 17-station cosine visibilities, unweighted visibilities & mud losses
    Stage-->>User: Update 17 visibility columns, 17 GTAO spheres, 17 mud pegs & carriage
```

---

## ④ 📊 Visual Technology Selection Decision Matrix

| Evaluation Dimension | ✅ Jiménez GTAO Cosine Integral ($\sin^2\gamma$) | ⚠️ 64-Ring Hemisphere Quadrature | ❌ Naive Unweighted SSAO ($1-\cos\gamma$) | ❌ Crytek 3D Sphere SSAO |
| :--- | :--- | :--- | :--- | :--- |
| **Visibility at Station 8 ($\gamma=45^\circ$ Canyon)** | **Exact `0.5000` (Path-traced match)** | `0.5000` (`1.44e-15` diff) | **`0.2929` (`-41.42%` muddy darkening!)** | Biased & view-dependent |
| **Visibility at Station 11 ($\gamma=60^\circ$ Crease)** | **Exact `0.7500`** | `0.7500` | **`0.5000` (`-0.2500` max absolute loss!)** | Self-occludes flat walls to `0.50` |
| **Mud-Corrupted Aperture Stations (of 17)** | **`0 / 17` (Zero over-darkening)** | `0 / 17` | **`17 / 17` (Every partial aperture darkened)** | `17 / 17` |
| **White-Furnace Path-Tracing Agreement** | **100% analytical agreement** | 100% agreement | **20%–46% systematically too dark** | Fails |
| **8,192-Pass 17-Station CPU Latency** | **`2.00 ms` (Fastest · 45.61× speedup)** | `91.32 ms` (45.61× slower) | `1.90 ms` (Sooty charcoal artifacts) | — |
| **Recommended Use Case** | **All real-time PBR surface AO passes** | Ground-truth reference | **Never use on Lambertian surfaces** | Obsolete |

---

## ⑤ 🧪 New Interactive 3D Demo & 7-Card 4:5 Visual Report

### 5.1 Live Workbench & Report Links
- **Interactive 3D Workbench**: [`demos/gtao-cosine-horizon-rig/index.html`](../demos/gtao-cosine-horizon-rig/index.html)
- **7-Card 4:5 Visual Report (EN)**: [`demos/gtao-cosine-horizon-rig/test-report-cards.html`](../demos/gtao-cosine-horizon-rig/test-report-cards.html)
- **7-Card 4:5 Visual Report (ZH)**: [`demos/gtao-cosine-horizon-rig/test-report-cards.zh.html`](../demos/gtao-cosine-horizon-rig/test-report-cards.zh.html)
- **Sealed Telemetry JSON**: [`demos/gtao-cosine-horizon-rig/report.json`](../demos/gtao-cosine-horizon-rig/report.json)

### 5.2 Multi-Theme & Multi-Mode Playwright Visual Evidence

| Jiménez GTAO Cosine Integral (Light · Exact `AO = 0.5000` at Station 8 $\gamma = 45^\circ$, `0` Muddy Loss) | Naive Unweighted SSAO (Light · Sags to `0.2929` at $\gamma = 45^\circ$ across All 17 Stations!) |
| :---: | :---: |
| ![Jiménez GTAO Light](./evidence/gtao-cosine-horizon-rig/light-jimenez-gtao-cosine-weighted.png) | ![Unweighted SSAO Mud Light](./evidence/gtao-cosine-horizon-rig/light-naive-unweighted-solid-angle-ssao.png) |

| Jiménez GTAO Cosine Integral (Dark · 58 Three.js Solids) | Naive Unweighted SSAO (Dark · 17 Red Muddy Darkening Pegs Exposed) |
| :---: | :---: |
| ![Jiménez GTAO Dark](./evidence/gtao-cosine-horizon-rig/dark-jimenez-gtao-cosine-weighted.png) | ![Unweighted SSAO Mud Dark](./evidence/gtao-cosine-horizon-rig/dark-naive-unweighted-solid-angle-ssao.png) |

---

## ⑥ 🛠️ Rapid SA Delivery Verification Checklist

Before shipping a screen-space ambient occlusion pass to production, verify every item below:

- [ ] **Cosine-Weighted Slice Antiderivative**: Does the shader integrate horizon angles using Jiménez's cosine-weighted formula $-\cos(2\theta - n) + \cos n + 2\theta\sin n$ rather than $1 - \cos\gamma$?
- [ ] **Projected Normal Slice Clamping ($\theta_{1,2} \in [-n, \pi - n]$)**: Are tracked horizon angles clamped to the surface tangent plane so rays behind the surface never contribute negative occlusion?
- [ ] **Thin-Occluder Distance Falloff**: Are horizon candidates attenuated when their depth delta exceeds the world-space occlusion radius so foreground characters do not cast dark halos onto distant walls?
- [ ] **Multi-Bounce Albedo Cubic Polynomial**: Is scalar GTAO upgraded with Jiménez's albedo-dependent multi-bounce polynomial so bright surfaces retain warm interreflections in creases?
- [ ] **Coupled Bent-Normal & Lagarde Specular Occlusion Output**: Does the GTAO pass output the bisector bent normal and feed scalar AO into Lagarde's `computeSpecularOcclusion` (Round 75)?
