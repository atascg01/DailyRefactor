import Link from "next/link";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal from "@/components/Reveal";
import { articles } from "@/content/articles";
import { getQuizData } from "@/content/quiz-questions";

export default function Home() {
  const totalQuestions = articles.reduce((sum, article) => sum + (getQuizData(article.slug)?.questions.length ?? 0), 0);
  return (
    <>
      <Hero />
      <section className="editorial-container writing-section">
        <Reveal className="section-heading">
          <div><p className="eyebrow">01 / The journal</p><h2>Latest thinking.</h2></div>
          <Link href="/blog" className="text-link">All articles <span aria-hidden="true">↗</span></Link>
        </Reveal>
        <div className="article-grid">
          {articles.slice(0, 6).map((article, index) => (
            <Reveal key={article.id} delay={(index % 3) * 70}><ArticleCard {...article} /></Reveal>
          ))}
        </div>
      </section>
      <Reveal className="editorial-container practice-section">
        <div>
          <p className="eyebrow">02 / Put it into practice</p>
          <h2>Reading is the start.<br />Make it stick.</h2>
          <p>{totalQuestions} questions to sharpen your understanding of the ideas behind the code.</p>
        </div>
        <Link href="/quiz" className="button-primary">Test your knowledge <span aria-hidden="true">↗</span></Link>
      </Reveal>
      <Reveal className="editorial-container newsletter-section">
        <div><p className="eyebrow">03 / Stay curious</p><h2>A little less scrolling.<br />A little more substance.</h2></div>
        <NewsletterForm />
      </Reveal>
    </>
  );
}
