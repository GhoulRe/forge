import { useEffect, useState } from 'react';
import Editor from './Editor.jsx';
import Boundary from './Boundary.jsx';
import { getEditorPref } from '../lib/editorPref.js';

// One remembered attempt to load CodeMirror. If it is unavailable we use the simple editor and never swap under your cursor.
let load = null, failed = false;
export const loadCodeCM = () => (load = load || import('./CodeCM.jsx').then(m => m.default).catch(e => { failed = true; console.warn('CodeMirror unavailable, using the simple editor:', e); throw e; }));

// Drop-in replacement for <Editor>: CodeMirror when available, the simple editor otherwise.
export default function CodeEditor(props) {
  const [CM, setCM] = useState(null), [simple, setSimple] = useState(failed || getEditorPref() === 'simple');
  useEffect(() => {
    let on = true;
    if (!simple) loadCodeCM().then(c => on && setCM(() => c), () => on && setSimple(true));
    return () => { on = false; };
  }, []);
  const fallback = <Editor {...props} />;
  if (simple) return fallback;
  if (!CM) return <div className="ed edload">Loading editor…</div>;
  return <Boundary fallback={fallback}><div className="ed"><div className="cmhost cmfill"><CM {...props} onFail={() => setSimple(true)} /></div></div></Boundary>;
}
