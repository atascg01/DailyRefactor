/**
 * Generate JSON-LD structured data for different page types.
 */

const BASE_URL = "https://dailyrefactor.dev";

interface ArticleMeta {
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
    role: string;
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DailyRefactor",
    url: BASE_URL,
    description:
      "Your source for the latest in software engineering, tech news, and industry insights. Deep dives into Java, DevOps, and career advice.",
    potentialAction: {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrés Tascón",
    jobTitle: "Senior Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Oracle",
    },
    url: BASE_URL,
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
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Person",
      name: article.author.name,
    },
    url: `${BASE_URL}/blog/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
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
