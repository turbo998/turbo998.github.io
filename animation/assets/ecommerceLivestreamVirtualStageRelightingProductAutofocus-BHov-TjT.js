import"./modulepreload-polyfill-B5Qt9EMX.js";const p={"luxury-beauty-glass-serum-holdup":{id:"luxury-beauty-glass-serum-holdup",title:"Luxury Skincare Live Room: Transparent Glass Dropper Hold-Up (2900K Parisian Salon Stage)",titleZh:"高奢美妆直播间：透明玻璃精华瓶近景怼镜展示（2900K 法式暖金沙龙虚拟背景）",stageColorTempK:2900,heldSkuMaterial:"Refractive Clear Glass + Gold Dropper",defaultSkuDistanceCm:28},"consumer-electronics-chrome-unboxing":{id:"consumer-electronics-chrome-unboxing",title:"3C Tech Flagship Live Room: Mirror-Chrome Smartphone & Gimbal Demo (4800K Cyber Stage)",titleZh:"3C 数码旗舰直播间：镜面电镀手机与云台近景实测（4800K 科技展厅虚拟背景）",stageColorTempK:4800,heldSkuMaterial:"Mirror-Polished Chrome & Glass Screen",defaultSkuDistanceCm:32},"fashion-apparel-fullbody-walk":{id:"fashion-apparel-fullbody-walk",title:"Apparel & Silk Dress Live Try-On: Fine Hair Strands & Sheer Chiffon Hem (3500K Runway Stage)",titleZh:"服饰女装直播间：主播走秀发丝飞扬与半透雪纺裙摆（3500K 秀场动态背景）",stageColorTempK:3500,heldSkuMaterial:"Sheer Silk Chiffon & Fine Hair Strands",defaultSkuDistanceCm:110}};function y(a,e,s){const t=s<=38;return e==="rvm-sku-shield-sh-relight-rackfocus"?{scenarioId:a,pipelineMode:e,skuOpacityIntegrityPct:99.8,hostStageColorMatchDeltaE:.41,frameLatencyMs:11.4,fps:60,conversionLiftPct:t?44.8:38.2,annualSavingsUsdM:2.68,verdict:"Act automatically"}:e==="heavy-per-frame-iclight-diffusion"?{scenarioId:a,pipelineMode:e,skuOpacityIntegrityPct:97.5,hostStageColorMatchDeltaE:.35,frameLatencyMs:420,fps:2.4,conversionLiftPct:8.5,annualSavingsUsdM:.24,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,skuOpacityIntegrityPct:70.2,hostStageColorMatchDeltaE:7.42,frameLatencyMs:8.5,fps:60,conversionLiftPct:-18.4,annualSavingsUsdM:.12,verdict:"Send to a human"}}const b=document.querySelector("#app");if(!b)throw new Error("Missing #app root");let o="luxury-beauty-glass-serum-holdup",i="rvm-sku-shield-sh-relight-rackfocus",l=28;function M(a){const e=a.getContext("2d");if(!e)return;const s=a.width,t=a.height;e.clearRect(0,0,s,t);const u=p[o],c=y(o,i,l),r=i==="obs-green-chroma-key-static-bg",n=l<=38&&i==="rvm-sku-shield-sh-relight-rackfocus",f=e.createLinearGradient(0,0,s,t);f.addColorStop(0,"#1e1b4b"),f.addColorStop(1,"#090d16"),e.fillStyle=f,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,s-32,46),e.strokeStyle=i==="rvm-sku-shield-sh-relight-rackfocus"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`241st Workbench · ${c.fps}fps (${c.frameLatencyMs}ms) Broadcast Stage · ${u.stageColorTempK}K SH Relighting · SKU Z=${l}cm`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Glass SKU Opacity Lock: ${c.skuOpacityIntegrityPct}% | Host-Stage Color ΔE: ${c.hostStageColorMatchDeltaE} | Rack-Focus Bokeh: ${n?"ACTIVE (f/1.4)":"WIDE (f/5.6)"}`,28,51),e.save(),e.fillStyle=n?"rgba(245, 158, 11, 0.08)":"rgba(245, 158, 11, 0.22)",e.strokeStyle="#f59e0b",e.lineWidth=1.5,e.beginPath(),e.roundRect(36,78,s-72,290,14),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 11px Inter, sans-serif",e.fillText(n?`2.5D AI Virtual Showroom (${u.stageColorTempK}K) · AUTO-DEFOCUSED (f/1.4 Circle-of-Confusion Bokeh Active)`:`2.5D AI Virtual Showroom (${u.stageColorTempK}K) · Standard Depth of Field`,52,102);const h=250,g=235;e.fillStyle=r?"#064e3b":n?"rgba(51, 65, 85, 0.55)":"#334155",e.strokeStyle=r?"#22c55e":"#fbbf24",e.lineWidth=3,e.beginPath(),e.arc(h,g-52,38,0,Math.PI*2),e.roundRect(h-68,g-8,136,126,24),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.textAlign="center",e.fillText(r?"Host: Green-Spill Halo & ΔE 7.42 Cold Mismatch":n?"Host Soft-Blurred for SKU Focus":"Host: 3.2ms SH Rim-Light Harmonized (ΔE 0.41)",h,g+95);const v=Math.max(.75,(130-l)/70),k=Math.round(88*v),m=Math.round(142*v),C=520-k/2,S=225-m/2;e.fillStyle=r?"rgba(34, 197, 94, 0.28)":"#0f172a",e.strokeStyle=r?"#ef4444":"#34d399",e.lineWidth=3,e.beginPath(),e.roundRect(C,S,k,m,10),e.fill(),e.stroke(),e.fillStyle=r?"#fca5a5":"#6ee7b7",e.font="bold 11px JetBrains Mono, monospace",e.fillText(r?"29.8% CHROMA HOLE!":`99.8% SKU SHIELD (Z=${l}cm)`,520,S-10),e.fillStyle="#f8fafc",e.font="11px Inter, sans-serif",e.fillText(r?"Glass Eaten by Keyer":"Razor-Sharp Macro Lock",520,S+m/2),e.restore()}function d(){const a=p[o],e=y(o,i,l);b.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">241st Interactive Architecture Workbench · Domain 2 (E-Commerce Live-Stream Virtual Studio)</span>
        <h1>电商直播间 AI 虚拟背景实时重打光、玻璃商品防抠穿与近景自动追焦工作台</h1>
        <p class="subtitle">无绿幕 RVM + SAM-2 手持商品防抠穿护盾 (99.8% 完整) + 3.2ms 球谐函数 (SH) 实时肤色融合 + <38cm 怼镜自动虚化背景 vs 传统绿幕抠像把透明香水瓶抠出破洞</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.fps} fps (${e.frameLatencyMs}ms)</span>
        <span class="metric-pill">ΔE ${e.hostStageColorMatchDeltaE} Relight</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 直播间品类场景 (Live Room Category)</label>
        <select id="scenario-select">
          ${Object.values(p).map(t=>`<option value="${t.id}" ${t.id===o?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="pipeline-select">2. 实时推流合成管线 (Real-Time Broadcast Pipeline)</label>
        <select id="pipeline-select">
          <option value="rvm-sku-shield-sh-relight-rackfocus" ${i==="rvm-sku-shield-sh-relight-rackfocus"?"selected":""}>✅ 无绿幕 RVM + SAM-2 商品护盾 + 3.2ms 球谐重打光 + 怼镜追焦 (60fps 推荐)</option>
          <option value="obs-green-chroma-key-static-bg" ${i==="obs-green-chroma-key-static-bg"?"selected":""}>⛔ 传统 OBS 绿幕色度键抠像 (玻璃瓶与镜面手机被绿光反光抠穿 29.8%)</option>
          <option value="heavy-per-frame-iclight-diffusion" ${i==="heavy-per-frame-iclight-diffusion"?"selected":""}>⚠️ 逐帧重跑扩散模型 IC-Light (420ms/帧 掉至 2.4fps PPT 卡顿)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="distance-slider">3. 商品距镜头距离 (Held-SKU Z-Distance: <strong>${l} cm</strong>)</label>
        <input id="distance-slider" type="range" min="20" max="110" step="4" value="${l}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>60fps 直播流球谐环境光匹配与近景怼镜 f/1.4 景深虚化舞台 (Live Broadcast Stage)</h2>
          <span class="tag">${a.heldSkuMaterial} · ${a.stageColorTempK}K</span>
        </div>
        <canvas id="livestream-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>直播推流画质与转化率遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">透明/镜面商品完整度 (SKU Opacity Lock)</span>
            <strong class="kpi-value">${e.skuOpacityIntegrityPct}%</strong>
            <span class="kpi-note">消除绿幕反光导致的玻璃瓶身透明破洞</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">主播与虚拟背景色温差 (Color ΔE)</span>
            <strong class="kpi-value">ΔE ${e.hostStageColorMatchDeltaE}</strong>
            <span class="kpi-note">2阶球谐函数 (SH) 法线重打光 vs ΔE 7.42 假贴纸</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单帧推理延迟 / 推流帧率</span>
            <strong class="kpi-value">${e.frameLatencyMs}ms · ${e.fps} fps</strong>
            <span class="kpi-note">严格满足 <16.6ms 60fps 零音画不同步预算</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">直播间点击转化率提升 / 年化节省</span>
            <strong class="kpi-value">+${e.conversionLiftPct}% · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">免除 $80,000/间实体豪华造景装修成本</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#livestream-canvas");s&&M(s),document.querySelector("#scenario-select")?.addEventListener("change",t=>{o=t.target.value,l=p[o].defaultSkuDistanceCm,d()}),document.querySelector("#pipeline-select")?.addEventListener("change",t=>{i=t.target.value,d()}),document.querySelector("#distance-slider")?.addEventListener("input",t=>{l=Number(t.target.value),d()})}d();
