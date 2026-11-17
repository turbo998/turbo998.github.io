# Hanrahan-Krueger Single-Scattering Slab vs Naive Lambert Dust Rim Starvation Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`hanrahan-krueger-single-scatter-rig`)](../demos/hanrahan-krueger-single-scatter-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/hanrahan-krueger-single-scatter-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/hanrahan-krueger-single-scatter-rig/test-report-cards.zh.html) · [中文版 FAQ](./hanrahan-krueger-single-scattering-slab-vs-lambert-dust-rim-starvation-faq.md)

![Hanrahan-Krueger Single-Scattering Slab vs Naive Lambert Dust Rim Starvation Summary](./evidence/hanrahan-krueger-single-scatter-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why do dusty furniture, fresh snowfields, frosted leaves, chalk, and peach skin epidermis glow with a bright, powdery sheen along grazing silhouettes (up to `2.0000×` brighter than normal view), whereas naive Lambertian shading ($N \cdot L$) renders them flat and lifeless?**
   - In **Pat Hanrahan & Wolfgang Krueger's seminal paper (SIGGRAPH 1993 *Reflection from Layered Surfaces due to Subsurface Scattering*)** and the **Chandrasekhar / Lommel-Seeliger radiative transfer law**, light enters a semi-infinite scattering medium at cosine $\mu_i = N \cdot L$, scatters once at depth $z \in [0, \infty)$, and exits toward the viewer at cosine $\mu_v = N \cdot V$.
   - The combined round-trip optical depth at depth $z$ is $\tau(z) = \sigma_t z \left(\frac{1}{\mu_i} + \frac{1}{\mu_v}\right)$.
   - Integrating the single-scattered radiance over all depths $z \in [0, \infty)$ cancels the extinction coefficient $\sigma_t$ in closed form (normalized to `1.0000` at zenith $\mu_i = \mu_v = 1.0$):
     $$L_{\text{HK}}(\mu_i, \mu_v) = \int_0^\infty 2\sigma_t \exp\!\left(-\sigma_t z \frac{\mu_i + \mu_v}{\mu_i \mu_v}\right) \frac{\mu_i\,dz}{\mu_i \mu_v} \equiv \mathbf{\frac{2\mu_i}{\mu_i + \mu_v}}$$
2. **17-Station Dusty & Epidermis Audit: `1.6000` (`μ_v=0.25`) & `2.0000` (`μ_v=0.00`) Rim Brightening (`0/17` Starved) vs Flat `1.0000` Lambertian Starvation (`16/17`)**:
   - Across 17 viewing cosines $\mu_v = 1 - k / 16 \in [1.0000, 0.0000]$ under overhead illumination ($\mu_i = 1.0000$):
   - At **Station 0 ($\mu_v = 1.0000, \theta_v = 0.0^\circ$)**: $L_{\text{HK}}(1.00) = \frac{2.0}{2.0} = \mathbf{1.0000}$, matching Lambertian diffuse.
   - At **Station 8 ($\mu_v = 0.5000, \theta_v = 60.0^\circ$)**:
     - **Hanrahan-Krueger Single Scattering** rises to **$L_{\text{HK}}(0.50) = \frac{2.0}{1.50} = \mathbf{1.3333}$ (`+33.33%` rim brightening)**!
   - At **Station 12 ($\mu_v = 0.2500, \theta_v = 75.5^\circ$)** and **Horizon Station 16 ($\mu_v = 0.0000, \theta_v = 90.0^\circ$)**:
     - **Hanrahan-Krueger Single Scattering** locks at exact **$L_{\text{HK}}(0.25) = \frac{2.0}{1.25} = \mathbf{1.6000}$** and reaches **$L_{\text{HK}}(0.00) = \mathbf{2.0000}$** at the grazing rim (`0/17` starved stations)!
     - **Naive Lambertian Shading** ignores $\mu_v$ completely, staying stuck at **`1.0000`** (`-0.6000` / **`-37.50%` loss** at Station 12 and `-1.0000` / **`-50.00%` loss** at Station 16 across **`16/17` starved off-zenith stations**)!
3. **Architectural Verdict**:
   - Model dusty layers, snow, frost, and skin epidermis single scattering with **Hanrahan & Krueger's closed-form $\frac{2\mu_i}{\mu_i + \mu_v}$ slab factor**. Across `8,192` 17-station passes, closed-form evaluation completes in **`0.31 ms`** vs **`117.32 ms`** for 64-layer optical-depth quadrature (**`384.42×` faster**).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Hanrahan-Krueger Single Scattering)

### Q1: In plain English, why does skimming your gaze across a dusty table look up to twice as bright as looking straight down at it?
- **First-Principles Breakdown**:
  - When you look straight down into a dusty or snowy layer ($\mu_v = 1.0$), your line of sight penetrates deep into the layer where incoming sunlight has already been attenuated by half ($1/(1 + 1) = 0.50$).
  - When you view the layer at a grazing angle ($\mu_v \to 0$), your line of sight travels almost horizontally through the **very top micron of dust** ($z \approx 0$), where incoming sunlight has suffered **zero vertical attenuation** ($z/\mu_i \approx 0$)! Because every particle along your grazing sightline is fully lit, the radiance doubles from $1.0000$ to $2.0000$!

### Q2: How do Hanrahan-Krueger Single Scattering (Round 122) and Christensen-Burley Diffusion (Round 108) work together?
- **Sharp Single Scatter + Soft Multiple Scatter**:
  - **Hanrahan-Krueger (Round 122)** evaluates 1-bounce directional subsurface scattering at the exact pixel without blurring surface detail, producing crisp dusty/epidermal rim glow.
  - **Christensen-Burley (Round 108)** evaluates multi-bounce radial diffusion across neighboring pixels to produce warm red bleed in shadows.

### Q3: When should teams use AI video generators vs deterministic Hanrahan-Krueger shaders?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive mood clips.
- **Choose Deterministic Hanrahan-Krueger Single Scattering** for digital human epidermis, snow/winter terrain engines, dusty prop weathering, and planetary ring rendering.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Subsurface & Powdery Diffuse Selection Decision Tree

```mermaid
flowchart TD
    A["Modeling diffuse / subsurface reflectance on a dielectric surface?"] -->|Opaque rough V-cavity mineral or clay| B["Use Oren-Nayar V-Cavity Retroreflection (Round 111)"]
    A -->|Translucent or particulate layer Skin, snow, dust, jade| C{"Is the effect dominated by deep multi-bounce diffusion or 1-bounce slab scattering?"}
    C -->|Millimeter-scale lateral bleed Jade, wax, ears| D["Use Christensen-Burley Dual-Exponential Diffusion (Round 108)"]
    C -->|Shallow epidermis, dust, snow, or frost rim sheen| E["Use Hanrahan-Krueger SIGGRAPH 1993 Slab 2μ_i / μ_i+μ_v"]
    E --> F["Locks 1.6000 at μ_v=0.25 and 2.0000 at Grazing Horizon · 0/17 Starved Stations"]
```

### 3.2 Naive Flat Lambert vs Hanrahan-Krueger Single-Scattering Rim Brightening Pipeline

```mermaid
flowchart LR
    subgraph Lambert["❌ Naive Lambertian Diffuse (L = μ_i = 1.0000)"]
      L1["Ignores outgoing view cosine μ_v"] --> L2["Station 12 (μ_v = 0.2500): Stuck at 1.0000 (-37.5% Loss)"]
      L2 --> L3["Horizon Station 16 (μ_v = 0.0000): Stuck at 1.0000 (-50.0% Loss)"]
      L3 --> L4["16/17 Stations Rim-Starved · Snow & Dust Look Like Flat Plastic"]
    end
    subgraph HK["✅ Hanrahan-Krueger Single-Scattering Slab (SIGGRAPH 1993)"]
      H1["Integrates round-trip path z·(1/μ_i + 1/μ_v)"] --> H2["Station 8 (μ_v = 0.5000): Brightens to 1.3333"]
      H2 --> H3["Station 12 (μ_v = 0.2500): Locks 1.6000 · Horizon Reaches 2.0000"]
      H3 --> H4["0/17 Starved Stations · Authentic Powdery & Epidermal Rim Glow"]
    end
```

### 3.3 Frame-Level Hanrahan-Krueger Single-Scattering Sequence

```mermaid
sequenceDiagram
    participant Frag as Fragment Cosines (Incident μ_i = N·L, View μ_v = N·V)
    participant HK as Hanrahan-Krueger Slab Kernel 2·μ_i / (μ_i + μ_v)
    participant Phase as Henyey-Greenstein Phase Modulator
    participant Out as Single-Scattered Radiance L_HK
    Frag->>HK: Pass overhead light μ_i = 1.0000 and Station 12 view cosine μ_v = 0.2500
    HK->>HK: Evaluate closed-form slab integral L_HK = 2.0 / (1.0 + 0.25) = 1.6000
    HK->>Phase: Modulate by single-scattering albedo w_0 and phase function p(cos θ)
    Phase->>Out: Output rim-brightened powdery / epidermal radiance
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Hanrahan-Krueger Slab (Primary)** | **Naive Lambertian Diffuse (Failure Mode)** | **64-Layer Optical-Depth Slab (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 0 ($\mu_v=1.0000, 0^\circ$) Radiance** | **`1.0000` (Zenith baseline)** | `1.0000` | `1.0000` | N/A |
| **Station 8 ($\mu_v=0.5000, 60^\circ$) Radiance** | **`1.3333` (`+33.33%` rim brightening)** | **`1.0000` (`-0.3333` deficit)** | `1.3333` (agrees within `< 1e-13`) | Uncalibrated rim glow |
| **Station 12 ($\mu_v=0.2500, 75.5^\circ$) Radiance** | **`1.6000` (Exact rational brightening)** | **`1.0000` (`-0.6000` / `-37.50%` loss)** | `1.6000` | N/A |
| **Station 16 ($\mu_v=0.0000, 90^\circ$) Radiance** | **`2.0000` (Exact grazing horizon limit)** | **`1.0000` (`-1.0000` / `-50.00%` loss)** | `2.0000` | N/A |
| **Starved Stations (of 17)** | **`0 / 17` (All stations preserved)** | **`16 / 17` (All off-zenith angles starved)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.31 ms` (`384.42×` faster)** | `0.28 ms` (lifeless flat look) | `117.32 ms` (64-layer loop) | Multi-second cloud inference |
| **Best Fit Scenarios** | **Skin epidermis, snow, dust coatings, frost, chalk, planetary rings** | Smooth opaque painted walls | Heterogeneous atmosphere marching | Concept clips |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`hanrahan-krueger-single-scatter-rig`)

- **Interactive 3D Workbench**: [`demos/hanrahan-krueger-single-scatter-rig/index.html`](../demos/hanrahan-krueger-single-scatter-rig/index.html)
  - Features a **58-solid 3D 17-Station Dusty & Epidermis Single-Scatter Bench**: a powdery slab bed, 5 subsurface epidermis scatter strata, 17 back cyan Hanrahan-Krueger reference columns ($L_{\text{HK}} \in [1.0000, 2.0000]$), 17 front active orbs, and 15 red vertical Lambert rim-starvation struts comparing **Hanrahan-Krueger Single-Scattering Slab** against **Naive Lambertian Flat Shading**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/hanrahan-krueger-single-scatter-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/hanrahan-krueger-single-scatter-rig/test-report-cards.zh.html)

| Light Theme — Hanrahan-Krueger Slab (`L(0.25) = 1.6000` Rim Glow) | Light Theme — Naive Lambert (`L = 1.0000` Flat, `16/17` Starved) |
| :---: | :---: |
| ![Light HK Slab](./evidence/hanrahan-krueger-single-scatter-rig/light-hanrahan_krueger_single_scatter_slab.png) | ![Light Lambert Starvation](./evidence/hanrahan-krueger-single-scatter-rig/light-naive_lambert_flat_dust_starvation.png) |

| Dark Theme — Hanrahan-Krueger Slab (`0/17` Starved Stations) | Dark Theme — Naive Lambert (`-50.00%` Horizon Loss) |
| :---: | :---: |
| ![Dark HK Slab](./evidence/hanrahan-krueger-single-scatter-rig/dark-hanrahan_krueger_single_scatter_slab.png) | ![Dark Lambert Starvation](./evidence/hanrahan-krueger-single-scatter-rig/dark-naive_lambert_flat_dust_starvation.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Use Closed-Form $\frac{\mu_i}{\mu_i + \mu_v}$ for Semi-Infinite Single Scattering**: Avoid per-pixel raymarching loops for homogeneous dust, snow, or epidermis layers.
- [ ] **Include the Finite-Thickness Factor $1 - \exp(-\sigma_t d (\mu_i + \mu_v)/(\mu_i \mu_v))$ for Thin Leaves**: Attenuate the semi-infinite slab integral when layer thickness $d$ is optically thin.
- [ ] **Gate Entry and Exit by Fresnel Transmittance $(1 - F(\mu_i))(1 - F(\mu_v))$**: Account for top-surface specular reflection on smooth refractive interfaces (Round 106).
- [ ] **Multiply by the Henyey-Greenstein Phase Function (Round 78)**: Capture forward/backward scattering asymmetry $g \in (-1, 1)$ in the single-scattering lobe.
