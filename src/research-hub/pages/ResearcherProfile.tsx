import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Award, BookOpen, ExternalLink, ArrowRight, ShieldCheck, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { ResearchCard } from '../components/research/ResearchCard';

export const ResearcherProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { researchers, projects, trackPageView } = useHubData();

  const researcher = researchers.find(r => r.slug === slug);

  useEffect(() => {
    if (researcher) {
      trackPageView(`/research/researcher/${researcher.slug}`);
    }
  }, [researcher]);

  if (!researcher) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Researcher Not Found</h2>
        <Link to="/research/researchers" className="text-sky-600 hover:underline">
          Return to Researchers Directory
        </Link>
      </div>
    );
  }

  // Filter projects led or authored by this researcher
  const authoredProjects = projects.filter(p =>
    p.authors.some(a => a.toLowerCase().includes(researcher.name.toLowerCase()))
  );

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SeoHead
        title={`${researcher.name} | ${researcher.role} | Ananta Labs`}
        description={researcher.biography}
        canonicalPath={`researcher/${researcher.slug}`}
        type="profile"
        jsonLd={{
          "@type": "Person",
          "name": researcher.name,
          "jobTitle": researcher.role,
          "worksFor": { "@type": "Organization", "name": "Ananta Labs India" },
          "description": researcher.biography
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Researchers', url: '/research/researchers' },
          { label: researcher.name }
        ]}
      />

      {/* Header Profile Card */}
      <header className="p-8 sm:p-10 bg-white border border-slate-200 rounded-3xl flex flex-col md:flex-row items-start gap-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-indigo-600/20 border border-sky-300 flex items-center justify-center text-sky-700 font-extrabold text-3xl sm:text-4xl font-mono shrink-0 shadow-xl shadow-cyan-950/30">
          {researcher.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div className="space-y-3 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{researcher.role}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {researcher.name}
          </h1>

          <p className="text-sm font-mono text-slate-600">
            {researcher.title} • Ananta Labs India
          </p>

          <p className="text-sm text-slate-600 leading-relaxed pt-1">
            {researcher.biography}
          </p>

          {/* External Scholarly Profiles (Section 19) */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {researcher.orcid && (
              <a
                href={`https://orcid.org/${researcher.orcid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-emerald-600 transition"
              >
                <span>ORCID: {researcher.orcid}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {researcher.googleScholar && (
              <a
                href={researcher.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-blue-600 transition"
              >
                <span>Google Scholar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {researcher.researchGate && (
              <a
                href={researcher.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-sky-600 transition"
              >
                <span>ResearchGate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {researcher.externalProfiles?.map((ext, idx) => (
              <a
                key={idx}
                href={ext.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 transition"
              >
                <span>{ext.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Research Interests */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Research Interests & Engineering Domains
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {researcher.researchInterests.map((interest, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{interest}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Research Projects by this Researcher */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Research Inventions & Projects ({authoredProjects.length})
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Validated Ananta Labs Work
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authoredProjects.map(p => (
            <ResearchCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </article>
  );
};
