import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Clock, Calendar, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { ResearchCard } from '../components/research/ResearchCard';

export const ResearchBriefDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { briefs, projects, trackPageView } = useHubData();

  const brief = briefs.find(b => b.slug === slug);

  useEffect(() => {
    if (brief) {
      trackPageView(`/research/briefs/${brief.slug}`);
    }
  }, [brief]);

  if (!brief) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Research Brief Not Found</h2>
        <Link to="/research/briefs" className="text-emerald-600 hover:underline">
          Return to Research Briefs
        </Link>
      </div>
    );
  }

  const relatedProjects = projects.filter(p => brief.relatedProjectSlugs.includes(p.slug));

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title={`Brief ${brief.briefNumber}: ${brief.title} | Ananta Labs`}
        description={brief.keyFinding}
        canonicalPath={`briefs/${brief.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Research Briefs', url: '/research/briefs' },
          { label: `Brief ${brief.briefNumber}` }
        ]}
      />

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-slate-200">
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="font-bold text-emerald-600 px-3 py-1 rounded-md bg-emerald-50/70 border border-emerald-200/60">
            Research Brief {brief.briefNumber}
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sky-600" /> {brief.readTime}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-500">{brief.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {brief.title}
        </h1>
      </header>

      {/* Structured Sections conforming to Section 17 */}
      <div className="space-y-6">
        {/* Key Finding */}
        <section className="p-6 bg-white border border-emerald-500/30 rounded-2xl space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Key Finding</span>
          </h2>
          <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
            {brief.keyFinding}
          </p>
        </section>

        {/* Why It Matters */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold">
            Why It Matters
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {brief.whyItMatters}
          </p>
        </section>

        {/* Technical Insight */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">
            Technical Insight
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-mono">
            {brief.technicalInsight}
          </p>
        </section>

        {/* Summary */}
        <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
            Full 3-Minute Summary
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {brief.summary}
          </p>
        </section>

        {/* Related Ananta Labs Research */}
        {relatedProjects.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Related Ananta Labs Research</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedProjects.map(p => (
                <ResearchCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {brief.references.length > 0 && (
          <section className="space-y-2 pt-6 border-t border-slate-200">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              References & Citations
            </h2>
            <ul className="space-y-1 text-xs font-mono text-slate-500">
              {brief.references.map((ref, idx) => (
                <li key={idx}>• {ref}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
};
