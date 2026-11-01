# Gemini 4 Argon + Blender 4.5 LTS MCP Hybrid Rendering Architecture Study

> 🌐 **Language / 语言**: [中文 (`blender-mcp-pipeline.md`)](blender-mcp-pipeline.md) | **English**

This document details how `generative-visual-lab`, powered by **Gemini 4 Argon (`gemini-4-argon`)**, integrates local **Blender 4.5.10 LTS** and **`blender-mcp` (v2.0.0)** to establish a hybrid pipeline combining **offline high-precision 3D procedural modeling / Cycles ray-traced baking** with **browser-native real-time WebGL2 / Canvas 2D interactive rendering**.

---

## 1. Why "Offline Blender MCP Baking + Real-Time Frontend Rendering"?

Browser-based scientific visualization and artistic storytelling face two fundamental tensions:

1. **The geometric and lighting ceiling of purely procedural real-time code**: Relying exclusively on hand-written Canvas 2D paths or primitive Three.js geometries (`CylinderGeometry`, `ConeGeometry`) struggles to convey intricate mechanical chamfers, titanium honeycomb grid fins, deep grotto bas-relief ambient occlusion (AO), and seamless micro-topographic tangent-space normals.
2. **Pre-rendered videos sacrifice real-time interactivity and scientific inspectability**: Pre-recorded Cycles videos cannot allow users to freely orbit Mars, toggle scientific elevation exaggeration, inspect mesh seams in real time, or trigger Feitian pigment reveal and rocket ignition on demand.

Therefore, Generative Visual Lab adopts a **Hybrid Offline-Bake + Real-Time Rendering** architecture:
- **Build-Time (via Blender MCP)**: `scripts/blender/*.mjs` invoke `blender-mcp.exe` over standard MCP JSON-RPC 2.0 to drive headless `Blender 4.5.10 LTS` (`127.0.0.1:9876`), executing `bpy`/`bmesh` parametric modeling and Cycles ray-traced baking into compact `.glb` and `.png` static assets while saving standalone Cycles renders and MCP transcripts as reproducible evidence.
- **Runtime (in Browser)**: Deployed as pure static files on GitHub Pages with zero runtime model APIs and zero external CDNs, maintaining 60fps interactive frame budgets and full geometric/scientific inspectability.

---

## 2. Blender MCP Protocol Chain & Headless Daemon

```
Node.js Builder Scripts (scripts/blender/build-*.mjs)
   │  stdio (JSON-RPC 2.0: initialize -> tools/call)
   ▼
blender-mcp.exe (mcp-for-blender v2.0.0)
   │  TCP Socket (127.0.0.1:9876, protocol v13)
   ▼
Blender 4.5.10 LTS (-b --python scripts/blender/mcp-headless-daemon.py)
   ├─ execute_blender_code (bpy / bmesh / mathutils / Cycles)
   ├─ get_scene_info / get_object_info
   └─ Exports GLB kits / Cycles baked textures / Cycles ray-traced renders
```

- **Headless Daemon (`scripts/blender/mcp-headless-daemon.py`)**: Loads `blender_mcp_addon.BlenderMCPServer` inside `blender -b` background mode and binds the main-thread dispatch queue to a headless event loop so `execute_blender_code`, `get_scene_info`, and `get_object_info` run deterministically without a GUI.
- **MCP Client (`scripts/blender/mcp-client.mjs`)**: Encapsulates standard MCP `initialize` and `tools/call` requests, automatically capturing tool outputs into `docs/evidence/blender-mcp-*.json`.

---

## 3. Blender MCP Assets & Real-Time Compositing Across the Three Core Demos

### 3.1 Launch · White Rocket (`demos/rocket-launch/`)

- **Builder Script**: `scripts/blender/build-rocket-assets.mjs`
- **Exported Asset**: `demos/rocket-launch/assets/rocket-kit.glb` (glTF 2.0 binary)
- **Cycles Reference Render**: [blender-rocket-cycles-render.png](evidence/blender-rocket-cycles-render.png) · [MCP Transcript](evidence/blender-mcp-rocket.json)
![Launch · Blender 4.5 LTS Cycles ray-traced reference render (white rocket, titanium grid fins, 5-engine De Laval nozzles, and launch tower)](evidence/blender-rocket-cycles-render.png)
- **Three-Tier Named Hierarchy**:
  1. `RocketVehicle`: 25-segment tangent-ogive nosecone, interstage rings, longitudinal cable raceways, 4 titanium honeycomb grid fins, 4 aerodynamic tail fins with Microsoft four-color tip stripes (`#F25022` / `#7FBA00` / `#00A4EF` / `#FFB900`), and 5 regenerative-cooled De Laval nozzles.
  2. `UmbilicalArm`: Separating umbilical swing arm and clamp head driven by the frontend state machine during liftoff.
  3. `LaunchPadStatic`: Flame trench, blast deflectors, four hydraulic hold-down arms, lattice launch tower, hammerhead crane, and cryogenic water/LH2/LOX spheres.
- **Frontend Static Batching**: `demos/rocket-launch/main.ts` parses the GLB via `GLTFLoader` and merges static meshes per material bucket using `mergeGeometries`, keeping the entire launch complex within **28 draw calls** and `p95 <= 50ms` during steady-state ascent (`T+9s`).

### 3.2 Astra · Mars Planet Lab (`demos/astra-planet/`)

- **Builder Script**: `scripts/blender/build-astra-assets.mjs`
- **Exported Asset**: `demos/astra-planet/public/data/mars-micro-normal.png` (256×256 seamless Cycles baked normal/cavity texture)
- **Cycles Reference Render**: [blender-astra-cycles-render.png](evidence/blender-astra-cycles-render.png) · [MCP Transcript](evidence/blender-mcp-astra.json)
![Astra · Blender 4.5 LTS Cycles Mars orbital reference render (NASA MOLA measured elevation + micro-relief normal bake)](evidence/blender-astra-cycles-render.png)
- **Scientific Boundary & Micro-Relief Layering**:
  - Macroscopic topography (`1440×720` base package and `4096×2048` HD package) derives 100% from NASA MOLA MEGDR measured altimetry; vertex radii, shoreline classification, and area/elevation statistics remain completely unaltered.
  - Blender Cycles-baked `mars-micro-normal.png` encodes Martian basalt scarps, aeolian dunes, yardangs, polygonal fractures, and micro-craters in RGB (tangent-space normal) and Alpha (ambient cavity occlusion), perturbing fragment normals strictly in `realistic` mode while bypassing completely in `gray`, `wireframe`, and `height` inspection modes.

### 3.3 Winds Among the Murals · Feitian (`demos/feitian/`)

- **Builder Script**: `scripts/blender/build-feitian-assets.mjs`
- **Exported Asset**: `demos/feitian/assets/grotto-relief-bake.png` (640×360 Cycles orthogonal relief bake)
- **Cycles Reference Render**: [blender-feitian-cycles-render.png](evidence/blender-feitian-cycles-render.png) · [MCP Transcript](evidence/blender-mcp-feitian.json)
![Winds Among the Murals · Blender 4.5 LTS Cycles Mogao four-niche grotto relief ray-traced render](evidence/blender-feitian-cycles-render.png)
- **Zero Per-Frame Overhead Compositing**:
  - Models a 16:9 Mogao sandstone grotto wall, four arched niches (`NicheArch_0..3`) aligned with the four Feitian home coordinates, lotus lintels, Sumeru pedestals, and a coffered lotus caisson ceiling illuminated by warm butter-lamp raking light and baked orthogonally in Cycles.
  - Composited once during `buildWall()` and `renderPortrait()` initialization via `soft-light` and `multiply` blend modes, incurring zero per-frame draw cost in the animation loop (`p95 ~ 16.8ms <= 33.3ms`).
