import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"global-product-keynote-20-languages":{id:"global-product-keynote-20-languages",titleZh:"全球产品发布会 20 语种同声译制（等时性音节控制 ±2.8% + 专有名词词典锁 + CEO 零样本音色克隆）",titleEn:"Global Product Keynote 20-Language Dubbing (±2.8% Isochrony + Glossary Lock + CEO Voice Clone)",monthlyDubbedMinutes:25e3,saasCostPerMinUsd:3.2,hybridCostPerMinUsd:.14,naiveDurationDriftPct:32.5,isochronousDurationDriftPct:2.8,bgmFoleyPreservationSnrDb:38.4,annualLocalizationSavingsUsd:918e3},"short-drama-and-ad-bgm-foley-preserve":{id:"short-drama-and-ad-bgm-foley-preserve",titleZh:"出海短剧与品牌广告片译制（UVR5/MDX-Net 无损剥离保留 100% 原始背景音乐与环境拟音 + 多角色唇形重绘）",titleEn:"Global Short-Drama & Commercial Dubbing (UVR5 BGM/Foley Stem Preservation + Multi-Speaker Lip-Sync)",monthlyDubbedMinutes:6e4,saasCostPerMinUsd:3.5,hybridCostPerMinUsd:.11,naiveDurationDriftPct:36.8,isochronousDurationDriftPct:2.4,bgmFoleyPreservationSnrDb:41.2,annualLocalizationSavingsUsd:2440800},"enterprise-academy-80k-min-archive":{id:"enterprise-academy-80k-min-archive",titleZh:"企业技术学院与客户成功视频库（月译制 80,000 分钟 · Azure Speech + MuseTalk $0.08/min vs SaaS $2.80/min）",titleEn:"Enterprise Academy 80,000-Min Localization (Azure Speech + MuseTalk $0.08/min vs $2.80/min SaaS)",monthlyDubbedMinutes:8e4,saasCostPerMinUsd:2.8,hybridCostPerMinUsd:.08,naiveDurationDriftPct:29.4,isochronousDurationDriftPct:2.6,bgmFoleyPreservationSnrDb:39.5,annualLocalizationSavingsUsd:2611200}};function v(t,s){const e=u[t],a=s==="uvr5-isochrony-azure-tts-musetalk-pipeline",c=a?e.hybridCostPerMinUsd:e.saasCostPerMinUsd,i=a?e.isochronousDurationDriftPct:e.naiveDurationDriftPct,n=a?e.bgmFoleyPreservationSnrDb:14.2,d=a?Number(((e.saasCostPerMinUsd-e.hybridCostPerMinUsd)/e.saasCostPerMinUsd*100).toFixed(1)):0;return{workload:e,stack:s,effectiveCostPerMinUsd:c,effectiveDurationDriftPct:i,effectiveBgmSnrDb:n,costReductionPct:d,isochronySyncPass:i<=4,bgmPreservedPass:n>=35,verdictBadge:a?`UVR5 + ISOCHRONY + AZURE/MUSETALK LOCKED ($${c.toFixed(2)}/Min · ±${i.toFixed(1)}% Sync · -${d}% TCO)`:`CHIPMUNK SPEEDUP (+${e.naiveDurationDriftPct}% Drift), MUTED BGM & $${e.saasCostPerMinUsd.toFixed(2)}/MIN SAAS BILL!`}}const y=document.querySelector("#app");let b="short-drama-and-ad-bgm-foley-preserve",p="uvr5-isochrony-azure-tts-musetalk-pipeline";function S(){const t=v(b,p),s=t.workload,e=p==="uvr5-isochrony-azure-tts-musetalk-pipeline";y.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 408 · 197th Interactive Workbench · Domain 3 (HeyGen / ElevenLabs SaaS vs UVR5 Stem Split + Isochronous LLM + Azure Speech + MuseTalk Studio)</span>
        <h1>企业视频多语种译制与改口型选型工作台：HeyGen / ElevenLabs SaaS vs Azure Speech + UVR5 分轨 + MuseTalk 混合管线</h1>
        <p class="wb-subtitle">解决企业营销广告、出海短剧与产品培训视频跨语种译制的三大痛点：① 直接机翻将中文译成西班牙语/德语时音节数暴涨 +${s.naiveDurationDriftPct}%，导致配音变成“花栗鼠快放”或画面已切走声音还在播；② 黑盒一键译制 SaaS 把原片昂贵的背景音乐与环境拟音（BGM & Foley）一并抹除且单价高达 $${s.saasCostPerMinUsd.toFixed(2)}/分钟；③ 通过“<strong>UVR5/MDX-Net 人声伴奏无损分轨 + LLM 等时性音节预算翻译 (±${s.isochronousDurationDriftPct}%) + Azure Speech / CosyVoice 零样本音色克隆 + 自建 MuseTalk 面部口型重绘</strong>”，将单分钟成本压至 $${s.hybridCostPerMinUsd.toFixed(2)}（-${t.costReductionPct}% TCO，年省 +$${(s.annualLocalizationSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Video Dubbing Workload and Stack Controls">
      <div class="control-group">
        <span class="control-label">1. 选择企业视频跨语种译制业务场景 (Enterprise Video Localization Workload):</span>
        <div class="btn-row">
          ${Object.keys(u).map(a=>`
            <button type="button" class="scenario-btn ${b===a?"active":""}" data-scenario="${a}">
              ${u[a].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换多语种视频译制与唇形同步架构 (Video Dubbing & Lip-Sync Architecture):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="blackbox-end2end-dubbing-saas">
            ❌ 方案 A：黑盒一键译制 SaaS / 朴素机翻直配 (语速失真 +${s.naiveDurationDriftPct}% · 丢失原片 BGM 音效 · 高达 $${s.saasCostPerMinUsd.toFixed(2)}/分钟)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="uvr5-isochrony-azure-tts-musetalk-pipeline">
            ✅ 方案 B：UVR5 无损分轨 + LLM 等时翻译 (±${s.isochronousDurationDriftPct}%) + Azure TTS/克隆 + MuseTalk 口型 ($${s.hybridCostPerMinUsd}/分钟)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Video Dubbing Selection KPIs">
      <div class="kpi-card">
        <span class="kpi-title">单分钟多语种译制与改口型成本 (Unit Dubbing Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${t.effectiveCostPerMinUsd.toFixed(2)} / min (-${t.costReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">月译制 ${s.monthlyDubbedMinutes.toLocaleString("en-US")} 分钟 · 对比外部 SaaS $${s.saasCostPerMinUsd.toFixed(2)}/min</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">跨语种分镜时长对齐误差 (Isochronous Duration Drift)</span>
        <strong class="kpi-value ${t.isochronySyncPass?"good":"bad"}" id="kpi-drift">±${t.effectiveDurationDriftPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"LLM 按源分镜秒数约束目标语种音节数 + SSML prosody 微调":`德语/西语字面直译音节膨胀 +${s.naiveDurationDriftPct}% 触发花栗鼠倍速失真`}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">原片背景音乐与环境拟音保真度 (BGM & Foley SNR)</span>
        <strong class="kpi-value ${t.bgmPreservedPass?"good":"bad"}" id="kpi-bgm">${t.effectiveBgmSnrDb.toFixed(1)} dB SNR</strong>
        <span class="kpi-sub">MDX-Net/UVR5 剥离干声轨，100% 保留原片配乐并通过侧链闪避混音</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">全球化内容中心年化净省预算 (Annual Localization ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(s.annualLocalizationSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">兼顾广播级音画同步、术语准确与极致算力单价</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>五阶广播级视频本地化译制管线 (UVR5 分轨 → 等时翻译 → 零样本克隆 → MuseTalk 改口型 → EBU R128 混音) 画布</h2>
          <span class="tag">${s.monthlyDubbedMinutes.toLocaleString("en-US")} Min/Mo · ±${s.isochronousDurationDriftPct}% Isochrony</span>
        </div>
        <canvas id="dubbing-pipeline-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>SaaS 一键译制 vs 模块化混合译制管线选型明细 (Dubbing Stack Audit)</h2>
        <ul class="audit-list">
          <li><span>1. 什么时候选 ElevenLabs / HeyGen SaaS:</span> <strong>月译制 &lt; 300 分钟的单人干声口播短视频 ($2.80–$3.50/min，免工程开发)</strong></li>
          <li><span>2. 什么时候选模块化混合自建管线:</span> <strong>月译制 ≥ 1,000 分钟、含复杂背景配乐/多角色短剧或需内网术语词典锁 ($0.08–$0.14/min)</strong></li>
          <li><span>Step 1 · 音轨无损解耦 (Stem Separation):</span> <strong>MDX-Net / UVR5 分离 Vocal 干声轨与 BGM+Foley 伴奏轨 (信噪比 ${s.bgmFoleyPreservationSnrDb} dB)</strong></li>
          <li><span>Step 2 · 等时性控制翻译 (Isochronous LLM):</span> <strong>按源句时长预算目标语言音节数 (±${s.isochronousDurationDriftPct}% 时长偏差，告别 1.35× 机械快放)</strong></li>
          <li><span>Step 3 · 原声情感克隆与 SSML 对齐:</span> <strong>Azure AI Speech Personal Voice / CosyVoice2 跨语种保留主讲人音色与重音停顿</strong></li>
          <li><span>Step 4 · 仅正脸镜头选择性改口型:</span> <strong>人脸检测自动跳过 PPT/B-Roll 镜头，仅对出镜正脸帧跑 MuseTalk (节省 60% GPU)</strong></li>
          <li><span>企业年化净省本地化译制预算:</span> <strong>+$${s.annualLocalizationSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,h(),g(t)}function h(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{b=t.dataset.scenario,S()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{p=t.dataset.mode,S()})})}function g(t){const s=document.querySelector("#dubbing-pipeline-canvas");if(!s)return;const e=s.getContext("2d"),a=s.width,c=s.height,i=t.workload,n=t.stack==="uvr5-isochrony-azure-tts-musetalk-pipeline";e.fillStyle="#070b14",e.fillRect(0,0,a,c),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Modular Broadcast Video Localization Pipeline: Why Decoupled Stems & Isochrony Beat Black-Box SaaS",22,26);const d=[{title:"1. UVR5 / MDX-Net Stem Split",sub:`BGM & Foley SNR: ${i.bgmFoleyPreservationSnrDb} dB`,desc:"Preserves 100% original music & sound effects",w:184,color:"#38bdf8"},{title:"2. Isochronous LLM + Glossary",sub:`Syllable Budget: ±${i.isochronousDurationDriftPct}% Drift`,desc:"Prevents +32.5% Spanish/German chipmunk speedup",w:192,color:"#a855f7"},{title:"3. Azure Speech / CosyVoice",sub:"Zero-Shot Speaker Emotion Clone",desc:"Matches original speaker timbre & SSML pauses",w:188,color:"#f59e0b"},{title:"4. Selective MuseTalk + R128",sub:`$${i.hybridCostPerMinUsd.toFixed(2)}/min (-${t.costReductionPct}%)`,desc:"Lip-syncs only face shots & sidechain-ducks BGM",w:184,color:"#10b981"}];let r=22;d.forEach(o=>{e.fillStyle=n?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=n?o.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(r,42,o.w,112,10),e.fill(),e.stroke(),e.fillStyle=n?o.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(o.title,r+10,68),e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(o.sub,r+10,92),e.fillStyle="#94a3b8",e.font="10px Inter, system-ui, sans-serif",e.fillText(o.desc,r+10,116),r+=o.w+9}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Timeline Synchronization: Literal Translation Overflow (+32.5% Drift) vs Isochronous Syllable Lock (±2.8%)",22,188);const f=[{label:"Source Video Shot Window (0.00s → 4.20s Hard Scene Cut) + Separated BGM/Foley Track",metric:"Target Slot = 4.20s Exact",wBar:460,color:"#38bdf8"},{label:"✕ Naive Literal Translation (ES/DE +32.5% Syllable Overflow → 5.56s or 1.35× Chipmunk Speedup)",metric:`+${i.naiveDurationDriftPct}% Desync & Muted BGM`,wBar:620,color:"#ef4444"},{label:"✓ Isochronous LLM + SSML Prosody + Selective MuseTalk Face ROI + Sidechain BGM Ducking",metric:`4.18s (±${i.isochronousDurationDriftPct}%) · $${i.hybridCostPerMinUsd.toFixed(2)}/min`,wBar:458,color:"#10b981"}];let l=204;f.forEach(o=>{e.fillStyle="#0f172a",e.strokeStyle=n?o.color:"#ef4444",e.lineWidth=1.6,e.beginPath(),e.roundRect(22,l,776,44,8),e.fill(),e.stroke(),e.fillStyle="rgba(56, 189, 248, 0.12)",e.fillRect(28,l+6,o.wBar,32),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(o.label,36,l+26),e.fillStyle=o.color,e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(o.metric,618,l+26),l+=52}),e.fillStyle=n?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(n?`✓ Broadcast Dubbing Pipeline Locked: $${i.hybridCostPerMinUsd.toFixed(2)}/min (-${t.costReductionPct}%) · ${i.bgmFoleyPreservationSnrDb}dB BGM Preserved · +$${(i.annualLocalizationSavingsUsd/1e6).toFixed(2)}M/yr Saved`:`✕ Black-Box SaaS Costs $${i.saasCostPerMinUsd.toFixed(2)}/min, Destroys Background Music, and Suffers +${i.naiveDurationDriftPct}% Syllable Overflow!`,22,382)}S();
