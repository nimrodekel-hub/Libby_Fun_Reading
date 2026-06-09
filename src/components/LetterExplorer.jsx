import NikudTile from './NikudTile';
import { NIKUD_ORDER } from '../data/curriculum';

const HEAR_THRESHOLD = 7;

export default function LetterExplorer({ lesson, heardSet, onHear, onGoToQuiz, canGoToQuiz }) {
  const isOdd     = NIKUD_ORDER.length % 2 !== 0;
  const heardCount = heardSet.size;
  const remaining  = Math.max(0, HEAR_THRESHOLD - heardCount);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto px-4 py-6">

      {/* Letter hero card */}
      <div className="text-center animate-slide-up">
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-2 font-black font-rubik text-purple-900 text-6xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #f5f3ff, #fce7f3)',
            border: '3px solid rgba(196,181,253,0.6)',
            boxShadow: '0 8px 32px rgba(168,85,247,0.2)',
            direction: 'rtl',
          }}
        >
          {lesson.base}
        </div>
        <div className="text-lg font-bold text-purple-600 font-assistant">
          {lesson.emoji} אוֹת {lesson.name}
        </div>
        <p className="text-sm text-purple-400 font-assistant mt-1">
          לְחֲצִי עַל כָּל אוֹת לִשְׁמוֹעַ 🔊
        </p>
      </div>

      {/* Nikud grid */}
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
                  lessonId={lesson.id}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar + dots */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex gap-2 items-center">
          {NIKUD_ORDER.map(type => (
            <div
              key={type}
              className={`transition-all duration-400 rounded-full ${
                heardSet.has(type)
                  ? 'w-4 h-4 bg-green-400 shadow-md scale-110'
                  : 'w-3 h-3 bg-purple-200'
              }`}
            />
          ))}
          <span className="text-xs text-purple-400 font-assistant mr-2">
            {heardCount}/{NIKUD_ORDER.length} שָׁמַעְתְּ
          </span>
        </div>

        {/* Mini progress fill */}
        <div className="w-48 h-2 bg-purple-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(heardCount / NIKUD_ORDER.length) * 100}%`,
              background: 'linear-gradient(to right, #a855f7, #22c55e)',
            }}
          />
        </div>
      </div>

      {/* Go to quiz button */}
      <button
        onClick={onGoToQuiz}
        disabled={!canGoToQuiz}
        className={`
          w-full py-4 rounded-2xl text-xl font-black font-rubik transition-all duration-300
          ${canGoToQuiz
            ? 'text-white hover:scale-105 hover:-translate-y-1 active:scale-95'
            : 'text-purple-300 cursor-not-allowed'}
        `}
        style={canGoToQuiz ? {
          background: 'linear-gradient(135deg, #9333ea, #ec4899)',
          boxShadow: '0 8px 28px rgba(147,51,234,0.45)',
        } : {
          background: 'rgba(237,233,254,0.7)',
        }}
      >
        {canGoToQuiz
          ? '✏️ לַשְּׁאֵלוֹן! 🚀'
          : `עוֹד ${remaining} לִשְׁמוֹעַ...`}
      </button>
    </div>
  );
}
