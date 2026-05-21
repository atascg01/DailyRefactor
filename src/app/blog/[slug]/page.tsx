import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, articles } from "@/content/articles";
import ShareSection from "@/components/ShareSection";
import JsonLd from "@/components/JsonLd";
import TableOfContents from "@/components/TableOfContents";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };

  const url = `https://dailyrefactor.dev/blog/${slug}`;
  const publishedTime = new Date(article.date).toISOString();

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      url,
      type: "article",
      publishedTime,
      authors: [article.author.name],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@atascg",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { default: MDXContent } = await import(
    `@/content/blog/${article.slug}.mdx`
  );

  const url = `https://dailyrefactor.dev/blog/${slug}`;

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://dailyrefactor.dev" },
          { name: "Blog", url: "https://dailyrefactor.dev/blog" },
          { name: article.title, url },
        ])}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-8"
        >
          <Link
            href="/"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Home
          </Link>
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link
            href="/blog"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Blog
          </Link>
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-[var(--foreground)] truncate max-w-[200px] sm:max-w-[400px]">
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                           bg-blue-500/10 text-blue-500 border border-blue-500/20"
            >
              {article.category}
            </span>
            <span className="text-sm text-[var(--muted-foreground)]">
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{article.author.name}</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                {article.author.role} ·{" "}
                <time dateTime={new Date(article.date).toISOString()}>
                  {article.date}
                </time>
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden border border-[var(--border)]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content + TOC sidebar */}
        <div className="flex gap-10 xl:gap-16">
          {/* Main content column */}
          <div className="min-w-0 flex-1">
            <article className="prose prose-lg dark:prose-invert max-w-none mb-16">
              <MDXContent />
            </article>

            {/* Share */}
            <ShareSection title={article.title} slug={article.slug} />
          </div>

          {/* TOC sidebar */}
          <TableOfContents />
        </div>
      </div>
    </>
  );
}
