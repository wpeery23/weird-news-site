import { NextResponse } from 'next/server';
const db = require('../../../lib/db');

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await db.execute('SELECT COUNT(*) as count FROM articles');
    const count = result.rows?.[0]?.count ?? 0;
    
    const lastResult = await db.execute('SELECT MAX(published_at) as last_pub FROM articles');
    const lastPub = lastResult.rows?.[0]?.last_pub ?? null;
    
    return NextResponse.json({ 
      articleCount: count,
      lastPublished: lastPub,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack?.substring(0, 500)
    }, { status: 500 });
  }
}