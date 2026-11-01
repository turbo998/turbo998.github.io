(() => {
  const root = document.documentElement;
  const zh = root.lang === 'zh-CN';
  const toggle = document.querySelector('.theme-toggle');
  const language = document.querySelector('.language-link');
  const menu = document.querySelector('.mobile-menu');
  function syncControls() {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', zh ? `切换为${dark ? '亮' : '暗'}色` : `Switch to ${dark ? 'light' : 'dark'} theme`);
    toggle.setAttribute('aria-pressed', String(dark));
    const next = new URL(root.dataset.counterpart, location.href);
    next.hash = location.hash;
    next.searchParams.set('theme', root.dataset.theme);
    language.href = next.href;
  }
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('kee-editorial-theme', root.dataset.theme); } catch (_) {}
    const url = new URL(location.href);
    if (url.searchParams.has('theme')) {
      url.searchParams.set('theme', root.dataset.theme);
      history.replaceState(null, '', url);
    }
    syncControls();
  });
  window.addEventListener('hashchange', syncControls);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  syncControls();
})();
