import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Trash2, Check } from 'lucide-react';
import { saveRecording, getRecording, deleteRecording } from '../utils/audioStorage';
import { LETTER_CARDS } from '../data/letters';
import { WORD_CARDS }   from '../data/words';

const ALL_CARDS = [
  { group: 'שַׁלַב 1 — אוֹתִיּוֹת', cards: LETTER_CARDS },
  { group: 'שַׁלַב 2 — מִילִּים',   cards: WORD_CARDS   },
];

export default function RecordingStudio() {
  const [savedIds, setSavedIds] = useState(new Set());

  // Load which cards already have recordings
  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        [...LETTER_CARDS, ...WORD_CARDS].map(c =>
          getRecording(c.id).then(v => v ? c.id : null)
        )
      );
      setSavedIds(new Set(results.filter(Boolean)));
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

  return (
    <div className="space-y-6">
      <p className="text-sm text-purple-400 font-assistant leading-relaxed">
        לְחֲצִי עַל כֶּפְתּוֹר הַהַקְלָטָה לְיַד כָּל אוֹת / מִלָּה, אִמְרִי אֶת הַצְּלִיל,
        וְלִיבִּי תִּשְׁמַע אֶת קוֹלֵּךְ בַּמִּשְׂחָק! 🎙️
      </p>

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

// ── Per-card recorder row ──────────────────────────────────────
function CardRow({ card, hasSaved, onSaved, onDeleted }) {
  // status: idle | requesting | recording | saved
  const [status, setStatus]     = useState(hasSaved ? 'saved' : 'idle');
  const recorderRef             = useRef(null);
  const chunksRef               = useRef([]);

  // Sync external hasSaved changes (e.g., on load)
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
    setStatus('saved'); // optimistic — onstop confirms
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
      {/* Letter / word display */}
      <div
        className="w-16 text-center font-black font-rubik text-purple-800 leading-none shrink-0"
        style={{ fontSize: '2.2rem', lineHeight: '3rem' }}
        dir="rtl"
      >
        {card.display}
      </div>

      {/* Phonetic */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-purple-600 font-assistant truncate">{card.phonetic}</p>
        <p className="text-xs text-purple-400 font-assistant">{card.exampleMeaning}</p>
      </div>

      {/* Status badge */}
      {status === 'saved' && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
          <Check size={12} /> קָלוּט
        </span>
      )}

      {/* Controls */}
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
