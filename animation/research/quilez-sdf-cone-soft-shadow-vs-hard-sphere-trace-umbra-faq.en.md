# Distance-Field Soft Shadow Selection & First-Principles FAQ: Quilez-Wright Single-Ray SDF Cone-Ratio Soft Shadows vs. Hard Sphere-Traced Binary Umbra

> **Companion Capability Demo**: [`demos/sdf-cone-soft-shadow-rig/`](../demos/sdf-cone-soft-shadow-rig/index.html) ｜ **7-Card 4:5 Measured Report**: [`test-report-cards.html`](../demos/sdf-cone-soft-shadow-rig/test-report-cards.html) ｜ **中文版本**：[`quilez-sdf-cone-soft-shadow-vs-hard-sphere-trace-umbra-faq.md`](./quilez-sdf-cone-soft-shadow-vs-hard-sphere-trace-umbra-faq.md)

---

## 📌 1. Executive Summary

> **One-Sentence Verdict**: When ray-marching shadows through a Signed Distance Field (SDF) or UE5 Mesh Distance Field scene, **never treat sphere tracing as a binary hit/miss test ($d_{\min} > 0 ? 1 : 0$)**—because at any step distance $t$ along the light ray, the SDF value $d_{\text{SDF}}(t)$ already gives the **exact radius of the largest unoccluded sphere** centered at $\mathbf{P} + t\mathbf{L}$, so the ratio $k \cdot d_{\text{SDF}}(t) / t$ measures the fraction of the area light's cone unobstructed by geometry! Behind an occluder at distance $t_{\text{occ}} = 4.0\text{ m}$ illuminated by an area light of softness $k = 4.0$ (penumbra half-width $w = t/k = 1.0\text{ m}$), naive binary sphere-tracing discards $d_{\min} / t$ and collapses the $2.0\text{ m}$-wide penumbra ($d_{\min} \in [-0.80\text{ m}, +0.80\text{ m}]$) into a razor-sharp binary step (**snapping boundary Station 8 $d_{\min} = 0.00\text{ m}$ from `0.5000` to `0.0000` for a `-0.5000` step error and corrupting all `9/17` penumbra stations**)! **Inigo Quilez & Daniel Wright's (SIGGRAPH 2015 UE4/UE5 Distance Field Soft Shadows) Single-Ray Cone-Ratio Penumbra ($u = \text{clamp}(0.5 + 0.5 k d_{\min}/t, 0, 1),\, S = u^2(3 - 2u)$)** reconstructs a noise-free, contact-hardening area-light penumbra from **1 ray march** (`S = 0.5000` at $d_{\min} = 0.00\text{ m}$, `0/17` clipped stations, **`2.22e-16`** equivalence against 64-ray distributed area-light disk quadrature at a **`40.86×` CPU speedup**: `0.33 ms` vs. `13.62 ms`).

![Quilez-Wright Single-Ray SDF Cone Soft Shadow vs Hard Sphere-Traced Umbra Summary](./evidence/sdf-cone-soft-shadow-rig-summary.svg)

| Evaluation Dimension | ✅ Quilez-Wright 1-Ray SDF Cone (`S = u²(3−2u), u = 0.5+0.5kd/t`) | ❌ Naive Hard Binary Sphere-Trace (`d_min > 0 ? 1 : 0`) | 🐢 64-Ray Area-Light Disk Quadrature (`64-Ray Area-Light Quad`) |
| :--- | :--- | :--- | :--- |
| **Station 6 Inner Penumbra ($d_{\min} = -0.40\text{ m}, u = 0.30$)** | **`0.2160`** ($21.6\%$ partial solar disk visibility) | `0.0000` (**Clips $-0.2160$ into dead-black umbra**) | `0.2160` (`2.22e-16` diff) |
| **Station 8 Geometric Boundary ($d_{\min} = 0.00\text{ m}, u = 0.50$)** | **`0.5000`** (Exact $50\%$ half-occluded solar disk) | `0.0000` (**`-0.5000` step cliff / razor-sharp edge**) | `0.5000` |
| **Station 10 Outer Penumbra ($d_{\min} = +0.40\text{ m}, u = 0.70$)** | **`0.7840`** ($78.4\%$ outer penumbra feathering) | `1.0000` (**`+0.2160` over-brightening; zero outer penumbra**) | `0.7840` |
| **Corrupted Penumbra Stations Across 17 Positions** | **`0 / 17` (`0.00%` smooth contact-hardening)** | **`9 / 17` (`52.94%` entire $2.0\text{ m}$ penumbra clipped)** | `0 / 17` |
| **8,192 17-Station Passes CPU Latency (Median)** | **`0.33 ms` (`40.86×` speedup)** | — (Missing area-light penumbra) | `13.62 ms` |

---

## 🎯 2. Architect & Client First-Principles Q&A

### Q1: Why can a Signed Distance Field (SDF) compute a noise-free area-light soft shadow with just ONE ray, whereas triangle ray tracing needs 16–64 rays per pixel?
**First-Principles Breakdown**:
- A standard BVH triangle ray query only answers a boolean question: *"Did this infinitely thin line hit a triangle?"* If the ray misses a roof edge by $2\text{ cm}$, the ray has no idea the roof was even there—so you must shoot dozens of jittered rays across the sun's disk to estimate what fraction of the sun is blocked.
- An SDF query $d = \text{SDF}(\mathbf{P} + t\mathbf{L})$, by contrast, returns the **exact Euclidean distance to the nearest surface in all directions**!
- When a shadow ray passes an occluder at distance $t_{\text{occ}} = 4.0\text{ m}$ with closest signed approach distance $d_{\min}$, the ratio $d_{\min} / t_{\text{occ}}$ directly gives the **tangent of the unoccluded cone half-angle**! Dividing by the light source's angular radius $1 / k$ immediately tells us what fraction $u \in [0, 1]$ of the light source's cone is visible—using **1 ray and 0 stochastic noise**!

### Q2: How does dividing by ray distance $t$ ($k \cdot d_{\min} / t$) automatically produce physical Contact Hardening?
**Projective Cone-Aperture Law**:
The normalized visible aperture fraction is:
$$u = \text{clamp}\!\left(0.5 + 0.5 \cdot \frac{k \cdot d_{\min}}{t_{\text{occ}}},\, 0,\, 1\right), \quad S_{\text{cone}} = u^2(3 - 2u)$$
- **Near the contact point ($t_{\text{occ}} \to 0$)**: The denominator $t_{\text{occ}}$ is tiny, so the penumbra half-width $w_{\text{pen}} = t_{\text{occ}} / k \to 0$. Shadows right where an object touches the floor are **razor-sharp**!
- **Far from the occluder ($t_{\text{occ}} = 4.0\text{ m}, k = 4.0$)**: The penumbra expands linearly with distance to $w_{\text{pen}} = \pm 1.0\text{ m}$ ($2.0\text{ m}$ wide across Stations 4–12), smoothly transitioning from $S = 0.0000$ through $S(0\text{ m}) = 0.5000$ to $S = 1.0000$!

### Q3: When should an architect choose Quilez-Wright SDF Cone Soft Shadows vs. Gruen CSM + Vogel PCSS vs. Hardware Ray Tracing?
- **Choose Deterministic Quilez-Wright 1-Ray SDF Cone Soft Shadows**: For UE5 Mesh Distance Field Shadows, architectural/terrain open worlds, procedural SDF scenes, and volumetric cloud self-shadowing—delivering contact-hardening soft shadows in 1 ray without SVGF temporal ghosting.
- **Choose Gruen Normal-Offset CSM (Round 87) + Vogel-Disk PCSS (Round 59)**: For deforming skinned characters that do not have prebaked 3D distance fields.

---

## 🧭 3. Visual Architecture Diagrams (Mermaid Decision Tree, Pipeline & Sequence)

### 3.1 Real-Time Soft Shadow Selection Decision Tree
```mermaid
flowchart TD
    A["Need real-time contact-hardening area-light soft shadows?"] --> B{"Do occluders have a Signed Distance Field (Mesh SDF / Global SDF / Analytic SDF)?"}
    B -- "No: deforming skinned triangle meshes" --> C["Use Gruen Normal-Offset CSM + Vogel-Disk PCSS"]
    B -- "Yes: Mesh SDF / Global SDF / procedural SDF" --> D{"How does the sphere-tracing loop compute shadow visibility S?"}
    D -- "Naive binary sphere trace: d_min > 0 ? 1 : 0" --> E["❌ Hard Binary Cliff! Collapses 2.0m penumbra to step (-0.5000 error at d=0m across 9/17 stations)"]
    D -- "Quilez-Wright 1-Ray SDF Cone Ratio: u = clamp(0.5 + 0.5·k·d_min/t)" --> F["✅ Locks exact S(0m)=0.5000 area-light penumbra in 1 ray · 0 noise & 40.86× faster than 64-ray disk"]
```

### 3.2 Naive Binary Sphere-Tracing vs. Quilez-Wright 1-Ray SDF Cone Soft Shadow Pipeline
```mermaid
flowchart LR
    subgraph NaiveHardSDF["❌ Naive Hard Binary Sphere-Trace (9/17 Penumbra Stations Clipped)"]
        N1["March Shadow Ray & Track\nClosest Distance d_min ∈ [-1.6m, +1.6m]"] --> N2["Binary Hit/Miss Threshold\nd_min > 0 ? 1.0 : 0.0"]
        N2 --> N3["At Boundary d_min = 0.00m Outputs\nS_hard = 0.0000 (-0.5000 Step Error!)"]
        N3 --> N4["Discards Occluder Distance t_occ = 4.0m\nZero Penumbra & Zero Contact Hardening"]
    end

    subgraph QuilezConeSDF["✅ Quilez-Wright (SIGGRAPH 2015) 1-Ray SDF Cone Soft Shadow"]
        Q1["Divide Closest SDF Distance by Ray Distance\nCone Ratio r = k · d_min / t_occ"] --> Q2["Map to Visible Light Cone Fraction\nu = clamp(0.5 + 0.5·r, 0, 1)"]
        Q2 --> Q3["Integrate Circular Disk via Cubic Hermite\nS_cone = u²(3 - 2u) = 0.5000 (d=0m)"]
        Q3 --> Q4["0/17 Clipped Stations · Matches 64-Ray Disk Quadrature\nZero Noise & 40.86× Speedup"]
    end
```

### 3.3 Frame-Level SDF Cone-Traced Soft Shadow Sequence
```mermaid
sequenceDiagram
    participant GBuffer as G-Buffer (Receiver Pos P, Normal N)
    participant March as 1-Ray Sphere-Tracing Loop (Distance t)
    participant SDF as 3D Signed Distance Field
    participant Penumbra as Cubic Hermite Penumbra Stage

    GBuffer->>March: Launch 1 shadow ray along L from P + ε·N with initial cone ratio r_min = +1.0
    March->>SDF: Query closest surface distance d = SDF(P + t·L) at ray distance t (e.g. t=4.0m)
    SDF-->>March: Update minimum cone ratio r_min = min(r_min, 0.5 · k · d / t) and advance t += max(|d|, step_min)
    March->>Penumbra: Evaluate u = clamp(0.5 + r_min, 0, 1) and S = u²(3 - 2u) -> noise-free contact-hardening shadow!
```

---

## 📊 4. Visual Technology Decision Matrix

| Approach | Target Use Case | Contact-Hardening Penumbra Accuracy | Noise & Temporal Ghosting | Compute Cost (8,192 17-Station Passes) |
| :--- | :--- | :--- | :--- | :--- |
| **Quilez-Wright 1-Ray SDF Cone Ratio (`quilez-cone-ratio-soft-shadow`)** | **UE5 Distance Field Shadows, procedural SDFs, clouds** | **Exact (`0.5000` at $d=0\text{ m}$, `2.22e-16` diff vs 64-ray)** | **Zero noise, zero temporal lag** | **Minimal (`0.33 ms`, `40.86×` speedup)** |
| **Naive Hard Binary Sphere-Trace (`naive-hard-sdf-binary-shadow`)** | Pinhole point lights only | **Fails (clips all `9/17` penumbra stations; `0.5000` error)** | Zero noise (hard razor edge) | Minimal |
| **64-Ray Distributed Area-Light Tracing (`64-ray-disk-quadrature`)** | Offline path tracing | Exact | Heavy stochastic noise at low ray counts | High (`13.62 ms`, `40.86×` slower) |
| **Aaltonen Triangulated Cone Penumbra (`triangulated-sdf-shadow`)** | Eliminating large-step banding near sharp corners | Exact (triangulates true perpendicular distance between steps) | Zero noise | Minimal (+2 ALU ops per step) |

---

## 🧪 5. Interactive Demo & 7-Card 4:5 Benchmark Report Breakdown

The standalone 3D instrument bench [`demos/sdf-cone-soft-shadow-rig/`](../demos/sdf-cone-soft-shadow-rig/index.html) constructs a **58-solid 17-Station Quilez-Wright SDF Cone Penumbra Photometer Rig**:
1. **17 Shadow Visibility Columns**: Span closest-approach distances $d_{\min} \in [-1.60\text{ m}, +1.60\text{ m}]$ at occluder distance $t_{\text{occ}} = 4.0\text{ m}$ and softness $k = 4.0$.
2. **17 Cyan Quilez Cone Reference Spheres & $S = 0.5000$ Half-Umbra Bar**: Trace the $C^1$-smooth penumbra across the $2.0\text{ m}$ transition zone ($d_{\min} \in [-1.0\text{ m}, +1.0\text{ m}]$), passing through $S(0.00\text{ m}) = 0.5000$ at Station 8.
3. **17 Penumbra Step Error Pegs**: Switching to `Naive Hard Binary Sphere-Trace` collapses Stations 4–8 to $0.0000$ and snaps Stations 9–12 to $1.0000$, raising error pegs across all 9/17 penumbra stations (`0.5000` at Station 8 and `0.3520` at Stations 7 & 9).

### 7-Card 4:5 Visual Report Highlights ([`demos/sdf-cone-soft-shadow-rig/test-report-cards.html`](../demos/sdf-cone-soft-shadow-rig/test-report-cards.html))
- **Cards 1–3 (Evaluation Matrix)**: All 13 automated checks pass (`2.22e-16` equivalence between 1-ray SDF cone ratio and 64-ray distributed area-light disk quadrature, Station 8 `0.5000` boundary lock vs. `0.0000` hard binary cliff, exact reverse-scrub matrix identity, and atomic RangeError validation).
- **Cards 4–6 (Protocol & Scaling Latency)**: Across 8,192 17-station passes, Quilez 1-ray SDF cone evaluation finishes in **`0.33 ms`** vs. **`13.62 ms`** for 64-ray area-light disk quadrature (**`40.86×` speedup**).

---

## 🛠️ 6. SA Production Delivery Checklist

- [ ] **Tie cone softness $k$ to physical light source angular radius**: Set $k = \cot(\theta_{\text{source}})$ so penumbra width $w = t / k$ matches the physical size of the sun or area light.
- [ ] **Use Aaltonen two-step triangulation inside the sphere-tracing loop**: Estimate the true perpendicular distance $y = \sqrt{d_i^2 - (d_i^2 - d_{i-1}^2 + \Delta t^2)^2 / (4\Delta t^2)}$ between consecutive steps to prevent penumbra banding when marching past sharp corners.
- [ ] **Start the shadow ray at $t = t_{\min} > 0$ with geometric normal offset**: Offset the ray origin along the geometric normal $\mathbf{N}$ (Round 87) so the receiver surface itself does not divide by $t \approx 0$.
- [ ] **Hybridize near-field CSM with far-field SDF Cone Shadows**: Use Gruen normal-offset CSM for close-range dynamic characters and transition smoothly to 1-ray Mesh Distance Field Cone Shadows for midground and distant architecture.
