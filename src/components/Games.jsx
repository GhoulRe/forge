import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../store.jsx';

const shuffle = a => [...a].sort(() => Math.random() - 0.5);

function Snake({ onScore, best }) {
  const cv = useRef(), g = useRef(null), [score, setScore] = useState(0), [mode, setMode] = useState('idle');
  const N = 18, C = 16;
  const init = () => { g.current = { s: [[9, 9], [8, 9], [7, 9]], d: [1, 0], q: [], f: [13, 9] }; setScore(0); };
  const draw = () => {
    const c = cv.current.getContext('2d'), s = g.current;
    c.fillStyle = '#15171c'; c.fillRect(0, 0, N * C, N * C);
    c.fillStyle = '#ff8a4c'; c.fillRect(s.f[0] * C + 2, s.f[1] * C + 2, C - 4, C - 4);
    c.fillStyle = '#4cd39b'; s.s.forEach(([x, y], i) => { c.globalAlpha = i ? 0.8 : 1; c.fillRect(x * C + 1, y * C + 1, C - 2, C - 2); }); c.globalAlpha = 1;
  };
  useEffect(() => { init(); draw(); }, []);
  const turn = d => { const s = g.current, last = s.q.length ? s.q[s.q.length - 1] : s.d; if (d[0] !== -last[0] || d[1] !== -last[1]) s.q.push(d); };
  useEffect(() => {
    if (mode !== 'play') return;
    const tick = () => {
      const s = g.current; if (s.q.length) s.d = s.q.shift();
      const h = [s.s[0][0] + s.d[0], s.s[0][1] + s.d[1]];
      if (h[0] < 0 || h[1] < 0 || h[0] >= N || h[1] >= N || s.s.some(([x, y]) => x === h[0] && y === h[1])) { setMode('over'); onScore(s.s.length - 3); return; }
      s.s.unshift(h);
      if (h[0] === s.f[0] && h[1] === s.f[1]) { setScore(s.s.length - 3); do { s.f = [(Math.random() * N) | 0, (Math.random() * N) | 0]; } while (s.s.some(([x, y]) => x === s.f[0] && y === s.f[1])); } else s.s.pop();
      draw();
    };
    const t = setInterval(tick, 110);
    const key = e => { const m = { ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] }[e.key]; if (m) { e.preventDefault(); turn(m); } };
    window.addEventListener('keydown', key);
    return () => { clearInterval(t); window.removeEventListener('keydown', key); };
  }, [mode]);
  const start = () => { init(); draw(); setMode('play'); };
  return (
    <div><p className="mu">Arrow keys or WASD. Eat the orange squares, avoid walls and yourself.</p>
      <canvas ref={cv} width={N * C} height={N * C} className="game" />
      <p>Score <b>{score}</b> · Best <b>{best || 0}</b> {mode === 'over' && '· Game over'}</p>
      <div className="ch"><button className="bt pri" onClick={start}>{mode === 'play' ? 'Restart' : mode === 'over' ? 'Play again' : 'Start'}</button></div>
      <div className="pad"><button className="bt" onClick={() => g.current && turn([0, -1])}>▲</button><div><button className="bt" onClick={() => g.current && turn([-1, 0])}>◀</button><button className="bt" onClick={() => g.current && turn([0, 1])}>▼</button><button className="bt" onClick={() => g.current && turn([1, 0])}>▶</button></div></div>
    </div>
  );
}

const SN = [
  ['for (let i = 0; i < n; i++) sum += a[i];', 'O(n)'], ['return a[0];', 'O(1)'],
  ['for (i < n) for (j < n) count++;', 'O(n²)'], ['while (lo <= hi) { mid = (lo + hi) >> 1; /* halve range */ }', 'O(log n)'],
  ['arr.sort((a, b) => a - b);', 'O(n log n)'], ['for (i < n) for (j < i) count++;', 'O(n²)'],
  ['map.get(key);', 'O(1)'], ['fib(n) = fib(n - 1) + fib(n - 2)  // no memo', 'O(2ⁿ)'],
  ['for (let i = 1; i < n; i *= 2) work();', 'O(log n)'], ['for (x of arr) if (arr.includes(x)) hit++;', 'O(n²)'],
  ['const s = new Set(arr); // build from n items', 'O(n)'], ['mergeSort(arr)', 'O(n log n)'],
];
const OPTS = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'];

function Blitz({ onScore, best }) {
  const [phase, setPhase] = useState('idle'), [deck, setDeck] = useState(SN), [i, setI] = useState(0), [score, setScore] = useState(0), [left, setLeft] = useState(45), [fb, setFb] = useState(null);
  const sc = useRef(0);
  const cur = deck[i % deck.length];
  const opts = useMemo(() => shuffle([cur[1], ...shuffle(OPTS.filter(o => o !== cur[1])).slice(0, 3)]), [deck, i]);
  useEffect(() => {
    if (phase !== 'play') return;
    const t = setInterval(() => setLeft(l => (l <= 1 ? (clearInterval(t), 0) : l - 1)), 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => { if (phase === 'play' && left === 0) { setPhase('over'); onScore(sc.current); } }, [left]);
  const start = () => { sc.current = 0; setDeck(shuffle(SN)); setI(0); setScore(0); setLeft(45); setFb(null); setPhase('play'); };
  const pick = o => { const ok = o === cur[1]; if (ok) { sc.current++; setScore(sc.current); } setFb(ok ? '✓' : '✗ ' + cur[1]); setTimeout(() => { setFb(null); setI(x => x + 1); }, 350); };
  return (
    <div><p className="mu">45 seconds. Name the time complexity as fast as you can.</p>
      {phase === 'play' ? <>
        <div className="hd"><span className="pill">⏱ {left}s</span><span className="pill">Score {score}</span></div>
        <pre className="snip">{cur[0]}</pre>
        <div className="ch">{opts.map(o => <button key={o} className="bt" disabled={!!fb} onClick={() => pick(o)}>{o}</button>)}</div>
        <p style={{ minHeight: 24 }}><b>{fb}</b></p></> : <>
        <p>{phase === 'over' ? <>Time! You scored <b>{score}</b>.</> : 'Ready?'} Best <b>{best || 0}</b></p>
        <div className="ch"><button className="bt pri" onClick={start}>{phase === 'over' ? 'Play again' : 'Start'}</button></div></>}
    </div>
  );
}

export default function Games() {
  const { S, up } = useApp();
  const [tab, setTab] = useState('snake');
  const save = k => sc => up(n => { n.games[k] = Math.max(n.games[k] || 0, sc); });
  return (
    <div className="page"><div className="eb">Break room</div><h1>Take five. Your brain will thank you.</h1>
      <div className="hd"><button className={'bt' + (tab === 'snake' ? ' pri' : '')} onClick={() => setTab('snake')}>🐍 Snake</button><button className={'bt' + (tab === 'blitz' ? ' pri' : '')} onClick={() => setTab('blitz')}>⚡ Big-O Blitz</button></div>
      {tab === 'snake' ? <Snake best={S.games.snake} onScore={save('snake')} /> : <Blitz best={S.games.blitz} onScore={save('blitz')} />}
    </div>
  );
}
