import"./modulepreload-polyfill-B5Qt9EMX.js";const f={"pullout-sofa-bed-4bar-linkage-unfold":{id:"pullout-sofa-bed-4bar-linkage-unfold",title:"Italian Mechanism Pull-Out Sofa-Bed: 4-Bar Linkage Unfold & 212cm Living-Room Clearance",titleZh:"意式四连杆折叠沙发床一秒展开：刚体连杆零穿模翻转与 212cm 客厅茶几避让包络线",jointTopology:"6 Revolute Pins + Closed-Loop 4-Bar Linkage",sweptClearanceSpec:"98cm (Sofa) → 212cm (Queen Bed) Swept Arc",skuCount:42},"trifold-carbon-ebike-hinge-trunk-fit":{id:"trifold-carbon-ebike-hinge-trunk-fit",title:"16-Inch Tri-Fold Carbon E-Bike: Rear-Triangle Swing, Stem Fold & Sedan Trunk Loading",titleZh:"16寸三折碳纤助力自行车：后三角翻转+头管折叠刚体铰链与轿车后备箱装入演示",jointTopology:"3 Revolute Latches + 1 Telescopic Seatpost",sweptClearanceSpec:"148cm Unfolded → 62×33×58cm Trunk Cube",skuCount:36},"dual-motor-standing-desk-prismatic-lift":{id:"dual-motor-standing-desk-prismatic-lift",title:"Dual-Motor 3-Stage Telescopic Standing Desk & Ergo Monitor-Arm Kinematic Range",titleZh:"双电机三节升降桌与气弹簧显示器支架：移动副（Prismatic Joint）匀速升降与线缆防拉扯轨迹",jointTopology:"3-Stage Prismatic Columns + 4-DoF Gas-Spring Arm",sweptClearanceSpec:"620mm → 1270mm Stroke (0.0mm Tube Bending)",skuCount:54}};function v(i,e,n){const t=Number((Math.abs(n-.5)*.8).toFixed(1));return e==="urdf-cad-revolute-joint-wan-vace-depth-lock"?{scenarioId:i,pipelineMode:e,rigidLinkLengthInvariancePct:100,functionalConversionLiftPct:Number((45.8+t).toFixed(1)),costPerClipUsd:.026,annualSavingsUsdM:2.82,verdict:"Act automatically"}:e==="physical-studio-motion-control-reshoot"?{scenarioId:i,pipelineMode:e,rigidLinkLengthInvariancePct:100,functionalConversionLiftPct:41.2,costPerClipUsd:950,annualSavingsUsdM:.15,verdict:"Confirm"}:{scenarioId:i,pipelineMode:e,rigidLinkLengthInvariancePct:46.4,functionalConversionLiftPct:-12.8,costPerClipUsd:.52,annualSavingsUsdM:.03,verdict:"Send to a human"}}const g=document.querySelector("#app");if(!g)throw new Error("Missing #app root");let r="pullout-sofa-bed-4bar-linkage-unfold",l="urdf-cad-revolute-joint-wan-vace-depth-lock",c=.5;function h(i){const e=i.getContext("2d");if(!e)return;const n=i.width,t=i.height;e.clearRect(0,0,n,t);const d=f[r],s=v(r,l,c),o=l==="naive-flf2v-first-last-frame-liquid-morph",u=e.createLinearGradient(0,0,n,t);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,n,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,n-32,46),e.strokeStyle=l==="urdf-cad-revolute-joint-wan-vace-depth-lock"?"#10b981":"#ef4444",e.strokeRect(16,14,n-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`276th Workbench (54th in Domain 2) · Fold Phase ${(c*100).toFixed(0)}% · ${d.jointTopology}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Rigid-Link Length Invariance: ${s.rigidLinkLengthInvariancePct}% | Functional CVR Lift: +${s.functionalConversionLiftPct}% | Cost: $${s.costPerClipUsd}/Clip`,28,51);const m=[{title:"1. URDF Revolute/Prismatic Joint Rig (SE(3))",detail:o?"⛔ FLF2V Melts Metal Tubes & Dissolves Wheels (53.6% Fail)":`✓ 100.0% Rigid Link Length Lock (${d.jointTopology})`,color:o?"#ef4444":"#10b981",x:36,y:84},{title:"2. Intermediate Folding Trajectory (Phase t=0.5)",detail:o?"⛔ Ghosting Double-Handlebars & Balloon Cushions!":"✓ Exact Closed-Loop 4-Bar Linkage Intermediate Pose",color:o?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Swept Clearance Arc & Trunk/Room Fit Overlay",detail:o?"⛔ Hallucinated Scale Shrinks Sofa by 35% When Folded":`✓ ${d.sweptClearanceSpec}`,color:o?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Wan-VACE Depth-Locked Lifestyle Synthesis",detail:o?"⛔ -12.8% CVR Drop from Impossible Rubber Mechanics":`✓ +${s.functionalConversionLiftPct}% CVR Lift ($${s.costPerClipUsd}/Clip · +$${s.annualSavingsUsdM}M/yr)`,color:o?"#ef4444":"#f59e0b",x:396,y:178}];for(const a of m)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=a.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(a.x,a.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(a.title,a.x+14,a.y+28),e.fillStyle=a.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(a.detail,a.x+14,a.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Kinematic Folding Video Pipeline: ${d.title} (${d.skuCount} SKUs)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(o?"⛔ Unconstrained First-Last-Frame (FLF2V) Interpolation: Melts Rigid Hinges into Liquid Rubber!":`✓ URDF Revolute/Prismatic Forward Kinematics + 81f Depth/Normal Lock + Satori Arc Overlay ($${s.costPerClipUsd}/Clip)`,54,336),e.restore()}function p(){const i=f[r],e=v(r,l,c);g.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">276th Workbench (54th in Domain 2) · Transformable Furniture &amp; E-Bike Kinematic Hinge Video</span>
        <h1>变形家具（折叠沙发床/升降桌）与折叠电动车电商功能视频：URDF 铰链运动学约束 vs 首尾帧插值融化工作台</h1>
        <p class="subtitle">URDF 四连杆旋转副/移动副刚体运动学（100% 锁死金属杆长零弯曲）+ Wan-VACE 81帧深度/法线引导 + Satori 展开包络标尺 vs 首尾帧 FLF2V 液态穿模融化</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.rigidLinkLengthInvariancePct}% Rigid Lock</span>
        <span class="metric-pill">$${e.costPerClipUsd}/Clip</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 变形家居与折叠出行商品场景 (Transformable SKU Scenario)</label>
        <select id="scenario-select">
          ${Object.values(f).map(t=>`<option value="${t.id}" ${t.id===r?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 折叠与展开视频合成管线 (Kinematic Video Pipeline)</label>
        <select id="mode-select">
          <option value="urdf-cad-revolute-joint-wan-vace-depth-lock" ${l==="urdf-cad-revolute-joint-wan-vace-depth-lock"?"selected":""}>✅ URDF/CAD 铰链刚体运动学 + 81帧深度/法线引导 + 扫掠标尺 (推荐)</option>
          <option value="naive-flf2v-first-last-frame-liquid-morph" ${l==="naive-flf2v-first-last-frame-liquid-morph"?"selected":""}>⛔ 直接把“展开图+折叠图”丢进首尾帧视频生成 FLF2V (53.6% 车轮溶解、铁管像面条一样弯曲穿模)</option>
          <option value="physical-studio-motion-control-reshoot" ${l==="physical-studio-motion-control-reshoot"?"selected":""}>⚠️ 传统影棚人工推拉实拍或鱼线吊拍 ($950/支，穿帮修除鱼线耗时 2 天)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="fold-slider">3. 机构折叠/展开相位进度 (Kinematic Fold Progress: <strong>${(c*100).toFixed(0)}%</strong>)</label>
        <input id="fold-slider" type="range" min="0.10" max="0.90" step="0.10" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>URDF 四连杆刚体旋转、中间帧防融化与展开净空包络舞台 (Kinematic Stage)</h2>
          <span class="tag">${i.skuCount} SKUs · ${i.sweptClearanceSpec}</span>
        </div>
        <canvas id="kinematic-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>功能家具与折叠出行视频遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">金属连杆与车架刚体长度守恒率</span>
            <strong class="kpi-value">${e.rigidLinkLengthInvariancePct}%</strong>
            <span class="kpi-note">SE(3) 刚体变换彻底杜绝中间帧果冻融化</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">功能演示视频详情页加购转化提升</span>
            <strong class="kpi-value">${e.functionalConversionLiftPct>=0?"+":""}${e.functionalConversionLiftPct}%</strong>
            <span class="kpi-note">直观展示一秒开合轨迹与后备箱/客厅净空</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">折叠前后真实比例与展开标尺精度</span>
            <strong class="kpi-value">±1.2mm</strong>
            <span class="kpi-note">${i.sweptClearanceSpec}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单条视频成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerClipUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比影棚鱼线定格拍摄 $950/支降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const n=document.querySelector("#kinematic-canvas");n&&h(n),document.querySelector("#scenario-select")?.addEventListener("change",t=>{r=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{l=t.target.value,p()}),document.querySelector("#fold-slider")?.addEventListener("input",t=>{c=Number(t.target.value),p()})}p();
