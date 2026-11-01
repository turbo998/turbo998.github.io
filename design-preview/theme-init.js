(() => {
  const root = document.documentElement;
  const query = new URLSearchParams(location.search);
  const requestedLanguage = query.get('lang');
  if (['en', 'zh-CN'].includes(requestedLanguage) && requestedLanguage !== root.lang) {
    const next = new URL(root.dataset.counterpart, location.href);
    next.search = location.search;
    next.hash = location.hash;
    location.replace(next.href);
  }
  let theme = query.get('theme');
  if (!['light', 'dark'].includes(theme)) {
    try { theme = localStorage.getItem('kee-editorial-theme'); } catch (_) {}
  }
  root.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  root.classList.add('js');
})();
