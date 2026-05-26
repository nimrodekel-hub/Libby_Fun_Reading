import { useState, useCallback, useRef } from 'react';
import { shuffleDeck } from '../data/letters';

const INITIAL_HEARTS = 5;
const POINTS_CORRECT = 10;
const POINTS_STREAK_BONUS = 5;

export function useGameState() {
  const [deck, setDeck]               = useState(() => shuffleDeck());
  const [cardIndex, setCardIndex]     = useState(0);
  const [score, setScore]             = useState(0);
  const [hearts, setHearts]           = useState(INITIAL_HEARTS);
  const [streak, setStreak]           = useState(0);
  const [phase, setPhase]             = useState('idle'); // idle | correct | wrong | gameover | win
  const [lastResult, setLastResult]   = useState(null);   // { correct: bool, targetGroup }
  const [showHint, setShowHint]       = useState(false);
  const [stars, setStars]             = useState([]);     // floating star positions for animation
  const starIdRef                     = useRef(0);

  const currentCard = deck[cardIndex] ?? null;

  const spawnStars = useCallback(() => {
    const newStars = Array.from({ length: 8 }, () => ({
      id: ++starIdRef.current,
      x:  Math.random() * 80 + 10, // % from left
      y:  Math.random() * 60 + 10, // % from top
      delay: Math.random() * 0.4,
    }));
    setStars(prev => [...prev, ...newStars]);
    setTimeout(() => {
      setStars(prev => prev.filter(s => !newStars.find(n => n.id === s.id)));
    }, 1000);
  }, []);

  const handleAnswer = useCallback((chosenGroup) => {
    if (!currentCard || phase !== 'idle') return;

    const correct = chosenGroup === currentCard.vowelGroup;

    if (correct) {
      const bonus = streak >= 2 ? POINTS_STREAK_BONUS : 0;
      setScore(s => s + POINTS_CORRECT + bonus);
      setStreak(s => s + 1);
      setShowHint(false);
      setLastResult({ correct: true, targetGroup: currentCard.vowelGroup });
      setPhase('correct');
      spawnStars();

      setTimeout(() => {
        setPhase('idle');
        setLastResult(null);
        if (cardIndex + 1 >= deck.length) {
          setPhase('win');
        } else {
          setCardIndex(i => i + 1);
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
  }, [currentCard, phase, streak, hearts, cardIndex, deck.length, spawnStars]);

  const restart = useCallback(() => {
    setDeck(shuffleDeck());
    setCardIndex(0);
    setScore(0);
    setHearts(INITIAL_HEARTS);
    setStreak(0);
    setPhase('idle');
    setLastResult(null);
    setShowHint(false);
    setStars([]);
  }, []);

  const playAudio = useCallback((card) => {
    // Placeholder: wire up real audio in a later step
    if (!card) return;
    console.log('🔊 Play audio for:', card.audioPath);
    // e.g.: new Audio(card.audioPath).play()
  }, []);

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
    handleAnswer,
    restart,
    playAudio,
  };
}
