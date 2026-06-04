// Build internal URLs that respect Astro's `base` config.
// In dev (base '/') this is a no-op. In production on GitHub Pages
// (base '/hormesis-dataeng') it prefixes every link so /foo/ becomes
// /hormesis-dataeng/foo/.

export const path = (p: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const route = p.startsWith('/') ? p : `/${p}`;
  return base + route;
};
