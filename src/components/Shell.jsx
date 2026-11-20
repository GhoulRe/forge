import { useEffect, useState } from 'react';
import { backend } from '../backend.js';
import { useApp } from '../store.jsx';
import { catalog, findItem, lessons } from '../data/items.js';
import { removePad } from '../lib/pads.js';
import { stats } from '../lib/util.js';
import { parse, pathFor } from '../lib/route.js';
import { navigate, usePath } from '../router.js';
import Link from './Link.jsx';
import Dashboard from './Dashboard.jsx';
import Plan from './Plan.jsx';
import QA from './QA.jsx';
import CodingBank from './CodingBank.jsx';
import Revision from './Revision.jsx';
import Practice from './Practice.jsx';
import Workspace from './Workspace.jsx';
import Notes from './Notes.jsx';
import Skills from './Skills.jsx';
import Mock from './Mock.jsx';
import Games from './Games.jsx';
import Library from './Library.jsx';
import { loadCodeCM } from './CodeEditor.jsx';
import { getEditorPref } from '../lib/editorPref.js';

const GROUPS = [
  ['Study', [
    ['dashboard', '📊', 'Dashboard'],
    ['plan', '🗓', '15-Day Plan'],
    ['qa', '💬', 'Interview Q&A'],
    ['coding', '🧩', 'Coding Bank'],
    ['revision', '🔁', 'Revision & Weak Spots'],
    ['library', '📚', 'My Library'],
    ['notes', '📝', 'Notes & Backup']
  ]],
  ['Practice', [
    ['practice', '🧪', 'Practice Labs'],
    ['skills', '🧠', 'Concept Tree'],
    ['mock', '🎤', 'Mock Interview']
  ]],
  ['Break', [
    ['games', '🎮', 'Break Room']
  ]]
];

const TITLE = Object.fromEntries(GROUPS.flatMap(g => g[1]).map(([k, , t]) => [k, t]));
const PAD = {
  js: "// Experiment freely. Press ⌘/Ctrl + Enter to run.\nconsole.log('hello from Forjix');\n",
  html: '<h1>Hello from Forjix</h1>\n<script>console.log("hi")<\/script>\n',
  react: 'function App() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>Clicked {n}</button>;\n}\n',
};

const NotFound = () => (
  <div className="page">
    <h1>Page not found</h1>
    <p className="mu">
      That address does not exist.{' '}
      <Link to="/dashboard" style={{ color: 'var(--ac)' }}>Go to the dashboard</Link>
    </p>
  </div>
);

export default function Shell({ onOut, onShowAuth }) {
  const { S, up, say, sv, toast, user } = useApp();
  const path = usePath(), r = parse(path);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark');
  const [accent, setAccent] = useState(document.documentElement.dataset.accent || 'mint');
  const exists = id => catalog.some(i => i.id === id) || S.pads.some(p => p.id === id);
  const inWork = r.view === 'practice' && r.a;
  const resume = findItem(S.cur, S.pads);
  const explicitTrack = r.a === 'practical' || r.a === 'advanced'
    ? r.a
    : r.view === 'plan' && r.a ? 'advanced' : null;

  useEffect(() => {
    if (getEditorPref() === 'simple') return undefined;
    const goW = () => loadCodeCM().catch(() => {}), idle = 'requestIdleCallback' in window;
    const id = idle ? requestIdleCallback(goW, { timeout: 4000 }) : setTimeout(goW, 1500);
    return () => (idle ? cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  useEffect(() => {
    if (!r.view) navigate(S.last && S.last !== '/' ? S.last : '/dashboard', true);
  }, [r.view]);

  useEffect(() => {
    document.getElementById('main')?.scrollTo(0, 0);
    setOpen(false);
    if (r.view && (S.last !== path || (inWork && exists(r.a) && S.cur !== r.a) || (explicitTrack && S.planTrack !== explicitTrack))) {
      up(n => {
        n.last = path;
        if (explicitTrack) n.planTrack = explicitTrack;
        if (inWork && exists(r.a)) n.cur = r.a;
      });
    }
  }, [path]);

  const go = (v, id) => navigate(pathFor(v, id, S.cur));

  const addPad = lang => {
    const id = 'pad' + Date.now();
    up(n => {
      n.pads.push({ id, tr: 'Scratchpads', t: 'Scratchpad ' + (n.pads.length + 1), lang, code: PAD[lang] });
    });
    navigate('/practice/' + id);
  };

  const deletePad = p => {
    if (!window.confirm(`Delete "${p.t}"? Its code is removed and cannot be recovered.`)) return;
    up(n => removePad(n, p.id, lessons[0].id));
    if (inWork && r.a === p.id) navigate('/practice');
    say('Scratchpad deleted');
  };

  const toggleUnplugged = () => up(n => { n.unplugged = !n.unplugged; });

  const logout = async () => {
    if (user === 'guest') {
      if (window.confirm('Leave Guest mode and return to sign-in screen? Your local data is preserved in this browser.')) {
        onOut();
      }
      return;
    }
    await backend.logout().catch(() => {});
    onOut();
  };

  const toggleTheme = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem('forjix.theme', t);
      localStorage.setItem('forge.theme', t);
    } catch {
      /* private mode */
    }
  };

  const toggleAccent = () => {
    const a = accent === 'mint' ? 'orange' : 'mint';
    setAccent(a);
    if (a === 'mint') {
      delete document.documentElement.dataset.accent;
    } else {
      document.documentElement.dataset.accent = a;
    }
    try { localStorage.setItem('forjix.accent', a); } catch { /* private mode */ }
  };

  let V = null;
  switch (r.view) {
    case 'dashboard': V = <Dashboard go={go} />; break;
    case 'plan': {
      const isTrackPath = r.a === 'practical' || r.a === 'advanced';
      const track = isTrackPath ? r.a : (r.a ? 'advanced' : (S.planTrack || 'practical'));
      const day = isTrackPath ? (r.b ? +r.b : null) : (r.a ? +r.a : null);
      const tab = isTrackPath ? r.c : r.b;
      V = <Plan key={track} track={track} day={day} tab={tab} />;
      break;
    }
    case 'qa': {
      const track = r.a === 'practical' || r.a === 'advanced' ? r.a : (S.planTrack || 'practical');
      V = <QA key={track} track={track} />;
      break;
    }
    case 'coding': {
      const track = r.a === 'practical' || r.a === 'advanced' ? r.a : (S.planTrack || 'practical');
      V = <CodingBank key={track} track={track} go={go} />;
      break;
    }
    case 'revision': V = <Revision go={go} />; break;
    case 'library': V = <Library go={go} />; break;
    case 'practice':
      V = !r.a
        ? <Practice go={go} />
        : exists(r.a)
          ? <Workspace key={r.a} item={findItem(r.a, S.pads)} go={go} />
          : <NotFound />;
      break;
    case 'skills': V = <Skills />; break;
    case 'mock': V = <Mock go={go} />; break;
    case 'games': V = <Games />; break;
    case 'notes': V = <Notes />; break;
    default: V = r.view ? <NotFound /> : null;
  }

  const crumb = r.view === 'plan' && r.a
    ? `15-Day Plan › Day ${r.a}`
    : inWork && exists(r.a)
      ? `Practice › ${findItem(r.a, S.pads).t}`
      : TITLE[r.view] || '';

  return (
    <div id="app" className={open ? 'open' : ''}>
      <header>
        <button className="bt menu" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <Link to="/dashboard" className="logo">Forjix<b>_</b></Link>
        <span id="crumb">{r.view === 'plan'
          ? ((r.a === 'practical' || r.a === 'advanced')
              ? (r.a === 'practical' ? 'Practical' : 'Advanced') + ' Plan' + (r.b ? ' · Day ' + r.b : '')
              : r.a ? 'Advanced Plan · Day ' + r.a : 'Practical 15-Day Plan')
          : crumb}</span>
        <span id="sv" className="hide-m">{sv}</span>
        <span className="pg" title="Current streak">🔥 {stats(S.days).current}</span>

        {user === 'guest' ? (
          <button
            className="bt pri hide-m"
            style={{ fontSize: 12, padding: '4px 9px' }}
            onClick={onShowAuth}
            title="Link Firebase account to sync progress to cloud"
          >
            ☁ Link Firebase
          </button>
        ) : (
          <span className="pg hide-m" title={user}>{user.split('@')[0]}</span>
        )}

        <button
          className="bt"
          onClick={toggleTheme}
          title="Switch light / dark theme"
          aria-label="Switch theme"
        >
          {theme === 'dark' ? '☀' : '🌙'}
          <span className="hide-m"> {theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button
          className="bt accent-toggle"
          onClick={toggleAccent}
          title={accent === 'mint' ? 'Switch to Classic Orange accent' : 'Switch to Mint accent'}
          aria-label="Switch accent color"
        >
          {accent === 'mint' ? '🟢' : '🟠'}
          <span className="hide-m"> {accent === 'mint' ? 'Mint' : 'Orange'}</span>
        </button>

        <button
          className={'bt hide-m' + (S.unplugged ? ' pri' : '')}
          title="Unplugged: no hints, no Zero, no solutions"
          onClick={toggleUnplugged}
        >
          🔌 {S.unplugged ? 'Unplugged' : 'Plugged in'}
        </button>

        <button className="bt hide-m" onClick={logout}>
          {user === 'guest' ? 'Exit Guest' : 'Log out'}
        </button>
      </header>

      <nav id="nav" aria-label="Main">
        <Link to={'/practice/' + encodeURIComponent(S.cur)} className="resume">
          <span className="eb">▶ Resume</span>
          <b>{resume.t}</b>
          <small>Pick up where you left off</small>
        </Link>

        {GROUPS.map(([g, items]) => (
          <div key={g}>
            <h4>{g}</h4>
            {items.map(([k, ic, t]) => {
              const track = S.planTrack || 'practical';
              const to = k === 'plan' && track === 'advanced'
                ? '/plan/advanced'
                : (k === 'qa' || k === 'coding') ? '/' + k + '/' + track : '/' + k;
              return (
                <Link
                  key={k}
                  to={to}
                  className={'it' + (r.view === k ? ' on' : '')}
                  aria-current={r.view === k ? 'page' : undefined}
                >
                  {ic} {t}
                </Link>
              );
            })}
          </div>
        ))}

        <h4 className="scratchpad-title">Scratchpads</h4>
        <div className="scratchpad-actions" aria-label="Create scratchpad">
          <button title="Create JavaScript scratchpad" onClick={() => addPad('js')}>+ JS</button>
          <button title="Create HTML scratchpad" onClick={() => addPad('html')}>+ HTML</button>
          <button title="Create React scratchpad" onClick={() => addPad('react')}>+ React</button>
        </div>

        {S.pads.map(p => (
          <div key={p.id} className="padrow">
            <Link
              to={'/practice/' + p.id}
              className={'it' + (r.view === 'practice' && r.a === p.id ? ' on' : '')}
            >
              📄 {p.t}
            </Link>
            <button
              className="delpad"
              onClick={() => deletePad(p)}
              title="Delete scratchpad"
              aria-label={'Delete ' + p.t}
            >
              ×
            </button>
          </div>
        ))}

        {user === 'guest' && (
          <div style={{ margin: '18px 8px 10px', padding: 12, background: 'var(--p2)', borderRadius: 10, fontSize: 12 }}>
            <b>Offline Guest Mode</b>
            <p className="mu" style={{ margin: '4px 0 8px', fontSize: 11 }}>
              Progress is stored in this browser. Link Firebase to access from any computer.
            </p>
            <button
              className="bt pri"
              style={{ width: '100%', fontSize: 11, padding: '4px 8px' }}
              onClick={onShowAuth}
            >
              ☁ Link Firebase Account
            </button>
          </div>
        )}
      </nav>

      <main id="main">{V}</main>
      <div id="toast" className={toast ? 'on' : ''}>{toast}</div>
    </div>
  );
}
