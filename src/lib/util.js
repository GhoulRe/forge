import { HARN } from '../data/harness.js';

// Local-time dates (not UTC), so a late-night session counts for the day you actually lived.
const pad = n => String(n).padStart(2, '0');
export const key = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
export const today = () => key(new Date());
export const bump = n => { const k = today(); n.days[k] = (n.days[k] || 0) + 1; }; // one more "contribution" today
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const KW = /^(const|let|var|function|return|if|else|for|while|new|class|async|await|try|catch|throw|true|false|null|undefined|of|in|this|typeof|switch|case|break|continue|export|default|import|from)$/;
export function hl(c, lang) {
  if (lang === 'html') return esc(c).replace(/(&lt;\/?[\w-]+)/g, '<i class="k">$1</i>');
  return c.replace(
    /(\/\/.*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(\b\d+\.?\d*\b)|([A-Za-z_$][\w$]*)|([\s\S])/g,
    (m, cm, st, nu, id, o) => cm ? `<i class="c">${esc(cm)}</i>` : st ? `<i class="s">${esc(st)}</i>`
      : nu ? `<i class="n">${m}</i>` : id ? (KW.test(id) ? `<i class="k">${id}</i>` : id) : esc(o));
}

export function stats(days) {
  const d = new Date();
  if (!days[key(d)]) d.setDate(d.getDate() - 1);
  let current = 0;
  while (days[key(d)]) { current++; d.setDate(d.getDate() - 1); }
  const keys = Object.keys(days).filter(k => days[k] > 0).sort();
  let best = 0, run = 0, prev = null;
  for (const k of keys) {
    const t = new Date(k + 'T00:00:00');
    run = prev && Math.round((t - prev) / 864e5) === 1 ? run + 1 : 1;
    best = Math.max(best, run); prev = t;
  }
  const from = key(new Date(Date.now() - 365 * 864e5));
  return { current, longest: Math.max(best, current), active: keys.length, year: keys.filter(k => k >= from).reduce((a, k) => a + days[k], 0) };
}

// React preview: React + Babel from a CDN inside the sandboxed iframe (needs internet while previewing).
const reactDoc = code => `<!doctype html><html><body><div id="root"></div>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"><\/script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"><\/script>
<script src="https://unpkg.com/@babel/standalone@7.25.6/babel.min.js"><\/script>
<script type="text/babel" data-presets="react">
const { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, createContext, Fragment } = React;
${code}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
<\/script></body></html>`;

// Build the document that runs in the sandbox iframe. rid ties messages to one run.
export function buildDoc(lang, code, tests, rid) {
  const H = '<script>' + HARN.replace('RID', rid) + '<\/script>';
  if (lang === 'html') return (code.includes('<head>') ? code.replace('<head>', '<head>' + H) : H + code) + '<script>__go()<\/script>';
  if (lang === 'react') return reactDoc(code).replace('<body>', '<body>' + H).replace('</body>', '<script>addEventListener("load",()=>setTimeout(__go,500))<\/script></body>');
  return '<!doctype html>' + H + '<script>' + code + '<\/script><script>(()=>{const{test,eq,delay,L}=window.__h;' + (tests || '') + '})()<\/script><script>__go()<\/script>';
}
