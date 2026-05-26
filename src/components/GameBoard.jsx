import LessonPage from './LessonPage';
import StarsBurst  from './StarsBurst';
import { useLessonState } from '../hooks/useLessonState';

export default function GameBoard() {
  const state = useLessonState();

  // "Done" screen after all lessons
  if (state.phase === 'done') {
    return <DoneScreen score={state.score} right={state.totalRight} wrong={state.totalWrong} restart={state.restart} />;
  }

  return (
    <>
      <LessonPage
        lesson={state.lesson}
        lessonIdx={state.lessonIdx}
        totalLessons={state.totalLessons}
        phase={state.phase}
        heardSet={state.heardSet}
        markHeard={state.markHeard}
        canGoToQuiz={state.canGoToQuiz}
        goToQuiz={state.goToQuiz}
        question={state.question}
        qIdx={state.qIdx}
        totalQuestions={state.totalQuestions}
        selected={state.selected}
        setSelected={state.setSelected}
        qFeedback={state.qFeedback}
        submitAnswer={state.submitAnswer}
        score={state.score}
      />
      <StarsBurst stars={[]} />
    </>
  );
}

function DoneScreen({ score, right, wrong, restart }) {
  const total = right + wrong;
  const pct   = total > 0 ? Math.round((right / total) * 100) : 0;

  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center
                               bg-gradient-to-br from-magic-lavender via-magic-pink to-magic-cream
                               font-rubik px-4">
      <div className="bg-white/90 rounded-3xl border-4 border-purple-300 shadow-2xl p-10 text-center max-w-sm w-full">
        <div className="text-8xl mb-4 animate-bounce-slow">🏆</div>
        <h2 className="text-3xl font-black text-purple-700 mb-1">כׇּל הַכָּבוֹד, לִיבִּי!</h2>
        <p className="text-purple-400 font-assistant mb-5">סִיַּמְתְּ אֶת כׇּל הָאוֹתִיּוֹת!</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <Stat emoji="👑" value={score} label="נְקוּדוֹת"  color="amber" />
          <Stat emoji="✅" value={right} label="נָכוֹן"     color="green" />
          <Stat emoji="⭐" value={`${pct}%`} label="הַצְלָחָה" color="purple" />
        </div>

        <button
          onClick={restart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500
                     text-white text-xl font-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          🎮 שַׂחֲקִי שׁוּב!
        </button>
      </div>
    </div>
  );
}

function Stat({ emoji, value, label, color }) {
  const cls = {
    amber:  'bg-amber-50  border-amber-200  text-amber-700',
    green:  'bg-green-50  border-green-200  text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  }[color];
  return (
    <div className={`flex flex-col items-center p-3 rounded-2xl border-2 ${cls}`}>
      <span className="text-2xl">{emoji}</span>
      <span className="text-xl font-black">{value}</span>
      <span className="text-xs font-assistant">{label}</span>
    </div>
  );
}
