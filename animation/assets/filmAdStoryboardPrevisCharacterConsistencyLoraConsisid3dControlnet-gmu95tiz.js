import"./modulepreload-polyfill-B5Qt9EMX.js";const d={"tvc-24shot-brand-ambassador-commercial":{id:"tvc-24shot-brand-ambassador-commercial",titleZh:"24镜品牌 TVC 广告动态分镜预演（3D 粗模锁焦段机位 + 主角三视图 LoRA + ConsisID 视频身份锁 · 98.4% 一致性）",titleEn:"24-Shot Brand TVC Animatic Previs (3D Blockout Camera Lock + Turnaround LoRA + ConsisID · 98.4% ID)",totalShotsCount:24,naiveCrossShotIdentityPct:51.4,controlledCrossShotIdentityPct:98.4,naiveCameraFramingPassPct:44,controlledCameraFramingPassPct:99.2,manualStoryboardDays:10,hybridPrevisHours:1.5,annualStudioSavingsUsd:168e4},"game-cutscene-48shot-dual-character-action":{id:"game-cutscene-48shot-dual-character-action",titleZh:"48镜游戏过场双角色同框交互（OpenPose 双人分区掩码 Regional Attention 防串脸 + Wan2.1-VACE 镜头桥接）",titleEn:"48-Shot Dual-Character Game Cutscene Previs (Regional Mask Attention Anti-Bleed + Wan2.1-VACE)",totalShotsCount:48,naiveCrossShotIdentityPct:42.8,controlledCrossShotIdentityPct:97.6,naiveCameraFramingPassPct:38.5,controlledCameraFramingPassPct:98.8,manualStoryboardDays:18,hybridPrevisHours:2.8,annualStudioSavingsUsd:245e4},"animated-short-60shot-episodic-drama":{id:"animated-short-60shot-episodic-drama",titleZh:"60镜 AI 漫剧/品牌微电影连续生产（角色/服装/道具三解耦 LoRA 库 + 共享 3D 场景白模光影锁）",titleEn:"60-Shot Episodic AI Short Drama (Decoupled Character/Outfit/Prop LoRA Bank + 3D Scene Blockout)",totalShotsCount:60,naiveCrossShotIdentityPct:46.2,controlledCrossShotIdentityPct:98.1,naiveCameraFramingPassPct:41.2,controlledCameraFramingPassPct:99,manualStoryboardDays:21,hybridPrevisHours:3.2,annualStudioSavingsUsd:312e4}};function v(e,s){const t=d[e],i=s==="threejs-blockout-depth-lora-consisid-pipeline",r=i?t.controlledCrossShotIdentityPct:t.naiveCrossShotIdentityPct,a=i?t.controlledCameraFramingPassPct:t.naiveCameraFramingPassPct,o=i?t.hybridPrevisHours:t.manualStoryboardDays*24;return{preset:t,stack:s,effectiveIdentityPct:r,effectiveFramingPassPct:a,effectiveTurnaroundHours:o,identityLockPass:r>=97,directorCameraPass:a>=98,verdictBadge:i?`3D BLOCKOUT + LORA + CONSISID LOCKED (${r.toFixed(1)}% Cross-Shot ID · ${a.toFixed(1)}% Camera Lock · ${t.hybridPrevisHours}h)`:`CROSS-SHOT IDENTITY DRIFT (${t.naiveCrossShotIdentityPct}% ID) & ${100-t.naiveCameraFramingPassPct}% CAMERA FRAMING MISMATCH!`}}const C=document.querySelector("#app");let u="tvc-24shot-brand-ambassador-commercial",h="threejs-blockout-depth-lora-consisid-pipeline";function p(){const e=v(u,h),s=e.preset,t=h==="threejs-blockout-depth-lora-consisid-pipeline";C.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 409 · 198th Interactive Workbench · Domain 4 (3D Blockout ControlNet + Character LoRA + ConsisID / Phantom / Wan-VACE Previs Studio)</span>
        <h1>影视广告与游戏分镜预演 (Previs) 角色一致性选型工作台：角色 LoRA + ConsisID/Phantom + 3D 粗模 ControlNet vs 纯提示词</h1>
        <p class="wb-subtitle">解决影视广告导演、游戏美术团队与 AI 短剧工作室在制作 ${s.totalShotsCount} 个连续镜头故事板预演（Animatic Previs）时的头号顽疾：① 纯提示词或单张参考图在不同机位角度（特写/侧颜/俯拍）下人物五官与服装剧烈漂移（跨镜头一致性仅 ${s.naiveCrossShotIdentityPct}%）；② 双人同框镜头出现“角色 A 和 B 的脸与衣服互相串色融合”；③ 文字描述无法精确控制 24mm/50mm/85mm 摄影机焦段与轴线关系（机位合格率仅 ${s.naiveCameraFramingPassPct}%）。通过“<strong>3D 白模摆机位导出 Depth/OpenPose + 三视图角色解耦 LoRA + 区域掩码注意力 (Regional Attention) + ConsisID / Wan2.1-VACE 视频身份锚定</strong>”，实现 ${s.controlledCrossShotIdentityPct}% 跨镜一致性，将 ${s.manualStoryboardDays} 天手绘分镜压缩至 ${s.hybridPrevisHours} 小时（年省 +$${(s.annualStudioSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${t?"pass":"fail"}" id="verdict-pill">${e.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Storyboard Previs Preset and Consistency Stack Controls">
      <div class="control-group">
        <span class="control-label">1. 选择连续分镜预演业务场景与镜头数 (Multi-Shot Storyboard Previs Scenario):</span>
        <div class="btn-row">
          ${Object.keys(d).map(i=>`
            <button type="button" class="scenario-btn ${u===i?"active":""}" data-scenario="${i}">
              ${d[i].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换跨镜头角色一致性与机位控制架构 (Character & Camera Control Stack):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${t?"":"active danger"}" data-mode="prompt-only-or-single-ref-uncontrolled">
            ❌ 方案 A：纯自然语言提示词 / 无分区单图垫图 (跨镜一致性仅 ${s.naiveCrossShotIdentityPct}% · 双人串脸 · 机位合格率 ${s.naiveCameraFramingPassPct}%)
          </button>
          <button type="button" class="mode-btn ${t?"active success":""}" data-mode="threejs-blockout-depth-lora-consisid-pipeline">
            ✅ 方案 B：3D 粗模 Depth/Pose 锁机位 + 三视图 LoRA + 分区掩码 + ConsisID/VACE (${s.controlledCrossShotIdentityPct}% 一致性 · ${s.hybridPrevisHours}h)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Storyboard Previs Consistency KPIs">
      <div class="kpi-card">
        <span class="kpi-title">跨 ${s.totalShotsCount} 镜角色五官与服装一致性 (Cross-Shot Identity)</span>
        <strong class="kpi-value ${e.identityLockPass?"good":"bad"}" id="kpi-identity">${e.effectiveIdentityPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${t?"正/侧/背三视图 LoRA + ConsisID 频域身份锚定":"侧面与大仰角镜头下主角五官和领口完全变成另一个人"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">导演指定景别、焦段与越轴规则合格率 (Camera Framing Pass)</span>
        <strong class="kpi-value ${e.directorCameraPass?"good":"bad"}" id="kpi-camera">${e.effectiveFramingPassPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${t?"Three.js/Blender 5分钟搭白模直出精确 Depth + OpenPose":'文字提示词 "over-the-shoulder 85mm" 经常被扩散模型忽略'}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">整部动态故事板 (Animatic) 交付周期 (Previs Turnaround)</span>
        <strong class="kpi-value ${t?"good":"bad"}" id="kpi-turnaround">${t?`${s.hybridPrevisHours} hrs`:`${s.manualStoryboardDays} days`}</strong>
        <span class="kpi-sub">从剧本到可播放有声动态分镜预演成片</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">制片厂/美术中心年化净省预算 (Annual Studio ROI)</span>
        <strong class="kpi-value ${t?"good":"bad"}" id="kpi-roi">+$${(s.annualStudioSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">减少实拍现场无效搭景与分镜反复重画返工</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>四阶可控影视分镜预演管线 (3D 白模机位 → 角色三视图 LoRA + Regional Mask → ConsisID/VACE 动态化) 画布</h2>
          <span class="tag">${s.totalShotsCount} Shots · ${s.controlledCrossShotIdentityPct}% Identity · ${s.hybridPrevisHours}h Previs</span>
        </div>
        <canvas id="previs-consistency-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>跨镜头角色一致性与机位控制技术选型明细 (Previs Stack Audit)</h2>
        <ul class="audit-list">
          <li><span>1. 零样本 StoryDiffusion / IP-Adapter:</span> <strong>适合前期 5 分钟头脑风暴概念草图；超过 10 个大角度镜头易丢失侧颜特征</strong></li>
          <li><span>2. 正/侧/背三视图角色解耦 LoRA:</span> <strong>先生成标准 T-Pose 三视图与表情表，微调 Rank-32 LoRA (锁死 98.4% 全角度身份)</strong></li>
          <li><span>3. 双角色同框防串脸 (Regional Attention):</span> <strong>按左/右人物 OpenPose 掩码分区绑定各自 LoRA 与提示词，100% 杜绝双人服装/五官融合</strong></li>
          <li><span>4. 3D 粗模机位控制 (3D Blockout → ControlNet):</span> <strong>在 Three.js/Blender 用胶囊人偶摆好 180° 轴线与焦段，导出 Depth + Pose 锁死构图</strong></li>
          <li><span>5. 静态分镜转动态视频 (ConsisID / Wan-VACE):</span> <strong>以分镜关键帧为首尾锚点 (FLF2V) 并注入人脸频域特征，视频运动中零变脸</strong></li>
          <li><span>${s.totalShotsCount} 镜动态预演交付速度对比:</span> <strong>人工手绘 ${s.manualStoryboardDays} 天 → 受控 AI 管线 ${s.hybridPrevisHours} 小时</strong></li>
          <li><span>影视与游戏美术团队年化净省:</span> <strong>+$${s.annualStudioSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,y(),b(e)}function y(){document.querySelectorAll(".scenario-btn").forEach(e=>{e.addEventListener("click",()=>{u=e.dataset.scenario,p()})}),document.querySelectorAll(".mode-btn").forEach(e=>{e.addEventListener("click",()=>{h=e.dataset.mode,p()})})}function b(e){const s=document.querySelector("#previs-consistency-canvas");if(!s)return;const t=s.getContext("2d"),i=s.width,r=s.height,a=e.preset,o=e.stack==="threejs-blockout-depth-lora-consisid-pipeline";t.fillStyle="#070b14",t.fillRect(0,0,i,r),t.fillStyle="#e2e8f0",t.font="bold 13px Inter, system-ui, sans-serif",t.fillText("1. 4-Stage Controlled Storyboard & Previs Pipeline: From 3D Camera Blockout to ConsisID Video",22,26);const m=[{title:"1. Character Sheet & LoRA",sub:"Front/Side/Back + Expressions",desc:"Locks 360° facial & outfit identity (98.4%)",w:184,color:"#a855f7"},{title:"2. 3D Dummy Camera Blockout",sub:"Three.js / Blender → Depth+Pose",desc:"Enforces exact 24/50/85mm lens & 180° rule",w:192,color:"#38bdf8"},{title:"3. Regional Mask Attention",sub:"Isolated Per-Character LoRAs",desc:"Zero identity/outfit bleed in 2-character shots",w:188,color:"#f59e0b"},{title:"4. ConsisID / Wan-VACE I2V",sub:"Identity-Locked Animatic Video",desc:`Compiles ${a.totalShotsCount}-shot previs in ${a.hybridPrevisHours} hours`,w:184,color:"#10b981"}];let l=22;m.forEach(n=>{t.fillStyle=o?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",t.strokeStyle=o?n.color:"#ef4444",t.lineWidth=2,t.beginPath(),t.roundRect(l,42,n.w,112,10),t.fill(),t.stroke(),t.fillStyle=o?n.color:"#fca5a5",t.font="bold 11.5px Inter, system-ui, sans-serif",t.fillText(n.title,l+10,68),t.fillStyle="#f8fafc",t.font="bold 10.5px Inter, system-ui, sans-serif",t.fillText(n.sub,l+10,92),t.fillStyle="#94a3b8",t.font="10px Inter, system-ui, sans-serif",t.fillText(n.desc,l+10,116),l+=n.w+9}),t.fillStyle="#e2e8f0",t.font="bold 13px Inter, system-ui, sans-serif",t.fillText(`2. Multi-Shot Continuity Audit Across ${a.totalShotsCount} Shots (Wide Establishing → Over-the-Shoulder → Close-Up → Action)`,22,188);const S=[{shot:"Shot 01: 24mm Wide Establishing",status:o?"✓ ID: 98.8% · Lens Locked":"✕ Wrong Room Layout"},{shot:"Shot 08: 50mm Dual-Char OTS",status:o?"✓ Regional Mask: 0 Bleed":"✕ Char A & B Faces Merged!"},{shot:"Shot 15: 85mm Profile Close-Up",status:o?"✓ Side-View LoRA: 98.4%":"✕ Side Profile Drifted (48%)"},{shot:"Shot 24: Dynamic Tracking I2V",status:o?"✓ ConsisID Video Locked":"✕ Outfit Color Changed!"}];let c=22;S.forEach(n=>{t.fillStyle="#0f172a",t.strokeStyle=o?"#10b981":"#ef4444",t.lineWidth=1.8,t.beginPath(),t.roundRect(c,204,184,146,10),t.fill(),t.stroke(),t.fillStyle="#f8fafc",t.font="bold 11px Inter, system-ui, sans-serif",t.fillText(n.shot,c+12,234),t.fillStyle=o?"rgba(16, 185, 129, 0.16)":"rgba(239, 68, 68, 0.18)",t.fillRect(c+14,248,156,62),t.fillStyle=o?"#34d399":"#fca5a5",t.font="bold 10.5px Inter, system-ui, sans-serif",t.fillText(n.status,c+12,332),c+=194}),t.fillStyle=o?"#38bdf8":"#fca5a5",t.font="bold 12px Inter, system-ui, sans-serif",t.fillText(o?`✓ Production Previs Locked: ${a.controlledCrossShotIdentityPct}% Identity · ${a.controlledCameraFramingPassPct}% Camera Framing · +$${(a.annualStudioSavingsUsd/1e6).toFixed(2)}M/yr Saved`:`✕ Prompt-Only Storyboarding Suffers ${(100-a.naiveCrossShotIdentityPct).toFixed(1)}% Identity Drift and Dual-Character Attribute Bleeding!`,22,380)}p();
