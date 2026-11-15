import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as P,c as M,P as j,W as B,A as G,D as J,G as A,b as l,B as x,M as d,T as z,C as U,a as V}from"./three.module-7AmyneiW.js";const b=17,m=58;function W(e){const o=1/(1+Math.min(1,Math.max(0,e))),s=64,i=o/s;let n=0;for(let p=0;p<s;p++)n+=i;return n/o}function g(e){const t=[];let o=0,s=0;for(let i=0;i<b;i++){const n=i/(b-1),p=1/(1+n),_=1,f=1/p,q=W(n),C=e==="torricelli_bernoulli_head_coupled_jet"?_:f,y=Math.abs(C-1),T=y*100;T>o&&(o=T),y>1e-5&&(s+=1),t.push({stationIndex:i,headDepletionParam:Number(n.toFixed(4)),hydrostaticHeadRatio:Number(p.toFixed(4)),torricelliEnergyRatio:Number(_.toFixed(4)),naiveConstantJetEnergyRatio:Number(f.toFixed(4)),hydrostatic64IntegralRatio:Number(q.toFixed(4)),activeEnergyRatio:Number(C.toFixed(4)),bernoulliExcessError:Number(y.toFixed(4))})}return{mode:e,stationCount:b,solidCount:m,station0EnergyRatio:t[0].activeEnergyRatio,station4EnergyRatio:t[4].activeEnergyRatio,station8EnergyRatio:t[8].activeEnergyRatio,station12EnergyRatio:t[12].activeEnergyRatio,station16EnergyRatio:t[16].activeEnergyRatio,maxEnergyExcessPct:Number(o.toFixed(2)),violatedStationCount:s,stations:t}}const a=document.querySelector("#app");a.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 189 · 199TH DEMO · TORRICELLI-BERNOULLI ORIFICE JET BENCH</p>
        <h1>Torricelli-Bernoulli Hydrostatic Orifice Jet (<code>v = √(2gh), E_k/E_p = 1.0000×</code>) vs Constant-Speed Jet Excess</h1>
        <p class="subtitle">
          58-solid 17-station hydrodynamic efflux bench across tank head-depletion parameter <code>u ∈ [0.0000, 1.0000]</code> (<code>h/h₀ = 1/(1+u)</code>).
          Evangelista Torricelli (1643) &amp; Daniel Bernoulli (1738) streamline energy law <code>½ρv² = ρgh</code> scales orifice jet velocity as <code>v(h) = √(2gh)</code>—locking kinetic-to-potential energy ratio at <code>E_k/E_p = 1.0000×</code> across all 17 stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> perpetual-motion kinetic energy excess of naive fixed-speed particle spouts (<code>v = v₀</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-torricelli" class="mode-btn active" type="button">Torricelli-Bernoulli v = √(2gh)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Constant-Speed v = v₀ (1+u Excess)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Energy Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">h / h₀ = 0.8000</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Mid-Drainage Ratio (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">h / h₀ = 0.6667</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Half-Head Ratio (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">h / h₀ = 0.5000 (Half Head)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Violated Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Excess)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Head Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Torricelli-Bernoulli orifice jet bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Orifice Jet Energy Audit (<code>½ρv² / ρgh</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>h / h₀</th>
                <th>Torricelli</th>
                <th>Naive (1+u)</th>
                <th>Active E_k/E_p</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const L=a.querySelector(".rig-shell"),H=a.querySelector("#rig-canvas"),K=a.querySelector("#station-tbody"),Q=a.querySelector("#kpi-s04"),X=a.querySelector("#kpi-s08"),Y=a.querySelector("#kpi-s16"),Z=a.querySelector("#kpi-violated"),F=a.querySelector("#btn-torricelli"),I=a.querySelector("#btn-naive"),ee=a.querySelector("#btn-theme"),h=new P;h.background=new M(725536);const u=new j(42,16/10,.1,100);u.position.set(0,6.2,14.8);u.lookAt(0,1.3,0);const R=new B({canvas:H,antialias:!0,preserveDrawingBuffer:!0});R.setPixelRatio(Math.min(window.devicePixelRatio,2));const te=new G(16777215,.78);h.add(te);const N=new J(16777215,1.15);N.position.set(8,14,10);h.add(N);const r=new A;h.add(r);const k=new l(new x(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));k.position.set(0,-.25,0);r.add(k);for(let e=0;e<3;e++){const t=new l(new x(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));t.position.set(0,1+e*1,-1.55),r.add(t)}for(let e=0;e<5;e++){const t=new l(new z(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));t.position.set(-6+e*3,0,-.35),r.add(t)}for(let e=0;e<17;e++){const t=-7.2+e*.9,o=new l(new U(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));o.position.set(t,.5,-.95),r.add(o)}const $=[];for(let e=0;e<17;e++){const t=-7.2+e*.9,o=new l(new V(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));o.position.set(t,1,.75),r.add(o),$.push(o)}const E=[];for(let e=2;e<17;e++){const t=-7.2+e*.9,o=new l(new x(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));o.position.set(t,1,.75),r.add(o),E.push(o)}if(r.children.length!==m)throw new Error(`Expected ${m} solids, got ${r.children.length}`);let c="torricelli_bernoulli_head_coupled_jet",S=g(c);function v(e){S=e,F.classList.toggle("active",e.mode==="torricelli_bernoulli_head_coupled_jet"),I.classList.toggle("active",e.mode==="naive_constant_speed_perpetual_jet_excess"),Q.textContent=`${e.station4EnergyRatio.toFixed(4)}×`,X.textContent=`${e.station8EnergyRatio.toFixed(4)}×`,Y.textContent=`${e.station16EnergyRatio.toFixed(4)}×`,Z.textContent=`${e.violatedStationCount} / 17 (+${e.maxEnergyExcessPct.toFixed(2)}% Excess)`,K.innerHTML=e.stations.map(t=>`
      <tr class="${t.bernoulliExcessError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(t.stationIndex).padStart(2,"0")}</td>
        <td>${t.headDepletionParam.toFixed(4)}</td>
        <td>${t.hydrostaticHeadRatio.toFixed(4)}</td>
        <td>${t.torricelliEnergyRatio.toFixed(4)}×</td>
        <td>${t.naiveConstantJetEnergyRatio.toFixed(4)}×</td>
        <td><strong>${t.activeEnergyRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let t=0;t<17;t++){const o=e.stations[t],s=$[t],i=s.material;s.position.y=o.activeEnergyRatio;const n=.85+.3*Math.min(2,o.activeEnergyRatio);s.scale.setScalar(n),i.color.setHex(o.bernoulliExcessError>1e-4?16347926:1096065)}for(let t=0;t<E.length;t++){const o=t+2,s=e.stations[o],i=E[t],n=Math.abs(s.activeEnergyRatio-1);n<1e-4?(i.scale.set(1,.02,1),i.position.y=1,i.material.color.setHex(1096065)):(i.scale.set(1,n,1),i.position.y=1+n*.5,i.material.color.setHex(15680580))}w()}function O(){const e=H.parentElement.getBoundingClientRect(),t=Math.max(320,Math.floor(e.width)),o=Math.max(300,Math.floor(e.height));R.setSize(t,o,!1),u.aspect=t/o,u.updateProjectionMatrix(),w()}function w(){R.render(h,u)}function D(e){L.dataset.theme=e,h.background=new M(e==="light"?16317180:725536),k.material.color.setHex(e==="light"?13358561:1976635),w()}F.addEventListener("click",()=>{c="torricelli_bernoulli_head_coupled_jet",v(g(c))});I.addEventListener("click",()=>{c="naive_constant_speed_perpetual_jet_excess",v(g(c))});ee.addEventListener("click",()=>{const e=L.dataset.theme==="light"?"dark":"light";D(e)});window.addEventListener("resize",O);O();v(S);window.__torricelliJetRig={getSnapshot:()=>S,setMode:e=>{c=e;const t=g(e);return v(t),t},setTheme:D};
