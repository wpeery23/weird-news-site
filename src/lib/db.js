const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'libsql://weird-news-wpeery23.aws-us-east-1.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
});

// Initialize database schema
async function initDb() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        content TEXT,
        url TEXT UNIQUE NOT NULL,
        image_url TEXT,
        source_name TEXT,
        category TEXT,
        published_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug)`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at)`);
  } catch (err) {
    console.log('Tables already exist or error:', err.message);
  }
}

// Initialize on load
initDb();

module.exports = db;