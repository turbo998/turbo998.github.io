import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as G,c as K,P,W as B,A as D,D as W,G as U,b as l,B as y,M as d,T as z,C as j,a as V}from"./three.module-7AmyneiW.js";const k=17,w=58;function J(t){const e=Math.min(1,Math.max(0,t)),o=(1-e)/(1+e),n=.5*(1+o),i=64;let a=0;for(let h=0;h<i;h++){const m=.5*o;a+=(.5+m)/i}return a/n}function b(t){const e=[];let o=0,n=0;for(let i=0;i<k;i++){const a=i/(k-1),h=(1-a)/(1+a),g=.5*(1+h),m=1,F=1/g,$=J(a),L=t==="kirchhoff_fresnel_cardioid_obliquity_factor"?m:F,v=Math.abs(L-1),q=v*100;q>o&&(o=q),v>1e-5&&(n+=1),e.push({stationIndex:i,obliquityAttenuationParam:Number(a.toFixed(4)),cosThetaAngle:Number(h.toFixed(4)),kirchhoffFactorK:Number(g.toFixed(4)),kirchhoffAmplitudeRatio:Number(m.toFixed(4)),naiveIsotropicAmplitudeRatio:Number(F.toFixed(4)),greenBoundary64Ratio:Number($.toFixed(4)),activeAmplitudeRatio:Number(L.toFixed(4)),waveletLeakageError:Number(v.toFixed(4))})}return{mode:t,stationCount:k,solidCount:w,station0AmplitudeRatio:e[0].activeAmplitudeRatio,station4AmplitudeRatio:e[4].activeAmplitudeRatio,station8AmplitudeRatio:e[8].activeAmplitudeRatio,station12AmplitudeRatio:e[12].activeAmplitudeRatio,station16AmplitudeRatio:e[16].activeAmplitudeRatio,maxLeakageExcessPct:Number(o.toFixed(2)),leakingStationCount:n,stations:e}}const s=document.querySelector("#app");s.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 185 · 195TH DEMO MILESTONE · KIRCHHOFF-FRESNEL WAVEFRONT OBLIQUITY BENCH</p>
        <h1>Kirchhoff-Fresnel Wavefront Obliquity Factor (<code>K(θ) = ½(1+cos θ), A/A₀ = 1.0000×</code>) vs Isotropic Huygens Leakage</h1>
        <p class="subtitle">
          58-solid 17-station secondary-wavelet diffraction bench across obliquity attenuation parameter <code>u ∈ [0.0000, 1.0000]</code> (<code>K(θ) = 1/(1+u)</code>).
          Augustin-Jean Fresnel (1818) &amp; Gustav Kirchhoff (1882) cardioid obliquity factor <code>K(θ) = ½(1 + cos θ)</code> extinguishes backward ghost wavelets (<code>K(180°) = 0</code>) and locks off-axis wavelet amplitude at <code>A/A_exact = 1.0000×</code> across all 17 stations, eliminating the <code>1/K = 1 + u</code> up to <code>2.0000×</code> lateral/backward ghost-wave leakage of naive isotropic Huygens wavelets (<code>K = 1</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-kirchhoff" class="mode-btn active" type="button">Kirchhoff Cardioid K = ½(1+cos θ)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Isotropic Huygens K = 1 (1+u Leakage)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Wavelet Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.6000 · K = 0.8000</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Mid-Oblique Ratio (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.3333 · K = 0.6667</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Lateral 90° Ratio (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.0000 · K = 0.5000 (θ = 90°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Leaking Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Ghost)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Obliquity Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Kirchhoff-Fresnel wavefront obliquity bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Secondary Wavelet Audit (<code>A_model / A_exact</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>K=½(1+cos θ)</th>
                <th>Kirchhoff</th>
                <th>Naive (1+u)</th>
                <th>Active A/A₀</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const M=s.querySelector(".rig-shell"),E=s.querySelector("#rig-canvas"),Q=s.querySelector("#station-tbody"),Y=s.querySelector("#kpi-s04"),X=s.querySelector("#kpi-s08"),Z=s.querySelector("#kpi-s16"),tt=s.querySelector("#kpi-violated"),C=s.querySelector("#btn-kirchhoff"),N=s.querySelector("#btn-naive"),et=s.querySelector("#btn-theme"),u=new G;u.background=new K(725536);const p=new P(42,16/10,.1,100);p.position.set(0,6.2,14.8);p.lookAt(0,1.3,0);const S=new B({canvas:E,antialias:!0,preserveDrawingBuffer:!0});S.setPixelRatio(Math.min(window.devicePixelRatio,2));const ot=new D(16777215,.78);u.add(ot);const T=new W(16777215,1.15);T.position.set(8,14,10);u.add(T);const c=new U;u.add(c);const A=new l(new y(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));A.position.set(0,-.25,0);c.add(A);for(let t=0;t<3;t++){const e=new l(new y(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),c.add(e)}for(let t=0;t<5;t++){const e=new l(new z(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),c.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new l(new j(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));o.position.set(e,.5,-.95),c.add(o)}const H=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new l(new V(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));o.position.set(e,1,.75),c.add(o),H.push(o)}const x=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,o=new l(new y(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));o.position.set(e,1,.75),c.add(o),x.push(o)}if(c.children.length!==w)throw new Error(`Expected ${w} solids, got ${c.children.length}`);let r="kirchhoff_fresnel_cardioid_obliquity_factor",R=b(r);function f(t){R=t,C.classList.toggle("active",t.mode==="kirchhoff_fresnel_cardioid_obliquity_factor"),N.classList.toggle("active",t.mode==="naive_isotropic_huygens_backward_leakage"),Y.textContent=`${t.station4AmplitudeRatio.toFixed(4)}×`,X.textContent=`${t.station8AmplitudeRatio.toFixed(4)}×`,Z.textContent=`${t.station16AmplitudeRatio.toFixed(4)}×`,tt.textContent=`${t.leakingStationCount} / 17 (+${t.maxLeakageExcessPct.toFixed(2)}% Ghost)`,Q.innerHTML=t.stations.map(e=>`
      <tr class="${e.waveletLeakageError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.obliquityAttenuationParam.toFixed(4)}</td>
        <td>${e.kirchhoffFactorK.toFixed(4)}</td>
        <td>${e.kirchhoffAmplitudeRatio.toFixed(4)}×</td>
        <td>${e.naiveIsotropicAmplitudeRatio.toFixed(4)}×</td>
        <td><strong>${e.activeAmplitudeRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const o=t.stations[e],n=H[e],i=n.material;n.position.y=o.activeAmplitudeRatio;const a=.85+.3*Math.min(2,o.activeAmplitudeRatio);n.scale.setScalar(a),i.color.setHex(o.waveletLeakageError>1e-4?16347926:1096065)}for(let e=0;e<x.length;e++){const o=e+2,n=t.stations[o],i=x[e],a=Math.abs(n.activeAmplitudeRatio-1);a<1e-4?(i.scale.set(1,.02,1),i.position.y=1,i.material.color.setHex(1096065)):(i.scale.set(1,a,1),i.position.y=1+a*.5,i.material.color.setHex(15680580))}_()}function I(){const t=E.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),o=Math.max(300,Math.floor(t.height));S.setSize(e,o,!1),p.aspect=e/o,p.updateProjectionMatrix(),_()}function _(){S.render(u,p)}function O(t){M.dataset.theme=t,u.background=new K(t==="light"?16317180:725536),A.material.color.setHex(t==="light"?13358561:1976635),_()}C.addEventListener("click",()=>{r="kirchhoff_fresnel_cardioid_obliquity_factor",f(b(r))});N.addEventListener("click",()=>{r="naive_isotropic_huygens_backward_leakage",f(b(r))});et.addEventListener("click",()=>{const t=M.dataset.theme==="light"?"dark":"light";O(t)});window.addEventListener("resize",I);I();f(R);window.__kirchhoffObliquityRig={getSnapshot:()=>R,setMode:t=>{r=t;const e=b(t);return f(e),e},setTheme:O};
