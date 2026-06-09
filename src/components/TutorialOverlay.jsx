import { useState, useEffect } from 'react';

const STEPS = [
  {
    emoji: '🔊',
    visual: (
      <div className="flex flex-col items-center gap-3">
        <div className="w-36 h-36 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl border-4 border-purple-300 flex flex-col items-center justify-center shadow-xl">
          <span style={{ fontSize: '5rem', lineHeight: '6.5rem', direction: 'rtl' }}
            className="font-rubik font-black text-purple-800">בָּ</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-full shadow-lg">
          <span className="text-3xl animate-pulse">🔊</span>
          <span className="text-lg font-black font-rubik">תִּשְׁמְעִי!</span>
        </div>
      </div>
    ),
    text: 'אוֹת חֲדָשָׁה תְּנַגֵּן אוֹטוֹמָטִית 🎵',
    sub:  'לְחֲצִי עַל 🔊 לַחְזָרָה',
  },
  {
    emoji: '🦄',
    visual: (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-1 bg-amber-100 border-4 border-amber-400 rounded-2xl px-5 py-4 shadow-lg">
          <span className="text-4xl">😮</span>
          <span className="text-4xl font-black font-rubik text-amber-800" style={{ lineHeight: '5rem' }}>אָ</span>
        </div>
        <div className="text-3xl text-purple-400 font-black">?</div>
        <div className="flex flex-col items-center gap-1 bg-pink-100 border-4 border-pink-400 rounded-2xl px-5 py-4 shadow-lg">
          <span className="text-4xl">😁</span>
          <span className="text-4xl font-black font-rubik text-pink-800" style={{ lineHeight: '5rem' }}>אֶ</span>
        </div>
      </div>
    ),
    text: 'לְחֲצִי עַל הַיּוּנִיקוֹרן הַנָּכוֹן!',
    sub:  'לחיצה = שמיעת הצליל + תשובה',
  },
  {
    emoji: '🏆',
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="text-7xl animate-bounce-slow">🌟</div>
        <div className="flex gap-2 text-4xl">
          <span className="animate-star-pop" style={{ animationDelay: '0s' }}>✨</span>
          <span className="animate-star-pop" style={{ animationDelay: '0.2s' }}>⭐</span>
          <span className="animate-star-pop" style={{ animationDelay: '0.4s' }}>💫</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 border-2 border-amber-400 rounded-full px-4 py-2">
          <span className="text-2xl">👑</span>
          <span className="text-xl font-black font-rubik text-amber-700">+10 נְקוּדוֹת!</span>
        </div>
      </div>
    ),
    text: 'נָכוֹן = כּוֹכָבִים וּנְקוּדוֹת! ✨',
    sub:  '10 כְּתָרִים = עוֹלָם מִילִּים חָדָשׁ!',
  },
];

export default function TutorialOverlay({ onDone }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm pb-4 px-4"
         dir="rtl">
      <div className="bg-white rounded-3xl border-4 border-purple-300 shadow-2xl
                      w-full max-w-sm overflow-hidden font-rubik">

        {/* Step dots */}
        <div className="flex justify-center gap-2 pt-4">
          {STEPS.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300
              ${i === step ? 'bg-purple-500 w-6' : i < step ? 'bg-purple-300' : 'bg-purple-100'}`} />
          ))}
        </div>

        {/* Visual */}
        <div className="flex items-center justify-center py-6 min-h-[200px]">
          {current.visual}
        </div>

        {/* Text */}
        <div className="text-center px-6 pb-2">
          <p className="text-xl font-black text-purple-800">{current.text}</p>
          <p className="text-sm text-purple-400 font-assistant mt-1">{current.sub}</p>
        </div>

        {/* Button */}
        <div className="p-4 pt-2">
          <button
            onClick={() => isLast ? onDone() : setStep(s => s + 1)}
            className="w-full py-4 rounded-2xl text-xl font-black text-white shadow-lg
                       bg-gradient-to-r from-purple-500 to-pink-500
                       hover:scale-105 active:scale-95 transition-transform"
          >
            {isLast ? '▶ בּוֹאִי נִשְׂחַק! 🎮' : 'הַבָּא ← '}
          </button>
        </div>
      </div>
    </div>
  );
}
