"use client";

import { useState, useCallback } from "react";
import { useArticleHeadings } from "./useArticleHeadings";

export default function MobileTOC() {
  const headings = useArticleHeadings();
  const [open, setOpen] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setOpen(false);
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="lg:hidden mb-8">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-toc"
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                   border border-[var(--border)] bg-[var(--card)] text-sm font-medium
                   hover:border-stone-500/30 transition-colors"
      >
        <span>On this page</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <nav id="mobile-toc" aria-label="Table of Contents" className="mt-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <ul className="space-y-1">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  className={`block py-1.5 text-sm text-[var(--muted-foreground)]
                              hover:text-[var(--foreground)] transition-colors
                              ${h.level === 3 ? "pl-5" : ""}`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
