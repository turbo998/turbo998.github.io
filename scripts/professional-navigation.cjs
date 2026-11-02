'use strict';
const path = require('node:path');
const fs = require('node:fs');
const search = require('./site-search.cjs');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to);
const sections = [
  ['hub', 'studio/index.html', 'studio/zh-index.html', 'Frontier Transformation Engineering Hub', 'Frontier Transformation Engineering Hub'],
  ['benchmarks', 'benchmarks.html', 'zh-benchmarks.html', 'Benchmark & Eval Foundry', '基准评测中心'],
  ['radar', 'github-radar.html', 'zh-github-radar.html', 'GitHub AI Signal Radar', 'GitHub AI 信号雷达'],
  ['routing', 'openrouter.html', 'zh-openrouter.html', 'Model Routing & Telemetry', 'OpenRouter 模型遥测'],
  ['profile', 'about.html', 'zh-about.html', 'Principal Architect Profile', '首席架构师履历']
];
function navigation({file, en = true, className = 'reading-header', languages = '', context = '', active}) {
  active ||= /github-radar/.test(file) ? 'radar' : /openrouter/.test(file) ? 'routing' : /(?:^|\/)(?:zh-)?about\.html$/.test(file) ? 'profile' : /benchmark|(?:^|\/)cards(?:\.en)?\.html$|test-report-cards/.test(file) ? 'benchmarks' : 'hub';
  const primary = sections.map(([id, english, chinese, label, zhLabel]) => `<a href="${escape(relative(file, en ? english : chinese))}" data-section="${id}" data-nav-en-href="${escape(relative(file,english))}" data-nav-zh-href="${escape(relative(file,chinese))}" data-nav-en-label="${escape(label)}" data-nav-zh-label="${escape(zhLabel)}"${id === active ? ' aria-current="page"' : ''}>${escape(en ? label : zhLabel)}</a>`).join('');
  const fallback = `<a href="${path.posix.basename(file)}?lang=en" hreflang="en" lang="en">EN</a><a href="${path.posix.basename(file)}?lang=zh-CN" hreflang="zh-CN" lang="zh-CN">中文</a>`;
  if ((languages.match(/hreflang=/g) || []).length === 1) languages += `<a href="${path.posix.basename(file)}" hreflang="${en?'en':'zh-CN'}" lang="${en?'en':'zh-CN'}" aria-label="${en?'Current English edition':'当前中文版本'}">${en?'EN':'中文'}</a>`;
  const tag = className === 'reading-header' ? 'header' : 'nav';
  const hiddenContext = context.replace(/\s*\bclass="reading-context"/g, '');
  return `<${tag} class="${className}" data-professional-header><a class="professional-identity reading-brand kee-dedicated-identity identity" href="${relative(file,en?'index.html':'zh.html')}">Qi Chen · @turbo998</a><div class="professional-primary" role="navigation" aria-label="${en?'Primary sections':'主导航'}">${primary}</div>${search.markup(file,en)}<div class="reading-controls professional-controls" aria-label="${en?'Site language and appearance':'网站语言与外观'}">${languages || fallback}<details class="professional-mobile"><summary aria-label="${en?'Open navigation':'打开主导航'}">☰</summary><div class="professional-primary" role="navigation" aria-label="${en?'Mobile navigation':'移动主导航'}">${primary}</div></details><a data-reading-theme="light" href="?theme=light" aria-label="${en?'Light theme':'浅色主题'}">☀</a><a data-reading-theme="dark" href="?theme=dark" aria-label="${en?'Dark theme':'深色主题'}">◐</a></div>${context ? `<div class="professional-context" aria-label="${en?'Back to context':'返回上下文'}">${hiddenContext}</div>` : ''}</${tag}>${context ? `<div class="professional-context-bar">${context}</div>` : ''}`;
}
const css = () => fs.readFileSync(path.join(__dirname,'../assets/dedicated-navigation.css'),'utf8').replace(/\r\n/g,'\n') + '\n' + search.css();
const runtime = file => `<script src="${relative(file,'assets/dedicated-navigation.js')}" defer></script>${search.runtime(file)}`;
module.exports = {navigation, sections, relative, css, runtime};
