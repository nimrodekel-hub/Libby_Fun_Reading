const SYMBOLS = ['✦', '✧', '★', '⋆', '✱', '✲', '✵', '⁂', '✦', '⭐', '💫', '✨', '🌟', '⋆', '✧'];
const STARS = Array.from({ length: 22 }, (_, i) => ({
  id:       i,
  symbol:   SYMBOLS[i % SYMBOLS.length],
  left:     `${(i * 5.3  + 3) % 95}%`,
  top:      `${(i * 8.7  + 5) % 90}%`,
  delay:    `${(i * 0.41) % 5}s`,
  duration: `${3 + (i % 5) * 0.7}s`,
  opacity:  0.20 + (i % 7) * 0.07,
  size:     `${1.1 + (i % 4) * 0.5}rem`,
  anim:     i % 3 === 0 ? 'animate-float-slow' : i % 3 === 1 ? 'animate-float-med' : 'animate-float',
  color:    i % 4 === 0 ? '#fbbf24' : i % 4 === 1 ? '#f9a8d4' : i % 4 === 2 ? '#a78bfa' : '#ffffff',
}));

export default function MagicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute inset-0"
           style={{
             background: 'radial-gradient(ellipse 60% 45% at 15% 25%, rgba(139,92,246,0.30) 0%, transparent 70%), radial-gradient(ellipse 50% 55% at 85% 75%, rgba(219,39,119,0.22) 0%, transparent 70%)',
           }}
      />
      {STARS.map(s => (
        <div
          key={s.id}
          className={`absolute select-none ${s.anim}`}
          style={{
            left:              s.left,
            top:               s.top,
            fontSize:          s.size,
            opacity:           s.opacity,
            animationDelay:    s.delay,
            animationDuration: s.duration,
            color:             s.color,
            textShadow:        `0 0 8px ${s.color}`,
          }}
        >
          {s.symbol}
        </div>
      ))}
    </div>
  );
}
