import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Trash2, Check, Upload, Pencil } from 'lucide-react';
import { saveRecording, getRecording, deleteRecording } from '../utils/audioStorage';
import { loadAllWordOverrides, saveWordOverride } from '../utils/wordOverrides';
import { LETTER_CARDS } from '../data/letters';
import { WORD_CARDS }   from '../data/words';
import { LETTER_LESSONS, NIKUD_META, NIKUD_ORDER } from '../data/curriculum';
import { getToken, saveToken, clearToken, uploadRecording, verifyToken } from '../utils/githubSync';

const ALL_CARDS = [
  { group: 'שַׁלַב 1 — אוֹתִיּוֹת', cards: LETTER_CARDS },
  { group: 'שַׁלַב 2 — מִילִּים',   cards: WORD_CARDS   },
];

export default function RecordingStudio({ onWordChanged: notifyParent }) {
  const [savedIds,            setSavedIds]            = useState(new Set());
  const [savedCurriculumIds,  setSavedCurriculumIds]  = useState(new Set());
  const [deployedIds,         setDeployedIds]         = useState(new Set());
  const [uploadedIds,         setUploadedIds]         = useState(new Set());
  const [checkingDeploy,      setCheckingDeploy]      = useState(false);
  const [wordOverrides,       setWordOverrides]       = useState(() => loadAllWordOverrides());
  const [ghToken,             setGhToken]             = useState(() => getToken());
  const [uploading,           setUploading]           = useState(false);
  const [uploadProgress,      setUploadProgress]      = useState({ done: 0, total: 0 });
  const [uploadResult,        setUploadResult]        = useState(null); // 'ok' | 'err'

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

  // Check ALL curriculum keys against GitHub Pages (catches recordings from other devices)
  useEffect(() => {
    const base = import.meta.env.BASE_URL ?? '/';
    const allKeys = LETTER_LESSONS.flatMap(lesson =>
      NIKUD_ORDER.map(nikudType => `${lesson.id}-${nikudType}`)
    );
    setCheckingDeploy(true);
    Promise.all(
      allKeys.map(key =>
        fetch(`${base}audio/${key}.webm`, { method: 'HEAD' })
          .then(res => res.ok ? key : null)
          .catch(() => null)
      )
    ).then(results => {
      setDeployedIds(new Set(results.filter(Boolean)));
      setCheckingDeploy(false);
    });
  }, []); // run once on mount — covers all devices

  function onSaved(cardId)          { setSavedIds(prev => new Set([...prev, cardId])); }
  function onDeleted(cardId)        { setSavedIds(prev => { const n = new Set(prev); n.delete(cardId); return n; }); }
  function onCurriculumSaved(key)   { setSavedCurriculumIds(prev => new Set([...prev, key])); }
  function onCurriculumDeleted(key) { setSavedCurriculumIds(prev => { const n = new Set(prev); n.delete(key); return n; }); }
  function onCurriculumUploaded(key){ setUploadedIds(prev => new Set([...prev, key])); }

  function handleWordChanged(key, newExample) {
    saveWordOverride(key, newExample);
    setWordOverrides(prev => ({ ...prev, [key]: newExample }));
    notifyParent?.(key, newExample);
  }

  function handleTokenSave(t) {
    saveToken(t);
    setGhToken(t);
    setUploadResult(null);
  }
  function handleTokenClear() {
    clearToken();
    setGhToken('');
    setUploadResult(null);
  }

  // Keys recorded locally and not yet uploaded this session
  const allKeys = [...savedCurriculumIds];
  const pendingKeys = allKeys.filter(k => !deployedIds.has(k) && !uploadedIds.has(k));

  async function publishToGitHub(keys) {
    if (!keys.length || !ghToken) return;
    setUploading(true);
    setUploadResult(null);
    setUploadProgress({ done: 0, total: keys.length });
    let failed = 0;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      try {
        const dataUrl = await getRecording(key);
        if (!dataUrl) { failed++; continue; }
        await uploadRecording(ghToken, key, dataUrl);
        onCurriculumUploaded(key);
      } catch (err) {
        if (err?.message === 'TOKEN_INVALID') {
          handleTokenClear();
          setUploadResult('token_err');
          setUploading(false);
          return;
        }
        failed++;
      }
      setUploadProgress({ done: i + 1, total: keys.length });
    }
    setUploading(false);
    setUploadResult(failed === 0 ? 'ok' : 'partial');
  }

  return (
    <div className="space-y-5" dir="rtl">

      {/* ── GitHub Token Setup ─────────────────────────────────── */}
      <TokenSetup token={ghToken} onSave={handleTokenSave} onClear={handleTokenClear} />

      {/* ── How it works ──────────────────────────────────────── */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 space-y-3 font-assistant text-sm">
        <p className="font-black text-indigo-700 text-base">📖 איך עובד האולפן?</p>
        <p className="text-indigo-600 text-xs bg-indigo-100 rounded-xl px-3 py-2 font-bold">
          🔑 כניסה לאולפן: לחץ 5 פעמים ברצף על 👑 במסך המשחק
        </p>
        <ol className="space-y-2 text-indigo-800 list-none">
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">1.</span>
            <span>הכנסי <span className="font-bold">GitHub Token</span> פעם אחת (נשמר אוטומטית).</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">2.</span>
            <span>לחצי <span className="font-bold">הַקְלֵט 🎙️</span> ליד כל מילה, אמרי את המילה, לחצי <span className="font-bold">עֲצֹר</span>.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">3.</span>
            <span>לחצי <span className="font-bold">פרסם לכל המכשירים ☁️</span> — ההקלטות יועלו לגיטהאב ישירות.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">4.</span>
            <span>תוך כ-3 דקות ההקלטות יופיעו אוטומטית <span className="font-bold">על כל מכשיר</span> שפותח את האפליקציה.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-black text-pink-500 shrink-0">5.</span>
            <span>אפשר להמשיך להקליט עוד ולפרסם שוב בכל עת. <span className="font-bold">הקלטות קיימות לא נדרסות!</span></span>
          </li>
        </ol>
        <div className="flex flex-wrap gap-3 pt-1 border-t border-indigo-200">
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full border border-emerald-300">
            <Check size={11} /> פוּרְסָם — כבר באפליקציה על כל מכשיר
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-full border border-indigo-300">
            <Upload size={11} /> הוּעְלָה — ממתין לבנייה (~3 דק׳)
          </span>
        </div>
      </div>

      {/* ── Curriculum tiles section ─────────────────────────── */}
      <section>
        <div className="flex items-center justify-between border-b border-purple-100 pb-2 mb-3 gap-2 flex-wrap">
          <h3 className="text-base font-black text-purple-700 font-rubik">
            נִיקּוּד מָלֵא — {LETTER_LESSONS.length * NIKUD_ORDER.length} מִילִּים
          </h3>
          {allKeys.length > 0 && (
            <button
              onClick={() => publishToGitHub(pendingKeys.length ? pendingKeys : allKeys)}
              disabled={uploading || !ghToken}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-black transition-all active:scale-95 disabled:opacity-60"
              style={{ background: 'linear-gradient(to right, #6366f1, #ec4899)' }}
              title={!ghToken ? 'הכנסי GitHub Token כדי לפרסם' : ''}
            >
              {uploading
                ? <><span className="animate-spin inline-block">⏳</span> מַעְלֶה {uploadProgress.done}/{uploadProgress.total}…</>
                : <><Upload size={15} /> פרסם לכל המכשירים ({(pendingKeys.length || allKeys.length)} ☁️)</>}
            </button>
          )}
        </div>

        {/* Upload result banner */}
        {uploadResult === 'ok' && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-2 mb-3 text-emerald-700 font-bold text-sm font-assistant flex items-center gap-2">
            <Check size={16} /> ✓ פורסם! יופיע על כל המכשירים תוך כ-3 דקות.
          </div>
        )}
        {uploadResult === 'partial' && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-2 mb-3 text-amber-700 font-bold text-sm font-assistant">
            ⚠️ חלק מההקלטות לא הועלו. נסי שוב.
          </div>
        )}
        {uploadResult === 'token_err' && (
          <div className="bg-red-50 border border-red-300 rounded-xl px-4 py-2 mb-3 text-red-700 font-bold text-sm font-assistant">
            🔑 הטוקן לא תקין — הכנסי טוקן חדש למעלה.
          </div>
        )}

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
                const key         = `${lesson.id}-${nikudType}`;
                const tileData    = lesson.nikud[nikudType];
                const tileExample = wordOverrides[key] ?? tileData.example;
                const exWord      = tileExample.replace(/[^֐-׿\s]/g, '').trim();
                const options     = [tileData.example, ...(tileData.alts ?? [])];
                return (
                  <CurriculumCardRow
                    key={key}
                    lessonId={lesson.id}
                    nikudType={nikudType}
                    display={tileData.display}
                    exampleWord={exWord}
                    options={options}
                    nikudName={NIKUD_META[nikudType].name}
                    hasSaved={savedCurriculumIds.has(key)}
                    isDeployed={deployedIds.has(key)}
                    isUploaded={uploadedIds.has(key)}
                    ghToken={ghToken}
                    onSaved={onCurriculumSaved}
                    onDeleted={onCurriculumDeleted}
                    onUploaded={onCurriculumUploaded}
                    onWordChanged={handleWordChanged}
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

// ── GitHub Token Setup card ───────────────────────────────────────────
function TokenSetup({ token, onSave, onClear }) {
  const [draft,    setDraft]    = useState('');
  const [checking, setChecking] = useState(false);
  const [valid,    setValid]    = useState(null); // null | true | false

  async function verify() {
    const t = draft.trim();
    if (!t) return;
    setChecking(true);
    setValid(null);
    const ok = await verifyToken(t);
    setChecking(false);
    setValid(ok);
    if (ok) onSave(t);
  }

  if (token) {
    return (
      <div className="flex items-center justify-between bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-bold text-emerald-700 font-assistant">
          <Check size={16} className="text-emerald-500" />
          מחובר לגיטהאב — הקלטות יועלו ישירות ✓
        </span>
        <button
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-600 font-bold font-assistant px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
        >
          נתק
        </button>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-3 font-assistant">
      <p className="font-black text-amber-700 text-sm">🔑 הגדרת GitHub Token (פעם אחת)</p>
      <p className="text-xs text-amber-600">
        צרי <span className="font-bold">Fine-grained Personal Access Token</span> ב-GitHub עם הרשאת
        <span className="font-bold"> Contents: Read &amp; Write</span> על הריפו הזה, והדביקי כאן.
      </p>
      <div className="flex gap-2">
        <input
          type="password"
          value={draft}
          onChange={e => { setDraft(e.target.value); setValid(null); }}
          onKeyDown={e => e.key === 'Enter' && verify()}
          placeholder="github_pat_…"
          className="flex-1 border-2 border-amber-200 rounded-xl px-3 py-2 text-sm font-mono bg-white focus:outline-none focus:border-amber-400"
          dir="ltr"
        />
        <button
          onClick={verify}
          disabled={checking || !draft.trim()}
          className="px-4 py-2 rounded-xl bg-amber-500 text-white font-black text-sm disabled:opacity-50 active:scale-95 transition-all"
        >
          {checking ? '…' : 'אמת'}
        </button>
      </div>
      {valid === false && (
        <p className="text-xs text-red-600 font-bold">❌ טוקן לא תקין — בדקי שוב</p>
      )}
      {valid === true && (
        <p className="text-xs text-emerald-600 font-bold">✅ מחובר!</p>
      )}
    </div>
  );
}

// ── Curriculum tile recorder row ──────────────────────────────────────
const BASE_URL = import.meta.env.BASE_URL ?? '/';

function CurriculumCardRow({
  lessonId, nikudType, display, exampleWord, options = [], nikudName,
  hasSaved, isDeployed, isUploaded, ghToken,
  onSaved, onDeleted, onUploaded, onWordChanged,
}) {
  const [status,      setStatus]      = useState(hasSaved ? 'saved' : 'idle');
  const [playError,   setPlayError]   = useState('');
  const [picking,     setPicking]     = useState(false);
  const [rowUploading, setRowUploading] = useState(false);
  const recorderRef  = useRef(null);
  const chunksRef    = useRef([]);
  const playbackRef  = useRef(null);
  const blobUrlRef   = useRef(null);
  const key          = `${lessonId}-${nikudType}`;

  useEffect(() => { setStatus(hasSaved ? 'saved' : 'idle'); }, [hasSaved]);

  // Pre-load Blob URL when status becomes 'saved' so playBack() is synchronous
  useEffect(() => {
    if (status !== 'saved') {
      if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); blobUrlRef.current = null; }
      return;
    }
    let cancelled = false;
    let createdUrl = null;
    (async () => {
      try {
        const dataUrl = await getRecording(key);
        if (cancelled || !dataUrl) return;
        const res  = await fetch(dataUrl);
        const blob = await res.blob();
        if (cancelled) return;
        createdUrl = URL.createObjectURL(blob);
        blobUrlRef.current = createdUrl;
      } catch { /* keep null — playBack will show error */ }
    })();
    return () => {
      cancelled = true;
      if (playbackRef.current) { playbackRef.current.pause(); playbackRef.current = null; }
      if (createdUrl) URL.revokeObjectURL(createdUrl);
      blobUrlRef.current = null;
    };
  }, [status, key]);

  async function startRecording() {
    setStatus('requesting');
    setPlayError('');
    try {
      const stream   = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob   = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
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
    setStatus('saving');
  }

  function playBack() {
    setPlayError('');
    const url = blobUrlRef.current;
    if (!url) { setPlayError('טוען…'); return; }
    if (playbackRef.current) { playbackRef.current.pause(); playbackRef.current = null; }
    const audio = new Audio(url);
    playbackRef.current = audio;
    audio.onended = () => { playbackRef.current = null; };
    audio.onerror = () => { playbackRef.current = null; setPlayError(`שגיאה ${audio.error?.code ?? '?'}`); };
    audio.play().catch(err => { playbackRef.current = null; setPlayError(err.name); });
  }

  function playDeployed() {
    setPlayError('');
    const audio = new Audio(`${BASE_URL}audio/${key}.webm`);
    audio.onerror = () => setPlayError('שגיאה בנגינה');
    audio.play().catch(() => setPlayError('שגיאה בנגינה'));
  }

  async function handleDelete() {
    await deleteRecording(key);
    setStatus('idle');
    onDeleted(key);
  }

  async function handleUpload() {
    if (!ghToken || rowUploading) return;
    setRowUploading(true);
    try {
      const dataUrl = await getRecording(key);
      if (!dataUrl) return;
      await uploadRecording(ghToken, key, dataUrl);
      onUploaded(key);
    } catch (err) {
      alert('שגיאה בהעלאה: ' + (err?.message ?? err));
    } finally {
      setRowUploading(false);
    }
  }

  const isPublished = isDeployed || isUploaded;

  return (
    <div className={`flex items-center gap-3 p-2 rounded-2xl border transition-colors
      ${isDeployed
        ? 'bg-emerald-50/60 border-emerald-200'
        : isUploaded
          ? 'bg-teal-50/60 border-teal-200'
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
        <div
          className="flex items-center gap-1 cursor-pointer active:opacity-70"
          onClick={() => options.length > 1 && setPicking(p => !p)}
        >
          <p className="font-black font-rubik text-purple-800 truncate" style={{ fontSize: '1.35rem', lineHeight: '1.8rem' }} dir="rtl">
            {exampleWord}
          </p>
          {options.length > 1 && <Pencil size={11} className="text-purple-300 shrink-0" />}
        </div>

        {picking && (
          <div className="flex flex-wrap gap-1 mt-1 pb-1">
            {options.map((raw, i) => {
              const word     = raw.replace(/[^֐-׿\s]/g, '').trim();
              const selected = word === exampleWord;
              return (
                <button
                  key={i}
                  dir="rtl"
                  onClick={() => { if (!selected) onWordChanged(key, raw); setPicking(false); }}
                  className={`px-2 py-1 rounded-xl font-black font-rubik text-sm transition-colors
                    ${selected
                      ? 'bg-purple-200 text-purple-900 border-2 border-purple-400'
                      : 'bg-white text-purple-700 border border-purple-200 active:bg-purple-50'}`}
                >
                  {word} {selected && '✓'}
                </button>
              );
            })}
            <button onClick={() => setPicking(false)} className="px-2 py-1 rounded-xl text-xs text-purple-300 border border-purple-100">✕</button>
          </div>
        )}

        <p className="text-xs text-purple-400 font-assistant truncate">{nikudName}</p>
      </div>

      {/* Status badge */}
      {isDeployed && (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full border border-emerald-300 shrink-0">
          <Check size={11} /> פוּרְסָם
        </span>
      )}
      {!isDeployed && isUploaded && (
        <span className="flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded-full border border-teal-300 shrink-0">
          ☁️ הוּעְלָה
        </span>
      )}
      {!isPublished && status === 'saved' && (
        <span className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-full border border-indigo-300 shrink-0">
          <Upload size={11} /> מוּכָן
        </span>
      )}

      <div className="flex items-center gap-2 shrink-0">
        {status === 'idle' && isDeployed && (
          <button onClick={playDeployed} className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors" title="נגן מהשרת">
            <Play size={14} />
          </button>
        )}
        {status === 'idle' && (
          <button
            onClick={startRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-full hover:bg-pink-600 transition-colors"
          >
            <Mic size={14} /> {isDeployed ? 'הַקְלֵט שוב' : 'הַקְלֵט'}
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
            <button onClick={playBack} className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors" title="נגן">
              <Play size={14} />
            </button>
            {ghToken && !isPublished && (
              <button
                onClick={handleUpload}
                disabled={rowUploading}
                className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors disabled:opacity-50"
                title="העלי לגיטהאב"
              >
                {rowUploading ? <span className="text-xs animate-spin inline-block">⏳</span> : <Upload size={14} />}
              </button>
            )}
            <button onClick={handleDelete} className="p-1.5 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors" title="מחק">
              <Trash2 size={14} />
            </button>
            {playError && <span className="text-xs text-red-500 font-assistant">{playError}</span>}
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

  useEffect(() => { setStatus(hasSaved ? 'saved' : 'idle'); }, [hasSaved]);

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
