# Visual & Animation Technical Selection & First-Principles FAQ: Lorentz-Larmor Magnetic Helix Gyroradius Law vs. Naive Fixed-Radius Helix Overshoot (Why Spiraling Charged Particles with a Constant Radius Causes a 2.0000× Gyroradius Overshoot at $2B_0$)

> **Standalone Topic Scope (Tonight Round 24 / Repo Round 216 · 226th Standalone Interactive Demo: `demos/lorentz-cyclotron-gyroradius-rig/`)**  
> Structured in the exact **6-section architect decision format** of `ib-vs-ethernet-roce-selection-faq.md`, this guide explains **Hendrik Lorentz's (1895), Joseph Larmor's (1897), and Ernest O. Lawrence's (1930) magnetic cyclotron centripetal balance and inverse-$B$ gyroradius law ($r_L = \frac{m v_\perp}{|q| B}, \omega_c = \frac{|q| B}{m}$)** from plain-language first principles, and establishes quantitative selection boundaries between generative AI video models, 6D Particle-in-Cell (PIC) plasma solvers, naive constant-radius helix shaders, and code-driven analytical Lorentz-Larmor guiding-center engines.

![Lorentz-Cyclotron Magnetic Helix Gyroradius Summary](./evidence/lorentz-cyclotron-gyroradius-rig-summary.svg)

---

## 1. 📌 Executive Summary

1. **One-Sentence Verdict**:
   - In **3D aurora borealis polar curtains, tokamak fusion plasma confinement rings, solar coronal loops, and sci-fi ion-thruster particle beams**, a charged particle of mass $m$, charge $q$, and perpendicular speed $v_\perp$ gyrating in a magnetic field $B$ balances the Lorentz magnetic force $|q| v_\perp B$ against the centripetal force $\frac{m v_\perp^2}{r_L}$; **thus the Larmor gyroradius $r_L$ contracts inversely with magnetic flux density $B$, while the cyclotron angular frequency $\omega_c$ grows linearly with $B$**:
     $$|q|\,v_\perp B = \frac{m\,v_\perp^2}{r_L} \implies r_L(B) = \frac{m\,v_\perp}{|q|\,B} = \frac{r_{L,0}}{B / B_0} = \frac{r_{L,0}}{1 + u}, \qquad \omega_c(B) = \frac{|q|\,B}{m} = \omega_{c,0}(1 + u)$$
   - A **Naive Fixed-Radius Helix Shader (spiraling particles along converging field lines with a constant radius $r = r_{L,0}$ regardless of $B(u) = B_0(1+u)$)** overshoots the true Larmor gyroradius across 17 magnetic-field stations $u = B/B_0 - 1 \in [0.000, 1.000]$ ($B/B_0 \in [1.00, 2.00]$) by $\frac{r_{\text{naive}}}{r_L(u)} = \frac{B(u)}{B_0} = 1 + u$: a **$1.2500\times$** overshoot at Station 4 ($u=0.25, B=1.25B_0$), a **$1.5000\times$** overshoot at Station 8 ($u=0.50, B=1.50B_0$), and a **$2.0000\times$ double gyroradius overshoot ($4.0000\times$ orbital area bloat)** at Station 16 ($u=1.00, B=2.00B_0$, where true $r_L = 0.5000\,r_{L,0}$), violating **16 / 17** stations!
   - The **code-driven Lorentz-Larmor Gyroradius Solver** locks the gyroradius ratio at **$r_{\text{active}} / r_L = 1.0000\times$** across all 17 stations (**0 / 17** violations), matches 64-sector cyclotron $\mathbf{v} \times \mathbf{B}$ orbit quadrature within $< 10^{-12}$, and runs 8,192 17-station passes roughly **$40\times$ faster** than 64-sector numerical integration.

2. **Why Do Naive Particle Beams Look Like Rigid Coiled Springs Instead of Tightening Into High-Frequency Spirals in Strong Magnetic Fields?**
   - Hardcoding a constant helix radius $R_0 \cos(\omega_0 t)$ ignores the fact that stronger magnetic field regions exert a proportionally stronger inward Lorentz force $|q| v_\perp B$.
   - **First-Principles Resolution (Lorentz 1895 & Larmor 1897)**: Doubling the magnetic field $B = 2 B_0$ doubles the centripetal acceleration, tightening the Larmor radius in half ($r_L = 0.50\,r_{L,0}$) and doubling the gyrofrequency ($\omega_c = 2\omega_{c,0}$).

---

## 2. 🎯 Architect & Customer Deep-Dive Q&A

### Q1: When should we choose generative AI video models (Sora / Veo / Wan / Runway), 6D Particle-in-Cell (PIC) solvers, or a code-driven Lorentz-Larmor guiding-center engine?

- **Choose Generative AI Video Models (Sora / Veo / Runway)**:
  - Suitable only for **non-interactive stylized space light-show b-roll** where magnetic field topology and Larmor radius scaling do not need to be physically accurate.
- **Choose 6D Relativistic Particle-in-Cell (PIC + Boris Pusher)**:
  - Suitable for **offline supercomputer simulations of self-consistent plasma waves and magnetic reconnection**.
- **Choose Code-Driven Lorentz-Larmor Guiding-Center Engine (This Demo)**:
  - Required whenever you need **60–120fps interactive tokamak digital twins, space-weather magnetosphere visualizers, auroral particle shaders, exact $r_L = \frac{m v_\perp}{|q| B}$ scaling, and zero-overflow multi-station metrology**.

### Q2: Why must explicit Euler never be used to integrate $\frac{d\mathbf{v}}{dt} = \frac{q}{m}(\mathbf{v} \times \mathbf{B})$ directly?

- Because explicit Euler steps tangentially outward on the velocity circle, amplifying speed and gyroradius by $\sqrt{1 + (\omega_c \Delta t)^2} > 1$ every frame! Using closed-form guiding-center Larmor phase $\theta(t) = \int \omega_c\,dt$ or the volume-preserving Boris pusher guarantees zero artificial energy drift.

---

## 3. 🧭 Visual Architecture Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence)

### 3.1 Magnetized Particle Helix & Plasma Visualization Selection Decision Tree

```mermaid
flowchart TD
    A["Need aurora curtain, tokamak plasma ring, or coronal loop helix animation?"] --> B{"Requires exact Lorentz-Larmor law r_L = mv_⊥/(|q|B) & real-time control?"}
    B -- "No: Non-interactive space b-roll" --> C["Generative AI Video Models\n(Sora / Veo / Wan / Runway)"]
    B -- "Yes: Fusion digital twin / Space-weather viewer / 60fps shader" --> D{"Solver Architecture"}
    D -- "Naive Fixed-Radius Helix (r = r_L0)" --> E["❌ Severe Gyroradius Overshoot\nUp to 2.0000× radius error at B=2B₀ (16/17 stations violated)"]
    D -- "64-Sector Cyclotron Orbit Quadrature" --> F["⚠️ Accurate but ~6.4 ms per 8,192 passes"]
    D -- "Lorentz-Larmor Closed-Form Inverse-B Law" --> G["✅ Exact & Ultra-Fast\n1.0000× locked across 17 stations, ~0.16 ms"]
```

### 3.2 Naive Fixed-Helix Pipeline vs. Lorentz-Larmor Gyroradius Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Fixed-Radius Helix Pipeline (r = r_L0)"]
        N1["Given magnetic convergence excess u = B/B₀ − 1"] --> N2["Ignore Lorentz centripetal pull |q|v_⊥B\nKeep helix radius constant at r_L0"]
        N2 --> N3["Overshoot ratio = B/B₀ = 1 + u"]
        N3 --> N4["Station 16 (B = 2 B₀)\nsuffers 2.0000× gyroradius overshoot!"]
    end

    subgraph Lorentz["✅ Lorentz-Larmor Gyroradius Pipeline (r_L = mv_⊥/(|q|B))"]
        P1["Given magnetic convergence excess u"] --> P2["Magnetic field & gyrofrequency B/B₀ = 1 + u"]
        P2 --> P3["Contract Larmor radius r_L = r_L0 / (1 + u)\nMatches 64-sector orbit quadrature"]
        P3 --> P4["Locks r_active/r_L = 1.0000× across 17 stations\n0/17 violations, error < 1e-12"]
    end
```

### 3.3 Frame-Level Metrology Execution Sequence

```mermaid
sequenceDiagram
    participant User as Plasma / VFX Architect
    participant UI as Workbench Controller
    participant Solver as Lorentz-Cyclotron Solver (model.ts)
    participant Quad as 64-Sector Orbit Quadrature
    participant SVG as 58-Solid Isometric Renderer

    User->>UI: Select preset or drag Station Slider (0..16, u ∈ [0, 1])
    UI->>Solver: auditLorentzCyclotronRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadratureCyclotronOrbitIntegral(u, 64)
    Quad-->>Solver: Return 64-sector cyclotron orbit integral (< 1e-12 diff)
    Solver-->>UI: Return 17-station B/B₀, r_L/r_L0, and 1.0000× vs 2.0000× audit
    UI->>SVG: buildLorentzCyclotronRigSolids() renders 58 isometric solids
```

---

## 4. 📊 Technical Selection Decision Matrix

| Evaluation Dimension | Generative AI Video (Sora / Veo / Wan) | Naive Fixed Helix ($r=r_{L,0}$) | 64-Sector Cyclotron Orbit Quadrature | **Lorentz-Larmor Closed-Form Engine (This Demo)** |
| :--- | :--- | :--- | :--- | :--- |
| **Lorentz Centripetal Fidelity** | ❌ No magnetic conservation | ❌ Ignores $1/B$ Larmor contraction | ✅ Integrates $\mathbf{v}\times\mathbf{B}$ orbit | **✅ Exact analytical $r_L = \frac{m v_\perp}{|q| B}$** |
| **Station 4 ($u=0.25, B=1.25B_0$) Ratio** | N/A | ❌ `1.2500×` (+25% overshoot) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 8 ($u=0.50, B=1.50B_0$) Ratio** | N/A | ❌ `1.5000×` (+50% overshoot) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 16 ($u=1.00, B=2.00B_0$) Ratio** | N/A | ❌ `2.0000×` (Double overshoot) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Violated Stations (out of 17)** | N/A | ❌ `16 / 17` violated | ✅ `0 / 17` violated | **✅ `0 / 17` violated** |
| **8,192-Pass 17-Station CPU Latency** | Tens of seconds (cloud GPU) | ~0.16 ms (wrong physics) | ~6.4 ms | **⚡ ~0.16 ms (~40× faster)** |

---

## 5. 🧪 Interactive Demo & 7-Card 4:5 Visual Report

- **Interactive Demo Path**: `demos/lorentz-cyclotron-gyroradius-rig/`
- **English 7-Card Visual Deck**: `demos/lorentz-cyclotron-gyroradius-rig/test-report-cards.html`
- **Chinese 7-Card Visual Deck**: `demos/lorentz-cyclotron-gyroradius-rig/test-report-cards.zh.html`
- **Sealed Benchmark Report**: `demos/lorentz-cyclotron-gyroradius-rig/report.json`

| Visual Evidence Artifact | Screenshot Path | Verified Finding |
| :--- | :--- | :--- |
| **Dark Theme · Lorentz-Larmor Lock** | `docs/evidence/lorentz-cyclotron-gyroradius-rig/dark-lorentz_larmor_inverse_b_gyroradius_lock.png` | 58 isometric solids verified, `0 / 17` violations, `1.0000×` locked |
| **Dark Theme · Naive Fixed Helix Overshoot** | `docs/evidence/lorentz-cyclotron-gyroradius-rig/dark-naive_fixed_radius_helix_overshoot.png` | Exposes `1.2500× / 1.5000× / 2.0000×` overshoot across `16 / 17` stations |
| **Light Theme · Lorentz-Larmor Lock** | `docs/evidence/lorentz-cyclotron-gyroradius-rig/light-lorentz_larmor_inverse_b_gyroradius_lock.png` | High-contrast light metrology theme verified |
| **Light Theme · Naive Fixed Helix Overshoot** | `docs/evidence/lorentz-cyclotron-gyroradius-rig/light-naive_fixed_radius_helix_overshoot.png` | Highlights 16 violated magnetic-field stations in light mode |
| **Mobile `390×844` Responsive Viewport** | `docs/evidence/lorentz-cyclotron-gyroradius-rig/mobile.png` | `mobile_overflow = false`, zero horizontal scrollbar overflow |

---

## 6. 🛠️ Rapid Quality Delivery Checklist

- [x] **Inverse-$B$ Larmor Gyroradius Verification**: Does the magnetic particle shader contract helix radius as $r_L = \frac{m v_\perp}{|q| B} = \frac{r_{L,0}}{1+u}$ rather than keeping a constant helix radius?
- [x] **Double-Field Half-Radius Check**: At $B = 2.00\,B_0$ ($u = 1.000$), does the Larmor gyroradius contract to $0.5000\,r_{L,0}$?
- [x] **64-Sector Cyclotron Orbit Quadrature Equivalence**: Does closed-form Lorentz-Larmor evaluation agree with 64-sector Simpson orbit integration within $10^{-12}$?
- [x] **58 Isometric Solids & Mobile Viewport Fit**: Do Playwright assertions confirm `58` `.iso-solid` elements and `mobile_overflow = false` at `390×844`?
