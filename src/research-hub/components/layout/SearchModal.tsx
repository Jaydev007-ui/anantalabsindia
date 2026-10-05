import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Wrench, BookOpen, FlaskConical, User, TrendingUp, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useHubData } from '../../data/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { projects, explainers, tools, knowledgeBase, experiments, researchers, briefs, trackSearch } = useHubData();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from external key event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProjects = q
    ? projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.researchId.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const filteredExplainers = q
    ? explainers.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredTools = q
    ? tools.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredKnowledge = q
    ? knowledgeBase.filter(k =>
        k.title.toLowerCase().includes(k.title.toLowerCase()) && (
          k.title.toLowerCase().includes(q) ||
          k.definition.toLowerCase().includes(q) ||
          k.category.toLowerCase().includes(q)
        )
      ).slice(0, 3)
    : [];

  const filteredExperiments = q
    ? experiments.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.experimentId.toLowerCase().includes(q) ||
        e.objective.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  const filteredResearchers = q
    ? researchers.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.biography.toLowerCase().includes(q) ||
        r.researchInterests.some(i => i.toLowerCase().includes(q))
      ).slice(0, 2)
    : [];

  const totalResults =
    filteredProjects.length +
    filteredExplainers.length +
    filteredTools.length +
    filteredKnowledge.length +
    filteredExperiments.length +
    filteredResearchers.length;

  const handleSelect = (url: string) => {
    trackSearch(query);
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 px-3 sm:px-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[80vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <Search className="w-5 h-5 text-sky-600 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research, projects, explainers, formulas, tools, researchers..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-5 text-sm">
          {!q ? (
            <div className="py-8 text-center text-slate-500 space-y-3">
              <p className="text-xs uppercase tracking-wider font-mono text-slate-500 font-semibold">Quick Suggestions</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                <button
                  onClick={() => setQuery('SwachhVision')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-lg border border-slate-200 text-slate-700 transition"
                >
                  SwachhVision
                </button>
                <button
                  onClick={() => setQuery('Embalming')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-lg border border-slate-200 text-slate-700 transition"
                >
                  Embalming Machine
                </button>
                <button
                  onClick={() => setQuery('YOLO')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-lg border border-slate-200 text-slate-700 transition"
                >
                  What is YOLO?
                </button>
                <button
                  onClick={() => setQuery('Reynolds')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-lg border border-slate-200 text-slate-700 transition"
                >
                  Reynolds Calculator
                </button>
                <button
                  onClick={() => setQuery('Heat Sink')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-lg border border-slate-200 text-slate-700 transition"
                >
                  Heat Sink Convection
                </button>
                <button
                  onClick={() => setQuery('Jaydev Zala')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-lg border border-slate-200 text-slate-700 transition"
                >
                  Jaydev Zala
                </button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <p className="text-base text-slate-800 font-medium">No direct matches found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for keywords like "vision", "thermal", "microchannel", "fluid", or "sensor".</p>
            </div>
          ) : (
            <>
              {/* Projects */}
              {filteredProjects.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-700 mb-2 flex items-center gap-1.5 font-semibold">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Research Projects ({filteredProjects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredProjects.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(`/research/project/${p.slug}`)}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-sky-700 font-medium">{p.researchId}</span>
                            <span className="text-xs text-slate-500">• {p.category}</span>
                          </div>
                          <div className="font-semibold text-slate-900 group-hover:text-sky-600 transition text-sm">
                            {p.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0 ml-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Explainers */}
              {filteredExplainers.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1.5 font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Research Explained ({filteredExplainers.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredExplainers.map(e => (
                      <div
                        key={e.id}
                        onClick={() => handleSelect(`/research/explainer/${e.slug}`)}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition"
                      >
                        <div>
                          <div className="text-xs text-slate-500">{e.category} • {e.readTime}</div>
                          <div className="font-semibold text-slate-900 group-hover:text-amber-700 transition text-sm">
                            {e.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 ml-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {filteredTools.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5 font-semibold">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Engineering Tools ({filteredTools.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredTools.map(t => (
                      <div
                        key={t.id}
                        onClick={() => handleSelect(`/research/tools/${t.slug}`)}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition"
                      >
                        <div>
                          <div className="text-xs text-slate-500">{t.category}</div>
                          <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition text-sm">
                            {t.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Knowledge Base */}
              {filteredKnowledge.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-700 mb-2 flex items-center gap-1.5 font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Knowledge Base ({filteredKnowledge.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredKnowledge.map(k => (
                      <div
                        key={k.id}
                        onClick={() => handleSelect(`/research/knowledge-base/${k.slug}`)}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition"
                      >
                        <div>
                          <div className="text-xs text-slate-500">{k.category}</div>
                          <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition text-sm">
                            {k.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiments */}
              {filteredExperiments.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-purple-700 mb-2 flex items-center gap-1.5 font-semibold">
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Experimental Studies ({filteredExperiments.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredExperiments.map(exp => (
                      <div
                        key={exp.id}
                        onClick={() => handleSelect(`/research/experiments/${exp.slug}`)}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition"
                      >
                        <div>
                          <div className="font-mono text-[11px] text-purple-700 font-medium">{exp.experimentId}</div>
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 transition text-sm">
                            {exp.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 shrink-0 ml-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Researchers */}
              {filteredResearchers.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-sky-700 mb-2 flex items-center gap-1.5 font-semibold">
                    <User className="w-3.5 h-3.5" />
                    <span>Researchers ({filteredResearchers.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResearchers.map(r => (
                      <div
                        key={r.id}
                        onClick={() => handleSelect(`/research/researcher/${r.slug}`)}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition"
                      >
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-sky-600 transition text-sm">
                            {r.name}
                          </div>
                          <div className="text-xs text-slate-500">{r.role}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0 ml-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-[10px] text-slate-600">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-[10px] text-slate-600">esc</kbd> Dismiss
            </span>
          </div>
          <button
            onClick={() => {
              if (query.trim()) {
                trackSearch(query);
                onClose();
                navigate(`/research/search?q=${encodeURIComponent(query)}`);
              }
            }}
            className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
          >
            <span>Full Search Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
