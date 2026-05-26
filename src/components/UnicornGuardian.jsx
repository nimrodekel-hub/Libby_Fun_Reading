import { useAudio } from '../hooks/useAudio';

export default function UnicornGuardian({ group, onChoose, phase, lastResult }) {
  const { playText } = useAudio();
  const isA     = group.id === 'A';
  const justWon = phase === 'correct' && lastResult?.targetGroup === group.id;

  function handleTap() {
    // One tap = hear the sound + submit answer
    playText(isA ? 'אָאָאָ' : 'אֶאֶאֶ');
    onChoose();
  }

  return (
    <button
      onClick={handleTap}
      aria-label={`${group.unicornName} — צליל ${isA ? 'אָ' : 'אֶ'}`}
      className={`
        relative flex flex-col items-center gap-3 px-6 py-5 rounded-3xl
        border-4 cursor-pointer select-none transition-all duration-150
        hover:scale-108 active:scale-95 focus:outline-none
        shadow-2xl w-48
        ${isA
          ? 'bg-gradient-to-b from-yellow-50 to-amber-100 border-amber-400 shadow-amber-300/60'
          : 'bg-gradient-to-b from-pink-50  to-fuchsia-100 border-pink-400   shadow-pink-300/60'}
        ${justWon ? 'animate-sparkle scale-110' : ''}
      `}
    >
      {/* Celebration burst */}
      {justWon && ['✨','🌟','💫','⭐','✨'].map((s, i) => (
        <span key={i} className="absolute animate-star-pop text-xl pointer-events-none"
          style={{ left:`${8+i*18}%`, top:`${5+(i%3)*22}%`, animationDelay:`${i*0.1}s` }}>
          {s}
        </span>
      ))}

      {/* SVG Unicorn */}
      <UnicornSVG isA={isA} />

      {/* Sound identity — the ONLY label: mouth emoji + sound text */}
      <div className={`
        flex flex-col items-center gap-1 rounded-2xl px-4 py-3 w-full border-2
        ${isA ? 'bg-amber-200/80 border-amber-400' : 'bg-pink-200/80 border-pink-400'}
      `}>
        <span className="text-5xl leading-none">{isA ? '😮' : '😁'}</span>
        <span
          className={`font-rubik font-black leading-none ${isA ? 'text-amber-800' : 'text-pink-800'}`}
          style={{ fontSize: '4rem', lineHeight: '5rem' }}
          dir="rtl"
        >
          {isA ? 'אָ' : 'אֶ'}
        </span>
        {/* Subtle speaker hint inside the box */}
        <span className="text-xs font-semibold font-assistant opacity-60 flex items-center gap-1"
          style={{ color: isA ? '#92400e' : '#9d174d' }}>
          🔊 לְחֲצִי לִשְׁמוֹעַ
        </span>
      </div>
    </button>
  );
}

function UnicornSVG({ isA }) {
  const id = `ug-${isA ? 'a' : 'e'}`;
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 drop-shadow-lg">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={isA ? '#FDE68A' : '#FBCFE8'} />
          <stop offset="100%" stopColor={isA ? '#F59E0B' : '#EC4899'} />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="78" rx="32" ry="24" fill={`url(#${id})`} />
      <circle cx="85" cy="50" r="20" fill={`url(#${id})`} />
      <polygon points="85,15 80,38 90,38" fill={isA ? '#FBBF24' : '#F472B6'} />
      <text x="90" y="22" fontSize="10" textAnchor="middle">✨</text>
      <circle cx="91" cy="46" r="3.5" fill="#1e1b4b" />
      <circle cx="92.5" cy="44.5" r="1" fill="white" />
      <polygon points="75,35 70,20 80,28" fill={isA ? '#FDE68A' : '#FBCFE8'} />
      <path d="M72 32 Q65 50 68 65" stroke={isA ? '#FBBF24' : '#F472B6'} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M68 34 Q60 52 63 66" stroke={isA ? '#FDE68A' : '#FBCFE8'} strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="37" y="95" width="9" height="20" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
      <rect x="52" y="97" width="9" height="18" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
      <rect x="65" y="97" width="9" height="18" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
      <rect x="80" y="95" width="9" height="20" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
      <path d="M28 75 Q10 65 15 85 Q5 90 20 100"
        stroke={isA ? '#FBBF24' : '#F472B6'} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
