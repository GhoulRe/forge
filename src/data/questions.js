import { practicalQuestions } from './practical/questions.js';

export const questions = [
  {
    "id": "q-closure",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "Explain closures with a practical example.",
    "a": "A closure is formed when an inner function retains access to variables from its outer lexical environment, even after that outer function has returned.\n\nIn JavaScript, functions carry a hidden reference to the scope in which they were defined. A practical everyday example is creating private state, like a counter or factory function:\n`function createCounter() { let count = 0; return () => ++count; }`\nHere, `count` cannot be directly accessed or modified from the outside; it is completely encapsulated.\n\nRegarding memory implications: because the inner function holds a reference to the outer variable environment, the garbage collector cannot clean up those variables as long as the inner function is reachable. If you attach closures to long-lived objects or global event listeners without removing them, it can cause memory leaks.",
    "code": "function createCounter(initial = 0) {\n  let count = initial; // private lexical variable\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\nconst counter = createCounter(10);\ncounter.increment(); // 11\n// count is inaccessible directly from counter.count (undefined)",
    "evaluating": "Checks if you understand lexical scope, the difference between value copies and live variable bindings, and real-world garbage collection / memory management.",
    "followUps": [
      "Do closures store a snapshot of the value or a live reference?",
      "How do closures relate to the classic setTimeout inside a var loop problem?",
      "How does React useState use closures under the hood?"
    ],
    "misconceptions": "Believing closures copy variables by value rather than keeping a live reference binding, or thinking closures only exist when returning a function."
  },
  {
    "id": "q2",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "What is hoisting and what is the temporal dead zone?",
    "a": "Declarations are processed before a scope executes, but they behave differently. Function declarations can be called before their textual position; var is hoisted and initialised to undefined; let and const are in scope but cannot be accessed before initialisation, creating the temporal dead zone.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-debounce-throttle",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "What is the difference between == and ===?",
    "a": "Both debounce and throttle are rate-limiting techniques for high-frequency events, but they solve different problems:\n\nDebounce postpones execution until a specified delay has elapsed since the LAST time the event was triggered. Every new invocation resets the timer.\nUse cases: Search input autocomplete, form field auto-save, window resize calculations after the user stops dragging.\n\nThrottle ensures the function is executed at most once every specified time interval, regardless of how many times the user fires the event.\nUse cases: Infinite scrolling (checking scroll position), tracking mouse movements in a canvas, drag-and-drop operations, and button spam prevention.",
    "code": "// Debounce: executes only after 'delay' ms of silence\nfunction debounce(fn, delay) {\n  let timerId;\n  return function(...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\n// Throttle: executes at most once every 'limit' ms\nfunction throttle(fn, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}",
    "evaluating": "Evaluates your practical understanding of browser performance, timer management, and API rate-limiting.",
    "followUps": [
      "How would you implement a debounce with a leading (immediate) call option?",
      "What memory leaks can occur when using debounce inside React components if unhandled?",
      "How does requestAnimationFrame relate to throttling scroll events?"
    ],
    "misconceptions": "Confusing the two terms or using debounce on a continuous scroll handler that requires periodic UI updates."
  },
  {
    "id": "q4",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "Primitive values vs reference values: what is copied?",
    "a": "Primitives are copied as values. Objects and arrays are assigned by reference value, so two variables may refer to the same object. A shallow copy creates a new outer object but nested objects can still be shared.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q5",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "When should you use map, filter, reduce, find, some, and every?",
    "a": "Use map to transform each item; filter to keep matching items; reduce to accumulate into one result; find to return the first matching element; some to test whether at least one item matches; and every to test whether all items match.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q6",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "How does the event loop order Promise callbacks and setTimeout?",
    "a": "Synchronous JavaScript runs first. Promise reactions and queueMicrotask callbacks enter the microtask queue, which is drained before the next timer/task runs (subject to the host environment). A common example prints synchronous logs, then Promise callbacks, then a zero-delay timer.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q7",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "Promise.all vs Promise.allSettled?",
    "a": "Promise.all fulfils when every input fulfils and rejects as soon as an input rejects. Promise.allSettled waits for all inputs to settle and returns an outcome object for each one. Use all when all results are needed to continue; use allSettled when you need every success/failure outcome.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-debounce-throttle-8",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "What is the difference between debounce and throttle?",
    "a": "Both debounce and throttle are rate-limiting techniques for high-frequency events, but they solve different problems:\n\nDebounce postpones execution until a specified delay has elapsed since the LAST time the event was triggered. Every new invocation resets the timer.\nUse cases: Search input autocomplete, form field auto-save, window resize calculations after the user stops dragging.\n\nThrottle ensures the function is executed at most once every specified time interval, regardless of how many times the user fires the event.\nUse cases: Infinite scrolling (checking scroll position), tracking mouse movements in a canvas, drag-and-drop operations, and button spam prevention.",
    "code": "// Debounce: executes only after 'delay' ms of silence\nfunction debounce(fn, delay) {\n  let timerId;\n  return function(...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\n// Throttle: executes at most once every 'limit' ms\nfunction throttle(fn, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => (inThrottle = false), limit);\n    }\n  };\n}",
    "evaluating": "Evaluates your practical understanding of browser performance, timer management, and API rate-limiting.",
    "followUps": [
      "How would you implement a debounce with a leading (immediate) call option?",
      "What memory leaks can occur when using debounce inside React components if unhandled?",
      "How does requestAnimationFrame relate to throttling scroll events?"
    ],
    "misconceptions": "Confusing the two terms or using debounce on a continuous scroll handler that requires periodic UI updates."
  },
  {
    "id": "q9",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "What are call, apply, and bind?",
    "a": "They let you set the this value for a function. call invokes immediately with arguments individually; apply invokes immediately with an array-like arguments value; bind returns a new function with this (and optionally leading arguments) preset.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-react-rerenders",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "What causes a React component to re-render?",
    "a": "A React component re-renders for exactly 3 reasons:\n1. Its own internal state updates via a setter function (`useState` or `useReducer`).\n2. Its parent component re-renders (which cascades down the tree by default).\n3. It consumes a Context whose Provider value has changed.\n\nCrucially: A re-render does NOT always update the real DOM.\nReact works in two primary phases:\n- Render Phase: React calls your component function, calculates the new Virtual DOM (JSX element tree), and compares (diffs) it with the previous render tree. This is pure JavaScript execution and is fast.\n- Commit Phase: React applies only the minimal necessary differences to the real DOM. If the diff reveals that nothing changed in the rendered output, React touches zero DOM nodes.\n\nTherefore, \"re-rendering\" means calling the component function again to compute UI; it does not mean re-painting the browser screen.",
    "code": "// Changing regular variables or ref does NOT trigger render:\nlet normalVar = 0;\nconst ref = useRef(0);\n\nfunction handleClick() {\n  normalVar++;      // No render!\n  ref.current++;    // No render!\n  setCount(c => c + 1); // RENDER scheduled!\n}",
    "evaluating": "Assesses whether the candidate understands the difference between the Render phase and Commit phase, Virtual DOM diffing, and browser paint costs.",
    "followUps": [
      "How does React.memo change this behavior for child components?",
      "What happens when a component returns the exact same JSX element reference?",
      "Does changing a ref.current schedule a re-render?"
    ],
    "misconceptions": "Believing that every single re-render destroys and re-creates DOM nodes, or that changing props directly triggers re-renders (it is the parent render that causes child re-renders)."
  },
  {
    "id": "q11",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "Does changing a normal variable or a ref trigger a re-render?",
    "a": "No. Changing a regular local variable does not schedule rendering, and changing ref.current does not schedule rendering either. Use state for values that determine UI; refs are useful for mutable values or DOM nodes that do not themselves need to trigger a render.",
    "evaluating": "Evaluates comprehension of React fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q12",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "Why are keys important? Why can array indexes be a problem?",
    "a": "Keys help React match siblings between renders. Prefer stable IDs. If an item is inserted, deleted, or reordered, index keys can cause state or DOM to be associated with the wrong item because positions change. Index keys are reasonable for truly static lists that never reorder or change.",
    "evaluating": "Evaluates comprehension of React fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q13",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "Why can state appear unchanged immediately after a setter?",
    "a": "State behaves as a snapshot for the currently executing render. Calling a setter queues a future render rather than changing the variable in the existing event handler. Use a functional updater such as setCount(c => c + 1) when the next value depends on prior state.",
    "evaluating": "Evaluates comprehension of React fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q14",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "What is reconciliation?",
    "a": "React compares the next element tree with the current one to determine what should change. Element type, position, and keys help React preserve or reset component identity. Reconciliation is not the same as saying that every render causes a full DOM rebuild.",
    "evaluating": "Evaluates comprehension of React fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-useeffect-mental-model",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "When should you use useEffect?",
    "a": "The correct mental model for `useEffect` is synchronization with an external system outside of React (such as browser DOM APIs, network connections, web sockets, timers, or non-React widgets).\n\nWhen you SHOULD use useEffect:\n- Subscribing to an external event listener (e.g. window resize or scroll).\n- Initiating network fetch requests based on props/state changes.\n- Setting up and tearing down intervals or timeouts.\n- Interfacing with third-party imperatively driven DOM libraries (maps, charts).\n\nWhen you should AVOID useEffect:\n1. Transforming data for rendering: Do not copy a prop into state or use an effect to filter a list. Compute derived values directly in the render body or wrap with `useMemo` if expensive.\n2. Handling user events: Logic triggered by a user action (e.g. clicking \"Submit\" or \"Buy\") belongs directly in the event handler, not in an effect triggered by a state flag.\n3. Resetting state on prop change: Prefer key-based resets (`<Profile key={userId} />`) or deriving state during render.",
    "code": "// ANTI-PATTERN: Redundant state and extra render pass\nconst [fullName, setFullName] = useState('');\nuseEffect(() => {\n  setFullName(firstName + ' ' + lastName); // Bad: causes extra re-render!\n}, [firstName, lastName]);\n\n// CORRECT: Derived value during render (0 extra renders, 0 bugs)\nconst fullName = firstName + ' ' + lastName;\n\n// If calculation is truly expensive (e.g. filtering 5,000 items):\nconst visibleTodos = useMemo(() => {\n  return todos.filter(t => t.text.includes(query));\n}, [todos, query]);",
    "evaluating": "Tests whether you understand modern React architecture without falling into common beginner traps of overusing effects.",
    "followUps": [
      "What happens if you omit a used variable from the useEffect dependency array?",
      "Why does React Strict Mode execute effects twice in development?",
      "How do you write an effect that only runs on updates and skips the initial mount?"
    ],
    "misconceptions": "Treating useEffect as a 1:1 replacement for lifecycle methods (componentDidMount, componentDidUpdate). It is a synchronization mechanism."
  },
  {
    "id": "q16",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "useEffect cleanup: when does it run?",
    "a": "Cleanup runs before the Effect runs again with changed dependencies and when the component unmounts. In development Strict Mode, React may perform an extra setup/cleanup cycle to reveal unsafe effects. Use cleanup to unsubscribe, disconnect, or cancel/ignore obsolete work.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q17",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "useRef vs useState?",
    "a": "State updates schedule a render, so use it for data displayed in the UI. Ref updates do not schedule a render, so use refs for DOM elements, timer IDs, or mutable values that need to persist across renders but are not themselves render output.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-usememo-usecallback",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "When are useMemo, useCallback, and React.memo useful?",
    "a": "All three are memoization tools designed to optimize re-rendering performance:\n\n1. `useMemo`: Caches the result of a computationally expensive calculation between renders based on dependencies: `const val = useMemo(() => compute(a), [a])`.\n2. `useCallback`: Caches a function definition instance between renders: `const fn = useCallback(() => doSomething(a), [a])`. It is syntactic sugar for `useMemo(() => fn, [deps])`.\n3. `React.memo`: A higher-order component that wraps a component to skip re-rendering if its props have not changed (via shallow equality comparison).\n\nWhen they ARE useful:\n- Passing callbacks or object props to a child component wrapped in `React.memo`. Without `useCallback`, a new function reference is created on every parent render, breaking `React.memo`.\n- Expensive calculations (e.g. sorting or filtering thousands of items).\n- Stabilizing an object or function that is used as a dependency in another `useEffect`.\n\nWhen they HURT performance:\n- Overusing them on trivial calculations (like string concatenation or basic math). Memoization has costs: allocating dependency arrays, comparing dependencies on every render, and memory overhead. If the calculation is cheaper than the comparison, you are slowing down your app.",
    "code": "// Good use: Child is memoized, so callback identity MUST be stable\nconst Child = React.memo(({ onSelect }) => {\n  return <button onClick={onSelect}>Click me</button>;\n});\n\nfunction Parent({ id }) {\n  // useCallback prevents Child from re-rendering when other Parent state changes\n  const handleSelect = useCallback(() => {\n    sendAnalytics(id);\n  }, [id]);\n\n  return <Child onSelect={handleSelect} />;\n}",
    "evaluating": "Evaluates your maturity in frontend performance optimization—whether you optimize deliberately based on profiling or blindly wrap everything in hooks.",
    "followUps": [
      "Why is useCallback useless if the child component is NOT wrapped in React.memo?",
      "How do you measure if a calculation is actually expensive using performance.now() or React Profiler?",
      "What is React Compiler (React Forget) and how does it automate this?"
    ],
    "misconceptions": "Wrapping every function in useCallback by default. Unless passed to a memoized child or effect dependency array, it provides zero performance benefit."
  },
  {
    "id": "q-race-conditions-api",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "How do you prevent stale API responses from replacing new results?",
    "a": "A race condition occurs when user input triggers multiple asynchronous requests in rapid succession (e.g. typing \"r\", \"re\", \"react\"). Because network responses arrive out of order, the response for the older query (\"re\") may resolve AFTER the response for the newer query (\"react\"), causing outdated results to overwrite fresh ones.\n\nTwo standard solutions in React:\n1. `AbortController` (Preferred):\nIn the effect, create an `AbortController` and pass its `signal` to `fetch(url, { signal })`. In the effect's cleanup function, call `controller.abort()`. When the user types the next character or unmounts, the in-flight request is immediately cancelled by the browser, freeing network and CPU resources.\n\n2. Boolean Flag / Request ID:\nUse an `active` flag inside the effect. In the cleanup, set `active = false`. When the fetch promise resolves, only update state if `active` is still true. Outdated responses are simply ignored.",
    "code": "// Method 1: AbortController in useEffect cleanup\nuseEffect(() => {\n  if (!query) {\n    setResults([]);\n    return;\n  }\n  const controller = new AbortController();\n\n  async function search() {\n    setIsLoading(true);\n    try {\n      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {\n        signal: controller.signal\n      });\n      const data = await res.json();\n      setResults(data);\n      setError(null);\n    } catch (err) {\n      if (err.name !== 'AbortError') {\n        setError(err.message);\n      }\n    } finally {\n      setIsLoading(false);\n    }\n  }\n\n  search();\n  return () => controller.abort(); // Cancel previous request!\n}, [query]);",
    "evaluating": "Tests real-world production data fetching expertise, cleanup handling, and preventing subtle UI state corruption bugs.",
    "followUps": [
      "Why must you check err.name !== \"AbortError\" in the catch block?",
      "How does TanStack Query / React Query handle request cancellation under the hood?",
      "What happens if you combine debouncing with AbortController?"
    ],
    "misconceptions": "Believing debouncing alone prevents race conditions. A debounced query can still experience variable server latency where request 1 arrives after request 2."
  },
  {
    "id": "q20",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "Context API vs prop drilling vs a state library?",
    "a": "Props make data flow explicit for local component trees. Context can distribute values to many consumers without threading props through every level, but changing context can update its consumers. A dedicated state library may help when shared state, workflows, debugging, or caching needs justify the extra abstraction.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q21",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "Tell me about yourself for a React developer role.",
    "a": "Use a concise structure: overall frontend experience; your starting point in Angular; the React work you do today; a couple of relevant strengths or examples; and the kind of React role you are targeting. Keep every claim grounded in your actual work and be precise about how much hands-on React experience you have.",
    "evaluating": "Evaluates comprehension of Project & experience fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-walk-through-project",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "Walk me through a project you worked on.",
    "a": "Structure your walkthrough into 4 clear parts: Context, Architecture, Your Personal Ownership, and a Technical Challenge:\n\n1. Product Context (30 seconds):\n\"I worked on an internal customer management dashboard used by operations teams to track client workflows, view analytics, and manage support tickets in real time.\"\n\n2. Architecture & Tech Stack (45 seconds):\n\"The frontend was built with React and TypeScript, using React Router for navigation, Context and custom hooks for shared session state, and Axios/Fetch with custom hooks for data fetching. The UI was componentized into reusable design system primitives (inputs, modals, tables).\"\n\n3. Your Concrete Ownership (45 seconds):\n\"My primary responsibility was building the interactive ticket management module. This included a sortable, filterable data table with pagination, a detailed modal viewer with form validation, and real-time status updates. I owned the component boundaries, form state validation, and API integration for this entire module.\"\n\n4. Technical Challenge & Trade-off (45 seconds):\n\"A key challenge was rendering table performance when viewing high volumes of ticket records. Initially, the table suffered from re-render lag when users filtered by status. I identified that row callbacks were being recreated every render, and sorting was re-running unnecessarily. I separated the raw data from derived sorted data using useMemo and memoized the row components, bringing interactions back to 60fps.\"",
    "code": "// Walkthrough structure:\n// 1. Context (What the app does, who uses it)\n// 2. Stack (React, TS, state management, API layer)\n// 3. Your Ownership (Exact features YOU personally built)\n// 4. Engineering Trade-off / Performance challenge",
    "evaluating": "Assesses whether you can speak clearly about your actual code, distinguish your work from your team's work, and explain technical trade-offs.",
    "followUps": [
      "If you had to rebuild that feature from scratch today, what would you change?",
      "How did your team handle code reviews and testing on that project?",
      "How did you coordinate with backend engineers on API contracts?"
    ],
    "misconceptions": "Talking in abstract \"we\" terms about the whole company or product roadmap without ever explaining what YOU actually coded."
  },
  {
    "id": "q23",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "Describe a production bug or difficult issue you solved.",
    "a": "Use situation, investigation, root cause, action, and result. Mention how you reproduced the issue, what evidence narrowed the cause, how you verified the fix, and any test or monitoring that prevented recurrence. Use a real story and quantify the result only when you can support it.",
    "evaluating": "Evaluates comprehension of Project & experience fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q24",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "Why are you moving toward a React-focused role?",
    "a": "Connect your existing frontend experience to the work you now do in React. Explain what you enjoy about building user interfaces, how you are deepening your React skills, and why the role fits the direction you want to grow. Avoid portraying Angular as a weakness; focus on transferable concepts and real React examples.",
    "evaluating": "Evaluates comprehension of Project & experience fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q25",
    "cat": "JavaScript",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "How does prototypal inheritance work, and what does class syntax do?",
    "a": "Every object has an internal prototype link; property lookup walks the chain until it finds the key or reaches null. class is syntax over constructor functions: methods live on Class.prototype, extends links prototypes, and super calls the parent. Know Object.create and Object.hasOwn.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q26",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "How is this determined, and how do arrow functions differ?",
    "a": "For normal functions this depends on the call site: obj.method(), a plain call (undefined in strict mode), new, or explicit call/apply/bind. Arrow functions have no own this and capture it lexically, which suits callbacks but not object methods that need dynamic this.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q27",
    "cat": "JavaScript",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "What are currying and partial application, and when are they useful?",
    "a": "Currying turns f(a,b,c) into f(a)(b)(c); partial application pre-fills some arguments. Both help build configured, reusable functions and compose behaviour. Be ready to implement curry using fn.length.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q28",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "Shallow vs deep copy: how do you clone safely?",
    "a": "Spread and Object.assign copy one level only. structuredClone handles nested data, Dates, Maps, Sets and cycles, but not functions or DOM nodes. JSON.parse(JSON.stringify(x)) drops undefined and functions and turns Dates into strings. Interviewers may ask for a recursive clone.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q29",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "When does || go wrong compared with ?? and ?.",
    "a": "|| falls back for any falsy value, so 0, empty string and false get replaced, a classic bug with counts and flags. ?? falls back only for null or undefined. ?. short-circuits to undefined when the left side is null or undefined.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q30",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "ES modules vs CommonJS: what is tree shaking?",
    "a": "ESM uses static import/export, so bundlers can see which exports are unused and drop them (tree shaking). CommonJS require is dynamic and runs at runtime. ESM also gives live bindings and top-level await.",
    "evaluating": "Evaluates comprehension of JavaScript fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-controlled-uncontrolled",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "Controlled vs uncontrolled components: when do you use each?",
    "a": "The difference lies in where the single source of truth for the form data lives:\n\nControlled Component: The form element's value is controlled entirely by React state.\n- Driven via `value` and `onChange` props.\n- Advantages: Instant validation on every keystroke, conditional disabling of submit buttons, formatting inputs on the fly (e.g. credit card mask), and keeping UI synchronized.\n- Trade-off: Triggers a component re-render on every single keystroke.\n\nUncontrolled Component: The form element's value is managed natively by the DOM itself.\n- You access the value using a `ref` or by querying native `new FormData(e.currentTarget)` on form submission.\n- Advantages: Better raw performance for massive forms with dozens of fields, simpler integration with non-React libraries, and natural handling of file inputs (`<input type=\"file\" />`).\n\nDecision guide: Default to controlled components for complex interactive inputs requiring live validation or formatting. Use uncontrolled components for simple forms (reading values only on submit) or file uploads.",
    "code": "// Controlled\nfunction ControlledInput() {\n  const [val, setVal] = useState('');\n  return <input value={val} onChange={e => setVal(e.target.value)} />;\n}\n\n// Uncontrolled (via ref or native FormData)\nfunction UncontrolledForm() {\n  const inputRef = useRef();\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log(inputRef.current.value);\n    // Or via FormData:\n    const data = new FormData(e.currentTarget);\n    console.log(data.get('username'));\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"username\" ref={inputRef} defaultValue=\"\" />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}",
    "evaluating": "Tests component design, understanding of DOM vs React state, and form architecture.",
    "followUps": [
      "Why is an <input type=\"file\"> always an uncontrolled component?",
      "What warning does React throw if value changes from undefined to a string?",
      "How do libraries like React Hook Form leverage uncontrolled components for performance?"
    ],
    "misconceptions": "Assuming uncontrolled components are an anti-pattern. They are standard React patterns and often much faster for large data-entry forms."
  },
  {
    "id": "q32",
    "cat": "React",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "What are error boundaries and what do they not catch?",
    "a": "A class component with getDerivedStateFromError or componentDidCatch that renders fallback UI when a child throws during rendering. They do not catch event-handler errors, async code, server rendering, or errors in the boundary itself. react-error-boundary is the usual wrapper.",
    "evaluating": "Evaluates comprehension of React fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q33",
    "cat": "React",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "What are portals, and how do refs reach a child DOM node?",
    "a": "createPortal renders children into another DOM node, such as document.body, while keeping React tree behaviour and event bubbling. It suits modals and tooltips that must escape overflow or z-index. Refs reach children through forwardRef, or as a normal prop in newer React versions.",
    "evaluating": "Evaluates comprehension of React fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-state-snapshot-batching",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "What changed with automatic batching and concurrent features in React 18?",
    "a": "In React, state variables are not mutable storage slots; state behaves as a snapshot for a specific render execution.\nWhen you call `setCount(count + 1)`, you are not mutating the `count` variable in place; you are requesting React to schedule a future render where `count` will be the new value. Within the currently running function execution, `count` remains constant.\n\nIf you call `setCount(count + 1)` three times in a row within the same click event, all three evaluate to `setCount(0 + 1)`. To chain updates within the same event, you must pass a functional updater: `setCount(prev => prev + 1)`.\n\nRegarding batching: Batching is React grouping multiple state updates into a single re-render for performance.\nBefore React 18, React only batched updates inside React synthetic event handlers. Updates inside `setTimeout`, `fetch` callbacks, or native event listeners triggered separate renders for each state setter.\nIn React 18, Automatic Batching batches state updates everywhere by default across Promises, timeouts, and native events. You can opt out with `flushSync` if immediate synchronous DOM read is required.",
    "code": "// React 18: Both updates are automatically batched into ONE render\nfunction handleFetch() {\n  fetch('/api/user').then(() => {\n    setIsLoading(false);\n    setUser(data);\n    // React 17: triggered 2 separate renders\n    // React 18: automatically batched into 1 single render!\n  });\n}\n\n// State snapshot demonstration:\nfunction handleClick() {\n  setCount(count + 1); // If count was 0, schedules render with 1\n  setCount(count + 1); // Still schedules render with 1!\n  // To get 2: setCount(c => c + 1); setCount(c => c + 1);\n}",
    "evaluating": "Tests comprehension of React execution model, functional state updates, and React 18 concurrency improvements.",
    "followUps": [
      "When would you need to use ReactDOM.flushSync()?",
      "Why does React StrictMode run renders twice in development?",
      "How do functional state updates guarantee access to the latest pending state?"
    ],
    "misconceptions": "Thinking that setState immediately updates the local variable, or believing batching only works in synchronous click handlers in modern React."
  },
  {
    "id": "q35",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "You know Angular: how does React differ conceptually?",
    "a": "Angular is a full framework with templates, dependency injection, RxJS and zone-based change detection. React is a UI library with JSX, one-way data flow, hooks and explicit state updates, so you choose routing and data tools yourself. Frame it as an ecosystem choice, not a verdict.",
    "evaluating": "Evaluates comprehension of React fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q36",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "useState vs useReducer: when do you switch?",
    "a": "Use useReducer when state has several related fields, transitions follow named actions, or the next state depends on complex rules. It centralises logic, is easy to test as a pure function, and pairs well with Context for shared state.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q37",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "What are the Rules of Hooks, and what makes a good custom hook?",
    "a": "Call hooks only at the top level of components or other hooks, never in loops, conditions or nested functions, so React can match them by call order. A good custom hook has one responsibility, a clear return shape, and cleans up what it starts.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q38",
    "cat": "Hooks & performance",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "How do you debug an effect that loops forever or reads stale values?",
    "a": "Loops usually come from object, array or function dependencies recreated every render, or setState inside an effect without a guard. Stale values come from missing dependencies. Fixes: functional updaters, move values inside the effect, stabilise references only when needed, or keep the latest value in a ref.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q39",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "useEffect vs useLayoutEffect?",
    "a": "useEffect runs after the browser paints; useLayoutEffect runs after DOM updates but before paint, blocking it. Use useLayoutEffect only to measure or adjust layout and avoid flicker; default to useEffect.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q40",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "How would you render 10,000 rows efficiently?",
    "a": "Virtualise (react-window or similar) so only visible rows mount, or paginate. Keep stable keys, memoise row components, avoid heavy work in render, and move filtering and sorting server-side if the data set is large.",
    "evaluating": "Evaluates comprehension of Hooks & performance fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-code-splitting-lazy",
    "cat": "Hooks & performance",
    "priority": "P2",
    "lvl": "Important",
    "q": "What is code splitting with React.lazy and Suspense?",
    "a": "Code splitting breaks down a large monolithic JavaScript bundle into smaller, on-demand chunks that are loaded only when the user navigates to a specific route or activates a feature.\n\nHow it works in React:\n- `React.lazy(() => import('./HeavyComponent'))` uses dynamic ES modules import to load the component chunk asynchronously.\n- `Suspense` wraps the lazy component and displays a fallback UI (like a loading spinner or skeleton) while the chunk downloads over the network.\n\nHandling failure:\nNetwork drops or deploying a new production build with fresh chunk hashes can cause dynamic imports to fail with chunk load errors.\nTo handle this robustly:\n1. Always wrap `Suspense` boundaries in an `ErrorBoundary`.\n2. The ErrorBoundary can render a friendly retry prompt: \"Update available. Please refresh.\"\n3. You can also implement automatic retry wrappers around the dynamic import function before failing.",
    "code": "import { lazy, Suspense } from 'react';\nimport ErrorBoundary from './ErrorBoundary';\n\nconst AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));\n\nfunction ReportsPage() {\n  return (\n    <ErrorBoundary fallback={<p>Failed to load dashboard. <button onClick={() => window.location.reload()}>Reload</button></p>}>\n      <Suspense fallback={<div className=\"skeleton-loader\">Loading analytics...</div>}>\n        <AnalyticsDashboard />\n      </Suspense>\n    </ErrorBoundary>\n  );\n}",
    "evaluating": "Assesses knowledge of web performance, bundling (Vite/Webpack), core web vitals (LCP), and defensive resilience.",
    "followUps": [
      "What is route-based code splitting versus component-based splitting?",
      "How does code splitting impact Core Web Vitals like Largest Contentful Paint (LCP)?",
      "What are Error Boundaries and what types of errors do they NOT catch?"
    ],
    "misconceptions": "Thinking Suspense catches errors. Suspense only handles pending promises/loading states; Error Boundaries catch rejections and render errors."
  },
  {
    "id": "q42",
    "cat": "Architecture & testing",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "Server state vs client state: when would you use TanStack Query or Redux Toolkit?",
    "a": "Server state is remote data that goes stale and needs caching, refetching, deduping and retries, which TanStack Query handles. Client state such as UI flags or wizard steps suits useState, Context, Zustand or Redux Toolkit when many distant components share it with complex updates.",
    "evaluating": "Evaluates comprehension of Architecture & testing fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-rtl-testing",
    "cat": "Architecture & testing",
    "priority": "P2",
    "lvl": "Important",
    "q": "How do you test a React component?",
    "a": "React Testing Library (RTL) is built on the guiding principle: \"The more your tests resemble the way your software is used, the more confidence they can give you.\"\n\nWhy avoid testing implementation details (like component state names, internal methods, or component hierarchy):\n1. Fragile tests: Refactoring code (e.g. renaming a state variable from `isOpen` to `isExpanded`) breaks implementation tests even though user-facing behavior is 100% intact.\n2. False confidence: Passing tests don't guarantee the user can actually interact with the UI (e.g. a hidden button might pass state checks).\n\nRTL best practices:\n- Query by accessibility roles and user-facing labels: `screen.getByRole('button', { name: /submit/i })`, `screen.getByLabelText(/email/i)`.\n- Use `userEvent` rather than `fireEvent` to simulate realistic multi-step browser interactions (focus, keydown, click).\n- Mock at the network boundary (e.g. with Mock Service Worker / MSW) rather than mocking custom hooks or API utility modules.",
    "code": "import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport LoginForm from './LoginForm';\n\ntest('submits user credentials and displays success message', async () => {\n  const user = userEvent.setup();\n  render(<LoginForm onLogin={mockLogin} />);\n\n  // Query as a user/screen-reader sees it\n  await user.type(screen.getByLabelText(/email address/i), 'alex@test.com');\n  await user.type(screen.getByLabelText(/password/i), 'SecurePass123!');\n  await user.click(screen.getByRole('button', { name: /sign in/i }));\n\n  expect(await screen.findByText(/welcome back, alex/i)).toBeInTheDocument();\n});",
    "evaluating": "Tests software testing maturity, maintainability, and accessibility (a11y) awareness.",
    "followUps": [
      "What is the difference between getBy, queryBy, and findBy?",
      "Why is userEvent preferred over fireEvent?",
      "How do you test asynchronous state changes and avoid act(...) warnings?"
    ],
    "misconceptions": "Testing internal state directly (like inspecting wrapper.state() from old Enzyme tests) or querying elements by CSS class names."
  },
  {
    "id": "q44",
    "cat": "Architecture & testing",
    "priority": "P1",
    "lvl": "Core",
    "q": "CSR vs SSR vs SSG: what is hydration?",
    "a": "CSR renders in the browser; SSR renders HTML per request; SSG builds HTML ahead of time. Hydration attaches React event handlers to server-rendered HTML. Trade-offs are first paint, SEO, server cost and freshness. Mismatches between server and client output cause hydration errors.",
    "evaluating": "Evaluates comprehension of Architecture & testing fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q45",
    "cat": "Architecture & testing",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "How would you build an accessible modal or dropdown?",
    "a": "Use semantic roles and aria attributes (role=dialog, aria-modal, labels), move focus in on open and restore it on close, trap Tab inside a modal, close on Escape and outside click, lock background scroll, and render through a portal.",
    "evaluating": "Evaluates comprehension of Architecture & testing fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-frontend-security",
    "cat": "Architecture & testing",
    "priority": "P2",
    "lvl": "Important",
    "q": "How do you protect a React app from XSS and handle tokens?",
    "a": "Cross-Site Scripting (XSS) occurs when malicious JavaScript is injected and executed in the user's browser.\n\nHow React helps:\nReact automatically escapes values embedded in JSX expressions (`<div>{userInput}</div>`), converting special characters into safe HTML entities before rendering. This protects against common string injection.\n\nWhere vulnerabilities still arise in React:\n1. `dangerouslySetInnerHTML`: Never use it with unsanitized user content. If rich text is required, sanitize it first using an established library like DOMPurify.\n2. Direct URL manipulation: `<a href={userWebsite}>` can execute JavaScript if the user submits a `javascript:...` URI. Always validate URL protocols to only allow `http:` and `https:`.\n3. Server-side rendering (SSR) data injection into `window.__INITIAL_STATE__`.\n\nToken Storage:\n- `localStorage` / `sessionStorage`: Vulnerable to XSS. If an attacker executes any script on your page, they can read all tokens from storage and impersonate the user.\n- Preferred approach: Store authentication/session tokens in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie. JavaScript cannot read HttpOnly cookies via `document.cookie`, neutralizing token theft via XSS. Combine this with CSRF tokens or modern SameSite cookie policies to prevent Cross-Site Request Forgery.",
    "code": "// Vulnerable:\n// <a href={userProvidedUrl}>Website</a> // Could be \"javascript:stealTokens()\"\n\n// Protected:\nfunction SafeLink({ href, children }) {\n  const isSafe = /^https?:\\/\\//i.test(href);\n  return isSafe ? <a href={href} target=\"_blank\" rel=\"noopener noreferrer\">{children}</a> : null;\n}\n\n// Sanitizing rich HTML with DOMPurify:\nimport DOMPurify from 'dompurify';\nfunction RichContent({ html }) {\n  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;\n}",
    "evaluating": "Tests web security fundamentals, practical risk assessment, and authentication architectural standards.",
    "followUps": [
      "What is Content Security Policy (CSP) and how does it prevent XSS?",
      "What is the difference between SameSite=Lax and SameSite=Strict cookies?",
      "Why is rel=\"noopener noreferrer\" important on external links?"
    ],
    "misconceptions": "Claiming localStorage is completely safe for JWTs as long as you encode them in base64. Base64 is encoding, not encryption; any script can read it."
  },
  {
    "id": "q47",
    "cat": "Architecture & testing",
    "priority": "P1",
    "lvl": "Core",
    "q": "How would you structure a large React codebase?",
    "a": "Group by feature (components, hooks, API calls and tests colocated), keep a small shared UI and utilities layer, use consistent naming, TypeScript, linting and absolute imports, and avoid deep cross-feature imports that create hidden coupling.",
    "evaluating": "Evaluates comprehension of Architecture & testing fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q48",
    "cat": "Architecture & testing",
    "priority": "P2",
    "lvl": "Advanced",
    "q": "Frontend system design: how do you approach building a news feed or autocomplete?",
    "a": "Use a structure such as RADIO: Requirements, Architecture (component tree), Data model and state, Interface (API, pagination, errors), Optimisations (caching, virtualisation, debouncing, accessibility). State assumptions and trade-offs out loud.",
    "evaluating": "Evaluates comprehension of Architecture & testing fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q49",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "Tell me about a disagreement with a teammate or reviewer.",
    "a": "Pick a real, low-drama example. Describe both positions fairly, how you used evidence (benchmarks, user impact, a prototype) to decide, and what you learned. Show you can disagree and still commit.",
    "evaluating": "Evaluates comprehension of Project & experience fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q50",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "How do you break down and estimate a feature with unclear requirements?",
    "a": "Clarify the goal and users first, list assumptions and open questions, slice the work into thin vertical increments, call out risks and dependencies, give a range rather than a single number, and share progress early.",
    "evaluating": "Evaluates comprehension of Project & experience fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q51",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "What questions would you ask the interviewer?",
    "a": "Ask about how the team ships and reviews code, how they handle tech debt and testing, what success looks like in the first 90 days, and the biggest frontend challenge right now. Avoid questions answered on the careers page.",
    "evaluating": "Evaluates comprehension of Project & experience fundamentals and practical trade-offs.",
    "followUps": [
      "How does this behave in edge cases or under high load?",
      "What common bugs or anti-patterns arise here in production?"
    ],
    "misconceptions": "Confusing standard runtime behavior with framework-specific optimizations."
  },
  {
    "id": "q-hoisting-tdz",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "What is hoisting, how does it differ between var, let, and const, and what is the TDZ?",
    "a": "Hoisting is the JavaScript engine's behavior of reserving memory for declarations during the creation phase before executing code.\n\nFunction declarations are hoisted completely with their implementation, meaning you can call them before their declaration line.\n`var` declarations are hoisted and initialized immediately with `undefined`. If you access a `var` before its declaration, it returns `undefined` instead of throwing.\n\n`let` and `const` are also hoisted into their block scope, but they remain uninitialized. The window of time between when their scope is entered and when the declaration line executes is known as the Temporal Dead Zone (TDZ). Accessing a `let` or `const` in the TDZ throws a `ReferenceError`.",
    "code": "console.log(a); // undefined (var is hoisted and initialized to undefined)\nvar a = 1;\n\n// console.log(b); // ReferenceError: Cannot access 'b' before initialization (TDZ)\nlet b = 2;\n\ngreet(); // \"Hello\" (Function declarations are hoisted completely)\nfunction greet() { return \"Hello\"; }\n\n// sayHi(); // TypeError: sayHi is not a function (var initialized to undefined)\nvar sayHi = () => \"Hi\";",
    "evaluating": "Evaluates your comprehension of the JS execution lifecycle (compilation/creation phase vs execution phase) and modern ES6 scoping rules.",
    "followUps": [
      "Are function expressions hoisted the same way as function declarations?",
      "Why did TC39 introduce the Temporal Dead Zone for let and const?",
      "What happens if you use typeof on an undeclared variable vs a let variable in the TDZ?"
    ],
    "misconceptions": "Saying let and const are not hoisted at all. They ARE hoisted to their enclosing block scope, which is precisely why they shadow outer variables and trigger the TDZ."
  },
  {
    "id": "q-event-loop",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "Explain the JavaScript event loop, microtasks, and macrotasks with an execution order example.",
    "a": "JavaScript is single-threaded with one call stack. When asynchronous APIs (like setTimeout, fetch, or DOM events) are called, the browser or Node runtime handles them in the background.\n\nWhen an async task completes, its callback is placed in one of two queues:\n1. The Microtask Queue: Promises (then/catch/finally), queueMicrotask, MutationObserver, and async/await continuations.\n2. The Macrotask / Task Queue: setTimeout, setInterval, setImmediate, and I/O callbacks.\n\nThe Event Loop continuously checks: if the Call Stack is empty, it FIRST drains the entire Microtask Queue to completion. Only once all microtasks are finished does it take ONE task from the Macrotask Queue, execute it, and then check the Microtask Queue again before rendering. This means microtasks always have strict priority over macrotasks.",
    "code": "console.log('1: sync');\n\nsetTimeout(() => {\n  console.log('2: macrotask (setTimeout)');\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log('3: microtask 1 (promise)');\n}).then(() => {\n  console.log('4: microtask 2 (promise chained)');\n});\n\nqueueMicrotask(() => {\n  console.log('5: microtask 3 (queueMicrotask)');\n});\n\nconsole.log('6: sync');\n\n// Output order: 1, 6, 3, 5, 4, 2",
    "evaluating": "Tests your mental model of asynchronous JavaScript execution, UI thread blocking, and debugging complex async sequences.",
    "followUps": [
      "What happens to browser rendering if a microtask recursively enqueues more microtasks?",
      "How does async/await translate into the microtask queue?",
      "Where does requestAnimationFrame fit into the event loop cycle?"
    ],
    "misconceptions": "Thinking setTimeout(fn, 0) runs immediately on the next CPU tick. It always waits for the current synchronous script AND all queued microtasks to drain."
  },
  {
    "id": "q-this-arrow",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "How is `this` determined in regular functions versus arrow functions?",
    "a": "In regular functions, `this` is dynamically determined by how the function is called at runtime:\n1. Implicit binding: `obj.method()` sets `this` to `obj`.\n2. Explicit binding: `fn.call(context)`, `fn.apply(context)`, or `fn.bind(context)` explicitly sets `this`.\n3. Constructor binding: `new Fn()` creates a new object and binds `this` to it.\n4. Default binding: A standalone call `fn()` sets `this` to `undefined` in strict mode (or `window` in non-strict).\n\nArrow functions do NOT have their own `this` binding. Instead, they resolve `this` lexically from their enclosing scope at declaration time, just like any normal variable. Therefore, calling `.call()`, `.apply()`, or `.bind()` on an arrow function has no effect on its `this`.",
    "code": "const user = {\n  name: 'Alex',\n  regular() {\n    return this.name;\n  },\n  arrow: () => {\n    return this.name;\n  },\n  delayed() {\n    setTimeout(function() {\n      // In regular callback, 'this' defaults to window/undefined\n      console.log('Regular:', this?.name);\n    }, 50);\n    setTimeout(() => {\n      // Arrow function lexically captures 'this' from delayed()\n      console.log('Arrow:', this.name);\n    }, 50);\n  }\n};\n\nuser.regular(); // \"Alex\"\nuser.arrow();   // undefined (lexical this is global/module scope)\nuser.delayed(); // Regular: undefined, Arrow: \"Alex\"",
    "evaluating": "Tests whether you understand execution context vs lexical scope and can avoid classic UI event handler bugs.",
    "followUps": [
      "What is the difference between call, apply, and bind?",
      "Why shouldn't you use arrow functions for object methods or prototype methods?",
      "What happens when you use an arrow function inside a React class component vs functional component?"
    ],
    "misconceptions": "Thinking arrow functions bind this to the object they are written inside. Objects do not create a lexical scope; only functions and blocks do."
  },
  {
    "id": "q-promise-combinators",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "Compare Promise.all, Promise.allSettled, Promise.race, and Promise.any.",
    "a": "JavaScript provides 4 Promise combinators for managing concurrent asynchronous tasks:\n\n1. `Promise.all`: Fulfils when ALL input promises fulfil, returning an array of results. It rejects immediately (\"fail-fast\") if any single promise rejects. Use when all pieces of data are mandatory to render a page.\n\n2. `Promise.allSettled`: Waits for ALL promises to complete regardless of success or failure. Returns an array of descriptor objects: `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`. Use when independent tasks run and partial success is acceptable (e.g. logging metrics, multiple third-party widgets).\n\n3. `Promise.race`: Settles as soon as the FIRST promise settles (whether fulfilled or rejected). Common use: setting a network request timeout against a delay promise.\n\n4. `Promise.any`: Fulfils as soon as the FIRST promise fulfils. It only rejects if ALL promises reject, returning an `AggregateError`. Use when you query multiple redundant endpoints or CDN mirrors for the fastest response.",
    "code": "const p1 = Promise.resolve('Data A');\nconst p2 = Promise.reject(new Error('Failed B'));\n\n// Promise.all rejects immediately with Error('Failed B')\nPromise.all([p1, p2]).catch(err => console.log('all failed:', err.message));\n\n// Promise.allSettled resolves both:\nPromise.allSettled([p1, p2]).then(results => {\n  // [\n  //   { status: 'fulfilled', value: 'Data A' },\n  //   { status: 'rejected', reason: Error('Failed B') }\n  // ]\n  const succeeded = results.filter(r => r.status === 'fulfilled').map(r => r.value);\n});",
    "evaluating": "Assesses error resilience in asynchronous frontend code and understanding of concurrent Promise APIs.",
    "followUps": [
      "How do you write a timeout wrapper around fetch using Promise.race vs AbortController?",
      "How would you implement Promise.all from scratch?",
      "If Promise.all rejects, do the remaining promises stop running in the background?"
    ],
    "misconceptions": "Assuming Promise.all cancels other in-flight requests when one rejects. It does not cancel them; you need an AbortController for cancellation."
  },
  {
    "id": "q-shallow-deep-copy",
    "cat": "JavaScript",
    "priority": "P1",
    "lvl": "Core",
    "q": "What is the difference between shallow and deep copying, and when does shallow copying fail?",
    "a": "A shallow copy duplicates only the top-level properties of an object or array. If any property value is a reference (an object, array, or function), only the memory reference is copied. Both the copy and original still share the exact same nested object.\n\nMethods for shallow copy: Object.assign({}, obj), spread operator [...arr] / {...obj}, slice().\n\nA deep copy duplicates all levels recursively, creating entirely independent objects at every level of depth.\n\nShallow copying fails whenever you mutate nested properties, such as `user.address.city = 'NYC'`. In React, if you shallow-copy state with `{...state}` but mutate `state.user.preferences`, you directly mutate previous state, causing bugs with change detection, undo/redo, and memoized components.\n\nFor deep copying in modern browsers, `structuredClone()` is the built-in standard. `JSON.parse(JSON.stringify())` is a legacy workaround that drops functions, Symbols, undefined, turns Dates into strings, and throws on circular references.",
    "code": "const original = { name: 'Dan', meta: { score: 95 } };\n\n// Shallow copy\nconst shallow = { ...original };\nshallow.meta.score = 100;\nconsole.log(original.meta.score); // 100! Original was mutated!\n\n// Deep copy using modern structuredClone\nconst deep = structuredClone(original);\ndeep.meta.score = 80;\nconsole.log(original.meta.score); // 100 (original is protected)",
    "evaluating": "Tests your understanding of JavaScript memory references, immutability, and debugging state corruption in React.",
    "followUps": [
      "What are the limitations of structuredClone?",
      "How do you implement a simple deep clone function handling circular references?",
      "Why is immutability so heavily emphasized in the React ecosystem?"
    ],
    "misconceptions": "Thinking spread syntax `{ ...obj }` creates a deep copy. It is strictly one level deep."
  },
  {
    "id": "q-event-delegation",
    "cat": "JavaScript",
    "priority": "P2",
    "lvl": "Important",
    "q": "Explain event bubbling, capturing, and how event delegation works.",
    "a": "When a DOM event fires, it passes through 3 distinct phases:\n1. Capturing Phase: The event travels from the window down through parent nodes to the target element.\n2. Target Phase: The event reaches the element that was interacted with.\n3. Bubbling Phase: The event bubbles back up from the target element through all parent ancestors to the window.\n\nEvent Delegation is a design pattern that leverages event bubbling. Instead of attaching separate event listeners to dozens or hundreds of child elements (like rows in a table or items in a list), you attach a single listener to their common parent container.\n\nInside the parent listener, you check `event.target` (or `event.target.closest('selector')`) to identify which child was clicked.\nBenefits:\n- Drastically reduces memory consumption by using fewer listeners.\n- Automatically handles dynamically added or removed child elements without re-attaching listeners.",
    "code": "// Container with event delegation\ndocument.getElementById('todo-list').addEventListener('click', (event) => {\n  const deleteBtn = event.target.closest('.delete-btn');\n  if (deleteBtn) {\n    const id = deleteBtn.dataset.id;\n    deleteItem(id);\n  }\n});",
    "evaluating": "Checks understanding of browser DOM mechanics, event bubbling, and memory efficiency in dynamic user interfaces.",
    "followUps": [
      "What is the difference between event.stopPropagation() and event.stopImmediatePropagation()?",
      "How does React SyntheticEvent system implement event delegation?",
      "Which events do NOT bubble up the DOM tree?"
    ],
    "misconceptions": "Assuming events like focus, blur, mouseenter, and mouseleave bubble by default. (They do not; focusin and mouseover do)."
  },
  {
    "id": "q-map-set",
    "cat": "JavaScript",
    "priority": "P2",
    "lvl": "Important",
    "q": "When is a Map preferred over a plain object, and what are WeakMap / WeakSet?",
    "a": "A `Map` is preferred over a plain object in several key scenarios:\n1. Key types: Map keys can be of any type (functions, objects, primitives), whereas plain object keys can only be strings or Symbols.\n2. Order & size: Map guarantees insertion order iteration and provides a direct `.size` property. Plain objects require `Object.keys().length` (O(n)).\n3. Security: Plain objects inherit properties from `Object.prototype` (like `toString`, `constructor`), which can lead to prototype pollution or collisions unless using `Object.create(null)`.\n4. Frequent insertions & deletions: Map is heavily optimized for fast dynamic additions and removals.\n\n`WeakMap` and `WeakSet` only accept objects as keys/values, and they hold \"weak\" references to those objects. If there are no other references to the key object, it is garbage collected, and the entry is automatically removed. They are not iterable and have no `.size`.\nPrimary use cases: Storing private data for classes or caching metadata for DOM elements without preventing garbage collection.",
    "code": "// WeakMap for caching element metadata\nconst elementMeta = new WeakMap();\n\nfunction trackElement(domNode, metadata) {\n  elementMeta.set(domNode, metadata);\n}\n// When domNode is removed from DOM and references dropped,\n// elementMeta entry is garbage collected automatically without memory leak!",
    "evaluating": "Tests knowledge of modern ES6 collections, algorithmic complexity, and preventing memory leaks.",
    "followUps": [
      "Why is WeakMap not iterable with for..of or .keys()?",
      "How does Set compare to array deduplication with indexOf?",
      "How does Map handle NaN comparison compared to === ?"
    ],
    "misconceptions": "Believing plain objects are always faster than Maps for large datasets with constant additions and deletions."
  },
  {
    "id": "q-react-keys",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "Why are keys essential in list rendering, and why can array indexes cause bugs?",
    "a": "Keys provide a stable identity for React elements between renders. During reconciliation, React diffs siblings in a list. Without unique, stable keys, React compares children by index position.\n\nIf you use array index as a key and then delete, insert, or reorder items, the element at index 0 now represents a different data item. React assumes the component at index 0 is the same as before because its key (`0`) hasn't changed.\nConsequences:\n1. Uncontrolled inputs (or components with internal local state) will display state belonging to the wrong item.\n2. Unnecessary DOM teardown and recreation, degrading performance.\n3. CSS transitions and animations get applied to the wrong DOM nodes.\n\nStable, unique identifiers (like database IDs `item.id`) should always be used. Array indexes are only acceptable if the list is strictly static: never filtered, never sorted, never inserted into, and never deleted from.",
    "code": "// BUGGY: Using index as key in a dynamic list with inputs\n{items.map((item, index) => (\n  <TodoItem key={index} item={item} onDelete={() => removeItem(index)} />\n))}\n\n// CORRECT: Using unique stable identifier\n{items.map(item => (\n  <TodoItem key={item.id} item={item} onDelete={() => removeItem(item.id)} />\n))}",
    "evaluating": "Tests practical understanding of React reconciliation algorithm, component identity, and diagnosing state-swapping bugs in lists.",
    "followUps": [
      "Can you use Math.random() as a key?",
      "How does changing a component key force a complete state reset?",
      "How does React reconcile elements when keys are omitted entirely?"
    ],
    "misconceptions": "Generating keys on the fly during render with Math.random() or crypto.randomUUID(). This forces React to destroy and remount the component on EVERY single render, wiping state and destroying performance."
  },
  {
    "id": "q-angular-to-react",
    "cat": "React",
    "priority": "P1",
    "lvl": "Core",
    "q": "You started in Angular and now work with React: how do they differ conceptually, and which architectural concepts carry over?",
    "a": "Having worked with both, the core conceptual differences center around framework versus library, change detection, and data flow:\n\n1. Architecture: Angular is a comprehensive framework providing opinions for everything (dependency injection, TypeScript decorators, RxJS, HttpClient, routing). React is a focused UI library centered on declarative component composition, letting you choose your own routing, state, and HTTP tools.\n\n2. Data Flow & Binding: Angular often leverages two-way data binding (`[(ngModel)]`) and template syntax with structural directives (`*ngIf`, `*ngFor`). React enforces strict unidirectional data flow: UI is a pure projection of state, and standard JavaScript expressions (map, ternary) are used inside JSX.\n\n3. Change Detection: Angular traditionally used Zone.js to monkey-patch asynchronous browser APIs and run dirty checking across the component tree. In React, there is no automatic dirty-checking of arbitrary variables; re-renders are explicitly scheduled via state setters (`useState`, `useReducer`).\n\n4. What carries over:\n- Component-driven architecture and thinking in isolated UI modules.\n- Separation of smart container components vs presentational components.\n- Angular services map conceptually to React Custom Hooks and Context for sharing stateful logic and API interactions.\n- TypeScript interfaces, strong typing, and asynchronous programming patterns (Promises/Observables).",
    "code": "/*\nAngular (RxJS / Service / Template):\n@Component({ template: '<div *ngIf=\"user$ | async as user\">{{ user.name }}</div>' })\nexport class ProfileComponent { constructor(private userService: UserService) { this.user$ = this.userService.getUser(); } }\n\nReact (Custom Hook / JSX):\nfunction Profile() {\n  const { user, loading } = useUser(); // Custom hook encapsulates data fetching logic\n  if (loading) return <Spinner />;\n  return <div>{user.name}</div>;\n}\n*/",
    "evaluating": "Directly validates your authentic background (3.8 YOE starting with Angular and working with React), testing whether you deeply understand both ecosystems and can translate architectural concepts.",
    "followUps": [
      "How do Angular Services compare to React Context and Custom Hooks?",
      "What are the trade-offs of RxJS Observables versus React Hooks and Promises?",
      "How does React Virtual DOM reconciliation compare to Angular Ivy compiler?"
    ],
    "misconceptions": "Dismissing Angular or speaking negatively about either ecosystem. Strong senior engineers appreciate the engineering trade-offs of both."
  },
  {
    "id": "q-stale-closures",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "What is a stale closure in React Hooks, and what are 3 practical ways to fix it?",
    "a": "A stale closure occurs when a callback function (inside a useEffect, useCallback, setTimeout, or event listener) captures variables from an earlier render snapshot and continues executing with outdated values long after state has changed.\n\nBecause state in React is immutable per render pass, any closure created during render #1 captures `count = 0`. If an effect starts an interval that does not include `count` in its dependencies, the interval callback will forever read `count` as `0`.\n\n3 ways to fix it:\n1. Functional state updates: Instead of `setCount(count + 1)`, use `setCount(prev => prev + 1)`. The callback receives the latest pending state from React without needing `count` in the closure.\n2. Complete dependency arrays: Add all captured variables to the hook's dependency array so the closure is recreated with fresh values whenever dependencies change.\n3. Mutable Ref pattern (`useRef`): Store the latest value in a ref (`savedCallback.current = cb`). Since `ref.current` is a mutable object reference, closures reading it always see the latest value without triggering re-renders.",
    "code": "// BUGGY: Stale closure in setInterval\nuseEffect(() => {\n  const id = setInterval(() => {\n    // 'count' is captured from the initial render and is always 0!\n    setCount(count + 1); \n  }, 1000);\n  return () => clearInterval(id);\n}, []); // Empty dependencies!\n\n// FIX 1: Functional update (best for state)\nuseEffect(() => {\n  const id = setInterval(() => {\n    setCount(prev => prev + 1); // Reads fresh pending state\n  }, 1000);\n  return () => clearInterval(id);\n}, []);\n\n// FIX 2: Ref pattern for callbacks (useLatest)\nfunction useLatest(value) {\n  const ref = useRef(value);\n  ref.current = value;\n  return ref;\n}",
    "evaluating": "Critical React interview question. Tests JavaScript closure mechanics combined with React render snapshot behavior.",
    "followUps": [
      "How does Dan Abramov's useInterval hook solve the stale closure problem?",
      "Why does eslint-plugin-react-hooks enforce exhaustive-deps?",
      "How do refs bypass the stale closure issue?"
    ],
    "misconceptions": "Disabling the ESLint exhaustive-deps warning comment instead of properly addressing the dependency or using functional updates."
  },
  {
    "id": "q-useref-vs-state",
    "cat": "Hooks & performance",
    "priority": "P1",
    "lvl": "Core",
    "q": "useRef vs useState: what are the core differences and when do you use each?",
    "a": "The fundamental difference comes down to rendering:\n- `useState`: Updating state schedules a re-render. It is meant for data that affects the visual output of the component on screen.\n- `useRef`: Updating `ref.current` is a synchronous mutation of a plain JavaScript object `{ current: ... }`. It persists across renders but does NOT schedule a re-render.\n\nWhen to use useRef:\n1. Referencing DOM nodes directly (e.g. setting focus, measuring dimensions, scrolling).\n2. Storing mutable instance values that shouldn't trigger renders (e.g. interval IDs, timer references, previous prop/state values).\n3. Tracking whether a component has mounted or is on its initial render pass.\n\nRule of thumb: If changing the value needs to change what is visible on the screen, use `useState`. If changing the value is internal bookkeeping for the component, use `useRef`. Never read or write `ref.current` during render body execution (keep it pure).",
    "code": "function Stopwatch() {\n  const [seconds, setSeconds] = useState(0); // Displayed on screen -> state\n  const timerRef = useRef(null);            // Timer ID bookkeeping -> ref\n\n  const start = () => {\n    if (timerRef.current) return;\n    timerRef.current = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n  };\n\n  const stop = () => {\n    clearInterval(timerRef.current);\n    timerRef.current = null;\n  };\n\n  return <div>Time: {seconds}s <button onClick={start}>Start</button><button onClick={stop}>Stop</button></div>;\n}",
    "evaluating": "Validates clear mental model of component state vs instance variables and pure rendering rules.",
    "followUps": [
      "Why is mutating ref.current inside the render body considered an anti-pattern?",
      "How would you implement a usePrevious hook using useRef?",
      "What is forwardRef and when is it required?"
    ],
    "misconceptions": "Using useState to store timer IDs or animation frame handles, causing useless extra re-renders."
  },
  {
    "id": "q-context-perf",
    "cat": "Architecture & testing",
    "priority": "P2",
    "lvl": "Important",
    "q": "What are the performance pitfalls of React Context, and how do you mitigate them?",
    "a": "The primary performance pitfall of React Context is coarse-grained re-rendering:\nWhenever the `value` prop passed to a `Context.Provider` changes by reference equality, EVERY component that calls `useContext(MyContext)` will automatically re-render, even if it only consumes a property of the context that didn't change!\n\nMitigation strategies:\n1. Split Contexts: Separate rapidly changing state from static state or actions. For instance, split `ThemeStateContext` and `ThemeDispatchContext`, or `UserStateContext` and `UserActionsContext`. Action dispatchers rarely change reference, so consumers only listening for actions never re-render when state updates.\n2. Memoize the Provider value: Always wrap the context value object in `useMemo` so unrelated parent renders do not create a new object reference.\n3. Colocate State: Don't put everything in global context. Keep state as close to the consuming leaf components as possible.\n4. Dedicated state libraries: For high-frequency, complex shared state with fine-grained selectors, use specialized libraries like Zustand or Redux Toolkit.",
    "code": "// Splitting state and dispatch contexts to prevent unnecessary renders:\nconst UserStateContext = createContext(null);\nconst UserDispatchContext = createContext(null);\n\nexport function UserProvider({ children }) {\n  const [user, dispatch] = useReducer(userReducer, initialUser);\n\n  return (\n    <UserStateContext.Provider value={user}>\n      <UserDispatchContext.Provider value={dispatch}>\n        {children}\n      </UserDispatchContext.Provider>\n    </UserStateContext.Provider>\n  );\n}",
    "evaluating": "Evaluates architectural judgment, re-render profiling, and scalability in medium-to-large React codebases.",
    "followUps": [
      "How does Context compare to Zustand, Redux Toolkit, or Jotai?",
      "Why can't React.memo prevent re-renders caused by useContext?",
      "What is useMemoizedContext selector pattern?"
    ],
    "misconceptions": "Believing React.memo on a child will prevent it from re-rendering when the context it consumes changes. useContext directly bypasses React.memo."
  },
  {
    "id": "q-tell-me-about-yourself",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "Tell me about yourself and your frontend journey.",
    "a": "Here is a strong, authentic structure tailored to your exact 3.8-year background:\n\n\"I am a frontend engineer with 3 years and 10 months of professional experience building web applications. \n\nI began my engineering journey with a 6-month frontend internship where I established my core foundations in JavaScript, CSS, and modern web APIs. In my early career, I worked heavily with Angular, which gave me strong discipline in TypeScript, component-driven design, and architecting complex applications.\n\nOver the past two years, my focus has shifted deeply to React. I've been building and maintaining modern React applications—working extensively with functional components, custom hooks, state architecture, and API integrations. Because of my background in both Angular and React, I have a deep appreciation for unidirectional data flow, explicit state transitions, and component performance.\n\nRight now, I'm looking for a React Developer role where I can leverage my experience in building clean, responsive, and reliable frontend systems, take ownership of features, and contribute to high-standard engineering teams.\"",
    "code": "// Framework for structuring this answer out loud:\n// 1. Current identity & total experience (3y 10m)\n// 2. Foundation: Internship + Angular (TypeScript discipline, architecture)\n// 3. Current focus: Hands-on React (Hooks, state, performance, API integration)\n// 4. Strengths: Deep fundamentals, debugging, component design\n// 5. Goal: Target React Developer role",
    "evaluating": "Evaluates your communication clarity, self-awareness, authentic ownership of your career narrative, and fit for a 3-4 YOE role.",
    "followUps": [
      "What motivated your transition from Angular to React?",
      "What kind of frontend challenges do you enjoy working on the most?",
      "How do you keep your technical skills sharp?"
    ],
    "misconceptions": "Reciting your resume chronologically line-by-line, inventing fake titles, or speaking vaguely about company metrics you had no control over."
  },
  {
    "id": "q-production-bug",
    "cat": "Project & experience",
    "priority": "P1",
    "lvl": "Core",
    "q": "Describe a challenging production bug you investigated and fixed in a React application.",
    "a": "Use this authentic STAR template based on real-world React challenges (e.g. a memory leak from an uncleaned subscription, or an autocomplete race condition):\n\nSituation:\n\"In our application, users reported that the search dropdown intermittently displayed completely wrong results when typing quickly, and occasionally on slower mobile connections, results would suddenly flicker and show older queries.\"\n\nTask:\n\"I was tasked with identifying the root cause of this intermittent bug and implementing a permanent fix without disrupting the user experience.\"\n\nAction:\n\"I investigated network logs and reproduced the issue by throttling network speed to 3G. I observed a classic race condition: when typing rapidly, multiple fetch requests were initiated in parallel. An earlier request for a shorter string took 800ms while a later request took 300ms, meaning the older response resolved last and overwrote the latest results.\nI resolved this by implementing two coordinated changes:\nFirst, I debounced the user input to prevent spamming the backend.\nSecond, I integrated an AbortController inside our search hook's useEffect cleanup. Every time the query changed, any in-flight request was immediately aborted. I also handled the AbortError cleanly to prevent false error toasts.\"\n\nResult:\n\"The race condition and UI flicker were completely eliminated. We verified it with automated tests simulating out-of-order responses, and network payload volume decreased because obsolete requests were cancelled before transferring large response bodies.\"",
    "code": "// Summary of the fix implemented in the story:\nuseEffect(() => {\n  if (!debouncedQuery) return;\n  const controller = new AbortController();\n\n  fetchResults(debouncedQuery, controller.signal)\n    .then(data => setResults(data))\n    .catch(err => {\n      if (err.name !== 'AbortError') setError(err);\n    });\n\n  return () => controller.abort(); // Crucial cleanup!\n}, [debouncedQuery]);",
    "evaluating": "Evaluates practical debugging methodology, understanding of network and browser realities, and concrete problem-solving skills.",
    "followUps": [
      "How did you reproduce the bug in a local development environment?",
      "What monitoring or automated tests did you add to ensure it wouldn't regress?",
      "Did you consider using a library like TanStack Query instead?"
    ],
    "misconceptions": "Claiming you fixed a bug alone in 5 minutes with zero investigation, or fabricating unverifiable metrics like \"increased revenue by 40%\". Focus on the engineering investigation and fix."
  }
];

export const allQuestions = [...questions, ...practicalQuestions];
