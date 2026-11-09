import { useEffect, useRef, useState } from 'react';
import * as zero from '../lib/zero.js';
import { useApp } from '../store.jsx';
import { buildDoc } from '../lib/util.js';
import CodeEditor from './CodeEditor.jsx';
import { useFullscreen } from '../lib/useFullscreen.js';

let RID = 100000; // run ids are unique across snippets so their messages never mix

// A small runnable code cell: editor + sandboxed run + console (or live preview for HTML/React).
export default function Snippet({ sn, onCode, onTitle, onDelete, onRun, ctxTask = '' }) {
  const { S, say } = useApp();
  const [ai, setAi] = useState(null); // Zero's review of this snippet: { busy } | { text } | { err }
  const fr = useRef(), rid = useRef(0);
  const [logs, setLogs] = useState([]), [tab, setTab] = useState('co'), [ran, setRan] = useState(false);
  const { fs, toggle: toggleFs, ref: snipRef } = useFullscreen();
  useEffect(() => {
    const on = e => {
      const d = e.data;
      if (d && d.r === rid.current && e.source === fr.current?.contentWindow && d.t === 'log') setLogs(l => [...l, { k: d.k, s: d.s }]);
    };
    window.addEventListener('message', on);
    return () => window.removeEventListener('message', on);
  }, []);
  const run = () => {
    rid.current = ++RID; setLogs([]); setRan(true);
    fr.current.srcdoc = buildDoc(sn.lang, sn.code, '', rid.current);
    setTab(sn.lang === 'js' ? 'co' : 'pv'); onRun();
  };
  const ask = async () => {
    setAi({ busy: true });
    const errs = logs.filter(l => l.k === 'error').map(l => l.s).slice(-3).join(' | ');
    try {
      const r = await zero.ask({ model: S.model || undefined, messages: [{ role: 'user', content: 'Check this snippet. Say what is right and the most important problems, without rewriting it.' }],
        ctx: { kind: 'check', title: sn.t, task: ctxTask, code: sn.code.slice(0, 2500), errs, extra: ran ? 'Console output from the last run:\n' + logs.slice(-8).map(l => l.s).join('\n').slice(0, 500) : 'The learner has not run this snippet yet.' } });
      setAi({ text: r.reply });
    } catch (e) { setAi({ err: e.message }); }
  };
  const preview = sn.lang !== 'js';
  return (
    <div ref={snipRef} className={`snip2 ${fs ? 'fs-focus' : ''}`}>
      <div className="hd" style={{ margin: '0 0 8px' }}>
        <input className="stitle" value={sn.t} onChange={e => onTitle(e.target.value)} aria-label="Snippet title" />
        <span className="pill">{sn.lang === 'js' ? 'JavaScript' : sn.lang === 'html' ? 'HTML' : 'React'}</span>
        <button className="bt pri" onClick={run}>▶ Run</button>
        {!S.unplugged && <button className="bt" disabled={ai?.busy} onClick={ask} title="Ask your local model to review this snippet">🤖 Check with Zero</button>}
        <button className="bt" onClick={() => { navigator.clipboard?.writeText(sn.code); say('Copied'); }}>Copy</button>
        <button className={'bt' + (fs ? ' pri' : '')} onClick={toggleFs} title={fs ? 'Exit full screen (Esc)' : 'Full screen focus (Esc to exit)'} aria-label={fs ? 'Exit full screen' : 'Full screen'}>{fs ? '↙ Exit full screen' : '⛶ Full screen'}</button>
        <button className="bt" onClick={() => { if (confirm('Delete this snippet?')) onDelete(); }} aria-label="Delete snippet">🗑</button>
      </div>
      <div className="sned"><CodeEditor value={sn.code} lang={sn.lang} onChange={onCode} onRun={run} /></div>
      {ran && <div className="sout">
        {preview && <div className="hd" style={{ margin: '0 0 6px' }}><button className={'bt' + (tab === 'pv' ? ' pri' : '')} onClick={() => setTab('pv')}>Preview</button><button className={'bt' + (tab === 'co' ? ' pri' : '')} onClick={() => setTab('co')}>Console ({logs.length})</button></div>}
        {tab === 'co' && (logs.length ? logs.map((x, i) => <div key={i} className={'ln ' + x.k}>{x.s}</div>) : <span className="mu">No console output.</span>)}
      </div>}
      {ai && <div className="bub a">{ai.busy ? 'Zero is reading your code… (the first answer can take a few seconds)' : ai.err ? <span style={{ color: 'var(--bad)' }}>{ai.err}</span> : <>🤖 {ai.text}</>}{!ai.busy && <div><button className="bt" onClick={() => setAi(null)}>Dismiss</button></div>}</div>}
      <iframe ref={fr} className="sfr" sandbox="allow-scripts" title="Snippet output" style={{ display: preview && ran && tab === 'pv' ? 'block' : 'none' }} />
    </div>
  );
}
