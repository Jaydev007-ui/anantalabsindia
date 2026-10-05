import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, Info, ArrowRight, ShieldCheck, RefreshCw, FileText } from 'lucide-react';
import { EngineeringTool, ResearchProject } from '../../types';
import { MathFormula } from '../common/MathFormula';
import { useHubData } from '../../data/store';
import { LeadModal } from '../common/LeadModal';

interface ToolRunnerProps {
  tool: EngineeringTool;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  const { projects, trackToolRun } = useHubData();
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    tool.fields.forEach(f => {
      initial[f.id] = f.defaultValue;
    });
    return initial;
  });

  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    trackToolRun(tool.slug);
  }, [tool.slug]);

  const handleInputChange = (fieldId: string, value: number) => {
    setInputs(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    tool.fields.forEach(f => {
      initial[f.id] = f.defaultValue;
    });
    setInputs(initial);
  };

  const result = useMemo(() => {
    try {
      return tool.calculate(inputs);
    } catch {
      return {
        primaryValue: "Error",
        unit: "",
        interpretation: "Please verify input parameters."
      };
    }
  }, [tool, inputs]);

  const relatedProjects = useMemo(() => {
    return projects.filter(p => tool.relatedProjectSlugs.includes(p.slug));
  }, [projects, tool.relatedProjectSlugs]);

  return (
    <div className="space-y-8">
      {/* Calculator Main Layout: Inputs & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-slate-700 uppercase tracking-wider font-semibold">
                Parameter Inputs
              </span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition"
              title="Reset parameters to standard defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-5">
            {tool.fields.map(field => {
              const val = inputs[field.id] ?? field.defaultValue;
              const hasUnits = field.units && field.units.length > 0;

              return (
                <div key={field.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor={field.id} className="font-medium text-slate-800">
                      {field.label}
                    </label>
                    {field.description && (
                      <span className="text-[11px] font-mono text-slate-500">
                        {field.description}
                      </span>
                    )}
                  </div>

                  {hasUnits ? (
                    <select
                      id={field.id}
                      value={val}
                      onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                    >
                      {field.units!.map((u, idx) => (
                        <option key={idx} value={u.multiplier}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        id={field.id}
                        value={val}
                        min={field.min}
                        max={field.max}
                        step={field.step || "any"}
                        onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition"
                      />
                      {field.min !== undefined && field.max !== undefined && (
                        <input
                          type="range"
                          min={field.min}
                          max={field.max}
                          step={field.step || 1}
                          value={val}
                          onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || 0)}
                          className="w-32 hidden sm:block accent-emerald-600 cursor-pointer"
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50 border border-emerald-300/80 rounded-2xl p-6 sm:p-7 shadow-sm">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-emerald-700 mb-4 pb-3 border-b border-slate-100">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Computed Result</span>
              </span>
              <span className="text-[11px] text-slate-400">Real-Time</span>
            </div>

            {/* Primary Value Highlight */}
            <div className="py-4 text-center bg-emerald-50/60 rounded-xl border border-emerald-200 mb-6">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-700 tracking-tight">
                {result.primaryValue}
              </div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-1">
                {result.unit}
              </div>
            </div>

            {/* Secondary Outputs */}
            {result.secondaryOutputs && result.secondaryOutputs.length > 0 && (
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Derived Parameters
                </div>
                <div className="space-y-1.5">
                  {result.secondaryOutputs.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-mono border border-slate-200/80"
                    >
                      <span className="text-slate-600">{item.label}</span>
                      <span className="text-slate-900 font-semibold">
                        {item.value} {item.unit && <span className="text-slate-500 font-normal">{item.unit}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Interpretation */}
            {result.interpretation && (
              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 leading-relaxed">
                <strong className="text-sky-800 block mb-0.5">Engineering Interpretation:</strong>
                {result.interpretation}
              </div>
            )}
          </div>

          {/* Lead Generation CTA Box (Section 25) */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-600 mb-2.5">
              Need help implementing or scaling this engineering solution?
            </p>
            <button
              onClick={() => setLeadModalOpen(true)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-sky-400 text-slate-800 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <span>Contact Ananta Labs Engineering</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Formula, Theory & Assumptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Formula & Explanation */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold font-mono text-sky-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>Governing Formula</span>
          </h3>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3">
            <MathFormula formula={tool.formulaLatex} />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {tool.formulaExplanation}
          </p>
        </div>

        {/* Assumptions & Boundary Conditions */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold font-mono text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600" />
            <span>Assumptions & Boundary Conditions</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
            {tool.assumptions.map((asm, idx) => (
              <li key={idx} className="text-slate-600">{asm}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Ananta Labs Research */}
      {relatedProjects.length > 0 && (
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2 font-semibold">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Applied In Ananta Labs Research</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedProjects.map(proj => (
              <Link
                key={proj.id}
                to={`/research/project/${proj.slug}`}
                className="group p-3 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 rounded-xl transition flex items-center justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-sky-700 font-medium">{proj.researchId}</div>
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-700 transition">
                    {proj.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Lead Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultType="R&D Support"
        relatedProjectTitle={`Engineering Tool: ${tool.title}`}
      />
    </div>
  );
};
