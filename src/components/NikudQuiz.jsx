import { useAudio } from '../hooks/useAudio';
import { NIKUD_META } from '../data/curriculum';

const GROUP_COLORS = {
  A: { border: 'border-amber-400',  bg: 'bg-amber-50',  circle: 'bg-amber-400  border-amber-400'  },
  E: { border: 'border-pink-400',   bg: 'bg-pink-50',   circle: 'bg-pink-400   border-pink-400'   },
  I: { border: 'border-blue-400',   bg: 'bg-blue-50',   circle: 'bg-blue-400   border-blue-400'   },
  O: { border: 'border-green-400',  bg: 'bg-green-50',  circle: 'bg-green-400  border-green-400'  },
  U: { border: 'border-violet-400', bg: 'bg-violet-50', circle: 'bg-violet-400 border-violet-400' },
};

export default function NikudQuiz({
  question, selected, onSelect, onSubmit,
  feedback, qIdx, totalQ,
}) {
  const { playText } = useAudio();
  const { target, options, targetType } = question;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto px-4 py-6">

      {/* Question header */}
      <div className="text-center">
        <p className="text-sm font-bold text-purple-400 font-assistant mb-1">
          שְׁאֵלָה {qIdx + 1} מִתּוֹךְ {totalQ}
        </p>
        <p className="text-xl font-black text-purple-700 font-rubik">
          אֵיזֶה צְלִיל מַתְאִים?
        </p>
      </div>

      {/* Target card — letter+nikud only, no speaker */}
      <div className="bg-white border-4 border-purple-300 rounded-3xl shadow-xl px-10 py-6 text-center">
        <div
          className="font-rubik font-black text-purple-900"
          style={{ fontSize: '8rem', lineHeight: '11rem', direction: 'rtl' }}
        >
          {target.display}
        </div>
        <p className="text-purple-400 text-sm font-assistant mt-1">לְחֲצִי עַל הַצְּלִיל הַמַּתְאִים 👇</p>
      </div>

      {/* Answer options — sound only */}
      <div className="flex flex-col gap-3 w-full">
        {options.map((opt, idx) => {
          const isSelected   = selected === opt.nikudType;
          const isCorrectOpt = opt.isCorrect;
          const meta         = NIKUD_META[opt.nikudType];
          const gc           = GROUP_COLORS[meta.group];

          let borderColor = 'border-purple-200';
          let bg          = 'bg-white';
          if (feedback) {
            if (isCorrectOpt)    { borderColor = 'border-green-400'; bg = 'bg-green-50'; }
            else if (isSelected) { borderColor = 'border-red-400';   bg = 'bg-red-50';   }
          } else if (isSelected) {
            borderColor = gc.border;
            bg          = gc.bg;
          }

          return (
            <button
              key={opt.nikudType}
              onClick={() => { if (!feedback) onSelect(opt.nikudType); }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl border-4
                transition-all duration-150 shadow-sm
                ${borderColor} ${bg}
                ${!feedback ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : 'cursor-default'}
              `}
              dir="rtl"
            >
              {/* Number badge */}
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 font-black text-sm transition-all
                ${feedback && isCorrectOpt        ? 'bg-green-400 border-green-400 text-white'
                  : feedback && isSelected         ? 'bg-red-400   border-red-400   text-white'
                  : isSelected                     ? `${gc.circle} text-white`
                  : 'border-purple-300 bg-white text-purple-500'}
              `}>
                {feedback && isCorrectOpt ? '✓' : feedback && isSelected ? '✗' : idx + 1}
              </div>

              {/* Speaker button */}
              <button
                onClick={(e) => { e.stopPropagation(); playText(opt.display); }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold text-base transition-colors"
                aria-label="השמע"
              >
                🔊 <span className="font-assistant text-sm">צְלִיל {idx + 1}</span>
              </button>

              {/* Feedback indicators */}
              {feedback && isCorrectOpt && <span className="text-xl shrink-0 animate-bounce-slow">✅</span>}
              {feedback && isSelected && !isCorrectOpt && <span className="text-xl shrink-0">❌</span>}
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className={`
          w-full py-3 rounded-2xl text-center text-xl font-black font-rubik
          ${feedback === 'correct' ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-red-100 text-red-600 border-2 border-red-300'}
        `}>
          {feedback === 'correct' ? '🌟 כׇּל הַכָּבוֹד! +3 נְקוּדוֹת!' : '💫 לֹא נָכוֹן — נַסִּי שׁוּב! −1'}
        </div>
      )}

      {/* Submit button */}
      {!feedback && (
        <button
          onClick={onSubmit}
          disabled={!selected}
          className={`
            w-full py-4 rounded-2xl text-xl font-black font-rubik transition-all shadow-lg
            ${selected
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95'
              : 'bg-purple-100 text-purple-300 cursor-not-allowed'}
          `}
        >
          {selected ? '✅ אִשְּׁרִי תְּשׁוּבָה!' : 'בַּחֲרִי צְלִיל...'}
        </button>
      )}
    </div>
  );
}
