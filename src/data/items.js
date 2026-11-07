import { TR, CHALL } from './lessons.js';
import { problems } from './plan.js';
import { esc } from '../lib/util.js';
import { ALL_TOPICS } from './domains.js';

export const lessons = TR.filter(t => t.n !== 'Challenges').flatMap(t => t.items);
export const challenges = CHALL;

const starter = p => p.cat === 'React UI'
  ? `// ${p.title}\n// ${p.desc}\n\nfunction App() {\n  return <div>Build it here</div>;\n}\n`
  : `// ${p.title}\n// ${p.desc}\n\n`;

// The interview-round problems become runnable workspaces too (React UI ones run React in the preview).
export const rounds = problems.map(p => ({
  id: p.id, tr: 'Coding rounds', sub: p.difficulty, t: p.title, cat: p.cat,
  body: `<p>${esc(p.desc)}</p>`,
  task: 'Solve it yourself first, test edge cases, then explain the approach and complexity out loud.',
  lang: p.cat === 'React UI' ? 'react' : 'js', code: starter(p), h: p.hint ? [p.hint] : [],
}));

export const catalog = [...lessons, ...challenges, ...rounds];
export const findItem = (id, pads = []) => catalog.find(i => i.id === id) || pads.find(i => i.id === id) || lessons[0];

// Human title for any id in the activity log (lesson, problem, plan day or skill-tree topic).
export const titleOf = (id, pads) => id.startsWith('day') ? 'Day ' + id.slice(3) + ' complete' : id.startsWith('topic:') ? (ALL_TOPICS.find(t => t.id === id.slice(6))?.t || id) : findItem(id, pads).t;
