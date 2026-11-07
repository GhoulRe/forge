import { useState } from 'react';
import { useApp } from '../store.jsx';
import { SUGGEST, safeUrl } from '../lib/daycode.js';

// Your own links and notes for the day, plus a few trusted starting points you can add with one click.
export default function DayResources({ d }) {
  const { S, up, say } = useApp();
  const [t, setT] = useState(''), [u, setU] = useState(''), [note, setNote] = useState('');
  const list = S.dres[d.n] || [];
  const put = r => up(n => { n.dres[d.n] = [...(n.dres[d.n] || []), { ...r, id: 'r' + Date.now() }]; });
  const add = e => {
    e.preventDefault();
    const url = safeUrl(u);
    if (!url) return say('Enter a valid web address (https://…)');
    put({ t: t.trim() || new URL(url).hostname, u: url, note: note.trim() }); setT(''); setU(''); setNote('');
  };
  const sug = (SUGGEST[d.phase] || []).filter(([, url]) => !list.some(r => r.u === url));
  return (
    <div>
      <form onSubmit={add} className="rform">
        <input placeholder="Title (optional)" value={t} onChange={e => setT(e.target.value)} aria-label="Resource title" />
        <input placeholder="https://… link" value={u} onChange={e => setU(e.target.value)} aria-label="Resource link" required />
        <input placeholder="Why it is useful (optional)" value={note} onChange={e => setNote(e.target.value)} aria-label="Resource note" />
        <button className="bt pri">Add resource</button>
      </form>
      {list.length ? list.map(r => (
        <div key={r.id} className="res"><div><a href={r.u} target="_blank" rel="noopener noreferrer">{r.t} ↗</a>{r.note && <small className="mu">{r.note}</small>}</div>
          <button className="bt" aria-label="Remove resource" onClick={() => up(n => { n.dres[d.n] = n.dres[d.n].filter(x => x.id !== r.id); })}>✕</button></div>))
        : <p className="mu">No resources yet. Add articles, videos or docs you used so you can find them again.</p>}
      {sug.length > 0 && <><h3>Suggested starting points</h3><div className="hd">{sug.map(([n, url]) => <button key={url} className="bt" onClick={() => put({ t: n, u: url, note: '' })}>+ {n}</button>)}</div></>}
    </div>
  );
}
