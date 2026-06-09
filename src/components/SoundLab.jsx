import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Mic, Square, Volume2, RotateCcw } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { SOUND_TARGETS, stripEmoji } from '../data/soundPractice';

// ── colour palette per sound ──────────────────────────────────────────
const THEME = {
  emerald: { bg: '#d1fae5', border: '#34d399', btn: '#10b981', dark: '#065f46', soft: '#a7f3d0' },
  pink:    { bg: '#fce7f3', border: '#f472b6', btn: '#ec4899', dark: '#9d174d', soft: '#fbcfe8' },
  violet:  { bg: '#ede9fe', border: '#a78bfa', btn: '#8b5cf6', dark: '#4c1d95', soft: '#ddd6fe' },
};

// ── how many rounds per phase ─────────────────────────────────────────
const LISTEN_ROUNDS  = 6;
const SAY_WORDS      = 4;
const SAY_SENTENCES  = 3;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildListenRounds(target) {
  const others = SOUND_TARGETS.filter(t => t.id !== target.id);
  const rounds  = [];
  const used    = new Set();

  for (let i = 0; i < LISTEN_ROUNDS; i++) {
    // pick a target word not yet used
    const tWords   = target.words.filter(w => !used.has(w.text));
    const tWord    = tWords.length ? tWords[Math.floor(Math.random() * tWords.length)]
                                   : target.words[Math.floor(Math.random() * target.words.length)];
    used.add(tWord.text);

    // pick a distractor from one of the other sounds (alternate which sound)
    const other    = others[i % others.length];
    const oWord    = other.words[Math.floor(Math.random() * other.words.length)];

    const correct  = { emoji: tWord.emoji,  label: stripEmoji(tWord.text),  speak: stripEmoji(tWord.text),  correct: true  };
    const wrong    = { emoji: oWord.emoji,  label: stripEmoji(oWord.text),  speak: stripEmoji(oWord.text),  correct: false };

    rounds.push({
      options: shuffle([correct, wrong]),
      speak:   stripEmoji(tWord.text),
    });
  }
  return rounds;
}

// ══════════════════════════════════════════════════════════════════════
// Main shell
// ══════════════════════════════════════════════════════════════════════
export default function SoundLab({ onClose }) {
  const [target, setTarget] = useState(null);
  const [phase,  setPhase]  = useState('pick'); // pick | listen | say | sentence | celebrate

  function reset() { setTarget(null); setPhase('pick'); }

  return (
    <div dir="rtl" className="flex flex-col min-h-[70vh]">
      {phase === 'pick'      && <PickSound      onPick={t => { setTarget(t); setPhase('listen'); }} onClose={onClose} />}
      {phase === 'listen'    && <ListenGame     key={`l-${target.id}`} target={target} onDone={() => setPhase('say')} />}
      {phase === 'say'       && <SayGame        key={`s-${target.id}`} target={target} onDone={() => setPhase('sentence')} />}
      {phase === 'sentence'  && <SaySentences   key={`ss-${target.id}`} target={target} onDone={() => setPhase('celebrate')} />}
      {phase === 'celebrate' && <Celebrate      target={target} onAgain={reset} onOther={reset} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 1. Pick a sound — 3 giant emoji buttons, no reading required
// ══════════════════════════════════════════════════════════════════════
function PickSound({ onPick, onClose }) {
  const { playText } = useAudio();
  useEffect(() => { setTimeout(() => playText('איזה צליל נתרגל היום?'), 400); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <p className="text-5xl animate-bounce-slow">🗣️</p>

      <div className="flex flex-col gap-4 w-full">
        {SOUND_TARGETS.map(t => {
          const th = THEME[t.color];
          return (
            <button
              key={t.id}
              onClick={() => { playText(t.sampleSyllable); setTimeout(() => onPick(t), 500); }}
              className="flex items-center justify-between rounded-3xl border-4 p-5 active:scale-95 transition-transform shadow-xl"
              style={{ background: th.bg, borderColor: th.border }}
            >
              <span style={{ fontSize: '5rem', lineHeight: '5.5rem' }}>{t.emoji}</span>
              <span className="font-black font-rubik" style={{ fontSize: '5rem', color: th.dark }}>{t.letter}</span>
              <span style={{ fontSize: '5rem', lineHeight: '5.5rem' }}>{t.emoji}</span>
            </button>
          );
        })}
      </div>

      {/* Tiny parent note — not aimed at child */}
      <p className="text-center text-purple-300 font-assistant" style={{ fontSize: '10px' }}>
        להורים: תרגול שמיעתי + הגייה. לא מחליף קלינאית תקשורת.
      </p>
      <button onClick={onClose} className="text-purple-400 font-assistant text-sm">← חֲזָרָה לַמִּשְׂחָק</button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 2. Listen game — hear word → tap correct picture (2-choice)
// ══════════════════════════════════════════════════════════════════════
function ListenGame({ target, onDone }) {
  const { playText } = useAudio();
  const th           = THEME[target.color];
  const [rounds]     = useState(() => buildListenRounds(target));
  const [idx,  setIdx]       = useState(0);
  const [score, setScore]    = useState(0);
  const [feedback, setFb]    = useState(null); // null | 'correct' | 'wrong'
  const round                = rounds[idx];

  // Auto-play instructions on first mount, then auto-play word each round
  useEffect(() => {
    const t1 = setTimeout(() => playText('שמעי את המילה ולחצי על התמונה'), 300);
    return () => clearTimeout(t1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (idx === 0) return; // first round already covered by intro delay
    const t = setTimeout(() => playText(round.speak), 600);
    return () => clearTimeout(t);
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-play word for first round after intro speech ends
  useEffect(() => {
    const t = setTimeout(() => playText(round.speak), 1800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function pick(opt) {
    if (feedback) return;
    const ok = opt.correct;
    if (ok) { setScore(s => s + 1); playText('כל הכבוד!'); }
    else    { playText('נסי שוב'); }
    setFb(ok ? 'correct' : 'wrong');
    setTimeout(() => {
      setFb(null);
      if (idx + 1 >= rounds.length) { onDone(); }
      else { setIdx(i => i + 1); }
    }, 1300);
  }

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      {/* Sound badge + progress dots */}
      <div className="flex items-center gap-3">
        <span style={{ fontSize: '2.5rem' }}>{target.emoji}</span>
        <Dots total={rounds.length} done={idx} color={th.btn} />
      </div>

      {/* Play again button */}
      <button
        onClick={() => playText(round.speak)}
        className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold font-rubik text-lg active:scale-95 transition-transform shadow-lg"
        style={{ background: th.btn }}
      >
        <Volume2 size={24} /> שׁוּב 🔊
      </button>

      {/* Two big picture choices */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {round.options.map((opt, i) => {
          const isPicked   = feedback !== null && opt.correct === (feedback === 'correct' ? true : !opt.correct);
          const showGreen  = feedback !== null && opt.correct;
          const showRed    = feedback === 'wrong' && !opt.correct && isPicked;

          return (
            <button
              key={i}
              onClick={() => pick(opt)}
              disabled={!!feedback}
              className="flex flex-col items-center justify-center rounded-3xl border-4 py-6 gap-2 active:scale-95 transition-all"
              style={{
                background: showGreen ? '#bbf7d0' : showRed ? '#fee2e2' : 'white',
                borderColor: showGreen ? '#22c55e' : showRed ? '#ef4444' : '#e9d5ff',
                boxShadow: showGreen ? '0 0 0 6px #86efac' : showRed ? '0 0 0 6px #fca5a5' : '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <span style={{ fontSize: '4.5rem', lineHeight: '5rem' }}>{opt.emoji}</span>
              {showGreen && <span className="text-3xl">⭐</span>}
              {showRed   && <span className="text-3xl">❌</span>}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-purple-300 font-assistant">{score} ⭐ עַד עַכְשָׁיו</p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 3. Say game — see picture → hear model → record → self-rate
// ══════════════════════════════════════════════════════════════════════
function SayGame({ target, onDone }) {
  const { playText, stopAll } = useAudio();
  const th      = THEME[target.color];
  const [words] = useState(() => shuffle([...target.words]).slice(0, SAY_WORDS));
  const [idx,   setIdx]  = useState(0);
  const word             = words[idx];
  const last             = idx >= words.length - 1;

  useEffect(() => {
    const t = setTimeout(() => playText('עכשיו תורך לדבר! הקשיבי ואחר כך אמרי'), 400);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function next() {
    stopAll();
    if (last) { onDone(); }
    else { setIdx(i => i + 1); }
  }

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span style={{ fontSize: '2.5rem' }}>{target.emoji}</span>
        <Dots total={words.length} done={idx} color={th.btn} />
      </div>

      {/* Big picture */}
      <div
        className="flex flex-col items-center justify-center rounded-3xl border-4 py-8 w-full gap-2"
        style={{ background: th.bg, borderColor: th.border }}
      >
        <span style={{ fontSize: '6rem', lineHeight: '6.5rem' }}>{word.emoji}</span>
      </div>

      {/* Hear model + record */}
      <WordRecorder
        word={stripEmoji(word.text)}
        th={th}
        onPlayModel={() => playText(stripEmoji(word.text))}
        onNext={next}
        isLast={last}
      />
    </div>
  );
}

// ── sub-component: listen + record + self-rate ────────────────────────
function WordRecorder({ word, th, onPlayModel, onNext, isLast }) {
  const [state, setState] = useState('idle'); // idle | recording | done
  const [rated, setRated] = useState(null);   // null | 'good' | 'again'
  const recRef   = useRef(null);
  const chunksRef = useRef([]);
  const urlRef   = useRef(null);
  const audRef   = useRef(null);

  const cleanup = useCallback(() => {
    audRef.current?.pause();
    audRef.current = null;
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  // Auto-play the model word when the component mounts
  useEffect(() => {
    const t = setTimeout(() => onPlayModel(), 600);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // After recording done, auto-play own voice
  useEffect(() => {
    if (state !== 'done' || !urlRef.current) return;
    const a = new Audio(urlRef.current);
    audRef.current = a;
    a.play().catch(() => {});
  }, [state]);

  async function startRec() {
    setRated(null);
    cleanup();
    setState('recording');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      recRef.current = rec;
      rec.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
        urlRef.current = URL.createObjectURL(blob);
        setState('done');
      };
      rec.start();
    } catch {
      setState('idle');
    }
  }

  function stopRec() {
    recRef.current?.stop();
    recRef.current = null;
  }

  function replayMine() {
    if (!urlRef.current) return;
    audRef.current?.pause();
    const a = new Audio(urlRef.current);
    audRef.current = a;
    a.play().catch(() => {});
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Hear model */}
      <button
        onClick={onPlayModel}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold font-rubik text-white active:scale-95 transition-transform shadow"
        style={{ background: th.btn }}
      >
        <Volume2 size={20} /> שִׁמְעִי 🔊
      </button>

      {/* Record / Stop */}
      {state !== 'recording' ? (
        <button
          onClick={startRec}
          className="w-28 h-28 rounded-full text-white text-5xl flex items-center justify-center active:scale-95 transition-transform shadow-2xl"
          style={{ background: state === 'done' ? '#6366f1' : th.btn, boxShadow: `0 8px 32px ${th.btn}55` }}
        >
          {state === 'done' ? <RotateCcw size={44} /> : <Mic size={44} />}
        </button>
      ) : (
        <button
          onClick={stopRec}
          className="w-28 h-28 rounded-full bg-red-500 text-white text-5xl flex items-center justify-center animate-pulse shadow-2xl"
        >
          <Square size={40} fill="white" />
        </button>
      )}

      {/* After recording: play-back + self-rate */}
      {state === 'done' && (
        <div className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={replayMine}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-bold font-assistant text-sm active:scale-95 transition-transform"
          >
            <Volume2 size={16} /> שִׁמְעִי אֶת עַצְמֵךְ
          </button>

          {/* Self-rate — self-monitoring is the key carryover mechanism */}
          <div className="flex gap-5 justify-center">
            <button
              onClick={() => { setRated('good'); setTimeout(onNext, 700); }}
              className={`text-6xl active:scale-125 transition-transform ${rated === 'good' ? 'scale-125' : ''}`}
            >
              😃
            </button>
            <button
              onClick={() => { setRated('again'); setState('idle'); cleanup(); }}
              className={`text-6xl active:scale-125 transition-transform ${rated === 'again' ? 'scale-125' : ''}`}
            >
              🔁
            </button>
          </div>
          {!rated && <p className="text-xs text-purple-400 font-assistant animate-pulse">אֵיךְ יָצָא?</p>}
        </div>
      )}

      {/* Skip / next — only if rated or idle */}
      {(state === 'idle' || rated) && state !== 'recording' && (
        <button
          onClick={onNext}
          className="w-full py-3 rounded-2xl text-white font-black font-rubik text-lg active:scale-95 transition-transform shadow-lg mt-2"
          style={{ background: th.btn }}
        >
          {isLast ? '🌟 סִיַּמְתִּי!' : '➡️ הַבָּאָה'}
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 4. Say sentences — hear full sentence → record → self-rate
// ══════════════════════════════════════════════════════════════════════
function SaySentences({ target, onDone }) {
  const { playText, stopAll } = useAudio();
  const th        = THEME[target.color];
  const sentences = useMemo(() => shuffle([...target.sentences]).slice(0, SAY_SENTENCES), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [idx, setIdx] = useState(0);
  const sentence      = sentences[idx];
  const last          = idx >= sentences.length - 1;

  useEffect(() => {
    const t = setTimeout(() => playText('עכשיו נגיד משפטים שלמים'), 400);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function next() {
    stopAll();
    if (last) { onDone(); }
    else { setIdx(i => i + 1); }
  }

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="flex items-center gap-3">
        <span style={{ fontSize: '2.5rem' }}>{target.emoji}</span>
        <Dots total={sentences.length} done={idx} color={th.btn} />
      </div>

      <div
        className="flex flex-col items-center justify-center rounded-3xl border-4 py-8 w-full gap-2"
        style={{ background: th.bg, borderColor: th.border }}
      >
        <span style={{ fontSize: '6rem', lineHeight: '6.5rem' }}>{sentence.emoji}</span>
      </div>

      <WordRecorder
        word={sentence.text}
        th={th}
        onPlayModel={() => playText(sentence.text)}
        onNext={next}
        isLast={last}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 5. Celebrate!
// ══════════════════════════════════════════════════════════════════════
function Celebrate({ target, onAgain }) {
  const { playText } = useAudio();
  const th = THEME[target.color];

  useEffect(() => {
    const t = setTimeout(() => playText('כל הכבוד! את מדהימה!'), 400);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      <div className="text-center" style={{ fontSize: '5rem', lineHeight: '5.5rem' }}>
        🌟⭐🌟
      </div>
      <span style={{ fontSize: '7rem', lineHeight: '8rem' }}>{target.emoji}</span>
      <button
        onClick={onAgain}
        className="w-full py-4 rounded-3xl text-white font-black font-rubik text-2xl active:scale-95 transition-transform shadow-2xl"
        style={{ background: th.btn }}
      >
        🔁 שׁוּב!
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// Helper: progress dots
// ══════════════════════════════════════════════════════════════════════
function Dots({ total, done, color }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width:  i < done ? 14 : i === done ? 18 : 10,
            height: i < done ? 14 : i === done ? 18 : 10,
            background: i <= done ? color : '#e9d5ff',
          }}
        />
      ))}
    </div>
  );
}
