// Helpers for the per-day notebook: starter code for each language, seeding from a day's coding prompts, safe URLs.
export const starter = (lang, p) =>
  lang === 'react' ? `// ${p}\nfunction App() {\n  return <div>Build it here</div>;\n}\n`
  : lang === 'html' ? `<!-- ${p} -->\n<div id="app"></div>\n<script>\n  \n<\/script>\n`
  : `// ${p}\n\nfunction solve() {\n  \n}\n\nconsole.log(solve());\n`;

// Each coding prompt of a day becomes a ready-to-edit snippet (React days get a React starter).
export const seed = d => (d.coding || []).map((p, i) => {
  const lang = d.phase === 'React' ? 'react' : 'js';
  return { id: `d${d.n}s${i}`, t: p.replace(/\.$/, ''), lang, code: starter(lang, p) };
});

// Only http(s) links are accepted (blocks javascript: and similar).
export const safeUrl = x => {
  const u = /^https?:\/\//i.test(x.trim()) ? x.trim() : 'https://' + x.trim();
  try { const p = new URL(u); return /^https?:$/.test(p.protocol) && p.hostname.includes('.') ? p.href : null; } catch { return null; }
};

export const SUGGEST = {
  JavaScript: [['MDN JavaScript Guide', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'], ['javascript.info', 'https://javascript.info'], ['You Don’t Know JS Yet', 'https://github.com/getify/You-Dont-Know-JS']],
  React: [['React docs: Learn', 'https://react.dev/learn'], ['React docs: Reference', 'https://react.dev/reference/react'], ['Patterns.dev', 'https://www.patterns.dev']],
  Interview: [['GreatFrontEnd', 'https://www.greatfrontend.com'], ['web.dev Learn', 'https://web.dev/learn'], ['MDN Web Docs', 'https://developer.mozilla.org']],
};
