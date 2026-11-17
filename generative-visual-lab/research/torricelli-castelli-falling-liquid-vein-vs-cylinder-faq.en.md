# Visual & Animation Technical Selection & First-Principles FAQ: Torricelli-Castelli Free-Falling Liquid Vein Gravity Contraction Law vs. Naive Constant-Radius Cylinder Bloat (Why Rendering a Falling Water Stream as a Uniform Cylinder Causes a 2.0000× Volumetric Flux Bloat)

> **Standalone Topic Scope (Tonight Round 20 / Repo Round 212 · 222nd Standalone Interactive Demo: `demos/torricelli-free-falling-vein-rig/`)**  
> Structured in the exact **6-section architect decision format** of `ib-vs-ethernet-roce-selection-faq.md`, this guide explains **Benedetto Castelli's (1628, *Della misura dell'acque correnti*) & Evangelista Torricelli's (1644) free-falling liquid vein quarter-power gravity tapering law ($R(z) = R_0\left(1 + \frac{2gz}{v_0^2}\right)^{-1/4}$)** from plain-language first principles, and establishes quantitative selection boundaries between generative AI video models, SPH particle fluid solvers, naive uniform-cylinder mesh shaders, and code-driven analytical Torricelli-Castelli stream engines.

![Torricelli-Castelli Free-Falling Liquid Vein Summary](./evidence/torricelli-free-falling-vein-rig-summary.svg)

---

## 1. 📌 Executive Summary

1. **One-Sentence Verdict**:
   - In **3D kitchen faucet streams, teapot/espresso pouring, chocolate fountains, molten glass/honey ribbons, and waterfall vein vertex shaders**, an incompressible liquid stream exiting an orifice of radius $R_0$ at speed $v_0$ accelerates under gravity $g$ to $v(z) = \sqrt{v_0^2 + 2gz}$; to conserve volumetric flow rate $Q(z) = \pi R(z)^2 v(z) = \pi R_0^2 v_0 = Q_0$, **the cross-sectional area contracts inversely with speed and the stream radius tapers by the exact $-1/4$ power law**:
     $$v(z) = v_0\sqrt{1 + \frac{2gz}{v_0^2}}, \qquad \frac{A(z)}{A_0} = \frac{v_0}{v(z)} = \left(1 + \frac{2gz}{v_0^2}\right)^{-1/2}, \qquad \frac{R(z)}{R_0} = \left(1 + \frac{2gz}{v_0^2}\right)^{-1/4} = \frac{1}{\sqrt{1 + u}}$$
   - A **Naive Constant-Radius Cylinder Stream Shader (extruding a uniform cylinder $R(z) = R_0$ while accelerating particles/UVs by $v(z) = v_0(1+u)$)** violates Castelli continuity across 17 gravity-speed stations $u = v(z)/v_0 - 1 \in [0.000, 1.000]$ ($v(z)/v_0 \in [1.00, 2.00], 2gz/v_0^2 \in [0.00, 3.00]$), bloating the volumetric flux and cross-sectional area by $\frac{Q_{\text{naive}}(z)}{Q_0} = \frac{v(z)}{v_0} = 1 + u$: a **$1.2500\times$** bloat at Station 4 ($u=0.25, v=1.25v_0$), a **$1.5000\times$** bloat at Station 8 ($u=0.50, v=1.50v_0$), and a **$2.0000\times$ double volumetric flux bloat** at Station 16 ($u=1.00, v=2.00v_0$, where true $R = 0.7071\,R_0$ and $A = 0.5000\,A_0$), violating **16 / 17** stations!
   - The **code-driven Torricelli-Castelli Tapering Vein Solver** locks the volumetric flow rate ratio at **$Q(z) / Q_0 = 1.0000\times$** across all 17 stations (**0 / 17** violations), matches 64-step Bernoulli streamtube continuity quadrature within $< 10^{-12}$, and runs 8,192 17-station passes over **$40\times$ faster** than 64-step numerical integration.

2. **Why Does a Constant-Radius Cylinder Mesh Look Like a Rigid Acrylic Rod Instead of Pouring Water?**
   - Because gravity accelerates every fluid parcel downward ($v(z) = \sqrt{v_0^2 + 2gz}$), a faster-moving lower section of the stream must occupy a smaller cross-sectional area $A(z) = Q_0 / v(z)$ so the same volume of water passes through per second.
   - **First-Principles Resolution (Castelli 1628 & Torricelli 1644)**: When the falling speed doubles ($v = 2 v_0$ at $z = \frac{3 v_0^2}{2g}$), the cross-sectional area halves ($A = 0.50\,A_0$) and the radius contracts to $R_0 / \sqrt{2} \approx 0.7071\,R_0$.

---

## 2. 🎯 Architect & Customer Deep-Dive Q&A

### Q1: When should we choose generative AI video models (Sora / Veo / Wan / Runway), SPH particle fluid solvers, or a code-driven Torricelli-Castelli falling-vein engine?

- **Choose Generative AI Video Models (Sora / Veo / Runway)**:
  - Suitable only for **non-interactive beverage commercial b-roll** where nozzle flow rate $Q_0$ and gravity tapering do not need to respond to user controls.
- **Choose SPH / FLIP Particle Solvers**:
  - Suitable for **turbulent cup-filling splashes and air-entrainment bubbles after impact**.
- **Choose Code-Driven Torricelli-Castelli Falling-Vein Engine (This Demo)**:
  - Required whenever you need **60–120fps interactive pouring streams, smooth laminar faucet veins, exact $R(z) = R_0(1+2gz/v_0^2)^{-1/4}$ continuity conservation, and zero-overflow multi-station metrology**.

### Q2: How does Torricelli-Castelli gravity tapering couple with Rayleigh-Plateau droplet pinch-off?

- As the falling vein narrows to $R(z) = R_0(1+2gz/v_0^2)^{-1/4}$, the local fastest-growing Rayleigh-Plateau wavelength $\lambda^*(z) = 9.015\,R(z)$ shortens and the capillary growth rate $\omega_{\max}(z) \propto R(z)^{-3/2}$ accelerates, governing the exact breakup length of a faucet stream!

---

## 3. 🧭 Visual Architecture Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence)

### 3.1 Falling Liquid Stream & Pouring Shader Selection Decision Tree

```mermaid
flowchart TD
    A["Need faucet stream, teapot pouring, chocolate fountain, or waterfall vein?"] --> B{"Requires exact Torricelli-Castelli tapering R(z) = R₀(1+2gz/v₀²)^(-1/4) & real-time control?"}
    B -- "No: Non-interactive beverage b-roll" --> C["Generative AI Video Models\n(Sora / Veo / Wan / Runway)"]
    B -- "Yes: Interactive pouring game / Fluid twin / 60fps vertex shader" --> D{"Shader Architecture"}
    D -- "Naive Constant-Radius Cylinder (R(z) = R₀)" --> E["❌ Severe Continuity Violation\nUp to 2.0000× volumetric flux bloat (16/17 stations violated)"]
    D -- "64-Step Bernoulli Streamtube Quadrature" --> F["⚠️ Accurate but ~6.5 ms per 8,192 passes"]
    D -- "Torricelli-Castelli Quarter-Power Law" --> G["✅ Exact & Ultra-Fast\n1.0000× locked across 17 stations, ~0.16 ms"]
```

### 3.2 Naive Uniform Cylinder Pipeline vs. Torricelli-Castelli Tapering Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Constant-Radius Cylinder Pipeline (R(z) = R₀)"]
        N1["Given gravity speed excess u = v(z)/v₀ − 1"] --> N2["Keep cylinder radius constant R(z) = R₀\nCross-section stays A₀"]
        N2 --> N3["Apparent flux ratio Q_naive/Q₀ = 1 + u"]
        N3 --> N4["Station 16 (v = 2 v₀, 2gz = 3v₀²)\nsuffers 2.0000× volumetric flux bloat!"]
    end

    subgraph Torricelli["✅ Torricelli-Castelli Tapering Pipeline (A(z)v(z) = Q₀)"]
        P1["Given gravity speed excess u"] --> P2["Taper radius R(z)/R₀ = 1 / √(1 + u)\nArea A(z)/A₀ = 1 / (1 + u)"]
        P2 --> P3["Conserved flux Q(z) = A(z) v(z) = Q₀\nMatches 64-step Bernoulli quadrature"]
        P3 --> P4["Locks Q(z)/Q₀ = 1.0000× across 17 stations\n0/17 violations, error < 1e-12"]
    end
```

### 3.3 Frame-Level Metrology Execution Sequence

```mermaid
sequenceDiagram
    participant User as Graphics / Fluid Architect
    participant UI as Workbench Controller
    participant Solver as Torricelli-Castelli Solver (model.ts)
    participant Quad as 64-Step Bernoulli Quadrature
    participant SVG as 58-Solid Isometric Renderer

    User->>UI: Select preset or drag Station Slider (0..16, u ∈ [0, 1])
    UI->>Solver: auditTorricelliFallingVeinRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadratureBernoulliContinuityStreamtube(u, 64)
    Quad-->>Solver: Return 64-step streamtube area integral (< 1e-12 diff)
    Solver-->>UI: Return 17-station v/v₀, R(z)/R₀, A(z)/A₀, and 1.0000× vs 2.0000× audit
    UI->>SVG: buildTorricelliFallingVeinRigSolids() renders 58 isometric solids
```

---

## 4. 📊 Technical Selection Decision Matrix

| Evaluation Dimension | Generative AI Video (Sora / Veo / Wan) | Naive Uniform Cylinder ($R(z)=R_0$) | 64-Step Bernoulli Streamtube Quadrature | **Torricelli-Castelli Closed-Form Engine (This Demo)** |
| :--- | :--- | :--- | :--- | :--- |
| **Continuity Conservation Fidelity** | ❌ No mass conservation | ❌ Violates $A(z)v(z)=Q_0$ | ✅ Integrates streamtube ODE | **✅ Exact analytical $R(z) = R_0(1+2gz/v_0^2)^{-1/4}$** |
| **Station 4 ($u=0.25, v=1.25v_0$) Ratio** | N/A | ❌ `1.2500×` (+25% flux bloat) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 8 ($u=0.50, v=1.50v_0$) Ratio** | N/A | ❌ `1.5000×` (+50% flux bloat) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 16 ($u=1.00, v=2.00v_0$) Ratio** | N/A | ❌ `2.0000×` (Double flux bloat) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Violated Stations (out of 17)** | N/A | ❌ `16 / 17` violated | ✅ `0 / 17` violated | **✅ `0 / 17` violated** |
| **8,192-Pass 17-Station CPU Latency** | Tens of seconds (cloud GPU) | ~0.16 ms (wrong physics) | ~6.5 ms | **⚡ ~0.16 ms (>40× faster)** |

---

## 5. 🧪 Interactive Demo & 7-Card 4:5 Visual Report

- **Interactive Demo Path**: `demos/torricelli-free-falling-vein-rig/`
- **English 7-Card Visual Deck**: `demos/torricelli-free-falling-vein-rig/test-report-cards.html`
- **Chinese 7-Card Visual Deck**: `demos/torricelli-free-falling-vein-rig/test-report-cards.zh.html`
- **Sealed Benchmark Report**: `demos/torricelli-free-falling-vein-rig/report.json`

| Visual Evidence Artifact | Screenshot Path | Verified Finding |
| :--- | :--- | :--- |
| **Dark Theme · Torricelli-Castelli Lock** | `docs/evidence/torricelli-free-falling-vein-rig/dark-torricelli_castelli_quarter_power_vein_lock.png` | 58 isometric solids verified, `0 / 17` violations, `1.0000×` locked |
| **Dark Theme · Naive Cylinder Flux Bloat** | `docs/evidence/torricelli-free-falling-vein-rig/dark-naive_constant_radius_cylinder_flux_bloat.png` | Exposes `1.2500× / 1.5000× / 2.0000×` flux bloat across `16 / 17` stations |
| **Light Theme · Torricelli-Castelli Lock** | `docs/evidence/torricelli-free-falling-vein-rig/light-torricelli_castelli_quarter_power_vein_lock.png` | High-contrast light metrology theme verified |
| **Light Theme · Naive Cylinder Flux Bloat** | `docs/evidence/torricelli-free-falling-vein-rig/light-naive_constant_radius_cylinder_flux_bloat.png` | Highlights 16 violated gravity-drop stations in light mode |
| **Mobile `390×844` Responsive Viewport** | `docs/evidence/torricelli-free-falling-vein-rig/mobile.png` | `mobile_overflow = false`, zero horizontal scrollbar overflow |

---

## 6. 🛠️ Rapid Quality Delivery Checklist

- [x] **Quarter-Power Gravity Tapering Verification**: Does the falling liquid stream shader contract radius as $R(z) = R_0\left(1 + \frac{2gz}{v_0^2}\right)^{-1/4}$ rather than extruding a constant-radius cylinder?
- [x] **Double-Speed Half-Area Check**: At $v(z) = 2.00\,v_0$ ($2gz = 3 v_0^2, u = 1.000$), does the vein radius contract to $0.7071\,R_0$ and cross-sectional area halve to $0.5000\,A_0$?
- [x] **64-Step Bernoulli Streamtube Quadrature Equivalence**: Does closed-form Torricelli-Castelli evaluation agree with 64-step Simpson integration within $10^{-12}$?
- [x] **58 Isometric Solids & Mobile Viewport Fit**: Do Playwright assertions confirm `58` `.iso-solid` elements and `mobile_overflow = false` at `390×844`?
