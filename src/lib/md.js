import { esc, hl } from './util.js';

// Tiny, safe markdown renderer. ALL input is HTML-escaped first; only http(s) links are allowed.
const LANG = { js: 'js', javascript: 'js', ts: 'js', typescript: 'js', jsx: 'react', react: 'react', tsx: 'react', html: 'html' };
export const langOf = l => LANG[(l || '').toLowerCase()] || 'js';

function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => '\u0000' + (codes.push(c) - 1) + '\u0000');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)"'<>]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => '<code>' + codes[i] + '</code>');
}

export function md(src) {
  const lines = String(src || '').replace(/\r/g, '').split('\n'), out = [], blocks = [];
  let para = [], list = null, i = 0;
  const fp = () => { if (para.length) { out.push('<p>' + inline(esc(para.join(' '))) + '</p>'); para = []; } };
  const fl = () => { if (list) { out.push(`<${list.t}>${list.items.join('')}</${list.t}>`); list = null; } };
  const item = (t, html) => { fp(); if (!list || list.t !== t) { fl(); list = { t, items: [] }; } list.items.push('<li>' + html + '</li>'); };
  while (i < lines.length) {
    const L = lines[i]; let m;
    if ((m = L.match(/^```\s*([\w-]*)\s*$/))) {
      fp(); fl();
      const code = []; i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
      const body = code.join('\n'), lang = langOf(m[1]), k = blocks.push({ lang, code: body }) - 1;
      out.push(`<div class="mcb"><div class="mch"><span>${esc(m[1] || 'code')}</span><span><button data-act="copy" data-i="${k}">Copy</button><button data-act="snip" data-i="${k}">Save as snippet</button></span></div><pre class="mono">${hl(body, lang === 'html' ? 'html' : 'js')}</pre></div>`);
    } else if ((m = L.match(/^(#{1,3})\s+(.*)$/))) { fp(); fl(); const h = 2 + m[1].length; out.push(`<h${h}>${inline(esc(m[2]))}</h${h}>`); }
    else if ((m = L.match(/^\s*[-*]\s+\[( |x|X)\]\s+(.*)$/))) item('ul', (m[1] === ' ' ? '☐ ' : '☑ ') + inline(esc(m[2])));
    else if ((m = L.match(/^\s*[-*]\s+(.*)$/))) item('ul', inline(esc(m[1])));
    else if ((m = L.match(/^\s*\d+\.\s+(.*)$/))) item('ol', inline(esc(m[1])));
    else if ((m = L.match(/^>\s?(.*)$/))) { fp(); fl(); out.push('<blockquote>' + inline(esc(m[1])) + '</blockquote>'); }
    else if (/^---+\s*$/.test(L)) { fp(); fl(); out.push('<hr>'); }
    else if (!L.trim()) { fp(); fl(); }
    else { fl(); para.push(L.trim()); }
    i++;
  }
  fp(); fl();
  return { html: out.join('\n'), blocks };
}

// ---- Editor support ----
// Colours markdown while you type. INVARIANT: the visible text is exactly the input (tags only wrap it),
// so the highlighted layer lines up perfectly with the textarea on top of it.
export function hlMd(src) {
  const lines = String(src).split('\n'), out = [];
  const inl = s => esc(s).replace(/(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\[[^\]\n]+\]\([^)\s]+\))|(https?:\/\/[^\s<]+)/g,
    (m, c, b) => (c ? `<i class="mi">${m}</i>` : b ? `<i class="mb">${m}</i>` : `<i class="ma">${m}</i>`));
  for (let i = 0; i < lines.length;) {
    const L = lines[i], f = L.match(/^```\s*([\w-]*)\s*$/);
    if (f) { // fenced code block: syntax-highlight the code and tint it
      const code = []; let j = i + 1;
      while (j < lines.length && !/^```\s*$/.test(lines[j])) code.push(lines[j++]);
      const segs = [`<i class="mf">${esc(L)}</i>`];
      if (code.length) segs.push(`<i class="mdc">${hl(code.join('\n'), langOf(f[1]) === 'html' ? 'html' : 'js')}</i>`);
      if (j < lines.length) segs.push(`<i class="mf">${esc(lines[j])}</i>`);
      out.push(segs.join('\n')); i = j < lines.length ? j + 1 : j; continue;
    }
    let m;
    if (/^#{1,6}\s/.test(L)) out.push(`<i class="mh">${esc(L)}</i>`);
    else if (/^>/.test(L)) out.push(`<i class="mq">${esc(L)}</i>`);
    else if ((m = L.match(/^(\s*)([-*]|\d+\.)(\s+)(\[[ xX]\])?/))) out.push(esc(m[1]) + `<i class="ml">${esc(m[2])}</i>` + esc(m[3]) + (m[4] ? `<i class="ml">${esc(m[4])}</i>` : '') + inl(L.slice(m[0].length)));
    else out.push(inl(L));
    i++;
  }
  return out.join('\n');
}

// Pressing Enter on a list line continues the list; on an empty item it ends the list.
export function listNext(line) {
  const m = line.match(/^(\s*)([-*]|\d+\.)\s+(\[[ xX]\]\s+)?(.*)$/);
  if (!m) return null;
  if (!m[4].trim()) return { empty: true };
  const mark = /\d/.test(m[2]) ? parseInt(m[2], 10) + 1 + '.' : m[2];
  return { next: m[1] + mark + ' ' + (m[3] ? '[ ] ' : '') };
}
