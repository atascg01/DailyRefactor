"use client";

import { useState } from "react";

interface ShareTopProps {
  title: string;
  slug: string;
}

export default function ShareTop({ title, slug }: ShareTopProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://dailyrefactor.dev/blog/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center gap-1.5 ml-4">
      <button
        onClick={shareX}
        className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] 
                   hover:bg-[var(--accent)] transition-colors"
        aria-label="Share on X"
        title="Share on X"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] 
                   hover:bg-[var(--accent)] transition-colors relative"
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
    </div>
  );
}
