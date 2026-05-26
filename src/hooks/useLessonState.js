import { useState, useCallback } from 'react';
import { shuffleLessons, generateQuestions } from '../data/curriculum';

export function useLessonState() {
  const [lessons]       = useState(shuffleLessons);
  const [lessonIdx,  setLessonIdx]  = useState(0);
  const [phase,      setPhase]      = useState('explore'); // explore | quiz | done
  const [heardSet,   setHeardSet]   = useState(new Set());
  const [questions,  setQuestions]  = useState([]);
  const [qIdx,       setQIdx]       = useState(0);
  const [selected,   setSelected]   = useState(null);   // nikudType string
  const [qFeedback,  setQFeedback]  = useState(null);   // 'correct' | 'wrong' | null
  const [score,      setScore]      = useState(0);
  const [totalRight, setTotalRight] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);

  const lesson  = lessons[lessonIdx] ?? null;
  const question = questions[qIdx]  ?? null;

  // Mark a nikud as heard during explore
  const markHeard = useCallback((nikudType) => {
    setHeardSet(prev => new Set([...prev, nikudType]));
  }, []);

  // Transition from explore → quiz
  const goToQuiz = useCallback(() => {
    if (!lesson) return;
    setQuestions(generateQuestions(lesson));
    setQIdx(0);
    setSelected(null);
    setQFeedback(null);
    setPhase('quiz');
  }, [lesson]);

  // Submit current quiz answer
  const submitAnswer = useCallback(() => {
    if (!question || !selected || qFeedback) return;
    const correct = selected === question.targetType;
    setScore(s => s + (correct ? 3 : -1));
    if (correct) setTotalRight(n => n + 1); else setTotalWrong(n => n + 1);
    setQFeedback(correct ? 'correct' : 'wrong');

    setTimeout(() => {
      setQFeedback(null);
      setSelected(null);
      const nextQ = qIdx + 1;
      if (nextQ < questions.length) {
        setQIdx(nextQ);
      } else {
        // Move to next lesson
        const nextL = lessonIdx + 1;
        if (nextL < lessons.length) {
          setLessonIdx(nextL);
          setHeardSet(new Set());
          setPhase('explore');
          setQuestions([]);
          setQIdx(0);
        } else {
          setPhase('done');
        }
      }
    }, 1200);
  }, [question, selected, qFeedback, qIdx, questions.length, lessonIdx, lessons.length]);

  const restart = useCallback(() => {
    setLessonIdx(0);
    setPhase('explore');
    setHeardSet(new Set());
    setQuestions([]);
    setQIdx(0);
    setSelected(null);
    setQFeedback(null);
    setScore(0);
    setTotalRight(0);
    setTotalWrong(0);
  }, []);

  return {
    lesson, lessonIdx, totalLessons: lessons.length,
    phase,
    heardSet, markHeard, canGoToQuiz: heardSet.size >= 2,
    goToQuiz,
    question, qIdx, totalQuestions: questions.length,
    selected, setSelected,
    qFeedback,
    submitAnswer,
    score, totalRight, totalWrong,
    restart,
  };
}
