(() => {
  'use strict';
  const key = 'kee-aurora-theme-v1';
  const query = new URLSearchParams(location.search);
  const pageLanguage = document.documentElement.lang;
  if (document.documentElement.dataset.readingRuntime) {
    try { localStorage.setItem('studio_lang', pageLanguage); localStorage.setItem('voice_portal_lang', pageLanguage); } catch {}
  }
  let stored;
  try { stored = localStorage.getItem(key); } catch {}
  const theme = [query.get('theme'), stored].find(value => value === 'light' || value === 'dark') || 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(key, theme); } catch {}
  function wireLinks() {
    document.querySelectorAll('.reading-header a[href],.reading-context').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin !== location.origin) return;
      url.searchParams.set('theme', link.dataset.readingTheme || document.documentElement.dataset.theme);
      if (link.hasAttribute('data-reading-language')) {
        url.searchParams.set('lang', link.hreflang);
        url.hash = location.hash;
      } else if (link.hasAttribute('data-reading-theme')) {
        url.search = location.search;
        url.searchParams.set('theme', link.dataset.readingTheme);
        url.hash = location.hash;
      }
      // Keep relative navigation under both user Pages and project Pages deployments.
      const path = link.getAttribute('href').split(/[?#]/)[0];
      link.setAttribute('href', path + url.search + url.hash);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    // Dedicated simulators may initialize their old palette; the editorial shell owns its theme.
    if (document.documentElement.dataset.readingRuntime) {
      if (typeof setAnimLang === 'function') setAnimLang(pageLanguage);
      if (typeof setLang === 'function') setLang(pageLanguage === 'en' ? 'en' : 'zh');
      if (typeof toggleLang === 'function' && pageLanguage === 'en') toggleLang();
      document.documentElement.lang = pageLanguage;
    }
    const dictionary = document.getElementById('reading-translations');
    if (pageLanguage === 'en' && dictionary) {
      const pairs = Object.entries(JSON.parse(dictionary.textContent)).sort((a,b) => b[0].length-a[0].length);
      const main = document.getElementById('reading-main');
      const translate = () => {
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.parentElement.closest('script,style,[data-lang="zh"],[data-lang="zh-CN"]')) continue;
          let text = node.textContent;
          for (const [from,to] of pairs) {
            if (from.length > 4) text = text.split(from).join(to);
            else if (text.trim() === from) text = text.replace(from,to);
          }
          if (text !== node.textContent) node.textContent = text;
        }
      };
      translate();
      new MutationObserver(translate).observe(main, {childList:true,characterData:true,subtree:true});
    }
    document.documentElement.dataset.theme = theme;
    wireLinks();
  });
  addEventListener('load', () => { document.documentElement.dataset.theme = theme; wireLinks(); });
  addEventListener('hashchange', wireLinks);
})();
