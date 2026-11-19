import { TR, CHALL } from './lessons.js';
import { allProblems } from './plan.js';
import { esc } from '../lib/util.js';
import { ALL_TOPICS } from './domains.js';

export const lessons = TR.filter(t => t.n !== 'Challenges').flatMap(t => t.items);
export const challenges = CHALL;

const isReact = cat => cat === 'React UI' || cat === 'React components' || cat === 'Machine coding';

const starter = p => p.starter || (isReact(p.cat)
  ? `// ${p.title}\n// ${p.desc}\n\nfunction App() {\n  return <div>Build it here</div>;\n}\n`
  : `// ${p.title}\n// ${p.desc}\n\n`);

// The interview-round problems become runnable workspaces too (React UI ones run React in the preview).
export const rounds = allProblems.map(p => ({
  id: p.id,
  tr: 'Coding rounds',
  sub: p.difficulty,
  t: p.title,
  cat: p.cat,
  priority: p.priority || 'P1',
  body: `<p><b>Objective:</b> ${esc(p.objective || p.desc)}</p><p>${esc(p.desc)}</p>` +
    (p.timeComplexity ? `<p class="mu"><b>Expected Complexity:</b> Time: <code>${esc(p.timeComplexity)}</code> | Space: <code>${esc(p.spaceComplexity || 'O(1)')}</code></p>` : ''),
  task: 'Understand requirements -> Brute force -> Edge cases -> Optimize -> State complexity -> Trade-offs.',
  lang: isReact(p.cat) ? 'react' : 'js',
  code: starter(p),
  h: p.hints || (p.hint ? [p.hint] : []),
  sol: p.solution || p.sol || '',
  tests: p.tests || ''
}));

export const catalog = [...lessons, ...challenges, ...rounds];
export const findItem = (id, pads = []) => catalog.find(i => i.id === id) || pads.find(i => i.id === id) || lessons[0];

// Human title for any id in the activity log (lesson, problem, plan day or skill-tree topic).
export const titleOf = (id, pads) =>
  id.startsWith('practical-day')
    ? 'Practical Day ' + id.slice(13) + ' complete'
    : id.startsWith('day')
    ? 'Day ' + id.slice(3) + ' complete'
    : id.startsWith('topic:')
      ? (ALL_TOPICS.find(t => t.id === id.slice(6))?.t || id)
      : findItem(id, pads).t;
