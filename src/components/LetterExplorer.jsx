import NikudTile from './NikudTile';
import { NIKUD_ORDER } from '../data/curriculum';

const HEAR_THRESHOLD = 7;

export default function LetterExplorer({ lesson, heardSet, onHear, onGoToQuiz, canGoToQuiz }) {
  const isOdd      = NIKUD_ORDER.length % 2 !== 0;
  const heardCount = heardSet.size;
  const remaining  = Math.max(0, HEAR_THRESHOLD - heardCount);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto px-4 py-6">

      {/* Letter hero — golden glowing medallion */}
      <div className="text-center animate-slide-up">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-3 font-black font-rubik text-6xl"
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
            border: '4px solid rgba(251,191,36,0.85)',
            boxShadow: '0 0 48px rgba(251,191,36,0.55), 0 8px 32px rgba(0,0,0,0.4)',
            color: '#78350f',
            direction: 'rtl',
          }}
        >
          {lesson.base}
        </div>
        <div className="text-xl font-black text-white font-rubik drop-shadow-md">
          {lesson.emoji} אוֹת {lesson.name}
        </div>
        <p className="text-sm font-assistant mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
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

      {/* Progress dots + bar */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex gap-2 items-center">
          {NIKUD_ORDER.map(type => (
            <div
              key={type}
              className={`transition-all duration-400 rounded-full ${
                heardSet.has(type)
                  ? 'w-4 h-4 bg-green-400 shadow-md scale-110'
                  : 'w-3 h-3'
              }`}
              style={heardSet.has(type) ? {} : { background: 'rgba(255,255,255,0.3)' }}
            />
          ))}
          <span className="text-xs font-assistant mr-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {heardCount}/{NIKUD_ORDER.length} שָׁמַעְתְּ
          </span>
        </div>

        <div className="w-48 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
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
            ? 'hover:scale-105 hover:-translate-y-1 active:scale-95'
            : 'cursor-not-allowed'}
        `}
        style={canGoToQuiz ? {
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          color: '#1c1917',
          boxShadow: '0 8px 32px rgba(251,191,36,0.55), 0 4px 12px rgba(0,0,0,0.3)',
        } : {
          background: 'rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.45)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {canGoToQuiz
          ? '✏️ לַשְּׁאֵלוֹן! 🚀'
          : `עוֹד ${remaining} לִשְׁמוֹעַ...`}
      </button>
    </div>
  );
}
