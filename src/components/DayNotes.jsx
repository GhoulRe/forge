import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../store.jsx';
import { md } from '../lib/md.js';
import { seed } from '../lib/daycode.js';
import Editor from './Editor.jsx';
import Boundary from './Boundary.jsx';
import { getEditorPref } from '../lib/editorPref.js';

// CodeMirror is loaded on demand with ONE remembered attempt: if it is unavailable we stay on the simple editor (no swapping under your cursor).
let cmLoad = null, cmFailed = false;
const loadCM = () => (cmLoad = cmLoad || import('./MdCM.jsx').then(m => m.default).catch(e => { cmFailed = true; console.warn('Rich editor unavailable, using the simple editor:', e); throw e; }));

const TEMPLATE = '## Key ideas\n- \n\n## Example\n```js\n\n```\n\n## Remember\n> \n';
const TOOLS = [['H', '## ', '', 'Heading'], ['B', '**', '**', 'Bold'], ['I', '*', '*', 'Italic'], ['`', '`', '`', 'Inline code'], ['{ }', '```js\n', '\n```', 'Code block'], ['•', '- ', '', 'Bullet'], ['☐', '- [ ] ', '', 'Checklist'], ['🔗', '[', '](https://)', 'Link']];

// Proper notes for a day: several markdown notes, edit/preview, code blocks you can copy or save as snippets.
export default function DayNotes({ d }) {
  const { S, up, say } = useApp();
  const list = S.dn[d.n];
  useEffect(() => { let on = true; if (!cmFailed && getEditorPref() !== 'simple') loadCM().then(c => on && setCM(() => c), () => on && setSimple(true)); return () => { on = false; }; }, []);
  const [sel, setSel] = useState(null), [view, setView] = useState(false), [simple, setSimple] = useState(cmFailed || getEditorPref() === 'simple'), [CM, setCM] = useState(null), ta = useRef(), cm = useRef();
  useEffect(() => { // first visit: bring any older single note across
    if (!list) up(n => { const old = n.dnotes[d.n]; n.dn[d.n] = old ? [{ id: 'n0', t: 'Quick notes', b: old, ts: Date.now() }] : []; delete n.dnotes[d.n]; });
  }, [d.n]);
  const notes = list || [], note = notes.find(x => x.id === sel) || notes[0];
  const html = useMemo(() => (note ? md(note.b) : { html: '', blocks: [] }), [note?.b]);
  const edit = (id, f) => up(n => { const x = n.dn[d.n].find(y => y.id === id); f(x); x.ts = Date.now(); });
  const add = () => { const id = 'n' + Date.now(); up(n => { n.dn[d.n] = [...(n.dn[d.n] || []), { id, t: 'Untitled note', b: TEMPLATE, ts: Date.now() }]; }); setSel(id); setView(false); };
  const ins = (pre, post, ph) => {
    const v2 = cm.current; // CodeMirror editor, when it is active
    if (v2) { const s = v2.state.selection.main, mid = v2.state.sliceDoc(s.from, s.to) || ph || ''; v2.dispatch({ changes: { from: s.from, to: s.to, insert: pre + mid + post }, selection: { anchor: s.from + pre.length, head: s.from + pre.length + mid.length } }); v2.focus(); return; }
    const t = ta.current, a = t.selectionStart, b = t.selectionEnd, v = note.b, mid = v.slice(a, b) || ph || '';
    edit(note.id, x => { x.b = v.slice(0, a) + pre + mid + post + v.slice(b); });
    requestAnimationFrame(() => { t.focus(); t.setSelectionRange(a + pre.length, a + pre.length + mid.length); });
  };
  const act = e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const blk = html.blocks[+b.dataset.i];
    if (b.dataset.act === 'copy') { navigator.clipboard?.writeText(blk.code); say('Copied'); }
    else { up(n => { n.dcode[d.n] = [...(n.dcode[d.n] || seed(d)), { id: 'x' + Date.now(), t: (note.t || 'Note') + ' · snippet', lang: blk.lang, code: blk.code }]; }); say('Saved to the Code tab'); }
  };
  return (
    <div>
      <div className="hd">{notes.map(x => <button key={x.id} className={'bt' + (note && x.id === note.id ? ' pri' : '')} onClick={() => { setSel(x.id); setView(!!x.b.trim()); }}>{x.t || 'Untitled'}</button>)}<button className="bt" onClick={add}>+ New note</button></div>
      {!note ? <p className="mu">No notes for this day yet. Create one: use headings, lists, checklists and code blocks. Code blocks can be saved as runnable snippets.</p> : <>
        <div className="hd">
          <input className="stitle" value={note.t} onChange={e => edit(note.id, x => { x.t = e.target.value; })} aria-label="Note title" />
          <button className={'bt' + (!view ? ' pri' : '')} onClick={() => setView(false)}>Edit</button><button className={'bt' + (view ? ' pri' : '')} onClick={() => setView(true)}>Preview</button>
          <button className="bt" aria-label="Delete note" onClick={() => { if (confirm('Delete this note?')) { up(n => { n.dn[d.n] = n.dn[d.n].filter(x => x.id !== note.id); }); setSel(null); } }}>🗑</button>
        </div>
        {view ? <div className="mdv" onClick={act} dangerouslySetInnerHTML={{ __html: html.html || '<p class="mu">Nothing written yet.</p>' }} /> : <>
          <div className="tools">{TOOLS.map(([l, a, b, t]) => <button key={t} className="bt" title={t} aria-label={t} onClick={() => ins(a, b, t === 'Heading' ? 'Heading' : t === 'Code block' ? 'code' : t === 'Link' ? 'text' : '')}>{l}</button>)}</div>
          {(() => { const simpleEd = <div className="mdbox"><Editor value={note.b} lang="md" taRef={ta} onChange={v => edit(note.id, x => { x.b = v; })} onRun={() => setView(true)} /></div>;
            if (simple) return simpleEd;
            if (!CM) return <div className="mdbox mu" style={{ padding: 14 }}>Loading editor…</div>;
            return <Boundary fallback={simpleEd}><div className="mdbox"><CM key={note.id} value={note.b} viewRef={cm} onFail={() => setSimple(true)} onChange={v => edit(note.id, x => { x.b = v; })} onPreview={() => setView(true)} /></div></Boundary>; })()}
          <small className="mu">{note.b.trim() ? note.b.trim().split(/\s+/).length : 0} words · live formatting · code in ``` fences is highlighted · ⌘/Ctrl + Enter for preview · saved automatically</small></>}
      </>}
    </div>
  );
}
