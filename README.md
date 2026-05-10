# The World of Bizarre and Weird

Automated news aggregation platform for the funniest and oddest stories from around the globe.

## System Components

### 1. Frontend (Next.js)
A responsive Next.js 16 application using the App Router.
- **Port**: 3000
- **Main Pages**: Homepage, Category views, Article views.
- **Admin**: `/admin/status` for real-time aggregation stats.

### 2. Aggregation Engine (`src/scripts/aggregate.js`)
Pulls news from identified RSS feeds, extracts content and images, and stores them in the SQLite database.
- **Features**: Deduplication (by URL), Slug generation, Image discovery from HTML content.

### 3. Automation Scheduler (`src/scripts/scheduler.js`)
A persistent background process that triggers the aggregation engine every 20 minutes.

## Management

### Starting the Server
```bash
npm run dev
```

### Starting the Aggregator (One-off)
```bash
npm run aggregate
```

### Starting the Scheduler (Automation)
```bash
npm run scheduler
```

### Database
Data is stored in `data/weird-news.db` (SQLite).

## Monetization
Ad units are strategically placed via the `AdUnit` component:
- Header (Global)
- Grid (Homepage/Categories at index 3)
- Article Body (Top and Bottom)

To swap with live AdSense code, update `src/components/AdUnit.tsx`.
