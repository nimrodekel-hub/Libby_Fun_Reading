import { useCallback, useRef, useState } from 'react';
import { getRecording } from '../utils/audioStorage';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playCardAudio = useCallback(async (card) => {
    if (!card || isPlaying) return;

    // Stop any in-progress audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();

    setIsPlaying(true);

    // Priority 1: parent recording in IndexedDB
    try {
      const stored = await getRecording(card.id);
      if (stored) {
        const audio = new Audio(stored);
        audioRef.current = audio;
        audio.onended  = () => setIsPlaying(false);
        audio.onerror  = () => setIsPlaying(false);
        await audio.play();
        return;
      }
    } catch {
      // fall through to TTS
    }

    // Priority 2: Web Speech API (TTS fallback)
    if ('speechSynthesis' in window) {
      // Prefer the full phonetic text for letter cards, display for word cards
      const text =
        card.cardType === 'word'
          ? card.display
          : (card.phonetic?.split(' ')[0] ?? card.display);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang  = 'he-IL';
      utterance.rate  = 0.75;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return { playCardAudio, isPlaying };
}
