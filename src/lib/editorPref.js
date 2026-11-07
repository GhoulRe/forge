// Which editor engine to use for code and notes: 'cm' (CodeMirror, default) or 'simple' (built-in, lighter).
export const getEditorPref = () => { try { return localStorage.getItem('forge.editor') || 'cm'; } catch { return 'cm'; } };
export const setEditorPref = v => { try { localStorage.setItem('forge.editor', v); } catch { /* private mode */ } };
