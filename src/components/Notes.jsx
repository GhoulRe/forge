import { useRef } from 'react';
import { useApp } from '../store.jsx';

const FIELDS = [['intro', 'Introduce yourself (60 seconds)'], ['project', 'Your best project, STAR style'], ['bug', 'A hard bug you solved'], ['why', 'Why this role and company?']];

export default function Notes() {
  const { S, up, say, user } = useApp();
  const file = useRef();
  const set = (k, v) => up(n => { n.notes[k] = v; });
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
      {FIELDS.map(([k, t]) => <div key={k}><h3>{t}</h3><textarea className="na" rows={4} value={S.notes[k] || ''} onChange={e => set(k, e.target.value)} /></div>)}
      <h3>Scratch notes</h3><textarea className="na" rows={6} placeholder="Anything else…" value={S.notes.g || ''} onChange={e => set('g', e.target.value)} />
      <h3>Backup & import</h3>
      <p className="mu">Your data is already saved to your account. Export a copy any time, or import progress from the old single-file plan (its exported JSON) or a Forge backup.</p>
      <div className="ch"><button className="bt" onClick={exportAll}>⬇ Export backup</button><button className="bt" onClick={() => file.current.click()}>⬆ Import progress</button><input ref={file} type="file" accept="application/json,.json" hidden onChange={importFile} /></div>
    </div>
  );
}
