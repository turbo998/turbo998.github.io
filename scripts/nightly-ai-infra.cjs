const fs = require('node:fs');
const path = require('node:path');
const ui = require('./hub-layout.cjs');
const archive = require('../assets/data/ai-infra-nightly-2026-11-13.json');
const base = 'workshops/benchmarks/ai-infra-nightly-2026-11-13';
const page = zh => `${base}${zh?'':'.en'}.html`;
function resource(zh) {
  const first = archive.rounds[0].round;
  const last = archive.rounds.at(-1).round;
  return {
    id:'ai-infra-nightly-2026-11-13',track:'infra',
    stages:['architecture','evaluation','demos','resources'],
    badge:['AI INFRA / NIGHTLY ARCHIVE','AI 基础设施 / 夜班归档'],
    title:['Independent AI Infra contract studies','独立 AI Infra 底层契约研究'],
    finding:[`${archive.rounds.length} studies · Rounds ${first}–${last} · 2026-11-13`,
      `${archive.rounds.length} 项专题 · Rounds ${first}–${last} · 2026-11-13`],
    description:['Bilingual architecture FAQs, original calculators, SVGs and sealed seven-card reports. Synthetic studies; original CPU timings are separately labeled. No new GPU or production benchmark.',
      '中英双语架构 FAQ、原创计算器、SVG 与封存七卡报告。合成研究与原创 CPU 计时分开标注，不冒充新的 GPU 或生产基准。'],
    links:[{label:['Explore the complete archive','浏览完整归档'],url:page(zh)},
      {label:['Source repository','源码仓库'],url:archive.source_repository}],
  };
}
function landing(zh) {
  const locale = zh?'zh':'en';
  const file = page(zh);
  const t = (en,cn) => zh?cn:en;
  const rows = archive.rounds.map(round => {
    const links = [
      [t('Architecture FAQ','架构 FAQ'),round.faq[locale]],
      [t('Interactive workbench (English)','交互工作台（英文）'),round.files.workbench.path],
      [t('Seven cards (English)','七卡报告（英文）'),round.files.cards.path],
      [t('Original SVG','原创 SVG'),round.files.figure.path],
      [t('Sealed report JSON','封存报告 JSON'),round.files.report.path],
      [t('Source commit','源码 Commit'),`${archive.source_repository}/commit/${round.commit}`],
    ];
    if(round.files.latency) links.push([t('Original CPU records','原创 CPU 记录'),round.files.latency.path]);
    return `<article><p class="round">ROUND ${round.round}</p><h2>${ui.esc(round.title[locale])}</h2><p>${ui.esc(round.summary[locale])}</p><nav aria-label="${t('Round','专题')} ${round.round}">${links.map(([label,url])=>`<a href="${ui.esc(ui.href(file,url))}">${ui.esc(label)}</a>`).join('')}</nav><p class="sha">SHA ${round.commit}</p></article>`;
  }).join('\n');
  return `<!doctype html>
<html lang="${zh?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><title>${t('AI Infra nightly archive','AI Infra 夜班研究归档')} · 2026-11-13</title><style>
*{box-sizing:border-box}body{margin:0;background:#f1f5f9;color:#0f172a;font:17px/1.65 system-ui,sans-serif}main{max-width:1120px;margin:auto;padding:40px 24px}a{color:#1d4ed8;text-underline-offset:3px}h1{font-size:clamp(30px,5vw,54px);line-height:1.15}h2{font-size:24px;line-height:1.35}.intro{background:#0f172a;color:#e2e8f0;border-radius:20px;padding:28px}.intro a{color:#93c5fd}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr));gap:22px;margin-top:28px}article{background:white;border:1px solid #cbd5e1;border-radius:16px;padding:24px;overflow-wrap:anywhere}.round{font-size:13px;font-weight:800;letter-spacing:.12em;color:#475569}nav{display:flex;flex-wrap:wrap;gap:12px 20px}.sha{font:12px/1.5 ui-monospace,monospace;color:#475569}a:focus-visible{outline:3px solid #f59e0b;outline-offset:4px}</style></head>
<body><main><nav><a href="../../${zh?'zh.html':'index.html'}">${t('Home','首页')}</a><a href="../../studio/${zh?'zh-':''}infra.html">AI Infra</a><a href="${path.posix.basename(page(!zh))}" lang="${zh?'en':'zh-CN'}">${zh?'English':'中文'}</a></nav><header><p>2026-11-13 · ROUNDS ${archive.rounds[0].round}–${archive.rounds.at(-1).round}</p><h1>${t('Small contracts. Large architecture consequences.','小契约，决定大架构。')}</h1></header>
<section class="intro"><h2>${t(`${archive.rounds.length} independent studies, original evidence preserved`,`${archive.rounds.length} 项独立专题，保留原创证据`)}</h2><p>${t('Bilingual FAQs live in the source repository. Visual reports and workbenches below are byte-identical public copies. Reports are synthetic, independently_reproduced=false; original CPU timing records are separately measured. No native GPU regression, model-quality or production-throughput result is implied.','双语 FAQ 保存在源码仓库；下列视觉报告与工作台是逐字节一致的公开副本。报告标记 synthetic、independently_reproduced=false；原创 CPU 记录单独实测。不暗示 native GPU 回归、模型质量或生产吞吐结果。')}</p><p>${t('Calculators expose selected assumptions, not production guarantees. Copied interactive and visual artifacts retain their original English interface; both FAQ editions are available.','计算器展示选定假设，不承诺生产结果。复制的交互与视觉资产保留原始英文界面，同时提供双语 FAQ。')}</p><a href="../../assets/data/ai-infra-nightly-2026-11-13.json">${t('Public artifact hashes and source commits','公开资产哈希与源码提交')}</a></section><div class="grid">${rows}</div></main></body></html>\n`;
}
function build(root) {
  for(const zh of [false,true]) fs.writeFileSync(path.join(root,page(zh)),landing(zh));
  const targets = [
    ['index.html',false,['workbenches']],['zh.html',true,['workbenches']],
    ['studio/index.html',false,['workbenches']],['studio/zh-index.html',true,['workbenches']],
    ['studio/infra.html',false,ui.sections.map(([stage])=>stage)],
    ['studio/zh-infra.html',true,ui.sections.map(([stage])=>stage)],
  ];
  for(const [file,zh,sections] of targets) {
    const target = path.join(root,file);
    let html = fs.readFileSync(target,'utf8');
    for(const section of sections) {
      const id = `${section==='workbenches'?'featured':section}-ai-infra-nightly-2026-11-13`;
      const card = ui.card(file,zh,{...resource(zh),id,number:'NIGHT / 11-13',url:page(zh)});
      const old = new RegExp(`<article\\b[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<\\/article>`);
      if(old.test(html)) html=html.replace(old,()=>card);
      else {
        const hook = new RegExp(`(<section id="${section}"[\\s\\S]*?<div class="card-grid [^"]*">)`);
        if(!hook.test(html)) throw Error(`Missing ${section} card grid in ${file}`);
        html=html.replace(hook,match=>match+card);
      }
    }
    fs.writeFileSync(target,html);
  }
}
module.exports = {resource,landing,build,page};
if(require.main===module) build(path.resolve(__dirname,'..'));
