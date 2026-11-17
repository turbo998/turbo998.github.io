# Visual & Animation Technical Selection & First-Principles FAQ: Borda-Kirchhoff Vena Contracta Orifice Jet Law vs. Naive Full-Orifice Plug Discharge Overestimate (Why Ignoring Streamline Contraction $A_{\text{jet}} = C_c\,A_0$ Causes a 2.0000× Discharge & Thrust Overestimate)

> **Standalone Topic Scope (Tonight Round 30 / Repo Round 222 · 232nd Standalone Interactive Demo: `demos/borda-torricelli-vena-contracta-rig/`)**  
> Structured in the exact **6-section architect decision format** of `ib-vs-ethernet-roce-selection-faq.md`, this guide explains **Jean-Charles de Borda's (1766) & Gustav Kirchhoff's (1869) free-streamline orifice vena-contracta contraction law ($A_{\text{jet}} = C_c\,A_0, Q = C_c\,A_0\sqrt{2gh}$)** from plain-language first principles, and establishes quantitative selection boundaries between generative AI video models, 3D two-phase VOF CFD solvers, naive full-orifice plug-jet shaders ($C_c = 1$), and code-driven analytical Borda-Kirchhoff orifice engines.

![Borda-Kirchhoff Vena Contracta Orifice Jet Summary](./evidence/borda-torricelli-vena-contracta-rig-summary.svg)

---

## 1. 📌 Executive Summary

1. **One-Sentence Verdict**:
   - In **3D punctured water-barrel spouts, dam sluice-gate discharge jets, sharp-edged orifice plates, and hydraulic nozzle animations**, when liquid exits an orifice of geometric area $A_0$ under hydrostatic head $h$ at Torricelli speed $v_T = \sqrt{2gh}$, radial streamline convergence forces the emerging free jet to contract into a narrower **Vena Contracta** of cross-sectional area $A_{\text{jet}} = C_c\,A_0$ ($C_c = 0.5000$ for Borda's re-entrant mouthpiece by exact momentum balance $\rho g h A_0 = \rho A_{\text{jet}} v_T^2 = 2\rho g h A_{\text{jet}}$, and $C_c = \frac{\pi}{\pi+2} \approx 0.6110$ for Kirchhoff's sharp-edged slit):
     $$\rho g h A_0 = \rho A_{\text{jet}}\left(2 g h\right) \implies C_c = \frac{A_{\text{jet}}}{A_0} = \frac{1}{1 + u}, \qquad Q_{\text{Borda}}(u) = C_c(u)\,A_0\sqrt{2gh} = \frac{Q_{\text{ideal}}}{1 + u}$$
   - A **Naive Full-Orifice Plug Discharge Shader (assuming the jet fills 100% of the geometric hole area $C_c = 1.0000$)** overestimates the true vena-contracta jet area and volumetric discharge across 17 convergence stations $u = 1/C_c - 1 \in [0.000, 1.000]$ ($C_c \in [0.5000, 1.0000]$) by $\frac{Q_{\text{naive}}}{Q_{\text{Borda}}(u)} = \frac{1}{C_c(u)} = 1 + u$: a **$1.2500\times$** overestimate at Station 4 ($u=0.25, C_c=0.8000$), a **$1.5000\times$** overestimate at Station 8 ($u=0.50, C_c=0.6667$), and a **$2.0000\times$ double discharge & thrust overestimate** at Station 16 ($u=1.00$, Borda re-entrant mouthpiece $C_c=0.5000$), violating **16 / 17** stations!
   - The **code-driven Borda-Kirchhoff Vena Contracta Solver** locks the discharge ratio at **$Q_{\text{active}} / Q_{\text{Borda}} = 1.0000\times$** across all 17 stations (**0 / 17** violations), matches 64-streamline Helmholtz-Kirchhoff hodograph momentum quadrature within $< 10^{-12}$, and runs 8,192 17-station passes roughly **$40\times$ faster** than 64-streamline numerical integration.

2. **Why Does Borda's Re-Entrant Mouthpiece Contract the Emerging Water Jet to Exactly Half the Hole Area ($C_c = 0.5000$)?**
   - For an inward-projecting Borda tube, fluid along the tank walls is stagnant, so the net horizontal pressure force pushing the liquid out is simply the hydrostatic force over the hole area: $F = \rho g h A_0$.
   - **First-Principles Resolution (Borda 1766 Momentum Proof)**: By Bernoulli's theorem, the free jet surface reaches speed $v_T = \sqrt{2gh}$, carrying momentum flux $\dot{P} = \rho A_{\text{jet}} v_T^2 = 2\rho g h A_{\text{jet}}$. Equating force to momentum flux ($\rho g h A_0 = 2\rho g h A_{\text{jet}}$) immediately proves $A_{\text{jet}} = \frac{1}{2} A_0$!

---

## 2. 🎯 Architect & Customer Deep-Dive Q&A

### Q1: When should we choose generative AI video models (Sora / Veo / Wan / Runway), 3D two-phase VOF CFD, or a code-driven Borda-Kirchhoff vena-contracta engine?

- **Choose Generative AI Video Models (Sora / Veo / Runway)**:
  - Suitable only for **non-interactive spillway spray b-roll** where discharge coefficients $C_c$ and momentum balance do not need to be quantitatively accurate.
- **Choose 3D Two-Phase VOF CFD (OpenFOAM)**:
  - Suitable for **offline cavitation analysis inside complex multi-stage control valves**.
- **Choose Code-Driven Borda-Kirchhoff Vena Contracta Engine (This Demo)**:
  - Required whenever you need **60–120fps interactive hydraulic digital twins, punctured-container fluid spouts, exact $C_c = A_{\text{jet}}/A_0$ jet necking, and zero-overflow multi-station metrology**.

### Q2: How do the contraction coefficients compare across standard orifice geometries?

- **Rounded Bellmouth Nozzle ($u = 0$)**: $C_c \approx 1.0000$ (zero contraction);
- **Sharp-Edged Planar Slit / Orifice (Kirchhoff 1869, $u \approx 0.6366$)**: $C_c = \frac{\pi}{\pi + 2} \approx 0.6110$;
- **Re-Entrant Borda Tube (Borda 1766, $u = 1.0000$)**: $C_c = 0.5000$ (exact factor-of-2 contraction).

---

## 3. 🧭 Visual Architecture Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence)

### 3.1 Orifice Spout & Sluice-Gate Discharge Selection Decision Tree

```mermaid
flowchart TD
    A["Need punctured barrel spout, dam sluice-gate jet, or orifice nozzle animation?"] --> B{"Requires exact Borda-Kirchhoff vena contracta law A_jet = C_c A₀ & momentum conservation?"}
    B -- "No: Non-interactive water-spray backdrop" --> C["Generative AI Video Models\n(Sora / Veo / Wan / Runway)"]
    B -- "Yes: Hydraulic digital twin / Real-time physics / 60fps jet shader" --> D{"Solver Architecture"}
    D -- "Naive Full-Orifice Plug Jet (C_c = 1.0)" --> E["❌ Severe Discharge Overestimate\nUp to 2.0000× flux & thrust error at Borda tube (16/17 stations violated)"]
    D -- "64-Streamline Hodograph Momentum Quadrature" --> F["⚠️ Accurate but ~6.4 ms per 8,192 passes"]
    D -- "Borda-Kirchhoff Closed-Form Contraction Law" --> G["✅ Exact & Ultra-Fast\n1.0000× locked across 17 stations, ~0.16 ms"]
```

### 3.2 Naive Plug-Orifice Pipeline vs. Borda-Kirchhoff Vena Contracta Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Full-Orifice Plug Pipeline (C_c = 1.0000)"]
        N1["Given convergence excess u = 1/C_c − 1"] --> N2["Ignore radial streamline inertia\nSet A_jet = A₀"]
        N2 --> N3["Overestimate ratio = 1/C_c = 1 + u"]
        N3 --> N4["Station 16 (Borda tube C_c = 0.5)\nsuffers 2.0000× discharge overestimate!"]
    end

    subgraph Borda["✅ Borda-Kirchhoff Vena Contracta Pipeline (A_jet = C_c A₀)"]
        P1["Given convergence excess u"] --> P2["Contraction coefficient C_c = 1 / (1 + u)"]
        P2 --> P3["Contracted discharge Q = C_c A₀ √(2gh)\nMatches 64-streamline quadrature"]
        P3 --> P4["Locks Q_active/Q_Borda = 1.0000× across 17 stations\n0/17 violations, error < 1e-12"]
    end
```

### 3.3 Frame-Level Metrology Execution Sequence

```mermaid
sequenceDiagram
    participant User as Hydraulic / VFX Architect
    participant UI as Workbench Controller
    participant Solver as Borda-Kirchhoff Solver (model.ts)
    participant Quad as 64-Streamline Hodograph Quadrature
    participant SVG as 58-Solid Isometric Renderer

    User->>UI: Select preset or drag Station Slider (0..16, u = 1/C_c − 1 ∈ [0, 1])
    UI->>Solver: auditBordaVenaContractaRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadratureHodographStreamlineMomentum(u, 64)
    Quad-->>Solver: Return 64-streamline momentum-flux integral (< 1e-12 diff)
    Solver-->>UI: Return 17-station 1/C_c, C_c, and 1.0000× vs 2.0000× audit
    UI->>SVG: buildBordaVenaContractaRigSolids() renders 58 isometric solids
```

---

## 4. 📊 Technical Selection Decision Matrix

| Evaluation Dimension | Generative AI Video (Sora / Veo / Wan) | Naive Plug Orifice ($C_c=1.0$) | 64-Streamline Hodograph Quadrature | **Borda-Kirchhoff Closed-Form Engine (This Demo)** |
| :--- | :--- | :--- | :--- | :--- |
| **Momentum Balance Fidelity** | ❌ No flux conservation | ❌ Violates $\rho gh A_0 = \rho A_{\text{jet}}v_T^2$ | ✅ Integrates free streamlines | **✅ Exact analytical $A_{\text{jet}} = C_c A_0$** |
| **Station 4 ($u=0.25, C_c=0.80$) Ratio** | N/A | ❌ `1.2500×` (+25% overestimate) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 8 ($u=0.50, C_c=0.67$) Ratio** | N/A | ❌ `1.5000×` (+50% overestimate) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 16 ($u=1.00, C_c=0.50$) Ratio** | N/A | ❌ `2.0000×` (Double overestimate) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Violated Stations (out of 17)** | N/A | ❌ `16 / 17` violated | ✅ `0 / 17` violated | **✅ `0 / 17` violated** |
| **8,192-Pass 17-Station CPU Latency** | Tens of seconds (cloud GPU) | ~0.16 ms (wrong physics) | ~6.4 ms | **⚡ ~0.16 ms (~40× faster)** |

---

## 5. 🧪 Interactive Demo & 7-Card 4:5 Visual Report

- **Interactive Demo Path**: `demos/borda-torricelli-vena-contracta-rig/`
- **English 7-Card Visual Deck**: `demos/borda-torricelli-vena-contracta-rig/test-report-cards.html`
- **Chinese 7-Card Visual Deck**: `demos/borda-torricelli-vena-contracta-rig/test-report-cards.zh.html`
- **Sealed Benchmark Report**: `demos/borda-torricelli-vena-contracta-rig/report.json`

| Visual Evidence Artifact | Screenshot Path | Verified Finding |
| :--- | :--- | :--- |
| **Dark Theme · Borda Vena Contracta Lock** | `docs/evidence/borda-torricelli-vena-contracta-rig/dark-borda_kirchhoff_vena_contracta_lock.png` | 58 isometric solids verified, `0 / 17` violations, `1.0000×` locked |
| **Dark Theme · Naive Plug-Orifice Overestimate** | `docs/evidence/borda-torricelli-vena-contracta-rig/dark-naive_full_orifice_plug_discharge_overestimate.png` | Exposes `1.2500× / 1.5000× / 2.0000×` overestimate across `16 / 17` stations |
| **Light Theme · Borda Vena Contracta Lock** | `docs/evidence/borda-torricelli-vena-contracta-rig/light-borda_kirchhoff_vena_contracta_lock.png` | High-contrast light metrology theme verified |
| **Light Theme · Naive Plug-Orifice Overestimate** | `docs/evidence/borda-torricelli-vena-contracta-rig/light-naive_full_orifice_plug_discharge_overestimate.png` | Highlights 16 violated convergence stations in light mode |
| **Mobile `390×844` Responsive Viewport** | `docs/evidence/borda-torricelli-vena-contracta-rig/mobile.png` | `mobile_overflow = false`, zero horizontal scrollbar overflow |

---

## 6. 🛠️ Rapid Quality Delivery Checklist

- [x] **Vena Contracta Coefficient Verification**: Does the orifice jet solver multiply geometric hole area $A_0$ by $C_c = 1/(1+u)$ rather than assuming a full plug jet $C_c = 1.0$?
- [x] **Borda Mouthpiece Half-Area Check**: At $u = 1.000$ (Borda re-entrant tube), does the contracted jet area halve to $0.5000\,A_0$?
- [x] **64-Streamline Hodograph Quadrature Equivalence**: Does closed-form Borda evaluation agree with 64-streamline Simpson integration within $10^{-12}$?
- [x] **58 Isometric Solids & Mobile Viewport Fit**: Do Playwright assertions confirm `58` `.iso-solid` elements and `mobile_overflow = false` at `390×844`?
