import React from "react";
import { getArticles } from "@/lib/db-utils";
import Link from "next/link";
import { formatDistance } from "date-fns";
import AdUnit from "@/components/AdUnit";

export default function Home() {
  const articles = getArticles(24);

  return (
    <div>
      <section className="mb-12">
        <div className="flex justify-between items-end mb-8 border-b-8 border-yellow-400 pb-2">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Latest Weirdness
          </h1>
          <div className="text-xs font-bold uppercase text-gray-500 mb-1 hidden md:block">
            Updated every 20 minutes
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any, index: number) => (
            <React.Fragment key={article.id}>
              {index === 3 && (
                <div className="md:col-span-1 lg:col-span-1">
                  <AdUnit type="grid" />
                </div>
              )}
              <Link
                href={`/article/${article.slug}`}
                className="group flex flex-col bg-white dark:bg-zinc-900 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {article.image_url && (
                  <div className="aspect-video w-full overflow-hidden border-b-4 border-black">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 uppercase">
                      {article.category}
                    </span>
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      {article.source_name}
                    </span>
                  </div>
                  <h2 className="text-xl font-black uppercase leading-none mb-3 group-hover:text-red-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow font-medium">
                    {article.description}
                  </p>
                  <div className="text-[10px] font-black uppercase text-gray-400">
                    {article.published_at ? formatDistance(new Date(article.published_at), new Date(), { addSuffix: true }) : 'Recently'}
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
// Cache Buster: Sun May 10 14:45:22 UTC 2026
Mon May 11 18:42:24 UTC 2026
