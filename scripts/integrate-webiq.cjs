const professional = require('./professional-navigation.cjs');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.join(__dirname, '..');
const baseline = '04ec523a4f7ba4843de2983b91052e23e7c1ffa6';
const files = ['index.html', 'index.en.html', 'live-demo.html', 'live-demo.en.html', 'compare.html', 'compare.en.html'];
for (const name of files) {
  const file = `workshops/webiq-azure/${name}`;
  const source = execFileSync('git', ['show', `${baseline}:${file}`], {cwd:root,encoding:'utf8'});
  const en = name.includes('.en.');
  const target = en ? name.replace('.en.', '.') : name.replace('.html', '.en.html');
  const comparisonLayout = /^(compare|index)/.test(name) ? '.kee-webiq-nav~main table{width:100%;table-layout:fixed}.kee-webiq-nav~main th,.kee-webiq-nav~main td{overflow-wrap:anywhere}' : '';
  const sealed = /<meta\b[^>]*Content-Security-Policy[^>]*default-src\s+'none'/i.test(source);
  const css = '\n<!-- editorial-webiq-style:start --><style>' + professional.css() + comparisonLayout + '.kee-webiq-nav{box-sizing:border-box;display:flex;align-items:center;flex-wrap:wrap;gap:12px 20px;padding:16px 24px;background:#101a30;color:#eef3ff;border-bottom:1px solid #314361;font:14px/1.5 "Segoe UI",sans-serif}.kee-webiq-nav a{color:#9aabff;text-decoration:none}.kee-webiq-nav a:hover{text-decoration:underline}.kee-webiq-nav a:focus-visible{outline:2px solid #56ddcd;outline-offset:4px}.kee-webiq-nav .identity{color:#eef3ff;font-weight:700;margin-right:auto}.kee-webiq-nav .language{border-left:1px solid #314361;padding-left:16px}@media(max-width:600px){.kee-webiq-nav{padding:14px 18px;gap:10px 16px}.kee-webiq-nav .identity{flex-basis:100%}}</style>' + (sealed ? '' : professional.runtime(file)) + '<!-- editorial-webiq-style:end -->\n';
  const nav = `\n<!-- editorial-webiq-nav:start -->${professional.navigation({file,en,className:'kee-webiq-nav',languages:`<a class="language" href="${target}" lang="${en?'zh-CN':'en'}" hreflang="${en?'zh-CN':'en'}">${en?'中文':'EN'}</a>`,context:`<a href="../../studio/${en?'':'zh-'}commerce.html">← ${en?'Agentic Commerce':'智能体商务'}</a>`})}${name.startsWith('compare') ? `<p class="kee-webiq-nav" role="note">${en ? 'Source price caveat: the listed Bing grounding $14/1k and Brave price have not been independently verified. Google/Bing grounding are distinct services, not Web IQ. No vendor latency is measured here.' : '来源价格提示：文中 Bing grounding $14/1k 与 Brave 标价均未独立复核。Google/Bing grounding 是不同服务，不是 Web IQ。这里未实测厂商延迟。'}</p>` : ''}<!-- editorial-webiq-nav:end -->\n`;
  const repaired = source.replace(/(respLabel: ")[^\n]+/g, line=>line.replaceAll('""', '\\"\\"'));
  const html = repaired.replace('</head>', css+'</head>').replace('<body>', '<body>'+nav);
  const dest = path.join(root,file);
  if (process.argv.includes('--check')) assert.equal(fs.readFileSync(dest,'utf8').replace(/\r\n/g,'\n'),html.replace(/\r\n/g,'\n'),file);
  else fs.writeFileSync(dest,html);
  assert.equal(html.replace(css,'').replace(nav,'').replace(/(respLabel: ")[^\n]+/g,line=>line.replaceAll('\\"\\"','""')),source,'Concurrent source must remain intact apart from two label quote escapes: '+file);
}
console.log(`${process.argv.includes('--check')?'Verified':'Integrated'} ${files.length} concurrent Web IQ surfaces; original bilingual content, CSP and Bicep are preserved.`);
