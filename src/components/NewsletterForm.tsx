"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  if (status === "submitted") {
    return (
      <div className="max-w-md mx-auto p-6 rounded-xl border border-blue-500/30 bg-blue-500/10 text-center">
        <p className="text-blue-600 dark:text-blue-400 font-medium">Thanks for your interest! 🎉</p>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Newsletter is coming soon — we&apos;ll let you know when it launches.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("submitted");
      }}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] 
                   text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent transition-shadow"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm 
                   hover:bg-blue-700 transition-colors active:scale-95"
      >
        Subscribe
      </button>
      <p className="text-xs text-[var(--muted-foreground)] mt-0 sm:mt-1 sm:absolute sm:bottom-[-1.75rem] sm:left-0">
        No spam, unsubscribe anytime.
      </p>
    </form>
  );
}