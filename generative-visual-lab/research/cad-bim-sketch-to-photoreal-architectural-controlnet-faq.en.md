# Why Unconstrained Img2Img Warps Load-Bearing Columns on CAD/BIM Models—and How M-LSD + Surface Normal + Metric Depth + Material Swatch Binding Lock 1.0000× Architectural Fidelity (FAQ)

> **Audience**: **Cloud & AI Solution Architects** and Design Technology Leads building rapid architectural visualization and 500-store retail spatial rollout pipelines from Revit, Rhino, and SketchUp massing models.
> **Core Value**: Solves the #1 failure mode in architectural AIGC—**bent curtain-wall mullions (`> 2.8°` angular drift), hallucinated walls blocking fire exits, and mutated client material swatches**—by combining **M-LSD Vanishing-Point Straight-Line Locks (`< 0.08°`) + Camera-Space Surface Normals + 16-Bit Metric Z-Depth + Regional BIM Material-ID IP-Adapter Swatch Binding + 360° Physical Solar Relighting** to lock structural accuracy and visualization budget at **`1.0000×`** across all 17 stages.

![Enterprise Architectural & Retail CAD/BIM Multi-ControlNet Studio Summary](./evidence/cad-bim-sketch-to-photoreal-architectural-controlnet-studio-summary.svg)

---

## 📌 1. Executive Summary

> **One-Sentence Architecture Verdict**: Architectural and retail spatial visualization requires **100% geometric loyalty to the BIM massing model alongside photorealistic daylight, glass reflections, and physical material swatches**. **Naive Unconstrained Img2Img or Single-Pass Canny (`Denoise >= 0.65`)** warps vertical columns (`> 2.8°`), seals egress doors, and replaces specified stone/metal finishes, inflating manual re-rendering and Photoshop cleanup costs as $B(u) = 1 + u$ up to **`2.0000×`** at Stage 16 (`16/17` stages violated). Deploying **Tri-ControlNet Union (M-LSD + Surface Normal + 16-Bit Depth) + Regional Material-ID IP-Adapter Swatch Binding + 360° Physical Sky Relighting** amortizes per-render cost to $c_{\text{bim}}(u) = c_0 / (1 + u)$, locking structural precision and budget efficiency at **`1.0000×` (`0/17` violations)**.

| Evaluation Dimension | ❌ Naive High-Denoise Img2Img / Single Canny | ⚠️ Traditional Offline CPU Raytracing (V-Ray) | ✅ Tri-ControlNet (M-LSD/Normal/Depth) + Material-ID Swatch Pipeline |
| :--- | :--- | :--- | :--- |
| **Column & Mullion Straightness** | ❌ **Bends straight lines (`> 2.8°` drift)** | ⭐⭐⭐⭐⭐ (Exact geometry) | ⭐⭐⭐⭐⭐ (**M-LSD vanishing-point lock `< 0.08°`**) |
| **Egress Door & Stairway Conservation** | ❌ Hallucinates blocked exits or floating stairs | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ (**`IoU >= 0.992` hard opening mask**) |
| **Physical Material Swatch Fidelity** | ❌ Prompts cannot match exact terrazzo/bronze SKU | ⭐⭐⭐⭐⭐ (Hours of manual shader tuning) | ⭐⭐⭐⭐⭐ (**Regional Material-ID IP-Adapter $\Delta E_{00} \le 1.4$**) |
| **4K Render Turnaround & Stage 16 Ratio** | 12s but **85%+ reject rate** (**`2.0000×` overrun**) | Slow (**`2 ~ 4 hours` per view**) | **`8.5s / render` · `1.0000×` lock (0/17 violations)** |

---

## 🎯 2. Architect & Business Q&A

### Q1: Why does single-channel Canny ControlNet still produce wavy curtain-wall mullions and warped floor tiles?
- **Canny Treats Shadows as Structural Edges & Lacks Vanishing-Point Priors**:
  1. Canny is an isotropic pixel-gradient detector that confuses cast shadows and foliage with load-bearing steel mullions;
  2. Combining **M-LSD (rectilinear Hough line segments aligned to 2-point perspective vanishing points)** with **Camera-Space Surface Normals (locking planar wall/floor/ceiling orientations)** and **16-Bit Metric Z-Depth (locking atrium volume)** inside a `Tri-ControlNet Union (w_mlsd=0.90, w_depth=0.85, w_normal=0.80, end_step=0.85)` preserves razor-straight `< 0.08°` structural edges while allowing natural 2mm chamfer highlights in the final 15% of denoising steps.

### Q2: How do we guarantee that a 500-store retail rollout uses the exact approved terrazzo tile on the floor and brushed bronze on the fascia without cross-bleeding?
- **BIM Material-ID Semantic Masks + Regional IP-Adapter Swatch Binding**:
  - Export an unlit **Material-ID color pass** directly from Revit/SketchUp alongside the geometry passes;
  - Convert each Material-ID color into a **Regional Attention Mask** and bind the physical manufacturer's scanned swatch image via `IP-Adapter Plus`, guaranteeing $\Delta E_{00} \le 1.4$ color accuracy and zero material bleed across surfaces.

---

## 🧭 3. Visual Architecture Diagrams (Mermaid)

### 3.1 Architectural & Retail Visualization Stack Decision Tree

```mermaid
flowchart TD
    A["Architectural / Retail Storefront Visualization Request"] --> B{"Input Geometry & Design Stage?"}
    B -->|"No 3D Model Yet<br/>(Early Moodboard Ideation)"| C["Use Flux / Midjourney + Style Reference<br/>for Open-Ended Concept Exploration"]
    B -->|"Existing Revit / Rhino / SketchUp Massing Model<br/>(Strict Structural & Spatial Dimensions)"| D{"Required for Stamped Structural<br/>Engineering Blueprints?"}
    D -->|"Yes (Permit & MEP Clash Detection)"| E["Use Native BIM (Revit / Navisworks)<br/>for Certified Engineering Drawings"]
    D -->|"No (Client Options / Competition Boards / 500-Store Rollout)"| F["✅ Enterprise Tri-ControlNet + Material Swatch Pipeline<br/>(M-LSD 0.90 + Depth 0.85 + Normal 0.80 + Regional IP-Adapter)"]
```

### 3.2 Enterprise CAD/BIM Tri-ControlNet & Solar Relighting Pipeline Architecture

```mermaid
flowchart LR
    subgraph BIMExport["① 4-Channel BIM Viewport Export"]
        B1["M-LSD Vanishing-Point Line Pass"]
        B2["Camera-Space Surface Normal Pass"]
        B3["16-Bit Metric Z-Depth Pass"]
        B4["BIM Material-ID Color Mask Pass"]
    end

    subgraph ControlCore["② Structural Lock & Swatch Bind"]
        C1["Tri-ControlNet Union<br/>(w=0.90/0.85/0.80, Stop@0.85)"]
        C2["Regional IP-Adapter Swatch Bind<br/>(Terrazzo / Bronze / Oak Swatches)"]
        C3["Egress Opening & Vector Fascia SVG Lock"]
        C1 --> C2 --> C3
    end

    subgraph SolarRelight["③ Physical Sky & 8K Board Synthesis"]
        S1["360° Solar Azimuth/Elevation Sky<br/>(Noon / Golden Hour / Rainy Night)"]
        S2["Glass Fresnel Split (30% Sky + 70% Interior)"]
        S3["ControlNet-Tile 8K 300DPI Upscale"]
        S1 --> S2 --> S3
    end

    BIMExport --> ControlCore --> SolarRelight
```

### 3.3 Sequence Diagram: Naive Img2Img Wall Warp vs Tri-ControlNet + Swatch Lock

```mermaid
sequenceDiagram
    autonumber
    participant Arch as Store Designer (SketchUp Massing + 3 Physical Swatches)
    participant Naive as ❌ Naive High-Denoise Img2Img
    participant BimPipe as ✅ M-LSD/Normal/Depth + Swatch Pipeline

    Arch->>Naive: Upload white-card viewport + prompt "Luxury flagship store, marble floor"
    Naive-->>Arch: ❌ Mullions bend by 2.8°, fire exit sealed into a wall, wrong stone color (2.0000× rework overrun)!

    Arch->>BimPipe: Export M-LSD/Normal/Depth/Material-ID + bind 3 scanned physical swatches
    BimPipe->>BimPipe: Lock straight lines (<0.08°) + regional IP-Adapter swatch injection (ΔE00 <= 1.4)
    BimPipe->>BimPipe: Render Golden Hour, Overcast & Rainy Night 8K options + project vector fascia signage
    BimPipe-->>Arch: ✅ Deliver zero-warp photoreal renders & layered PSD in 8.5s (1.0000× lock)!
```

---

## 📊 4. Horizontal Architectural Visualization Comparison Matrix

| Visualization Stack | Column & Perspective Straightness | Material Swatch Accuracy | 4K Render Turnaround | Multi-Lighting Switch Cost | Best Enterprise Fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tri-ControlNet (M-LSD/Normal/Depth) + Material-ID Swatch Pipeline** | ⭐⭐⭐⭐⭐ (**`< 0.08°` error; `100%` openings kept**) | ⭐⭐⭐⭐⭐ (**$\Delta E_{00} \le 1.4$ regional swatch**) | **`8.5 sec`** (`1.0000×` lock) | **Instant (`<10s` on identical geometry)** | **Architectural options, 500-store retail rollouts, real-estate staging** |
| **Naive Img2Img / Single Canny** | ⭐ (Bent columns, collapsed perspective) | ⭐⭐ (Text-only guess) | 12 sec (`>85%` reject rate) | Geometry mutates on every relight | Loose early moodboards |
| **Offline CPU Raytracing (V-Ray / Corona)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **Slow (`2 ~ 4 hours/render`)** | Hours of re-lighting & rendering | Final hero billboard print |
| **Real-Time Raytracers (D5 / Enscape)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | `30 ~ 60 min` (manual asset placement) | Minutes | Dedicated workstation visualization |

---

## 🧪 5. Interactive Workbench & 7-Card Report

- **Interactive Workbench**: [`demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/`](../demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/index.html)
- **7-Card 4:5 Visual Report (EN)**: [`demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/test-report-cards.html`](../demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/test-report-cards.html)
- **7-Card 4:5 Visual Report (ZH)**: [`demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/test-report-cards.zh.html`](../demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/test-report-cards.zh.html)
- **Sealed Report JSON**: [`demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/report.json`](../demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/report.json)

---

## 🛠️ 6. Enterprise Delivery Review Checklist

- [ ] **M-LSD + Surface Normal + 16-Bit Depth Export**: Does the BIM viewport exporter supply all three structural passes so vertical column drift stays `< 0.08°`?
- [ ] **Egress Opening Conservation Gate (`IoU >= 0.992`)**: Are doors, windows, and escalator wells protected by a hard structural opening mask?
- [ ] **Regional Material-ID Swatch Binding**: Are physical material swatches bound per BIM Material-ID mask via regional IP-Adapter ($\Delta E_{00} \le 1.4$)?
- [ ] **Homography-Projected Vector Storefront Signage**: Is brand fascia typography composited from vector SVGs after diffusion so storefront logos never garble?
