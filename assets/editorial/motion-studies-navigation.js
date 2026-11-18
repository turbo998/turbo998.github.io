(() => {
  'use strict';
  const header = document.querySelector('[data-professional-header]');
  const loc = new URL(location.href);
  const theme = loc.searchParams.get('scoutTheme');
  const links = header.querySelectorAll('.professional-controls a[hreflang], a[data-reading-theme]');
  function updateLinks() {
    links.forEach(link => {
      const choice = link.dataset.readingTheme;
      const target = new URL(choice ? location.href : link.href);
      if (choice || theme) target.searchParams.set('scoutTheme', choice || theme);
      target.hash = location.hash;
      link.href = target.href;
    });
  }
  const syncTheme = () => { header.dataset.perimeterTheme = document.documentElement.dataset.theme; };
  new MutationObserver(syncTheme).observe(document.documentElement, {attributes:true,attributeFilter:['data-theme']});
  document.querySelector('.chapter-index').addEventListener('click', updateLinks);
  links.forEach(link => link.addEventListener('click', updateLinks));
  addEventListener('hashchange', updateLinks);
  syncTheme();
  updateLinks();
})();
