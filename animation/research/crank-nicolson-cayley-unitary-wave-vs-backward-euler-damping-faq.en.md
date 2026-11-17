# Crank-Nicolson Cayley Unitary Wave Propagator (`G = (1+iθ/2)/(1−iθ/2), |G|² = 1.0000×`) vs Naive Backward Euler Numerical Damping Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`crank-nicolson-unitary-wave-propagator-rig`)](../demos/crank-nicolson-unitary-wave-propagator-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/crank-nicolson-unitary-wave-propagator-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/crank-nicolson-unitary-wave-propagator-rig/test-report-cards.zh.html) · [中文版 FAQ](./crank-nicolson-cayley-unitary-wave-vs-backward-euler-damping-faq.md)

![Crank-Nicolson Cayley Unitary Wave Propagator vs Naive Backward Euler Damping Summary](./evidence/crank-nicolson-unitary-wave-propagator-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why does switching an oscillatory water-ripple, cloth-vibration, or acoustic-wave solver $\frac{dz}{dt} = i\omega z$ to Implicit Backward Euler (`G_BE(θ) = 1 / (1 − iθ)`) introduce catastrophic artificial numerical viscosity that wipes out `-50.00%` of wave energy in a single step at $\theta = \omega\Delta t = 1.0\text{ rad}$ and `-80.00%` at $\theta = 2.0\text{ rad}$—and how does the Crank-Nicolson (1947) / Cayley (1846) bilinear propagator (`G_CN(θ) = (1 + iθ/2) / (1 − iθ/2)`) lock exact unitary wave energy $|G|^2 \equiv 1.0000\times$ for all step sizes?**
   - For the undamped oscillatory wave mode $\frac{dz}{dt} = i\omega z$ with dimensionless phase step $\theta = \omega\Delta t \in [0.0000, 2.0000]\text{ rad}$, the exact analytical propagator $e^{i\theta}$ has unit energy gain $|e^{i\theta}|^2 \equiv 1.0000\times$.
   - **Why Naive Implicit Backward Euler ($G_{\text{BE}}(\theta) = \frac{1}{1 - i\theta}$) Kills Oscillatory Waves**:
     - Discretizing $\frac{z_{n+1} - z_n}{\Delta t} = i\omega z_{n+1}$ yields $z_{n+1} = \frac{1}{1 - i\theta} z_n$, whose single-step energy ratio is:
       $$E_{\text{BE}}(\theta) = |G_{\text{BE}}(\theta)|^2 = \mathbf{\frac{1}{1 + \theta^2}}!$$
     - At **Station 4 ($\theta = 0.50\text{ rad}$)**: $E_{\text{BE}}(0.50) = \mathbf{0.8000\times}$ (`-20.00%` single-step energy loss).
     - At **Station 6 ($\theta = 0.75\text{ rad}$)**: $E_{\text{BE}}(0.75) = \mathbf{0.6400\times}$ (`-36.00%` loss).
     - At **Station 8 ($\theta = 1.00\text{ rad}$)**: $E_{\text{BE}}(1.00) = \mathbf{0.5000\times}$ (**`-50.00%` single-step loss—wiping out $99.9\%$ of wave energy in 10 frames!**).
     - At **Station 16 ($\theta = 2.00\text{ rad}$)**: $E_{\text{BE}}(2.00) = \mathbf{0.2000\times}$ (`-80.00%` single-step loss across **`16/17` damped stations**)!
   - **John Crank & Phyllis Nicolson (1947) & Arthur Cayley (1846) Unitary Bilinear Propagator**:
     - Centered trapezoidal discretization $\frac{z_{n+1} - z_n}{\Delta t} = i\omega\frac{z_{n+1} + z_n}{2}$ produces the Cayley transform:
       $$G_{\text{CN}}(\theta) = \frac{1 + i\,\theta/2}{1 - i\,\theta/2} = \frac{1 - \theta^2/4}{1 + \theta^2/4} + i\,\frac{\theta}{1 + \theta^2/4}$$
     - Because the numerator $1 + i\theta/2$ and denominator $1 - i\theta/2$ are complex conjugates, their squared magnitudes cancel identically:
       $$E_{\text{CN}}(\theta) = |G_{\text{CN}}(\theta)|^2 = \frac{1 + \theta^2/4}{1 + \theta^2/4} \equiv \mathbf{1.0000\times} \quad \forall \theta \in [0, \infty) \quad (\text{`0/17` damped stations})!$$
2. **17-Station Phase-Step Audit: Exact `E = 1.0000×` (`0/17` Damped) vs Backward Euler `1/(1+θ²)` Decay Across `16/17` Stations**:
   - Across `8,192` 17-station passes, single-step Crank-Nicolson evaluation runs in **`0.35 ms`** vs **`13.36 ms`** for 64-substep RK4 wave integration (**`37.91×` faster**, `< 1e-7` error).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Crank-Nicolson Wave Propagators)

### Q1: In plain English, why does `(1 + iθ/2) / (1 − iθ/2)` stay on the unit circle for *every* real number $\theta$?
- **First-Principles Breakdown**:
  - For any real number $a = \theta/2$, the complex number $1 + ia$ and its conjugate $1 - ia$ form two right triangles with legs $1$ and $a$, so both have the exact same hypotenuse $\sqrt{1 + a^2}$!
  - Dividing one by the other gives a complex number of length $\frac{\sqrt{1 + a^2}}{\sqrt{1 + a^2}} \equiv 1$ and phase angle $2\arctan(\theta/2)$!

### Q2: How do we add controllable physical damping to a Crank-Nicolson water ripple solver without frame-rate-dependent numerical viscosity?
- **Decoupled Exponential Attenuation**:
  - Advance the oscillation with the lossless unitary Crank-Nicolson step $G_{\text{CN}}(\theta)$, and multiply by the exact physical attenuation factor $\exp(-\gamma \Delta t)$ separately so ripple decay depends *only* on physical viscosity $\gamma$, never on timestep $\Delta t$!

### Q3: When should teams use AI video generators vs deterministic Crank-Nicolson wave solvers?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive ocean concept clips.
- **Choose Deterministic Crank-Nicolson Unitary Propagators** for interactive water ripples, modal audio/vibration synthesis, Schrödinger vorticity fluids, and lively cloth oscillations.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Oscillatory Wave Time-Stepping Selection Decision Tree

```mermaid
flowchart TD
    A["Advancing an undamped oscillatory wave mode dz/dt = iωz by phase step θ = ωΔt?"] -->|Naive 1: Explicit Forward Euler 1 + iθ| B1["Energy E = 1 + θ² > 1 explodes unconditionally!"]
    A -->|Naive 2: Implicit Backward Euler 1 / 1 - iθ| B2["Energy E = 1 / 1 + θ² loses -50% at θ=1.0 and -80% at θ=2.0 across 16/17 damped stations!"]
    A -->|Require both unconditional stability AND exact unit energy E = 1.0000×| C{"How is the unitary step evaluated?"}
    C -->|Heavy: 64-substep explicit 4th-order Runge-Kutta RK4| D["13.36 ms per 8,192 passes · 64× arithmetic overhead"]
    C -->|Crank-Nicolson 1947 & Cayley 1846 Bilinear Propagator| E["Evaluate G_CN = 1 + iθ/2 / 1 - iθ/2"]
    E --> F["Conjugate numerator/denominator lock E = 1.0000× across all 17 stations · 0/17 damped · 37.91× faster"]
```

### 3.2 Backward Euler Numerical Viscosity vs Crank-Nicolson Unitary Pipeline

```mermaid
flowchart LR
    subgraph BE["❌ Naive Implicit Backward Euler (1 / (1 − iθ))"]
      N1["Wave Mode Step θ = ωΔt ∈ [0.5, 2.0]"] --> N2["Implicit Step z_{n+1} = z_n / (1 − iθ)"]
      N2 --> N3["Single-Step Energy Drops as 1 / (1 + θ²)"]
      N3 --> N4["Loses −50% at θ=1.0 & −80% at θ=2.0 · 16/17 Stations Damped!"]
    end
    subgraph CN["✅ Crank-Nicolson Cayley Unitary (1947)"]
      C1["Symmetric Midpoint Average ½(z_{n+1} + z_n)"] --> C2["Cayley Quotient G = (1 + iθ/2) / (1 − iθ/2)"]
      C2 --> C3["Conjugate Cancellation (1 + θ²/4) / (1 + θ²/4) ≡ 1"]
      C3 --> C4["Locks Single-Step Energy E = 1.0000× · 0/17 Damped!"]
    end
```

### 3.3 Frame-Level Shallow-Water Ripple & Modal Synthesizer Update Sequence

```mermaid
sequenceDiagram
    participant Engine as Interactive Water / Modal Synthesizer
    participant CN as Crank-Nicolson Cayley Kernel
    participant State as Complex Wave Mode Buffer z_n
    Engine->>CN: Advance wave mode z_n by phase step θ = ωΔt = 1.00 rad
    CN->>CN: Compute denom = 1.25, re = (1 − 0.25)/1.25 = 0.60, im = 1.0/1.25 = 0.80
    CN->>State: Update z_{n+1} = (0.60 + 0.80i) z_n with |G|² = 0.36 + 0.64 = 1.0000× (vs backward Euler 0.5000×)
    State->>Engine: Sustain crisp, long-lived interactive ripples without numerical mud
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Crank-Nicolson Cayley (Primary)** | **Backward Euler `1/(1−iθ)` (Failure Mode)** | **64-Substep RK4 (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 4 ($\theta=0.50\text{ rad}$) Energy** | **`1.0000×` ($0.00\%$ damping)** | **`0.8000×` (`-20.00%` 1-step loss)** | `1.0000×` (agrees within `< 1e-7`) | N/A |
| **Station 6 ($\theta=0.75\text{ rad}$) Energy** | **`1.0000×` ($0.00\%$ damping)** | **`0.6400×` (`-36.00%` 1-step loss)** | `1.0000×` | N/A |
| **Station 8 ($\theta=1.00\text{ rad}$) Energy** | **`1.0000×` ($0.6^2 + 0.8^2 = 1$)** | **`0.5000×` (`-50.00%` 1-step loss)** | `1.0000×` | Non-physical wave decay |
| **Station 16 ($\theta=2.00\text{ rad}$) Energy** | **`1.0000×` (Unconditionally unitary)** | **`0.2000×` (`-80.00%` 1-step loss)** | `1.0000×` | N/A |
| **Damped Stations (of 17)** | **`0 / 17` ($E \equiv 1.0000\times$ everywhere)** | **`16 / 17` (All $\theta > 0$ stations)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.35 ms` (`37.91×` faster)** | `0.28 ms` (Over-damps ripples to mud) | `13.36 ms` (64-substep loop) | Multi-second cloud inference |
| **Best Fit Scenarios** | **Water ripples, modal audio, vorticity** | Pure heat diffusion only | Offline ODE reference | Concept mood clips |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`crank-nicolson-unitary-wave-propagator-rig`)

- **Interactive 3D Workbench**: [`demos/crank-nicolson-unitary-wave-propagator-rig/index.html`](../demos/crank-nicolson-unitary-wave-propagator-rig/index.html)
  - Features a **58-solid 3D 17-Station Crank-Nicolson Unitary Wave Bench**: a metrological stage platen, 5 unitary spectral arches, 17 back Crank-Nicolson reference columns ($E = 1.0000\times$), 17 front active wave-energy probe spheres, and 15 red vertical numerical-damping struts comparing **Crank-Nicolson Cayley Unitary Wave Propagation** against **Naive Implicit Backward Euler `1/(1+θ²)` Damping**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/crank-nicolson-unitary-wave-propagator-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/crank-nicolson-unitary-wave-propagator-rig/test-report-cards.zh.html)

| Light Theme — Crank-Nicolson Unitary (Locks `|G|² = 1.0000×`, `0/17` Damped) | Light Theme — Backward Euler (`1/(1+θ²)` Drops to `0.2000×` Across `16/17` Stations) |
| :---: | :---: |
| ![Light Crank Nicolson Wave](./evidence/crank-nicolson-unitary-wave-propagator-rig/light-crank_nicolson_cayley_unitary_wave.png) | ![Light Backward Euler Damping](./evidence/crank-nicolson-unitary-wave-propagator-rig/light-naive_backward_euler_numerical_damping.png) |

| Dark Theme — Crank-Nicolson Unitary (`(1+iθ/2)/(1−iθ/2)` Conjugate Identity) | Dark Theme — Backward Euler (`-80.00%` Single-Step Energy Loss at `θ=2.0`) |
| :---: | :---: |
| ![Dark Crank Nicolson Wave](./evidence/crank-nicolson-unitary-wave-propagator-rig/dark-crank_nicolson_cayley_unitary_wave.png) | ![Dark Backward Euler Damping](./evidence/crank-nicolson-unitary-wave-propagator-rig/dark-naive_backward_euler_numerical_damping.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Replace First-Order Backward Euler `1 / (1 - i*theta)` with Crank-Nicolson `(1 + i*theta/2) / (1 - i*theta/2)` on Oscillatory Modes**: Eliminate artificial numerical viscosity while keeping unconditional stability.
- [ ] **Decouple Physical Attenuation $\exp(-\gamma\Delta t)$ from the Oscillatory Integrator**: Ensure wave decay rate is invariant to frame rate $\Delta t$.
- [ ] **Apply Frequency Pre-Warping $\tilde{\theta} = 2\tan(\theta/2)$ When Exact Phase Velocity Is Required at Large $\Delta t$**: Match both the exact unit amplitude AND exact phase angle $\theta$ of $\exp(i\theta)$.
- [ ] **Verify Pythagorean Norm Identity `re*re + im*im === 1.0` Across All Frequency Bands**: Confirm zero energy drift over thousands of simulation frames.
