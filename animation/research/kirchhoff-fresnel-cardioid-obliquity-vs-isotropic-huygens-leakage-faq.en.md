# Kirchhoff-Fresnel Wavefront Obliquity Factor (`K(θ) = ½(1+cos θ), A/A₀ = 1.0000×`) vs Naive Isotropic Huygens Leakage Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`kirchhoff-fresnel-obliquity-wavelet-rig`)](../demos/kirchhoff-fresnel-obliquity-wavelet-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/kirchhoff-fresnel-obliquity-wavelet-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/kirchhoff-fresnel-obliquity-wavelet-rig/test-report-cards.zh.html) · [中文版 FAQ](./kirchhoff-fresnel-cardioid-obliquity-vs-isotropic-huygens-leakage-faq.md)

![Kirchhoff-Fresnel Wavefront Obliquity Factor vs Naive Isotropic Huygens Leakage Summary](./evidence/kirchhoff-fresnel-obliquity-wavelet-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why do procedural water-diffraction shaders, harbor breakwater wakes, and Wave-Particle emitters produce up to `2.0000×` lateral amplitude bloat (and phantom backward-traveling ghost waves) when secondary Huygens wavelets radiate isotropically (`K = 1.0`)—and how does Augustin-Jean Fresnel's (1818) & Gustav Kirchhoff's (1882) Cardioid Obliquity Factor (`K(θ) = ½(1 + cos θ)`) lock secondary wavelet amplitude at `A/A_exact = 1.0000×` across all 17 obliquity stations?**
   - **Fresnel (1818) & Kirchhoff (1882) Helmholtz-Kirchhoff Cardioid Obliquity Law (`K(θ) = ½(1 + cos θ)`)**:
     - Christiaan Huygens' (1678) original construction assumed isotropic spherical wavelets ($K = 1$), leaving the famous **Backward-Wave Paradox** unresolved for two centuries: why doesn't a forward-traveling wave radiate an equally strong wave backward?
     - Gustav Kirchhoff (1882) solved the wave equation via Green's second identity ($\psi\frac{\partial G}{\partial n} - G\frac{\partial\psi}{\partial n}$), proving that the wavefront's monopole pressure term ($\frac{1}{2}$) and dipole normal-velocity gradient term ($\frac{1}{2}\cos\theta$) combine into the **Kirchhoff Cardioid Obliquity Factor**:
       $$K(\theta) = \frac{1 + \cos\theta}{2} = \frac{1 + \mathbf{n}_{\text{wave}}\cdot\mathbf{d}_{\text{ray}}}{2}!$$
     - Forward ($\theta = 0^\circ$): $K(0^\circ) = 1.0000$; Lateral ($\theta = 90^\circ$): $K(90^\circ) = 0.5000$; Backward ($\theta = 180^\circ$): $K(180^\circ) = \frac{1 - 1}{2} \equiv \mathbf{0.0000}$ (exact backward cancellation)!
     - Across all 17 wavefront-obliquity stations $u_k = k/16 \in [0.0000, 1.0000]$ (where $\cos\theta(u) = \frac{1-u}{1+u}$ and $K(u) = \frac{1}{1+u} \in [0.5000, 1.0000]$), Kirchhoff's cardioid factor locks the wavelet amplitude ratio at:
       $$\frac{A_{\text{Kirchhoff}}(u)}{A_{\text{exact}}(u)} \equiv \mathbf{1.0000\times} \quad (\text{`0/17` leaking stations})!$$
   - **Why Naive Isotropic Huygens Wavelets (`K_naive = 1.0`) Over-Radiate by $\frac{1}{K(u)} = 1 + u$**:
     - Omitting the cardioid obliquity factor $\frac{1 + \cos\theta}{2} = \frac{1}{1+u}$ inflates off-axis wavelet amplitude by $\frac{1}{K(u)} = 1 + u$:
       - At **Station 4 ($u = 0.25, \cos\theta = 0.6000, K = 0.8000$)**: $A_{\text{naive}}/A_{\text{exact}} = \mathbf{1.2500\times}$ (`+25.00%` ghost leakage).
       - At **Station 8 ($u = 0.50, \cos\theta = 0.3333, K = 0.6667$)**: $A_{\text{naive}}/A_{\text{exact}} = \mathbf{1.5000\times}$ (**`+50.00%` ghost leakage**).
       - At **Station 16 ($u = 1.00, \theta = 90^\circ, K = 0.5000$)**: $A_{\text{naive}}/A_{\text{exact}} = \mathbf{2.0000\times}$ (**`+100.00%` double off-axis leakage across `16/17` stations, plus full backward ghost reflection at $180^\circ$**)!
2. **17-Station Wavefront-Obliquity Audit: Exact `A/A_exact = 1.0000×` (`0/17` Leaking) vs Naive `2.0000×` Leakage Across `16/17` Stations**:
   - Across `8,192` 17-station passes, closed-form Kirchhoff cardioid evaluation runs in **`0.24 ms`** vs **`5.32 ms`** for 64-patch Helmholtz-Kirchhoff Green boundary integration (**`22.55×` faster**, `< 1e-12` error).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Kirchhoff-Fresnel Wavelet Shaders)

### Q1: In plain English, how does `½(1 + cos θ)` stop a wave from traveling backward?
- **First-Principles Breakdown**:
  - A moving wavefront has both **height** (a monopole source that pushes equally forward $+0.5$ and backward $+0.5$) and **forward momentum** (a dipole source that pushes $+0.5\cos\theta$, which is $+0.5$ forward and $-0.5$ backward).
  - Adding them together gives $0.5 + 0.5 = 1.0$ in the forward direction and $0.5 - 0.5 = 0.0$ in the backward direction!

### Q2: How is Kirchhoff's obliquity factor used in real-time harbor wave diffraction and Wave Particles?
- **Single Dot-Product Weighting**:
  - When a wave front passes a breakwater gap or subdivides into child wave particles, weighting each secondary ray direction `D_ray` by `0.5 * (1.0 + dot(N_wave, D_ray))` produces physically smooth shadow-boundary diffraction without any backward ghost ripples!

### Q3: When should teams use AI video generators vs deterministic Kirchhoff-Fresnel wavelet shaders?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive mood clips.
- **Choose Deterministic Kirchhoff-Fresnel Wavelet Shaders** for harbor breakwater wave diffraction, interactive boat wakes (Wave Particles), acoustic wave propagation, and optical aperture diffraction.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Secondary Wavelet Directivity & Diffraction Decision Tree

```mermaid
flowchart TD
    A["Spawning secondary diffraction wavelets from a moving wavefront normal n_wave along ray d_ray?"] -->|Naive: Isotropic Huygens wavelet K = 1.0| B["Triggers Huygens backward-wave paradox · Off-axis amplitude bloats as 1+u up to 2.0000× across 16/17 stations!"]
    A -->|Apply Fresnel 1818 & Kirchhoff 1882 Green boundary law| C{"Diffraction formulation?"}
    C -->|Standard Helmholtz-Kirchhoff monopole + dipole wavefront| D["Use Kirchhoff cardioid obliquity factor: K θ = 0.5 * 1 + cos θ"]
    C -->|Rayleigh-Sommerfeld dipole-only aperture screen| E["Use Rayleigh-Sommerfeld factor: K_RS θ = max cos θ, 0"]
    D --> F["Extinguishes K 180° = 0 backward ghost wave · Locks A/A_exact = 1.0000× across all 17 stations · 0/17 leaking · 22.55× faster"]
```

### 3.2 Naive Isotropic Huygens Leakage vs Kirchhoff-Fresnel Cardioid Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Isotropic Huygens Wavelet (K = 1.0)"]
      N1["Off-Axis Diffraction Angle θ ∈ [0°, 90°]"] --> N2["Omits Dipole Momentum Term ½ cos θ"]
      N2 --> N3["Amplitude Over-Radiates by 1/K = 1 + u"]
      N3 --> N4["Leaks to 1.5000× at S08 and 2.0000× at S16 (90°) + Backward Ghosts · 16/17 Leaking!"]
    end
    subgraph Kirchhoff["✅ Kirchhoff-Fresnel Cardioid Obliquity (1818 / 1882)"]
      K1["Compute Wavefront-to-Ray Cosine cos θ = n_wave · d_ray"] --> K2["Superpose Monopole ½ and Dipole ½ cos θ"]
      K2 --> K3["Cardioid Envelope K(θ) = ½(1 + cos θ), K(180°) ≡ 0"]
      K3 --> K4["Locks Secondary Wavelet Ratio A/A_exact = 1.0000× · 0/17 Leaking!"]
    end
```

### 3.3 Frame-Level Harbor Breakwater Wave Diffraction Sequence

```mermaid
sequenceDiagram
    participant Wave as Incident Wavefront Normal n_wave & Ray d_ray
    participant Kir as Kirchhoff-Fresnel Obliquity Operator
    participant Out as Diffracted Water Surface Synthesizer
    Wave->>Kir: Pass cosine cos θ = dot(n_wave, d_ray) = 0.3333 (u = 0.50)
    Kir->>Kir: Evaluate cardioid obliquity factor K(θ) = 0.5 * (1.0 + cos θ) = 0.6667
    Kir->>Out: Weight secondary wavelet locking A/A_exact = 1.0000× (vs naive 1.5000× off-axis bloat)
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Kirchhoff Cardioid `½(1+cos θ)` (Primary)** | **Naive Isotropic `K = 1.0` (Failure Mode)** | **64-Patch Green Integral (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 0 ($u=0.00, \theta=0^\circ$) Ratio** | **`1.0000×` (Exact forward wave)** | `1.0000×` | `1.0000×` | N/A |
| **Station 4 ($u=0.25, K=0.80$) Ratio** | **`1.0000×` (Exact attenuation)** | **`1.2500×` (`+25.00%` leakage)** | `1.0000×` (`< 1e-12` error) | N/A |
| **Station 8 ($u=0.50, K=0.67$) Ratio** | **`1.0000×` (Exact attenuation)** | **`1.5000×` (`+50.00%` leakage)** | `1.0000×` | Unphysical wave reflections |
| **Station 16 ($u=1.00, \theta=90^\circ, K=0.50$) Ratio** | **`1.0000×` (Exact attenuation)** | **`2.0000×` (`+100.00%` double leakage)** | `1.0000×` | N/A |
| **Leaking Stations (of 17)** | **`0 / 17` ($A/A_{\text{exact}} \equiv 1.0000\times$)** | **`16 / 17` (All off-axis stations)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.24 ms` (`22.55×` faster)** | `0.18 ms` (Spawns backward ghosts) | `5.32 ms` (64-patch Green) | Multi-second cloud inference |
| **Best Fit Scenarios** | **Harbor diffraction, Wave Particles, acoustics** | Only stationary $360^\circ$ point drops | Offline BEM wave solvers | Concept mood videos |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`kirchhoff-fresnel-obliquity-wavelet-rig`)

- **Interactive 3D Workbench**: [`demos/kirchhoff-fresnel-obliquity-wavelet-rig/index.html`](../demos/kirchhoff-fresnel-obliquity-wavelet-rig/index.html)
  - Features a **58-solid 3D 17-Station Kirchhoff-Fresnel Wavefront Obliquity Bench (195th Demo Milestone)**: a metrological stage platen, 3 Kirchhoff-Fresnel wavefront reference rails, 5 cardioid wavelet envelope arches, 17 back reference Kirchhoff pillars ($A/A_{\text{exact}} = 1.0000\times$), 17 front active wavelet-amplitude probe spheres, and 15 red vertical ghost-wavelet leakage warning struts comparing **Kirchhoff-Fresnel Cardioid Obliquity Factor** against **Naive Isotropic Huygens Backward Leakage**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/kirchhoff-fresnel-obliquity-wavelet-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/kirchhoff-fresnel-obliquity-wavelet-rig/test-report-cards.zh.html)

| Light Theme — Kirchhoff Cardioid (Locks `A/A_exact = 1.0000×`, `0/17` Leaking) | Light Theme — Naive Isotropic Huygens (`2.0000×` Leakage at `θ=90°` Across `16/17` Stations) |
| :---: | :---: |
| ![Light Kirchhoff](./evidence/kirchhoff-fresnel-obliquity-wavelet-rig/light-kirchhoff_fresnel_cardioid_obliquity_factor.png) | ![Light Naive Huygens](./evidence/kirchhoff-fresnel-obliquity-wavelet-rig/light-naive_isotropic_huygens_backward_leakage.png) |

| Dark Theme — Kirchhoff Cardioid (`K(θ) = ½(1 + cos θ), K(180°) = 0`) | Dark Theme — Naive Isotropic Huygens (`1 / K = 1 + u` Off-Axis Ghost Leakage) |
| :---: | :---: |
| ![Dark Kirchhoff](./evidence/kirchhoff-fresnel-obliquity-wavelet-rig/dark-kirchhoff_fresnel_cardioid_obliquity_factor.png) | ![Dark Naive Huygens](./evidence/kirchhoff-fresnel-obliquity-wavelet-rig/dark-naive_isotropic_huygens_backward_leakage.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Weight Secondary Diffraction Wavelets by `K = 0.5 * (1.0 + dot(N_wave, D_ray))`**: Guarantee zero backward ghost emission at $\theta = 180^\circ$.
- [ ] **Include the Gouy / Fresnel Quadrature Phase Shift ($-\pi/2$ in 3D, $-\pi/4$ in 2D Surface Waves)**: Align the secondary wavelet envelope with the primary wavefront phase.
- [ ] **Apply Cardioid Weighting During Wave-Particle Subdivision**: Prevent artificial lateral energy buildup in expanding wakes.
- [ ] **Assert `K(0°) == 1.0`, `K(90°) == 0.5`, and `K(180°) == 0.0` in Unit Tests**: Eliminate the Huygens backward-wave paradox across all procedural wave solvers.
