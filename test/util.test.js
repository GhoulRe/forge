import test from 'node:test';
import assert from 'node:assert/strict';
import { key, today, stats, esc, buildDoc } from '../src/lib/util.js';
import { parse, pathFor } from '../src/lib/route.js';

test('Utility Functions & Routing', async (t) => {
  await t.test('key and today format YYYY-MM-DD', () => {
    const d = new Date(2026, 4, 15); // May 15, 2026
    assert.equal(key(d), '2026-05-15');
    assert.match(today(), /^\d{4}-\d{2}-\d{2}$/);
  });

  await t.test('stats calculates streak and active days', () => {
    const mockDays = {
      '2026-05-10': 3,
      '2026-05-11': 1,
      '2026-05-12': 4
    };
    const res = stats(mockDays);
    assert.equal(res.active, 3);
    assert.equal(res.longest, 3);
  });

  await t.test('esc escapes HTML special characters', () => {
    assert.equal(esc('<script>alert("xss")&</script>'), '&lt;script&gt;alert("xss")&amp;&lt;/script&gt;');
  });

  await t.test('route parser and path generator', () => {
    assert.deepEqual(parse('/plan/5'), { view: 'plan', a: '5', b: undefined });
    assert.deepEqual(parse('/coding'), { view: 'coding', a: undefined, b: undefined });
    assert.deepEqual(parse('/revision'), { view: 'revision', a: undefined, b: undefined });

    assert.equal(pathFor('dash'), '/dashboard');
    assert.equal(pathFor('day', 4), '/plan/4');
    assert.equal(pathFor('work', 'p10'), '/practice/p10');
    assert.equal(pathFor('coding'), '/coding');
    assert.equal(pathFor('revision'), '/revision');
  });

  await t.test('buildDoc generates runner html', () => {
    const doc = buildDoc('js', 'const x = 10;', 'test("x", () => eq(x, 10))', 1);
    assert.match(doc, /<!doctype html>/);
    assert.match(doc, /const x = 10;/);
    assert.match(doc, /__go\(\)/);
  });
});
