import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  FlaskConical, 
  Wrench, 
  FileText, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  Award,
  Users,
  Compass,
  Building,
  ExternalLink,
  Zap,
  BrainCircuit,
  Factory,
  Clock
} from 'lucide-react';
import { useHubData } from '../data/store';
import { InteractiveCanvas } from '../components/common/InteractiveCanvas';
import { ResearchCard } from '../components/research/ResearchCard';
import { ToolCard } from '../components/tools/ToolCard';
import { SeoHead } from '../components/common/SeoHead';
import { LeadModal } from '../components/common/LeadModal';

export const HomePage: React.FC = () => {
  const { stats, projects, tools, explainers, trackPageView } = useHubData();
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadContext, setLeadContext] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    trackPageView('/research');
  }, []);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);
  const recentExplainers = explainers.slice(0, 3);
  const previewTools = tools.slice(0, 3);

  const openLead = (context?: string) => {
    setLeadContext(context);
    setLeadModalOpen(true);
  };

  return (
    <div className="relative space-y-20 pb-20">
      <SeoHead
        title="Ananta Labs Research & Innovation Hub | Research. Engineer. Innovate."
        description="Explore the research, experiments, engineering projects and emerging technology work developed by Ananta Labs India. Discover SwachhVision, precision medical devices, and free engineering calculators."
        canonicalPath=""
      />

      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center border-b border-slate-200 bg-gradient-to-b from-white via-sky-50/30 to-slate-50 overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
        {/* Subtle CAD / Particle Interactive Canvas */}
        <InteractiveCanvas />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-400/10 via-blue-500/10 to-indigo-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-mono text-sky-700 shadow-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span>Ananta Labs India • Digital R&D Platform</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Research. Engineer. <br />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Innovate.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Explore the research, experiments, engineering projects and emerging technology work developed by <strong className="text-slate-900 font-semibold">Ananta Labs India</strong>.
          </p>

          <p className="text-xs sm:text-sm font-mono text-slate-500 max-w-xl mx-auto">
            Exploring ideas. Engineering solutions. Documenting innovation.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full">
            <Link
              to="/research/projects"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold rounded-xl text-sm shadow-md shadow-sky-600/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Explore Research</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/research/tools"
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-xl text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4 text-emerald-600" />
              <span>Explore Engineering Tools</span>
            </Link>
          </div>

          {/* Intel Partner Alliance Ecosystem Badge */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
              <img
                src="/intel-partner.jpg"
                alt="Intel Partner Alliance Badge"
                className="w-8 h-8 rounded-lg object-contain shadow-2xs shrink-0"
              />
              <div className="text-left font-sans">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold leading-tight">
                  Computing Ecosystem
                </span>
                <span className="text-xs font-extrabold text-slate-800 leading-tight flex items-center gap-1.5">
                  Intel Partner Alliance
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specs Ticker */}
          <div className="pt-6 border-t border-slate-200/80 max-w-3xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
              Edge AI & Computer Vision
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Medical Electromechanics
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Microchannel Thermal Systems
            </span>
          </div>
        </div>
      </section>

      {/* Strategic Technology Alliance Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-1.5 shrink-0 shadow-md">
              <img src="/intel-partner.jpg" alt="Intel Partner Alliance Official Badge" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-semibold uppercase tracking-wider border border-sky-400/30">
                  Global Hardware Alliance
                </span>
                <span className="text-xs font-mono text-slate-400">Edge AI & OpenVINO Acceleration</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Ananta Labs is an Official Intel Partner Alliance Member
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Deploying hardware-accelerated deep learning inferencing, embedded vision runtimes, and real-time civic sensing nodes optimized for Intel architecture.
              </p>
            </div>
          </div>
          <Link
            to="/research/about"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-mono font-semibold transition shrink-0 whitespace-nowrap"
          >
            Learn About Lab Alliances →
          </Link>
        </div>
      </section>

      {/* Dynamic Statistics Section (Section 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-sky-700 font-semibold">
                Ananta Labs Research Metrics
              </h2>
              <p className="text-xs text-slate-500">
                Validated R&D disclosures, active testbeds, and intellectual property.
              </p>
            </div>
            <Link
              to="/research/timeline"
              className="text-xs font-mono text-slate-500 hover:text-sky-600 flex items-center gap-1 transition"
            >
              <span>View Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 mb-1">
                {stats.projectsCount}
              </div>
              <div className="text-xs font-medium text-slate-600">Research Projects</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-sky-700 mb-1">
                {stats.experimentalStudiesCount}
              </div>
              <div className="text-xs font-medium text-slate-600">Experimental Studies</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-700 mb-1">
                {stats.patentsIpCount}
              </div>
              <div className="text-xs font-medium text-slate-600">Patents & IP</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-700 mb-1">
                {stats.researchAreasCount}
              </div>
              <div className="text-xs font-medium text-slate-600">Research Areas</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-700 mb-1">
                {stats.researchersCount}
              </div>
              <div className="text-xs font-medium text-slate-600">Lead Researchers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research (Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-700 uppercase tracking-wider mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Inventions & Prototypes</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Research
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Major engineering systems developed and validated inside Ananta Labs testbeds.
            </p>
          </div>
          <Link
            to="/research/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(project => (
            <ResearchCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Research Areas Overview (Section 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-indigo-700 uppercase tracking-wider mb-2 font-semibold">
              Domain Specializations
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Research Areas
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Interdisciplinary engineering domains driving Ananta Labs technological focus.
            </p>
          </div>
          <Link
            to="/research/areas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
          >
            <span>Explore All 6 Disciplines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/research/areas"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-300 rounded-2xl transition shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-4 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition mb-2">
              Artificial Intelligence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Computer Vision, edge quantization, TinyML on microcontrollers, and real-time civic detection systems.
            </p>
            <span className="text-xs font-mono text-sky-600 flex items-center gap-1 font-medium">
              Explore Domain <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/research/areas"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">
              Mechanical Engineering
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              High-flux microchannel heat sinks, pin-fin turbulators, fluid dynamics, and precision machine design.
            </p>
            <span className="text-xs font-mono text-blue-600 flex items-center gap-1 font-medium">
              Explore Domain <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/research/areas"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition mb-2">
              Healthcare Technology
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Automated arterial embalming machines, closed-loop perfusion pressure regulation, and wearable biomechanics.
            </p>
            <span className="text-xs font-mono text-emerald-600 flex items-center gap-1 font-medium">
              Explore Domain <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/research/areas"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 rounded-2xl transition shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition mb-2">
              Industry 4.0
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Sub-kilohertz vibration FFT sensors, predictive bearing wear models, and autonomous factory telemetry nodes.
            </p>
            <span className="text-xs font-mono text-amber-600 flex items-center gap-1 font-medium">
              Explore Domain <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/research/areas"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-purple-300 rounded-2xl transition shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition mb-2">
              IoT & Embedded Systems
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Deterministic firmware, ultra-low power sensor meshes, ESP32 camera integration, and RISC-V nodes.
            </p>
            <span className="text-xs font-mono text-purple-600 flex items-center gap-1 font-medium">
              Explore Domain <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/research/areas"
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal-300 rounded-2xl transition shadow-xs hover:shadow-md group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition mb-2">
              Sustainable Technology
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Passive hydrodynamic vortex aerators, effluent treatment energy slashing, and clean industrial fluidics.
            </p>
            <span className="text-xs font-mono text-teal-600 flex items-center gap-1 font-medium">
              Explore Domain <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* Engineering Tools Highlights (Section 13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-700 uppercase tracking-wider mb-2 font-semibold">
              Free Technical Utilities
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Ananta Labs Engineering Tools
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Interactive, client-side engineering calculators with instant results and governing formulas.
            </p>
          </div>
          <Link
            to="/research/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
          >
            <span>View All Calculators</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Research Explained (Section 12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-amber-700 uppercase tracking-wider mb-2 font-semibold">
              Organic Technical Knowledge
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Research Explained
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Complicated scientific and engineering concepts demystified with mathematical rigor.
            </p>
          </div>
          <Link
            to="/research/explainers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
          >
            <span>View All Explainers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentExplainers.map(article => (
            <div
              key={article.id}
              className="flex flex-col p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 rounded-2xl transition shadow-xs hover:shadow-md group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-3">
                <span className="text-amber-700 font-medium">{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition mb-3 leading-snug">
                <Link to={`/research/explainer/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-5 flex-1">
                {article.summary}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">By {article.author}</span>
                <Link
                  to={`/research/explainer/${article.slug}`}
                  className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical MCQ Examinations & Certification Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300 font-mono text-xs font-semibold">
                <Award className="w-4 h-4 text-sky-600" />
                <span>Standardized Technical Assessment & Certification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Ananta Labs Engineering MCQ Examinations
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Take timed, rigorous 40-question technical competency exams across 6 key disciplines. 
                Score 60% or higher to earn an official, auto-generated Ananta Labs Certificate of Research Competence.
              </p>
            </div>

            <Link
              to="/research/exams"
              className="px-6 py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-sky-600/20 whitespace-nowrap self-start md:self-auto"
            >
              <span>Explore All Assessments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Exam Stats / Rules Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
              <span><strong>60 Minutes</strong> Timed</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
              <span><strong>40 Questions</strong> Hard MCQ</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>60% Pass Criteria</strong> (24/40)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Auto Certificate</strong> Verification</span>
            </div>
          </div>

          {/* 6 Topic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'IoT',
                desc: 'MQTT/CoAP, 6LoWPAN, LoRaWAN CSS & embedded edge telemetry.',
                icon: Cpu,
                color: 'text-sky-600 bg-sky-50 border-sky-200'
              },
              {
                title: 'Electronics',
                desc: 'Op-amps, MOSFET/BJT biasing, RF transmission lines & VLSI circuits.',
                icon: Zap,
                color: 'text-amber-600 bg-amber-50 border-amber-200'
              },
              {
                title: 'Artificial intelligence',
                desc: 'CNNs, Transformers, backprop dynamics & generative architectures.',
                icon: BrainCircuit,
                color: 'text-purple-600 bg-purple-50 border-purple-200'
              },
              {
                title: 'Mechanical engineering',
                desc: 'Thermodynamics, Rankine cycle, Navier-Stokes & machine kinematics.',
                icon: Wrench,
                color: 'text-blue-600 bg-blue-50 border-blue-200'
              },
              {
                title: 'Manufacturing',
                desc: "Merchant's force circle, Taylor's tool life, casting & CNC machining.",
                icon: Factory,
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
              },
              {
                title: 'Strength of materials',
                desc: "Mohr's circle, Euler buckling, shear center & von Mises criteria.",
                icon: Layers,
                color: 'text-rose-600 bg-rose-50 border-rose-200'
              }
            ].map((t) => {
              const IconComp = t.icon;
              return (
                <div
                  key={t.title}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${t.color}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        40 Qs
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition text-sm">
                        {t.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      to="/research/exams"
                      className="w-full py-2 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Take Exam</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Lead Generation Section (Section 25) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50/60 border border-sky-200 shadow-xs relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-md bg-sky-100 border border-sky-200 text-sky-800 text-xs font-mono font-medium">
              Collaborate With Ananta Labs India
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Looking to deploy edge AI vision or custom medical instrumentation?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We partner with municipalities, medical faculties, industrial manufacturers, and tech enterprises for joint R&D, rapid prototyping, and technology transfer.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openLead('Home Lead Banner')}
                className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-sky-600/20 transition flex items-center gap-2"
              >
                <span>Collaborate With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/research/about"
                className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 shadow-xs transition"
              >
                Learn About Our Labs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultType="Research Collaboration"
        relatedProjectTitle={leadContext}
      />
    </div>
  );
};
