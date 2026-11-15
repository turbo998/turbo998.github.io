import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as U,c as N,P as G,W as P,A as I,D as W,G as z,b as l,B as f,M as d,T as j,C as V,a as K}from"./three.module-7AmyneiW.js";const F=17,k=58;function J(t){const e=Math.min(1,Math.max(0,t)),o=64,n=e/o;let s=0,a=1;const h=n/(1+n),m=1/(1+n);for(let p=0;p<o;p++){const x=1-s*h,w=s+a*a*h/x,b=a*m/x;s=w,a=b}return s+a}function S(t){const e=[];let o=0,n=0;for(let s=0;s<F;s++){const a=s/(F-1),h=1/(1+a),m=a/(1+a),p=m+h,x=1+a,w=J(a),b=t==="schuster_chandrasekhar_conservative_twostream"?p:x,R=Math.abs(b-1),E=R*100;E>o&&(o=E),R>1e-5&&(n+=1),e.push({stationIndex:s,transportOpticalDepth:Number(a.toFixed(4)),schusterTransmittance:Number(h.toFixed(4)),schusterReflectance:Number(m.toFixed(4)),schusterTotalFluxRatio:Number(p.toFixed(4)),naiveUncoupledFluxRatio:Number(x.toFixed(4)),addingDoubling64FluxRatio:Number(w.toFixed(4)),activeFluxRatio:Number(b.toFixed(4)),fluxConservationError:Number(R.toFixed(4))})}return{mode:t,stationCount:F,solidCount:k,station0FluxRatio:e[0].activeFluxRatio,station4FluxRatio:e[4].activeFluxRatio,station8FluxRatio:e[8].activeFluxRatio,station12FluxRatio:e[12].activeFluxRatio,station16FluxRatio:e[16].activeFluxRatio,maxFluxBlowoutPct:Number(o.toFixed(2)),violatedStationCount:n,stations:e}}const i=document.querySelector("#app");i.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 182 · 192ND DEMO · SCHUSTER-CHANDRASEKHAR TWO-STREAM CLOUD BENCH</p>
        <h1>Schuster-Chandrasekhar Two-Stream Cloud Transfer (<code>R=u/(1+u), T=1/(1+u), R+T = 1.0000×</code>) vs Naive Uncoupled Scatter</h1>
        <p class="subtitle">
          58-solid 17-station atmospheric cloud-slab bench across scaled transport optical depth <code>u = ½(1−g)τ ∈ [0.0000, 1.0000]</code>.
          Arthur Schuster (1905) &amp; Subrahmanyan Chandrasekhar (1950) coupled two-stream radiative transfer partitions conservative cloud flux into <code>R = u/(1+u)</code> and <code>T = 1/(1+u)</code>—locking total slab energy at <code>R + T = 1.0000×</code> across all 17 stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> energy blowout of naive uncoupled backscatter addition.
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-schuster" class="mode-btn active" type="button">Schuster-Chandrasekhar Two-Stream (R+T=1.0000×)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Uncoupled Backscatter (1+u Blowout)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Slab Flux R+T (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">R = 0.2000 · T = 0.8000</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Flux R+T (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">R = 0.3333 · T = 0.6667</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Thick Cloud Flux (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">R = 0.5000 · T = 0.5000 (Equipartition)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Violated Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Excess)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Optical-Depth Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Schuster-Chandrasekhar two-stream cloud bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Cloud Slab Flux Audit (<code>R(u) + T(u)</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>T=1/(1+u)</th>
                <th>Schuster</th>
                <th>Naive (1+u)</th>
                <th>Active R+T</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const D=i.querySelector(".rig-shell"),A=i.querySelector("#rig-canvas"),Q=i.querySelector("#station-tbody"),X=i.querySelector("#kpi-s04"),Y=i.querySelector("#kpi-s08"),Z=i.querySelector("#kpi-s16"),tt=i.querySelector("#kpi-violated"),L=i.querySelector("#btn-schuster"),$=i.querySelector("#btn-naive"),et=i.querySelector("#btn-theme"),u=new U;u.background=new N(725536);const v=new G(42,16/10,.1,100);v.position.set(0,6.2,14.8);v.lookAt(0,1.3,0);const y=new P({canvas:A,antialias:!0,preserveDrawingBuffer:!0});y.setPixelRatio(Math.min(window.devicePixelRatio,2));const ot=new I(16777215,.78);u.add(ot);const O=new W(16777215,1.15);O.position.set(8,14,10);u.add(O);const r=new z;u.add(r);const C=new l(new f(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));C.position.set(0,-.25,0);r.add(C);for(let t=0;t<3;t++){const e=new l(new f(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),r.add(e)}for(let t=0;t<5;t++){const e=new l(new j(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),r.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new l(new V(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));o.position.set(e,.5,-.95),r.add(o)}const q=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new l(new K(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));o.position.set(e,1,.75),r.add(o),q.push(o)}const T=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,o=new l(new f(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));o.position.set(e,1,.75),r.add(o),T.push(o)}if(r.children.length!==k)throw new Error(`Expected ${k} solids, got ${r.children.length}`);let c="schuster_chandrasekhar_conservative_twostream",_=S(c);function g(t){_=t,L.classList.toggle("active",t.mode==="schuster_chandrasekhar_conservative_twostream"),$.classList.toggle("active",t.mode==="naive_uncoupled_first_order_scatter_excess"),X.textContent=`${t.station4FluxRatio.toFixed(4)}×`,Y.textContent=`${t.station8FluxRatio.toFixed(4)}×`,Z.textContent=`${t.station16FluxRatio.toFixed(4)}×`,tt.textContent=`${t.violatedStationCount} / 17 (+${t.maxFluxBlowoutPct.toFixed(2)}% Excess)`,Q.innerHTML=t.stations.map(e=>`
      <tr class="${e.fluxConservationError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.transportOpticalDepth.toFixed(4)}</td>
        <td>${e.schusterTransmittance.toFixed(4)}</td>
        <td>${e.schusterTotalFluxRatio.toFixed(4)}×</td>
        <td>${e.naiveUncoupledFluxRatio.toFixed(4)}×</td>
        <td><strong>${e.activeFluxRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const o=t.stations[e],n=q[e],s=n.material;n.position.y=o.activeFluxRatio;const a=.85+.3*Math.min(2,o.activeFluxRatio);n.scale.setScalar(a),s.color.setHex(o.fluxConservationError>1e-4?16347926:1096065)}for(let e=0;e<T.length;e++){const o=e+2,n=t.stations[o],s=T[e],a=Math.abs(n.activeFluxRatio-1);a<1e-4?(s.scale.set(1,.02,1),s.position.y=1,s.material.color.setHex(1096065)):(s.scale.set(1,a,1),s.position.y=1+a*.5,s.material.color.setHex(15680580))}M()}function B(){const t=A.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),o=Math.max(300,Math.floor(t.height));y.setSize(e,o,!1),v.aspect=e/o,v.updateProjectionMatrix(),M()}function M(){y.render(u,v)}function H(t){D.dataset.theme=t,u.background=new N(t==="light"?16317180:725536),C.material.color.setHex(t==="light"?13358561:1976635),M()}L.addEventListener("click",()=>{c="schuster_chandrasekhar_conservative_twostream",g(S(c))});$.addEventListener("click",()=>{c="naive_uncoupled_first_order_scatter_excess",g(S(c))});et.addEventListener("click",()=>{const t=D.dataset.theme==="light"?"dark":"light";H(t)});window.addEventListener("resize",B);B();g(_);window.__schusterTwoStreamRig={getSnapshot:()=>_,setMode:t=>{c=t;const e=S(t);return g(e),e},setTheme:H};
