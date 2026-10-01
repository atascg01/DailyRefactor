"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { articles } from "@/content/articles";
import { getQuizData, type QuizQuestion } from "@/content/quiz-questions";
import QuizSession from "@/components/QuizSession";

const topics = articles.flatMap((article) => {
  const quiz = getQuizData(article.slug);
  return quiz?.questions.length ? [{ ...article, questionCount: quiz.questions.length }] : [];
});

function buildQuestions(slugs: string[]): QuizQuestion[] {
  const questions = slugs.flatMap((slug) => getQuizData(slug)?.questions ?? []);
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

export default function QuizPageContent() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [session, setSession] = useState<{ id: number; slugs: string[]; questions: QuizQuestion[] } | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const sessionId = session?.id;
  useEffect(() => {
    if (sessionId !== undefined) {
      pageRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }, [sessionId]);
  const allSelected = topics.length > 0 && selectedSlugs.length === topics.length;
  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questionCount, 0);
  const selectedCount = topics.filter((topic) => selectedSlugs.includes(topic.slug)).reduce((sum, topic) => sum + topic.questionCount, 0);

  const start = (slugs: string[]) => {
    const questions = buildQuestions(slugs);
    if (!questions.length) return;
    setSession((previous) => ({ id: (previous?.id ?? 0) + 1, slugs: [...slugs], questions }));
  };
  const toggle = (slug: string) => setSelectedSlugs((previous) => previous.includes(slug)
    ? previous.filter((item) => item !== slug) : [...previous, slug]);

  return (
    <div ref={pageRef} className="quiz-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="page-title mb-6">Interview Prep Quiz</h1>
      {session ? (
        <QuizSession key={session.id} title="Your practice session" questions={session.questions}
          onBack={() => setSession(null)} onRetry={() => start(session.slugs)} />
      ) : (
        <>
          <p className="text-[var(--muted-foreground)] mb-8">Select one or more topics to build your exam. {totalQuestions} questions across {topics.length} topics.</p>
          <button aria-pressed={allSelected} onClick={() => setSelectedSlugs(allSelected ? [] : topics.map((topic) => topic.slug))}
            className="w-full rounded-xl border border-[var(--border)] p-4 text-left font-semibold mb-4">
            {allSelected ? "✓ " : ""}All Topics · {totalQuestions} questions
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((topic) => {
              const selected = selectedSlugs.includes(topic.slug);
              return (
                <div key={topic.slug} className={`topic-card rounded-lg border overflow-hidden ${selected ? "border-stone-500 bg-stone-500/5" : "border-[var(--border)]"}`}>
                  <button aria-pressed={selected} onClick={() => toggle(topic.slug)} className="w-full text-left p-5 hover:bg-[var(--accent)]">
                    <span className="text-xs text-[var(--link)]">{topic.category}</span>
                    <span className="block font-semibold mt-2">{selected ? "✓ " : ""}{topic.title}</span>
                    <span className="block text-sm text-[var(--muted-foreground)] mt-2">{topic.questionCount} questions</span>
                  </button>
                  <button aria-label={`Quick start: ${topic.title}`} onClick={() => start([topic.slug])}
                    className="block text-sm text-[var(--link)] px-5 py-3 hover:underline">Quick start →</button>
                </div>
              );
            })}
          </div>
          <button disabled={!selectedCount} onClick={() => start(selectedSlugs)} className="mt-8 rounded-xl bg-stone-600 text-white px-6 py-3 disabled:opacity-40">
            Start Exam ({selectedCount} questions)
          </button>
          {!selectedCount && <p className="text-sm text-[var(--muted-foreground)] mt-3">Select at least one topic, or use Quick start.</p>}
        </>
      )}
      <Link href="/blog" className="inline-block mt-10 text-sm text-[var(--link)]">← Back to articles</Link>
    </div>
  );
}
