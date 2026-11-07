import { useState } from 'react';

const ARR = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 72, 78, 84, 91, 95, 99];
function BinarySearch() {
  const [target, setTarget] = useState(67);
  const [s, setS] = useState({ lo: 0, hi: ARR.length - 1, mid: null, steps: 0, found: null });
  const reset = t => { setTarget(t); setS({ lo: 0, hi: ARR.length - 1, mid: null, steps: 0, found: null }); };
  const step = () => {
    if (s.found !== null || s.lo > s.hi) return;
    const mid = (s.lo + s.hi) >> 1, v = ARR[mid], n = { ...s, mid, steps: s.steps + 1 };
    if (v === target) n.found = mid; else if (v < target) n.lo = mid + 1; else n.hi = mid - 1;
    setS(n);
  };
  const dead = s.found === null && s.lo > s.hi;
  return (
    <div className="vz"><b>Binary search: find <input className="num" type="number" value={target} onChange={e => reset(+e.target.value)} /> in 16 sorted numbers</b>
      <div className="row">{ARR.map((v, i) => <span key={i} className={'chip cell' + (i === s.mid ? ' mid' : '') + (i < s.lo || i > s.hi ? ' out' : '') + (i === s.found ? ' hit' : '')}>{v}</span>)}</div>
      <p className="mu">Steps: <b>{s.steps}</b> (log₂ 16 = 4) {s.found !== null && '· found at index ' + s.found} {dead && '· not in the array'}</p>
      <button className="bt pri" onClick={step} disabled={s.found !== null || dead}>Step</button> <button className="bt" onClick={() => reset(target)}>Reset</button>
    </div>
  );
}

function Estimator() {
  const [dau, setDau] = useState(1000000), [act, setAct] = useState(10), [kb, setKb] = useState(2);
  const qps = dau * act / 86400, N = ({ l, val, set }) => <label className="sl">{l}<input className="num wide" type="number" min="0" value={val} onChange={e => set(+e.target.value || 0)} /></label>;
  const fmt = x => x >= 1e6 ? (x / 1e6).toFixed(1) + 'M' : x >= 1e3 ? (x / 1e3).toFixed(1) + 'K' : x.toFixed(1);
  return (
    <div className="vz"><b>Capacity estimator</b>
      <N l="Daily active users" val={dau} set={setDau} /><N l="Actions per user per day" val={act} set={setAct} /><N l="KB written per action" val={kb} set={setKb} />
      <div className="row"><div className="env">Average QPS<br /><em>{fmt(qps)}</em></div><div className="env">Peak QPS (×3)<br /><em>{fmt(qps * 3)}</em></div><div className="env">Storage / day<br /><em>{(dau * act * kb / 1e6).toFixed(1)} GB</em></div><div className="env">Storage / year<br /><em>{(dau * act * kb * 365 / 1e9).toFixed(2)} TB</em></div></div>
    </div>
  );
}

function StackQueue() {
  const [items, setItems] = useState(['A', 'B', 'C']), [n, setN] = useState(1);
  const add = () => { setItems([...items, String.fromCharCode(68 + (n - 1) % 20)]); setN(n + 1); };
  const row = (a, label) => <div className="box"><small>{label}</small>{a.length ? a.map((x, i) => <span key={i} className={'chip' + (i === a.length - 1 || i === 0 ? ' hot' : '')}>{x}</span>) : <i className="mu">empty</i>}</div>;
  return (
    <div className="vz"><b>Same items, different rules</b>
      <div className="row">{row([...items], 'Stack: push/pop at the END (LIFO)')}{row([...items], 'Queue: add at END, remove from FRONT (FIFO)')}</div>
      <button className="bt" onClick={add}>add item</button> <button className="bt" disabled={!items.length} onClick={() => setItems(items.slice(0, -1))}>pop (stack)</button> <button className="bt" disabled={!items.length} onClick={() => setItems(items.slice(1))}>dequeue (queue)</button>
      <p className="mu">Next out of the stack: <b>{items[items.length - 1] ?? '—'}</b> · next out of the queue: <b>{items[0] ?? '—'}</b></p>
    </div>
  );
}

export const LABS = { bs: BinarySearch, ds: StackQueue, est: Estimator };
