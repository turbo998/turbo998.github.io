import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as q,c as F,P as G,W as A,A as Q,D as U,G as B,b as d,B as _,M as u,T as V,C as W,a as z}from"./three.module-7AmyneiW.js";const w=17,S=58;function j(e){const t=Math.min(1,Math.max(0,e)),a=2*t/(1+t),s=64;let o=0;const i=1/s;for(let c=0;c<s;c++){const v=(c+.5)*i;o+=(1-a*v)*i}const g=1/(1+t);return o/g}function m(e){const t=[];let a=0,s=0;for(let o=0;o<w;o++){const i=o/(w-1),g=1/(1+i),c=1,v=1/g,H=j(i),P=e==="hagen_poiseuille_parabolic_noslip_profile"?c:v,b=Math.abs(P-1),E=b*100;E>a&&(a=E),b>1e-5&&(s+=1),t.push({stationIndex:o,wallShearParam:Number(i.toFixed(4)),avgToMaxVelocityRatio:Number(g.toFixed(4)),poiseuilleDischargeRatio:Number(c.toFixed(4)),naivePlugFlowDischargeRatio:Number(v.toFixed(4)),annulus64DischargeRatio:Number(H.toFixed(4)),activeDischargeRatio:Number(P.toFixed(4)),fluxOverestimateError:Number(b.toFixed(4))})}return{mode:e,stationCount:w,solidCount:S,station0DischargeRatio:t[0].activeDischargeRatio,station4DischargeRatio:t[4].activeDischargeRatio,station8DischargeRatio:t[8].activeDischargeRatio,station12DischargeRatio:t[12].activeDischargeRatio,station16DischargeRatio:t[16].activeDischargeRatio,maxFluxExcessPct:Number(a.toFixed(2)),inflatedStationCount:s,stations:t}}const n=document.querySelector("#app");n.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 184 · 194TH DEMO · HAGEN-POISEUILLE PARABOLIC PIPE FLOW BENCH</p>
        <h1>Hagen-Poiseuille Parabolic No-Slip Flow (<code>v(r) = v_max(1−r²/R²), Q/Q₀ = 1.0000×</code>) vs Naive Plug-Flow Excess</h1>
        <p class="subtitle">
          58-solid 17-station viscous pipe-flow bench across wall-shear coupling parameter <code>u ∈ [0.0000, 1.0000]</code> (<code>v_avg/v_max = 1/(1+u)</code>).
          Gotthilf Hagen (1839) &amp; Jean Léonard Marie Poiseuille (1840) parabolic laminar profile enforces wall no-slip and <code>v_avg = ½ v_max</code>—locking volumetric discharge at <code>Q/Q_exact = 1.0000×</code> across all 17 stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> discharge bloat of naive uniform plug-flow particle advection (<code>v(r) = v_max</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-poiseuille" class="mode-btn active" type="button">Hagen-Poiseuille Parabolic (Q/Q₀=1.0000×)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Uniform Plug-Flow (1+u Excess)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Discharge Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">v_avg / v_max = 0.8000</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Mid-Shear Discharge (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">v_avg / v_max = 0.6667</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Full No-Slip Discharge (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">v(R) = 0 · v_avg = 0.5000 v_max</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Inflated Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Excess)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Wall-Shear Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Hagen-Poiseuille parabolic pipe flow bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Pipe Volumetric Discharge Audit (<code>Q(u) / Q_exact</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>v_avg/v_max</th>
                <th>Poiseuille</th>
                <th>Naive (1+u)</th>
                <th>Active Q/Q₀</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const M=n.querySelector(".rig-shell"),L=n.querySelector("#rig-canvas"),J=n.querySelector("#station-tbody"),K=n.querySelector("#kpi-s04"),X=n.querySelector("#kpi-s08"),Y=n.querySelector("#kpi-s16"),Z=n.querySelector("#kpi-violated"),N=n.querySelector("#btn-poiseuille"),C=n.querySelector("#btn-naive"),ee=n.querySelector("#btn-theme"),h=new q;h.background=new F(725536);const p=new G(42,16/10,.1,100);p.position.set(0,6.2,14.8);p.lookAt(0,1.3,0);const R=new A({canvas:L,antialias:!0,preserveDrawingBuffer:!0});R.setPixelRatio(Math.min(window.devicePixelRatio,2));const te=new Q(16777215,.78);h.add(te);const T=new U(16777215,1.15);T.position.set(8,14,10);h.add(T);const r=new B;h.add(r);const k=new d(new _(16.4,.45,5.2),new u({color:1976635,roughness:.4,metalness:.3}));k.position.set(0,-.25,0);r.add(k);for(let e=0;e<3;e++){const t=new d(new _(15.8,.08,.12),new u({color:3718648,roughness:.3,metalness:.5}));t.position.set(0,1+e*1,-1.55),r.add(t)}for(let e=0;e<5;e++){const t=new d(new V(2.15,.06,12,36,Math.PI),new u({color:6514417,roughness:.35,metalness:.45}));t.position.set(-6+e*3,0,-.35),r.add(t)}for(let e=0;e<17;e++){const t=-7.2+e*.9,a=new d(new W(.16,.16,1,20),new u({color:959977,roughness:.3,metalness:.4}));a.position.set(t,.5,-.95),r.add(a)}const I=[];for(let e=0;e<17;e++){const t=-7.2+e*.9,a=new d(new z(.24,24,24),new u({color:1096065,roughness:.25,metalness:.35}));a.position.set(t,1,.75),r.add(a),I.push(a)}const f=[];for(let e=2;e<17;e++){const t=-7.2+e*.9,a=new d(new _(.12,1,.12),new u({color:15680580,roughness:.3,metalness:.3}));a.position.set(t,1,.75),r.add(a),f.push(a)}if(r.children.length!==S)throw new Error(`Expected ${S} solids, got ${r.children.length}`);let l="hagen_poiseuille_parabolic_noslip_profile",D=m(l);function x(e){D=e,N.classList.toggle("active",e.mode==="hagen_poiseuille_parabolic_noslip_profile"),C.classList.toggle("active",e.mode==="naive_uniform_plug_flow_excess"),K.textContent=`${e.station4DischargeRatio.toFixed(4)}×`,X.textContent=`${e.station8DischargeRatio.toFixed(4)}×`,Y.textContent=`${e.station16DischargeRatio.toFixed(4)}×`,Z.textContent=`${e.inflatedStationCount} / 17 (+${e.maxFluxExcessPct.toFixed(2)}% Excess)`,J.innerHTML=e.stations.map(t=>`
      <tr class="${t.fluxOverestimateError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(t.stationIndex).padStart(2,"0")}</td>
        <td>${t.wallShearParam.toFixed(4)}</td>
        <td>${t.avgToMaxVelocityRatio.toFixed(4)}</td>
        <td>${t.poiseuilleDischargeRatio.toFixed(4)}×</td>
        <td>${t.naivePlugFlowDischargeRatio.toFixed(4)}×</td>
        <td><strong>${t.activeDischargeRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let t=0;t<17;t++){const a=e.stations[t],s=I[t],o=s.material;s.position.y=a.activeDischargeRatio;const i=.85+.3*Math.min(2,a.activeDischargeRatio);s.scale.setScalar(i),o.color.setHex(a.fluxOverestimateError>1e-4?16347926:1096065)}for(let t=0;t<f.length;t++){const a=t+2,s=e.stations[a],o=f[t],i=Math.abs(s.activeDischargeRatio-1);i<1e-4?(o.scale.set(1,.02,1),o.position.y=1,o.material.color.setHex(1096065)):(o.scale.set(1,i,1),o.position.y=1+i*.5,o.material.color.setHex(15680580))}y()}function O(){const e=L.parentElement.getBoundingClientRect(),t=Math.max(320,Math.floor(e.width)),a=Math.max(300,Math.floor(e.height));R.setSize(t,a,!1),p.aspect=t/a,p.updateProjectionMatrix(),y()}function y(){R.render(h,p)}function $(e){M.dataset.theme=e,h.background=new F(e==="light"?16317180:725536),k.material.color.setHex(e==="light"?13358561:1976635),y()}N.addEventListener("click",()=>{l="hagen_poiseuille_parabolic_noslip_profile",x(m(l))});C.addEventListener("click",()=>{l="naive_uniform_plug_flow_excess",x(m(l))});ee.addEventListener("click",()=>{const e=M.dataset.theme==="light"?"dark":"light";$(e)});window.addEventListener("resize",O);O();x(D);window.__hagenPoiseuilleRig={getSnapshot:()=>D,setMode:e=>{l=e;const t=m(e);return x(t),t},setTheme:$};
