// A single, optional theme preference across portfolio pages.
(() => {
 const root = document.documentElement;
 let saved; try { saved = localStorage.getItem('ibloud-theme'); } catch {}
 const system = window.matchMedia('(prefers-color-scheme: light)');
 const apply = theme => { root.dataset.theme = theme; const b = document.querySelector('.theme-toggle'); if(b) { b.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme'; b.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme'); } };
 apply(saved === 'light' || saved === 'dark' ? saved : system.matches ? 'light' : 'dark');
 document.addEventListener('DOMContentLoaded', () => {
  // Render visible breadcrumbs from the page's existing BreadcrumbList JSON-LD.
  const schema = document.querySelector('#site-breadcrumbs');
  if (schema) {
   try {
    const data = JSON.parse(schema.textContent || '{}');
    const items = data.itemListElement || [];
    if (items.length) {
     const nav = document.createElement('nav'); nav.className = 'll-breadcrumbs'; nav.setAttribute('aria-label', 'Breadcrumb');
     const ol = document.createElement('ol');
     items.forEach((entry, index) => {
      const li = document.createElement('li'); const name = entry.name || '';
      if (index === items.length - 1) { li.setAttribute('aria-current', 'page'); li.textContent = name; }
      else { const a = document.createElement('a'); a.href = entry.item; a.textContent = name; li.append(a); }
      ol.append(li);
     });
     nav.append(ol); const main = document.querySelector('main'); if (main) main.before(nav);
    }
   } catch (error) { console.warn('Breadcrumb schema could not be rendered.', error); }
  }
  const header = document.querySelector('.ll-unified-inner');
  if (!header) return;
  const b = document.createElement('button'); b.type = 'button'; b.className = 'theme-toggle'; header.append(b); apply(root.dataset.theme);
  b.addEventListener('click', () => { saved = root.dataset.theme === 'dark' ? 'light' : 'dark'; apply(saved); try { localStorage.setItem('ibloud-theme', saved); } catch {} });
 });
 system.addEventListener('change', () => { if (!saved) apply(system.matches ? 'light' : 'dark'); });
})();
