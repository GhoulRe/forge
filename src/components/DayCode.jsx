import { useEffect } from 'react';
import { useApp } from '../store.jsx';
import { bump } from '../lib/util.js';
import { seed, starter } from '../lib/daycode.js';
import Snippet from './Snippet.jsx';

// The day's coding notebook: prompts are pre-loaded as snippets; code is saved for future reference.
export default function DayCode({ d }) {
  const { S, up } = useApp();
  const list = S.dcode[d.n];
  useEffect(() => { if (!list) up(n => { n.dcode[d.n] = seed(d); }); }, [d.n]);
  const edit = (id, f) => up(n => { f(n.dcode[d.n].find(x => x.id === id)); });
  const add = lang => up(n => { n.dcode[d.n] = [...(n.dcode[d.n] || []), { id: 'x' + Date.now(), t: 'My snippet', lang, code: starter(lang, 'What are you trying out?') }]; });
  return (
    <div>
      <p className="mu">Each coding prompt for this day is ready as a snippet. Write it, run it, and it stays saved here as your reference. Use <b>⌘/Ctrl + Enter</b> to run.</p>
      {(list || []).map(sn => (
        <Snippet key={sn.id} sn={sn} ctxTask={`Day ${d.n}: ${d.title}. Practice prompt: ${sn.t}`} onRun={() => up(n => { bump(n); })}
          onCode={v => edit(sn.id, x => { x.code = v; })} onTitle={v => edit(sn.id, x => { x.t = v; })}
          onDelete={() => up(n => { n.dcode[d.n] = n.dcode[d.n].filter(x => x.id !== sn.id); })} />))}
      <div className="hd"><small className="mu">Add a snippet:</small><button className="bt" onClick={() => add('js')}>+ JavaScript</button><button className="bt" onClick={() => add('html')}>+ HTML</button><button className="bt" onClick={() => add('react')}>+ React</button></div>
    </div>
  );
}
