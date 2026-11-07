import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, Decoration, ViewPlugin, keymap, placeholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { LanguageDescription, HighlightStyle, syntaxHighlighting, syntaxTree } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const MONO = 'ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace';
// Languages for fenced code blocks load on demand, the first time a fence uses them.
const lang = (name, alias, load) => LanguageDescription.of({ name, alias, load });
const CODE_LANGS = [
  lang('JavaScript', ['js', 'jsx', 'ts', 'tsx', 'javascript', 'typescript', 'react'], () => import('@codemirror/lang-javascript').then(m => m.javascript({ jsx: true, typescript: true }))),
  lang('HTML', ['html'], () => import('@codemirror/lang-html').then(m => m.html())),
  lang('CSS', ['css'], () => import('@codemirror/lang-css').then(m => m.css())),
  lang('JSON', ['json'], () => import('@codemirror/lang-javascript').then(m => m.javascript())),
];

const style = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.definitionKeyword, t.moduleKeyword, t.operatorKeyword], color: 'var(--k)' },
  { tag: [t.string, t.special(t.string), t.regexp], color: 'var(--s)' },
  { tag: [t.number, t.bool, t.null, t.atom, t.typeName, t.className, t.attributeName], color: 'var(--n)' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--c)', fontStyle: 'italic' },
  { tag: [t.tagName, t.angleBracket], color: 'var(--k)' },
]);

// "Live preview": styles markdown as you type and hides the syntax marks on lines your cursor is not on.
const hide = Decoration.replace({}), mark = c => Decoration.mark({ class: c }), ln = c => Decoration.line({ class: c });
function decorate(view) {
  const { state } = view, doc = state.doc, out = [], active = new Set();
  for (const r of state.selection.ranges) for (let n = doc.lineAt(r.from).number; n <= doc.lineAt(r.to).number; n++) active.add(n);
  const on = pos => active.has(doc.lineAt(pos).number);
  const syn = (a, b, hideIt) => out.push(hideIt && !on(a) ? hide.range(a, b) : mark('cm-syn').range(a, b));
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(state).iterate({ from, to, enter: ref => {
      const { name, from: a, to: b } = ref; let m;
      if ((m = /^ATXHeading(\d)$/.exec(name))) out.push(ln('cm-h cm-h' + m[1]).range(doc.lineAt(a).from));
      else if (name === 'HeaderMark') { const l = doc.lineAt(a); syn(a, b < l.to ? Math.min(b + 1, l.to) : b, b < l.to); }
      else if (name === 'StrongEmphasis') out.push(mark('cm-strong').range(a, b));
      else if (name === 'Emphasis') out.push(mark('cm-em').range(a, b));
      else if (name === 'Strikethrough') out.push(mark('cm-strike').range(a, b));
      else if (name === 'EmphasisMark' || name === 'StrikethroughMark') syn(a, b, true);
      else if (name === 'InlineCode') out.push(mark('cm-icode').range(a, b));
      else if (name === 'FencedCode') {
        const first = doc.lineAt(a).number, last = doc.lineAt(b).number;
        for (let n = first; n <= last; n++) {
          const l = doc.line(n), fence = /^\s*(```|~~~)/.test(l.text) && (n === first || n === last);
          out.push(ln('cm-fl' + (n === first ? ' cm-fl-first' : '') + (n === last ? ' cm-fl-last' : '') + (fence ? ' cm-fence' : '')).range(l.from));
        }
      } else if (name === 'CodeMark') { const p = ref.node.parent; if (p && p.name === 'InlineCode') syn(a, b, true); else out.push(mark('cm-syn').range(a, b)); }
      else if (name === 'CodeInfo') out.push(mark('cm-info').range(a, b));
      else if (name === 'Blockquote') for (let n = doc.lineAt(a).number; n <= doc.lineAt(b).number; n++) out.push(ln('cm-quote').range(doc.line(n).from));
      else if (name === 'QuoteMark') out.push(mark('cm-syn').range(a, b));
      else if (name === 'ListMark') out.push(mark('cm-lmark').range(a, b));
      else if (name === 'TaskMarker') out.push(mark('cm-lmark').range(a, b));
      else if (name === 'Link') out.push(mark('cm-link').range(a, b));
      else if (name === 'URL') out.push(mark('cm-url').range(a, b));
      else if (name === 'HorizontalRule') out.push(ln('cm-hr').range(doc.lineAt(a).from));
    } });
  }
  return Decoration.set(out, true);
}
const livePreview = ViewPlugin.fromClass(class {
  constructor(view) { this.decorations = decorate(view); }
  update(u) { if (u.docChanged || u.selectionSet || u.viewportChanged || syntaxTree(u.startState) !== syntaxTree(u.state)) this.decorations = decorate(u.view); }
}, { decorations: v => v.decorations });

const theme = EditorView.theme({
  '&': { height: '100%', backgroundColor: 'var(--pn)', color: 'var(--tx)', fontSize: '14.5px' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { overflow: 'auto', fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif', lineHeight: '1.75', padding: '10px 0' },
  '.cm-content': { caretColor: 'var(--tx)', padding: '0 8px' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--tx)' },
  '.cm-placeholder': { color: 'var(--mu)' },
  '.cm-h': { fontWeight: '700' }, '.cm-h1': { fontSize: '1.55em', lineHeight: '1.5' }, '.cm-h2': { fontSize: '1.3em', lineHeight: '1.5' }, '.cm-h3': { fontSize: '1.12em' },
  '.cm-strong': { fontWeight: '700' }, '.cm-em': { fontStyle: 'italic' }, '.cm-strike': { textDecoration: 'line-through' },
  '.cm-icode': { fontFamily: MONO, fontSize: '.9em', background: 'var(--p2)', color: 'var(--s)', borderRadius: '4px', padding: '1px 4px' },
  '.cm-syn': { color: 'var(--mu)' }, '.cm-lmark': { color: 'var(--ac)', fontWeight: '700' },
  '.cm-quote': { borderLeft: '3px solid var(--ac)', paddingLeft: '12px', color: 'var(--mu)' },
  '.cm-link': { color: 'var(--n)', textDecoration: 'underline' }, '.cm-url': { color: 'var(--mu)' },
  '.cm-fl': { fontFamily: MONO, fontSize: '13px', background: 'var(--p2)', paddingLeft: '14px', lineHeight: '1.65' },
  '.cm-fl-first': { borderTopLeftRadius: '8px', borderTopRightRadius: '8px', marginTop: '6px' },
  '.cm-fl-last': { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', marginBottom: '6px' },
  '.cm-fence': { color: 'var(--mu)', fontSize: '11.5px' }, '.cm-info': { color: 'var(--ac)' },
  '.cm-hr': { borderBottom: '1px solid var(--ln)' },
});

export default function MdCM({ value, onChange, onPreview, viewRef, onFail }) {
  const host = useRef(), cb = useRef({});
  cb.current = { onChange, onPreview, onFail };
  useEffect(() => {
    let view;
    try {
      view = new EditorView({
        parent: host.current,
        state: EditorState.create({ doc: value, extensions: [
          history(),
          keymap.of([{ key: 'Mod-Enter', run: () => { cb.current.onPreview(); return true; } }, indentWithTab, ...defaultKeymap, ...historyKeymap]),
          markdown({ base: markdownLanguage, codeLanguages: CODE_LANGS }),
          syntaxHighlighting(style), livePreview, theme, EditorView.lineWrapping,
          placeholder('Write in markdown. Code inside ``` fences is highlighted.'),
          EditorView.updateListener.of(u => { if (u.docChanged) cb.current.onChange(u.state.doc.toString()); }),
        ] }),
      });
      if (viewRef) viewRef.current = view;
    } catch (e) { console.error('Rich editor failed to start:', e); cb.current.onFail && cb.current.onFail(e); }
    return () => { if (view) view.destroy(); if (viewRef) viewRef.current = null; };
  }, []);
  useEffect(() => { // keep in sync if the note text changes from outside (e.g. migration)
    const v = viewRef && viewRef.current;
    if (v && value !== v.state.doc.toString()) v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: value } });
  }, [value]);
  return <div className="cmhost" ref={host} />;
}
