import Link from "next/link";
import Image from "next/image";
import { articles, type ArticleMeta } from "@/content/articles";

export default function NextArticle({ slug }: { slug: string }) {
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  if (currentIndex === -1) return null;

  const next = articles[currentIndex + 1];
  if (!next) return null;

  return (
    <div className="border-t border-[var(--border)] pt-10 mt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
        Next article
      </p>
      <Link
        href={`/blog/${next.slug}`}
        className="group block rounded-2xl border border-[var(--border)] 
                   hover:border-blue-500/30 hover:bg-[var(--accent)] transition-all overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-48 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
            <Image
              src={next.image}
              alt={next.title}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
          <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                               bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {next.category}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">{next.readTime}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
              {next.title}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
              {next.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
