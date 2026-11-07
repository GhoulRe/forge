import { useState } from 'react';
import { useApp } from '../store.jsx';
import { lessons, challenges, rounds } from '../data/items.js';

const TABS = { Lessons: lessons, Challenges: challenges, 'Coding rounds': rounds };

export default function Practice({ go }) {
  const { S } = useApp();
  const [tab, setTab] = useState('Challenges'), [f, setF] = useState('All'), [q, setQ] = useState('');
  const items = TABS[tab];
  const filters = ['All', 'Unsolved', ...new Set(items.map(i => i.sub)), ...(tab === 'Coding rounds' ? [...new Set(items.map(i => i.cat))] : [])];
  const list = items.filter(i => (f === 'All' || i.sub === f || i.cat === f || (f === 'Unsolved' && !S.done[i.id])) && (!q || (i.t + ' ' + (i.cat || '')).toLowerCase().includes(q.toLowerCase())));
  const solved = items.filter(i => S.done[i.id]).length;
  return (
    <div className="page">
      <div className="eb">Practice</div><h1>Learn, solve, track</h1>
      <div className="hd">{Object.keys(TABS).map(t => <button key={t} className={'bt' + (tab === t ? ' pri' : '')} onClick={() => { setTab(t); setF('All'); }}>{t} <small>{TABS[t].filter(i => S.done[i.id]).length}/{TABS[t].length}</small></button>)}</div>
      <div className="hd">
        {filters.map(x => <button key={x} className={'bt' + (f === x ? ' on2' : '')} onClick={() => setF(x)}>{x}</button>)}
        <input type="search" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search practice" />
      </div>
      <p className="mu">{solved} of {items.length} complete. Lessons and challenges have tests; coding-round problems open in the editor for self-review (React ones preview live).</p>
      {list.map(i => (
        <button key={i.id} className="row-it" onClick={() => go('work', i.id)}>
          <i className={'dt' + (S.done[i.id] ? ' ok' : '')} /><span className="rt">{i.t}</span>
          <small className="mu">{[i.cat, i.sub].filter(Boolean).join(' · ')}</small><span className="mu">{i.lang === 'react' ? '⚛ React' : i.tests ? '✓ tests' : ''}</span>
        </button>
      ))}
    </div>
  );
}
