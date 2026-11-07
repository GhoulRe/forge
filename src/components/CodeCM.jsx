import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { HighlightStyle, syntaxHighlighting, bracketMatching, indentOnInput, indentUnit } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { tags as t } from '@lezer/highlight';

const MONO = 'ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace';
const style = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.definitionKeyword, t.moduleKeyword, t.operatorKeyword], color: 'var(--k)' },
  { tag: [t.string, t.special(t.string), t.regexp], color: 'var(--s)' },
  { tag: [t.number, t.bool, t.null, t.atom, t.typeName, t.className, t.attributeName], color: 'var(--n)' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--c)', fontStyle: 'italic' },
  { tag: [t.tagName, t.angleBracket], color: 'var(--k)' },
]);
const theme = EditorView.theme({
  '&': { height: '100%', backgroundColor: 'var(--pn)', color: 'var(--tx)', fontSize: '13px' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { overflow: 'auto', fontFamily: MONO, lineHeight: '1.6' },
  '.cm-content': { caretColor: 'var(--tx)', padding: '12px 0' },
  '.cm-cursor': { borderLeftColor: 'var(--tx)' },
  '.cm-gutters': { backgroundColor: 'var(--pn)', color: 'var(--mu)', border: 'none' },
  '.cm-activeLine': { backgroundColor: 'color-mix(in srgb, var(--p2) 55%, transparent)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--tx)' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': { background: 'color-mix(in srgb, var(--ac) 30%, transparent) !important' },
  '.cm-matchingBracket': { backgroundColor: 'color-mix(in srgb, var(--ac) 25%, transparent)', outline: '1px solid var(--ac)' },
});

// Code editor on CodeMirror 6: real undo/redo, bracket matching and auto-closing, language-aware indent. Loaded on demand.
export default function CodeCM({ value, onChange, lang, onRun, onFail }) {
  const host = useRef(), view = useRef(), cb = useRef({});
  cb.current = { onChange, onRun, onFail };
  useEffect(() => {
    try {
      view.current = new EditorView({
        parent: host.current,
        state: EditorState.create({ doc: value, extensions: [
          lineNumbers(), history(), drawSelection(), highlightActiveLine(), bracketMatching(), closeBrackets(), indentOnInput(),
          indentUnit.of('  '), EditorState.tabSize.of(2),
          keymap.of([{ key: 'Mod-Enter', run: () => { if (cb.current.onRun) cb.current.onRun(); return true; } }, indentWithTab, ...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
          lang === 'html' ? html() : javascript({ jsx: lang === 'react' }),
          syntaxHighlighting(style), theme,
          EditorView.contentAttributes.of({ 'aria-label': 'Code editor', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' }),
          EditorView.updateListener.of(u => { if (u.docChanged) cb.current.onChange(u.state.doc.toString()); }),
        ] }),
      });
    } catch (e) { console.error('Code editor failed to start:', e); if (cb.current.onFail) cb.current.onFail(e); }
    return () => { if (view.current) { view.current.destroy(); view.current = null; } };
  }, []);
  useEffect(() => { // keep in sync when the text is changed from outside (for example Reset)
    const v = view.current;
    if (v && value !== v.state.doc.toString()) v.dispatch({ changes: { from: 0, to: v.state.doc.length, insert: value } });
  }, [value]);
  return <div className="cmhost" ref={host} />;
}
