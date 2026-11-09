// Deleting a scratchpad: remove it AND everything attached to it, and make sure nothing still points at it.
export function removePad(n, id, fallbackCur = 'closures') {
  n.pads = n.pads.filter(p => p.id !== id);
  for (const k of ['code', 'out', 'hint', 'done', 'chat']) if (n[k]) delete n[k][id];   // its code, saved output, hints, completion and Zero chat
  n.log = (n.log || []).filter(x => x.id !== id);
  if (n.cur === id) n.cur = fallbackCur;                                                  // "Resume" must not point at a deleted pad
  if (typeof n.last === 'string' && n.last === '/practice/' + encodeURIComponent(id)) n.last = '/practice';
}
