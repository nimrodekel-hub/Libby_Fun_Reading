import { useAudio } from '../hooks/useAudio';

export default function UnicornGuardian({ group, onChoose, phase, lastResult }) {
  const { playText } = useAudio();
  const isA = group.id === 'A';
  const justWon = phase === 'correct' && lastResult?.targetGroup === group.id;
  const gradientId = `ug-grad-${group.id}`;

  // The representative sound to demonstrate
  const demoSound = isA ? 'אָאָאָ' : 'אֶאֶאֶ';
  const mouthEmoji = isA ? '😮' : '😁';

  return (
    <div className="flex flex-col items-center gap-2">

      {/* Big tap button — the entire unicorn card */}
      <button
        onClick={onChoose}
        aria-label={`${group.unicornName} — ${group.label}`}
        className={`
          relative flex flex-col items-center gap-3 p-5 rounded-3xl cursor-pointer select-none
          border-4 transition-all duration-200
          hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2
          shadow-xl
          ${isA
            ? 'bg-gradient-to-b from-yellow-100 to-amber-100 border-amber-300 focus:ring-amber-300 shadow-amber-200'
            : 'bg-gradient-to-b from-pink-100  to-fuchsia-100 border-pink-300   focus:ring-pink-300  shadow-pink-200'}
          ${justWon ? 'animate-sparkle scale-110' : 'animate-float'}
        `}
      >
        {/* Sparkle burst on correct */}
        {justWon && ['✨','🌟','💫','⭐','✨'].map((s, i) => (
          <span key={i} className="absolute animate-star-pop text-2xl pointer-events-none"
            style={{ left:`${10+i*18}%`, top:`${10+(i%3)*25}%`, animationDelay:`${i*0.1}s` }}>
            {s}
          </span>
        ))}

        {/* SVG Unicorn */}
        <div className="w-24 h-24">
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor={isA ? '#FDE68A' : '#FBCFE8'} />
                <stop offset="100%" stopColor={isA ? '#F59E0B' : '#EC4899'} />
              </linearGradient>
            </defs>
            <ellipse cx="60" cy="78" rx="32" ry="24" fill={`url(#${gradientId})`} />
            <circle cx="85" cy="50" r="20" fill={`url(#${gradientId})`} />
            <polygon points="85,15 80,38 90,38" fill={isA ? '#FBBF24' : '#F472B6'} />
            <text x="90" y="22" fontSize="10" textAnchor="middle">✨</text>
            <circle cx="91" cy="46" r="3.5" fill="#1e1b4b" />
            <circle cx="92.5" cy="44.5" r="1" fill="white" />
            <polygon points="75,35 70,20 80,28" fill={isA ? '#FDE68A' : '#FBCFE8'} />
            {isA ? <>
              <path d="M72 32 Q65 50 68 65" stroke="#FBBF24" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M68 34 Q60 52 63 66" stroke="#FDE68A" strokeWidth="3" fill="none" strokeLinecap="round" />
            </> : <>
              <path d="M72 32 Q65 50 68 65" stroke="#F472B6" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M68 34 Q60 52 63 66" stroke="#FBCFE8" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>}
            <rect x="37" y="95" width="9" height="20" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
            <rect x="52" y="97" width="9" height="18" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
            <rect x="65" y="97" width="9" height="18" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
            <rect x="80" y="95" width="9" height="20" rx="4" fill={isA ? '#FDE68A' : '#FBCFE8'} />
            <path d="M28 75 Q10 65 15 85 Q5 90 20 100"
              stroke={isA ? '#FBBF24' : '#F472B6'} strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Sound identity — big visual */}
        <div className={`
          flex flex-col items-center gap-1 rounded-2xl px-5 py-3 border-2 w-full
          ${isA ? 'bg-amber-200/80 border-amber-400' : 'bg-pink-200/80 border-pink-400'}
        `}>
          <span className="text-4xl">{mouthEmoji}</span>
          <div
            className={`font-rubik font-black ${isA ? 'text-amber-800' : 'text-pink-800'}`}
            style={{ fontSize: '3.5rem', lineHeight: '4.5rem' }}
            dir="rtl"
          >
            {isA ? 'אָ' : 'אֶ'}
          </div>
          <div className={`text-xs font-bold font-assistant text-center ${isA ? 'text-amber-600' : 'text-pink-600'}`}>
            {group.hint}
          </div>
        </div>

        {/* Tap indicator */}
        <div className={`
          text-sm font-black font-rubik px-4 py-2 rounded-full border-2 animate-bounce-slow
          ${isA ? 'bg-amber-300 border-amber-500 text-amber-900' : 'bg-pink-300 border-pink-500 text-pink-900'}
        `}>
          👆 לְחֲצִי כָּאן!
        </div>
      </button>

      {/* "Hear my sound" button — separate from the tap target so it doesn't trigger answer */}
      <button
        onClick={e => { e.stopPropagation(); playText(demoSound); }}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-md
          border-2 transition-all hover:scale-105 active:scale-95
          ${isA
            ? 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200'
            : 'bg-pink-100  border-pink-300  text-pink-700  hover:bg-pink-200'}
        `}
        aria-label={`שמעי את הצליל ${isA ? 'אָ' : 'אֶ'}`}
      >
        🔊 שִׁמְעִי אֶת הַצְּלִיל
      </button>
    </div>
  );
}
