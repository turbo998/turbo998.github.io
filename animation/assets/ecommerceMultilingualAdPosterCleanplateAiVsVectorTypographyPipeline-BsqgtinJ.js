import"./modulepreload-polyfill-B5Qt9EMX.js";const p={"global-16-locale-black-friday-campaign":{id:"global-16-locale-black-friday-campaign",titleZh:"跨境大促 16 语种促销海报批量出海（1张 AI 留白底图复用 × 16国 Satori/SVG 矢量压字 · $0.008 vs $1.28）",titleEn:"Global 16-Locale Black Friday Campaign (1 Clean AI Plate × 16 Vector Overlays · $0.008 vs $1.28)",localesCount:16,pixelDiffusionSpellingAccPct:34.5,vectorOverlaySpellingAccPct:100,pixelDiffusionCost16LocalesUsd:1.28,cleanPlateReuseCost16LocalesUsd:.008,copyEditLatencySeconds:.12,annualMarketingSavingsUsd:184e4},"cjk-arabic-rtl-luxury-cosmetics-banner":{id:"cjk-arabic-rtl-luxury-cosmetics-banner",titleZh:"中/日/韩复杂汉字与中东阿拉伯语 RTL 连字海报（HarfBuzz 双向排版 + 品牌授权 TTF 字库 100% 零错字）",titleEn:"CJK & Arabic RTL Luxury Banner (HarfBuzz BiDi Shaping + Licensed Brand TTF Fonts · 100% Zero Typos)",localesCount:12,pixelDiffusionSpellingAccPct:21.8,vectorOverlaySpellingAccPct:100,pixelDiffusionCost16LocalesUsd:1.44,cleanPlateReuseCost16LocalesUsd:.009,copyEditLatencySeconds:.15,annualMarketingSavingsUsd:212e4},"omnichannel-3-aspect-ratio-auto-reflow":{id:"omnichannel-3-aspect-ratio-auto-reflow",titleZh:"全渠道多画幅 (1:1 / 9:16 / 16:9) 智能排版避让（显著性安全区检测防遮挡商品 + 分层 SVG/PSD 导出）",titleEn:"Omnichannel Multi-Aspect-Ratio Reflow (Saliency Safe-Zone Detection + Layered SVG/PSD Export)",localesCount:20,pixelDiffusionSpellingAccPct:38.2,vectorOverlaySpellingAccPct:100,pixelDiffusionCost16LocalesUsd:1.6,cleanPlateReuseCost16LocalesUsd:.01,copyEditLatencySeconds:.18,annualMarketingSavingsUsd:246e4}};function g(a,t){const e=p[a],l=t==="cleanplate-ai-plus-satori-harfbuzz-vector-layer",o=l?e.vectorOverlaySpellingAccPct:e.pixelDiffusionSpellingAccPct,i=l?e.cleanPlateReuseCost16LocalesUsd:e.pixelDiffusionCost16LocalesUsd,s=l?e.copyEditLatencySeconds:180,r=l?Number(((e.pixelDiffusionCost16LocalesUsd-e.cleanPlateReuseCost16LocalesUsd)/e.pixelDiffusionCost16LocalesUsd*100).toFixed(1)):0;return{scenario:e,stack:t,effectiveSpellingAccPct:o,effectiveCost16LocalesUsd:i,effectiveCopyEditSec:s,costReductionPct:r,zeroTypoCompliancePass:o===100,editablePsdSvgExportPass:l,verdictBadge:l?`CLEAN-PLATE AI + VECTOR TYPOGRAPHY LOCKED (100% Zero-Typo · $${i.toFixed(3)}/${e.localesCount}-Locale Set · Layered SVG/PSD)`:`GARBLED CJK/ARABIC PIXEL TEXT (${(100-e.pixelDiffusionSpellingAccPct).toFixed(1)}% Typos · Uneditable Flat Raster · $${e.pixelDiffusionCost16LocalesUsd.toFixed(2)}/Set!)`}}const S=document.querySelector("#app");let d="global-16-locale-black-friday-campaign",u="cleanplate-ai-plus-satori-harfbuzz-vector-layer";function f(){const a=g(d,u),t=a.scenario,e=u==="cleanplate-ai-plus-satori-harfbuzz-vector-layer";S.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 407 · 196th Interactive Workbench · Domain 2 (Clean-Plate AI + Satori / HarfBuzz / SVG Vector Typography vs Pixel Diffusion Text Studio)</span>
        <h1>跨境电商多语种促销海报生成架构选型工作台：无字底图生成 (Flux/Imagen Clean-Plate) + Satori/HarfBuzz 矢量排版 vs 像素扩散直出文字</h1>
        <p class="wb-subtitle">根治企业跨境营销最头疼的“AI 海报错别字与死图无法编辑”痛点：直接让像素扩散模型（Flux / Midjourney / GPT-Image-1）在图片里画中文、日文、阿拉伯文促销文案，不仅多语种拼写准确率仅有 ${t.pixelDiffusionSpellingAccPct}%（乱码率 ${(100-t.pixelDiffusionSpellingAccPct).toFixed(1)}%），而且无法使用企业品牌授权 TTF/OTF 字库、设计师无法在 Figma/PS 中二次改字，每换一种语言还要重新花钱跑一次 GPU 扩散！采用“<strong>1 次无字留白底图生成 (Clean-Plate AI) + 显著性安全区检测 (Saliency Safe-Zone) + Satori / HarfBuzz / SVG 矢量排版压字</strong>”双层架构，实现 ${t.localesCount} 语种 100% 零错字、0.12秒改字与分层 SVG/PSD 导出（成本降 -${a.costReductionPct}%，年省 +$${(t.annualMarketingSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${a.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Multilingual Poster Scenario and Typography Stack Controls">
      <div class="control-group">
        <span class="control-label">1. 选择跨境多语种海报与全渠道适配场景 (Global Multilingual Poster Scenario):</span>
        <div class="btn-row">
          ${Object.keys(p).map(l=>`
            <button type="button" class="scenario-btn ${d===l?"active":""}" data-scenario="${l}">
              ${p[l].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换海报文字生成与排版技术架构 (Poster Typography Generation Architecture):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="pixel-diffusion-baked-in-text">
            ❌ 方案 A：像素扩散模型直接把文字烤进底图 (中/日/阿语拼写准确率仅 ${t.pixelDiffusionSpellingAccPct}% · 死图无法改字 · 16语种需跑 16次 GPU)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="cleanplate-ai-plus-satori-harfbuzz-vector-layer">
            ✅ 方案 B：AI 生成留白无字底图 (1次) + 显著性避让 + HarfBuzz/Satori 矢量品牌字库层 (100% 零错字 · $${t.cleanPlateReuseCost16LocalesUsd}/套)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Multilingual Poster Pipeline KPIs">
      <div class="kpi-card">
        <span class="kpi-title">${t.localesCount} 语种文案拼写与品牌字体准确率 (Typography Accuracy)</span>
        <strong class="kpi-value ${a.zeroTypoCompliancePass?"good":"bad"}" id="kpi-spelling">${a.effectiveSpellingAccPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"HarfBuzz 渲染真实 TTF/OTF 品牌字体 (支持阿拉伯 RTL 与日文纵书)":"像素模型生成生僻汉字、阿拉伯连字与小号促销价签严重粘连"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单款商品生成 ${t.localesCount} 国语言套图总成本 (Cost per ${t.localesCount}-Locale Set)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${a.effectiveCost16LocalesUsd.toFixed(3)} (-${a.costReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">1 张 Clean-Plate AI 底图复用于 ${t.localesCount} 国矢量文案层 (对比 $${t.pixelDiffusionCost16LocalesUsd.toFixed(2)})</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">修改折扣文案或导出可编辑文件耗时 (Copy Edit & Export)</span>
        <strong class="kpi-value ${a.editablePsdSvgExportPass?"good":"bad"}" id="kpi-edit">${a.effectiveCopyEditSec.toFixed(2)} s · Layered SVG/PSD</strong>
        <span class="kpi-sub">${e?"文字与背景物理分轨，支持 Figma / Photoshop 二次微调":"文字死锁在位图通道内，改一个字需重新抽卡 3 分钟"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">全球营销中心年化净省设计/算力费 (Annual Marketing ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(t.annualMarketingSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">消灭 65%+ 多语种废片抽卡与人工 DTP 排版工时</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>无字留白底图 (Clean-Plate AI) + 显著性安全区检测 (Saliency Safe-Zone) + Satori/HarfBuzz 多语种矢量压字管线画布</h2>
          <span class="tag">${t.localesCount} Locales · 100% Zero-Typo · Layered SVG/PSD</span>
        </div>
        <canvas id="poster-pipeline-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>像素生字 vs 留白底图 + 矢量排版架构对比明细 (Typography Pipeline Audit)</h2>
        <ul class="audit-list">
          <li><span>Stage 1 (留白干净底图生成 Clean-Plate):</span> <strong>Prompt 注入 "negative space on top/left, no text" 仅生成 1 次高审美商品场景底图</strong></li>
          <li><span>Stage 2 (显著性安全区检测 Saliency Map):</span> <strong>BiRefNet + 梯度显著性自动找出不遮挡商品主体的最大留白矩形框 BBox</strong></li>
          <li><span>Stage 3 (背景局部明度与对比度自适应):</span> <strong>计算安全框内平均亮度 L*，自动为文字匹配深/浅色板与柔光投影 (WCAG AA ≥ 4.5:1)</strong></li>
          <li><span>Stage 4 (HarfBuzz + Satori 矢量排版引擎):</span> <strong>加载企业正版中/英/日/阿 TTF 字库，精确处理 RTL 双向文字、德语断词与价格角标</strong></li>
          <li><span>Stage 5 (多格式分层交付):</span> <strong>一键同时导出 WebP 成品图 + 保留独立文字图层的 SVG / Figma / PSD 源文件</strong></li>
          <li><span>${t.localesCount} 国语言套图生成成本对比:</span> <strong>$${t.pixelDiffusionCost16LocalesUsd.toFixed(2)} (跑 ${t.localesCount} 次扩散) → $${t.cleanPlateReuseCost16LocalesUsd.toFixed(3)} (1次底图 + ${t.localesCount}次 CPU 矢量合成)</strong></li>
          <li><span>跨境营销团队年化净省预算:</span> <strong>+$${t.annualMarketingSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,y(),b(a)}function y(){document.querySelectorAll(".scenario-btn").forEach(a=>{a.addEventListener("click",()=>{d=a.dataset.scenario,f()})}),document.querySelectorAll(".mode-btn").forEach(a=>{a.addEventListener("click",()=>{u=a.dataset.mode,f()})})}function b(a){const t=document.querySelector("#poster-pipeline-canvas");if(!t)return;const e=t.getContext("2d"),l=t.width,o=t.height,i=a.scenario,s=a.stack==="cleanplate-ai-plus-satori-harfbuzz-vector-layer";e.fillStyle="#070b14",e.fillRect(0,0,l,o),e.fillStyle="#0f172a",e.strokeStyle="rgba(56, 189, 248, 0.35)",e.lineWidth=1.5,e.beginPath(),e.roundRect(20,20,390,360,12),e.fill(),e.stroke(),e.fillStyle="#e2e8f0",e.font="bold 12.5px Inter, system-ui, sans-serif",e.fillText("1. Clean-Plate AI + Saliency Safe-Zone + Vector Typography",34,46),e.fillStyle="rgba(168, 85, 247, 0.22)",e.strokeStyle="#a855f7",e.lineWidth=2,e.beginPath(),e.roundRect(210,168,176,168,10),e.fill(),e.stroke(),e.fillStyle="#e9d5ff",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("Hero Product Subject",236,244),e.font="11px Inter, system-ui, sans-serif",e.fillText("(BiRefNet Protected Zone)",232,266),e.fillStyle=s?"rgba(16, 185, 129, 0.16)":"rgba(239, 68, 68, 0.18)",e.strokeStyle=s?"#10b981":"#ef4444",e.setLineDash([5,4]),e.lineWidth=2,e.beginPath(),e.roundRect(38,64,348,92,8),e.fill(),e.stroke(),e.setLineDash([]),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 14px Inter, system-ui, sans-serif",e.fillText(s?"限时黑五盛典 · BLACK FRIDAY -40%":"限吋黑五盛典 · BL4CK FR1D4Y -4O%",52,92),e.fillStyle="#f8fafc",e.font="12px Inter, system-ui, sans-serif",e.fillText(s?"JP: 期間限定セール | AR (RTL): خصم حصري ٤٠٪ | DE: Rabattaktion":"JP: 期間??セール | AR: %40 ??? (Broken LTR) | DE: Raba??aktion",52,118),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText(s?"✓ Saliency Safe-Zone: 0% Subject Occlusion · WCAG Contrast 7.2:1":"✕ Pixel Diffusion Burns Garbled Glyphs Directly Into Background Pixels!",52,142),e.fillStyle=s?"#38bdf8":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`✓ 1 Clean Plate × ${i.localesCount} Vector Overlays = $${i.cleanPlateReuseCost16LocalesUsd.toFixed(3)} Total`:`✕ ${i.localesCount} Separate GPU Diffusion Runs = $${i.pixelDiffusionCost16LocalesUsd.toFixed(2)} + 65.5% Typos`,36,360),e.fillStyle="#e2e8f0",e.font="bold 12.5px Inter, system-ui, sans-serif",e.fillText("2. 4-Stage Decoupled Clean-Plate + Vector Typography Pipeline",432,46);const r=[{title:"Stage 1: 1× Clean-Plate AI Scene Generation (Flux.1 / Imagen 4)",sub:"Prompts for text-free negative space; cached & reused across all 16 locales",color:"#a855f7"},{title:"Stage 2: Saliency Safe-Zone & Luminance Contrast Analyzer",sub:"Finds largest unoccluded background rectangle & auto-tunes text shadow",color:"#38bdf8"},{title:"Stage 3: Satori (HTML/CSS → SVG) + HarfBuzz Multilingual Shaper",sub:"100.0% exact CJK, Arabic RTL ligatures & licensed brand TTF/OTF fonts",color:"#10b981"},{title:"Stage 4: Multi-Channel Export (WebP + Layered SVG / PSD / Figma)",sub:`0.12s instant price/copy edits · Saves +$${(i.annualMarketingSavingsUsd/1e6).toFixed(2)}M/yr`,color:"#f59e0b"}];let n=64;r.forEach(c=>{e.fillStyle=s?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.15)",e.strokeStyle=s?c.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(432,n,368,70,10),e.fill(),e.stroke(),e.fillStyle=s?c.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(c.title,446,n+28),e.fillStyle="#cbd5e1",e.font="11px Inter, system-ui, sans-serif",e.fillText(c.sub,446,n+50),n+=80})}f();
