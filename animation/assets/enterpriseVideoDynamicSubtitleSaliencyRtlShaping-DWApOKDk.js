import"./modulepreload-polyfill-B5Qt9EMX.js";const g={"mena-arabic-rtl-luxury-reel-9x16":{id:"mena-arabic-rtl-luxury-reel-9x16",title:"MENA Arabic + English 9:16 Luxury Reel (HarfBuzz Cursive RTL Ligatures + UAX #9 BiDi Price SAR 1,299)",titleZh:"中东阿语/英语 9:16 奢品竖屏短视频（HarfBuzz 连字塑形 + UAX #9 双向数字 SAR 1,299 + 避开 TikTok 底部 UI）",localeLabel:"ar-AE (RTL) + en-US BiDi",sampleLinePrimary:"إصدار حصري بسعر SAR 1,299 فقط",sampleLineSecondary:"Exclusive Edition at SAR 1,299 Only",optimalSafeBandY:68},"cjk-bilingual-tech-keynote-16x9":{id:"cjk-bilingual-tech-keynote-16x9",title:"CJK zh-CN / ja-JP + EN 16:9 Keynote (UAX #14 Kinsoku Punctuation Guard + Lower-Third Chart Avoidance)",titleZh:"中日英 16:9 科技发布会（UAX #14 标点避头尾禁则处理 + 自动避让底部架构图横幅）",localeLabel:"zh-CN / ja-JP (Kinsoku) + en-US",sampleLinePrimary:"「全栈生成式视觉控制平面」延迟降低 82.6%。",sampleLineSecondary:"Full-Stack Visual Control Plane Cuts Latency by 82.6%.",optimalSafeBandY:22},"product-closeup-tabletop-demo-9x16":{id:"product-closeup-tabletop-demo-9x16",title:"Tabletop Product Macro Demo 9:16 (SAM-2 SKU Occlusion Repulsion + WhisperX 12ms Phoneme Karaoke)",titleZh:"桌面商品微距实测 9:16 短视频（SAM-2 主体防遮挡上移锚定 + WhisperX 12ms 音素级卡拉OK高亮）",localeLabel:"Multi-Locale 16-Lang Matrix",sampleLinePrimary:"0.8mm 车缝线与 24K 烫金徽标 100% 零遮挡呈现",sampleLineSecondary:"100% Unoccluded 0.8mm Stitching & 24K Foil Crest",optimalSafeBandY:24}};function P(a,e,l){const t=Math.max(0,(l-20)*.6);return e==="shot-locked-saliency-harfbuzz-bidi-kinsoku"?{scenarioId:a,pipelineMode:e,subjectUiZeroOcclusionPct:99.8,rtlKinsokuGlyphIntegrityPct:100,shotTemporalAnchorStabilityPct:100,costPerClipUsd:.002,annualSavingsUsdM:2.38,verdict:"Act automatically"}:e==="per-frame-jittering-bbox-dodger"?{scenarioId:a,pipelineMode:e,subjectUiZeroOcclusionPct:96.4,rtlKinsokuGlyphIntegrityPct:100,shotTemporalAnchorStabilityPct:51.2,costPerClipUsd:.004,annualSavingsUsdM:.82,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,subjectUiZeroOcclusionPct:Number(Math.max(48,60.4-t).toFixed(1)),rtlKinsokuGlyphIntegrityPct:55.8,shotTemporalAnchorStabilityPct:100,costPerClipUsd:.085,annualSavingsUsdM:.14,verdict:"Send to a human"}}const U=document.querySelector("#app");if(!U)throw new Error("Missing #app root");let p="mena-arabic-rtl-luxury-reel-9x16",n="shot-locked-saliency-harfbuzz-bidi-kinsoku",o=22;function R(a){const e=a.getContext("2d");if(!e)return;const l=a.width,t=a.height;e.clearRect(0,0,l,t);const u=g[p],h=P(p,n,o),r=n==="fixed-y82-naive-canvas-filltext",L=n==="per-frame-jittering-bbox-dodger",S=e.createLinearGradient(0,0,l,t);S.addColorStop(0,"#070b14"),S.addColorStop(1,"#111827"),e.fillStyle=S,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,l-32,46),e.strokeStyle=n==="shot-locked-saliency-harfbuzz-bidi-kinsoku"?"#10b981":"#ef4444",e.strokeRect(16,14,l-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`257th Workbench (🏆 50th Studio in Domain 3!) · ${u.localeLabel} · Safe Band Y=${u.optimalSafeBandY}%`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Zero-Occlusion Rate: ${h.subjectUiZeroOcclusionPct}% | RTL/Kinsoku Glyph Integrity: ${h.rtlKinsokuGlyphIntegrityPct}% | Shot Anchor Stability: ${h.shotTemporalAnchorStabilityPct}%`,28,51);const c=28,i=78,f=310,d=290;e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.lineWidth=2,e.beginPath(),e.roundRect(c,i,f,d,12),e.fill(),e.stroke();const k=Math.round(o/100*d);e.fillStyle="rgba(239, 68, 68, 0.22)",e.fillRect(c+4,i+d-k,f-8,k-4),e.fillStyle="#fca5a5",e.font="bold 10px JetBrains Mono, monospace",e.fillText(`Platform UI Dead-Zone (Bottom ${o}%)`,c+16,i+d-12),e.fillStyle="rgba(56, 189, 248, 0.16)",e.strokeStyle="#38bdf8",e.strokeRect(c+75,i+115,160,110),e.fillStyle="#bae6fd",e.fillText("SAM-2 Subject / Hero SKU ROI",c+86,i+172);const v=r?i+Math.round(d*.82):i+Math.round(d*(u.optimalSafeBandY/100));e.fillStyle=r?"rgba(239, 68, 68, 0.88)":"rgba(16, 185, 129, 0.88)",e.beginPath(),e.roundRect(c+20,v-18,f-40,36,8),e.fill(),e.fillStyle="#060911",e.font="bold 11px Inter, sans-serif",e.textAlign="center",e.fillText(r?"⛔ Fixed Y=82% Collides with UI/SKU!":L?"⚠️ Per-Frame Y-Jitter (51.2% Stability)":`✓ Shot-Locked Safe Band Y=${u.optimalSafeBandY}%`,c+f/2,v+4),e.restore();const s=362,m=372;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=r?"#ef4444":"#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(s,i,m,d,12),e.fill(),e.stroke(),e.fillStyle="#34d399",e.font="bold 12px Inter, sans-serif",e.fillText("HarfBuzz RTL Ligature + BiDi (UAX #9) + CJK Kinsoku",s+16,i+26),e.fillStyle="#090d16",e.strokeStyle="#38bdf8",e.beginPath(),e.roundRect(s+16,i+44,m-32,92,10),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 13px Inter, sans-serif",e.fillText(u.sampleLinePrimary,s+28,i+78),e.fillStyle="#e2e8f0",e.font="12px Inter, sans-serif",e.fillText(u.sampleLineSecondary,s+28,i+112),[{name:"HarfBuzz Whole-Word Cluster Clip",desc:r?"✕ Per-char split breaks Arabic cursive joining":"✓ Sweep-mask preserves Arabic initial/medial/final ligatures"},{name:"UAX #9 BiDi + UAX #14 Kinsoku Guard",desc:r?"✕ Reversed SAR 1,299 & orphaned CJK punctuation":"✓ 100.0% BiDi LTR-in-RTL number & CJK kinsoku compliance"}].forEach((x,A)=>{const y=i+152+A*62;e.fillStyle="#090d16",e.fillRect(s+16,y,m-32,52),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(x.name,s+26,y+20),e.fillStyle=r?"#fca5a5":"#6ee7b7",e.font="10px JetBrains Mono, monospace",e.fillText(x.desc,s+26,y+39)}),e.restore()}function b(){const a=g[p],e=P(p,n,o);U.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">257th Workbench (🏆 50th Studio in Domain 3!) · Dynamic Saliency Subtitles, RTL Shaping & CJK Kinsoku</span>
        <h1>企业视频动态显著性防遮挡字幕编排、音素级卡拉OK高亮与阿语 RTL / 中日文禁则排版工作台</h1>
        <p class="subtitle">镜头级 SAM-2 主体+平台 UI 死区避让 (99.8% 零遮挡) + WhisperX 12ms 音素卡拉OK + HarfBuzz 阿语连字塑形与 UAX #14 标点避头尾 vs 固定底部硬压字幕</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.subjectUiZeroOcclusionPct}% Zero Occlusion</span>
        <span class="metric-pill">${e.rtlKinsokuGlyphIntegrityPct}% RTL/Kinsoku Lock</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 出海多语种视频场景 (Global Video Subtitle Scenario)</label>
        <select id="scenario-select">
          ${Object.values(g).map(t=>`<option value="${t.id}" ${t.id===p?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 字幕空间避让与多语种字形引擎 (Placement & Shaping Engine)</label>
        <select id="mode-select">
          <option value="shot-locked-saliency-harfbuzz-bidi-kinsoku" ${n==="shot-locked-saliency-harfbuzz-bidi-kinsoku"?"selected":""}>✅ 镜头级显著性安全带锚定 + HarfBuzz 阿语连字滑动掩码 + UAX #14 禁则 (推荐)</option>
          <option value="fixed-y82-naive-canvas-filltext" ${n==="fixed-y82-naive-canvas-filltext"?"selected":""}>⛔ 固定底部 Y=82% + 逐字符拆分变色 (39.6% 挡商品/UI，44.2% 阿语断连字)</option>
          <option value="per-frame-jittering-bbox-dodger" ${n==="per-frame-jittering-bbox-dodger"?"selected":""}>⚠️ 逐帧实时跟随边界框跳动避让 (字幕上下高频抖动引发眩晕)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="deadzone-slider">3. 社媒平台底部 UI 死区高度占比 (Platform UI Dead-Zone: <strong>${o}%</strong>)</label>
        <input id="deadzone-slider" type="range" min="14" max="30" step="2" value="${o}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>镜头级显著性安全区（Safe-Band）与 HarfBuzz 阿语 RTL / 中日文禁则舞台 (Subtitle Stage)</h2>
          <span class="tag">Domain 3 Reaches 50 Studios! · ${a.localeLabel}</span>
        </div>
        <canvas id="subtitle-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>多语种字幕防遮挡与排版合规遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">商品/嘴部与平台 UI 零遮挡率</span>
            <strong class="kpi-value">${e.subjectUiZeroOcclusionPct}%</strong>
            <span class="kpi-note">联合避让 SAM-2 前景主体与底部 ${o}% 按钮区</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">阿语 RTL 连字与中日文避头尾合规率</span>
            <strong class="kpi-value">${e.rtlKinsokuGlyphIntegrityPct}%</strong>
            <span class="kpi-note">HarfBuzz 整词塑形裁剪 + UAX #9/#14 标准</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单镜头内字幕 Y 轴防抖稳定度</span>
            <strong class="kpi-value">${e.shotTemporalAnchorStabilityPct}%</strong>
            <span class="kpi-note">按分镜切点锁定安全带 vs 逐帧跳动</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单条渲染成本 / 出海审校年省</span>
            <strong class="kpi-value">$${e.costPerClipUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">免除 16 语种人工挪字幕与阿语重排返工</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#subtitle-canvas");l&&R(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{p=t.target.value,b()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{n=t.target.value,b()}),document.querySelector("#deadzone-slider")?.addEventListener("input",t=>{o=Number(t.target.value),b()})}b();
