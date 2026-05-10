import { getArticles } from "@/lib/db-utils";

export default async function sitemap() {
  const articles = getArticles(100);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bizarre-and-weird.com';

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.published_at || article.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const categories = ['odd-news', 'weird', 'bizarre', 'culture', 'general'];
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
