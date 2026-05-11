import { getStats } from "@/lib/db-utils";
import { formatDistance } from "date-fns";

export default async function StatusPage() {
  const stats = await getStats();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
        <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-yellow-400 inline-block">
          System Status
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 border-2 border-black">
            <p className="text-xs font-black uppercase text-gray-500 mb-1">Total Articles</p>
            <p className="text-4xl font-black">{stats.totalArticles}</p>
          </div>
          
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 border-2 border-black">
            <p className="text-xs font-black uppercase text-gray-500 mb-1">Last Update</p>
            <p className="text-xl font-black uppercase">
              {stats.lastUpdate ? formatDistance(new Date(stats.lastUpdate), new Date(), { addSuffix: true }) : 'Never'}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-black uppercase mb-4">Articles by Source</h2>
        <div className="space-y-2">
          {stats.articlesBySource.map((source: any) => (
            <div key={source.source_name} className="flex justify-between items-center border-b-2 border-zinc-100 dark:border-zinc-800 py-2 font-bold uppercase text-sm">
              <span>{source.source_name}</span>
              <span className="bg-black text-white px-2 py-0.5">{source.count}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-400 text-xs font-bold uppercase text-center">
          Scheduler is active. Fetching every 20 minutes.
        </div>
      </div>
    </div>
  );
}