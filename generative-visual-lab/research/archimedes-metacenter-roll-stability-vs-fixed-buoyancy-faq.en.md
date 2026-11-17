# Visual & Animation Technical Selection & First-Principles FAQ: Archimedes-Bouguer Metacentric Hull Roll Stability Law vs. Naive Fixed Buoyancy Center Deficit (Why Pinning the Center of Buoyancy to a Hull Mesh Causes a 2.0000× Righting-Torque Deficit and False Capsizing)

> **Standalone Topic Scope (Tonight Round 15 / Repo Round 207 · 217th Standalone Interactive Demo: `demos/archimedes-metacenter-roll-stability-rig/`)**  
> Structured in the exact **6-section architect decision format** of `ib-vs-ethernet-roce-selection-faq.md`, this guide explains the **Archimedes (c. 250 BC, *On Floating Bodies*) & Pierre Bouguer (1746, *Traité du navire*, introducing the metacenter $M$ and metacentric radius $\overline{BM} = I_{\text{wp}} / \nabla$) naval hydrostatics roll righting law** from plain-language first principles, and establishes quantitative selection boundaries between generative AI video models, per-triangle hydrostatic mesh integration, naive fixed-buoyancy-point scripts, and code-driven analytical Archimedes-Bouguer metacentric engines.

![Archimedes-Bouguer Metacentric Hull Roll Stability Summary](./evidence/archimedes-metacenter-roll-stability-rig-summary.svg)

---

## 1. 📌 Executive Summary

1. **One-Sentence Verdict**:
   - In **3D sailing vessels, aircraft carriers, catamarans, wide-beam cargo barges, floating icebergs, and buoyant crate roll-oscillation animations**, when a floating hull heels by angle $\theta$, the newly immersed wedge on the leeward side and the emerged wedge on the windward side form a powerful hydrostatic couple that **shifts the center of buoyancy $B(\theta)$ laterally outward by $\Delta y_B = \overline{BM}\sin\theta$, intersecting the hull centerline at the metacenter $M$ with metacentric radius equal to the waterplane second moment of area $I_{\text{wp}}$ divided by displaced volume $\nabla$**:
     $$\overline{BM} = \frac{I_{\text{wp}}}{\nabla} = \frac{B^2}{12\,d}, \qquad \overline{GM} = \overline{KB} + \overline{BM} - \overline{KG}, \qquad \tau_{\text{righting}}(\theta) = \rho g \nabla \cdot \overline{GM}\,\sin\theta$$
   - A **Naive Fixed Buoyancy Center Model (pinning the buoyancy application point $B_0$ rigidly to the hull mesh and ignoring the waterplane wedge shift $\Delta\overline{BM}$)** underestimates the true restoring torque across 17 waterplane-stability stations $u = \overline{GM}/\overline{GM}_0 - 1 \in [0.000, 1.000]$ ($\overline{GM}/\overline{GM}_0 \in [1.00, 2.00]$) by $\frac{\tau_{\text{exact}}}{\tau_{\text{naive}}} = \frac{\overline{GM}(u)}{\overline{GM}_0} = 1 + u$: a **$1.2500\times$** deficit at Station 4 ($u=0.25$), a **$1.5000\times$** deficit at Station 8 ($u=0.50$), and a **$2.0000\times$ double righting-torque deficit** at Station 16 ($u=1.00$, $2\times$ metacentric height), violating **16 / 17** stations!
   - The **code-driven Archimedes-Bouguer Metacentric Solver** locks the righting-torque ratio at **$\tau_{\text{exact}} / \tau_{\text{model}} = 1.0000\times$** across all 17 stations (**0 / 17** violations), matches 64-strip immersed/emerged waterplane wedge quadrature within $< 10^{-12}$, and executes 8,192 17-station passes roughly **$40\times$ faster** than 64-strip numerical quadrature.

2. **Why Do Naive 3D Game Boats Capsize Unless Developers Artificially Hack the Center of Mass Underwater?**
   - In almost every real cargo ship, cruise liner, or wide-beam barge, the center of gravity $G$ lies near or above the waterline—**strictly higher than the static underwater geometric center of buoyancy $B_0$** ($\overline{KG} > \overline{KB}$).
   - If a shader or rigid-body script applies buoyancy at a single fixed point $B_0$ below $G$, any tiny heel angle $\theta > 0$ creates an overturning couple that flips the ship upside down! Game developers often work around this bug by hacking `rigidbody.centerOfMass` several meters below the keel, making the ship swing unnaturally like a submerged pendulum.
   - **First-Principles Resolution (Bouguer's 1746 Metacenter Theorem)**: Because a ship has beam width $B$, heeling submerges a wide wedge of water at distance $y \in [0, B/2]$ from the centerline. The area moment of inertia $I_{\text{wp}} = \frac{1}{12} L B^3$ shifts the buoyancy line outward so it acts through the **metacenter $M$** at height $\overline{BM} = I_{\text{wp}}/\nabla = B^2/(12d)$ above $B_0$. As long as $M$ lies above $G$ ($\overline{GM} > 0$), the ship rights itself powerfully without any fake underwater center-of-mass hack!

---

## 2. 🎯 Architect & Customer Deep-Dive Q&A

### Q1: When should we choose generative AI video models (Sora / Veo / Wan / Runway), per-triangle mesh pressure integration, or a code-driven Archimedes-Bouguer metacentric engine?

- **Choose Generative AI Video Models (Sora / Veo / Runway)**:
  - Suitable only for **non-interactive cinematic ocean b-roll** where naval hydrostatic stability ($\overline{GM}$) and roll period ($T_{\text{roll}} = 2\pi k_{xx}/\sqrt{g\,\overline{GM}}$) do not need to obey physical hull geometry.
- **Choose Per-Triangle Submerged Mesh Pressure Integration**:
  - Suitable for **damaged-hull flooding simulations, extreme deck-edge immersion ($\theta > 35^\circ$), or highly irregular floating debris**.
- **Choose Code-Driven Archimedes-Bouguer Metacentric Solver (This Demo)**:
  - Required whenever you need **60–120fps interactive hull stability design, real-time ocean vessel physics, exact $\overline{BM} = I_{\text{wp}}/\nabla$ waterplane righting torque, and zero-overflow multi-station metrology**.

### Q2: Why does doubling hull beam $B$ quadruple the metacentric radius $\overline{BM}$, whereas doubling ship length $L$ leaves transverse $\overline{BM}$ unchanged?

- For a rectangular waterplane of length $L$, beam $B$, and draft $d$:
  $$I_{\text{wp}} = \frac{1}{12} L B^3, \qquad \nabla = L B d \implies \overline{BM} = \frac{I_{\text{wp}}}{\nabla} = \frac{B^2}{12\,d}$$
- Length $L$ cancels out of transverse stability, while beam $B$ enters squared ($B^2$). Ignoring $I_{\text{wp}}/\nabla$ strips wide-beam ships and catamarans of their primary restoring mechanism.

---

## 3. 🧭 Visual Architecture Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence)

### 3.1 Naval Buoyancy & Roll Stability Selection Decision Tree

```mermaid
flowchart TD
    A["Need hull buoyancy, roll restoring torque, or naval stability animation?"] --> B{"Requires exact Bouguer metacentric law GM = KB + I_wp/∇ − KG & real-time control?"}
    B -- "No: Non-interactive sunset ocean backdrop" --> C["Generative AI Video Models\n(Sora / Veo / Wan / Runway)"]
    B -- "Yes: Naval simulator / Marine digital twin / 60fps ships" --> D{"Solver Architecture"}
    D -- "Naive Fixed Buoyancy Center B₀ (ΔBM = 0)" --> E["❌ Severe Capsizing / Torque Deficit\nUp to 2.0000× righting deficit (16/17 stations violated)"]
    D -- "64-Strip Waterplane Wedge Quadrature" --> F["⚠️ Accurate but ~7 ms per 8,192 passes"]
    D -- "Archimedes-Bouguer Closed-Form Metacenter" --> G["✅ Exact & Ultra-Fast\n1.0000× locked across 17 stations, ~0.18 ms"]
```

### 3.2 Naive Fixed-Buoyancy Pipeline vs. Archimedes-Bouguer Metacentric Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Fixed Buoyancy Center Pipeline (ΔBM = 0)"]
        N1["Given metacentric gain u"] --> N2["Pin buoyancy point at static B₀\nIgnore waterplane wedge shift BM = I_wp/∇"]
        N2 --> N3["Righting torque stays at baseline τ₀\nDeficit ratio = 1 + u"]
        N3 --> N4["Station 16 (GM = 2 GM₀)\nsuffers 2.0000× torque deficit!"]
    end

    subgraph Bouguer["✅ Archimedes-Bouguer Metacentric Pipeline (GM = KB + BM − KG)"]
        P1["Given metacentric gain u"] --> P2["Shift buoyancy by BM = I_wp / ∇\nGM(u) = GM₀(1 + u)"]
        P2 --> P3["Righting torque τ = ρg∇ GM(u) sinθ\nMatches 64-strip wedge quadrature"]
        P3 --> P4["Locks τ_exact/τ = 1.0000× across 17 stations\n0/17 violations, error < 1e-12"]
    end
```

### 3.3 Frame-Level Metrology Execution Sequence

```mermaid
sequenceDiagram
    participant User as Naval Architect / User
    participant UI as Workbench Controller
    participant Solver as Archimedes-Bouguer Solver (model.ts)
    participant Quad as 64-Strip Wedge Quadrature
    participant SVG as 58-Solid Isometric Renderer

    User->>UI: Select preset or drag Station Slider (0..16, u ∈ [0, 1])
    UI->>Solver: auditArchimedesMetacenterRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadratureWaterplaneWedgeTorque(u, 64)
    Quad-->>Solver: Return 64-strip immersed/emerged wedge moment integral (< 1e-12 diff)
    Solver-->>UI: Return 17-station GM/GM₀, righting arm, and 1.0000× vs 2.0000× audit
    UI->>SVG: buildArchimedesMetacenterRigSolids() renders 58 isometric solids
```

---

## 4. 📊 Technical Selection Decision Matrix

| Evaluation Dimension | Generative AI Video (Sora / Veo / Wan) | Naive Fixed Buoyancy Point ($\Delta\overline{BM}=0$) | 64-Strip Waterplane Wedge Quadrature | **Archimedes-Bouguer Closed-Form Engine (This Demo)** |
| :--- | :--- | :--- | :--- | :--- |
| **Hydrostatic Stability Fidelity** | ❌ No metacentric conservation | ❌ Ignores waterplane inertia $I_{\text{wp}}/\nabla$ | ✅ Numerically integrates wedge couple | **✅ Exact analytical $\overline{GM} = \overline{KB} + I_{\text{wp}}/\nabla - \overline{KG}$** |
| **Station 4 ($u=0.25, \overline{GM}=1.25\overline{GM}_0$) Ratio** | N/A | ❌ `1.2500×` (20% deficit) | ✅ `1.0000×` | **✅ `1.0000×` (Zero deficit)** |
| **Station 8 ($u=0.50, \overline{GM}=1.50\overline{GM}_0$) Ratio** | N/A | ❌ `1.5000×` (33.3% deficit) | ✅ `1.0000×` | **✅ `1.0000×` (Zero deficit)** |
| **Station 16 ($u=1.00, \overline{GM}=2.00\overline{GM}_0$) Ratio** | N/A | ❌ `2.0000×` (50% torque loss) | ✅ `1.0000×` | **✅ `1.0000×` (Zero deficit)** |
| **Violated Stations (out of 17)** | N/A | ❌ `16 / 17` violated | ✅ `0 / 17` violated | **✅ `0 / 17` violated** |
| **8,192-Pass 17-Station CPU Latency** | Tens of seconds (cloud GPU) | ~0.18 ms (wrong physics) | ~7.2 ms | **⚡ ~0.18 ms (~40× faster)** |

---

## 5. 🧪 Interactive Demo & 7-Card 4:5 Visual Report

- **Interactive Demo Path**: `demos/archimedes-metacenter-roll-stability-rig/`
- **English 7-Card Visual Deck**: `demos/archimedes-metacenter-roll-stability-rig/test-report-cards.html`
- **Chinese 7-Card Visual Deck**: `demos/archimedes-metacenter-roll-stability-rig/test-report-cards.zh.html`
- **Sealed Benchmark Report**: `demos/archimedes-metacenter-roll-stability-rig/report.json`

| Visual Evidence Artifact | Screenshot Path | Verified Finding |
| :--- | :--- | :--- |
| **Dark Theme · Archimedes-Bouguer Lock** | `docs/evidence/archimedes-metacenter-roll-stability-rig/dark-archimedes_bouguer_metacentric_gm_lock.png` | 58 isometric solids verified, `0 / 17` violations, `1.0000×` locked |
| **Dark Theme · Naive Fixed Buoyancy Deficit** | `docs/evidence/archimedes-metacenter-roll-stability-rig/dark-naive_fixed_buoyancy_center_capsizing_deficit.png` | Exposes `1.2500× / 1.5000× / 2.0000×` righting deficit across `16 / 17` stations |
| **Light Theme · Archimedes-Bouguer Lock** | `docs/evidence/archimedes-metacenter-roll-stability-rig/light-archimedes_bouguer_metacentric_gm_lock.png` | High-contrast light metrology theme verified |
| **Light Theme · Naive Fixed Buoyancy Deficit** | `docs/evidence/archimedes-metacenter-roll-stability-rig/light-naive_fixed_buoyancy_center_capsizing_deficit.png` | Highlights 16 violated stability stations in light mode |
| **Mobile `390×844` Responsive Viewport** | `docs/evidence/archimedes-metacenter-roll-stability-rig/mobile.png` | `mobile_overflow = false`, zero horizontal scrollbar overflow |

---

## 6. 🛠️ Rapid Quality Delivery Checklist

- [x] **Bouguer Waterplane Inertia Verification**: Does the ship buoyancy solver include the waterplane second moment $\overline{BM} = I_{\text{wp}}/\nabla = B^2/(12d)$ rather than pinning buoyancy to a fixed socket $B_0$?
- [x] **Positive Metacentric Height Check**: For wide-beam vessels where $G$ lies above $B_0$ ($\overline{KG} > \overline{KB}$), does $\overline{GM} = \overline{KB} + \overline{BM} - \overline{KG} > 0$ stabilize the hull without hacking the rigid-body center of mass underwater?
- [x] **64-Strip Wedge Quadrature Equivalence**: Does closed-form Bouguer metacentric evaluation agree with 64-strip Simpson waterplane wedge integration within $10^{-12}$?
- [x] **58 Isometric Solids & Mobile Viewport Fit**: Do Playwright assertions confirm `58` `.iso-solid` elements and `mobile_overflow = false` at `390×844`?
