import { useApp } from '../store.jsx';
import { days } from '../data/days.js';
import { questions } from '../data/questions.js';
import { problems } from '../data/problems.js';
import { lessons, challenges, rounds, findItem, titleOf } from '../data/items.js';
import { ALL_TOPICS } from '../data/domains.js';
import { stats, today, key } from '../lib/util.js';
import Heatmap from './Heatmap.jsx';

const LINES = [
  'Focus on understanding, then explain the mechanics out loud.',
  'Consistency over 15 days beats last-minute cramming.',
  'Understand the problem → Brute force → Edge cases → Optimize → Trade-offs.',
  'Senior engineers speak clearly about trade-offs and failures.',
  'One solid coding problem and 3 questions practiced today.',
  'From Angular to React: master unidirectional data flow, hooks, and reconciliation.'
];

const MARKS = [3, 7, 14, 30, 60, 100];

export default function Dashboard({ go }) {
  const { S, up, user } = useApp();
  const st = stats(S.days);
  const now = S.days[today()] || 0;
  const goal = S.goal || 3;
  const cur = findItem(S.cur, S.pads);

  const sum = (a, b) => {
    let t = 0;
    for (let i = a; i < b; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      t += S.days[key(d)] || 0;
    }
    return t;
  };

  const wk = sum(0, 7);
  const pw = sum(7, 14);
  const h = new Date().getHours();

  const isDayDone = d => (d.tasks || []).every((_, i) => S.tasks[d.n + '-' + i]) || !!(S.criterion && S.criterion[d.n]);
  const completedDays = days.filter(isDayDone).length;
  const activeDay = days.find(d => !isDayDone(d)) || days[0];

  const reviewQuestionsCount = questions.filter((_, i) => S.qs[i] === 'review').length;
  const confidentQuestionsCount = questions.filter((_, i) => S.qs[i] === 'known').length;
  const solvedProblemsCount = problems.filter(p => S.done[p.id]).length;
  const nextP1Problem = problems.find(p => p.priority === 'P1' && !S.done[p.id]);

  const next = [
    {
      ic: '🗓',
      t: `Continue Day ${activeDay.n}: ${activeDay.title}`,
      s: `${activeDay.tasks.filter((_, i) => S.tasks[activeDay.n + '-' + i]).length}/${activeDay.tasks.length} tasks completed`,
      f: () => go('day', activeDay.n)
    },
    reviewQuestionsCount > 0 && {
      ic: '🔁',
      t: `Revise ${reviewQuestionsCount} flagged question${reviewQuestionsCount > 1 ? 's' : ''}`,
      s: 'Turn "Needs practice" into confident spoken explanations',
      f: () => go('revision')
    },
    nextP1Problem && {
      ic: '🧩',
      t: `Solve P1 Problem: ${nextP1Problem.title}`,
      s: `${nextP1Problem.cat} · ${nextP1Problem.difficulty}`,
      f: () => go('work', nextP1Problem.id)
    },
    {
      ic: '▶',
      t: `Resume code: ${cur.t}`,
      s: 'Pick up where you left off in the workspace',
      f: () => go('work')
    }
  ].filter(Boolean).slice(0, 4);

  const streakMsg = st.current === 0
    ? 'Start a streak today: complete a task, solve a problem, or rate a question.'
    : now === 0
      ? `⚠ Your ${st.current}-day streak ends tonight. One quick task keeps it alive!`
      : `✓ Today counts! Come back tomorrow to make it ${st.current + 1} days.`;

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="eb">
            {h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'}, {user === 'guest' ? 'Engineer' : user.split('@')[0]}
          </div>
          <h1>{LINES[Math.floor(Date.now() / 864e5) % LINES.length]}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="bt pri" onClick={() => go('day', activeDay.n)}>
            Go to Day {activeDay.n} →
          </button>
          <button className="bt" onClick={() => go('revision')}>
            🔁 Revision Center
          </button>
        </div>
      </div>

      {/* 15-Day Sprint Visual Stepper */}
      <div className="panel" style={{ margin: '18px 0', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <b style={{ fontSize: 15 }}>15-Day Interview Sprint Roadmap</b>
            <small className="mu" style={{ display: 'block' }}>
              Target: React Developer (3–4 YOE) · {completedDays}/15 days completed ({Math.round(completedDays / 15 * 100)}%)
            </small>
          </div>
          <button className="bt" onClick={() => go('plan')}>View Full Plan →</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: 6 }}>
          {days.map(d => {
            const isDone = isDayDone(d);
            const isCurrent = d.n === activeDay.n;
            return (
              <button
                key={d.n}
                onClick={() => go('day', d.n)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 4px',
                  borderRadius: 8,
                  border: isCurrent ? '2px solid var(--ac)' : '1px solid var(--ln)',
                  background: isDone ? 'color-mix(in srgb, var(--ok) 15%, var(--pn))' : isCurrent ? 'var(--p2)' : 'var(--pn)',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: isCurrent ? 'var(--ac)' : 'var(--mu)' }}>
                  D{d.n}
                </span>
                <span style={{ fontSize: 14, margin: '2px 0' }}>
                  {isDone ? '✓' : isCurrent ? '▶' : '·'}
                </span>
                <span style={{ fontSize: 9, opacity: 0.75 }}>
                  {d.phase.slice(0, 3)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top metrics row */}
      <div className="top">
        <div className="panel">
          <div className="big">🔥 {st.current}<small> day streak</small></div>
          <p className={now === 0 && st.current ? 'warnt' : 'mu'}>{streakMsg}</p>
          <p className="mu">Longest: <b>{st.longest}</b> days · Active days: <b>{st.active}</b></p>
        </div>

        <div className="panel">
          <div className="goal">
            <div className="ring" style={{ '--p': Math.min(100, (now / goal) * 100) + '%' }}>
              <b>{Math.min(now, goal)}/{goal}</b>
            </div>
            <div>
              <b>{now >= goal ? 'Daily Goal Reached 🎉' : 'Daily Goal'}</b>
              <p className="mu">
                {now >= goal ? 'Solid progress. Keep momentum!' : `${goal - now} more actions needed today.`}
              </p>
            </div>
          </div>
          <div className="hd" style={{ margin: '8px 0 0' }}>
            <small className="mu">Daily goal:</small>
            {[1, 3, 5].map(g => (
              <button
                key={g}
                className={'bt' + (goal === g ? ' pri' : '')}
                onClick={() => up(n => { n.goal = g; })}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="big">{confidentQuestionsCount}<small>/{questions.length}</small></div>
          <p className="mu">Questions confident for interview</p>
          <p className="mu">
            {reviewQuestionsCount > 0 ? (
              <span className="warnt">⚑ {reviewQuestionsCount} questions need practice</span>
            ) : (
              '✓ Zero flagged questions'
            )}
          </p>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="panel" style={{ margin: '14px 0' }}>
        <div className="hd" style={{ margin: '0 0 8px' }}>
          <b>{st.year} interview activities logged in the last year</b>
        </div>
        <Heatmap days={S.days} />
      </div>

      {/* Up Next Actions */}
      <h3>Recommended Up Next</h3>
      <div className="next">
        {next.map((x, i) => (
          <button
            key={i}
            className={'nx' + (i === 0 ? ' first' : '')}
            onClick={x.f}
          >
            <span className="ic">{x.ic}</span>
            <span>
              <b>{x.t}</b>
              <small>{x.s}</small>
            </span>
          </button>
        ))}
      </div>

      {/* Preparation by Area Breakdown */}
      <h3 style={{ marginTop: 24 }}>Preparation Breakdown</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          ['15-day syllabus', completedDays, days.length, () => go('plan')],
          ['Interview Q&A (confident)', confidentQuestionsCount, questions.length, () => go('qa')],
          ['Coding problem bank', solvedProblemsCount, problems.length, () => go('coding')],
          ['Skill tree topics', ALL_TOPICS.filter(t => S.topics[t.id]?.done).length, ALL_TOPICS.length, () => go('skills')],
          ['Interactive lessons & challenges', [...lessons, ...challenges].filter(i => S.done[i.id]).length, lessons.length + challenges.length, () => go('practice')]
        ].map(([title, doneN, totalN, onClick]) => (
          <button key={title} className="tr" onClick={onClick}>
            <span style={{ fontWeight: 600 }}>{title}</span>
            <div className="bar2">
              <i style={{ width: (doneN / (totalN || 1) * 100) + '%' }} />
            </div>
            <small>{doneN}/{totalN}</small>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <h3 style={{ marginTop: 24 }}>Recent Activity</h3>
      {S.log && S.log.length ? (
        S.log.slice(-6).reverse().map((x, i) => (
          <div key={i} className="t p">
            {titleOf(x.id, S.pads)} <small className="mu" style={{ display: 'inline', marginLeft: 8 }}>{new Date(x.ts).toLocaleDateString()}</small>
          </div>
        ))
      ) : (
        <p className="mu">No activity recorded yet. Start by checking off a task on Day 1 or answering a question!</p>
      )}
    </div>
  );
}
