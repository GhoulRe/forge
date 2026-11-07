import { useEffect, useState } from 'react';

// Minimal History-API router: real URLs, working back/forward, refresh and bookmarks.
export const navigate = (to, replace) => {
  history[replace ? 'replaceState' : 'pushState'](null, '', to);
  window.dispatchEvent(new Event('navchange'));
};
export function usePath() {
  const [p, setP] = useState(location.pathname);
  useEffect(() => {
    const on = () => setP(location.pathname);
    window.addEventListener('popstate', on); window.addEventListener('navchange', on);
    return () => { window.removeEventListener('popstate', on); window.removeEventListener('navchange', on); };
  }, []);
  return p;
}
