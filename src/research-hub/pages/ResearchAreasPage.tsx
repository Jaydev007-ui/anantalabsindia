import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Wrench, 
  Activity, 
  Flame, 
  FlaskConical, 
  ShieldCheck, 
  ArrowRight,
  FileText
} from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResearchAreasPage: React.FC = () => {
  const { projects, trackPageView } = useHubData();
  const [expandedArea, setExpandedArea] = useState<string | null>('Artificial Intelligence');

  React.useEffect(() => {
    trackPageView('/research/areas');
  }, []);

  const areas = [
    {
      name: 'Artificial Intelligence',
      icon: Cpu,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      subDisciplines: ['Computer Vision', 'Machine Learning', 'AI Systems', 'Edge Quantization', 'Spatial Analytics'],
      description: 'Applied perception models, edge neural networks, and real-time civic analytics operating without cloud roundtrip latencies.',
      flagshipProjects: ['swachhvision', 'predictedge-vibration']
    },
    {
      name: 'Mechanical Engineering',
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/40',
      borderColor: 'border-blue-200/60',
      subDisciplines: ['Machine Design', 'Thermal Engineering', 'Fluid Systems', 'Precision Manufacturing', 'Microchannel Milling'],
      description: 'High-flux thermal management, secondary vortex shedding, conjugate heat transfer, and precision mechanical drive trains.',
      flagshipProjects: ['thermoshield-heatsink']
    },
    {
      name: 'Healthcare Technology',
      icon: Activity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/40',
      borderColor: 'border-emerald-200/60',
      subDisciplines: ['Medical Electromechanics', 'Closed-loop Perfusion', 'Physiological Pulse Infusion', 'Wearable Biomechanics'],
      description: 'Translating advanced fluidic and sensor engineering into medical apparatuses, cadaveric preservation, and clinical diagnostic tools.',
      flagshipProjects: ['embalming-machine', 'neurogait-wearable']
    },
    {
      name: 'Industry 4.0',
      icon: Flame,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50/40',
      borderColor: 'border-amber-200/60',
      subDisciplines: ['Predictive Maintenance', 'Sub-Kilohertz Vibration FFT', 'Cyber-Physical Systems', 'Industrial Fieldbuses'],
      description: 'Autonomous machine condition monitoring, bearing defect forecasting, and real-time operational reliability systems.',
      flagshipProjects: ['predictedge-vibration']
    },
    {
      name: 'IoT & Embedded Systems',
      icon: FlaskConical,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50/40',
      borderColor: 'border-purple-200/60',
      subDisciplines: ['ARM Cortex-M & RISC-V', 'Ultra-Low Power Firmware', 'ESP32 Camera Nodes', 'Deterministic Sensor Meshes'],
      description: 'Silicon-level hardware development, energy harvesting architectures, and ruggedized edge computing modules.',
      flagshipProjects: ['swachhvision', 'predictedge-vibration']
    },
    {
      name: 'Sustainable Technology',
      icon: ShieldCheck,
      color: 'text-teal-400',
      bgColor: 'bg-teal-950/40',
      borderColor: 'border-teal-800/60',
      subDisciplines: ['Passive Hydrodynamic Aeration', 'Toroidal Cavitation', 'Industrial Effluent Neutralization', 'Decarbonization'],
      description: 'Slashing industrial carbon footprints and chemical usage through fluid dynamic innovation and passive mechanics.',
      flagshipProjects: ['aerohydro-vortex']
    }
  ];

  const toggleExpand = (name: string) => {
    setExpandedArea(prev => prev === name ? null : name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Research Areas | Ananta Labs Research & Innovation Hub"
        description="Explore Ananta Labs' primary research disciplines: Artificial Intelligence, Mechanical Engineering, Healthcare Tech, Industry 4.0, IoT, and Sustainable Tech."
        canonicalPath="areas"
      />

      <Breadcrumbs items={[{ label: 'Research Areas' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50/70 border border-indigo-200/50 text-indigo-700 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>Interdisciplinary Specializations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Research Areas
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Ananta Labs conducts targeted research across six interconnected disciplines, combining physical mechanical prototyping with digital edge intelligence.
        </p>
      </div>

      {/* Expandable Categories List */}
      <div className="space-y-4">
        {areas.map(area => {
          const isExpanded = expandedArea === area.name;
          const AreaIcon = area.icon;
          const areaProjects = projects.filter(p => p.category === area.name);

          return (
            <div
              key={area.name}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? `bg-white border-slate-200 shadow-xl`
                  : `bg-slate-50 border-slate-200 hover:border-slate-200`
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleExpand(area.name)}
                className="p-6 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${area.bgColor} border ${area.borderColor} flex items-center justify-center ${area.color} shrink-0`}>
                    <AreaIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      {area.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                      {area.subDisciplines.slice(0, 3).join(" • ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200">
                    {areaProjects.length} {areaProjects.length === 1 ? 'Project' : 'Projects'}
                  </span>
                  <button className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200 space-y-6 animate-fadeIn">
                  <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {area.description}
                  </p>

                  {/* Sub-disciplines */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                      Core Sub-Disciplines
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {area.subDisciplines.map((sub, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 text-slate-600"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Active Projects in This Area */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                      <span>Active Projects in {area.name}</span>
                      <Link
                        to={`/research/projects`}
                        className="text-sky-600 hover:text-sky-700 font-normal lowercase font-sans text-xs"
                      >
                        view in full registry →
                      </Link>
                    </h3>

                    {areaProjects.length === 0 ? (
                      <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 font-mono">
                        Early conceptual phase projects currently underway in laboratory testbeds.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {areaProjects.map(proj => (
                          <Link
                            key={proj.id}
                            to={`/research/project/${proj.slug}`}
                            className="p-3.5 bg-white hover:bg-slate-100 border border-slate-200 hover:border-sky-300 rounded-xl transition flex items-center justify-between group"
                          >
                            <div>
                              <span className="text-[11px] font-mono text-sky-600 block">{proj.researchId}</span>
                              <span className="text-xs font-semibold text-slate-900 group-hover:text-sky-700 transition">
                                {proj.title}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-600 shrink-0 ml-2" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
