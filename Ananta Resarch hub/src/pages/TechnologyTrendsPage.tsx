import React from 'react';
import { TrendingUp, Clock, AlertCircle, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const TechnologyTrendsPage: React.FC = () => {
  const { trends, trackPageView } = useHubData();

  React.useEffect(() => {
    trackPageView('/research/trends');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Emerging Technology Trends | Ananta Labs Research & Innovation Hub"
        description="Rigorous analysis of emerging technology horizons: Edge Vision AI, microchannel liquid cooling, and decentralized TinyML cyber-physical systems."
        canonicalPath="trends"
      />

      <Breadcrumbs items={[{ label: 'Technology Trends' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-50/70 border border-purple-200/50 text-purple-700 text-xs font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Horizon Scans & Engineering Analyses</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Emerging Technology Trends
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Fact-grounded analyses of macroeconomic technology shifts, physical engineering barriers, and Ananta Labs' strategic R&D perspective.
        </p>
      </div>

      <div className="space-y-8">
        {trends.map(trend => (
          <article
            key={trend.id}
            className="p-8 bg-white border border-slate-200 rounded-3xl space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-600 px-2.5 py-1 rounded bg-sky-50 border border-sky-200 font-semibold">
                  {trend.category}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Horizon: {trend.horizon}
                </span>
              </div>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                trend.maturity === 'Mainstream' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                trend.maturity === 'Accelerating' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                Maturity: {trend.maturity}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {trend.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
              {trend.executiveSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Drivers */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Key Structural Drivers
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                  {trend.keyDrivers.map((driver, i) => (
                    <li key={i}>{driver}</li>
                  ))}
                </ul>
              </div>

              {/* Engineering Challenges */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                  Key Engineering Challenges
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                  {trend.engineeringChallenges.map((ch, i) => (
                    <li key={i}>{ch}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ananta Labs Perspective (Section 18 distinction) */}
            <div className="p-5 bg-sky-50 border border-sky-200/40 rounded-xl space-y-1.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Ananta Labs Strategic R&D Perspective</span>
              </h3>
              <p className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed">
                {trend.anantaLabsPerspective}
              </p>
            </div>

            {/* External Sources Attribution */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
              <span className="text-slate-500">External Sourced Citations:</span>
              {trend.sources.map((s, idx) => (
                <span key={idx} className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-slate-500">
                  {s.title}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
