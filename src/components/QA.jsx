import { useState } from 'react';
import { useApp } from '../store.jsx';
import { questions } from '../data/plan.js';
import { bump } from '../lib/util.js';

export default function QA() {
  const { S, up, say } = useApp();
  const [cat, setCat] = useState('All'), [q, setQ] = useState(''), [open, setOpen] = useState({}), [flash, setFlash] = useState(null);
  const st = i => S.qs[i] || '';
  const cats = ['All', 'Needs practice', ...new Set(questions.map(x => x.cat))];
  const count = c => c === 'All' ? questions.length : c === 'Needs practice' ? questions.filter((_, i) => st(i) === 'review').length : questions.filter(x => x.cat === c).length;
  const list = questions.map((x, i) => ({ ...x, i })).filter(x => (cat === 'All' || (cat === 'Needs practice' ? st(x.i) === 'review' : x.cat === cat)) && (!q || (x.q + ' ' + x.a).toLowerCase().includes(q.toLowerCase())));
  const mark = (i, v) => { up(n => { n.qs[i] = n.qs[i] === v ? '' : v; bump(n); }); setOpen(o => ({ ...o, [i]: true })); };
  const quiz = () => {
    setCat('All'); setQ(''); const i = Math.floor(Math.random() * questions.length);
    setOpen({}); setFlash(i); say('Answer out loud first, then open the guide');
    setTimeout(() => document.getElementById('q' + i)?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50);
    setTimeout(() => setFlash(null), 1800);
  };
  return (
    <div className="page">
      <div className="eb">Interview Q&A</div><h1>{questions.filter((_, i) => st(i) === 'known').length}/{questions.length} confident</h1>
      <div className="hd">
        <button className="bt pri" onClick={quiz}>🎲 Quiz me</button>
        <input type="search" placeholder="Search questions…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search questions" />
      </div>
      <div className="hd">{cats.map(c => <button key={c} className={'bt' + (cat === c ? ' pri' : '')} onClick={() => setCat(c)}>{c} <small>{count(c)}</small></button>)}</div>
      {list.length ? list.map((x, n) => (
        <article key={x.i} id={'q' + x.i} className={'q ' + (st(x.i) ? 's-' + st(x.i) : '') + (flash === x.i ? ' flash' : '')}>
          <button className="qt" aria-expanded={!!open[x.i]} onClick={() => setOpen(o => ({ ...o, [x.i]: !o[x.i] }))}>
            <span className="mu">{String(n + 1).padStart(2, '0')}</span>
            <span className="qm"><strong>{x.q}</strong>
              <span><span className="pill">{x.cat}</span> <span className={'pill' + (x.lvl === 'Advanced' ? ' adv' : '')}>{x.lvl === 'Advanced' ? 'Advanced' : 'Core'}</span>
                {st(x.i) === 'known' && <span className="pill ok">✓ Confident</span>}{st(x.i) === 'review' && <span className="pill warn">⚑ Needs practice</span>}</span></span>
            <span>{open[x.i] ? '⌃' : '⌄'}</span>
          </button>
          {open[x.i] && <div className="qa"><b className="eb">Key points to cover</b><p>{x.a}</p>
            <div className="ch"><button className="bt" onClick={() => mark(x.i, 'known')}>✓ I can explain this</button><button className="bt" onClick={() => mark(x.i, 'review')}>⚑ Needs practice</button></div></div>}
        </article>
      )) : <p className="mu">No questions match.</p>}
    </div>
  );
}
