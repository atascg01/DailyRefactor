export const SITE_URL = "https://dailyrefactor.dev";
export function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}
export function siteUrl(path = ""): string {
  return `${SITE_URL}${path}`;
}
