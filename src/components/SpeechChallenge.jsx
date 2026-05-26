import { useState, useRef, useCallback } from 'react';
import { NIKUD_META, NIKUD_ORDER } from '../data/curriculum';

const GROUP_COLORS = {
  A: 'from-amber-50  to-yellow-100  border-amber-300  text-amber-800',
  E: 'from-pink-50   to-fuchsia-100 border-pink-300   text-pink-800',
  I: 'from-blue-50   to-indigo-100  border-blue-300   text-blue-800',
  O: 'from-green-50  to-emerald-100 border-green-300  text-green-800',
  U: 'from-violet-50 to-purple-100  border-violet-300 text-violet-800',
};

const STATUS = { idle: 'idle', listening: 'listening', success: 'success', fail: 'fail', unsupported: 'unsupported' };

/**
 * Tries to match what the child said against the expected Hebrew syllable.
 * Returns true if the spoken text contains the target display character or
 * sounds phonetically similar (basic vowel-group check).
 */
function checkMatch(transcript, targetDisplay, targetGroup) {
  const t = transcript.trim();
  if (!t) return false;
  // Direct containment check
  if (t.includes(targetDisplay.trim())) return true;
  // Vowel-group heuristic: map Hebrew letters to vowel sounds
  const groupHints = {
    A: ['א', 'ָ', 'ַ', 'a', 'A'],
    E: ['ֶ', 'ֵ', 'e', 'E', 'י'],
    I: ['ִ', 'i', 'I', 'י'],
    O: ['ֹ', 'ו', 'o', 'O'],
    U: ['ֻ', 'u', 'U', 'ו'],
  };
  return groupHints[targetGroup]?.some(h => t.includes(h)) ?? false;
}

export default function SpeechChallenge({ lesson, onComplete }) {
  const [tileIdx,  setTileIdx]  = useState(0);
  const [status,   setStatus]   = useState(STATUS.idle);
  const [attempts, setAttempts] = useState(0);
  const [earned,   setEarned]   = useState(0);
  const recognitionRef = useRef(null);

  const currentType = NIKUD_ORDER[tileIdx];
  const currentData = lesson.nikud[currentType];
  const currentMeta = NIKUD_META[currentType];
  const colors      = GROUP_COLORS[currentMeta.group];
  const total       = NIKUD_ORDER.length;

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setStatus(STATUS.unsupported); return; }

    const rec = new SR();
    rec.lang = 'he-IL';
    rec.interimResults = false;
    rec.maxAlternatives = 3;

    rec.onstart  = () => setStatus(STATUS.listening);
    rec.onerror  = () => setStatus(STATUS.fail);
    rec.onend    = () => {
      setStatus(s => s === STATUS.listening ? STATUS.fail : s);
    };

    rec.onresult = (e) => {
      const transcripts = Array.from(e.results[0]).map(r => r.transcript);
      const matched = transcripts.some(t =>
        checkMatch(t, currentData.display, currentMeta.group)
      );
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
    setAttempts(0);
  }, [currentData, currentMeta]);

  function advance() {
    const next = tileIdx + 1;
    if (next >= total) {
      onComplete(earned);
    } else {
      setTileIdx(next);
      setStatus(STATUS.idle);
      setAttempts(0);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 py-6">

      {/* Header */}
      <div className="text-center">
        <p className="text-sm font-bold text-purple-400 font-assistant mb-1">
          אוֹת {tileIdx + 1} מִתּוֹךְ {total}
        </p>
        <h2 className="text-2xl font-black text-purple-700 font-rubik">
          🎤 קְרְאִי אֶת הָאוֹת!
        </h2>
        <p className="text-sm text-purple-400 font-assistant mt-1">
          לְחֲצִי עַל הַמִּיקְרוֹפוֹן וְקִרְאִי בְּקוֹל רָם
        </p>
      </div>

      {/* Nikud card */}
      <div className={`bg-gradient-to-b ${colors} border-4 rounded-3xl shadow-xl px-12 py-8 text-center`}>
        <div
          className="font-rubik font-black leading-none"
          style={{ fontSize: '9rem', lineHeight: '12rem', direction: 'rtl' }}
        >
          {currentData.display}
        </div>
        <div className="text-sm font-bold font-rubik mt-2 opacity-70">
          {currentMeta.name} · {currentMeta.groupLabel}
        </div>
        <div className="text-sm font-assistant mt-1 opacity-60">{currentData.example}</div>
      </div>

      {/* Status display */}
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
        <div className="w-full py-3 rounded-2xl bg-red-50 border-2 border-red-200 text-center text-red-600 font-bold font-assistant">
          {attempts >= 2 ? '💪 לֹא נוֹרָא — בַּפַּעַם הַבָּאָה!' : '🔄 נַסִּי שׁוּב!'}
        </div>
      )}

      {/* Mic button or advance */}
      {(status === STATUS.idle || status === STATUS.fail) && attempts < 3 && (
        <button
          onClick={startListening}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-5xl
                     shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
          aria-label="הקשב"
        >
          🎤
        </button>
      )}

      {status === STATUS.listening && (
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-400 to-pink-500 text-white text-5xl
                          shadow-2xl animate-pulse flex items-center justify-center">
            🎙️
          </div>
          <p className="text-purple-500 font-bold font-assistant animate-pulse">מַקְשִׁיב...</p>
        </div>
      )}

      {(status === STATUS.success || attempts >= 3) && (
        <button
          onClick={advance}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500
                     text-white text-xl font-black font-rubik shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          {tileIdx + 1 < total ? '➡️ הַבָּאָה!' : '🏆 סִיַּמְתְּ!'}
        </button>
      )}

      {/* Progress dots */}
      <div className="flex gap-2">
        {NIKUD_ORDER.map((t, i) => (
          <span key={t} className={`w-3 h-3 rounded-full transition-all ${
            i < tileIdx ? 'bg-green-400' : i === tileIdx ? 'bg-purple-500 scale-125' : 'bg-purple-200'
          }`} />
        ))}
      </div>
    </div>
  );
}
