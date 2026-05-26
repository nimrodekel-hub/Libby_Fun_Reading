import NikudTile from './NikudTile';
import { NIKUD_ORDER } from '../data/curriculum';

export default function LetterExplorer({ lesson, heardSet, onHear, onGoToQuiz, canGoToQuiz }) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 py-6">

      {/* Letter header */}
      <div className="text-center">
        <div className="text-7xl font-black font-rubik text-purple-800 leading-none mb-1" dir="rtl">
          {lesson.base}
        </div>
        <div className="text-lg font-bold text-purple-500 font-assistant">
          {lesson.emoji} אוֹת {lesson.name}
        </div>
        <p className="text-sm text-purple-400 font-assistant mt-1">
          לְחֲצִי עַל כָּל אוֹת לִשְׁמוֹעַ אֶת הַצְּלִיל 🔊
        </p>
      </div>

      {/* 2×2 nikud grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {NIKUD_ORDER.map(type => (
          <NikudTile
            key={type}
            nikudType={type}
            data={lesson.nikud[type]}
            onHear={onHear}
            heard={heardSet.has(type)}
          />
        ))}
      </div>

      {/* Progress hint */}
      <div className="flex gap-2 items-center">
        {NIKUD_ORDER.map(type => (
          <span
            key={type}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              heardSet.has(type) ? 'bg-green-400 scale-125' : 'bg-purple-200'
            }`}
          />
        ))}
        <span className="text-xs text-purple-400 font-assistant mr-1">
          {heardSet.size}/4 שָׁמַעְתְּ
        </span>
      </div>

      {/* Go to quiz button — unlocks after 2 heard */}
      <button
        onClick={onGoToQuiz}
        disabled={!canGoToQuiz}
        className={`
          w-full py-4 rounded-2xl text-xl font-black font-rubik transition-all duration-300 shadow-lg
          ${canGoToQuiz
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95 animate-bounce-slow'
            : 'bg-purple-100 text-purple-300 cursor-not-allowed'}
        `}
      >
        {canGoToQuiz ? '✏️ לַשְּׁאֵלוֹן!' : `עוֹד ${2 - heardSet.size} לִשְׁמוֹעַ...`}
      </button>
    </div>
  );
}
