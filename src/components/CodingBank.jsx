import { useState } from 'react';
import { useApp } from '../store.jsx';
import { problems as advancedProblems } from '../data/problems.js';
import { practicalProblems } from '../data/practical/problems.js';
import { bump } from '../lib/util.js';
import TrackSwitch from './TrackSwitch.jsx';

export default function CodingBank({ go, track = 'practical' }) {
  const { S, up, say } = useApp();
  const problems = track === 'practical' ? practicalProblems : advancedProblems;
  const [selectedId, setSelectedId] = useState(null);
  const [cat, setCat] = useState('All');
  const [diff, setDiff] = useState('All');
  const [prio, setPrio] = useState('All');
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');
  const [revealedHints, setRevealedHints] = useState({});
  const [showSolution, setShowSolution] = useState({});

  const categories = ['All', ...new Set(problems.map(p => p.cat))];
  const priorities = ['All', 'P1', 'P2', 'P3'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = problems.filter(p => {
    const matchesCat = cat === 'All' || p.cat === cat;
    const matchesDiff = diff === 'All' || p.difficulty === diff;
    const matchesPrio = prio === 'All' || p.priority === prio;
    const matchesStatus = status === 'All'
      || (status === 'Solved' ? S.done[p.id] : !S.done[p.id]);
    const matchesQuery = !query.trim()
      || (p.title + ' ' + p.desc + ' ' + p.cat).toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesDiff && matchesPrio && matchesStatus && matchesQuery;
  });

  const toggleDone = (id) => {
    up(n => {
      if (n.done[id]) {
        delete n.done[id];
        say('Marked as unsolved');
      } else {
        n.done[id] = 1;
        bump(n);
        n.log = [...n.log, { id, ts: Date.now() }].slice(-60);
        say('🎉 Problem marked complete');
      }
    });
  };

  const revealNextHint = (id, totalHints) => {
    setRevealedHints(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, totalHints)
    }));
  };

  const selectedProblem = problems.find(p => p.id === selectedId);

  return (
    <div className="page">
      <div className="eb">Problem-Solving &amp; DSA</div>
      <h1>Coding Problem Bank</h1>
      <p className="mu">
        Structured patterns and interview staples for React and frontend developers. Follow the framework: 
        <b> Understand → Brute force → Edge cases → Optimize → Explain complexity → Discuss trade-offs.</b>
      </p>

      <TrackSwitch track={track} practicalTo="/coding/practical" advancedTo="/coding/advanced" subject="coding problem bank" />

      <p className="mu" style={{ marginTop: -8 }}>
        {track === 'practical' ? 'Exercises mapped to the practical 15-day schedule.' : 'Problems from the original Advanced coding bank.'}
      </p>

      {/* Filter toolbar */}
      <div className="hd" style={{ marginTop: 14 }}>
        <input
          type="search"
          placeholder="Search problems, patterns, topics…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ maxWidth: 300 }}
          aria-label="Search problems"
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {priorities.map(p => (
            <button
              key={p}
              className={'bt' + (prio === p ? ' pri' : '')}
              onClick={() => setPrio(p)}
            >
              {p === 'All' ? 'All Priorities' : p + ' ' + (p === 'P1' ? 'Essential' : p === 'P2' ? 'Important' : 'Advanced')}
            </button>
          ))}
        </div>
      </div>

      <div className="hd" style={{ margin: '6px 0 14px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <small className="mu">Category:</small>
          {categories.map(c => (
            <button
              key={c}
              className={'bt' + (cat === c ? ' on2' : '')}
              onClick={() => setCat(c)}
              style={{ fontSize: 12, padding: '4px 8px' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="hd" style={{ margin: '6px 0 16px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <small className="mu">Difficulty:</small>
          {difficulties.map(d => (
            <button
              key={d}
              className={'bt' + (diff === d ? ' on2' : '')}
              onClick={() => setDiff(d)}
              style={{ fontSize: 12, padding: '4px 8px' }}
            >
              {d}
            </button>
          ))}
          <span style={{ marginLeft: 12 }} />
          <small className="mu">Status:</small>
          {['All', 'Solved', 'Unsolved'].map(s => (
            <button
              key={s}
              className={'bt' + (status === s ? ' on2' : '')}
              onClick={() => setStatus(s)}
              style={{ fontSize: 12, padding: '4px 8px' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ margin: '8px 0 12px', fontSize: 13, color: 'var(--mu)' }}>
        Showing <b>{filtered.length}</b> of {problems.length} problems · {problems.filter(p => S.done[p.id]).length} solved
      </div>

      {/* Problem list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(p => {
          const isDone = !!S.done[p.id];
          return (
            <div
              key={p.id}
              className={'row-it' + (isDone ? ' ok' : '')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 8, padding: 14 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => toggleDone(p.id)}
                  style={{ background: 'none', border: 0, padding: 0 }}
                  title={isDone ? 'Mark unsolved' : 'Mark solved'}
                >
                  <i className={'dt' + (isDone ? ' ok' : '')} />
                </button>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <b style={{ fontSize: 15, cursor: 'pointer' }} onClick={() => setSelectedId(p.id)}>
                      {p.title}
                    </b>
                    <span className="pill">{p.cat}</span>
                    <span className={'pill' + (p.priority === 'P1' ? ' adv' : '')}>
                      {p.priority} {p.priority === 'P1' ? 'Essential' : p.priority === 'P2' ? 'Follow-up' : 'Advanced'}
                    </span>
                    <span className={'pill' + (p.difficulty === 'Hard' ? ' warn' : '')}>
                      {p.difficulty}
                    </span>
                  </div>
                  <small className="mu" style={{ marginTop: 2 }}>{p.objective || p.desc}</small>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="bt" onClick={() => setSelectedId(p.id)}>View Details</button>
                  <button className="bt pri" onClick={() => go('work', p.id)}>Live Code →</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Problem detail modal */}
      {selectedProblem && (
        <div className="mdl" onClick={() => setSelectedId(null)}>
          <div className="mc" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="pill">{selectedProblem.cat}</span>{' '}
                <span className="pill adv">{selectedProblem.priority} {selectedProblem.priority === 'P1' ? 'Essential' : selectedProblem.priority === 'P2' ? 'Follow-up' : 'Advanced'}</span>{' '}
                <span className="pill">{selectedProblem.difficulty}</span>
                <h1 style={{ marginTop: 8 }}>{selectedProblem.title}</h1>
              </div>
              <button className="bt" onClick={() => setSelectedId(null)}>✕ Close</button>
            </div>

            <div className="task" style={{ margin: '14px 0' }}>
              <b>Learning Objective:</b> {selectedProblem.objective}
            </div>

            <h3>Problem Statement</h3>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{selectedProblem.desc}</p>

            {selectedProblem.examples && selectedProblem.examples.length > 0 && (
              <>
                <h3>Examples</h3>
                {selectedProblem.examples.map((ex, idx) => (
                  <div key={idx} className="hint" style={{ margin: '8px 0' }}>
                    <div><b>Input:</b> <code>{ex.input}</code></div>
                    <div><b>Output:</b> <code>{ex.output}</code></div>
                    {ex.explanation && <div className="mu" style={{ fontSize: 12, marginTop: 4 }}><b>Why:</b> {ex.explanation}</div>}
                  </div>
                ))}
              </>
            )}

            {selectedProblem.edgeCases && selectedProblem.edgeCases.length > 0 && (
              <>
                <h3>Critical Edge Cases</h3>
                <ul className="bl">
                  {selectedProblem.edgeCases.map((ec, idx) => (
                    <li key={idx}><span className="mu">•</span> {ec}</li>
                  ))}
                </ul>
              </>
            )}

            <div style={{ display: 'flex', gap: 16, margin: '16px 0', padding: '12px', background: 'var(--p2)', borderRadius: 10 }}>
              <div><b>Expected Time Complexity:</b> <code>{selectedProblem.timeComplexity}</code></div>
              <div><b>Expected Space Complexity:</b> <code>{selectedProblem.spaceComplexity}</code></div>
            </div>

            {/* Progressive Hints */}
            {selectedProblem.hints && selectedProblem.hints.length > 0 && (
              <>
                <h3>Progressive Hints</h3>
                <p className="mu" style={{ fontSize: 13 }}>
                  Attempt to solve the problem before unlocking hints.
                </p>
                {selectedProblem.hints.slice(0, revealedHints[selectedProblem.id] || 0).map((h, idx) => (
                  <div key={idx} className="hint" style={{ borderLeft: '3px solid var(--ac)' }}>
                    <b>Hint {idx + 1}:</b> {h}
                  </div>
                ))}
                {(revealedHints[selectedProblem.id] || 0) < selectedProblem.hints.length && (
                  <button
                    className="bt"
                    onClick={() => revealNextHint(selectedProblem.id, selectedProblem.hints.length)}
                    style={{ marginTop: 8 }}
                  >
                    💡 Reveal Hint {(revealedHints[selectedProblem.id] || 0) + 1} of {selectedProblem.hints.length}
                  </button>
                )}
              </>
            )}

            {/* Reference Solution Toggle */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  className="bt"
                  onClick={() => setShowSolution(prev => ({ ...prev, [selectedProblem.id]: !prev[selectedProblem.id] }))}
                >
                  {showSolution[selectedProblem.id] ? 'Hide Reference Solution' : 'Show Reference Solution'}
                </button>
                <button
                  className="bt"
                  onClick={() => toggleDone(selectedProblem.id)}
                >
                  {S.done[selectedProblem.id] ? '✓ Solved' : 'Mark as Solved'}
                </button>
                <button
                  className="bt pri"
                  onClick={() => { setSelectedId(null); go('work', selectedProblem.id); }}
                >
                  Open in Code Runner →
                </button>
              </div>

              {showSolution[selectedProblem.id] && (
                <div style={{ marginTop: 12 }}>
                  <pre id="sol" className="mono" style={{ padding: 14 }}>
                    {selectedProblem.solution}
                  </pre>
                  {selectedProblem.explanation && (
                    <p className="mu" style={{ marginTop: 8, fontSize: 13 }}>
                      <b>Walkthrough:</b> {selectedProblem.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
