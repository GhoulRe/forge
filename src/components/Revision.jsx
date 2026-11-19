import { useState } from 'react';
import { useApp } from '../store.jsx';
import { allQuestions as questions } from '../data/questions.js';
import { days } from '../data/days.js';
import { practicalDays } from '../data/practical/plan.js';
import { allProblems as problems } from '../data/problems.js';
import { bump } from '../lib/util.js';
import { navigate } from '../router.js';

export default function Revision({ go }) {
  const { S, up, say } = useApp();
  const [activeTab, setActiveTab] = useState('recall'); // 'recall' | 'weak-qs' | 'unsolved' | 'day-gaps'
  const [selectedDayNum, setSelectedDayNum] = useState(1);
  const [recallIndex, setRecallIndex] = useState(0);
  const [revealedRecall, setRevealedRecall] = useState(false);

  // Weak questions
  const weakQuestions = questions
    .map((q, idx) => ({ ...q, originalIndex: idx }))
    .filter(q => S.qs[q.originalIndex] === 'review');

  // Incomplete tasks from active days
  const progressDays = [
    ...days.map(d => ({ ...d, key: d.n, track: 'advanced' })),
    ...practicalDays.map(d => ({ ...d, key: 'practical-' + d.n, track: 'practical' }))
  ];
  const dayGaps = progressDays.map(d => {
    const incompleteTasks = d.tasks.filter((_, idx) => !S.tasks[d.key + '-' + idx]);
    return {
      day: d,
      incompleteCount: incompleteTasks.length,
      tasks: incompleteTasks
    };
  }).filter(g => g.incompleteCount > 0 && g.incompleteCount < g.day.tasks.length);

  // Unsolved P1 problems
  const unsolvedP1 = problems.filter(p => p.priority === 'P1' && !S.done[p.id]);

  const selectedDay = days.find(d => d.n === selectedDayNum) || days[0];
  const recallQuestions = selectedDay.recallQuiz || [];
  const currentRecall = recallQuestions[recallIndex] || recallQuestions[0];

  const markQuestion = (originalIndex, status) => {
    up(n => {
      n.qs[originalIndex] = status;
      bump(n);
    });
    say(status === 'known' ? '✓ Marked confident' : '⚑ Marked for review');
  };

  const nextRecallCard = (passed) => {
    up(n => {
      n.recalls = n.recalls || {};
      const current = n.recalls[selectedDayNum] || { count: 0, ts: Date.now() };
      if (passed) current.count = (current.count || 0) + 1;
      n.recalls[selectedDayNum] = current;
      bump(n);
    });

    setRevealedRecall(false);
    if (recallIndex + 1 < recallQuestions.length) {
      setRecallIndex(prev => prev + 1);
    } else {
      say(`Day ${selectedDayNum} recall session completed!`);
      setRecallIndex(0);
    }
  };

  return (
    <div className="page">
      <div className="eb">Retention &amp; Spaced Repetition</div>
      <h1>Revision &amp; Weak Spots</h1>
      <p className="mu">
        Focus your study time on high-yield recall, unmastered concepts, and targeted weak-spot triage.
      </p>

      {/* Overview Stat Badges */}
      <div className="cards" style={{ margin: '16px 0 24px' }}>
        <div className="cd" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('weak-qs')}>
          <b>{weakQuestions.length}</b>
          <span>Questions needing practice</span>
        </div>
        <div className="cd" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('unsolved')}>
          <b>{unsolvedP1.length}</b>
          <span>Unsolved P1 coding problems</span>
        </div>
        <div className="cd" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('day-gaps')}>
          <b>{dayGaps.length}</b>
          <span>Days with incomplete tasks</span>
        </div>
        <div className="cd" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('recall')}>
          <b>15</b>
          <span>Daily recall flashcard sets</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="hd" style={{ marginBottom: 18 }}>
        <button
          className={'bt' + (activeTab === 'recall' ? ' pri' : '')}
          onClick={() => setActiveTab('recall')}
        >
          🧠 Daily Recall Quizzes
        </button>
        <button
          className={'bt' + (activeTab === 'weak-qs' ? ' pri' : '')}
          onClick={() => setActiveTab('weak-qs')}
        >
          💬 Flagged Questions ({weakQuestions.length})
        </button>
        <button
          className={'bt' + (activeTab === 'unsolved' ? ' pri' : '')}
          onClick={() => setActiveTab('unsolved')}
        >
          🧩 Unsolved P1 Problems ({unsolvedP1.length})
        </button>
        <button
          className={'bt' + (activeTab === 'day-gaps' ? ' pri' : '')}
          onClick={() => setActiveTab('day-gaps')}
        >
          🗓 Incomplete Day Tasks ({dayGaps.length})
        </button>
      </div>

      {/* TAB 1: DAILY RECALL QUIZZES */}
      {activeTab === 'recall' && (
        <div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {days.map(d => (
              <button
                key={d.n}
                className={'bt' + (selectedDayNum === d.n ? ' on2' : '')}
                onClick={() => { setSelectedDayNum(d.n); setRecallIndex(0); setRevealedRecall(false); }}
                style={{ padding: '6px 10px', fontSize: 12 }}
              >
                Day {d.n}
              </button>
            ))}
          </div>

          <div className="panel" style={{ padding: 24, maxWidth: 680, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="pill">Day {selectedDay.n} · {selectedDay.theme}</span>
              <span className="mu" style={{ fontSize: 13 }}>
                Question {recallIndex + 1} of {recallQuestions.length}
              </span>
            </div>

            <h2 style={{ fontSize: 20, margin: '18px 0 14px', lineHeight: 1.4 }}>
              {currentRecall?.q}
            </h2>

            {!revealedRecall ? (
              <div style={{ marginTop: 24 }}>
                <p className="mu" style={{ fontSize: 13, marginBottom: 14 }}>
                  Speak your answer out loud first, then reveal the model explanation.
                </p>
                <button
                  className="bt pri"
                  style={{ width: '100%', padding: '12px' }}
                  onClick={() => setRevealedRecall(true)}
                >
                  Reveal Answer →
                </button>
              </div>
            ) : (
              <div style={{ marginTop: 20 }}>
                <div className="task" style={{ background: 'var(--p2)', padding: 16, lineHeight: 1.6 }}>
                  <b>Model Answer:</b>
                  <p style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{currentRecall?.a}</p>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                  <button
                    className="bt"
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => nextRecallCard(false)}
                  >
                    ⚑ Need to re-read
                  </button>
                  <button
                    className="bt pri"
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => nextRecallCard(true)}
                  >
                    ✓ Got it solid
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: WEAK QUESTIONS */}
      {activeTab === 'weak-qs' && (
        <div>
          {weakQuestions.length === 0 ? (
            <div className="panel" style={{ textAlign: 'center', padding: 32 }}>
              <h3>🎉 No questions marked "Needs practice"!</h3>
              <p className="mu">As you study the Question Bank, flag challenging questions to review them here.</p>
              <button className="bt pri" onClick={() => go('qa')}>Go to Question Bank →</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {weakQuestions.map(q => (
                <div key={q.id} className="q s-review" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="pill">{q.cat}</span>{' '}
                      <span className="pill adv">{q.priority}</span>
                      <h3 style={{ margin: '8px 0 4px' }}>{q.q}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="bt" onClick={() => markQuestion(q.originalIndex, 'known')}>
                        ✓ Move to Confident
                      </button>
                    </div>
                  </div>
                  <div className="task" style={{ margin: '10px 0 6px', fontSize: 13 }}>
                    <b>Key Explanation:</b> {q.a}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: UNSOLVED P1 CODING PROBLEMS */}
      {activeTab === 'unsolved' && (
        <div>
          {unsolvedP1.length === 0 ? (
            <div className="panel" style={{ textAlign: 'center', padding: 32 }}>
              <h3>🏆 All essential P1 coding problems solved!</h3>
              <p className="mu">You have tackled all core JavaScript and React machine-coding problems.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {unsolvedP1.map(p => (
                <div key={p.id} className="row-it" style={{ padding: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <b>{p.title}</b>
                      <span className="pill">{p.cat}</span>
                      <span className="pill adv">P1 Essential</span>
                      <span className="pill">{p.difficulty}</span>
                    </div>
                    <small className="mu" style={{ display: 'block', marginTop: 4 }}>
                      {p.objective || p.desc}
                    </small>
                  </div>
                  <button className="bt pri" onClick={() => go('work', p.id)}>
                    Solve Challenge →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: INCOMPLETE DAY TASKS */}
      {activeTab === 'day-gaps' && (
        <div>
          {dayGaps.length === 0 ? (
            <div className="panel" style={{ textAlign: 'center', padding: 32 }}>
              <h3>✓ No incomplete day tasks found!</h3>
              <p className="mu">You are on track with your 15-day syllabus.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {dayGaps.map(g => (
                <div key={g.day.key} className="panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{g.day.track === 'practical' ? 'Practical' : 'Advanced'} · Day {g.day.n}: {g.day.title}</h3>
                    <button className="bt pri" onClick={() => navigate('/plan/' + g.day.track + '/' + g.day.n)}>
                      Open Day {g.day.n} →
                    </button>
                  </div>
                  <p className="mu" style={{ fontSize: 13 }}>{g.incompleteCount} tasks remaining:</p>
                  <ul className="bl">
                    {g.tasks.map((task, idx) => (
                      <li key={idx} style={{ fontSize: 13 }}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
