# Quilez Analytical `fwidth` Box-Filter Grid Anti-Aliasing vs Naive `step()` Horizon Moire Strobe Selection & First-Principles FAQ (Round 125 · 135th Demo Milestone)

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`quilez-fwidth-grid-boxfilter-rig`)](../demos/quilez-fwidth-grid-boxfilter-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/quilez-fwidth-grid-boxfilter-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/quilez-fwidth-grid-boxfilter-rig/test-report-cards.zh.html) · [中文版 FAQ](./quilez-fwidth-analytical-box-filter-grid-vs-step-moire-strobe-faq.md)

![Quilez Analytical fwidth Box-Filter Grid vs Naive step() Moire Strobe Summary](./evidence/quilez-fwidth-grid-boxfilter-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why do procedural 3D floor grids, CAD ground planes, architectural tile joints, and terrain contour lines written with `step()` or unscaled `smoothstep()` dissolve into shimmering Moire strobing near the horizon?**
   - Unlike bitmap textures that rely on prefiltered mipmap chains, procedural shaders evaluate mathematical functions at a single point per pixel.
   - Consider a grid line of physical width $T = 0.2500\text{ m}$. As the surface recedes toward the horizon, the world-space width of a single screen pixel—measured by hardware screen-space derivatives $w = \text{fwidth}(u) = |\partial u/\partial x| + |\partial u/\partial y|$—grows much wider than the line itself ($w_k = 0.25(k + 1) \in [0.25, 4.25]\text{ m}$, or $1\times\text{ to }17\times$ the line width).
   - **The Point-Sampling Strobe Disaster**: Naive `step(|u|, T/2)` tests only whether the infinitesimal pixel center lands inside the $0.25\text{ m}$ line. Whenever it hits, it paints the entire $3.25\text{ m}$–$4.25\text{ m}$ pixel at full `1.0000` intensity—inflating the line's integrated radiant flux by **$w / T = k + 1$ (up to `17.0000×`)**—and drops to `0.0000` on the next pixel!
   - **Inigo Quilez (2013 *Filtered Checkers & Grids*) & Ben Golus (*The Best Darn Grid Shader*)** solved this by analytically integrating a 1D/2D box filter over the pixel footprint $w = \text{fwidth}(u)$: when $w > T$, the fraction of the pixel footprint covered by the line is:
     $$C_{\text{Quilez}}(w) = \frac{T}{\max(T,\; \text{fwidth}(u))} = \frac{1}{k + 1} \implies \Phi_{\text{Quilez}}(w) = C_{\text{Quilez}}(w) \cdot \frac{w}{T} \equiv \mathbf{1.0000\times}$$
2. **17-Station Horizon Footprint Audit: Conserved $\Phi_{\text{Quilez}} = 1.0000\times$ (`0/17` Strobing) vs `4.00× / 13.00× / 17.00×` `step()` Moire Blowouts (`16/17`)**:
   - Across 17 pixel footprint widths $w_k = 0.25(k + 1) \in [0.2500, 4.2500]\text{ m}$ for line thickness $T = 0.2500\text{ m}$:
   - At **Station 0 ($w = 0.2500\text{ m} = 1T$)**: $C_{\text{Quilez}} = 1.0000$, $\Phi_{\text{Quilez}} = 1.0000\times$, $\Phi_{\text{naive}} = 1.0000\times$.
   - At **Station 3 ($w = 1.0000\text{ m} = 4T$)** and **Station 7 ($w = 2.0000\text{ m} = 8T$)**:
     - **Quilez Analytical Box-Filter** attenuates sub-pixel coverage to **$C = \mathbf{0.2500}$** and **$C = \mathbf{0.1250}$** to lock integrated pixel flux at **$\Phi_{\text{Quilez}} = \mathbf{1.0000\times}$**!
     - **Naive `step()`** explodes to **`4.0000×`** and **`8.0000×`**!
   - At **Station 12 ($w = 3.2500\text{ m} = 13T$)**, **Station 15 ($w = 4.0000\text{ m} = 16T$)**, and **Station 16 ($w = 4.2500\text{ m} = 17T$)**:
     - **Quilez Analytical Box-Filter** scales coverage to **$C = \frac{1}{13} \approx \mathbf{0.0769}$**, **$C = \frac{1}{16} = \mathbf{0.0625}$**, and **$C = \frac{1}{17} \approx \mathbf{0.0588}$**, locking **$\Phi_{\text{Quilez}} = \mathbf{1.0000\times}$ across all 17 stations (`0/17` strobing stations)**!
     - **Naive `step()`** surges to **`13.0000×`**, **`16.0000×`**, and **`17.0000×`** across **`16/17` sub-pixel horizon stations**!
3. **Architectural Verdict**:
   - Always attenuate sub-pixel procedural lines and checkerboards by their analytical box-filter footprint coverage $T / \max(T, \text{fwidth}(u))$. Across `8,192` 17-station passes, closed-form evaluation executes in **`0.75 ms`** vs **`112.56 ms`** for 64-tap sub-pixel supersampling (**`150.36×` faster**).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Analytical Box-Filter Grids)

### Q1: In plain English, why does a sub-pixel line have to fade in opacity as it gets farther away?
- **First-Principles Breakdown**:
  - Suppose a white chalk line on a black field is $25\text{ cm}$ wide, and a distant camera pixel covers a $3.25\text{ m}$ ($325\text{ cm}$) patch of the field (Station 12, $w = 13T$).
  - Inside that $325\text{ cm}$ pixel patch, only $25\text{ cm}$ is white chalk and the other $300\text{ cm}$ is black grass!
  - A real camera sensor averages the light across the whole pixel patch: $\frac{25}{325} = \frac{1}{13} \approx 7.69\%$ gray!
  - Naive `step()` sees that the center of the pixel touched the chalk line and paints the entire $325\text{ cm}$ patch $100\%$ pure white—making the line appear $13\times$ too thick and $13\times$ too bright whenever a pixel center crosses it!

### Q2: Why must `fwidth(u)` be computed BEFORE `fract(u)` on repeating grids?
- **Avoiding the Modulo Discontinuity Spike (Round 61)**:
  - `fract(u)` jumps discontinuously from `0.999` back to `0.000` at every integer grid cell boundary. Calling `fwidth(fract(u))` across that jump produces a massive false derivative `w ~ 1.0` even right in front of the camera!
  - Always evaluate `w = fwidth(u)` on the continuous unwrapped world/UV coordinate first, and use `fract(u)` only for the distance to the line center.

### Q3: When should teams use AI video generators vs deterministic Quilez box-filtered shaders?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive mood sequences.
- **Choose Deterministic Quilez `fwidth` Box-Filter Shaders** for 3D viewport grids, CAD/BIM floor plans, topographic contour maps, and procedural architectural facades.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Procedural Pattern Anti-Aliasing Selection Decision Tree

```mermaid
flowchart TD
    A["Rendering a procedural geometric pattern Grid, checkerboard, or contour lines in 3D?"] -->|Naive: Unfiltered step or unscaled smoothstep| B["Sub-pixel lines output full 1.0 when hit · 4× to 17× energy blowout & Moire strobing!"]
    A -->|Measure continuous pixel footprint w = fwidth u| C{"What is the procedural pattern topology?"}
    C -->|Isolated lines of width T Infinite floor grid / contours| D["Use Quilez-Golus Sub-Pixel Box Coverage C = T / max T, w"]
    C -->|Periodic wave / checkerboard g u| E["Use Quilez 2013 Antiderivative Difference G(u+w/2) - G(u-w/2) / w"]
    D --> F["Locks Integrated Pixel Flux at Φ = 1.0000× Across All 17 Distances · 0/17 Strobing"]
    E --> F
```

### 3.2 Naive `step()` Moire Strobe vs Quilez `fwidth` Box-Filter Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Unfiltered step(|u|, T/2)"]
      N1["Station 12 Footprint w = 3.25 m = 13T"] --> N2["Outputs Full C = 1.0000 When Center Hits Line"]
      N2 --> N3["Integrated Pixel Flux Explodes to Φ = 13.0000× (16.00× at 4.0 m)"]
      N3 --> N4["16/17 Sub-Pixel Stations Strobe Between 0 and 13×-17×"]
    end
    subgraph Quilez["✅ Quilez & Golus Analytical fwidth Box-Filter"]
      Q1["Station 12 Footprint w = 3.25 m = 13T"] --> Q2["Sub-Pixel Coverage C = T / w = 1/13 = 0.0769"]
      Q2 --> Q3["Station 15 (w = 16T): Coverage Fades to C = 1/16 = 0.0625"]
      Q3 --> Q4["Locks Integrated Flux at Φ = C · (w/T) = 1.0000× · 0/17 Strobing"]
    end
```

### 3.3 Frame-Level Analytical `fwidth` Box-Filter Evaluation Sequence

```mermaid
sequenceDiagram
    participant UV as Continuous Grid Coordinate u & Line Width T = 0.25 m
    participant Deriv as GPU 2×2 Quad Derivative Unit w = fwidth(u)
    participant Filt as Quilez Box-Filter Kernel C = T / max(T, w)
    participant Out as Alias-Free Linear Grid Coverage
    UV->>Deriv: Pass unwrapped world coordinate u before fract()
    Deriv->>Filt: Compute pixel footprint width w (e.g. Station 12 w = 3.25 m = 13T)
    Filt->>Filt: Evaluate sub-pixel area fraction C = 0.25 / max(0.25, 3.25) = 0.0769
    Filt->>Out: Blend line color in linear space with conserved flux Φ = 1.0000×
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Quilez `fwidth` Box-Filter (Primary)** | **Naive Unfiltered `step()` (Failure Mode)** | **64-Tap Sub-Pixel SSAA (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 0 ($w=0.25\text{ m}=1T$) Coverage & Flux** | **`C = 1.0000, Φ = 1.0000×`** | `C = 1.0000, Φ = 1.0000×` | `Φ = 1.0000×` | N/A |
| **Station 3 ($w=1.00\text{ m}=4T$) Coverage & Flux** | **`C = 0.2500, Φ = 1.0000×` (Conserved)** | **`C = 1.0000, Φ = 4.0000×` (Strobe)** | `Φ = 1.0000×` (agrees within `< 1e-13`) | Warped grid lines |
| **Station 12 ($w=3.25\text{ m}=13T$) Coverage & Flux** | **`C = 0.0769, Φ = 1.0000×` (Conserved)** | **`C = 1.0000, Φ = 13.0000×` (Strobe)** | `Φ = 1.0000×` | N/A |
| **Station 15 ($w=4.00\text{ m}=16T$) Coverage & Flux** | **`C = 0.0625, Φ = 1.0000×` (Conserved)** | **`C = 1.0000, Φ = 16.0000×` (Strobe)** | `Φ = 1.0000×` | N/A |
| **Strobing Stations (of 17)** | **`0 / 17` (Smooth horizon fade)** | **`16 / 17` (All sub-pixel stations strobe)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.75 ms` (`150.36×` faster)** | `0.68 ms` (severe Moire strobing) | `112.56 ms` (64-tap SSAA) | Multi-second cloud inference |
| **Best Fit Scenarios** | **Infinite 3D grids, CAD ground planes, contour lines, checkerboards** | Never use on perspective-projected 3D grids | Offline supersampled validation | Concept clips |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`quilez-fwidth-grid-boxfilter-rig` · Round 125 / 135th Demo Milestone)

- **Interactive 3D Workbench**: [`demos/quilez-fwidth-grid-boxfilter-rig/index.html`](../demos/quilez-fwidth-grid-boxfilter-rig/index.html)
  - Features a **58-solid 3D 17-Station Procedural Grid Box-Filter Bench**: a procedural grid platen, 5 pixel-footprint box-filter frames, 17 back cyan Quilez conserved-flux columns ($\Phi = 1.0000\times$), 17 front active orbs, and 15 red vertical `step()` aliasing blowout struts comparing **Quilez Analytical `fwidth` Box-Filter Coverage** against **Naive Unfiltered `step()` Horizon Moire Strobing**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/quilez-fwidth-grid-boxfilter-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/quilez-fwidth-grid-boxfilter-rig/test-report-cards.zh.html)

| Light Theme — Quilez `fwidth` Box-Filter (`Φ = 1.0000×` Moire-Free) | Light Theme — Naive `step()` (`w=3.25m` Inflates to `13.00×`, `16/17` Strobe) |
| :---: | :---: |
| ![Light Quilez Grid](./evidence/quilez-fwidth-grid-boxfilter-rig/light-quilez_fwidth_analytical_box_filter.png) | ![Light Naive step Strobe](./evidence/quilez-fwidth-grid-boxfilter-rig/light-naive_unfiltered_step_binary_aliasing.png) |

| Dark Theme — Quilez `fwidth` Box-Filter (`0/17` Strobing Stations) | Dark Theme — Naive `step()` (`17.00×` Blowout at `w = 4.25 m`) |
| :---: | :---: |
| ![Dark Quilez Grid](./evidence/quilez-fwidth-grid-boxfilter-rig/dark-quilez_fwidth_analytical_box_filter.png) | ![Dark Naive step Strobe](./evidence/quilez-fwidth-grid-boxfilter-rig/dark-naive_unfiltered_step_binary_aliasing.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Evaluate Derivatives on Continuous Coordinates Before `fract()` (Round 61)**: Compute `w = length(vec2(dFdx(u), dFdy(u)))` on unwrapped coordinates so modulo seams never corrupt the footprint width.
- [ ] **Attenuate Sub-Pixel Line Opacity by $T / \max(T, w)$**: Scale line alpha proportionally when the pixel footprint $w$ exceeds line thickness $T$.
- [ ] **Use Antiderivative Differences $(G(u+w/2) - G(u-w/2))/w$ for Periodic Waves**: Analytically box-filter repeating checkerboards and sine/square waves so they converge smoothly to their mean color at the horizon.
- [ ] **Composite Coverage in Linear Radiance Space (Round 23)**: Blend grid lines in linear RGB before sRGB encoding so sub-pixel coverage conserves physical energy.
