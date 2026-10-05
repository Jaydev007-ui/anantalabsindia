import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, FileText, BookOpen, Wrench, FlaskConical, User, ArrowRight, Layers } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const GlobalSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { projects, explainers, tools, knowledgeBase, experiments, researchers, trackSearch } = useHubData();

  useEffect(() => {
    if (initialQuery) {
      trackSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
    trackSearch(query);
  };

  const q = query.toLowerCase().trim();

  const matchedProjects = q
    ? projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.researchId.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    : [];

  const matchedExplainers = q
    ? explainers.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      )
    : [];

  const matchedTools = q
    ? tools.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      )
    : [];

  const matchedKnowledge = q
    ? knowledgeBase.filter(k =>
        k.title.toLowerCase().includes(q) ||
        k.definition.toLowerCase().includes(q)
      )
    : [];

  const matchedExperiments = q
    ? experiments.filter(exp =>
        exp.title.toLowerCase().includes(q) ||
        exp.experimentId.toLowerCase().includes(q) ||
        exp.objective.toLowerCase().includes(q)
      )
    : [];

  const matchedResearchers = q
    ? researchers.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.researchInterests.some(i => i.toLowerCase().includes(q))
      )
    : [];

  const totalResults =
    matchedProjects.length +
    matchedExplainers.length +
    matchedTools.length +
    matchedKnowledge.length +
    matchedExperiments.length +
    matchedResearchers.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Global Search | Ananta Labs Research Hub"
        description="Search across all research projects, technical explainers, engineering calculators, knowledge articles, and experiments."
        canonicalPath="search"
      />

      <Breadcrumbs items={[{ label: 'Global Search' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Research & Knowledge Search Hub
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-5 h-5 text-sky-600 absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all research projects, articles, tools, experiments, formulas..."
            className="w-full pl-12 pr-28 py-3 bg-white border border-slate-200 rounded-2xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 shadow-xl"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 px-5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>

      {q && (
        <div className="text-xs font-mono text-slate-500">
          Found <strong className="text-sky-600">{totalResults}</strong> results matching "{query}"
        </div>
      )}

      {/* Results Groups */}
      <div className="space-y-8">
        {/* Research Projects */}
        {matchedProjects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Research Projects ({matchedProjects.length})</span>
            </h2>
            <div className="space-y-2">
              {matchedProjects.map(p => (
                <Link
                  key={p.id}
                  to={`/research/project/${p.slug}`}
                  className="p-4 bg-white hover:bg-white border border-slate-200 hover:border-sky-300 rounded-xl transition flex items-center justify-between group block"
                >
                  <div>
                    <div className="text-[11px] font-mono text-sky-600">
                      Research Project • {p.researchId}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-sky-700 transition text-sm">
                      {p.title}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{p.abstract}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-600 shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Explainers */}
        {matchedExplainers.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Research Explained ({matchedExplainers.length})</span>
            </h2>
            <div className="space-y-2">
              {matchedExplainers.map(e => (
                <Link
                  key={e.id}
                  to={`/research/explainer/${e.slug}`}
                  className="p-4 bg-white hover:bg-white border border-slate-200 hover:border-amber-500/40 rounded-xl transition flex items-center justify-between group block"
                >
                  <div>
                    <div className="text-[11px] font-mono text-amber-600">
                      Technical Primer • {e.category}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-amber-700 transition text-sm">
                      {e.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-600 shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        {matchedTools.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span>Engineering Tools ({matchedTools.length})</span>
            </h2>
            <div className="space-y-2">
              {matchedTools.map(t => (
                <Link
                  key={t.id}
                  to={`/research/tools/${t.slug}`}
                  className="p-4 bg-white hover:bg-white border border-slate-200 hover:border-emerald-500/40 rounded-xl transition flex items-center justify-between group block"
                >
                  <div>
                    <div className="text-[11px] font-mono text-emerald-600">
                      Calculator • {t.category}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition text-sm">
                      {t.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Knowledge */}
        {matchedKnowledge.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Knowledge Base ({matchedKnowledge.length})</span>
            </h2>
            <div className="space-y-2">
              {matchedKnowledge.map(k => (
                <Link
                  key={k.id}
                  to={`/research/knowledge-base/${k.slug}`}
                  className="p-4 bg-white hover:bg-white border border-slate-200 hover:border-indigo-500/40 rounded-xl transition flex items-center justify-between group block"
                >
                  <div>
                    <div className="text-[11px] font-mono text-indigo-600">
                      Encyclopedia Topic • {k.category}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition text-sm">
                      {k.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Experiments */}
        {matchedExperiments.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-600 font-bold flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>Experiments ({matchedExperiments.length})</span>
            </h2>
            <div className="space-y-2">
              {matchedExperiments.map(exp => (
                <Link
                  key={exp.id}
                  to={`/research/experiments/${exp.slug}`}
                  className="p-4 bg-white hover:bg-white border border-slate-200 hover:border-purple-500/40 rounded-xl transition flex items-center justify-between group block"
                >
                  <div>
                    <div className="text-[11px] font-mono text-purple-600">
                      Experimental Study • {exp.experimentId}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-purple-700 transition text-sm">
                      {exp.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-600 shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Researchers */}
        {matchedResearchers.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Researchers ({matchedResearchers.length})</span>
            </h2>
            <div className="space-y-2">
              {matchedResearchers.map(r => (
                <Link
                  key={r.id}
                  to={`/research/researcher/${r.slug}`}
                  className="p-4 bg-white hover:bg-white border border-slate-200 hover:border-sky-500/40 rounded-xl transition flex items-center justify-between group block"
                >
                  <div>
                    <div className="text-[11px] font-mono text-sky-400">
                      Researcher • {r.role}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-sky-300 transition text-sm">
                      {r.name}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0 ml-4" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
