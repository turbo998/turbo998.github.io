(() => {
  'use strict';
  const key = 'kee-aurora-theme-v1';
  let stored;
  try { stored = localStorage.getItem(key); } catch {}
  const theme = [new URLSearchParams(location.search).get('theme'), stored].find(value => value === 'light' || value === 'dark') || 'dark';
  try { localStorage.setItem(key, theme); } catch {}
  document.querySelectorAll('[data-professional-header]').forEach(header => {
    // Scope appearance to the perimeter; never overwrite the dedicated engine's theme.
    header.dataset.perimeterTheme = theme;
    const syncLanguage = () => {
      const language = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
      header.querySelectorAll('[data-section]').forEach(link => {
        link.textContent = link.getAttribute(`data-nav-${language}-label`);
        link.setAttribute('href', link.getAttribute(`data-nav-${language}-href`) + '?theme=' + theme);
      });
    };
    syncLanguage();
    new MutationObserver(syncLanguage).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
    header.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      const url = new URL(raw, location.href);
      if (url.origin !== location.origin) return;
      if (link.hasAttribute('data-reading-theme')) { url.search = location.search; url.hash = location.hash; }
      if (link.hasAttribute('hreflang')) {
        url.hash = location.hash;
        link.addEventListener('click', () => { try { localStorage.setItem('kee-site-language-v1', link.hreflang); } catch {} });
        link.setAttribute('href', raw.split(/[?#]/)[0] + url.search + url.hash);
        return;
      }
      url.searchParams.set('theme', link.dataset.readingTheme || theme);
      link.setAttribute('href', raw.split(/[?#]/)[0] + url.search + url.hash);
    });
  });
})();
