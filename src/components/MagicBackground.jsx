import { useMemo } from 'react';

const SYMBOLS = ['⭐', '✨', '🌟', '💫', '🌈', '🦋', '🌸', '🎀'];
const STARS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  symbol: SYMBOLS[i % SYMBOLS.length],
  left:     `${(i * 6.1  + 2) % 96}%`,
  top:      `${(i * 9.7  + 4) % 88}%`,
  delay:    `${(i * 0.37) % 4}s`,
  duration: `${3.5 + (i % 5) * 0.6}s`,
  opacity:  0.12 + (i % 6) * 0.06,
  size:     `${0.9 + (i % 3) * 0.45}rem`,
  anim:     i % 3 === 0 ? 'animate-float-slow' : i % 3 === 1 ? 'animate-float-med' : 'animate-float',
}));

export default function MagicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {STARS.map(s => (
        <div
          key={s.id}
          className={`absolute select-none ${s.anim}`}
          style={{
            left: s.left,
            top:  s.top,
            fontSize:        s.size,
            opacity:         s.opacity,
            animationDelay:  s.delay,
            animationDuration: s.duration,
          }}
        >
          {s.symbol}
        </div>
      ))}
    </div>
  );
}
