export default function UnicornGuardian({ group, onChoose, phase, lastResult }) {
  const isA = group.id === 'A';

  // Sparkle when this unicorn just got a correct drop
  const justWon = phase === 'correct' && lastResult?.targetGroup === group.id;

  const gradientId = `unicorn-grad-${group.id}`;

  return (
    <button
      onClick={onChoose}
      aria-label={`${group.unicornName} — ${group.label}`}
      className={`
        relative flex flex-col items-center gap-3 p-5 rounded-3xl
        border-4 cursor-pointer select-none
        transition-all duration-200
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-offset-2
        ${isA
          ? 'bg-gradient-to-b from-yellow-100 to-amber-100 border-amber-300 focus:ring-amber-300 shadow-amber-200'
          : 'bg-gradient-to-b from-pink-100  to-fuchsia-100 border-pink-300   focus:ring-pink-300  shadow-pink-200'}
        shadow-xl
        ${justWon ? 'animate-sparkle scale-110' : 'animate-float'}
      `}
    >
      {/* Sparkle overlay */}
      {justWon && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
          {['✨','🌟','💫','⭐','✨'].map((s, i) => (
            <span
              key={i}
              className="absolute animate-star-pop text-2xl"
              style={{
                left:  `${10 + i * 18}%`,
                top:   `${10 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* SVG Unicorn */}
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor={isA ? '#FDE68A' : '#FBCFE8'} />
              <stop offset="100%" stopColor={isA ? '#F59E0B' : '#EC4899'} />
            </linearGradient>
          </defs>

          {/* Body */}
          <ellipse cx="60" cy="78" rx="32" ry="24" fill={`url(#${gradientId})`} />

          {/* Head */}
          <circle cx="85" cy="50" r="20" fill={`url(#${gradientId})`} />

          {/* Horn */}
          <polygon
            points="85,15 80,38 90,38"
            fill={isA ? '#FBBF24' : '#F472B6'}
          />
          {/* Horn sparkle */}
          <text x="90" y="22" fontSize="10" textAnchor="middle">✨</text>

          {/* Eye */}
          <circle cx="91" cy="46" r="3.5" fill="#1e1b4b" />
          <circle cx="92.5" cy="44.5" r="1" fill="white" />

          {/* Ear */}
          <polygon points="75,35 70,20 80,28" fill={isA ? '#FDE68A' : '#FBCFE8'} />

          {/* Mane streaks */}
          {isA
            ? <>
                <path d="M72 32 Q65 50 68 65" stroke="#FBBF24" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M68 34 Q60 52 63 66" stroke="#FDE68A" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M75 36 Q70 54 72 68" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            : <>
                <path d="M72 32 Q65 50 68 65" stroke="#F472B6" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M68 34 Q60 52 63 66" stroke="#FBCFE8" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M75 36 Q70 54 72 68" stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
          }

          {/* Legs */}
          <rect x="37" y="95" width="9" height="20" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
          <rect x="52" y="97" width="9" height="18" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
          <rect x="65" y="97" width="9" height="18" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
          <rect x="80" y="95" width="9" height="20" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />

          {/* Tail */}
          <path d="M28 75 Q10 65 15 85 Q5 90 20 100"
            stroke={isA ? '#FBBF24' : '#F472B6'}
            strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Name */}
      <span className={`text-base font-black font-rubik ${isA ? 'text-amber-700' : 'text-pink-700'}`}>
        {group.unicornName}
      </span>

      {/* Sound family label */}
      <div className={`
        rounded-2xl px-4 py-2 text-center border-2
        ${isA ? 'bg-amber-200/70 border-amber-400' : 'bg-pink-200/70 border-pink-400'}
      `}>
        <div className={`text-4xl font-black font-rubik leading-tight ${isA ? 'text-amber-800' : 'text-pink-800'}`}
          style={{ lineHeight: '3.5rem' }}>
          {isA ? 'קָמָץ / פַּתָח' : 'סֶגּוֹל / צֵירֵי'}
        </div>
        <div className={`text-xl font-bold font-rubik ${isA ? 'text-amber-600' : 'text-pink-600'}`}
          style={{ lineHeight: '2rem' }}>
          {isA ? 'אָ' : 'אֶ'}
        </div>
        <div className={`text-xs mt-1 font-assistant font-semibold ${isA ? 'text-amber-600' : 'text-pink-600'}`}>
          {group.hint}
        </div>
      </div>
    </button>
  );
}
