// Lessons and challenges. Add new ones here.
export const TR=[{n:'JavaScript',items:[
{id:'closures',tr:'JavaScript',sub:'Scope',t:'Closures',v:'cl',lang:'js',
body:`<p>A <b>closure</b> is a function that remembers the scope it was created in, even after that scope has finished. Each call to the outer function creates a <i>new</i> private scope.</p><p>Click below: the two counters share code but not state.</p>`,
task:`Write <code>makeCounter2(start)</code> returning <code>{inc, dec, value}</code> that share one private count.`,
code:`// A closure keeps access to the scope where it was created.
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const a = makeCounter(), b = makeCounter();
console.log(a(), a(), b()); // 1 2 1

// TASK: shared private state
function makeCounter2(start = 0) {
  
}
`,tests:`test('inc and dec change the value',()=>{const c=makeCounter2(5);c.inc();c.inc();c.dec();eq(c.value(),6)});
test('each counter is independent',()=>{const x=makeCounter2(),y=makeCounter2();x.inc();eq(y.value(),0)});
test('count is private',()=>{eq(makeCounter2().count,undefined)});`,
h:['Declare a variable inside makeCounter2. Which functions can see it?','Return an object whose methods (inc, dec, value) all read and write that same variable.','let count = start; return { inc: () => ++count, ... } — value should return count.'],
sol:`function makeCounter2(start = 0) {\n  let count = start;\n  return { inc: () => ++count, dec: () => --count, value: () => count };\n}`},
{id:'loop',tr:'JavaScript',sub:'Async',t:'The event loop',v:'el',lang:'js',
body:`<p>JavaScript runs one thing at a time. After the synchronous script ends, the engine drains <b>microtasks</b> (promise callbacks) before taking the next <b>task</b> (timers). Step through this program:</p><pre class="mono" style="font-size:12.5px">log('A'); setTimeout(()=>log('B'),0);\nPromise.resolve().then(()=>log('C')); log('D');</pre>`,
task:`Make the output order <code>start, end, micro, timeout</code> by scheduling a microtask that logs <code>micro</code>.`,
code:`console.log('start');
setTimeout(() => console.log('timeout'), 0);
// TASK: schedule a microtask that logs 'micro'

console.log('end');
`,tests:`test('order is start, end, micro, timeout',async()=>{await delay(60);eq(L,['start','end','micro','timeout'])});`,
h:['Which API puts a callback in the microtask queue, ahead of timers?','Promise.resolve().then(...) or queueMicrotask(...)','queueMicrotask(() => console.log("micro"))'],
sol:`queueMicrotask(() => console.log('micro'));`},
{id:'arrays',tr:'JavaScript',sub:'Data',t:'Array pipelines',v:'pp',lang:'js',
body:`<p><code>map</code>, <code>filter</code> and <code>reduce</code> never mutate the original array; each returns something new, so they chain into pipelines. Build one below.</p>`,
task:`Implement <code>groupBy(items, keyFn)</code> returning <code>{key: [items]}</code>, using <code>reduce</code>.`,
code:`const people = [{n:'Ada',t:'eng'},{n:'Lin',t:'ops'},{n:'Bo',t:'eng'}];

// TASK: groupBy(items, keyFn) -> { key: [items] }
function groupBy(items, keyFn) {
  
}
console.log(groupBy(people, p => p.t));
`,tests:`test('groups by key',()=>eq(groupBy([1,2,3,4],x=>x%2?'odd':'even'),{odd:[1,3],even:[2,4]}));
test('empty input gives {}',()=>eq(groupBy([],x=>x),{}));
test('does not mutate input',()=>{const a=[1,2];groupBy(a,x=>x);eq(a,[1,2])});`,
h:['reduce needs a starting accumulator. What shape should it have?','For each item compute key = keyFn(item); create acc[key] if missing.','items.reduce((acc, x) => { (acc[keyFn(x)] ||= []).push(x); return acc; }, {})'],
sol:`function groupBy(items, keyFn) {\n  return items.reduce((acc, x) => {\n    (acc[keyFn(x)] ||= []).push(x);\n    return acc;\n  }, {});\n}`},
{id:'retry',tr:'JavaScript',sub:'Async',t:'Promises & retry',lang:'js',
body:`<p>A promise is a value that arrives later. <code>async/await</code> lets you write the waiting as straight-line code, and <code>try/catch</code> handles rejections. Real apps retry flaky calls, so build that.</p>`,
task:`Implement <code>retry(fn, times)</code>: call async <code>fn</code> up to <code>times</code> tries; resolve with its value or reject with the last error.`,
code:`const sleep = ms => new Promise(r => setTimeout(r, ms));

// TASK: retry an async function
async function retry(fn, times) {
  
}
let n = 0;
retry(async () => { if (++n < 3) throw new Error('flaky'); return 'ok'; }, 3).then(console.log);
`,tests:`test('succeeds after failures',async()=>{let n=0;eq(await retry(async()=>{if(++n<3)throw new Error('x');return 'ok'},3),'ok');eq(n,3)});
test('rejects with the last error',async()=>{let n=0,m='';try{await retry(async()=>{throw new Error('e'+ ++n)},3)}catch(e){m=e.message}eq(m,'e3')});`,
h:['You need a loop that runs at most `times` iterations.','Inside the loop: try { return await fn() } catch (e) { remember e }.','After the loop, throw the remembered error.'],
sol:`async function retry(fn, times) {\n  let last;\n  for (let i = 0; i < times; i++) {\n    try { return await fn(); } catch (e) { last = e; }\n  }\n  throw last;\n}`}]},
{n:'Web',items:[{id:'dom',tr:'Web',sub:'HTML · CSS · JS',t:'Live page playground',lang:'html',
body:`<p>Here HTML, CSS and JavaScript live in one file and render in the Preview tab. <code>console.log</code> inside the page still shows up in Console.</p>`,
task:`Change the colour, then make the button count <i>down</i> from 10 and disable itself at 0. Mark complete when it works.`,
code:`<style>
  body{font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0}
  button{padding:12px 20px;border:0;border-radius:10px;background:#d9480f;color:#fff;font-size:16px}
</style>
<button id="b">Clicked 0 times</button>
<script>
  let n = 0;
  b.onclick = () => { b.textContent = 'Clicked ' + ++n + ' times'; console.log('click', n); };
<\/script>
`,h:['Start with let n = 10 and decrement inside onclick.','Use b.disabled = true when n reaches 0.','if (--n === 0) b.disabled = true; then update b.textContent.'],
sol:`let n = 10; b.textContent = n;\nb.onclick = () => { b.textContent = --n; if (n === 0) b.disabled = true; };`}]}];
const C=(id,sub,t,body,code,tests,h,sol)=>({id,tr:'Challenges',sub,t,body:'<p>'+body+'</p>',task:'Make every test pass, then explain the time and space complexity out loud.',lang:'js',code,tests,h,sol});
export const CHALL=[
C('two-sum','Easy','Two Sum','Return the indices <code>[i, j]</code> (i &lt; j) of the two numbers that add up to <code>target</code>, or <code>[]</code> if none.',`// TASK
function twoSum(nums, target) {
  
}
`,`test('basic',()=>eq(twoSum([2,7,11,15],9),[0,1]));
test('pair not at the start',()=>eq(twoSum([3,2,4],6),[1,2]));
test('duplicates',()=>eq(twoSum([3,3],6),[0,1]));
test('no answer gives []',()=>eq(twoSum([1,2],10),[]));`,['Brute force is O(n²). What do you need to remember to avoid rescanning?','Store value → index in a Map; look up target − current.'],`function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}`),
C('balanced','Easy','Balanced brackets','Return true if every <code>()[]{}</code> bracket in the string is closed in the correct order.',`// TASK
function isBalanced(s) {
  
}
`,`test('simple pairs',()=>eq(isBalanced('()[]{}'),true));
test('nested',()=>eq(isBalanced('{[()]}'),true));
test('wrong closer',()=>eq(isBalanced('(]'),false));
test('interleaved',()=>eq(isBalanced('([)]'),false));
test('unclosed',()=>eq(isBalanced('(('),false));
test('empty is balanced',()=>eq(isBalanced(''),true));`,['Which data structure gives you "most recent opener first"?','Push openers; on a closer, pop and compare. Stack must be empty at the end.'],`function isBalanced(s) {\n  const pair = { ')': '(', ']': '[', '}': '{' }, st = [];\n  for (const c of s) {\n    if ('([{'.includes(c)) st.push(c);\n    else if (st.pop() !== pair[c]) return false;\n  }\n  return st.length === 0;\n}`),
C('anagram','Easy','Valid anagram','Return true if the two strings contain the same letters, ignoring case.',`// TASK
function isAnagram(a, b) {
  
}
`,`test('anagram',()=>eq(isAnagram('listen','silent'),true));
test('ignores case',()=>eq(isAnagram('Listen','Silent'),true));
test('different letters',()=>eq(isAnagram('rat','car'),false));
test('different length',()=>eq(isAnagram('a','ab'),false));`,['Two strings are anagrams if their sorted letters match.','Normalise case, split into characters, sort, join, compare.'],`function isAnagram(a, b) {\n  const f = s => [...s.toLowerCase()].sort().join('');\n  return f(a) === f(b);\n}`),
C('substring','Medium','Longest unique substring','Return the length of the longest substring without repeating characters.',`// TASK
function lengthOfLongestSubstring(s) {
  
}
`,`test('abcabcbb',()=>eq(lengthOfLongestSubstring('abcabcbb'),3));
test('bbbbb',()=>eq(lengthOfLongestSubstring('bbbbb'),1));
test('pwwkew',()=>eq(lengthOfLongestSubstring('pwwkew'),3));
test('dvdf',()=>eq(lengthOfLongestSubstring('dvdf'),3));
test('empty',()=>eq(lengthOfLongestSubstring(''),0));`,['Use a sliding window with a left and right pointer.','Keep a Map of last-seen index; when you see a repeat, move left past it (never backwards).'],`function lengthOfLongestSubstring(s) {\n  const last = new Map();\n  let left = 0, best = 0;\n  for (let r = 0; r < s.length; r++) {\n    if (last.has(s[r]) && last.get(s[r]) >= left) left = last.get(s[r]) + 1;\n    last.set(s[r], r);\n    best = Math.max(best, r - left + 1);\n  }\n  return best;\n}`),
C('debounce','Medium','Debounce','Return a wrapper that waits <code>ms</code> after the <i>last</i> call, then calls <code>fn</code> once with the latest arguments.',`// TASK
function debounce(fn, ms) {
  
}
`,`test('waits then calls once with last args',async()=>{const c=[];const d=debounce(x=>c.push(x),30);d(1);d(2);d(3);eq(c,[]);await delay(90);eq(c,[3])});
test('later bursts run again',async()=>{const c=[];const d=debounce(x=>c.push(x),20);d('a');await delay(60);d('b');await delay(60);eq(c,['a','b'])});`,['The wrapper needs to remember the pending timer between calls.','clearTimeout(timer) then timer = setTimeout(() => fn(...args), ms).'],`function debounce(fn, ms) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}`),
C('flatten','Medium','Flatten array','Flatten nested arrays up to <code>depth</code> levels (default: all). Do not mutate the input.',`// TASK
function flatten(arr, depth = Infinity) {
  
}
`,`test('fully flattens',()=>eq(flatten([1,[2,[3,[4]]]]),[1,2,3,4]));
test('respects depth',()=>eq(flatten([1,[2,[3,[4]]]],1),[1,2,[3,[4]]]));
test('empty',()=>eq(flatten([]),[]));`,['Recursion fits nested data. What is your base case?','reduce: if the item is an array and depth > 0, concat flatten(item, depth - 1); else keep the item.'],`function flatten(arr, depth = Infinity) {\n  return arr.reduce((out, x) =>\n    Array.isArray(x) && depth > 0 ? out.concat(flatten(x, depth - 1)) : out.concat([x]), []);\n}`),
C('memoize','Medium','Memoize','Cache results of <code>fn</code> by its arguments so repeated calls do not recompute (including falsy results).',`// TASK
function memoize(fn) {
  
}
`,`test('caches by arguments',()=>{let n=0;const f=memoize((a,b)=>(n++,a+b));eq(f(1,2),3);eq(f(1,2),3);eq(n,1)});
test('different args compute again',()=>{let n=0;const f=memoize(x=>(n++,x*2));f(1);f(2);eq(n,2)});
test('caches falsy results',()=>{let n=0;const f=memoize(()=>(n++,0));f();f();eq(n,1)});`,['You need a cache keyed by the arguments.','Use JSON.stringify(args) as the key and check cache.has(key), not truthiness.'],`function memoize(fn) {\n  const cache = new Map();\n  return (...args) => {\n    const k = JSON.stringify(args);\n    if (!cache.has(k)) cache.set(k, fn(...args));\n    return cache.get(k);\n  };\n}`),
C('lru','Hard','LRU cache','Implement <code>get(key)</code> (returns -1 if missing) and <code>put(key, value)</code> in O(1), evicting the least recently used entry when over capacity.',`// TASK
class LRUCache {
  constructor(capacity) {
    
  }
  get(key) {
    
  }
  put(key, value) {
    
  }
}
`,`test('evicts least recently used',()=>{const c=new LRUCache(2);c.put(1,1);c.put(2,2);eq(c.get(1),1);c.put(3,3);eq(c.get(2),-1);c.put(4,4);eq(c.get(1),-1);eq(c.get(3),3);eq(c.get(4),4)});
test('put refreshes an existing key',()=>{const c=new LRUCache(2);c.put(1,1);c.put(2,2);c.put(1,9);c.put(3,3);eq(c.get(1),9);eq(c.get(2),-1)});`,['A Map remembers insertion order. How can you make "recently used" mean "last in the Map"?','On get/put: delete the key then set it again. If size > capacity, delete map.keys().next().value.'],`class LRUCache {\n  constructor(capacity) { this.cap = capacity; this.m = new Map(); }\n  get(key) {\n    if (!this.m.has(key)) return -1;\n    const v = this.m.get(key);\n    this.m.delete(key); this.m.set(key, v);\n    return v;\n  }\n  put(key, value) {\n    this.m.delete(key); this.m.set(key, value);\n    if (this.m.size > this.cap) this.m.delete(this.m.keys().next().value);\n  }\n}`),
C('promise-all','Hard','Promise.all','Write <code>promiseAll(items)</code>: resolve with results in input order, reject on the first rejection, and accept plain values.',`// TASK
function promiseAll(items) {
  
}
`,`test('keeps input order',async()=>eq(await promiseAll([delay(30).then(()=>'a'),Promise.resolve('b'),'c']),['a','b','c']));
test('rejects on the first failure',async()=>{let m='';try{await promiseAll([delay(30),(p=>(p.catch(()=>{}),p))(Promise.reject(new Error('boom')))])}catch(e){m=e.message}eq(m,'boom')});
test('empty array resolves []',async()=>eq(await promiseAll([]),[]));`,['Return a new Promise and count how many inputs are still pending.','Write each value into out[i] (not push) so order is kept; resolve when the counter hits 0; pass reject straight through.'],`function promiseAll(items) {\n  return new Promise((resolve, reject) => {\n    const out = [];\n    let left = items.length;\n    if (!left) return resolve(out);\n    items.forEach((p, i) => Promise.resolve(p).then(v => {\n      out[i] = v;\n      if (--left === 0) resolve(out);\n    }, reject));\n  });\n}`)];

TR.push({n:'Challenges',items:CHALL});
