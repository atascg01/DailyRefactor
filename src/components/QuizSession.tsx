"use client";

import { useReducer } from "react";
import type { QuizQuestion } from "@/content/quiz-questions";
import { createQuizState, quizReducer } from "@/lib/quiz-state";

interface QuizSessionProps {
  title: string;
  questions: QuizQuestion[];
  onBack?: () => void;
  onRetry?: () => void;
}

export default function QuizSession({ title, questions, onBack, onRetry }: QuizSessionProps) {
  const [state, dispatch] = useReducer(quizReducer, questions.length, createQuizState);
  if (questions.length === 0) return <p>No questions available for this topic.</p>;
  const correctCount = state.answers.filter((answer, index) => answer === questions[index].correctIndex).length;
  const complete = state.currentIndex >= questions.length;

  if (complete) {
    const percentage = Math.round(correctCount / questions.length * 100);
    return (
      <section aria-label={`${title} results`} className="space-y-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--accent)] p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Quiz Complete!</h2>
          <p className="text-4xl font-bold text-[var(--link)] mb-3">{correctCount}/{questions.length}</p>
          <p className="text-[var(--muted-foreground)]">{percentage >= 90 ? "Outstanding! You've mastered these topics." : percentage >= 70 ? "Strong performance. Review the missed questions below." : "Review the explanations below, then try again."}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button onClick={() => onRetry ? onRetry() : dispatch({ type: "restart" })} className="rounded-lg bg-stone-600 text-white px-5 py-2.5">Retry Quiz</button>
            {onBack && <button onClick={onBack} className="rounded-lg border border-[var(--border)] px-5 py-2.5">Choose Another Topic</button>}
          </div>
        </div>
        <h3 className="text-xl font-bold">Review All Questions</h3>
        {questions.map((question, index) => {
          const correct = state.answers[index] === question.correctIndex;
          return (
            <div key={index} className={`rounded-xl border p-5 ${correct ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
              <h4 className="font-semibold mb-3">{correct ? "✓" : "✗"} Q{index + 1}. {question.question}</h4>
              <p className="text-sm mb-2">Your answer: {question.options[state.answers[index]!]}</p>
              <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Correct answer: {question.options[question.correctIndex]}</p>
              <p className="text-sm text-[var(--muted-foreground)]">{question.explanation}</p>
            </div>
          );
        })}
      </section>
    );
  }

  const question = questions[state.currentIndex];
  const selected = state.answers[state.currentIndex];
  const answered = selected !== null;
  const correct = selected === question.correctIndex;
  const answeredCount = state.currentIndex + (answered ? 1 : 0);
  return (
    <section aria-label={title}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {onBack && <button onClick={onBack} className="text-sm text-[var(--link)]">Back to topics</button>}
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-3">Question {state.currentIndex + 1} of {questions.length} · Score: {correctCount}/{answeredCount} correct</p>
      <div role="progressbar" aria-label="Quiz progress" aria-valuenow={answeredCount} aria-valuemin={0} aria-valuemax={questions.length} className="h-2 bg-[var(--border)] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-stone-500 transition-all" style={{ width: `${answeredCount / questions.length * 100}%` }} />
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mb-5">Your first answer counts toward your score.</p>
      <h3 key={state.currentIndex} className="question-enter text-xl font-medium leading-relaxed mb-6">{question.question}</h3>
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button key={index} disabled={answered} onClick={() => dispatch({ type: "answer", option: index, optionCount: question.options.length })}
            className={`w-full text-left rounded-xl border px-4 py-3 text-sm quiz-option disabled:cursor-default ${answered && index === question.correctIndex ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400" : answered && index === selected ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400" : "border-[var(--border)] enabled:hover:bg-stone-500/5 enabled:hover:border-stone-500/50"}`}>
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
      {answered && <>
        <div role="status" className={`rounded-xl border p-5 mb-5 ${correct ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
          <p className="font-semibold mb-2">{correct ? "Correct!" : "Not quite."}</p>
          {!correct && <p className="text-sm mb-2">Correct answer: {question.options[question.correctIndex]}</p>}
          <p className="text-sm text-[var(--muted-foreground)]">{question.explanation}</p>
        </div>
        <button onClick={() => dispatch({ type: "next" })} className="rounded-lg bg-stone-600 text-white px-5 py-2.5">{state.currentIndex === questions.length - 1 ? "See Results" : "Next Question"}</button>
      </>}
    </section>
  );
}
