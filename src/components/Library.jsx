import { useState } from 'react';
import { useApp } from '../store.jsx';
import { days } from '../data/plan.js';

// Everything you wrote and saved, searchable: your revision shelf.
export default function Library({ go }) {
  const { S } = useApp();
  const [q, setQ] = useState('');
  const m = s => !q || s.toLowerCase().includes(q.toLowerCase());
  const open = n => go('day', n);
  const rows = days.map(d => ({
    d, sn: (S.dcode[d.n] || []).filter(x => m(x.t + ' ' + x.code)), rs: (S.dres[d.n] || []).filter(x => m(x.t + ' ' + x.u + ' ' + x.note)), note: m(S.dnotes[d.n] || '') && S.dnotes[d.n], nts: (S.dn[d.n] || []).filter(x => m(x.t + ' ' + x.b)),
  })).filter(r => r.sn.length || r.rs.length || r.note || r.nts.length);
  return (
    <div className="page"><div className="eb">My library</div><h1>Your code, notes and links</h1>
      <p className="mu">Everything you saved while studying, grouped by day. Search it before an interview to refresh quickly.</p>
      <div className="hd"><input type="search" placeholder="Search code, titles, notes, links…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search library" /></div>
      {rows.length ? rows.map(({ d, sn, rs, note, nts }) => (
        <div key={d.n} className="panel" style={{ margin: '10px 0' }}>
          <div className="hd" style={{ margin: 0 }}><b style={{ flex: 1 }}>Day {d.n}: {d.title}</b><button className="bt" onClick={() => open(d.n)}>Open day</button></div>
          {sn.map(x => <div key={x.id} className="lib"><b>💻 {x.t}</b><pre className="mono">{x.code.split('\n').slice(0, 4).join('\n')}</pre></div>)}
          {rs.map(r => <div key={r.id} className="lib">🔗 <a href={r.u} target="_blank" rel="noopener noreferrer">{r.t}</a>{r.note && <small className="mu"> · {r.note}</small>}</div>)}
          {nts.map(x => <div key={x.id} className="lib">📝 <b>{x.t}</b> <span className="mu">· {x.b.replace(/[#*`>\-\[\]]/g, '').replace(/\s+/g, ' ').trim().slice(0, 140)}…</span></div>)}
          {note && <div className="lib">📝 <span className="mu">{note.slice(0, 160)}{note.length > 160 ? '…' : ''}</span></div>}
        </div>))
        : <p className="mu">{q ? 'Nothing matches that search.' : 'Nothing saved yet. Open a day, use the Code and Resources tabs, and it will appear here.'}</p>}
    </div>
  );
}
