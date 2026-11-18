import { useState } from 'react';
import { useApp } from '../store.jsx';
import { questions } from '../data/questions.js';
import { bump } from '../lib/util.js';

export default function QA() {
  const { S, up, say } = useApp();
  const [cat, setCat] = useState('All');
  const [priority, setPriority] = useState('All');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState({});
  const [flash, setFlash] = useState(null);

  const st = i => S.qs[i] || '';
  const cats = ['All', 'Needs practice', ...new Set(questions.map(x => x.cat))];
  const count = c => c === 'All'
    ? questions.length
    : c === 'Needs practice'
      ? questions.filter((_, i) => st(i) === 'review').length
      : questions.filter(x => x.cat === c).length;

  const list = questions.map((x, i) => ({ ...x, i })).filter(x => {
    const matchesCat = cat === 'All'
      || (cat === 'Needs practice' ? st(x.i) === 'review' : x.cat === cat);
    const matchesPriority = priority === 'All' || x.priority === priority;
    const matchesSearch = !q
      || (x.q + ' ' + x.a + ' ' + (x.evaluating || '')).toLowerCase().includes(q.toLowerCase());
    return matchesCat && matchesPriority && matchesSearch;
  });

  const mark = (i, v) => {
    up(n => {
      n.qs[i] = n.qs[i] === v ? '' : v;
      bump(n);
    });
    setOpen(o => ({ ...o, [i]: true }));
    say(v === 'known' ? '✓ Marked confident' : '⚑ Marked for practice');
  };

  const quiz = () => {
    setCat('All');
    setPriority('All');
    setQ('');
    const i = Math.floor(Math.random() * questions.length);
    setOpen({});
    setFlash(i);
    say('Answer out loud first, then check the spoken guide');
    setTimeout(() => document.getElementById('q' + i)?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50);
    setTimeout(() => setFlash(null), 1800);
  };

  const confidentCount = questions.filter((_, i) => st(i) === 'known').length;
  const reviewCount = questions.filter((_, i) => st(i) === 'review').length;

  return (
    <div className="page">
      <div className="eb">Spoken Technical Preparation</div>
      <h1>Interview Question Bank</h1>
      <p className="mu">
        {confidentCount}/{questions.length} confident · {reviewCount} flagged for practice.
        Crafted for speaking out loud in React developer interviews (3–4 YOE).
      </p>

      {/* Action / Search bar */}
      <div className="hd" style={{ marginTop: 12 }}>
        <button className="bt pri" onClick={quiz}>🎲 Quiz me (Random)</button>
        <input
          type="search"
          placeholder="Search questions, concepts, answers…"
          value={q}
          onChange={e => setQ(e.target.value)}
          aria-label="Search questions"
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['All', 'P1', 'P2', 'P3'].map(pr => (
            <button
              key={pr}
              className={'bt' + (priority === pr ? ' pri' : '')}
              onClick={() => setPriority(pr)}
            >
              {pr === 'All' ? 'All Priorities' : pr + ' ' + (pr === 'P1' ? 'Essential' : pr === 'P2' ? 'Important' : 'Advanced')}
            </button>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div className="hd" style={{ margin: '8px 0 16px' }}>
        {cats.map(c => (
          <button
            key={c}
            className={'bt' + (cat === c ? ' on2' : '')}
            onClick={() => setCat(c)}
          >
            {c} <small>{count(c)}</small>
          </button>
        ))}
      </div>

      {/* Question List */}
      {list.length ? list.map((x, n) => {
        const isOpen = !!open[x.i];
        const currentStatus = st(x.i);

        return (
          <article
            key={x.id || x.i}
            id={'q' + x.i}
            className={'q ' + (currentStatus ? 's-' + currentStatus : '') + (flash === x.i ? ' flash' : '')}
          >
            <button
              className="qt"
              aria-expanded={isOpen}
              onClick={() => setOpen(o => ({ ...o, [x.i]: !o[x.i] }))}
            >
              <span className="mu" style={{ width: 24 }}>{String(n + 1).padStart(2, '0')}</span>
              <span className="qm">
                <strong style={{ fontSize: 15 }}>{x.q}</strong>
                <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                  <span className="pill">{x.cat}</span>
                  <span className={'pill' + (x.priority === 'P1' ? ' adv' : '')}>
                    {x.priority} {x.priority === 'P1' ? 'Essential' : ''}
                  </span>
                  {currentStatus === 'known' && <span className="pill ok">✓ Confident</span>}
                  {currentStatus === 'review' && <span className="pill warn">⚑ Needs practice</span>}
                </span>
              </span>
              <span style={{ fontSize: 16 }}>{isOpen ? '⌃' : '⌄'}</span>
            </button>

            {isOpen && (
              <div className="qa">
                {/* Spoken Answer */}
                <div className="task" style={{ background: 'var(--p2)', padding: 16, margin: '8px 0 14px' }}>
                  <b className="eb" style={{ display: 'block', marginBottom: 6 }}>Spoken Model Answer</b>
                  <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>{x.a}</p>
                </div>

                {/* Code Example if present */}
                {x.code && (
                  <div style={{ margin: '12px 0' }}>
                    <b className="mu" style={{ fontSize: 12 }}>Code Example / Demonstration:</b>
                    <pre id="sol" className="mono" style={{ margin: '6px 0', padding: 12 }}>
                      {x.code}
                    </pre>
                  </div>
                )}

                {/* Interviewer Evaluation & Rubric */}
                {x.evaluating && (
                  <div className="hint" style={{ borderLeft: '3px solid var(--ok)', margin: '10px 0' }}>
                    <b>What the interviewer is evaluating:</b>
                    <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.5 }}>{x.evaluating}</p>
                  </div>
                )}

                {/* Common Follow-up Questions */}
                {x.followUps && x.followUps.length > 0 && (
                  <div style={{ margin: '12px 0' }}>
                    <b className="mu" style={{ fontSize: 12 }}>Common Follow-Up Questions:</b>
                    <ul className="bl" style={{ marginTop: 4 }}>
                      {x.followUps.map((fu, fIdx) => (
                        <li key={fIdx} style={{ fontSize: 13, margin: '3px 0' }}>{fu}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Misconceptions */}
                {x.misconceptions && (
                  <div className="hint" style={{ borderLeft: '3px solid var(--bad)', margin: '10px 0' }}>
                    <b style={{ color: 'var(--bad)' }}>Common Trap / Misconception:</b>
                    <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.5 }}>{x.misconceptions}</p>
                  </div>
                )}

                {/* Rating actions */}
                <div className="ch" style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--ln)' }}>
                  <button
                    className={'bt' + (currentStatus === 'known' ? ' pri' : '')}
                    onClick={() => mark(x.i, 'known')}
                  >
                    ✓ I can explain this confidently
                  </button>
                  <button
                    className={'bt' + (currentStatus === 'review' ? ' pri' : '')}
                    onClick={() => mark(x.i, 'review')}
                  >
                    ⚑ Needs more practice
                  </button>
                </div>
              </div>
            )}
          </article>
        );
      }) : (
        <p className="mu" style={{ marginTop: 24 }}>No questions match your current filters.</p>
      )}
    </div>
  );
}
