"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { articles } from "@/content/articles";
import { getQuizData, type QuizQuestion } from "@/content/quiz-questions";

interface Category {
  slug: string;
  title: string;
  category: string;
  questionCount: number;
}

export default function QuizPageContent() {
  const [phase, setPhase] = useState<"select" | "quiz" | "results">("select");
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const [examTitle, setExamTitle] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [scores, setScores] = useState<boolean[]>([]);

  // Build category list from articles that have quiz data
  const categories: Category[] = useMemo(() => {
    const cats: Category[] = [];
    for (const article of articles) {
      const quiz = getQuizData(article.slug);
      if (quiz) {
        cats.push({
          slug: article.slug,
          title: article.title,
          category: article.category,
          questionCount: quiz.questions.length,
        });
      }
    }
    return cats;
  }, []);

  const totalQuestions = useMemo(
    () => categories.reduce((sum, c) => sum + c.questionCount, 0),
    [categories],
  );

  const allSelected = selectedSlugs.size === categories.length && categories.length > 0;

  const selectedQuestionCount = useMemo(() => {
    if (allSelected) return totalQuestions;
    return categories
      .filter((c) => selectedSlugs.has(c.slug))
      .reduce((sum, c) => sum + c.questionCount, 0);
  }, [selectedSlugs, categories, totalQuestions, allSelected]);

  // Build questions array from selected slugs
  const buildQuestions = useCallback(
    (slugs: Set<string>): QuizQuestion[] => {
      const allSelected = slugs.size === categories.length && categories.length > 0;
      const selectedCats = allSelected
        ? categories
        : categories.filter((c) => slugs.has(c.slug));

      const qs: QuizQuestion[] = [];
      for (const cat of selectedCats) {
        const quiz = getQuizData(cat.slug);
        if (quiz) qs.push(...quiz.questions);
      }

      // Shuffle
      for (let i = qs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qs[i], qs[j]] = [qs[j], qs[i]];
      }
      return qs;
    },
    [categories],
  );

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const question = questions[currentIndex];
  const isComplete = currentIndex >= questions.length;

  const handleSelect = (optionIndex: number) => {
    if (feedback === "correct") return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setFeedback("correct");
      const newScores = [...scores];
      newScores[currentIndex] = true;
      setScores(newScores);
    } else {
      setFeedback("wrong");
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

  const toggleSlug = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedSlugs(new Set());
    } else {
      setSelectedSlugs(new Set(categories.map((c) => c.slug)));
    }
  };

  const startExam = () => {
    const slugs = allSelected
      ? new Set(categories.map((c) => c.slug))
      : selectedSlugs;
    const qs = buildQuestions(slugs);
    setQuestions(qs);
    setScores(Array(qs.length).fill(false));
    setCurrentIndex(0);
    setSelected(null);
    setFeedback(null);
    setPhase("quiz");
  };

  const startSingleTopic = (slug: string) => {
    const qs = buildQuestions(new Set([slug]));
    setQuestions(qs);
    setScores(Array(qs.length).fill(false));
    setCurrentIndex(0);
    setSelected(null);
    setFeedback(null);
    setPhase("quiz");
  };

  const correctCount = scores.filter(Boolean).length;

  // ── Category Selection ──────────────────────────────────────────
  if (phase === "select") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Interview Prep Quiz
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Select one or more topics to build your custom exam.{" "}
            {totalQuestions} questions across {categories.length} topics — same format as real technical interviews.
          </p>
        </div>

        {/* Exam Title (optional) */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
            Name your exam (optional)
          </label>
          <input
            type="text"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            placeholder='e.g. "Java + Architecture interview prep"'
            className="w-full max-w-md px-4 py-2.5 rounded-xl border border-[var(--border)] 
                       bg-[var(--background)] text-sm placeholder:text-[var(--muted-foreground)]
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
          />
        </div>

        {/* All Topics toggle */}
        <button
          onClick={toggleAll}
          className={`w-full text-left p-5 rounded-2xl border-2 transition-all mb-2 group ${
            allSelected
              ? "border-blue-500 bg-blue-500/5"
              : "border-[var(--border)] hover:border-blue-500/30 hover:bg-[var(--accent)]"
          }`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                allSelected
                  ? "border-blue-500 bg-blue-500"
                  : "border-[var(--border)] group-hover:border-blue-500/50"
              }`}
            >
              {allSelected && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <div>
              <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors">
                🎯 All Topics
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {totalQuestions} questions — full interview simulation
              </p>
            </div>
          </div>
        </button>

        {/* Topic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {categories.map((cat) => {
            const isSelected = selectedSlugs.has(cat.slug);
            return (
              <button
                key={cat.slug}
                onClick={() => toggleSlug(cat.slug)}
                className={`text-left p-5 rounded-xl border-2 transition-all group ${
                  isSelected
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-[var(--border)] hover:border-blue-500/30 hover:bg-[var(--accent)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500"
                        : "border-[var(--border)] group-hover:border-blue-500/50"
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                     bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-2">
                      {cat.category}
                    </span>
                    <h3 className="font-semibold mb-1">{cat.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {cat.questionCount} questions
                      </p>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          startSingleTopic(cat.slug);
                        }}
                        className="text-xs text-blue-500 hover:text-blue-600 font-medium px-2 py-1 
                                   rounded-lg hover:bg-blue-500/10 transition-colors"
                      >
                        Quick start →
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Start exam button */}
        <div className="mt-10 text-center">
          <button
            onClick={startExam}
            disabled={selectedSlugs.size === 0 && !allSelected}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold
                       bg-blue-500 text-white hover:bg-blue-600 transition-all
                       shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Start Exam
            {selectedSlugs.size > 0 && !allSelected && (
              <span className="ml-1 opacity-80">
                ({selectedQuestionCount} questions)
              </span>
            )}
          </button>
          {selectedSlugs.size === 0 && (
            <p className="text-xs text-[var(--muted-foreground)] mt-3">
              Select at least one topic to start, or use &quot;Quick start&quot; on any card
            </p>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            ← Back to articles
          </Link>
        </div>
      </div>
    );
  }

  // ── Results ──────────────────────────────────────────────────────
  if (phase === "results" || isComplete) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    const emoji = percentage >= 90 ? "🏆" : percentage >= 70 ? "🎉" : percentage >= 50 ? "👍" : "📚";

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{emoji}</div>
          {examTitle && (
            <p className="text-sm text-[var(--muted-foreground)] mb-2">{examTitle}</p>
          )}
          <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
          <div className="text-5xl font-bold text-blue-500 mb-3">
            {correctCount}/{questions.length}
          </div>
          <p className="text-lg text-[var(--muted-foreground)]">
            {percentage >= 90
              ? "Outstanding! You're interview-ready on these topics."
              : percentage >= 70
                ? "Strong performance. Review the missed questions below."
                : percentage >= 50
                  ? "Good foundation — time to revisit some articles."
                  : "Keep studying! The explanations below will help fill the gaps."}
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={startExam}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg 
                         bg-[var(--foreground)] text-[var(--background)] text-sm font-medium
                         hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry
            </button>
            <button
              onClick={() => setPhase("select")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg 
                         border border-[var(--border)] text-sm font-medium
                         hover:bg-[var(--accent)] transition-colors"
            >
              Choose Another Topic
            </button>
          </div>
        </div>

        {/* Question recap */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Review All Questions</h2>
          {questions.map((q, i) => (
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

  // ── Quiz Session ─────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setPhase("select")}
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          ← Back to topics
        </button>
        <span className="text-sm text-[var(--muted-foreground)]">
          {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {examTitle && (
        <p className="text-xs text-[var(--muted-foreground)] mb-4">{examTitle}</p>
      )}

      {/* Progress bar */}
      <div className="w-full h-2 bg-[var(--border)] rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + (feedback === "correct" ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Score */}
      <div className="text-sm text-[var(--muted-foreground)] mb-6">
        Score: <span className="font-semibold text-[var(--foreground)]">{correctCount}</span> / {currentIndex + (feedback === "correct" ? 1 : 0)} correct
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold mb-6 leading-relaxed">{question.question}</h2>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          let btnClass =
            "w-full text-left px-5 py-4 rounded-xl border text-base leading-relaxed transition-all duration-150 ";

          if (feedback === null || (feedback === "wrong" && selected !== i)) {
            btnClass += "border-[var(--border)] hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer";
          } else if (i === question.correctIndex && feedback === "correct") {
            btnClass += "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400 cursor-default";
          } else if (i === selected && feedback === "wrong") {
            btnClass += "border-red-500 bg-red-500/10 text-red-500 animate-pulse cursor-default";
          } else {
            btnClass += "border-[var(--border)] opacity-50 cursor-default";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={feedback === "correct" || (feedback === "wrong" && selected === i)}
              className={btnClass}
            >
              <span className="inline-flex items-center gap-4">
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 text-sm font-semibold 
                              flex items-center justify-center transition-all ${
                    i === question.correctIndex && feedback === "correct"
                      ? "border-green-500 bg-green-500 text-white"
                      : i === selected && feedback === "wrong"
                        ? "border-red-500 bg-red-500 text-white"
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

      {/* Wrong feedback */}
      {feedback === "wrong" && (
        <div className="flex items-center gap-2 text-sm text-red-500 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Not quite — try again!
        </div>
      )}

      {/* Correct feedback */}
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                     bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold
                     hover:opacity-90 transition-opacity"
        >
          {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      )}
    </div>
  );
}
