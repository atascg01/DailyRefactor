import Link from "next/link";
import { getCategorySlug } from "@/lib/site";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: { name: string; avatar: string };
}

export default function ArticleCard({ slug, title, excerpt, category, date, readTime }: ArticleCardProps) {
  return (
    <article className="journal-card group relative flex flex-col h-full">
      <div className="card-rule" />
      <div className="card-meta">
        <Link href={"/blog/category/" + getCategorySlug(category)} className="relative z-10">{category}</Link>
        <span>{readTime}</span>
      </div>
      <h3>
        <Link href={"/blog/" + slug} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[var(--ring)]">
          {title}
        </Link>
      </h3>
      <p className="card-excerpt">{excerpt}</p>
      <div className="card-bottom"><span>{date}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
    </article>
  );
}
