import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, articles } from "@/content/articles";
import ShareSection from "@/components/ShareSection";

export function generateStaticParams() {
  return articles.map((a) => ({ id: String(a.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(parseInt(id));
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

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = parseInt(id);
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
      <ShareSection title={article.title} articleId={article.id} />
    </div>
  );
}
