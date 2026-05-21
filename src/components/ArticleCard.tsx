"use client";

import Image from "next/image";
import Link from "next/link";

function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export default function ArticleCard({ slug, title, excerpt, category, date, readTime, image, author }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article
        className="relative h-full rounded-2xl overflow-hidden border border-[var(--border)] 
                    bg-[var(--card)] hover:border-blue-500/30 transition-all duration-300
                    hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href={`/blog/category/${getCategorySlug(category)}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                           bg-blue-500/10 text-blue-500 border border-blue-500/20
                           hover:bg-blue-500/20 transition-colors"
            >
              {category}
            </Link>
            <span className="text-xs text-[var(--muted-foreground)]">{readTime}</span>
          </div>

          <h3 className="text-lg font-semibold mb-2 leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-[var(--muted-foreground)] mb-4 flex-grow line-clamp-2">
            {excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[var(--border)]">
            <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-[var(--border)]">
              <Image src={author.avatar} alt={author.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">{author.name}</span>
              <span className="text-xs text-[var(--muted-foreground)]">{date}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
