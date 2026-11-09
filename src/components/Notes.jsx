import { useEffect, useRef, useState } from 'react';
import { getEditorPref, setEditorPref } from '../lib/editorPref.js';
import { useApp } from '../store.jsx';

const FIELDS = [['intro', 'Introduce yourself (60 seconds)'], ['project', 'Your best project, STAR style'], ['bug', 'A hard bug you solved'], ['why', 'Why this role and company?']];

export default function Notes() {
  const { S, up, say, user } = useApp();
  const file = useRef(), [pref, setPref] = useState(getEditorPref());
  const [fsField, setFsField] = useState(null);
  const set = (k, v) => up(n => { n.notes[k] = v; });

  useEffect(() => {
    if (!fsField) return;
    const onKey = e => { if (e.key === 'Escape') setFsField(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fsField]);
  const exportAll = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), user, state: S }, null, 2)], { type: 'application/json' }));
    a.download = 'forge-backup.json'; a.click(); URL.revokeObjectURL(a.href);
  };
  const importFile = async e => {
    try {
      const j = JSON.parse(await e.target.files[0].text()), o = j.state || j.progress || j;
      up(n => {
        if (o.taskChecks) Object.assign(n.tasks, o.taskChecks);            // old 15-day plan file
        if (o.problemChecks) for (const [k, v] of Object.entries(o.problemChecks)) if (v) n.done[k] = 1;
        if (o.dayNotes) Object.assign(n.dnotes, o.dayNotes);
        if (o.globalNotes) n.notes.g = o.globalNotes;
        if (o.stories) { const s = o.stories; Object.assign(n.notes, { intro: s.introNote, project: s.projectNote, bug: s.bugNote, why: s.whyNote }); }
        if (o.tasks) Object.assign(n.tasks, o.tasks);                      // Forge backup
        if (o.done) Object.assign(n.done, o.done);
        if (o.qs) Object.assign(n.qs, o.qs);
        if (o.code) Object.assign(n.code, o.code);
        for (const k of ['dn', 'dcode', 'dres', 'topics', 'games', 'dnotes']) if (o[k]) Object.assign(n[k], o[k]);   // notes, snippets, resources, skill-tree results...
        if (o.pads) { const have = new Set(n.pads.map(p => p.id)); n.pads.push(...o.pads.filter(p => !have.has(p.id))); }
        if (o.days) for (const [k, v] of Object.entries(o.days)) n.days[k] = Math.max(n.days[k] || 0, v);   // keeps your streak history
        if (o.mocks) n.mocks = [...n.mocks, ...o.mocks].slice(-30);
        if (o.log) n.log = [...n.log, ...o.log].slice(-60);
      });
      say('Imported ✓');
    } catch { say('That file could not be read'); }
    e.target.value = '';
  };
  return (
    <div className="page">
      <div className="eb">Notes & backup</div><h1>Your story and notes</h1>
      {FIELDS.map(([k, t]) => (
        <div key={k}>
          <div className="hd" style={{ margin: '22px 0 6px', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, padding: 0, border: 0 }}>{t}</h3>
            <button className="bt" onClick={() => setFsField(k)} title="Full screen focus mode (Esc to exit)">⛶ Full screen</button>
          </div>
          <textarea className="na" rows={4} value={S.notes[k] || ''} onChange={e => set(k, e.target.value)} />
        </div>
      ))}
      <div className="hd" style={{ margin: '22px 0 6px', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, padding: 0, border: 0 }}>Scratch notes</h3>
        <button className="bt" onClick={() => setFsField('g')} title="Full screen focus mode (Esc to exit)">⛶ Full screen</button>
      </div>
      <textarea className="na" rows={6} placeholder="Anything else…" value={S.notes.g || ''} onChange={e => set('g', e.target.value)} />
      {fsField && (
        <div className="notes-fs-overlay">
          <div className="hd" style={{ justifyContent: 'space-between', margin: '0 0 12px' }}>
            <div>
              <span className="pill" style={{ marginRight: 8 }}>Focus Mode</span>
              <b>{fsField === 'g' ? 'Scratch notes' : FIELDS.find(([k]) => k === fsField)?.[1]}</b>
            </div>
            <div className="hd" style={{ margin: 0 }}>
              <small className="mu">{(S.notes[fsField] || '').trim() ? (S.notes[fsField] || '').trim().split(/\s+/).length : 0} words · saved automatically · Esc to exit</small>
              <button className="bt pri" onClick={() => setFsField(null)}>↙ Exit full screen</button>
            </div>
          </div>
          <textarea
            className="na notes-fs-ta"
            value={S.notes[fsField] || ''}
            onChange={e => set(fsField, e.target.value)}
            placeholder={fsField === 'g' ? 'Anything else… write freely' : 'Write your answer here…'}
            autoFocus
          />
        </div>
      )}
      <h3>Code editor</h3>
      <p className="mu">Notes and code use CodeMirror (proper undo, bracket matching, auto-closing brackets). If it ever misbehaves on your device, switch to the simple built-in editor. Reload the page after changing.</p>
      <div className="ch">{[['cm', 'CodeMirror (recommended)'], ['simple', 'Simple editor']].map(([k, l]) => <button key={k} className={'bt' + (pref === k ? ' pri' : '')} onClick={() => { setEditorPref(k); setPref(k); say('Saved. Reload the page to apply.'); }}>{l}</button>)}</div>
      <h3>Backup & import</h3>
      <p className="mu">Your data is already saved to your account. Export a copy any time, or import progress from the old single-file plan (its exported JSON) or a Forge backup.</p>
      <div className="ch"><button className="bt" onClick={exportAll}>⬇ Export backup</button><button className="bt" onClick={() => file.current.click()}>⬆ Import progress</button><input ref={file} type="file" accept="application/json,.json" hidden onChange={importFile} /></div>
    </div>
  );
}
