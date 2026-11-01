const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root = path.join(__dirname, '..');
const baseline = 'cf5bb77976f8710f35dc20a6c27d2312ed9b3b76';
const files = ['index.html', 'index.en.html', 'live-demo.html', 'live-demo.en.html'];
for (const name of files) {
  const file = `workshops/webiq-azure/${name}`;
  const source = execFileSync('git', ['show', `${baseline}:${file}`], {cwd:root,encoding:'utf8'});
  const en = name.includes('.en.');
  const target = en ? name.replace('.en.', '.') : name.replace('.html', '.en.html');
  const css = '\n<!-- editorial-webiq-style:start --><style>.kee-webiq-nav{box-sizing:border-box;display:flex;align-items:center;flex-wrap:wrap;gap:12px 20px;padding:16px 24px;background:#101a30;color:#eef3ff;border-bottom:1px solid #314361;font:14px/1.5 "Segoe UI",sans-serif}.kee-webiq-nav a{color:#9aabff;text-decoration:none}.kee-webiq-nav a:hover{text-decoration:underline}.kee-webiq-nav a:focus-visible{outline:2px solid #56ddcd;outline-offset:4px}.kee-webiq-nav .identity{color:#eef3ff;font-weight:700;margin-right:auto}.kee-webiq-nav .language{border-left:1px solid #314361;padding-left:16px}@media(max-width:600px){.kee-webiq-nav{padding:14px 18px;gap:10px 16px}.kee-webiq-nav .identity{flex-basis:100%}}</style><!-- editorial-webiq-style:end -->\n';
  const nav = `\n<!-- editorial-webiq-nav:start --><nav class="kee-webiq-nav" aria-label="${en?'Site and resource navigation':'网站与资源导航'}"><a class="identity" href="../../${en?'index':'zh'}.html">Qi Chen · @turbo998</a><a href="../../studio/${en?'':'zh-'}index.html">Studio</a><a href="../../studio/${en?'':'zh-'}commerce.html">← ${en?'Agentic Commerce':'智能体商务'}</a><a class="language" href="${target}" lang="${en?'zh-CN':'en'}" hreflang="${en?'zh-CN':'en'}">${en?'中文':'English'}</a></nav><!-- editorial-webiq-nav:end -->\n`;
  const repaired = source.replace(/(respLabel: ")[^\n]+/g, line=>line.replaceAll('""', '\\"\\"'));
  const html = repaired.replace('</head>', css+'</head>').replace('<body>', '<body>'+nav);
  const dest = path.join(root,file);
  if (process.argv.includes('--check')) assert.equal(fs.readFileSync(dest,'utf8').replace(/\r\n/g,'\n'),html.replace(/\r\n/g,'\n'),file);
  else fs.writeFileSync(dest,html);
  assert.equal(html.replace(css,'').replace(nav,'').replace(/(respLabel: ")[^\n]+/g,line=>line.replaceAll('\\"\\"','""')),source,'Concurrent source must remain intact apart from two label quote escapes: '+file);
}
console.log(`${process.argv.includes('--check')?'Verified':'Integrated'} 4 concurrent Web IQ surfaces; original bilingual content, CSP and Bicep are preserved.`);
