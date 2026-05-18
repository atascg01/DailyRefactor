"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
          : "bg-[var(--background)] border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-blue-600 
                       bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-500 transition-all"
          >
            DailyRefactor
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(href)
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] 
                         hover:bg-[var(--accent)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 border-t border-[var(--border)]" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-[var(--background)]">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-[var(--accent)] text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
