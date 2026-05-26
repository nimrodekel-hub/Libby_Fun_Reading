import { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { NIKUD_META } from '../data/curriculum';
import ConfettiBurst from './ConfettiBurst';

const GROUP_COLORS = {
  A: { border: 'border-amber-400',  bg: 'bg-amber-50',  circle: 'bg-amber-400  border-amber-400',  text: 'text-amber-700'  },
  E: { border: 'border-pink-400',   bg: 'bg-pink-50',   circle: 'bg-pink-400   border-pink-400',   text: 'text-pink-700'   },
  I: { border: 'border-blue-400',   bg: 'bg-blue-50',   circle: 'bg-blue-400   border-blue-400',   text: 'text-blue-700'   },
  O: { border: 'border-green-400',  bg: 'bg-green-50',  circle: 'bg-green-400  border-green-400',  text: 'text-green-700'  },
  U: { border: 'border-violet-400', bg: 'bg-violet-50', circle: 'bg-violet-400 border-violet-400', text: 'text-violet-700' },
};

export default function NikudQuiz({
  question, selected, onSelect, onSubmit,
  feedback, qIdx, totalQ,
}) {
  const { playText } = useAudio();
  const { target, options, targetType } = question;

  // Score pop state
  const [scorePop, setScorePop] = useState(null);
  const [confetti, setConfetti]  = useState(false);

  useEffect(() => {
    if (!feedback) return;
    const val = feedback === 'correct' ? '+3' : '-1';
    setScorePop({ val, id: Date.now() });
    if (feedback === 'correct') setConfetti(true);
  }, [feedback]);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto px-4 py-6 relative">
      <ConfettiBurst active={confetti} count={36} onDone={() => setConfetti(false)} />

      {/* Floating score pop */}
      {scorePop && (
        <div
          key={scorePop.id}
          className={`fixed top-1/3 left-1/2 -translate-x-1/2 font-black text-5xl pointer-events-none z-40 ${
            scorePop.val.startsWith('+') ? 'text-green-500' : 'text-red-400'
          }`}
          style={{ animation: 'scoreBump 0.9s ease-out forwards' }}
          onAnimationEnd={() => setScorePop(null)}
        >
          {scorePop.val}
        </div>
      )}

      {/* Question header */}
      <div className="text-center animate-slide-up">
        <p className="text-sm font-bold text-purple-400 font-assistant mb-1">
          שְׁאֵלָה {qIdx + 1} מִתּוֹךְ {totalQ}
        </p>
        <p className="text-2xl font-black text-purple-700 font-rubik">
          אֵיזֶה צְלִיל מַתְאִים? 🎧
        </p>
      </div>

      {/* Target card — nikud only, no speaker */}
      <div className="bg-white border-4 border-purple-300 rounded-3xl shadow-2xl px-10 py-6 text-center
                      animate-pop-in"
           style={{ boxShadow: '0 8px 40px rgba(168,85,247,0.25), 0 2px 8px rgba(0,0,0,0.08)' }}>
        <div
          className="font-rubik font-black text-purple-900"
          style={{ fontSize: '8rem', lineHeight: '11rem', direction: 'rtl' }}
        >
          {target.display}
        </div>
        <p className="text-purple-400 text-sm font-assistant mt-1">לְחֲצִי עַל הַצְּלִיל הַמַּתְאִים 👇</p>
      </div>

      {/* Answer options */}
      <div className="flex flex-col gap-3 w-full">
        {options.map((opt, idx) => {
          const isSelected   = selected === opt.nikudType;
          const isCorrectOpt = opt.isCorrect;
          const meta         = NIKUD_META[opt.nikudType];
          const gc           = GROUP_COLORS[meta.group];

          let borderColor = 'border-purple-100';
          let bg          = 'bg-white';
          let shadow      = 'shadow-sm';
          if (feedback) {
            if (isCorrectOpt)    { borderColor = 'border-green-400'; bg = 'bg-green-50';  shadow = 'shadow-md'; }
            else if (isSelected) { borderColor = 'border-red-400';   bg = 'bg-red-50';    shadow = 'shadow-sm'; }
          } else if (isSelected) {
            borderColor = gc.border; bg = gc.bg; shadow = 'shadow-md';
          }

          return (
            <button
              key={opt.nikudType}
              onClick={() => { if (!feedback) onSelect(opt.nikudType); }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl border-4
                transition-all duration-150 ${shadow}
                ${borderColor} ${bg}
                ${!feedback ? 'hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer' : 'cursor-default'}
                ${isSelected && !feedback ? 'animate-slide-up' : ''}
              `}
              dir="rtl"
            >
              {/* Number / checkmark circle */}
              <div className={`
                w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 font-black text-sm transition-all
                ${feedback && isCorrectOpt        ? 'bg-green-400 border-green-400 text-white scale-110'
                  : feedback && isSelected         ? 'bg-red-400   border-red-400   text-white'
                  : isSelected                     ? `${gc.circle} text-white scale-105`
                  : 'border-purple-200 bg-white text-purple-400'}
              `}>
                {feedback && isCorrectOpt ? '✓' : feedback && isSelected ? '✗' : idx + 1}
              </div>

              {/* Speaker button — play full example word for clear vowel sound */}
              <button
                onClick={(e) => { e.stopPropagation(); playText(opt.example?.replace(/[^֐-׿\s]/g, '').trim() || opt.display); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                           bg-gradient-to-r from-blue-100 to-indigo-100
                           hover:from-blue-200 hover:to-indigo-200
                           text-blue-600 font-bold text-sm transition-all
                           hover:scale-[1.03] active:scale-95 shadow-sm"
                aria-label="השמע"
              >
                <span className="text-xl">🔊</span>
                <span className="font-assistant text-sm font-bold">צְלִיל {idx + 1}</span>
              </button>

              {/* Correct / Wrong icons */}
              {feedback && isCorrectOpt && (
                <span className="text-2xl shrink-0 animate-wiggle">✅</span>
              )}
              {feedback && isSelected && !isCorrectOpt && (
                <span className="text-2xl shrink-0 animate-shake">❌</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className={`
          w-full py-4 rounded-2xl text-center text-2xl font-black font-rubik animate-pop-in
          ${feedback === 'correct'
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300'
            : 'bg-gradient-to-r from-red-50   to-orange-50   text-red-600   border-2 border-red-200'}
        `}
          style={{ boxShadow: feedback === 'correct' ? '0 4px 20px rgba(52,211,153,0.3)' : '0 4px 20px rgba(248,113,113,0.2)' }}
        >
          {feedback === 'correct'
            ? '🌟 כׇּל הַכָּבוֹד!'
            : '💫 נַסִּי שׁוּב!'}
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
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:-translate-y-1 active:scale-95 animate-glow-pulse'
              : 'bg-purple-100 text-purple-300 cursor-not-allowed'}
          `}
          style={selected ? { boxShadow: '0 4px 24px rgba(168,85,247,0.4)' } : {}}
        >
          {selected ? '✅ אִשְּׁרִי תְּשׁוּבָה!' : 'בַּחֲרִי צְלִיל...'}
        </button>
      )}
    </div>
  );
}
