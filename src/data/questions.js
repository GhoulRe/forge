// Forjix — Comprehensive React & JavaScript Technical Interview Question Bank
// Designed for speaking out loud in frontend engineering interviews (3-4 YOE)

export const questions = [
  // ==========================================
  // JAVASCRIPT FUNDAMENTALS (P1)
  // ==========================================
  {
    id: 'q-closure',
    cat: 'JavaScript',
    priority: 'P1',
    lvl: 'Core',
    q: 'Explain closures with a practical example and discuss potential memory implications.',
    a: `A closure is formed when an inner function retains access to variables from its outer lexical environment, even after that outer function has returned.

In JavaScript, functions carry a hidden reference to the scope in which they were defined. A practical everyday example is creating private state, like a counter or factory function:
\`function createCounter() { let count = 0; return () => ++count; }\`
Here, \`count\` cannot be directly accessed or modified from the outside; it is completely encapsulated.

Regarding memory implications: because the inner function holds a reference to the outer variable environment, the garbage collector cannot clean up those variables as long as the inner function is reachable. If you attach closures to long-lived objects or global event listeners without removing them, it can cause memory leaks.`,
    code: `function createCounter(initial = 0) {
  let count = initial; // private lexical variable
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
const counter = createCounter(10);
counter.increment(); // 11
// count is inaccessible directly from counter.count (undefined)`,
    evaluating: 'Checks if you understand lexical scope, the difference between value copies and live variable bindings, and real-world garbage collection / memory management.',
    followUps: [
      'Do closures store a snapshot of the value or a live reference?',
      'How do closures relate to the classic setTimeout inside a var loop problem?',
      'How does React useState use closures under the hood?'
    ],
    misconceptions: 'Believing closures copy variables by value rather than keeping a live reference binding, or thinking closures only exist when returning a function.'
  },
  {
    id: 'q-hoisting-tdz',
    cat: 'JavaScript',
    priority: 'P1',
    lvl: 'Core',
    q: 'What is hoisting, how does it differ between var, let, and const, and what is the TDZ?',
    a: `Hoisting is the JavaScript engine's behavior of reserving memory for declarations during the creation phase before executing code.

Function declarations are hoisted completely with their implementation, meaning you can call them before their declaration line.
\`var\` declarations are hoisted and initialized immediately with \`undefined\`. If you access a \`var\` before its declaration, it returns \`undefined\` instead of throwing.

\`let\` and \`const\` are also hoisted into their block scope, but they remain uninitialized. The window of time between when their scope is entered and when the declaration line executes is known as the Temporal Dead Zone (TDZ). Accessing a \`let\` or \`const\` in the TDZ throws a \`ReferenceError\`.`,
    code: `console.log(a); // undefined (var is hoisted and initialized to undefined)
var a = 1;

// console.log(b); // ReferenceError: Cannot access 'b' before initialization (TDZ)
let b = 2;

greet(); // "Hello" (Function declarations are hoisted completely)
function greet() { return "Hello"; }

// sayHi(); // TypeError: sayHi is not a function (var initialized to undefined)
var sayHi = () => "Hi";`,
    evaluating: 'Evaluates your comprehension of the JS execution lifecycle (compilation/creation phase vs execution phase) and modern ES6 scoping rules.',
    followUps: [
      'Are function expressions hoisted the same way as function declarations?',
      'Why did TC39 introduce the Temporal Dead Zone for let and const?',
      'What happens if you use typeof on an undeclared variable vs a let variable in the TDZ?'
    ],
    misconceptions: 'Saying let and const are not hoisted at all. They ARE hoisted to their enclosing block scope, which is precisely why they shadow outer variables and trigger the TDZ.'
  },
  {
    id: 'q-event-loop',
    cat: 'JavaScript',
    priority: 'P1',
    lvl: 'Core',
    q: 'Explain the JavaScript event loop, microtasks, and macrotasks with an execution order example.',
    a: `JavaScript is single-threaded with one call stack. When asynchronous APIs (like setTimeout, fetch, or DOM events) are called, the browser or Node runtime handles them in the background.

When an async task completes, its callback is placed in one of two queues:
1. The Microtask Queue: Promises (then/catch/finally), queueMicrotask, MutationObserver, and async/await continuations.
2. The Macrotask / Task Queue: setTimeout, setInterval, setImmediate, and I/O callbacks.

The Event Loop continuously checks: if the Call Stack is empty, it FIRST drains the entire Microtask Queue to completion. Only once all microtasks are finished does it take ONE task from the Macrotask Queue, execute it, and then check the Microtask Queue again before rendering. This means microtasks always have strict priority over macrotasks.`,
    code: `console.log('1: sync');

setTimeout(() => {
  console.log('2: macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: microtask 1 (promise)');
}).then(() => {
  console.log('4: microtask 2 (promise chained)');
});

queueMicrotask(() => {
  console.log('5: microtask 3 (queueMicrotask)');
});

console.log('6: sync');

// Output order: 1, 6, 3, 5, 4, 2`,
    evaluating: 'Tests your mental model of asynchronous JavaScript execution, UI thread blocking, and debugging complex async sequences.',
    followUps: [
      'What happens to browser rendering if a microtask recursively enqueues more microtasks?',
      'How does async/await translate into the microtask queue?',
      'Where does requestAnimationFrame fit into the event loop cycle?'
    ],
    misconceptions: 'Thinking setTimeout(fn, 0) runs immediately on the next CPU tick. It always waits for the current synchronous script AND all queued microtasks to drain.'
  },
  {
    id: 'q-this-arrow',
    cat: 'JavaScript',
    priority: 'P1',
    lvl: 'Core',
    q: 'How is `this` determined in regular functions versus arrow functions?',
    a: `In regular functions, \`this\` is dynamically determined by how the function is called at runtime:
1. Implicit binding: \`obj.method()\` sets \`this\` to \`obj\`.
2. Explicit binding: \`fn.call(context)\`, \`fn.apply(context)\`, or \`fn.bind(context)\` explicitly sets \`this\`.
3. Constructor binding: \`new Fn()\` creates a new object and binds \`this\` to it.
4. Default binding: A standalone call \`fn()\` sets \`this\` to \`undefined\` in strict mode (or \`window\` in non-strict).

Arrow functions do NOT have their own \`this\` binding. Instead, they resolve \`this\` lexically from their enclosing scope at declaration time, just like any normal variable. Therefore, calling \`.call()\`, \`.apply()\`, or \`.bind()\` on an arrow function has no effect on its \`this\`.`,
    code: `const user = {
  name: 'Alex',
  regular() {
    return this.name;
  },
  arrow: () => {
    return this.name;
  },
  delayed() {
    setTimeout(function() {
      // In regular callback, 'this' defaults to window/undefined
      console.log('Regular:', this?.name);
    }, 50);
    setTimeout(() => {
      // Arrow function lexically captures 'this' from delayed()
      console.log('Arrow:', this.name);
    }, 50);
  }
};

user.regular(); // "Alex"
user.arrow();   // undefined (lexical this is global/module scope)
user.delayed(); // Regular: undefined, Arrow: "Alex"`,
    evaluating: 'Tests whether you understand execution context vs lexical scope and can avoid classic UI event handler bugs.',
    followUps: [
      'What is the difference between call, apply, and bind?',
      'Why shouldn\'t you use arrow functions for object methods or prototype methods?',
      'What happens when you use an arrow function inside a React class component vs functional component?'
    ],
    misconceptions: 'Thinking arrow functions bind this to the object they are written inside. Objects do not create a lexical scope; only functions and blocks do.'
  },
  {
    id: 'q-debounce-throttle',
    cat: 'JavaScript',
    priority: 'P1',
    lvl: 'Core',
    q: 'What is the difference between debounce and throttle, and where is each used in UI?',
    a: `Both debounce and throttle are rate-limiting techniques for high-frequency events, but they solve different problems:

Debounce postpones execution until a specified delay has elapsed since the LAST time the event was triggered. Every new invocation resets the timer.
Use cases: Search input autocomplete, form field auto-save, window resize calculations after the user stops dragging.

Throttle ensures the function is executed at most once every specified time interval, regardless of how many times the user fires the event.
Use cases: Infinite scrolling (checking scroll position), tracking mouse movements in a canvas, drag-and-drop operations, and button spam prevention.`,
    code: `// Debounce: executes only after 'delay' ms of silence
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle: executes at most once every 'limit' ms
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}`,
    evaluating: 'Evaluates your practical understanding of browser performance, timer management, and API rate-limiting.',
    followUps: [
      'How would you implement a debounce with a leading (immediate) call option?',
      'What memory leaks can occur when using debounce inside React components if unhandled?',
      'How does requestAnimationFrame relate to throttling scroll events?'
    ],
    misconceptions: 'Confusing the two terms or using debounce on a continuous scroll handler that requires periodic UI updates.'
  },
  {
    id: 'q-promise-combinators',
    cat: 'JavaScript',
    priority: 'P1',
    lvl: 'Core',
    q: 'Compare Promise.all, Promise.allSettled, Promise.race, and Promise.any.',
    a: `JavaScript provides 4 Promise combinators for managing concurrent asynchronous tasks:

1. \`Promise.all\`: Fulfils when ALL input promises fulfil, returning an array of results. It rejects immediately ("fail-fast") if any single promise rejects. Use when all pieces of data are mandatory to render a page.

2. \`Promise.allSettled\`: Waits for ALL promises to complete regardless of success or failure. Returns an array of descriptor objects: \`{ status: 'fulfilled', value }\` or \`{ status: 'rejected', reason }\`. Use when independent tasks run and partial success is acceptable (e.g. logging metrics, multiple third-party widgets).

3. \`Promise.race\`: Settles as soon as the FIRST promise settles (whether fulfilled or rejected). Common use: setting a network request timeout against a delay promise.

4. \`Promise.any\`: Fulfils as soon as the FIRST promise fulfils. It only rejects if ALL promises reject, returning an \`AggregateError\`. Use when you query multiple redundant endpoints or CDN mirrors for the fastest response.`,
    code: `const p1 = Promise.resolve('Data A');
const p2 = Promise.reject(new Error('Failed B'));

// Promise.all rejects immediately with Error('Failed B')
Promise.all([p1, p2]).catch(err => console.log('all failed:', err.message));

// Promise.allSettled resolves both:
Promise.allSettled([p1, p2]).then(results => {
  // [
  //   { status: 'fulfilled', value: 'Data A' },
  //   { status: 'rejected', reason: Error('Failed B') }
  // ]
  const succeeded = results.filter(r => r.status === 'fulfilled').map(r => r.value);
});`,
    evaluating: 'Assesses error resilience in asynchronous frontend code and understanding of concurrent Promise APIs.',
    followUps: [
      'How do you write a timeout wrapper around fetch using Promise.race vs AbortController?',
      'How would you implement Promise.all from scratch?',
      'If Promise.all rejects, do the remaining promises stop running in the background?'
    ],
    misconceptions: 'Assuming Promise.all cancels other in-flight requests when one rejects. It does not cancel them; you need an AbortController for cancellation.'
  },
  {
    id: 'q-shallow-deep-copy',
    cat: 'JavaScript',
    priority: 'P1',
    lvl: 'Core',
    q: 'What is the difference between shallow and deep copying, and when does shallow copying fail?',
    a: `A shallow copy duplicates only the top-level properties of an object or array. If any property value is a reference (an object, array, or function), only the memory reference is copied. Both the copy and original still share the exact same nested object.

Methods for shallow copy: Object.assign({}, obj), spread operator [...arr] / {...obj}, slice().

A deep copy duplicates all levels recursively, creating entirely independent objects at every level of depth.

Shallow copying fails whenever you mutate nested properties, such as \`user.address.city = 'NYC'\`. In React, if you shallow-copy state with \`{...state}\` but mutate \`state.user.preferences\`, you directly mutate previous state, causing bugs with change detection, undo/redo, and memoized components.

For deep copying in modern browsers, \`structuredClone()\` is the built-in standard. \`JSON.parse(JSON.stringify())\` is a legacy workaround that drops functions, Symbols, undefined, turns Dates into strings, and throws on circular references.`,
    code: `const original = { name: 'Dan', meta: { score: 95 } };

// Shallow copy
const shallow = { ...original };
shallow.meta.score = 100;
console.log(original.meta.score); // 100! Original was mutated!

// Deep copy using modern structuredClone
const deep = structuredClone(original);
deep.meta.score = 80;
console.log(original.meta.score); // 100 (original is protected)`,
    evaluating: 'Tests your understanding of JavaScript memory references, immutability, and debugging state corruption in React.',
    followUps: [
      'What are the limitations of structuredClone?',
      'How do you implement a simple deep clone function handling circular references?',
      'Why is immutability so heavily emphasized in the React ecosystem?'
    ],
    misconceptions: 'Thinking spread syntax `{ ...obj }` creates a deep copy. It is strictly one level deep.'
  },
  {
    id: 'q-event-delegation',
    cat: 'JavaScript',
    priority: 'P2',
    lvl: 'Important',
    q: 'Explain event bubbling, capturing, and how event delegation works.',
    a: `When a DOM event fires, it passes through 3 distinct phases:
1. Capturing Phase: The event travels from the window down through parent nodes to the target element.
2. Target Phase: The event reaches the element that was interacted with.
3. Bubbling Phase: The event bubbles back up from the target element through all parent ancestors to the window.

Event Delegation is a design pattern that leverages event bubbling. Instead of attaching separate event listeners to dozens or hundreds of child elements (like rows in a table or items in a list), you attach a single listener to their common parent container.

Inside the parent listener, you check \`event.target\` (or \`event.target.closest('selector')\`) to identify which child was clicked.
Benefits:
- Drastically reduces memory consumption by using fewer listeners.
- Automatically handles dynamically added or removed child elements without re-attaching listeners.`,
    code: `// Container with event delegation
document.getElementById('todo-list').addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.delete-btn');
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    deleteItem(id);
  }
});`,
    evaluating: 'Checks understanding of browser DOM mechanics, event bubbling, and memory efficiency in dynamic user interfaces.',
    followUps: [
      'What is the difference between event.stopPropagation() and event.stopImmediatePropagation()?',
      'How does React SyntheticEvent system implement event delegation?',
      'Which events do NOT bubble up the DOM tree?'
    ],
    misconceptions: 'Assuming events like focus, blur, mouseenter, and mouseleave bubble by default. (They do not; focusin and mouseover do).'
  },
  {
    id: 'q-map-set',
    cat: 'JavaScript',
    priority: 'P2',
    lvl: 'Important',
    q: 'When is a Map preferred over a plain object, and what are WeakMap / WeakSet?',
    a: `A \`Map\` is preferred over a plain object in several key scenarios:
1. Key types: Map keys can be of any type (functions, objects, primitives), whereas plain object keys can only be strings or Symbols.
2. Order & size: Map guarantees insertion order iteration and provides a direct \`.size\` property. Plain objects require \`Object.keys().length\` (O(n)).
3. Security: Plain objects inherit properties from \`Object.prototype\` (like \`toString\`, \`constructor\`), which can lead to prototype pollution or collisions unless using \`Object.create(null)\`.
4. Frequent insertions & deletions: Map is heavily optimized for fast dynamic additions and removals.

\`WeakMap\` and \`WeakSet\` only accept objects as keys/values, and they hold "weak" references to those objects. If there are no other references to the key object, it is garbage collected, and the entry is automatically removed. They are not iterable and have no \`.size\`.
Primary use cases: Storing private data for classes or caching metadata for DOM elements without preventing garbage collection.`,
    code: `// WeakMap for caching element metadata
const elementMeta = new WeakMap();

function trackElement(domNode, metadata) {
  elementMeta.set(domNode, metadata);
}
// When domNode is removed from DOM and references dropped,
// elementMeta entry is garbage collected automatically without memory leak!`,
    evaluating: 'Tests knowledge of modern ES6 collections, algorithmic complexity, and preventing memory leaks.',
    followUps: [
      'Why is WeakMap not iterable with for..of or .keys()?',
      'How does Set compare to array deduplication with indexOf?',
      'How does Map handle NaN comparison compared to === ?'
    ],
    misconceptions: 'Believing plain objects are always faster than Maps for large datasets with constant additions and deletions.'
  },

  // ==========================================
  // REACT FUNDAMENTALS & RENDERING (P1)
  // ==========================================
  {
    id: 'q-react-rerenders',
    cat: 'React',
    priority: 'P1',
    lvl: 'Core',
    q: 'What causes a React component to re-render, and does a re-render always update the DOM?',
    a: `A React component re-renders for exactly 3 reasons:
1. Its own internal state updates via a setter function (\`useState\` or \`useReducer\`).
2. Its parent component re-renders (which cascades down the tree by default).
3. It consumes a Context whose Provider value has changed.

Crucially: A re-render does NOT always update the real DOM.
React works in two primary phases:
- Render Phase: React calls your component function, calculates the new Virtual DOM (JSX element tree), and compares (diffs) it with the previous render tree. This is pure JavaScript execution and is fast.
- Commit Phase: React applies only the minimal necessary differences to the real DOM. If the diff reveals that nothing changed in the rendered output, React touches zero DOM nodes.

Therefore, "re-rendering" means calling the component function again to compute UI; it does not mean re-painting the browser screen.`,
    code: `// Changing regular variables or ref does NOT trigger render:
let normalVar = 0;
const ref = useRef(0);

function handleClick() {
  normalVar++;      // No render!
  ref.current++;    // No render!
  setCount(c => c + 1); // RENDER scheduled!
}`,
    evaluating: 'Assesses whether the candidate understands the difference between the Render phase and Commit phase, Virtual DOM diffing, and browser paint costs.',
    followUps: [
      'How does React.memo change this behavior for child components?',
      'What happens when a component returns the exact same JSX element reference?',
      'Does changing a ref.current schedule a re-render?'
    ],
    misconceptions: 'Believing that every single re-render destroys and re-creates DOM nodes, or that changing props directly triggers re-renders (it is the parent render that causes child re-renders).'
  },
  {
    id: 'q-react-keys',
    cat: 'React',
    priority: 'P1',
    lvl: 'Core',
    q: 'Why are keys essential in list rendering, and why can array indexes cause bugs?',
    a: `Keys provide a stable identity for React elements between renders. During reconciliation, React diffs siblings in a list. Without unique, stable keys, React compares children by index position.

If you use array index as a key and then delete, insert, or reorder items, the element at index 0 now represents a different data item. React assumes the component at index 0 is the same as before because its key (\`0\`) hasn't changed.
Consequences:
1. Uncontrolled inputs (or components with internal local state) will display state belonging to the wrong item.
2. Unnecessary DOM teardown and recreation, degrading performance.
3. CSS transitions and animations get applied to the wrong DOM nodes.

Stable, unique identifiers (like database IDs \`item.id\`) should always be used. Array indexes are only acceptable if the list is strictly static: never filtered, never sorted, never inserted into, and never deleted from.`,
    code: `// BUGGY: Using index as key in a dynamic list with inputs
{items.map((item, index) => (
  <TodoItem key={index} item={item} onDelete={() => removeItem(index)} />
))}

// CORRECT: Using unique stable identifier
{items.map(item => (
  <TodoItem key={item.id} item={item} onDelete={() => removeItem(item.id)} />
))}`,
    evaluating: 'Tests practical understanding of React reconciliation algorithm, component identity, and diagnosing state-swapping bugs in lists.',
    followUps: [
      'Can you use Math.random() as a key?',
      'How does changing a component key force a complete state reset?',
      'How does React reconcile elements when keys are omitted entirely?'
    ],
    misconceptions: 'Generating keys on the fly during render with Math.random() or crypto.randomUUID(). This forces React to destroy and remount the component on EVERY single render, wiping state and destroying performance.'
  },
  {
    id: 'q-state-snapshot-batching',
    cat: 'React',
    priority: 'P1',
    lvl: 'Core',
    q: 'Why does state behave as a snapshot, and what changed with automatic batching in React 18?',
    a: `In React, state variables are not mutable storage slots; state behaves as a snapshot for a specific render execution.
When you call \`setCount(count + 1)\`, you are not mutating the \`count\` variable in place; you are requesting React to schedule a future render where \`count\` will be the new value. Within the currently running function execution, \`count\` remains constant.

If you call \`setCount(count + 1)\` three times in a row within the same click event, all three evaluate to \`setCount(0 + 1)\`. To chain updates within the same event, you must pass a functional updater: \`setCount(prev => prev + 1)\`.

Regarding batching: Batching is React grouping multiple state updates into a single re-render for performance.
Before React 18, React only batched updates inside React synthetic event handlers. Updates inside \`setTimeout\`, \`fetch\` callbacks, or native event listeners triggered separate renders for each state setter.
In React 18, Automatic Batching batches state updates everywhere by default across Promises, timeouts, and native events. You can opt out with \`flushSync\` if immediate synchronous DOM read is required.`,
    code: `// React 18: Both updates are automatically batched into ONE render
function handleFetch() {
  fetch('/api/user').then(() => {
    setIsLoading(false);
    setUser(data);
    // React 17: triggered 2 separate renders
    // React 18: automatically batched into 1 single render!
  });
}

// State snapshot demonstration:
function handleClick() {
  setCount(count + 1); // If count was 0, schedules render with 1
  setCount(count + 1); // Still schedules render with 1!
  // To get 2: setCount(c => c + 1); setCount(c => c + 1);
}`,
    evaluating: 'Tests comprehension of React execution model, functional state updates, and React 18 concurrency improvements.',
    followUps: [
      'When would you need to use ReactDOM.flushSync()?',
      'Why does React StrictMode run renders twice in development?',
      'How do functional state updates guarantee access to the latest pending state?'
    ],
    misconceptions: 'Thinking that setState immediately updates the local variable, or believing batching only works in synchronous click handlers in modern React.'
  },
  {
    id: 'q-controlled-uncontrolled',
    cat: 'React',
    priority: 'P1',
    lvl: 'Core',
    q: 'Controlled vs uncontrolled components: what guides your architectural decision?',
    a: `The difference lies in where the single source of truth for the form data lives:

Controlled Component: The form element\'s value is controlled entirely by React state.
- Driven via \`value\` and \`onChange\` props.
- Advantages: Instant validation on every keystroke, conditional disabling of submit buttons, formatting inputs on the fly (e.g. credit card mask), and keeping UI synchronized.
- Trade-off: Triggers a component re-render on every single keystroke.

Uncontrolled Component: The form element\'s value is managed natively by the DOM itself.
- You access the value using a \`ref\` or by querying native \`new FormData(e.currentTarget)\` on form submission.
- Advantages: Better raw performance for massive forms with dozens of fields, simpler integration with non-React libraries, and natural handling of file inputs (\`<input type="file" />\`).

Decision guide: Default to controlled components for complex interactive inputs requiring live validation or formatting. Use uncontrolled components for simple forms (reading values only on submit) or file uploads.`,
    code: `// Controlled
function ControlledInput() {
  const [val, setVal] = useState('');
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}

// Uncontrolled (via ref or native FormData)
function UncontrolledForm() {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    // Or via FormData:
    const data = new FormData(e.currentTarget);
    console.log(data.get('username'));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    evaluating: 'Tests component design, understanding of DOM vs React state, and form architecture.',
    followUps: [
      'Why is an <input type="file"> always an uncontrolled component?',
      'What warning does React throw if value changes from undefined to a string?',
      'How do libraries like React Hook Form leverage uncontrolled components for performance?'
    ],
    misconceptions: 'Assuming uncontrolled components are an anti-pattern. They are standard React patterns and often much faster for large data-entry forms.'
  },
  {
    id: 'q-angular-to-react',
    cat: 'React',
    priority: 'P1',
    lvl: 'Core',
    q: 'You started in Angular and now work with React: how do they differ conceptually, and which architectural concepts carry over?',
    a: `Having worked with both, the core conceptual differences center around framework versus library, change detection, and data flow:

1. Architecture: Angular is a comprehensive framework providing opinions for everything (dependency injection, TypeScript decorators, RxJS, HttpClient, routing). React is a focused UI library centered on declarative component composition, letting you choose your own routing, state, and HTTP tools.

2. Data Flow & Binding: Angular often leverages two-way data binding (\`[(ngModel)]\`) and template syntax with structural directives (\`*ngIf\`, \`*ngFor\`). React enforces strict unidirectional data flow: UI is a pure projection of state, and standard JavaScript expressions (map, ternary) are used inside JSX.

3. Change Detection: Angular traditionally used Zone.js to monkey-patch asynchronous browser APIs and run dirty checking across the component tree. In React, there is no automatic dirty-checking of arbitrary variables; re-renders are explicitly scheduled via state setters (\`useState\`, \`useReducer\`).

4. What carries over:
- Component-driven architecture and thinking in isolated UI modules.
- Separation of smart container components vs presentational components.
- Angular services map conceptually to React Custom Hooks and Context for sharing stateful logic and API interactions.
- TypeScript interfaces, strong typing, and asynchronous programming patterns (Promises/Observables).`,
    code: `/*
Angular (RxJS / Service / Template):
@Component({ template: '<div *ngIf="user$ | async as user">{{ user.name }}</div>' })
export class ProfileComponent { constructor(private userService: UserService) { this.user$ = this.userService.getUser(); } }

React (Custom Hook / JSX):
function Profile() {
  const { user, loading } = useUser(); // Custom hook encapsulates data fetching logic
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
*/`,
    evaluating: 'Directly validates your authentic background (3.8 YOE starting with Angular and working with React), testing whether you deeply understand both ecosystems and can translate architectural concepts.',
    followUps: [
      'How do Angular Services compare to React Context and Custom Hooks?',
      'What are the trade-offs of RxJS Observables versus React Hooks and Promises?',
      'How does React Virtual DOM reconciliation compare to Angular Ivy compiler?'
    ],
    misconceptions: 'Dismissing Angular or speaking negatively about either ecosystem. Strong senior engineers appreciate the engineering trade-offs of both.'
  },

  // ==========================================
  // HOOKS & PERFORMANCE (P1)
  // ==========================================
  {
    id: 'q-useeffect-mental-model',
    cat: 'Hooks & performance',
    priority: 'P1',
    lvl: 'Core',
    q: 'When should you use useEffect, and when should you avoid it in favor of derived state?',
    a: `The correct mental model for \`useEffect\` is synchronization with an external system outside of React (such as browser DOM APIs, network connections, web sockets, timers, or non-React widgets).

When you SHOULD use useEffect:
- Subscribing to an external event listener (e.g. window resize or scroll).
- Initiating network fetch requests based on props/state changes.
- Setting up and tearing down intervals or timeouts.
- Interfacing with third-party imperatively driven DOM libraries (maps, charts).

When you should AVOID useEffect:
1. Transforming data for rendering: Do not copy a prop into state or use an effect to filter a list. Compute derived values directly in the render body or wrap with \`useMemo\` if expensive.
2. Handling user events: Logic triggered by a user action (e.g. clicking "Submit" or "Buy") belongs directly in the event handler, not in an effect triggered by a state flag.
3. Resetting state on prop change: Prefer key-based resets (\`<Profile key={userId} />\`) or deriving state during render.`,
    code: `// ANTI-PATTERN: Redundant state and extra render pass
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(firstName + ' ' + lastName); // Bad: causes extra re-render!
}, [firstName, lastName]);

// CORRECT: Derived value during render (0 extra renders, 0 bugs)
const fullName = firstName + ' ' + lastName;

// If calculation is truly expensive (e.g. filtering 5,000 items):
const visibleTodos = useMemo(() => {
  return todos.filter(t => t.text.includes(query));
}, [todos, query]);`,
    evaluating: 'Tests whether you understand modern React architecture without falling into common beginner traps of overusing effects.',
    followUps: [
      'What happens if you omit a used variable from the useEffect dependency array?',
      'Why does React Strict Mode execute effects twice in development?',
      'How do you write an effect that only runs on updates and skips the initial mount?'
    ],
    misconceptions: 'Treating useEffect as a 1:1 replacement for lifecycle methods (componentDidMount, componentDidUpdate). It is a synchronization mechanism.'
  },
  {
    id: 'q-stale-closures',
    cat: 'Hooks & performance',
    priority: 'P1',
    lvl: 'Core',
    q: 'What is a stale closure in React Hooks, and what are 3 practical ways to fix it?',
    a: `A stale closure occurs when a callback function (inside a useEffect, useCallback, setTimeout, or event listener) captures variables from an earlier render snapshot and continues executing with outdated values long after state has changed.

Because state in React is immutable per render pass, any closure created during render #1 captures \`count = 0\`. If an effect starts an interval that does not include \`count\` in its dependencies, the interval callback will forever read \`count\` as \`0\`.

3 ways to fix it:
1. Functional state updates: Instead of \`setCount(count + 1)\`, use \`setCount(prev => prev + 1)\`. The callback receives the latest pending state from React without needing \`count\` in the closure.
2. Complete dependency arrays: Add all captured variables to the hook\'s dependency array so the closure is recreated with fresh values whenever dependencies change.
3. Mutable Ref pattern (\`useRef\`): Store the latest value in a ref (\`savedCallback.current = cb\`). Since \`ref.current\` is a mutable object reference, closures reading it always see the latest value without triggering re-renders.`,
    code: `// BUGGY: Stale closure in setInterval
useEffect(() => {
  const id = setInterval(() => {
    // 'count' is captured from the initial render and is always 0!
    setCount(count + 1); 
  }, 1000);
  return () => clearInterval(id);
}, []); // Empty dependencies!

// FIX 1: Functional update (best for state)
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1); // Reads fresh pending state
  }, 1000);
  return () => clearInterval(id);
}, []);

// FIX 2: Ref pattern for callbacks (useLatest)
function useLatest(value) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}`,
    evaluating: 'Critical React interview question. Tests JavaScript closure mechanics combined with React render snapshot behavior.',
    followUps: [
      'How does Dan Abramov\'s useInterval hook solve the stale closure problem?',
      'Why does eslint-plugin-react-hooks enforce exhaustive-deps?',
      'How do refs bypass the stale closure issue?'
    ],
    misconceptions: 'Disabling the ESLint exhaustive-deps warning comment instead of properly addressing the dependency or using functional updates.'
  },
  {
    id: 'q-usememo-usecallback',
    cat: 'Hooks & performance',
    priority: 'P1',
    lvl: 'Core',
    q: 'When are useMemo, useCallback, and React.memo useful, and when do they hurt performance?',
    a: `All three are memoization tools designed to optimize re-rendering performance:

1. \`useMemo\`: Caches the result of a computationally expensive calculation between renders based on dependencies: \`const val = useMemo(() => compute(a), [a])\`.
2. \`useCallback\`: Caches a function definition instance between renders: \`const fn = useCallback(() => doSomething(a), [a])\`. It is syntactic sugar for \`useMemo(() => fn, [deps])\`.
3. \`React.memo\`: A higher-order component that wraps a component to skip re-rendering if its props have not changed (via shallow equality comparison).

When they ARE useful:
- Passing callbacks or object props to a child component wrapped in \`React.memo\`. Without \`useCallback\`, a new function reference is created on every parent render, breaking \`React.memo\`.
- Expensive calculations (e.g. sorting or filtering thousands of items).
- Stabilizing an object or function that is used as a dependency in another \`useEffect\`.

When they HURT performance:
- Overusing them on trivial calculations (like string concatenation or basic math). Memoization has costs: allocating dependency arrays, comparing dependencies on every render, and memory overhead. If the calculation is cheaper than the comparison, you are slowing down your app.`,
    code: `// Good use: Child is memoized, so callback identity MUST be stable
const Child = React.memo(({ onSelect }) => {
  return <button onClick={onSelect}>Click me</button>;
});

function Parent({ id }) {
  // useCallback prevents Child from re-rendering when other Parent state changes
  const handleSelect = useCallback(() => {
    sendAnalytics(id);
  }, [id]);

  return <Child onSelect={handleSelect} />;
}`,
    evaluating: 'Evaluates your maturity in frontend performance optimization—whether you optimize deliberately based on profiling or blindly wrap everything in hooks.',
    followUps: [
      'Why is useCallback useless if the child component is NOT wrapped in React.memo?',
      'How do you measure if a calculation is actually expensive using performance.now() or React Profiler?',
      'What is React Compiler (React Forget) and how does it automate this?'
    ],
    misconceptions: 'Wrapping every function in useCallback by default. Unless passed to a memoized child or effect dependency array, it provides zero performance benefit.'
  },
  {
    id: 'q-race-conditions-api',
    cat: 'Hooks & performance',
    priority: 'P1',
    lvl: 'Core',
    q: 'How do you prevent stale API responses and race conditions in React search autocomplete?',
    a: `A race condition occurs when user input triggers multiple asynchronous requests in rapid succession (e.g. typing "r", "re", "react"). Because network responses arrive out of order, the response for the older query ("re") may resolve AFTER the response for the newer query ("react"), causing outdated results to overwrite fresh ones.

Two standard solutions in React:
1. \`AbortController\` (Preferred):
In the effect, create an \`AbortController\` and pass its \`signal\` to \`fetch(url, { signal })\`. In the effect\'s cleanup function, call \`controller.abort()\`. When the user types the next character or unmounts, the in-flight request is immediately cancelled by the browser, freeing network and CPU resources.

2. Boolean Flag / Request ID:
Use an \`active\` flag inside the effect. In the cleanup, set \`active = false\`. When the fetch promise resolves, only update state if \`active\` is still true. Outdated responses are simply ignored.`,
    code: `// Method 1: AbortController in useEffect cleanup
useEffect(() => {
  if (!query) {
    setResults([]);
    return;
  }
  const controller = new AbortController();

  async function search() {
    setIsLoading(true);
    try {
      const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
        signal: controller.signal
      });
      const data = await res.json();
      setResults(data);
      setError(null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  search();
  return () => controller.abort(); // Cancel previous request!
}, [query]);`,
    evaluating: 'Tests real-world production data fetching expertise, cleanup handling, and preventing subtle UI state corruption bugs.',
    followUps: [
      'Why must you check err.name !== "AbortError" in the catch block?',
      'How does TanStack Query / React Query handle request cancellation under the hood?',
      'What happens if you combine debouncing with AbortController?'
    ],
    misconceptions: 'Believing debouncing alone prevents race conditions. A debounced query can still experience variable server latency where request 1 arrives after request 2.'
  },
  {
    id: 'q-useref-vs-state',
    cat: 'Hooks & performance',
    priority: 'P1',
    lvl: 'Core',
    q: 'useRef vs useState: what are the core differences and when do you use each?',
    a: `The fundamental difference comes down to rendering:
- \`useState\`: Updating state schedules a re-render. It is meant for data that affects the visual output of the component on screen.
- \`useRef\`: Updating \`ref.current\` is a synchronous mutation of a plain JavaScript object \`{ current: ... }\`. It persists across renders but does NOT schedule a re-render.

When to use useRef:
1. Referencing DOM nodes directly (e.g. setting focus, measuring dimensions, scrolling).
2. Storing mutable instance values that shouldn\'t trigger renders (e.g. interval IDs, timer references, previous prop/state values).
3. Tracking whether a component has mounted or is on its initial render pass.

Rule of thumb: If changing the value needs to change what is visible on the screen, use \`useState\`. If changing the value is internal bookkeeping for the component, use \`useRef\`. Never read or write \`ref.current\` during render body execution (keep it pure).`,
    code: `function Stopwatch() {
  const [seconds, setSeconds] = useState(0); // Displayed on screen -> state
  const timerRef = useRef(null);            // Timer ID bookkeeping -> ref

  const start = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return <div>Time: {seconds}s <button onClick={start}>Start</button><button onClick={stop}>Stop</button></div>;
}`,
    evaluating: 'Validates clear mental model of component state vs instance variables and pure rendering rules.',
    followUps: [
      'Why is mutating ref.current inside the render body considered an anti-pattern?',
      'How would you implement a usePrevious hook using useRef?',
      'What is forwardRef and when is it required?'
    ],
    misconceptions: 'Using useState to store timer IDs or animation frame handles, causing useless extra re-renders.'
  },

  // ==========================================
  // ARCHITECTURE, FORMS & TESTING (P2)
  // ==========================================
  {
    id: 'q-context-perf',
    cat: 'Architecture & testing',
    priority: 'P2',
    lvl: 'Important',
    q: 'What are the performance pitfalls of React Context, and how do you mitigate them?',
    a: `The primary performance pitfall of React Context is coarse-grained re-rendering:
Whenever the \`value\` prop passed to a \`Context.Provider\` changes by reference equality, EVERY component that calls \`useContext(MyContext)\` will automatically re-render, even if it only consumes a property of the context that didn't change!

Mitigation strategies:
1. Split Contexts: Separate rapidly changing state from static state or actions. For instance, split \`ThemeStateContext\` and \`ThemeDispatchContext\`, or \`UserStateContext\` and \`UserActionsContext\`. Action dispatchers rarely change reference, so consumers only listening for actions never re-render when state updates.
2. Memoize the Provider value: Always wrap the context value object in \`useMemo\` so unrelated parent renders do not create a new object reference.
3. Colocate State: Don\'t put everything in global context. Keep state as close to the consuming leaf components as possible.
4. Dedicated state libraries: For high-frequency, complex shared state with fine-grained selectors, use specialized libraries like Zustand or Redux Toolkit.`,
    code: `// Splitting state and dispatch contexts to prevent unnecessary renders:
const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialUser);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}`,
    evaluating: 'Evaluates architectural judgment, re-render profiling, and scalability in medium-to-large React codebases.',
    followUps: [
      'How does Context compare to Zustand, Redux Toolkit, or Jotai?',
      'Why can\'t React.memo prevent re-renders caused by useContext?',
      'What is useMemoizedContext selector pattern?'
    ],
    misconceptions: 'Believing React.memo on a child will prevent it from re-rendering when the context it consumes changes. useContext directly bypasses React.memo.'
  },
  {
    id: 'q-rtl-testing',
    cat: 'Architecture & testing',
    priority: 'P2',
    lvl: 'Important',
    q: 'How do you test a React component, and why does React Testing Library discourage testing implementation details?',
    a: `React Testing Library (RTL) is built on the guiding principle: "The more your tests resemble the way your software is used, the more confidence they can give you."

Why avoid testing implementation details (like component state names, internal methods, or component hierarchy):
1. Fragile tests: Refactoring code (e.g. renaming a state variable from \`isOpen\` to \`isExpanded\`) breaks implementation tests even though user-facing behavior is 100% intact.
2. False confidence: Passing tests don't guarantee the user can actually interact with the UI (e.g. a hidden button might pass state checks).

RTL best practices:
- Query by accessibility roles and user-facing labels: \`screen.getByRole('button', { name: /submit/i })\`, \`screen.getByLabelText(/email/i)\`.
- Use \`userEvent\` rather than \`fireEvent\` to simulate realistic multi-step browser interactions (focus, keydown, click).
- Mock at the network boundary (e.g. with Mock Service Worker / MSW) rather than mocking custom hooks or API utility modules.`,
    code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('submits user credentials and displays success message', async () => {
  const user = userEvent.setup();
  render(<LoginForm onLogin={mockLogin} />);

  // Query as a user/screen-reader sees it
  await user.type(screen.getByLabelText(/email address/i), 'alex@test.com');
  await user.type(screen.getByLabelText(/password/i), 'SecurePass123!');
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  expect(await screen.findByText(/welcome back, alex/i)).toBeInTheDocument();
});`,
    evaluating: 'Tests software testing maturity, maintainability, and accessibility (a11y) awareness.',
    followUps: [
      'What is the difference between getBy, queryBy, and findBy?',
      'Why is userEvent preferred over fireEvent?',
      'How do you test asynchronous state changes and avoid act(...) warnings?'
    ],
    misconceptions: 'Testing internal state directly (like inspecting wrapper.state() from old Enzyme tests) or querying elements by CSS class names.'
  },
  {
    id: 'q-code-splitting-lazy',
    cat: 'Architecture & testing',
    priority: 'P2',
    lvl: 'Important',
    q: 'What is code splitting with React.lazy and Suspense, and how do you handle failure?',
    a: `Code splitting breaks down a large monolithic JavaScript bundle into smaller, on-demand chunks that are loaded only when the user navigates to a specific route or activates a feature.

How it works in React:
- \`React.lazy(() => import('./HeavyComponent'))\` uses dynamic ES modules import to load the component chunk asynchronously.
- \`Suspense\` wraps the lazy component and displays a fallback UI (like a loading spinner or skeleton) while the chunk downloads over the network.

Handling failure:
Network drops or deploying a new production build with fresh chunk hashes can cause dynamic imports to fail with chunk load errors.
To handle this robustly:
1. Always wrap \`Suspense\` boundaries in an \`ErrorBoundary\`.
2. The ErrorBoundary can render a friendly retry prompt: "Update available. Please refresh."
3. You can also implement automatic retry wrappers around the dynamic import function before failing.`,
    code: `import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

const AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));

function ReportsPage() {
  return (
    <ErrorBoundary fallback={<p>Failed to load dashboard. <button onClick={() => window.location.reload()}>Reload</button></p>}>
      <Suspense fallback={<div className="skeleton-loader">Loading analytics...</div>}>
        <AnalyticsDashboard />
      </Suspense>
    </ErrorBoundary>
  );
}`,
    evaluating: 'Assesses knowledge of web performance, bundling (Vite/Webpack), core web vitals (LCP), and defensive resilience.',
    followUps: [
      'What is route-based code splitting versus component-based splitting?',
      'How does code splitting impact Core Web Vitals like Largest Contentful Paint (LCP)?',
      'What are Error Boundaries and what types of errors do they NOT catch?'
    ],
    misconceptions: 'Thinking Suspense catches errors. Suspense only handles pending promises/loading states; Error Boundaries catch rejections and render errors.'
  },

  // ==========================================
  // PROJECT, EXPERIENCE & AUTHENTIC STORIES (P1)
  // ==========================================
  {
    id: 'q-tell-me-about-yourself',
    cat: 'Project & experience',
    priority: 'P1',
    lvl: 'Core',
    q: 'Tell me about yourself and your frontend journey.',
    a: `Here is a strong, authentic structure tailored to your exact 3.8-year background:

"I am a frontend engineer with 3 years and 10 months of professional experience building web applications. 

I began my engineering journey with a 6-month frontend internship where I established my core foundations in JavaScript, CSS, and modern web APIs. In my early career, I worked heavily with Angular, which gave me strong discipline in TypeScript, component-driven design, and architecting complex applications.

Over the past two years, my focus has shifted deeply to React. I've been building and maintaining modern React applications—working extensively with functional components, custom hooks, state architecture, and API integrations. Because of my background in both Angular and React, I have a deep appreciation for unidirectional data flow, explicit state transitions, and component performance.

Right now, I'm looking for a React Developer role where I can leverage my experience in building clean, responsive, and reliable frontend systems, take ownership of features, and contribute to high-standard engineering teams."`,
    code: `// Framework for structuring this answer out loud:
// 1. Current identity & total experience (3y 10m)
// 2. Foundation: Internship + Angular (TypeScript discipline, architecture)
// 3. Current focus: Hands-on React (Hooks, state, performance, API integration)
// 4. Strengths: Deep fundamentals, debugging, component design
// 5. Goal: Target React Developer role`,
    evaluating: 'Evaluates your communication clarity, self-awareness, authentic ownership of your career narrative, and fit for a 3-4 YOE role.',
    followUps: [
      'What motivated your transition from Angular to React?',
      'What kind of frontend challenges do you enjoy working on the most?',
      'How do you keep your technical skills sharp?'
    ],
    misconceptions: 'Reciting your resume chronologically line-by-line, inventing fake titles, or speaking vaguely about company metrics you had no control over.'
  },
  {
    id: 'q-production-bug',
    cat: 'Project & experience',
    priority: 'P1',
    lvl: 'Core',
    q: 'Describe a challenging production bug you investigated and fixed in a React application.',
    a: `Use this authentic STAR template based on real-world React challenges (e.g. a memory leak from an uncleaned subscription, or an autocomplete race condition):

Situation:
"In our application, users reported that the search dropdown intermittently displayed completely wrong results when typing quickly, and occasionally on slower mobile connections, results would suddenly flicker and show older queries."

Task:
"I was tasked with identifying the root cause of this intermittent bug and implementing a permanent fix without disrupting the user experience."

Action:
"I investigated network logs and reproduced the issue by throttling network speed to 3G. I observed a classic race condition: when typing rapidly, multiple fetch requests were initiated in parallel. An earlier request for a shorter string took 800ms while a later request took 300ms, meaning the older response resolved last and overwrote the latest results.
I resolved this by implementing two coordinated changes:
First, I debounced the user input to prevent spamming the backend.
Second, I integrated an AbortController inside our search hook's useEffect cleanup. Every time the query changed, any in-flight request was immediately aborted. I also handled the AbortError cleanly to prevent false error toasts."

Result:
"The race condition and UI flicker were completely eliminated. We verified it with automated tests simulating out-of-order responses, and network payload volume decreased because obsolete requests were cancelled before transferring large response bodies."`,
    code: `// Summary of the fix implemented in the story:
useEffect(() => {
  if (!debouncedQuery) return;
  const controller = new AbortController();

  fetchResults(debouncedQuery, controller.signal)
    .then(data => setResults(data))
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort(); // Crucial cleanup!
}, [debouncedQuery]);`,
    evaluating: 'Evaluates practical debugging methodology, understanding of network and browser realities, and concrete problem-solving skills.',
    followUps: [
      'How did you reproduce the bug in a local development environment?',
      'What monitoring or automated tests did you add to ensure it wouldn\'t regress?',
      'Did you consider using a library like TanStack Query instead?'
    ],
    misconceptions: 'Claiming you fixed a bug alone in 5 minutes with zero investigation, or fabricating unverifiable metrics like "increased revenue by 40%". Focus on the engineering investigation and fix.'
  },
  {
    id: 'q-walk-through-project',
    cat: 'Project & experience',
    priority: 'P1',
    lvl: 'Core',
    q: 'Walk me through a project you worked on and your specific contributions.',
    a: `Structure your walkthrough into 4 clear parts: Context, Architecture, Your Personal Ownership, and a Technical Challenge:

1. Product Context (30 seconds):
"I worked on an internal customer management dashboard used by operations teams to track client workflows, view analytics, and manage support tickets in real time."

2. Architecture & Tech Stack (45 seconds):
"The frontend was built with React and TypeScript, using React Router for navigation, Context and custom hooks for shared session state, and Axios/Fetch with custom hooks for data fetching. The UI was componentized into reusable design system primitives (inputs, modals, tables)."

3. Your Concrete Ownership (45 seconds):
"My primary responsibility was building the interactive ticket management module. This included a sortable, filterable data table with pagination, a detailed modal viewer with form validation, and real-time status updates. I owned the component boundaries, form state validation, and API integration for this entire module."

4. Technical Challenge & Trade-off (45 seconds):
"A key challenge was rendering table performance when viewing high volumes of ticket records. Initially, the table suffered from re-render lag when users filtered by status. I identified that row callbacks were being recreated every render, and sorting was re-running unnecessarily. I separated the raw data from derived sorted data using useMemo and memoized the row components, bringing interactions back to 60fps."`,
    code: `// Walkthrough structure:
// 1. Context (What the app does, who uses it)
// 2. Stack (React, TS, state management, API layer)
// 3. Your Ownership (Exact features YOU personally built)
// 4. Engineering Trade-off / Performance challenge`,
    evaluating: 'Assesses whether you can speak clearly about your actual code, distinguish your work from your team\'s work, and explain technical trade-offs.',
    followUps: [
      'If you had to rebuild that feature from scratch today, what would you change?',
      'How did your team handle code reviews and testing on that project?',
      'How did you coordinate with backend engineers on API contracts?'
    ],
    misconceptions: 'Talking in abstract "we" terms about the whole company or product roadmap without ever explaining what YOU actually coded.'
  },
  {
    id: 'q-frontend-security',
    cat: 'Architecture & testing',
    priority: 'P2',
    lvl: 'Important',
    q: 'How do you protect a React application from XSS and where do you store authentication tokens?',
    a: `Cross-Site Scripting (XSS) occurs when malicious JavaScript is injected and executed in the user's browser.

How React helps:
React automatically escapes values embedded in JSX expressions (\`<div>{userInput}</div>\`), converting special characters into safe HTML entities before rendering. This protects against common string injection.

Where vulnerabilities still arise in React:
1. \`dangerouslySetInnerHTML\`: Never use it with unsanitized user content. If rich text is required, sanitize it first using an established library like DOMPurify.
2. Direct URL manipulation: \`<a href={userWebsite}>\` can execute JavaScript if the user submits a \`javascript:...\` URI. Always validate URL protocols to only allow \`http:\` and \`https:\`.
3. Server-side rendering (SSR) data injection into \`window.__INITIAL_STATE__\`.

Token Storage:
- \`localStorage\` / \`sessionStorage\`: Vulnerable to XSS. If an attacker executes any script on your page, they can read all tokens from storage and impersonate the user.
- Preferred approach: Store authentication/session tokens in an \`HttpOnly\`, \`Secure\`, \`SameSite=Lax\` cookie. JavaScript cannot read HttpOnly cookies via \`document.cookie\`, neutralizing token theft via XSS. Combine this with CSRF tokens or modern SameSite cookie policies to prevent Cross-Site Request Forgery.`,
    code: `// Vulnerable:
// <a href={userProvidedUrl}>Website</a> // Could be "javascript:stealTokens()"

// Protected:
function SafeLink({ href, children }) {
  const isSafe = /^https?:\\/\\//i.test(href);
  return isSafe ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> : null;
}

// Sanitizing rich HTML with DOMPurify:
import DOMPurify from 'dompurify';
function RichContent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}`,
    evaluating: 'Tests web security fundamentals, practical risk assessment, and authentication architectural standards.',
    followUps: [
      'What is Content Security Policy (CSP) and how does it prevent XSS?',
      'What is the difference between SameSite=Lax and SameSite=Strict cookies?',
      'Why is rel="noopener noreferrer" important on external links?'
    ],
    misconceptions: 'Claiming localStorage is completely safe for JWTs as long as you encode them in base64. Base64 is encoding, not encryption; any script can read it.'
  }
];
