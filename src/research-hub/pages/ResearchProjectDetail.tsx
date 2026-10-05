import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Share2, 
  ExternalLink, 
  Printer, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Building, 
  Calendar, 
  User, 
  CheckCircle2, 
  Layers, 
  Wrench,
  BookOpen,
  Database,
  Award
} from 'lucide-react';
import { useHubData } from '../data/store';
import { StatusBadge } from '../components/common/StatusBadge';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { VisualizerModal } from '../components/research/VisualizerModal';
import { LeadModal } from '../components/common/LeadModal';
import { ResearchCard } from '../components/research/ResearchCard';

export const ResearchProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { projects, researchers, trackPageView, trackPdfDownload } = useHubData();

  const [visualizerOpen, setVisualizerOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    if (project) {
      trackPageView(`/research/project/${project.slug}`);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Research Project Not Found</h2>
        <p className="text-slate-500">The requested research document could not be located in the Ananta Labs repository.</p>
        <Link to="/research/projects" className="inline-block px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white text-sm font-semibold transition">
          Return to Projects
        </Link>
      </div>
    );
  }

  const relatedProjects = projects.filter(p => project.relatedProjectSlugs.includes(p.slug));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadPdf = () => {
    trackPdfDownload(project.slug);
    window.print();
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SeoHead
        title={project.seoTitle || `${project.title} | Ananta Labs Research`}
        description={project.seoDescription || project.abstract}
        canonicalPath={`project/${project.slug}`}
        type="scholarly"
        authors={project.authors}
        publishedDate={project.publicationDate}
        jsonLd={{
          "@type": "ScholarlyArticle",
          "headline": project.title,
          "identifier": project.researchId,
          "author": project.authors.map(a => ({ "@type": "Person", "name": a })),
          "datePublished": project.publicationDate,
          "description": project.abstract
        }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Projects', url: '/research/projects' },
          { label: project.researchId }
        ]}
      />

      {/* Header Metadata Section (Section 8) */}
      <header className="space-y-6 pb-8 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-sky-600 px-3 py-1 rounded-md bg-sky-50 border border-sky-200/80">
              {project.researchId}
            </span>
            <span className="text-xs font-mono text-slate-500">
              Published: {project.publicationDate}
            </span>
          </div>
          <StatusBadge status={project.status} size="md" />
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
          {project.title}
        </h1>

        {/* Authors and Organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-600 pt-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-sky-600 shrink-0" />
            <div>
              <span className="text-slate-500">Authors: </span>
              <span className="font-semibold text-slate-900">
                {project.authors.join(", ")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-slate-500">Organization: </span>
              <span className="text-slate-800">{project.organization}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Read, Download PDF, Interactive Model */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            onClick={() => setVisualizerOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            <span>Interactive Model & Simulation</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-medium transition flex items-center gap-2"
            title="Download PDF or print report"
          >
            <Download className="w-4 h-4 text-sky-600" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-medium transition flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>{copiedLink ? "Link Copied!" : "Share Research"}</span>
          </button>
        </div>

        {/* Identifiers (Patent / DOI / Dataset) */}
        {(project.patent || project.doi || project.datasetUrl) && (
          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-mono">
            {project.patent && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50/40 border border-amber-200/50 text-amber-700">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Patent: {project.patent}</span>
              </span>
            )}
            {project.doi && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50/40 border border-blue-200/50 text-blue-700">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>DOI: {project.doi}</span>
              </span>
            )}
            {project.datasetUrl && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-600">
                <Database className="w-3.5 h-3.5 text-sky-600" />
                <span>Dataset: Available</span>
              </span>
            )}
          </div>
        )}
      </header>

      {/* Main Scientific Sections */}
      <div className="space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
        {/* Abstract */}
        <section className="p-6 sm:p-8 bg-white border border-cyan-500/20 rounded-2xl space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold">
            Abstract
          </h2>
          <p className="text-slate-800 leading-relaxed font-normal">
            {project.abstract}
          </p>
        </section>

        {/* Research Problem & Objective Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">
              Research Problem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.researchProblem}
            </p>
          </section>

          <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
              Objective
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.objective}
            </p>
          </section>
        </div>

        {/* Methodology */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-cyan-400" />
            Methodology
          </h2>
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-slate-600 leading-relaxed">
              {project.methodology}
            </p>
          </div>
        </section>

        {/* System Architecture */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-blue-400" />
            System Architecture
          </h2>
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-slate-600 leading-relaxed">
              {project.systemArchitecture}
            </p>
          </div>
        </section>

        {/* Performance Metrics Table / Cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-emerald-400" />
            Empirical Results & Key Metrics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {project.performanceMetrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-slate-200 rounded-xl text-center"
              >
                <div className="text-[11px] font-mono text-slate-500">{m.label}</div>
                <div className="text-2xl font-extrabold font-mono text-sky-700 mt-1">
                  {m.value}
                </div>
                {m.unit && <div className="text-[11px] font-mono text-slate-500">{m.unit}</div>}
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-slate-600 leading-relaxed">
              {project.results}
            </p>
          </div>
        </section>

        {/* Experimental Setup & Development Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Experimental Setup
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.experimentalSetup}
            </p>
          </section>

          <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Development Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.developmentProcess}
            </p>
          </section>
        </div>

        {/* Discussion & Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Discussion
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.discussion}
            </p>
          </section>

          <section className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-rose-400/90 font-bold">
              Limitations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.limitations}
            </p>
          </section>
        </div>

        {/* Applications */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded bg-indigo-400" />
            Field & Industrial Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.applications.map((app, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Future Work & Conclusion */}
        <section className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-4">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold mb-1">
              Future Work
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.futureWork}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">
              Conclusion
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {project.conclusion}
            </p>
          </div>
        </section>

        {/* References */}
        {project.references.length > 0 && (
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              References & Citations
            </h2>
            <ol className="space-y-1.5 list-decimal list-inside text-xs font-mono text-slate-500">
              {project.references.map((ref, idx) => (
                <li key={idx} className="text-slate-500">{ref}</li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {/* Strategic Lead Generation CTA Box (Section 25) */}
      <section className="p-8 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-blue-50/60 border border-sky-200 shadow-xs space-y-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-700">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Ananta Labs Commercialization & Prototyping</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Interested in this technology?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Talk to Ananta Labs about research collaboration, prototyping, custom engineering deployment, or IP licensing regarding <strong>{project.title}</strong>.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setLeadModalOpen(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-sky-600/20 transition flex items-center gap-2"
          >
            <span>Collaborate With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            to="/research/contact"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 transition"
          >
            Direct Inquiry
          </Link>
        </div>
      </section>

      {/* Related Research Projects (Section 8 & 23 Internal Linking) */}
      {relatedProjects.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Related Ananta Labs Research
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map(rel => (
              <ResearchCard key={rel.id} project={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Visualizer Modal */}
      <VisualizerModal
        isOpen={visualizerOpen}
        onClose={() => setVisualizerOpen(false)}
        project={project}
      />

      {/* Lead Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultType="Technology Development"
        relatedProjectTitle={`${project.researchId}: ${project.title}`}
      />
    </article>
  );
};
