import { SITE_URL, getCategorySlug } from "@/lib/site";
import { MetadataRoute } from "next";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticleUpdate = new Date(Math.max(...articles.map((article) => new Date(article.updatedAt ?? article.date).getTime())));
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: latestArticleUpdate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestArticleUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/quiz`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Category pages
  const categorySlugs = Array.from(
    new Set(articles.map((a) => getCategorySlug(a.category)))
  );
  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/blog/category/${slug}`,
    lastModified: new Date(Math.max(...articles.filter((article) => getCategorySlug(article.category) === slug).map((article) => new Date(article.updatedAt ?? article.date).getTime()))),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
