import { useEffect, useReducer, useRef, useState } from 'react';
import { useApp } from '../store.jsx';
import { buildDoc, esc, bump } from '../lib/util.js';
import { catalog, lessons } from '../data/items.js';
import { removePad } from '../lib/pads.js';
import CodeEditor from './CodeEditor.jsx';
import Coach from './Coach.jsx';
import { VIZ } from './Viz.jsx';

// Learn pane + editor + sandboxed runner + tests, for lessons, challenges, interview problems and scratchpads.
export default function Workspace({ item, go, embedded }) {
  const { S, up, say } = useApp();
  const id = item.id, code = S.code[id] ?? item.code;
  const saved = S.out[id];
  const R = useRef({ logs: saved?.logs || [], tests: saved?.tests || [] });
  const [, tick] = useReducer(x => x + 1, 0);
  const [tab, setTab] = useState(saved?.tab || (item.lang === 'js' ? 'co' : 'pv'));
  const [sol, setSol] = useState(false), [pane, setPane] = useState(item.body ? 'learn' : 'code'); // phones show one pane at a time
  const fr = useRef(), rid = useRef(0), running = useRef(false), L = useRef();
  L.current = { S, up, say, item, tab };

  const finish = () => {
    if (!running.current) return;
    running.current = false;
    const { S: s, up: u, say: sy, item: it } = L.current, r = R.current;
    const pass = !!(it.tests && r.tests.length && r.tests.every(t => t.ok));
    if (pass && !s.done[it.id]) sy('🎉 All tests passed — completed');
    u(n => {
      n.out[it.id] = { logs: r.logs.slice(-200), tests: r.tests, tab: L.current.tab, ts: Date.now() };
      if (pass && !n.done[it.id]) { n.done[it.id] = 1; n.log = [...n.log, { id: it.id, ts: Date.now() }].slice(-60); }
    });
    tick();
  };

  useEffect(() => {
    const on = e => {
      const d = e.data;
      if (!d || d.r !== rid.current || e.source !== fr.current?.contentWindow) return;
      if (d.t === 'log') R.current.logs.push({ k: d.k, s: d.s });
      else if (d.t === 'test') R.current.tests.push({ n: d.n, ok: d.ok, m: d.m });
      else if (d.t === 'done') finish();
      tick();
    };
    window.addEventListener('message', on);
    return () => window.removeEventListener('message', on);
  }, []);

  const run = () => {
    const r = ++rid.current;
    R.current = { logs: [], tests: [] };
    running.current = true;
    up(n => { n.code[id] = code; bump(n); });
    fr.current.srcdoc = buildDoc(item.lang, code, item.tests, r);
    setTab(item.lang !== 'js' ? 'pv' : item.tests ? 'ts' : 'co');
    tick();
    setTimeout(() => { if (running.current && rid.current === r) { R.current.logs.push({ k: 'error', s: 'Timed out after 5s (infinite loop?)' }); finish(); } }, 5000);
  };

  const lock = embedded || S.unplugged; // unplugged: no hints, no Zero, no solutions
  const hints = lock ? [] : (item.h || []), used = S.hint[id] || 0, Viz = VIZ[item.v];
  const toggleDone = () => up(n => {
    if (n.done[id]) delete n.done[id];
    else { n.done[id] = 1; bump(n); n.log = [...n.log, { id, ts: Date.now() }].slice(-60); }
  });
  const i = catalog.findIndex(x => x.id === id), nb = n => (embedded ? null : catalog[i + n]);
  const tabs = [['co', 'Console', R.current.logs.length]];
  if (item.tests) tabs.push(['ts', 'Tests', R.current.tests.length ? `${R.current.tests.filter(t => t.ok).length}/${R.current.tests.length}` : '']);
  if (item.lang !== 'js') tabs.push(['pv', 'Preview', '']);
  const pad = S.pads.find(p => p.id === id);

  return (
    <div className="wk">
      <div className="paneswitch" role="tablist"><button role="tab" aria-selected={pane === 'learn'} className={pane === 'learn' ? 'on' : ''} onClick={() => setPane('learn')}>📖 Learn</button><button role="tab" aria-selected={pane === 'code'} className={pane === 'code' ? 'on' : ''} onClick={() => setPane('code')}>⌨ Code &amp; run</button></div>
      <div className="work" data-pane={pane}>
      <section id="learn">
        {!embedded && <button className="bt" onClick={() => go('practice')}>← All practice</button>}
        {item.body ? <>
          <div className="eb" style={{ marginTop: 14 }}>{item.tr} · {item.sub}</div>
          <h1>{item.t}</h1>
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
        </> : <>
          <div className="eb" style={{ marginTop: 14 }}>Scratchpad</div>
          <h1><input value={pad?.t || ''} aria-label="Scratchpad name" onChange={e => up(n => { n.pads.find(p => p.id === id).t = e.target.value || 'Untitled'; })} /></h1>
          <p className="mu">Your own sandbox. It is saved automatically and stays in the sidebar.</p>
          <button className="bt" onClick={() => { if (window.confirm(`Delete "${pad?.t || 'this scratchpad'}"? Its code is removed and cannot be recovered.`)) { up(n => removePad(n, id, lessons[0].id)); say('Scratchpad deleted'); go('practice'); } }}>🗑 Delete this scratchpad</button>
        </>}
        {S.unplugged && !embedded && <p className="mu">🔌 Unplugged: no hints, no Zero, no solutions. Just you and the problem.</p>}
        {Viz && <Viz />}
        {item.task && <div className="task"><b>Your task.</b> <span dangerouslySetInnerHTML={{ __html: item.task }} /></div>}
        {item.body && <div className="ch">
          {hints.length > 0 && <button className="bt" disabled={used >= hints.length} onClick={() => up(n => { n.hint[id] = used + 1; })}>💡 Hint ({used}/{hints.length})</button>}
          {!lock && item.sol && used >= hints.length && <button className="bt" onClick={() => setSol(!sol)}>{sol ? 'Hide approach' : 'Show approach'}</button>}
          <button className="bt" onClick={toggleDone}>{S.done[id] ? '✓ Completed' : 'Mark complete'}</button>
        </div>}
        {!lock && <Coach item={item} code={code} fails={R.current.tests.filter(t => !t.ok).map(t => t.n + (t.m ? ': ' + t.m : '')).join('; ')} errs={R.current.logs.filter(l => l.k === 'error').slice(-3).map(l => l.s).join(' | ')} />}
        {hints.slice(0, used).map((h, k) => <div className="hint" key={k}><b>{k + 1}.</b> {h}</div>)}
        {sol && <pre id="sol" className="mono" dangerouslySetInnerHTML={{ __html: '<b>One possible approach</b>\n' + esc(item.sol) }} />}
        <div className="ch">{nb(-1) && <button className="bt" onClick={() => go('work', nb(-1).id)}>← {nb(-1).t}</button>}{nb(1) && <button className="bt" onClick={() => go('work', nb(1).id)}>{nb(1).t} →</button>}</div>
      </section>
      <section id="code">
        <div className="bar">
          <span className="f">{item.lang === 'html' ? 'index.html' : item.lang === 'react' ? 'App.jsx' : 'main.js'}</span>
          <button className="bt" onClick={() => { if (confirm('Reset this file to its starter code?')) up(n => { delete n.code[id]; }); }}>Reset</button>
          <button className="bt pri" onClick={run}>▶ Run <small>⌘↵</small></button>
        </div>
        <CodeEditor value={code} lang={item.lang} onChange={v => up(n => { n.code[id] = v; })} onRun={run} />
        <div id="out">
          <div className="bar" id="tb">{tabs.map(([k, n, c]) => <button key={k} className={'tb' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{n} {c !== '' ? `(${c})` : ''}</button>)}</div>
          <div id="ob" style={{ display: tab === 'pv' ? 'none' : 'block' }}>
            {tab === 'co' && (R.current.logs.length ? R.current.logs.map((x, k) => <div key={k} className={'ln ' + x.k}>{x.s}</div>) : <span className="mu">Press ▶ Run (⌘/Ctrl + Enter). Output is saved with your session.</span>)}
            {tab === 'ts' && (R.current.tests.length ? R.current.tests.map((t, k) => <div key={k} className={'t ' + (t.ok ? 'p' : 'f')}>{t.n}{t.m && <small>{t.m}</small>}</div>) : <span className="mu">Run your code to check it against the tests.</span>)}
          </div>
          <iframe ref={fr} id="fr" className={tab === 'pv' ? 'show' : ''} sandbox="allow-scripts" title="Preview" />
        </div>
      </section>
      </div>
    </div>
  );
}
