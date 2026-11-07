import { useEffect, useState } from 'react';
import { backend } from '../backend.js';
import { useApp } from '../store.jsx';
import { catalog, findItem } from '../data/items.js';
import { stats } from '../lib/util.js';
import { parse, pathFor } from '../lib/route.js';
import { navigate, usePath } from '../router.js';
import Link from './Link.jsx';
import Dashboard from './Dashboard.jsx';
import Plan from './Plan.jsx';
import QA from './QA.jsx';
import Practice from './Practice.jsx';
import Workspace from './Workspace.jsx';
import Notes from './Notes.jsx';
import Skills from './Skills.jsx';
import Mock from './Mock.jsx';
import Games from './Games.jsx';
import Library from './Library.jsx';

const GROUPS = [
  ['Study', [['dashboard', '📊', 'Dashboard'], ['plan', '🗓', '15-day plan'], ['library', '📚', 'My library'], ['qa', '💬', 'Interview Q&A'], ['notes', '📝', 'Notes & backup']]],
  ['Practice', [['practice', '🧪', 'Practice & challenges'], ['skills', '🧠', 'Skill tree'], ['mock', '🎤', 'Mock interview']]],
  ['Break', [['games', '🎮', 'Break room']]],
];
const TITLE = Object.fromEntries(GROUPS.flatMap(g => g[1]).map(([k, , t]) => [k, t]));
const PAD = {
  js: "// Experiment freely. Press ⌘/Ctrl + Enter to run.\nconsole.log('hello');\n",
  html: '<h1>Hello</h1>\n<script>console.log("hi")<\/script>\n',
  react: 'function App() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>Clicked {n}</button>;\n}\n',
};
const NotFound = () => <div className="page"><h1>Page not found</h1><p className="mu">That address does not exist. <Link to="/dashboard" style={{ color: 'var(--ac)' }}>Go to the dashboard</Link></p></div>;

export default function Shell({ onOut }) {
  const { S, up, sv, toast, user } = useApp();
  const path = usePath(), r = parse(path);
  const [open, setOpen] = useState(false), [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark');
  const exists = id => catalog.some(i => i.id === id) || S.pads.some(p => p.id === id);
  const inWork = r.view === 'practice' && r.a;
  const resume = findItem(S.cur, S.pads);

  useEffect(() => { if (!r.view) navigate(S.last && S.last !== '/' ? S.last : '/dashboard', true); }, [r.view]);
  useEffect(() => { // remember where you are (for "resume") and scroll to the top on every page change
    document.getElementById('main')?.scrollTo(0, 0); setOpen(false);
    if (r.view && (S.last !== path || (inWork && exists(r.a) && S.cur !== r.a))) up(n => { n.last = path; if (inWork && exists(r.a)) n.cur = r.a; });
  }, [path]);

  const go = (v, id) => navigate(pathFor(v, id, S.cur));
  const addPad = lang => { const id = 'pad' + Date.now(); up(n => { n.pads.push({ id, tr: 'Scratchpads', t: 'Scratchpad ' + (n.pads.length + 1), lang, code: PAD[lang] }); }); navigate('/practice/' + id); };
  const toggleUnplugged = () => up(n => { n.unplugged = !n.unplugged; });
  const logout = async () => { await backend.logout().catch(() => {}); onOut(); };
  const toggleTheme = () => { const t = theme === 'dark' ? 'light' : 'dark'; setTheme(t); document.documentElement.dataset.theme = t; try { localStorage.setItem('forge.theme', t); } catch { /* private mode */ } };

  let V = null;
  switch (r.view) {
    case 'dashboard': V = <Dashboard go={go} />; break;
    case 'plan': V = <Plan day={r.a ? +r.a : null} tab={r.b} />; break;
    case 'library': V = <Library go={go} />; break;
    case 'qa': V = <QA />; break;
    case 'practice': V = !r.a ? <Practice go={go} /> : exists(r.a) ? <Workspace key={r.a} item={findItem(r.a, S.pads)} go={go} /> : <NotFound />; break;
    case 'skills': V = <Skills />; break;
    case 'mock': V = <Mock go={go} />; break;
    case 'games': V = <Games />; break;
    case 'notes': V = <Notes />; break;
    default: V = r.view ? <NotFound /> : null;
  }
  const crumb = r.view === 'plan' && r.a ? `15-day plan › Day ${r.a}` : inWork && exists(r.a) ? `Practice › ${findItem(r.a, S.pads).t}` : TITLE[r.view] || '';

  return (
    <div id="app" className={open ? 'open' : ''}>
      <header>
        <button className="bt menu" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <Link to="/dashboard" className="logo">Forge<b>_</b></Link>
        <span id="crumb">{crumb}</span>
        <span id="sv" className="hide-m">{sv}</span><span className="pg" title="Current streak">🔥 {stats(S.days).current}</span><span className="pg hide-m" title={user}>{user.split('@')[0]}</span>
        <button className="bt" onClick={toggleTheme} title="Switch light / dark theme" aria-label="Switch theme">{theme === 'dark' ? '☀' : '🌙'}<span className="hide-m"> {theme === 'dark' ? 'Light' : 'Dark'}</span></button>
        <button className={'bt hide-m' + (S.unplugged ? ' pri' : '')} title="Unplugged: no hints, no Zero, no solutions" onClick={toggleUnplugged}>🔌 {S.unplugged ? 'Unplugged' : 'Plugged in'}</button>
        <button className="bt hide-m" onClick={logout}>Log out</button>
      </header>
      <nav id="nav" aria-label="Main">
        <Link to={'/practice/' + encodeURIComponent(S.cur)} className="resume"><span className="eb">▶ Resume</span><b>{resume.t}</b><small>Pick up where you left off</small></Link>
        {GROUPS.map(([g, items]) => <div key={g}><h4>{g}</h4>
          {items.map(([k, ic, t]) => <Link key={k} to={'/' + k} className={'it' + (r.view === k ? ' on' : '')} aria-current={r.view === k ? 'page' : undefined}>{ic} {t}</Link>)}</div>)}
        <h4>Scratchpads<span><button onClick={() => addPad('js')}>+ JS</button><button onClick={() => addPad('html')}>+ HTML</button><button onClick={() => addPad('react')}>+ React</button></span></h4>
        {S.pads.map(p => <Link key={p.id} to={'/practice/' + p.id} className={'it' + (inWork && r.a === p.id ? ' on' : '')}>{p.t}</Link>)}
        <div className="acct"> {/* account controls live here on phones, where the header is too small for them */}
          <h4>Account</h4><div className="acct-user">{user}</div>
          <button className="bt" onClick={toggleTheme}>{theme === 'dark' ? '☀ Switch to light theme' : '🌙 Switch to dark theme'}</button>
          <button className={'bt' + (S.unplugged ? ' pri' : '')} onClick={toggleUnplugged}>🔌 {S.unplugged ? 'Unplugged: hints and Zero off' : 'Plugged in'}</button>
          <button className="bt" onClick={logout}>Log out</button>
          <small className="mu">{sv}</small>
        </div>
      </nav>
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}
      <main id="main">{V}</main>
      {toast && <div id="toast" className="on" role="status">{toast}</div>}
    </div>
  );
}
