# Real-Time Procedural Scenery: Technical Choices & Boundaries

> 🌐 **Language / 语言**: [中文 (`technique-comparison.md`)](technique-comparison.md) | **English**

## Canvas 2D: Composition via Strokes, Caches & Layer Blending

Ideal for mural narratives, parametric illustration, pigment reveal, lamp masks, and lightweight constrained physics (`demos/feitian/`). Key optimizations include static wall/relief offscreen caching (`buildWall`), 2× supersampled figure caching (`drawBody`), bounded particle pools, and `setTransform` sprite batching.

## Astra: Scientific Altimetry Displacing True 3D Vertices

Signed Int16 metric elevations from **NASA MGS MOLA MEG016** directly displace spherical mesh vertices (`demos/astra-planet/`). Base (`1440×720`) and HD (`4096×2048`) packages are pixel-center bilinear resamplings of the official NASA PDS source rather than synthetic noise. Micro-normal bakes (`mars-micro-normal.png`), mineral spectral stratigraphy, hypothetical oceans, volumetric clouds, and atmospheric scattering are restricted to `realistic` mode (`uMode == 0`), while `gray`, `wireframe`, and `height` inspection modes plus self-contained GLB export keep the measured geometry transparently verifiable.

## Three.js + Blender 4.5 LTS MCP: Hard-Surface Kits & Spatial Cameras

Volumetric rockets, lattice launch towers, terrain, and tracking cameras (`demos/rocket-launch/`) require true 3D projection and PBR lighting. Combining offline Blender 4.5 MCP parametric modeling (`rocket-kit.glb`) with runtime per-material geometry merging (`mergeGeometries`) delivers intricate industrial detail within 28 draw calls, paired with a single-draw depth-sorted `THREE.Points` smoke pool and analytical supersonic plume shaders.

## Inspectable Engineering Over Vague Claims

Real-time frame-budget telemetry (`p95`), source code, SHA-256 dataset manifests, state-machine unit tests, and standalone GLB reload checks provide concrete verification. Zero runtime model inference APIs, secrets, or external CDNs are used; every demo runs self-contained from committed static code and assets.
