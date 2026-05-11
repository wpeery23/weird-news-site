const Parser = require('rss-parser');
const db = require('./db');
const slugify = require('slugify');
const cheerio = require('cheerio');

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['media:content', 'mediaContent', {keepArray: true}],
      ['media:thumbnail', 'mediaThumbnail'],
    ]
  }
});

const sources = [
  { name: 'UPI', url: 'https://rss.upi.com/news/odd_news.rss', category: 'Odd News' },
  { name: 'HuffPost', url: 'https://chaski.huffpost.com/us/auto/vertical/weird-news', category: 'Weird News' },
  { name: 'Metro (UK)', url: 'https://metro.co.uk/news/weird/feed/', category: 'Weird' },
  { name: 'Oddity Central', url: 'http://feeds.feedburner.com/OddityCentral', category: 'Bizarre' },
  { name: 'Laughing Squid', url: 'https://laughingsquid.com/feed/', category: 'Culture' },
  { name: 'Boing Boing', url: 'https://boingboing.net/feed', category: 'General' }
];

async function runAggregation() {
  const results = {
    added: 0,
    errors: [],
    sourcesProcessed: 0
  };
  
  console.log('Starting aggregation...');
  
  for (const source of sources) {
    results.sourcesProcessed++;
    console.log(`Fetching ${source.name}...`);
    try {
      const feed = await parser.parseURL(source.url);
      
      for (const item of feed.items) {
        const title = item.title;
        const url = item.link;
        const description = item.contentSnippet || item.content;
        const content = item.contentEncoded || item.content;
        const published_at = item.isoDate || item.pubDate;
        const source_name = source.name;
        const category = source.category;
        
        // Basic deduplication
        try {
          const existing = await db.execute({
            sql: 'SELECT id FROM articles WHERE url = ?',
            args: [url]
          });
          if (existing.rows && existing.rows.length > 0) continue;
        } catch (err) {
          // Ignore lookup errors
        }
        
        let slug = slugify(title, { lower: true, strict: true });
        // Ensure slug is unique
        try {
          let slugExists = await db.execute({
            sql: 'SELECT id FROM articles WHERE slug = ?',
            args: [slug]
          });
          let counter = 1;
          let originalSlug = slug;
          while (slugExists.rows && slugExists.rows.length > 0) {
            slug = `${originalSlug}-${counter}`;
            slugExists = await db.execute({
              sql: 'SELECT id FROM articles WHERE slug = ?',
              args: [slug]
            });
            counter++;
          }
        } catch (err) {
          // Ignore lookup errors
        }
        
        // Try to find an image
        let image_url = null;
        if (item.mediaContent && item.mediaContent[0]) {
          image_url = item.mediaContent[0].$.url;
        } else if (item.mediaThumbnail) {
          image_url = item.mediaThumbnail.$.url;
        } else if (content) {
          const $ = cheerio.load(content);
          image_url = $('img').first().attr('src');
        }
        
        try {
          await db.execute({
            sql: `INSERT INTO articles (title, slug, description, content, url, image_url, source_name, category, published_at)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [title, slug, description, content, url, image_url, source_name, category, published_at]
          });
          console.log(`Added: ${title}`);
          results.added++;
        } catch (err) {
          console.error(`Error inserting ${title}: ${err.message}`);
          results.errors.push(`${source.name}: ${err.message}`);
        }
      }
    } catch (err) {
      console.error(`Error fetching ${source.name}: ${err.message}`);
      results.errors.push(`Fetch error ${source.name}: ${err.message}`);
    }
  }
  
  console.log('Aggregation complete.');
  return results;
}

module.exports = { runAggregation };