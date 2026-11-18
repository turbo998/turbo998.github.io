'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const professional=require('./professional-navigation.cjs');
const root=path.resolve(__dirname,'..');
const source='workshops/azure-vm-modernization/index.html';
const gitShow=(rev,file)=>execFileSync('git',['show',`${rev}:${file}`],{cwd:root,encoding:'utf8'});

const foleyDemoReplacements=[
  ['Native Audio-Visual Joint DiT &amp; FramePack Foley Studio · 原生音画联合扩散与物理拟音导演台','Native Audio-Visual Joint DiT &amp; FramePack Foley Studio · Joint Diffusion &amp; Physical Foley Director'],
  ['原生音画联合扩散与物理拟音导演台','Joint Audio-Visual Diffusion &amp; Physical Foley Director'],
  ['Wet Asphalt (积水沥青)','Wet Asphalt (Damped Splash)'],
  ['Steel Grate (空腔钢格栅)','Steel Grate (Hollow Metallic)'],
  ['Titanium Anvil (钛合金砧面)','Titanium Anvil (High-Q Ring)'],
  ['Studio Vocal (近场人声电容麦)','Studio Vocal (Near-Field Condenser)'],
  ['⏸ 暂停 (Pause)','⏸ Pause'],
  ['▶ 播放 (Play)','▶ Play'],
  ['🔊 WebAudio 拟音已开启','🔊 WebAudio Foley Active'],
  ['🔇 开启 WebAudio 实时物理拟音','🔇 Enable WebAudio Physical Foley'],
  ['🔊 开启 WebAudio 实时物理拟音','🔊 Enable WebAudio Physical Foley'],
  ['✅ 已复制 AUDIOVISUAL_FOLEY_SPEC.json','✅ Copied AUDIOVISUAL_FOLEY_SPEC.json'],
  ['← 实验室门户','← Lab Portal'],
  ['⚡ 注入物理碰撞冲量 J_c','⚡ Inject Contact Impulse J_c'],
  ['📋 导出 AUDIOVISUAL_FOLEY_SPEC.json','📋 Export AUDIOVISUAL_FOLEY_SPEC.json'],
  ['📊 7-Card 4:5 评测报告','📊 7-Card 4:5 Benchmark Report'],
  ['📖 架构研究专著','📖 Architecture Study'],
  ['1. 音画同步测试场景 (AV Scenes)','1. Audio-Visual Sync Test Scenes (AV Scenes)'],
  ['霓虹雨夜机甲巡逻 · 脚步材质拟音','Neon Rain Mech Patrol · Footstep Material Foley'],
  ['双足机甲跨越积水沥青与钢格栅，实时解算足端触地冲量 J_c、水花粒子与双耳立体声声像。','Bipedal mech crossing wet asphalt and steel grates, solving foot-contact impulse J_c, splash particles, and binaural stereo panning in real time.'],
  ['数字人多语种对白 · 12-Viseme 口型','Multilingual Avatar Dialogue · 12-Viseme Lip Sync'],
  ['亚帧级音素-视位（AA/EE/OO/MM/FV）共振峰包络与 Cross-Modality AdaLN 下颌相位锁定。','Sub-frame phoneme-viseme (AA/EE/OO/MM/FV) formant envelope with Cross-Modality AdaLN jaw phase lock.'],
  ['高能等离子锻造 · 刚体冲击声场','High-Energy Plasma Forge · Rigid-Body Impact Acoustic Field'],
  ['重锤撞击炽热钛合金剑坯，激发火花粒子簇、声压激波环与多频段金属模态共振衰减。','Heavy hammer striking white-hot titanium blade stock, exciting spark clusters, acoustic shock rings, and multi-band metallic modal decay.'],
  ['2. 音画扩散与长时序架构 (AV Architecture)','2. Audio-Visual Diffusion &amp; Long-Horizon Architecture (AV Architecture)'],
  ['LTX-2 19B 非对称双流联合扩散','LTX-2 19B Asymmetric Dual-Stream Joint Diffusion'],
  ['14B 视频流 + 5B 音频流 + 双向跨模态注意力 A_(v↔a) + 连续 RoPE。','14B video stream + 5B audio stream + bidirectional cross-modal attention A_(v↔a) + continuous RoPE.'],
  ['FramePack O(1) 恒定上下文 + 反漂移','FramePack O(1) Constant Context + Anti-Drift'],
  ['几何级数 1x/2x/4x/8x 历史帧压缩 + 倒序首尾锚点采样，60秒仅需 5.8GB 显存。','Geometric 1x/2x/4x/8x historical frame packing + inverted anchor sampling, requiring only 5.8GB VRAM for 60s.'],
  ['Hunyuan-Foley / MMAudio 冲量控制','Hunyuan-Foley / MMAudio Impulse Control'],
  ['显式提取光流/刚体速度跳变冲量 J_c 与表面声学传递函数合成拟音。','Explicit optical-flow and rigid-body velocity impulse J_c extraction with surface acoustic transfer synthesis.'],
  ['Baseline 串行 T2V + 事后拼接配音','Baseline Cascaded T2V + Post-Hoc Dubbing'],
  ['传统两阶段流水线：暴露明显的口型/动作错位（68.5ms）与 60s 自回归崩溃。','Legacy two-stage pipeline exposing visible lip/action desync (68.5ms) and 60s autoregressive drift collapse.'],
  ['3. 物理声学材质传递函数 (Material H_m)','3. Physical Acoustic Material Transfer Function (Material H_m)'],
  ['积水沥青','Wet Asphalt'],
  ['420Hz 阻尼 + 水花','420Hz Damping + Splash'],
  ['空腔钢格栅','Hollow Steel Grate'],
  ['1.8kHz 金属泛音','1.8kHz Metallic Harmonics'],
  ['钛合金砧面','Titanium Anvil'],
  ['3.1kHz 高 Q 鸣响','3.1kHz High-Q Ringing'],
  ['人声共振峰','Vocal Formants'],
  ['F1/F2 Viseme 锁定','F1/F2 Viseme Lock'],
  ['💡 点击主画布任意位置可注入自定义物理碰撞发声点','💡 Click anywhere on the main canvas to inject a custom physical contact impulse'],
  ['4. 跨模态与 FramePack 实时参数','4. Cross-Modal &amp; FramePack Live Parameters'],
  ['FramePack 压缩比 (λ)','FramePack Compression Ratio (λ)'],
  ['双耳立体声方位宽度 (ITD/ILD)','Binaural Stereo Width (ITD/ILD)'],
  ['人工同步偏置测试 (Δt_sync)','Manual Sync Offset Test (Δt_sync)'],
  ['5. 实时定量基准遥测 (Live Telemetry)','5. Live Quantitative Benchmark Telemetry'],
  ['AV DeSync (音画同步误差)','AV DeSync (Audio-Visual Offset)'],
  ['60s Peak VRAM (显存开销)','60s Peak VRAM (Memory Footprint)'],
  ['6. 标准化音画控制契约 (AUDIOVISUAL_FOLEY_SPEC.json)','6. Standardized Audio-Visual Contract (AUDIOVISUAL_FOLEY_SPEC.json)'],
  ['音画场景与双流架构控制','Audio-Visual Scene &amp; Dual-Stream Architecture Controls'],
  ['实时音画同步渲染视口与多轨频谱','Real-Time Audio-Visual Viewport &amp; Multi-Track Spectrum'],
  ['60秒长时序时间轴','60-Second Long-Horizon Timeline'],
  ['跨模态控制参数与遥测','Cross-Modal Control Parameters &amp; Telemetry']
];

function localizeFoleyStudies(){
  for(const dir of ['animation','generative-visual-lab']){
    for(const suffix of ['.html','.en.html']){
      const file=`${dir}/research/audiovisual-foley-framepack-study${suffix}`;
      let html=gitShow('8b9f876',file);
      html=html.replace(/<!doctype html><html lang="zh-CN">[\s\S]*?<link rel="stylesheet" href="\.\.\/assets\/theme\.css">\s*/i,'');
      if(suffix==='.en.html'){
        html=html.replace('← 实验室','← Lab');
      }
      fs.writeFileSync(path.join(root,file),html);
    }
  }
}

function localizeFoleyReports(){
  for(const dir of ['animation','generative-visual-lab']){
    const file=`${dir}/demos/audiovisual-foley-studio/test-report-cards.html`;
    const base=gitShow('8b9f876',file);
    const enHtml=base
      .replace(/<html lang="[^"]+"/,'<html lang="en"')
      .replace('← 返回音画拟音工作台','← Back to AV Foley Studio')
      .replace('📖 阅读中英研究专著','📖 Read Architecture Study');
    const zhHtml=base
      .replace(/<html lang="[^"]+"/,'<html lang="zh-CN"')
      .replace('<title>7-Card 4:5 Benchmark Report · Native Audio-Visual Joint DiT &amp; FramePack Foley Studio</title>','<title>7-Card 4:5 基准评测报告 · 原生音画联合 DiT 与 FramePack 物理拟音导演台</title>');
    fs.writeFileSync(path.join(root,file),zhHtml);
    fs.writeFileSync(path.join(root,file.replace('.html','.en.html')),enHtml);
  }
}

function localizeFoleyDemos(){
  for(const dir of ['animation','generative-visual-lab']){
    const file=`${dir}/demos/audiovisual-foley-studio/index.html`;
    const zhHtml=gitShow('8b9f876',file);
    let enHtml=zhHtml.replace(/<html lang="[^"]+"/,'<html lang="en">'.slice(0,-1));
    for(const [zh,en] of foleyDemoReplacements){
      enHtml=enHtml.split(zh).join(en);
    }
    fs.writeFileSync(path.join(root,file),zhHtml);
    fs.writeFileSync(path.join(root,file.replace('.html','.en.html')),enHtml);
  }
}

const brandLoraEnHtml = `<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise Brand IP &amp; Hero SKU LoRA Dataset Hygiene Workbench · DINOv2 Dedup + Trigger Disentanglement + Masked Loss</title>
    <script type="module" crossorigin src="../../assets/brandLoraTrainingDatasetDedupCaptionHygiene-BPqU12Sl.js"></script>
    <link rel="modulepreload" crossorigin href="../../assets/modulepreload-polyfill-B5Qt9EMX.js">
    <link rel="stylesheet" crossorigin href="../../assets/brandLoraTrainingDatasetDedupCaptionHygiene-Dspbq0cw.css">
  </head>
  <body>
    <main class="rig-shell">
      <header class="rig-header">
        <div>
          <p class="eyebrow">ENTERPRISE BRAND IP &amp; SKU LORA TRAINING HYGIENE · DINOV2 DEDUP + CAPTION TRIGGER DISENTANGLEMENT + MASKED LOSS · C_ACTIVE/C_LORA = 1.0000×</p>
          <h1>Enterprise Mascot &amp; Brand Style LoRA (Flux / Wan 2.2) Dataset Hygiene Pipeline: DINOv2 Near-Duplicate Pruning + Trigger Attribute Disentanglement + Alpha Masked Loss</h1>
          <p class="subtitle">Designed for Cloud &amp; AI Solution Architects building enterprise AIGC brand studios: feeding uncurated mascot or product shoots directly into naive LoRA scripts causes pose rigidity from near-duplicate bursts and severe concept bleeding from studio backdrops or props, doubling retraining cost to <code>2.0000×</code> across 16/17 stages. Combining DINOv2 cosine deduplication (&gt;0.92 pruned), explicit variable-attribute captioning, foreground alpha-masked loss, and Pareto checkpoint selection locks 0% background bleed and <code>C_active / C_lora = 1.0000×</code> across all 17 stages.</p>
        </div>
        <div class="header-links">
          <a class="chip-link" href="../../index.en.html">← Back to Visual Lab Portal</a>
          <a class="chip-link" href="../../research/brand-lora-training-dataset-dedup-caption-hygiene-faq.en.html">Selection FAQ (EN)</a>
          <a class="chip-link" href="./test-report-cards.html">7-Card Benchmark</a>
        </div>
      </header>
      <section class="control-bar" aria-label="Enterprise LoRA dataset hygiene and hyperparameter controls">
        <div class="control-group">
          <label for="preset-select">1. LoRA Data Engineering Architecture Preset</label>
          <select id="preset-select">
            <option value="dinov2_dedup_disentangled_masked_lora_lock">DINOv2 Dedup + Trigger Disentanglement + Masked Loss (C/C_lora = 1.0000×, 0/17 Bleed)</option>
            <option value="naive_uncurated_dataset_concept_bleed">Naive Uncurated Dataset Concept Bleed &amp; Pose Lock (2.0000× Retrain Cost, 16/17 Violated)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="station-slider">2. Brand Asset Diversity &amp; Generalization Stage <code>k</code> (<span id="station-label">Stage 8 · u = 0.5000</span>)</label>
          <input id="station-slider" type="range" min="0" max="16" step="1" value="8" />
        </div>
        <div class="control-group">
          <label for="target-select">3. Target Brand Asset &amp; Foundation Model</label>
          <select id="target-select">
            <option value="flux_3d_brand_mascot">3D Brand Mascot Multi-Pose Generalization (Flux.1-dev Rank-16 + Masked Loss)</option>
            <option value="wan22_hero_product_sku">Hero Consumer Electronics / Cosmetics 360° Turntable (Wan 2.2 14B Video LoRA)</option>
            <option value="enterprise_ui_illustration_style">Enterprise UI Illustration Style LoRA (Zero Object Leakage)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="theme-toggle">4. Viewport Theme</label>
          <button id="theme-toggle" type="button" class="toggle-btn">Toggle Light / Dark Theme</button>
        </div>
      </section>
      <section class="kpi-strip" aria-label="Core LoRA generalization and training budget metrics">
        <article class="kpi-card">
          <span class="kpi-title">Current LoRA Data Engineering Stage</span>
          <strong class="kpi-value" id="kpi-station-name">Stage 8 · Caption Attribute Disentanglement</strong>
          <span class="kpi-sub" id="kpi-u-readout">u = 0.5000 · L(u) = 1.5000×</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Amortized R&amp;D Cost Ratio c_lora(u)</span>
          <strong class="kpi-value" id="kpi-clora">0.6667×</strong>
          <span class="kpi-sub" id="kpi-quad-err">64-cluster feature manifold error &lt; 1e-12</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Generalization &amp; Budget Ratio (C_active / C_lora)</span>
          <strong class="kpi-value" id="kpi-active-ratio">1.0000×</strong>
          <span class="kpi-sub" id="kpi-status-badge">0% Background Bleed + Free Pose Editing (0/17 Overfit)</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Stage 4 / 8 / 16 vs Naive Training</span>
          <strong class="kpi-value" id="kpi-benchmark-summary">1.0000× vs 1.25 / 1.50 / 2.00×</strong>
          <span class="kpi-sub" id="kpi-target-readout">DINOv2 Sim &lt;= 0.92 + Masked Loss + Trigger Disentangle</span>
        </article>
      </section>
      <section class="workbench-grid">
        <div class="canvas-panel">
          <div class="panel-header">
            <h2>Isometric Enterprise Brand LoRA Dataset Hygiene &amp; Anti-Overfit Workbench (58 Modules · 17 Stages)</h2>
            <span class="badge" id="canvas-mode-badge">Layer 1 DINOv2 Dedup &amp; View Balance → Layer 2 Trigger Disentangle &amp; Alpha Masked Loss → Layer 3 Pareto Checkpoint</span>
          </div>
          <svg id="lora-stage-svg" viewBox="0 0 920 500" role="img" aria-label="Enterprise Brand LoRA Dataset Hygiene Workbench"></svg>
        </div>
        <aside class="telemetry-panel">
          <h2>Stage Feature Disentanglement &amp; Generalization Audit</h2>
          <dl class="metric-list">
            <div><dt>Stage Code &amp; Hygiene Task</dt><dd id="tel-stage-code">STAGE-08 · Caption Disentangle</dd></div>
            <div><dt>Background &amp; Prop Concept Bleed Rate</dt><dd id="tel-bleed-rate">0.00% (Foreground alpha mask isolates subject loss)</dd></div>
            <div><dt>Dedup &amp; Captioning Policy</dt><dd id="tel-hygiene-policy">DINOv2 Sim &gt; 0.92 pruned + variable outfits/scenes tagged</dd></div>
            <div><dt>Identity (DINO) vs Editability (CLIP)</dt><dd id="tel-pareto-score">Identity DINO 0.942 + Editability CLIP 0.348 (Pareto Optimal)</dd></div>
            <div><dt>Compute &amp; Curation Savings vs Naive</dt><dd id="tel-savings">-33.3% GPU &amp; curation cost (-50.0% at Stage 16)</dd></div>
          </dl>
          <h3>17-Stage Enterprise LoRA Training Cost Envelope</h3>
          <div class="table-scroll">
            <table class="audit-table">
              <thead><tr><th>Stage</th><th>u</th><th>c_lora(u)</th><th>Curated LoRA</th><th>Naive Run</th></tr></thead>
              <tbody id="audit-table-body"></tbody>
            </table>
          </div>
        </aside>
      </section>
    </main>
  </body>
</html>
`;

const cadBimEnHtml = `<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Architectural &amp; Retail CAD/BIM to Photoreal Visualization Studio · M-LSD + Normal + Depth ControlNet + Material Swatch Lock</title>
    <script type="module" crossorigin src="../../assets/cadBimSketchToPhotorealArchitecturalControlnet-BiSY-eQn.js"></script>
    <link rel="modulepreload" crossorigin href="../../assets/modulepreload-polyfill-B5Qt9EMX.js">
    <link rel="stylesheet" crossorigin href="../../assets/cadBimSketchToPhotorealArchitecturalControlnet-yBOrbo2F.css">
  </head>
  <body>
    <main class="rig-shell">
      <header class="rig-header">
        <div>
          <p class="eyebrow">ENTERPRISE ARCHITECTURAL &amp; RETAIL CAD/BIM VISUALIZATION · M-LSD STRAIGHT-EDGE + NORMAL + DEPTH LOCK + MATERIAL SWATCH BIND · C_ACTIVE/C_BIM = 1.0000×</p>
          <h1>Architectural &amp; Retail Store CAD/BIM to Photoreal Pipeline: M-LSD Vanishing-Point Lock + Triple-Channel ControlNet + PBR Material Swatch Binding</h1>
          <p class="subtitle">Designed for Cloud &amp; AI Solution Architects serving commercial real estate, 500+ retail store rollouts, and AEC design institutes: unconstrained Img2Img (denoise ≥ 0.65) warps load-bearing curtain-wall mullions (&gt;2.8° tilt), erases fire exits, and alters client-specified terrazzo or anodized aluminum swatches, doubling rework cost to <code>2.0000×</code> by Stage 16. Combining M-LSD straight-edge locking (&lt;0.08° error), camera-space Normal + 16-bit Depth ControlNet Union, IP-Adapter PBR swatch binding, and solar sky relighting locks zero structural drift across all 17 stages.</p>
        </div>
        <div class="header-links">
          <a class="chip-link" href="../../index.en.html">← Back to Visual Lab Portal</a>
          <a class="chip-link" href="../../research/cad-bim-sketch-to-photoreal-architectural-controlnet-faq.en.html">Selection FAQ (EN)</a>
          <a class="chip-link" href="./test-report-cards.html">7-Card Benchmark</a>
        </div>
      </header>
      <section class="control-bar" aria-label="Architectural CAD/BIM geometry and material rendering controls">
        <div class="control-group">
          <label for="preset-select">1. Structural Lock &amp; Material Architecture Preset</label>
          <select id="preset-select">
            <option value="mlsd_normal_depth_swatch_bim_lock">M-LSD + Normal/Depth Triple Lock + PBR Swatch Bind (C/C_bim = 1.0000×, 0/17 Drift)</option>
            <option value="naive_unconstrained_img2img_wall_warp">Naive High-Denoise Img2Img Mullion Warp &amp; Perspective Collapse (2.0000× Rework, 16/17 Violated)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="station-slider">2. Facade Structural Complexity &amp; Solar Lighting Stage <code>k</code> (<span id="station-label">Stage 8 · u = 0.5000</span>)</label>
          <input id="station-slider" type="range" min="0" max="16" step="1" value="8" />
        </div>
        <div class="control-group">
          <label for="solar-select">3. Solar Azimuth &amp; Commercial Lighting Rig</label>
          <select id="solar-select">
            <option value="golden_hour_35deg">Golden Hour Warm Sun (Azimuth 245° / Elev 14° + Interior Warm Glow)</option>
            <option value="overcast_museum_soft">Overcast Museum Soft Sky (Omnidirectional HDRI · True Swatch Inspection)</option>
            <option value="rainy_night_neon_flagship">Rainy Night Urban Flagship Storefront (Wet Specular Ground + Display Spotlights)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="theme-toggle">4. Viewport Theme</label>
          <button id="theme-toggle" type="button" class="toggle-btn">Toggle Light / Dark Theme</button>
        </div>
      </section>
      <section class="kpi-strip" aria-label="Core structural fidelity and visualization budget metrics">
        <article class="kpi-card">
          <span class="kpi-title">Current Architectural Stage</span>
          <strong class="kpi-value" id="kpi-station-name">Stage 8 · IP-Adapter PBR Material Swatch Binding</strong>
          <span class="kpi-sub" id="kpi-u-readout">u = 0.5000 · B(u) = 1.5000×</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Amortized Render Cost Ratio c_bim(u)</span>
          <strong class="kpi-value" id="kpi-cbim">0.6667×</strong>
          <span class="kpi-sub" id="kpi-quad-err">64-patch perspective geometry error &lt; 1e-12</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Mullion Plumb Error &amp; Budget Ratio (C_active / C_bim)</span>
          <strong class="kpi-value" id="kpi-active-ratio">1.0000×</strong>
          <span class="kpi-sub" id="kpi-status-badge">Plumb Error &lt;0.08° + Swatch Locked (0/17 Warp)</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Stage 4 / 8 / 16 vs Naive Img2Img</span>
          <strong class="kpi-value" id="kpi-benchmark-summary">1.0000× vs 1.25 / 1.50 / 2.00×</strong>
          <span class="kpi-sub" id="kpi-solar-readout">M-LSD w=0.90 + Depth w=0.85 + Normal w=0.80</span>
        </article>
      </section>
      <section class="workbench-grid">
        <div class="canvas-panel">
          <div class="panel-header">
            <h2>Isometric Architectural &amp; Retail CAD/BIM Triple-Lock Visualization Studio (58 Modules · 17 Stages)</h2>
            <span class="badge" id="canvas-mode-badge">Layer 1 Revit/SketchUp Pass Extraction → Layer 2 M-LSD/Normal/Depth + Swatch Lock → Layer 3 Solar Relighting</span>
          </div>
          <svg id="bim-stage-svg" viewBox="0 0 920 500" role="img" aria-label="Architectural CAD/BIM Multi-ControlNet Visualization Studio"></svg>
        </div>
        <aside class="telemetry-panel">
          <h2>Structural Plumb &amp; Material Swatch Audit</h2>
          <dl class="metric-list">
            <div><dt>Stage Code &amp; AEC Task</dt><dd id="tel-stage-code">STAGE-08 · Swatch Bind</dd></div>
            <div><dt>M-LSD Vertical &amp; Vanishing-Point Error</dt><dd id="tel-line-error">0.05° (Meets &lt;0.08° architectural tolerance)</dd></div>
            <div><dt>Triple-Channel ControlNet Weights</dt><dd id="tel-control-weights">M-LSD 0.90 / Depth 0.85 / Normal 0.80 (Stop@0.85)</dd></div>
            <div><dt>PBR Swatch &amp; Fenestration Preservation</dt><dd id="tel-swatch-policy">100% door/window openings preserved + IP-Adapter stone/wood swatch</dd></div>
            <div><dt>Rework Savings vs Naive Img2Img</dt><dd id="tel-savings">-33.3% rework cost (-50.0% at Stage 16)</dd></div>
          </dl>
          <h3>17-Stage CAD/BIM Structural Lock &amp; Visualization Cost Envelope</h3>
          <div class="table-scroll">
            <table class="audit-table">
              <thead><tr><th>Stage</th><th>u</th><th>c_bim(u)</th><th>Triple-Lock BIM</th><th>Naive Img2Img</th></tr></thead>
              <tbody id="audit-table-body"></tbody>
            </table>
          </div>
        </aside>
      </section>
    </main>
  </body>
</html>
`;

function localizeRetainedVisualDemos() {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'generative-visual-lab/nightly-visual-2026-11-18.json'), 'utf8'));
  for (const round of manifest.rounds) {
    for (const lab of ['animation', 'generative-visual-lab']) {
      const demoDir = path.join(root, lab, 'demos', round.slug);
      const indexFile = path.join(demoDir, 'index.html');
      if (!fs.existsSync(indexFile)) continue;
      if (round.slug === 'brand-lora-training-dataset-dedup-caption-hygiene-workbench' || round.slug === 'cad-bim-sketch-to-photoreal-architectural-controlnet-studio') {
        let zhHtml = fs.readFileSync(indexFile, 'utf8')
          .replace(/<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?\/>\s*/i, '')
          .replace(/← 返回 \d+ 演示门户/g, '← 返回视觉实验室门户');
        fs.writeFileSync(indexFile, zhHtml);
        const enHtml = round.slug.startsWith('brand-lora') ? brandLoraEnHtml : cadBimEnHtml;
        fs.writeFileSync(path.join(demoDir, 'index.en.html'), enHtml);
      } else {
        let enHtml = fs.readFileSync(indexFile, 'utf8')
          .replace(/<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?\/>\s*/i, '')
          .replace(/Round \d+\s*[·•-]\s*/g, '');
        fs.writeFileSync(indexFile, enHtml);
        const zhHtml = enHtml
          .replace(/<html lang="[^"]*"/i, '<html lang="zh-CN"')
          .replace(/<title>[\s\S]*?<\/title>/i, `<title>${round.title_zh}</title>`);
        fs.writeFileSync(path.join(demoDir, 'index.zh.html'), zhHtml);
      }
      // Clean Round NNN from test-report-cards titles as well
      for (const rep of ['test-report-cards.html', 'test-report-cards.zh.html']) {
        const repPath = path.join(demoDir, rep);
        if (fs.existsSync(repPath)) {
          const cleaned = fs.readFileSync(repPath, 'utf8').replace(/Round \d+\s*[·•:—-]\s*/g, '');
          fs.writeFileSync(repPath, cleaned);
        }
      }
    }
  }
}

function main(){
 const baseline=gitShow('941ee62d1f55dfe8bd8dfbf82e4d2a7bd34ed0a1',source);
 for(const en of [true,false]){
  let html=baseline.replace(/<html lang="[^"]+"/,`<html lang="${en?'en':'zh-CN'}"`).replace(/<title>[\s\S]*?<\/title>/,`<title>${en?'Azure VM modernization workshop — moved':'Azure VM 现代化工作坊 — 迁移入口'}</title>`);
  html=html.replace(/<main>[\s\S]*?<\/main>/,`<main><h1>${en?'Azure VM modernization workshop':'Azure VM 现代化工作坊'}</h1><p>${en?'The workshop is maintained in the public Azure Infra Lab. This compatibility entry forwards to the original workshop and preserves your query parameters and section.':'工作坊现由公开的 Azure Infra Lab 维护。此兼容入口将跳转到原工作坊，并保留查询参数和章节位置。'}</p><p><a id="moved-to" href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/workshop.html?lang=${en?'en':'zh-CN'}">${en?'Open the workshop':'打开工作坊'}</a></p><p><a href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/calculator.html?lang=${en?'en':'zh-CN'}">${en?'FinOps calculator':'FinOps 计算器'}</a> · <a href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/demo.html?lang=${en?'en':'zh-CN'}">${en?'Interactive demo':'交互演示'}</a> · <a href="https://github.com/turbo998/Azure-Infra-Lab/tree/main/workshops/azure-vm-modernization">${en?'Source repository':'源码仓库'}</a></p><noscript><p>${en?'JavaScript is disabled. Use the native links above to continue.':'JavaScript 已关闭，请使用上方链接继续。'}</p></noscript></main>`);
  html=html.replace('target.hash = window.location.hash;',`if (!target.searchParams.has("lang")) target.searchParams.set("lang", "${en?'en':'zh-CN'}");\n    target.hash = window.location.hash;`);
  fs.writeFileSync(path.join(root,en?source:source.replace('.html','.zh.html')),html);
 }
 localizeFoleyStudies();
 localizeFoleyReports();
 localizeFoleyDemos();
 localizeRetainedVisualDemos();
 require('./localization/harness-workbenches.cjs').localizeHarnessWorkshops();
 console.log('Localized VM compatibility entry, retained visual studios, and harness workbenches in English and Chinese');
}
if(require.main===module)main();
module.exports={main};
