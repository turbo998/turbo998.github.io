# Visual & Animation Technical Selection & First-Principles FAQ: Malus-Brewster Polarizer Cosine-Squared Extinction Law vs. Naive Scalar Unpolarized Glare Leak (Why Ignoring Electric-Field Projection $I(\phi) = I_0 \cos^2\phi$ Causes a 2.0000× Glare Irradiance Leak)

> **Standalone Topic Scope (Tonight Round 21 / Repo Round 213 · 223rd Standalone Interactive Demo: `demos/malus-polarizer-extinction-rig/`)**  
> Structured in the exact **6-section architect decision format** of `ib-vs-ethernet-roce-selection-faq.md`, this guide explains **Étienne-Louis Malus's (1809) & Sir David Brewster's (1815) linear polarizer cosine-squared irradiance extinction law ($I(\phi) = I_0 \cos^2\phi = \frac{I_0}{1 + \tan^2\phi}$)** from plain-language first principles, and establishes quantitative selection boundaries between generative AI video models, 4×4 Mueller-matrix polarized path tracers, naive scalar RGB shaders, and code-driven analytical Malus-Brewster polarimetry engines.

![Malus-Brewster Polarizer Extinction Summary](./evidence/malus-polarizer-extinction-rig-summary.svg)

---

## 1. 📌 Executive Summary

1. **One-Sentence Verdict**:
   - In **3D camera CPL (Circular/Linear Polarizer) filter animations, polarized sunglasses cutting lake/ocean surface glare, automotive windshield dashboard-reflection suppression, and LCD liquid-crystal shutter dimming shaders**, s-polarized glare reflected near Brewster's angle $\theta_B = \arctan(n_2/n_1)$ projects its electric-field vector $\mathbf{E}_0$ onto the analyzer transmission axis at angle $\phi$ as $E_{\text{trans}} = E_0 \cos\phi$; **because Poynting irradiance is proportional to squared electric-field amplitude, transmitted glare obeys Malus's exact cosine-squared law**:
     $$E_{\text{trans}}(\phi) = E_0 \cos\phi \implies I_{\text{Malus}}(\phi) = I_0 \cos^2\phi = \frac{I_0}{\sec^2\phi} = \frac{I_0}{1 + \tan^2\phi} = \frac{I_0}{1 + u}$$
   - A **Naive Scalar Unpolarized Intensity Shader (treating surface glare as scalar RGB brightness $I = I_0$ that ignores polarizer rotation $\phi$)** leaks excess glare irradiance across 17 analyzer-rotation stations $u = \tan^2\phi = \sec^2\phi - 1 \in [0.000, 1.000]$ ($\phi \in [0^\circ, 45^\circ], \cos^2\phi = 1/(1+u) \in [0.5000, 1.0000]$) by $\frac{I_{\text{naive}}}{I_{\text{Malus}}(u)} = \sec^2\phi = 1 + u$: a **$1.2500\times$** leak at Station 4 ($u=0.25, \phi=26.57^\circ$), a **$1.5000\times$** leak at Station 8 ($u=0.50, \phi=35.26^\circ$), and a **$2.0000\times$ double glare irradiance leak** at Station 16 ($u=1.00, \phi=45.00^\circ$, where true Malus transmittance is $0.5000\,I_0$), violating **16 / 17** stations!
   - The **code-driven Malus-Brewster Polarizer Solver** locks the transmitted irradiance ratio at **$I_{\text{active}} / I_{\text{Malus}} = 1.0000\times$** across all 17 stations (**0 / 17** violations), matches 64-slice optical cycle Poynting $E^2(t)$ quadrature within $< 10^{-12}$, and runs 8,192 17-station passes roughly **$40\times$ faster** than 64-slice numerical integration.

2. **Why Does Rotating a Polarizer by $45^\circ$ Cut Polarized Glare to Exactly $50\%$ ($\cos^2 45^\circ = 0.5000$) Instead of $\cos 45^\circ \approx 70.71\%$?**
   - A linear polarizer acts as a directional gate on the **electric field vector $\mathbf{E}$**, passing only the component $E_0 \cos\phi$ parallel to its transmission axis.
   - **First-Principles Resolution (Malus 1809)**: Because electromagnetic energy flux (the Poynting vector $\mathbf{S} = \frac{1}{\mu_0}\mathbf{E} \times \mathbf{B}$) scales with the square of the electric field amplitude $|E_{\text{trans}}|^2 = E_0^2 \cos^2\phi$, the transmitted irradiance at $\phi = 45^\circ$ is $(\frac{1}{\sqrt{2}})^2 = 0.5000\,I_0$.

---

## 2. 🎯 Architect & Customer Deep-Dive Q&A

### Q1: When should we choose generative AI video models (Sora / Veo / Wan / Runway), 4×4 Mueller-matrix path tracing, or a code-driven Malus-Brewster polarizer engine?

- **Choose Generative AI Video Models (Sora / Veo / Runway)**:
  - Suitable only for **non-interactive scenic lake b-roll** where interactive polarizer ring rotation and quantitative glare extinction are not needed.
- **Choose 4×4 Mueller-Matrix / Stokes Full Path Tracing**:
  - Suitable for **offline optical simulation of birefringent calcite crystals and multi-scattering atmospheric depolarization**.
- **Choose Code-Driven Malus-Brewster Polarizer Engine (This Demo)**:
  - Required whenever you need **60–120fps interactive camera CPL filters, automotive windshield glare removal, LCD shutter dimming, exact $I_0 \cos^2\phi$ Stokes projection, and zero-overflow multi-station metrology**.

### Q2: How do we evaluate $\cos^2\phi$ in a 3D shader without trigonometric functions?

- Using the unit s-polarization vector $\hat{\mathbf{e}}_s = \frac{\mathbf{n} \times \mathbf{v}}{\|\mathbf{n} \times \mathbf{v}\|}$ and unit analyzer axis $\hat{\mathbf{p}}$:
  $$\cos^2\phi = \left(\hat{\mathbf{e}}_s \cdot \hat{\mathbf{p}}\right)^2$$
  requiring only a single dot product and multiplication!

---

## 3. 🧭 Visual Architecture Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence)

### 3.1 Polarizer Glare Extinction & LCD Shutter Selection Decision Tree

```mermaid
flowchart TD
    A["Need camera CPL filter, water/windshield glare removal, or LCD shutter animation?"] --> B{"Requires exact Malus cosine-squared law I = I₀ cos²ϕ & real-time control?"}
    B -- "No: Non-interactive scenic video" --> C["Generative AI Video Models\n(Sora / Veo / Wan / Runway)"]
    B -- "Yes: Camera simulator / Automotive HUD twin / 60fps shader" --> D{"Shader Architecture"}
    D -- "Naive Scalar Unpolarized Intensity (I = I₀)" --> E["❌ Severe Glare Leak\nUp to 2.0000× excess glare at ϕ=45° (16/17 stations violated)"]
    D -- "64-Slice Optical Cycle Poynting Quadrature" --> F["⚠️ Accurate but ~6.3 ms per 8,192 passes"]
    D -- "Malus Closed-Form Cosine-Squared Law" --> G["✅ Exact & Ultra-Fast\n1.0000× locked across 17 stations, ~0.16 ms"]
```

### 3.2 Naive Scalar Intensity Pipeline vs. Malus Cosine-Squared Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Scalar Unpolarized Pipeline (I = I₀)"]
        N1["Given tangent-squared rotation u = tan²ϕ"] --> N2["Ignore electric-field polarization vector\nKeep reflected glare at I₀"]
        N2 --> N3["Glare leak ratio = sec²ϕ = 1 + u"]
        N3 --> N4["Station 16 (ϕ = 45°, cos²ϕ = 0.5)\nleaks 2.0000× excess glare irradiance!"]
    end

    subgraph Malus["✅ Malus Cosine-Squared Pipeline (I = I₀ cos²ϕ)"]
        P1["Given tangent-squared rotation u = tan²ϕ"] --> P2["Project E-field squared: cos²ϕ = 1 / (1 + u)"]
        P2 --> P3["Transmitted glare I_Malus = I₀ cos²ϕ\nMatches 64-slice Poynting quadrature"]
        P3 --> P4["Locks I_active/I_Malus = 1.0000× across 17 stations\n0/17 violations, error < 1e-12"]
    end
```

### 3.3 Frame-Level Metrology Execution Sequence

```mermaid
sequenceDiagram
    participant User as Optical Architect / Photographer
    participant UI as Workbench Controller
    participant Solver as Malus-Brewster Solver (model.ts)
    participant Quad as 64-Slice Poynting Quadrature
    participant SVG as 58-Solid Isometric Renderer

    User->>UI: Select preset or drag Station Slider (0..16, u = tan²ϕ ∈ [0, 1])
    UI->>Solver: auditMalusPolarizerRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadraturePoyntingCycleAverage(u, 64)
    Quad-->>Solver: Return 64-slice optical cycle Poynting integral (< 1e-12 diff)
    Solver-->>UI: Return 17-station sec²ϕ, cos²ϕ, and 1.0000× vs 2.0000× audit
    UI->>SVG: buildMalusPolarizerRigSolids() renders 58 isometric solids
```

---

## 4. 📊 Technical Selection Decision Matrix

| Evaluation Dimension | Generative AI Video (Sora / Veo / Wan) | Naive Scalar Glare ($I=I_0$) | 64-Slice Poynting Cycle Quadrature | **Malus Closed-Form Polarizer Engine (This Demo)** |
| :--- | :--- | :--- | :--- | :--- |
| **Polarization Extinction Fidelity** | ❌ No Stokes/Jones conservation | ❌ Ignores vector projection $E_0\cos\phi$ | ✅ Integrates optical cycle $E^2(t)$ | **✅ Exact analytical $I(\phi) = I_0\cos^2\phi$** |
| **Station 4 ($u=0.25, \phi=26.6^\circ$) Ratio** | N/A | ❌ `1.2500×` (+25% glare leak) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 8 ($u=0.50, \phi=35.3^\circ$) Ratio** | N/A | ❌ `1.5000×` (+50% glare leak) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Station 16 ($u=1.00, \phi=45.0^\circ$) Ratio** | N/A | ❌ `2.0000×` (Double glare leak) | ✅ `1.0000×` | **✅ `1.0000×` (Exact lock)** |
| **Violated Stations (out of 17)** | N/A | ❌ `16 / 17` violated | ✅ `0 / 17` violated | **✅ `0 / 17` violated** |
| **8,192-Pass 17-Station CPU Latency** | Tens of seconds (cloud GPU) | ~0.16 ms (wrong physics) | ~6.3 ms | **⚡ ~0.16 ms (~40× faster)** |

---

## 5. 🧪 Interactive Demo & 7-Card 4:5 Visual Report

- **Interactive Demo Path**: `demos/malus-polarizer-extinction-rig/`
- **English 7-Card Visual Deck**: `demos/malus-polarizer-extinction-rig/test-report-cards.html`
- **Chinese 7-Card Visual Deck**: `demos/malus-polarizer-extinction-rig/test-report-cards.zh.html`
- **Sealed Benchmark Report**: `demos/malus-polarizer-extinction-rig/report.json`

| Visual Evidence Artifact | Screenshot Path | Verified Finding |
| :--- | :--- | :--- |
| **Dark Theme · Malus Cosine-Squared Lock** | `docs/evidence/malus-polarizer-extinction-rig/dark-malus_cosine_squared_polarizer_lock.png` | 58 isometric solids verified, `0 / 17` violations, `1.0000×` locked |
| **Dark Theme · Naive Scalar Glare Leak** | `docs/evidence/malus-polarizer-extinction-rig/dark-naive_scalar_unpolarized_glare_leak.png` | Exposes `1.2500× / 1.5000× / 2.0000×` glare leak across `16 / 17` stations |
| **Light Theme · Malus Cosine-Squared Lock** | `docs/evidence/malus-polarizer-extinction-rig/light-malus_cosine_squared_polarizer_lock.png` | High-contrast light metrology theme verified |
| **Light Theme · Naive Scalar Glare Leak** | `docs/evidence/malus-polarizer-extinction-rig/light-naive_scalar_unpolarized_glare_leak.png` | Highlights 16 violated analyzer-angle stations in light mode |
| **Mobile `390×844` Responsive Viewport** | `docs/evidence/malus-polarizer-extinction-rig/mobile.png` | `mobile_overflow = false`, zero horizontal scrollbar overflow |

---

## 6. 🛠️ Rapid Quality Delivery Checklist

- [x] **Electric-Field Projection Squared Verification**: Does the CPL polarizer shader attenuate polarized specular glare as $I_0 \cos^2\phi = I_0(\hat{\mathbf{e}}_s \cdot \hat{\mathbf{p}})^2$ rather than leaving scalar intensity unchanged?
- [x] **45° Half-Power Point Check**: At analyzer angle $\phi = 45^\circ$ ($\tan^2\phi = 1.000, u = 1.000$), does transmitted irradiance halve to $0.5000\,I_0$?
- [x] **64-Slice Poynting Cycle Quadrature Equivalence**: Does closed-form Malus evaluation agree with 64-slice Simpson optical-cycle integration within $10^{-12}$?
- [x] **58 Isometric Solids & Mobile Viewport Fit**: Do Playwright assertions confirm `58` `.iso-solid` elements and `mobile_overflow = false` at `390×844`?
