// Forjix — 15-Day React & JavaScript Interview Preparation Syllabus
export const days = [
  {
    "n": 1,
    "title": "JavaScript fundamentals — scope, closures & hoisting",
    "phase": "JavaScript",
    "theme": "Scope, closures, hoisting & execution contexts",
    "priority": "P1",
    "goal": "Master JavaScript engine fundamentals, lexical environments, TDZ, and closure memory models to confidently pass Round 1 technical screens.",
    "summary": "Refresh execution contexts, call stack, scope chains, closures, hoisting, and the temporal dead zone.",
    "timeAllocation": "3.5 hours: 1h core concepts & recall, 1.5h JS exercises & output tracing, 1h Q&A & spoken rehearsal",
    "objectives": [
      "Articulate the difference between creation and execution phases of JavaScript Execution Contexts.",
      "Explain closures with real-world use cases (encapsulation, memoization, currying) and memory implications.",
      "Distinguish var, let, and const in terms of scope, hoisting, and the Temporal Dead Zone (TDZ).",
      "Trace call stack and memory heap interactions for primitive vs reference types."
    ],
    "concepts": [
      "Global Execution Context & Function Execution Context",
      "Lexical Environment and Scope Chain resolution",
      "Variable Hoisting vs Function Declaration Hoisting vs Function Expressions",
      "Temporal Dead Zone (TDZ) for let and const",
      "Closures: retaining references to outer lexical environments after return",
      "Memory leaks via closures (detached DOM trees, uncleared event listeners)",
      "Primitives (stack, passed by value) vs Objects (heap, passed by reference)"
    ],
    "tasks": [
      "Diagram the execution context stack and variable environment for a nested closure function.",
      "Solve and explain 5 tricky output-prediction snippets involving var in loops, hoisting, and shadowing.",
      "Implement makeCounter2 with private state and multiple methods (increment, decrement, reset, value).",
      "Practise speaking out loud: \"How would you explain a closure to a junior engineer?\" in under 90 seconds."
    ],
    "questions": [
      "Explain closures with a practical example and discuss potential memory implications.",
      "What is hoisting, how does it differ between var, let, and const, and what is the TDZ?",
      "Primitive vs reference types: what actually happens in memory when assigning an object?",
      "How does JavaScript manage scope, and what is the lexical environment?"
    ],
    "coding": [
      "p1",
      "p2",
      "p3",
      "p46"
    ],
    "reactCoding": [
      "Examine how React useState relies on JavaScript closures internally across renders."
    ],
    "deliverable": "Explain closures without buzzwords, predict 5 tricky output puzzles correctly, and implement a closure-based state manager without referencing documentation.",
    "recallQuiz": [
      {
        "q": "Why does accessing a `let` variable before declaration throw a ReferenceError while `var` returns `undefined`?",
        "a": "`var` is hoisted and immediately initialized to `undefined` during the creation phase. `let` and `const` are hoisted into lexical scope but uninitialized; the period between entering scope and declaration is the Temporal Dead Zone (TDZ)."
      },
      {
        "q": "Do closures keep a copy of the outer variables or a live reference?",
        "a": "A live reference to the outer variable binding in the lexical environment, which is why mutating an outer variable affects all functions closing over it."
      },
      {
        "q": "What happens when you pass an object to a function and mutate its property vs reassigning it?",
        "a": "Mutating a property affects the caller because both refer to the same heap address. Reassigning the parameter points the local identifier to a new memory address, leaving the caller object untouched."
      }
    ],
    "extra": [
      "Prototype chain, class syntax and new",
      "Optional chaining, nullish coalescing, destructuring and spread",
      "Type coercion and truthy/falsy edge cases"
    ]
  },
  {
    "n": 2,
    "title": "Arrays, objects & functional methods",
    "phase": "JavaScript",
    "theme": "Arrays, objects & functional methods",
    "priority": "P1",
    "goal": "Master immutable data transformations, shallow vs deep copying, and array pipeline methods crucial for React state updates.",
    "summary": "Fluent manipulation of map, filter, reduce, slice, flat, structuredClone, and immutability patterns.",
    "timeAllocation": "3.5 hours: 1h functional array methods & copy mechanics, 1.5h coding problems, 1h Q&A review",
    "objectives": [
      "Choose the appropriate functional method (map, filter, reduce, find, some, every) without writing imperative for-loops.",
      "Implement robust immutable update patterns for deeply nested objects and arrays.",
      "Explain the exact differences between Object.assign, spread syntax, JSON serialization, and structuredClone.",
      "Explain why mutating state directly breaks React re-renders and shallow equality checks."
    ],
    "concepts": [
      "Pure functions vs side-effects in data transformation",
      "Array iteration methods: map, filter, reduce, flat, flatMap",
      "Array search methods: find, findIndex, some, every, includes",
      "Shallow copy (Object.assign, spread ...) vs Deep copy (structuredClone, recursive cloning)",
      "Pitfalls of JSON.parse(JSON.stringify()): undefined, functions, Symbols, circular references, Date objects",
      "Object immutability and Object.freeze vs deep immutability"
    ],
    "tasks": [
      "Implement `groupBy` using `reduce` without mutating inputs.",
      "Write deep cloning logic handling nested objects and arrays, comparing it to `structuredClone`.",
      "Demonstrate 3 common React state mutation bugs and write their correct immutable updates.",
      "Solve array deduplication, intersection, and object merging problems with O(n) complexity."
    ],
    "questions": [
      "map() vs filter() vs reduce(): when do you use each and why avoid side effects inside them?",
      "What is the difference between a shallow copy and a deep copy, and when does shallow copy fail?",
      "How would you merge two arrays of objects by a common id key without mutation?",
      "Why does React depend on immutability for state updates?"
    ],
    "coding": [
      "p4",
      "p5",
      "p6",
      "p7",
      "p21",
      "p22"
    ],
    "reactCoding": [
      "Write an immutable reducer or state setter that updates an item inside a nested 2-level deep list."
    ],
    "deliverable": "Transform, group, and merge complex object arrays cleanly using reduce/map, and explain shallow equality in React rendering.",
    "recallQuiz": [
      {
        "q": "What does reduce return if the array is empty and no initialValue is provided?",
        "a": "It throws a TypeError: \"Reduce of empty array with no initial value\". Always provide an initial accumulator value."
      },
      {
        "q": "Can structuredClone handle functions or DOM nodes?",
        "a": "No. structuredClone throws a DataCloneError if it encounters functions, methods, DOM nodes, or certain browser-specific objects."
      },
      {
        "q": "Why does `[...arr].sort()` still cause accidental mutation for elements?",
        "a": "Spread creates a shallow copy of the array container. Sorting reorders elements without mutating the original array, but if elements are objects, the elements themselves remain reference-identical."
      }
    ],
    "extra": [
      "Sorting with comparators; stability",
      "structuredClone vs spread vs JSON deep copy",
      "Map, Set and WeakMap: when to use each"
    ]
  },
  {
    "n": 3,
    "title": "Strings & core problem-solving patterns",
    "phase": "JavaScript",
    "theme": "Strings & core problem-solving patterns",
    "priority": "P1",
    "goal": "Learn pattern recognition for interview coding: frequency counters, two pointers, sliding window basics, and stack validation.",
    "summary": "Solve interview staples (Two Sum, Anagrams, Longest Unique Substring, Balanced Parentheses) with optimal Big-O.",
    "timeAllocation": "4 hours: 1h pattern analysis & complexity, 2h solving challenges with tests, 1h explaining trade-offs",
    "objectives": [
      "Recognize when to apply Map/Set (O(n) lookups) vs Two Pointers (O(n) on sorted arrays) vs Sliding Window.",
      "Calculate time and space complexity with confidence using Big-O notation.",
      "Handle critical string edge cases: empty string, single character, whitespace, case sensitivity, non-ASCII.",
      "Demonstrate the 6-step problem solving framework out loud under interview conditions."
    ],
    "concepts": [
      "Big-O complexity ladder: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)",
      "Map vs plain Object: key types, prototype pollution, iteration order, performance",
      "Set for O(1) membership checks and deduplication",
      "Two pointers pattern: converging from opposite ends vs fast & slow pointers",
      "Sliding window pattern: dynamic window for substring/subarray optimization",
      "Stack (LIFO): bracket matching, undo history, depth-first traversal"
    ],
    "tasks": [
      "Implement Two Sum in O(n) using a hash map and explain the trade-off compared to the O(n log n) two-pointer sort approach.",
      "Implement Longest Substring Without Repeating Characters using sliding window with a Map of last-seen indices.",
      "Implement Balanced Parentheses using a stack and test edge cases like unclosed or misordered brackets.",
      "Solve Valid Anagram using a frequency counter in O(n) time and O(1) auxiliary space."
    ],
    "questions": [
      "When is a Map preferred over a plain object in JavaScript?",
      "How does a frequency counter reduce an O(n²) problem to O(n)?",
      "When is a two-pointer approach useful, and what precondition does it usually require?",
      "What is the difference between time complexity and space complexity with practical examples?"
    ],
    "coding": [
      "p8",
      "p9",
      "p10",
      "p11",
      "p27",
      "p45"
    ],
    "reactCoding": [
      "Implement a client-side search filter that highlights matching substrings without regex injection vulnerabilities."
    ],
    "deliverable": "Solve Two Sum, Balanced Brackets, and Longest Unique Substring with optimal complexity while narrating the approach.",
    "recallQuiz": [
      {
        "q": "Why is `new Map()` lookup O(1) while `array.includes()` is O(n)?",
        "a": "Map uses a hash table internally to map keys to memory buckets in constant time. Array.includes performs a linear scan through the array elements."
      },
      {
        "q": "What is the condition to expand vs shrink a sliding window?",
        "a": "Expand the right pointer to include new elements while the window constraint is satisfied; shrink the left pointer when the constraint is violated."
      },
      {
        "q": "Why must you verify `stack.length === 0` at the end of balanced brackets check?",
        "a": "Because opening brackets (e.g. `(((`) might never be closed, leaving items in the stack even if no mismatched closer was detected."
      }
    ],
    "extra": [
      "Sliding window and binary search patterns",
      "Big-O of common array and string methods",
      "Stack and queue basics (brackets, undo history)"
    ]
  },
  {
    "n": 4,
    "title": "Promises & asynchronous JavaScript",
    "phase": "JavaScript",
    "theme": "Promises & asynchronous JavaScript",
    "priority": "P1",
    "goal": "Demystify the JavaScript Event Loop, microtasks vs macrotasks, Promise combinators, async/await error handling, and request aborting.",
    "summary": "Master asynchronous execution order, Promise combinators (all, allSettled, race, any), retry with backoff, and AbortController.",
    "timeAllocation": "3.5 hours: 1h event loop mental model & diagrams, 1.5h coding async utilities, 1h Q&A review",
    "objectives": [
      "Predict the exact output order of code mixing synchronous logs, setTimeout, Promises, and queueMicrotask.",
      "Implement polyfills and utilities for Promise.all, retry with backoff, and delay.",
      "Contrast Promise.all, Promise.allSettled, Promise.race, and Promise.any with clear failure cases.",
      "Apply AbortController to cancel in-flight HTTP requests and prevent race conditions."
    ],
    "concepts": [
      "Single-threaded JavaScript: Call Stack, Web APIs, Task Queue (Macrotasks), Microtask Queue",
      "Microtask prioritization: queueMicrotask and Promise callbacks run before the next rendering frame and macrotask",
      "Promise lifecycle: pending, fulfilled, rejected (immutable once settled)",
      "Promise combinators: Promise.all (fail-fast), Promise.allSettled (resilient), Promise.race, Promise.any",
      "async/await as syntactic sugar over generators/promises; try/catch error boundaries",
      "AbortController and AbortSignal for request cancellation"
    ],
    "tasks": [
      "Step through 4 event loop output questions and explain why microtasks drain completely before the next macrotask.",
      "Implement `promiseAll(promises)` from scratch preserving order and rejecting on first error.",
      "Implement `retry(fn, times, delayMs)` with exponential backoff.",
      "Write a fetch helper with an AbortController timeout that aborts after 5 seconds."
    ],
    "questions": [
      "Explain the event loop: how do call stack, microtasks, and macrotasks interact?",
      "Promise.all vs Promise.allSettled: when would you choose one over the other in production?",
      "How does async/await work under the hood, and how do you handle errors properly?",
      "How do you cancel a fetch request in JavaScript and why is this critical in React?"
    ],
    "coding": [
      "p14",
      "p33",
      "p34",
      "p61",
      "p62",
      "p63"
    ],
    "reactCoding": [
      "Write a cleanup function in a useEffect hook that uses AbortController to abort an API call on unmount or input change."
    ],
    "deliverable": "Predict event loop output with 100% accuracy and implement both Promise.all and retry-with-backoff from scratch.",
    "recallQuiz": [
      {
        "q": "Does `setTimeout(fn, 0)` run immediately after the current synchronous line?",
        "a": "No. It places a callback into the macrotask queue, which runs only after the call stack is empty and all pending microtasks have executed."
      },
      {
        "q": "If one promise rejects in Promise.all, do the other promises stop running?",
        "a": "No. The underlying asynchronous operations continue running in the background; Promise.all simply rejects immediately without waiting for them."
      },
      {
        "q": "What is the return value of an async function that does not explicitly return anything?",
        "a": "It returns a Promise that resolves to `undefined`."
      }
    ],
    "extra": [
      "async/await error handling with try/catch",
      "Retry, timeout and concurrency-limit patterns",
      "AbortController and fetch cancellation"
    ]
  },
  {
    "n": 5,
    "title": "Functions, this, debounce, throttle & browser events",
    "phase": "JavaScript",
    "theme": "Functions, this, debounce, throttle & browser events",
    "priority": "P1",
    "goal": "Master function execution context, `this` binding rules, currying, debounce/throttle implementations, and event propagation.",
    "summary": "Deep dive into call, apply, bind, arrow functions, debounce/throttle, event bubbling, capturing, and delegation.",
    "timeAllocation": "3.5 hours: 1h this & DOM events, 1.5h coding debounce, throttle, bind, 1h Q&A review",
    "objectives": [
      "Determine `this` in any call context (default, implicit, explicit with call/apply/bind, new, and arrow functions).",
      "Implement debounce and throttle from scratch, explaining leading vs trailing edge execution.",
      "Explain the 3 phases of DOM event propagation: capturing, target, and bubbling.",
      "Implement event delegation to handle dynamic list items with high performance."
    ],
    "concepts": [
      "The 4 rules of `this` binding in JavaScript + arrow function lexical `this`",
      "Explicit binding: Function.prototype.call, apply, bind",
      "Debounce: wait for silence before executing (search inputs, auto-save, resize end)",
      "Throttle: limit execution to at most once per interval (scroll, mousemove, continuous resize)",
      "DOM Event flow: capture phase -> target -> bubble phase",
      "Event delegation: attaching a single listener to a parent element using event.target"
    ],
    "tasks": [
      "Implement `debounce(fn, ms)` from scratch preserving context and arguments.",
      "Implement `throttle(fn, ms)` with timestamp comparison or timer flags.",
      "Write a polyfill for `Function.prototype.bind`.",
      "Explain event delegation and write a vanilla JS example handling clicks on dynamic list items."
    ],
    "questions": [
      "How is `this` determined in regular functions vs arrow functions?",
      "What are call, apply, and bind, and what are their differences?",
      "What is the difference between debounce and throttle, and where is each used in UI?",
      "Explain event bubbling, capturing, and how event delegation improves web performance."
    ],
    "coding": [
      "p12",
      "p13",
      "p24",
      "p25",
      "p26",
      "p54"
    ],
    "reactCoding": [
      "Build a custom `useDebounce(value, delay)` React hook and connect it to a search input."
    ],
    "deliverable": "Implement debounce, throttle, and a custom bind polyfill from memory while clearly explaining their use cases in frontend architecture.",
    "recallQuiz": [
      {
        "q": "Can you re-bind an arrow function using `.bind()` or `.call()`?",
        "a": "No. Arrow functions do not have their own `this` binding; their `this` is lexically resolved at declaration time and cannot be overridden."
      },
      {
        "q": "What is the main difference between event.target and event.currentTarget?",
        "a": "`event.target` is the actual DOM element that triggered the event; `event.currentTarget` is the element to which the event handler is currently attached."
      },
      {
        "q": "What happens to pending debounced executions when a React component unmounts?",
        "a": "If not cleared in cleanup, the debounced callback will execute later and attempt to update unmounted state, causing a memory leak or error."
      }
    ],
    "extra": [
      "Event delegation; bubbling vs capturing",
      "Currying, composition and memoization",
      "ES modules and tree shaking"
    ]
  },
  {
    "n": 6,
    "title": "React fundamentals & component mental model",
    "phase": "React",
    "theme": "React fundamentals & mental model",
    "priority": "P1",
    "goal": "Build an ironclad mental model of declarative UI, JSX compilation, props vs state, list keys, and the shift from Angular to React.",
    "summary": "Master component composition, unidirectional data flow, controlled components, stable keys, and lifting state up.",
    "timeAllocation": "3.5 hours: 1h React mental model & Angular comparison, 1.5h live component building, 1h Q&A review",
    "objectives": [
      "Explain how JSX compiles to `React.createElement` / JSX runtime objects.",
      "Contrast React (unidirectional data flow, hooks, explicit state updates) with Angular (two-way binding, dependency injection, RxJS streams).",
      "Design controlled vs uncontrolled components with proper state and ref management.",
      "Explain the critical role of stable keys in list reconciliation and demonstrate index-key bugs."
    ],
    "concepts": [
      "Declarative UI: UI = f(state)",
      "JSX transformation and Virtual DOM elements (plain JS objects)",
      "Unidirectional data flow: parent-to-child via props, child-to-parent via callbacks",
      "Props (immutable from child perspective) vs State (encapsulated, triggers re-render)",
      "Controlled components (React owns value) vs Uncontrolled (DOM owns value via ref / FormData)",
      "List rendering: key attribute identity and sibling reconciliation",
      "Transitioning from Angular: Zone.js change detection vs React render phase; Services vs Custom Hooks"
    ],
    "tasks": [
      "Build a full Todo application with add, toggle, delete, filter (All/Active/Completed), and search.",
      "Demonstrate an index-as-key bug with removable items containing local input state, then fix it with unique IDs.",
      "Rehearse answering: \"You started in Angular and now work with React: how do they differ conceptually and which architectural patterns carry over?\""
    ],
    "questions": [
      "What is the difference between props and state in React?",
      "Why are keys essential when rendering lists, and what bugs occur when using array indexes?",
      "Controlled vs uncontrolled components: what guides your architectural choice?",
      "Having worked with Angular, how does React differ in data flow, change detection, and state management?"
    ],
    "coding": [
      "p15",
      "p16",
      "p64"
    ],
    "reactCoding": [
      "Build a Todo application with immutable state updates, search filtering, and empty/error states."
    ],
    "deliverable": "Build a full Todo app with zero direct state mutations, explain list reconciliation bugs, and deliver a polished Angular-to-React comparison answer.",
    "recallQuiz": [
      {
        "q": "What actually is a React Element?",
        "a": "A plain, immutable JavaScript object `{ type, props, key, ref }` describing what DOM node or component should render."
      },
      {
        "q": "Why does using array index as a key fail when deleting or reordering items?",
        "a": "Because index keys associate component identity with position rather than data. Reordering causes React to reuse old DOM nodes and local state for the wrong items."
      },
      {
        "q": "How does React change detection differ from Angular Zone.js?",
        "a": "Angular (with Zone.js) monkey-patches async APIs to trigger dirty-checking across the component tree. React requires explicit state updates (`setState` / `dispatch`) to schedule component re-renders."
      }
    ],
    "extra": [
      "JSX rules, fragments and conditional rendering",
      "Controlled vs uncontrolled inputs",
      "Angular to React: DI and RxJS vs hooks and props"
    ]
  },
  {
    "n": 7,
    "title": "Rendering, reconciliation & state management",
    "phase": "React",
    "theme": "Rendering, reconciliation & state management",
    "priority": "P1",
    "goal": "Understand exactly what triggers a re-render, how React diffs elements, state snapshots, and React 18 automatic batching.",
    "summary": "Deep dive into re-render causes, Reconciliation (Fiber), state batching, functional updates, and pure rendering.",
    "timeAllocation": "3.5 hours: 1h rendering mechanics & Fiber mental model, 1.5h interactive experiments, 1h Q&A review",
    "objectives": [
      "List the exact 3 triggers that cause a component to re-render (state, parent render, context consumer).",
      "Explain why a state setter does not immediately change the variable inside the current event handler (state snapshot).",
      "Use functional state updates (`setCount(c => c + 1)`) to avoid stale state in asynchronous callbacks.",
      "Explain React 18 automatic batching across Promises, setTimeout, and native event listeners."
    ],
    "concepts": [
      "Render phase (pure, calculating element tree) vs Commit phase (writing changes to real DOM)",
      "Reconciliation algorithm: element type comparison, key matching, subtree recreation vs update",
      "State as a snapshot: values are immutable for the duration of a single render pass",
      "Batching in React: grouping multiple state updates into a single render pass",
      "React 18 automatic batching everywhere (including inside fetch callbacks and timers)",
      "Strict Mode in development: intentional double invocation of components, reducers, and initial effect passes"
    ],
    "tasks": [
      "Build an interactive counter demonstrating multiple `setCount(count + 1)` vs `setCount(c => c + 1)`.",
      "Trace parent-to-child render cascades and demonstrate how changing a parent state re-renders all child components by default.",
      "Explain what the Fiber tree is at a high level (a linked list of work units allowing interruptible rendering)."
    ],
    "questions": [
      "What causes a React component to re-render, and does a re-render always update the DOM?",
      "Why can state appear unchanged immediately after calling its setter function?",
      "What is reconciliation in React, and how does the diffing algorithm work?",
      "What changed with automatic batching in React 18, and why does Strict Mode run renders twice?"
    ],
    "coding": [
      "p60",
      "p70"
    ],
    "reactCoding": [
      "Build an Undo/Redo counter using a reducer or custom state architecture that maintains past, present, and future snapshots."
    ],
    "deliverable": "Explain the difference between rendering and painting, state snapshots, and automatic batching with practical code demonstrations.",
    "recallQuiz": [
      {
        "q": "If a component re-renders, does its DOM always get re-painted?",
        "a": "No. Re-rendering executes the component function and produces a new Virtual DOM tree. React then diffs it with the previous tree in the commit phase; only actual differences are written to the DOM."
      },
      {
        "q": "Why does calling `setCount(count + 1)` three times in one click handler only increment by 1?",
        "a": "Because `count` is a constant snapshot within the event handler execution. Each call evaluates to `setCount(0 + 1)`. Use `setCount(c => c + 1)` to chain functional updates."
      },
      {
        "q": "Does updating a `ref.current` trigger a re-render?",
        "a": "No. Updating a ref is a synchronous mutation of a plain object that does not notify React to schedule a re-render."
      }
    ],
    "extra": [
      "Automatic batching and functional updates (React 18)",
      "Strict Mode double rendering: why render must stay pure",
      "Lifting state up vs composition"
    ]
  },
  {
    "n": 8,
    "title": "React Hooks, effects, refs & custom Hooks",
    "phase": "React",
    "theme": "React Hooks, effects, refs & custom Hooks",
    "priority": "P1",
    "goal": "Master useEffect synchronization mental model, dependency arrays, cleanups, stale closures, useRef vs useState, and custom Hook design.",
    "summary": "Practise useState, useEffect, useRef, useMemo, useCallback, custom Hooks, and avoid common Hook anti-patterns.",
    "timeAllocation": "4 hours: 1h Hook rules & lifecycle-vs-sync mental model, 2h building custom hooks with cleanups, 1h Q&A review",
    "objectives": [
      "Explain useEffect as synchronization with external systems rather than lifecycle methods (componentDidMount/Update).",
      "Identify and fix stale closures inside useEffect, setInterval, and event listeners.",
      "Implement proper effect cleanups to prevent memory leaks and outdated responses.",
      "Design clean custom Hooks (`useDebounce`, `useLocalStorage`, `usePrevious`, `useWindowSize`)."
    ],
    "concepts": [
      "Rules of Hooks: top-level only, React functions only (enforced by call-order linked list)",
      "useEffect synchronization model: setup -> cleanup -> re-setup",
      "Dependency arrays: exhaustive dependencies rule and stabilizing object/function dependencies",
      "Stale closures in Hooks: closures capturing values from an earlier render snapshot",
      "useRef for mutable instance variables (timer IDs, previous values) and DOM nodes",
      "useMemo (cache computed values) and useCallback (cache function references) trade-offs",
      "Custom Hooks: extracting reusable stateful logic with a clean API contract"
    ],
    "tasks": [
      "Build a `useDebounce` hook that delays updating a debounced value and cleans up pending timers on change or unmount.",
      "Build a `useInterval` or `useTimer` hook that does not suffer from stale closure bugs.",
      "Demonstrate an infinite loop caused by an unmemoized object in useEffect dependencies and fix it.",
      "Build a data-fetching component with loading, error, and cancellation states."
    ],
    "questions": [
      "When should you use useEffect, and when should you avoid it in favor of derived state?",
      "When does useEffect cleanup run, and why is cleanup essential in single-page apps?",
      "useRef vs useState: how do you decide which one to use?",
      "What is a stale closure in React Hooks, and what are 3 ways to fix it?"
    ],
    "coding": [
      "p19",
      "p20",
      "p36"
    ],
    "reactCoding": [
      "Create a reusable useDebounce hook and a Stopwatch component with start, pause, reset, and lap features."
    ],
    "deliverable": "Build two robust custom hooks with cleanups, explain stale closures clearly, and articulate when NOT to use useEffect.",
    "recallQuiz": [
      {
        "q": "When does the cleanup function returned by useEffect execute?",
        "a": "It executes right before the effect re-runs with new dependencies, and when the component unmounts from the DOM."
      },
      {
        "q": "Why should you avoid using useEffect to compute a filtered list from an existing list and query string?",
        "a": "Because it introduces unnecessary state, extra re-render passes, and synchronization bugs. Calculate derived values directly in the render body or with `useMemo`."
      },
      {
        "q": "How does React know which hook belongs to which state internally?",
        "a": "React keeps a linked list of hook nodes for each component fiber. It relies on the strict call order of hooks on every render, which is why hooks must not be placed inside conditions or loops."
      }
    ],
    "extra": [
      "Rules of Hooks and custom hook design",
      "useLayoutEffect vs useEffect; useId and useTransition basics",
      "Stale closures and infinite effect loops"
    ]
  },
  {
    "n": 9,
    "title": "State architecture, forms & routing",
    "phase": "React",
    "theme": "State architecture, forms & routing",
    "priority": "P2",
    "goal": "Structure scalable application state, handle validated forms with field-level errors, and configure client-side routing.",
    "summary": "Compare local state, Context API, useReducer, and external state stores. Build robust forms and protected routes.",
    "timeAllocation": "3.5 hours: 1h state taxonomy & architecture, 1.5h form validation & routing, 1h Q&A review",
    "objectives": [
      "Categorize state into local UI state, shared client state, URL state, and remote server state.",
      "Implement `useReducer` for complex multi-field state transitions with pure action dispatching.",
      "Evaluate Context API performance pitfalls (re-rendering all consumers on value change) and split contexts.",
      "Build a production-grade form with touched state, synchronous/asynchronous validation, and error display."
    ],
    "concepts": [
      "State colocation: keep state as close to where it is used as possible",
      "useState vs useReducer: single primitive vs complex state transition machine",
      "Context API: dependency injection for UI trees; pitfalls of large single context objects",
      "Server state vs Client state: why remote caching (TanStack Query) differs from UI state (Zustand/Redux)",
      "Controlled form architecture: tracking `values`, `errors`, `touched`, and `isSubmitting`",
      "Client-side routing: HTML5 History API, protected routes, URL query params as single source of truth"
    ],
    "tasks": [
      "Build a validated registration form with name, email, password strength, and confirm password fields.",
      "Implement a multi-page flow with routing, protected routes (checking auth), and active navigation links.",
      "Refactor a prop-drilled counter and user profile to use a cleanly split Context or reducer."
    ],
    "questions": [
      "When would you choose useReducer over useState, and how do you test a reducer?",
      "What are the performance limitations of React Context, and how do you prevent unnecessary re-renders in consumers?",
      "How do you architect form state and validation in React without relying on heavy external libraries?",
      "How do you handle protected routes and unauthorized redirects in a React single-page app?"
    ],
    "coding": [
      "p41",
      "p65",
      "p66",
      "p70"
    ],
    "reactCoding": [
      "Build a validated checkout or signup form showing real-time validation errors on blur and submit."
    ],
    "deliverable": "Build a multi-field form with touched/error validation and explain context re-rendering trade-offs in an interview.",
    "recallQuiz": [
      {
        "q": "Does React Context trigger re-renders in child components that do NOT call useContext?",
        "a": "No. Only components that consume the context via `useContext(MyContext)` re-render when the context value changes."
      },
      {
        "q": "How can you prevent all consumers of a Context from re-rendering when only one property changes?",
        "a": "Split the context into smaller, focused contexts (e.g., UserContext and UserDispatchContext), or wrap consumers in memoized components."
      },
      {
        "q": "Why are reducers in `useReducer` required to be pure functions?",
        "a": "Because React may invoke reducers multiple times (especially in Strict Mode or concurrent rendering). Side effects inside a reducer break reproducibility and predictable updates."
      }
    ],
    "extra": [
      "useReducer plus Context patterns and re-render cost",
      "React Router: nested routes and protected routes",
      "Server state (TanStack Query) vs client state (Redux Toolkit, Zustand)"
    ]
  },
  {
    "n": 10,
    "title": "API integration, autocomplete & race conditions",
    "phase": "React",
    "theme": "API integration, autocomplete & race conditions",
    "priority": "P1",
    "goal": "Build bulletproof asynchronous UI handling loading, empty, error, and stale states, request cancellation, and pagination.",
    "summary": "Build debounced search with autocomplete, keyboard navigation, race condition prevention, and cursor/infinite pagination.",
    "timeAllocation": "4 hours: 1h async UI architecture & race conditions, 2h building debounced autocomplete, 1h Q&A review",
    "objectives": [
      "Explain race conditions in API-driven UI and demonstrate how fast typing causes older responses to overwrite newer ones.",
      "Implement request cancellation using AbortController inside custom hooks.",
      "Build a full debounced search autocomplete with keyboard navigation (Up, Down, Enter, Escape).",
      "Compare offset-based pagination vs cursor-based pagination for large datasets."
    ],
    "concepts": [
      "API UI state machine: idle -> loading -> success -> error -> empty",
      "Race conditions: network response latency does not match request initiation order",
      "Prevention strategy 1: AbortController aborting superseded requests",
      "Prevention strategy 2: boolean flag / request ID tracking in effect cleanups",
      "Debouncing API requests to protect backends and limit rate limits",
      "Pagination patterns: page/offset, cursor-based pagination, infinite scrolling with IntersectionObserver"
    ],
    "tasks": [
      "Build a debounced search autocomplete component that queries an API, shows a loader, handles empty results, and catches network errors.",
      "Add full keyboard accessibility (Arrow keys navigate suggestions, Enter selects, Escape closes).",
      "Demonstrate how network delays create race conditions and verify that outdated responses are discarded.",
      "Implement an infinite scroll trigger using IntersectionObserver with cleanup."
    ],
    "questions": [
      "What is a race condition in API-driven UI, and how do you prevent it in React?",
      "How do you cleanly represent loading, error, success, and empty states in component architecture?",
      "How does cursor-based pagination differ from offset pagination, and why is it preferred for dynamic feeds?",
      "How would you implement an infinite scroll feed that does not leak memory or duplicate requests?"
    ],
    "coding": [
      "p18",
      "p20",
      "p39"
    ],
    "reactCoding": [
      "Build a complete debounced autocomplete component with keyboard navigation, clear button, and AbortController cancellation."
    ],
    "deliverable": "Demonstrate a live debounced autocomplete component resilient to network delays, with full keyboard navigation and error boundaries.",
    "recallQuiz": [
      {
        "q": "Why is `fetch()` not rejected on HTTP 404 or 500 error codes?",
        "a": "`fetch()` only rejects on network failures or request aborts. HTTP error responses still resolve successfully with `response.ok === false`."
      },
      {
        "q": "How does an AbortController signal that a fetch should be aborted?",
        "a": "You pass `signal: controller.signal` into `fetch(url, { signal })` and call `controller.abort()`, which causes the promise to reject with an `AbortError`."
      },
      {
        "q": "What is the risk of offset pagination when rows are frequently inserted into a database?",
        "a": "Items can shift down while the user pages, causing duplicate items to appear on subsequent pages or items to be skipped completely."
      }
    ],
    "extra": [
      "Cursor vs offset pagination; infinite scroll",
      "Optimistic updates and rollback",
      "Loading, error, empty and retry states"
    ]
  },
  {
    "n": 11,
    "title": "Performance, testing & maintainability",
    "phase": "React",
    "theme": "Performance, testing & maintainability",
    "priority": "P2",
    "goal": "Diagnose performance bottlenecks with evidence, apply code splitting with Suspense, and write meaningful tests using React Testing Library.",
    "summary": "Master React DevTools Profiler, React.memo, useMemo/useCallback costs, React.lazy, Suspense, and RTL testing philosophy.",
    "timeAllocation": "3.5 hours: 1h performance diagnosis & testing philosophy, 1.5h writing tests & code splitting, 1h Q&A review",
    "objectives": [
      "Use the React DevTools Profiler to identify commit times and why components re-rendered.",
      "Explain when `React.memo`, `useMemo`, and `useCallback` hurt performance rather than help.",
      "Implement route-based and component-based code splitting using `React.lazy` and `Suspense`.",
      "Write tests with React Testing Library that test user behavior rather than internal implementation details."
    ],
    "concepts": [
      "Premature optimization vs measured optimization in React",
      "Shallow equality check costs in React.memo and dependencies",
      "Virtualization (react-window) for 10,000+ items vs normal rendering",
      "Code splitting: dynamic import(), React.lazy, Suspense fallback, ErrorBoundary fallback",
      "React Testing Library philosophy: \"The more your tests resemble the way your software is used, the more confidence they can give you.\"",
      "RTL query priority: getByRole -> getByLabelText -> getByPlaceholderText -> getByText -> getByTestId"
    ],
    "tasks": [
      "Optimize a sluggish table with 5,000 rows by memoizing row items and stabilizing callbacks.",
      "Configure lazy loading for a heavy route or modal using React.lazy and Suspense.",
      "Write RTL tests for a Todo app covering: user typing, clicking add, toggling complete, and asserting visible changes.",
      "Explain how you would investigate a reported production lag in a React application."
    ],
    "questions": [
      "How do you investigate unnecessary re-renders in a React application before writing code?",
      "When can useMemo and useCallback make your application slower rather than faster?",
      "What is code splitting with React.lazy and Suspense, and how do you handle chunk loading failures?",
      "What is the core philosophy of React Testing Library, and why should you avoid testing state or component internals directly?"
    ],
    "coding": [
      "p67",
      "p68",
      "p69"
    ],
    "reactCoding": [
      "Implement an optimized virtualized or paginated 5,000-row table and write integration tests validating sort and filter actions."
    ],
    "deliverable": "Explain a structured performance diagnosis process and write 3 behavioral integration tests using React Testing Library queries.",
    "recallQuiz": [
      {
        "q": "Why does passing an inline object `{ color: \"red\" }` to a `React.memo` component defeat memoization?",
        "a": "Because on every parent render, a new object reference is created in memory. React.memo uses shallow equality (`prevProps.style === nextProps.style`), which evaluates to `false`."
      },
      {
        "q": "Why should you prefer `getByRole` over `getByTestId` in React Testing Library?",
        "a": "`getByRole` enforces accessibility and verifies that elements are interactive and discoverable by assistive technologies as real users experience them."
      },
      {
        "q": "What causes chunk load errors with `React.lazy`, and how do you recover?",
        "a": "Deploying a new build often removes old chunk hashes from the server. An Error Boundary catching lazy load failures can prompt the user or trigger a one-time window reload."
      }
    ],
    "extra": [
      "React DevTools Profiler workflow",
      "List virtualization; React.lazy and Suspense",
      "React Testing Library: query by role, not implementation"
    ]
  },
  {
    "n": 12,
    "title": "React live coding & machine-coding practice",
    "phase": "Interview",
    "theme": "React live coding & machine-coding practice",
    "priority": "P1",
    "goal": "Build production-ready React components under strict time constraints while communicating trade-offs clearly.",
    "summary": "Timed machine-coding: Tabs, Accordion, Star Rating, Data Table, and Dropdown with outside-click handling.",
    "timeAllocation": "4 hours: 30m planning checklist, 2.5h building 2 timed components, 1h edge-case & accessibility audit",
    "objectives": [
      "Apply the 4-phase machine coding checklist: Clarify requirements -> Plan state & API -> Build core -> Polish & edge cases.",
      "Implement keyboard navigation and accessibility standards (ARIA, focus management) under time pressure.",
      "Maintain clean separation of concerns, readable state shape, and avoid hardcoding values.",
      "Communicate decisions and trade-offs out loud throughout the coding session."
    ],
    "concepts": [
      "Machine coding time-boxing: 5m requirements, 10m structure & state, 25m core UI, 10m polish",
      "Accessible UI widgets: Tabs (roles tab/tablist/tabpanel, arrow key navigation), Accordions, Modals",
      "Outside click detection: document mousedown listener with ref.current.contains check and cleanup",
      "Separation of container (data/state) vs presentational components",
      "Handling empty states, loading skeletons, and edge-case inputs gracefully"
    ],
    "tasks": [
      "Build a Tabs component in 25 minutes supporting dynamic tabs, disabled state, and keyboard arrow navigation.",
      "Build a Star Rating component in 20 minutes supporting hover preview, click-to-rate, keyboard focus, and reset.",
      "Build a Dropdown/Select in 30 minutes with outside-click detection, keyboard selection, and search filtering.",
      "Review your code for accessibility, clean props naming, and zero console warnings."
    ],
    "questions": [
      "How do you clarify requirements before starting a machine-coding interview?",
      "How do you implement an outside-click handler in React without memory leaks?",
      "How would you make a custom Accordion or Tabs component accessible for screen readers?",
      "What are the first 3 things you check when your component code fails during a live interview?"
    ],
    "coding": [
      "p16",
      "p17",
      "p40",
      "p72",
      "p73"
    ],
    "reactCoding": [
      "Complete two timed machine coding exercises (Tabs and Sortable Table) in under 45 minutes each."
    ],
    "deliverable": "Complete two fully working, accessible UI components under time constraints with zero unhandled edge cases.",
    "recallQuiz": [
      {
        "q": "Why should outside-click listeners be attached to `mousedown` or `pointerdown` instead of `click`?",
        "a": "`click` fires after `mouseup`, which can lead to delayed close or conflict with nested element events; `mousedown` catches the initial boundary contact immediately."
      },
      {
        "q": "What ARIA attributes are required for an accessible Tabs widget?",
        "a": "`role=\"tablist\"` on container, `role=\"tab\"` with `aria-selected` and `aria-controls` on tabs, and `role=\"tabpanel\"` with `aria-labelledby` on content panels."
      },
      {
        "q": "If you run out of time in a machine-coding round, what should you do?",
        "a": "Acknowledge the remaining items clearly, walk through your exact planned implementation for them, and discuss how you would test and handle edge cases."
      }
    ],
    "extra": [
      "Machine-coding checklist: requirements, state, UI, edge cases, a11y",
      "Time-box: 10 min plan, 35 min build, 10 min polish",
      "Narrate trade-offs while you code"
    ]
  },
  {
    "n": 13,
    "title": "Project deep dive & frontend design",
    "phase": "Interview",
    "theme": "Project deep dive & frontend design",
    "priority": "P1",
    "goal": "Present your authentic 3.8-year engineering journey, Angular-to-React transition, production debugging stories, and frontend architecture.",
    "summary": "Craft compelling, authentic STAR stories, explain real production bugs, and practice frontend system design.",
    "timeAllocation": "3.5 hours: 1h crafting authentic STAR stories, 1.5h frontend system design practice, 1h speaking rehearsal",
    "objectives": [
      "Deliver a concise, compelling 90-second \"Tell me about yourself\" that articulates your Angular roots, current React work, and frontend passion.",
      "Structure two authentic STAR stories (one production bug fix, one architecture improvement) without fake metrics.",
      "Design a frontend feature (e.g. infinite feed, autocomplete, or dashboard) using the RADIO system design framework.",
      "Confidently handle follow-up probing questions about technical trade-offs."
    ],
    "concepts": [
      "The authentic 3-4 YOE candidate profile: solid fundamentals, practical engineering, honest ownership, eagerness to grow",
      "The STAR method: Situation, Task, Action (what YOU did specifically), Result (concrete technical and user impact)",
      "Authentic production stories: solving race conditions, diagnosing memory leaks from uncleaned subscriptions, optimizing large table re-renders",
      "Frontend System Design framework (RADIO): Requirements, Architecture, Data Model, Interface/APIs, Optimizations/Trade-offs",
      "Security fundamentals: XSS prevention, dangerouslySetInnerHTML risks, HttpOnly cookies vs localStorage for JWTs"
    ],
    "tasks": [
      "Draft and speak your professional introduction: Angular start -> current React projects -> strengths -> target role.",
      "Draft your production bug story: Describe a real issue you investigated (e.g., memory leak, race condition, or state desynchronization) and its fix.",
      "Practice designing a Photo Feed or Autocomplete Search on a whiteboard or notes using the RADIO framework.",
      "Record yourself answering: \"Tell me about a technical disagreement you had with a teammate.\""
    ],
    "questions": [
      "Tell me about yourself and your frontend journey.",
      "Describe a challenging production bug you investigated and fixed in a React application.",
      "How do you approach frontend system design for a high-traffic autocomplete or dashboard?",
      "How do you protect a React single-page application against Cross-Site Scripting (XSS) and handle authentication tokens safely?"
    ],
    "coding": [
      "p74"
    ],
    "reactCoding": [
      "Sketch and build the state and component skeleton for a dashboard with filters, chart widgets, and error boundaries."
    ],
    "deliverable": "Have your 90-second intro memorized, two authentic STAR stories polished, and be able to diagram a frontend feature with RADIO.",
    "recallQuiz": [
      {
        "q": "Why should you store sensitive JWT session tokens in HttpOnly cookies rather than localStorage?",
        "a": "JavaScript cannot read HttpOnly cookies, which protects them from being stolen if an XSS vulnerability exists on the page."
      },
      {
        "q": "What is the most common mistake candidates make when explaining a project in an interview?",
        "a": "Speaking in vague \"we\" terms about company business instead of articulating their specific personal contributions, architectural decisions, and code."
      },
      {
        "q": "In the RADIO system design framework, what does \"I\" stand for and what should you define?",
        "a": "Interface / API. You should define the endpoints, request/response payloads, pagination strategy, error codes, and caching contracts."
      }
    ],
    "extra": [
      "Frontend system design with the RADIO framework",
      "Accessibility: focus management, ARIA, keyboard support",
      "Security: XSS, token storage, CSRF"
    ]
  },
  {
    "n": 14,
    "title": "Full mock interview simulation",
    "phase": "Interview",
    "theme": "Full mock interview simulation",
    "priority": "P1",
    "goal": "Simulate the full 4-stage interview loop under time pressure to identify and patch final blind spots.",
    "summary": "Complete a timed simulation: 15m Intro & Experience, 30m JS coding, 30m React machine coding, 15m Q&A debrief.",
    "timeAllocation": "4 hours: 1.5h full mock simulation, 1h grading against rubric & gap analysis, 1.5h targeted drills",
    "objectives": [
      "Execute a timed end-to-end interview without checking notes or external AI tools.",
      "Communicate problem-solving thoughts aloud while coding under observation.",
      "Grade your performance against a senior frontend engineering rubric.",
      "Identify your 3 weakest technical topics and build a laser-focused 24-hour review plan."
    ],
    "concepts": [
      "Interview stamina and managing performance anxiety",
      "Thinking aloud: explaining assumptions, edge cases, and alternative approaches continuously",
      "What to do when stuck: ask clarifying questions, start with brute force, trace small examples on paper/comments",
      "Senior evaluation rubric: Communication, Problem Solving, Code Quality, React Mastery, Production Mindset"
    ],
    "tasks": [
      "Run the in-app Mock Interview tool or perform a timed self-run with stopwatch.",
      "Round 1 (15m): Introduction, Angular-to-React transition, and production bug story.",
      "Round 2 (30m): Solve 1 unseen JavaScript problem (e.g., Flatten Array or LRU Cache) and 5 rapid-fire JS questions.",
      "Round 3 (35m): Build 1 machine-coding UI component (e.g., Autocomplete or Accordion) from scratch.",
      "Score yourself honestly: 0 (Missed), 1 (Partial), 2 (Strong) on each dimension."
    ],
    "questions": [
      "Explain closures and solve an array transformation problem live while narrating your steps.",
      "What causes re-renders in React, and how would you optimize a slow list?",
      "Build a working UI component under 30 minutes while handling loading and error states.",
      "What do you do when you get completely stuck on an interview problem?"
    ],
    "coding": [
      "p10",
      "p18",
      "p31"
    ],
    "reactCoding": [
      "Build a live component under 30 minutes with a stopwatch running."
    ],
    "deliverable": "Complete a full 90-minute timed mock interview, document your 3 primary gap areas, and schedule targeted reviews.",
    "recallQuiz": [
      {
        "q": "If an interviewer points out a bug in your code, what is the best immediate response?",
        "a": "Stay calm, thank them, trace through the specific input they mentioned with a test case, explain where the assumption failed, and suggest a clean fix."
      },
      {
        "q": "What is the \"brute force first\" principle in coding rounds?",
        "a": "State a working brute-force solution and its complexity immediately. This guarantees you have a baseline solution before exploring optimizations."
      },
      {
        "q": "What should you do in the final 5 minutes when asked \"Do you have any questions for us?\"",
        "a": "Ask meaningful technical and team culture questions (e.g., testing philosophy, code review standards, tech debt management, onboarding expectations)."
      }
    ],
    "extra": [
      "One 45-minute JS/DSA round plus one machine-coding round back to back",
      "Record yourself answering five behavioural questions",
      "Ask a peer to interrupt with follow-up questions"
    ]
  },
  {
    "n": 15,
    "title": "Final revision, rapid recall & interview readiness",
    "phase": "Interview",
    "theme": "Final revision, rapid recall & interview readiness",
    "priority": "P1",
    "goal": "Consolidate knowledge, review flagged weak topics, rehearse core answers, and enter interview day with high confidence.",
    "summary": "Targeted revision of flagged questions, unsolved edge cases, high-yield cheat sheets, and interview-day strategy.",
    "timeAllocation": "3.5 hours: 1h reviewing flagged weak questions, 1h re-coding 2 previously missed problems, 1.5h final rehearsal",
    "objectives": [
      "Review 100% of questions flagged as \"Needs Practice\" in the Question Bank.",
      "Re-solve your two historically weakest coding problems from scratch with zero hints.",
      "Rehearse high-yield technical explanations: closures, event loop, reconciliation, useEffect dependencies, custom hooks.",
      "Establish a clear, calm game plan for interview day."
    ],
    "concepts": [
      "Active recall vs passive re-reading: testing yourself is 3x more effective than reviewing notes",
      "The 5 high-yield React topics: Reconciliation & keys, useEffect dependencies & cleanup, state snapshots & batching, custom hooks, performance trade-offs",
      "The 5 high-yield JS topics: Closures & scope, Event Loop & microtasks, Promise combinators, `this` & arrow functions, immutability & copying",
      "Interview day mindset: curiosity, partnership with interviewer, structured communication, resilience"
    ],
    "tasks": [
      "Open the Revision view and complete the rapid-fire recall flashcards for all 15 days.",
      "Review your STAR stories one final time out loud.",
      "Re-solve your 2 weakest coding problems from scratch.",
      "Prepare your environment: clean desktop, working microphone/camera, browser bookmarks for React docs."
    ],
    "questions": [
      "What are your strongest frontend technical skills and what distinguishes your engineering work?",
      "Explain a major technical trade-off you evaluated recently and why you chose your solution.",
      "How do you stay up to date with modern React and web platform developments?",
      "Why are you excited about this specific React developer opportunity?"
    ],
    "coding": [
      "p1",
      "p10",
      "p12",
      "p15"
    ],
    "reactCoding": [
      "Perform a final 15-minute quick build of a counter with step and reset to loosen your fingers."
    ],
    "deliverable": "Zero remaining flagged \"Needs Practice\" items, two polished STAR stories ready to deliver, and clear technical fluency.",
    "recallQuiz": [
      {
        "q": "What are the 3 things that trigger a React component re-render?",
        "a": "1. State update inside the component. 2. Parent component re-rendering. 3. Consumed context value changing."
      },
      {
        "q": "Why does `useEffect` need a cleanup function when listening to window events or starting timers?",
        "a": "To avoid memory leaks and multiple duplicate listeners firing simultaneously on subsequent renders or after unmount."
      },
      {
        "q": "What is the single most important rule when solving a coding problem in an interview?",
        "a": "Never write silent code. Always clarify requirements, state edge cases, narrate your thinking, test with an example, and state Big-O complexity."
      }
    ],
    "extra": [
      "Re-solve ticked problems you could not explain",
      "Prepare five questions to ask the interviewer",
      "Skim: closures, event loop, effects, keys, memoization"
    ]
  }
];
