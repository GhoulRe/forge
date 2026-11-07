# Forge — a local-first skills platform: learn, practise, get interviewed, track progress (React + Node)

One web app for everything: the 15-day interview plan, Q&A with confidence tracking, coding-round problems,
runnable lessons and challenges with tests, scratchpads, notes — with accounts and server-saved progress.

## Where your data is stored
Default: the Forge server (`server/data.json`). Or **Firebase** (free plan) so you can sign in from any computer: see `FIREBASE.md`.

## Run it
```bash
npm install          # run again after updating: the notes editor adds CodeMirror packages
npm run dev        # API on :3000, React dev server on http://localhost:5173
```
Production:
```bash
npm run build      # outputs dist/
npm start          # serves dist/ + the API on http://localhost:3000
```
Env vars: `PORT` (default 3000), `DATA_FILE` (default `server/data.json`). Back that file up; it holds all accounts and progress.

## What is inside
| Area | What you get |
|---|---|
| Dashboard | daily goal, GitHub-style activity calendar, current/longest streak, up-next suggestions, milestones, per-area progress |
| 15-day plan | 15 days with task checklists, Q&A prompts, coding prompts, bonus topics, per-day notes |
| Interview Q&A | 51 questions; mark "I can explain this" / "Needs practice"; search; Quiz me |
| Practice | 5 lessons, 9 challenges with tests, 74 interview coding problems with hints |
| Workspace | editor, sandboxed runner, console, tests, hints, live HTML and React previews |
| Notes & backup | intro/project/bug/why stories, export, import of your old single-file plan's progress |

## Zero, your local coach (optional)
Zero asks guiding questions instead of giving answers, and runs on **your** machine. Nothing is sent to a cloud.
```bash
# install Ollama from https://ollama.com, then:
ollama pull llama3.2
ollama serve            # keep it running (it usually starts automatically)
```
Reload Forge; the Zero panel in any exercise shows "local model: …". Optional env vars: `OLLAMA_URL` (default `http://127.0.0.1:11434`), `OLLAMA_MODEL` (default: first installed model).
Without Ollama everything else still works; use the 💡 hint ladder.

## Running Zero on a modest machine
The web app itself is light. Only Ollama uses real memory, and only while a model is loaded. Tips:
- Pick a small model: `qwen2.5-coder:3b` (good for code checks), `llama3.2:3b` (good general explanations) or `qwen3:4b`. These need roughly 2 to 3 GB of RAM. 1B models run on almost anything but are too weak to rely on. Tags change, so check `ollama list` and ollama.com/library.
- Zero asks Ollama to unload the model after 2 minutes idle. Change with `FORGE_KEEP_ALIVE` (for example `0` to unload immediately, `30m` to keep it warm). `ollama ps` shows what is loaded and `ollama stop <model>` unloads it now.
- Context is capped at 4096 tokens (`OLLAMA_NUM_CTX` to change) and replies at about 450 tokens, which keeps memory and wait time down.
- Several models installed? Choose one in the Zero panel.
- No model at all is fine: everything else works, with the 💡 hint ladder.

## More features
- **Notes editor**: CodeMirror 6 with live preview (the engine Obsidian uses). Notes stay plain markdown; headings, bold, lists and code blocks are formatted as you type, marks are hidden on lines you are not editing, and fenced code is highlighted per language (JS/TS/JSX, HTML, CSS, JSON, loaded on demand). It loads only when you edit a note. If it ever fails to load, Forge falls back to a simpler built-in editor automatically.
- **Notes**: each day has proper markdown notes (several per day, edit/preview, checklists, code blocks you can copy or save as runnable snippets).
- **Zero in a day or a challenge**: explains topics, checks your notes and code, and quizzes you, with your day, notes and snippets as context.
- **Unplugged** (header switch): no hints, no Zero, no solutions. Just you and the problem.
- **Mock interview**: timed Q&A rounds (self-rated, misses go to Needs practice) and unplugged coding rounds scored by tests. Zero can ask follow-ups.
- **Skill tree**: DSA, web fundamentals and system design, each topic with an interactive lab and a quiz. Add topics in `src/data/domains.js`.
- **Break room**: Snake and Big-O Blitz.

## Project layout
```
server/index.cjs        zero-dependency API: signup/login (scrypt + HttpOnly cookie), GET/PUT state
src/store.jsx           one persisted state document per user (auto-saved, resumes on any device)
src/data/plan.js        days, questions, interview problems (edit to add content)
src/data/lessons.js     lessons + challenges with tests (edit to add content)
src/components/         Shell, Dashboard, Plan, QA, Practice, Workspace, Editor, Viz, Notes, Auth
```
Add a challenge in `src/data/lessons.js` with `C(id, difficulty, title, description, starterCode, tests, hints, solution)`.
Tests use `test(name, fn)`, `eq(actual, expected)`, `delay(ms)`.

## Notes
- User code runs in a sandboxed iframe (`allow-scripts` only), so it cannot read your session or data.
- React previews load React and Babel from unpkg, so they need an internet connection.
- Interview problems have no automated tests; they open in the editor for self-review.
- For many users, replace the JSON file store in `server/index.cjs` with a database.
