import"./modulepreload-polyfill-B5Qt9EMX.js";const v={"social-youtube-tiktok-14lufs":{id:"social-youtube-tiktok-14lufs",title:"Social & Digital Ad Master: YouTube / TikTok / LinkedIn (-14.0 LUFS · -1.0 dBTP Ceiling)",titleZh:"社交媒体与信息流广告母带：YouTube / 抖音 / TikTok (-14.0 LUFS · -1.0 dBTP 真峰值上限)",targetLufs:-14,truePeakCeilingDbtp:-1,standardCode:"ITU-R BS.1770-4 Web (-14 LUFS)"},"broadcast-ebu-r128-23lufs":{id:"broadcast-ebu-r128-23lufs",title:"Broadcast TV Commercial Master: EBU R128 / ATSC A/85 (-23.0 LUFS · -2.0 dBTP Ceiling)",titleZh:"广电上星与 OTT 电视广告母带：EBU R128 / ATSC A/85 (-23.0 LUFS · -2.0 dBTP 严苛送播锁)",targetLufs:-23,truePeakCeilingDbtp:-2,standardCode:"EBU R128 / ATSC A/85 (-23 LUFS)"},"podcast-cinema-dolby-16lufs":{id:"podcast-cinema-dolby-16lufs",title:"Enterprise Keynote, Apple Podcast & In-Store Retail Loop (-16.0 LUFS · -1.5 dBTP Ceiling)",titleZh:"企业高管播客、发布会回放与门店大屏母带 (-16.0 LUFS · -1.5 dBTP 防破音锁)",targetLufs:-16,truePeakCeilingDbtp:-1.5,standardCode:"AES TD1004 (-16 LUFS)"}};function T(a,e,s){const t=Math.max(0,(4-Math.abs(s-6.5))*.05);return e==="midside-spectral-ducking-itu1770-4x-tp"?{targetId:a,masteringMode:e,measuredLufsErrorLu:.04,speechIntelligibilityStiPct:Number(Math.min(99.7,99.4+t).toFixed(1)),truePeakClippingRatePct:0,costPerMasterUsd:.002,annualSavingsUsdM:1.82,verdict:"Act automatically"}:e==="broadband-volume-pumping-compressor"?{targetId:a,masteringMode:e,measuredLufsErrorLu:1.15,speechIntelligibilityStiPct:88.2,truePeakClippingRatePct:4.2,costPerMasterUsd:.002,annualSavingsUsdM:.45,verdict:"Confirm"}:{targetId:a,masteringMode:e,measuredLufsErrorLu:4.85,speechIntelligibilityStiPct:63.2,truePeakClippingRatePct:31.4,costPerMasterUsd:.001,annualSavingsUsdM:.05,verdict:"Send to a human"}}const L=document.querySelector("#app");if(!L)throw new Error("Missing #app root");let u="social-youtube-tiktok-14lufs",r="midside-spectral-ducking-itu1770-4x-tp",d=6.5;function P(a){const e=a.getContext("2d");if(!e)return;const s=a.width,t=a.height;e.clearRect(0,0,s,t);const n=v[u],k=T(u,r,d),i=r==="fixed-gain-sum-without-ducking",b=e.createLinearGradient(0,0,s,t);b.addColorStop(0,"#070b14"),b.addColorStop(1,"#111827"),e.fillStyle=b,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,s-32,46),e.strokeStyle=r==="midside-spectral-ducking-itu1770-4x-tp"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`252nd Workbench · Mid-Side 300Hz–3.5kHz Dynamic EQ Pocket (-${d.toFixed(1)}dB) + ${n.standardCode}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Loudness Precision: ±${k.measuredLufsErrorLu} LU | Speech Intelligibility STI: ${k.speechIntelligibilityStiPct}% | True-Peak Clipping: ${k.truePeakClippingRatePct}%`,28,51);const f=26,o=80;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(f,o,344,288,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("1. Mid-Channel 300Hz–3.5kHz Vocal Carve Spectrum",f+16,o+26),[{freq:"60Hz Bass",ducked:!1,h:150},{freq:"200Hz Warm",ducked:!1,h:140},{freq:"800Hz Vocal",ducked:!0,h:i?175:88},{freq:"2.4kHz Formant",ducked:!0,h:i?182:76},{freq:"10kHz Stereo Air",ducked:!1,h:138}].forEach((l,S)=>{const c=f+24+S*62,m=o+248;e.fillStyle=l.ducked?i?"#ef4444":"#10b981":"#38bdf8",e.beginPath(),e.roundRect(c,m-l.h,44,l.h,6),e.fill(),e.fillStyle="#cbd5e1",e.font="9px JetBrains Mono, monospace",e.fillText(l.freq,c-4,m+18)}),e.fillStyle=i?"#fca5a5":"#6ee7b7",e.font="bold 11px Inter, sans-serif",e.fillText(i?"⛔ Un-Ducked BGM Masks 36.8% of TTS Consonants!":`✓ Mid-Channel Carved -${d.toFixed(1)}dB (Stereo Bass Intact)`,f+18,o+52),e.restore();const p=390,h=344;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=i?"#ef4444":"#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(p,o,h,288,12),e.fill(),e.stroke(),e.fillStyle=i?"#f87171":"#34d399",e.font="bold 12px Inter, sans-serif",e.fillText(i?"⛔ Un-Normalized Mix: +2.4 dBTP Inter-Sample Clipping!":`✅ ${n.standardCode} & 4× Oversampled True-Peak Lock`,p+16,o+26),[{label:`Integrated Loudness (Target ${n.targetLufs.toFixed(1)} LUFS)`,val:i?`${(n.targetLufs+4.8).toFixed(1)} LUFS (REJECTED!)`:`${n.targetLufs.toFixed(1)} ±0.04 LUFS`,ok:!i},{label:`4× Oversampled True Peak (Ceiling ${n.truePeakCeilingDbtp.toFixed(1)} dBTP)`,val:i?"+2.4 dBTP (AAC CRACKLE!)":`${n.truePeakCeilingDbtp.toFixed(1)} dBTP (0.0% Clip)`,ok:!i},{label:"Multi-Platform Simultaneous Stems",val:"Social (-14) + TV (-23) + Podcast (-16) in 0.8s",ok:!0}].forEach((l,S)=>{const c=o+52+S*72;e.fillStyle="#090d16",e.strokeStyle=l.ok?"#1e293b":"#ef4444",e.beginPath(),e.roundRect(p+16,c,h-32,58,8),e.fill(),e.stroke(),e.fillStyle="#94a3b8",e.font="10px Inter, sans-serif",e.fillText(l.label,p+28,c+22),e.fillStyle=l.ok?"#34d399":"#fca5a5",e.font="bold 12px JetBrains Mono, monospace",e.fillText(l.val,p+28,c+44)}),e.restore()}function g(){const a=v[u],e=T(u,r,d);L.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">252nd Interactive Architecture Workbench · Domain 3 (Broadcast Loudness & Multi-Stem Audio Mastering)</span>
        <h1>企业营销视频与广电母带响度（-14 / -23 LUFS）、中侧频谱闪避与防破音母带工作台</h1>
        <p class="subtitle">Mid-Side 300Hz–3.5kHz 人声共振峰动态挖槽闪避 (99.6% 清晰度) + ITU-R BS.1770-4 多平台响度锁 (±0.04 LU) + 4倍过采样真峰值限幅 vs 固定音量混音吞字破音</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">±${e.measuredLufsErrorLu} LU Lock</span>
        <span class="metric-pill">${e.speechIntelligibilityStiPct}% Speech STI</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="target-select">1. 目标播出平台响度标准 (Loudness Standard)</label>
        <select id="target-select">
          ${Object.values(v).map(t=>`<option value="${t.id}" ${t.id===u?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 分轨混音与响度母带架构 (Mastering Architecture)</label>
        <select id="mode-select">
          <option value="midside-spectral-ducking-itu1770-4x-tp" ${r==="midside-spectral-ducking-itu1770-4x-tp"?"selected":""}>✅ Mid-Side 人声频段动态挖槽 + BS.1770 双遍响度锁 + 4×真峰值限幅 (推荐)</option>
          <option value="fixed-gain-sum-without-ducking" ${r==="fixed-gain-sum-without-ducking"?"selected":""}>⛔ 固定分贝直接相加无闪避 (BGM 高潮淹没 36.8% 配音辅音 & +2.4dBTP 破音)</option>
          <option value="broadband-volume-pumping-compressor" ${r==="broadband-volume-pumping-compressor"?"selected":""}>⚠️ 传统全频段粗暴压限闪避 (人一说话背景音乐低音鼓就忽大忽小喘息抽吸)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="carve-slider">3. 人声中频凹槽闪避深度 (Vocal Formant Carve: <strong>-${d.toFixed(1)} dB</strong>)</label>
        <input id="carve-slider" type="range" min="3.5" max="9.5" step="1.0" value="${d}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>Mid-Side 频谱选择性闪避与 ITU-R BS.1770-4 响度/真峰值合规监控 (Spectral Ducking & LUFS Stage)</h2>
          <span class="tag">${a.standardCode} · ${a.truePeakCeilingDbtp.toFixed(1)} dBTP</span>
        </div>
        <canvas id="lufs-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>广电与流媒体送播音频合规遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">积分响度达标精度 (LUFS Error)</span>
            <strong class="kpi-value">±${e.measuredLufsErrorLu} LU</strong>
            <span class="kpi-note">严守电视台 EBU R128 与抖音/YouTube 标准</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">配音清晰度传输指数 (Speech STI)</span>
            <strong class="kpi-value">${e.speechIntelligibilityStiPct}%</strong>
            <span class="kpi-note">仅挖空 Mid 声道 300Hz-3.5kHz，保留立体声低音</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">AAC 转码采样间破音率 (True-Peak Clip)</span>
            <strong class="kpi-value">${e.truePeakClippingRatePct}%</strong>
            <span class="kpi-note">4倍过采样真峰值限幅消除齿音爆音</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单支视频母带成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerMasterUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">0.8秒同步导出社交/广电/播客三套合规音频母带</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#lufs-canvas");s&&P(s),document.querySelector("#target-select")?.addEventListener("change",t=>{u=t.target.value,g()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{r=t.target.value,g()}),document.querySelector("#carve-slider")?.addEventListener("input",t=>{d=Number(t.target.value),g()})}g();
