import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Trash2, Check, Download } from 'lucide-react';
import { saveRecording, getRecording, deleteRecording } from '../utils/audioStorage';
import { LETTER_CARDS } from '../data/letters';
import { WORD_CARDS }   from '../data/words';
import { LETTER_LESSONS, NIKUD_META, NIKUD_ORDER } from '../data/curriculum';

const ALL_CARDS = [
  { group: 'שַׁלַב 1 — אוֹתִיּוֹת', cards: LETTER_CARDS },
  { group: 'שַׁלַב 2 — מִילִּים',   cards: WORD_CARDS   },
];

export default function RecordingStudio() {
  const [savedIds, setSavedIds]           = useState(new Set());
  const [savedCurriculumIds, setSavedCurriculumIds] = useState(new Set());

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        [...LETTER_CARDS, ...WORD_CARDS].map(c =>
          getRecording(c.id).then(v => v ? c.id : null)
        )
      );
      setSavedIds(new Set(results.filter(Boolean)));

      const curriculumKeys = [];
      for (const lesson of LETTER_LESSONS) {
        for (const nikudType of NIKUD_ORDER) {
          curriculumKeys.push(`${lesson.id}-${nikudType}`);
        }
      }
      const curriculumResults = await Promise.all(
        curriculumKeys.map(key => getRecording(key).then(v => v ? key : null))
      );
      setSavedCurriculumIds(new Set(curriculumResults.filter(Boolean)));
    }
    load();
  }, []);

  function onSaved(cardId) {
    setSavedIds(prev => new Set([...prev, cardId]));
  }
  function onDeleted(cardId) {
    setSavedIds(prev => {
      const next = new Set(prev);
      next.delete(cardId);
      return next;
    });
  }

  function onCurriculumSaved(key) {
    setSavedCurriculumIds(prev => new Set([...prev, key]));
  }
  function onCurriculumDeleted(key) {
    setSavedCurriculumIds(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }

  async function downloadAll() {
    const keys = [...savedCurriculumIds];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const data = await getRecording(key);
      if (data) {
        const a = document.createElement('a');
        a.href = data;
        a.download = `${key}.webm`;
        a.click();
      }
      if (i < keys.length - 1) {
        await new Promise(r => setTimeout(r, 250));
      }
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-purple-400 font-assistant leading-relaxed">
        לְחֲצִי עַל כֶּפְתּוֹר הַהַקְלָטָה לְיַד כָּל אוֹת / מִלָּה, אִמְרִי אֶת הַצְּלִיל,
        וְלִיבִּי תִּשְׁמַע אֶת קוֹלֵּךְ בַּמִּשְׂחָק! 🎙️
      </p>

      {/* Curriculum tiles section */}
      <section>
        <div className="flex items-center justify-between border-b border-purple-100 pb-1 mb-3">
          <h3 className="text-base font-black text-purple-700 font-rubik">
            נִיקּוּד מָלֵא — 56 מִילִּים
          </h3>
          {savedCurriculumIds.size > 0 && (
            <button
              onClick={downloadAll}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white text-xs font-bold rounded-full hover:bg-indigo-600 transition-colors"
            >
              <Download size={14} /> הוֹרֵד הַכֹּל ({savedCurriculumIds.size})
            </button>
          )}
        </div>

        {LETTER_LESSONS.map(lesson => (
          <div key={lesson.id} className="mb-4">
            <h4 className="text-sm font-bold text-purple-600 font-rubik mb-2">
              {lesson.emoji} אוֹת {lesson.name}
            </h4>
            <div className="space-y-2">
              {NIKUD_ORDER.map(nikudType => {
                const key = `${lesson.id}-${nikudType}`;
                const tileData = lesson.nikud[nikudType];
                const exampleWord = tileData.example.replace(/[^֐-׿\s]/g, '').trim();
                return (
                  <CurriculumCardRow
                    key={key}
                    lessonId={lesson.id}
                    nikudType={nikudType}
                    display={tileData.display}
                    exampleWord={exampleWord}
                    nikudName={NIKUD_META[nikudType].name}
                    hasSaved={savedCurriculumIds.has(key)}
                    onSaved={onCurriculumSaved}
                    onDeleted={onCurriculumDeleted}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Existing letter/word card sections */}
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
function CurriculumCardRow({ lessonId, nikudType, display, exampleWord, nikudName, hasSaved, onSaved, onDeleted }) {
  const [status, setStatus] = useState(hasSaved ? 'saved' : 'idle');
  const recorderRef         = useRef(null);
  const chunksRef           = useRef([]);
  const key                 = `${lessonId}-${nikudType}`;

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
          await saveRecording(key, reader.result);
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
    setStatus('saved');
  }

  async function playBack() {
    const data = await getRecording(key);
    if (data) new Audio(data).play();
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
    <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/70 border border-purple-100 hover:border-purple-300 transition-colors">
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

      {status === 'saved' && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
          <Check size={12} /> קָלוּט
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
          <span className="text-xs text-purple-400 animate-pulse">מְבַקֵּשׁ מִיקְרוֹפוֹן…</span>
        )}

        {status === 'recording' && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse"
          >
            <Square size={12} fill="white" /> עֲצֹר
          </button>
        )}

        {status === 'saved' && (
          <>
            <button
              onClick={playBack}
              className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              title="נגן הקלטה"
            >
              <Play size={14} />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
              title="הורד כקובץ"
            >
              <Download size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
              title="מחק הקלטה"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Per-card recorder row ──────────────────────────────────────
function CardRow({ card, hasSaved, onSaved, onDeleted }) {
  const [status, setStatus]     = useState(hasSaved ? 'saved' : 'idle');
  const recorderRef             = useRef(null);
  const chunksRef               = useRef([]);

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
          <button
            onClick={startRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-full hover:bg-pink-600 transition-colors"
          >
            <Mic size={14} /> הַקְלֵט
          </button>
        )}

        {status === 'requesting' && (
          <span className="text-xs text-purple-400 animate-pulse">מְבַקֵּשׁ מִיקְרוֹפוֹן…</span>
        )}

        {status === 'recording' && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse"
          >
            <Square size={12} fill="white" /> עֲצֹר
          </button>
        )}

        {status === 'saved' && (
          <>
            <button
              onClick={playBack}
              className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              title="נגן הקלטה"
            >
              <Play size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
              title="מחק הקלטה"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
