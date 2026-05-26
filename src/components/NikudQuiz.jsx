import { useAudio } from '../hooks/useAudio';
import { NIKUD_META } from '../data/curriculum';

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
          אֵיזֶה נִיקוּד זֶה?
        </p>
      </div>

      {/* Target card */}
      <div className="bg-white border-4 border-purple-300 rounded-3xl shadow-xl px-10 py-5 text-center">
        <div
          className="font-rubik font-black text-purple-900"
          style={{ fontSize: '8rem', lineHeight: '11rem', direction: 'rtl' }}
        >
          {target.display}
        </div>
        <button
          onClick={() => playText(target.display)}
          className="mt-1 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600 font-bold text-sm transition-colors"
        >
          🔊 שִׁמְעִי אוֹתִי
        </button>
      </div>

      {/* Answer options */}
      <div className="flex flex-col gap-3 w-full">
        {options.map((opt) => {
          const isSelected  = selected === opt.nikudType;
          const isCorrectOpt = opt.isCorrect;
          const meta = NIKUD_META[opt.nikudType];
          const isA  = meta.group === 'A';

          // Feedback colouring
          let borderColor = 'border-purple-200';
          let bg          = 'bg-white';
          if (feedback) {
            if (isCorrectOpt)         { borderColor = 'border-green-400'; bg = 'bg-green-50'; }
            else if (isSelected)      { borderColor = 'border-red-400';   bg = 'bg-red-50';   }
          } else if (isSelected) {
            borderColor = isA ? 'border-amber-400' : 'border-pink-400';
            bg = isA ? 'bg-amber-50' : 'bg-pink-50';
          }

          return (
            <button
              key={opt.nikudType}
              onClick={() => { if (!feedback) onSelect(opt.nikudType); }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl border-4
                transition-all duration-150 shadow-sm text-right
                ${borderColor} ${bg}
                ${!feedback ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : 'cursor-default'}
              `}
              dir="rtl"
            >
              {/* Checkbox circle */}
              <div className={`
                w-7 h-7 rounded-full border-3 border-2 flex items-center justify-center shrink-0 transition-all
                ${feedback && isCorrectOpt        ? 'bg-green-400 border-green-400 text-white'
                  : feedback && isSelected         ? 'bg-red-400   border-red-400   text-white'
                  : isSelected                     ? (isA ? 'bg-amber-400 border-amber-400' : 'bg-pink-400 border-pink-400') + ' text-white'
                  : 'border-purple-300 bg-white'}
              `}>
                {(isSelected || (feedback && isCorrectOpt)) && (
                  <span className="text-sm font-black">
                    {feedback && isCorrectOpt ? '✓' : feedback && isSelected ? '✗' : '✓'}
                  </span>
                )}
              </div>

              {/* Speaker button */}
              <button
                onClick={(e) => { e.stopPropagation(); playText(opt.display); }}
                className="shrink-0 w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-500 text-lg transition-colors"
                aria-label="השמע"
              >
                🔊
              </button>

              {/* Letter+nikud display */}
              <div
                className={`font-rubik font-black text-3xl flex-1 leading-none ${isA ? 'text-amber-800' : 'text-pink-800'}`}
                style={{ lineHeight: '3.5rem', direction: 'rtl' }}
              >
                {opt.display}
              </div>

              {/* Nikud name */}
              <div className={`text-sm font-bold font-rubik shrink-0 ${isA ? 'text-amber-600' : 'text-pink-600'}`}>
                {meta.name}
              </div>

              {/* Correct/Wrong indicator */}
              {feedback && isCorrectOpt && (
                <span className="text-xl shrink-0 animate-bounce-slow">✅</span>
              )}
              {feedback && isSelected && !isCorrectOpt && (
                <span className="text-xl shrink-0">❌</span>
              )}
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
          {selected ? '✅ אִשְּׁרִי תְּשׁוּבָה!' : 'בַּחֲרִי תְּשׁוּבָה...'}
        </button>
      )}
    </div>
  );
}
