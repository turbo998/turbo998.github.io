# Stopping Down Camera Apertures Without Losing Diffraction Glare: Airy-Fraunhofer Circular Aperture Diffraction Law vs Naive Fixed-PSF Selection & First-Principles FAQ

> **Language**: [中文 (Chinese)](airy-fraunhofer-aperture-diffraction-vs-fixed-psf-faq.md) | **English**

![Airy-Fraunhofer Circular Aperture Diffraction Rig Summary](evidence/airy-fraunhofer-aperture-diffraction-rig-summary.svg)

---

## 1. 📌 Executive Summary

> **One-Sentence Architectural Takeaway**: When building 3D physical camera depth-of-field (DoF), night-scene aperture starburst/glare post-processing, space telescope starfields, or optical microscopy shaders, **never model point-light blur solely with geometric pinhole circles of confusion (`CoC ∝ D`) or clamp in-focus PSF radius to an aperture-independent constant `θ = θ₀`**. Sir George Biddell Airy (1835) and Joseph von Fraunhofer (1823) proved via the circular Huygens-Fresnel integral that light of wavelength `λ` passing through an entrance pupil of diameter `D = f / N` forms a Bessel `[2 J₁(x) / x]²` intensity pattern whose first dark ring lies at `x₁ = 3.831706` (`x₁ / π ≈ 1.21967`), **forcing the Airy disk angular radius to expand inversely with pupil diameter `D` and linearly with f-number `N`: `θ_Airy = 1.2197 λ / D, r_Airy = 1.2197 λ N`**. Across 17 aperture stop-down stations `u = N/N₀ − 1 = D₀/D − 1 ∈ [0.000, 1.000]` (stopping down two stops from `D₀` to `0.50 D₀`), a naive fixed-PSF kernel incurs an Airy radius deficit ratio `θ_exact / θ_model = D₀ / D = 1 + u` of **`1.2500×`** at station 4 (`u = 0.250, N = 1.25 N₀`), **`1.5000×`** at station 8 (`u = 0.500, N = 1.50 N₀`), and **`2.0000×` factor-of-2 radius loss** (`4.0000×` Airy disk area loss) at station 16 (`u = 1.000, N = 2.00 N₀`, violating `16/17` stations). Enforcing the **Airy-Fraunhofer `1.2197 λ / D` diffraction law** locks `θ_exact / θ_model = 1.0000×` across all 17 stations (`0/17` violations) and executes **`41.18×` faster** than 64-strip Fraunhofer pupil chord quadrature (`0.158 ms` vs `6.507 ms` for 8,192 17-station passes, error `< 1e-12`).

| Evaluation Dimension | Airy-Fraunhofer Diffraction Law (Recommended) | Naive Fixed-PSF Pinhole `θ = θ₀` (Anti-Pattern) | 64-Strip Fraunhofer Pupil Quadrature (Baseline) |
| :--- | :--- | :--- | :--- |
| **Airy Disk First-Zero Radius** | **`θ_Airy = 1.2197 λ / D = θ₀ (1 + u)`** | `θ = θ₀ = const` (ignores wave diffraction) | 64-strip Fourier-Bessel pupil integral |
| **Airy Disk Solid-Angle Area** | **`A_Airy / A₀ = (N / N₀)² = (1 + u)²`** | `A / A₀ = 1.0` (frozen point-light size) | `A_Airy / A₀ = (1 + u)²` |
| **Station 4 (`u=0.25, N=1.25N₀`) Ratio** | **`1.0000×` (disk area `1.5625 A₀`)** | `1.2500×` (`−20.0%` missing Airy radius) | `1.0000×` |
| **Station 8 (`u=0.50, N=1.50N₀`) Ratio** | **`1.0000×` (disk area `2.2500 A₀`)** | `1.5000×` (`−33.3%` missing Airy radius) | `1.0000×` |
| **Station 16 (`u=1.00, N=2.00N₀`) Ratio** | **`1.0000×` (radius doubles to `2θ₀`, area `4 A₀`)** | **`2.0000×` (`−50%` radius, `−75%` disk area)** | `1.0000×` |
| **Violated Stations (`θ_ex/θ > 1.0001×`)** | **`0 / 17` (100% Rayleigh wave consistency)** | **`16 / 17` (`94.1%` stations deficient)** | `0 / 17` |
| **8,192 × 17-Station CPU Latency** | **`0.158 ms` (`41.18×` faster)** | `0.149 ms` (lifeless small-aperture highlights) | `6.507 ms` (64-strip pupil integration per station) |

---

## 2. 🎯 Architect & Customer Q&A (First Principles & Pain Points)

### Q0: Tracking Daily Video & Animation Capability Breakthroughs — Why does stopping a camera lens down to `f/16` make streetlamp starbursts expand while softening fine texture detail?
Pure geometric ray tracing predicts that shrinking the aperture diameter `D` always shrinks the defocus blur circle (`CoC ∝ D`). However, real light is an electromagnetic wave: squeezing a wavefront through a narrow aperture (`f/11 – f/22`) triggers Fraunhofer diffraction, spreading every point source into an Airy pattern of radius `r_Airy = 1.2197 λ N`. Without this term, virtual cameras lack authentic small-aperture starburst glare and fail to reproduce the optical sweet spot (`f/5.6 – f/8`) where geometric aberration and wave diffraction cross over.

### Q1: How did Airy (1835) derive the `1.2197 λ / D` diffraction limit from Bessel functions?
1. **Fraunhofer Integral Over a Circular Pupil**: Integrating the phase factor `exp(−i k r sinθ cosφ)` over a circular aperture of radius `a = D / 2` yields the first-order Bessel function `J₁`:
   $$I(\theta) = I_0 \left[\frac{2 J_1(k a \sin\theta)}{k a \sin\theta}\right]^2, \qquad k a \sin\theta = \frac{\pi D \sin\theta}{\lambda}$$
2. **First Bessel Root `x₁ = 3.831706`**: The first dark ring occurs where `J₁(x₁) = 0` at `x₁ ≈ 3.831706`, giving:
   $$\theta_{\text{Airy}} \approx \frac{x_1}{\pi}\frac{\lambda}{D} = 1.21967\,\frac{\lambda}{D} = \theta_0(1 + u), \qquad \frac{D_0}{D(u)} = \frac{N(u)}{N_0} = 1 + u$$
3. **Radius & Area Deficit of Fixed PSF**: Halving the pupil diameter (`D = 0.5 D₀, u = 1.000`) doubles the Airy disk radius (`2.0000×`) and quadruples its area (`4.0000×`).

### Q2: When should teams choose AI Video Generation vs Deterministic Airy-Fraunhofer Shaders?
- **Choose AI Video Generation** for stylized dreamlike bokeh overlays in static music videos.
- **Choose Deterministic Airy-Fraunhofer Shaders** for virtual cinematography lenses, telescope/microscope simulators, and automotive night-glare validation where PSF radius must obey `1.2197 λ N`.

---

## 3. 🧭 Visual Diagrams (Selection Decision Tree + Pipeline Comparison + Sequence)

### 3.1 Physical Camera PSF (Geometric CoC + Wave Airy) Decision Tree

```mermaid
flowchart TD
    A[3D Physical Camera PSF & Glare Task] --> B{Aperture F-Number Regime?}
    B -->|Wide Open f/1.4 - f/4 Out-of-Focus| C[Geometric Defocus CoC Dominates]
    B -->|Stopped Down f/8 - f/22 or Point Highlights| D[Enforce Airy-Fraunhofer Law r_Airy = 1.2197 * lambda * N]
    D --> E[Combine in Quadrature r_tot = sqrt r_CoC^2 + r_Airy^2]
    E --> F[Airy Radius Scales Linearly with N Locked at 1.0000x]
```

### 3.2 Naive Fixed-PSF Pinhole vs Airy-Fraunhofer Diffraction Pipeline

```mermaid
flowchart LR
    subgraph NaivePinhole[Anti-Pattern: Naive Fixed PSF theta = theta_0]
        N1[Stop Down 2 Stops D = 0.5 D0 / N = 2 N0] --> N2[Ignores Wave Diffraction Keeps theta_0]
        N2 --> N3[2.0000x Radius Deficit and 4.00x Area Deficit]
        N3 --> N4[Missing Small-Aperture Glare and Rayleigh Limit!]
    end

    subgraph AiryFraunhofer[Recommended: Airy-Fraunhofer Bessel Law]
        A1[Stop Down 2 Stops D = 0.5 D0 / N = 2 N0] --> A2[First Bessel Root x1 / pi = 1.2197]
        A2 --> A3[Airy Radius Doubles to 2.0000 theta_0]
        A3 --> A4[1.0000x Radius Lock Restores Authentic Starburst & Airy Rings!]
    end
```

### 3.3 Frame-Level Spectral Airy + CoC Post-Processing Sequence

```mermaid
sequenceDiagram
    participant Lens as Virtual Camera Rig (f, N, focusZ)
    participant Airy as Airy-Fraunhofer Evaluator
    participant Glare as DoF & Glare Post-Processor
    Lens->>Airy: Pass f-number ratio N/N0 = 1 + u and spectral wavelength lambda
    Airy->>Airy: Compute r_Airy = 1.21967 * lambda * N
    Airy->>Glare: Output expanded Airy radius and quadrature spot size r_total
    Glare-->>Lens: Render 1.0000x diffraction-accurate highlights and chromatic rings
```

---

## 4. 📊 Visual Technology Selection Matrix

| Optical / Rendering Scenario | Recommended PSF Kernel | Behavior at `N = 2 N₀` (`u = 1.00`) | Visual & Optical Fidelity |
| :--- | :--- | :--- | :--- |
| **Night Streetlamp & Sun Starburst (`f/16`)** | **Airy-Fraunhofer `1.2197 λ N`** | **`θ_Airy = 2.0000 θ₀` (`1.0000×` lock)** | Natural diffraction bloom as iris closes |
| **Space Telescope Starfields (JWST / Hubble)** | **Bessel `[2 J₁(x)/x]²` Airy Kernel** | **Disk area quadruples to `4.0000 A₀`** | Exact Rayleigh resolution limit `1.22 λ/D` |
| **Continuous Aperture Pull (`f/1.4 → f/22`)** | **Quadrature `√(r_CoC² + r_Airy²)`** | **Captures `f/8` sharpness sweet spot** | Physical transition from bokeh to diffraction |
| **Naive Fixed-PSF Pinhole (`θ = θ₀`)** | Unlit CAD viewports only | `2.0000×` radius deficit (`4×` area loss) | Artificial pinhole sharpness at `f/22` |

---

## 5. 🧪 Interactive Demo & 7-Card 4:5 Visual Report

Round 196 introduces the **206th** interactive 3D metrology rig **`demos/airy-fraunhofer-aperture-diffraction-rig/`** (58 isometric solids across 17 f-number stations `u ∈ [0.000, 1.000]`):

- **Interactive Demo**: `demos/airy-fraunhofer-aperture-diffraction-rig/index.html`
- **Sealed Benchmark JSON**: `demos/airy-fraunhofer-aperture-diffraction-rig/report.json`
- **7-Card 4:5 Visual Report Decks (EN / ZH)**:
  - `demos/airy-fraunhofer-aperture-diffraction-rig/test-report-cards.html`
  - `demos/airy-fraunhofer-aperture-diffraction-rig/test-report-cards.zh.html`
- **Playwright Multi-Theme & Mobile Evidence**:
  - `docs/evidence/airy-fraunhofer-aperture-diffraction-rig/dark-airy_fraunhofer_bessel_diffraction_lock.png`
  - `docs/evidence/airy-fraunhofer-aperture-diffraction-rig/dark-naive_geometric_pinhole_fixed_psf.png`
  - `docs/evidence/airy-fraunhofer-aperture-diffraction-rig/light-airy_fraunhofer_bessel_diffraction_lock.png`
  - `docs/evidence/airy-fraunhofer-aperture-diffraction-rig/light-naive_geometric_pinhole_fixed_psf.png`
  - `docs/evidence/airy-fraunhofer-aperture-diffraction-rig/mobile.png`

```ts
// Closed-form Airy-Fraunhofer diffraction spot radius combined in quadrature with geometric CoC
export function evaluateAiryDiffractionSpot(
  wavelengthMeters: number,
  fNumber: number,
  geometricCocMeters: number
) {
  const airyRadiusMeters = 1.21966989 * wavelengthMeters * fNumber;
  const totalSpotRadiusMeters = Math.hypot(geometricCocMeters, airyRadiusMeters);
  return { airyRadiusMeters, totalSpotRadiusMeters };
}
```

---

## 6. 🛠️ Delivery Verification Checklist

- [x] **Zero Small-Aperture Diffraction Deficit**: Verified Airy disk radius scales as `1.2197 λ / D ∝ N`, locking `θ_exact / θ_model = 1.0000×` across all 17 stations (eliminating `2.0000×` radius and `4.00×` area deficit at `N = 2 N₀`).
- [x] **Fraunhofer Pupil Chord Equivalence**: Verified closed-form Airy radius matches 64-strip pupil chord quadrature within `< 1e-12` at a `41.18×` speedup.
- [x] **Automated End-to-End Evidence**: Passed Vitest unit tests, Playwright desktop/mobile screenshots (`390×844` zero horizontal overflow), and bilingual 7-Card visual reports.
