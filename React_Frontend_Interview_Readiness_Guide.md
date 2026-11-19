# React Frontend Interview Readiness Guide

**Target:** React frontend roles at approximately 3–4 years of experience. Designed for someone with Angular background and over a year of React work who wants a practical gate before applying.

> This is a readiness checklist, not a promise that every company asks every topic. Start applying when core readiness is met and keep learning in parallel.


## How to use this guide

### Your target
Prepare as a frontend engineer targeting roughly 3–4 years of experience. Your Angular background is useful, but interview answers and coding practice should be React-focused because that is your target role.

### Completion rule
Do not wait to master every advanced topic. You are ready to start applying when you can explain core concepts clearly, solve common coding problems without copying, build small UIs independently, and discuss your real project contribution.

### Study rhythm
Use 2.5–3 focused hours a day if sustainable: 45–60 minutes concepts, 45–60 minutes coding, 30–45 minutes React/UI implementation, and 15 minutes speaking answers aloud. Adjust to your schedule.

### How to mark a topic complete
You can (1) explain it in your own words, (2) write a small example without looking, (3) handle one follow-up question, and (4) name a real-world use case or trade-off.

### Important note
Interview processes vary by company. Treat community reports as examples, not guarantees. Ask recruiters about the actual format: JavaScript, React/UI coding, DSA, design, take-home, and behavioral rounds.


## Priority map

### P0 — must know
JavaScript execution, closures, promises/event loop, arrays/objects, React rendering/hooks/effects, API states, forms, coding fundamentals, project deep dive.

### P1 — strong advantage
Debounce/throttle, common polyfills, accessibility, testing basics, performance profiling, state architecture, frontend design discussions, basic DSA patterns.

### P2 — learn after applications begin
Advanced React 19 APIs, Server Components, compiler details, deep browser internals, advanced graph algorithms, large-scale architecture, framework internals not used at work.


## JavaScript concept checklist

### Language foundations
var/let/const; block/function/global scope; lexical scope; hoisting; temporal dead zone; primitives vs objects; truthy/falsy; coercion; strict equality; optional chaining; nullish coalescing; destructuring; spread/rest; template literals; modules; strict mode.

### Functions and execution
Function declarations vs expressions; arrow functions; parameters/defaults; callbacks; higher-order functions; lexical environment; closures; this binding; call/apply/bind; constructor functions; prototypes; prototype chain; classes; inheritance; private fields at a basic level.

### Objects and collections
Object references; shallow vs deep copy; mutation vs immutability; Object.keys/values/entries; Object.hasOwn; Map vs object; Set; WeakMap/WeakSet use cases; equality of primitives vs object references; optional chaining.

### Arrays and strings
map/filter/reduce; find/findIndex; some/every; includes; slice vs splice; concat; flat/flatMap; sort comparator; stable sorting concept; split/join; substring/slice; string immutability; Unicode awareness at a basic level.

### Async JavaScript
Call stack; browser APIs; task/macrotask queue; microtask queue; Promise states; then/catch/finally; Promise.all/allSettled/race/any; async/await; sequential vs parallel requests; error propagation; fetch; aborting requests with AbortController; timer cleanup.

### Runtime and memory
Garbage collection concept; common accidental global variables; memory leaks from listeners/timers/closures; event delegation; debouncing and throttling; JSON stringify/parse limitations; localStorage/sessionStorage/cookies trade-offs.

### Must be able to explain
Why changing a normal local variable does not trigger React render; why useRef changes do not render; why closure values can become stale; why await pauses the async function but not the entire JS thread; why == and === differ; why copying an object with spread is shallow.


## JavaScript interview questions

### Core output questions
Predict outputs involving var/let in loops; hoisting; TDZ; closures; this in regular vs arrow functions; object references; coercion; short-circuiting; spread copies; Promise.then vs setTimeout; async/await ordering.

### Concept questions
Explain closure with a practical example. What is lexical scope? What is hoisting? What is TDZ? Explain this and binding. Difference between call/apply/bind? Map vs object? Set vs array? Shallow vs deep copy? Why is sort comparator needed for numbers? What are microtasks? What does Promise.all do on rejection?

### Async questions
How do you handle multiple API calls in parallel? How do you handle partial failure? How do you cancel a fetch? What happens if a promise rejects without catch? How do you prevent stale search results from replacing newer results?

### Implementation questions
Implement debounce, throttle, once, memoize, groupBy, deep flatten, array deduplication, frequency counter, Promise.all (basic), map/filter/reduce (basic), and a retry wrapper (stretch).

### Answer format
For output questions, state the result first, then walk through scope/stack/queues. For design questions, clarify requirements, describe the simple solution, discuss edge cases, then optimize.


## React checklist

### Core model
Components; JSX; props vs state; one-way data flow; rendering; reconciliation; Virtual DOM as a conceptual model; keys; component identity; conditional rendering; lists; fragments.

### Hooks
useState; functional state updates; batching; useEffect dependency rules; cleanup; useRef; useMemo/useCallback and when not to use them; custom hooks; Rules of Hooks; stale closures; context; reducer patterns.

### Effects and lifecycle
When effects run; dependencies; cleanup before re-run/unmount; avoiding effects for derived values; handling subscriptions/listeners/timers; request cancellation; Strict Mode development behavior; separating events from effects.

### Forms and state
Controlled vs uncontrolled inputs; validation; form submission; lifting state; avoiding duplicated state; derived state; reducer vs multiple useState calls; context trade-offs; state management library awareness if relevant to your work.

### Data fetching
Loading/error/empty/success states; cancellation; race conditions; pagination; optimistic update concept; caching concept; retry; request deduplication concept; error boundaries do not catch every async/event error.

### Performance
React DevTools Profiler; unnecessary re-renders; stable keys; memoization trade-offs; list virtualization concept; code splitting/lazy loading; bundle size; image loading; avoid premature optimization.

### Testing and quality
Unit vs integration vs end-to-end tests; React Testing Library principles; testing user-visible behavior; mocking APIs; accessibility checks; linting; component boundaries.

### Modern React awareness
Know what your current project uses. Recognize React 19 Actions, the use API, Server Components and React Compiler at a high level; do not spend core prep time memorizing features you cannot explain in context.


## React interview questions

### Rendering
What triggers a re-render? Does a parent re-render imply child render? Does changing a local variable or ref trigger render? Why are keys important? Why can array indices be unsafe keys? What is reconciliation?

### Hooks
When should useEffect be used? When should it not be used? Why does an effect run twice in development Strict Mode? What does cleanup do? How do stale closures happen? useMemo vs useCallback? useRef vs useState?

### State and architecture
Props vs state? Controlled vs uncontrolled? When to lift state? When use context? Context drawbacks? useReducer vs useState? How would you organize a feature with API state, filters and pagination?

### Performance
How do you investigate slow rendering? What is memoization and what are its costs? How do you render a very large list? How do you split bundles? How do you avoid unnecessary API calls?

### Reliability
How do you handle loading/error/empty states? How do you prevent out-of-order search responses? How do you clean up timers and listeners? What belongs in an error boundary?

### Project-specific
Why was the component structure chosen? What was the hardest bug? What did you personally implement? How was state managed? How did you handle errors? What would you refactor? What measurable improvement did you make?


## HTML, CSS, browser and web checklist

### HTML/accessibility
Semantic elements; labels and accessible names; button vs div; form semantics; keyboard navigation; focus management; alt text; headings; landmarks; basic ARIA only when native HTML is insufficient.

### CSS
Box model; specificity; cascade; inheritance; display; positioning; stacking context/z-index; Flexbox; Grid; responsive design; media queries; units; overflow; pseudo-classes/elements; transitions; CSS variables; layout debugging.

### Browser
DOM vs CSSOM; render tree; style/layout/paint/composite at a high level; event bubbling/capturing; event delegation; localStorage vs sessionStorage vs cookies; cache basics; CORS; same-origin policy; XSS basics.

### Networking
HTTP GET/POST/PUT/PATCH/DELETE; status codes; headers; request/response; JSON; authentication basics; cookies; CORS; caching; idempotency concept; why POST alone does not make sensitive data secure.

### Security/performance
Avoid unsafe HTML injection; escape/untrusted content; XSS and CSRF at a high level; secure cookie attributes concept; image optimization; lazy loading; Core Web Vitals awareness; network waterfalls; debouncing user-driven requests.


## Coding round rules

### For every problem
Clarify inputs/outputs and constraints; describe brute force first; improve it; state time and space complexity; code readable names; test normal, empty, duplicate, negative, boundary and malformed inputs where relevant.

### Practice mode
First solve without hints. If stuck for 15–20 minutes, read a hint rather than the full answer. After solving, close the solution and re-implement the next day. Explain the code aloud.

### Language expectation
Use JavaScript confidently. If target roles mention TypeScript, add types to your solutions and review unions, interfaces, generics and narrowing.

### DSA level
For many frontend roles, focus on arrays, strings, hash maps/sets, two pointers, sliding window, stacks/queues, binary search, recursion, trees/graphs basics and Big O. Company-specific product interviews may go deeper.


## Coding bank A — arrays, strings, objects

### 1. Fundamentals
Find max/min; second-largest unique value; reverse array/string; palindrome; count vowels/characters; remove duplicates; find duplicates; frequency map; sum/average; chunk array; rotate array; merge sorted arrays.

### 2. Objects and data
Group items by property; count occurrences; sort products by price; merge objects by id with second-array precedence; transform array to lookup object; compare shallow objects; safely clone nested data; pick/omit selected keys.

### 3. Strings
Anagram check; first non-repeating character; character frequency; title case; longest common prefix; compress repeated characters; validate brackets; normalize a palindrome; find first unique word.

### 4. Follow-ups
Preserve order? Case sensitive? Unicode? Duplicate object IDs? Mutate inputs or return new data? How should empty input behave? What if all numbers are equal?

### 5. Complexity
For each answer, know when nested loops are O(n²), when Map/Set gives expected O(n) lookup, and when sorting changes time to O(n log n).


## Coding bank B — patterns and DSA

### Frequency counter / hash map
Two Sum; valid anagram; intersection of arrays; top-k frequent elements (basic); first unique character; group anagrams.

### Two pointers
Palindrome with two pointers; remove duplicates from sorted array; pair sum in sorted array; merge sorted arrays; move zeroes; container with most water (stretch).

### Sliding window
Maximum sum of fixed-size subarray; longest substring without repeating characters; minimum-size subarray sum (stretch); longest run under a constraint.

### Stack / queue
Valid parentheses; min stack concept; implement queue using stacks (stretch); next greater element (stretch); BFS queue traversal.

### Search / sort / recursion
Binary search; first/last occurrence; insertion position; recursive flatten; factorial/fibonacci for recursion basics; merge intervals (stretch); merge sort concept.

### Trees / graphs
Tree depth; level-order traversal; DFS/BFS; build adjacency list; count connected components; detect visited nodes/cycles at a basic level.

### Don't overdo
Do not attempt to finish every LeetCode topic before applying. Prioritize common patterns and review the actual job descriptions/company process.


## Coding bank C — JavaScript utilities and polyfills

### Must practice
Debounce; throttle; once; memoize; curry; compose/pipe; groupBy; flatten array; deep clone discussion; implement map/filter/reduce in a simplified interview-safe form.

### Promise and async
Run tasks sequentially vs in parallel; Promise.all behavior; limited-concurrency queue concept; retry with backoff concept; timeout wrapper concept; cancel fetch using AbortController.

### DOM/browser utilities
Event delegation; create a simple accordion with DOM events; implement tabs; serialize form data to an object; outside-click behavior; keyboard escape handling for modal.

### Polyfill expectations
Understand purpose and edge cases. A short, correct implementation of debounce or array methods is more useful than memorizing large polyfills without understanding this, sparse arrays, callback arguments or error handling.


## Coding bank D — React machine coding

### Tier 1 — must build
Todo list with add/toggle/delete/filter; search/filter/sort table; pagination; controlled form with validation; tabs; accordion; modal; stopwatch/timer; star rating.

### Tier 2 — strong practice
Autocomplete with debounce and loading/error states; nested comments; recursive file explorer; sortable table; multi-step form; image carousel; shopping cart with derived totals; infinite scroll.

### Tier 3 — stretch
Kanban board; drag-and-drop list; virtualized list concept; quiz/trivia app; traffic light with cleanup; dependent dropdowns; reusable data table with sorting/filtering/pagination.

### Every UI should include
Empty state; loading state if async; error state; keyboard behavior; labels; stable keys; correct state ownership; cleanup; duplicate clicks; reset/retry behavior; responsive layout where relevant.

### Evaluation rubric
Correctness first; then component/state design; edge cases; accessibility; code clarity; performance; visual polish. Do not spend half the round styling before the core interaction works.


## Frontend design and project discussion

### Design conversation framework
Clarify users and requirements; define core interactions; identify components; define local/shared/server state; sketch API contracts; handle loading/errors/empty states; address accessibility; discuss performance, caching and testing; state trade-offs.

### Practice design prompts
Autocomplete/search; paginated data table; news feed; quiz app; e-commerce product listing; modal/dialog system; notification/toast system; file explorer; image carousel; chat interface (stretch).

### Project deep dive
Prepare a 2-minute overview; architecture and data flow; your exact contribution; one hard bug and debugging steps; one performance/reliability improvement; testing strategy; trade-off you made; what you would change now.

### Behavioral stories
Use STAR/CAR: conflict or disagreement; production bug; missed estimate; ambiguous requirement; collaboration; feedback received; ownership; learning a new tool; improving quality. Be honest about team work vs your own contribution.

### Angular-to-React transition
Explain transferable concepts (components, data flow, services/API integration) and the React-specific differences you have actually used (hooks, state, effects, composition). Never claim deep production experience with a feature you have only studied.


## 15-day starter plan

### Days 1–2
Scope/hoisting/TDZ, types/coercion, functions, closures, this, array/object fundamentals. Solve 4–6 small problems.

### Days 3–4
Map/Set, strings, frequency counters, two pointers, sorting, complexity. Solve 5–8 problems across both days.

### Days 5–6
Promises, event loop, async/await, error handling, debounce/throttle. Practise output prediction and implement utilities.

### Day 7
Mixed JavaScript mock: 45 minutes coding + 20 minutes verbal questions; review mistakes.

### Days 8–9
React rendering, keys, state updates, hooks, effects, cleanup, stale closures. Build timer and tabs.

### Day 10
Forms, API fetching, loading/error/empty states, race conditions, pagination. Build a searchable table.

### Day 11
React performance, component design, context/reducer, testing basics. Revisit weak concepts.

### Day 12
Machine coding: autocomplete or nested file explorer under 60–90 minutes.

### Day 13
HTML/CSS, browser/network/security basics and frontend design prompts.

### Day 14
Project deep dive, behavioral stories, timed mock coding and DSA revision.

### Day 15
Revision, resume, targeted applications and recruiter outreach. Continue learning while applying.


## Apply-ready gate

### JavaScript
I can explain scope/closures, promises/event loop, object references, common array methods and solve easy/medium frontend coding questions.

### React
I can explain renders, keys, hooks, effects/cleanup, controlled forms, API states and common performance trade-offs.

### UI coding
I can independently build 3–5 small components/features and handle loading/error/empty states, validation and edge cases.

### Problem solving
I state assumptions, explain brute force and optimization, give Big O, and test edge cases.

### Project
I can clearly explain my contribution, a hard bug, architecture, trade-offs and what I would improve.

### Interview behavior
I ask clarifying questions, narrate my reasoning, accept hints constructively and can discuss my experience honestly.

### Decision
If most core items are true, start applying. Keep improving gaps in parallel; do not wait for every stretch topic.


## Reliable resources and research notes

### Official React
https://react.dev/learn — canonical learning guide for React components, state, effects and rendering.

### JavaScript.info
https://javascript.info/ — structured JavaScript fundamentals and async topics.

### GreatFrontEnd
https://www.greatfrontend.com/interviews/get-started — question bank and practice paths across JavaScript, React, UI coding, DSA and frontend design.

### Frontend Interview Handbook
https://www.frontendinterviewhandbook.com/introduction — explains frontend interview formats and why UI/domain knowledge matters alongside algorithms.

### Reddit: mid-level expectations
https://www.reddit.com/r/react/comments/1ounrse/what_should_i_expect_for_mid_level_frontend/ — November 2025 discussion around 3 YOE, depth, system design and interview expectations.

### Reddit: interview patterns
https://www.reddit.com/r/SoftwareEngineerJobs/comments/1vin74f/10_javascript_questions_that_came_up_in_almost/ — 2026 report from a React/Next.js candidate describing recurring JavaScript questions; anecdotal, not a guarantee.

### Reddit: India interview perspective
https://www.reddit.com/r/developersIndia/comments/1orp5j1 — 2025 interviewer account discussing 4–6 YOE candidates, fundamentals, DSA and practical coding.

### Recent interview examples
https://www.greatfrontend.com/interviews/company/reddit/questions-guides — collected reports include JavaScript, React timers, graph traversal and frontend design; experiences vary by candidate and year.

### Research caveat
Community reports are self-selected anecdotes. Use them to choose practice areas, not to infer exact question frequency or promise that a particular question will appear.
