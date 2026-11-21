import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"game-prop-npc":{id:"game-prop-npc",titleZh:"游戏美术道具与可绑定角色白模生产管线（UE5 / Unity 四边面流形拓扑）",titleEn:"Game Prop & Rig-Ready Asset Pipeline (UE5 / Unity Manifold Quad Retopology)",subtitleZh:"对比“Hunyuan3D-2 / Meshy / Tripo 直出 32万面杂乱三角网 + 碎裂 UV + 死阴影贴图（无法蒙皮绑定、引擎掉帧）”与“Hunyuan3D-2 高模雕刻 + QuadriFlow 1.2万四边面重拓扑 + 高烘低法线/去光影 PBR + KTX2”",subtitleEn:"Compares Raw 320k-Triangle Marching-Cubes Export (un-riggable, baked shadows, 4,200 UV islands) vs. Hunyuan3D-2 High-Poly + QuadriFlow 12k Quad Retopo + High-to-Low Normal Bake & Albedo Delighting",monthlyAssets:12e3,controlledStack:"Hunyuan3D-2 High-Poly + QuadriFlow 12k Quads + Blender Headless Normal/PBR Bake ($0.065/asset)",naiveStack:"Raw Commercial 3D API Export (320k Triangles + Baked-In Diffuse Shadows) ($1.20/asset)",controlledPolyCountK:12,naivePolyCountK:320,controlledGlbSizeMb:2.1,naiveGlbSizeMb:42.8,controlledMobileFps:60,naiveMobileFps:24,controlledPbrRelightScorePct:98.6,naivePbrRelightScorePct:48,controlledCostPerAssetUsd:.065,naiveCostPerAssetUsd:1.2,controlledAnnualSavingsM:1.48,decisionSummaryZh:"为什么游戏美术师普遍抱怨 AI 3D 大模型“只能看不能进引擎”？因为 Marching Cubes / DMTet 提取出的原始网格高达 32 万个杂乱三角面（无循环边，骨骼一弯就破面），UV 碎成 4,200 个孤岛，且漫反射贴图里烤死了概念图的阴影。生产级管线必须把 AI 当作“高模雕刻师（ZBrush）”而非最终导出器：用 Hunyuan3D-2 生成高模几何，通过 QuadriFlow 自动重拓扑为 1.2 万个规整四边面（Quads），将高模细节射线烘焙（Ray-Bake）至切线空间法线贴图（Normal Map），并用 Intrinsic Delighting 剥离死阴影输出纯正 Albedo/Roughness/Metallic，面数锐减 -96.3%，动态光影评分达 98.6%。",decisionSummaryEn:"Game technical artists reject raw AI 3D exports because Marching Cubes produces 320k chaotic triangles (impossible to rig/deform), 4,200 fragmented UV islands, and baked-in lighting that looks wrong under UE5 Lumen. Treat Hunyuan3D-2 strictly as a High-Poly Sculptor: run automated QuadriFlow retopology to 12k manifold quads, ray-bake high-to-low Tangent Normal/AO maps in headless Blender, and delight the Albedo channel (-96.3% poly reduction, 98.6% PBR relighting accuracy, $0.065/asset on AKS).",stages:[{stage:"1. High-Poly Neural Sculpt",controlledEngine:"Hunyuan3D-2 DiT Shape + Multi-View Consistent Geometry",naiveBehavior:"Used Directly as Final Engine Mesh (320k Tris)",metricImpact:"Clean Watertight SDF Base"},{stage:"2. Manifold Quad Retopology",controlledEngine:"QuadriFlow / Instant-Meshes Edge-Loop Quad Solver (12k Quads)",naiveBehavior:"Zero Retopology -> Pinched Triangles on Deformation",metricImpact:"-96.3% Polygon Count (320k -> 12k)"},{stage:"3. UV Atlas & High-to-Low Bake",controlledEngine:"xatlas 1-Sheet Packing (>82% Fill) + Headless Blender Ray-Bake",naiveBehavior:"4,200 Fragmented UV Islands (38% Texel Waste)",metricImpact:"Sub-Millimeter Normal Detail Retained"},{stage:"4. Intrinsic PBR Delighting",controlledEngine:"IDArb / Chameleon Delighting -> Pure Albedo + Roughness + Metal",naiveBehavior:"Baked-In Concept Art Shadows Clash with Scene Light",metricImpact:"98.6% vs 48.0% Dynamic Relight Score"}]},"ecommerce-ar-glb":{id:"ecommerce-ar-glb",titleZh:"电商 WebAR / iOS QuickLook 家具与鞋服 3D 试摆资产管线（<3MB 极速首屏）",titleEn:"E-Commerce WebAR / USDZ Furniture & Footwear 3D Pipeline (<3MB Instant Load)",subtitleZh:"对比“Trellis / Tripo 直出 38MB 原始 GLB（移动端加载 9秒超时流失）”与“Trellis SLAT + 8k 减面 + 4K 实拍局部投射 + Draco 几何压缩 & KTX2 BasisU 纹理压缩（1.8MB，60fps）”",subtitleEn:"Compares 38MB Raw GLB Export (9s mobile load timeout) vs. Trellis SLAT + 8k Decimation + Draco + KTX2 UASTC Texture Compression (1.8MB, 60fps)",monthlyAssets:25e3,controlledStack:"Trellis SLAT + 8k Decimation + Delighting + Draco/KTX2 + USDZ Dual Export ($0.048/asset)",naiveStack:"Uncompressed Raw PNG-in-GLB SaaS API Export (38.5 MB · Mobile OOM)",controlledPolyCountK:8.5,naivePolyCountK:260,controlledGlbSizeMb:1.8,naiveGlbSizeMb:38.5,controlledMobileFps:60,naiveMobileFps:26,controlledPbrRelightScorePct:99.1,naivePbrRelightScorePct:52,controlledCostPerAssetUsd:.048,naiveCostPerAssetUsd:.95,controlledAnnualSavingsM:2.52,decisionSummaryZh:"电商详情页 WebAR（Three.js `<model-viewer>` / Apple VisionOS USDZ）的黄金生死线是“GLB 包体积 < 3 MB、首屏加载 < 1.2 秒”。AI 3D 模型直出的 GLB 内嵌未压缩 PNG 贴图与 26 万面网格，体积高达 38.5 MB。通过自动化后处理网关执行 8.5k 保边减面、法线烘焙与 `gltfpack -cc -tc`（Draco 网格压缩 + KTX2 GPU 原生纹理），包体积缩减 -95.3% 至 1.8 MB，移动端满帧 60fps。",decisionSummaryEn:"E-commerce WebAR (`<model-viewer>` and iOS QuickLook USDZ) requires `<3 MB` payloads for sub-second mobile loading. Raw AI 3D exports bundle uncompressed PNGs and 260k triangles into a `38.5 MB` file. Running automated silhouette-preserving decimation (`8.5k` faces), normal baking, and `gltfpack` Draco + KTX2 compression shrinks the payload by `-95.3%` to `1.8 MB` at `60 fps`.",stages:[{stage:"1. Multi-View SLAT Reconstruction",controlledEngine:"Microsoft Trellis Structured Latent 3D Generation",naiveBehavior:"Single-View Ambiguous Backside Volume",metricImpact:"Metric Scale & Floor Contact Plane"},{stage:"2. Silhouette-Locked Decimation",controlledEngine:"Quadric Error Metrics (QEM) Locking UV Seams & Borders (8.5k)",naiveBehavior:"260k Unoptimized Dense Triangles",metricImpact:"60fps vs 26fps Mobile WebGL"},{stage:"3. PBR Material Calibration",controlledEngine:"Fabric/Leather/Wood Micro-Roughness Prior Injection",naiveBehavior:"Uniform Plastic Specular Response",metricImpact:"99.1% AR Environment Light Match"},{stage:"4. Draco + KTX2 + USDZ Packaging",controlledEngine:"gltfpack Draco Mesh + KTX2 UASTC + RealityConverter USDZ",naiveBehavior:"38.5 MB Raw GLB with PNG Textures",metricImpact:"1.8 MB (-95.3% Size) · $0.048/Asset"}]},"hard-surface-industrial":{id:"hard-surface-industrial",titleZh:"工业硬表面与消费电子产品展示 3D 管线（折痕硬边保护 + SVG 丝印贴花层）",titleEn:"Hard-Surface Industrial & 3C Product 3D Pipeline (Crease-Edge Lock + Vector Decal Layer)",subtitleZh:"针对机械/家电/数码产品“倒角被 AI 抹圆、机身丝印小字模糊”顽疾：采用“Trellis 硬表面重建 + 法线夹角 >35° 自动硬边折痕（Auto-Sharp Crease）+ 独立透明矢量贴花层（Decal Mesh）”",subtitleEn:"Prevents roundedchamfers and blurry chassis silkscreen text: Trellis Hard-Surface + >35° Auto-Sharp Crease + Floating Vector SVG Decal Quad",monthlyAssets:6e3,controlledStack:"Trellis Hard-Surface + >35° Sharp-Crease Retopo + Vector SVG Decal Layer ($0.078/asset)",naiveStack:"Organic SDF Marching-Cubes Mesh (Melted Chamfers & Blurry 1K Logo Text)",controlledPolyCountK:14.5,naivePolyCountK:380,controlledGlbSizeMb:2.4,naiveGlbSizeMb:46,controlledMobileFps:60,naiveMobileFps:22,controlledPbrRelightScorePct:99.3,naivePbrRelightScorePct:44.5,controlledCostPerAssetUsd:.078,naiveCostPerAssetUsd:1.5,controlledAnnualSavingsM:.96,decisionSummaryZh:"SDF 隐式场生成 3D 模型天生带有“有机鹅卵石平滑倾向”，会把数码产品锐利的金属 CNC 倒角抹成肥皂状，且把机身铭牌丝印揉成马赛克。通过法线夹角 `>35°` 折痕约束重拓扑恢复硬朗机械棱线，并将品牌 Logo 与接口丝印剥离为贴合表面 `0.2mm` 的独立高清透明贴花网格（Decal Layer），完美兼顾 2.4MB 小包体与视网膜级丝印清晰度。",decisionSummaryEn:'Implicit SDF fields naturally smooth sharp CNC chamfers into organic "melted soap" edges and blur fine silkscreen text on 1K UV maps. Enforcing `>35°` sharp-crease edge loops during retopology and floating a dedicated `0.2mm` offset alpha decal quad for vector logos/port labels delivers razor-sharp industrial edges inside a `2.4 MB` GLB.',stages:[{stage:"1. Hard-Surface Prior Reconstruction",controlledEngine:"4-View Orthographic Trellis SLAT + Planar Face Snap",naiveBehavior:"Wobbly Non-Planar Flat Surfaces",metricImpact:"Zero Ripples on Metallic Reflections"},{stage:"2. Auto-Sharp Crease Retopology",controlledEngine:"Dihedral Angle >35° Hard-Edge Split + Weighted Vertex Normals",naiveBehavior:"Smoothed Phong Normals Rounding Off Chamfers",metricImpact:"Crisp CNC Bevel Highlights"},{stage:"3. Floating Vector Decal Layer",controlledEngine:"0.2mm Offset Decal Quad for Crisp Brand Logos & Port Labels",naiveBehavior:"Baked into 1024px Full-Body UV (Blurry Text)",metricImpact:"99.3% Silkscreen & PBR Fidelity"},{stage:"4. Anisotropic Metal & Glass Split",controlledEngine:"Separate Sub-Mesh Material Slots (Clearcoat + Transmission)",naiveBehavior:"Single Opaque Material Merging Glass & Metal",metricImpact:"2.4 MB GLB at 60fps ($0.078/Asset)"}]}};function d(l,a="controlled"){const e=c[l],o=a==="controlled",t=Number(((e.naivePolyCountK-e.controlledPolyCountK)/e.naivePolyCountK*100).toFixed(1)),i=Number(((e.naiveGlbSizeMb-e.controlledGlbSizeMb)/e.naiveGlbSizeMb*100).toFixed(1));return{scenario:e,mode:a,activePolyCountK:o?e.controlledPolyCountK:e.naivePolyCountK,activeGlbSizeMb:o?e.controlledGlbSizeMb:e.naiveGlbSizeMb,activeMobileFps:o?e.controlledMobileFps:e.naiveMobileFps,activePbrRelightScorePct:o?e.controlledPbrRelightScorePct:e.naivePbrRelightScorePct,activeCostPerAssetUsd:o?e.controlledCostPerAssetUsd:e.naiveCostPerAssetUsd,polyReductionPct:t,sizeReductionPct:i,annualSavingsM:e.controlledAnnualSavingsM}}let s="game-prop-npc",n="controlled";function r(){const l=document.querySelector("#app");if(!l)return;const a=d(s,n),e=a.scenario,o=n==="controlled";l.innerHTML=`
    <main class="workbench-shell" data-mode="${n}" data-usecase="${s}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">203RD WORKBENCH · DOMAIN 4 · ENTERPRISE IMAGE-TO-3D ASSET PIPELINE SELECTION STUDIO</span>
          <h1>游戏与电商 3D 资产生成大模型选型工作台：Hunyuan3D-2 / Trellis / Meshy 直出网格 vs 四边面重拓扑 + PBR 烘焙管线</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="3D Asset Use Case">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${s===t?"active":""}" data-usecase-btn="${t}">
                ${t==="game-prop-npc"?"1. 游戏道具与可绑定四边面 (UE5 / Unity 12k Quads)":t==="ecommerce-ar-glb"?"2. 电商 WebAR / USDZ 极速包体 (1.8MB Draco+KTX2)":"3. 3C 硬表面折痕保护 + 矢量贴花 (Hard-Surface)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Pipeline Mode">
            <button class="seg-btn ${o?"active":""}" data-mode-btn="controlled">
              ✅ 高模生成 + Quad 重拓扑 + 去阴影 PBR + KTX2 ($${e.controlledCostPerAssetUsd}/件)
            </button>
            <button class="seg-btn ${o?"":"active"}" data-mode-btn="naive">
              ⛔ AI 原始三角网直出 (${e.naivePolyCountK}k 面 · ${e.naiveGlbSizeMb}MB · 烤死阴影)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">引擎拓扑面数 (Mesh Polygon Count)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activePolyCountK}k ${o?"Quads":"Tris"}</strong>
          <span class="kpi-note">面数削减 -${a.polyReductionPct}% · 支持骨骼绑定与 LOD</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">交付包体与移动端帧率 (GLB Payload & FPS)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activeGlbSizeMb} MB · ${a.activeMobileFps} fps</strong>
          <span class="kpi-note">体积压缩 -${a.sizeReductionPct}% (Draco + KTX2 UASTC)</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">动态光源 PBR 还原度 (Dynamic Relight Score)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activePbrRelightScorePct}%</strong>
          <span class="kpi-note">Intrinsic 去阴影 Albedo + 高模烘焙切线法线贴图</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单件资产成本与年化节省 (Unit Cost & Savings)</span>
          <strong class="kpi-val good">$${a.activeCostPerAssetUsd.toFixed(3)} · +$${a.annualSavingsM.toFixed(2)}M/yr</strong>
          <span class="kpi-note">AKS 自建 Hunyuan3D-2/Trellis + Headless Blender</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 为什么 AI 直出 3D 网格不能直接进引擎？高模雕刻 → 四边面重拓扑 → 高烘低 PBR 架构图解</h2>
            <span class="badge">${o?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Image to 3D Retopology and PBR Baking Pipeline">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 22)">
              <rect width="195" height="120" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="26" fill="#93c5fd" font-size="12" font-weight="700">Stage 1: AI High-Poly Sculpt</text>
              <text x="14" y="48" fill="#f8fafc" font-size="15" font-weight="800">Hunyuan3D-2 / Trellis</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="11">320k Dense SDF Mesh</text>
              <text x="14" y="90" fill="#38bdf8" font-size="10">Role: ZBrush Digital Clay Only</text>
              <text x="14" y="108" fill="#f87171" font-size="10">Never ship raw mesh to Web/UE5!</text>
            </g>

            <g transform="translate(242, 22)">
              <rect width="195" height="120" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="26" fill="#6ee7b7" font-size="12" font-weight="700">Stage 2: Quad Retopology</text>
              <text x="14" y="48" fill="#f8fafc" font-size="15" font-weight="800">QuadriFlow + xatlas</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="11">${e.controlledPolyCountK}k Manifold Quads</text>
              <text x="14" y="90" fill="#34d399" font-size="10">Clean Edge Loops + &gt;82% UV Fill</text>
              <text x="14" y="108" fill="#a7f3d0" font-size="10">-${a.polyReductionPct}% Polygons Reduced</text>
            </g>

            <g transform="translate(464, 22)">
              <rect width="196" height="120" rx="10" fill="#111c33" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="26" fill="#d8b4fe" font-size="12" font-weight="700">Stage 3: Ray-Bake &amp; Delight</text>
              <text x="14" y="48" fill="#f8fafc" font-size="15" font-weight="800">Normal + Pure PBR</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="11">High-to-Low Tangent Normal</text>
              <text x="14" y="90" fill="#c084fc" font-size="10">Intrinsic Shadow Removal</text>
              <text x="14" y="108" fill="#e9d5ff" font-size="10">Draco + KTX2 (${e.controlledGlbSizeMb} MB GLB)</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="116" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="28" fill="#e2e8f0" font-size="13" font-weight="700">主流 3D 生成大模型能力边界对比 (2026 Production Selection Benchmark)</text>
              <text x="18" y="54" fill="#34d399" font-size="12">• Hunyuan3D-2 (开源自建主力): 几何锐度与角色/道具完整度最高，配合 QuadriFlow + Blender 烘焙单件仅 $0.065</text>
              <text x="18" y="78" fill="#60a5fa" font-size="12">• Microsoft Trellis (SLAT 架构): 多视图硬表面结构与局部编辑最强，最适合电商家具与 3C 硬件 ($0.048/件)</text>
              <text x="18" y="102" fill="#f8fafc" font-size="12">• Tripo3D v2.5 / Meshy-4 (商用 API): 适合零 GPU 团队低频快速原型 ($0.95-$1.50/件)，进生产引擎仍需重拓扑与 KTX2 压缩</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段工程化 3D 资产后处理流水线拆解</h2>
            <span class="badge">UE5 / Unity / WebAR Ready</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 生产级重拓扑管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 原始网格直出：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,l.querySelectorAll("[data-usecase-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.usecaseBtn;i&&(s=i,r())})}),l.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(n=i,r())})})}r();
