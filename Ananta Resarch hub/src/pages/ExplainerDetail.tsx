import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, User, ArrowRight, Wrench, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { MathFormula } from '../components/common/MathFormula';
import { ResearchCard } from '../components/research/ResearchCard';
import { ToolCard } from '../components/tools/ToolCard';

export const ExplainerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { explainers, projects, tools, trackPageView } = useHubData();

  const article = explainers.find(e => e.slug === slug);

  useEffect(() => {
    if (article) {
      trackPageView(`/research/explainer/${article.slug}`);
    }
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Explainer Article Not Found</h2>
        <Link to="/research/explainers" className="text-sky-600 hover:underline">
          Return to Research Explained
        </Link>
      </div>
    );
  }

  const relatedProjects = projects.filter(p => article.relatedProjectSlugs.includes(p.slug));
  const relatedTools = tools.filter(t => article.relatedToolSlugs.includes(t.slug));

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title={`${article.title} | Ananta Labs Research Explained`}
        description={article.seoDescription || article.summary}
        canonicalPath={`explainer/${article.slug}`}
        type="article"
        authors={[article.author]}
        publishedDate={article.publishedDate}
      />

      <Breadcrumbs
        items={[
          { label: 'Research Explained', url: '/research/explainers' },
          { label: article.category }
        ]}
      />

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-slate-200">
        <div className="flex items-center gap-3 text-xs font-mono text-amber-600">
          <span className="px-2.5 py-1 rounded-md bg-amber-50/70 border border-amber-200/60 font-semibold">
            {article.category}
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2">
          <span className="flex items-center gap-1.5 text-slate-600">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>Authored by {article.author}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{article.publishedDate}</span>
          </span>
        </div>

        <p className="text-base text-slate-600 leading-relaxed pt-2">
          {article.summary}
        </p>
      </header>

      {/* Key Takeaways Callout Box */}
      {article.keyTakeaways.length > 0 && (
        <section className="p-6 bg-white border border-amber-500/30 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>Key Engineering Takeaways</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Formula Highlight if present */}
      {article.formula && (
        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold">
            Mathematical Formulation
          </h2>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <MathFormula formula={article.formula.latex} />
          </div>
          <p className="text-xs font-mono text-slate-500">
            {article.formula.description}
          </p>
        </section>
      )}

      {/* Article Markdown Content Body */}
      <section className="prose prose-invert max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-6">
        <div 
          className="whitespace-pre-line leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{
            __html: article.content
              .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-slate-900 mt-6 mb-2 tracking-tight">$1</h3>')
              .replace(/## (.*?)\n/g, '<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight">$1</h2>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-sky-700 font-semibold">$1</strong>')
          }}
        />
      </section>

      {/* Related Engineering Tools (Internal Knowledge Graph) */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-600" />
            <span>Interactive Engineering Calculators for This Concept</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map(t => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* Related Research Projects */}
      {relatedProjects.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <div className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Applied in Ananta Labs R&D</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map(proj => (
              <ResearchCard key={proj.id} project={proj} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
