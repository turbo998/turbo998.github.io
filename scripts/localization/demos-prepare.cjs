'use strict';
// Optional offline dictionary extraction. No network request carries source content.
const fs = require('node:fs');
const path = require('node:path');
const {root, records, original, readSource, svgSources} = require('../localize-demos.cjs');
const han = /[\p{Script=Han}]+/gu;
async function main() {
  const chinese = new Set(), english = new Set();
  try {
    for (const {source} of records) {
          if (source.endsWith('/selector.html') && !process.argv.includes('--selector')) continue;
          let html = original(source);
      html = html.replace(/<!-- kee-dedicated-navigation:start -->[\s\S]*?<!-- kee-dedicated-navigation:end -->/g, '');
      const assets = [...html.matchAll(/<script[^>]*src="([^"]+\.js)"/g)].map(m => path.resolve(root, path.dirname(source), m[1]));
      let corpus = html;
      if (source === 'workshops/data-lab/index.html') corpus += svgSources.map(file => readSource(file)).join('\n');
      for (const asset of assets) if (fs.existsSync(asset) && !/navigation|reading-shell/.test(asset)) {
        corpus += '\n' + fs.readFileSync(asset, 'utf8');
        for (const name of fs.readdirSync(path.dirname(asset))) if (name.endsWith('.js') && name !== path.basename(asset)) corpus += '\n' + fs.readFileSync(path.join(path.dirname(asset), name), 'utf8');
      }
      for (const match of corpus.matchAll(han)) chinese.add(match[0]);
      const strings = html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, '').replace(/<[^>]+>/g, '\n').split('\n').map(text => text.trim().replace(/&amp;/g, '&'));
      for (const value of strings) if (!/[\p{Script=Han}]/u.test(value) && /^[A-Za-z][A-Za-z /(),.:'’–—\-]+$/.test(value) && value.split(/\s+/).length > 1 && value.length < 350) english.add(value);
    }
    const cache = path.join(__dirname, 'demos-cache');
    fs.writeFileSync(path.join(cache, 'zh-en-input.json'), JSON.stringify([...chinese].sort(), null, 2));
    fs.writeFileSync(path.join(cache, 'en-zh-input.json'), JSON.stringify([...english].sort(), null, 2));
    console.log({chinese: chinese.size, english: english.size});
  } finally {}
}
main().catch(error => {console.error(error); process.exitCode = 1;});
