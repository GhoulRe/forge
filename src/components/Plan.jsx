import { useEffect, useState } from 'react';
import { useApp } from '../store.jsx';
import { days as advancedDays } from '../data/days.js';
import { questions as advancedQuestions, allQuestions } from '../data/questions.js';
import { problems as advancedProblems } from '../data/problems.js';
import { practicalDays } from '../data/practical/plan.js';
import { practicalLessons } from '../data/practical/lessons.js';
import { practicalQuestions } from '../data/practical/questions.js';
import { practicalProblems } from '../data/practical/problems.js';
import { bump } from '../lib/util.js';
import Link from './Link.jsx';
import TrackSwitch from './TrackSwitch.jsx';
import DayCode from './DayCode.jsx';
import DayResources from './DayResources.jsx';
import DayNotes from './DayNotes.jsx';
import DayZero from './DayZero.jsx';

const dayKey = d => d.key ?? d.n;
const doneCount = (S, d) => (d.tasks || []).filter((_, i) => S.tasks[dayKey(d) + '-' + i]).length;
const status = (S, d) => {
  const c = doneCount(S, d);
  const k = dayKey(d);
  const criterionMet = !!(S.criterion && S.criterion[k]);
  if (c === d.tasks.length || criterionMet) return ['done', '✓ Done'];
  if (c > 0 || S.dcode[k] || (S.dn[k] || []).length || (S.dres[k] || []).length) return ['doing', 'In progress'];
  return ['todo', 'Not started'];
};

function DayPage({ d, tab, track, days, questions, problems, lesson }) {
  const { S, up, say } = useApp();
  const kDay = dayKey(d);
  const [recallIdx, setRecallIdx] = useState(0);
  const [showRecallAnswer, setShowRecallAnswer] = useState(false);
  const [openQ, setOpenQ] = useState({});

  const toggleTask = i => up(n => {
    const k = kDay + '-' + i;
    n.tasks[k] = !n.tasks[k];
    bump(n);
    if (d.tasks.every((_, j) => n.tasks[kDay + '-' + j])) {
      n.log = [...n.log, { id: (track === 'practical' ? 'practical-day' : 'day') + d.n, ts: Date.now() }].slice(-60);
      say('Day ' + d.n + ' tasks complete 🎉');
    }
  });

  const toggleCriterion = () => up(n => {
    n.criterion = n.criterion || {};
    n.criterion[kDay] = !n.criterion[kDay];
    bump(n);
    if (n.criterion[kDay]) {
      say('Milestone criterion reached for Day ' + d.n + ' 🚀');
    }
  });

  const c = doneCount(S, d);
  const [st, label] = status(S, d);
  const prev = days[d.n - 2];
  const next = days[d.n];
  const nn = S.dn[kDay] ? S.dn[kDay].length : (S.dnotes[kDay] ? 1 : 0);

  const tabs = [
    ['plan', '📋 Plan & Tasks'],
    ['qa', '💬 Q&A (' + (d.questions || []).length + ')'],
    ['coding', '💻 Coding & Labs'],
    ['recall', '🧠 Recall Quiz (' + (d.recallQuiz || []).length + ')'],
    ['notes', '📝 Notes (' + nn + ')'],
    ['res', '🔗 Resources (' + (S.dres[kDay] || []).length + ')'],
    ...(S.unplugged ? [] : [['zero', '🤖 Zero']])
  ];

  const key = {
    qa: 'qa',
    coding: 'coding',
    recall: 'recall',
    notes: 'notes',
    res: 'res',
    resources: 'res',
    zero: 'zero'
  }[tab] || 'plan';

  useEffect(() => {
    document.querySelector('.dt2.on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [key]);

  const href = k => '/plan/' + track + '/' + d.n + (k === 'plan' ? '' : '/' + k);

  // Filter aligned questions
  const dayQuestions = questions.filter(q => (d.questions || []).includes(track === 'practical' ? q.id : q.q));

  // Filter aligned coding problems
  const dayProblems = problems.filter(p => (d.coding || []).includes(p.id));
  const optionalProblems = problems.filter(p => (d.extraCoding || []).includes(p.id));

  return (
    <div className="page daypage">
      <div className="plan-day-top">
        <TrackSwitch
          track={track}
          practicalTo={'/plan/practical/' + d.n + (tab ? '/' + tab : '')}
          advancedTo={'/plan/advanced/' + d.n + (tab ? '/' + tab : '')}
        />
        <Link to={'/plan/' + track} className="back">← All {track === 'practical' ? 'Practical' : 'Advanced'} Days</Link>

      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
        <span className="pill">{track === 'practical' ? 'Practical' : 'Advanced'} Track</span>
        <span className="pill">Day {d.n} · {d.phase}</span>
        <span className={'pill' + (d.priority === 'P1' ? ' adv' : '')}>
          {d.priority} {d.priority === 'P1' ? 'Essential' : 'Important'}
        </span>
        {d.timeAllocation && <span className="pill">⏱ {d.timeAllocation.split(':')[0]}</span>}
      </div>

      <h1 style={{ margin: '8px 0 4px' }}>{d.title}</h1>
      <p className="mu" style={{ maxWidth: '75ch', fontSize: 14 }}>{d.goal}</p>

      {/* Progress header bar */}
      <div className="hd" style={{ margin: '10px 0 16px' }}>
        <span className={'st ' + st}>{label}</span>
        <div className="bar2" style={{ width: 180 }}>
          <i style={{ width: (c / (d.tasks.length || 1) * 100) + '%' }} />
        </div>
        <small className="mu">{c}/{d.tasks.length} tasks completed</small>
        {S.criterion && S.criterion[kDay] && <span className="pill ok">✓ Criterion met</span>}
      </div>

      {/* Day Sub-Navigation Tabs */}
      <div className="daytabs" role="tablist" style={{ marginBottom: 18 }}>
        {tabs.map(([k, l]) => (
          <Link
            key={k}
            to={href(k)}
            role="tab"
            aria-selected={key === k}
            className={'dt2' + (key === k ? ' on' : '')}
          >
            {l}
          </Link>
        ))}
      </div>

      {/* TAB 1: PLAN & TASKS */}
      {key === 'plan' && (
        <>
          {/* Time allocation banner */}
          <div className="hint plan-time" style={{ borderLeft: '3px solid var(--ac)', margin: '12px 0 18px' }}>
            <b>⏳ Target Time Allocation:</b> {d.timeAllocation}
          </div>

          {/* 1. Learning Objectives */}
          {d.objectives && d.objectives.length > 0 && (
            <div className="plan-section objectives-section" style={{ marginBottom: 20 }}>
              <div className="eb">1. Learning Objectives</div>
              <ul className="bl" style={{ marginTop: 6 }}>
                {d.objectives.map((obj, i) => (
                  <li key={i} style={{ fontSize: 13.5, margin: '4px 0' }}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 2. Concepts to Understand */}
          {d.concepts && d.concepts.length > 0 && (
            <div className="plan-section concepts-section" style={{ marginBottom: 20 }}>
              <div className="eb">2. Key Concepts to Master</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                {d.concepts.map((c, i) => (
                  <span key={i} className="chip" style={{ fontSize: 12.5, padding: '3px 8px' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {track === 'practical' && d.extra && d.extra.length > 0 && (
            <section className="plan-section" style={{ marginBottom: 20 }}>
              <div className="eb">Guide Follow-ups · Optional or Review</div>
              <ul className="bl" style={{ marginTop: 6 }}>
                {d.extra.map((topic, i) => <li key={i} style={{ fontSize: 13, margin: '4px 0' }}>{topic}</li>)}
              </ul>
            </section>
          )}

          {lesson && (
            <section className="plan-section lesson-section" style={{ marginBottom: 20 }}>
              <div className="eb">Today's Practical Lesson · {lesson.title}</div>
              <p className="mu" style={{ margin: '8px 0' }}>{lesson.focus}</p>
              <div className="task" style={{ padding: 12, margin: '10px 0' }}>
                <b>Example to try</b>
                <p style={{ margin: '5px 0 0', fontSize: 13.5 }}>{lesson.example}</p>
              </div>
              <p style={{ fontSize: 13.5 }}><b>Short exercise:</b> {lesson.exercise}</p>
            </section>
          )}

          {/* 3. Practical Tasks Checklist */}
          <div className="plan-section tasks-section" style={{ marginBottom: 22 }}>
            <div className="eb">3. Practical Learning Tasks</div>
            <div style={{ marginTop: 8 }}>
              {d.tasks.map((t, i) => (
                <label key={i} className={'tk' + (S.tasks[kDay + '-' + i] ? ' is-done' : '')}>
                  <input
                    type="checkbox"
                    checked={!!S.tasks[kDay + '-' + i]}
                    onChange={() => toggleTask(i)}
                  />
                  <span style={{ fontSize: 13.5, lineHeight: 1.5, textDecoration: S.tasks[kDay + '-' + i] ? 'line-through' : 'none', opacity: S.tasks[kDay + '-' + i] ? 0.7 : 1 }}>
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 8. Daily Completion Criterion */}
          <div className="task completion-criterion" style={{ padding: 14, margin: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <b>🎯 End-of-Day Completion Criterion:</b>
                <p style={{ margin: '4px 0 0', fontSize: 13.5 }}>{d.deliverable}</p>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>
                <input
                  type="checkbox"
                  checked={!!(S.criterion && S.criterion[kDay])}
                  onChange={toggleCriterion}
                />
                <span style={{ fontSize: 12, fontWeight: 700 }}>Criterion Met</span>
              </label>
            </div>
          </div>

          <p className="mu" style={{ fontSize: 13, marginTop: 16 }}>
            Quick links: Practice today's questions in <Link to={href('qa')} style={{ color: 'var(--ac)' }}>Q&A</Link>, solve coding problems in <Link to={href('coding')} style={{ color: 'var(--ac)' }}>Coding</Link>, test yourself with the <Link to={href('recall')} style={{ color: 'var(--ac)' }}>Recall Quiz</Link>, and record thoughts in <Link to={href('notes')} style={{ color: 'var(--ac)' }}>Notes</Link>.
          </p>
        </>
      )}

      {/* TAB 2: DAY Q&A */}
      {key === 'qa' && (
        <div className="tab-content qa-tab">
          <div className="eb" style={{ marginBottom: 8 }}>Day {d.n} Interview Questions</div>
          <h3>Practice Answering Out Loud</h3>
          <p className="mu" style={{ fontSize: 13, marginBottom: 14 }}>
            These questions match today's concepts. Click to review model spoken answers, common misconceptions, and interviewer signals.
          </p>

          {dayQuestions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dayQuestions.map((q, idx) => {
                const isOpen = !!openQ[q.id];
                const originalIndex = allQuestions.findIndex(x => x.id === q.id);
                const isKnown = S.qs[originalIndex] === 'known';
                const isReview = S.qs[originalIndex] === 'review';

                return (
                  <article key={q.id} className={'q ' + (isKnown ? 's-known' : isReview ? 's-review' : '')}>
                    <button
                      className="qt"
                      aria-expanded={isOpen}
                      onClick={() => setOpenQ(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    >
                      <span className="mu" style={{ width: 24 }}>{String(idx + 1).padStart(2, '0')}</span>
                      <span className="qm">
                        <strong>{q.q}</strong>
                        <span style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          <span className="pill">{q.cat}</span>
                          <span className="pill adv">{q.priority}</span>
                          {isKnown && <span className="pill ok">✓ Confident</span>}
                          {isReview && <span className="pill warn">⚑ Needs practice</span>}
                        </span>
                      </span>
                      <span>{isOpen ? '⌃' : '⌄'}</span>
                    </button>

                    {isOpen && (
                      <div className="qa" style={{ paddingTop: 8 }}>
                        <div className="task" style={{ margin: '6px 0 12px', background: 'var(--p2)' }}>
                          <b>Spoken Model Answer:</b>
                          <p style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{q.a}</p>
                        </div>

                        {q.code && (
                          <pre id="sol" className="mono" style={{ margin: '10px 0', padding: 12 }}>
                            {q.code}
                          </pre>
                        )}

                        {q.evaluating && (
                          <div style={{ margin: '8px 0', fontSize: 13 }}>
                            <b>Interviewer is evaluating:</b> <span className="mu">{q.evaluating}</span>
                          </div>
                        )}

                        {q.followUps && q.followUps.length > 0 && (
                          <div style={{ margin: '8px 0', fontSize: 13 }}>
                            <b>Common Follow-ups:</b>
                            <ul className="bl" style={{ marginTop: 4 }}>
                              {q.followUps.map((fu, fIdx) => (
                                <li key={fIdx} className="mu">{fu}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="ch" style={{ marginTop: 12 }}>
                          <button
                            className="bt"
                            onClick={() => up(n => { n.qs[originalIndex] = 'known'; bump(n); })}
                          >
                            ✓ I can explain this
                          </button>
                          <button
                            className="bt"
                            onClick={() => up(n => { n.qs[originalIndex] = 'review'; bump(n); })}
                          >
                            ⚑ Needs practice
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="mu">No specific questions mapped directly to this day yet. Check the main Interview Q&A tab.</p>
          )}
        </div>
      )}

      {/* TAB 3: CODING & LABS */}
      {key === 'coding' && (
        <div className="tab-content coding-tab">
          <div className="eb" style={{ marginBottom: 8 }}>Day {d.n} Coding &amp; Machine Coding</div>
          <h3>Practical Coding Exercises</h3>

          {/* JavaScript Problems */}
          <h4 style={{ margin: '14px 0 8px' }}>{track === 'practical' ? "Today's Guided Coding Exercise" : 'JavaScript & Algorithmic Challenges'}</h4>
          {dayProblems.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dayProblems.map(p => (
                <div key={p.id} className="row-it" style={{ padding: 12 }}>
                  <i className={'dt' + (S.done[p.id] ? ' ok' : '')} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <b>{p.title}</b>
                      <span className="pill">{p.cat}</span>
                      <span className="pill">{p.difficulty}</span>
                    </div>
                    <small className="mu">{p.objective || p.desc}</small>
                  </div>
                  <Link to={'/practice/' + p.id} className="bt pri">
                    Live Code →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <ul className="bl">
              {(d.coding || []).map((codeText, idx) => (
                <li key={idx} style={{ margin: '6px 0', fontSize: 13.5 }}>{codeText}</li>
              ))}
            </ul>
          )}

          {optionalProblems.length > 0 && (
            <section style={{ marginTop: 20 }}>
              <div className="eb">Optional Coding Bank Follow-ups</div>
              <p className="mu" style={{ fontSize: 12.5, margin: '5px 0 9px' }}>Use these after the day’s main exercise or when a target role asks for the topic.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {optionalProblems.map(p => (
                  <div key={p.id} className="row-it" style={{ padding: 10 }}>
                    <div style={{ flex: 1 }}>
                      <b>{p.title}</b> <span className="pill">{p.cat}</span> <span className="pill">P2 Follow-up</span>
                      <div><small className="mu">{p.objective || p.desc}</small></div>
                    </div>
                    <Link to={'/practice/' + p.id} className="bt">Open exercise →</Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* React Coding / Machine Coding Exercises */}
          {d.reactCoding && d.reactCoding.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h4>React Machine-Coding Prompts</h4>
              <ul className="bl">
                {d.reactCoding.map((rc, idx) => (
                  <li key={idx} style={{ margin: '6px 0', fontSize: 13.5 }}>{rc}</li>
                ))}
              </ul>
              <Link to="/practice" className="bt" style={{ display: 'inline-block', marginTop: 8 }}>
                Open React Scratchpad / Labs →
              </Link>
            </div>
          )}

          <section className="day-codebook">
            <div className="eb">Saved coding notebook</div>
            <p className="mu">Work through today’s prompts here. Your snippets stay saved with this day.</p>
            <DayCode d={d} />
          </section>
        </div>
      )}

      {/* TAB 4: RECALL QUIZ */}
      {key === 'recall' && (
        <div className="tab-content recall-tab">
          <div className="eb" style={{ marginBottom: 8 }}>Day {d.n} Rapid Recall</div>
          <h3>Spaced Repetition &amp; Memory Check</h3>
          <p className="mu" style={{ fontSize: 13, marginBottom: 16 }}>
            Active recall is the most effective way to retain interview technical knowledge.
          </p>

          {d.recallQuiz && d.recallQuiz.length > 0 ? (
            <div className="panel" style={{ padding: 22, maxWidth: 640 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="pill">Flashcard {recallIdx + 1} of {d.recallQuiz.length}</span>
                <span className="mu" style={{ fontSize: 12 }}>Day {d.n} Topic Check</span>
              </div>

              <h2 style={{ fontSize: 18, margin: '16px 0', lineHeight: 1.4 }}>
                {d.recallQuiz[recallIdx]?.q}
              </h2>

              {!showRecallAnswer ? (
                <div>
                  <p className="mu" style={{ fontSize: 13 }}>
                    Answer out loud before checking. Can you explain the mechanics clearly?
                  </p>
                  <button
                    className="bt pri"
                    style={{ width: '100%', marginTop: 12, padding: 10 }}
                    onClick={() => setShowRecallAnswer(true)}
                  >
                    Reveal Answer →
                  </button>
                </div>
              ) : (
                <div>
                  <div className="task" style={{ background: 'var(--p2)', padding: 14, margin: '12px 0' }}>
                    <b>Answer:</b>
                    <p style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.6 }}>
                      {d.recallQuiz[recallIdx]?.a}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button
                      className="bt"
                      style={{ flex: 1 }}
                      onClick={() => {
                        setShowRecallAnswer(false);
                        setRecallIdx((recallIdx + 1) % d.recallQuiz.length);
                      }}
                    >
                      Next Question →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="mu">No recall questions for this day.</p>
          )}
        </div>
      )}

      {/* TAB 5: NOTES */}
      {key === 'notes' && <DayNotes d={d} />}

      {/* TAB 6: RESOURCES */}
      {key === 'res' && <DayResources d={d} />}

      {/* TAB 7: ZERO COACH */}
      {key === 'zero' && (
        S.unplugged
          ? <p className="mu">🔌 Unplugged mode is active. Switch to "Plugged in" in the header to interact with Zero.</p>
          : <DayZero d={d} />
      )}

      {/* Day Navigation Footer */}
      <div className="daynav" style={{ marginTop: 32 }}>
        {prev ? (
          <Link className="bt" to={'/plan/' + prev.n}>← Day {prev.n}: {prev.title}</Link>
        ) : <span />}
        {next ? (
          <Link className="bt" to={'/plan/' + next.n}>Day {next.n}: {next.title} →</Link>
        ) : <span />}
      </div>
    </div>
  );
}

export default function Plan({ day, tab, track = 'practical' }) {
  const { S } = useApp();
  const [ph, setPh] = useState('All');
  const [q, setQ] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const isPractical = track === 'practical';
  const sourceDays = isPractical ? practicalDays : advancedDays;
  const days = sourceDays.map(d => ({ ...d, key: isPractical ? 'practical-' + d.n : d.n }));
  const questionBank = isPractical ? practicalQuestions : advancedQuestions;
  const problemBank = isPractical ? practicalProblems : advancedProblems;

  if (day !== null) {
    const d = days.find(x => x.n === day);
    const lesson = isPractical ? practicalLessons.find(x => x.day === day) : null;
    return d ? <DayPage key={track + '-' + d.n} d={d} tab={tab} track={track} days={days} questions={questionBank} problems={problemBank} lesson={lesson} /> : (
      <div className="page">
        <h1>Day not found</h1>
        <Link to={'/plan/' + track} style={{ color: 'var(--ac)' }}>← All {isPractical ? 'Practical' : 'Advanced'} days</Link>
      </div>
    );
  }

  const phases = ['All', ...new Set(days.map(d => d.phase))];
  const list = days.filter(d =>
    (ph === 'All' || d.phase === ph) &&
    (priorityFilter === 'All' || d.priority === priorityFilter) &&
    (!q || JSON.stringify(d).toLowerCase().includes(q.toLowerCase()))
  );

  const complete = days.filter(d => doneCount(S, d) === d.tasks.length || (S.criterion && S.criterion[dayKey(d)])).length;

  return (
    <div className="page">
      <div className="eb">15-Day Preparation Roadmap</div>
      <h1>{isPractical ? 'Practical React Interview Plan' : 'Advanced React Interview Plan'}</h1>
      <p className="mu">
        {complete} of {days.length} days complete. {isPractical
          ? 'A manageable 2.5–3 focused hours per day, based on your readiness guide. Each day has one core deliverable; optional follow-ups keep the full guide topics available without making the daily plan too heavy.'
          : 'The original deeper syllabus is preserved here for extended study, with advanced JavaScript, React and interview topics.'}
      </p>

      <TrackSwitch track={track} practicalTo="/plan/practical" advancedTo="/plan/advanced" />

      <div className="plan-filters">
        <div className="plan-filter-group" role="group" aria-label="Filter by topic">
          {phases.map(p => (
            <button key={p} className={'bt' + (ph === p ? ' pri' : '')} onClick={() => setPh(p)}>{p}</button>
          ))}
        </div>
        <div className="plan-filter-group" role="group" aria-label="Filter by priority">
          {['All', 'P1', 'P2'].map(pr => (
            <button key={pr} className={'bt' + (priorityFilter === pr ? ' on2' : '')} onClick={() => setPriorityFilter(pr)}>
              {pr === 'All' ? 'All Priorities' : pr + ' ' + (pr === 'P1' ? 'Essential' : 'Important')}
            </button>
          ))}
        </div>
        <input type="search" placeholder="Search days and topics" value={q} onChange={e => setQ(e.target.value)} aria-label="Search plan" />
      </div>

      <div className="g3 plan-day-grid" style={{ marginTop: 16 }}>
        {list.map(d => {
          const c = doneCount(S, d);
          const [st, label] = status(S, d);
          return (
            <Link key={d.n} to={'/plan/' + track + '/' + d.n} className={'dc ' + st}>
              <div className="hd" style={{ margin: 0, justifyContent: 'space-between' }}>
                <span className="pill">Day {d.n} · {d.phase}</span>
                <span className={'st ' + st}>{label}</span>
              </div>
              <h3 style={{ margin: '8px 0 4px' }}>{d.title}</h3>
              <p className="mu" style={{ minHeight: 38 }}>{d.theme}</p>
              <div className="bar2" style={{ margin: '8px 0 6px' }}><i style={{ width: (c / (d.tasks.length || 1) * 100) + '%' }} /></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <small className="mu">{c}/{d.tasks.length} tasks</small>
                <span className={'pill' + (d.priority === 'P1' ? ' adv' : '')}>{d.priority}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
