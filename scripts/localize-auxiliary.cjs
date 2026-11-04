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

function localizePhase180Report(){
  const file='workshops/benchmarks/ai-infra-phase180-benchmark-cards.html';
  const base=gitShow('8b9f876',file).replace(/<!-- phase179-note:start -->[\s\S]*?<!-- phase179-note:end -->\s*/g,'');
  const enHtml=base.replace(/<html lang="[^"]+"/,'<html lang="en"');
  const zhHtml=base
    .replace(/<html lang="[^"]+"/,'<html lang="zh-CN"')
    .replace('<title>Phase 180 7-Card Visual Report — Agent Sandbox &amp; Execution Plane</title>','<title>Phase 180 7-Card 评测报告 — 智能体沙盒与执行平面基准</title>')
    .replace('Agent Sandbox &amp; Execution Plane: Firecracker vs Kata vs gVisor vs Wasm','智能体沙盒与执行平面：Firecracker vs Kata vs gVisor vs Wasm 定量基准');
  fs.writeFileSync(path.join(root,file),enHtml);
  fs.writeFileSync(path.join(root,file.replace('.html','.zh.html')),zhHtml);
}

function localizeCycle378Workbench(){
  const file='workshops/azure-agent-infra/workbench-cycle-378.html';
  const base=gitShow('8b9f876',file)
    .replace('.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}','.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:768px){.grid{grid-template-columns:1fr}}')
    .replace('.sub{color:#93c5fd;margin-bottom:14px}','.sub{color:#bfd6ff;margin-bottom:14px}')
    .replace('<body><div class="wrap">',`<body>${professional.navigation({file,en:true,className:'kee-dedicated-nav'})}<div class="wrap">`);
  const zhHtml=base
    .replace(/<html lang="[^"]+"/,'<html lang="zh-CN"')
    .replace('<title>Cycle #378 Workbench · Azure Agent Infra</title>','<title>Cycle #378 交互工作台 · Azure 智能体基础设施</title>')
    .replace('<h1>Cycle #378 Interactive Workbench</h1>','<h1>Cycle #378 交互式基准工作台</h1>')
    .replace('Runtime/Sandbox benchmark explorer with source labels and deterministic session-cost model.','运行时与沙盒基准浏览器（含来源标签与确定性单会话成本模型）。');
  fs.writeFileSync(path.join(root,file),base);
  fs.writeFileSync(path.join(root,file.replace('.html','.zh.html')),zhHtml);
}

function localizeCycle379Workbench(){
  const file='workshops/azure-agent-infra/workbench-cycle-379.html';
  if(!fs.existsSync(path.join(root,file)))return;
  const base=gitShow('97e12f2',file)
    .replace('.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}','.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:768px){.grid{grid-template-columns:1fr}}')
    .replace('.sub{color:#93c5fd;margin-bottom:14px}','.sub{color:#bfd6ff;margin-bottom:14px}')
    .replace('<body><div class="wrap">',`<body>${professional.navigation({file,en:true,className:'kee-dedicated-nav'})}<div class="wrap">`);
  const zhHtml=base
    .replace(/<html lang="[^"]+"/,'<html lang="zh-CN"')
    .replace('<title>Cycle #379 Workbench · Azure Agent Infra</title>','<title>Cycle #379 交互工作台 · Azure 智能体基础设施</title>')
    .replace('<h1>Cycle #379 Interactive Workbench</h1>','<h1>Cycle #379 交互式基准工作台</h1>')
    .replace('Runtime/Sandbox benchmark explorer with source labels and deterministic session-cost model.','运行时与沙盒基准浏览器（含来源标签与确定性单会话成本模型）。');
  fs.writeFileSync(path.join(root,file),base);
  fs.writeFileSync(path.join(root,file.replace('.html','.zh.html')),zhHtml);
}

function localizeCycle380Workbench(){
  const file='workshops/azure-agent-infra/workbench-cycle-380.html';
  if(!fs.existsSync(path.join(root,file)))return;
  const base=gitShow('6dc9dd8',file)
    .replace('.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}','.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:768px){.grid{grid-template-columns:1fr}}')
    .replace('.sub{color:#93c5fd;margin-bottom:14px}','.sub{color:#bfd6ff;margin-bottom:14px}')
    .replace('<body><div class="wrap">',`<body>${professional.navigation({file,en:true,className:'kee-dedicated-nav'})}<div class="wrap">`);
  const zhHtml=base
    .replace(/<html lang="[^"]+"/,'<html lang="zh-CN"')
    .replace('<title>Cycle #380 Workbench · Azure Agent Infra</title>','<title>Cycle #380 交互工作台 · Azure 智能体基础设施</title>')
    .replace('<h1>Cycle #380 Interactive Workbench</h1>','<h1>Cycle #380 交互式基准工作台</h1>')
    .replace('Runtime/Sandbox benchmark explorer with source labels and deterministic session-cost model.','运行时与沙盒基准浏览器（含来源标签与确定性单会话成本模型）。');
  fs.writeFileSync(path.join(root,file),base);
  fs.writeFileSync(path.join(root,file.replace('.html','.zh.html')),zhHtml);
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
 localizePhase180Report();
 localizeCycle378Workbench();
 localizeCycle379Workbench();
 localizeCycle380Workbench();
 console.log('Localized VM compatibility entry and 8b9f876 nightly editions in English and Chinese');
}
if(require.main===module)main();
module.exports={main};
