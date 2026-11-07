import { useState } from 'react';
import { useApp } from '../store.jsx';
import { DOMAINS } from '../data/domains.js';
import { LABS } from './Labs.jsx';
import { bump } from '../lib/util.js';

function Quiz({ topic }) {
  const { S, up, say } = useApp();
  const [pick, setPick] = useState({}), [checked, setChecked] = useState(false);
  const score = topic.quiz.filter((q, i) => pick[i] === q.a).length, pct = Math.round(score / topic.quiz.length * 100);
  const check = () => {
    setChecked(true);
    up(n => {
      const prev = n.topics[topic.id] || { best: 0, done: false };
      const done = prev.done || pct >= 66;
      if (done && !prev.done) { n.log = [...n.log, { id: 'topic:' + topic.id, ts: Date.now() }].slice(-60); }
      n.topics[topic.id] = { best: Math.max(prev.best, pct), done }; bump(n);
    });
    say(pct >= 66 ? 'Topic complete 🎉' : 'Not yet: review the explanations and retry');
  };
  return (
    <div><h3>Check yourself</h3>
      {topic.quiz.map((q, i) => (
        <fieldset key={i} className="qz"><legend>{i + 1}. {q.q}</legend>
          {q.o.map((o, j) => <label key={j} className={'op' + (checked ? (j === q.a ? ' good' : pick[i] === j ? ' bad' : '') : '')}><input type="radio" name={topic.id + i} disabled={checked} checked={pick[i] === j} onChange={() => setPick({ ...pick, [i]: j })} /> {o}</label>)}
          {checked && <p className="mu">{pick[i] === q.a ? '✓ ' : '✗ '}{q.w}</p>}
        </fieldset>))}
      <div className="ch">{!checked ? <button className="bt pri" disabled={Object.keys(pick).length < topic.quiz.length} onClick={check}>Check answers</button> : <><b>{score}/{topic.quiz.length}</b> <button className="bt" onClick={() => { setPick({}); setChecked(false); }}>Try again</button></>}
        {S.topics[topic.id]?.done && <span className="pill ok">✓ Completed · best {S.topics[topic.id].best}%</span>}</div>
    </div>
  );
}

export default function Skills() {
  const { S } = useApp();
  const [dom, setDom] = useState(null), [top, setTop] = useState(null);
  const d = DOMAINS.find(x => x.id === dom), t = d?.topics.find(x => x.id === top), Lab = t && LABS[t.lab];
  const done = x => x.topics.filter(y => S.topics[y.id]?.done).length;
  if (t) return (
    <div className="page"><button className="bt" onClick={() => setTop(null)}>← {d.name}</button>
      <div className="eb" style={{ marginTop: 14 }}>{d.icon} {d.name}</div><h1>{t.t}</h1>
      <div dangerouslySetInnerHTML={{ __html: t.explain }} />{Lab && <Lab />}<Quiz key={t.id} topic={t} /></div>);
  if (d) return (
    <div className="page"><button className="bt" onClick={() => setDom(null)}>← Skill tree</button>
      <div className="eb" style={{ marginTop: 14 }}>{d.icon} Skill tree</div><h1>{d.name}</h1><p className="mu">{d.blurb}</p>
      {d.topics.map(x => <button key={x.id} className="row-it" onClick={() => setTop(x.id)}><i className={'dt' + (S.topics[x.id]?.done ? ' ok' : '')} /><span className="rt">{x.t}</span><span className="mu">{x.lab ? '🧪 interactive lab · ' : ''}{x.quiz.length} questions</span></button>)}</div>);
  return (
    <div className="page"><div className="eb">Skill tree</div><h1>Build skills that stay with you</h1>
      <p className="mu">Learn the concept, play with it, then prove you understood it. Pair this with the Practice area for DSA and with Mock interview when you are ready to be tested.</p>
      <div className="g3">{DOMAINS.map(x => <button key={x.id} className="dc" onClick={() => setDom(x.id)}><span className="pill">{done(x)}/{x.topics.length} done</span><h3>{x.icon} {x.name}</h3><p className="mu">{x.blurb}</p><div className="bar2"><i style={{ width: done(x) / x.topics.length * 100 + '%' }} /></div></button>)}</div></div>);
}
