import ArticleCard from "@/components/ArticleCard";
import { articles, type ArticleMeta } from "@/content/articles";

const categories = Array.from(new Set(articles.map((a) => a.category)));

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        <p className="text-[var(--muted-foreground)] text-lg">
          Articles on software engineering, tools, and best practices
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium">
          All
        </span>
        {categories.map((category) => (
          <span
            key={category}
            className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] 
                       text-sm font-medium text-[var(--muted-foreground)] cursor-pointer
                       hover:border-blue-500/30 hover:text-[var(--foreground)] transition-colors"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: ArticleMeta) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
