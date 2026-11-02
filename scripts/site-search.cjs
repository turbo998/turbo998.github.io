'use strict';
const fs = require('node:fs');
const path = require('node:path');
const relative = (file, target) => path.posix.relative(path.posix.dirname(file), target) || path.posix.basename(target);
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
function markup(file, en = true) {
  const archive = relative(file, `studio/${en ? '' : 'zh-'}archive.html`);
  const label = en ? 'Search architecture, benchmarks, demos...' : '搜索架构、评测、Demo、技能...';
  return `<form class="site-search" role="search" action="${archive}" method="get" data-search-root="${relative(file, 'index.html')}" data-search-language="${en ? 'en' : 'zh-CN'}"><label class="search-label" for="site-search-input">${escape(label)}</label><input id="site-search-input" name="q" type="search" placeholder="${escape(label)}" autocomplete="off" spellcheck="false" aria-keyshortcuts="/ Control+k Meta+k"><kbd aria-hidden="true">/</kbd><button type="submit" aria-label="${en ? 'Search all content' : '搜索全部内容'}">⌕</button><div class="search-results" id="site-search-results" hidden></div><span class="search-status" role="status" aria-live="polite"></span></form>`;
}
const css = () => fs.readFileSync(path.join(__dirname, '../assets/editorial/search.css'), 'utf8');
const runtime = file => `<script src="${relative(file, 'assets/editorial/search-index.js')}" defer></script><script src="${relative(file, 'assets/editorial/search.js')}" defer></script>`;
module.exports = {markup, css, runtime, relative};
