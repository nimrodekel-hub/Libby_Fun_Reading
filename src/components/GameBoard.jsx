import { useState, useCallback } from 'react';
import LessonPage      from './LessonPage';
import MagicBackground from './MagicBackground';
import ConfettiBurst   from './ConfettiBurst';
import RecordingStudio from './RecordingStudio';
import { useLessonState } from '../hooks/useLessonState';

export default function GameBoard() {
  const state = useLessonState();
  const [showRecording, setShowRecording] = useState(false);
  const [tapCount,      setTapCount]      = useState(0);
  const [tapTimer,      setTapTimer]      = useState(null);

  // Hidden parent entry: tap the 👑 score badge 5 times within 2 seconds
  const handleScoreTap = useCallback(() => {
    setTapCount(n => {
      const next = n + 1;
      if (next >= 5) {
        setShowRecording(true);
        clearTimeout(tapTimer);
        setTapTimer(null);
        return 0;
      }
      clearTimeout(tapTimer);
      const t = setTimeout(() => setTapCount(0), 2000);
      setTapTimer(t);
      return next;
    });
  }, [tapTimer]);

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
        onSpeechComplete={state.onSpeechComplete}
        score={state.score}
        onScoreTap={handleScoreTap}
      />

      {showRecording && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
             dir="rtl">
          <div className="bg-white rounded-t-3xl border-t-4 border-purple-300 shadow-2xl
                          w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden font-rubik">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 shrink-0">
              <div>
                <h2 className="text-lg font-black text-purple-800">🎙️ אוּלְפַּן הַהַקְלָטָה</h2>
                <p className="text-xs text-purple-400 font-assistant">הַקְלִיטִי מִילִּים עֲבוּר לִיבִּי</p>
              </div>
              <button
                onClick={() => setShowRecording(false)}
                className="p-2 rounded-full hover:bg-purple-100 text-purple-500 transition-colors text-xl font-black"
              >
                ✕
              </button>
            </div>
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">
              <RecordingStudio />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DoneScreen({ score, right, wrong, restart }) {
  const total = right + wrong;
  const pct   = total > 0 ? Math.round((right / total) * 100) : 0;
  const [confetti, setConfetti] = useState(true);

  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;

  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center
                               bg-gradient-to-br from-magic-lavender via-magic-pink to-magic-cream
                               font-rubik px-4 relative overflow-hidden">
      <MagicBackground />
      <ConfettiBurst active={confetti} count={60} onDone={() => setConfetti(false)} />

      {/* Trophy + text */}
      <div className="relative z-10 w-full max-w-sm animate-slide-up">
        {/* Glowing card */}
        <div className="rounded-[2rem] p-8 text-center"
             style={{
               background: 'rgba(255,255,255,0.92)',
               border: '4px solid rgba(216,180,254,0.7)',
               boxShadow: '0 20px 60px rgba(168,85,247,0.25), 0 4px 16px rgba(0,0,0,0.08)',
             }}>

          {/* Trophy */}
          <div className="text-8xl mb-3 animate-bounce-slow">🏆</div>

          {/* Star rating */}
          <div className="flex justify-center gap-1 mb-3">
            {[1,2,3].map(n => (
              <span key={n} className={`text-4xl transition-all ${n <= stars ? 'animate-wiggle' : 'opacity-25 grayscale'}`}
                    style={{ animationDelay: `${n * 0.15}s` }}>
                ⭐
              </span>
            ))}
          </div>

          <h2 className="text-3xl font-black text-purple-700 mb-1">כׇּל הַכָּבוֹד, לִיבִּי!</h2>
          <p className="text-purple-400 font-assistant mb-5 text-sm">סִיַּמְתְּ אֶת כׇּל הָאוֹתִיּוֹת! 🎉</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Stat emoji="👑" value={score}     label="נְקוּדוֹת"  color="amber"  />
            <Stat emoji="✅" value={right}     label="נָכוֹן"     color="green"  />
            <Stat emoji="🌟" value={`${pct}%`} label="הַצְלָחָה" color="purple" />
          </div>

          {/* Restart */}
          <button
            onClick={restart}
            className="w-full py-4 rounded-2xl text-white text-xl font-black
                       hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all"
            style={{
              background: 'linear-gradient(135deg, #9333ea, #ec4899)',
              boxShadow: '0 8px 28px rgba(147,51,234,0.45)',
            }}
          >
            🎮 שַׂחֲקִי שׁוּב!
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ emoji, value, label, color }) {
  const styles = {
    amber:  { bg: 'rgba(255,251,235,0.9)', border: '#FCD34D', text: '#B45309' },
    green:  { bg: 'rgba(240,253,244,0.9)', border: '#6EE7B7', text: '#065F46' },
    purple: { bg: 'rgba(245,243,255,0.9)', border: '#C4B5FD', text: '#6D28D9' },
  }[color];

  return (
    <div className="flex flex-col items-center p-3 rounded-2xl animate-pop-in"
         style={{ background: styles.bg, border: `2px solid ${styles.border}`, color: styles.text }}>
      <span className="text-2xl">{emoji}</span>
      <span className="text-xl font-black">{value}</span>
      <span className="text-xs font-assistant">{label}</span>
    </div>
  );
}
