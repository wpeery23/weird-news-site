import db from './db';

export async function getArticles(limit = 20, category = null) {
  let sql = 'SELECT * FROM articles';
  let args = [];
  
  if (category) {
    sql += ' WHERE category = ?';
    args.push(category);
  }
  
  sql += ' ORDER BY published_at DESC LIMIT ?';
  args.push(limit);
  
  const result = await db.execute({ sql, args });
  return result.rows || [];
}

export async function getArticleBySlug(slug: string) {
  const result = await db.execute({ 
    sql: 'SELECT * FROM articles WHERE slug = ?', 
    args: [slug] 
  });
  return result.rows && result.rows[0] ? result.rows[0] : null;
}

export async function getCategories() {
  const result = await db.execute('SELECT DISTINCT category FROM articles');
  return (result.rows || []).map((row: any) => row.category);
}

export async function getStats() {
  const totalResult = await db.execute('SELECT COUNT(*) as count FROM articles');
  const totalArticles = totalResult.rows && totalResult.rows[0] ? Number(totalResult.rows[0].count) : 0;
  
  const lastResult = await db.execute('SELECT published_at FROM articles ORDER BY published_at DESC LIMIT 1');
  const lastArticle = lastResult.rows && lastResult.rows[0] ? lastResult.rows[0] : null;
  
  const sourceResult = await db.execute('SELECT source_name, COUNT(*) as count FROM articles GROUP BY source_name');
  const articlesBySource = sourceResult.rows ? sourceResult.rows.map((row: any) => ({
    source_name: row.source_name,
    count: Number(row.count)
  })) : [];
  
  return {
    totalArticles,
    lastUpdate: lastArticle ? lastArticle.published_at : null,
    articlesBySource
  };
}