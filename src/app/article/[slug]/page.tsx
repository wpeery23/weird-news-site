import { getArticleBySlug, getArticles } from "@/lib/db-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDistance } from "date-fns";
import AdUnit from "@/components/AdUnit";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | Bizarre & Weird`,
    description: String(article.description || '').substring(0, 160),
    openGraph: {
      title: article.title,
      description: String(article.description || '').substring(0, 160),
      images: article.image_url ? [article.image_url] : [],
      type: 'article',
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getArticles(6);
  const relatedArticles = allArticles.filter((a: any) => a.id !== article.id);

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white dark:bg-zinc-900 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 mb-12">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1 uppercase">
            {article.category}
          </span>
          <span className="text-sm font-black uppercase text-gray-500">
            Source: {article.source_name}
          </span>
          <span className="text-sm font-black uppercase text-gray-500">
            {article.published_at ? formatDistance(new Date(article.published_at), new Date(), { addSuffix: true }) : 'Recently'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tightest leading-none mb-8">
          {article.title}
        </h1>

        <AdUnit type="inline" className="mb-8" />

        {article.image_url && (
          <div className="mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,0,0,1)]">
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div 
          className="prose prose-xl max-w-none font-medium leading-relaxed mb-10 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: article.content || article.description }}
        />

        <AdUnit type="inline" className="mb-10" />

        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-black uppercase text-sm text-gray-500 mb-1">Original Story by {article.source_name}</p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white font-black uppercase px-6 py-3 hover:bg-black transition-colors"
            >
              Read Full Article at Source
            </a>
          </div>
        </div>
      </article>

      <section>
        <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-red-600 inline-block">
          More Weird Stuff
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((a: any) => (
            <Link 
              key={a.id} 
              href={`/article/${a.slug}`}
              className="bg-white dark:bg-zinc-900 border-4 border-black p-4 hover:bg-yellow-400 transition-colors group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="font-black uppercase text-sm leading-tight group-hover:text-black">
                {a.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}