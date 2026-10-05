import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FlaskConical, Calendar, ArrowRight, CheckCircle2, Sliders, Table, Activity, ChevronRight, FileText } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ExperimentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { experiments, projects, trackPageView } = useHubData();
  const [activeDataIndex, setActiveDataIndex] = useState<number | null>(null);

  const exp = experiments.find(e => e.slug === slug);

  useEffect(() => {
    if (exp) {
      trackPageView(`/research/experiments/${exp.slug}`);
    }
  }, [exp]);

  if (!exp) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Experiment Not Found</h2>
        <Link to="/research/experiments" className="text-purple-600 hover:underline">
          Return to Experiments
        </Link>
      </div>
    );
  }

  const relatedProject = exp.relatedProjectSlug
    ? projects.find(p => p.slug === exp.relatedProjectSlug)
    : null;

  // Graph calculations
  const graphData = exp.graphData || [];
  const minY = Math.min(...graphData.map(d => d.y), 0);
  const maxY = Math.max(...graphData.map(d => d.y), 100) * 1.1;

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title={`${exp.experimentId}: ${exp.title} | Ananta Labs Experiment`}
        description={exp.objective}
        canonicalPath={`experiments/${exp.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Experiments', url: '/research/experiments' },
          { label: exp.experimentId }
        ]}
      />

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-purple-700 px-3 py-1 rounded bg-purple-50 border border-purple-200/80">
            {exp.experimentId}
          </span>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Date: {exp.date}
          </span>
          <span className="text-xs font-mono text-slate-500">•</span>
          <span className="text-xs font-mono text-slate-500">{exp.category}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {exp.title}
        </h1>

        <div className="p-6 bg-white border border-purple-500/20 rounded-2xl">
          <h2 className="text-xs font-mono uppercase tracking-wider text-purple-600 font-bold mb-2">
            Experimental Objective
          </h2>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            {exp.objective}
          </p>
        </div>
      </header>

      {/* Interactive Data Graph */}
      {graphData.length > 0 && (
        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-600" />
              <span>{exp.graphConfig?.title || 'Empirical Dataset Curve'}</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-500">
              Interactive Data Points
            </span>
          </div>

          <div className="relative h-64 sm:h-72 w-full pt-4 pb-8 flex items-end justify-between gap-2 sm:gap-4 border-b border-slate-200 px-2 sm:px-6">
            {graphData.map((pt, idx) => {
              const heightPercent = ((pt.y - minY) / (maxY - minY)) * 100;
              const isHovered = activeDataIndex === idx;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setActiveDataIndex(idx)}
                  onMouseLeave={() => setActiveDataIndex(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="mb-2 px-2.5 py-1 bg-white border border-sky-400 text-slate-900 rounded text-xs font-mono shadow-lg whitespace-nowrap">
                      {pt.label}: {pt.y}
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 ${
                      isHovered
                        ? 'bg-gradient-to-t from-cyan-500 to-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                        : 'bg-gradient-to-t from-cyan-900 to-cyan-500/80'
                    }`}
                  />

                  {/* Label */}
                  <span className="text-[10px] font-mono text-slate-500 mt-2 truncate max-w-full">
                    {pt.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-500 pt-1">
            <span>{exp.graphConfig?.xLabel || 'Independent Step'}</span>
            <span>{exp.graphConfig?.yLabel || 'Measured Value'}</span>
          </div>
        </section>
      )}

      {/* Equipment and Variables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Equipment */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
            Calibrated Laboratory Equipment
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {exp.equipment.map((eq, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                <span>{eq}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Variables */}
        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
            Monitored Variables & Boundary Controls
          </h2>
          <div className="space-y-2 text-xs">
            {exp.variables.map((v, i) => (
              <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between font-mono mb-1">
                  <span className="font-semibold text-slate-900">{v.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    v.type === 'Independent' ? 'bg-sky-50 text-sky-700' :
                    v.type === 'Dependent' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {v.type}
                  </span>
                </div>
                <p className="text-slate-500">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Experimental Setup & Procedure */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Procedure & Setup Protocol</h2>
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-mono">
            {exp.experimentalSetup}
          </p>
          <div className="space-y-2 pt-2 border-t border-slate-200">
            {exp.procedure.map((step, idx) => (
              <div key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="text-sky-600 font-mono shrink-0">[{idx + 1}]</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Measurements Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Table className="w-4 h-4 text-sky-600" />
          <span>Recorded Measurement Log</span>
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Step / Regime</th>
                <th className="p-3.5">Recorded Sensor Reading</th>
                <th className="p-3.5">Observations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-600">
              {exp.measurements.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-100 transition">
                  <td className="p-3.5 text-sky-700 font-semibold">{m.step}</td>
                  <td className="p-3.5 font-bold text-slate-900">{m.reading}</td>
                  <td className="p-3.5 text-slate-500">{m.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Observations & Conclusion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">
            Empirical Observations
          </h2>
          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
            {exp.observations.map((obs, i) => (
              <li key={i}>{obs}</li>
            ))}
          </ul>
        </section>

        <section className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
            Experimental Conclusion
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {exp.conclusion}
          </p>
        </section>
      </div>

      {/* Related Research Project */}
      {relatedProject && (
        <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-sky-600 uppercase block mb-1">
              Derived From Ananta Labs Research Project
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {relatedProject.researchId}: {relatedProject.title}
            </h3>
          </div>
          <Link
            to={`/research/project/${relatedProject.slug}`}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-900 rounded-xl transition flex items-center gap-1.5 shrink-0 ml-4"
          >
            <span>Explore Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      )}
    </article>
  );
};
