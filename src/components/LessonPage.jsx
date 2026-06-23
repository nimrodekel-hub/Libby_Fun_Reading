import { useEffect, useRef } from 'react';
import LetterExplorer  from './LetterExplorer';

const APP_VERSION = 30;
import NikudQuiz       from './NikudQuiz';
import SpeechChallenge from './SpeechChallenge';
import MagicBackground from './MagicBackground';

export default function LessonPage({
  lesson, lessonIdx, totalLessons,
  phase, heardSet, markHeard, canGoToQuiz, goToQuiz,
  question, qIdx, totalQuestions, selected, setSelected,
  qFeedback, submitAnswer,
  onSpeechComplete,
  score,
  onScoreTap,
  onOpenSoundLab,
}) {
  const quizRef   = useRef(null);
  const speechRef = useRef(null);

  useEffect(() => {
    if (phase === 'quiz')   setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    if (phase === 'speech') setTimeout(() => speechRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [phase]);

  if (!lesson) return null;

  const progress = ((lessonIdx + (phase !== 'explore' ? 0.5 : 0)) / totalLessons) * 100;

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-rubik overflow-x-hidden relative"
         style={{ background: 'linear-gradient(160deg, #3b0764 0%, #6d28d9 35%, #9d174d 70%, #1e1b4b 100%)' }}>
      <MagicBackground />

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-20 px-4 py-3"
           style={{ background: 'rgba(15, 8, 40, 0.82)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(167,139,250,0.25)' }}>
        <div className="max-w-lg mx-auto flex items-center justify-between gap-2">

          {/* Lesson progress */}
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-300 font-assistant whitespace-nowrap">
                שַׁלַב {lessonIdx + 1} / {totalLessons}
              </span>
              <span className="text-xs font-bold text-purple-600 font-assistant">v{APP_VERSION}</span>
            </div>
            <div className="w-24 h-3 rounded-full overflow-hidden"
                 style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #a855f7, #f472b6)',
                  boxShadow: '0 0 8px rgba(168,85,247,0.7)',
                }}
              />
            </div>
          </div>

          {/* Letter badge */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black font-rubik text-white text-3xl"
                 style={{
                   background: 'rgba(255,255,255,0.15)',
                   border: '2px solid rgba(255,255,255,0.3)',
                   boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                   direction: 'rtl',
                 }}
                 dir="rtl">
              {lesson.base}
            </div>
            <span className="text-xs text-purple-300 font-assistant mt-0.5">{lesson.emoji} {lesson.name}</span>
          </div>

          {/* Score — tap 5× rapidly to open parent recording studio */}
          <button
            onClick={onScoreTap}
            className="flex items-center gap-1.5 rounded-2xl px-3 py-2 font-black text-white text-xl shrink-0 active:scale-95 transition-transform"
            style={{
              background: 'rgba(0,0,0,0.35)',
              border: '2px solid rgba(251,191,36,0.65)',
              boxShadow: '0 0 16px rgba(251,191,36,0.3)',
            }}
          >
            <span className="text-2xl">👑</span>
            <span>{score}</span>
          </button>
        </div>

        {/* Phase tabs */}
        <div className="max-w-lg mx-auto flex gap-2 mt-2">
          {[
            { key: 'explore', label: '1 · גִּלּוּי 🔍' },
            { key: 'quiz',    label: '2 · שְׁאֵלוֹן ✏️' },
            { key: 'speech',  label: '3 · קְרִיאָה 🎤' },
          ].map(({ key, label }) => (
            <div key={key}
                 className={`flex-1 py-1.5 rounded-full text-center text-xs font-bold transition-all duration-300 ${
                   phase === key ? 'text-white shadow-lg scale-105' : 'text-purple-400'
                 }`}
                 style={phase === key
                   ? { background: 'linear-gradient(to right, #9333ea, #ec4899)', boxShadow: '0 4px 16px rgba(147,51,234,0.5)' }
                   : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {label}
            </div>
          ))}
        </div>

        {/* Sound Lab — kid-facing entry to focused ש/ס/צ pronunciation practice */}
        <button
          onClick={onOpenSoundLab}
          className="max-w-lg mx-auto w-full mt-2 py-2 rounded-full text-white font-black font-rubik text-sm
                     active:scale-95 transition-transform flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(to right, #059669, #ec4899, #7c3aed)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          🗣️ מַעְבְּדַת הַצְּלִילִים — תַּרְגְּלִי ס · שׁ · צ
        </button>

        {/* Parent hint — small, tucked under button */}
        <p className="max-w-lg mx-auto text-center font-assistant mt-1"
           style={{ fontSize: '10px', color: 'rgba(167,139,250,0.55)' }}>
          הורים: לחצו 5× על 👑 לאולפן ההקלטות 🎙️
        </p>
      </div>

      {/* ── Page body ── */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <LetterExplorer
          lesson={lesson}
          heardSet={heardSet}
          onHear={markHeard}
          onGoToQuiz={goToQuiz}
          canGoToQuiz={canGoToQuiz}
        />

        {(phase === 'quiz' || phase === 'speech') && (
          <div className="mx-3 mb-3 rounded-3xl overflow-hidden shadow-2xl"
               style={{ background: 'rgba(255,255,255,0.97)' }}>
            <Divider label="✏️ שְׁאֵלוֹן" />
            <div ref={quizRef}>
              {question && (
                <NikudQuiz
                  question={question}
                  selected={selected}
                  onSelect={setSelected}
                  onSubmit={submitAnswer}
                  feedback={qFeedback}
                  qIdx={qIdx}
                  totalQ={totalQuestions}
                />
              )}
            </div>
          </div>
        )}

        {phase === 'speech' && (
          <div className="mx-3 mb-6 rounded-3xl overflow-hidden shadow-2xl"
               style={{ background: 'rgba(255,255,255,0.97)' }}>
            <Divider label="🎤 קְרִיאָה בְּקוֹל" />
            <div ref={speechRef}>
              <SpeechChallenge lesson={lesson} onComplete={onSpeechComplete} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,181,253,0.6))' }} />
      <span className="text-purple-500 text-sm font-bold font-rubik">{label}</span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,181,253,0.6))' }} />
    </div>
  );
}
