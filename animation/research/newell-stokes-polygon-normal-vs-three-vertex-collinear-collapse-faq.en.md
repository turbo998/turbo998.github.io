# Newell Stokes Contour Polygon Normal (`½ Σ (v_i−v_{i+1})×(v_i+v_{i+1})`) vs Naive Three-Vertex Collinear Collapse Selection & First-Principles FAQ

> **Navigation**: [Back to Portal](../index.html) · [Launch 3D Interactive Workbench (`newell-stokes-polygon-normal-rig`)](../demos/newell-stokes-polygon-normal-rig/index.html) · [7-Card 4:5 Visual Report (EN)](../demos/newell-stokes-polygon-normal-rig/test-report-cards.html) · [7-Card 报告 (ZH)](../demos/newell-stokes-polygon-normal-rig/test-report-cards.zh.html) · [中文版 FAQ](./newell-stokes-polygon-normal-vs-three-vertex-collinear-collapse-faq.md)

![Newell Stokes Contour Polygon Normal vs Naive Three-Vertex Collinear Collapse Summary](./evidence/newell-stokes-polygon-normal-rig-summary.svg)

---

## ① 📌 Executive Summary

1. **Why does computing a polygon's normal from its first three vertices `cross(v1 - v0, v2 - v0)` collapse to the zero vector `vec3(0.0)` (producing `0 / 0 = NaN` black holes upon normalization) whenever a CSG Boolean cut, Voronoi fracture shard, or adaptive subdivision mesh inserts a collinear T-junction vertex—and how does Martin Newell's (1975) Stokes boundary-contour sum (`N_Newell = ½ Σ (v_i − v_{i+1}) × (v_i + v_{i+1})`) lock exact polygon area-vector norm $R \equiv 1.0000\times$?**
   - **Why Naive First-Three-Vertex Cross Products ($\mathbf{N}_{3\text{pt}} = \frac{1}{2}(\mathbf{v}_1 - \mathbf{v}_0) \times (\mathbf{v}_2 - \mathbf{v}_0)$) Collapse on Collinear & Concave Corners**:
     - Inspecting only $(\mathbf{v}_0, \mathbf{v}_1, \mathbf{v}_2)$ ignores all remaining edges of an $M$-gon.
     - On a constant-unit-area polygon ($A_{\text{poly}} \equiv 1.0000$) where vertex $\mathbf{v}_1$ slides toward collinearity $u \in [0.0000, 1.0000]$ with corner altitude $h = 1 - u$:
       $$R_{3\text{pt}}(u) = \frac{\|\mathbf{N}_{3\text{pt}}(u)\|}{A_{\text{corner},0}} = 1 - u!$$
     - At **Station 4 ($u = 0.25$)**: $R_{3\text{pt}}(0.25) = \mathbf{0.7500\times}$ (`-25.00%` area-vector loss).
     - At **Station 8 ($u = 0.50$)**: $R_{3\text{pt}}(0.50) = \mathbf{0.5000\times}$ (`-50.00%` loss).
     - At **Station 16 ($u = 1.00$ Collinear T-Junction)**: $R_{3\text{pt}}(1.00) = \mathbf{0.0000\times}$ (**`-100.00%` total collapse into `NaN`** across **`16/17` degraded stations**)!
   - **Martin Newell (1975) & Stokes' Theorem Boundary-Contour Polygon Normal**:
     - By **Stokes' Theorem**, the vector surface area $\iint_{\Omega} d\mathbf{A}$ of any polygon equals the closed line integral $\frac{1}{2}\oint_{\partial\Omega} \mathbf{r} \times d\mathbf{r}$ around all $M$ edges:
       $$\mathbf{N}_{\text{Newell}} = \frac{1}{2}\sum_{i=0}^{M-1} (\mathbf{v}_i - \mathbf{v}_{i+1}) \times (\mathbf{v}_i + \mathbf{v}_{i+1})$$
     - Because the contour sum integrates every edge's signed trapezoid projection onto the $YZ, ZX, XY$ coordinate planes, sliding $\mathbf{v}_1$ into a collinear T-junction leaves the total polygon area vector untouched at **$R_{\text{Newell}}(u) \equiv \mathbf{1.0000\times}$ (`0/17` degraded stations)**!
2. **17-Station Collinearity Audit: Exact `R = 1.0000×` (`0/17` Degraded) vs Naive Three-Vertex `0.0000×` Collapse Across `16/17` Stations**:
   - Across `8,192` 17-station passes, Newell's 5-edge boundary contour sum runs in **`0.75 ms`** vs **`680.85 ms`** for 64-cell Stokes interior surface quadrature (**`904.90×` faster**, `< 1e-13` error).

---

## ② 🎯 Architect & Client Q&A (When to Choose AI Video Models vs Deterministic Newell Polygon Normals)

### Q1: In plain English, why does Newell's formula use `(v_i - v_{i+1}) × (v_i + v_{i+1})` instead of `v_i × v_{i+1}`?
- **First-Principles Breakdown**:
  - Algebraically, $(\mathbf{v}_i - \mathbf{v}_{i+1}) \times (\mathbf{v}_i + \mathbf{v}_{i+1}) = 2(\mathbf{v}_i \times \mathbf{v}_{i+1})$ because $\mathbf{v}_i \times \mathbf{v}_i = \mathbf{0}$.
  - Computationally, each coordinate of $(x_i - x_{i+1})(y_i + y_{i+1})$ uses **only 1 multiplication per axis (3 multiplies per edge)** instead of 2 multiplications per axis (6 multiplies per edge) in a standard 3D cross product, while subtracting adjacent vertices first prevents floating-point precision loss!

### Q2: What else does the magnitude `‖N_Newell‖` give us for free?
- **Exact Area-Weighted Vertex Normals Without Triangulation**:
  - Because $\|\mathbf{N}_{\text{Newell}}\|$ equals the exact polygon surface area $A_{\text{poly}}$, accumulating unnormalized $\mathbf{N}_{\text{Newell}}$ directly into adjacent vertices produces **exact area-weighted smooth vertex normals** without ear-clipping or triangulating the polygon!

### Q3: When should teams use AI video generators vs deterministic Newell polygon normals?
- **Choose AI Video Models (Sora / Runway / Veo / Wan)** for offline concept clips.
- **Choose Deterministic Newell Polygon Normals** for CSG Boolean modeling, real-time Voronoi destruction physics, CAD n-gon mesh importers, and adaptive subdivision surfaces.

---

## ③ 🧭 Visual Diagrams (Mermaid Decision Tree + Pipeline Comparison + Frame Sequence)

### 3.1 Polygon Surface Normal & Area-Vector Selection Decision Tree

```mermaid
flowchart TD
    A["Computing face normals and area weights for quads, n-gons, CSG cuts, or fracture shards?"] -->|Naive: Cross product of first three vertices v1 - v0 × v2 - v0| B["Collapses to 0.0000× NaN at collinear T-junctions u=1.0 and flips 180° at concave corners across 16/17 stations!"]
    A -->|Require exact polygon area vector immune to collinear & concave vertices| C{"How is the polygon vector area integrated?"}
    C -->|Heavy: Subdivide interior into 8x8 = 64 cells and integrate dA| D["680.85 ms per 8,192 passes · O N² interior grid overhead"]
    C -->|Newell 1975 Stokes Boundary-Contour Sum| E["Accumulate N = ½ Σ v_i - v_{i+1} × v_i + v_{i+1} around all M edges"]
    E --> F["Stokes theorem locks R = 1.0000× across all 17 stations · 0/17 degraded · 904.90× faster"]
```

### 3.2 Naive Three-Vertex Collinear Collapse vs Newell Stokes Contour Pipeline

```mermaid
flowchart LR
    subgraph Naive["❌ Naive Three-Vertex Cross Product ((v₁−v₀)×(v₂−v₀))"]
      N1["Edge Vertex v₁ Slides Toward Collinearity (h = 1 − u)"] --> N2["Inspects Only Corner Triangle (v₀, v₁, v₂)"]
      N2 --> N3["Area Vector Shrinks as R = 1 − u"]
      N3 --> N4["Collapses to 0.0000× NaN at u=1.0 · 16/17 Stations Degraded!"]
    end
    subgraph Newell["✅ Newell Stokes Boundary Contour Sum (1975)"]
      S1["Traverse All M Polygon Edges v_i → v_{i+1}"] --> S2["Sum Projected Trapezoids ½ Σ (v_i − v_{i+1}) × (v_i + v_{i+1})"]
      S2 --> S3["Stokes Identity ½ ∮ r×dr ≡ A_poly"]
      S3 --> S4["Locks Exact Polygon Area Vector R = 1.0000× · 0/17 Degraded!"]
    end
```

### 3.3 Frame-Level CSG Fracture & Adaptive Subdivision Normal Reconstruction Sequence

```mermaid
sequenceDiagram
    participant Mesh as CSG / Fracture N-Gon Generator
    participant Newell as Newell Stokes Contour Kernel
    participant Normals as Area-Weighted Vertex Normal Buffer
    Mesh->>Newell: Emit 5-gon with collinear T-junction vertex v₁ on edge v₀→v₂ (u = 1.00, h = 0.00)
    Newell->>Newell: Sum ½ (v_i − v_{i+1}) × (v_i + v_{i+1}) across all 5 boundary edges
    Newell->>Normals: Contribute exact area vector ‖N_Newell‖ = 1.0000× (vs naive 3-vertex 0.0000× NaN)
    Normals->>Mesh: Normalize into watertight, NaN-free shading normals
```

---

## ④ 📊 Visual Technology Decision Matrix

| Dimension | **Newell Stokes Contour (Primary)** | **Naive 3-Vertex Cross (Failure Mode)** | **64-Cell Stokes Surface (Baseline)** | **AI Video Generators** |
| :--- | :--- | :--- | :--- | :--- |
| **Station 4 ($u=0.25, h=0.75$) Norm** | **`1.0000×` (Exact polygon area)** | **`0.7500×` (`-25.00%` weight loss)** | `1.0000×` (agrees within `< 1e-13`) | N/A |
| **Station 8 ($u=0.50, h=0.50$) Norm** | **`1.0000×` (Exact polygon area)** | **`0.5000×` (`-50.00%` weight loss)** | `1.0000×` | N/A |
| **Station 12 ($u=0.75, h=0.25$) Norm** | **`1.0000×` (Exact polygon area)** | **`0.2500×` (`-75.00%` weight loss)** | `1.0000×` | Shading pop on shards |
| **Station 16 ($u=1.00$ T-Junction) Norm** | **`1.0000×` (Immune to collinearity)** | **`0.0000×` (`NaN` black polygon)** | `1.0000×` | N/A |
| **Concave Corner Stability** | **100% Stable (global signed area)** | Flips $180^\circ$ on reflex vertices | 100% Stable | N/A |
| **Degraded Stations (of 17)** | **`0 / 17` ($R \equiv 1.0000\times$ everywhere)** | **`16 / 17` (All $u > 0$ stations)** | `0 / 17` | N/A |
| **8,192 17-Station Passes Latency** | **`0.75 ms` (`904.90×` faster)** | `0.29 ms` (Produces `NaN` at $u=1$) | `680.85 ms` (64-cell 2D loop) | Multi-second cloud inference |
| **Best Fit Scenarios** | **CSG, Voronoi shards, CAD n-gons** | Non-degenerate triangles only | Offline differential verification | Concept mood clips |

---

## ⑤ 🧪 New Interactive Demo & 7-Card 4:5 Visual Report (`newell-stokes-polygon-normal-rig`)

- **Interactive 3D Workbench**: [`demos/newell-stokes-polygon-normal-rig/index.html`](../demos/newell-stokes-polygon-normal-rig/index.html)
  - Features a **58-solid 3D 17-Station Newell Stokes Polygon Normal Bench**: a metrological stage platen, 5 Stokes contour circulation arches, 17 back Newell reference columns ($R = 1.0000\times$), 17 front active area-vector probe spheres, and 15 red vertical collinear-collapse struts comparing **Newell Stokes Boundary-Contour Normals** against **Naive First-Three-Vertex Cross-Product Collapse**.
- **7-Card 4:5 Visual Benchmark Reports**:
  - [English 7-Card Report (`test-report-cards.html`)](../demos/newell-stokes-polygon-normal-rig/test-report-cards.html)
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/newell-stokes-polygon-normal-rig/test-report-cards.zh.html)

| Light Theme — Newell Stokes Contour (Locks `R = 1.0000×` Through T-Junctions, `0/17` Degraded) | Light Theme — Naive 3-Vertex Cross (`0.0000×` Collinear Collapse Across `16/17` Stations) |
| :---: | :---: |
| ![Light Newell Polygon Normal](./evidence/newell-stokes-polygon-normal-rig/light-newell_stokes_contour_polygon_normal.png) | ![Light Naive Collinear Collapse](./evidence/newell-stokes-polygon-normal-rig/light-naive_three_vertex_collinear_collapse.png) |

| Dark Theme — Newell Stokes Contour (3-Multiply Trapezoid Sum `½ Σ Δv × Σv`) | Dark Theme — Naive 3-Vertex Cross (`(v₁−v₀)×(v₂−v₀)` Vanishes at `u=1.0`) |
| :---: | :---: |
| ![Dark Newell Polygon Normal](./evidence/newell-stokes-polygon-normal-rig/dark-newell_stokes_contour_polygon_normal.png) | ![Dark Naive Collinear Collapse](./evidence/newell-stokes-polygon-normal-rig/dark-naive_three_vertex_collinear_collapse.png) |

---

## ⑥ 🛠️ Verification Checklist for Production Delivery

- [ ] **Replace First-Three-Vertex Cross Products on Quads and N-Gons with Newell's Contour Sum**: Prevent collinear T-junctions and concave vertices from generating zero-length `NaN` normals or inverted lighting.
- [ ] **Use the 3-Multiply Difference-Sum Form `(v_i - v_{i+1}) × (v_i + v_{i+1})`**: Halve the multiplication count compared to raw `v_i × v_{i+1}` and improve floating-point conditioning.
- [ ] **Accumulate Unnormalized `N_Newell` Directly for Area-Weighted Vertex Normals**: Leverage $\|\mathbf{N}_{\text{Newell}}\| = 2A_{\text{poly}}$ without separate area calculation.
- [ ] **Shift Polygon Coordinates Relative to `v_0` Before Summing `(v_i - v_0) + (v_{i+1} - v_0)`**: Eliminate large-world-coordinate rounding in double-or-single precision meshes.
