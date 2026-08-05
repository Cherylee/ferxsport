/**
 * Positions ferxsport mega menus with position:fixed so box-shadow
 * is not clipped by overflow/transform on header ancestors.
 */
(() => {
  const ROOT = document.documentElement;
  const COL_SELECTOR = '.ferxsport-header-columns, .header__columns';

  const sync = () => {
    const cols = document.querySelector(COL_SELECTOR);
    if (!cols) return;

    const rect = cols.getBoundingClientRect();
    ROOT.style.setProperty('--ferxsport-mega-left', `${Math.round(rect.left)}px`);
    ROOT.style.setProperty('--ferxsport-mega-width', `${Math.round(rect.width)}px`);
    ROOT.style.setProperty('--ferxsport-mega-top', `${Math.round(rect.bottom)}px`);
  };

  let ticking = false;
  const requestSync = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      sync();
    });
  };

  const onActivate = () => {
    sync();
  };

  document.addEventListener(
    'pointerenter',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.menu-list__list-item, .menu-list__submenu, header-menu')) {
        onActivate();
      }
    },
    true
  );

  document.addEventListener(
    'focusin',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.menu-list__list-item, header-menu')) onActivate();
    },
    true
  );

  window.addEventListener('resize', requestSync, { passive: true });
  window.addEventListener('scroll', requestSync, { passive: true, capture: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync, { once: true });
  } else {
    sync();
  }
})();
