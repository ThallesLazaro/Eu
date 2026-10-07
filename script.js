(function () {
  'use strict';

  const STORAGE_KEY = 'thalles-tema';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const metaTheme = document.getElementById('meta-theme-color');

  function getMode() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'claro' || stored === 'escuro' || stored === 'sistema' ? stored : 'sistema';
  }

  function isDark(mode) {
    return mode === 'escuro' || (mode === 'sistema' && media.matches);
  }

  function apply(mode, persist) {
    const dark = isDark(mode);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.themeMode = mode;
    if (metaTheme) metaTheme.setAttribute('content', dark ? '#09090b' : '#fafafa');
    document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
      const active = button.getAttribute('data-theme-choice') === mode;
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      button.classList.toggle('is-active', active);
    });
    if (persist) localStorage.setItem(STORAGE_KEY, mode);
  }

  document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
    button.addEventListener('click', function () {
      apply(button.getAttribute('data-theme-choice'), true);
    });
  });

  const onSystemChange = function () {
    if (getMode() === 'sistema') apply('sistema', false);
  };
  if (typeof media.addEventListener === 'function') media.addEventListener('change', onSystemChange);
  else if (typeof media.addListener === 'function') media.addListener(onSystemChange);

  apply(getMode(), false);
})();
