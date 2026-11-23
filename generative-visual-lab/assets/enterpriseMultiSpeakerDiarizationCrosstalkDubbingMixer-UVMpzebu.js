import"./modulepreload-polyfill-B5Qt9EMX.js";const f={"fireside-chat-3speaker-crosstalk":{id:"fireside-chat-3speaker-crosstalk",title:"3-Speaker Customer Fireside Chat (18.4% Overlapping Crosstalk & Backchannel Laughter)",titleZh:"3人客户炉边谈话访谈（含 18.4% 抢话重叠、附和笑声与左右声道空间定位）",speakerCount:3,crosstalkOverlapPct:18.4,targetLanguages:16},"short-drama-heated-argument-duet":{id:"short-drama-heated-argument-duet",title:"Short-Drama Heated Dual-Character Argument (26.2% Simultaneous Shouting & Close-Up Cuts)",titleZh:"出海短剧双人激烈争吵对手戏（26.2% 双人同时开口抢白 + 正反打快速切镜）",speakerCount:2,crosstalkOverlapPct:26.2,targetLanguages:12},"executive-roundtable-5speaker-panel":{id:"executive-roundtable-5speaker-panel",title:"5-Executive Global Summit Roundtable (Multi-Accent Turn-Taking & Stereo Azimuth Pan)",titleZh:"5人全球峰会高管圆桌论坛（多口音高频轮流发言 + 屏幕坐标立体声声像跟随）",speakerCount:5,crosstalkOverlapPct:14.8,targetLanguages:20}};function h(l,e,s){const a=Math.max(0,(s-12)*.05);return e==="audiovisual-sepformer-bbox-isolated-musetalk"?{scenarioId:l,mixerMode:e,speakerAttributionAccuracyPct:Number(Math.min(99.8,99.5+a).toFixed(1)),crossFaceLipBleedPct:0,separatedStemSdrDb:s,costPerMinuteUsd:.14,annualSavingsUsdM:2.38,verdict:"Act automatically"}:e==="audio-only-pyannote-without-visual-lip"?{scenarioId:l,mixerMode:e,speakerAttributionAccuracyPct:86.4,crossFaceLipBleedPct:8.5,separatedStemSdrDb:10.2,costPerMinuteUsd:.11,annualSavingsUsdM:.92,verdict:"Confirm"}:{scenarioId:l,mixerMode:e,speakerAttributionAccuracyPct:65.4,crossFaceLipBleedPct:28.2,separatedStemSdrDb:3.4,costPerMinuteUsd:2.85,annualSavingsUsdM:.14,verdict:"Send to a human"}}const y=document.querySelector("#app");if(!y)throw new Error("Missing #app root");let o="fireside-chat-3speaker-crosstalk",i="audiovisual-sepformer-bbox-isolated-musetalk",c=14.8;function M(l){const e=l.getContext("2d");if(!e)return;const s=l.width,a=l.height;e.clearRect(0,0,s,a);const u=f[o],k=h(o,i,c),n=i==="single-stream-asr-merged-tts-dubbing",g=e.createLinearGradient(0,0,s,a);g.addColorStop(0,"#070b14"),g.addColorStop(1,"#111827"),e.fillStyle=g,e.fillRect(0,0,s,a),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,s-32,46),e.strokeStyle=i==="audiovisual-sepformer-bbox-isolated-musetalk"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`247th Workbench · Audio-Visual Crosstalk Separator (${u.speakerCount} Speakers · ${u.crosstalkOverlapPct}% Overlap)`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Speaker Attribution: ${k.speakerAttributionAccuracyPct}% | Cross-Face Lip Bleed: ${k.crossFaceLipBleedPct}% | Stem SDR: ${k.separatedStemSdrDb.toFixed(1)} dB`,28,51);const d=76,x=142,p=u.speakerCount,v=(s-64)/p;for(let t=0;t<p;t++){const r=32+t*v+8,m=v-16,A=p>1?(t/(p-1)*2-1).toFixed(2):"0.00";e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=n?"#ef4444":t%2===0?"#38bdf8":"#34d399",e.lineWidth=2,e.beginPath(),e.roundRect(r,d,m,x,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(`Speaker #${t+1} ROI (Pan ${A})`,r+12,d+24),e.fillStyle=n?"#fca5a5":"#6ee7b7",e.font="10px JetBrains Mono, monospace",e.fillText(n?"✕ Voice Swapped & Dual-Lip Move!":`✓ Isolated Stem_${t+1} -> BBox MuseTalk`,r+12,d+52),e.fillStyle="#94a3b8",e.font="10px Inter, sans-serif",e.fillText(n?"Merged Mono Track Bleed":`TalkNet Active-Lip Anchor (${c}dB)`,r+12,d+78),e.fillStyle=n?"rgba(239, 68, 68, 0.35)":"rgba(16, 185, 129, 0.3)",e.fillRect(r+12,d+96,m-24,28)}const S=236,$=136;e.fillStyle="rgba(9, 13, 22, 0.92)",e.strokeStyle="#1e293b",e.beginPath(),e.roundRect(32,S,s-64,$,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("Per-Speaker Separated Dubbing Stems & Overlapping Crosstalk Resolution Timeline",48,S+24);for(let t=0;t<Math.min(3,p);t++){const r=S+42+t*28;e.fillStyle="#1e293b",e.fillRect(48,r,s-96,20),e.fillStyle=n?"#ef4444":t===0?"#38bdf8":t===1?"#10b981":"#a855f7",e.fillRect(120+t*95,r+2,240,16),e.fillStyle="#f8fafc",e.font="bold 10px JetBrains Mono, monospace",e.fillText(n?`Stem_${t+1}: MERGED CROSSTALK GARBLE`:`Stem_${t+1} (${u.targetLanguages}-Lang TTS + RIR Pan)`,56,r+14)}}function b(){const l=f[o],e=h(o,i,c);y.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">247th Interactive Architecture Workbench · Domain 3 (Multi-Speaker Crosstalk Dubbing Mixer)</span>
        <h1>企业多人对谈与短剧抢话重叠（Overlapping Crosstalk）音视联合分离与分轨译制工作台</h1>
        <p class="subtitle">TalkNet 视觉唇动锚定 + MossFormer2/SepFormer 抢话语音分离 (14.8dB SDR) + 人脸框独立绑定 MuseTalk + 屏幕方位立体声声像 vs 单轨混跑男女串音与双人同动嘴</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.speakerAttributionAccuracyPct}% Attribution</span>
        <span class="metric-pill">${e.crossFaceLipBleedPct}% Lip Bleed</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 多人抢话与圆桌场景 (Multi-Speaker Scenario)</label>
        <select id="scenario-select">
          ${Object.values(f).map(a=>`<option value="${a.id}" ${a.id===o?"selected":""}>${a.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 多人分离与改口型架构 (Diarization & Dubbing Architecture)</label>
        <select id="mode-select">
          <option value="audiovisual-sepformer-bbox-isolated-musetalk" ${i==="audiovisual-sepformer-bbox-isolated-musetalk"?"selected":""}>✅ 音视联合抢话分离 (TalkNet+SepFormer) + 分轨 TTS + 人脸框独立改口型 (推荐)</option>
          <option value="single-stream-asr-merged-tts-dubbing" ${i==="single-stream-asr-merged-tts-dubbing"?"selected":""}>⛔ 单轨 Whisper 直转单轨 TTS (抢话段 34.6% 男女串音 & 画面两人同时张嘴)</option>
          <option value="audio-only-pyannote-without-visual-lip" ${i==="audio-only-pyannote-without-visual-lip"?"selected":""}>⚠️ 纯音频聚类声纹切分无视觉唇动锚定 (同性别嘉宾抢话 13.6% 绑错脸)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="sdr-slider">3. 目标说话人分离信噪比 (Target Stem SDR: <strong>${c.toFixed(1)} dB</strong>)</label>
        <input id="sdr-slider" type="range" min="10.0" max="18.0" step="0.8" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>多人人脸 ROI 空间锚定与重叠抢话（Crosstalk）独立干声分轨时间轴 (Multi-Stem Mixer Stage)</h2>
          <span class="tag">${l.speakerCount} Speakers · ${l.crosstalkOverlapPct}% Overlap</span>
        </div>
        <canvas id="diarization-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>多人译制分离度与唇形隔离遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">抢话段说话人归属准确率</span>
            <strong class="kpi-value">${e.speakerAttributionAccuracyPct}%</strong>
            <span class="kpi-note">视觉唇动引导目标人声提取 vs 65.4% 男女串音</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">非说话人误张嘴串染率 (Lip Bleed)</span>
            <strong class="kpi-value">${e.crossFaceLipBleedPct}%</strong>
            <span class="kpi-note">独立音轨严格绑定各自人脸框 (0.0% 串嘴)</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">重叠人声分离度 (Separated SDR)</span>
            <strong class="kpi-value">${e.separatedStemSdrDb.toFixed(1)} dB</strong>
            <span class="kpi-note">保留各自独立笑声与插话干声用于音色克隆</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">每分钟多语种译制成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerMinuteUsd.toFixed(2)}/m · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">替代昂贵的多配音演员进棚分轨重录</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#diarization-canvas");s&&M(s),document.querySelector("#scenario-select")?.addEventListener("change",a=>{o=a.target.value,b()}),document.querySelector("#mode-select")?.addEventListener("change",a=>{i=a.target.value,b()}),document.querySelector("#sdr-slider")?.addEventListener("input",a=>{c=Number(a.target.value),b()})}b();
