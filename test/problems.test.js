import test from 'node:test';
import assert from 'node:assert/strict';
import { problems } from '../src/data/problems.js';

test('Coding Problem Bank Integrity & Algorithmic Solutions', async (t) => {
  await t.test('all problems have required structure and progressive hints', () => {
    problems.forEach(p => {
      assert.ok(p.id, 'Problem missing id');
      assert.ok(p.title, `Problem ${p.id} missing title`);
      assert.ok(p.cat, `Problem ${p.id} missing cat`);
      assert.ok(['Easy', 'Medium', 'Hard'].includes(p.difficulty), `Problem ${p.id} invalid difficulty`);
      assert.ok(['P1', 'P2', 'P3'].includes(p.priority), `Problem ${p.id} invalid priority`);
      assert.ok(p.objective, `Problem ${p.id} missing objective`);
      assert.ok(p.desc, `Problem ${p.id} missing desc`);
      assert.ok(Array.isArray(p.hints) && p.hints.length >= 2, `Problem ${p.id} must have progressive hints`);
      assert.ok(p.timeComplexity, `Problem ${p.id} missing timeComplexity`);
      assert.ok(p.solution, `Problem ${p.id} missing solution`);
    });
  });

  await t.test('solution: isPalindrome (p1)', () => {
    function isPalindrome(s) {
      const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
      let left = 0, right = clean.length - 1;
      while (left < right) {
        if (clean[left] !== clean[right]) return false;
        left++;
        right--;
      }
      return true;
    }

    assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
    assert.equal(isPalindrome('race a car'), false);
    assert.equal(isPalindrome(' '), true);
    assert.equal(isPalindrome('0P'), false);
  });

  await t.test('solution: findSecondLargest (p2)', () => {
    function findSecondLargest(nums) {
      let first = -Infinity, second = -Infinity;
      for (const n of nums) {
        if (n > first) {
          second = first;
          first = n;
        } else if (n > second && n !== first) {
          second = n;
        }
      }
      return second === -Infinity ? null : second;
    }

    assert.equal(findSecondLargest([12, 35, 1, 10, 34, 1]), 34);
    assert.equal(findSecondLargest([10, 10, 10]), null);
    assert.equal(findSecondLargest([-5, -2, -10]), -5);
    assert.equal(findSecondLargest([5]), null);
  });

  await t.test('solution: twoSum (p10)', () => {
    function twoSum(nums, target) {
      const seen = new Map();
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
          return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
      }
      return [];
    }

    assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
    assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
    assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
    assert.deepEqual(twoSum([1, 2], 10), []);
  });

  await t.test('solution: isAnagram (p8)', () => {
    function isAnagram(s, t) {
      if (s.length !== t.length) return false;
      const count = {};
      for (const c of s) count[c] = (count[c] || 0) + 1;
      for (const c of t) {
        if (!count[c]) return false;
        count[c]--;
      }
      return true;
    }

    assert.equal(isAnagram('anagram', 'nagaram'), true);
    assert.equal(isAnagram('rat', 'car'), false);
    assert.equal(isAnagram('a', 'ab'), false);
    assert.equal(isAnagram('', ''), true);
  });

  await t.test('solution: lengthOfLongestSubstring (p27)', () => {
    function lengthOfLongestSubstring(s) {
      const lastSeen = new Map();
      let left = 0, maxLength = 0;
      for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (lastSeen.has(char) && lastSeen.get(char) >= left) {
          left = lastSeen.get(char) + 1;
        }
        lastSeen.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
      }
      return maxLength;
    }

    assert.equal(lengthOfLongestSubstring('abcabcbb'), 3);
    assert.equal(lengthOfLongestSubstring('bbbbb'), 1);
    assert.equal(lengthOfLongestSubstring('pwwkew'), 3);
    assert.equal(lengthOfLongestSubstring(''), 0);
  });

  await t.test('solution: isValidBrackets (p11)', () => {
    function isValidBrackets(s) {
      if (s.length % 2 !== 0) return false;
      const map = { ')': '(', '}': '{', ']': '[' };
      const stack = [];
      for (const c of s) {
        if (c === '(' || c === '{' || c === '[') {
          stack.push(c);
        } else if (map[c]) {
          if (stack.pop() !== map[c]) return false;
        }
      }
      return stack.length === 0;
    }

    assert.equal(isValidBrackets('()[]{}'), true);
    assert.equal(isValidBrackets('{[()]}'), true);
    assert.equal(isValidBrackets('(]'), false);
    assert.equal(isValidBrackets('([)]'), false);
    assert.equal(isValidBrackets('(('), false);
    assert.equal(isValidBrackets(''), true);
  });

  await t.test('solution: deepClone with circular references (p22)', () => {
    function deepClone(obj, seen = new WeakMap()) {
      if (obj === null || typeof obj !== 'object') return obj;
      if (seen.has(obj)) return seen.get(obj);

      const clone = Array.isArray(obj) ? [] : {};
      seen.set(obj, clone);

      for (const key of Object.keys(obj)) {
        clone[key] = deepClone(obj[key], seen);
      }
      return clone;
    }

    const original = { a: 1, b: [2, 3], c: { d: 4 } };
    original.self = original;

    const cloned = deepClone(original);
    assert.equal(cloned.a, 1);
    assert.deepEqual(cloned.b, [2, 3]);
    assert.notEqual(cloned.b, original.b); // Independent array reference
    assert.equal(cloned.self, cloned);    // Circular reference intact
    assert.notEqual(cloned.self, original);
  });
});
