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

  // Playback for curriculum tiles.
  // TTS fires synchronously first (iOS Safari user-gesture requirement).
  // In parallel we look for a better source and swap in if found:
  //   1. Static file deployed to /audio/ (cross-device, committed to repo)
  //   2. IndexedDB parent recording (same-device only)
  const playLessonTile = useCallback((lessonId, nikudType, fallbackText) => {
    if (!lessonId || !nikudType) return;
    stopAll();
    isPlayingRef.current = true;

    // Fire TTS immediately — synchronous call preserves the iOS Safari gesture context.
    if (fallbackText && 'speechSynthesis' in window) {
      const u = buildUtterance(fallbackText, () => { isPlayingRef.current = false; });
      window.speechSynthesis.speak(u);
    } else {
      isPlayingRef.current = false;
    }

    // Helper: cancel TTS and play an audio src instead.
    function upgradeToAudio(src) {
      window.speechSynthesis?.cancel();
      isPlayingRef.current = true;
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.onended = () => { isPlayingRef.current = false; };
      audio.onerror  = () => { isPlayingRef.current = false; };
      audio.play().catch(() => { isPlayingRef.current = false; });
    }

    // Background upgrade: static file → IndexedDB → keep TTS.
    const base       = import.meta.env.BASE_URL ?? '/';
    const staticPath = `${base}audio/${lessonId}-${nikudType}.webm`;
    const dbKey      = `${lessonId}-${nikudType}`;

    fetch(staticPath, { method: 'HEAD' })
      .then(res => {
        if (res.ok) { upgradeToAudio(staticPath); return; }
        return getRecording(dbKey).then(stored => { if (stored) upgradeToAudio(stored); });
      })
      .catch(() =>
        getRecording(dbKey).then(stored => { if (stored) upgradeToAudio(stored); }).catch(() => {})
      );
  }, [stopAll]);

  return { playCardAudio, playText, playLessonTile, stopAll };
}
