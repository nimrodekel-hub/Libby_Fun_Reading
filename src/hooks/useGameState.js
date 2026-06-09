import { useState, useCallback, useRef, useEffect } from 'react';
import { LETTER_CARDS } from '../data/letters';
import { WORD_CARDS }   from '../data/words';

export const STAGE2_THRESHOLD = 10; // crowns to unlock Stage 2
const INITIAL_HEARTS    = 5;
const POINTS_CORRECT    = 10;
const POINTS_STREAK_BONUS = 5;

// ── Persistence helpers ────────────────────────────────────────
function loadInt(key, def) {
  const v = localStorage.getItem(key);
  return v !== null ? parseInt(v, 10) : def;
}
function save(key, val) {
  localStorage.setItem(key, String(val));
}

// ── Deck builder ───────────────────────────────────────────────
function buildDeck(stage, settings) {
  const source = stage === 1 ? LETTER_CARDS : WORD_CARDS;
  const active = settings?.activeVowelTypes ?? ['KAMATZ','PATACH','SEGOL','TZERE'];
  const filtered = source.filter(c => active.includes(c.nikudType));

  // Safety: ensure both groups are represented after filtering
  const hasA = filtered.some(c => c.vowelGroup === 'A');
  const hasE = filtered.some(c => c.vowelGroup === 'E');
  const pool  = hasA && hasE ? filtered : [...source];

  return [...pool].sort(() => Math.random() - 0.5);
}

export function useGameState(settings) {
  // ── Persistent state ─────────────────────────────────────────
  const [stage,          setStage]         = useState(() => loadInt('libby-stage', 1));
  const [lifetimeCrowns, setLifetimeCrowns] = useState(() => loadInt('libby-crowns', 0));
  const [allTimeStats,   setAllTimeStats]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('libby-stats') ?? '{"attempts":0,"correct":0}'); }
    catch { return { attempts: 0, correct: 0 }; }
  });

  // ── Session state ─────────────────────────────────────────────
  const [deck,          setDeck]         = useState(() => buildDeck(loadInt('libby-stage',1), settings));
  const [cardIndex,     setCardIndex]    = useState(0);
  const [score,         setScore]        = useState(0);
  const [hearts,        setHearts]       = useState(INITIAL_HEARTS);
  const [streak,        setStreak]       = useState(0);
  const [phase,         setPhase]        = useState('idle');
  const [lastResult,    setLastResult]   = useState(null);
  const [showHint,      setShowHint]     = useState(false);
  const [stars,         setStars]        = useState([]);
  const [stageJustUnlocked, setStageJustUnlocked] = useState(false);

  const starIdRef = useRef(0);

  // Rebuild deck whenever settings (vowel filter) change
  const settingsKey = JSON.stringify(settings?.activeVowelTypes);
  useEffect(() => {
    setDeck(buildDeck(stage, settings));
    setCardIndex(0);
    setPhase('idle');
    setLastResult(null);
    setShowHint(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsKey, stage]);

  const currentCard = deck[cardIndex] ?? null;

  // ── Star burst helper ─────────────────────────────────────────
  const spawnStars = useCallback(() => {
    const batch = Array.from({ length: 8 }, () => ({
      id:    ++starIdRef.current,
      x:     Math.random() * 80 + 10,
      y:     Math.random() * 60 + 10,
      delay: Math.random() * 0.4,
    }));
    setStars(prev => [...prev, ...batch]);
    setTimeout(() => setStars(prev => prev.filter(s => !batch.find(b => b.id === s.id))), 1000);
  }, []);

  // ── Answer handler ────────────────────────────────────────────
  const handleAnswer = useCallback((chosenGroup) => {
    if (!currentCard || phase !== 'idle') return;
    const correct = chosenGroup === currentCard.vowelGroup;

    // Update all-time stats
    setAllTimeStats(prev => {
      const next = {
        attempts: prev.attempts + 1,
        correct:  prev.correct + (correct ? 1 : 0),
      };
      localStorage.setItem('libby-stats', JSON.stringify(next));
      return next;
    });

    if (correct) {
      const bonus    = streak >= 2 ? POINTS_STREAK_BONUS : 0;
      const newCrowns = lifetimeCrowns + 1;

      setScore(s => s + POINTS_CORRECT + bonus);
      setStreak(s => s + 1);
      setLifetimeCrowns(newCrowns);
      save('libby-crowns', newCrowns);
      setShowHint(false);
      setLastResult({ correct: true, targetGroup: currentCard.vowelGroup });
      setPhase('correct');
      spawnStars();

      // Stage 2 unlock check
      if (stage === 1 && newCrowns >= STAGE2_THRESHOLD) {
        setTimeout(() => {
          setStage(2);
          save('libby-stage', 2);
          setStageJustUnlocked(true);
          setPhase('idle');
          setLastResult(null);
        }, 1200);
        return;
      }

      setTimeout(() => {
        if (cardIndex + 1 >= deck.length) {
          setPhase('win');
        } else {
          setCardIndex(i => i + 1);
          setPhase('idle');
          setLastResult(null);
        }
      }, 1200);
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      setStreak(0);
      setShowHint(true);
      setLastResult({ correct: false, targetGroup: currentCard.vowelGroup });
      setPhase('wrong');

      setTimeout(() => {
        if (newHearts <= 0) {
          setPhase('gameover');
        } else {
          setPhase('idle');
          setLastResult(null);
        }
      }, 900);
    }
  }, [currentCard, phase, streak, hearts, lifetimeCrowns, stage, cardIndex, deck.length, spawnStars]);

  // ── Dismiss stage-unlock overlay ──────────────────────────────
  const dismissStageUnlock = useCallback(() => {
    setStageJustUnlocked(false);
    // deck is rebuilt automatically via the useEffect watching `stage`
  }, []);

  // ── Restart ───────────────────────────────────────────────────
  const restart = useCallback(() => {
    setDeck(buildDeck(stage, settings));
    setCardIndex(0);
    setScore(0);
    setHearts(INITIAL_HEARTS);
    setStreak(0);
    setPhase('idle');
    setLastResult(null);
    setShowHint(false);
    setStars([]);
  }, [stage, settings]);

  // ── Full progress reset (called from parent dashboard) ────────
  const resetProgress = useCallback(() => {
    setStage(1);
    setLifetimeCrowns(0);
    setAllTimeStats({ attempts: 0, correct: 0 });
    localStorage.removeItem('libby-stage');
    localStorage.removeItem('libby-crowns');
    localStorage.removeItem('libby-stats');
    setDeck(buildDeck(1, settings));
    setCardIndex(0);
    setScore(0);
    setHearts(INITIAL_HEARTS);
    setStreak(0);
    setPhase('idle');
    setLastResult(null);
    setShowHint(false);
    setStars([]);
    setStageJustUnlocked(false);
  }, [settings]);

  return {
    currentCard,
    score,
    hearts,
    streak,
    phase,
    lastResult,
    showHint,
    stars,
    cardIndex,
    totalCards: deck.length,
    // Progression
    stage,
    lifetimeCrowns,
    stageJustUnlocked,
    dismissStageUnlock,
    // Stats (for dashboard)
    allTimeStats,
    // Actions
    handleAnswer,
    restart,
    resetProgress,
  };
}
