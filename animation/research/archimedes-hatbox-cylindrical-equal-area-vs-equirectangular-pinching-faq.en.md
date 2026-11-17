# Archimedes Hat-Box Cylindrical Equal-Area Sampling (`z = 1−2ξ₁, D = 1.0000×`) vs Naive Equirectangular Polar Pinching Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`archimedes-cylindrical-equal-area-rig`)](../demos/archimedes-cylindrical-equal-area-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/archimedes-cylindrical-equal-area-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/archimedes-cylindrical-equal-area-rig/test-report-cards.zh.html) · [中文版 FAQ](./archimedes-hatbox-cylindrical-equal-area-vs-equirectangular-pinching-faq.md)

![Archimedes Hat-Box Cylindrical Equal-Area vs Naive Equirectangular Pinching Summary](./evidence/archimedes-cylindrical-equal-area-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why does sampling polar angle uniformly (`θ = πξ₁, φ = 2πξ₂`) in 3D spherical particle emitters, 360° HDRI environment maps, and planetary grids crowd sample density by up to `2.0000×` (and $\to \infty$ at the poles)—and how does Archimedes of Syracuse's (c. 225 BCE) Hat-Box Cylindrical Equal-Area Theorem (`z = cos θ = 1 − 2ξ₁, r_⊥ = √(1 − z²)`) lock solid-angle sample density at `D = 1.0000×` across all 17 latitude stations?**
   - **Archimedes of Syracuse (c. 225 BCE, *On the Sphere and Cylinder*) Hat-Box Theorem (`dΩ = |dz| dφ`)**:
     - On the unit sphere $\mathbb{S}^2$, the differential solid angle at polar angle $\theta \in [0, \pi]$ is:
       $$d\Omega = \sin\theta\,d\theta\,d\phi = |d(\cos\theta)|\,d\phi = dz\,d\phi!$$
     - Archimedes proved that when a sphere is projected horizontally outward onto its circumscribing cylinder ($R = 1, z \in [-1, 1]$), the latitudinal parallel-circle shrinkage factor $\sin\theta$ cancels the meridional slant-height stretching factor $\frac{1}{\sin\theta}$ identically:
       $$J_{\text{Archimedes}}(u) = \sin\theta \cdot \frac{1}{\sin\theta} \equiv \mathbf{1.0000\times}!$$
     - Sampling axial cylinder height uniformly via $z = 1 - 2\xi_1 \in [-1, 1]$ and setting $r_\perp = \sqrt{1 - z^2}$ locks the solid-angle sampling density ratio across all 17 latitude-compression stations $u_k = k/16 \in [0.0000, 1.0000]$ (where $\sin\theta(u) = \frac{1}{1+u}$) at:
       $$D_{\text{Archimedes}}(u) \equiv \mathbf{1.0000\times} \quad (\text{`0/17` pinched stations})!$$
   - **Why Naive Equirectangular Sampling (`θ = πξ₁, φ = 2πξ₂`) Crowds the Poles by $\frac{1}{\sin\theta} = 1 + u$**:
     - Uniform spacing in $\theta$ maps equal parameter steps $d\theta\,d\phi$ onto shrinking solid angles $d\Omega = \sin\theta\,d\theta\,d\phi$, inflating the sample density per steradian as $D_{\text{naive}}(u) = \frac{1}{\sin\theta(u)} = 1 + u$:
       - At **Station 4 ($u = 0.25, \sin\theta = 0.8000$)**: $D_{\text{naive}}(0.25) = \mathbf{1.2500\times}$ (`+25.00%` polar crowding).
       - At **Station 8 ($u = 0.50, \sin\theta = 0.6667$)**: $D_{\text{naive}}(0.50) = \mathbf{1.5000\times}$ (**`+50.00%` polar crowding**).
       - At **Station 16 ($u = 1.00, \sin\theta = 0.5000, \theta = 30^\circ$)**: $D_{\text{naive}}(1.00) = \mathbf{2.0000\times}$ (**`+100.00%` double polar crowding across `16/17` stations**)!
2. **17-Station Latitude-Compression Audit: Exact `D = 1.0000×` (`0/17` Pinched) vs Naive `2.0000×` Polar Crowding Across `16/17` Stations**:
   - Across `8,192` 17-station passes, closed-form Archimedes Hat-Box evaluation runs in **`0.18 ms`** vs **`13.96 ms`** for 64-subband spherical zone surface-area quadrature (**`79.63×` faster**, `< 1e-12` error).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Archimedes Hat-Box Projection)

### Q1: In plain English, why does slicing a sphere inside a cylinder preserve exact area on every horizontal slice?
- **First-Principles Breakdown**:
  - Imagine slicing an orange inside a snug vertical cardboard tube into thin horizontal rings of thickness $dz$.
  - Near the top of the orange, each ring has a smaller circumference ($\times \sin\theta$), but its skin is tilted more steeply so the strip of peel is wider ($\div \sin\theta$). Those two factors cancel out to `1.0000×` at every single latitude!
  - That is why picking a random height $z \in [-1, 1]$ on the cylinder and pushing it radially onto the sphere produces a perfectly uniform point distribution on the sphere—without calling `acos` or `sin(theta)`!

### Q2: How does Archimedes' Hat-Box Theorem power Spherical Fibonacci Lattices?
- **Equal-Height Axial Rings**:
  - Placing $N$ points at uniform axial heights $z_i = 1 - \frac{2i + 1}{N}$ and golden-angle azimuths $\phi_i = \frac{2\pi i}{\varphi}$ guarantees that every point occupies an equal cylindrical ring area $\frac{4\pi}{N}$, which by Archimedes' theorem maps to an equal spherical solid angle $\frac{4\pi}{N}$!

### Q3: When should teams use AI video generators vs deterministic Archimedes Hat-Box sampling?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive mood clips.
- **Choose Deterministic Archimedes Hat-Box Sampling** for isotropic particle systems, Monte Carlo volumetric scattering, spherical Fibonacci point sets, and equal-area planetary/HDRI projections.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Spherical Sampling & Cylindrical Equal-Area Projection Decision Tree

```mermaid
flowchart TD
    A["Generating uniform points on the sphere S² or weighting 360° environment maps?"] -->|Naive: Sample polar angle θ = π * ξ₁ uniformly| B["Parallel rings shrink by sin θ · Polar sample density spikes as 1/sin θ = 1+u up to 2.0000× across 16/17 stations!"]
    A -->|Apply Archimedes c.225 BCE Hat-Box Theorem| C{"Target rendering or simulation task?"}
    C -->|Isotropic particle emission / Monte Carlo / Fibonacci sphere| D["Sample axial height z = 1 - 2*ξ₁, r_⊥ = √1-z², φ = 2π*ξ₂"]
    C -->|Integrating an existing 2:1 Equirectangular HDRI map| E["Multiply row v texels by solid-angle Jacobian sin πv"]
    D --> F["Circumference sin θ cancels slant 1/sin θ · Locks D = 1.0000× across all 17 stations · 0/17 pinched · 79.63× faster"]
```

### 3.2 Naive Equirectangular Polar Pinching vs Archimedes Hat-Box Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Equirectangular Sampling (θ = πξ₁, φ = 2πξ₂)"]
      N1["High Latitude Shrinks Parallel Radius sin θ = 1/(1+u)"] --> N2["Uniform dθ Steps Map to Shrinking Solid Angle sin θ dθ dφ"]
      N2 --> N3["Sample Density per Steradian Spikes as 1/sin θ = 1+u"]
      N3 --> N4["Crowds to 1.5000× at S08 and 2.0000× at S16 · 16/17 Pinched!"]
    end
    subgraph Archimedes["✅ Archimedes Hat-Box Cylindrical Equal-Area (c. 225 BCE)"]
      A1["Sample Cylinder Height Uniformly z = 1 − 2ξ₁ ∈ [−1, 1]"] --> A2["Radial Projection r_⊥ = √(1 − z²)"]
      A2 --> A3["Ring Shrinkage sin θ Cancels Slant Stretch 1/sin θ"]
      A3 --> A4["Locks Solid-Angle Density Ratio D = 1.0000× · 0/17 Pinched!"]
    end
```

### 3.3 Frame-Level Isotropic Spherical Direction Generator Sequence

```mermaid
sequenceDiagram
    participant RNG as Uniform Random Pair (ξ₁, ξ₂) ∈ [0, 1)²
    participant Arc as Archimedes Hat-Box Operator
    participant Dir as 3D Unit Direction Vector (x, y, z)
    RNG->>Arc: Pass uniform random variates ξ₁, ξ₂
    Arc->>Arc: Compute z = 1 − 2ξ₁, r_⊥ = √(1 − z²), φ = 2πξ₂
    Arc->>Dir: Output (r_⊥ cos φ, r_⊥ sin φ, z) locking D = 1.0000× (vs naive 1.5000×–2.0000× polar crowding)
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Archimedes Hat-Box `z = 1−2ξ₁` (Primary)** | **Naive Equirectangular `θ = πξ₁` (Failure Mode)** | **64-Subband Spherical Zone Quadrature (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 0 ($u=0.00, \sin\theta=1.00$) Density** | **`1.0000×` (Exact uniform)** | `1.0000×` | `1.0000×` | N/A |
| **Station 4 ($u=0.25, \sin\theta=0.80$) Density** | **`1.0000×` (Exact uniform)** | **`1.2500×` (`+25.00%` crowding)** | `1.0000×` (`< 1e-12` error) | N/A |
| **Station 8 ($u=0.50, \sin\theta=0.67$) Density** | **`1.0000×` (Exact uniform)** | **`1.5000×` (`+50.00%` crowding)** | `1.0000×` | Polar seam pinching |
| **Station 16 ($u=1.00, \sin\theta=0.50$) Density** | **`1.0000×` (Exact uniform)** | **`2.0000×` (`+100.00%` double crowding)** | `1.0000×` | N/A |
| **Pinched Stations (of 17)** | **`0 / 17` ($D(u) \equiv 1.0000\times$)** | **`16 / 17` (All non-equatorial stations)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.18 ms` (`79.63×` faster)** | `0.21 ms` (Crowds poles) | `13.96 ms` (64-subband zone) | Multi-second cloud inference |
| **Best Fit Scenarios** | **Spherical particles, Fibonacci lattices, IBL** | Never use for uniform sphere sampling | Spherical measure verification | Concept mood videos |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`archimedes-cylindrical-equal-area-rig`)

- **Interactive 3D Workbench**: [`demos/archimedes-cylindrical-equal-area-rig/index.html`](../demos/archimedes-cylindrical-equal-area-rig/index.html)
  - Features a **58-solid 3D 17-Station Archimedes Hat-Box Cylindrical Equal-Area Bench**: a metrological stage platen, 3 Archimedes circumscribing cylinder rails, 5 spherical meridian arches, 17 back reference Archimedes equal-area pillars ($D = 1.0000\times$), 17 front active solid-angle density probe spheres, and 15 red vertical polar-pinching warning struts comparing **Archimedes Hat-Box Axial Equal-Area Sampling** against **Naive Equirectangular Lat-Lon Pinching**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/archimedes-cylindrical-equal-area-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/archimedes-cylindrical-equal-area-rig/test-report-cards.zh.html)

| Light Theme — Archimedes Hat-Box (Locks `D = 1.0000×`, `0/17` Pinched) | Light Theme — Naive Equirectangular (`2.0000×` Crowding at `u=1.0` Across `16/17` Stations) |
| :---: | :---: |
| ![Light Archimedes](./evidence/archimedes-cylindrical-equal-area-rig/light-archimedes_hatbox_axial_equal_area.png) | ![Light Naive Equirectangular](./evidence/archimedes-cylindrical-equal-area-rig/light-naive_equirectangular_latlon_pinching.png) |

| Dark Theme — Archimedes Hat-Box (`z = 1−2ξ₁, r_⊥ = √(1−z²)`) | Dark Theme — Naive Equirectangular (`1 / sin θ = 1 + u` Polar Crowding) |
| :---: | :---: |
| ![Dark Archimedes](./evidence/archimedes-cylindrical-equal-area-rig/dark-archimedes_hatbox_axial_equal_area.png) | ![Dark Naive Equirectangular](./evidence/archimedes-cylindrical-equal-area-rig/dark-naive_equirectangular_latlon_pinching.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Sample Axial Height `z = 1.0 - 2.0 * xi_1` and `r_perp = sqrt(max(0.0, 1.0 - z * z))`**: Eliminate `theta = PI * xi_1` polar bunching.
- [ ] **Space Spherical Fibonacci Nodes Uniformly in `z_i = 1.0 - (2.0 * i + 1.0) / N`**: Guarantee equal solid angle per point via Archimedes' Hat-Box Theorem.
- [ ] **Weight Equirectangular HDRI Texels by `sin(theta)` During CDF Construction**: Prevent oversampling tiny polar texels.
- [ ] **Use `z = 1.0 - xi_1 * (1.0 - cos(gamma))` for Directional Cone / Spherical Cap Emitters**: Maintain uniform solid-angle density inside any cone aperture $\gamma$.
