import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Award, CheckCircle2, Flag, Sparkles } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResearchTimelinePage: React.FC = () => {
  const { timeline, trackPageView } = useHubData();

  React.useEffect(() => {
    trackPageView('/research/timeline');
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Research Timeline & Roadmap | Ananta Labs Research & Innovation Hub"
        description="Interactive chronological timeline of Ananta Labs R&D breakthroughs from 2023 through 2026: SwachhVision, AeroHydro, and microchannel cooling."
        canonicalPath="timeline"
      />

      <Breadcrumbs items={[{ label: 'Research Timeline' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200/50 text-sky-700 text-xs font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>Chronological R&D Milestones</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ananta Labs Research Timeline
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Tracing the evolution of Ananta Labs engineering initiatives: from foundational fluidic oscillations to municipal edge-AI vision deployments.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-12">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-50 border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(56,189,248,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
            </div>

            {/* Milestone Card */}
            <div className="p-6 bg-white hover:bg-white border border-slate-200 hover:border-sky-300 rounded-2xl transition space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-sky-600">
                    {item.year} {item.quarter}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{item.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                  {item.milestoneType}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {item.projectSlug && (
                <div className="pt-2">
                  <Link
                    to={`/research/project/${item.projectSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition"
                  >
                    <span>Explore Associated Research Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
