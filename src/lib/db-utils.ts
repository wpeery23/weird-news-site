import db from './db';

export function getArticles(limit = 20, category = null) {
  let query = 'SELECT * FROM articles';
  let params = [];
  
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY published_at DESC LIMIT ?';
  params.push(limit);
  
  return db.prepare(query).all(...params);
}

export function getArticleBySlug(slug: string) {
  return db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug);
}

export function getCategories() {
  return db.prepare('SELECT DISTINCT category FROM articles').all().map((row: any) => row.category);
}

export function getStats() {
  const totalArticles = db.prepare('SELECT COUNT(*) as count FROM articles').get().count;
  const lastArticle = db.prepare('SELECT published_at FROM articles ORDER BY published_at DESC LIMIT 1').get();
  const articlesBySource = db.prepare('SELECT source_name, COUNT(*) as count FROM articles GROUP BY source_name').all();
  
  return {
    totalArticles,
    lastUpdate: lastArticle ? lastArticle.published_at : null,
    articlesBySource
  };
}
