import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { articles, type ArticleMeta } from "@/content/articles";

// Build a map of normalized category slugs
function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function getCategoryName(slug: string): string | null {
  for (const article of articles) {
    if (getCategorySlug(article.category) === slug) {
      return article.category;
    }
  }
  return null;
}

const categoryDescriptions: Record<string, string> = {
  java: "Deep dives into Java — concurrency, immutability, hashcodes, dependency injection, and modern language features.",
  architecture: "Software architecture patterns, domain-driven design, ACID transactions, and system design principles.",
  git: "Practical Git workflows, aliases, .gitignore, and version control best practices.",
  ai: "Building AI tools, MCP servers, and practical applications of AI in software engineering.",
};

export function generateStaticParams() {
  const slugs = new Set(
    articles.map((a) => getCategorySlug(a.category))
  );
  return Array.from(slugs).map((slug) => ({ name: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const categoryName = getCategoryName(name);
  if (!categoryName) return { title: "Not Found" };

  const desc = categoryDescriptions[name] || `${categoryName} articles on DailyRefactor.`;

  return {
    title: categoryName,
    description: desc,
    alternates: {
      canonical: `https://dailyrefactor.dev/blog/category/${name}`,
    },
    openGraph: {
      title: `${categoryName} Articles | DailyRefactor`,
      description: desc,
      url: `https://dailyrefactor.dev/blog/category/${name}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      creator: "@atascg",
      title: `${categoryName} Articles | DailyRefactor`,
      description: desc,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const categoryName = getCategoryName(name);
  if (!categoryName) notFound();

  const filtered = articles.filter(
    (a) => getCategorySlug(a.category) === name
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] 
                   hover:text-[var(--foreground)] transition-colors mb-8 group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0l7 7m-7-7l7-7" />
        </svg>
        Back to Blog
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                           bg-blue-500/10 text-blue-500 border border-blue-500/20">
            {categoryName}
          </span>
          <span className="text-sm text-[var(--muted-foreground)]">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">{categoryName}</h1>
        <p className="text-[var(--muted-foreground)] text-lg">
          {categoryDescriptions[name] || `Articles about ${categoryName.toLowerCase()} on DailyRefactor.`}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article: ArticleMeta) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
