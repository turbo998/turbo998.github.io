import"./modulepreload-polyfill-B5Qt9EMX.js";const k={hybrid_glyph_controlnet_harfbuzz_vector_lock:{id:"hybrid_glyph_controlnet_harfbuzz_vector_lock",label:"Hybrid FreeType/Glyph-ByT5 3D Hero Mask + HarfBuzz SVG/Canvas Vector Copy (c_typo = c_0/(1+u), CER = 0.00%, Lock = 1.0000×)",labelZh:"FreeType/Glyph-ByT5 笔画掩码 3D 主标题 + HarfBuzz 矢量排版副文案混合管线（单张成本 c_0/(1+u)，零错字恒锁 1.0000×）",subtitle:"Uses exact FreeType glyph-stroke ControlNet masks for 3D diegetic hero titles (neon/gold/liquid) and programmatic HarfBuzz SVG/Canvas vector compositing for CJK/Arabic/Latin micro-copy across all 17 tiers.",subtitleZh:"将需要融入环境材质的 3D 艺术大字交由 FreeType 精确字形掩码 + Glyph-ByT5/ControlNet 渲染，将促销利益点、价格与多语种小字交由 HarfBuzz/SVG 矢量层动态光影合成，在全 17 个多语种档位实现 0.00% 错字率并恒锁 1.0000×。",useHybridGlyphVectorPipeline:!0,defaultStationIndex:16,badge:"ZERO-TYPO GLYPH & VECTOR LOCKED · 1.0000× (0/17 GIBBERISH)",badgeZh:"字形掩码与矢量双锁 · 1.0000×（0/17 站错字乱码）",description:"Global e-commerce campaigns eliminate Chinese/Japanese stroke hallucinations and RTL ligature breaks by splitting diegetic 3D glyph masks from crisp vector micro-copy.",descriptionZh:"跨国电商多语种大促海报通过“3D 材质主标题走字形骨骼掩码 + 利益点小字走 HarfBuzz 矢量合成”彻底根除生僻汉字缺笔少画与阿拉伯语断连。"},naive_prompt_only_cjk_gibberish:{id:"naive_prompt_only_cjk_gibberish",label:"Naive Prompt-Only Diffusion Text Rendering (CJK Stroke Gibberish & PS Rework Overrun = 1 + u up to 2.0000×)",labelZh:"朴素纯 Prompt 端到端直出海报文字（复杂汉字缺笔鬼画符、小字糊成乱码，人工 PS 重排超支达 2.0000×）",subtitle:"Relies on raw text prompts to generate multi-line Chinese/Japanese/Arabic copy and small price badges directly inside diffusion pixels, causing missing strokes and 2.0000× manual Photoshop rework at Tier 16.",subtitleZh:"试图靠一句自然语言 Prompt 让扩散模型把中文长句、繁体/日文汉字、阿语连字与 12px 促销细则直接画进像素里，导致生僻字缺笔少画成“鬼画符”，设计师被迫在 PS 中逐张抠字重排，第 16 档返工成本翻倍至 2.0000×。",useHybridGlyphVectorPipeline:!1,defaultStationIndex:16,badge:"CJK GIBBERISH & TYPO REWORK · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"汉字鬼画符与返工超支 · 最高 2.0000×（16/17 站违背）",description:"Sub-word BPE tokenizers lack explicit stroke geometry for high-stroke CJK glyphs and 12px legal copy, doubling production cost across 16/17 multilingual tiers.",descriptionZh:"通用子词分词器缺乏高笔画汉字与 12px 极小字号的几何笔画约束，在 16/17 个多语种档位引发严重错别字与人工返工。"}},T=17,P=["Tier 0: Single 4-Letter ASCII Brand Word (Baseline)","Tier 1: Multi-Line English Promotional Headline + Kerning","Tier 2: High-Stroke Simplified Chinese Hero Title (16+ Strokes)","Tier 3: Traditional Chinese & Japanese Kanji Compound Slogan","Tier 4: FreeType Binary Glyph Mask -> 3D Gold Foil ControlNet","Tier 5: Korean Hangul Jamo Syllable Block Alignment Lock","Tier 6: Arabic RTL Contextual Ligature & BiDi Shaping (HarfBuzz)","Tier 7: Thai Multi-Level Vowel & Tone Mark Diacritic Stacking","Tier 8: Diegetic Neon / Liquid Chrome 3D Text Environment Reflection","Tier 9: Negative-Space Saliency Layout Planner for Copy Zones","Tier 10: 12px Promotional Price Tag & Currency Symbol (¥/$/€/£)","Tier 11: 8px Legal Disclaimer & Ingredient List Vector Overlay","Tier 12: Ambient-Light Drop-Shadow & Perspective Homography Warp","Tier 13: Brand Custom Variable Font (.woff2) Weight & Slant Lock","Tier 14: PaddleOCR / Vision LLM Levenshtein Distance == 0 Gate","Tier 15: Editable PSD / SVG Multi-Layer Localization Export","Tier 16: Global 24-Language 10,000-SKU Campaign Matrix (0.50 c_0)"];function Y(e){const t=1+Math.max(0,e),a=1/t;return{gibberishReworkAmplification:t,hybridTypoAmortizedUnitCost:a}}function N(e,i=64){const a=1/(1+Math.max(0,e)),r=Math.max(2,i%2===0?i:i+1),s=1/r;let o=2*a;for(let n=1;n<r;n++){const l=n*s,b=n%2===1?4:2;o+=b*(2*a*l)}return s/3*o}function q(e,i){const t=Math.max(0,Math.min(T-1,e)),a=t/(T-1),r=Y(a),s=N(a,64),o=1+a,n=i?1:o;return{index:t,glyphComplexityU:a,gibberishReworkAmplification:r.gibberishReworkAmplification,hybridTypoAmortizedUnitCost:r.hybridTypoAmortizedUnitCost,quadratureGlyphStrokeCost:s,typographyAccuracyBudgetRatio:n,naiveGibberishOverrunRatio:o,typographyStageLabel:P[t]??P[0],isGibberishViolation:n>1.0001}}function f(e,i){const t=k[e],a=[];let r=0,s=0;for(let n=0;n<T;n++){const l=q(n,t.useHybridGlyphVectorPipeline);a.push(l),l.isGibberishViolation&&r++;const b=Math.abs(l.hybridTypoAmortizedUnitCost-l.quadratureGlyphStrokeCost);b>s&&(s=b)}const o=i!==void 0?Math.max(0,Math.min(T-1,i)):t.defaultStationIndex;return{presetId:e,useHybridGlyphVectorPipeline:t.useHybridGlyphVectorPipeline,stationCount:T,selectedStation:a[o],stations:a,station4Ratio:a[4].typographyAccuracyBudgetRatio,station8Ratio:a[8].typographyAccuracyBudgetRatio,station12Ratio:a[12].typographyAccuracyBudgetRatio,station16Ratio:a[16].typographyAccuracyBudgetRatio,violatedCount:r,maxQuadratureError:s,verdict:r===0?"HYBRID_GLYPH_HARFBUZZ_TYPOGRAPHY_LOCKED":"NAIVE_DIFFUSION_CJK_GIBBERISH_OVERRUN"}}function K(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Multilingual Poster Typography & Glyph Inpainting Plinth"}),i.push({id:"kerning-rail-front",kind:"harfbuzz_vector_kerning_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"HarfBuzz BiDi/CJK Vector Typography & Editable SVG Layer Bus (1.0000×)"}),i.push({id:"kerning-rail-back",kind:"harfbuzz_vector_kerning_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"FreeType Binary Glyph Mask + Glyph-ByT5 3D Diegetic Texture Bus"});for(const t of e.stations){const a=(t.index-8)*30,r=22*t.gibberishReworkAmplification,s=44*t.hybridTypoAmortizedUnitCost,o=36*t.typographyAccuracyBudgetRatio;i.push({id:`stroke-density-demand-column-${t.index}`,kind:"stroke_density_demand_column",stationIndex:t.index,x:a,y:r*.5-8,z:-56,w:14,h:r,d:14,tone:"amber",label:`Tier ${t.index} Amplification G(u) = ${t.gibberishReworkAmplification.toFixed(4)}× (${t.typographyStageLabel})`}),i.push({id:`glyph-controlnet-inpaint-node-${t.index}`,kind:"glyph_controlnet_inpaint_node",stationIndex:t.index,x:a,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useHybridGlyphVectorPipeline?"teal":"slate",label:`Tier ${t.index} Amortized Typo Cost c_typo = ${t.hybridTypoAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`ocr-accuracy-budget-gauge-${t.index}`,kind:"ocr_accuracy_budget_gauge",stationIndex:t.index,x:a,y:o*.5-8,z:56,w:Math.min(24,12*t.typographyAccuracyBudgetRatio),h:o,d:12,tone:t.isGibberishViolation?"crimson":"teal",label:`Tier ${t.index} OCR Accuracy & Budget Ratio = ${t.typographyAccuracyBudgetRatio.toFixed(4)}×`})}return i.push({id:"glyph-gate-left",kind:"freetype_glyph_mask_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"FreeType/HarfBuzz Multi-Script Shaping & Binary Glyph Mask Gate"}),i.push({id:"glyph-gate-right",kind:"freetype_glyph_mask_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHybridGlyphVectorPipeline?"teal":"crimson",label:"PaddleOCR Levenshtein == 0 & Vector Layer Export Egress Gate"}),i.push({id:"cer-bar-top",kind:"zero_typo_cer_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Typography Law: c_typo(u) = c_0 / (1 + u) via 3D Glyph Mask + HarfBuzz Vector Copy"}),i.push({id:"cer-bar-front",kind:"zero_typo_cer_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHybridGlyphVectorPipeline?"teal":"crimson",label:"0.00% CJK/RTL Character Error Rate (CER) & Budget Lock Line (1.0000×)"}),i}const O=new URLSearchParams(window.location.search),G=O.get("preset"),Z=O.get("theme")==="light"?"light":"dark";let d=G&&G in k?G:"hybrid_glyph_controlnet_harfbuzz_vector_lock",c=k[d].defaultStationIndex,g=Z;document.documentElement.setAttribute("data-theme",g);const J=document.querySelector("#app");J.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 239 · 249TH DEMO · ENTERPRISE MULTILINGUAL POSTER TYPOGRAPHY & GLYPH INPAINTING STUDIO</span>
        <h1>Enterprise Multilingual Poster Typography & Glyph Inpainting Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Multilingual Typography Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="hybrid_glyph_controlnet_harfbuzz_vector_lock"
      >
        Hybrid FreeType/Glyph-ByT5 3D Mask + HarfBuzz Vector Copy (CER = 0.00%, Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_prompt_only_cjk_gibberish"
      >
        Naive Prompt-Only Diffusion Text (CJK Gibberish & PS Rework Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Multilingual Typography Readouts">
      <article class="kpi-card">
        <span class="kpi-label">REWORK FACTOR G(u) / HYBRID TYPO COST c_typo</span>
        <strong id="kpi-typo" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">OCR ACCURACY & BUDGET RATIO (C_active / C_typo)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TIERS 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">G(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CJK GIBBERISH & TYPO REWORK VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER GLYPH-BYT5 3D MASK & HARFBUZZ VECTOR TYPOGRAPHY STAGE</span>
          <span id="solid-count-readout">58 solids · 17 script tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Multilingual Poster Typography and Glyph Inpainting Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Multilingual Typography & Script Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, c_typo = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER HYBRID GLYPH/VECTOR VS NAIVE DIFFUSION GIBBERISH LEDGER</span>
          <span>c_typo = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>G(u) = 1+u</th>
                <th>c_typo</th>
                <th>Glyph Quad</th>
                <th>C / C_typo</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),F=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-typo"),W=document.querySelector("#kpi-quad"),B=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),H=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),E=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),M=document.querySelector("#station-tbody"),z=document.querySelector("#theme-toggle");function y(e,i,t){const a=(e-t*.55)*.88,r=-i+(e*.18+t*.42)*.55;return[a,r]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function rt(e,i,t,a,r,s,o,n,l,b,U){const p=a*.5,u=r*.5,h=s*.5,A=y(e+p,i-u,t-h),C=y(e+p,i-u,t+h),I=y(e-p,i-u,t+h),L=y(e-p,i+u,t-h),_=y(e+p,i+u,t-h),x=y(e+p,i+u,t+h),S=y(e-p,i+u,t+h),R=nt(o,l),v=n?1.8:.7,$=n?"#ffffff":R.stroke,V=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`,w=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`,D=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${U}">
      <polygon points="${w}" fill="${R.left}" stroke="${$}" stroke-width="${v}" />
      <polygon points="${D}" fill="${R.right}" stroke="${$}" stroke-width="${v}" />
      <polygon points="${V}" fill="${R.top}" stroke="${$}" stroke-width="${v}" />
    </g>
  `}function m(e){const i=k[e.presetId],t=e.selectedStation,a=g==="dark";j.textContent=i.subtitle,F.textContent=i.badge,F.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`G(u) = ${t.gibberishReworkAmplification.toFixed(4)}× (c_typo = ${t.hybridTypoAmortizedUnitCost.toFixed(4)}×)`,W.textContent=`Glyph Quad = ${t.quadratureGlyphStrokeCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,B.textContent=`${t.typographyAccuracyBudgetRatio.toFixed(4)}×`,B.className=`kpi-value ${t.isGibberishViolation?"text-danger":"text-ok"}`,X.textContent=`u = ${t.glyphComplexityU.toFixed(4)} | ${t.typographyStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,H.textContent=`${e.violatedCount} / ${e.stationCount}`,H.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,E.value=String(t.index),at.textContent=`Tier ${t.index} (u = ${t.glyphComplexityU.toFixed(3)}, c_typo = ${t.hybridTypoAmortizedUnitCost.toFixed(3)}, Ratio = ${t.typographyAccuracyBudgetRatio.toFixed(4)}×)`;const r=K(e);it.textContent=`${r.length} solids · ${e.stationCount} script tiers`;const s=[...r].sort((o,n)=>o.z-n.z||o.y-n.y||o.x-n.x);ot.innerHTML=s.map(o=>rt(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,a,o.id,o.kind)).join(""),M.innerHTML=e.stations.map(o=>{const n=o.index===t.index?"row-selected":"",l=o.isGibberishViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.glyphComplexityU.toFixed(4)}</td>
          <td>${o.gibberishReworkAmplification.toFixed(4)}×</td>
          <td>${o.hybridTypoAmortizedUnitCost.toFixed(4)}×</td>
          <td>${o.quadratureGlyphStrokeCost.toFixed(4)}×</td>
          <td class="${l}">${o.typographyAccuracyBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const n=o.getAttribute("data-preset");o.classList.toggle("active",n===e.presetId)}),window.__MULTILINGUAL_TYPOGRAPHY_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in k&&(d=i,c=k[d].defaultStationIndex,m(f(d,c)))})});E.addEventListener("input",()=>{c=Number(E.value),m(f(d,c))});M.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),m(f(d,c)))});z.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),z.textContent=`Theme: ${g.toUpperCase()}`,m(f(d,c))});m(f(d,c));
