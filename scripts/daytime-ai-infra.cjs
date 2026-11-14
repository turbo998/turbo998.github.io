const fs = require('node:fs');
const path = require('node:path');
const ui = require('./hub-layout.cjs');
const archive = require('../assets/data/ai-infra-daytime-2026-11-14.json');
const id = 'ai-infra-daytime-2026-11-14';
const page = zh => `workshops/benchmarks/${id}${zh?'':'.en'}.html`;
function resource(zh) {
  const first=archive.rounds[0].round,last=archive.rounds.at(-1).round;
  return {
    id,track:'infra',stages:['architecture','evaluation','demos','resources'],
    badge:['AI INFRA / DAYTIME ARCHIVE','AI 基础设施 / 白班归档'],
    title:['AI Infra daytime contract studies','AI Infra 白班独立契约研究'],
    finding:[`${archive.rounds.length} studies · Rounds ${first}–${last} · 2026-11-14`,`${archive.rounds.length} 项专题 · Rounds ${first}–${last} · 2026-11-14`],
    description:['Bilingual independent architecture FAQs, original calculators, SVGs and sealed seven-card reports. Synthetic models and separately measured original CPU records—not native GPU or production results.',
      '双语独立架构 FAQ、原创计算器、SVG 与封存七卡报告。合成模型与原创 CPU 记录分开标注，不冒充 native GPU 或生产结果。'],
    links:[{label:['Explore the complete daytime archive','浏览白班完整归档'],url:page(zh)},
      {label:['Source repository','源码仓库'],url:archive.source_repository}],
  };
}
function landing(zh) {
  const locale=zh?'zh':'en',file=page(zh),t=(en,cn)=>zh?cn:en;
  const rows=archive.rounds.map(round=>{
    const links=[
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
<html lang="${zh?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><title>${t('AI Infra daytime archive','AI Infra 白班研究归档')} · 2026-11-14</title><style>
*{box-sizing:border-box}body{margin:0;background:#f1f5f9;color:#0f172a;font:17px/1.65 system-ui,sans-serif}main{max-width:1120px;margin:auto;padding:40px 24px}a{color:#1d4ed8;text-underline-offset:3px}h1{font-size:clamp(30px,5vw,54px);line-height:1.15}h2{font-size:24px;line-height:1.35}.intro{background:#0f172a;color:#e2e8f0;border-radius:20px;padding:28px}.intro a{color:#93c5fd}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr));gap:22px;margin-top:28px}article{background:white;border:1px solid #cbd5e1;border-radius:16px;padding:24px;overflow-wrap:anywhere}.round{font-size:13px;font-weight:800;letter-spacing:.12em;color:#475569}nav{display:flex;flex-wrap:wrap;gap:12px 20px}.sha{font:12px/1.5 ui-monospace,monospace;color:#475569}a:focus-visible{outline:3px solid #f59e0b;outline-offset:4px}</style></head>
<body><main><nav><a href="../../${zh?'zh.html':'index.html'}">${t('Home','首页')}</a><a href="../../studio/${zh?'zh-':''}infra.html">AI Infra</a><a href="${path.posix.basename(page(!zh))}" lang="${zh?'en':'zh-CN'}">${zh?'English':'中文'}</a></nav><header><p>2026-11-14 · ROUNDS ${archive.rounds[0].round}–${archive.rounds.at(-1).round}</p><h1>${t('Architecture choices begin with exact contracts.','架构选型，从精确契约开始。')}</h1></header>
<section class="intro"><h2>${t(`${archive.rounds.length} independent studies, exact committed artifacts`,`${archive.rounds.length} 项独立专题，逐字节保留提交资产`)}</h2><p>${t('Bilingual FAQs live in the source repository. Reports and workbenches are byte-identical committed public copies. Synthetic, independently_reproduced=false; original CPU samples are separately measured. Native GPU, production performance and model quality are not inferred.','双语 FAQ 保存在源码仓库；报告与工作台来自逐字节一致的已提交公开副本。标记 synthetic、independently_reproduced=false；原创 CPU 样本单独实测，不推导 native GPU、生产性能或模型质量。')}</p><p>${t('Calculators expose selected assumptions, not production guarantees. Interactive/visual assets retain English interfaces; both FAQ editions are available.','计算器展示选定假设，不承诺生产结果。交互与视觉资产保留英文界面，同时提供双语 FAQ。')}</p><a href="../../assets/data/ai-infra-daytime-2026-11-14.json">${t('Public hashes and source commits','公开哈希与源码提交')}</a></section><div class="grid">${rows}</div></main></body></html>\n`;
}
function build(root) {
  for(const zh of [false,true]) fs.writeFileSync(path.join(root,page(zh)),landing(zh));
  const targets=[
    ['index.html',false,['workbenches']],['zh.html',true,['workbenches']],
    ['studio/index.html',false,['workbenches']],['studio/zh-index.html',true,['workbenches']],
    ['studio/infra.html',false,ui.sections.map(([stage])=>stage)],
    ['studio/zh-infra.html',true,ui.sections.map(([stage])=>stage)],
  ];
  for(const [file,zh,sections] of targets) {
    const target=path.join(root,file);let html=fs.readFileSync(target,'utf8');
    for(const section of sections) {
      const cardId=`${section==='workbenches'?'featured':section}-${id}`;
      const card=ui.card(file,zh,{...resource(zh),id:cardId,number:'DAY / 11-14',url:page(zh)});
      const old=new RegExp(`<article\\b[^>]*\\bid="${cardId}"[^>]*>[\\s\\S]*?<\\/article>`);
      if(old.test(html)) html=html.replace(old,()=>card);
      else {
        const hook=new RegExp(`(<section id="${section}"[\\s\\S]*?<div class="card-grid [^"]*">)`);
        if(!hook.test(html)) throw Error(`Missing ${section} card grid in ${file}`);
        html=html.replace(hook,match=>match+card);
      }
    }
    fs.writeFileSync(target,html);
  }
}
module.exports={resource,landing,build,page};
if(require.main===module) build(path.resolve(__dirname,'..'));
