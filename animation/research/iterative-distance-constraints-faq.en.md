# Suspended Cables and Cloth Without Rubbery Sag: Multi-Substep Gauss-Seidel Distance Constraints vs Single-Pass Relaxation FAQ

> **Document Scope**: A practical architecture decision guide and first-principles Position-Based Dynamics (PBD/XPBD) reference for AI Solution Architects, real-time physics engineers, WebGL2/Three.js technical artists, and digital twin developers. Modeled after `ib-vs-ethernet-roce-selection-faq.md`, this guide explains in plain English **why a 12-segment suspension cable, ribbon, or cloth banner sags like melted cheese under single-pass Jacobi relaxation**, and how **in-place symmetric Gauss-Seidel distance-constraint sweeps with Successive Over-Relaxation (SOR)** lock total cable length within `0.09%` with zero heap allocations.

![Symmetric Gauss-Seidel Sweeps vs Single-Pass Jacobi Relaxation Summary](evidence/catenary-constraint-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **The Core Insight in One Sentence**: **In a serial chain of $N$ connected links under gravity, a single parallel constraint pass (Jacobi relaxation) propagates boundary pin tension at a numerical wave speed of only 1 link per pass**. Because interior nodes average positions with neighbors that are also falling at the same rate, they never feel the fixed tower anchors ($w_0 = w_{12} = 0$) during a single pass—causing severe rubbery sag. Eliminating elastic sag requires **in-place symmetric forward-and-backward Gauss-Seidel sweeps** so anchor tension traverses the entire chain within the frame.
2. **When Is Multi-Sweep Symmetric Gauss-Seidel Mandatory?**
   - Whenever simulating **pinned or suspended secondary structures** in real-time 3D graphics—including suspension bridge cables, hanging power lines, character capes/ribbons, crane hoists, and umbilical hoses (see Macklin et al. `XPBD` 2016, `Small Steps in Physics Simulation` SCA 2019, and Narain et al. `Towards Generalized Position-Based Dynamics`, `arXiv:2511.23131`, Nov 2025).
3. **Key Measured Findings**:
   - In our standalone 12-Segment 3D Twin-Tower Catenary Bench ([`demos/catenary-constraint-rig/`](../demos/catenary-constraint-rig/index.html), `48` 3D solids, tower span `8.00 u`, rest length $12 \times 0.80 = 9.60\text{ u}$), applying gravity load `2.6` yields:
     - **Symmetric Multi-Sweep Gauss-Seidel (`gauss-seidel-multi`)**: Locks total cable length at **`9.6089 u`** (`0.09%` relative error), keeps maximum single-link stretch below **`0.003602 u`** across all `35` load levels, and maintains **`0.000000 u`** pin slip at both towers.
     - **Single-Pass Parallel Jacobi (`single-pass-jacobi`)**: Leaves interior segments stretched by up to **`0.1459 u`** (**$40.5\times$ larger link error**) and inflates total cable length from `9.60 u` to **`10.1220 u`** (**`+0.5220 u` rubbery sag**).
   - **Zero-Allocation In-Place CPU Latency**: In-place `Float64Array` Gauss-Seidel matches object-cloned sweeps bit-for-bit (`0 u` difference) while completing `1,024` 12-link solves in **`77.00 ms`** vs **`89.32 ms`** with zero garbage-collection pressure.

---

## ② 🎯 Architect & Customer First-Principles Q&A

### Q1: Why does a rope or cloth simulated with a single pass (or parallel Jacobi averaging) stretch like a rubber band under gravity?

**First-Principles Explanation**:
Picture 13 people holding hands in a line across an 8-meter gap (12 arm links, each $0.80\text{ m}$ long). Person $0$ on the far left and Person $12$ on the far right hold tightly onto fixed steel bridge towers (inverse mass $w_0 = w_{12} = 0$).
Suddenly, gravity pulls People $1 \dots 11$ downward:
- **What happens in a Single-Pass Parallel Jacobi step?**
  Every person looks at where their left and right neighbors were *before* the constraint pass began. Person $6$ in the exact middle looks at Person $5$ and Person $7$—both of whom fell down by nearly the same amount! To Person $6$, the local distance looks only slightly stretched, and **Person $6$ has zero awareness that Person $0$ and Person $12$ are anchored to the towers 6 links away**. After one parallel pass, tension has only traveled 1 link inward from each tower, leaving the middle of the cable sagging half a meter too low (`10.1220 u` vs `9.6000 u`).
- **How In-Place Symmetric Gauss-Seidel fixes it**:
  Instead of reading from a frozen old buffer, we sweep sequentially from left to right ($i = 0 \to 11$) and **overwrite each node's position immediately in place**. Link $0$ snaps Node $1$ toward the left tower; Link $1$ immediately reads Node $1$'s *updated* position to pull Node $2$, and so on all the way to Node $12$. We then immediately sweep backward ($i = 11 \to 0$) so right-tower tension propagates back to the left, preserving exact left-right symmetry!

---

### Q2: When should we choose Analytical Hyperbolic Catenary ($\cosh$) vs Symmetric Gauss-Seidel PBD/XPBD vs Generalized PBD (`arXiv:2511.23131`)?

| Dimension | 1. Analytical Hyperbolic Catenary (`y = a cosh(x/a)`) | 2. Symmetric Gauss-Seidel PBD/XPBD (`gauss-seidel-multi`) | 3. Generalized Nonlinear PBD (`arXiv:2511.23131`, 2025) |
| :--- | :--- | :--- | :--- |
| **Mathematical Formulation** | Closed-form static equilibrium curve under uniform gravity | Iterative in-place projection onto distance manifold $\|\mathbf{p}_{i+1}-\mathbf{p}_i\| = L_0$ weighted by inverse masses $w_i$ | Reformulates implicit time integration per nonlinear force term and solves via local Gauss-Seidel sweeps |
| **Dynamic Loads & Collisions** | **Unsupported** (breaks under point weights, wind gusts, or obstacle contact) | **Native support** (handles moving anchors, variable node masses, wind, and capsule collisions) | Supports data-driven measured cloth models (Sperl et al.) and Neo-Hookean inversion barriers |
| **Length Preservation** | Exact for static uniform cables | **`9.6089 u` / `9.6000 u` (`0.0036 u` max link error)** | Outperforms global Newton-Raphson solvers at high mesh resolutions |
| **Best Engineering Fit** | **Static architectural arches & power-line sag tables** | **Real-time 3D cables, ropes, ribbons, banners, and secondary prop physics** | **High-resolution virtual try-on & continuum soft-body mechanics** |

---

### Q3: How does the in-place symmetric Gauss-Seidel + SOR pipeline work under the hood?

Implemented in `demos/catenary-constraint-rig/model.ts`, the solver executes three deterministic steps:

1. **Branchless Inverse-Mass Pinning ($w_0 = w_{12} = 0$)**:
   Assign inverse mass $w_i = 0$ to pinned anchor nodes and $w_i = 1/m_i$ to free interior nodes.
2. **In-Place SOR Distance Projection**:
   For each link $i \in [0, N-1]$ with current vector $\mathbf{d} = \mathbf{p}_{i+1} - \mathbf{p}_i$ and length $d = \|\mathbf{d}\|$, apply the inverse-mass-weighted correction directly into the active `Float64Array` buffer:
   $$\Delta \mathbf{p} = \omega \frac{d - L_0}{d\,(w_i + w_{i+1})} \mathbf{d}, \qquad \mathbf{p}_i \leftarrow \mathbf{p}_i + w_i \Delta \mathbf{p}, \qquad \mathbf{p}_{i+1} \leftarrow \mathbf{p}_{i+1} - w_{i+1} \Delta \mathbf{p}$$
   where $\omega = 1.62$ (Successive Over-Relaxation) accelerates long-wavelength tension propagation across the 12 links, followed by $\omega = 1.0$ polishing sweeps.
3. **Symmetric Forward + Backward Sweeps**:
   Every sweep pairs a forward pass ($i = 0 \to N-1$) with a backward pass ($i = N-1 \to 0$) so the resulting catenary is perfectly symmetric around the midspan $x = 0$.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree, Pipeline Comparison & Sequence Flow)

### 3.1 Cable & Cloth Constraint Solver Decision Tree (`flowchart TD`)

```mermaid
flowchart TD
    Start[Need to simulate a suspended cable, ribbon, or cloth mesh in 3D] --> Q1{Are there dynamic forces, point loads, or collisions?}
    Q1 -->|No: purely static uniform-weight suspension curve| CoshPath[Use Analytical Hyperbolic Catenary y = a cosh x/a]
    Q1 -->|Yes: real-time wind, moving anchors, or collisions| Q2{Does the material require nonlinear data-driven stress-strain curves?}

    Q2 -->|Standard inextensible cables, ropes, ribbons & game cloth| GsPath[Use Symmetric Multi-Sweep Gauss-Seidel PBD / XPBD]
    Q2 -->|Data-driven couture fabric or volumetric Neo-Hookean solids| GenPbdPath[Use Generalized PBD arXiv:2511.23131 Implicit Force Gauss-Seidel]

    GsPath --> Q3{Execution target?}
    Q3 -->|CPU / WebAssembly 1D chains and medium meshes| InPlaceTyped[Pre-allocated Float64Array forward/backward in-place sweeps + SOR]
    Q3 -->|GPU 100k-constraint cloth grid| RedBlackGpu[Graph-colored Red-Black parallel Gauss-Seidel compute shader]
```

### 3.2 Single-Pass Parallel Jacobi vs Symmetric Multi-Sweep Gauss-Seidel (`flowchart LR`)

```mermaid
flowchart LR
    subgraph JacobiPipeline[Naive Baseline: Single-Pass Parallel Jacobi Causes Rubbery Sag]
        direction TB
        J1[Gravity pulls interior nodes 1..11 downward] --> J2[Single parallel pass averages corrections from frozen old buffer]
        J2 --> J3[Wave speed = 1 link/pass: midspan nodes never feel tower pin tension]
        J3 --> J4[Result: Max link stretch 0.1459 u, total cable inflates from 9.60 u to 10.12 u!]
    end

    subgraph GsPipeline[Production Pipeline: Symmetric Multi-Sweep In-Place Gauss-Seidel]
        direction TB
        G1[Encode tower anchors via inverse mass w_0 = w_12 = 0] --> G2[Forward 0..11 + Backward 11..0 in-place Float64Array updates]
        G2 --> G3[SOR over-relaxation propagates pin tension across all 12 links]
        G3 --> G4[Result: Total cable locked at 9.6089 u, max link error 0.0036 u, 0 pin slip!]
    end
```

### 3.3 Frame-Level Catenary Solver & Midspan Gauge Sequence (`sequenceDiagram`)

```mermaid
sequenceDiagram
    participant UI as Load Scrubber / Clock
    participant Solver as Catenary Solver (model.ts)
    participant Buf as Pre-Allocated Float64Array(13)
    participant GL as Three.js WebGL2 3D Twin-Tower Stage

    UI->>Solver: Pass gravityLoad = 2.6 and mode = gauss-seidel-multi
    Solver->>Buf: Initialize gravity-displaced nodes and set w_0 = w_12 = 0, w_1..11 = 1
    loop 64 Symmetric Forward-and-Backward Sweeps
        Solver->>Buf: Forward Sweep (i = 0..11): project p_i, p_{i+1} in-place to L_0 = 0.80 u
        Solver->>Buf: Backward Sweep (i = 11..0): project in-place in reverse for symmetry
    end
    Buf-->>Solver: Compute total cable length (9.6089 u) and midspan elevation Y
    Solver->>GL: Update 13 node spheres, 12 link cylinders, and midspan load gauge matrix
```

---

## ④ 📊 Architect Decision Matrix

| Evaluation Dimension | In-Place Symmetric Gauss-Seidel (`gauss-seidel-multi`) | Object-Cloned Gauss-Seidel (`Allocated` Baseline) | Single-Pass Jacobi (`single-pass-jacobi`) | Global Implicit Newton FEM |
| :--- | :--- | :--- | :--- | :--- |
| **Total Cable Length at Load `2.6`** | **`9.6089 u` (rest `9.6000 u`)** | `9.6089 u` (identical) | `10.1220 u` (**`+0.5220 u` sag**) | `9.6000 u` |
| **Max Single-Link Stretch Error** | **`0.003602 u` (`< 0.45%`)** | `0.003602 u` | **`0.1459 u` ($40.5\times$ worse)** | `< 1e-6 u` |
| **Tower Anchor Pin Slip** | **`0.000000 u` ($w_0=w_{12}=0$)** | `0.000000 u` | `0.000000 u` | Penalty / Lagrange multiplier |
| **Heap Allocations per Sweep** | **`0` objects (in-place `Float64Array`)** | `24` objects per sweep | Requires double buffer | Sparse Hessian assembly |
| **CPU Latency for 1,024 Solves** | **`77.00 ms`** | `89.32 ms` | `1.95 ms` (visually broken sag) | `~650 ms` |
| **Recommended Engineering Role** | **Default for real-time cables, ribbons & PBD props** | Avoid object allocation in inner loops | **Never use for inextensible cables** | Offline structural analysis |

---

## ⑤ 🧪 Capability Showcase Demo & Benchmark Findings (with 7-Card Report)

### 5.1 Interactive 12-Segment 3D Twin-Tower Catenary Stage (`demos/catenary-constraint-rig/`)

We built a standalone interactive 3D WebGL2 catenary stage at **[`demos/catenary-constraint-rig/`](../demos/catenary-constraint-rig/index.html)** (**48 3D solid parts**):
- **Twin Suspension Towers ($x = \pm 4.0\text{ u}, y = 3.2\text{ u}$) & Midspan Load Gauge**: Scrub `gravityLoad` across `[0.6, 4.2]` and inspect midspan elevation and link tension.
- **Active 12-Link Cable + Reference Gauss-Seidel Ghost Cable**: In `gauss-seidel-multi` mode, the cable holds its exact `9.6089 u` length (`0.0036 u` max link stretch). Switching to `single-pass-jacobi` exposes the `10.1220 u` rubbery sag (`+0.5220 u` stretch).
- **Atomic Config Validation & Export**: Rejects invalid sweep counts (`sweeps = 2`) while preserving valid state, and exports `CATENARY_CONSTRAINT_SPEC.json`.

| Light Theme — Symmetric Gauss-Seidel (`9.61 u` Inextensible) | Light Theme — Single-Pass Jacobi (`10.12 u` Rubbery Sag) |
| :---: | :---: |
| ![Light Theme Gauss-Seidel](evidence/catenary-constraint-rig/light-gauss-seidel-multi.png) | ![Light Theme Jacobi Sag](evidence/catenary-constraint-rig/light-single-pass-jacobi.png) |

| Dark Theme — Symmetric Gauss-Seidel (`9.61 u` Inextensible) | Dark Theme — Single-Pass Jacobi (`10.12 u` Rubbery Sag) |
| :---: | :---: |
| ![Dark Theme Gauss-Seidel](evidence/catenary-constraint-rig/dark-gauss-seidel-multi.png) | ![Dark Theme Jacobi Sag](evidence/catenary-constraint-rig/dark-single-pass-jacobi.png) |

### 5.2 7-Card 4:5 Visual Benchmark Reports & Sealed Data

- 📊 **English 7-Card 4:5 Visual Report**: [`demos/catenary-constraint-rig/test-report-cards.html`](../demos/catenary-constraint-rig/test-report-cards.html)
- 📊 **Chinese 7-Card 4:5 Visual Report**: [`demos/catenary-constraint-rig/test-report-cards.zh.html`](../demos/catenary-constraint-rig/test-report-cards.zh.html)
- 📁 **Sealed Benchmark Data**: [`demos/catenary-constraint-rig/report.json`](../demos/catenary-constraint-rig/report.json) (`13 / 13` deterministic checks passed, zero console/page errors).

---

## ⑥ 🛠️ Appendix: Architect Quick-Verification Checklist

- [ ] **Branchless Inverse-Mass Pinning ($w_0 = w_N = 0$)**: Are fixed anchors encoded via $w_i = 0$ so they never drift (`0.000000 u`) during constraint projection?
- [ ] **In-Place Gauss-Seidel Updates**: Does each constraint immediately update the live coordinate buffer before the next link is evaluated?
- [ ] **Symmetric Forward/Backward Sweeps**: Does every iteration pair a `0 -> N-1` forward pass with an `N-1 -> 0` backward pass to prevent directional bias?
- [ ] **Zero Inner-Loop Object Allocations**: Are node coordinates stored in flat `Float32Array` / `Float64Array` buffers with zero per-sweep heap allocations?
- [ ] **Substep / XPBD Compliance Scaling**: Is constraint compliance scaled by $\tilde{\alpha} = \alpha / \Delta t^2$ so material stiffness remains invariant across frame rates?

---

## References

1. **Generalized PBD (2025)**: Rahul Narain et al., *"Towards Generalized Position-Based Dynamics"*, [`arXiv:2511.23131`](https://arxiv.org/abs/2511.23131).
2. **XPBD (MIG 2016)**: Miles Macklin, Matthias Müller, and Nuttapong Chentanez, *"XPBD: Position-Based Simulation of Compliant Constrained Dynamics"*, ACM MIG 2016.
3. **Substepped PBD (SCA 2019)**: Miles Macklin et al., *"Small Steps in Physics Simulation"*, ACM SIGGRAPH / Eurographics SCA 2019.
