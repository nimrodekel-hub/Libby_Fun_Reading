import { useCallback, useRef, useEffect } from 'react';
import { getRecording } from '../utils/audioStorage';

// Load voices immediately and on change (voices load async in browsers)
function initVoices() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

function getBestVoice() {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  return (
    voices.find(v => v.lang === 'he-IL') ||
    voices.find(v => v.lang.startsWith('he')) ||
    null
  );
}

function buildUtterance(text, onEnd) {
  const u = new SpeechSynthesisUtterance(text);
  const voice = getBestVoice();
  if (voice) u.voice = voice;
  u.lang   = 'he-IL';
  u.rate   = 0.6;
  u.pitch  = 1.0;
  u.volume = 1.0;
  if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
  return u;
}

export function useAudio() {
  const audioRef     = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => { initVoices(); }, []);

  const stopAll = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    window.speechSynthesis?.cancel();
    isPlayingRef.current = false;
  }, []);

  // Play an arbitrary Hebrew text string (used by unicorn "hear me" buttons)
  const playText = useCallback((text) => {
    if (!text || !('speechSynthesis' in window)) return;
    stopAll();
    isPlayingRef.current = true;
    const u = buildUtterance(text, () => { isPlayingRef.current = false; });
    window.speechSynthesis.speak(u);
  }, [stopAll]);

  // Play a card: IndexedDB recording first, then TTS
  const playCardAudio = useCallback(async (card) => {
    if (!card) return;
    stopAll();
    isPlayingRef.current = true;

    // Priority 1: parent recording
    try {
      const stored = await getRecording(card.id);
      if (stored) {
        const audio = new Audio(stored);
        audioRef.current  = audio;
        audio.onended = () => { isPlayingRef.current = false; };
        audio.onerror = () => { isPlayingRef.current = false; };
        await audio.play();
        return;
      }
    } catch { /* fall through */ }

    // Priority 2: TTS
    if ('speechSynthesis' in window) {
      const u = buildUtterance(card.display, () => { isPlayingRef.current = false; });
      window.speechSynthesis.speak(u);
    } else {
      isPlayingRef.current = false;
    }
  }, [stopAll]);

  // 2-tier playback for curriculum tiles: IndexedDB recording → TTS
  // (Static-file tier omitted: no files deployed yet, and the async fetch
  //  breaks the user-gesture chain on iOS Safari before TTS can fire.)
  const playLessonTile = useCallback(async (lessonId, nikudType, fallbackText) => {
    if (!lessonId || !nikudType) return;
    stopAll();
    isPlayingRef.current = true;

    // Tier 1: IndexedDB parent recording
    try {
      const stored = await getRecording(`${lessonId}-${nikudType}`);
      if (stored) {
        const audio = new Audio(stored);
        audioRef.current = audio;
        audio.onended = () => { isPlayingRef.current = false; };
        audio.onerror  = () => { isPlayingRef.current = false; };
        await audio.play();
        return;
      }
    } catch { /* fall through */ }

    // Tier 2: TTS
    isPlayingRef.current = false;
    if (fallbackText && 'speechSynthesis' in window) {
      isPlayingRef.current = true;
      const u = buildUtterance(fallbackText, () => { isPlayingRef.current = false; });
      window.speechSynthesis.speak(u);
    }
  }, [stopAll]);

  return { playCardAudio, playText, playLessonTile, stopAll };
}
