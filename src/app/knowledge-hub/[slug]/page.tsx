import { articles } from "@/lib/articles";
import { notFound } from "next/navigation";
import ArticleClient from "@/components/sections/ArticleClient";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Statically pre-render all articles during next build
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Ananta Knowledge Hub`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  // Calculate related articles
  const relatedArticles = articles
    .filter((a) => a.slug !== slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);
  
  if (relatedArticles.length < 3) {
    const extra = articles
      .filter((a) => a.slug !== slug && !relatedArticles.some((r) => r.slug === a.slug))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...extra);
  }

  return <ArticleClient article={article} relatedArticles={relatedArticles} />;
}
