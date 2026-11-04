const professional = require('./professional-navigation.cjs');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.join(__dirname, '..');
const baseline = 'ca3efb3';
const files = ['index.html', 'index.en.html', 'live-demo.html', 'live-demo.en.html', 'compare.html', 'compare.en.html'];
function webiqArchitectureFig(en) {
  return `<div class="fig" aria-label="Web IQ commerce architecture" data-knowledge-atlas="commerce">
    <svg viewBox="0 0 960 326" width="100%" role="img" style="display:block;width:100%;height:auto">
      <title>${en ? 'Web IQ passage grounding stays read-only; commerce authority decides money' : 'Web IQ 段落检索保持只读；商业裁决器决定资金授权'}</title>
      <rect width="960" height="326" rx="16" fill="#081424" stroke="#284466"/>
      <rect x="20" y="14" width="332" height="24" rx="12" fill="#102742" stroke="#2d5a88"/>
      <text x="34" y="30" fill="#56ddcd" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? 'WEB IQ × COMMERCE · END-TO-END DATA FLOW' : 'WEB IQ × 智能体商务 · 全链路数据流向与门禁'}</text>
      <text x="640" y="30" fill="#93c5fd" font-size="11.5" font-weight="600" font-family="Segoe UI,sans-serif">${en ? '──▶ Read-only evidence flow   ◆ Deterministic gate' : '──▶ 只读证据流向   ◆ 确定性商业门禁'}</text>
      <g>
        <rect x="20" y="50" width="206" height="156" rx="12" fill="#0e2036" stroke="#3b82f6" stroke-width="1.4"/>
        <rect x="20" y="50" width="206" height="5" rx="2.5" fill="#38bdf8"/>
        <text x="34" y="74" fill="#38bdf8" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? '01 · BUYER MANDATE' : '01 · 买方委托授权'}</text>
        <text x="34" y="98" fill="#f8fafc" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif">${en ? 'Mandate &amp; Ceiling' : '委托契约与上限'}</text>
        <text x="34" y="122" fill="#cbd5e1" font-size="12.5" font-family="Segoe UI,sans-serif">CheckoutStore</text>
        <text x="34" y="144" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• merchant / SKU / ceiling' : '• 商户 / SKU / 价格上限'}</text>
        <text x="34" y="164" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• scoped budget &amp; window' : '• 预算边界与退货窗口'}</text>
        <rect x="34" y="174" width="178" height="22" rx="6" fill="#091526" stroke="#234368"/>
        <text x="44" y="189" fill="#7dd3fc" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">${en ? '01→02 Grounded query' : '01→02 发起受控检索'}</text>
      </g>
      <path d="M228 128 H250" fill="none" stroke="#56ddcd" stroke-width="2.4"/>
      <path d="M244 123 L251 128 L244 133" fill="none" stroke="#56ddcd" stroke-width="2.4"/>
      <g>
        <rect x="254" y="50" width="212" height="156" rx="12" fill="#122640" stroke="#8b5cf6" stroke-width="1.4"/>
        <rect x="254" y="50" width="212" height="5" rx="2.5" fill="#a78bfa"/>
        <text x="268" y="74" fill="#c4b5fd" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? '02 · WEB IQ GROUNDING' : '02 · WEB IQ 只读接地'}</text>
        <text x="268" y="98" fill="#f8fafc" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif">Web IQ Browse / Web</text>
        <text x="268" y="122" fill="#cbd5e1" font-size="12.5" font-family="Segoe UI,sans-serif">passage + query (≤3000c)</text>
        <text x="268" y="144" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• caller-visible raw passage' : '• 调用方代码直接拿到段落'}</text>
        <text x="268" y="164" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• read-only evidence, no pay' : '• 只读证据输入，绝不付款'}</text>
        <rect x="268" y="174" width="184" height="22" rx="6" fill="#091526" stroke="#3c3468"/>
        <text x="278" y="189" fill="#c4b5fd" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">${en ? '02→03 Pre-LLM scrub' : '02→03 进模型前清洗核验'}</text>
      </g>
      <path d="M468 128 H490" fill="none" stroke="#56ddcd" stroke-width="2.4"/>
      <path d="M484 123 L491 128 L484 133" fill="none" stroke="#56ddcd" stroke-width="2.4"/>
      <g>
        <rect x="494" y="50" width="212" height="156" rx="12" fill="#0e2036" stroke="#10b981" stroke-width="1.4"/>
        <rect x="494" y="50" width="212" height="5" rx="2.5" fill="#34d399"/>
        <text x="508" y="74" fill="#6ee7b7" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? '03 · COMMERCE AUTHORITY' : '03 · 确定性商业裁决'}</text>
        <text x="508" y="98" fill="#f8fafc" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif">${en ? 'Authority &amp; 4-Guard' : '商业裁决与四态守卫'}</text>
        <text x="508" y="122" fill="#cbd5e1" font-size="12.5" font-family="Segoe UI,sans-serif">${en ? 'price · recall · return' : '价格 · 召回 · 退货核验'}</text>
        <text x="508" y="144" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• no evidence, no deadline' : '• 缺证据绝不编造退货期限'}</text>
        <text x="508" y="164" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• blocks prompt injection' : '• 拦截摘要隐藏注入指令'}</text>
        <rect x="508" y="174" width="184" height="22" rx="6" fill="#091526" stroke="#21564a"/>
        <text x="518" y="189" fill="#6ee7b7" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">${en ? '03→04 Audit state' : '03→04 写入审计状态'}</text>
      </g>
      <path d="M708 128 H730" fill="none" stroke="#56ddcd" stroke-width="2.4"/>
      <path d="M724 123 L731 128 L724 133" fill="none" stroke="#56ddcd" stroke-width="2.4"/>
      <g>
        <rect x="734" y="50" width="206" height="156" rx="12" fill="#122640" stroke="#f59e0b" stroke-width="1.4"/>
        <rect x="734" y="50" width="206" height="5" rx="2.5" fill="#f59e0b"/>
        <text x="748" y="74" fill="#fcd34d" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? '04 · AZURE G3 &amp; AUDIT' : '04 · AZURE G3 与审计'}</text>
        <text x="748" y="98" fill="#f8fafc" font-size="15" font-weight="700" font-family="Segoe UI,sans-serif">${en ? 'Azure account (G3)' : 'Azure 账户 (G3)'}</text>
        <text x="748" y="122" fill="#cbd5e1" font-size="12.5" font-family="Segoe UI,sans-serif">${en ? 'created · no key bound' : '已创建 · 未绑密钥'}</text>
        <text x="748" y="144" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• G3 · global · unmeasured' : '• G3 · global · 未实测'}</text>
        <text x="748" y="164" fill="#94a3b8" font-size="12" font-family="Segoe UI,sans-serif">${en ? '• sealed fixture ledger' : '• 密封夹具证据账本'}</text>
        <rect x="748" y="174" width="178" height="22" rx="6" fill="#091526" stroke="#5c481c"/>
        <text x="758" y="189" fill="#fcd34d" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">${en ? '04 Sink · not_measured' : '04 闭环 · not_measured'}</text>
      </g>
      <g>
        <rect x="20" y="222" width="296" height="86" rx="10" fill="#0b1a2e" stroke="#284466"/>
        <rect x="20" y="234" width="4" height="62" rx="2" fill="#38bdf8"/>
        <text x="34" y="245" fill="#7dd3fc" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? 'KEY POINT 01 · DATA FLOW DIRECTION' : '要点 01 · 数据流向主线'}</text>
        <text x="34" y="266" fill="#d5e4f5" font-size="12" font-family="Segoe UI,sans-serif">${en ? 'Mandate → Web IQ /browse passage →' : '买方委托 → Web IQ 原始 passage →'}</text>
        <text x="34" y="284" fill="#d5e4f5" font-size="12" font-family="Segoe UI,sans-serif">${en ? 'Pre-LLM Authority Gate → Sealed Audit.' : '进 LLM 前商业裁决门禁 → 密封审计。'}</text>
      </g>
      <g>
        <rect x="332" y="222" width="296" height="86" rx="10" fill="#0b1a2e" stroke="#284466"/>
        <rect x="332" y="234" width="4" height="62" rx="2" fill="#34d399"/>
        <text x="346" y="245" fill="#6ee7b7" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? 'KEY POINT 02 · AUTHORITY BOUNDARY' : '要点 02 · 权限与资金隔离'}</text>
        <text x="346" y="266" fill="#d5e4f5" font-size="12" font-family="Segoe UI,sans-serif">${en ? 'Web IQ stays strictly read-only; injected' : 'Web IQ 仅提供只读证据；检索摘要中的'}</text>
        <text x="346" y="284" fill="#d5e4f5" font-size="12" font-family="Segoe UI,sans-serif">${en ? 'snippets cannot alter authorized amounts.' : '隐藏注入指令绝不能篡改授权金额上限。'}</text>
      </g>
      <g>
        <rect x="644" y="222" width="296" height="86" rx="10" fill="#0b1a2e" stroke="#284466"/>
        <rect x="644" y="234" width="4" height="62" rx="2" fill="#f59e0b"/>
        <text x="658" y="245" fill="#fcd34d" font-size="11.5" font-weight="700" font-family="Segoe UI,sans-serif">${en ? 'KEY POINT 03 · PROVENANCE GUARDRAIL' : '要点 03 · 实测边界与诚实口径'}</text>
        <text x="658" y="266" fill="#d5e4f5" font-size="12" font-family="Segoe UI,sans-serif">${en ? 'G3 resource provisioned; portal key unbound.' : 'Azure G3 账户已建但未绑密钥；五家供应商'}</text>
        <text x="658" y="284" fill="#d5e4f5" font-size="12" font-family="Segoe UI,sans-serif">${en ? 'All 5 providers remain not_measured.' : '线上延迟保持 not_measured，绝不写为 0。'}</text>
      </g>
    </svg>
  </div>`;
}
for (const name of files) {
  const file = `workshops/webiq-azure/${name}`;
  const rawSource = execFileSync('git', ['show', `${baseline}:${file}`], {cwd:root,encoding:'utf8'});
  const source = rawSource
    .replace(/<style id="site-remediation-style">[\s\S]*?<\/style>\s*/g, '')
    .replace(/<!-- site-remediation-knowledge:start -->[\s\S]*?<!-- site-remediation-knowledge:end -->\s*/g, '')
    .replace(/\n?<!-- editorial-webiq-style:start -->[\s\S]*?<!-- editorial-webiq-style:end -->\n?/g, '')
    .replace(/\n?<!-- editorial-webiq-nav:start -->[\s\S]*?<!-- editorial-webiq-nav:end -->\n?/g, '');
  const en = name.includes('.en.');
  const target = en ? name.replace('.en.', '.') : name.replace('.html', '.en.html');
  const comparisonLayout = /^(compare|index)/.test(name) ? '.kee-webiq-nav~main table{width:100%;table-layout:fixed}.kee-webiq-nav~main th,.kee-webiq-nav~main td{overflow-wrap:anywhere}' : '';
  const sealed = /<meta\b[^>]*Content-Security-Policy[^>]*default-src\s+'none'/i.test(source);
  const css = '\n<!-- editorial-webiq-style:start --><style>' + professional.css() + comparisonLayout + '.kee-webiq-nav{box-sizing:border-box;display:flex;align-items:center;flex-wrap:wrap;gap:12px 20px;padding:16px 24px;background:#101a30;color:#eef3ff;border-bottom:1px solid #314361;font:14px/1.5 "Segoe UI",sans-serif}.kee-webiq-nav a{color:#9aabff;text-decoration:none}.kee-webiq-nav a:hover{text-decoration:underline}.kee-webiq-nav a:focus-visible{outline:2px solid #56ddcd;outline-offset:4px}.kee-webiq-nav .identity{color:#eef3ff;font-weight:700;margin-right:auto}.kee-webiq-nav .language{border-left:1px solid #314361;padding-left:16px}@media(max-width:600px){.kee-webiq-nav{padding:14px 18px;gap:10px 16px}.kee-webiq-nav .identity{flex-basis:100%}}</style>' + (sealed ? '' : professional.runtime(file)) + '<!-- editorial-webiq-style:end -->\n';
  const nav = `\n<!-- editorial-webiq-nav:start -->${professional.navigation({file,en,className:'kee-webiq-nav',languages:`<a class="language" href="${target}" lang="${en?'zh-CN':'en'}" hreflang="${en?'zh-CN':'en'}">${en?'中文':'EN'}</a>`,context:`<a href="../../studio/${en?'':'zh-'}commerce.html">← ${en?'Agentic Commerce':'智能体商务'}</a>`})}${name.startsWith('compare') ? `<p class="kee-webiq-nav" role="note">${en ? 'Source price caveat: the listed Bing grounding $14/1k and Brave price have not been independently verified. Google/Bing grounding are distinct services, not Web IQ. No vendor latency is measured here.' : '来源价格提示：文中 Bing grounding $14/1k 与 Brave 标价均未独立复核。Google/Bing grounding 是不同服务，不是 Web IQ。这里未实测厂商延迟。'}</p>` : ''}<!-- editorial-webiq-nav:end -->\n`;
  const repaired = source
    .replace(/(respLabel: ")[^\n]+/g, line=>line.replaceAll('""', '\\"\\"'))
    .replace(/<div class="fig" aria-label="Web IQ commerce architecture">[\s\S]*?<\/div>/, () => webiqArchitectureFig(en));
  const html = repaired.replace('</head>', css+'</head>').replace('<body>', '<body>'+nav);
  const dest = path.join(root,file);
  if (process.argv.includes('--check')) assert.equal(fs.readFileSync(dest,'utf8').replace(/\r\n/g,'\n'),html.replace(/\r\n/g,'\n'),file);
  else fs.writeFileSync(dest,html);
}
console.log(`${process.argv.includes('--check')?'Verified':'Integrated'} ${files.length} concurrent Web IQ surfaces; original bilingual content, CSP and Bicep are preserved.`);
