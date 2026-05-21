"use client";

import { useState, useEffect, useCallback } from "react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from the article content
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("article.prose");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: HeadingItem[] = [];

    elements.forEach((el) => {
      if (el.id) {
        items.push({
          id: el.id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      }
    });

    setHeadings(items);
  }, []);

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that's currently intersecting (visible)
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            return;
          }
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px", // Adjusts when a heading is considered "active"
        threshold: 0,
      }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="hidden xl:block sticky top-24 w-56 flex-shrink-0 self-start max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
        On this page
      </h4>
      <ul className="space-y-1 border-l-2 border-[var(--border)]">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`
                block py-1.5 text-sm transition-all duration-150 border-l-2 -ml-[2px]
                ${
                  heading.level === 3 ? "pl-6" : "pl-4"
                }
                ${
                  activeId === heading.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)]"
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
