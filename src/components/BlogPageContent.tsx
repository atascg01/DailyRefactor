"use client";

import { useState, useMemo } from "react";
import ArticleCard from "@/components/ArticleCard";
import { articles, type ArticleMeta } from "@/content/articles";

const categories = Array.from(new Set(articles.map((a) => a.category)));

export default function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(
    () =>
      activeCategory
        ? articles.filter((a) => a.category === activeCategory)
        : articles,
    [activeCategory],
  );

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
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-blue-600 text-white"
              : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-blue-500/30 hover:text-[var(--foreground)]"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-blue-500/30 hover:text-[var(--foreground)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article: ArticleMeta) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <p className="text-center py-16 text-[var(--muted-foreground)]">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}
