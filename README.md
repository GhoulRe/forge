# Forjix — 15-Day React & JavaScript Technical Interview Preparation Platform

**Forjix** is an intensive, practical 15-day interview preparation platform specifically engineered for React and Frontend Developers with ~3–4 years of experience (including those transitioning from Angular to React).

It provides an end-to-end learning, coding, and mock interview workflow:
- **15-Day Targeted Syllabus**: Structured daily progression with learning objectives, core concepts, practical checklists, aligned interview questions, coding exercises, time allocations, completion criteria, and active recall quizzes.
- **Spoken Interview Question Bank**: Conversational, technically precise model answers designed for speaking out loud, interviewer evaluation rubrics, common follow-up questions, and traps/misconceptions to avoid.
- **Structured Coding Problem Bank**: Categorized by problem-solving patterns (Two Pointers, Sliding Window, Frequency Counters, Stacks, Closures, Async JS, React Components, Machine Coding) with progressive 3-step hint ladder, edge-case checklists, and reference solutions.
- **Interactive Code Runner & Test Suites**: In-browser sandboxed iframe execution with console output, real automated test assertions, and live React previews.
- **Revision & Weak Spots Center**: Active spaced-repetition quizzes, triage for flagged "Needs practice" questions, and incomplete task auditing.
- **Timed Mock Interview Simulator**: Full 4-stage interview loop (Experience/STAR, JS Coding, React Q&A, and Machine Coding).
- **Dual Persistence Architecture**: Zero-friction offline Guest mode with `localStorage` persistence + seamless Firebase cloud synchronization across all devices.

---

## Getting Started

### 1. Run in Development Mode
```bash
npm install
npm run dev
```
- Starts Vite on `http://localhost:5173`.
- You can immediately use the platform in **Guest (Offline) Mode** without any setup.

### 2. Run Test Suite
```bash
npm test
```
- Runs automated tests covering 15-day plan integrity, coding problem algorithms, question bank schema, and utility functions using Node's native test runner (`node --test`).

### 3. Production Build
```bash
npm run build
```
- Bundles optimized assets into the `dist/` directory.

---

## Firebase Cloud Sync (Optional)

With Firebase enabled, all your progress (completed tasks, solved coding problems, flagged questions, notes, and streak) syncs to your personal Firebase project.

1. Ensure `.env.local` contains your Firebase project keys:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-project"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```
2. Enable **Email/Password** under Firebase Console → Authentication → Sign-in method.
3. Enable **Cloud Firestore** in Production mode with rules from `firestore.rules`.
4. Deploy to Firebase Hosting:
   ```bash
   npx firebase-tools deploy --only hosting,firestore:rules
   ```

---

## 15-Day Preparation Roadmap

| Day | Focus Theme | Priority | Core Deliverable |
|---|---|---|---|
| **Day 1** | Scope, closures, hoisting & execution contexts | P1 Essential | Closure-based state manager without memory leaks |
| **Day 2** | Arrays, objects & functional methods | P1 Essential | Immutable transforms, shallow vs deep cloning |
| **Day 3** | Strings & core problem-solving patterns | P1 Essential | Two Sum, Anagrams, Longest Unique Substring |
| **Day 4** | Promises & asynchronous JavaScript | P1 Essential | Event loop output, Promise.all & retry polyfills |
| **Day 5** | Functions, `this`, debounce, throttle & events | P1 Essential | Debounce, throttle & bind polyfills, event delegation |
| **Day 6** | React fundamentals & component mental model | P1 Essential | Todo app, stable keys, Angular vs React data flow |
| **Day 7** | Rendering, reconciliation & state management | P1 Essential | Re-render causes, reconciliation, batching, snapshots |
| **Day 8** | React Hooks, effects, refs & custom Hooks | P1 Essential | useEffect sync model, cleanups, stale closure fixes |
| **Day 9** | State architecture, forms & routing | P2 Important | useReducer vs Context, multi-field form validation |
| **Day 10** | API integration, autocomplete & race conditions | P1 Essential | Debounced autocomplete with AbortController |
| **Day 11** | Performance, testing & maintainability | P2 Important | React.memo trade-offs, code splitting, RTL tests |
| **Day 12** | React live coding & machine-coding practice | P1 Essential | Timed Tabs, Accordion, and Sortable Data Table |
| **Day 13** | Project deep dive & frontend design | P1 Essential | Authentic STAR stories, Angular->React journey |
| **Day 14** | Full mock interview simulation | P1 Essential | Complete 4-round simulation with timer & rubrics |
| **Day 15** | Final revision, rapid recall & interview readiness | P1 Essential | Weak-spot triage, rapid-fire recall flashcards |
