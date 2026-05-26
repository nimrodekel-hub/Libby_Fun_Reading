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
    showHint && card.vowelGroup === 'E' ? 'text-pink-500'  : 'text-purple-800';

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        bg-white/90 backdrop-blur-sm border-4 rounded-3xl shadow-2xl
        px-8 py-6 w-72 select-none transition-all duration-300
        ${isCorrect ? 'border-green-400 animate-sparkle scale-105'    : ''}
        ${isWrong   ? 'border-red-400   animate-shake'                 : ''}
        ${!isCorrect && !isWrong ? 'border-magic-lavender-mid animate-float' : ''}
      `}
    >
      <span className="absolute top-2 right-2 text-lg opacity-40">⭐</span>
      <span className="absolute top-2 left-2  text-lg opacity-40">⭐</span>

      {/* Nikud label */}
      <div className={`
        mb-2 px-3 py-1 rounded-full text-sm font-bold font-assistant
        ${card.vowelGroup === 'A'
          ? 'bg-amber-100 text-amber-700 border border-amber-300'
          : 'bg-pink-100  text-pink-700  border border-pink-300'}
      `}>
        {nikud?.name ?? card.nikudType}
        {isWord && <span className="mr-1 text-xs opacity-70">— מִלָּה</span>}
      </div>

      {/* Main display: big letter (Stage 1) or big word (Stage 2) */}
      <div
        className={`font-rubik font-black leading-none mb-2 text-center ${nikudHintColor}`}
        style={{
          fontSize:      isWord ? '4.5rem' : '9rem',
          lineHeight:    isWord ? '6rem'   : '13rem',
          letterSpacing: '0.04em',
          direction:     'rtl',
        }}
      >
        {card.display}
      </div>

      {/* Phonetic */}
      <div className="text-base font-semibold text-purple-400 font-assistant mb-3">
        {card.phonetic}
      </div>

      {/* Example word / meaning */}
      {!isWord && (
        <div className="flex flex-col items-center gap-1 bg-magic-lavender/70 rounded-2xl px-4 py-2 w-full">
          <span className="text-3xl font-rubik font-bold text-purple-700 leading-snug" dir="rtl">
            {card.exampleWord}
          </span>
          <span className="text-sm text-purple-500 font-assistant">{card.exampleMeaning}</span>
        </div>
      )}
      {isWord && (
        <div className="flex items-center justify-center gap-2 bg-magic-lavender/70 rounded-2xl px-4 py-2 w-full">
          <span className="text-xl font-assistant text-purple-500">{card.exampleMeaning}</span>
        </div>
      )}

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
        <AudioButton card={card} />
      </div>

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
