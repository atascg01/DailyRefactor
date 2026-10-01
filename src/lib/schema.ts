/**
 * Generate JSON-LD structured data for different page types.
 */

import type { ArticleMeta } from "@/content/articles";
import { SITE_URL } from "@/lib/site";

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DailyRefactor",
    url: SITE_URL,
    description:
      "Your source for the latest in software engineering, tech news, and industry insights. Deep dives into Java, DevOps, and career advice.",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrés Tascón",
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Oracle",
    },
    url: SITE_URL,
    sameAs: [
      "https://x.com/atascg",
      "https://github.com/atascg01",
      "https://www.linkedin.com/in/andrestascon/",
    ],
  };
}

export function articleSchema(article: ArticleMeta) {
  const isoDate = new Date(article.date).toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: isoDate,
    dateModified: new Date(article.updatedAt ?? article.date).toISOString(),
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Person",
      name: article.author.name,
    },
    url: `${SITE_URL}/blog/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

export function breadcrumbSchema(segments: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map(({ name, url }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url,
    })),
  };
}
