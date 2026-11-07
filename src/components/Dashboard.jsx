import { useApp } from '../store.jsx';
import { days, questions } from '../data/plan.js';
import { lessons, challenges, rounds, findItem, titleOf } from '../data/items.js';
import { ALL_TOPICS } from '../data/domains.js';
import { stats, today, key } from '../lib/util.js';
import Heatmap from './Heatmap.jsx';

const LINES = [
  'Small steps, every day. That is the whole trick.',
  'What can you do with no tool, no LLM, nothing but you and the problem?',
  'Consistency beats intensity. One problem today.',
  'You are one solved problem closer than yesterday.',
  'Interviews reward reps. Get one more in.',
  'Understand it, then explain it out loud.',
];
const ORD = { Easy: 0, Medium: 1, Hard: 2 }, MARKS = [3, 7, 14, 30, 60, 100];

export default function Dashboard({ go }) {
  const { S, up, user } = useApp();
  const st = stats(S.days), now = S.days[today()] || 0, goal = S.goal || 3, cur = findItem(S.cur, S.pads);
  const sum = (a, b) => { let t = 0; for (let i = a; i < b; i++) { const d = new Date(); d.setDate(d.getDate() - i); t += S.days[key(d)] || 0; } return t; };
  const wk = sum(0, 7), pw = sum(7, 14), h = new Date().getHours();
  const dayDone = d => d.tasks.every((_, i) => S.tasks[d.n + '-' + i]);
  const nextDay = days.find(d => !dayDone(d)), reviewN = questions.filter((_, i) => S.qs[i] === 'review').length;
  const nextCh = challenges.filter(c => !S.done[c.id]).sort((a, b) => ORD[a.sub] - ORD[b.sub])[0];
  const nextTopic = ALL_TOPICS.find(t => !S.topics[t.id]?.done), last = S.mocks[S.mocks.length - 1];
  const next = [
    { ic: '▶', t: 'Continue: ' + cur.t, s: 'Pick up exactly where you left off', f: () => go('work') },
    nextDay && { ic: '🗓', t: `Day ${nextDay.n}: ${nextDay.title}`, s: `${nextDay.tasks.filter((_, i) => S.tasks[nextDay.n + '-' + i]).length}/${nextDay.tasks.length} tasks done`, f: () => go('day', nextDay.n) },
    { ic: '💬', t: reviewN ? `Review ${reviewN} flagged question${reviewN > 1 ? 's' : ''}` : 'Practise an interview question', s: reviewN ? 'Turn “Needs practice” into “Confident”' : 'Two minutes, out loud', f: () => go('qa') },
    nextCh && { ic: '🧪', t: 'Solve: ' + nextCh.t, s: nextCh.sub + ' challenge with tests', f: () => go('work', nextCh.id) },
    nextTopic && { ic: '🧠', t: nextTopic.t, s: nextTopic.domain + ' · quiz', f: () => go('skills') },
    (!last || Date.now() - last.ts > 7 * 864e5) && { ic: '🎤', t: 'Take a mock interview', s: last ? 'It has been over a week' : 'Find out where you really stand', f: () => go('mock') },
  ].filter(Boolean).slice(0, 4);

  const solved = [...challenges, ...rounds].filter(x => S.done[x.id]).length;
  const badges = [
    ...MARKS.map(n => ({ ic: n >= 30 ? '🏆' : '🔥', t: n + '-day streak', got: st.longest >= n })),
    { ic: '🧪', t: 'First challenge', got: challenges.some(c => S.done[c.id]) }, { ic: '💪', t: '10 problems solved', got: solved >= 10 },
    { ic: '🎤', t: 'Mock ≥ 80%', got: S.mocks.some(m => m.score / m.max >= 0.8) }, { ic: '🗓', t: 'Plan finished', got: days.every(dayDone) },
  ];
  const nextMark = MARKS.find(n => n > st.current);
  const bars = [
    ['15-day plan', days.filter(dayDone).length, days.length, 'plan'], ['Interview Q&A (confident)', questions.filter((_, i) => S.qs[i] === 'known').length, questions.length, 'qa'],
    ['Coding-round problems', rounds.filter(r => S.done[r.id]).length, rounds.length, 'practice'], ['Challenges', challenges.filter(c => S.done[c.id]).length, challenges.length, 'practice'],
    ['Lessons', lessons.filter(l => S.done[l.id]).length, lessons.length, 'practice'], ['Skill tree topics', ALL_TOPICS.filter(t => S.topics[t.id]?.done).length, ALL_TOPICS.length, 'skills'],
  ];
  const total = bars.reduce((a, b) => a + b[2], 0), done = bars.reduce((a, b) => a + b[1], 0);
  const streakMsg = st.current === 0 ? 'Start a streak today: do one thing, however small.'
    : now === 0 ? `⚠ Your ${st.current}-day streak ends tonight. One quick task keeps it alive.` : `✓ Today counts. Come back tomorrow to make it ${st.current + 1}.`;

  return (
    <div className="page">
      <div className="eb">{h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'}, {user.split('@')[0]}</div>
      <h1>{LINES[Math.floor(Date.now() / 864e5) % LINES.length]}</h1>

      <div className="top">
        <div className="panel"><div className="big">🔥 {st.current}<small> day streak</small></div><p className={now === 0 && st.current ? 'warnt' : 'mu'}>{streakMsg}</p>
          <p className="mu">Longest: <b>{st.longest}</b> days · Active days: <b>{st.active}</b></p></div>
        <div className="panel"><div className="goal"><div className="ring" style={{ '--p': Math.min(100, now / goal * 100) + '%' }}><b>{Math.min(now, goal)}/{goal}</b></div>
          <div><b>{now >= goal ? 'Goal reached 🎉' : 'Today’s goal'}</b><p className="mu">{now >= goal ? 'Do one more to stretch your lead.' : `${goal - now} more to go. Run code, tick a task, rate a question.`}</p></div></div>
          <div className="hd" style={{ margin: '8px 0 0' }}><small className="mu">Daily goal</small>{[1, 3, 5].map(g => <button key={g} className={'bt' + (goal === g ? ' pri' : '')} onClick={() => up(n => { n.goal = g; })}>{g}</button>)}</div></div>
        <div className="panel"><div className="big">{wk}<small> this week</small></div><p className="mu">{wk > pw ? `↑ ${wk - pw} more than last week` : wk === pw ? 'Same as last week' : `${pw - wk} fewer than last week. Catch up!`}</p>
          <p className="mu">{done}/{total} items complete ({Math.round(done / total * 100)}%)</p></div>
      </div>

      <div className="panel"><div className="hd" style={{ margin: '0 0 8px' }}><b>{st.year} activities in the last year</b></div><Heatmap days={S.days} /></div>

      <h3>Up next</h3>
      <div className="next">{next.map((x, i) => <button key={i} className={'nx' + (i === 0 ? ' first' : '')} onClick={x.f}><span className="ic">{x.ic}</span><span><b>{x.t}</b><small>{x.s}</small></span></button>)}</div>

      <h3>Milestones {nextMark && <small className="mu">· {nextMark - st.current} more day{nextMark - st.current > 1 ? 's' : ''} to a {nextMark}-day streak</small>}</h3>
      <div>{badges.map(b => <span key={b.t} className={'badge' + (b.got ? '' : ' off')} title={b.got ? 'Earned' : 'Locked'}>{b.ic} {b.t}</span>)}</div>

      <h3>By area</h3>
      {bars.map(([n, d, t, v]) => <button key={n} className="tr" onClick={() => go(v)}><span>{n}</span><div className="bar2"><i style={{ width: d / t * 100 + '%' }} /></div><small>{d}/{t}</small></button>)}

      <h3>Recent activity</h3>
      {S.log.length ? S.log.slice(-6).reverse().map((x, i) => <div key={i} className="t p">{titleOf(x.id, S.pads)} <small className="mu" style={{ display: 'inline' }}>{new Date(x.ts).toLocaleDateString()}</small></div>)
        : <p className="mu">Nothing yet. Pass a challenge or mark a lesson complete.</p>}
    </div>
  );
}
