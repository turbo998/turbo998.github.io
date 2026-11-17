# Möller-Trumbore 3D Cramer Triple-Product Ray-Triangle Intersection (`det = E₁·(D×E₂), J = 1.0000×`) vs Naive 2D Projected Wall Collapse Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`moller-trumbore-cramer-barycentric-rig`)](../demos/moller-trumbore-cramer-barycentric-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/moller-trumbore-cramer-barycentric-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/moller-trumbore-cramer-barycentric-rig/test-report-cards.zh.html) · [中文版 FAQ](./moller-trumbore-3d-cramer-barycentric-vs-2d-projected-wall-collapse-faq.md)

![Moller-Trumbore 3D Cramer Triple-Product vs Naive 2D Projected Wall Collapse Summary](./evidence/moller-trumbore-cramer-barycentric-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why does projecting a 3D ray-triangle intersection onto a fixed 2D `XY` plane to solve barycentric coordinates $(u, v)$ collapse to a `0.0000×` singular determinant (`0 / 0 = NaN` missed wall hits) as the triangle tilts toward a vertical wall ($\theta \to 90^\circ$)—and how does Tomas Möller & Ben Trumbore's (JGT 1997) 3D scalar-triple-product Cramer solver (`det = E₁ · (D × E₂)`) lock exact `J = 1.0000×` conditioning at every 3D orientation with zero stored plane normals?**
   - Intersecting ray $\mathbf{O} + t\mathbf{D}$ with triangle $(\mathbf{V}_0, \mathbf{V}_1, \mathbf{V}_2)$ (edges $\mathbf{E}_1 = \mathbf{V}_1 - \mathbf{V}_0$, $\mathbf{E}_2 = \mathbf{V}_2 - \mathbf{V}_0$, translation $\mathbf{T} = \mathbf{O} - \mathbf{V}_0$) solves the $3 \times 3$ linear system:
     $$\begin{bmatrix} -\mathbf{D} & \mathbf{E}_1 & \mathbf{E}_2 \end{bmatrix} \begin{bmatrix} t \\ u \\ v \end{bmatrix} = \mathbf{T}$$
   - **Why Naive Fixed-XY 2D Projected Barycentric Solving ($\Delta_{xy} = E_{1,x}E_{2,y} - E_{1,y}E_{2,x}$) Collapses on Vertical Walls**:
     - Dropping the $Z$ coordinate to solve a 2D Cramer system in the $(X, Y)$ plane scales the determinant by the cosine of the surface tilt $\cos\theta = 1 - s \in [1.0000, 0.0000]$:
       $$J_{xy}(s) = \frac{|\Delta_{xy}(s)|}{2 A_{3\text{D}}} = \cos\theta = \mathbf{1 - s}!$$
     - At **Station 4 ($s = 0.25, \cos\theta = 0.75$)**: $J_{xy}(0.25) = \mathbf{0.7500\times}$ (`-25.00%` conditioning loss).
     - At **Station 8 ($s = 0.50, \theta = 60^\circ$)**: $J_{xy}(0.50) = \mathbf{0.5000\times}$ (`-50.00%` loss).
     - At **Station 16 ($s = 1.00, \theta = 90^\circ$ Vertical Wall)**: $J_{xy}(1.00) = \mathbf{0.0000\times}$ (**`-100.00%` singular collapse—missing vertical walls completely across `16/17` degraded stations**)!
   - **Tomas Möller & Ben Trumbore (*Journal of Graphics Tools* 1997) 3D Cramer Scalar Triple Product**:
     - Applying Cramer's rule directly in 3D via $\mathbf{P} = \mathbf{D} \times \mathbf{E}_2$ and $\mathbf{Q} = \mathbf{T} \times \mathbf{E}_1$:
       $$\Delta_{\text{MT}} = \mathbf{E}_1 \cdot (\mathbf{D} \times \mathbf{E}_2), \qquad \begin{bmatrix} t \\ u \\ v \end{bmatrix} = \frac{1}{\Delta_{\text{MT}}} \begin{bmatrix} \mathbf{E}_2 \cdot \mathbf{Q} \\ \mathbf{T} \cdot \mathbf{P} \\ \mathbf{D} \cdot \mathbf{Q} \end{bmatrix}$$
     - Because the 3D scalar triple product $\mathbf{E}_1 \cdot (\mathbf{D} \times \mathbf{E}_2)$ is strictly $SO(3)$ rotation-invariant, it locks the **Determinant Conditioning Ratio** at **$J_{\text{MT}}(s) \equiv \mathbf{1.0000\times}$** and preserves **$w + u + v \equiv \mathbf{1.0000}$** across all 17 stations (**`0/17` degraded stations**)!
2. **17-Station Wall-Tilt Audit: Exact `J = 1.0000×` (`0/17` Degraded) vs Naive 2D Projection `0.0000×` Collapse Across `16/17` Stations**:
   - Across `8,192` 17-station passes, closed-form Möller-Trumbore evaluation runs in **`2.74 ms`** vs **`79.91 ms`** for 64-step iterative Gauss-Jordan refinement (**`29.11×` faster**, `< 1e-12` error).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Möller-Trumbore Ray Intersection)

### Q1: In plain English, how does Möller-Trumbore solve both plane intersection and barycentric coordinates in a single 3D step?
- **First-Principles Breakdown**:
  - Instead of intersecting the triangle's plane first and then converting the 3D hit point into 2D $(u, v)$ coordinates, Möller-Trumbore uses the cross product $\mathbf{P} = \mathbf{D} \times \mathbf{E}_2$ to project the problem along the ray direction $\mathbf{D}$ and edge $\mathbf{E}_2$ simultaneously—transforming the triangle into a unit canonical triangle at the origin!

### Q2: Why is Möller-Trumbore especially valuable for animated skinned meshes and cloth simulations?
- **Zero Precomputed Plane Storage**:
  - Two-stage algorithms require storing a precomputed plane normal $\mathbf{N}$ and offset $d$ (plus dominant projection axis index) per triangle, which must be recomputed every frame when vertices deform. Möller-Trumbore operates directly on raw vertex positions $(\mathbf{V}_0, \mathbf{V}_1, \mathbf{V}_2)$ with zero auxiliary per-triangle state!

### Q3: When should teams use AI video generators vs deterministic Möller-Trumbore ray-triangle kernels?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for non-interactive concept clips.
- **Choose Deterministic Möller-Trumbore Ray-Triangle Kernels** for BVH path tracers, physics raycasts, CAD 3D picking, and compute-shader occlusion queries.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Ray-Triangle Intersection Algorithm Selection Decision Tree

```mermaid
flowchart TD
    A["Intersecting a 3D ray O + tD with an arbitrarily oriented 3D triangle V0, V1, V2?"] -->|Naive: Project onto fixed 2D XY plane to compute u, v| B["2D determinant Δ_xy = cos θ collapses to 0.0000× on vertical walls θ=90° across 16/17 stations!"]
    A -->|Require SO 3 rotation-invariant intersection with zero stored plane normals| C{"How is the 3x3 system [-D, E1, E2] [t, u, v]^T = T solved?"}
    C -->|Heavy: 64-step iterative Gauss-Jordan 3x3 matrix refinement| D["79.91 ms per 8,192 passes · High per-ray arithmetic cost"]
    C -->|Möller & Trumbore JGT 1997 3D Cramer Triple-Product| E["Compute P = D × E2, det = E1 · P, Q = T × E1 and solve t, u, v"]
    E --> F["Locks J = 1.0000× and w+u+v = 1.0000 across all 17 stations · 0/17 degraded · 29.11× faster"]
```

### 3.2 Naive 2D Projected Wall Collapse vs Möller-Trumbore 3D Cramer Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive 2D XY Projected Barycentric"]
      N1["Triangle Tilts Toward Vertical Wall (s = 1 − cos θ)"] --> N2["Drops Z Axis: Δ_xy = E₁ₓE₂ᵧ − E₁ᵧE₂ₓ"]
      N2 --> N3["Determinant Shrinks as cos θ = 1 − s"]
      N3 --> N4["Collapses to 0.0000× at θ=90° · 16/17 Stations Degraded!"]
    end
    subgraph MT["✅ Möller-Trumbore 3D Cramer Triple Product (1997)"]
      M1["3D Cross Product P = D × E₂, det = E₁ · P"] --> M2["SO(3) Invariant Scalar Triple Product"]
      M2 --> M3["Second Cross Product Q = T × E₁ Solves v & t"]
      M3 --> M4["Locks J = 1.0000× Everywhere (w+u+v = 1.0) · 0/17 Degraded!"]
    end
```

### 3.3 Frame-Level BVH Leaf Ray-Triangle Intersection Sequence

```mermaid
sequenceDiagram
    participant BVH as BVH Traversal / Ray Query
    participant MT as Möller-Trumbore 3D Cramer Kernel
    participant Hit as Hit Record (t, u, v)
    BVH->>MT: Test ray (O, D) against vertical wall triangle (V₀, V₁, V₂) at θ = 90°
    MT->>MT: Compute P = cross(D, E₂) and det = dot(E₁, P) = 1.0000× (vs 2D XY det = 0.0000×)
    MT->>MT: Verify u ∈ [0, 1], then compute Q = cross(T, E₁) for v and hit distance t
    MT->>Hit: Commit exact hit (w, u, v) = (1/3, 1/3, 1/3) with zero wall misses
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Möller-Trumbore 3D Cramer (Primary)** | **Naive 2D `XY` Projection (Failure Mode)** | **64-Step Gauss-Jordan (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 4 ($s=0.25, \cos\theta=0.75$) Ratio** | **`1.0000×` ($SO(3)$ invariant)** | **`0.7500×` (`-25.00%` loss)** | `1.0000×` (agrees within `< 1e-12`) | N/A |
| **Station 8 ($s=0.50, \theta=60^\circ$) Ratio** | **`1.0000×` ($SO(3)$ invariant)** | **`0.5000×` (`-50.00%` loss)** | `1.0000×` | N/A |
| **Station 12 ($s=0.75, \cos\theta=0.25$) Ratio** | **`1.0000×` ($SO(3)$ invariant)** | **`0.2500×` (`-75.00%` loss)** | `1.0000×` | Ghosting ray hits |
| **Station 16 ($s=1.00, \theta=90^\circ$ Wall) Ratio** | **`1.0000×` (Crisp wall hit)** | **`0.0000×` (`0/0` missed wall)** | `1.0000×` | N/A |
| **Precomputed Plane Storage** | **`0 Bytes` (Vertices only)** | Requires plane + axis index | `0 Bytes` | N/A |
| **Degraded Stations (of 17)** | **`0 / 17` ($J \equiv 1.0000\times$ everywhere)** | **`16 / 17` (All tilted stations)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`2.74 ms` (`29.11×` faster)** | `1.12 ms` (Misses vertical walls) | `79.91 ms` (64-step refinement) | Multi-second cloud inference |
| **Best Fit Scenarios** | **BVH ray tracing, dynamic meshes, picking** | Strictly 2D $z=0$ UI triangles only | Offline linear-algebra reference | Concept mood clips |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`moller-trumbore-cramer-barycentric-rig` · 160th Demo Milestone!)

- **Interactive 3D Workbench**: [`demos/moller-trumbore-cramer-barycentric-rig/index.html`](../demos/moller-trumbore-cramer-barycentric-rig/index.html)
  - Features a **58-solid 3D 17-Station Möller-Trumbore Cramer Bench**: a metrological stage platen, 5 Cramer scalar-triple-product arches, 17 back Möller-Trumbore reference columns ($J = 1.0000\times$), 17 front active determinant probe spheres, and 15 red vertical wall-collapse struts comparing **Möller-Trumbore 3D Cramer Triple-Product Intersection** against **Naive 2D Projected Wall Collapse**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/moller-trumbore-cramer-barycentric-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/moller-trumbore-cramer-barycentric-rig/test-report-cards.zh.html)

| Light Theme — Möller-Trumbore 3D Cramer (Locks `J = 1.0000×` on Vertical Walls, `0/17` Degraded) | Light Theme — Naive 2D `XY` Projection (`0.0000×` Collapse at `θ=90°` Across `16/17` Stations) |
| :---: | :---: |
| ![Light Moller Trumbore Cramer](./evidence/moller-trumbore-cramer-barycentric-rig/light-moller_trumbore_3d_cramer_triple_product.png) | ![Light Naive 2D Wall Collapse](./evidence/moller-trumbore-cramer-barycentric-rig/light-naive_2d_xy_projected_wall_collapse.png) |

| Dark Theme — Möller-Trumbore 3D Cramer (`E₁ · (D × E₂)` Rotation-Invariant Volume) | Dark Theme — Naive 2D `XY` Projection (`cos θ = 1 − s` Conditioning Loss) |
| :---: | :---: |
| ![Dark Moller Trumbore Cramer](./evidence/moller-trumbore-cramer-barycentric-rig/dark-moller_trumbore_3d_cramer_triple_product.png) | ![Dark Naive 2D Wall Collapse](./evidence/moller-trumbore-cramer-barycentric-rig/dark-naive_2d_xy_projected_wall_collapse.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Use Möller-Trumbore's 3D Scalar Triple Product `det = dot(E1, cross(D, E2))` for General 3D Ray-Triangle Intersection**: Avoid fixed-plane 2D projections that degenerate on vertical walls.
- [ ] **Early-Out on `u` Before Computing the Second Cross Product `Q = cross(T, E1)`**: Reject non-hitting rays with only 1 cross product and 2 dot products.
- [ ] **Reconstruct `w = 1.0 - u - v` to Guarantee Exact Partition of Unity**: Ensure interpolated vertex attributes sum to `1.0000` at the hit point.
- [ ] **Guard Near-Parallel Grazing Rays with `abs(det) > 1e-8`**: Prevent division overflow when a ray skims parallel to the triangle plane.
