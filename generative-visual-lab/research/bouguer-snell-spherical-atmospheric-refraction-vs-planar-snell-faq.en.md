# Planetary Sunsets and Limb Raymarching Without Flat-Earth Horizon Drift: Bouguer-Snell Spherical Atmospheric Refraction Law vs Naive Planar Snell Selection & First-Principles FAQ

> **Language**: [中文 (Chinese)](bouguer-snell-spherical-atmospheric-refraction-vs-planar-snell-faq.md) | **English**

![Bouguer-Snell Spherical Atmospheric Refraction Rig Summary](evidence/bouguer-snell-spherical-refraction-rig-summary.svg)

---

## 1. 📌 Executive Summary

> **One-Sentence Architectural Takeaway**: When building 3D planetary sunset/sunrise atmospheric shaders, orbital limb occultation raymarchers, horizon mirages, or spherical gradient-index (GRIN) lens shaders, **never approximate concentric planetary shells as flat parallel slabs using planar Snell's law (`n(z) sinθ = const`)**. Pierre Bouguer (1729) proved from the rotational Noether symmetry of Fermat's optical path integral in spherical coordinates that any ray propagating through a radially symmetric refractive index field `n(r)` conserves **Bouguer's optical impact parameter (optical angular momentum): `p_Bouguer = n(r) · r · sinθ(r) = n₀ · r₀ · sinθ₀ = const`**. Consequently, the local zenith angle sine contracts across concentric shells as `sinθ_B(r) = (n₀ r₀ / (n(r) r)) sinθ₀`. Across 17 concentric optical-lever stations `u = (n r)/(n₀ r₀) − 1 ∈ [0.000, 1.000]` (`(n r)/(n₀ r₀) = 1 + u ∈ [1.000, 2.000]`), the naive planar-slab Snell approximation drops the radial lever arm `r / r₀`, inflating the optical impact parameter ratio `p / p_Bouguer = 1 + u` to **`1.2500×`** at station 4 (`u = 0.250`), **`1.5000×`** at station 8 (`u = 0.500`), and **`2.0000×` double angular-momentum drift** at station 16 (`u = 1.000`, violating `16/17` stations and causing false total internal reflection at the horizon `θ₀ = 90°`). Enforcing the **Bouguer-Snell `n(r) r sinθ = const` spherical law** locks `p / p_Bouguer = 1.0000×` across all 17 stations (`0/17` violations) and executes **`38.82×` faster** than 64-shell concentric Eikonal ray-bending quadrature (`0.162 ms` vs `6.289 ms` for 8,192 17-station passes, error `< 1e-12`).

| Evaluation Dimension | Bouguer-Snell Spherical Law (Recommended) | Naive Planar Snell `n sinθ = const` (Anti-Pattern) | 64-Shell Concentric Eikonal Quadrature (Baseline) |
| :--- | :--- | :--- | :--- |
| **Conserved Ray Invariant** | **`p_B = n(r) · r · sinθ(r) = const`** | `n(z) · sinθ = const` (ignores shell radius `r`) | 64-shell Eikonal torque integration |
| **Local Zenith Sine Scaling** | **`sinθ_B = sinθ₀ / (1 + u)`** | `sinθ = (n₀/n) sinθ₀` (locks up at horizon) | `sinθ = sinθ₀ / (1 + u)` |
| **Station 4 (`u=0.25, nr=1.25n₀r₀`) Ratio** | **`1.0000×` (`sinθ_B = 0.8000 sinθ₀`)** | `1.2500×` (`+25.00%` invariant drift) | `1.0000×` |
| **Station 8 (`u=0.50, nr=1.50n₀r₀`) Ratio** | **`1.0000×` (`sinθ_B = 0.6667 sinθ₀`)** | `1.5000×` (`+50.00%` invariant drift) | `1.0000×` |
| **Station 16 (`u=1.00, nr=2.00n₀r₀`) Ratio** | **`1.0000×` (`sinθ_B = 0.5000 sinθ₀`)** | **`2.0000×` (`+100.00%` double invariant drift)** | `1.0000×` |
| **Violated Stations (`p/p_B > 1.0001×`)** | **`0 / 17` (100% Fermat-Noether rotational symmetry)** | **`16 / 17` (`94.1%` stations drifted)** | `0 / 17` |
| **8,192 × 17-Station CPU Latency** | **`0.162 ms` (`38.82×` faster)** | `0.150 ms` (breaks grazing horizon rays) | `6.289 ms` (64-shell Eikonal integral per station) |

---

## 2. 🎯 Architect & Customer Q&A (First Principles & Pain Points)

### Q0: Tracking Daily Video & Animation Capability Breakthroughs — Why do flat-Earth Snell shaders produce false total internal reflection (`NaN`) for horizontal sunset rays?
At sea level (`r₀, n₀ ≈ 1.00029`), a ray looking horizontally at the sunset (`θ₀ = 90°, sinθ₀ = 1`) climbs into upper atmospheric layers where `n(r) → 1.00000`. Under planar Snell's law, `sinθ(r) = (n₀ / n(r)) · 1 = 1.00029 > 1`, which triggers false total internal reflection (`asin` domain error) and prevents the ray from ever exiting the atmosphere! On a spherical planet, the radial coordinate `r` grows faster than `n(r)` decreases, so `n(r) r > n₀ r₀` and `sinθ(r) = (n₀ r₀) / (n(r) r) < 1`, allowing grazing horizon rays to escape smoothly into space while elevating and flattening the setting solar disk.

### Q1: How did Pierre Bouguer (1729) prove `n(r) r sinθ = const` across spherical shells?
1. **Triangle Law of Sines Between Concentric Shells**: A ray leaving shell `r₁` at zenith angle `θ₁` strikes shell `r₂` at incidence angle `α`. By the Law of Sines in triangle `OAB`:
   $$r_1 \sin\theta_1 = r_2 \sin\alpha$$
2. **Spherical Interface Snell's Law**: Combining `n₁ sinα = n₂ sinθ₂` with the geometric lever ratio eliminates `α`:
   $$n_1 r_1 \sin\theta_1 = n_2 r_2 \sin\theta_2 \implies p_{\text{Bouguer}} = n(r)\,r\,\sin\theta(r) = \text{const}$$
3. **Drift of Planar Snell Approximation**:
   $$\frac{p_{\text{planar}}(u)}{p_{\text{Bouguer}}} = \frac{n(r) r \sin\theta_{\text{planar}}}{n_0 r_0 \sin\theta_0} = \frac{r}{r_0} = 1 + u$$
   At `nr = 2 n₀r₀` (`u = 1.000`), planar Snell drifts by **`2.0000×`**.

### Q2: When should teams choose AI Video Generation vs Deterministic Bouguer-Snell Shaders?
- **Choose AI Video Generation** for static sunset background plates.
- **Choose Deterministic Bouguer-Snell Shaders** for ground-to-orbit planetary engines, orbital limb occultation, and spherical GRIN lenses where rays must conserve `n(r) r sinθ`.

---

## 3. 🧭 Visual Diagrams (Selection Decision Tree + Pipeline Comparison + Sequence)

### 3.1 Atmospheric & GRIN Ray Tracing Decision Tree

```mermaid
flowchart TD
    A[3D Atmospheric / Mirage / GRIN Ray Task] --> B{Refractive Index Symmetry?}
    B -->|Concentric Spherical Shells n = n r| C[Use Bouguer-Snell Law n r sin theta = const]
    B -->|Microscopic Flat Parallel Plate| D[Planar Snell Law n z sin theta = const]
    C --> E[Grazing Horizon Rays theta0 = 90 deg Escape Without False TIR]
    C --> F[Conserves Optical Angular Momentum p_B Locked at 1.0000x]
```

### 3.2 Naive Planar Snell vs Bouguer-Snell Spherical Refraction Pipeline

```mermaid
flowchart LR
    subgraph NaivePlanarSnell[Anti-Pattern: Naive Planar Snell n sin theta = const]
        N1[Ray Climbs to 2x Optical Shell Lever] --> N2[Ignores Radial Lever Arm r / r0]
        N2 --> N3[2.0000x Optical Angular Momentum Drift]
        N3 --> N4[Horizon Rays Hit sin theta > 1 False TIR Lockup!]
    end

    subgraph BouguerSnellLaw[Recommended: Bouguer-Snell Spherical Law]
        B1[Ray Climbs to 2x Optical Shell Lever] --> B2[Conserves p = n r sin theta]
        B2 --> B3[Zenith Sine Contracts to 0.5000 sin theta0]
        B3 --> B4[1.0000x Invariant Lock Renders Flattened Sunset Disk!]
    end
```

### 3.3 Frame-Level Planetary Limb Refraction Raymarching Sequence

```mermaid
sequenceDiagram
    participant Ray as Camera Ray (r0, theta0)
    participant Bouguer as Bouguer-Snell Evaluator
    participant Atmo as Limb Scattering & Sun Disk Shader
    Ray->>Bouguer: Compute conserved impact parameter p0 = n0 * r0 * sin(theta0)
    Bouguer->>Bouguer: Evaluate sin_theta(r) = p0 / (n(r) * r) at shell r
    Bouguer->>Atmo: Accumulate bending angle and refracted solar elevation
    Atmo-->>Ray: Render 1.0000x horizon-accurate sunset and limb glow
```

---

## 4. 📊 Visual Technology Selection Matrix

| Atmospheric / Optical Scenario | Recommended Refraction Invariant | Behavior at `2×` Shell Lever (`u = 1.00`) | Visual & Astronomical Accuracy |
| :--- | :--- | :--- | :--- |
| **Planetary Horizon Sunset & Flattened Sun** | **Bouguer-Snell `n(r) r sinθ = p₀`** | **`sinθ = 0.5000 sinθ₀` (`1.0000×` lock)** | Authentic `34'` elevation and oblate sun |
| **Orbital Limb Occultation & Twilight Arc** | **Bouguer Impact Parameter** | **Exact grazing optical airmass** | Eliminates horizon `NaN` black bands |
| **Spherical Luneburg / Fish-Eye GRIN Lens** | **Vector `r × n t = const`** | **`38.82×` faster than 64-shell Eikonal integral** | Exact closed-form ray curvature |
| **Naive Planar Snell (`n sinθ = const`)** | High-elevation flat layers only | `2.0000×` angular-momentum drift | Fails at grazing horizon angles |

---

## 5. 🧪 Interactive Demo & 7-Card 4:5 Visual Report

Round 202 introduces the **212th** interactive 3D metrology rig **`demos/bouguer-snell-spherical-refraction-rig/`** (58 isometric solids across 17 concentric shell stations `u ∈ [0.000, 1.000]`):

- **Interactive Demo**: `demos/bouguer-snell-spherical-refraction-rig/index.html`
- **Sealed Benchmark JSON**: `demos/bouguer-snell-spherical-refraction-rig/report.json`
- **7-Card 4:5 Visual Report Decks (EN / ZH)**:
  - `demos/bouguer-snell-spherical-refraction-rig/test-report-cards.html`
  - `demos/bouguer-snell-spherical-refraction-rig/test-report-cards.zh.html`
- **Playwright Multi-Theme & Mobile Evidence**:
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/dark-bouguer_snell_spherical_invariant_lock.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/dark-naive_planar_slab_snell_horizon_drift.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/light-bouguer_snell_spherical_invariant_lock.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/light-naive_planar_slab_snell_horizon_drift.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/mobile.png`

```ts
// Closed-form Bouguer-Snell spherical refraction zenith angle evaluation
export function evaluateBouguerSphericalZenith(
  observerN0: number,
  observerRadiusR0: number,
  observerSinTheta0: number,
  shellRefractiveIndexN: number,
  shellRadiusR: number
) {
  const bouguerImpactP = observerN0 * observerRadiusR0 * observerSinTheta0;
  const sinTheta = Math.min(1, bouguerImpactP / (shellRefractiveIndexN * shellRadiusR));
  const cosTheta = Math.sqrt(Math.max(0, 1 - sinTheta * sinTheta));
  return { bouguerImpactP, sinTheta, cosTheta };
}
```

---

## 6. 🛠️ Delivery Verification Checklist

- [x] **Zero Horizon Lockup or Invariant Drift**: Verified concentric shell rays conserve `n(r) r sinθ = const`, locking `p / p_Bouguer = 1.0000×` across all 17 stations (eliminating `2.0000×` planar Snell drift).
- [x] **Concentric Eikonal Equivalence**: Verified closed-form Bouguer sine factor matches 64-shell Eikonal quadrature within `< 1e-12` at a `38.82×` speedup.
- [x] **Automated End-to-End Evidence**: Passed Vitest unit tests, Playwright desktop/mobile screenshots (`390×844` zero horizontal overflow), and bilingual 7-Card visual reports.
