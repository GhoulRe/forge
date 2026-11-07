import { useEffect, useRef, useState } from 'react';
import * as zero from '../lib/zero.js';
import { useApp } from '../store.jsx';

const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
// [label, prompt, mode]: learn = Socratic hints, explain = teaches concepts, check = reviews work
export const QUICK = [
  ['I’m stuck', 'I’m stuck. Ask me a question that points me toward the next step, without giving the answer.', 'learn'],
  ['Explain the concept', 'Explain the main idea behind this exercise in simple terms with one tiny example. Do not solve the exercise.', 'explain'],
  ['Check my code', 'Check my current code. Say what is right and the most important problems, without rewriting it.', 'check'],
  ['Explain my error', 'Help me understand my failing tests or errors. Do not fix the code for me.', 'check'],
  ['Quiz me', 'Ask me one short question that checks whether I understand the idea behind this exercise.', 'learn'],
];

// Zero: a local-model coach that is aware of what you are working on. It guides; it does not hand over solutions.
export default function Coach({ item, code = '', fails = '', errs = '', extra = '', quick = QUICK, defKind = 'learn', placeholder = 'Ask Zero about your approach…' }) {
  const { S, up } = useApp();
  const [st, setSt] = useState(null), [txt, setTxt] = useState(''), [busy, setBusy] = useState(false), [err, setErr] = useState('');
  const msgs = S.chat[item.id] || [], end = useRef();
  useEffect(() => { zero.status().then(setSt).catch(() => setSt({ ok: false })); }, []);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }); }, [msgs.length, busy]);

  const send = async (text, kind = defKind) => {
    if (!text.trim() || busy) return;
    const next = [...msgs, { role: 'user', content: text }].slice(-8);
    up(n => { n.chat[item.id] = next; }); setTxt(''); setBusy(true); setErr('');
    try {
      const r = await zero.ask({ model: S.model || undefined, messages: next, ctx: { kind, title: item.t, task: strip(item.task || item.body), code: (code || '').slice(0, 2500), extra, fails, errs } });
      up(n => { n.chat[item.id] = [...next, { role: 'assistant', content: r.reply }].slice(-8); });
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  return (
    <div className="zero">
      <div className="zh"><b>Zero</b><span className="mu"> · knows what you are working on</span><span className={'pill ' + (st?.ok ? 'ok' : 'warn')}>{st === null ? 'checking…' : st.ok ? 'local' : 'offline'}</span></div>
      {st?.ok && st.models.length > 1 && <div className="hd" style={{ margin: '0 0 6px' }}><small className="mu">Model</small>
        <select className="num wide" style={{ marginLeft: 0 }} value={S.model || st.model} onChange={e => up(n => { n.model = e.target.value; })} aria-label="Local model">{st.models.map(m => <option key={m}>{m}</option>)}</select></div>}
      {st && !st.ok && <p className="mu">Zero runs on <b>your</b> machine with <a href="https://ollama.com" target="_blank" rel="noreferrer">Ollama</a>. Light option: <code>ollama pull qwen2.5-coder:3b</code> (about 2 GB). Then reload. Until then, use the 💡 hints.</p>}
      {msgs.map((m, i) => <div key={i} className={'bub ' + (m.role === 'user' ? 'u' : 'a')}>{m.content}</div>)}
      {busy && <div className="bub a mu">Zero is thinking… (the first answer can take a few seconds while the model loads)</div>}
      {err && <div className="bub a" style={{ color: 'var(--bad)' }}>{err}</div>}
      <div ref={end} />
      {st?.ok && <>
        <div className="ch">{quick.map(([l, p, k]) => <button key={l} className="bt" disabled={busy} onClick={() => send(p, k)}>{l}</button>)}{msgs.length > 0 && <button className="bt" onClick={() => up(n => { n.chat[item.id] = []; })}>Clear</button>}</div>
        <form className="zi" onSubmit={e => { e.preventDefault(); send(txt); }}><input value={txt} onChange={e => setTxt(e.target.value)} placeholder={placeholder} aria-label="Ask Zero" /><button className="bt pri" disabled={busy || !txt.trim()}>Ask</button></form>
        <small className="mu">Small local models can be wrong. Verify important facts in the docs.</small>
      </>}
    </div>
  );
}
