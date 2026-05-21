"use client";

import { useState, useMemo } from "react";
import ArticleCard from "@/components/ArticleCard";
import { articles, type ArticleMeta } from "@/content/articles";

const categories = Array.from(new Set(articles.map((a) => a.category)));

export default function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    let result = activeCategory
      ? articles.filter((a) => a.category === activeCategory)
      : articles;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        <p className="text-[var(--muted-foreground)] text-lg">
          Articles on software engineering, tools, and best practices
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles…"
          className="w-full max-w-md pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] 
                     bg-[var(--background)] text-sm placeholder:text-[var(--muted-foreground)]
                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
        />
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
          {searchQuery.trim()
            ? `No articles matching "${searchQuery.trim()}"`
            : "No articles in this category yet."}
        </p>
      )}
    </div>
  );
}
