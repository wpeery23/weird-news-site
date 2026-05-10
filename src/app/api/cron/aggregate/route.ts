import { NextResponse } from 'next/server';
const { runAggregation } = require('../../../../lib/aggregator');

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Check for authorization header to prevent unauthorized calls
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const results = await runAggregation();
    return NextResponse.json({ 
      success: true, 
      message: `Added ${results.added} articles.`,
      results 
    });
  } catch (error: any) {
    console.error('Cron aggregation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
