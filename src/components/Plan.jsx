import { useEffect, useState } from 'react';
import { useApp } from '../store.jsx';
import { days } from '../data/plan.js';
import { bump } from '../lib/util.js';
import Link from './Link.jsx';
import DayCode from './DayCode.jsx';
import DayResources from './DayResources.jsx';
import DayNotes from './DayNotes.jsx';
import DayZero from './DayZero.jsx';

const doneCount = (S, d) => d.tasks.filter((_, i) => S.tasks[d.n + '-' + i]).length;
const status = (S, d) => { const c = doneCount(S, d); return c === d.tasks.length ? ['done', '✓ Done'] : c || S.dcode[d.n] || (S.dn[d.n] || []).length || (S.dres[d.n] || []).length ? ['doing', 'In progress'] : ['todo', 'Not started']; };

// One day as its own page: /plan/:n and /plan/:n/(notes|code|resources|zero)
function DayPage({ d, tab }) {
  const { S, up, say } = useApp();
  const toggle = i => up(n => {
    const k = d.n + '-' + i; n.tasks[k] = !n.tasks[k]; bump(n);
    if (d.tasks.every((_, j) => n.tasks[d.n + '-' + j])) { n.log = [...n.log, { id: 'day' + d.n, ts: Date.now() }].slice(-60); say('Day ' + d.n + ' complete 🎉'); }
  });
  const List = ({ title, items }) => items?.length ? <><h3>{title}</h3><ul className="bl">{items.map((x, i) => <li key={i}>{x}</li>)}</ul></> : null;
  const nn = S.dn[d.n] ? S.dn[d.n].length : (S.dnotes[d.n] ? 1 : 0);
  const tabs = [['plan', 'Plan'], ['notes', 'Notes (' + nn + ')'], ['code', 'Code (' + (S.dcode[d.n] ? S.dcode[d.n].length : (d.coding || []).length) + ')'], ['res', 'Resources (' + (S.dres[d.n] || []).length + ')'], ...(S.unplugged ? [] : [['zero', '🤖 Zero']])];
  const key = { notes: 'notes', code: 'code', resources: 'res', zero: 'zero' }[tab] || 'plan';
  const c = doneCount(S, d), [st, label] = status(S, d), prev = days[d.n - 2], next = days[d.n];
  useEffect(() => { document.querySelector('.dt2.on')?.scrollIntoView({ inline: 'center', block: 'nearest' }); }, [key]); // phones: keep the active tab in view
  const href = k => '/plan/' + d.n + (k === 'plan' ? '' : '/' + (k === 'res' ? 'resources' : k));
  return (
    <div className="page daypage">
      <Link to="/plan" className="back">← All days</Link>
      <div className="eb" style={{ marginTop: 12 }}>Day {d.n} · {d.phase}</div>
      <h1>{d.title}</h1>
      <p className="mu" style={{ maxWidth: '70ch' }}>{d.theme}. {d.goal}</p>
      <div className="hd" style={{ margin: '4px 0 0' }}><span className={'st ' + st}>{label}</span><div className="bar2" style={{ width: 180 }}><i style={{ width: c / d.tasks.length * 100 + '%' }} /></div><small className="mu">{c}/{d.tasks.length} tasks</small></div>
      <div className="daytabs" role="tablist">{tabs.map(([k, l]) => <Link key={k} to={href(k)} role="tab" aria-selected={key === k} className={'dt2' + (key === k ? ' on' : '')}>{l}</Link>)}</div>
      {key === 'plan' && <>
        <h3>Today’s tasks</h3>
        {d.tasks.map((t, i) => <label key={i} className="tk"><input type="checkbox" checked={!!S.tasks[d.n + '-' + i]} onChange={() => toggle(i)} /><span>{t}</span></label>)}
        <List title="Practise answering" items={d.questions} />
        <List title="Coding prompts" items={d.coding} />
        <List title="Bonus topics to go deeper" items={d.extra} />
        <div className="task"><b>End-of-day target.</b> {d.deliverable}</div>
        <p className="mu">📝 Write proper notes in the <Link to={href('notes')} style={{ color: 'var(--ac)' }}>Notes</Link> tab, code the prompts in <Link to={href('code')} style={{ color: 'var(--ac)' }}>Code</Link>, and ask Zero to check or explain in <Link to={href('zero')} style={{ color: 'var(--ac)' }}>Zero</Link>.</p>
      </>}
      {key === 'notes' && <DayNotes d={d} />}
      {key === 'code' && <DayCode d={d} />}
      {key === 'res' && <DayResources d={d} />}
      {key === 'zero' && (S.unplugged ? <p className="mu">🔌 Unplugged mode is on, so Zero is hidden. Switch to “Plugged in” in the header to use it.</p> : <DayZero d={d} />)}
      <div className="daynav">
        {prev ? <Link className="bt" to={'/plan/' + prev.n}>← Day {prev.n}: {prev.title}</Link> : <span />}
        {next ? <Link className="bt" to={'/plan/' + next.n}>Day {next.n}: {next.title} →</Link> : <span />}
      </div>
    </div>
  );
}

export default function Plan({ day, tab }) {
  const { S } = useApp();
  const [ph, setPh] = useState('All'), [q, setQ] = useState('');
  if (day !== null) { const d = days.find(x => x.n === day); return d ? <DayPage key={d.n} d={d} tab={tab} /> : <div className="page"><h1>Day not found</h1><Link to="/plan" style={{ color: 'var(--ac)' }}>← All days</Link></div>; }
  const phases = ['All', ...new Set(days.map(d => d.phase))];
  const list = days.filter(d => (ph === 'All' || d.phase === ph) && (!q || JSON.stringify(d).toLowerCase().includes(q.toLowerCase())));
  const complete = days.filter(d => doneCount(S, d) === d.tasks.length).length;
  return (
    <div className="page">
      <div className="eb">15-day sprint</div><h1>Interview preparation plan</h1>
      <p className="mu">{complete} of {days.length} days complete. Open a day to study, take notes, code and ask Zero.</p>
      <div className="hd">
        {phases.map(p => <button key={p} className={'bt' + (ph === p ? ' pri' : '')} onClick={() => setPh(p)}>{p}</button>)}
        <input type="search" placeholder="Search days, topics…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search plan" />
      </div>
      <div className="g3">
        {list.map(d => { const c = doneCount(S, d), r = (S.dres[d.n] || []).length, [st, label] = status(S, d); return (
          <Link key={d.n} to={'/plan/' + d.n} className={'dc ' + st}>
            <div className="hd" style={{ margin: 0, justifyContent: 'space-between' }}><span className="pill">Day {d.n} · {d.phase}</span><span className={'st ' + st}>{label}</span></div>
            <h3>{d.title}</h3><p className="mu">{d.summary}</p>
            <div className="bar2"><i style={{ width: c / d.tasks.length * 100 + '%' }} /></div><small className="mu">{c}/{d.tasks.length} tasks{S.dcode[d.n] ? ` · 💻 ${S.dcode[d.n].length}` : ''}{(S.dn[d.n] || []).length ? ` · 📝 ${S.dn[d.n].length}` : ''}{r ? ` · 🔗 ${r}` : ''}</small>
          </Link>); })}
      </div>
    </div>
  );
}
