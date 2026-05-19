"use client";

import { useState } from "react";
import { getQuizData } from "@/content/quiz-questions";

interface QuizProps {
  slug: string;
}

export default function Quiz({ slug }: QuizProps) {
  const quiz = getQuizData(slug);

  if (!quiz) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [scores, setScores] = useState<boolean[]>(Array(quiz.questions.length).fill(false));

  const question = quiz.questions[currentIndex];
  const isComplete = currentIndex >= quiz.questions.length;

  const handleSelect = (optionIndex: number) => {
    if (feedback === "correct") return; // already answered correctly, wait for Next

    setSelected(optionIndex);

    if (optionIndex === question.correctIndex) {
      setFeedback("correct");
      const newScores = [...scores];
      newScores[currentIndex] = true;
      setScores(newScores);
    } else {
      setFeedback("wrong");
      // Let the "try again" show briefly, then reset
      setTimeout(() => {
        setFeedback(null);
        setSelected(null);
      }, 1200);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback(null);
    setCurrentIndex((prev) => prev + 1);
  };

  if (isComplete) {
    const correctCount = scores.filter(Boolean).length;
    const total = quiz.questions.length;
    const allCorrect = correctCount === total;

    return (
      <div className="border-t border-[var(--border)] pt-10 mt-12">
        <h2 className="text-xl font-bold mb-6">{quiz.title} — Results</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--accent)] p-8 text-center">
          <div className="text-5xl mb-4">{allCorrect ? "🎉" : correctCount >= total / 2 ? "👍" : "📚"}</div>
          <p className="text-2xl font-bold mb-2">
            {correctCount} / {total}
          </p>
          <p className="text-[var(--muted-foreground)] mb-6">
            {allCorrect
              ? "Perfect score! You've mastered this topic."
              : correctCount >= total / 2
                ? "Solid understanding! Review the ones you missed below."
                : "Time to re-read the article — the explanations below will help."}
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelected(null);
              setFeedback(null);
              setScores(Array(total).fill(false));
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg 
                       bg-[var(--foreground)] text-[var(--background)] text-sm font-medium
                       hover:opacity-90 transition-opacity"
          >
            Retry Quiz
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Show all questions with answers below */}
        <div className="mt-8 space-y-6">
          {quiz.questions.map((q, i) => (
            <div
              key={i}
              className={`rounded-xl border p-5 ${
                scores[i]
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-red-500/20 bg-red-500/5"
              }`}
            >
              <p className="text-sm font-medium mb-3">
                <span className={scores[i] ? "text-green-500" : "text-red-500"}>
                  {scores[i] ? "✓" : "✗"}
                </span>{" "}
                Q{i + 1}. {q.question}
              </p>
              <div className="space-y-1 mb-3">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`text-sm px-3 py-1.5 rounded-md ${
                      j === q.correctIndex
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 font-medium"
                        : j === (scores[i] ? -1 : -1)
                          ? ""
                          : ""
                    } ${
                      !scores[i] && j === q.correctIndex
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 font-medium"
                        : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    {j === q.correctIndex ? "✓ " : "  "}{opt}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-[var(--border)] pt-10 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{quiz.title}</h2>
        <span className="text-sm text-[var(--muted-foreground)]">
          {currentIndex + 1} of {quiz.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[var(--border)] rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + (feedback === "correct" ? 1 : 0)) / quiz.questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-lg font-semibold mb-5 leading-relaxed">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          let buttonStyle =
            "w-full text-left px-4 py-3 rounded-lg border text-sm leading-relaxed transition-all duration-150 ";

          if (feedback === null || (feedback === "wrong" && selected !== i)) {
            buttonStyle +=
              "border-[var(--border)] hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer";
          } else if (i === question.correctIndex && feedback === "correct") {
            buttonStyle +=
              "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 cursor-default";
          } else if (i === selected && feedback === "wrong") {
            buttonStyle +=
              "border-red-500 bg-red-500/10 text-red-500 animate-pulse cursor-default";
          } else {
            buttonStyle += "border-[var(--border)] opacity-50 cursor-default";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={feedback === "correct" || (feedback === "wrong" && selected === i)}
              className={buttonStyle}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border text-xs font-medium flex items-center justify-center ${
                    i === question.correctIndex && feedback === "correct"
                      ? "border-green-500 text-green-500"
                      : i === selected && feedback === "wrong"
                        ? "border-red-500 text-red-500"
                        : "border-[var(--border)] text-[var(--muted-foreground)]"
                  }`}
                >
                  {i === question.correctIndex && feedback === "correct"
                    ? "✓"
                    : i === selected && feedback === "wrong"
                      ? "✗"
                      : String.fromCharCode(65 + i)}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback === "wrong" && (
        <div className="flex items-center gap-2 text-sm text-red-500 mb-4 animate-fadeIn">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Not quite — try again!
        </div>
      )}

      {feedback === "correct" && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Correct!
          </div>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {feedback === "correct" && (
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg 
                     bg-[var(--foreground)] text-[var(--background)] text-sm font-medium
                     hover:opacity-90 transition-opacity"
        >
          {currentIndex < quiz.questions.length - 1 ? "Next Question" : "See Results"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      )}
    </div>
  );
}
