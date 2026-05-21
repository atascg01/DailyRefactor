import Link from "next/link";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { articles } from "@/content/articles";
import { getQuizData } from "@/content/quiz-questions";

export default function Home() {
  const featuredArticles = articles.slice(0, 6);
  const totalQuestions = articles.reduce((sum, a) => {
    const quiz = getQuizData(a.slug);
    return sum + (quiz?.questions.length ?? 0);
  }, 0);

  return (
    <>
      <Hero />

      {/* Featured Articles */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Articles</h2>
              <p className="mt-2 text-[var(--muted-foreground)]">
                Deep dives into software engineering, tools, and best practices
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)]
                         text-sm font-medium text-[var(--foreground)] hover:border-blue-500/40 hover:text-blue-500
                         hover:bg-blue-500/5 transition-all group"
            >
              View All
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[var(--border)]
                         text-sm font-medium text-[var(--foreground)] hover:border-blue-500/40 hover:text-blue-500
                         hover:bg-blue-500/5 transition-all group"
            >
              View All Articles
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Interview Prep Quiz CTA */}
      <section className="border-t border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/quiz"
            className="block rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-transparent 
                       p-6 md:p-8 hover:border-blue-500/60 hover:from-blue-500/10 transition-all group"
          >
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-4xl">🧠</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-blue-500 transition-colors">
                  Interview Prep Quiz
                </h2>
                <p className="text-[var(--muted-foreground)]">
                  {totalQuestions} technical questions across {articles.filter(a => getQuizData(a.slug)).length} topics — test your knowledge and spot the gaps
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold 
                               group-hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">
                Start Quiz
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay in the loop</h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            New articles on software engineering, Java, DevOps, and career insights — delivered fresh every week.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
