import { useState, useRef, useCallback, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { NIKUD_META, NIKUD_ORDER } from '../data/curriculum';

const GROUP_COLORS = {
  A: { grad: 'from-amber-50  to-yellow-100',  border: 'border-amber-300',  text: 'text-amber-800',  badge: 'bg-amber-200  text-amber-800'  },
  E: { grad: 'from-pink-50   to-fuchsia-100', border: 'border-pink-300',   text: 'text-pink-800',   badge: 'bg-pink-200   text-pink-800'   },
  I: { grad: 'from-blue-50   to-indigo-100',  border: 'border-blue-300',   text: 'text-blue-800',   badge: 'bg-blue-200   text-blue-800'   },
  O: { grad: 'from-green-50  to-emerald-100', border: 'border-green-300',  text: 'text-green-800',  badge: 'bg-green-200  text-green-800'  },
  U: { grad: 'from-violet-50 to-purple-100',  border: 'border-violet-300', text: 'text-violet-800', badge: 'bg-violet-200 text-violet-800' },
};

const STATUS = { idle: 'idle', listening: 'listening', success: 'success', fail: 'fail', unsupported: 'unsupported' };

const MAX_ATTEMPTS = 3;

/**
 * Extract the first Hebrew word from an example string, stripped of nikud and emoji.
 * "נָחָשׁ 🐍" → "נחש"
 */
function extractExampleWord(example) {
  return example
    .replace(/[֑-ׇ]/g, '')       // strip nikud
    .replace(/[^א-ת]/g, ' ')     // non-Hebrew letters → space
    .trim()
    .split(/\s+/)[0] ?? '';
}

/**
 * Count how many consonants of `target` appear in `text` in order (subsequence).
 * Returns a fraction 0–1.
 */
function consonantCoverage(text, target) {
  if (!target) return 0;
  let pos = 0;
  let found = 0;
  for (const ch of target) {
    const idx = text.indexOf(ch, pos);
    if (idx !== -1) { found++; pos = idx + 1; }
  }
  return found / target.length;
}

/**
 * Decide whether `transcript` (top SR result, no nikud) matches the expected nikud.
 *
 * Strategy: use the EXAMPLE WORD rather than a bare syllable.
 * In full Hebrew spelling (ktiv male):
 *   I-group words contain  י  (e.g. "ניגון", "בינה", "שיר")
 *   O/U-group words contain ו  (e.g. "בוקר", "בובה", "נוח")
 *   A/E-group words rarely have these → fall back to consonant coverage
 *
 * For A/E we cannot reliably distinguish the two sounds from SR output;
 * instead we verify the child said the right WORD (≥60% consonant match).
 */
function checkMatch(transcript, targetGroup, exampleWord) {
  const t = transcript.trim();

  // Reject empty or single-character transcripts (ambient noise)
  if (t.replace(/[֑-ׇ\s]/g, '').length < 2) return false;

  const hasYod = /י/.test(t);
  const hasVav = /ו/.test(t);
  const coverage = consonantCoverage(t, exampleWord);

  switch (targetGroup) {
    case 'I':
      // "ee" sound: ktiv-male words always spell it with י
      // Require yod AND at least the first consonant of the example word in transcript
      return hasYod && exampleWord.length > 0 && t.includes(exampleWord[0]);

    case 'O':
    case 'U':
      // "oh/oo" sound: ktiv-male words spell with ו
      return hasVav && exampleWord.length > 0 && t.includes(exampleWord[0]);

    case 'A':
    case 'E':
      // Cannot distinguish these two from each other via SR — accept either.
      // Require: no yod (that would be I) AND no vav (that would be O/U),
      // AND at least 60% consonant coverage of the example word.
      return !hasYod && !hasVav && coverage >= 0.6;

    default:
      return false;
  }
}

export default function SpeechChallenge({ lesson, onComplete }) {
  const { playLessonTile }  = useAudio();
  const [tileIdx,  setTileIdx]  = useState(0);
  const [status,   setStatus]   = useState(STATUS.idle);
  const [attempts, setAttempts] = useState(0);
  const [earned,   setEarned]   = useState(0);
  const [lastWord, setLastWord] = useState('');   // last SR transcript for debug hint
  const recognitionRef = useRef(null);

  // Cleanly abort any active recognition session without triggering state updates
  const stopMic = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    rec.onresult = null;
    rec.onerror  = null;
    rec.onend    = null;
    try { rec.abort(); } catch { /* already stopped */ }
    recognitionRef.current = null;
  }, []);

  // Stop mic on unmount, tab hide, and page unload (covers refresh + close)
  useEffect(() => {
    function onHide()   { if (document.hidden) stopMic(); }
    function onUnload() { stopMic(); }
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onUnload);
    return () => {
      stopMic();
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onUnload);
    };
  }, [stopMic]);

  const currentType = NIKUD_ORDER[tileIdx];
  const currentData = lesson.nikud[currentType];
  const currentMeta = NIKUD_META[currentType];
  const gc          = GROUP_COLORS[currentMeta.group];
  const total       = NIKUD_ORDER.length;
  const exWord      = extractExampleWord(currentData.example); // e.g. "נחש"

  const startListening = useCallback(() => {
    stopMic(); // release any previous session before opening a new one
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setStatus(STATUS.unsupported); return; }

    const rec = new SR();
    rec.lang            = 'he-IL';
    rec.interimResults  = false;
    rec.maxAlternatives = 1;   // only the single best guess

    rec.onstart = () => setStatus(STATUS.listening);

    rec.onerror = () => {
      stopMic();
      setAttempts(n => n + 1);
      setStatus(STATUS.fail);
    };

    rec.onend = () => {
      // If onresult didn't fire (no speech detected), treat as fail
      setStatus(s => {
        if (s === STATUS.listening) {
          setAttempts(n => n + 1);
          return STATUS.fail;
        }
        return s;
      });
    };

    rec.onresult = (e) => {
      const top = e.results[0][0].transcript.trim();
      setLastWord(top);
      const matched = checkMatch(top, currentMeta.group, exWord);
      stopMic(); // release mic immediately after result — don't wait for onend
      if (matched) {
        setStatus(STATUS.success);
        setEarned(n => n + 5);
      } else {
        setAttempts(n => n + 1);
        setStatus(STATUS.fail);
      }
    };

    recognitionRef.current = rec;
    rec.start();
    setStatus(STATUS.listening);
  }, [currentData, currentMeta, exWord, stopMic]);

  function advance() {
    stopMic();
    const next = tileIdx + 1;
    setAttempts(0);
    setLastWord('');
    if (next >= total) {
      onComplete(earned);
    } else {
      setTileIdx(next);
      setStatus(STATUS.idle);
    }
  }

  const canTryAgain = status !== STATUS.success && attempts < MAX_ATTEMPTS;
  const showAdvance = status === STATUS.success || attempts >= MAX_ATTEMPTS;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto px-4 py-6">

      {/* Header */}
      <div className="text-center">
        <p className="text-sm font-bold text-purple-400 font-assistant mb-1">
          {tileIdx + 1} / {total}
        </p>
        <h2 className="text-2xl font-black text-purple-700 font-rubik">
          🎤 קְרְאִי אֶת הַמִּלָּה!
        </h2>
      </div>

      {/* Nikud card */}
      <div className={`bg-gradient-to-b ${gc.grad} ${gc.border} border-4 rounded-3xl shadow-xl px-8 py-6 text-center w-full`}>

        {/* Big nikud */}
        <div
          className={`font-rubik font-black leading-none ${gc.text}`}
          style={{ fontSize: '7rem', lineHeight: '9rem', direction: 'rtl' }}
        >
          {currentData.display}
        </div>

        {/* Group label */}
        <div className={`inline-block text-sm font-black font-rubik px-3 py-1 rounded-full mt-2 ${gc.badge}`}>
          {currentMeta.groupLabel} — {currentMeta.name}
        </div>

        {/* Example word as reading target */}
        <div className="mt-4 pt-4 border-t border-white/50">
          <p className="text-xs text-purple-400 font-assistant mb-1">קְרְאִי אֶת הַמִּלָּה:</p>
          <div
            className={`font-rubik font-black text-4xl ${gc.text}`}
            dir="rtl"
            style={{ lineHeight: '5rem' }}
          >
            {currentData.example.replace(/[^א-׺֑-ׇ\s]/g, '').trim()}
          </div>
          {/* Play it first button */}
          <button
            onClick={() => { const wordOnly = currentData.example.replace(/[^א-׺֑-ׇ\s]/g, '').trim(); playLessonTile(lesson.id, currentType, wordOnly); }}
            className="mt-2 flex items-center gap-2 mx-auto px-4 py-1.5 bg-white/60 hover:bg-white/90 rounded-full text-sm font-bold font-assistant transition-colors"
          >
            🔊 שִׁמְעִי קוֹדֶם
          </button>
        </div>
      </div>

      {/* Attempt dots */}
      <div className="flex gap-2">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full transition-all ${
            i < attempts
              ? (status === STATUS.success && i === attempts - 1 ? 'bg-green-400' : 'bg-red-300')
              : 'bg-purple-200'
          }`} />
        ))}
      </div>

      {/* Status messages */}
      {status === STATUS.unsupported && (
        <div className="w-full py-3 rounded-2xl bg-yellow-100 border-2 border-yellow-300 text-center text-yellow-700 font-bold font-assistant">
          ⚠️ הדפדפן שלך לא תומך בזיהוי קול. נסי בכרום.
        </div>
      )}
      {status === STATUS.success && (
        <div className="w-full py-4 rounded-2xl bg-green-100 border-2 border-green-300 text-center text-green-700 text-xl font-black font-rubik animate-bounce-slow">
          🌟 כׇּל הַכָּבוֹד! +5 נְקוּדוֹת!
        </div>
      )}
      {status === STATUS.fail && (
        <div className="w-full py-3 rounded-2xl bg-red-50 border-2 border-red-200 text-center font-bold font-assistant">
          <p className="text-red-600">{attempts >= MAX_ATTEMPTS ? '💪 שַׁדּ, נַסִּי בַּפַּעַם הַבָּאָה!' : '🔄 נַסִּי שׁוּב — אֱמְרִי אֶת הַמִּלָּה!'}</p>
          {lastWord ? (
            <p className="text-red-300 text-xs mt-1 font-assistant">שָׁמַעְתִּי: "{lastWord}"</p>
          ) : null}
        </div>
      )}

      {/* Mic button */}
      {(status === STATUS.idle || (status === STATUS.fail && canTryAgain)) && (
        <button
          onClick={startListening}
          className="w-28 h-28 rounded-full text-white text-5xl
                     shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)', boxShadow: '0 8px 32px rgba(147,51,234,0.4)' }}
          aria-label="הקשב"
        >
          🎤
        </button>
      )}

      {status === STATUS.listening && (
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full text-white text-5xl
                          shadow-2xl animate-pulse flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
            🎙️
          </div>
          <p className="text-purple-500 font-bold font-assistant animate-pulse">מַקְשִׁיב...</p>
        </div>
      )}

      {/* Advance button */}
      {showAdvance && (
        <button
          onClick={advance}
          className="w-full py-4 rounded-2xl text-white text-xl font-black font-rubik
                     hover:scale-105 active:scale-95 transition-all shadow-lg"
          style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)', boxShadow: '0 8px 28px rgba(147,51,234,0.4)' }}
        >
          {tileIdx + 1 < total ? '➡️ הַבָּאָה!' : '🏆 סִיַּמְתְּ!'}
        </button>
      )}

      {/* Progress dots */}
      <div className="flex gap-2">
        {NIKUD_ORDER.map((t, i) => (
          <span key={t} className={`rounded-full transition-all ${
            i < tileIdx  ? 'w-4 h-4 bg-green-400' :
            i === tileIdx ? 'w-4 h-4 bg-purple-500 scale-110' :
                           'w-3 h-3 bg-purple-200'
          }`} />
        ))}
      </div>
    </div>
  );
}
