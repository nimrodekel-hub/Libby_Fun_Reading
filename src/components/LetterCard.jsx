import AudioButton from './AudioButton';
import { NIKUD_TYPES } from '../data/letters';

export default function LetterCard({ card, phase, showHint, playAudio }) {
  if (!card) return null;

  const isWrong   = phase === 'wrong';
  const isCorrect = phase === 'correct';
  const nikud     = NIKUD_TYPES[card.nikudType];

  // Hint: colour the nikud symbol to guide Libby
  const nikudHintColor =
    showHint && card.vowelGroup === 'A' ? 'text-amber-500' :
    showHint && card.vowelGroup === 'E' ? 'text-pink-500'  : 'text-purple-800';

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        bg-white/90 backdrop-blur-sm
        border-4 rounded-3xl shadow-2xl
        px-8 py-6 w-72 select-none
        transition-all duration-300
        ${isCorrect ? 'border-green-400 animate-sparkle scale-105'  : ''}
        ${isWrong   ? 'border-red-400 animate-shake'                 : ''}
        ${!isCorrect && !isWrong ? 'border-magic-lavender-mid animate-float' : ''}
      `}
    >
      {/* Decorative corner stars */}
      <span className="absolute top-2 right-2 text-lg opacity-40">⭐</span>
      <span className="absolute top-2 left-2  text-lg opacity-40">⭐</span>

      {/* Nikud type label */}
      <div className={`
        mb-2 px-3 py-1 rounded-full text-sm font-bold font-assistant
        ${card.vowelGroup === 'A'
          ? 'bg-amber-100 text-amber-700 border border-amber-300'
          : 'bg-pink-100  text-pink-700  border border-pink-300'}
      `}>
        {nikud.name}
      </div>

      {/* The big Hebrew letter + nikud */}
      <div
        className={`font-rubik font-black leading-none mb-2 ${nikudHintColor}`}
        style={{
          fontSize:      '9rem',
          lineHeight:    '13rem',
          letterSpacing: '0.05em',
          direction:     'rtl',
        }}
      >
        {card.display}
      </div>

      {/* Phonetic hint */}
      <div className="text-lg font-semibold text-purple-400 font-assistant mb-3">
        ({card.phonetic})
      </div>

      {/* Example word */}
      <div className="flex flex-col items-center gap-1 bg-magic-lavender/70 rounded-2xl px-4 py-2 w-full">
        <span className="text-3xl font-rubik font-bold text-purple-700 leading-snug" dir="rtl">
          {card.exampleWord}
        </span>
        <span className="text-sm text-purple-500 font-assistant">
          {card.exampleMeaning}
        </span>
      </div>

      {/* Hint banner */}
      {showHint && (
        <div className={`
          mt-3 px-3 py-1 rounded-full text-xs font-bold animate-bounce-slow
          ${card.vowelGroup === 'A'
            ? 'bg-amber-100 text-amber-600 border border-amber-300'
            : 'bg-pink-100  text-pink-600  border border-pink-300'}
        `}>
          {card.vowelGroup === 'A' ? '💛 זֶה קָמָץ / פַּתָח — אָ!' : '💗 זֶה סֶגּוֹל / צֵירֵי — אֶ!'}
        </div>
      )}

      {/* Audio button */}
      <div className="mt-4">
        <AudioButton card={card} playAudio={playAudio} />
      </div>

      {/* Result overlay icons */}
      {isCorrect && (
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-green-400/10 pointer-events-none">
          <span className="text-7xl animate-sparkle">🌟</span>
        </div>
      )}
      {isWrong && (
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-red-400/10 pointer-events-none">
          <span className="text-6xl">💫</span>
        </div>
      )}
    </div>
  );
}
