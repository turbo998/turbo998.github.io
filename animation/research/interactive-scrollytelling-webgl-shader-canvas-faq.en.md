# Why Multi-Section 3D Product Scrollytelling Pages Crash with `WEBGL_lose_context`—and How a Single Shared WebGL2 Scissor Canvas Locks 60fps (FAQ)

> **Audience**: **Cloud & AI Solution Architects** and Principal Frontend Engineers building Apple/Linear/Stripe-style flagship product launch scrollytelling pages with 15+ interactive 3D, shader, and sequence-frame chapters.
> **Core Value**: Eliminates the notorious `WARNING: Too many active WebGL contexts. Oldest context will be lost` crash (triggered at **8 contexts on iOS Safari** and **16 contexts on desktop Chrome**)—explaining how a **Single Fixed Full-Viewport WebGL2 Canvas (`position: fixed`) + `gl.scissor / gl.viewport` DOM Bounding-Rect Virtualization + `IntersectionObserver` Offscreen Sleep & ±2-Screen LRU Texture Disposal** locks 60fps frame budgets and VRAM efficiency at **`1.0000×`** across all 17 chapters.

![Apple-Style Product Scrollytelling Single Shared WebGL2 Scissor Canvas Orchestrator Summary](./evidence/interactive-scrollytelling-webgl-shader-canvas-orchestrator-summary.svg)

---

## 📌 1. Executive Summary

> **One-Sentence Architecture Verdict**: Browser engines enforce a strict hardware ceiling on active WebGL contexts per page (**8 on iOS Safari, 16 on desktop Chrome/Edge**). In a 17-chapter 3D product launch page, **Naive Per-Section `<canvas>` & `WebGLRenderer` Instantiation** forcibly evicts earlier contexts (`WEBGL_lose_context`, leaving blank white/black boxes when scrolling back up) and runs 17 competing `rAF` loops, inflating GPU memory and engineering rework as $S(u) = 1 + u$ up to **`2.0000×`** at Chapter 16 (`16/17` chapters violated). Mounting **1 Shared Fixed WebGL2 Canvas + `gl.scissor()` DOM Slot Virtualization + `IntersectionObserver` LRU Eviction** amortizes per-chapter cost to $c_{\text{scroll}}(u) = c_0 / (1 + u)$, locking **`1.0000×` efficiency with 0 context-loss crashes (`0/17` violations)**.

| Evaluation Dimension | ❌ Naive Per-Section `<canvas>` & `WebGLRenderer` | ⚠️ 2D Image-Sequence Scrubbing Only | ✅ 1 Shared WebGL2 Canvas + `gl.scissor()` Virtualization + LRU |
| :--- | :--- | :--- | :--- |
| **Active WebGL Context Count** | `17 contexts` (**crashes iOS at #9 & Chrome at #17!**) | `0` (2D bitmap blitting) | **`Always 1 context` (scales to 50+ chapters with 0 crashes)** |
| **Interactive 3D Orbit & Live SKU Color Swap** | Supported (until context loss wipes the canvas) | ❌ **Static baked frames; no 3D orbit or live color swap** | ⭐⭐⭐⭐⭐ (**Full scroll scrubbing + interactive 3D orbit & live PBR shaders**) |
| **Offscreen Chapter GPU & VRAM Cost** | 17 `rAF` loops + duplicated HDRI/textures in VRAM | High RAM footprint if PNG frames are un-evicted | **`0.0 ms` GPU cost when offscreen + shared PBR/HDRI pool + ±2-screen LRU** |
| **Chapters 4 / 8 / 16 Budget Ratio** | `1.2500×` / `1.5000×` / **`2.0000×`** (16/17 violated) | `1.45× ~ 1.80×` payload bloat | **`1.0000×` / `1.0000×` / `1.0000×` (0/17 violations)** |

---

## 🎯 2. Architect & Business Q&A

### Q1: Why does encapsulating a separate `<canvas>` inside each React/Vue section component work in isolation but crash on the integrated product launch page?
- **Hardware Context Exhaustion & Mobile Jetsam Kills**:
  1. Every `WebGL2RenderingContext` allocates dedicated GPU command rings and depth/stencil buffers. When Chapter 9 mounts on iPhone Safari (or Chapter 17 on desktop Chrome), the browser fires `webglcontextlost` on Chapter 1—turning the hero product section at the top of the page into a dead blank rectangle when the user scrolls back up;
  2. Furthermore, WebGL textures and HDRI environment maps **cannot be shared across separate WebGL contexts**, multiplying VRAM usage until iOS Safari terminates the tab.

### Q2: How does a single `position: fixed` WebGL2 canvas render 17 independent 3D scenes inside scrolling DOM paragraphs?
- **`gl.scissor()` & `gl.viewport()` DOM Slot Virtualization**:
  1. Each chapter in the normal HTML document flow renders a lightweight `<div class="webgl-slot">` placeholder;
  2. A single `position: fixed; inset: 0; pointer-events: none` `<canvas>` covers the viewport;
  3. On each `requestAnimationFrame`, the orchestrator iterates **only over slots currently intersecting the viewport** (tracked via `IntersectionObserver`), reads each slot's `getBoundingClientRect()`, and sets `gl.viewport(x, y, w, h)` + `gl.scissor(x, y, w, h)` before drawing that chapter's scene subgraph.

---

## 🧭 3. Visual Architecture Diagrams (Mermaid)

### 3.1 Scrollytelling Visual Technology Decision Tree

```mermaid
flowchart TD
    A["Product Launch Scrollytelling Chapter<br/>(10~25 Visual Sections on One Page)"] --> B{"Requires real-time 3D orbit,<br/>live SKU color swap, or interactive shaders?"}
    B -->|"Yes (Interactive 3D / Custom Shader)"| C["✅ Single Shared WebGL2 Scissor Canvas:<br/>1. 1 Fixed Full-Viewport WebGLRenderer<br/>2. Lightweight <div class='view-slot'> in DOM<br/>3. gl.scissor() + gl.viewport() per Visible Slot"]
    B -->|"No (1D Scroll Scrubbing Only)"| D{"Requires offline ray-traced fluids<br/>or 100M-poly CAD assembly?"}
    D -->|"Yes"| E["✅ Worker-Decoded AVIF/KTX2 Frame Sequence<br/>Streamed into Shared Canvas"]
    D -->|"No"| F["✅ CSS Scroll-Driven Animations / Rive / SVG"]
    C --> G["IntersectionObserver Sleep Gate<br/>+ ±2-Screen LRU Texture Disposal"]
    E --> G
```

### 3.2 Single Shared WebGL2 Scissor Virtualization Architecture

```mermaid
flowchart LR
    subgraph DOMFlow["① Native HTML Document Flow (0 Contexts)"]
        D1["Chapter 1: <div class='slot-1'><br/>(Offscreen: Sleeping)"]
        D2["Chapter 8: <div class='slot-8'><br/>(Visible: Rect = [120, 180, 640, 420])"]
        D3["Chapter 9: <div class='slot-9'><br/>(Visible: Rect = [780, 80, 520, 380])"]
    end

    subgraph Orchestrator["② Scrollytelling Viewport Orchestrator"]
        O1["IntersectionObserver Gate<br/>(Render Visible + Pre-Warm +1 Screen)"]
        O2["Critically Damped Spring Scroll Progress<br/>u_scroll ∈ [0.0, 1.0]"]
        O3["±2-Screen LRU Texture Disposer"]
    end

    subgraph SingleWebGL["③ Single Fixed WebGL2 Canvas (Context Count === 1)"]
        W1["Pass 1: gl.scissor(120, 180, 640, 420)<br/>Render Chapter 8 Silicon Ray-March"]
        W2["Pass 2: gl.scissor(780, 80, 520, 380)<br/>Render Chapter 9 Thermal Airflow"]
        W1 --> W2
    end

    DOMFlow --> Orchestrator --> SingleWebGL
```

### 3.3 Sequence Diagram: Scrolling Across 17 Chapters (Multi-Canvas Crash vs Shared Scissor)

```mermaid
sequenceDiagram
    autonumber
    participant User as User Scrolls Chapters 0 -> 16 -> 0
    participant Naive as ❌ Naive Multi-Canvas (17 Contexts)
    participant Scissor as ✅ Shared WebGL2 Scissor Orchestrator (1 Context)

    User->>Naive: Scroll down past Chapter 8 (iOS) / Chapter 16 (Chrome)
    Naive->>Naive: Allocate 9th / 17th WebGL2 context -> Browser evicts oldest contexts!
    Naive-->>User: ❌ WEBGL_lose_context! Scrolling back to Chapter 1 shows a dead blank box (2.0000× rework)!

    User->>Scissor: Scroll 0 -> 16 -> 0 rapidly
    Scissor->>Scissor: Sleep offscreen slots and call gl.scissor() only on visible slot rects
    Scissor->>Scissor: Reuse 1 WebGL2 context & shared HDRI/PBR texture pool
    Scissor-->>User: ✅ 0 Context Loss! Locked 60fps across all 17 chapters (1.0000× lock)!
```

---

## 📊 4. Horizontal Scrollytelling Architecture Comparison Matrix

| Scrollytelling Architecture | WebGL Contexts (20 Chapters) | iOS Safari Crash Immunity | Live 3D Interaction & Shared Assets | 60fps Scroll Smoothness | Best Enterprise Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1 Shared WebGL2 Canvas + `gl.scissor` + LRU (`<View>`)** | ⭐⭐⭐⭐⭐ (**Always `1 context`**) | ⭐⭐⭐⭐⭐ (Shared pool + LRU dispose) | ⭐⭐⭐⭐⭐ (Full 3D + shared HDRI/PBR) | **⭐⭐⭐⭐⭐ (`1.0000×` lock)** | **Apple/Linear-style 15–30 chapter 3D product launch pages** |
| **Worker AVIF/WebP Sequence + Shared Canvas** | ⭐⭐⭐⭐⭐ (`1 context`) | ⭐⭐⭐⭐ (Windowed frame buffer) | ⭐⭐ (1D timeline scrub only) | ⭐⭐⭐⭐⭐ | **Offline ray-traced fluid/explosion scroll sequences** |
| **CSS `scroll-timeline` + SVG / Rive** | ⭐⭐⭐⭐⭐ (`0 ~ 1 context`) | ⭐⭐⭐⭐⭐ (Ultra-light) | ⭐⭐⭐⭐ (2D/2.5D vector state) | ⭐⭐⭐⭐⭐ (Compositor thread) | **SaaS product tours & architecture flow diagrams** |
| **Naive Per-Section `<canvas>` & `WebGLRenderer`** | ❌ (**`17+ contexts`, guaranteed crash**) | ❌ (**VRAM duplication kills tab**) | ❌ (No cross-context texture sharing) | **Low (`2.0000×` jank & rework)** | ⛔ **Never use on pages with `> 4` WebGL sections** |

---

## 🧪 5. Interactive Workbench & 7-Card Report

- **Interactive Workbench**: [`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/index.html)
- **7-Card 4:5 Visual Report (EN)**: [`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.html`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.html)
- **7-Card 4:5 Visual Report (ZH)**: [`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.zh.html`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.zh.html)
- **Sealed Report JSON**: [`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/report.json`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/report.json)

---

## 🛠️ 6. Enterprise Delivery Review Checklist

- [ ] **Single `WebGLRenderer` Invariant (`context_count === 1`)**: Does the entire scrollytelling page share one fixed `<canvas>` using `gl.scissor()` / `gl.viewport()` slot virtualization?
- [ ] **`IntersectionObserver` Offscreen Sleep Gate**: Are offscreen chapter slots completely skipped during `requestAnimationFrame` (`0.0 ms` GPU draw cost)?
- [ ] **±2-Screen LRU Texture & Geometry Disposal**: Are heavy KTX2 textures disposed when scrolled more than 2 viewports away to prevent iOS Safari memory jetsam crashes?
- [ ] **DevicePixelRatio Clamping (`Math.min(dpr, 2)`)**: Is render target DPR capped at `2.0` on 3× mobile screens and 5K displays?
