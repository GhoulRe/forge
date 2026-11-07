import { useEffect, useState } from 'react';
import { backend } from '../backend.js';

export default function Auth({ onIn }) {
  const fb = backend.mode === 'firebase';
  const [u, setU] = useState(''), [p, setP] = useState(''), [err, setErr] = useState(''), [note, setNote] = useState(''), [busy, setBusy] = useState(false);
  const [noServer, setNoServer] = useState(false);
  useEffect(() => { // on a static host with no Firebase configured, accounts cannot work: say so up front
    if (!fb) fetch('/api/me').then(async r => { const json = (r.headers.get('content-type') || '').includes('json'); await r.text(); if (!json) setNoServer(true); }).catch(() => setNoServer(true)); // read the body so the request completes
  }, []);
  const go = async kind => {
    setBusy(true); setErr(''); setNote('');
    try { onIn(await backend[kind](u, p)); } catch (e) { setErr(e.message); setBusy(false); }
  };
  const forgot = async () => {
    if (!u.trim()) return setErr('Type your email above first, then press Forgot password.');
    setErr(''); setBusy(true);
    try { await backend.reset(u); setNote('If that email has an account, a reset link is on its way. Check your inbox and spam.'); } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  return (
    <div id="auth"><form className="ac" onSubmit={e => { e.preventDefault(); go('login'); }}>
      <div className="logo" style={{ fontSize: 22 }}>Forge<b>_</b></div>
      <p className="mu">Interview plan, practice, challenges and notes in one place. {fb ? 'Saved to your Firebase account, so you can sign in from any computer.' : 'Everything is saved to your account.'}</p>
      {noServer && <div className="task" role="alert" style={{ margin: '10px 0', fontSize: 13 }}><b>No Forge server found here.</b> This looks like a static site with Firebase not configured, so accounts cannot work yet. If you own this site: add the <code>VITE_FIREBASE_*</code> variables in your host's settings and redeploy (see FIREBASE.md).</div>}
      <label>{backend.idLabel}<input type={fb ? 'email' : 'text'} value={u} onChange={e => setU(e.target.value)} autoComplete={fb ? 'email' : 'username'} maxLength={fb ? 120 : 20} /></label>
      <label>Password ({backend.pwHint})<input type="password" value={p} onChange={e => setP(e.target.value)} autoComplete="current-password" /></label>
      <div id="ae" role="alert">{err}{note && <span style={{ color: 'var(--ok)' }}>{note}</span>}</div>
      <div className="row">
        <button className="bt pri" disabled={busy}>Log in</button>
        <button type="button" className="bt" disabled={busy} onClick={() => go('signup')}>Create account</button>
        {fb && <button type="button" className="bt" disabled={busy} onClick={forgot}>Forgot password?</button>}
      </div>
    </form></div>
  );
}
