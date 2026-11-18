import { useEffect, useState } from 'react';
import { backend } from '../backend.js';
import { getStoredLocalState, saveStoredLocalState } from '../store.jsx';

export default function Auth({ onIn, onCancel }) {
  const fb = backend.mode === 'firebase';
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [noServer, setNoServer] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'

  useEffect(() => {
    // If running in server mode without server running
    if (!fb) {
      fetch('/api/me')
        .then(async r => {
          const json = (r.headers.get('content-type') || '').includes('json');
          await r.text();
          if (!json) setNoServer(true);
        })
        .catch(() => setNoServer(true));
    }
  }, [fb]);

  const mergeGuestStateIfNeeded = (cloudState) => {
    const guestState = getStoredLocalState('guest');
    if (!guestState) return cloudState;
    // If guest state has progress (tasks, qs, done, pads), merge them
    const merged = {
      ...guestState,
      ...cloudState,
      tasks: { ...(guestState.tasks || {}), ...(cloudState.tasks || {}) },
      criterion: { ...(guestState.criterion || {}), ...(cloudState.criterion || {}) },
      qs: { ...(guestState.qs || {}), ...(cloudState.qs || {}) },
      done: { ...(guestState.done || {}), ...(cloudState.done || {}) },
      pads: [...(guestState.pads || []), ...(cloudState.pads || [])].filter((p, i, a) => a.findIndex(x => x.id === p.id) === i),
      notes: { ...(guestState.notes || {}), ...(cloudState.notes || {}) },
      dnotes: { ...(guestState.dnotes || {}), ...(cloudState.dnotes || {}) },
      days: { ...(guestState.days || {}), ...(cloudState.days || {}) },
      ts: Math.max(guestState.ts || 0, cloudState.ts || 0)
    };
    return merged;
  };

  const go = async kind => {
    if (!u.trim() || !p) {
      setErr('Please fill in both fields.');
      return;
    }
    setBusy(true);
    setErr('');
    setNote('');
    try {
      const res = await backend[kind](u, p);
      const finalState = mergeGuestStateIfNeeded(res.state || {});
      saveStoredLocalState(res.user, finalState);
      onIn({ user: res.user, state: finalState });
    } catch (e) {
      setErr(e.message);
      setBusy(false);
    }
  };

  const forgot = async () => {
    if (!u.trim()) {
      setErr('Type your email above first, then press Send reset link.');
      return;
    }
    setErr('');
    setBusy(true);
    try {
      await backend.reset(u);
      setNote('If that email has an account, a reset link was sent. Check your inbox and spam folder.');
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  };

  const continueAsGuest = () => {
    const guestState = getStoredLocalState('guest') || {};
    onIn({ user: 'guest', state: guestState });
  };

  return (
    <div id="auth">
      <form
        className="ac"
        onSubmit={e => {
          e.preventDefault();
          if (mode === 'forgot') forgot();
          else go(mode);
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="logo" style={{ fontSize: 24 }}>Forjix<b>_</b></div>
          {onCancel && <button type="button" className="bt" onClick={onCancel}>✕ Close</button>}
        </div>
        <div className="eb" style={{ marginBottom: 8 }}>15-Day React Interview Prep</div>
        <p className="mu" style={{ fontSize: 13, lineHeight: 1.5, margin: '4px 0 16px' }}>
          {fb
            ? 'Sign in with Firebase to sync your 15-day syllabus, solved coding problems, and interview notes across all your devices.'
            : 'Everything is saved locally or to your server account.'}
        </p>

        {noServer && (
          <div className="task" role="alert" style={{ margin: '10px 0', fontSize: 13 }}>
            <b>Running in local offline mode.</b> You can use the full platform as a Guest with offline persistence.
          </div>
        )}

        <label>
          {backend.idLabel}
          <input
            type={fb ? 'email' : 'text'}
            value={u}
            onChange={e => setU(e.target.value)}
            autoComplete={fb ? 'email' : 'username'}
            maxLength={fb ? 120 : 40}
            placeholder={fb ? 'you@example.com' : 'username'}
          />
        </label>

        {mode !== 'forgot' && (
          <label>
            Password ({backend.pwHint})
            <input
              type="password"
              value={p}
              onChange={e => setP(e.target.value)}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              placeholder="••••••••"
            />
          </label>
        )}

        <div id="ae" role="alert">
          {err && <span>{err}</span>}
          {note && <span style={{ color: 'var(--ok)' }}>{note}</span>}
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          {mode === 'login' && (
            <>
              <button className="bt pri" disabled={busy} type="submit" style={{ flex: 1 }}>Log in</button>
              <button type="button" className="bt" disabled={busy} onClick={() => setMode('signup')}>Create account</button>
            </>
          )}

          {mode === 'signup' && (
            <>
              <button className="bt pri" disabled={busy} type="submit" style={{ flex: 1 }}>Sign up</button>
              <button type="button" className="bt" disabled={busy} onClick={() => setMode('login')}>Already have account</button>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <button className="bt pri" disabled={busy} type="submit" style={{ flex: 1 }}>Send reset link</button>
              <button type="button" className="bt" disabled={busy} onClick={() => setMode('login')}>Back to login</button>
            </>
          )}
        </div>

        {fb && mode === 'login' && (
          <div style={{ textAlign: 'right', marginTop: 8 }}>
            <button
              type="button"
              style={{ background: 'none', border: 0, color: 'var(--ac)', fontSize: 12, padding: 0 }}
              onClick={() => { setMode('forgot'); setErr(''); setNote(''); }}
            >
              Forgot password?
            </button>
          </div>
        )}

        <div style={{ margin: '20px 0 12px', borderTop: '1px solid var(--ln)', position: 'relative', textAlign: 'center' }}>
          <span style={{ position: 'relative', top: -10, background: 'var(--pn)', padding: '0 10px', fontSize: 12, color: 'var(--mu)' }}>
            or start instantly
          </span>
        </div>

        <button
          type="button"
          className="bt"
          style={{ width: '100%', padding: '10px 12px', fontSize: 13, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}
          onClick={continueAsGuest}
        >
          ⚡ Continue as Guest (Offline Mode)
        </button>
        <p className="mu" style={{ fontSize: 11, textAlign: 'center', marginTop: 8 }}>
          No sign-in required. Your progress saves in your browser storage. You can link a Firebase account at any time.
        </p>
      </form>
    </div>
  );
}
