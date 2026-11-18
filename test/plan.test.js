import test from 'node:test';
import assert from 'node:assert/strict';
import { days } from '../src/data/days.js';

test('15-Day Plan Integrity', async (t) => {
  await t.test('has exactly 15 sequential days', () => {
    assert.equal(days.length, 15, 'Should have exactly 15 days');
    days.forEach((d, idx) => {
      assert.equal(d.n, idx + 1, `Day ${idx + 1} should have sequential n`);
    });
  });

  await t.test('every day has all 9 required dimensions', () => {
    days.forEach(d => {
      // 1. Learning objectives
      assert.ok(Array.isArray(d.objectives) && d.objectives.length > 0, `Day ${d.n} missing objectives`);
      // 2. Concepts to understand
      assert.ok(Array.isArray(d.concepts) && d.concepts.length > 0, `Day ${d.n} missing concepts`);
      // 3. Practical learning tasks
      assert.ok(Array.isArray(d.tasks) && d.tasks.length > 0, `Day ${d.n} missing tasks`);
      // 4. Interview questions
      assert.ok(Array.isArray(d.questions) && d.questions.length > 0, `Day ${d.n} missing questions`);
      // 5. JavaScript coding exercises
      assert.ok(Array.isArray(d.coding) && d.coding.length > 0, `Day ${d.n} missing coding exercises`);
      // 6. Expected time allocation
      assert.ok(typeof d.timeAllocation === 'string' && d.timeAllocation.length > 5, `Day ${d.n} missing timeAllocation`);
      // 7. Daily completion criterion
      assert.ok(typeof d.deliverable === 'string' && d.deliverable.length > 10, `Day ${d.n} missing deliverable completion criterion`);
      // 8. Short revision or recall exercise
      assert.ok(Array.isArray(d.recallQuiz) && d.recallQuiz.length >= 2, `Day ${d.n} missing recallQuiz`);
      d.recallQuiz.forEach((rq, rqIdx) => {
        assert.ok(typeof rq.q === 'string' && rq.q.length > 5, `Day ${d.n} recall question ${rqIdx} missing q`);
        assert.ok(typeof rq.a === 'string' && rq.a.length > 5, `Day ${d.n} recall question ${rqIdx} missing a`);
      });
      // 9. Priority system
      assert.ok(['P1', 'P2', 'P3'].includes(d.priority), `Day ${d.n} priority must be P1, P2, or P3`);
    });
  });

  await t.test('verifies progression sequence matches Day 1-15 plan', () => {
    assert.equal(days[0].phase, 'JavaScript');
    assert.match(days[0].theme, /scope|closure|hoist/i);
    assert.equal(days[5].phase, 'React');
    assert.match(days[5].title, /React fundamentals/i);
    assert.equal(days[11].phase, 'Interview');
    assert.match(days[11].title, /live coding|machine-coding/i);
    assert.equal(days[13].phase, 'Interview');
    assert.match(days[13].title, /mock interview/i);
    assert.equal(days[14].phase, 'Interview');
    assert.match(days[14].title, /Final revision/i);
  });
});
