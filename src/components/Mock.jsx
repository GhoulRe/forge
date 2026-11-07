import { useEffect, useRef, useState } from 'react';
import * as zero from '../lib/zero.js';
import { useApp } from '../store.jsx';
import { questions } from '../data/plan.js';
import { challenges } from '../data/items.js';
import { bump } from '../lib/util.js';
import Workspace from './Workspace.jsx';

const KINDS = {
  js: ['JavaScript Q&A', ['JavaScript']],
  react: ['React Q&A', ['React', 'Hooks & performance', 'Architecture & testing']],
  behav: ['Behavioral', ['Project & experience']],
  coding: ['Coding round', null],
};
const ORDER = { Easy: 0, Medium: 1, Hard: 2 };
const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
const shuffle = a => [...a].sort(() => Math.random() - 0.5);

function useCountdown(secs, key, onEnd) {
  const [left, setLeft] = useState(secs), end = useRef(onEnd);
  end.current = onEnd;
  useEffect(() => {
    setLeft(secs);
    const t = setInterval(() => setLeft(l => (l <= 1 ? (clearInterval(t), 0) : l - 1)), 1000);
    return () => clearInterval(t);
  }, [key, secs]);
  useEffect(() => { if (left === 0) end.current && end.current(); }, [left]);
  return left;
}

function QRun({ run, finish }) {
  const { up } = useApp();
  const [i, setI] = useState(0), [ans, setAns] = useState(''), [show, setShow] = useState(false), [rates, setRates] = useState([]);
  const [zero, setZero] = useState(false), [fu, setFu] = useState(''), [busy, setBusy] = useState(false);
  const qi = run.items[i], q = questions[qi];
  const left = useCountdown(120, i, () => setShow(true));
  useEffect(() => { zero.status().then(s => setZero(!!s.ok)).catch(() => {}); }, []);
  const rate = r => {
    up(n => { n.qs[qi] = r === 2 ? 'known' : 'review'; bump(n); });
    const nr = [...rates, r];
    if (i + 1 >= run.items.length) return finish(nr);
    setRates(nr); setI(i + 1); setAns(''); setShow(false); setFu('');
  };
  const followUp = async () => {
    setBusy(true);
    try { setFu((await zero.ask({ messages: [{ role: 'user', content: `Question: ${q.q}\nMy answer: ${ans || '(no answer)'}` }], ctx: { kind: 'interview', title: q.q } })).reply); }
    catch (e) { setFu(e.message); }
    setBusy(false);
  };
  return (
    <div className="page">
      <div className="hd"><span className="pill">Question {i + 1}/{run.items.length}</span><span className={'pill ' + (left < 20 ? 'warn' : '')}>⏱ {fmt(left)}</span></div>
      <h1>{q.q}</h1>
      <textarea className="na" rows={5} placeholder="Answer out loud, or type your outline here. No peeking." value={ans} onChange={e => setAns(e.target.value)} />
      {!show ? <div className="ch"><button className="bt pri" onClick={() => setShow(true)}>Reveal key points</button>{zero && <button className="bt" disabled={busy} onClick={followUp}>Ask the interviewer a follow-up</button>}</div> : <>
        <div className="task"><b>Key points.</b> {q.a}</div>
        {zero && !fu && <button className="bt" disabled={busy} onClick={followUp}>{busy ? 'Thinking…' : 'Ask the interviewer a follow-up'}</button>}
        {fu && <div className="bub a">🎤 {fu}</div>}
        <h3>Be honest: how did you do?</h3>
        <div className="ch"><button className="bt" onClick={() => rate(0)}>✗ Missed it</button><button className="bt" onClick={() => rate(1)}>~ Partial</button><button className="bt pri" onClick={() => rate(2)}>✓ Nailed it</button></div></>}
      {fu && !show && <div className="bub a">🎤 {fu}</div>}
      {zero === false && <p className="mu">Optional: connect a local model (Ollama) to get live follow-up questions.</p>}
    </div>
  );
}

function CodeRun({ run, finish }) {
  const [i, setI] = useState(0);
  const left = useCountdown(run.items.length * 20 * 60, 'all', () => finish());
  const item = challenges.find(c => c.id === run.items[i]);
  return (
    <div className="mockcode">
      <div className="hd" style={{ padding: '10px 16px', margin: 0 }}>
        <span className="pill">Problem {i + 1}/{run.items.length} · {item.sub}</span><span className={'pill ' + (left < 300 ? 'warn' : '')}>⏱ {fmt(left)}</span><span className="pill">🔌 Unplugged</span>
        <span style={{ flex: 1 }} />
        {i + 1 < run.items.length && <button className="bt" onClick={() => setI(i + 1)}>Next problem →</button>}
        <button className="bt pri" onClick={() => finish()}>Finish &amp; score</button>
      </div>
      <div className="mockbody"><Workspace key={item.id} item={item} embedded go={() => {}} /></div>
    </div>
  );
}

export default function Mock({ go }) {
  const { S, up } = useApp();
  const [cfg, setCfg] = useState({ kind: 'js', n: 5 }), [run, setRun] = useState(null);
  const coding = cfg.kind === 'coding', n = coding ? Math.min(cfg.n, 3) : cfg.n;

  const start = () => {
    let items;
    if (coding) {
      items = [...challenges].sort((a, b) => ORDER[a.sub] - ORDER[b.sub] || Math.random() - 0.5);
      const easy = items.filter(c => c.sub === 'Easy'), mid = items.filter(c => c.sub === 'Medium'), hard = items.filter(c => c.sub === 'Hard');
      items = [shuffle(easy)[0], shuffle(mid)[0], shuffle(hard)[0]].slice(0, n).map(c => c.id);
      up(m => { items.forEach(id => { delete m.code[id]; delete m.out[id]; }); });
    } else {
      const cats = KINDS[cfg.kind][1];
      items = shuffle(questions.map((q, i) => i).filter(i => cats.includes(questions[i].cat))).slice(0, n);
    }
    setRun({ kind: cfg.kind, items, start: Date.now() });
  };
  const finish = rates => {
    let res;
    if (run.kind === 'coding') {
      const ok = run.items.map(id => { const o = S.out[id]; return !!(o && o.ts >= run.start && o.tests.length && o.tests.every(t => t.ok)); });
      res = { score: ok.filter(Boolean).length, max: run.items.length, rows: run.items.map((id, k) => ({ t: challenges.find(c => c.id === id).t, r: ok[k] ? 2 : 0 })) };
    } else res = { score: rates.reduce((a, b) => a + b, 0), max: run.items.length * 2, rows: run.items.map((qi, k) => ({ t: questions[qi].q, r: rates[k] ?? 0 })) };
    up(m => { m.mocks = [...m.mocks, { ts: Date.now(), kind: run.kind, n: run.items.length, score: res.score, max: res.max }].slice(-30); bump(m); });
    setRun({ ...run, done: res });
  };

  if (run && run.done) {
    const d = run.done, pct = Math.round(d.score / d.max * 100);
    return (
      <div className="page"><div className="eb">Mock interview · {KINDS[run.kind][0]}</div><h1>{pct}%: {pct >= 80 ? 'interview ready' : pct >= 50 ? 'getting there' : 'keep building'}</h1>
        <div className="cards"><div className="cd"><b>{d.score}/{d.max}</b>points</div><div className="cd"><b>{run.items.length}</b>questions</div><div className="cd"><b>{Math.round((Date.now() - run.start) / 60000)}m</b>time taken</div></div>
        <h3>Review</h3>{d.rows.map((r, i) => <div key={i} className={'t ' + (r.r === 2 ? 'p' : 'f')}>{r.t}<small>{['Missed: added to Needs practice', 'Partial: added to Needs practice', 'Nailed it'][r.r]}</small></div>)}
        <div className="ch"><button className="bt pri" onClick={() => setRun(null)}>New mock</button>{run.kind !== 'coding' && <button className="bt" onClick={() => go('qa')}>Review weak questions</button>}</div></div>);
  }
  if (run) return run.kind === 'coding' ? <CodeRun run={run} finish={finish} /> : <QRun run={run} finish={finish} />;
  return (
    <div className="page"><div className="eb">Mock interview</div><h1>No tools. No hints. Just you.</h1>
      <p className="mu">A timed session that behaves like the real thing. Q&A rounds give you two minutes per question and ask you to rate yourself honestly (misses go to “Needs practice”). Coding rounds run unplugged, with no hints, no Zero and no solutions, and are scored by the tests you pass.</p>
      <h3>Round</h3><div className="hd">{Object.entries(KINDS).map(([k, [t]]) => <button key={k} className={'bt' + (cfg.kind === k ? ' pri' : '')} onClick={() => setCfg({ kind: k, n: k === 'coding' ? 2 : 5 })}>{t}</button>)}</div>
      <h3>Length</h3><div className="hd">{(coding ? [1, 2, 3] : [3, 5, 8]).map(x => <button key={x} className={'bt' + (n === x ? ' pri' : '')} onClick={() => setCfg({ ...cfg, n: x })}>{x} {coding ? (x === 1 ? 'problem · 20 min' : `problems · ${x * 20} min`) : 'questions'}</button>)}</div>
      <div className="ch"><button className="bt pri" onClick={start}>▶ Start mock interview</button></div>
      {S.mocks.length > 0 && <><h3>History</h3>{S.mocks.slice(-6).reverse().map((m, i) => <div key={i} className="t p">{KINDS[m.kind][0]} <b>{Math.round(m.score / m.max * 100)}%</b> <small className="mu" style={{ display: 'inline' }}>{m.n} questions · {new Date(m.ts).toLocaleDateString()}</small></div>)}</>}
    </div>
  );
}
