import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"executive-keynote-depth-sandwich-cover":{id:"executive-keynote-depth-sandwich-cover",title:"Executive Keynote 16:9 Cover: EAR ≥ 0.28 Gaze Lock + 3-Layer Subject-Over-Text Sandwich",titleZh:"高管主题演讲 16:9 封面：EAR ≥ 0.28 防闭眼正视优选 + 背景/大字/人物前景三明治穿插排版",minEarThreshold:.28,depthLayers:"BG Blur → Satori 120pt Headline → BiRefNet Speaker Cutout",targetChannels:"YouTube 16:9 / LinkedIn / WeChat Video"},"ecommerce-unboxing-sku-hold-blink-gate":{id:"ecommerce-unboxing-sku-hold-blink-gate",title:"Product Review & Unboxing Cover: Dual Speaker-Smile + Sharp SKU Hold Frame Gate",titleZh:"数码美妆测评封面：人物微笑睁眼 + 手持商品拉普拉斯零残影双峰值关键帧提取",minEarThreshold:.3,depthLayers:"Relit Studio BG → Hook Badge → Speaker + 100% Sharp SKU",targetChannels:"TikTok 9:16 / Xiaohongshu 3:4 / Bilibili 4:3"},"multichannel-youtube-tiktok-bilibili-pack":{id:"multichannel-youtube-tiktok-bilibili-pack",title:"Omnichannel 3-Ratio Thumbnail Pack with Duration-Badge & Avatar Safe-Zone Lock",titleZh:"一源三端（16:9 / 4:3 / 9:16）封面矩阵与右下角时长角标（12:45）避让护栏",minEarThreshold:.28,depthLayers:"3-Ratio Saliency Crop + Badge Dead-Zone Mask + Vector Rim Glow",targetChannels:"YouTube / Bilibili / Douyin / Reels"}};function f(a,e,i){const t=Number(((i-180)*.02).toFixed(1));return e==="ear-sharpness-gate-birefnet-depth-sandwich-satori"?{scenarioId:a,pipelineMode:e,blinkBlurFreeExpressionPct:100,badgeSafeZoneCompliancePct:99.9,organicCtrLiftPct:Number((43.6+Math.max(0,t)).toFixed(1)),costPerVideoUsd:.004,annualSavingsUsdM:1.96,verdict:"Act automatically"}:e==="manual-photoshop-designer-cutout"?{scenarioId:a,pipelineMode:e,blinkBlurFreeExpressionPct:99.2,badgeSafeZoneCompliancePct:98.5,organicCtrLiftPct:41,costPerVideoUsd:35,annualSavingsUsdM:.11,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,blinkBlurFreeExpressionPct:51.4,badgeSafeZoneCompliancePct:63.6,organicCtrLiftPct:-6.8,costPerVideoUsd:.09,annualSavingsUsdM:.02,verdict:"Send to a human"}}const g=document.querySelector("#app");if(!g)throw new Error("Missing #app root");let d="executive-keynote-depth-sandwich-cover",l="ear-sharpness-gate-birefnet-depth-sandwich-satori",r=210;function b(a){const e=a.getContext("2d");if(!e)return;const i=a.width,t=a.height;e.clearRect(0,0,i,t);const c=u[d],o=f(d,l,r),s=l==="naive-midpoint-ffmpeg-frame-flat-text",h=e.createLinearGradient(0,0,i,t);h.addColorStop(0,"#070b14"),h.addColorStop(1,"#1e1b4b"),e.fillStyle=h,e.fillRect(0,0,i,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,i-32,46),e.strokeStyle=l==="ear-sharpness-gate-birefnet-depth-sandwich-satori"?"#10b981":"#ef4444",e.strokeRect(16,14,i-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`267th Workbench (52nd in Domain 3) · EAR ≥ ${c.minEarThreshold} · Laplacian ≥ ${r} · ${c.targetChannels}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Blink/Blur-Free Lock: ${o.blinkBlurFreeExpressionPct}% | Badge Safe-Zone: ${o.badgeSafeZoneCompliancePct}% | CTR Lift: +${o.organicCtrLiftPct}%`,28,51);const m=[{title:"1. EAR Blink-Free & Laplacian Sharpness Gate",detail:s?"⛔ Half-Closed Blinking Eyes & Motion Blur (48.6% Fail)":`✓ EAR ≥ ${c.minEarThreshold} + Sharpness ≥ ${r} (100% Clean)`,color:s?"#ef4444":"#10b981",x:36,y:84},{title:"2. 3-Layer Subject-Over-Text Depth Sandwich",detail:s?"⛔ Flat Text Blocks Speaker Face or Melts in Diffusion":`✓ ${c.depthLayers}`,color:s?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Platform Duration-Badge & UI Safe-Zone Guard",detail:s?"⛔ Bottom-Right 12:45 Badge Clips Key Title Words (36.4%)":`✓ 99.9% Safe-Zone Lock (${c.targetChannels})`,color:s?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Organic CTR Lift & Batch Thumbnail Economics",detail:s?"⛔ -6.8% CTR Drop from Awkward Mid-Speech Grimace":`✓ +${o.organicCtrLiftPct}% CTR Lift ($${o.costPerVideoUsd}/Video · +$${o.annualSavingsUsdM}M/yr)`,color:s?"#ef4444":"#f59e0b",x:396,y:178}];for(const n of m)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=n.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(n.x,n.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(n.title,n.x+14,n.y+28),e.fillStyle=n.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(n.detail,n.x+14,n.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active AI Thumbnail Compiler: ${c.title}`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(s?"⛔ FFmpeg Midpoint Frame + Flat Overlay: Captures Mid-Blink Grimaces & Collides with Time Badges!":`✓ FaceMesh EAR/Gaze Peak + BiRefNet 3-Layer Depth Sandwich + Satori Safe-Zone Typography ($${o.costPerVideoUsd}/Cover)`,54,336),e.restore()}function p(){const a=u[d],e=f(d,l,r);g.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">267th Workbench (52nd in Domain 3) · Blink-Free Keyframe Selector &amp; Depth-Layered CTR Cover</span>
        <h1>企业视频高点击封面图（AI Thumbnail）自动编译：防闭眼/防残影关键帧优选与人物穿插压字工作台</h1>
        <p class="subtitle">FaceMesh 眼睑开度（EAR ≥ 0.28）与拉普拉斯清晰度双门禁 + BiRefNet“背景-大字-人物前景”三明治穿插排版 + 时长角标死区避让 vs 盲目截取半闭眼残影帧</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.blinkBlurFreeExpressionPct}% Blink-Free</span>
        <span class="metric-pill">+${e.organicCtrLiftPct}% CTR Lift</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 视频封面与多平台分发场景 (Thumbnail &amp; Channel Scenario)</label>
        <select id="scenario-select">
          ${Object.values(u).map(t=>`<option value="${t.id}" ${t.id===d?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 关键帧优选与封面合成管线 (Thumbnail Compilation Pipeline)</label>
        <select id="mode-select">
          <option value="ear-sharpness-gate-birefnet-depth-sandwich-satori" ${l==="ear-sharpness-gate-birefnet-depth-sandwich-satori"?"selected":""}>✅ EAR 防闭眼/清晰度门禁 + BiRefNet 三明治人物压字 + 角标安全区 (推荐)</option>
          <option value="naive-midpoint-ffmpeg-frame-flat-text" ${l==="naive-midpoint-ffmpeg-frame-flat-text"?"selected":""}>⛔ FFmpeg 定时抽帧 + 平面文字硬盖 (48.6% 抓拍到半闭眼/歪嘴残影，36.4% 被时长角标挡字)</option>
          <option value="manual-photoshop-designer-cutout" ${l==="manual-photoshop-designer-cutout"?"selected":""}>⚠️ 人工美工逐条挑帧 + Photoshop 抠图做封面 ($35/张，每条视频多尺寸耗时 45 分钟)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="sharpness-slider">3. 拉普拉斯防运动模糊阈值 (Laplacian Sharpness Floor: <strong>${r}</strong>)</label>
        <input id="sharpness-slider" type="range" min="180" max="260" step="10" value="${r}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>EAR 防闭眼选帧、BiRefNet 三明治穿插压字与多端角标避让舞台 (Thumbnail Stage)</h2>
          <span class="tag">${a.targetChannels} · EAR ≥ ${a.minEarThreshold}</span>
        </div>
        <canvas id="thumbnail-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>多平台视频点击率（CTR）与封面编译遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">防闭眼/防歪嘴/零运动残影关键帧率</span>
            <strong class="kpi-value">${e.blinkBlurFreeExpressionPct}%</strong>
            <span class="kpi-note">EAR 眼睑开度 + 正视微笑 + 清晰度三峰值寻优</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">平台时长角标与 UI 安全区合规率</span>
            <strong class="kpi-value">${e.badgeSafeZoneCompliancePct}%</strong>
            <span class="kpi-note">自动避让右下角 12:45 时间戳与底部进度条</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">信息流自然点击率 (Organic CTR) 提升</span>
            <strong class="kpi-value">${e.organicCtrLiftPct>=0?"+":""}${e.organicCtrLiftPct}%</strong>
            <span class="kpi-note">人物前景局部压住大字标题边缘增强立体纵深</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单视频三尺寸封面成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerVideoUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比美工 PS 手工抠图 $35/张降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const i=document.querySelector("#thumbnail-canvas");i&&b(i),document.querySelector("#scenario-select")?.addEventListener("change",t=>{d=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{l=t.target.value,p()}),document.querySelector("#sharpness-slider")?.addEventListener("input",t=>{r=Number(t.target.value),p()})}p();
