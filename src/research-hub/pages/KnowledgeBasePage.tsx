import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, BookOpen, Cpu, Wrench, Flame } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const KnowledgeBasePage: React.FC = () => {
  const { knowledgeBase, trackPageView } = useHubData();

  React.useEffect(() => {
    trackPageView('/research/knowledge-base');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Knowledge Base | Technical Encyclopedia | Ananta Labs Research"
        description="Comprehensive technical encyclopedia covering artificial intelligence, computer vision, conjugate heat transfer, and Industry 4.0 cyber-physical systems."
        canonicalPath="knowledge-base"
      />

      <Breadcrumbs items={[{ label: 'Knowledge Base' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50/70 border border-indigo-200/50 text-indigo-700 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Encyclopedia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Research Knowledge Base
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          An authoritative repository of foundational engineering principles, theoretical frameworks, and industrial application taxonomies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {knowledgeBase.map(item => (
          <article
            key={item.id}
            className="p-7 bg-white hover:bg-white border border-slate-200 hover:border-indigo-500/40 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono text-indigo-600 mb-2">{item.category}</div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition mb-3">
                <Link to={`/research/knowledge-base/${item.slug}`}>
                  {item.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {item.definition}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.relatedTechnologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">
                {item.keyConcepts.length} Key Concepts
              </span>
              <Link
                to={`/research/knowledge-base/${item.slug}`}
                className="font-semibold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 transition"
              >
                <span>Read Encyclopedia Entry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
