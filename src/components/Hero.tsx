import Link from "next/link";
import { articles } from "@/content/articles";

export default function Hero() {
  return (
    <section className="hero-shell">
      <div className="editorial-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-enter">A software engineering journal</p>
          <h1 className="hero-enter">
            Good code.<br />Clear thinking.<br /><span>One refactor at a time.</span>
          </h1>
          <p className="hero-description hero-enter">
            Notes on Java, architecture, and the tools we use to build better software. Written by Andrés Tascón.
          </p>
          <div className="hero-actions hero-enter">
            <Link href="/blog" className="button-primary">Explore articles <span aria-hidden="true">↗</span></Link>
            <Link href="/about" className="text-link">Meet the author <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="refactor-art hero-enter" aria-hidden="true">
          <div className="art-caption"><span>DAILY / REFACTOR</span><span>01 — ∞</span></div>
          <div className="refactor-lines"><i /><i /><i /><i /><i /><i /></div>
          <div className="art-note">
            <span>Less noise.<br />More intention.</span><span className="art-symbol">↗</span>
          </div>
        </div>
      </div>
      <div className="editorial-container hero-footnote">
        <span>Independent notes. Practical ideas.</span>
        <span>{articles.length} articles · Java / Git / Architecture / AI</span>
      </div>
    </section>
  );
}
