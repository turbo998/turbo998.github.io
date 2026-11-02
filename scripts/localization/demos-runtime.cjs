'use strict';
const fs = require('node:fs');
const path = require('node:path');
const overrides = require('./demos-terms.cjs');
const zhEnPath = path.join(__dirname, 'demos-zh-en.json');
let cachedZhEn = null, cachedEnZh = null;
function dictionaryFor(html, file) {
  if (!cachedZhEn) cachedZhEn = {...JSON.parse(fs.readFileSync(zhEnPath, 'utf8')), ...overrides.zhEn};
  if (!cachedEnZh) cachedEnZh = {...require('./demos-reviewed-en.cjs'), ...require('./demos-prioritization.cjs'), ...overrides.enZh};
  let corpus = html;
  for (const match of html.matchAll(/<script[^>]*src="([^"]+\.js)"/g)) {
    const asset = path.resolve(__dirname, '../..', path.dirname(file), match[1]);
    if (!fs.existsSync(asset) || /navigation|reading-shell/.test(asset)) continue;
    for (const name of fs.readdirSync(path.dirname(asset))) if (name.endsWith('.js')) corpus += fs.readFileSync(path.join(path.dirname(asset), name), 'utf8');
  }
  const cjkTokens = new Set(corpus.match(/[\u3400-\u9fff]+/g) || []);
  const filteredZhEn = {...overrides.zhEn};
  for (const token of cjkTokens) if (cachedZhEn[token] !== undefined) filteredZhEn[token] = cachedZhEn[token];
  for (const [key, val] of Object.entries(cachedZhEn)) if (!/^[ \u3400-\u9fff]+$/.test(key) && corpus.includes(key)) filteredZhEn[key] = val;
  return {zhEn: filteredZhEn, enZh: {...Object.fromEntries(Object.entries(cachedEnZh).filter(([key]) => corpus.includes(key))), ...overrides.enZh}};
}
function runtime(config) {
  'use strict';
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const requested = params.get('lang');
  const language = requested === 'en' ? 'en' : requested === 'zh' || requested === 'zh-CN' ? 'zh-CN' : config.language;
  if (language !== config.language) {
    const destination = new URL(language === 'en' ? config.en : config.zh, location.href);
    destination.search = location.search;
    destination.hash = location.hash;
    destination.searchParams.set('lang', language);
    location.replace(destination.href);
    return;
  }
  if (!requested) {
    const canonical = new URL(location.href);
    canonical.searchParams.set('lang', language);
    history.replaceState(history.state, '', canonical);
  }
  root.lang = language;
  root.dataset.demoLanguage = language;
  if (config.engine && window.self !== window.top && params.get('arena') === '1') root.classList.add('in-arena-frame');
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const dictionary = language === 'en' ? config.terms.zhEn : config.terms.enZh;
  const keys = Object.keys(dictionary).filter(key => language === 'en' || !dictionary[key].includes(key)).sort((a, b) => b.length - a.length);
  const pattern = keys.length ? new RegExp(language === 'en' ? keys.map(escape).join('|') : '(?<![A-Za-z0-9_])(?:' + keys.map(escape).join('|') + ')(?![A-Za-z0-9_])', 'gu') : null;
  const translate = value => {
    if (typeof value !== 'string' || !value) return value;
    const trimmed = value.trim();
    if (Object.prototype.hasOwnProperty.call(dictionary, trimmed)) return value.replace(trimmed, dictionary[trimmed]);
    if (!pattern || language === 'en' && !/[\p{Script=Han}]/u.test(value)) return value;
    return value.replace(pattern, (key, offset, input) => {
      let translated = dictionary[key];
      if (/[A-Za-z0-9]/.test(input[offset - 1] || '') && /^[A-Za-z]/.test(translated)) translated = ' ' + translated;
      if (/[A-Za-z0-9]/.test(input[offset + key.length] || '') && /[A-Za-z]$/.test(translated)) translated += ' ';
      return translated;
    });
  };
  const excluded = node => node.parentElement?.closest('script,style,[data-professional-header],.kee-dedicated-nav,.reading-header,.demo-language-navigation');
  const localizeNode = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (excluded(node)) return;
      const value = translate(node.nodeValue);
      if (value !== node.nodeValue) node.nodeValue = value;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || node.matches('script,style,[data-professional-header],.kee-dedicated-nav,.reading-header,.demo-language-navigation')) return;
    for (const attr of ['title', 'aria-label', 'placeholder', 'alt']) {
      if (!node.hasAttribute(attr)) continue;
      const original = node.getAttribute(attr), translated = translate(original);
      if (translated !== original) node.setAttribute(attr, translated);
    }
    for (const child of node.childNodes) localizeNode(child);
  };
  // Translate only paint labels; coordinates, fonts, metrics and simulation state are untouched.
  for (const name of ['fillText', 'strokeText']) {
    const original = CanvasRenderingContext2D.prototype[name];
    CanvasRenderingContext2D.prototype[name] = function(text, ...args) {return original.call(this, translate(String(text)), ...args);};
  }
  const switchLanguage = target => {
    const next = new URL(target === 'en' ? config.en : config.zh, location.href);
    next.search = location.search;
    next.hash = location.hash;
    next.searchParams.set('lang', target);
    location.assign(next.href);
  };
  document.addEventListener('click', event => {
    if (!event.isTrusted) return;
    const button = event.target.closest('button');
    if (!button || button.closest('[data-professional-header]')) return;
    const code = button.getAttribute('onclick') || '';
    if (!button.matches('#langToggle,#btn-lang,#btn-en,#btn-zh,[data-lang]') && !/^(?:toggleLang|setLang)\(/.test(code)) return;
    const selected = button.dataset.lang || (button.id === 'btn-en' || /setLang\('en'/.test(code) ? 'en' : button.id === 'btn-zh' || /setLang\('zh'/.test(code) ? 'zh-CN' : language === 'en' ? 'zh-CN' : 'en');
    event.preventDefault();
    event.stopImmediatePropagation();
    switchLanguage(selected === 'en' ? 'en' : 'zh-CN');
  }, true);
  if (config.engine) {
    window.addEventListener('message', event => {
      if (!['ARENA_SYNC','arena-sync'].includes(event.data?.type)) return;
      if (event.origin !== location.origin || event.source !== window.parent) {event.stopImmediatePropagation(); return;}
      if (event.data.action === 'feed') {
        if (/demo-faf-/.test(config.source)) {
          const fish = document.getElementById('s-fish');
          fish.value = Math.min(Number(fish.max), Number(fish.value) + 1);
          if (typeof updateParams === 'function') updateParams();
        } else if (/demo-agent-forge-/.test(config.source) && typeof tossFish === 'function') tossFish();
      }
      if (event.data.action === 'sprint' && /demo-agent-forge-/.test(config.source) && typeof triggerSprint === 'function') triggerSprint();
    }, true);
  }
  const api = {language, translate, apply: () => localizeNode(root), switchLanguage, engine: config.engine, arena: config.arena, ready: false};
  window.DemoLocalization = api;
  document.addEventListener('DOMContentLoaded', () => {
    const nativeButton = document.querySelector(`button[data-lang="${language}"]`);
    if (nativeButton) nativeButton.click();
    else if (typeof setLang === 'function') setLang(language === 'en' ? 'en' : 'zh');
    else if (typeof toggleLang === 'function') {
      const current = typeof currentLang === 'string' ? currentLang : typeof lang === 'string' ? lang : 'zh';
      if ((current === 'en') !== (language === 'en')) toggleLang();
    }
    root.lang = language;
    localizeNode(root);
    new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') mutation.addedNodes.forEach(localizeNode);
        else localizeNode(mutation.target);
      }
    }).observe(root, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['title','aria-label','placeholder','alt']});
    api.ready = true;
    document.dispatchEvent(new CustomEvent('demo-localization-ready', {detail: {language}}));
  }, {once: true});
}
function translateMarkup(html, language, terms) {
  const dictionary = language === 'en' ? terms.zhEn : terms.enZh;
  const keys = Object.keys(dictionary).filter(key => language === 'en' || !dictionary[key].includes(key)).sort((a,b) => b.length - a.length);
  const alternatives = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const pattern = keys.length ? new RegExp(language === 'en' ? alternatives : '(?<![A-Za-z0-9_])(?:' + alternatives + ')(?![A-Za-z0-9_])', 'gu') : null;
  const encode = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const translate = text => {
    const trimmed = text.trim();
    if (Object.prototype.hasOwnProperty.call(dictionary, trimmed)) return text.replace(trimmed, encode(dictionary[trimmed]));
    if (!pattern || language === 'en' && !/[\p{Script=Han}]/u.test(text)) return text;
    return text.replace(pattern, key => encode(dictionary[key]));
  };
  return html.replace(/<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<[^>]+>|[^<]+/gi, part => {
    if (/^<!--|^<(?:script|style)\b/i.test(part)) return part;
    if (part.startsWith('<')) return part.replace(/\b(title|aria-label|alt|placeholder)="([^"]*)"/g, (_, attr, value) => `${attr}="${translate(value).replace(/"/g, '&quot;')}"`);
    return translate(part);
  });
}
module.exports = {runtime, dictionaryFor, translateMarkup};
