// Pure URL helpers (no React) so they are easy to test.
export const parse = p => {
  const s = p.split('/').filter(Boolean).map(x => { try { return decodeURIComponent(x); } catch { return x; } });
  return { view: s[0] || '', a: s[1], b: s[2] };
};
// go('work', id) -> /practice/:id, go('day', n) -> /plan/:n, go('dash') -> /dashboard, otherwise /:view
export const pathFor = (v, id, cur) => ({ dash: '/dashboard', work: '/practice/' + encodeURIComponent(id || cur || ''), day: '/plan/' + id })[v] || '/' + v;
