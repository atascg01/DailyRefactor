import { getQuizData } from "@/content/quiz-questions";
import QuizSession from "@/components/QuizSession";

export default function Quiz({ slug }: { slug: string }) {
  const quiz = getQuizData(slug);
  if (!quiz) return null;
  return (
    <div className="border-t border-[var(--border)] pt-10 mt-12">
      <QuizSession key={slug} title={quiz.title} questions={quiz.questions} />
    </div>
  );
}
