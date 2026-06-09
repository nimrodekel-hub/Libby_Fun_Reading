import AudioButton from './AudioButton';
import { NIKUD_TYPES } from '../data/letters';

export default function LetterCard({ card, phase, showHint }) {
  if (!card) return null;

  const isWord    = card.cardType === 'word';
  const isWrong   = phase === 'wrong';
  const isCorrect = phase === 'correct';
  const nikud     = NIKUD_TYPES[card.nikudType];

  const nikudHintColor =
    showHint && card.vowelGroup === 'A' ? 'text-amber-500' :
    showHint && card.vowelGroup === 'E' ? 'text-pink-500'  : 'text-purple-900';

  return (
    <div className={`
      relative flex flex-col items-center justify-center
      bg-white/95 border-4 rounded-3xl shadow-2xl
      px-6 py-5 w-72 select-none transition-all duration-300
      ${isCorrect ? 'border-green-400 animate-sparkle scale-105'     : ''}
      ${isWrong   ? 'border-red-400   animate-shake'                  : ''}
      ${!isCorrect && !isWrong ? 'border-magic-lavender-mid animate-float' : ''}
    `}>
      <span className="absolute top-2 right-2 text-lg opacity-30">⭐</span>
      <span className="absolute top-2 left-2  text-lg opacity-30">⭐</span>

      {/* Nikud label */}
      <div className={`
        mb-2 px-3 py-1 rounded-full text-sm font-bold font-assistant
        ${card.vowelGroup === 'A'
          ? 'bg-amber-100 text-amber-700 border border-amber-300'
          : 'bg-pink-100  text-pink-700  border border-pink-300'}
      `}>
        {nikud?.name}
      </div>

      {/* The big letter / word */}
      <div
        className={`font-rubik font-black text-center mb-1 ${nikudHintColor}`}
        style={{
          fontSize:   isWord ? '4rem'  : '9rem',
          lineHeight: isWord ? '5.5rem': '13rem',
          direction:  'rtl',
        }}
      >
        {card.display}
      </div>

      {/* Example meaning */}
      <div className={`
        flex flex-col items-center gap-0.5 rounded-2xl px-4 py-2 w-full mb-2
        ${card.vowelGroup === 'A' ? 'bg-amber-50' : 'bg-pink-50'}
      `}>
        {!isWord && (
          <span className="text-2xl font-rubik font-bold text-purple-700" dir="rtl">
            {card.exampleWord}
          </span>
        )}
        <span className="text-lg font-assistant text-purple-500">{card.exampleMeaning}</span>
      </div>

      {/* Hint */}
      {showHint && (
        <div className={`
          mb-2 px-3 py-1 rounded-full text-xs font-bold animate-bounce-slow
          ${card.vowelGroup === 'A'
            ? 'bg-amber-100 text-amber-600 border border-amber-300'
            : 'bg-pink-100  text-pink-600  border border-pink-300'}
        `}>
          {card.vowelGroup === 'A' ? '💛 קָמָץ / פַּתָח — אָ!' : '💗 סֶגּוֹל / צֵירֵי — אֶ!'}
        </div>
      )}

      {/* Audio button — large and prominent */}
      <AudioButton card={card} size="lg" />

      {/* Result overlay */}
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
