import"./modulepreload-polyfill-B5Qt9EMX.js";const b={"rpg-npc-12lang-dialogue-cutscene":{id:"rpg-npc-12lang-dialogue-cutscene",title:"AAA RPG 12-Language NPC Cutscene Pipeline (UE5 MetaHuman 52 ARKit Blendshapes)",titleZh:"3A 游戏 12国语言 NPC 剧情过场管线（UE5 MetaHuman 52通道 ARKit 面捕骨骼）",targetRig:"UE5 MetaHuman 52-Channel ARKit LiveLink JSON / FBX",bilabialPhonemesPerMin:142,languageCount:12},"cinematic-hero-closeup-monologue":{id:"cinematic-hero-closeup-monologue",title:"CG Film Hero Extreme Close-Up Emotional Monologue (Micro-Saccade + Brow Asymmetry)",titleZh:"CG 动画主角面部特写情绪独白（眉眼非对称微表情 + 眼球微扫视耦合）",targetRig:"Maya / Blender FACS 52-Shape + Dual-Eye Saccade Rig",bilabialPhonemesPerMin:118,languageCount:4},"2d-concept-mascot-liveportrait-pitch":{id:"2d-concept-mascot-liveportrait-pitch",title:"2D Concept Art & Stylized Brand Mascot Previs (Implicit Keypoint Stitching)",titleZh:"2D 游戏原画立绘与品牌 IP 吉祥物动态分镜预演（LivePortrait 隐式关键点驱动）",targetRig:"LivePortrait 2D Implicit Keypoint + Stitching Grid",bilabialPhonemesPerMin:134,languageCount:6}};function h(a,e,l){const t=Math.max(0,(8-Math.abs(l-4.5))*.05);return e==="split-band-audio-lower28-video-upper24-arkit"?{scenarioId:a,solverMode:e,bilabialClosureAccuracyPct:99.6,upperFaceEmotionFidelityPct:Number(Math.min(99.4,98.9+t).toFixed(1)),curveJitterRmsDeg:.08,payloadKbPerMin:24,costPerLineUsd:.008,annualSavingsUsdM:3.15,verdict:"Act automatically"}:e==="pure-audio2face-only-unimodal"?{scenarioId:a,solverMode:e,bilabialClosureAccuracyPct:98.4,upperFaceEmotionFidelityPct:53.8,curveJitterRmsDeg:.14,payloadKbPerMin:24,costPerLineUsd:.005,annualSavingsUsdM:.85,verdict:"Confirm"}:{scenarioId:a,solverMode:e,bilabialClosureAccuracyPct:71.6,upperFaceEmotionFidelityPct:86.2,curveJitterRmsDeg:2.84,payloadKbPerMin:68,costPerLineUsd:.012,annualSavingsUsdM:.22,verdict:"Send to a human"}}const S=document.querySelector("#app");if(!S)throw new Error("Missing #app root");let c="rpg-npc-12lang-dialogue-cutscene",r="split-band-audio-lower28-video-upper24-arkit",f=4.5;const M=[{name:"BrowInnerUp",val:.78},{name:"BrowDownLeft",val:.42},{name:"EyeSquintLeft",val:.64},{name:"EyeBlinkRight",val:.18},{name:"EyeLookOutLeft",val:.52},{name:"CheekSquintRight",val:.61}],E=[{name:"JawOpen",val:.72},{name:"MouthClose (P/B/M Lock)",val:.96},{name:"MouthFunnel",val:.68},{name:"MouthPucker",val:.54},{name:"MouthSmileLeft",val:.49},{name:"MouthRollLower",val:.63}];function k(a){const e=a.getContext("2d");if(!e)return;const l=a.width,t=a.height;e.clearRect(0,0,l,t);const P=b[c],m=h(c,r,f),n=r==="pure-audio2face-only-unimodal",o=r==="raw-monocular-mediapipe-unfiltered",g=e.createLinearGradient(0,0,0,t);g.addColorStop(0,"#070b14"),g.addColorStop(1,"#111827"),e.fillStyle=g,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,l-32,46),e.strokeStyle=r==="split-band-audio-lower28-video-upper24-arkit"?"#10b981":"#f59e0b",e.strokeRect(16,14,l-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`238th Workbench · Split-Band 52 ARKit Blendshape Solver · ${P.targetRig}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`P/B/M Bilabial Closure: ${m.bilabialClosureAccuracyPct}% | Upper-Face Emotion: ${m.upperFaceEmotionFidelityPct}% | Curve Jitter: ${m.curveJitterRmsDeg}° RMS`,28,51);const y=165;e.save(),e.strokeStyle=n?"#ef4444":"#38bdf8",e.fillStyle=n?"rgba(239, 68, 68, 0.1)":"rgba(56, 189, 248, 0.1)",e.lineWidth=2,e.beginPath(),e.roundRect(45,82,240,132,12),e.fill(),e.stroke(),e.fillStyle=n?"#fca5a5":"#38bdf8",e.font="bold 11px Inter, sans-serif",e.fillText(n?"UPPER 24 SHAPES: DEAD-EYE ZOMBIE!":"UPPER 24 SHAPES: VIDEO EMOTION LOCK",56,102),e.strokeStyle=n?"#f87171":"#34d399",e.lineWidth=2.5,e.beginPath(),e.moveTo(95,n?138:128),e.lineTo(145,136),e.moveTo(185,136),e.lineTo(235,n?138:126),e.stroke(),e.beginPath(),e.ellipse(120,162,20,10,0,0,Math.PI*2),e.ellipse(210,162,20,10,0,0,Math.PI*2),e.stroke(),e.strokeStyle=o?"#ef4444":"#10b981",e.fillStyle=o?"rgba(239, 68, 68, 0.1)":"rgba(16, 185, 129, 0.1)",e.beginPath(),e.roundRect(45,224,240,142,12),e.fill(),e.stroke(),e.fillStyle=o?"#fca5a5":"#34d399",e.fillText(o?"LOWER 28 SHAPES: 28.4% P/B/M MISS!":"LOWER 28 SHAPES: WAVLM PHONEME LOCK",56,244),e.strokeStyle=o?"#ef4444":"#10b981",e.lineWidth=3,e.beginPath(),e.ellipse(y,305,48,o?18:4,0,0,Math.PI*2),e.stroke(),e.fillStyle="#cbd5e1",e.font="10px JetBrains Mono, monospace",e.fillText(o?"Phoneme /m/: Lips Leaking Open":"Phoneme /m/: 100% Bilabial Contact",76,348),e.restore();const i=315;e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("Upper-Face 24 ARKit Channels (Monocular Video FLAME / LivePortrait Transfer)",i,96),M.forEach((p,d)=>{const s=110+d*21,u=n?.06:p.val;e.fillStyle="#1e293b",e.fillRect(i+150,s-10,250,12),e.fillStyle=n?"#ef4444":"#38bdf8",e.fillRect(i+150,s-10,Math.round(250*u),12),e.fillStyle="#cbd5e1",e.font="11px JetBrains Mono, monospace",e.fillText(p.name,i,s),e.fillText(u.toFixed(2),i+410,s)}),e.fillStyle="#34d399",e.font="bold 12px Inter, sans-serif",e.fillText("Lower-Face 28 ARKit Channels (12-Lang WavLM / Audio2Face Viseme Solver)",i,250),E.forEach((p,d)=>{const s=266+d*21,u=o&&d===1?.58:p.val;e.fillStyle="#1e293b",e.fillRect(i+150,s-10,250,12),e.fillStyle=o&&d===1?"#ef4444":"#10b981",e.fillRect(i+150,s-10,Math.round(250*u),12),e.fillStyle="#cbd5e1",e.font="11px JetBrains Mono, monospace",e.fillText(p.name,i,s),e.fillText(u.toFixed(2),i+410,s)})}function v(){const a=b[c],e=h(c,r,f);S.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">238th Interactive Architecture Workbench · Domain 4 (Game/Film Facial Mocap & Previs)</span>
        <h1>游戏与影视 3D 角色面部捕捉（52 ARKit Blendshapes + Audio2Face + LivePortrait）选型工作台</h1>
        <p class="subtitle">上下半脸分频解耦架构（下半脸 28 通道多语种音频双唇闭锁 + 上半脸 24 通道单目视频微表情与眼动迁移）vs 纯 Audio2Face“死鱼眼僵尸脸”</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.bilabialClosureAccuracyPct}% P/B/M Lock</span>
        <span class="metric-pill">${e.upperFaceEmotionFidelityPct}% Upper Emotion</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 影视/游戏面捕场景 (Production Scenario)</label>
        <select id="scenario-select">
          ${Object.values(b).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="solver-select">2. 面部骨骼解算架构 (Facial Solver Architecture)</label>
        <select id="solver-select">
          <option value="split-band-audio-lower28-video-upper24-arkit" ${r==="split-band-audio-lower28-video-upper24-arkit"?"selected":""}>✅ 上下半脸分频解耦：音频下脸28通道 + 视频上脸24通道 + 1-Euro滤波 (推荐)</option>
          <option value="pure-audio2face-only-unimodal" ${r==="pure-audio2face-only-unimodal"?"selected":""}>⚠️ 纯语音驱动 (Pure Audio2Face)：下半脸准但上半脸眉眼呆滞 (53.8%)</option>
          <option value="raw-monocular-mediapipe-unfiltered" ${r==="raw-monocular-mediapipe-unfiltered"?"selected":""}>⛔ 单目摄像头裸 MediaPipe 追踪：30fps 漏捕 P/B/M 爆破音闭唇 (71.6%)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="cutoff-slider">3. 1-Euro 骨骼曲线截止频率 (Filter Cutoff: <strong>${f.toFixed(1)} Hz</strong>)</label>
        <input id="cutoff-slider" type="range" min="2.0" max="8.0" step="0.5" value="${f}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>52 通道 ARKit Blendshape 上下半脸分频权重与双唇闭合监控 (Split-Band FACS Rig)</h2>
          <span class="tag">${a.languageCount} Languages · ${a.bilabialPhonemesPerMin} Bilabials/min</span>
        </div>
        <canvas id="facial-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>面捕管线精度与多语种本地化 FinOps</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">P/B/M 双唇爆破音闭合率 (Bilabial Lock)</span>
            <strong class="kpi-value">${e.bilabialClosureAccuracyPct}%</strong>
            <span class="kpi-note">WavLM 音素强制约束 MouthClose vs 30fps 视频漏帧</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">上半脸眉眼情绪还原度 (Upper-Face FACS)</span>
            <strong class="kpi-value">${e.upperFaceEmotionFidelityPct}%</strong>
            <span class="kpi-note">24通道眉弓/眯眼/微扫视 vs 纯音频 53.8% 僵尸眼</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">骨骼曲线高频抖动 (Curve Jitter RMS)</span>
            <strong class="kpi-value">${e.curveJitterRmsDeg}°</strong>
            <span class="kpi-note">24 KB/min LiveLink JSON 直通 UE5 MetaHuman</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单句台词成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerLineUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">免除 12 国配音演员重复佩戴头戴面捕盔重拍</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#facial-canvas");l&&k(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,v()}),document.querySelector("#solver-select")?.addEventListener("change",t=>{r=t.target.value,v()}),document.querySelector("#cutoff-slider")?.addEventListener("input",t=>{f=Number(t.target.value),v()})}v();
