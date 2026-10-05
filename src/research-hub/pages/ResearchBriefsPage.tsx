import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, ArrowRight, Zap } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResearchBriefsPage: React.FC = () => {
  const { briefs, trackPageView } = useHubData();

  React.useEffect(() => {
    trackPageView('/research/briefs');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Research Briefs | Executive Technical Summaries | Ananta Labs"
        description="Concise 3-minute executive technical briefs from Ananta Labs India distilling core discoveries, key metrics, and technological insights."
        canonicalPath="briefs"
      />

      <Breadcrumbs items={[{ label: 'Research Briefs' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50/70 border border-emerald-200/50 text-emerald-700 text-xs font-mono">
          <Zap className="w-3.5 h-3.5" />
          <span>Executive Technical Briefs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Research Briefs
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          High-impact, 3-minute executive summaries of original Ananta Labs engineering discoveries, formulated for fast technical consumption.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {briefs.map(brief => (
          <article
            key={brief.id}
            className="p-6 bg-white hover:bg-white border border-slate-200 hover:border-emerald-500/40 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-emerald-600 mb-3">
                <span className="font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/60">
                  {brief.briefNumber}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {brief.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition mb-3 leading-snug">
                <Link to={`/research/briefs/${brief.slug}`}>
                  {brief.title}
                </Link>
              </h2>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold block mb-1">
                  Key Finding:
                </span>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {brief.keyFinding}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">{brief.date}</span>
              <Link
                to={`/research/briefs/${brief.slug}`}
                className="font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1 transition"
              >
                <span>Read Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
