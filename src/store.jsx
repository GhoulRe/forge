import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { backend } from './backend.js';

// Default user state schema for Forjix
export const DEF = () => ({
  view: 'dash',
  cur: 'closures',                          // last workspace item visited
  code: {}, out: {}, hint: {}, done: {},    // workspace: code, last output, hints used, completed items
  pads: [], log: [], days: {},              // scratchpads, completion log, activity days (streak)
  tasks: {}, criterion: {}, recalls: {},     // 15-day plan: task checks, completion criteria, recall scores
  dnotes: {}, qs: {}, notes: {},            // day notes, Q&A confidence ('known' | 'review'), free notes
  topics: {}, mocks: [], games: {}, chat: {},
  unplugged: false, goal: 3,
  dcode: {}, dres: {}, dn: {}, model: '', last: '',
  ts: 0,
});

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function getStoredLocalState(user) {
  try {
    const raw = localStorage.getItem('forjix.' + user) || localStorage.getItem('forge.' + user);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredLocalState(user, state) {
  try {
    localStorage.setItem('forjix.' + user, JSON.stringify(state));
  } catch {
    /* ignore storage quota errors */
  }
}

export function Provider({ user, init, children, onSyncAccount }) {
  const [S, setS] = useState(() => {
    const loc = getStoredLocalState(user);
    const pick = init && init.ts >= ((loc && loc.ts) || 0) ? init : (loc || init || {});
    return { ...DEF(), ...pick };
  });
  const [sv, setSv] = useState(user === 'guest' ? '⚡ Guest (local)' : '✓ restored');
  const [toast, setToast] = useState('');
  const first = useRef(true), tm = useRef(), tt = useRef();

  const up = useCallback(fn => setS(p => {
    const n = structuredClone(p);
    fn(n);
    n.ts = Date.now();
    return n;
  }), []);

  const say = useCallback(m => {
    setToast(m);
    clearTimeout(tt.current);
    tt.current = setTimeout(() => setToast(''), 2800);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setSv(user === 'guest' ? 'saving locally…' : 'saving…');
    clearTimeout(tm.current);
    tm.current = setTimeout(async () => {
      saveStoredLocalState(user, S);
      if (user === 'guest') {
        setSv('⚡ Saved locally');
        return;
      }
      try {
        await backend.save(S);
        setSv('✓ synced to cloud');
      } catch (e) {
        setSv(e.status === 401 ? 'signed out' : '⚠ offline, local copy kept');
      }
    }, backend.saveDelay);
  }, [S, user]);

  return <Ctx.Provider value={{ S, up, say, sv, toast, user, onSyncAccount }}>{children}</Ctx.Provider>;
}
