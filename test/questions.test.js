import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/data/questions.js';

test('Interview Question Bank Integrity', async (t) => {
  await t.test('has rich questions with unique IDs', () => {
    assert.ok(questions.length >= 15, 'Should have rich question bank');
    const ids = new Set();
    questions.forEach(q => {
      assert.ok(q.id, 'Question missing id');
      assert.ok(!ids.has(q.id), `Duplicate question id: ${q.id}`);
      ids.add(q.id);
    });
  });

  await t.test('every question has spoken answer, evaluating signal, and follow-ups', () => {
    questions.forEach(q => {
      assert.ok(q.q && q.q.length > 5, `Question text missing for ${q.id}`);
      assert.ok(q.a && q.a.length > 30, `Spoken answer too short or missing for ${q.id}`);
      assert.ok(['P1', 'P2', 'P3'].includes(q.priority), `Priority invalid for ${q.id}`);
      assert.ok(q.evaluating && q.evaluating.length > 10, `Evaluating criteria missing for ${q.id}`);
      assert.ok(Array.isArray(q.followUps) && q.followUps.length > 0, `Follow-up questions missing for ${q.id}`);
    });
  });

  await t.test('tailored questions for Angular transition and 3.8 YOE exist', () => {
    const angularQ = questions.find(q => q.id === 'q-angular-to-react');
    assert.ok(angularQ, 'Angular to React question must exist');
    assert.match(angularQ.a, /unidirectional|data flow/i);

    const projectQ = questions.find(q => q.id === 'q-tell-me-about-yourself');
    assert.ok(projectQ, 'Tell me about yourself question must exist');
    assert.match(projectQ.a, /3 years and 10 months/i);

    const bugQ = questions.find(q => q.id === 'q-production-bug');
    assert.ok(bugQ, 'Production bug question must exist');
    assert.match(bugQ.a, /race condition|AbortController/i);
  });
});
