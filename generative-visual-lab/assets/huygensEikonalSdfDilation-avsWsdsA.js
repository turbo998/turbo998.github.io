import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as q,c as M,P as I,W as P,A as B,D as z,G as U,b as l,B as S,M as d,T as W,C as K,a as j}from"./three.module-7AmyneiW.js";const m=17,b=58;function V(t){const s=1/(1+Math.min(1,Math.max(0,t))),a=64;let i=s;for(let n=0;n<a;n++)i=i+.5*(1-i);return 1/i}function p(t){const e=[];let s=0,a=0;for(let i=0;i<m;i++){const n=i/(m-1),w=1/(1+n),R=1,_=1/w,O=V(n),N=t==="huygens_eikonal_unit_gradient_dilation"?R:_,g=Math.abs(N-1),E=g*100;E>s&&(s=E),g>1e-5&&(a+=1),e.push({stationIndex:i,slopeDilutionParam:Number(n.toFixed(4)),rawGradientNorm:Number(w.toFixed(4)),huygensEikonalThicknessRatio:Number(R.toFixed(4)),naiveAlgebraicThicknessRatio:Number(_.toFixed(4)),fastMarching64ThicknessRatio:Number(O.toFixed(4)),activeThicknessRatio:Number(N.toFixed(4)),eikonalNormError:Number(g.toFixed(4))})}return{mode:t,stationCount:m,solidCount:b,station0ThicknessRatio:e[0].activeThicknessRatio,station4ThicknessRatio:e[4].activeThicknessRatio,station8ThicknessRatio:e[8].activeThicknessRatio,station12ThicknessRatio:e[12].activeThicknessRatio,station16ThicknessRatio:e[16].activeThicknessRatio,maxThicknessDistortionPct:Number(s.toFixed(2)),distortedStationCount:a,stations:e}}const o=document.querySelector("#app");o.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 174 · 184TH DEMO · HUYGENS-EIKONAL SDF DILATION BENCH</p>
        <h1>Huygens-Eikonal Unit-Gradient SDF Dilation (<code>d = f/‖∇f‖, W/r = 1.0000×</code>) vs Naive Algebraic Offset Distortion</h1>
        <p class="subtitle">
          58-solid 17-station metrological wavefront bench across gradient-dilution parameter <code>u ∈ [0.0000, 1.0000]</code> (<code>‖∇f‖ = 1/(1+u)</code>).
          Christiaan Huygens (1678) &amp; Heinrich Bruns (1895) Eikonal normalization <code>d_Huygens = f(x)/‖∇f(x)‖</code> enforces <code>‖∇d‖ = 1</code> and locks shell thickness at <code>W/r = 1.0000×</code> across all 17 stations, eliminating the <code>1 + u</code> up to <code>2.0000×</code> double-thickness distortion of naive unnormalized algebraic offsets <code>f(x) − r = 0</code>.
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-huygens" class="mode-btn active" type="button">Huygens-Eikonal Unit-Gradient (‖∇d‖=1)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Algebraic Offset (f(x)−r=0)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Thickness Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">‖∇f‖ = 0.8000</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Thickness (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">‖∇f‖ = 0.6667</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Gentle-Slope Ratio (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">‖∇f‖ = 0.5000 (2× Slope Dilution)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Distorted Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (0.00% Bloat)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Gradient Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Huygens-Eikonal SDF dilation bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station SDF Shell Thickness Audit (<code>W(u) / r</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>‖∇f‖</th>
                <th>Huygens (1.0×)</th>
                <th>Naive (1+u)</th>
                <th>Active W/r</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const D=o.querySelector(".rig-shell"),F=o.querySelector("#rig-canvas"),Y=o.querySelector("#station-tbody"),J=o.querySelector("#kpi-s04"),Q=o.querySelector("#kpi-s08"),X=o.querySelector("#kpi-s16"),Z=o.querySelector("#kpi-violated"),G=o.querySelector("#btn-huygens"),C=o.querySelector("#btn-naive"),tt=o.querySelector("#btn-theme"),h=new q;h.background=new M(725536);const u=new I(42,16/10,.1,100);u.position.set(0,6.2,14.8);u.lookAt(0,1.3,0);const f=new P({canvas:F,antialias:!0,preserveDrawingBuffer:!0});f.setPixelRatio(Math.min(window.devicePixelRatio,2));const et=new B(16777215,.78);h.add(et);const H=new z(16777215,1.15);H.position.set(8,14,10);h.add(H);const r=new U;h.add(r);const x=new l(new S(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));x.position.set(0,-.25,0);r.add(x);for(let t=0;t<3;t++){const e=new l(new S(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),r.add(e)}for(let t=0;t<5;t++){const e=new l(new W(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),r.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,s=new l(new K(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));s.position.set(e,.5,-.95),r.add(s)}const L=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,s=new l(new j(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));s.position.set(e,1,.75),r.add(s),L.push(s)}const v=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,s=new l(new S(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));s.position.set(e,1,.75),r.add(s),v.push(s)}if(r.children.length!==b)throw new Error(`Expected ${b} solids, got ${r.children.length}`);let c="huygens_eikonal_unit_gradient_dilation",y=p(c);function k(t){y=t,G.classList.toggle("active",t.mode==="huygens_eikonal_unit_gradient_dilation"),C.classList.toggle("active",t.mode==="naive_unnormalized_algebraic_offset"),J.textContent=`${t.station4ThicknessRatio.toFixed(4)}×`,Q.textContent=`${t.station8ThicknessRatio.toFixed(4)}×`,X.textContent=`${t.station16ThicknessRatio.toFixed(4)}×`,Z.textContent=`${t.distortedStationCount} / 17 (+${t.maxThicknessDistortionPct.toFixed(2)}% Bloat)`,Y.innerHTML=t.stations.map(e=>`
      <tr class="${e.eikonalNormError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.slopeDilutionParam.toFixed(4)}</td>
        <td>${e.rawGradientNorm.toFixed(4)}</td>
        <td>${e.huygensEikonalThicknessRatio.toFixed(4)}×</td>
        <td>${e.naiveAlgebraicThicknessRatio.toFixed(4)}×</td>
        <td><strong>${e.activeThicknessRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const s=t.stations[e],a=L[e],i=a.material;a.position.y=s.activeThicknessRatio;const n=.85+.3*Math.min(2,s.activeThicknessRatio);a.scale.setScalar(n),i.color.setHex(s.eikonalNormError>1e-4?16347926:1096065)}for(let e=0;e<v.length;e++){const s=e+2,a=t.stations[s],i=v[e],n=Math.abs(a.activeThicknessRatio-1);n<1e-4?(i.scale.set(1,.02,1),i.position.y=1,i.material.color.setHex(1096065)):(i.scale.set(1,n,1),i.position.y=1+n*.5,i.material.color.setHex(15680580))}T()}function A(){const t=F.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),s=Math.max(300,Math.floor(t.height));f.setSize(e,s,!1),u.aspect=e/s,u.updateProjectionMatrix(),T()}function T(){f.render(h,u)}function $(t){D.dataset.theme=t,h.background=new M(t==="light"?16317180:725536),x.material.color.setHex(t==="light"?13358561:1976635),T()}G.addEventListener("click",()=>{c="huygens_eikonal_unit_gradient_dilation",k(p(c))});C.addEventListener("click",()=>{c="naive_unnormalized_algebraic_offset",k(p(c))});tt.addEventListener("click",()=>{const t=D.dataset.theme==="light"?"dark":"light";$(t)});window.addEventListener("resize",A);A();k(y);window.__huygensEikonalRig={getSnapshot:()=>y,setMode:t=>{c=t;const e=p(t);return k(e),e},setTheme:$};
