import { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';

import StatusBar        from './StatusBar';
import MagicMirror      from './MagicMirror';
import UnicornGuardian  from './UnicornGuardian';
import StarsBurst       from './StarsBurst';
import ProgressPath     from './ProgressPath';
import StageUnlock      from './StageUnlock';
import MathGate         from './MathGate';
import ParentDashboard  from './ParentDashboard';
import TutorialOverlay  from './TutorialOverlay';

import { VOWEL_GROUPS }  from '../data/letters';
import { useGameState }  from '../hooks/useGameState';
import { useSettings }   from '../hooks/useSettings';
import { useAudio }      from '../hooks/useAudio';

const TUTORIAL_KEY = 'libby-tutorial-done';

export default function GameBoard() {
  const { settings, toggleVowelType } = useSettings();
  const { playCardAudio } = useAudio();
  const playRef = useRef(playCardAudio);
  useEffect(() => { playRef.current = playCardAudio; }, [playCardAudio]);

  const {
    currentCard, score, hearts, streak, phase, lastResult,
    showHint, stars, cardIndex, totalCards,
    stage, lifetimeCrowns, stageJustUnlocked, dismissStageUnlock,
    allTimeStats, handleAnswer, restart, resetProgress,
  } = useGameState(settings);

  // Auto-play card audio when a new card appears
  useEffect(() => {
    if (!currentCard || phase !== 'idle') return;
    const t = setTimeout(() => playRef.current(currentCard), 700);
    return () => clearTimeout(t);
  }, [currentCard?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tutorial: show on first visit
  const [showTutorial, setShowTutorial] = useState(
    () => !localStorage.getItem(TUTORIAL_KEY)
  );
  function doneTutorial() {
    localStorage.setItem(TUTORIAL_KEY, '1');
    setShowTutorial(false);
  }

  const [showMathGate,  setShowMathGate]  = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  if (phase === 'win')      return <EndScreen won   score={score} restart={restart} />;
  if (phase === 'gameover') return <EndScreen won={false} score={score} restart={restart} />;

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-rubik
                               bg-gradient-to-br from-magic-lavender via-magic-pink to-magic-cream">

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-purple-200/40 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%]  w-80 h-80 rounded-full bg-pink-200/50   blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-amber-100/30 blur-2xl  animate-bounce-slow" />
      </div>

      <StatusBar score={score} hearts={hearts} streak={streak}
                 cardIndex={cardIndex} totalCards={totalCards} stage={stage} />

      {/* Title + gear */}
      <div className="relative text-center pt-4 pb-1 px-4">
        <h1 className="text-2xl font-black text-purple-700 drop-shadow-sm">
          🏰 מַמְלֶכֶת הַקְּרִיאָה שֶׁל לִיבִּי 👑
        </h1>
        <button
          onClick={() => setShowMathGate(true)}
          className="absolute left-4 top-4 p-2 rounded-full bg-white/60 hover:bg-white/90
                     border border-purple-200 text-purple-400 hover:text-purple-600 transition-all shadow-sm"
          aria-label="לוח בקרת הורים"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* ── Main area ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 px-3 py-4">

        {/* Gold unicorn — A sound */}
        <UnicornGuardian
          group={VOWEL_GROUPS.A}
          onChoose={() => handleAnswer('A')}
          phase={phase}
          lastResult={lastResult}
        />

        {/* Mirror */}
        <MagicMirror card={currentCard} phase={phase} showHint={showHint} />

        {/* Pink unicorn — E sound */}
        <UnicornGuardian
          group={VOWEL_GROUPS.E}
          onChoose={() => handleAnswer('E')}
          phase={phase}
          lastResult={lastResult}
        />
      </div>

      <ProgressPath lifetimeCrowns={lifetimeCrowns} stage={stage} />

      {/* Overlays — order matters (later = higher z) */}
      <StarsBurst stars={stars} />
      {stageJustUnlocked && <StageUnlock onDismiss={dismissStageUnlock} />}
      {showMathGate  && <MathGate
        onSuccess={() => { setShowMathGate(false); setShowDashboard(true); }}
        onCancel={() => setShowMathGate(false)}
      />}
      {showDashboard && (
        <ParentDashboard
          settings={settings} toggleVowelType={toggleVowelType}
          allTimeStats={allTimeStats} stage={stage} lifetimeCrowns={lifetimeCrowns}
          onResetProgress={resetProgress} onClose={() => setShowDashboard(false)}
        />
      )}
      {showTutorial && <TutorialOverlay onDone={doneTutorial} />}
    </div>
  );
}

// ── End screen ─────────────────────────────────────────────────
function EndScreen({ won, score, restart }) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center
                               bg-gradient-to-br from-magic-lavender via-magic-pink to-magic-cream
                               font-rubik px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-purple-300 shadow-2xl p-10 text-center max-w-md">
        {won ? (
          <>
            <div className="text-8xl mb-4 animate-bounce-slow">🏆</div>
            <h2 className="text-4xl font-black text-purple-700 mb-2">כׇּל הַכָּבוֹד, לִיבִּי! 👑</h2>
            <p className="text-xl text-purple-500 mb-4 font-assistant">סִיַּמְתְּ אֶת כׇּל הַכַּרְטִיסִים!</p>
          </>
        ) : (
          <>
            <div className="text-8xl mb-4">💔</div>
            <h2 className="text-3xl font-black text-pink-600 mb-2">נַסִּי שׁוּב! אַתְּ יְכוֹלָה! 💪</h2>
            <p className="text-lg text-pink-400 mb-4 font-assistant">אַל תַּסְכִּימִי — נַסִּי עוֹד פַּעַם!</p>
          </>
        )}
        <div className="flex items-center justify-center gap-2 bg-magic-gold/50 rounded-2xl px-6 py-3 mb-6 border border-amber-300">
          <span className="text-3xl">👑</span>
          <span className="text-3xl font-black text-amber-700">{score} נְקוּדוֹת!</span>
        </div>
        <button onClick={restart}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-transform">
          🎮 שַׂחֲקִי שׁוּב!
        </button>
      </div>
    </div>
  );
}
