'use strict';
// Refresh only the already-published perimeter; all 4D source content stays byte-identical.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const professional = require('./professional-navigation.cjs');
const root = path.resolve(__dirname,'..');
const baseline = '9c4fe6140e37fcec3d7b46fe93b368f5d9d1a651';
const files = ['animation','generative-visual-lab'].flatMap(dir => ['demos/camera-4d-director/index.html','demos/camera-4d-director/test-report-cards.html','research/controllable-4d-video-camera-study.html','research/controllable-4d-video-camera-study.en.html'].map(file => `${dir}/${file}`));
const sourceFor = file => execFileSync('git',['show',`${baseline}:${file}`],{cwd:root,encoding:'utf8',maxBuffer:4*1024*1024});
function generate(file, source = sourceFor(file)) {
  const article = file.includes('/research/'), en = article && file.includes('.en.');
  const changes = [];
  let html = source;
  function replace(before, after) { assert.ok(before && html.includes(before),file+': expected source perimeter'); html=html.replace(before,after); changes.push({before,after}); }
  if (article) {
    const header = source.match(/<header class="reading-header">[\s\S]*?<\/header>/)[0];
    const counterpart = path.posix.basename(file).replace(en?'.en.html':'.html',en?'.html':'.en.html');
    replace(header, professional.navigation({file,en,languages:`<a data-reading-language href="${counterpart}" hreflang="${en?'zh-CN':'en'}" lang="${en?'zh-CN':'en'}">${en?'中文':'EN'}</a>`,context:`<a class="reading-context" href="../../studio/${en?'':'zh-'}animation.html">← ${en?'Animation studio':'动画工作室'}</a>`}));
  } else {
    const nav = source.match(/<!-- kee-dedicated-navigation:start -->[\s\S]*?<!-- kee-dedicated-navigation:end -->/)[0];
    replace(nav, `<!-- kee-dedicated-navigation:start -->\n${professional.navigation({file,en:false,className:'kee-dedicated-nav',context:'<a href="../../../studio/zh-animation.html">← 动画工作室</a><a href="../../research/controllable-4d-video-camera-study.html">中文研究</a><a href="../../research/controllable-4d-video-camera-study.en.html">English study</a><a href="index.html">4D Director</a><a href="test-report-cards.html">7-card report</a><span class="kee-dedicated-language">EN / 中文 opens the hub language, not a source translation. Original source, CSP, engine and reported results preserved; not re-evaluated.</span>'})}\n<!-- kee-dedicated-navigation:end -->`);
    // Append scoped CSS to the existing marked perimeter, leaving its engine-specific fixes intact.
    const style = source.match(/<!-- kee-dedicated-style:start -->[\s\S]*?<!-- kee-dedicated-style:end -->/)[0];
    replace(style, style.replace('<!-- kee-dedicated-style:end -->',`<style>${professional.css()}</style>${/Content-Security-Policy/.test(source)?'':professional.runtime(file)}<!-- kee-dedicated-style:end -->`));
  }
  let restored=html;
  for(const {before,after} of [...changes].reverse()) restored=restored.replace(after,before);
  assert.equal(restored,source,file+': reversible perimeter source preservation');
  const scripts = text => [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
  assert.deepEqual(scripts(html),scripts(source),file+': engine scripts preserved');
  assert.deepEqual(html.match(/<meta[^>]*Content-Security-Policy[^>]*>/g),source.match(/<meta[^>]*Content-Security-Policy[^>]*>/g),file+': CSP preserved');
  return {html,changes};
}
function main() { for(const file of files) {const {html}=generate(file);if(process.argv.includes('--check'))assert.equal(fs.readFileSync(path.join(root,file),'utf8'),html,file);else fs.writeFileSync(path.join(root,file),html);} console.log(`Verified ${files.length} 4D surfaces: reversible perimeter, engine scripts and CSP preserved.`); }
module.exports={root,baseline,files,sourceFor,generate,main};
if(require.main===module)main();
