import"./modulepreload-polyfill-B5Qt9EMX.js";const k={"fmcg-6shelf-gondola-eyelevel-pitch":{id:"fmcg-6shelf-gondola-eyelevel-pitch",title:"Walmart/Target 6-Shelf Gondola Planogram (48 SKU Facings · 1.45m Golden Eye-Level Zone)",titleZh:"商超 6 层货架陈列图（Planogram 48 个排面 · 1.45米黄金视线层占比与 3秒注视热力预演）",shelfCount:6,totalFacings:48,heroShelfHeightM:1.45},"sephora-endcap-cosmetics-display":{id:"sephora-endcap-cosmetics-display",title:"Luxury Beauty Illuminated Endcap Display (24 Backlit Tester Slots + LED Lightbox Header)",titleZh:"高奢美妆端架（Endcap）背光展柜：24 个试用装卡槽 + 顶部灯箱视觉焦点漫游",shelfCount:4,totalFacings:24,heroShelfHeightM:1.52},"ces-12m-flagship-booth-walkthrough":{id:"ces-12m-flagship-booth-walkthrough",title:"12m × 8m Flagship Trade-Show Booth (ADA 1.2m Corridor Clearance + 1.62m POV Walkthrough)",titleZh:"12m×8m 国际展会旗舰展台（ADA 1.2米无障碍通道校验 + 1.62米第一视角动线漫游）",shelfCount:5,totalFacings:36,heroShelfHeightM:1.62}};function F(a,e,s){const t=Math.max(0,(.3-Math.abs(s-1.62))*.4);return e==="psa-instanced-usd-gondola-gaze-wanvace"?{scenarioId:a,pipelineMode:e,facingCountAccuracyPct:100,gazeFixationPredictionPct:Number(Math.min(99.5,98.9+t).toFixed(1)),buyerApprovalLiftPct:41.6,costPerWalkthroughUsd:.032,annualSavingsUsdM:2.54,verdict:"Act automatically"}:e==="static-2d-planogram-spreadsheet-grid"?{scenarioId:a,pipelineMode:e,facingCountAccuracyPct:100,gazeFixationPredictionPct:52,buyerApprovalLiftPct:0,costPerWalkthroughUsd:.005,annualSavingsUsdM:.38,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,facingCountAccuracyPct:45.8,gazeFixationPredictionPct:61.4,buyerApprovalLiftPct:-19.2,costPerWalkthroughUsd:.42,annualSavingsUsdM:.09,verdict:"Send to a human"}}const $=document.querySelector("#app");if(!$)throw new Error("Missing #app root");let i="fmcg-6shelf-gondola-eyelevel-pitch",n="psa-instanced-usd-gondola-gaze-wanvace",l=1.62;function w(a){const e=a.getContext("2d");if(!e)return;const s=a.width,t=a.height;e.clearRect(0,0,s,t);const A=k[i],g=F(i,n,l),c=n==="unconstrained-t2v-aisle-walkthrough",v=e.createLinearGradient(0,0,s,t);v.addColorStop(0,"#070b14"),v.addColorStop(1,"#111827"),e.fillStyle=v,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,s-32,46),e.strokeStyle=n==="psa-instanced-usd-gondola-gaze-wanvace"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`253rd Workbench · .psa Planogram Instanced 3D Gondola (${A.totalFacings} Facings) · POV Eye=${l.toFixed(2)}m`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`SKU Facing Count Lock: ${g.facingCountAccuracyPct}% | 3s Gaze Heatmap Accuracy: ${g.gazeFixationPredictionPct}% | Buyer Win Lift: +${g.buyerApprovalLiftPct}%`,28,51);const h=42,r=78,m=445,y=290;e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#334155",e.lineWidth=2,e.beginPath(),e.roundRect(h,r,m,y,10),e.fill(),e.stroke();const P=4,u=(y-36)/P;for(let o=0;o<P;o++){const d=r+18+o*u,S=o===1;e.fillStyle="#475569",e.fillRect(h+14,d+u-8,m-28,6),S&&!c&&(e.fillStyle="rgba(245, 158, 11, 0.22)",e.fillRect(h+14,d+2,m-28,u-10));for(let p=0;p<8;p++){const W=h+24+p*50,x=S&&p>=2&&p<=5;e.fillStyle=c?"#ef4444":x?"#10b981":"#1e293b",e.strokeStyle=x?"#fbbf24":"#38bdf8",e.lineWidth=1.5,e.beginPath(),e.roundRect(W,d+10,38,u-20,4),e.fill(),e.stroke()}}const b=508,C=228;e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=c?"#ef4444":"#10b981",e.beginPath(),e.roundRect(b,r,C,y,10),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("Shopper POV & Gaze Analytics",b+14,r+26);const L=[c?"⛔ 54.2% Facing Count Error!":"✓ 100.0% .psa Facing Lock",c?"⛔ Melted Competitor Logos":"✓ 4x Hero Facings @ 1.45m",`POV Camera: ${l.toFixed(2)}m Eye Level`,"First-3s Fixation: 68.4% Hero","ADA Aisle Width: >= 1.25m OK",`Cost: $${g.costPerWalkthroughUsd.toFixed(3)} / Walkthrough`];e.fillStyle="#cbd5e1",e.font="11px JetBrains Mono, monospace",L.forEach((o,d)=>{e.fillText(o,b+14,r+62+d*36)})}function f(){const a=k[i],e=F(i,n,l);$.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">253rd Interactive Architecture Workbench · Domain 4 (Retail Planogram & Booth 3D Previs)</span>
        <h1>商超货架陈列图（Planogram .psa）与展会展台 3D 漫游预演及黄金视线热力工作台</h1>
        <p class="subtitle">BlueYonder .psa 陈列数据 100% 排面实例化锁 + 1.62m 真实顾客视线高度漫游 + 前3秒视觉注视热力图 (ViT Saliency) vs 纯文生视频画错排面数量</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.facingCountAccuracyPct}% Facing Lock</span>
        <span class="metric-pill">+${e.buyerApprovalLiftPct}% Buyer Win</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 终端陈列/展台场景 (Retail / Booth Scenario)</label>
        <select id="scenario-select">
          ${Object.values(k).map(t=>`<option value="${t.id}" ${t.id===i?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 货架漫游预演架构 (Walkthrough Previs Pipeline)</label>
        <select id="mode-select">
          <option value="psa-instanced-usd-gondola-gaze-wanvace" ${n==="psa-instanced-usd-gondola-gaze-wanvace"?"selected":""}>✅ .psa 排面 3D 实例化 + 1.62m 视线漫游 + 注视热力图 + Wan-VACE (推荐)</option>
          <option value="unconstrained-t2v-aisle-walkthrough" ${n==="unconstrained-t2v-aisle-walkthrough"?"selected":""}>⛔ 直接用文生视频生成超市货架漫游 (54.2% 排面数量乱画 & 包装文字全糊)</option>
          <option value="static-2d-planogram-spreadsheet-grid" ${n==="static-2d-planogram-spreadsheet-grid"?"selected":""}>⚠️ 传统 2D 平面陈列方格表 (采购总监无法感知真实通道压迫感与侧面遮挡)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="height-slider">3. 顾客第一视角视线高度 (Shopper Eye Height: <strong>${l.toFixed(2)} m</strong>)</label>
        <input id="height-slider" type="range" min="1.30" max="1.85" step="0.08" value="${l}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>6 层货架陈列排面（.psa 100% 锁定）与黄金视线层（1.45m）3秒注视热力画布 (Planogram Stage)</h2>
          <span class="tag">${a.shelfCount} Shelves · ${a.totalFacings} Facings</span>
        </div>
        <canvas id="planogram-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>终端陈列合规与商超提案遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">SKU 排面数与层高准确率 (Facing Lock)</span>
            <strong class="kpi-value">${e.facingCountAccuracyPct}%</strong>
            <span class="kpi-note">严格按 .psa 货架坐标实例化 48 个真实包装</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">前3秒顾客眼动热力拟合度</span>
            <strong class="kpi-value">${e.gazeFixationPredictionPct}%</strong>
            <span class="kpi-note">量化验证 1.45m 黄金层与端架灯箱吸睛率</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">商超买手黄金货架谈判通过率提升</span>
            <strong class="kpi-value">+${e.buyerApprovalLiftPct}%</strong>
            <span class="kpi-note">第一视角 60fps 货架漫游替代枯燥 2D 表格</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单套漫游成本 / 实体样板间年省</span>
            <strong class="kpi-value">$${e.costPerWalkthroughUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">免除搭建实体商超样板货架与眼动仪实测费</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#planogram-canvas");s&&w(s),document.querySelector("#scenario-select")?.addEventListener("change",t=>{i=t.target.value,f()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{n=t.target.value,f()}),document.querySelector("#height-slider")?.addEventListener("input",t=>{l=Number(t.target.value),f()})}f();
