import { useCallback, useRef, useEffect } from 'react';
import { getRecording, getAllRecordedCardIds } from '../utils/audioStorage';
import { AUDIO_EXTS } from '../utils/githubSync';

// ── In-memory recording cache ─────────────────────────────────────────────────
// Tracks which IndexedDB keys have recordings, so playLessonTile can skip TTS
// synchronously instead of waiting for an async IndexedDB lookup.
const cachedKeys = new Set();

async function warmCache() {
  try {
    const ids = await getAllRecordedCardIds();
    ids.forEach(id => cachedKeys.add(id));
  } catch { /* best-effort */ }
}

// Called by RecordingStudio/syncAudio after saving a recording to IndexedDB.
export function noteCachedKey(key)   { cachedKeys.add(key); }
export function removeCachedKey(key) { cachedKeys.delete(key); }

// Rebuild the full cache (call after a bulk sync).
export async function refreshRecordingCache() {
  cachedKeys.clear();
  await warmCache();
}

// ── Voice helpers ─────────────────────────────────────────────────────────────

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

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAudio() {
  const audioRef     = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    initVoices();
    warmCache();
  }, []);

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

    if ('speechSynthesis' in window) {
      const u = buildUtterance(card.display, () => { isPlayingRef.current = false; });
      window.speechSynthesis.speak(u);
    } else {
      isPlayingRef.current = false;
    }
  }, [stopAll]);

  // Playback for curriculum tiles.
  //
  // Fast path  (recording known to exist):
  //   Skip TTS entirely. getRecording() resolves in <20 ms — inaudible gap.
  //
  // Slow path  (no known recording):
  //   1. Fire TTS immediately (synchronous — preserves iOS Safari gesture context).
  //   2. In the background, check IndexedDB first (fast, offline-capable).
  //   3. Fall back to network static files (.wav → .webm) if not in IndexedDB.
  //   4. Cancel TTS as soon as a better source is found.
  const playLessonTile = useCallback((lessonId, nikudType, fallbackText) => {
    if (!lessonId || !nikudType) return;
    stopAll();
    isPlayingRef.current = true;

    const base  = import.meta.env.BASE_URL ?? '/';
    const dbKey = `${lessonId}-${nikudType}`;

    function playSource(src) {
      window.speechSynthesis?.cancel();
      isPlayingRef.current = true;
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.onended = () => { isPlayingRef.current = false; };
      audio.onerror  = () => { isPlayingRef.current = false; };
      audio.play()
        .then(() => { isPlayingRef.current = true; })
        .catch(() => { isPlayingRef.current = false; });
    }

    function fireTTS() {
      if (fallbackText && 'speechSynthesis' in window) {
        const u = buildUtterance(fallbackText, () => { isPlayingRef.current = false; });
        window.speechSynthesis.speak(u);
      } else {
        isPlayingRef.current = false;
      }
    }

    // Fast path: recording is known to be in IndexedDB — skip TTS entirely.
    if (cachedKeys.has(dbKey)) {
      getRecording(dbKey)
        .then(stored => { if (stored) { playSource(stored); return; } fireTTS(); })
        .catch(fireTTS);
      return;
    }

    // Slow path: no cached recording — fire TTS immediately.
    fireTTS();

    // Background: IndexedDB first (may have been synced since cache was built),
    // then network static files (.wav → .webm).
    (async () => {
      try {
        const stored = await getRecording(dbKey);
        if (stored) {
          cachedKeys.add(dbKey); // warm cache for next time
          playSource(stored);
          return;
        }
      } catch { /* fall through to network */ }

      for (const ext of AUDIO_EXTS) {
        try {
          const src = `${base}audio/${dbKey}${ext}`;
          const res = await fetch(src, { method: 'HEAD' });
          if (res.ok) { playSource(src); return; }
        } catch { /* try next */ }
      }
    })();
  }, [stopAll]);

  return { playCardAudio, playText, playLessonTile, stopAll };
}
