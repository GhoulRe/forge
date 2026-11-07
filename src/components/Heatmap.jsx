import { useEffect, useRef } from 'react';
import { key } from '../lib/util.js';

const level = n => (n >= 7 ? 4 : n >= 4 ? 3 : n >= 2 ? 2 : n >= 1 ? 1 : 0);

// GitHub-style contribution calendar: 53 weeks, one square per day, darker = more done.
export default function Heatmap({ days }) {
  const box = useRef();
  useEffect(() => { box.current.scrollLeft = box.current.scrollWidth; }, []);
  const end = new Date(); end.setHours(0, 0, 0, 0);
  const start = new Date(end); start.setDate(start.getDate() - 52 * 7 - end.getDay()); // a Sunday, 52 weeks back
  const cells = [], months = [];
  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const n = days[key(d)] || 0;
    if (d.getDay() === 0 && d.getDate() <= 7) months.push([cells.length / 7, d.toLocaleString('en', { month: 'short' })]);
    cells.push(<i key={cells.length} className={'hm l' + level(n)} title={(n ? n + (n === 1 ? ' activity' : ' activities') : 'No activity') + ' · ' + d.toDateString()} />);
  }
  return (
    <div>
      <div className="hmw" ref={box}>
        <div className="hmd"><span style={{ gridRow: 2 }}>Mon</span><span style={{ gridRow: 4 }}>Wed</span><span style={{ gridRow: 6 }}>Fri</span></div>
        <div>
          <div className="hmm">{months.map(([w, m]) => <span key={w} style={{ gridColumn: w + 1 }}>{m}</span>)}</div>
          <div className="hmg" role="img" aria-label="Activity calendar for the last year">{cells}</div>
        </div>
      </div>
      <div className="hml">Less {[0, 1, 2, 3, 4].map(l => <i key={l} className={'hm l' + l} />)} More</div>
    </div>
  );
}
