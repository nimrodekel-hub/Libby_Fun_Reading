import { useCallback, useRef, useEffect } from 'react';
import { getRecording } from '../utils/audioStorage';
import { AUDIO_EXTS } from '../utils/githubSync';

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
  //
  // Strategy:
  //   1. Fire TTS immediately (synchronous — preserves iOS Safari gesture context).
  //   2. In the background, check IndexedDB first (fast, offline-capable).
  //   3. Fall back to network static files (.wav → .webm) if not in IndexedDB.
  //   4. Cancel TTS as soon as a source is found — no waiting for play() to resolve,
  //      so the parent recording takes over in ~5 ms with no audible TTS bleed.
  const playLessonTile = useCallback((lessonId, nikudType, fallbackText) => {
    if (!lessonId || !nikudType) return;
    stopAll();
    isPlayingRef.current = true;

    // 1 — Fire TTS immediately (must be synchronous for iOS gesture context)
    if (fallbackText && 'speechSynthesis' in window) {
      const u = buildUtterance(fallbackText, () => { isPlayingRef.current = false; });
      window.speechSynthesis.speak(u);
    } else {
      isPlayingRef.current = false;
    }

    const base = import.meta.env.BASE_URL ?? '/';
    const key  = `${lessonId}-${nikudType}`;

    // Cancel TTS immediately and play src. If play() fails, brief silence — acceptable.
    function tryAudio(src) {
      window.speechSynthesis?.cancel();
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.onended = () => { isPlayingRef.current = false; };
      audio.onerror = () => { isPlayingRef.current = false; };
      audio.play()
        .then(() => { isPlayingRef.current = true; })
        .catch(() => { isPlayingRef.current = false; });
    }

    // 2 — Background: IndexedDB first (offline — picks up auto-synced recordings)
    async function upgradeFromStatic() {
      try {
        const stored = await getRecording(key);
        if (stored) { tryAudio(stored); return; }
      } catch { /* fall through to network */ }
      // 3 — Network: static files (.wav first for iOS compat, .webm fallback)
      for (const ext of AUDIO_EXTS) {
        const src = `${base}audio/${key}${ext}`;
        try {
          const res = await fetch(src, { method: 'HEAD' });
          if (res.ok) { tryAudio(src); return; }
        } catch { /* try next */ }
      }
    }

    upgradeFromStatic();
  }, [stopAll]);

  return { playCardAudio, playText, playLessonTile, stopAll };
}
