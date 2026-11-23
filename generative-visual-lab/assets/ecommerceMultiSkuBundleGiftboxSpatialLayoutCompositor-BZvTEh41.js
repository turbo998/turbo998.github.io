import"./modulepreload-polyfill-B5Qt9EMX.js";const S={"skincare-4sku-holiday-box":{id:"skincare-4sku-holiday-box",title:"4-SKU Luxury Skincare Holiday Gift Box (165mm Cleanser + 118mm Toner + 92mm Serum + 48mm Eye Cream)",titleZh:"4件套高奢美妆双11/圣诞礼盒（165mm洁面 + 118mm精粹水 + 92mm精华 + 48mm眼霜）",category:"Beauty & Cosmetics Gift Set",skuCount:4,boxMarginMm:18,skus:[{id:"SKU-A",name:"Amino Cleanser",volumeLabel:"150ml",realHeightMm:165,realWidthMm:54,zLayerOrder:1,accentColor:"#38bdf8",bodyColor:"#0f172a",capColor:"#e2e8f0"},{id:"SKU-B",name:"Essence Toner",volumeLabel:"120ml",realHeightMm:118,realWidthMm:46,zLayerOrder:2,accentColor:"#fbbf24",bodyColor:"#1e293b",capColor:"#f59e0b"},{id:"SKU-C",name:"Peptide Serum",volumeLabel:"50ml",realHeightMm:92,realWidthMm:36,zLayerOrder:3,accentColor:"#a855f7",bodyColor:"#311042",capColor:"#fbbf24"},{id:"SKU-D",name:"Repair Eye Cream",volumeLabel:"15ml",realHeightMm:48,realWidthMm:52,zLayerOrder:4,accentColor:"#34d399",bodyColor:"#064e3b",capColor:"#fbbf24"}]},"tech-3sku-desk-bundle":{id:"tech-3sku-desk-bundle",title:"3-SKU Creator Workstation Bundle (215mm Studio Headphone + 124mm MagSafe Dock + 62mm GaN Charger)",titleZh:"3件套数码桌面全家桶套装（215mm头戴降噪耳机 + 124mm磁吸充底座 + 62mm氮化镓快充）",category:"Consumer Electronics Virtual Bundle",skuCount:3,boxMarginMm:22,skus:[{id:"SKU-1",name:"ANC Studio Headphones",volumeLabel:"250g",realHeightMm:215,realWidthMm:168,zLayerOrder:1,accentColor:"#60a5fa",bodyColor:"#1e293b",capColor:"#94a3b8"},{id:"SKU-2",name:"3-in-1 MagSafe Stand",volumeLabel:"15W",realHeightMm:124,realWidthMm:86,zLayerOrder:2,accentColor:"#34d399",bodyColor:"#0f172a",capColor:"#cbd5e1"},{id:"SKU-3",name:"140W GaN Mini Brick",volumeLabel:"140W",realHeightMm:62,realWidthMm:58,zLayerOrder:3,accentColor:"#f59e0b",bodyColor:"#1e1b4b",capColor:"#fbbf24"}]},"beverage-6sku-family-pack":{id:"beverage-6sku-family-pack",title:"6-SKU Craft Sparkling Variety Pack (2×330ml Tall Cans + 2×250ml Slim Cans + 2×180ml Glass Tasters)",titleZh:"6件套精酿气泡水混合家庭装（2×330ml高罐 + 2×250ml摩登罐 + 2×180ml玻璃品鉴瓶）",category:"FMCG Multi-Pack & Club Bundle",skuCount:6,boxMarginMm:14,skus:[{id:"CAN-1",name:"Yuzu Hop 330ml",volumeLabel:"330ml",realHeightMm:146,realWidthMm:66,zLayerOrder:1,accentColor:"#facc15",bodyColor:"#422006",capColor:"#e2e8f0"},{id:"CAN-2",name:"White Peach 330ml",volumeLabel:"330ml",realHeightMm:146,realWidthMm:66,zLayerOrder:1,accentColor:"#f472b6",bodyColor:"#500724",capColor:"#e2e8f0"},{id:"SLIM-1",name:"Lime Mint 250ml",volumeLabel:"250ml",realHeightMm:134,realWidthMm:53,zLayerOrder:2,accentColor:"#4ade80",bodyColor:"#052e16",capColor:"#e2e8f0"},{id:"SLIM-2",name:"Berry Hibiscus 250ml",volumeLabel:"250ml",realHeightMm:134,realWidthMm:53,zLayerOrder:2,accentColor:"#c084fc",bodyColor:"#2e1065",capColor:"#e2e8f0"},{id:"MINI-1",name:"Ginger Tonic 180ml",volumeLabel:"180ml",realHeightMm:102,realWidthMm:50,zLayerOrder:3,accentColor:"#38bdf8",bodyColor:"#0c4a6e",capColor:"#fbbf24"},{id:"MINI-2",name:"Blood Orange 180ml",volumeLabel:"180ml",realHeightMm:102,realWidthMm:50,zLayerOrder:3,accentColor:"#fb923c",bodyColor:"#431407",capColor:"#fbbf24"}]}};function P(a,e,l,t){const s=S[a],c=Math.abs(t-35)*.02;if(e==="pim-metric-depth-slot-compositor"){const u=l==="velvet-diecut-giftbox"?.3:l==="pyramid-hero-stack"?.2:.1;return{scenarioId:a,pipelineMode:e,arrangementMode:l,mmScaleErrorPct:Number((.18+s.skuCount*.01).toFixed(2)),skuCountAccuracyPct:100,labelIntegrityPct:100,interShadowRealismPct:Number(Math.min(99.6,98.9+u-c).toFixed(1)),costPerBundleUsd:.011,annualSavingsUsdM:2.84,verdict:"Act automatically"}}return e==="flat-2d-collage-paste"?{scenarioId:a,pipelineMode:e,arrangementMode:l,mmScaleErrorPct:14.8,skuCountAccuracyPct:100,labelIntegrityPct:100,interShadowRealismPct:Number(Math.max(31,38.4-c*2).toFixed(1)),costPerBundleUsd:.003,annualSavingsUsdM:.62,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,arrangementMode:l,mmScaleErrorPct:Number((38.4+s.skuCount*1.4).toFixed(1)),skuCountAccuracyPct:Number(Math.max(54,72.5-s.skuCount*3.1).toFixed(1)),labelIntegrityPct:61.8,interShadowRealismPct:81.2,costPerBundleUsd:.24,annualSavingsUsdM:.18,verdict:"Send to a human"}}const $=document.querySelector("#app");if(!$)throw new Error("Missing #app root");let b="skincare-4sku-holiday-box",n="pim-metric-depth-slot-compositor",i="velvet-diecut-giftbox",h=35;function B(a){const e=a.getContext("2d");if(!e)return;const l=a.width,t=a.height;e.clearRect(0,0,l,t);const s=S[b],c=P(b,n,i,h),u=e.createLinearGradient(0,0,0,t);u.addColorStop(0,"#090d16"),u.addColorStop(.65,"#111827"),u.addColorStop(1,"#1e293b"),e.fillStyle=u,e.fillRect(0,0,l,t);const v=t*.64;e.save(),i==="velvet-diecut-giftbox"?(e.fillStyle="#31102f",e.strokeStyle="#f59e0b",e.lineWidth=2.5,e.beginPath(),e.roundRect(l*.1,v-26,l*.8,128,14),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 11px Inter, sans-serif",e.fillText("DIE-CUT EVA VELVET GIFT BOX INLAY · 3.0mm SLOT AO LOCK",l*.13,v+88)):(e.fillStyle="#1f2937",e.strokeStyle="#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(l*.08,v,l*.84,92,10),e.fill(),e.stroke()),e.restore();const I=s.skus.length,U=l*.15,E=l*.7/I,x=1.15,H=Math.round((h-35)/45*24);s.skus.forEach((o,C)=>{const r=n==="naive-multi-ref-diffusion",W=n==="flat-2d-collage-paste",L=r?o.realHeightMm<80?o.realHeightMm*2.35:o.realHeightMm*.72:o.realHeightMm,d=Math.round(L*x),p=Math.round(o.realWidthMm*x*(r&&o.realHeightMm<80?1.45:1)),f=U+E*(C+.5),A=i==="pyramid-hero-stack"?C%2===0?-12:10:i==="isometric-flatlay-grid"?C%2===0?-18:6:0,M=v+34+A,g=f-p/2,m=M-d;W||(e.save(),e.fillStyle=r?"rgba(239, 68, 68, 0.26)":"rgba(2, 6, 23, 0.78)",e.beginPath(),e.ellipse(f+H*.4,M+4,p*.68,12,0,0,Math.PI*2),e.fill(),e.restore()),e.save(),e.fillStyle=o.bodyColor,e.strokeStyle=r?"#ef4444":o.accentColor,e.lineWidth=2.2,e.beginPath(),e.roundRect(g,m,p,d,8),e.fill(),e.stroke();const k=Math.max(12,Math.round(d*.16));e.fillStyle=r&&C%2===1?"#ec4899":o.capColor,e.beginPath(),e.roundRect(g+p*.18,m-k+2,p*.64,k,4),e.fill(),e.fillStyle=r?"rgba(239, 68, 68, 0.28)":"rgba(255, 255, 255, 0.92)",e.fillRect(g+5,m+d*.28,p-10,Math.max(24,d*.36)),e.fillStyle="#0f172a",e.font="bold 10px Inter, sans-serif",e.textAlign="center",e.fillText(r?"??GARBLE??":o.id,f,m+d*.44),e.font="9px Inter, sans-serif",e.fillText(o.volumeLabel,f,m+d*.56),e.strokeStyle=r?"#f87171":"#34d399",e.lineWidth=1.5,e.beginPath(),e.moveTo(g-8,m),e.lineTo(g-8,M),e.stroke(),e.fillStyle=r?"#fca5a5":"#6ee7b7",e.font="bold 10px JetBrains Mono, monospace",e.fillText(r?`${Math.round(L)}mm (ERR!)`:`${o.realHeightMm}mm LOCK`,f,m-k-6),e.restore()}),e.fillStyle="rgba(15, 23, 42, 0.88)",e.fillRect(16,14,l-32,46),e.strokeStyle=n==="pim-metric-depth-slot-compositor"?"#10b981":"#f59e0b",e.strokeRect(16,14,l-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.textAlign="left",e.fillText(`236th Workbench · PIM Millimeter Scale Lock (±${c.mmScaleErrorPct}% Err) · ${s.skuCount}-SKU Bundle · ${i}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`SKU Count Integrity: ${c.skuCountAccuracyPct.toFixed(1)}% | Inter-SKU Shadow Realism: ${c.interShadowRealismPct.toFixed(1)}% | Unit Cost: $${c.costPerBundleUsd.toFixed(3)}/Bundle`,28,51)}function y(){const a=S[b],e=P(b,n,i,h);$.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">236th Interactive Architecture Workbench · Domain 2 (E-Commerce & Retail Media Packaging)</span>
        <h1>电商多单品组合套装（Multi-SKU Bundle）与节日礼盒内衬空间编排选型工作台</h1>
        <p class="subtitle">PIM 物理毫米级尺寸锁定 (±0.21% 误差) + 2.5D 礼盒刀模内衬景深编排 + Flux.1-Fill 互遮挡阴影 vs 多参考图直接混生 (15ml 眼霜画得比 150ml 洁面还大)</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">±${e.mmScaleErrorPct}% Scale Error</span>
        <span class="metric-pill">$${e.costPerBundleUsd.toFixed(3)} / Bundle</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 组合套装场景 (Bundle Scenario)</label>
        <select id="scenario-select">
          ${Object.values(S).map(t=>`<option value="${t.id}" ${t.id===b?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="pipeline-select">2. 生产管线架构 (Pipeline Architecture)</label>
        <select id="pipeline-select">
          <option value="pim-metric-depth-slot-compositor" ${n==="pim-metric-depth-slot-compositor"?"selected":""}>✅ PIM 毫米级比例锁定 + 2.5D 刀模景深 + Flux.1-Fill 互阴影 (推荐)</option>
          <option value="naive-multi-ref-diffusion" ${n==="naive-multi-ref-diffusion"?"selected":""}>⛔ 多图 IP-Adapter/Redux 直接混生 (44% 比例倒挂 & 串色)</option>
          <option value="flat-2d-collage-paste" ${n==="flat-2d-collage-paste"?"selected":""}>⚠️ 传统 2D 抠图硬贴拼图 (零礼盒凹槽 & 零瓶间互遮挡阴影)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="arrangement-select">3. 空间阵列与内衬 (Spatial Arrangement)</label>
        <select id="arrangement-select">
          <option value="velvet-diecut-giftbox" ${i==="velvet-diecut-giftbox"?"selected":""}>丝绒 EVA 刀模礼盒内嵌 (Die-Cut Gift Box Inlay)</option>
          <option value="pyramid-hero-stack" ${i==="pyramid-hero-stack"?"selected":""}>前低后高金字塔主图阵列 (Pyramid Hero Stack)</option>
          <option value="isometric-flatlay-grid" ${i==="isometric-flatlay-grid"?"selected":""}>45° 俯拍矩阵开箱平铺 (Isometric Flat-Lay)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="angle-slider">4. 主光方向角 (Key Light Angle: <strong>${h}°</strong>)</label>
        <input id="angle-slider" type="range" min="15" max="65" step="5" value="${h}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>PIM 物理毫米标尺与多单品景深互遮挡画布 (Metric Scale & Mutual AO Stage)</h2>
          <span class="tag">${a.category} · ${a.skuCount} SKUs</span>
        </div>
        <canvas id="bundle-canvas" width="760" height="400"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>架构评估与 FinOps 遥测指标</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">跨单品物理比例误差 (mm Scale Error)</span>
            <strong class="kpi-value">${e.mmScaleErrorPct}%</strong>
            <span class="kpi-note">PIM 真实毫米锁定 vs 15ml 眼霜画成巨无霸</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单品数量与包装零串色率 (SKU Lock)</span>
            <strong class="kpi-value">${e.skuCountAccuracyPct.toFixed(1)}%</strong>
            <span class="kpi-note">100% 锁定各瓶身标签像素 (${e.labelIntegrityPct.toFixed(1)}%)</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">瓶间互投阴影与刀模凹槽真实感</span>
            <strong class="kpi-value">${e.interShadowRealismPct.toFixed(1)}%</strong>
            <span class="kpi-note">3.0mm EVA 凹槽 AO + 相邻瓶身漫反射串光</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单套生成成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerBundleUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比大促季 50,000 套组合礼盒实拍拼图</span>
          </div>
        </div>

        <h3>PIM 物理规格清单 (Millimeter BOM)</h3>
        <table class="sku-table">
          <thead>
            <tr>
              <th>SKU ID</th>
              <th>单品名称</th>
              <th>容量</th>
              <th>PIM 物理高×宽</th>
              <th>Z 景深层</th>
            </tr>
          </thead>
          <tbody>
            ${a.skus.map(t=>`
              <tr>
                <td><code>${t.id}</code></td>
                <td>${t.name}</td>
                <td>${t.volumeLabel}</td>
                <td><strong>${t.realHeightMm} × ${t.realWidthMm} mm</strong></td>
                <td>Layer ${t.zLayerOrder}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </aside>
    </main>
  `;const l=document.querySelector("#bundle-canvas");l&&B(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{b=t.target.value,y()}),document.querySelector("#pipeline-select")?.addEventListener("change",t=>{n=t.target.value,y()}),document.querySelector("#arrangement-select")?.addEventListener("change",t=>{i=t.target.value,y()}),document.querySelector("#angle-slider")?.addEventListener("input",t=>{h=Number(t.target.value),y()})}y();
