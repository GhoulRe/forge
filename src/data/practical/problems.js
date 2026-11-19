// Focused coding prompts paired with the Practical 15-day schedule.
const lines = (...rows) => rows.join('\n');

const followUp = (id, title, cat, desc, signature, solution, hints) => ({
  id, title, cat, difficulty: 'Medium', priority: 'P2', desc,
  objective: 'Optional guide-aligned follow-up: practise the pattern, edge cases and complexity.',
  starter: `${signature} {\n  // Implement the behavior described above.\n}`,
  solution, hints
});

const followUpProblems = [
  followUp('practical-p16', 'Binary search', 'Binary search', 'Return the index of target in a sorted ascending array, or -1 when it is absent. Use an iterative O(log n) solution.', 'function binarySearch(values, target)',
    'function binarySearch(values, target) {\n  let low = 0, high = values.length - 1;\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (values[mid] === target) return mid;\n    if (values[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}', ['Keep the sorted-input assumption explicit.', 'Use low + floor((high - low) / 2) to avoid unnecessary overflow risk.', 'Check empty input and targets before, between and after values.']),
  followUp('practical-p17', 'Validate matching brackets', 'Stack', 'Return true when every opening bracket in a string is closed in the correct order. Support (), [] and {}.', 'function validBrackets(text)',
    "function validBrackets(text) {\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  const stack = [];\n  for (const char of text) {\n    if (char === '(' || char === '[' || char === '{') stack.push(char);\n    else if (char in pairs && stack.pop() !== pairs[char]) return false;\n  }\n  return stack.length === 0;\n}", ['Push opening brackets.', 'For each closing bracket, compare with the most recent opener.', 'The stack must be empty at the end.']),
  followUp('practical-p18', 'Queue using two stacks', 'Queue', 'Implement enqueue(value), dequeue() and peek() for a FIFO queue using two arrays as stacks. Return undefined when empty.', 'function createQueue()',
    'function createQueue() {\n  const incoming = [], outgoing = [];\n  const move = () => {\n    if (!outgoing.length) while (incoming.length) outgoing.push(incoming.pop());\n  };\n  return {\n    enqueue(value) { incoming.push(value); },\n    dequeue() { move(); return outgoing.pop(); },\n    peek() { move(); return outgoing[outgoing.length - 1]; },\n    isEmpty() { return !incoming.length && !outgoing.length; }\n  };\n}', ['Push new values onto incoming.', 'Move items to outgoing only when outgoing is empty.', 'That amortizes repeated operations to O(1) average time.']),
  followUp('practical-p19', 'Implement throttle', 'JavaScript utility', 'Return a wrapper that invokes fn at most once per wait interval. Preserve this and arguments; this simple version drops calls during the interval.', 'function throttle(fn, wait)',
    'function throttle(fn, wait) {\n  let ready = true;\n  return function(...args) {\n    if (!ready) return;\n    ready = false;\n    fn.apply(this, args);\n    setTimeout(() => { ready = true; }, wait);\n  };\n}', ['Decide whether the prompt expects leading, trailing or both behavior.', 'Keep the timer/lock in the closure.', 'Test calls before and after the wait period.']),
  followUp('practical-p20', 'Implement once', 'JavaScript utility', 'Return a function that calls fn only on its first invocation and returns the same result on later calls. Preserve this and arguments.', 'function once(fn)',
    'function once(fn) {\n  let called = false;\n  let result;\n  return function(...args) {\n    if (!called) {\n      called = true;\n      result = fn.apply(this, args);\n    }\n    return result;\n  };\n}', ['Store whether the function has run and its result.', 'Set called only once the first invocation begins.', 'Check that the original function receives the wrapper this and arguments.']),
  followUp('practical-p21', 'Memoize a one-argument function', 'JavaScript utility', 'Return a memoized wrapper for a deterministic function that accepts one primitive argument. Use a Map so falsey keys work.', 'function memoize(fn)',
    'function memoize(fn) {\n  const cache = new Map();\n  return function(key) {\n    if (cache.has(key)) return cache.get(key);\n    const value = fn.call(this, key);\n    cache.set(key, value);\n    return value;\n  };\n}', ['Use Map.has instead of testing a cached value for truthiness.', 'State the key assumption: one primitive argument.', 'Discuss invalidation and memory growth as follow-ups.']),
  followUp('practical-p22', 'Promise.all (basic)', 'Async JavaScript', 'Implement promiseAll(values) for an iterable. Resolve in input order when all values fulfill, and reject on the first rejection.', 'function promiseAll(values)',
    'function promiseAll(values) {\n  return new Promise((resolve, reject) => {\n    const items = Array.from(values);\n    if (!items.length) return resolve([]);\n    const results = new Array(items.length);\n    let complete = 0;\n    items.forEach((value, index) => {\n      Promise.resolve(value).then(result => {\n        results[index] = result;\n        if (++complete === items.length) resolve(results);\n      }, reject);\n    });\n  });\n}', ['Convert the iterable once and handle the empty case.', 'Wrap plain values with Promise.resolve.', 'Store by index so completion order cannot change output order.']),
  followUp('practical-p23', 'Recursively flatten nested arrays', 'Recursion', 'Implement flatten(values, depth = Infinity). Return a new array and flatten nested arrays only up to depth.', 'function flatten(values, depth = Infinity)',
    'function flatten(values, depth = Infinity) {\n  const result = [];\n  for (const value of values) {\n    if (Array.isArray(value) && depth > 0) result.push(...flatten(value, depth - 1));\n    else result.push(value);\n  }\n  return result;\n}', ['The base case is a non-array value or depth zero.', 'Build a new result instead of mutating the input.', 'Test empty arrays and mixed nesting depths.']),
  followUp('practical-p24', 'Implement a small map polyfill', 'JavaScript polyfill', 'Add a non-overwriting myMap method that matches core Array.map behavior for callback arguments, thisArg and sparse holes.', 'function myMap(callback, thisArg)',
    'function myMap(callback, thisArg) {\n  if (this == null) throw new TypeError();\n  if (typeof callback !== "function") throw new TypeError();\n  const source = Object(this);\n  const result = new Array(source.length >>> 0);\n  for (let i = 0; i < result.length; i++) {\n    if (i in source) result[i] = callback.call(thisArg, source[i], i, source);\n  }\n  return result;\n}', ['Do not overwrite the built-in Array.prototype.map.', 'Skip missing indexes so sparse array holes stay holes.', 'Pass value, index and source array to the callback.']),
  followUp('practical-p25', 'Tree level-order traversal', 'Trees and BFS', 'Given a binary tree node with val, left and right fields, return its values level by level. Return [] for an empty tree.', 'function levelOrder(root)',
    'function levelOrder(root) {\n  if (!root) return [];\n  const result = [], queue = [root];\n  for (let head = 0; head < queue.length;) {\n    const size = queue.length - head;\n    const level = [];\n    for (let i = 0; i < size; i++) {\n      const node = queue[head++];\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}', ['Use a queue and visit each node once.', 'Capture the level size before adding its children.', 'State O(n) time and O(width) queue space.']),
  followUp('practical-p26', 'Curry a fixed-arity function', 'JavaScript utility', 'Implement curry(fn) for ordinary fixed-arity functions. It should accept arguments across calls until fn.length arguments are collected.', 'function curry(fn)',
    'function curry(fn) {\n  function collect(args) {\n    return function(...next) {\n      const all = args.concat(next);\n      return all.length >= fn.length ? fn(...all) : collect(all);\n    };\n  }\n  return collect([]);\n}', ['Use fn.length as the expected argument count for this exercise.', 'Return another function while arguments are still missing.', 'Call the original function once enough arguments arrive.']),
  followUp('practical-p27', 'Compose unary functions', 'JavaScript utility', 'Implement compose(...fns) so compose(f, g)(value) returns f(g(value)). Support an empty function list as identity.', 'function compose(...fns)',
    'function compose(...fns) {\n  return value => fns.reduceRight((result, fn) => fn(result), value);\n}', ['Composition applies right to left.', 'reduceRight naturally expresses the order.', 'An empty list should return the original value.']),
  followUp('practical-p28', 'Implement a small filter polyfill', 'JavaScript polyfill', 'Implement myFilter(callback, thisArg) without overriding the built-in. Pass value/index/source and skip missing indexes in sparse arrays.', 'function myFilter(callback, thisArg)',
    'function myFilter(callback, thisArg) {\n  if (this == null) throw new TypeError();\n  if (typeof callback !== "function") throw new TypeError();\n  const source = Object(this), result = [];\n  const length = source.length >>> 0;\n  for (let i = 0; i < length; i++) {\n    if (i in source && callback.call(thisArg, source[i], i, source)) result.push(source[i]);\n  }\n  return result;\n}', ['Create a new result array.', 'Skip sparse holes with the in operator.', 'Keep callback arguments and thisArg consistent.']),
  followUp('practical-p29', 'Implement a small reduce polyfill', 'JavaScript polyfill', 'Implement myReduce(callback, initialValue) for array-like inputs. Match the empty-array behavior when no initial accumulator is supplied.', 'function myReduce(callback, initialValue)',
    'function myReduce(callback, initialValue) {\n  if (this == null) throw new TypeError();\n  if (typeof callback !== "function") throw new TypeError();\n  const source = Object(this), length = source.length >>> 0;\n  let i = 0, accumulator;\n  if (arguments.length > 1) accumulator = initialValue;\n  else {\n    while (i < length && !(i in source)) i++;\n    if (i >= length) throw new TypeError("Reduce of empty array with no initial value");\n    accumulator = source[i++];\n  }\n  for (; i < length; i++) if (i in source) accumulator = callback(accumulator, source[i], i, source);\n  return accumulator;\n}', ['Distinguish whether an initial value was passed from its value being undefined.', 'Skip missing indexes in a sparse array.', 'Throw for an empty array with no initial accumulator.'])
];

export const practicalProblems = [
  {
    id: 'practical-p01', day: 1, title: 'Private counter with a closure', cat: 'JavaScript', difficulty: 'Easy', priority: 'P1',
    desc: 'Implement makeCounter(initial = 0). Return increment, decrement, reset and value methods. Keep the count private and create independent state per counter.',
    objective: 'Practise closures and encapsulated state.',
    starter: lines('function makeCounter(initial = 0) {', '  // Return increment(), decrement(), reset() and value().', '}', '', 'const counter = makeCounter(3);', 'console.log(counter.increment());'),
    solution: lines('function makeCounter(initial = 0) {', '  let count = initial;', '  return {', '    increment: () => ++count,', '    decrement: () => --count,', '    reset: () => (count = initial),', '    value: () => count', '  };', '}'),
    tests: lines("test('keeps private independent state', () => {", '  const a = makeCounter(2), b = makeCounter(10);', '  eq(a.increment(), 3);', '  eq(a.reset(), 2);', '  eq(b.value(), 10);', '  eq(a.count, undefined);', '});'),
    hints: ['Keep let count inside makeCounter.', 'Return methods that close over the same count binding.', 'reset should restore initial and return the new count.']
  },
  {
    id: 'practical-p02', day: 2, title: 'Group records by a key', cat: 'JavaScript', difficulty: 'Easy', priority: 'P1',
    desc: 'Implement groupBy(items, keyFn) and return an object whose values are arrays of the original items. Do not mutate items.',
    objective: 'Practise reduce and immutable data transformation.',
    starter: lines('function groupBy(items, keyFn) {', '  // Return an object grouped by keyFn(item).', '}', '', "const people = [{ name: 'Ari', role: 'dev' }, { name: 'Bo', role: 'design' }];", 'console.log(groupBy(people, person => person.role));'),
    solution: lines('function groupBy(items, keyFn) {', '  return items.reduce((groups, item) => {', '    const key = keyFn(item);', '    if (!groups[key]) groups[key] = [];', '    groups[key].push(item);', '    return groups;', '  }, {});', '}'),
    tests: lines("test('groups records and handles empty input', () => {", "  eq(groupBy([1, 2, 3], n => n % 2), { 0: [2], 1: [1, 3] });", '  eq(groupBy([], x => x), {});', '});'),
    hints: ['Start reduce with an empty object.', 'Create an array the first time a key appears.', 'Push the item into that group and return the accumulator.']
  },
  {
    id: 'practical-p03', day: 3, title: 'Two Sum with a Map', cat: 'Hash map', difficulty: 'Easy', priority: 'P1',
    desc: 'Return indices [i, j] for two distinct values that add to target, or [] if no pair exists. Return the first pair encountered during a left-to-right scan.',
    objective: 'Use complement lookup to reduce a nested scan to O(n).',
    starter: lines('function twoSum(nums, target) {', '  // Use a Map of seen values to indices.', '}', '', 'console.log(twoSum([2, 7, 11, 15], 9));'),
    solution: lines('function twoSum(nums, target) {', '  const seen = new Map();', '  for (let i = 0; i < nums.length; i++) {', '    const needed = target - nums[i];', '    if (seen.has(needed)) return [seen.get(needed), i];', '    seen.set(nums[i], i);', '  }', '  return [];', '}'),
    tests: lines("test('finds pair and handles duplicates', () => {", '  eq(twoSum([2, 7, 11, 15], 9), [0, 1]);', '  eq(twoSum([3, 3], 6), [0, 1]);', '  eq(twoSum([1, 2], 9), []);', '});'),
    hints: ['For each number, compute target - number.', 'Check whether that complement was seen earlier.', 'Store the current number only after checking.']
  },
  {
    id: 'practical-p04', day: 4, title: 'Longest substring without repeats', cat: 'Sliding window', difficulty: 'Medium', priority: 'P1',
    desc: 'Return the length of the longest substring without repeating characters. Aim for a single pass.',
    objective: 'Practise a sliding window and last-seen index map.',
    starter: lines('function lengthOfLongestSubstring(s) {', '  // Track the active window and each character\'s last index.', '}', '', "console.log(lengthOfLongestSubstring('abcabcbb')); // 3"),
    solution: lines('function lengthOfLongestSubstring(s) {', '  const lastSeen = new Map();', '  let left = 0, best = 0;', '  for (let right = 0; right < s.length; right++) {', '    const ch = s[right];', '    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) left = lastSeen.get(ch) + 1;', '    lastSeen.set(ch, right);', '    best = Math.max(best, right - left + 1);', '  }', '  return best;', '}'),
    tests: lines("test('moves the window and handles empty input', () => {", "  eq(lengthOfLongestSubstring('abcabcbb'), 3);", "  eq(lengthOfLongestSubstring('bbbbb'), 1);", "  eq(lengthOfLongestSubstring(''), 0);", '});'),
    hints: ['Keep left and right indices for the current window.', 'Move left only when the repeated character is still inside the window.', 'Update the best length after adding the current character.']
  },
  {
    id: 'practical-p05', day: 5, title: 'Run independent tasks in parallel', cat: 'Async JavaScript', difficulty: 'Easy', priority: 'P1',
    desc: 'Implement runInParallel(tasks) so each async task starts and the function resolves to the results in the original order. Let a rejection propagate.',
    objective: 'Connect Promise.all behavior to an everyday async helper.',
    starter: lines('function runInParallel(tasks) {', '  // tasks is an array of functions that return promises.', '}', '', "runInParallel([() => Promise.resolve('a'), () => Promise.resolve('b')]).then(console.log);"),
    solution: lines('function runInParallel(tasks) {', '  return Promise.all(tasks.map(task => task()));', '}'),
    tests: lines("test('starts all tasks and preserves result order', async () => {", "  const result = await runInParallel([() => Promise.resolve('first'), () => Promise.resolve('second')]);", "  eq(result, ['first', 'second']);", '});'),
    hints: ['Map each function to its returned promise.', 'Promise.all preserves the order of the input promises.', 'You do not need to await each task one by one.']
  },
  {
    id: 'practical-p06', day: 6, title: 'Implement debounce', cat: 'JavaScript utility', difficulty: 'Medium', priority: 'P1',
    desc: 'Return a function that calls fn only after ms milliseconds have passed since its most recent call. Preserve arguments and this.',
    objective: 'Practise timer state in a closure and a common search utility.',
    starter: lines('function debounce(fn, ms) {', '  // Return a function that resets its pending timer.', '}', '', "const saveLater = debounce(value => console.log(value), 250);"),
    solution: lines('function debounce(fn, ms) {', '  let timer;', '  return function(...args) {', '    clearTimeout(timer);', '    const context = this;', '    timer = setTimeout(() => fn.apply(context, args), ms);', '  };', '}'),
    tests: lines("test('runs once with the latest arguments', async () => {", '  const values = [];', '  const fn = debounce(value => values.push(value), 20);', "  fn('old'); fn('latest');", '  await delay(50);', "  eq(values, ['latest']);", '});'),
    hints: ['Store the timer ID in the outer function.', 'Clear the existing timer on each call.', 'Capture this and args for the callback.']
  },
  {
    id: 'practical-p07', day: 7, title: 'First non-repeating character', cat: 'Hash map', difficulty: 'Easy', priority: 'P1',
    desc: 'Return the first character that occurs once in a string, or null when every character repeats. Treat casing as significant.',
    objective: 'Use a frequency pass and a second ordered pass in a timed exercise.',
    starter: lines('function firstUniqueChar(s) {', '  // Return the first character with a count of one, or null.', '}', '', "console.log(firstUniqueChar('swiss')); // w"),
    solution: lines('function firstUniqueChar(s) {', '  const counts = new Map();', '  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);', '  for (const ch of s) if (counts.get(ch) === 1) return ch;', '  return null;', '}'),
    tests: lines("test('returns first unique character or null', () => {", "  eq(firstUniqueChar('swiss'), 'w');", "  eq(firstUniqueChar('aabb'), null);", "  eq(firstUniqueChar(''), null);", '});'),
    hints: ['Count every character in a Map.', 'Scan the string again to preserve the original order.', 'Return null if the second pass finds no count of one.']
  },
  {
    id: 'practical-p08', day: 8, title: 'Counter with step and reset', cat: 'React UI', difficulty: 'Easy', priority: 'P1',
    desc: 'Build a counter with a count display, step input, increment/decrement buttons and reset. Use functional state updates.',
    objective: 'Practise state updates, controlled input and a small React render loop.',
    starter: lines('function App() {', '  const [count, setCount] = useState(0);', '  const [step, setStep] = useState(1);', '  // Add a labelled step input and +, -, Reset buttons.', '  return <main><h1>{count}</h1></main>;', '}'),
    hints: ['Use setCount(current => current + step).', 'Convert the input value with Number(event.target.value).', 'Reset should restore both count and step.']
  },
  {
    id: 'practical-p09', day: 9, title: 'Stopwatch with cleanup', cat: 'React UI', difficulty: 'Easy', priority: 'P1',
    desc: 'Build a stopwatch with start, pause and reset controls. Ensure the interval is cleared when stopped and when the component unmounts.',
    objective: 'Practise effect dependencies and timer cleanup.',
    starter: lines('function App() {', '  const [seconds, setSeconds] = useState(0);', '  const [running, setRunning] = useState(false);', '  // Start an interval in an effect while running; always clean it up.', '  return <main><h1>{seconds}s</h1><button onClick={() => setRunning(true)}>Start</button></main>;', '}'),
    hints: ['Use an effect that depends on running.', 'Return clearInterval from the effect.', 'Use a functional state update inside the interval.']
  },
  {
    id: 'practical-p10', day: 10, title: 'Searchable table with empty state', cat: 'React UI', difficulty: 'Easy', priority: 'P1',
    desc: 'Build a searchable table from a small local dataset. Include a labelled search input, a useful no-results message and stable row keys.',
    objective: 'Practise controlled forms and derived visible rows.',
    starter: lines('const rows = [', "  { id: 1, name: 'Ada', role: 'Engineer' },", "  { id: 2, name: 'Lin', role: 'Designer' },", '];', '', 'function App() {', "  const [query, setQuery] = useState('');", '  // Derive matching rows and render a labelled search input and table.', '  return <main />;', '}'),
    hints: ['Normalize query and row text with toLowerCase().', 'Derive visible rows during render.', 'Use row.id for the key and show an empty state when none match.']
  },
  {
    id: 'practical-p11', day: 11, title: 'Product list with derived totals', cat: 'React components', difficulty: 'Medium', priority: 'P1',
    desc: 'Build a small product list with a category filter and visible product count. Keep filtered products and the count derived from the source data and selected category.',
    objective: 'Practise state ownership and avoid duplicated derived state.',
    starter: lines('const products = [', "  { id: 1, name: 'Keyboard', category: 'Desk' },", "  { id: 2, name: 'Mug', category: 'Home' },", '];', '', 'function App() {', "  const [category, setCategory] = useState('All');", '  // Derive visible products and show the result count.', '  return <main />;', '}'),
    hints: ['Store only the selected category.', 'Filter the original products while rendering.', 'A memo is not needed for this tiny list.']
  },
  {
    id: 'practical-p12', day: 12, title: 'Autocomplete interaction', cat: 'Machine coding', difficulty: 'Medium', priority: 'P1',
    desc: 'Build an autocomplete with local mock data, debounced matching, arrow/enter or click selection, and clear loading, empty and error states.',
    objective: 'Practise a complete frontend machine-coding feature.',
    starter: lines('const options = [\'React\', \'Redux\', \'JavaScript\', \'TypeScript\'];', '', 'function App() {', "  const [query, setQuery] = useState('');", '  // Add suggestions, keyboard selection and a no-results state.', '  return <main><label htmlFor="search">Search</label><input id="search" value={query} onChange={e => setQuery(e.target.value)} /></main>;', '}'),
    hints: ['Build the basic filter before adding a debounce.', 'Track the active suggestion index for arrow keys.', 'Keep result states visible and label the input.']
  },
  {
    id: 'practical-p13', day: 13, title: 'Accessible dialog or form', cat: 'React UI', difficulty: 'Medium', priority: 'P1',
    desc: 'Build a small accessible dialog or form using semantic elements, labels, keyboard behavior and a clear submit/cancel flow.',
    objective: 'Practise the browser fundamentals expected in frontend UI coding.',
    starter: lines('function App() {', '  const [open, setOpen] = useState(false);', '  return <main>', '    <button onClick={() => setOpen(true)}>Open dialog</button>', '    {/* Add a labelled form/dialog and keyboard-friendly close behavior. */}', '  </main>;', '}'),
    hints: ['Prefer native button and form elements.', 'Give every input an associated label.', 'Close on Escape and return focus to the opener for a full dialog implementation.']
  },
  {
    id: 'practical-p14', day: 14, title: 'Filterable todo list', cat: 'React components', difficulty: 'Medium', priority: 'P1',
    desc: 'In a timed session, build a todo list with add, toggle, delete and All/Active/Completed filters. Use stable item IDs and derive the visible list.',
    objective: 'Practise a common machine-coding task while narrating decisions.',
    starter: lines('function App() {', '  const [items, setItems] = useState([]);', "  const [filter, setFilter] = useState('All');", '  // Add, toggle, delete and filter todos.', '  return <main />;', '}'),
    hints: ['Keep each todo as an object with a stable id and done flag.', 'Use immutable map/filter updates.', 'Derive visible items from items and filter.']
  },
  {
    id: 'practical-p15', day: 15, title: 'Deduplicate values in order', cat: 'JavaScript', difficulty: 'Easy', priority: 'P1',
    desc: 'Implement uniqueInOrder(values) returning each distinct primitive value once in its first-seen order. Do not mutate the input.',
    objective: 'Finish with a short reimplementation that checks Map/Set fluency.',
    starter: lines('function uniqueInOrder(values) {', '  // Return a new array containing first occurrences only.', '}', '', 'console.log(uniqueInOrder([2, 1, 2, 3, 1])); // [2, 1, 3]'),
    solution: lines('function uniqueInOrder(values) {', '  return [...new Set(values)];', '}'),
    tests: lines("test('keeps first-seen order and leaves input alone', () => {", '  const input = [2, 1, 2, 3, 1];', '  eq(uniqueInOrder(input), [2, 1, 3]);', '  eq(input, [2, 1, 2, 3, 1]);', '});'),
    hints: ['Set preserves insertion order.', 'Create a new array from the Set.', 'Check that the original array stays unchanged.']
  },
  ...followUpProblems
];
