import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"tabletop-appliances":{id:"tabletop-appliances",titleZh:"小家电与美妆桌面场景换背景（咖啡机/护肤瓶大理石台面接触阴影与漫反射调和）",titleEn:"Tabletop Appliance & Cosmetics Scene Placement (Contact AO + Rim Light Harmonization)",subtitleZh:"对比“朴素反向掩码 Inpainting（商品悬空像假贴纸、俯仰透视角错位 14°、边缘被扩散模型啃食长出多余手柄）”与“BiRefNet 亚像素抠图 + 透视地平面约束 + Flux.1-Fill + 双层接触阴影/IC-Light 边缘光调和”",subtitleEn:"Compares Naive Inverted-Mask Inpainting (floating sticker look, 14° horizon mismatch, edge bleeding) vs. BiRefNet + Horizon Depth Plane + Flux.1-Fill + Contact AO + IC-Light Rim Harmonization",monthlyImages:2e5,controlledStack:"BiRefNet + Horizon Depth Plane + Flux.1-Fill-dev + Contact AO + IC-Light Rim ($0.0042/img)",naiveStack:"Naive Inverted-Mask SDXL/Flux Inpainting or Commercial SaaS API ($0.055/img + 36% Sticker Reject)",controlledSkuPixelLockPct:99.7,naiveSkuPixelLockPct:79.4,controlledShadowRealismPct:98.8,naiveShadowRealismPct:41,controlledHorizonErrorDeg:.4,naiveHorizonErrorDeg:14.2,controlledCostPerImgUsd:.0042,naiveCostPerImgUsd:.055,controlledAnnualSavingsM:.92,decisionSummaryZh:"为什么很多 AI 换背景工具做出来的商品图一眼像“五毛钱淘宝抠图贴纸”？核心败在三个细节：① 透视错位（商品是 15° 俯拍，AI 生成的桌子却是 0° 平视）；② 缺少双层真实阴影（商品底部与台面 0-3mm 缝隙的极暗接触环境光遮蔽 Contact AO + 随主光源方向拉长的软投射阴影 Cast Shadow）；③ 掩码膨胀导致扩散模型把咖啡机边缘“啃”出一圈白边或长出多余零件。通过“相机俯仰角估计驱动 Depth ControlNet 台面生成 + 1px 内缩硬锁商品内部像素 + 独立阴影通道与 IC-Light 2px 边缘环境色温融合”，商品像素锁定率达 99.7%，阴影真实感达 98.8%，单张成本仅 $0.0042。",decisionSummaryEn:"Naive AI background replacement fails because of (1) perspective mismatch (15° top-down SKU pasted onto a 0° eye-level table), (2) missing dual-layer shadows (tight 0–3mm Contact AO + directional soft Cast Shadow), and (3) mask dilation letting diffusion mutate product edges. Combining Camera Pitch/Horizon Depth ControlNet, Flux.1-Fill, analytical Contact AO, and 2px-rim IC-Light color harmonization hits 99.7% SKU pixel lock and 98.8% shadow realism at $0.0042/img.",stages:[{stage:"1. Sub-Pixel Matting & Pitch Solve",controlledEngine:"BiRefNet + VitMatte Alpha + Camera Pitch/Horizon Estimator",naiveBehavior:"Rough SAM Box Mask + Ignored Camera Pitch Angle",metricImpact:"0.4° vs 14.2° Horizon Error"},{stage:"2. Perspective-Locked Scene Fill",controlledEngine:"Synthetic Table Depth Plane -> Flux.1-Fill-dev (0px Edge Bleed)",naiveBehavior:"Dilated Mask Inpainting Eating Product Silhouette",metricImpact:"99.7% vs 79.4% SKU Pixel Lock"},{stage:"3. Dual-Pass Contact & Cast Shadow",controlledEngine:"0-3mm Ray-Traced Contact AO + Directional Soft Cast Shadow",naiveBehavior:"Floating Sticker or Hallucinated Black Blob Under SKU",metricImpact:"98.8% vs 41.0% Shadow Realism"},{stage:"4. Inner-Locked Rim Harmonization",controlledEngine:"IC-Light Applied Strictly to Outer 3px Fresnel Rim (Inner 100% Locked)",naiveBehavior:"Full-Image Img2Img Altering Brand Logo & Product Color",metricImpact:"$0.0042 vs $0.055/img (-92.4%)"}]},"living-room-furniture":{id:"living-room-furniture",titleZh:"大件家居沙发/床垫实景样板间合成（公制尺寸比例锁定 + 多脚触地阴影对齐）",titleEn:"Large Furniture Room Staging Pipeline (Metric Scale Lock + Multi-Leg Floor Contact)",subtitleZh:"解决大件家具换背景“2米沙发被画成玩具大小、四个沙发脚两个悬空”痛点：引入公制深度房间先验（Metric3D v2）与多触地点平面约束",subtitleEn:"Prevents 2.2m sofas from looking like miniature toys or floating on two legs: Metric3D v2 Room Scale Prior + Multi-Leg Floor Plane Constraint",monthlyImages:8e4,controlledStack:"Metric3D v2 Scale Box + Multi-Leg Floor Contact Plane + Flux.1-Fill ($0.0055/img)",naiveStack:"Unconstrained Outpainting (Disproportionate Room Doors/Windows & Floating Legs)",controlledSkuPixelLockPct:99.6,naiveSkuPixelLockPct:76,controlledShadowRealismPct:98.4,naiveShadowRealismPct:38.5,controlledHorizonErrorDeg:.5,naiveHorizonErrorDeg:16.5,controlledCostPerImgUsd:.0055,naiveCostPerImgUsd:.075,controlledAnnualSavingsM:.58,decisionSummaryZh:"家具电商使用普通 Outpainting 最常见翻车是“比例失调”——一张 2.2 米宽的三人位沙发，AI 在旁边画了一扇只有 1 米高的门或一张巨人茶几，导致买家收到货后因尺寸预期落差退货。通过读取 PIM 中的商品真实长宽高（如 `220×95×85cm`），在虚拟相机空间生成带 1.0 米标准门窗参考系的公制深度图（Metric Depth Map），并强制所有沙发底脚落在同一水平法线平面上生成接地阴影，彻底根治比例失真与悬空脚。",decisionSummaryEn:"Unconstrained outpainting around furniture distorts room scale—rendering a 2.2m sofa next to a giant coffee table or miniature door. Constructing a metric room depth box from PIM dimensions (`220×95×85cm`) and enforcing a coplanar floor contact shadow across all four furniture legs guarantees true-to-scale interior staging.",stages:[{stage:"1. PIM Metric Dimension Ingest",controlledEngine:"Read SKU L×W×H (cm) -> Construct Metric Virtual Room Frustum",naiveBehavior:"2D Pixel Outpainting Blind to Physical Centimeters",metricImpact:"100% True Room-to-Sofa Scale"},{stage:"2. Multi-Point Floor Contact Lock",controlledEngine:"Bottom Bounding-Box hull Coplanar Floor Normal Constraint",naiveBehavior:"Back Sofa Legs Float Above Warped Rug",metricImpact:"Zero Floating Furniture Legs"},{stage:"3. Architectural Straight-Line Guard",controlledEngine:"M-LSD Line Segment ControlNet + Flux.1-Fill",naiveBehavior:"Bent Wall Baseboards & Crooked Window Frames",metricImpact:"98.4% Interior Realism Score"},{stage:"4. Fabric Weave Preservation",controlledEngine:"100% Original 4K Upholstery Pixels Composite + Floor Bounce AO",naiveBehavior:"VAE Re-Encoding Blurs Linen/Leather Micro-Grain",metricImpact:"99.6% Fabric Texture Fidelity"}]},"transparent-glassware":{id:"transparent-glassware",titleZh:"透明玻璃瓶/香水/太阳镜换背景（双通道透射折射背景融合 vs 残留白底脏污）",titleEn:"Transparent Glassware & Eyewear Background Replacement (Alpha + Transmission Refraction)",subtitleZh:"针对透明瓶身/镜片抠图后“瓶肚子里还残留棚拍白底、无法透出新背景”的行业难题：采用“VitMatte 连续透明度 + 背景高频折射扭曲贴图（Screen-Space Refraction）+ 高光叠加”",subtitleEn:"Solves trapped white studio background inside clear glass bottles/lenses: VitMatte Continuous Alpha + Screen-Space Background Refraction + Specular Add Pass",monthlyImages:12e4,controlledStack:"VitMatte Trimap Alpha + Intrinsic Specular Split + Screen-Space Background Refraction ($0.0048/img)",naiveStack:"Binary Hard Mask Matting (Opaque White Ghost Trapped Inside Clear Glass)",controlledSkuPixelLockPct:99.4,naiveSkuPixelLockPct:68.2,controlledShadowRealismPct:98.2,naiveShadowRealismPct:33,controlledHorizonErrorDeg:.3,naiveHorizonErrorDeg:11.8,controlledCostPerImgUsd:.0048,naiveCostPerImgUsd:.068,controlledAnnualSavingsM:.68,decisionSummaryZh:"用普通二值抠图（SAM / Rembg）处理香水瓶、红酒杯或太阳镜时，瓶身虽然被抠了出来，但透明玻璃内部依然死死保留着棚拍时的灰白背景，放进海滩或森林新背景里就像一块不透明的毛玻璃塑料！通过 `VitMatte` 提取连续 Alpha 透射率通道 + 本征图像分解提取顶层玻璃高光层（Specular Layer），将生成的新背景经过法线场轻微折射偏折后透入瓶身内部，再以 `Screen/Linear Dodge` 叠加原始高光与清晰酒标，实现媲美实拍的通透玻璃质感。",decisionSummaryEn:"Binary segmentation masks fail on clear perfume bottles and sunglasses because white studio background pixels remain trapped inside the glass body. Decomposing the SKU into a `VitMatte` continuous opacity map, an opaque label mask, and a pure Specular reflection layer allows the new AI background to refract cleanly through the glass while keeping the brand label 100% intact.",stages:[{stage:"1. Trimap Opacity & Label Split",controlledEngine:"BiRefNet + VitMatte Continuous Alpha + Opaque Label Mask",naiveBehavior:"Binary 0/1 Mask Treating Clear Glass as Solid Brick",metricImpact:"Zero Trapped White Studio Ghost"},{stage:"2. Clean Background Generation",controlledEngine:"Flux.1-Fill Generates Continuous Scene Behind Glass Region",naiveBehavior:"Inpainting Halo Around Bottle Neck",metricImpact:"Seamless Background Continuity"},{stage:"3. Screen-Space Glass Transmission",controlledEngine:"Normal-Guided UV Offset of New BG + Original Specular Add",naiveBehavior:"Flat Paste Without Background Showing Through Glass",metricImpact:"99.4% Glass & Label Fidelity"},{stage:"4. Caustic Tinted Cast Shadow",controlledEngine:"Liquid-Color Tinted Soft Shadow on Tabletop",naiveBehavior:"Pitch-Black Solid Shadow Under Clear Glass",metricImpact:"98.2% vs 33.0% Realism ($0.0048)"}]}};function d(o,a="controlled"){const e=c[o],i=a==="controlled";return{scenario:e,mode:a,activeSkuPixelLockPct:i?e.controlledSkuPixelLockPct:e.naiveSkuPixelLockPct,activeShadowRealismPct:i?e.controlledShadowRealismPct:e.naiveShadowRealismPct,activeHorizonErrorDeg:i?e.controlledHorizonErrorDeg:e.naiveHorizonErrorDeg,activeCostPerImgUsd:i?e.controlledCostPerImgUsd:e.naiveCostPerImgUsd,pixelLockGainPts:Number((e.controlledSkuPixelLockPct-e.naiveSkuPixelLockPct).toFixed(1)),shadowGainPts:Number((e.controlledShadowRealismPct-e.naiveShadowRealismPct).toFixed(1)),annualSavingsM:e.controlledAnnualSavingsM}}let l="tabletop-appliances",r="controlled";function s(){const o=document.querySelector("#app");if(!o)return;const a=d(l,r),e=a.scenario,i=r==="controlled";o.innerHTML=`
    <main class="workbench-shell" data-mode="${r}" data-category="${l}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">206TH WORKBENCH · DOMAIN 2 · E-COMMERCE PRODUCT BACKGROUND REPLACEMENT & HARMONIZATION STUDIO</span>
          <h1>电商商品主图换背景与光影融合选型工作台：BiRefNet + 透视地平面 + Flux.1 Fill + IC-Light 接触阴影 vs 朴素 Inpainting</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Product Category">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${l===t?"active":""}" data-category-btn="${t}">
                ${t==="tabletop-appliances"?"1. 小家电与桌面场景 (Contact AO + Rim Light)":t==="living-room-furniture"?"2. 大件家居样板间 (公制尺寸锁 + 多脚触地)":"3. 透明香水瓶/墨镜 (VitMatte 透射背景折射)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Pipeline Mode">
            <button class="seg-btn ${i?"active":""}" data-mode-btn="controlled">
              ✅ 透视平面 + Flux.1 Fill + 双层接触阴影 ($${e.controlledCostPerImgUsd}/张)
            </button>
            <button class="seg-btn ${i?"":"active"}" data-mode-btn="naive">
              ⛔ 朴素反向掩码 Inpainting ($${e.naiveCostPerImgUsd}/张 · 悬空假贴纸)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">商品本体像素与轮廓锁定率 (SKU Pixel Lock)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeSkuPixelLockPct}%</strong>
          <span class="kpi-note">净增 +${a.pixelLockGainPts} pts · 杜绝扩散模型啃食商品边缘</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">接地阴影与边缘光真实感 (Shadow & Rim Realism)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeShadowRealismPct}%</strong>
          <span class="kpi-note">净增 +${a.shadowGainPts} pts · 0-3mm Contact AO + IC-Light</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">相机俯仰与地平面透视误差 (Horizon Pitch Error)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeHorizonErrorDeg}°</strong>
          <span class="kpi-note">自动对齐商品拍摄俯角与生成桌面法线</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单张成本与年化节省 (Unit Cost & Savings)</span>
          <strong class="kpi-val good">$${a.activeCostPerImgUsd.toFixed(4)} · +$${a.annualSavingsM.toFixed(2)}M/yr</strong>
          <span class="kpi-note">月产 ${(e.monthlyImages/1e3).toFixed(0)}k 张电商场景主图</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 彻底告别“五毛钱抠图假贴纸”：透视地平面、双层接触阴影与内锁边缘光融合图解</h2>
            <span class="badge">${i?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Product Placement Shadow and Horizon Architecture">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="305" height="135" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="16" y="24" fill="#6ee7b7" font-size="12" font-weight="700">✅ 四阶段受控融图管线 (99.7% 锁定 · 0.4° 透视误差)</text>
              <polygon points="30,115 275,115 245,82 60,82" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
              <ellipse cx="152" cy="98" rx="48" ry="8" fill="#020617" opacity="0.95" />
              <ellipse cx="168" cy="100" rx="68" ry="12" fill="#020617" opacity="0.45" />
              <rect x="116" y="42" width="72" height="56" rx="8" fill="#065f46" stroke="#34d399" stroke-width="2" />
              <text x="152" y="74" fill="#f8fafc" font-size="11" text-anchor="middle" font-weight="700">100% SKU Lock</text>
              <text x="16" y="128" fill="#a7f3d0" font-size="10">0-3mm 极暗接触 AO + 软投射阴影 + 外圈 3px IC-Light 环境色温</text>
            </g>

            <g transform="translate(350, 20)">
              <rect width="310" height="135" rx="10" fill="#1f121c" stroke="#ef4444" stroke-width="1.5" />
              <text x="16" y="24" fill="#fca5a5" font-size="12" font-weight="700">⛔ 朴素反向掩码 Inpainting (悬空贴纸 · 14.2° 错位)</text>
              <line x1="25" y1="102" x2="285" y2="102" stroke="#f87171" stroke-dasharray="4 4" />
              <rect x="116" y="38" width="72" height="52" rx="14" fill="#3f1d2e" stroke="#f87171" stroke-width="2" transform="rotate(-8 152 64)" />
              <text x="152" y="68" fill="#fecaca" font-size="10" text-anchor="middle">Warped Edge</text>
              <text x="16" y="128" fill="#fca5a5" font-size="10">缺乏接地 AO 阴影、桌面俯角与商品不一致、掩码膨胀侵蚀商品轮廓</text>
            </g>

            <g transform="translate(20, 170)">
              <rect width="640" height="110" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">电商换背景四大工程铁律 (Production Guardrails)</text>
              <text x="18" y="50" fill="#e2e8f0" font-size="11.5">1. 透视地平面先行：先从商品白底图反推拍摄俯仰角 θ，生成匹配的 3D 台面/地面深度图喂给 Flux.1-Fill</text>
              <text x="18" y="72" fill="#e2e8f0" font-size="11.5">2. 双层接地阴影：紧贴商品底部的 0-3mm Contact AO（防止悬空感）+ 匹配背景主光源方向的柔和 Cast Shadow</text>
              <text x="18" y="94" fill="#34d399" font-size="11.5" font-weight="700">3. 内锁外融 (Inner-Lock / Rim-Blend)：商品内部 97% 区域强制贴回原图 RGBA，仅允许 IC-Light 调整最外圈 3px 菲涅尔边缘反光</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段商品换背景与光影调和流水线拆解</h2>
            <span class="badge">Zero Sticker Effect</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 受控融图管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 朴素 Inpainting：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,o.querySelectorAll("[data-category-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.categoryBtn;n&&(l=n,s())})}),o.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.modeBtn;n&&(r=n,s())})})}s();
