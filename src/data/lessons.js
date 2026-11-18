// Forjix — Interactive Lessons & Challenges
// Runnable in the sandboxed iframe with automated test runner and progressive hints

export const TR = [
  {
    n: 'JavaScript Core',
    items: [
      {
        id: 'closures',
        tr: 'JavaScript Core',
        sub: 'Scope & Closures',
        t: 'Closures & Private State',
        v: 'cl',
        lang: 'js',
        body: `<p>A <b>closure</b> is a function that retains access to its lexical scope even after that outer scope has returned. Each invocation of the outer function creates an independent lexical environment in memory.</p><p>Closures are the foundational mechanism behind data encapsulation, factory functions, currying, and React's own <code>useState</code> hook.</p>`,
        task: `Implement <code>makeCounter(initial = 0)</code> returning an object with methods: <code>increment()</code>, <code>decrement()</code>, <code>reset()</code>, and <code>value()</code>. <code>count</code> must remain private and cannot be directly modified.`,
        code: `// A closure retains access to the outer lexical environment.
function makeCounter(initial = 0) {
  let count = initial;
  // TASK: Return { increment, decrement, reset, value }
  
}

const c = makeCounter(5);
console.log(c.value()); // 5
`,
        tests: `test('increments and decrements properly', () => {
  const c = makeCounter(10);
  eq(c.increment(), 11);
  eq(c.increment(), 12);
  eq(c.decrement(), 11);
  eq(c.value(), 11);
});
test('resets to initial value', () => {
  const c = makeCounter(5);
  c.increment(); c.increment();
  eq(c.reset(), 5);
  eq(c.value(), 5);
});
test('separate instances do not share state', () => {
  const a = makeCounter(0), b = makeCounter(100);
  a.increment();
  eq(a.value(), 1);
  eq(b.value(), 100);
});
test('count variable is private and encapsulated', () => {
  const c = makeCounter(0);
  eq(c.count, undefined);
});`,
        h: [
          'Declare `let count = initial;` inside `makeCounter`.',
          'Return an object with methods that all read and update that same lexical `count` variable.',
          'Reset should assign `count = initial; return count;`.'
        ],
        sol: `function makeCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = initial),
    value: () => count
  };
}`
      },
      {
        id: 'loop',
        tr: 'JavaScript Core',
        sub: 'Async Execution',
        t: 'Event Loop & Microtasks',
        v: 'el',
        lang: 'js',
        body: `<p>JavaScript is single-threaded. When synchronous code finishes, the engine drains all <b>microtasks</b> (Promise reactions, <code>queueMicrotask</code>) before picking the next <b>macrotask</b> (<code>setTimeout</code>, I/O).</p><p>Understanding this queue prioritization is essential for predicting asynchronous execution order in technical interviews.</p>`,
        task: `Schedule a microtask that logs <code>'micro'</code> so that the final console output sequence is strictly: <code>'start', 'end', 'micro', 'timeout'</code>.`,
        code: `console.log('start');

setTimeout(() => console.log('timeout'), 0);

// TASK: schedule a microtask logging 'micro'

console.log('end');
`,
        tests: `test('order is start, end, micro, timeout', async () => {
  await delay(60);
  eq(L, ['start', 'end', 'micro', 'timeout']);
});`,
        h: [
          'Which built-in API places a callback directly into the microtask queue ahead of timers?',
          'You can use either `queueMicrotask(() => ...)` or `Promise.resolve().then(...)`.',
          'queueMicrotask(() => console.log("micro"));'
        ],
        sol: `queueMicrotask(() => console.log('micro'));`
      },
      {
        id: 'arrays',
        tr: 'JavaScript Core',
        sub: 'Data Transformation',
        t: 'Array Pipelines (reduce)',
        v: 'pp',
        lang: 'js',
        body: `<p><code>reduce</code> is the Swiss Army knife of array transformations. It can accumulate an array into numbers, strings, sets, or grouped objects without mutating the original input.</p>`,
        task: `Implement <code>groupBy(items, keyFn)</code> returning an object <code>{ [key]: [items] }</code> using <code>reduce</code>. Do not mutate the input array.`,
        code: `const people = [
  { name: 'Alex', role: 'eng' },
  { name: 'Sam', role: 'design' },
  { name: 'Robin', role: 'eng' }
];

// TASK: groupBy(items, keyFn) -> { key: [items] }
function groupBy(items, keyFn) {
  
}

console.log(groupBy(people, p => p.role));
`,
        tests: `test('groups numbers into odd and even', () => {
  const res = groupBy([1, 2, 3, 4], x => x % 2 === 0 ? 'even' : 'odd');
  eq(res, { odd: [1, 3], even: [2, 4] });
});
test('empty array returns empty object', () => {
  eq(groupBy([], x => x), {});
});
test('does not mutate input array', () => {
  const orig = [1, 2, 3];
  groupBy(orig, x => x);
  eq(orig, [1, 2, 3]);
});`,
        h: [
          'Initialize reduce with an empty object `{}` as the accumulator.',
          'For each item, call `const key = keyFn(item)`.',
          'Ensure `acc[key]` is an array before pushing `item` into it: `(acc[key] = acc[key] || []).push(item); return acc;`'
        ],
        sol: `function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}`
      },
      {
        id: 'retry',
        tr: 'JavaScript Core',
        sub: 'Async Resiliency',
        t: 'Promises & Retry Logic',
        lang: 'js',
        body: `<p>Real-world network requests often experience transient failures. Implementing resilient retry logic with maximum attempts is a common senior frontend interview question.</p>`,
        task: `Implement <code>retry(fn, times)</code>: call async function <code>fn</code> up to <code>times</code> attempts. Resolve with its value on success; reject with the last error if all attempts fail.`,
        code: `const sleep = ms => new Promise(r => setTimeout(r, ms));

// TASK: retry an async function up to 'times' attempts
async function retry(fn, times) {
  
}

let count = 0;
retry(async () => {
  if (++count < 3) throw new Error('flaky');
  return 'success';
}, 3).then(console.log);
`,
        tests: `test('resolves after initial failures', async () => {
  let n = 0;
  const res = await retry(async () => {
    if (++n < 3) throw new Error('fail');
    return 'ok';
  }, 3);
  eq(res, 'ok');
  eq(n, 3);
});
test('rejects with final error when all attempts fail', async () => {
  let err = '';
  try {
    await retry(async () => { throw new Error('network down'); }, 3);
  } catch (e) {
    err = e.message;
  }
  eq(err, 'network down');
});`,
        h: [
          'Loop from `0` to `times - 1`.',
          'Inside the loop, `try { return await fn(); } catch (e) { lastErr = e; }`.',
          'After the loop finishes without returning, throw `lastErr`.'
        ],
        sol: `async function retry(fn, times) {
  let lastErr;
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}`
      },
      {
        id: 'this-bind',
        tr: 'JavaScript Core',
        sub: 'Function Context',
        t: 'Function.prototype.bind',
        lang: 'js',
        body: `<p><code>bind()</code> creates a new function that, when called, has its <code>this</code> keyword set to the provided context, with a given sequence of arguments prepended to any provided when the new function is called.</p>`,
        task: `Implement <code>myBind(context, ...boundArgs)</code> on <code>Function.prototype</code>.`,
        code: `// TASK: Implement Function.prototype.myBind
Function.prototype.myBind = function(context, ...boundArgs) {
  
};

function greet(greeting, punctuation) {
  return greeting + ', ' + this.name + punctuation;
}

const user = { name: 'Alex' };
const sayHello = greet.myBind(user, 'Hello');
console.log(sayHello('!')); // "Hello, Alex!"
`,
        tests: `test('binds this context', () => {
  function getX() { return this.x; }
  const bound = getX.myBind({ x: 42 });
  eq(bound(), 42);
});
test('preserves prepended bound arguments', () => {
  function add(a, b, c) { return this.base + a + b + c; }
  const bound = add.myBind({ base: 10 }, 1, 2);
  eq(bound(3), 16);
});`,
        h: [
          'Save the original function reference: `const target = this;`.',
          'Return a new function taking `...callArgs`.',
          'Call `target.apply(context, [...boundArgs, ...callArgs])` and return the result.'
        ],
        sol: `Function.prototype.myBind = function(context, ...boundArgs) {
  const target = this;
  if (typeof target !== 'function') throw new TypeError('Target is not callable');
  return function(...callArgs) {
    return target.apply(context, [...boundArgs, ...callArgs]);
  };
};`
      }
    ]
  },
  {
    n: 'React & UI',
    items: [
      {
        id: 'react-counter',
        tr: 'React & UI',
        sub: 'Component State',
        t: 'Counter with Step and Reset',
        lang: 'react',
        body: `<p>Build an interactive React counter demonstrating controlled step inputs, functional state updates, and reset mechanisms.</p>`,
        task: `Build <code>App</code> with: count display, + / - buttons, step number input, and a Reset button that resets count to 0 and step to 1.`,
        code: `function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h2>Counter: {count}</h2>
      <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
        <button onClick={() => setCount(c => c - step)}>- {step}</button>
        <button onClick={() => setCount(c => c + step)}>+ {step}</button>
        <button onClick={() => { setCount(0); setStep(1); }}>Reset</button>
      </div>
      <label>
        Step: 
        <input 
          type="number" 
          value={step} 
          onChange={e => setStep(Number(e.target.value) || 1)} 
          style={{ width: 60, marginLeft: 8 }} 
        />
      </label>
    </div>
  );
}
`,
        h: [
          'Use functional updates: `setCount(c => c + step)` to prevent state snapshot issues.',
          'Convert input value to a number using `Number(e.target.value) || 1`.',
          'Reset handler should update both `count` and `step`.'
        ],
        sol: `function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  return (
    <div style={{ padding: 20 }}>
      <h1>{count}</h1>
      <button onClick={() => setCount(c => c - step)}>-</button>
      <button onClick={() => setCount(c => c + step)}>+</button>
      <button onClick={() => { setCount(0); setStep(1); }}>Reset</button>
      <input type="number" value={step} onChange={e => setStep(+e.target.value || 1)} />
    </div>
  );
}`
      },
      {
        id: 'react-debounce-hook',
        tr: 'React & UI',
        sub: 'Custom Hooks',
        t: 'useDebounce Hook',
        lang: 'react',
        body: `<p>Search fields should not trigger API calls on every keystroke. A <code>useDebounce(value, delay)</code> hook delays propagating changes until user typing pauses.</p>`,
        task: `Implement <code>useDebounce(value, delay)</code> with cleanup to prevent memory leaks.`,
        code: `function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  // TASK: useEffect setting timeout with clearTimeout cleanup
  useEffect(() => {
    
  }, [value, delay]);

  return debounced;
}

function App() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24 }}>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Type quickly..." 
        style={{ padding: 8, width: 250 }} 
      />
      <p>Immediate: <b>{text}</b></p>
      <p>Debounced (500ms): <b style={{ color: 'orange' }}>{debouncedText}</b></p>
    </div>
  );
}
`,
        h: [
          'Inside useEffect, set `const t = setTimeout(() => setDebounced(value), delay)`.',
          'Return a cleanup function `() => clearTimeout(t)`.',
          'Include `[value, delay]` in the dependency array.'
        ],
        sol: `function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}`
      }
    ]
  }
];

const C = (id, sub, t, body, code, tests, h, sol) => ({
  id,
  tr: 'Challenges',
  sub,
  t,
  body: '<p>' + body + '</p>',
  task: 'Make every test pass, then explain your approach and time/space complexity out loud.',
  lang: 'js',
  code,
  tests,
  h,
  sol
});

export const CHALL = [
  C(
    'two-sum',
    'Easy',
    'Two Sum',
    'Return indices <code>[i, j]</code> (i &lt; j) of two numbers that sum to <code>target</code>, or <code>[]</code> if none.',
    `function twoSum(nums, target) {
  // TASK: O(n) hash map approach
  
}
`,
    `test('finds matching pair', () => eq(twoSum([2, 7, 11, 15], 9), [0, 1]));
test('pair not at beginning', () => eq(twoSum([3, 2, 4], 6), [1, 2]));
test('duplicate values', () => eq(twoSum([3, 3], 6), [0, 1]));
test('returns [] when no solution', () => eq(twoSum([1, 2], 10), []));`,
    [
      'Brute force checks all pairs in O(n²). How can you look up the required complement in O(1)?',
      'Use a Map where key is `num` and value is `index`.',
      'At each index `i`, check if `map.has(target - nums[i])`. If yes, return `[map.get(target - nums[i]), i]`; else `map.set(nums[i], i)`.'
    ],
    `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (seen.has(diff)) return [seen.get(diff), i];
    seen.set(nums[i], i);
  }
  return [];
}`
  ),

  C(
    'balanced',
    'Easy',
    'Balanced brackets',
    'Return true if every <code>()[]{}</code> bracket is closed in the correct order.',
    `function isBalanced(s) {
  // TASK: Stack-based bracket validator
  
}
`,
    `test('simple pairs', () => eq(isBalanced('()[]{}'), true));
test('nested brackets', () => eq(isBalanced('{[()]}'), true));
test('wrong closer', () => eq(isBalanced('(]'), false));
test('interleaved brackets', () => eq(isBalanced('([)]'), false));
test('unclosed openers', () => eq(isBalanced('(('), false));
test('empty string is balanced', () => eq(isBalanced(''), true));`,
    [
      'Which data structure provides Last-In-First-Out (LIFO) tracking?',
      'Push opening brackets onto a stack. When a closer appears, pop and compare.',
      'Check that the stack is completely empty at the end.'
    ],
    `function isBalanced(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const c of s) {
    if ('([{'.includes(c)) {
      stack.push(c);
    } else if (pairs[c]) {
      if (stack.pop() !== pairs[c]) return false;
    }
  }
  return stack.length === 0;
}`
  ),

  C(
    'anagram',
    'Easy',
    'Valid anagram',
    'Return true if string <code>b</code> is an anagram of string <code>a</code>, ignoring case.',
    `function isAnagram(a, b) {
  // TASK: Frequency counter approach
  
}
`,
    `test('valid anagram', () => eq(isAnagram('listen', 'silent'), true));
test('ignores casing', () => eq(isAnagram('Listen', 'Silent'), true));
test('different characters', () => eq(isAnagram('rat', 'car'), false));
test('different lengths', () => eq(isAnagram('a', 'ab'), false));`,
    [
      'Two strings of different lengths cannot be anagrams.',
      'Count letter frequencies in the first string, then decrement for the second string.',
      'Verify that all character counts match zero.'
    ],
    `function isAnagram(a, b) {
  const s1 = a.toLowerCase(), s2 = b.toLowerCase();
  if (s1.length !== s2.length) return false;
  const count = {};
  for (const c of s1) count[c] = (count[c] || 0) + 1;
  for (const c of s2) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`
  ),

  C(
    'substring',
    'Medium',
    'Longest unique substring',
    'Return the length of the longest substring without duplicate characters.',
    `function lengthOfLongestSubstring(s) {
  // TASK: Sliding window with Map of last seen indices
  
}
`,
    `test('abcabcbb gives 3', () => eq(lengthOfLongestSubstring('abcabcbb'), 3));
test('bbbbb gives 1', () => eq(lengthOfLongestSubstring('bbbbb'), 1));
test('pwwkew gives 3', () => eq(lengthOfLongestSubstring('pwwkew'), 3));
test('dvdf gives 3', () => eq(lengthOfLongestSubstring('dvdf'), 3));
test('empty string gives 0', () => eq(lengthOfLongestSubstring(''), 0));`,
    [
      'Maintain a sliding window with left and right pointers.',
      'Track the last seen index of each character in a Map.',
      'When a repeat is found at or after `left`, jump `left` to `lastIndex + 1`.'
    ],
    `function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (last.has(char) && last.get(char) >= left) {
      left = last.get(char) + 1;
    }
    last.set(char, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`
  ),

  C(
    'debounce',
    'Medium',
    'Implement debounce',
    'Return a function that waits <code>ms</code> after the last call before executing <code>fn</code> with the latest arguments.',
    `function debounce(fn, ms) {
  // TASK: Return debounced function
  
}
`,
    `test('waits and executes once with last args', async () => {
  const c = [];
  const d = debounce(x => c.push(x), 30);
  d(1); d(2); d(3);
  eq(c, []);
  await delay(70);
  eq(c, [3]);
});
test('subsequent bursts run again', async () => {
  const c = [];
  const d = debounce(x => c.push(x), 20);
  d('a');
  await delay(50);
  d('b');
  await delay(50);
  eq(c, ['a', 'b']);
});`,
    [
      'A closure stores the pending timer.',
      'On every call, clearTimeout(timerId).',
      'Set `timerId = setTimeout(() => fn.apply(this, args), ms)`.'
    ],
    `function debounce(fn, ms) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), ms);
  };
}`
  ),

  C(
    'flatten',
    'Medium',
    'Flatten array with depth',
    'Flatten nested arrays up to <code>depth</code> levels (default: all). Do not mutate input.',
    `function flatten(arr, depth = Infinity) {
  // TASK: Recursive flattening
  
}
`,
    `test('fully flattens nested array', () => eq(flatten([1, [2, [3, [4]]]]), [1, 2, 3, 4]));
test('respects depth limit 1', () => eq(flatten([1, [2, [3, [4]]]], 1), [1, 2, [3, [4]]]));
test('empty array returns []', () => eq(flatten([]), []));`,
    [
      'Use reduce or a loop to construct a new output array.',
      'If an element is an array and `depth > 0`, recursively call `flatten(item, depth - 1)`.',
      'Otherwise, push the item directly into the output.'
    ],
    `function flatten(arr, depth = Infinity) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      return acc.concat(flatten(item, depth - 1));
    }
    return acc.concat(item);
  }, []);
}`
  ),

  C(
    'memoize',
    'Medium',
    'Memoize function',
    'Cache results of <code>fn</code> by serialized arguments so repeated calls return cached values without recomputing.',
    `function memoize(fn) {
  // TASK: Cache results by arguments
  
}
`,
    `test('caches computation by arguments', () => {
  let calls = 0;
  const square = memoize(x => { calls++; return x * x; });
  eq(square(4), 16);
  eq(square(4), 16);
  eq(calls, 1);
});
test('different arguments compute separately', () => {
  let calls = 0;
  const double = memoize(x => { calls++; return x * 2; });
  double(1); double(2);
  eq(calls, 2);
});
test('caches falsy results correctly', () => {
  let calls = 0;
  const zero = memoize(() => { calls++; return 0; });
  zero(); zero();
  eq(calls, 1);
});`,
    [
      'Maintain a `cache = new Map()` in a closure.',
      'Serialize arguments using `JSON.stringify(args)`.',
      'Check `cache.has(key)` to properly handle falsy or undefined results.'
    ],
    `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn.apply(this, args));
    }
    return cache.get(key);
  };
}`
  ),

  C(
    'promise-all',
    'Hard',
    'Polyfill Promise.all',
    'Write <code>promiseAll(items)</code>: resolve with results in input order, reject on first rejection, and handle empty arrays.',
    `function promiseAll(items) {
  // TASK: Implement Promise.all
  
}
`,
    `test('maintains input order', async () => {
  const p1 = delay(30).then(() => 'first');
  const p2 = Promise.resolve('second');
  const p3 = 'third';
  eq(await promiseAll([p1, p2, p3]), ['first', 'second', 'third']);
});
test('rejects immediately on first error', async () => {
  let err = '';
  try {
    await promiseAll([
      delay(50),
      (p => { p.catch(() => {}); return p; })(Promise.reject(new Error('fail')))
    ]);
  } catch (e) {
    err = e.message;
  }
  eq(err, 'fail');
});
test('empty array resolves to []', async () => {
  eq(await promiseAll([]), []);
});`,
    [
      'Return `new Promise((resolve, reject) => ...)`. Handle `items.length === 0` immediately.',
      'Maintain `const results = []` and `let completed = 0`.',
      'Wrap each item in `Promise.resolve(item)`. Store result at `results[i] = val` and resolve when `++completed === items.length`.'
    ],
    `function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(items);
    if (arr.length === 0) return resolve([]);
    const results = new Array(arr.length);
    let completed = 0;
    arr.forEach((item, index) => {
      Promise.resolve(item)
        .then(val => {
          results[index] = val;
          completed++;
          if (completed === arr.length) resolve(results);
        })
        .catch(reject);
    });
  });
}`
  )
];

TR.push({ n: 'Challenges', items: CHALL });
