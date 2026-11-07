import { useApp } from '../store.jsx';
import Coach from './Coach.jsx';

const QUICK = [
  ['Explain today’s topics', 'Explain this day’s main ideas in simple terms with one tiny example each. Start with the one most likely to come up in interviews.', 'explain'],
  ['Check my notes', 'Check my notes for factual mistakes or gaps. Be specific and brief.', 'check'],
  ['Check my code', 'Check my code snippets. Say what is right and the most important problems, without rewriting them.', 'check'],
  ['Quiz me', 'Ask me one interview-style question from today’s topics, then wait for my answer.', 'learn'],
];

// Zero with the whole day as context: plan, your notes and your snippets.
export default function DayZero({ d }) {
  const { S } = useApp();
  const notes = (S.dn[d.n] || []).map(x => `# ${x.t}\n${x.b}`).join('\n---\n') || S.dnotes[d.n] || '(none yet)';
  const snips = S.dcode[d.n] || [], per = Math.max(350, Math.floor(1600 / Math.max(1, snips.length))); // share the budget so later snippets are not cut off
  const code = snips.map(x => `// ${x.t}\n${x.code.slice(0, per)}`).join('\n\n') || '(none yet)';
  const extra = `Day ${d.n} (${d.phase}): ${d.title}\nTheme: ${d.theme}\nGoal: ${d.goal}\nTasks: ${d.tasks.join(' | ')}\nInterview questions: ${(d.questions || []).join(' | ')}\nCoding prompts: ${(d.coding || []).join(' | ')}\nBonus topics: ${(d.extra || []).join(' | ')}\n\nLearner notes:\n${notes.slice(0, 1200)}\n\nLearner code snippets:\n${code.slice(0, 1800)}`;
  return <Coach item={{ id: 'day' + d.n, t: `Day ${d.n}: ${d.title}`, task: `${d.theme}. ${d.goal}` }} code="" extra={extra} quick={QUICK} defKind="explain" placeholder="Ask about any topic from today…" />;
}
