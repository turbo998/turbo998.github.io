const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root=path.resolve(__dirname,'..');
const archive=require('../assets/data/ai-infra-daytime-2026-11-14.json');
const daytime=require('../scripts/daytime-ai-infra.cjs');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(archive.independently_reproduced,false);
assert.equal(archive.day,'2026-11-14');
assert.ok(archive.rounds.length>0);
const slugs=new Set();
for(const [index,round] of archive.rounds.entries()) {
  assert.equal(round.round,124+index);
  assert.match(round.commit,/^[a-f0-9]{40}$/);
  assert.match(round.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(!slugs.has(round.slug));slugs.add(round.slug);
  assert.deepEqual(Object.keys(round).sort(),['commit','faq','files','round','slug','summary','title']);
  for(const locale of ['en','zh']) {
    assert.ok(round.title[locale].length>5);
    assert.ok(round.summary[locale].length>20);
    assert.ok(round.faq[locale].startsWith(`${archive.source_repository}/blob/main/docs/components/`));
  }
  for(const [kind,file] of Object.entries(round.files)) {
    assert.ok(file.path.startsWith(`workshops/benchmarks/daytime-ai-infra-2026-11-14/${round.slug}/`));
    assert.ok(!file.path.split('/').includes('..'));
    const bytes=fs.readFileSync(path.join(root,file.path)),text=bytes.toString('utf8');
    assert.equal(sha(bytes),file.sha256,`${round.round} ${kind} hash`);
    assert.ok(!/C:\\(?:\\)?Users|35f757c4-7762|b49284fa-fb52|415f3d1e-2381/.test(text));
    if(kind==='cards') {
      assert.ok(text.includes("default-src 'none'; style-src 'unsafe-inline'"));
      assert.ok(!/<script\b/i.test(text));
      assert.equal((text.match(/<(?:section|article) class="card"/g)||[]).length,7);
    }
    if(kind==='cards'||kind==='workbench') assert.ok(!/<(?:script|link|img)\b[^>]*(?:src|href)=["']https?:/i.test(text));
  }
}
const pages=['index.html','zh.html','studio/index.html','studio/zh-index.html','studio/infra.html','studio/zh-infra.html',daytime.page(false),daytime.page(true)];
const before=pages.map(file=>sha(fs.readFileSync(path.join(root,file))));
daytime.build(root);
assert.deepEqual(pages.map(file=>sha(fs.readFileSync(path.join(root,file)))),before,'Build is idempotent and preserves other page content');
for(const zh of [false,true]) {
  const file=daytime.page(zh),html=fs.readFileSync(path.join(root,file),'utf8');
  assert.ok(html.includes(`<html lang="${zh?'zh-CN':'en'}">`));
  assert.equal((html.match(/<article>/g)||[]).length,archive.rounds.length);
  assert.ok(html.includes('independently_reproduced=false'));
  for(const [,value] of html.matchAll(/href="([^"]+)"/g)) {
    if(/^(?:https?:|#)/.test(value)) continue;
    assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),value)),`${file}→${value}`);
  }
}
for(const file of pages.slice(0,6)) {
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.equal((html.match(/id="(?:featured|architecture|evaluation|demos|resources)-ai-infra-daytime-2026-11-14"/g)||[]).length,file.includes('infra.html')?4:1);
  assert.ok(html.includes('ai-infra-nightly-2026-11-13'),'Existing overnight archive preserved');
}
console.log(`Verified${archive.rounds.length}daytime studies,exact hashes,CSP,bilingual links and idempotent six-page integration.`);
