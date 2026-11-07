import { useEffect, useLayoutEffect, useRef } from 'react';
import { hl } from '../lib/util.js';
import { hlMd, listNext } from '../lib/md.js';

// Lightweight editor: a transparent textarea over a syntax-highlighted <pre>.
export default function Editor({ value, onChange, lang, onRun, taRef = null }) {
  const own = useRef(), pre = useRef(), ta = taRef || own;
  const sync = () => { pre.current.scrollTop = ta.current.scrollTop; pre.current.scrollLeft = ta.current.scrollLeft; };
  useEffect(sync, [value]);
  const want = useRef(null); // caret position to restore right after the next render (synchronously, so fast typing cannot race it)
  useLayoutEffect(() => { if (want.current !== null && ta.current) { ta.current.setSelectionRange(want.current, want.current); want.current = null; } });
  const edit = (text, caret) => { want.current = caret; onChange(text); };
  const onKey = e => {
    const t = e.target, a = t.selectionStart, b = t.selectionEnd, v = t.value;
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); onRun(); }
    else if (e.key === 'Tab') { e.preventDefault(); edit(v.slice(0, a) + '  ' + v.slice(b), a + 2); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const line = v.slice(0, a).split('\n').pop();
      const li = lang === 'md' ? listNext(line) : null; // markdown lists continue on Enter
      if (li) return li.empty ? edit(v.slice(0, a - line.length) + v.slice(b), a - line.length) : edit(v.slice(0, a) + '\n' + li.next + v.slice(b), a + 1 + li.next.length);
      const ind = line.match(/^\s*/)[0] + (/[{(\[]\s*$/.test(line) ? '  ' : '');
      edit(v.slice(0, a) + '\n' + ind + v.slice(b), a + 1 + ind.length);
    }
  };
  return (
    <div className="ed">
      <pre ref={pre} aria-hidden="true" dangerouslySetInnerHTML={{ __html: (lang === 'md' ? hlMd(value) : hl(value, lang)) + '\n ' }} />
      <textarea ref={ta} value={value} onChange={e => onChange(e.target.value)} onKeyDown={onKey} onScroll={sync}
        spellCheck={false} autoCapitalize="off" autoComplete="off" aria-label="Code editor" />
    </div>
  );
}
