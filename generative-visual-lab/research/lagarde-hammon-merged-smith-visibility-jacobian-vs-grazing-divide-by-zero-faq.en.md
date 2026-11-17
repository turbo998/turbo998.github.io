# Lagarde & Hammon Merged Smith Visibility Function ($V = G_2 / (4\mu_v\mu_l)$) vs Grazing Divide-by-Zero Singularity Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`merged-smith-visibility-jacobian-rig`)](../demos/merged-smith-visibility-jacobian-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.zh.html) · [中文版 FAQ](./lagarde-hammon-merged-smith-visibility-jacobian-vs-grazing-divide-by-zero-faq.md)

![Lagarde & Hammon Merged Smith Visibility vs Grazing Divide-by-Zero Singularity Summary](./evidence/merged-smith-visibility-jacobian-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why does implementing the textbook Cook-Torrance microfacet BRDF as `D * F * G / (4.0 * max(NdotV, 0.001) * NdotL)` produce blinding white firefly rings (or FP16 `NaN` black pixels) along grazing object silhouettes ($\theta_v \to 90^\circ, \mu_v = N \cdot V \to 0$)?**
   - In the classic **Cook-Torrance (1982) microfacet BRDF** $f_{\text{spec}} = \frac{D(H)\,F(V \cdot H)\,G_2(\mu_v, \mu_l)}{4\,\mu_v\,\mu_l}$, the denominator $4\mu_v\mu_l$ is the half-vector foreshortening Jacobian.
   - As the view vector approaches the grazing silhouette ($\mu_v = N \cdot V \to 0.0000$), the denominator $4\mu_v\mu_l \to 0$! If a shader evaluates the numerator and denominator separately (or uses a naive visibility term without algebraic cancellation, relying on an ad-hoc `max(mu_v, 0.025)` clamp), $\frac{1}{4\mu_v}$ explodes at the silhouette!
   - **Sébastien Lagarde & Charles de Rousiers (SIGGRAPH 2014 *Moving Frostbite to PBR*)** and **Earl Hammon Jr. (GDC 2017)** showed that the Height-Correlated Smith-GGX masking-shadowing function $G_2(\mu_v, \mu_l) = \frac{2\mu_v\mu_l}{\mu_l\sqrt{\alpha^2 + (1-\alpha^2)\mu_v^2} + \mu_v\sqrt{\alpha^2 + (1-\alpha^2)\mu_l^2}}$ contains **$2\mu_v\mu_l$ in its numerator**, which **algebraically cancels** the $4\mu_v\mu_l$ Cook-Torrance denominator to form the **Merged Smith Visibility Function $V_{\text{Smith}}$**:
     $$V_{\text{Smith}}(\mu_v, \mu_l, \alpha) = \frac{G_2(\mu_v, \mu_l, \alpha)}{4\,\mu_v\,\mu_l} \equiv \frac{0.5}{\mu_l\sqrt{\alpha^2 + (1-\alpha^2)\mu_v^2} + \mu_v\sqrt{\alpha^2 + (1-\alpha^2)\mu_l^2}}$$
2. **17-Station Silhouette Cosine Audit: Finite `0.5000` Horizon Limit (`0/17` Singularities) vs Uncanceled `10.0000` (`20.00×` Blowout)**:
   - Across 17 viewing cosines $\mu_v = 1 - k / 16 \in [1.0000, 0.0000]$ with overhead key light $\mu_l = 1.0000$ and $\alpha = 1.0000$, where $V_{\text{Smith}}(\mu_v) = \frac{0.5}{1 + \mu_v}$:
   - At **Station 0 ($\mu_v = 1.0000, \theta_v = 0.0^\circ$)**: Both formulas agree at $V(1.00) = \mathbf{0.2500}$.
   - At **Station 8 ($\mu_v = 0.5000, \theta_v = 60.0^\circ$)**: $V_{\text{Smith}}(0.50) = \mathbf{0.3333}$, whereas uncanceled $1/(4\mu_v)$ rises to **`0.5000` (`+50.00%` overshoot)**.
   - At **Station 12 ($\mu_v = 0.2500, \theta_v = 75.5^\circ$)**:
     - **Lagarde-Hammon Merged Smith $V$** locks at **$V_{\text{Smith}}(0.25) = \frac{0.5}{1.25} = \mathbf{0.4000}$**!
     - **Naive Uncanceled $1/(4\mu_v)$** surges to **`1.0000` (`+0.6000` / `+150.00%` overshoot)**!
   - At **Horizon Station 16 ($\mu_v = 0.0000, \theta_v = 90.0^\circ$)**:
     - **Lagarde-Hammon Merged Smith $V$** converges smoothly to finite **$V_{\text{Smith}}(0.00) = \frac{0.5}{1 + 0} = \mathbf{0.5000}$** without any epsilon division clamp (`0/17` singularity stations)!
     - **Naive Uncanceled $1/(4\max(\mu_v, 0.025))$** explodes to **`10.0000` (`20.00×` silhouette firefly blowout)** across **`16/17` off-zenith stations**!
3. **Architectural Verdict**:
   - Always formulate PBR specular shaders as $f_{\text{spec}} = D \cdot F \cdot V_{\text{Smith}}$ using the algebraically canceled visibility function. Across `8,192` 17-station passes, closed-form Merged Smith $V$ executes in **`0.74 ms`** vs **`139.68 ms`** for 64-stratum microfacet masking quadrature (**`187.82×` faster**).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Merged Smith Visibility)

### Q1: In plain English, why does multiplying by $\mu_v$ in $G_2$ and then dividing by $\mu_v$ in the Cook-Torrance denominator fail on GPUs?
- **First-Principles Breakdown**:
  - Algebraically, $\frac{2\mu_v}{4\mu_v} = \frac{0.5}{1}$ for every $\mu_v > 0$.
  - Numerically on a GPU, if you compute the numerator $2\mu_v$ first and divide by $4\mu_v$ second, then at the silhouette ($\mu_v \to 0$) the hardware evaluates **`0.0 / 0.0 = NaN`** (or underflows `4 * mu_v * mu_l` to zero in mobile FP16)!
  - Worse yet, if someone clamps only the denominator (`max(4 * mu_v * mu_l, eps)`) or pairs a simplified $G$ term with the raw $1/(4\mu_v\mu_l)$ Jacobian, the silhouette explodes by $10\times\text{ to }1000\times$!
  - Canceling $2\mu_v\mu_l$ on paper before writing the shader leaves $V = \frac{0.5}{\mu_l\sqrt{\dots} + \mu_v\sqrt{\dots}}$, where the denominator at $\mu_v = 0$ is simply $\mu_l\alpha > 0$—completely free of division by zero and saving 3 ALU instructions!

### Q2: How does Earl Hammon Jr.'s (GDC 2017) square-root-free approximation work?
- **Linear Interpolation of the Denominator**:
  - Hammon observed that $\mu_l\sqrt{\alpha^2 + (1-\alpha^2)\mu_v^2} + \mu_v\sqrt{\alpha^2 + (1-\alpha^2)\mu_l^2}$ equals $2\mu_v\mu_l$ at $\alpha = 0$ and $\mu_v + \mu_l$ at $\alpha = 1$.
  - Linearly interpolating the denominator gives $V_{\text{Hammon}} = \frac{0.5}{\text{mix}(2\mu_v\mu_l,\; \mu_v + \mu_l,\; \alpha)}$, eliminating both square roots while remaining exact at $\alpha = 0$ and $\alpha = 1$!

### Q3: When should teams use AI video generators vs deterministic Merged Smith Visibility shaders?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive mood clips.
- **Choose Deterministic Merged Smith Visibility** for all real-time WebGL2/WebGPU, mobile FP16, Unreal, Unity, and Three.js PBR pipelines.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Microfacet Visibility & Jacobian Formulation Decision Tree

```mermaid
flowchart TD
    A["Implementing Cook-Torrance specular BRDF: D · F · G₂ / 4·μ_v·μ_l?"] -->|Naive: Divide by 4·μ_v·μ_l without algebraic cancellation| B["As μ_v → 0 at silhouettes, denominator → 0 · 20× Firefly Ring or FP16 NaN!"]
    A -->|Lagarde & Hammon: Cancel 2·μ_v·μ_l to form V_Smith = G₂ / 4·μ_v·μ_l| C{"What is the target GPU ALU budget?"}
    C -->|Desktop / Console WebGL2 / WebGPU| D["Use Lagarde (SIGGRAPH 2014) Exact Height-Correlated V_Smith"]
    C -->|Mobile FP16 / High-Throughput Shaders| E["Use Hammon (GDC 2017) Sqrt-Free 0.5 / mix 2μ_vμ_l, μ_v+μ_l, α"]
    D --> F["Converges smoothly to finite V(0.00) = 0.5000 at horizon · 0/17 Singularities"]
    E --> F
```

### 3.2 Naive Uncanceled $1/(4\mu_v)$ Singularity vs Lagarde-Hammon Merged Smith $V$ Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Uncanceled 1 / (4 · μ_v · μ_l)"]
      N1["Station 12 (μ_v = 0.2500): V = 1.0000 (+150% Overshoot)"] --> N2["Station 15 (μ_v = 0.0625): V = 4.0000 (+750% Surge)"]
      N2 --> N3["Horizon Station 16 (μ_v = 0.0000): Hits ε-clamp at V = 10.0000"]
      N3 --> N4["16/17 Stations Blown Out · Blinding Silhouette Firefly Ring"]
    end
    subgraph Merged["✅ Lagarde-Hammon Merged Smith V = 0.5 / (1 + μ_v)"]
      M1["Algebraically cancels 2μ_vμ_l against 4μ_vμ_l"] --> M2["Station 12 (μ_v = 0.2500): Locks V = 0.4000"]
      M2 --> M3["Horizon Station 16 (μ_v = 0.0000): 0.5 / (1 + 0) = 0.5000"]
      M3 --> M4["Strictly Bounded in [0.2500, 0.5000] · 0/17 Singularities"]
    end
```

### 3.3 Frame-Level Merged Smith Visibility Evaluation Sequence

```mermaid
sequenceDiagram
    participant Frag as Fragment Cosines (μ_v = max(0, N·V), μ_l = max(0, N·L), α)
    participant Vis as Lagarde-Hammon Merged Visibility Kernel V_Smith
    participant Out as Specular BRDF f_spec = D · F · V_Smith
    Frag->>Vis: Pass μ_v ∈ [1.0000, 0.0000], μ_l = 1.0000, α = 1.0000
    Vis->>Vis: Evaluate Λ_v = μ_l·√(α²+(1-α²)μ_v²) and Λ_l = μ_v·√(α²+(1-α²)μ_l²)
    Vis->>Out: Output singularity-free V_Smith = 0.5 / (Λ_v + Λ_l) (0.5000 at μ_v = 0)
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Lagarde-Hammon Merged Smith $V$ (Primary)** | **Naive Uncanceled $1/(4\mu_v\mu_l)$ (Failure Mode)** | **64-Stratum Slope Quadrature (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 0 ($\mu_v=1.0000, 0^\circ$) Visibility** | **`0.2500` (Zenith baseline)** | `0.2500` | `0.2500` | N/A |
| **Station 8 ($\mu_v=0.5000, 60^\circ$) Visibility** | **`0.3333` (Bounded masking)** | **`0.5000` (`+50.00%` overshoot)** | `0.3333` (agrees within `< 1e-13`) | Uncalibrated rim glare |
| **Station 12 ($\mu_v=0.2500, 75.5^\circ$) Visibility** | **`0.4000` (Exact rational value)** | **`1.0000` (`+150.00%` overshoot)** | `0.4000` | N/A |
| **Station 16 ($\mu_v=0.0000, 90^\circ$) Visibility** | **`0.5000` (Finite horizon limit)** | **`10.0000` (`20.00×` firefly blowout)** | `0.5000` | N/A |
| **Singularity Stations (of 17)** | **`0 / 17` (Bounded in `[0.25, 0.50]`)** | **`16 / 17` (All off-zenith stations overshoot)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.74 ms` (`187.82×` faster)** | `0.68 ms` (silhouette firefly blowout) | `139.68 ms` (64-stratum loop) | Multi-second cloud inference |
| **Best Fit Scenarios** | **All production PBR engines (UE5, Frostbite, Filament, Three.js)** | Never use unmerged division | Offline BRDF validation | Concept clips |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`merged-smith-visibility-jacobian-rig`)

- **Interactive 3D Workbench**: [`demos/merged-smith-visibility-jacobian-rig/index.html`](../demos/merged-smith-visibility-jacobian-rig/index.html)
  - Features a **58-solid 3D 17-Station Microfacet Silhouette Goniometer Bench**: a grazing silhouette platen, 5 Smith micro-ridge masking prisms, 17 back cyan Merged Smith $V$ reference columns ($[0.2500, 0.5000]$), 17 front active orbs, and 15 red vertical singularity blowout calipers comparing **Lagarde-Hammon Merged Smith Visibility** against **Naive Uncanceled $1/(4\mu_v)$ Grazing Singularities**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.zh.html)

| Light Theme — Merged Smith $V$ (`V(0.00) = 0.5000` Finite Horizon) | Light Theme — Naive Uncanceled (`V(0.00) = 10.0000`, `16/17` Overshoot) |
| :---: | :---: |
| ![Light Merged Smith](./evidence/merged-smith-visibility-jacobian-rig/light-lagarde_hammon_merged_smith_visibility.png) | ![Light Uncanceled Singularity](./evidence/merged-smith-visibility-jacobian-rig/light-naive_uncanceled_jacobian_singularity.png) |

| Dark Theme — Merged Smith $V$ (`0/17` Singularity Stations) | Dark Theme — Naive Uncanceled (`20.00×` Silhouette Firefly Ring) |
| :---: | :---: |
| ![Dark Merged Smith](./evidence/merged-smith-visibility-jacobian-rig/dark-lagarde_hammon_merged_smith_visibility.png) | ![Dark Uncanceled Singularity](./evidence/merged-smith-visibility-jacobian-rig/dark-naive_uncanceled_jacobian_singularity.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Replace Separate `G / (4 * NdotV * NdotL)` with `V_Smith(NdotV, NdotL, alpha)`**: Never evaluate the Cook-Torrance denominator separately from the Smith masking-shadowing numerator.
- [ ] **Clamp Minimum Roughness $\alpha \ge 0.045$ in FP16 Shaders**: Ensure $\mu_l \alpha$ stays above the FP16 subnormal threshold when $\mu_v = 0$.
- [ ] **Use Hammon's (GDC 2017) Linear Approximation on Mobile**: Replace the two square roots with `0.5 / mix(2.0 * NdotL * NdotV, NdotL + NdotV, alpha)`.
- [ ] **Pair with Geometric Specular AA (Round 71)**: Filter normal-map curvature variance so grazing silhouettes remain temporal-flicker-free.
