# Feitian Animation: From Reference Observation to Original Implementation

> 🌐 **Language / 语言**: [中文 (`feitian-reference-study.md`)](feitian-reference-study.md) | **English**

## Research Subject & Evidence

Reference page: `https://ds470b74heox1.cloudfront.net/opus55-feitian/index.html`

This study is based on inspecting the public HTML/inline script and observing browser execution, silent grotto entry, and single-figure playback. Model names in the reference page title represent author attribution rather than an independently verified model benchmark.

## Key Finding: Canvas 2D Procedural Art, Not 3D Skeletal Rigging or Pre-Rendered Video

The visual experience is driven by **Canvas 2D**: figures, grotto walls, ornaments, lotus petals, and audio are generated procedurally in the browser. The sense of relief and detachment from the mural relies on drop shadows, scale transitions, painter's-order occlusion, and layer blending rather than 3D skeletal meshes.

- **Parametric Figures**: Contour curves and parametric proportions with two-segment inverse kinematics (IK) arms and time-varying torso/head/skirt postures.
- **Silk Ribbons (Verlet / PBD)**: Each node stores current and previous positions; Verlet integration applies damping and wind forces, while endpoint pinning, segment length, and Laplacian bending constraints are relaxed over fixed iterations. Normal expansion along the centerline with periodic width modulation and dual-sided mineral colors creates a 3D twisting ribbon illusion.
- **Pigment Reveal**: Weathered and vibrant figure states are pre-rendered into offscreen caches; circular clipping reveals vibrant mineral pigments under the user's lamp before cross-fading into flight.
- **Arc-Length Flight Parameterization**: Spline paths with cumulative arc-length lookup tables drive figure tangent orientation independently of camera panning.
- **Grotto Lighting & WebAudio**: Static sandstone textures, cracks, and Blender Cycles orthogonal relief bakes (`grotto-relief-bake.png`) are cached once in `buildWall()`. Pointer-driven warm radial lamp light and WebAudio pentatonic harmonics (triggered only after explicit user gesture) complete the atmosphere.
- **Performance Guardrails**: Bounded DPR, capped particle counts, cached 2× supersampled bodies (`drawBody`), and pre-rendered dual-layer lotus petal sprites keep 1440×1000 group flight at `p95 ~ 16.8ms` (budget `<= 33.3ms`).

## Original Implementation & Provenance Boundaries

"Winds Among the Murals" (`demos/feitian/`) uses 100% original code, four distinct figures (*Qingyu*, *Liuxia*, *Tingfeng*, *Shiguang*), arched niches, costume contours, PBD ribbon physics, flight paths, wall textures, and pentatonic audio sequences. No code, artwork, music, or screenshots are copied from the reference site. `prefers-reduced-motion` preserves in-place pigment reveal while disabling autonomous flight and falling petals.
