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
  //   2. In the background, search for a static audio file (.wav first, then .webm).
  //   3. Try IndexedDB as last resort before keeping TTS.
  //   4. Only cancel TTS once we confirm the audio ACTUALLY starts playing
  //      (audio.play() resolves). If it fails (unsupported format, network), TTS
  //      continues — no silent failure.
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

    // Attempt to play an audio src. Cancels TTS only if playback actually starts.
    function tryAudio(src) {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.onended = () => { isPlayingRef.current = false; };
      audio.onerror = () => { isPlayingRef.current = false; }; // TTS stays if format unsupported
      audio.play()
        .then(() => {
          // Playback started — silence TTS now
          window.speechSynthesis?.cancel();
          isPlayingRef.current = true;
        })
        .catch(() => {
          // Can't play (unsupported format or gesture context lost) — TTS continues
          isPlayingRef.current = false;
        });
    }

    // 2 — Background: try static files (.wav first for iOS compat, .webm fallback)
    async function upgradeFromStatic() {
      for (const ext of AUDIO_EXTS) {
        const src = `${base}audio/${key}${ext}`;
        try {
          const res = await fetch(src, { method: 'HEAD' });
          if (res.ok) { tryAudio(src); return; }
        } catch { /* try next */ }
      }
      // 3 — Last resort: IndexedDB (same device only)
      try {
        const stored = await getRecording(key);
        if (stored) tryAudio(stored);
      } catch { /* keep TTS */ }
    }

    upgradeFromStatic();
  }, [stopAll]);

  return { playCardAudio, playText, playLessonTile, stopAll };
}
