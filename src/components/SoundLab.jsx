import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Square, Play, RotateCcw, ArrowRight, Volume2 } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { SOUND_TARGETS, getTarget, buildDiscriminationRounds, stripEmoji } from '../data/soundPractice';

// Tailwind needs literal class names — map each sound's theme explicitly.
const THEME = {
  emerald: { grad: 'from-emerald-50 to-green-100', border: 'border-emerald-300', text: 'text-emerald-700', btn: 'bg-emerald-500 hover:bg-emerald-600', soft: 'bg-emerald-100', ring: 'ring-emerald-400' },
  pink:    { grad: 'from-pink-50 to-rose-100',     border: 'border-pink-300',    text: 'text-pink-700',    btn: 'bg-pink-500 hover:bg-pink-600',       soft: 'bg-pink-100',    ring: 'ring-pink-400' },
  violet:  { grad: 'from-violet-50 to-purple-100', border: 'border-violet-300',  text: 'text-violet-700',  btn: 'bg-violet-500 hover:bg-violet-600',   soft: 'bg-violet-100',  ring: 'ring-violet-400' },
};

const STEPS = ['meet', 'listen', 'say', 'sentence'];
const STEP_LABEL = {
  meet:     '1 · הַכִּירוּ 👀',
  listen:   '2 · הַקְשִׁיבוּ 👂',
  say:      '3 · אִמְרוּ 🎤',
  sentence: '4 · מִשְׁפָּט 💬',
};

export default function SoundLab({ onClose }) {
  const [targetId, setTargetId] = useState(null);
  const target = getTarget(targetId);

  if (!target) {
    return <SoundSelect onPick={setTargetId} onClose={onClose} />;
  }
  return <SoundPractice key={targetId} target={target} onBack={() => setTargetId(null)} />;
}

// ── Screen 1: pick a sound ─────────────────────────────────────────────
function SoundSelect({ onPick, onClose }) {
  return (
    <div dir="rtl" className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-black text-purple-700 font-rubik">🗣️ מַעְבְּדַת הַצְּלִילִים</h2>
        <p className="text-sm text-purple-400 font-assistant mt-1">בַּחֲרִי צְלִיל לְתַרְגֵּל</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {SOUND_TARGETS.map(t => {
          const th = THEME[t.color];
          return (
            <button
              key={t.id}
              onClick={() => onPick(t.id)}
              className={`flex items-center gap-4 p-4 rounded-3xl border-4 bg-gradient-to-l ${th.grad} ${th.border}
                          active:scale-95 transition-transform shadow-md`}
            >
              <span className="text-5xl">{t.emoji}</span>
              <div className="flex-1 text-right">
                <div className={`font-black font-rubik ${th.text}`} style={{ fontSize: '2.5rem', lineHeight: '2.8rem' }}>{t.letter}</div>
                <div className={`text-sm font-bold ${th.text} font-assistant`}>{t.nickname}</div>
              </div>
              <ArrowRight className={th.text} size={26} />
            </button>
          );
        })}
      </div>

      {/* Parent note — developmental norms + gentle SLP referral guidance (research-grounded) */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 font-assistant text-xs text-amber-800 leading-relaxed">
        <p className="font-black text-amber-700 mb-1">💡 לְהוֹרִים</p>
        בְּגִיל 5-6 רֹב הַיְּלָדִים כְּבָר הוֹגִים ס · שׁ · צ. הַתִּרְגּוּל כָּאן בָּנוּי עַל עֶקְרוֹנוֹת קְלִינָאִיִּים
        (הַבְחָנָה שְׁמִיעָתִית תְּחִלָּה, זוּגוֹת מִינִימָלִיִּים, חֲזָרָה רַבָּה, וְתַרְגּוּל קָצָר וְיוֹמְיוֹמִי).
        אִם הַהַחְלָפָה עִקְבִית גַּם אַחֲרֵי תַּרְגּוּל — כְּדַאי לְהִתְיָעֵץ עִם קְלִינָאִית תִּקְשֹׁרֶת. הָאַפְּלִיקַצְיָה לֹא מַחְלִיפָה טִפּוּל.
      </div>

      <button onClick={onClose} className="text-purple-400 font-assistant text-sm py-2">← חֲזָרָה לַמִּשְׂחָק</button>
    </div>
  );
}

// ── Screen 2: practice flow for one sound ──────────────────────────────
function SoundPractice({ target, onBack }) {
  const [stepIdx, setStepIdx] = useState(0);
  const step = STEPS[stepIdx];
  const th   = THEME[target.color];

  const next = () => setStepIdx(i => Math.min(i + 1, STEPS.length - 1));
  const goto = (s) => setStepIdx(STEPS.indexOf(s));

  return (
    <div dir="rtl" className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-purple-400 text-sm font-assistant shrink-0">← הַצְּלִילִים</button>
        <div className={`flex-1 flex items-center justify-center gap-2 ${th.text}`}>
          <span className="text-3xl">{target.emoji}</span>
          <span className="font-black font-rubik" style={{ fontSize: '2rem' }}>{target.letter}</span>
          <span className="font-bold font-assistant text-sm">{target.nickname}</span>
        </div>
      </div>

      {/* Step tabs */}
      <div className="flex gap-1.5">
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => setStepIdx(i)}
            className={`flex-1 py-1.5 rounded-full text-center font-bold transition-all ${
              step === s ? `text-white ${th.btn} shadow` : 'bg-purple-50 text-purple-300'
            }`}
            style={{ fontSize: '11px' }}
          >
            {STEP_LABEL[s]}
          </button>
        ))}
      </div>

      {step === 'meet'     && <MeetStep     target={target} th={th} onNext={next} />}
      {step === 'listen'   && <ListenStep   target={target} th={th} onNext={next} />}
      {step === 'say'      && <SayStep      target={target} th={th} onNext={next} />}
      {step === 'sentence' && <SentenceStep target={target} th={th} onDone={() => goto('meet')} onBack={onBack} />}
    </div>
  );
}

// ── Step: meet the sound (placement cue) ───────────────────────────────
function MeetStep({ target, th, onNext }) {
  const { playText } = useAudio();
  return (
    <div className={`bg-gradient-to-b ${th.grad} border-4 ${th.border} rounded-3xl p-6 text-center flex flex-col items-center gap-4`}>
      <div className={`font-black font-rubik ${th.text}`} style={{ fontSize: '6rem', lineHeight: '7rem' }}>{target.letter}</div>
      <div className="text-6xl">{target.emoji}</div>

      <button
        onClick={() => playText(target.sampleSyllable)}
        className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold font-assistant text-lg ${th.btn} active:scale-95 transition-transform shadow-lg`}
      >
        <Volume2 size={22} /> שִׁמְעִי: {stripEmoji(target.sampleSyllable)}
      </button>

      <p className={`font-bold font-assistant ${th.text} text-base leading-relaxed`}>{target.cue}</p>

      <div className="bg-white/70 rounded-2xl p-3 text-sm text-purple-600 font-assistant leading-relaxed">
        <span className="font-black">🪞 טִיפּ:</span> {target.tip}
        <br />
        <span className="text-purple-400 text-xs">הִסְתַּכְּלִי בַּמַּרְאָה תּוֹךְ כְּדֵי שֶׁאַתְּ אוֹמֶרֶת — זֶה עוֹזֵר לִרְאוֹת אֶת הַפֶּה.</span>
      </div>

      <button onClick={onNext} className={`w-full py-3 rounded-2xl text-white font-black font-rubik text-lg ${th.btn} active:scale-95 transition-transform shadow`}>
        בּוֹאִי נַקְשִׁיב 👂
      </button>
    </div>
  );
}

// ── Step: auditory discrimination (app grades — perception first) ──────
function ListenStep({ target, th, onNext }) {
  const { playText } = useAudio();
  const [rounds] = useState(() => buildDiscriminationRounds(8));
  const [idx, setIdx]       = useState(0);
  const [score, setScore]   = useState(0);
  const [picked, setPicked] = useState(null); // {key, correct}
  const round = rounds[idx];
  const done  = idx >= rounds.length;

  // Auto-play the prompt when a new round appears
  useEffect(() => {
    if (round) { const t = setTimeout(() => playText(round.speak), 350); return () => clearTimeout(t); }
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) {
    return (
      <div className={`bg-gradient-to-b ${th.grad} border-4 ${th.border} rounded-3xl p-6 text-center flex flex-col items-center gap-4`}>
        <div className="text-6xl">🎉</div>
        <p className={`text-2xl font-black font-rubik ${th.text}`}>{score} / {rounds.length} נָכוֹן!</p>
        <p className="text-sm text-purple-500 font-assistant">הָאֹזֶן שֶׁלָּךְ מִתְחַדֶּדֶת — עַכְשָׁו תּוֹרֵךְ לוֹמַר 🎤</p>
        <button onClick={onNext} className={`w-full py-3 rounded-2xl text-white font-black font-rubik text-lg ${th.btn} active:scale-95 transition-transform shadow`}>
          תּוֹרִי לוֹמַר 🎤
        </button>
      </div>
    );
  }

  function pick(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt.correct) setScore(s => s + 1);
    setTimeout(() => { setPicked(null); setIdx(i => i + 1); }, 1100);
  }

  return (
    <div className={`bg-gradient-to-b ${th.grad} border-4 ${th.border} rounded-3xl p-5 flex flex-col items-center gap-4`}>
      <p className="text-xs text-purple-400 font-assistant">{idx + 1} / {rounds.length}</p>
      <p className={`font-bold font-assistant ${th.text}`}>
        {round.type === 'syllable' ? 'אֵיזֶה צְלִיל שָׁמַעְתְּ?' : 'אֵיזוֹ מִילָּה שָׁמַעְתְּ?'}
      </p>

      <button
        onClick={() => playText(round.speak)}
        className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold font-assistant ${th.btn} active:scale-95 transition-transform shadow-lg`}
      >
        <Volume2 size={22} /> שׁוּב 🔊
      </button>

      <div className={`grid gap-3 w-full ${round.options.length > 3 ? 'grid-cols-3' : 'grid-cols-3'}`}>
        {round.options.map(opt => {
          const isPicked = picked?.key === opt.key;
          const show = picked && (opt.correct || isPicked);
          return (
            <button
              key={opt.key}
              onClick={() => pick(opt)}
              disabled={!!picked}
              className={`flex flex-col items-center justify-center gap-1 p-3 rounded-2xl border-2 bg-white transition-all
                ${show ? (opt.correct ? 'border-green-400 ring-4 ring-green-200' : 'border-red-300 ring-4 ring-red-200 opacity-70') : 'border-purple-200 active:scale-95'}`}
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span className="font-black font-rubik text-purple-800" style={{ fontSize: round.type === 'syllable' ? '1.8rem' : '0.95rem' }}>
                {opt.label}
              </span>
              {show && opt.correct && <span className="text-green-500 text-lg">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step: say the word (record & compare + self-rate) ──────────────────
function SayStep({ target, th, onNext }) {
  const [idx, setIdx] = useState(0);
  const word = target.words[idx];
  const last = idx >= target.words.length - 1;

  return (
    <div className={`bg-gradient-to-b ${th.grad} border-4 ${th.border} rounded-3xl p-5 flex flex-col items-center gap-3`}>
      <p className="text-xs text-purple-400 font-assistant">{idx + 1} / {target.words.length}</p>
      <div className="text-6xl">{word.emoji}</div>
      <div className={`font-black font-rubik ${th.text}`} style={{ fontSize: '3rem', lineHeight: '3.5rem' }} dir="rtl">
        {stripEmoji(word.text)}
      </div>

      <RecordCompare refText={stripEmoji(word.text)} th={th} key={word.text} />

      <button
        onClick={() => last ? onNext() : setIdx(i => i + 1)}
        className={`w-full py-3 rounded-2xl text-white font-black font-rubik text-lg ${th.btn} active:scale-95 transition-transform shadow`}
      >
        {last ? 'לַמִּשְׁפָּטִים 💬' : 'הַמִּילָּה הַבָּאָה ➡️'}
      </button>
    </div>
  );
}

// ── Step: carrier sentences (generalization) ───────────────────────────
function SentenceStep({ target, th, onDone, onBack }) {
  const [idx, setIdx] = useState(0);
  const sentence = target.sentences[idx];
  const last = idx >= target.sentences.length - 1;

  return (
    <div className={`bg-gradient-to-b ${th.grad} border-4 ${th.border} rounded-3xl p-5 flex flex-col items-center gap-3`}>
      <p className="text-xs text-purple-400 font-assistant">{idx + 1} / {target.sentences.length}</p>
      <p className="text-sm text-purple-400 font-assistant">קְרְאִי אֶת הַמִּשְׁפָּט בְּקוֹל:</p>
      <div className={`font-black font-rubik ${th.text} text-center`} style={{ fontSize: '1.6rem', lineHeight: '2.6rem' }} dir="rtl">
        {sentence}
      </div>

      <RecordCompare refText={stripEmoji(sentence)} th={th} key={sentence} />

      {last ? (
        <div className="w-full flex flex-col gap-2">
          <div className="text-center text-2xl">🌟🌟🌟</div>
          <p className={`text-center font-black font-rubik ${th.text}`}>כׇּל הַכָּבוֹד! סִיַּמְתְּ אֶת {target.nickname}!</p>
          <button onClick={onDone} className={`w-full py-3 rounded-2xl text-white font-black font-rubik ${th.btn} active:scale-95 transition-transform shadow`}>
            🔁 לְתַרְגֵּל שׁוּב
          </button>
          <button onClick={onBack} className="text-purple-400 font-assistant text-sm py-1">← צְלִיל אַחֵר</button>
        </div>
      ) : (
        <button onClick={() => setIdx(i => i + 1)} className={`w-full py-3 rounded-2xl text-white font-black font-rubik text-lg ${th.btn} active:scale-95 transition-transform shadow`}>
          הַמִּשְׁפָּט הַבָּא ➡️
        </button>
      )}
    </div>
  );
}

// ── Reusable: play reference (TTS) · record · play back · self-rate ─────
// Production is never auto-graded (ASR is unreliable for young/disordered speech).
// The child hears the model, records herself, compares, and self-rates — a
// documented self-monitoring strategy that drives carryover.
function RecordCompare({ refText, th }) {
  const { playText, stopAll } = useAudio();
  const [state, setState] = useState('idle'); // idle | recording | recorded
  const [rated, setRated] = useState(null);
  const recorderRef = useRef(null);
  const chunksRef   = useRef([]);
  const urlRef      = useRef(null);
  const audioRef    = useRef(null);

  const cleanup = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
  }, []);

  useEffect(() => () => { cleanup(); stopAll(); }, [cleanup, stopAll]);

  async function startRec() {
    setRated(null);
    cleanup();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      recorderRef.current = rec;
      rec.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
        urlRef.current = URL.createObjectURL(blob);
        setState('recorded');
      };
      rec.start();
      setState('recording');
    } catch {
      alert('לֹא הִצְלַחְנוּ לָגֶשֶׁת לַמִּיקְרוֹפוֹן. אַשְּׁרִי גִּישָׁה בַּדַּפְדְּפָן.');
      setState('idle');
    }
  }

  function stopRec() {
    recorderRef.current?.stop();
    recorderRef.current = null;
  }

  function playMine() {
    if (!urlRef.current) return;
    audioRef.current?.pause();
    const a = new Audio(urlRef.current);
    audioRef.current = a;
    a.play().catch(() => {});
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Hear the model */}
        <button
          onClick={() => playText(refText)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 text-purple-700 font-bold font-assistant text-sm active:scale-95 transition-transform shadow"
        >
          <Volume2 size={18} /> שִׁמְעִי
        </button>

        {/* Record / stop */}
        {state !== 'recording' ? (
          <button
            onClick={startRec}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-white font-bold font-assistant text-sm ${th.btn} active:scale-95 transition-transform shadow`}
          >
            <Mic size={18} /> {state === 'recorded' ? 'הַקְלָטָה מֵחָדָשׁ' : 'הַקְלִיטִי'}
          </button>
        ) : (
          <button
            onClick={stopRec}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500 text-white font-bold font-assistant text-sm animate-pulse shadow"
          >
            <Square size={14} fill="white" /> עֲצֹר
          </button>
        )}

        {/* Play my recording */}
        {state === 'recorded' && (
          <button
            onClick={playMine}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-bold font-assistant text-sm active:scale-95 transition-transform shadow"
          >
            <Play size={18} /> שִׁמְעִי אֶת עַצְמֵךְ
          </button>
        )}
      </div>

      {/* Self-rating — self-monitoring drives carryover */}
      {state === 'recorded' && (
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-purple-400 font-assistant">אֵיךְ יָצָא?</span>
          <button onClick={() => setRated('good')}  className={`text-2xl transition-transform ${rated === 'good' ? 'scale-125' : 'opacity-60'}`}>😀</button>
          <button onClick={() => setRated('again')} className={`text-2xl transition-transform ${rated === 'again' ? 'scale-125' : 'opacity-60'}`}>🔁</button>
          {rated === 'good'  && <span className="text-xs text-green-600 font-bold font-assistant">יוֹפִי! 🌟</span>}
          {rated === 'again' && <span className="text-xs text-purple-500 font-bold font-assistant">נַסִּי עוֹד פַּעַם 💪</span>}
        </div>
      )}
    </div>
  );
}
