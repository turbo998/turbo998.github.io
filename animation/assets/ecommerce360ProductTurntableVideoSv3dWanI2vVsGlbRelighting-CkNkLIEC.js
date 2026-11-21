import"./modulepreload-polyfill-B5Qt9EMX.js";const h={"sneaker-footwear":{id:"sneaker-footwear",titleZh:"运动鞋履 360° 悬浮环绕短视频（Amazon / TikTok Shop PDP 6秒主图视频）",titleEn:"Sneaker 360° Floating Turntable Video (Amazon / TikTok Shop 6s PDP Clip)",subtitleZh:"对比“单张正侧图直出 Kling / Wan-I2V 360° 运镜（转过 60° 后鞋跟变形、Logo 融化）”与“双图 Hunyuan3D-2 代理网格 + 正反 UV 贴图锁定 + Three.js 360° 渲染 + IC-Light 光影融合”",subtitleEn:"Compares Single-Photo Kling/Wan-I2V 360° Prompting (heel warping & logo melting past 60° yaw) vs. 2-View Hunyuan3D-2 Proxy Mesh + Front/Back UV Lock + Three.js 360° Pass + IC-Light Relighting",monthlyVideos:25e3,orbitDegrees:360,inputViewsAvailable:2,controlledStack:"2-Photo UV + Hunyuan3D-2 Proxy GLB + Three.js 360° Pass + IC-Light Background ($0.042/clip)",naiveStack:'Single-Image Kling / Sora 2 I2V Prompt ("camera orbits 360 deg") ($0.45/clip + 3.2× Retries)',controlledGeometryLockPct:99.1,naiveGeometryLockPct:61.4,controlledBacksideLogoAccuracyPct:99.4,naiveBacksideLogoAccuracyPct:28.5,controlledCostPerVideoUsd:.042,naiveCostPerVideoUsd:1.44,controlledRenderLatencySec:4.6,naiveRenderLatencySec:48,controlledAnnualSavingsM:.42,decisionSummaryZh:"单张商品图直接丢给通用 I2V 视频大模型写提示词“360度环绕”，当镜头转过 60° 进入盲区时，模型只能靠猜测编造鞋跟与内侧结构（几何失真率 38.6%，品牌勾标变形）。通过“正反 2 张实拍白底图 + Hunyuan3D-2/Trellis 生成粗糙 3D 代理网格并做高精 UV 投射 + Three.js 确定性 360° 旋转渲染 + IC-Light 合成动态展台光影”，几何与背面 Logo 锁定率达 99.1%，单条视频成本从 $1.44（含抽卡重试）降至 $0.042（降幅 -97.1%）。",decisionSummaryEn:"Prompting a single-image I2V model to orbit 360° forces hallucinations past 60° yaw (61.4% geometry lock, 28.5% backside logo accuracy). Projecting 2 front/back SKU photos onto a Hunyuan3D-2 proxy mesh, rendering a deterministic Three.js 360° turntable pass, and harmonizing shadows via IC-Light achieves 99.1% geometry lock at $0.042/video (-97.1% vs. $1.44 retry-adjusted API cost).",stages:[{stage:"1. Input View Acquisition",controlledEngine:"Front + Back SKU Clean Plates (or ±45° only via SV3D if 1 photo)",naiveBehavior:"Single Front Photo Forced into 360° Orbit",metricImpact:"Zero Backside Blind-Spot Guesswork"},{stage:"2. 3D Proxy & UV Projection",controlledEngine:"Hunyuan3D-2 / Trellis Proxy GLB + Camera-Space High-Res UV Bake",naiveBehavior:"2D Latent Video Diffusion Optical Flow Extrapolation",metricImpact:"99.1% vs 61.4% Silhouette Lock"},{stage:"3. Deterministic Turntable Pass",controlledEngine:"Headless Three.js 60fps Orbital Camera (Depth + Normal + RGB)",naiveBehavior:"Uncontrolled Camera Speed & Wobble",metricImpact:"Exact 360° Loop Seam (0px Jump)"},{stage:"4. AI Studio Relighting & BG",controlledEngine:"IC-Light + Wan-VACE Depth-Guided Pedestal & Rim Light",naiveBehavior:"Baked-In Hallucinated Studio Reflections",metricImpact:"$0.042 vs $1.44 Retry-Adjusted Cost"}]},"cosmetics-packaging":{id:"cosmetics-packaging",titleZh:"美妆护肤瓶身 ±45° 微距流光短视频（仅有 1 张正面主图时的降级边界）",titleEn:"Cosmetics Bottle ±45° Macro Shimmer Video (Single-Photo Safe-Angle Boundary)",subtitleZh:"当商家只有 1 张正面主图、无法提供背面成分表实拍时：严禁强转 360°！自动路由至“SV3D ±35° 安全摆幅 + 瓶标 UV 锁定 + IC-Light 水波流光背景”",subtitleEn:"When only 1 front photo exists (no back label photo): strictly cap orbit to ±35° via SV3D + Label Mask Lock + IC-Light caustic background",monthlyVideos:4e4,orbitDegrees:70,inputViewsAvailable:1,controlledStack:"Single-Photo Safe-Arc Router (±35° Cap) + Label Mask Lock + IC-Light ($0.028/clip)",naiveStack:"Single-Photo Forced 180°/360° I2V Generation (Gibberish Back Label Text)",controlledGeometryLockPct:99.5,naiveGeometryLockPct:58,controlledBacksideLogoAccuracyPct:99.8,naiveBacksideLogoAccuracyPct:19.2,controlledCostPerVideoUsd:.028,naiveCostPerVideoUsd:1.15,controlledRenderLatencySec:3.2,naiveRenderLatencySec:42,controlledAnnualSavingsM:.54,decisionSummaryZh:"架构师核心防呆准则：如果业务方只上传了 1 张美妆正面主图，绝对禁止生成 > ±45° 的大幅旋转（否则瓶身侧后方的烫金小字必然变成火星文）。工作台自动触发视角安全阀：将相机运镜收窄为 ±35° 弧形微距推拉（Dolly + ±35° Pan）+ 正面瓶标 Alpha 锁定 + IC-Light 动态光斑，单条成本仅 $0.028 且文字合规率 99.8%。",decisionSummaryEn:"Core SA guardrail: when only 1 front photo is provided for text-heavy cosmetics bottles, strictly forbid >±45° rotation (which fabricates gibberish ingredient labels). Automatically cap camera motion to a ±35° parallax arc + Dolly zoom with front-label Alpha lock and IC-Light caustic lighting ($0.028/clip, 99.8% text fidelity).",stages:[{stage:"1. View Coverage Guardrail",controlledEngine:"1 Photo Detected -> Cap Orbit to ±35° Parallax Arc",naiveBehavior:"Allows 360° Prompt with 1 Photo -> Gibberish Back Label",metricImpact:"99.8% vs 19.2% Label Legibility"},{stage:"2. 2.5D Depth & Normal Estimation",controlledEngine:"DepthAnything-V2 + Normal Bae 2.5D Displacement Mesh",naiveBehavior:"Full Latent Regeneration Destroying Fine Serif Print",metricImpact:"99.5% Bottle Proportion Lock"},{stage:"3. Specular & Rim Relighting",controlledEngine:"IC-Light Animated Specular Sweep Across Gold Foil",naiveBehavior:"Static or Flickering Specular Noise",metricImpact:"3.2s vs 42.0s Turnaround"},{stage:"4. Loop & Audio Packaging",controlledEngine:"Seamless Boomerang Ease-In-Out + C2PA Manifest",naiveBehavior:"Hard Cut Jump at Frame 144",metricImpact:"Saves +$0.54M/yr at 40k Clips/Mo"}]},"consumer-electronics":{id:"consumer-electronics",titleZh:"3C 数码硬件 360° 爆炸图与接口特写视频（CAD / 4图重建 + 屏幕 UI 确定性贴片）",titleEn:"3C Electronics 360° Turntable & Port Callout Video (4-View Trellis + Screen UI Quad)",subtitleZh:"笔记本/耳机/相机具有严格对称公差与精确 HDMI/Type-C 接口数量，采用“4图 Trellis 硬表面重建 + 屏幕 SVG 视频贴图 + Remotion 接口参数引出线”",subtitleEn:"Laptops/cameras require exact USB-C/HDMI port counts and crisp screen UI: 4-View Trellis Hard-Surface GLB + Screen Video Texture + Remotion Spec Callout Lines",monthlyVideos:15e3,orbitDegrees:360,inputViewsAvailable:4,controlledStack:"4-View Trellis Hard-Surface GLB + Screen UI Texture + Remotion Spec Callouts ($0.055/clip)",naiveStack:"Pure Video Diffusion Orbit (Morphing USB Ports & Melted Screen UI)",controlledGeometryLockPct:99.3,naiveGeometryLockPct:54.2,controlledBacksideLogoAccuracyPct:99.6,naiveBacksideLogoAccuracyPct:31,controlledCostPerVideoUsd:.055,naiveCostPerVideoUsd:1.68,controlledRenderLatencySec:5.4,naiveRenderLatencySec:55,controlledAnnualSavingsM:.29,decisionSummaryZh:"3C 数码产品若用纯视频扩散生成 360° 旋转，机身侧面的 2 个 Type-C 接口在旋转中会变成 3 个模糊黑洞，引发买家“货不对板”投诉。通过“前/后/左/右 4 张标准图输入 Trellis 生成硬表面 GLB + 屏幕区域挂载原生 MP4/SVG 贴图 + Three.js 轨道绑定 Remotion 3D 锚点参数引出线”，接口与屏幕像素准确率达 99.6%。",decisionSummaryEn:"Pure video diffusion morphs 2 USB-C ports into 3 blurry holes during a 360° laptop spin, triggering false-advertising returns. Reconstructing a hard-surface GLB from 4 orthographic photos via Trellis, mapping a crisp native UI texture onto the screen quad, and anchoring Remotion 3D callout pins achieves 99.6% port/UI accuracy.",stages:[{stage:"1. 4-View Orthographic Ingest",controlledEngine:"Front / Back / Left / Right Clean Plates -> Trellis SLAT",naiveBehavior:"Single Angled Hero Photo Extrapolation",metricImpact:"100% Exact Port Count & Placement"},{stage:"2. Screen & Metallic PBR Lock",controlledEngine:"Planar Screen UV Replacement + Anisotropic Brushed Metal PBR",naiveBehavior:"Hallucinated OS UI & Warped Keyboard Grid",metricImpact:"99.6% vs 31.0% Detail Fidelity"},{stage:"3. 3D-Tracked Spec Callouts",controlledEngine:"Three.js Bone/Vertex World-to-Screen JSON -> Remotion SVG Pins",naiveBehavior:"2D Floating Text Drifting Off Ports",metricImpact:"0.0px Callout Tracking Drift"},{stage:"4. Studio Reflection Pass",controlledEngine:"HDRI Environment Map + Contact Shadow Catcher + IC-Light Fill",naiveBehavior:"Inconsistent Floor Reflection",metricImpact:"$0.055 vs $1.68 per Clip"}]}};function S(r,o="controlled"){const e=h[r],a=o==="controlled",t=a?e.controlledGeometryLockPct:e.naiveGeometryLockPct,i=a?e.controlledBacksideLogoAccuracyPct:e.naiveBacksideLogoAccuracyPct,g=a?e.controlledCostPerVideoUsd:e.naiveCostPerVideoUsd,c=a?e.controlledRenderLatencySec:e.naiveRenderLatencySec,s=Number((e.controlledGeometryLockPct-e.naiveGeometryLockPct).toFixed(1)),u=Number(((e.naiveCostPerVideoUsd-e.controlledCostPerVideoUsd)/e.naiveCostPerVideoUsd*100).toFixed(1)),m=[0,35,90,180,270,360].map(n=>{const v=n===0||n===360?2:n===35?8:n===180?58:42;return{angleDeg:n,controlledSilhouetteScore:Number((e.controlledGeometryLockPct-(n===180?.4:.1)).toFixed(1)),naiveSilhouetteScore:Number(Math.max(22,96-v).toFixed(1)),zoneLabel:n<=35?"Safe Front Arc":n===180?"180° Back Blind Spot":"Side Profile Zone"}});return{scenario:e,mode:o,activeGeometryLockPct:t,activeBacksideLogoAccuracyPct:i,activeCostPerVideoUsd:g,activeRenderLatencySec:c,geometryGainPts:s,unitCostSavingsPct:u,annualSavingsM:e.controlledAnnualSavingsM,orbitSamples:m}}let l="sneaker-footwear",d="controlled";function p(){const r=document.querySelector("#app");if(!r)return;const o=S(l,d),e=o.scenario,a=d==="controlled";r.innerHTML=`
    <main class="workbench-shell" data-mode="${d}" data-category="${l}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">201ST WORKBENCH · DOMAIN 2 · E-COMMERCE 360° PRODUCT TURNTABLE VIDEO SELECTION STUDIO</span>
          <h1>电商商品 360° 环绕展示短视频选型工作台：单图 I2V / SV3D vs 3D 代理粗模 + IC-Light 重打光混合管线</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-Controls">
          <div class="seg-group" role="group" aria-label="Product Category">
            ${Object.keys(h).map(t=>`
              <button class="seg-btn ${l===t?"active":""}" data-category-btn="${t}">
                ${t==="sneaker-footwear"?"1. 运动鞋履 2图 360° 环绕 (Sneaker 360°)":t==="cosmetics-packaging"?"2. 美妆单图 ±35° 安全弧 (Cosmetics ±35° Guard)":"3. 3C 数码 4图硬表面 + 参数引线 (3C 4-View GLB)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Architecture Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ 视角守卫 + 3D 代理 UV + IC-Light ($${e.controlledCostPerVideoUsd}/条)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 单图直出 I2V 强转 360° ($${e.naiveCostPerVideoUsd}/条 · 盲区幻觉)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">360° 几何与轮廓锁定率 (Geometry Lock)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activeGeometryLockPct}%</strong>
          <span class="kpi-note">净增 +${o.geometryGainPts} pts · 消除 >60° 侧面/背面变形</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">背面/侧面 Logo 与接口准确率 (Backside Fidelity)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activeBacksideLogoAccuracyPct}%</strong>
          <span class="kpi-note">2/4图 UV 投射或 ±35° 安全限位 vs I2V 盲区脑补</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">含重试单条视频成本 (Effective Cost / Clip)</span>
          <strong class="kpi-val ${a?"good":"warn"}">$${o.activeCostPerVideoUsd.toFixed(3)}</strong>
          <span class="kpi-note">单条降本 -${o.unitCostSavingsPct}% · 年省 +$${o.annualSavingsM.toFixed(2)}M</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单条渲染耗时与输入视图数 (Latency & Views)</span>
          <strong class="kpi-val">${o.activeRenderLatencySec}s · ${e.inputViewsAvailable} View(s)</strong>
          <span class="kpi-note">目标旋转角度: ${e.orbitDegrees}° · 月产 ${(e.monthlyVideos/1e3).toFixed(0)}k 条</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 环绕角度 (0°→360°) 盲区几何保真度曲线与输入图片数量路由决策</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="360 Turntable Orbit Fidelity">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(24, 24)">
              <rect width="632" height="68" rx="8" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="16" y="25" fill="#93c5fd" font-size="12" font-weight="700">自动视角安全阀 (Input-View Coverage Guardrail) — 输入实拍图: ${e.inputViewsAvailable} 张 | 允许旋转角度: ${e.orbitDegrees}°</text>
              <text x="16" y="48" fill="#cbd5e1" font-size="11">1张主图 → 严禁 >±45°（锁死 SV3D ±35° 微距推拉） | 2张正反图 → Hunyuan3D-2 + 正反 UV 360° | 4张正交图 → Trellis 硬表面 CAD 级 360°</text>
            </g>

            <g transform="translate(24, 108)">
              <rect width="632" height="168" rx="8" fill="#0f172a" stroke="#1e293b" />
              <text x="16" y="24" fill="#e2e8f0" font-size="12" font-weight="700">不同旋转角度 (Yaw Angle) 下的商品轮廓与品牌标识保真度对比 (0° → 360°)</text>
              ${o.orbitSamples.map((t,i)=>{const g=32+i*102,c=Math.round(t.controlledSilhouetteScore/100*86),s=Math.round(t.naiveSilhouetteScore/100*86);return`
                  <g transform="translate(${g}, 42)">
                    <rect x="0" y="${86-c}" width="26" height="${c}" rx="4" fill="#10b981" />
                    <rect x="30" y="${86-s}" width="26" height="${s}" rx="4" fill="#ef4444" opacity="0.85" />
                    <text x="13" y="${80-c}" fill="#6ee7b7" font-size="10" text-anchor="middle" font-weight="700">${t.controlledSilhouetteScore}%</text>
                    <text x="43" y="${80-s}" fill="#fca5a5" font-size="10" text-anchor="middle">${t.naiveSilhouetteScore}%</text>
                    <text x="28" y="104" fill="#f8fafc" font-size="11" text-anchor="middle" font-weight="700">${t.angleDeg}°</text>
                    <text x="28" y="118" fill="#94a3b8" font-size="9" text-anchor="middle">${t.zoneLabel.slice(0,12)}</text>
                  </g>`}).join("")}
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段 3D 代理网格 + UV 锁定 + IC-Light 重打光流水线拆解</h2>
            <span class="badge">Zero Backside Hallucination</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 混合管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 单图直出 I2V：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,r.querySelectorAll("[data-category-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.categoryBtn;i&&(l=i,p())})}),r.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(d=i,p())})})}p();
