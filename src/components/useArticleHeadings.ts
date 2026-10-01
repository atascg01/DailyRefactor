"use client";

import { useEffect, useState } from "react";

export interface HeadingItem { id: string; text: string; level: number }

export function useArticleHeadings(): HeadingItem[] {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  useEffect(() => {
    // Read the committed MDX DOM in the next frame, shared by both TOC views.
    const frame = requestAnimationFrame(() => {
      const elements = document.querySelectorAll("article.prose h2[id], article.prose h3[id]");
      setHeadings(Array.from(elements, (element) => ({
        id: element.id, text: element.textContent ?? "", level: element.tagName === "H2" ? 2 : 3,
      })));
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return headings;
}
