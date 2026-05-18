import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, articles } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ id: String(a.id) }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = getArticle(parseInt(params.id));
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const articleId = parseInt(params.id);
  const article = getArticle(articleId);

  if (!article) {
    notFound();
  }

  const { default: MDXContent } = await import(
    `@/content/blog/${article.slug}.mdx`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] 
                   hover:text-[var(--foreground)] transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0l7 7m-7-7l7-7" />
        </svg>
        Back to Blog
      </Link>

      {/* Article Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                         bg-blue-500/10 text-blue-500 border border-blue-500/20">
            {article.category}
          </span>
          <span className="text-sm text-[var(--muted-foreground)]">{article.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
          {article.title}
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
            <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium">{article.author.name}</p>
            <p className="text-sm text-[var(--muted-foreground)]">
              {article.author.role} · {article.date}
            </p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden border border-[var(--border)]">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
      </div>

      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none mb-16">
        <MDXContent />
      </article>

      {/* Share */}
      <div className="border-t border-[var(--border)] pt-8">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const url = `https://dailyrefactor.com/blog/${article.id}`;
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`, "_blank");
            }}
            className="p-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
            aria-label="Share on X"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://dailyrefactor.com/blog/${article.id}`);
            }}
            className="p-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
            aria-label="Copy link"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
