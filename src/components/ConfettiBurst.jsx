import { useEffect, useState } from 'react';

const COLORS = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#C77DFF','#FF9F1C','#FF85A1','#00C9FF'];

function makePieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color:    COLORS[i % COLORS.length],
    left:     10 + (i * 2.7) % 80,
    delay:    (i % 8) * 0.06,
    duration: 0.8 + (i % 6) * 0.12,
    rotate:   (i * 43) % 360,
    size:     7 + (i % 5) * 3,
    circle:   i % 3 === 0,
    drift:    ((i % 5) - 2) * 30,
  }));
}

export default function ConfettiBurst({ active, count = 40, onDone }) {
  const [pieces] = useState(() => makePieces(count));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); onDone?.(); }, 1400);
    return () => clearTimeout(t);
  }, [active]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position:     'absolute',
            left:         `${p.left}%`,
            top:          '35%',
            width:        `${p.size}px`,
            height:       `${p.size}px`,
            background:   p.color,
            borderRadius: p.circle ? '50%' : '2px',
            animation:    `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform:    `rotate(${p.rotate}deg) translateX(${p.drift}px)`,
          }}
        />
      ))}
    </div>
  );
}
