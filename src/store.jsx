import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { backend } from './backend.js';

// One persisted document per user: everything needed to resume exactly where you left off.
export const DEF = () => ({
  view: 'dash', cur: 'closures',            // where you were
  code: {}, out: {}, hint: {}, done: {},    // workspace: code, last output, hints used, completed items
  pads: [], log: [], days: {},              // scratchpads, completion log, activity days (streak)
  tasks: {}, dnotes: {}, qs: {}, notes: {}, // 15-day plan checks, day notes, Q&A confidence, free notes
  topics: {}, mocks: [], games: {}, chat: {}, unplugged: false, goal: 3, dcode: {}, dres: {}, dn: {}, model: '', last: '', // per-day code snippets and resources // skill-tree results, mock history, game highs, Zero chats, help switched off
  ts: 0,
});
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function Provider({ user, init, children }) {
  const [S, setS] = useState(() => {
    let loc = null;
    try { loc = JSON.parse(localStorage.getItem('forge.' + user)); } catch { /* ignore */ }
    const pick = init && init.ts >= ((loc && loc.ts) || 0) ? init : (loc || init || {});
    return { ...DEF(), ...pick };
  });
  const [sv, setSv] = useState('✓ restored');
  const [toast, setToast] = useState('');
  const first = useRef(true), tm = useRef(), tt = useRef();

  const up = useCallback(fn => setS(p => { const n = structuredClone(p); fn(n); n.ts = Date.now(); return n; }), []);
  const say = useCallback(m => { setToast(m); clearTimeout(tt.current); tt.current = setTimeout(() => setToast(''), 2600); }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setSv('saving…');
    clearTimeout(tm.current);
    tm.current = setTimeout(async () => {
      try { localStorage.setItem('forge.' + user, JSON.stringify(S)); } catch { /* quota */ }
      try { await backend.save(S); setSv('✓ saved'); }
      catch (e) { setSv(e.status === 401 ? 'signed out' : '⚠ offline, local copy kept'); }
    }, backend.saveDelay);
  }, [S, user]);

  return <Ctx.Provider value={{ S, up, say, sv, toast, user }}>{children}</Ctx.Provider>;
}
