// Forjix — Comprehensive Coding Problem Bank
// Structured by pattern, difficulty, priority, and progressive hints

export const problems = [
  // ==========================================
  // ARRAYS & TWO POINTERS
  // ==========================================
  {
    id: 'p1',
    title: 'Reverse a string / Palindrome check',
    cat: 'Two pointers',
    difficulty: 'Easy',
    priority: 'P1',
    objective: 'Master two-pointer converging traversal and string normalization (ignoring case and alphanumeric characters).',
    desc: 'Write a function `isPalindrome(s)` that determines if string `s` is a palindrome, considering only alphanumeric characters and ignoring cases.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: 'Normalized string is "amanaplanacanalpanama" which reads identical forwards and backwards.' },
      { input: 's = "race a car"', output: 'false', explanation: 'Normalized string is "raceacar" which is not a palindrome.' }
    ],
    edgeCases: [
      'Empty string or single character string (should return true)',
      'String with only punctuation and whitespace (should return true)',
      'Mixed case letters and numerical digits'
    ],
    hints: [
      'Step 1: How can you ignore non-alphanumeric characters and casing? Either normalize first with regex or skip invalid characters during traversal.',
      'Step 2: Initialize two pointers: `left = 0` and `right = s.length - 1`. Move them toward each other.',
      'Step 3: At each step, compare `s[left].toLowerCase()` and `s[right].toLowerCase()`. If they mismatch, return false immediately; otherwise increment left and decrement right.'
    ],
    timeComplexity: 'O(n) where n is string length',
    spaceComplexity: 'O(1) extra space with two pointers in-place, or O(n) if creating a filtered string',
    solution: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    explanation: 'Clean the string to keep only lowercase alphanumeric characters, then converge two pointers from the ends comparing opposite characters.',
    starter: `function isPalindrome(s) {
  // Your code here
}`
  },
  {
    id: 'p2',
    title: 'Find the second-largest number',
    cat: 'Arrays',
    difficulty: 'Easy',
    priority: 'P1',
    objective: 'Extract extreme values in a single linear pass without the O(n log n) cost of full sorting.',
    desc: 'Given an array of numbers `nums`, find the second-largest DISTINCT number. If no second-largest exists (e.g. array has fewer than two distinct values), return `null`.',
    examples: [
      { input: 'nums = [12, 35, 1, 10, 34, 1]', output: '34', explanation: 'Largest is 35, second-largest is 34.' },
      { input: 'nums = [10, 10, 10]', output: 'null', explanation: 'All elements are identical; no second-largest distinct value.' }
    ],
    edgeCases: [
      'Array length < 2 (return null)',
      'All elements are duplicates (return null)',
      'Negative numbers in array (e.g. [-5, -2, -10])'
    ],
    hints: [
      'Step 1: You could sort, but sorting costs O(n log n). Can you track the top two values in a single O(n) pass?',
      'Step 2: Initialize `first = -Infinity` and `second = -Infinity`.',
      'Step 3: For each number: if `num > first`, then `second = first; first = num;`. Else if `num > second` and `num !== first`, update `second = num;`.'
    ],
    timeComplexity: 'O(n) single pass',
    spaceComplexity: 'O(1) auxiliary space',
    solution: `function findSecondLargest(nums) {
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
}`,
    explanation: 'Maintain two scalar variables for largest and second-largest distinct values, updating them appropriately across a single pass.',
    starter: `function findSecondLargest(nums) {
  // Your code here
}`
  },
  {
    id: 'p10',
    title: 'Two Sum',
    cat: 'Frequency counters',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Learn the hash map lookup pattern to trade linear space for quadratic time reduction.',
    desc: 'Given an array of integers `nums` and an integer `target`, return indices `[i, j]` of the two numbers such that they add up to `target`. Each input has exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] == 2 + 7 == 9' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] == 2 + 4 == 6' }
    ],
    edgeCases: [
      'Negative numbers in array',
      'Target is zero or negative',
      'Duplicate values that together equal the target (e.g. [3, 3], target 6)'
    ],
    hints: [
      'Step 1: Brute force uses nested loops checking all pairs (O(n²)). How can we check if `target - current` exists in O(1)?',
      'Step 2: Use a Map to store each number and its index as you iterate.',
      'Step 3: At each index `i`, check if `seen.has(target - nums[i])`. If found, return `[seen.get(target - nums[i]), i]`. Otherwise, `seen.set(nums[i], i)`.'
    ],
    timeComplexity: 'O(n) single pass',
    spaceComplexity: 'O(n) for the hash map',
    solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
    explanation: 'Iterate through the array while checking if the required complement already exists in our Map. Store seen elements with their index.',
    starter: `function twoSum(nums, target) {
  // Your code here
}`
  },
  {
    id: 'p8',
    title: 'Check whether two strings are anagrams',
    cat: 'Frequency counters',
    difficulty: 'Easy',
    priority: 'P1',
    objective: 'Implement frequency counting using a hash map or fixed-size array in O(n) time.',
    desc: 'Write a function `isAnagram(s, t)` returning true if `t` is an anagram of `s` (contains the exact same characters with the same frequencies), and false otherwise.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both strings have identical character counts.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Characters do not match.' }
    ],
    edgeCases: [
      'Different string lengths (return false immediately)',
      'Empty strings (return true)',
      'Different casing or whitespace if specified'
    ],
    hints: [
      'Step 1: Quick check: If `s.length !== t.length`, they cannot be anagrams.',
      'Step 2: You could sort both strings and compare (O(n log n)), but frequency counting is O(n).',
      'Step 3: Count characters in `s` using an object or Map. Then iterate through `t`, decrementing counts. If any count drops below 0 or key is missing, return false.'
    ],
    timeComplexity: 'O(n) where n is string length',
    spaceComplexity: 'O(1) auxiliary space (at most 26 lowercase English letters or fixed character set)',
    solution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
    explanation: 'Count character frequencies in the first string, then decrement for the second string. An early return occurs if any character count is exhausted.',
    starter: `function isAnagram(s, t) {
  // Your code here
}`
  },
  {
    id: 'p27',
    title: 'Longest substring without repeating characters',
    cat: 'Sliding window',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Master the dynamic sliding window pattern with index tracking.',
    desc: 'Given a string `s`, find the length of the longest substring without duplicate characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' }
    ],
    edgeCases: [
      'Empty string (returns 0)',
      'String with all unique characters (returns length)',
      'String with all identical characters (returns 1)'
    ],
    hints: [
      'Step 1: A brute force checks all substrings in O(n³). A sliding window maintains a valid window `[left, right]` in O(n).',
      'Step 2: Keep track of the last seen index of each character using a Map.',
      'Step 3: As `right` advances, if `s[right]` was seen at or after `left`, jump `left` to `lastSeen.get(s[right]) + 1`. Update max length at every step.'
    ],
    timeComplexity: 'O(n) where n is string length',
    spaceComplexity: 'O(min(n, m)) where m is size of the character set',
    solution: `function lengthOfLongestSubstring(s) {
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
}`,
    explanation: 'Expand the window with pointer `right`. When a duplicate character is encountered within the current window, move `left` pointer directly past the previous occurrence.',
    starter: `function lengthOfLongestSubstring(s) {
  // Your code here
}`
  },
  {
    id: 'p11',
    title: 'Balanced parentheses / Brackets validator',
    cat: 'Stack & queue',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Apply the Stack (LIFO) data structure for nested delimiter validation.',
    desc: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.',
    examples: [
      { input: 's = "()[]{}"', output: 'true', explanation: 'Every bracket is matched and closed in order.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket.' },
      { input: 's = "([)]"', output: 'false', explanation: 'Interleaved invalid closing order.' }
    ],
    edgeCases: [
      'Empty string (returns true)',
      'Odd length string (returns false immediately)',
      'Starts with closing bracket (e.g. ")(")',
      'Unclosed opening brackets (e.g. "(((")'
    ],
    hints: [
      'Step 1: If string length is odd, it can never be valid.',
      'Step 2: Use a stack array. When you encounter an opening bracket `(`, `[`, `{`, push it.',
      'Step 3: When you encounter a closing bracket, pop from the stack and verify it matches. At the end, verify the stack is completely empty.'
    ],
    timeComplexity: 'O(n) single pass',
    spaceComplexity: 'O(n) worst-case stack depth',
    solution: `function isValidBrackets(s) {
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
}`,
    explanation: 'Push opening brackets to a stack. For closing brackets, pop the most recent opener and check for correspondence. Ensure no dangling openers remain.',
    starter: `function isValidBrackets(s) {
  // Your code here
}`
  },

  // ==========================================
  // JAVASCRIPT FUNCTIONS & ASYNC
  // ==========================================
  {
    id: 'p12',
    title: 'Implement debounce with cancellation',
    cat: 'JS functions',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Implement higher-order function debounce from scratch, preserving `this` and arguments, with a cancel method.',
    desc: 'Create `debounce(fn, delay)` returning a debounced function. If called repeatedly within `delay` ms, execution is delayed. Also attach a `.cancel()` method to clear pending timers.',
    examples: [
      { input: 'debounced(1); debounced(2); after 50ms', output: 'fn(2) called once', explanation: 'Subsequent calls cancel previous timers.' }
    ],
    edgeCases: [
      'Preserving dynamic `this` context',
      'Passing all arguments correctly',
      'Calling cancel() before timer fires'
    ],
    hints: [
      'Step 1: Use a closure to store `timerId` outside the returned function.',
      'Step 2: Inside the returned wrapper, call `clearTimeout(timerId)` immediately.',
      'Step 3: Set `timerId = setTimeout(() => fn.apply(this, args), delay)`. Attach `wrapper.cancel = () => clearTimeout(timerId)`.'
    ],
    timeComplexity: 'O(1) invocation overhead',
    spaceComplexity: 'O(1) closure state',
    solution: `function debounce(fn, delay) {
  let timerId = null;
  function debounced(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
      timerId = null;
    }, delay);
  }
  debounced.cancel = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };
  return debounced;
}`,
    explanation: 'A closure stores the pending timer. Each call clears any existing timer and schedules a new one with `.apply(this, args)`.',
    starter: `function debounce(fn, delay) {
  // Your code here
}`
  },
  {
    id: 'p13',
    title: 'Implement throttle',
    cat: 'JS functions',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Rate-limit function execution to at most once per interval using timestamp comparison.',
    desc: 'Implement `throttle(fn, limit)` that ensures `fn` is called at most once every `limit` milliseconds.',
    examples: [
      { input: 'throttled(1); throttled(2); immediately', output: 'fn(1) executes, fn(2) ignored within throttle window' }
    ],
    edgeCases: [
      'First call executes immediately',
      'Rapid subsequent calls within limit are throttled',
      'Calls after limit executes again'
    ],
    hints: [
      'Step 1: Track `lastRan` timestamp in closure scope.',
      'Step 2: In the returned function, compare `Date.now() - lastRan`.',
      'Step 3: If elapsed time >= limit, update `lastRan = Date.now()` and execute `fn.apply(this, args)`.'
    ],
    timeComplexity: 'O(1) overhead',
    spaceComplexity: 'O(1)',
    solution: `function throttle(fn, limit) {
  let lastRan = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRan >= limit) {
      fn.apply(this, args);
      lastRan = now;
    }
  };
}`,
    explanation: 'Check whether enough time has elapsed since the last execution before calling the function again.',
    starter: `function throttle(fn, limit) {
  // Your code here
}`
  },
  {
    id: 'p33',
    title: 'Polyfill Promise.all',
    cat: 'Async JS',
    difficulty: 'Hard',
    priority: 'P1',
    objective: 'Understand Promise combinator mechanics, parallel execution, and preservation of completion order.',
    desc: 'Implement `promiseAll(iterable)` from scratch. It returns a Promise that fulfills with an array of all resolved values in input order, or rejects immediately with the first rejection reason.',
    examples: [
      { input: 'promiseAll([Promise.resolve(1), delay(20).then(()=>2), 3])', output: '[1, 2, 3]', explanation: 'Order is preserved and non-promise values are wrapped.' }
    ],
    edgeCases: [
      'Empty iterable input (resolves immediately with [])',
      'Inputs with non-promise primitive values',
      'Immediate rejection stops further resolution'
    ],
    hints: [
      'Step 1: Return a new Promise with `resolve` and `reject`. Handle empty input array immediately.',
      'Step 2: Keep an output array `results = []` and a counter `completed = 0`.',
      'Step 3: Iterate with index `i`. Wrap each element in `Promise.resolve(item)`. On resolve, assign `results[i] = value` (do not push!) and check if `++completed === items.length`.'
    ],
    timeComplexity: 'O(n) where n is number of promises',
    spaceComplexity: 'O(n) results storage',
    solution: `function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable);
    if (items.length === 0) return resolve([]);
    const results = new Array(items.length);
    let completed = 0;

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === items.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}`,
    explanation: 'Wrap each item in Promise.resolve, place resolved values into their original index position, and resolve once the completion counter matches input length.',
    starter: `function promiseAll(iterable) {
  // Your code here
}`
  },
  {
    id: 'p34',
    title: 'Retry with exponential backoff',
    cat: 'Async JS',
    difficulty: 'Hard',
    priority: 'P1',
    objective: 'Implement resilient network error recovery with backoff delays.',
    desc: 'Implement `retryWithBackoff(fn, retries = 3, delay = 100)`: execute async `fn`. If it fails, wait `delay * 2^attempt` ms and retry up to `retries` times before re-throwing.',
    examples: [
      { input: 'Fails twice, succeeds 3rd attempt', output: 'Resolves with result after two delays' },
      { input: 'Fails 4 times with retries=3', output: 'Rejects with the final error' }
    ],
    edgeCases: [
      'Succeeds on first attempt (zero delay)',
      'Zero retries allowed',
      'Exponential delay growth'
    ],
    hints: [
      'Step 1: Create a sleep helper `const sleep = ms => new Promise(r => setTimeout(r, ms))`',
      'Step 2: Use a loop from `attempt = 0` to `retries`. Wrap `await fn()` in try/catch.',
      'Step 3: In catch: if `attempt === retries`, throw error. Otherwise `await sleep(delay * Math.pow(2, attempt))`.'
    ],
    timeComplexity: 'O(attempts)',
    spaceComplexity: 'O(1)',
    solution: `async function retryWithBackoff(fn, retries = 3, delay = 100) {
  const sleep = ms => new Promise(res => setTimeout(res, ms));
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await sleep(delay * Math.pow(2, attempt));
      }
    }
  }
  throw lastError;
}`,
    explanation: 'Loop through retry attempts with exponential backoff delay between failures, throwing the final captured error if all attempts fail.',
    starter: `async function retryWithBackoff(fn, retries = 3, delay = 100) {
  // Your code here
}`
  },
  {
    id: 'p22',
    title: 'Deep clone an object with circular references',
    cat: 'Objects & Maps',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Implement recursive cloning handling nested objects, arrays, and circular references via WeakMap.',
    desc: 'Write `deepClone(obj)` that produces an exact independent copy of `obj`, correctly copying nested objects, arrays, and breaking circular reference cycles.',
    examples: [
      { input: 'const a = { x: 1 }; a.self = a; deepClone(a)', output: 'Independent clone with self-reference intact' }
    ],
    edgeCases: [
      'Primitives (return as-is)',
      'null and undefined',
      'Arrays vs plain objects',
      'Circular references'
    ],
    hints: [
      'Step 1: Base case: if `obj === null || typeof obj !== "object"`, return it directly.',
      'Step 2: Maintain a `seen = new WeakMap()` to store original object -> cloned object.',
      'Step 3: If `seen.has(obj)`, return `seen.get(obj)`. Otherwise create clone, set in `seen`, and recursively clone each key.'
    ],
    timeComplexity: 'O(n) where n is total property count',
    spaceComplexity: 'O(n) recursion stack & seen map',
    solution: `function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);

  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}`,
    explanation: 'Check for primitives, use a WeakMap to track visited objects to resolve circular graphs, and clone properties recursively.',
    starter: `function deepClone(obj, seen = new WeakMap()) {
  // Your code here
}`
  },
  {
    id: 'p25',
    title: 'Polyfill Function.prototype.bind',
    cat: 'JS functions',
    difficulty: 'Medium',
    priority: 'P2',
    objective: 'Implement Function.prototype.bind handling context binding and partial application.',
    desc: 'Implement `myBind(context, ...boundArgs)` on Function.prototype returning a new function that invokes the original with `context` and prepended arguments.',
    examples: [
      { input: 'function f(a, b) { return this.x + a + b; }; f.myBind({ x: 10 }, 5)(2)', output: '17' }
    ],
    edgeCases: [
      'Invoking with new keyword (bonus)',
      'Preserving multiple calls with varying arguments'
    ],
    hints: [
      'Step 1: Save the target function reference (`const fn = this`).',
      'Step 2: Return a function that collects `...callArgs`.',
      'Step 3: Inside, invoke `fn.apply(context, [...boundArgs, ...callArgs])`.'
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(args length)',
    solution: `Function.prototype.myBind = function(context, ...boundArgs) {
  const targetFn = this;
  if (typeof targetFn !== 'function') throw new TypeError('Not callable');
  return function(...callArgs) {
    return targetFn.apply(context, [...boundArgs, ...callArgs]);
  };
};`,
    explanation: 'Capture the original function and bound arguments in a closure, merging them with subsequent call arguments via apply.',
    starter: `Function.prototype.myBind = function(context, ...boundArgs) {
  // Your code here
}`
  },

  // ==========================================
  // REACT COMPONENTS & MACHINE CODING
  // ==========================================
  {
    id: 'p15',
    title: 'Build a Todo application with search and filter',
    cat: 'React components',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Practice immutable state updates, derived list state, controlled inputs, and stable keys.',
    desc: 'Build a complete Todo application with:\n1. Input field to add todos\n2. Toggle complete checkbox\n3. Delete button\n4. Filter buttons: All, Active, Completed\n5. Search query input\n6. Empty state message when no items match.',
    examples: [
      { input: 'Add "Learn React", toggle completed, filter "Active"', output: '"Learn React" is hidden under Active filter' }
    ],
    edgeCases: [
      'Empty string submission (prevent addition)',
      'Preserving item IDs rather than array index',
      'Search with no matching items (show friendly empty state)'
    ],
    hints: [
      'Step 1: Model state: `todos` array with `{ id, text, completed }` and `filter` string and `search` query.',
      'Step 2: Derive `visibleTodos = todos.filter(...)` during render instead of maintaining a second state array.',
      'Step 3: Use immutable updates: `todos.map(...)` for toggling and `todos.filter(...)` for deletion.'
    ],
    timeComplexity: 'O(n) filtering',
    spaceComplexity: 'O(n) state storage',
    solution: `function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), completed: false }]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const visibleTodos = todos.filter(t => {
    const matchesFilter = filter === 'all' || (filter === 'active' ? !t.completed : t.completed);
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ padding: 16 }}>
      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="What needs to be done?" />
        <button type="submit">Add</button>
      </form>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search todos..." style={{ marginBottom: 12 }} />
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {['all', 'active', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>
      {visibleTodos.length === 0 ? <p>No todos found.</p> : (
        <ul>
          {visibleTodos.map(todo => (
            <li key={todo.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    explanation: 'Manage raw todos in state, derive filtered and searched views purely during rendering, and perform clean immutable updates.',
    starter: `function App() {
  return <div>Build your Todo App here</div>;
}`
  },
  {
    id: 'p16',
    title: 'Accessible Tabs component',
    cat: 'React components',
    difficulty: 'Easy',
    priority: 'P1',
    objective: 'Build an accessible tabbed interface with keyboard arrow navigation and ARIA attributes.',
    desc: 'Build a Tabs component taking items `[{ id, label, content }]`. Support active tab state, clicking to select, and keyboard left/right arrow navigation.',
    examples: [
      { input: 'Clicking Tab 2', output: 'Activates Tab 2 and displays its corresponding content panel' }
    ],
    edgeCases: [
      'Empty tabs list',
      'Default to first tab if active tab not specified',
      'Keyboard arrow wrapping from last to first'
    ],
    hints: [
      'Step 1: Keep `activeId` state initialized to `items[0]?.id`.',
      'Step 2: Add `role="tablist"` on container, `role="tab"` on buttons with `aria-selected={activeId === item.id}`.',
      'Step 3: Listen for onKeyDown (ArrowLeft, ArrowRight) to cycle the active tab.'
    ],
    timeComplexity: 'O(1) switch',
    spaceComplexity: 'O(1)',
    solution: `function Tabs({ items = [] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  if (!items.length) return null;

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight') {
      const next = (index + 1) % items.length;
      setActiveId(items[next].id);
    } else if (e.key === 'ArrowLeft') {
      const prev = (index - 1 + items.length) % items.length;
      setActiveId(items[prev].id);
    }
  };

  const activeItem = items.find(i => i.id === activeId) || items[0];

  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: 8, borderBottom: '1px solid #ccc' }}>
        {items.map((item, idx) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeId === item.id}
            onClick={() => setActiveId(item.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            style={{
              padding: '8px 16px',
              border: 0,
              borderBottom: activeId === item.id ? '2px solid orange' : 'none',
              background: 'none',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ padding: 16 }}>
        {activeItem?.content}
      </div>
    </div>
  );
}`,
    explanation: 'Track active tab ID, render tablist and tabpanel roles, and handle keyboard arrow navigation.',
    starter: `function Tabs({ items }) {
  return <div>Build Tabs here</div>;
}`
  },
  {
    id: 'p18',
    title: 'Debounced search autocomplete with AbortController',
    cat: 'Machine coding',
    difficulty: 'Hard',
    priority: 'P1',
    objective: 'Implement real-world asynchronous autocomplete handling debouncing, loading, errors, keyboard navigation, and request aborting.',
    desc: 'Build a search autocomplete component that fetches suggestions from an API endpoint as the user types:\n1. Debounce queries by 300ms\n2. Cancel outdated requests with AbortController\n3. Show loading spinner and empty state\n4. Navigate suggestions with ArrowUp, ArrowDown, Enter to select, Escape to close.',
    examples: [
      { input: 'Type "react", navigate with Down arrow, hit Enter', output: 'Selected suggestion populates input and dropdown closes' }
    ],
    edgeCases: [
      'Rapid typing causing out-of-order network responses',
      'API failure displays error message',
      'Clicking outside closes dropdown'
    ],
    hints: [
      'Step 1: Create a `useDebounce` hook or effect with 300ms delay.',
      'Step 2: In data fetch effect, create `const controller = new AbortController()`. Return cleanup calling `controller.abort()`.',
      'Step 3: Track `highlightIndex` state for keyboard arrow navigation. Handle ArrowDown, ArrowUp, Enter, and Escape keys in onKeyDown.'
    ],
    timeComplexity: 'O(1) debounced queries',
    spaceComplexity: 'O(suggestions count)',
    solution: `function Autocomplete({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(\`https://dummyjson.com/products/search?q=\${encodeURIComponent(query)}&limit=5\`, { signal: controller.signal });
        const data = await res.json();
        setResults(data.products || []);
        setOpen(true);
      } catch (e) {
        if (e.name !== 'AbortError') setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const handleKeyDown = (e) => {
    if (!open || !results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight(h => (h + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight(h => (h - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && highlight >= 0) {
      e.preventDefault();
      choose(results[highlight]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const choose = (item) => {
    setQuery(item.title);
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <div style={{ position: 'relative', width: 300 }}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setHighlight(-1); }}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        style={{ width: '100%', padding: 8 }}
      />
      {loading && <div style={{ fontSize: 12, color: '#888' }}>Searching...</div>}
      {open && results.length > 0 && (
        <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #ddd', margin: 0, padding: 0, listStyle: 'none', zIndex: 10 }}>
          {results.map((item, idx) => (
            <li
              key={item.id}
              onClick={() => choose(item)}
              style={{ padding: 8, background: highlight === idx ? '#eee' : '#fff', cursor: 'pointer' }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    explanation: 'Combines debounced timeouts with AbortController cancellation in cleanup, along with keyboard navigation index state.',
    starter: `function Autocomplete() {
  return <div>Build Autocomplete here</div>;
}`
  },
  {
    id: 'p17',
    title: 'Sortable, filterable, paginated data table',
    cat: 'Machine coding',
    difficulty: 'Hard',
    priority: 'P1',
    objective: 'Build a production-grade data table managing multi-column sorting, search filtering, and pagination.',
    desc: 'Build a data table displaying users with:\n1. Search input filtering across name/email\n2. Clickable column headers to sort ascending/descending\n3. Pagination with Previous, Next, and page numbers\n4. Configurable page size (5, 10, 20).',
    examples: [
      { input: 'Sort by "Age" ascending and filter by "John"', output: 'Displays matching Johns sorted by age with pagination controls' }
    ],
    edgeCases: [
      'Empty data array',
      'Search filters out all rows (show "No records found")',
      'Current page becomes invalid after filter reduces total pages (reset page to 1)'
    ],
    hints: [
      'Step 1: State management: `data`, `searchQuery`, `sortConfig = { key, direction }`, `currentPage`, `pageSize`.',
      'Step 2: Derive filtered data first -> then sort -> then slice for pagination.',
      'Step 3: If `currentPage * pageSize >= filteredCount`, clamp `currentPage`.'
    ],
    timeComplexity: 'O(n log n) sorting',
    spaceComplexity: 'O(n) derived rows',
    solution: `function DataTable({ data = [] }) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = data.filter(row =>
    Object.values(row).some(val => String(val).toLowerCase().includes(query.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDir === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setPage(1); }}
        placeholder="Filter records..."
        style={{ marginBottom: 12, padding: 6 }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['name', 'role', 'score'].map(col => (
              <th
                key={col}
                onClick={() => toggleSort(col)}
                style={{ cursor: 'pointer', borderBottom: '2px solid #ccc', textAlign: 'left', padding: 8 }}
              >
                {col.toUpperCase()} {sortKey === col ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.length ? paginated.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{r.name}</td>
              <td style={{ padding: 8 }}>{r.role}</td>
              <td style={{ padding: 8 }}>{r.score}</td>
            </tr>
          )) : (
            <tr><td colSpan={3} style={{ padding: 16, textAlign: 'center' }}>No records found.</td></tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
        <button disabled={safePage <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {safePage} of {totalPages}</span>
        <button disabled={safePage >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}`,
    explanation: 'Derive visible rows in strict order: filter by query -> sort copy by active column and direction -> slice by current page offset.',
    starter: `function DataTable({ data }) {
  return <div>Build Data Table here</div>;
}`
  },
  {
    id: 'p19',
    title: 'Custom useDebounce Hook',
    cat: 'React components',
    difficulty: 'Medium',
    priority: 'P1',
    objective: 'Implement custom hook useDebounce with proper useEffect cleanup.',
    desc: 'Create a custom React hook `useDebounce(value, delay)` that returns the debounced value, updating only after `delay` ms of silence.',
    examples: [
      { input: 'const debouncedText = useDebounce(text, 500)', output: 'debouncedText updates 500ms after user stops typing' }
    ],
    edgeCases: [
      'Rapidly changing value clears previous timeout',
      'Unmounting cleans up active timeout'
    ],
    hints: [
      'Step 1: Maintain internal state `const [debouncedValue, setDebouncedValue] = useState(value)`.',
      'Step 2: In `useEffect`, set a timeout to update `debouncedValue` after `delay` ms.',
      'Step 3: In the effect cleanup, call `clearTimeout(timer)`. Return `debouncedValue`.'
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    solution: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    explanation: 'A useEffect runs whenever `value` or `delay` changes. The cleanup function clears the pending timer, ensuring only the final value after silence updates state.',
    starter: `function useDebounce(value, delay) {
  // Your code here
}`
  }
];
