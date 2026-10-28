// A single, optional theme preference across portfolio pages.
(() => {
 const root = document.documentElement;
 let saved; try { saved = localStorage.getItem('ibloud-theme'); } catch {}
 const system = window.matchMedia('(prefers-color-scheme: light)');
 const apply = theme => { root.dataset.theme = theme; const b = document.querySelector('.theme-toggle'); if(b) { b.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme'; b.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme'); } };
 apply(saved === 'light' || saved === 'dark' ? saved : system.matches ? 'light' : 'dark');
 document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.ll-unified-inner');
  if (!header) return;
  const b = document.createElement('button'); b.type = 'button'; b.className = 'theme-toggle'; header.append(b); apply(root.dataset.theme);
  b.addEventListener('click', () => { saved = root.dataset.theme === 'dark' ? 'light' : 'dark'; apply(saved); try { localStorage.setItem('ibloud-theme', saved); } catch {} });
 });
 system.addEventListener('change', () => { if (!saved) apply(system.matches ? 'light' : 'dark'); });
})();
