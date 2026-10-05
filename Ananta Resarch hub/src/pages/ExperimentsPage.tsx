import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, ArrowRight, Calendar, Activity } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ExperimentsPage: React.FC = () => {
  const { experiments, trackPageView } = useHubData();

  React.useEffect(() => {
    trackPageView('/research/experiments');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Ananta Labs Experiments | Empirical Laboratory Studies"
        description="Comprehensive laboratory experiment logs: equipment setups, controlled variables, step-by-step procedures, empirical graphs, and telemetry observations."
        canonicalPath="experiments"
      />

      <Breadcrumbs items={[{ label: 'Experiments' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-50/70 border border-purple-200/50 text-purple-700 text-xs font-mono">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Laboratory Testbeds & Empirical Runs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ananta Labs Experiments
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Scientific experiment logs documenting rigorous physical and digital testing across heat transfer rigs, computer vision illumination envelopes, and fluid dynamics channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map(exp => (
          <article
            key={exp.id}
            className="p-7 bg-white hover:bg-white border border-slate-200 hover:border-purple-500/40 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-purple-600 mb-3">
                <span className="font-bold px-2 py-0.5 rounded bg-purple-50 border border-purple-200/60">
                  {exp.experimentId}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {exp.date}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition mb-3">
                <Link to={`/research/experiments/${exp.slug}`}>
                  {exp.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                {exp.objective}
              </p>

              <div className="space-y-1.5 mb-6 text-xs font-mono text-slate-500">
                <div>Equipment: {exp.equipment.length} calibrated instruments</div>
                <div>Variables: {exp.variables.length} monitored parameters</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">{exp.category}</span>
              <Link
                to={`/research/experiments/${exp.slug}`}
                className="font-semibold text-purple-600 group-hover:text-purple-700 flex items-center gap-1 transition"
              >
                <span>View Full Experiment Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
