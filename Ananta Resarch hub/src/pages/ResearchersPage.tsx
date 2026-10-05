import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, BookOpen, ExternalLink, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResearchersPage: React.FC = () => {
  const { researchers, trackPageView } = useHubData();

  React.useEffect(() => {
    trackPageView('/research/researchers');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Researchers & Inventors | Ananta Labs Research & Innovation Hub"
        description="Meet the inventors, research scientists, and hardware architects at Ananta Labs India leading innovations in AI, fluidics, and embedded systems."
        canonicalPath="researchers"
      />

      <Breadcrumbs items={[{ label: 'Researchers' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-950/70 border border-sky-800/50 text-sky-300 text-xs font-mono">
          <Users className="w-3.5 h-3.5" />
          <span>Research Personnel & Directorship</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ananta Labs Researchers
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          The engineering minds, patent inventors, and scientific investigators driving our digital and physical research programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {researchers.map(researcher => (
          <article
            key={researcher.id}
            className="p-7 bg-white hover:bg-white border border-slate-200 hover:border-sky-500/40 rounded-3xl transition group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-sky-300 flex items-center justify-center text-sky-700 font-bold text-xl font-mono">
                {researcher.name.split(' ').map(n => n[0]).join('')}
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                  <Link to={`/research/researcher/${researcher.slug}`}>
                    {researcher.name}
                  </Link>
                </h2>
                <div className="text-xs font-mono text-sky-600 font-semibold mt-1">
                  {researcher.role}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {researcher.title}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {researcher.biography}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                  Focus Areas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {researcher.researchInterests.slice(0, 3).map((int, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      {int}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3 text-slate-500">
                {researcher.patentsCount !== undefined && (
                  <span>{researcher.patentsCount} Patents</span>
                )}
                {researcher.publicationsCount !== undefined && (
                  <span>{researcher.publicationsCount} Pubs</span>
                )}
              </div>
              <Link
                to={`/research/researcher/${researcher.slug}`}
                className="font-semibold text-sky-600 group-hover:text-sky-700 flex items-center gap-1 transition"
              >
                <span>Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
