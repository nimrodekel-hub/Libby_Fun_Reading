import { useEffect, useRef } from 'react';
import LetterExplorer from './LetterExplorer';
import NikudQuiz      from './NikudQuiz';

export default function LessonPage({
  lesson, lessonIdx, totalLessons,
  phase, heardSet, markHeard, canGoToQuiz, goToQuiz,
  question, qIdx, totalQuestions, selected, setSelected,
  qFeedback, submitAnswer,
  score,
}) {
  const quizRef = useRef(null);

  // Auto-scroll to quiz section when phase switches to quiz
  useEffect(() => {
    if (phase === 'quiz') {
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [phase]);

  if (!lesson) return null;

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-rubik
                               bg-gradient-to-br from-magic-lavender via-magic-pink to-magic-cream">

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b-2 border-purple-100 shadow-sm px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Lesson progress */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-purple-500 font-assistant">
              שַׁלַב {lessonIdx + 1} מִתּוֹךְ {totalLessons}
            </span>
            <div className="w-28 h-2.5 bg-purple-100 rounded-full overflow-hidden border border-purple-200">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-700"
                style={{ width: `${((lessonIdx + (phase === 'quiz' ? 0.5 : 0)) / totalLessons) * 100}%` }}
              />
            </div>
          </div>

          {/* Letter name */}
          <div className="text-center">
            <span className="text-2xl font-black text-purple-800 font-rubik" dir="rtl">{lesson.base}</span>
            <span className="text-sm text-purple-500 font-assistant mr-1">{lesson.emoji} {lesson.name}</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 bg-amber-100 border-2 border-amber-300 rounded-full px-3 py-1">
            <span className="text-lg">👑</span>
            <span className="font-black text-amber-700 text-lg">{score}</span>
          </div>
        </div>

        {/* Phase indicator */}
        <div className="max-w-lg mx-auto flex gap-2 mt-2">
          <div className={`flex-1 py-1 rounded-full text-center text-xs font-bold transition-all ${
            phase === 'explore' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-400'}`}>
            1 · גִּלּוּי
          </div>
          <div className={`flex-1 py-1 rounded-full text-center text-xs font-bold transition-all ${
            phase === 'quiz' ? 'bg-pink-500 text-white' : 'bg-purple-100 text-purple-400'}`}>
            2 · שְׁאֵלוֹן
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Explore section — always visible */}
        <LetterExplorer
          lesson={lesson}
          heardSet={heardSet}
          onHear={markHeard}
          onGoToQuiz={goToQuiz}
          canGoToQuiz={canGoToQuiz}
        />

        {/* Divider — only when quiz is available */}
        {phase === 'quiz' && (
          <>
            <div className="flex items-center gap-3 px-6 my-2">
              <div className="flex-1 h-px bg-purple-200" />
              <span className="text-purple-400 text-sm font-bold font-rubik">✏️ שְׁאֵלוֹן</span>
              <div className="flex-1 h-px bg-purple-200" />
            </div>

            {/* Quiz section */}
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
          </>
        )}
      </div>
    </div>
  );
}
