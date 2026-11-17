# Shirley Equal-Area Concentric Disk Mapping vs Naive Polar Center Clumping Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`shirley-concentric-disk-mapping-rig`)](../demos/shirley-concentric-disk-mapping-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/shirley-concentric-disk-mapping-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/shirley-concentric-disk-mapping-rig/test-report-cards.zh.html) · [中文版 FAQ](./shirley-concentric-equal-area-disk-mapping-vs-polar-center-clumping-faq.md)

![Shirley Equal-Area Concentric Disk Mapping vs Naive Polar Center Clumping Summary](./evidence/shirley-concentric-disk-mapping-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why does mapping two uniform random numbers $(u, v) \in [0, 1]^2$ to a disk via naive polar coordinates `r = u; phi = 2 * PI * v` create an artificial bright hot-spot at the center of Depth-of-Field bokeh disks and soft-shadow penumbras while starving the outer rim of samples?**
   - In polar coordinates, the differential area element of an annulus at radius $r$ is **$dA = r\,dr\,d\phi$**—proportional to $r$!
   - When a naive shader sets radius linearly to $r_{\text{naive}}(u) = u \in [0, 1]$, the fraction of the unit disk's area enclosed by the first $u$ fraction of samples collapses quadratically to:
     $$A_{\text{naive}}(u) = \frac{\pi r_{\text{naive}}(u)^2}{\pi} = \mathbf{u^2}$$
     Consequently, sample density per unit area diverges as $\frac{1}{2\pi r} \to \infty$ at the disk center!
   - **Peter Shirley & Kenneth Chiu (Journal of Graphics Tools 1997 *A Low Distortion Map Between Disk and Square*, used in PBRT, Blender Cycles, and Mitsuba)** inverted the polar area Jacobian via $r(u) = \sqrt{u}$ alongside an octant-wedge mapping $\phi = \frac{\pi}{4}\frac{b}{a}$, guaranteeing **exact $1:1$ equal-area preservation** across every stratum $u \in [0, 1]$:
     $$r_{\text{Shirley}}(u) = \sqrt{u} \implies A_{\text{Shirley}}(u) = \big(\sqrt{u}\big)^2 \equiv \mathbf{u}$$
2. **17-Station Aperture Stratification Audit: Exact $A_{\text{Shirley}}(u) = u$ (`0/17` Clumped) vs `0.0625 / 0.2500 / 0.5625` Polar Clumping (`15/17`)**:
   - Across 17 sample strata $u_k = k / 16 \in [0.0000, 1.0000]$:
   - At **Station 4 ($u = 0.2500$, first $25\%$ of samples)**:
     - **Shirley Equal-Area Disk** maps to radius **$r = \sqrt{0.2500} = \mathbf{0.5000}$**, enclosing exact area fraction **$A_{\text{Shirley}}(0.25) = \mathbf{0.2500}$ ($25.00\%$)**!
     - **Naive Polar Mapping ($r = u$)** crams the first $25\%$ of samples inside radius $r = 0.2500$, covering only **$A_{\text{naive}}(0.25) = (0.2500)^2 = \mathbf{0.0625}$ ($6.25\%$)** of the disk—a **`4.0000×` central density clumping spike (`-75.00%` area deficit)**!
   - At **Midpoint Station 8 ($u = 0.5000$)** and **Station 12 ($u = 0.7500$)**:
     - **Shirley Equal-Area Disk** maps to $r = 0.7071$ and $r = 0.8660$ (with Station 9 $u = 0.5625$ landing on exact $r = \mathbf{0.7500}$), locking enclosed area at **`0.5000`** and **`0.7500`** (`0/17` clumped stations)!
     - **Naive Polar Mapping** covers only **`0.2500` (`-0.2500` / `-50.00%` deficit)** at Station 8 and **`0.5625` (`-0.1875` / `-25.00%` deficit)** at Station 12 across **`15/17` clumped interior strata**!
3. **Architectural Verdict**:
   - Always invert the polar Jacobian with $r = \sqrt{u}$ and **Shirley's concentric wedge mapping** for disk apertures, circular area lights, and Malley cosine hemispheres. Across `8,192` 17-station passes, closed-form evaluation completes in **`0.31 ms`** vs **`140.36 ms`** for 64-sector polar Jacobian quadrature (**`455.12×` faster**).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Shirley Disk Sampling)

### Q1: In plain English, why does setting `r = 0.50` enclose only a quarter of a circle's area instead of half?
- **First-Principles Breakdown**:
  - Area scales with the **square** of radius ($A = \pi r^2$).
  - A circle of radius $r = 0.50$ has area $\pi (0.50)^2 = 0.25\pi$—only **one-quarter** of the unit disk! The outer ring between $r = 0.50$ and $r = 1.00$ holds the remaining **three-quarters ($75\%$)** of the area!
  - Setting $r = u$ puts $50\%$ of your rays into the inner $25\%$ of the lens and leaves the outer $75\%$ of the lens with only $50\%$ of the rays. Taking the square root $r = \sqrt{u}$ places the $50\%$ median circle at $r = \sqrt{0.50} \approx 0.7071$, where $(\sqrt{0.50})^2 = 0.5000$ splits the disk into two equal halves!

### Q2: How does Shirley's Concentric Disk Mapping power Malley's Method for Cosine-Weighted Hemisphere Sampling?
- **Zero-Trig Cosine Hemisphere Lifting**:
  - Once $(x, y)$ is uniformly distributed by area on the unit disk via Shirley's mapping, projecting straight up onto the unit hemisphere by setting $z = \sqrt{\max(0, 1 - x^2 - y^2)}$ automatically produces directions distributed with PDF $p(\omega) = \frac{\cos\theta}{\pi}$—without calling `sin` or `cos` on polar angles!

### Q3: When should teams use AI video generators vs deterministic Shirley disk sampling?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive mood sequences.
- **Choose Deterministic Shirley Concentric Disk Mapping** for physically based DoF bokeh, soft-shadow disk lights, and Monte Carlo global illumination.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Disk & Hemisphere Sampling Selection Decision Tree

```mermaid
flowchart TD
    A["Mapping 2D uniform samples (u, v) ∈ [0,1]² to a unit disk or cosine hemisphere?"] -->|Naive: Linear radius r = u, φ = 2πv| B["Enclosed area collapses to A = u² · 4.00× central clumping & noisy outer rim!"]
    A -->|Invert polar Jacobian dA = r dr dφ| C{"Need low-distortion 2D grid / blue-noise stratification?"}
    C -->|No · Independent random samples| D["Use Square-Root Polar Mapping r = √u, φ = 2πv"]
    C -->|Yes · Preserve 2D stratum aspect ratio| E["Use Shirley-Chiu JGT 1997 Concentric Disk Mapping"]
    D --> F["Locks 1:1 Equal Area A(u) = u Across All 17 Strata · 0/17 Clumped"]
    E --> F
```

### 3.2 Naive Polar $A = u^2$ Clumping vs Shirley Equal-Area $A(u) = u$ Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Linear-Radius Polar (r = u)"]
      N1["Station 4 (u = 0.2500): r = 0.2500"] --> N2["Enclosed Area A = 0.25² = 0.0625 (4.00× Center Clump!)"]
      N2 --> N3["Station 8 (u = 0.5000): Enclosed Area A = 0.2500 (-50% Deficit)"]
      N3 --> N4["15/17 Interior Strata Clumped · Outer Aperture Starved"]
    end
    subgraph Shirley["✅ Shirley Equal-Area Concentric Disk (JGT 1997)"]
      S1["Station 4 (u = 0.2500): Maps to r = √0.25 = 0.5000"] --> S2["Enclosed Area A = 0.50² = 0.2500 (Exact 1:1)"]
      S2 --> S3["Stations 8 & 12 (u = 0.50/0.75): Locks A = 0.5000 / 0.7500"]
      S3 --> S4["0/17 Clumped Strata · Uniform Bokeh & Malley Hemisphere Coverage"]
    end
```

### 3.3 Frame-Level Shirley Concentric Disk & Malley Hemisphere Sequence

```mermaid
sequenceDiagram
    participant Sample as Stratified Sample (u, v) ∈ [0, 1]²
    participant Map as Shirley Concentric Disk Kernel
    participant Lift as Bokeh Aperture / Malley Hemisphere Lifter
    Sample->>Map: Pass stratum u = 0.2500 (Station 4) or u = 0.7500 (Station 12)
    Map->>Map: Evaluate equal-area radius r = √u (0.5000 at u=0.25, 0.8660 at u=0.75) and wedge angle φ
    Map->>Lift: Output disk point (x = r·cos φ, y = r·sin φ) enclosing exact area fraction A = u
    Lift->>Lift: Lift to z = √(1 - x² - y²) for trig-free cos θ / π hemisphere sampling
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Shirley Equal-Area Disk (Primary)** | **Naive Polar $r=u$ (Failure Mode)** | **64-Sector Polar Quadrature (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 4 ($u=0.2500$) Radius & Area** | **`r = 0.5000, A = 0.2500` (Exact $1:1$)** | **`r = 0.2500, A = 0.0625` ($4.00\times$ clumping)** | `A = 0.2500` (agrees within `< 1e-13`) | N/A |
| **Station 8 ($u=0.5000$) Radius & Area** | **`r = 0.7071, A = 0.5000` (Exact $1:1$)** | **`r = 0.5000, A = 0.2500` (`-50.00%` deficit)** | `A = 0.5000` | Uncalibrated bokeh |
| **Station 12 ($u=0.7500$) Radius & Area** | **`r = 0.8660, A = 0.7500` (Exact $1:1$)** | **`r = 0.7500, A = 0.5625` (`-25.00%` deficit)** | `A = 0.7500` | N/A |
| **Clumped Strata (of 17)** | **`0 / 17` (Uniform area density)** | **`15 / 17` (All interior strata clumped)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.31 ms` (`455.12×` faster)** | `0.28 ms` (severe center bias) | `140.36 ms` (64-sector loop) | Multi-second cloud inference |
| **Best Fit Scenarios** | **DoF bokeh, disk area lights, Malley cosine hemisphere sampling** | Never use for area integration | Offline measure verification | Concept clips |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`shirley-concentric-disk-mapping-rig`)

- **Interactive 3D Workbench**: [`demos/shirley-concentric-disk-mapping-rig/index.html`](../demos/shirley-concentric-disk-mapping-rig/index.html)
  - Features a **58-solid 3D 17-Station Aperture Bokeh Stratification Bench**: an aperture bokeh stage, 5 concentric equal-area iris rings, 17 back cyan Shirley equal-area reference columns ($A(u) = u$), 17 front active orbs, and 15 red vertical polar-clumping deficit struts comparing **Shirley Equal-Area Concentric Disk Mapping** against **Naive Linear-Radius Polar Clumping**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/shirley-concentric-disk-mapping-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/shirley-concentric-disk-mapping-rig/test-report-cards.zh.html)

| Light Theme — Shirley Equal-Area Disk (`A(0.75) = 0.7500` Exact) | Light Theme — Naive Polar (`A(0.25) = 0.0625`, `15/17` Clumped) |
| :---: | :---: |
| ![Light Shirley Disk](./evidence/shirley-concentric-disk-mapping-rig/light-shirley_equal_area_concentric_disk.png) | ![Light Naive Polar](./evidence/shirley-concentric-disk-mapping-rig/light-naive_linear_radius_polar_clumping.png) |

| Dark Theme — Shirley Equal-Area Disk (`0/17` Clumped Strata) | Dark Theme — Naive Polar (`-50.00%` Area Deficit at `u = 0.50`) |
| :---: | :---: |
| ![Dark Shirley Disk](./evidence/shirley-concentric-disk-mapping-rig/dark-shirley_equal_area_concentric_disk.png) | ![Dark Naive Polar](./evidence/shirley-concentric-disk-mapping-rig/dark-naive_linear_radius_polar_clumping.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Always Apply Square-Root Radius Scaling $r = \sqrt{u}$ for Disk Sampling**: Never map a uniform random number linearly to radius $r = u$ without Jacobian weighting.
- [ ] **Use Shirley's Octant-Wedge Concentric Map for 2D Stratified Grids**: Preserve low-distortion cell aspect ratios across the entire lens aperture.
- [ ] **Lift Uniform Disk Samples to the Hemisphere for Malley's Cosine Sampling**: Compute $z = \sqrt{\max(0, 1 - x^2 - y^2)}$ to get exact $\cos\theta / \pi$ importance sampling with zero trig overhead.
- [ ] **Guard the Origin $(a = 0, b = 0)$ in `ConcentricSampleDisk`**: Return $(0, 0)$ directly when both offset coordinates are zero to avoid $0/0$ in $\phi = (\pi/4)(b/a)$.
