import { useState } from 'react';

function Closure() {
  const [a, setA] = useState(0), [b, setB] = useState(0);
  return (
    <div className="vz"><b>makeCounter() was called twice → two private scopes</b>
      <div className="row"><div className="env">counterA<br />count = <em>{a}</em></div><div className="env">counterB<br />count = <em>{b}</em></div></div>
      <button className="bt" onClick={() => setA(a + 1)}>call counterA()</button> <button className="bt" onClick={() => setB(b + 1)}>call counterB()</button>
    </div>
  );
}

const STEPS = [
  ['Script starts on the call stack.', ['main()'], [], [], []],
  ['log("A") runs immediately.', ['main()', 'log(A)'], [], [], ['A']],
  ['setTimeout hands its callback to the timer, which queues it as a task.', ['main()'], [], ['log(B)'], ['A']],
  ['.then() queues a microtask.', ['main()'], ['log(C)'], ['log(B)'], ['A']],
  ['log("D") runs. The script ends.', ['main()', 'log(D)'], ['log(C)'], ['log(B)'], ['A', 'D']],
  ['Stack empty → microtasks drain first.', ['log(C)'], [], ['log(B)'], ['A', 'D', 'C']],
  ['Now one task runs.', ['log(B)'], [], [], ['A', 'D', 'C', 'B']],
];
function Loop() {
  const [i, setI] = useState(0), f = STEPS[i];
  const Box = ({ n, a }) => <div className="box"><small>{n}</small>{a.map((x, k) => <span key={k} className="chip">{x}</span>)}</div>;
  return (
    <div className="vz"><b>Step {i + 1}/{STEPS.length}: {f[0]}</b>
      <div className="row"><Box n="Call stack" a={f[1]} /><Box n="Microtasks" a={f[2]} /><Box n="Tasks" a={f[3]} /><Box n="Console" a={f[4]} /></div>
      <button className="bt" disabled={!i} onClick={() => setI(i - 1)}>← Back</button> <button className="bt pri" disabled={i === STEPS.length - 1} onClick={() => setI(i + 1)}>Next →</button>
    </div>
  );
}

const OPS = {
  'map ×2': a => a.map(x => x * 2), 'filter even': a => a.filter(x => x % 2 === 0), 'filter > 4': a => a.filter(x => x > 4),
  'sort desc': a => [...a].sort((p, q) => q - p), 'reduce → sum': a => [a.reduce((s, x) => s + x, 0)],
};
function Pipe() {
  const [c, setC] = useState([]);
  let a = [1, 2, 3, 4, 5, 6];
  const Chips = ({ a }) => a.length ? a.map((x, i) => <span key={i} className="chip">{x}</span>) : <i className="mu">empty</i>;
  return (
    <div className="vz"><b>Click operations to build a pipeline</b>
      <div className="row">{Object.keys(OPS).map(k => <button key={k} className="bt" onClick={() => setC([...c, k])}>{k}</button>)}<button className="bt" onClick={() => setC([])}>clear</button></div>
      <div>input → <Chips a={a} /></div>
      {c.map((k, i) => { a = OPS[k](a); return <div key={i}>{k} → <Chips a={a} /></div>; })}
    </div>
  );
}

export const VIZ = { cl: Closure, el: Loop, pp: Pipe };
