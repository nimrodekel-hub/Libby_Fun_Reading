import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Trash2, Check, Download, Upload } from 'lucide-react';
import { saveRecording, getRecording, deleteRecording } from '../utils/audioStorage';
import { LETTER_CARDS } from '../data/letters';
import { WORD_CARDS }   from '../data/words';
import { LETTER_LESSONS, NIKUD_META, NIKUD_ORDER } from '../data/curriculum';

const ALL_CARDS = [
  { group: 'שַׁלַב 1 — אוֹתִיּוֹת', cards: LETTER_CARDS },
  { group: 'שַׁלַב 2 — מִילִּים',   cards: WORD_CARDS   },
];

export default function RecordingStudio() {
  const [savedIds,         setSavedIds]         = useState(new Set());
  const [savedCurriculumIds, setSavedCurriculumIds] = useState(new Set());
  const [deployedIds,      setDeployedIds]      = useState(new Set());
  const [checkingDeploy,   setCheckingDeploy]   = useState(false);

  // Load which keys have recordings in IndexedDB
  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        [...LETTER_CARDS, ...WORD_CARDS].map(c =>
          getRecording(c.id).then(v => v ? c.id : null)
        )
      );
      setSavedIds(new Set(results.filter(Boolean)));

      const curriculumKeys = LETTER_LESSONS.flatMap(lesson =>
        NIKUD_ORDER.map(nikudType => `${lesson.id}-${nikudType}`)
      );
      const curriculumResults = await Promise.all(
        curriculumKeys.map(key => getRecording(key).then(v => v ? key : null))
      );
      setSavedCurriculumIds(new Set(curriculumResults.filter(Boolean)));
    }
    load();
  }, []);

  // After recordings are loaded, check which ones already have a deployed static file
  useEffect(() => {
    if (savedCurriculumIds.size === 0) return;
    const base = import.meta.env.BASE_URL ?? '/';
    setCheckingDeploy(true);
    Promise.all(
      [...savedCurriculumIds].map(key =>
        fetch(`${base}audio/${key}.webm`, { method: 'HEAD' })
          .then(res => res.ok ? key : null)
          .catch(() => null)
      )
    ).then(results => {
      setDeployedIds(new Set(results.filter(Boolean)));
      setCheckingDeploy(false);
    });
  }, [savedCurriculumIds.size]); // eslint-disable-line react-hooks/exhaustive-deps

  function onSaved(cardId) {
    setSavedIds(prev => new Set([...prev, cardId]));
  }
  function onDeleted(cardId) {
    setSavedIds(prev => { const n = new Set(prev); n.delete(cardId); return n; });
  }
  function onCurriculumSaved(key) {
    setSavedCurriculumIds(prev => new Set([...prev, key]));
  }
  function onCurriculumDeleted(key) {
    setSavedCurriculumIds(prev => { const n = new Set(prev); n.delete(key); return n; });
  }

  // Keys recorded locally but NOT yet deployed as static files
  const newKeys = [...savedCurriculumIds].filter(k => !deployedIds.has(k));

  async function downloadKeys(keys) {
    for (let i = 0; i < keys.length; i++) {
      const data = await getRecording(keys[i]);
      if (data) {
        const a = document.createElement('a');
        a.href = data;
        a.download = `${keys[i]}.webm`;
        a.click();
      }
      if (i < keys.length - 1) await new Promise(r => setTimeout(r, 250));
    }
  }

  return (
    <div className="space-y-5" dir="rtl">

      {/* ── How it works explanation ─────────────────────────── */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 space-y-3 font-assistant text-sm">
        <p className="font-black text-indigo-700 text-base">📖 איך עובד האולפן?</p>
        <p className="text-indigo-600 text-xs bg-indigo-100 rounded-xl px-3 py-2 font-bold">
          🔑 כניסה לאולפן: לחץ 5 פעמים ברצף על 👑 (תג הניקוד) במסך המשחק
        </p>

        <ol className="space-y-2 text-indigo-800 list-none">
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">1.</span>
            <span>לחצי <span className="font-bold">הַקְלֵט 🎙️</span> ליד כל מילה, אמרי את המילה, לחצי <span className="font-bold">עֲצֹר</span>.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">2.</span>
            <span>אפשר לעצור בכל שלב — לא חייבים להקליט הכל ביום אחד.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">3.</span>
            <span>לחצי <span className="font-bold">הורד חדשות 📤</span> — רק ההקלטות שטרם נשלחו יורדות.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">4.</span>
            <span>שלחי את קבצי ה-<span className="font-bold">.webm</span> לניר — הוא מוסיף אותם לאפליקציה ודוחף.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">5.</span>
            <span>חזרי בפעם הבאה, הקליטי עוד מילים → הורד חדשות → שלחי שוב. <span className="font-bold">ההקלטות הקודמות לא נדרסות!</span></span>
          </li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-1 border-t border-indigo-200">
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full border border-emerald-300">
            <Check size={11} /> פוּרְסָם — כבר באפליקציה על כל מכשיר
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-full border border-indigo-300">
            <Upload size={11} /> מוּכָן לִשְׁלִיחָה — הוקלט, טרם נשלח
          </span>
        </div>
      </div>

      {/* ── Curriculum tiles section ─────────────────────────── */}
      <section>
        <div className="flex items-center justify-between border-b border-purple-100 pb-2 mb-3 gap-2 flex-wrap">
          <h3 className="text-base font-black text-purple-700 font-rubik">
            נִיקּוּד מָלֵא — 56 מִילִּים
          </h3>
          <div className="flex gap-2">
            {/* Download NEW only */}
            {newKeys.length > 0 && (
              <button
                onClick={() => downloadKeys(newKeys)}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white text-xs font-bold rounded-full hover:bg-indigo-600 transition-colors"
              >
                <Upload size={14} /> הוֹרֵד חֲדָשׁוֹת ({newKeys.length})
              </button>
            )}
            {/* Download ALL */}
            {savedCurriculumIds.size > 0 && (
              <button
                onClick={() => downloadKeys([...savedCurriculumIds])}
                className="flex items-center gap-1 px-3 py-1.5 bg-purple-400 text-white text-xs font-bold rounded-full hover:bg-purple-500 transition-colors"
              >
                <Download size={14} /> הוֹרֵד הַכֹּל ({savedCurriculumIds.size})
              </button>
            )}
          </div>
        </div>

        {checkingDeploy && (
          <p className="text-xs text-purple-300 font-assistant mb-2 animate-pulse">בודק אילו קבצים כבר פורסו…</p>
        )}

        {LETTER_LESSONS.map(lesson => (
          <div key={lesson.id} className="mb-5">
            <h4 className="text-sm font-bold text-purple-600 font-rubik mb-2">
              {lesson.emoji} אוֹת {lesson.name}
            </h4>
            <div className="space-y-2">
              {NIKUD_ORDER.map(nikudType => {
                const key       = `${lesson.id}-${nikudType}`;
                const tileData  = lesson.nikud[nikudType];
                const exWord    = tileData.example.replace(/[^֐-׿\s]/g, '').trim();
                return (
                  <CurriculumCardRow
                    key={key}
                    lessonId={lesson.id}
                    nikudType={nikudType}
                    display={tileData.display}
                    exampleWord={exWord}
                    nikudName={NIKUD_META[nikudType].name}
                    hasSaved={savedCurriculumIds.has(key)}
                    isDeployed={deployedIds.has(key)}
                    onSaved={onCurriculumSaved}
                    onDeleted={onCurriculumDeleted}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ── Existing letter/word card sections ──────────────── */}
      {ALL_CARDS.map(({ group, cards }) => (
        <section key={group}>
          <h3 className="text-base font-black text-purple-700 mb-3 font-rubik border-b border-purple-100 pb-1">
            {group}
          </h3>
          <div className="space-y-2">
            {cards.map(card => (
              <CardRow
                key={card.id}
                card={card}
                hasSaved={savedIds.has(card.id)}
                onSaved={onSaved}
                onDeleted={onDeleted}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// ── Curriculum tile recorder row ──────────────────────────────────────
function CurriculumCardRow({ lessonId, nikudType, display, exampleWord, nikudName, hasSaved, isDeployed, onSaved, onDeleted }) {
  const [status, setStatus] = useState(hasSaved ? 'saved' : 'idle');
  const recorderRef         = useRef(null);
  const chunksRef           = useRef([]);
  const playbackRef         = useRef(null);
  const key                 = `${lessonId}-${nikudType}`;

  useEffect(() => {
    setStatus(hasSaved ? 'saved' : 'idle');
  }, [hasSaved]);

  async function startRecording() {
    setStatus('requesting');
    try {
      const stream   = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      // Let the browser choose its native mimeType (Chrome uses video/webm;codecs=opus).
      // Forcing 'audio/webm' causes a mismatch that silently breaks playback.
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        // Use the recorder's actual mimeType, not a hardcoded one
        const blob   = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          await saveRecording(key, reader.result);
          // Only mark saved AFTER IndexedDB write — otherwise Play fires before data is stored
          setStatus('saved');
          onSaved(key);
        };
        reader.readAsDataURL(blob);
      };
      recorder.start();
      setStatus('recording');
    } catch {
      setStatus('idle');
      alert('לא הצלחנו לגשת למיקרופון. אנא אשרי גישה בדפדפן.');
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    recorderRef.current = null;
    setStatus('saving'); // wait for onstop → IndexedDB before showing Play
  }

  async function playBack() {
    const dataUrl = await getRecording(key);
    if (!dataUrl) return;
    // Stop any current playback
    if (playbackRef.current) { playbackRef.current.pause(); playbackRef.current = null; }
    // Convert Data URL → Blob URL: more reliable for audio in Chrome
    try {
      const res  = await fetch(dataUrl);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const audio = new Audio(url);
      playbackRef.current = audio;
      audio.onended = () => { URL.revokeObjectURL(url); playbackRef.current = null; };
      audio.onerror = () => { URL.revokeObjectURL(url); playbackRef.current = null; setStatus('idle'); };
      await audio.play();
    } catch {
      playbackRef.current = null;
    }
  }

  async function handleDelete() {
    await deleteRecording(key);
    setStatus('idle');
    onDeleted(key);
  }

  async function handleDownload() {
    const data = await getRecording(key);
    if (!data) return;
    const a = document.createElement('a');
    a.href = data;
    a.download = `${key}.webm`;
    a.click();
  }

  return (
    <div className={`flex items-center gap-3 p-2 rounded-2xl border transition-colors
      ${isDeployed
        ? 'bg-emerald-50/60 border-emerald-200'
        : status === 'saved'
          ? 'bg-indigo-50/60 border-indigo-200'
          : 'bg-white/70 border-purple-100 hover:border-purple-300'
      }`}>
      <div
        className="w-16 text-center font-black font-rubik text-purple-800 leading-none shrink-0"
        style={{ fontSize: '2.2rem', lineHeight: '3rem' }}
        dir="rtl"
      >
        {display}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-purple-600 font-assistant truncate">{nikudName}</p>
        <p className="text-xs text-purple-400 font-assistant truncate">{exampleWord}</p>
      </div>

      {/* Status badge */}
      {isDeployed && (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full border border-emerald-300 shrink-0">
          <Check size={11} /> פוּרְסָם
        </span>
      )}
      {!isDeployed && status === 'saved' && (
        <span className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-full border border-indigo-300 shrink-0">
          <Upload size={11} /> לִשְׁלִיחָה
        </span>
      )}

      <div className="flex items-center gap-2 shrink-0">
        {status === 'idle' && (
          <button
            onClick={startRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-full hover:bg-pink-600 transition-colors"
          >
            <Mic size={14} /> הַקְלֵט
          </button>
        )}
        {status === 'requesting' && (
          <span className="text-xs text-purple-400 animate-pulse">מְבַקֵּשׁ…</span>
        )}
        {status === 'recording' && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse"
          >
            <Square size={12} fill="white" /> עֲצֹר
          </button>
        )}
        {status === 'saving' && (
          <span className="text-xs text-purple-400 font-assistant animate-pulse">שׁוֹמֵר…</span>
        )}
        {status === 'saved' && (
          <>
            <button onClick={playBack}       className="p-1.5 rounded-full bg-blue-100   text-blue-600   hover:bg-blue-200   transition-colors" title="נגן"><Play     size={14} /></button>
            <button onClick={handleDownload} className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors" title="הורד"><Download size={14} /></button>
            <button onClick={handleDelete}   className="p-1.5 rounded-full bg-red-100    text-red-500    hover:bg-red-200    transition-colors" title="מחק"><Trash2   size={14} /></button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Per-card recorder row ──────────────────────────────────────
function CardRow({ card, hasSaved, onSaved, onDeleted }) {
  const [status, setStatus] = useState(hasSaved ? 'saved' : 'idle');
  const recorderRef         = useRef(null);
  const chunksRef           = useRef([]);

  useEffect(() => {
    setStatus(hasSaved ? 'saved' : 'idle');
  }, [hasSaved]);

  async function startRecording() {
    setStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const recorder    = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob   = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          await saveRecording(card.id, reader.result);
          setStatus('saved');
          onSaved(card.id);
        };
        reader.readAsDataURL(blob);
      };
      recorder.start();
      setStatus('recording');
    } catch {
      setStatus('idle');
      alert('לא הצלחנו לגשת למיקרופון. אנא אשרי גישה בדפדפן.');
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    recorderRef.current = null;
    setStatus('saved');
  }

  async function playBack() {
    const data = await getRecording(card.id);
    if (data) new Audio(data).play();
  }

  async function handleDelete() {
    await deleteRecording(card.id);
    setStatus('idle');
    onDeleted(card.id);
  }

  return (
    <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/70 border border-purple-100 hover:border-purple-300 transition-colors">
      <div
        className="w-16 text-center font-black font-rubik text-purple-800 leading-none shrink-0"
        style={{ fontSize: '2.2rem', lineHeight: '3rem' }}
        dir="rtl"
      >
        {card.display}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-purple-600 font-assistant truncate">{card.phonetic}</p>
        <p className="text-xs text-purple-400 font-assistant">{card.exampleMeaning}</p>
      </div>
      {status === 'saved' && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
          <Check size={12} /> קָלוּט
        </span>
      )}
      <div className="flex items-center gap-2 shrink-0">
        {status === 'idle' && (
          <button onClick={startRecording} className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-full hover:bg-pink-600 transition-colors">
            <Mic size={14} /> הַקְלֵט
          </button>
        )}
        {status === 'requesting' && <span className="text-xs text-purple-400 animate-pulse">מְבַקֵּשׁ…</span>}
        {status === 'recording' && (
          <button onClick={stopRecording} className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
            <Square size={12} fill="white" /> עֲצֹר
          </button>
        )}
        {status === 'saved' && (
          <>
            <button onClick={playBack}     className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors" title="נגן"><Play   size={14} /></button>
            <button onClick={handleDelete} className="p-1.5 rounded-full bg-red-100  text-red-500  hover:bg-red-200  transition-colors" title="מחק"><Trash2 size={14} /></button>
          </>
        )}
      </div>
    </div>
  );
}
