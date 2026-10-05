import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Layers, CheckCircle2, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';
import { ResearchCard } from '../components/research/ResearchCard';

export const KnowledgeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { knowledgeBase, projects, trackPageView } = useHubData();

  const item = knowledgeBase.find(k => k.slug === slug);

  useEffect(() => {
    if (item) {
      trackPageView(`/research/knowledge-base/${item.slug}`);
    }
  }, [item]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Topic Not Found</h2>
        <Link to="/research/knowledge-base" className="text-indigo-600 hover:underline">
          Return to Knowledge Base
        </Link>
      </div>
    );
  }

  const relatedProjects = projects.filter(p => item.relatedProjectSlugs.includes(p.slug));

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title={`${item.title} | Technical Knowledge Base | Ananta Labs`}
        description={item.definition}
        canonicalPath={`knowledge-base/${item.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Knowledge Base', url: '/research/knowledge-base' },
          { label: item.title }
        ]}
      />

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-slate-200">
        <span className="inline-block px-3 py-1 rounded-md bg-indigo-50/70 border border-indigo-200/60 text-xs font-mono text-indigo-700 font-semibold">
          {item.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {item.title}
        </h1>
        <div className="p-6 bg-white border border-indigo-500/20 rounded-2xl">
          <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold mb-2">
            Formal Definition
          </h2>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            {item.definition}
          </p>
        </div>
      </header>

      {/* Core Explanation */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Core Theoretical Explanation</h2>
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {item.coreExplanation}
          </p>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Fundamental Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {item.keyConcepts.map((concept, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-sky-700 font-mono">{concept.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{concept.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industrial Applications */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Industrial Applications</h2>
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            {item.industrialApplications.map((app, i) => (
              <li key={i}>{app}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Advantages & Limitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 bg-slate-50 border border-emerald-900/30 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Advantages</span>
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {item.advantages.map((adv, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="p-6 bg-slate-50 border border-rose-900/30 rounded-2xl space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Limitations & Engineering Constraints</span>
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {item.limitations.map((lim, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Related Technologies */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Related Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {item.relatedTechnologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-xs font-mono text-slate-600 rounded-lg">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Related Ananta Labs Research */}
      {relatedProjects.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <div className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Related Ananta Labs Research</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map(p => (
              <ResearchCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {item.references.length > 0 && (
        <section className="space-y-2 pt-6 border-t border-slate-200">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">References</h2>
          <ul className="space-y-1 text-xs font-mono text-slate-500">
            {item.references.map((ref, idx) => (
              <li key={idx}>• {ref}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};
