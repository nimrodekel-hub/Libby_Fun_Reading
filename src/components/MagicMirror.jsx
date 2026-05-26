import LetterCard from './LetterCard';

export default function MagicMirror({ card, phase, showHint }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-[-16px] rounded-[2.5rem] bg-gradient-to-br from-purple-300 via-pink-200 to-amber-200 blur-xl opacity-60 animate-pulse-slow" />

        <div className="relative bg-gradient-to-br from-purple-200 via-white to-pink-200
                        border-4 border-purple-300 rounded-[2.5rem] p-4 shadow-2xl">
          <div className="text-center mb-2">
            <span className="text-base font-black font-rubik text-purple-500">
              🪞 מָה הַצְּלִיל שֶׁל הָאוֹת?
            </span>
          </div>

          <div className="flex items-center justify-center min-h-[400px] min-w-[300px]">
            {card
              ? <LetterCard card={card} phase={phase} showHint={showHint} />
              : <div className="text-5xl text-purple-200 animate-pulse-slow">✨</div>
            }
          </div>
        </div>

        {['top-0 right-0','top-0 left-0','bottom-0 right-0','bottom-0 left-0'].map((pos, i) => (
          <span key={i} className={`absolute ${pos} text-xl pointer-events-none`}>
            {['⭐','🌟','💫','✨'][i]}
          </span>
        ))}
      </div>
    </div>
  );
}
