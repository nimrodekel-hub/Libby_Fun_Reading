import NikudTile from './NikudTile';
import { NIKUD_ORDER } from '../data/curriculum';

const HEAR_THRESHOLD = 3;

export default function LetterExplorer({ lesson, heardSet, onHear, onGoToQuiz, canGoToQuiz }) {
  const isOdd = NIKUD_ORDER.length % 2 !== 0;

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

      {/* Nikud grid — 2 columns, last tile centered when count is odd */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {NIKUD_ORDER.map((type, i) => {
          const isLast = isOdd && i === NIKUD_ORDER.length - 1;
          return (
            <div key={type} className={isLast ? 'col-span-2 flex justify-center' : ''}>
              <div className={isLast ? 'w-1/2' : 'w-full'}>
                <NikudTile
                  nikudType={type}
                  data={lesson.nikud[type]}
                  onHear={onHear}
                  heard={heardSet.has(type)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 items-center flex-wrap justify-center">
        {NIKUD_ORDER.map(type => (
          <span
            key={type}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              heardSet.has(type) ? 'bg-green-400 scale-125' : 'bg-purple-200'
            }`}
          />
        ))}
        <span className="text-xs text-purple-400 font-assistant mr-1">
          {heardSet.size}/{NIKUD_ORDER.length} שָׁמַעְתְּ
        </span>
      </div>

      {/* Go to quiz button */}
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
        {canGoToQuiz
          ? '✏️ לַשְּׁאֵלוֹן!'
          : `עוֹד ${HEAR_THRESHOLD - heardSet.size} לִשְׁמוֹעַ...`}
      </button>
    </div>
  );
}
