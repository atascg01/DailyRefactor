import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { articles } from "@/content/articles";

export default function Home() {
  const featuredArticles = articles.slice(0, 6);

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
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
