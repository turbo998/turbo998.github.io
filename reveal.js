/* Shared scroll-reveal: cards fade/slide in as they enter the viewport.
   Loaded on every page before main.js / openrouter.js, which call
   window.__initReveal(root) again once their async content renders. */
(function () {
  const SELECTOR =
    ".proj, .tl-item, .repo-card, .rank-row, .section-card, .pub, .bio-card, .profile-card, .panel, .callout, .wb-card, .asset-card, .style-preview-card";

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObserver.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 })
    : null;

  function initReveal(root) {
    /* Degenerate viewports (height 0 in some embedded webviews) would keep
       content invisible forever — skip the animation and stay visible. */
    if (!revealObserver || !window.innerHeight) return;
    (root || document).querySelectorAll(SELECTOR).forEach((el) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  window.__initReveal = initReveal;
  initReveal();
})();
