import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Sparkles, Clock, User, Wrench } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ExplainersPage: React.FC = () => {
  const { explainers, trackPageView } = useHubData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  React.useEffect(() => {
    trackPageView('/research/explainers');
  }, []);

  const categories = ['All', 'Artificial Intelligence', 'Mechanical Engineering', 'Healthcare Technology', 'Industry 4.0', 'IoT & Embedded Systems'];

  const filteredExplainers = explainers.filter(e => {
    const matchSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCat === 'All' || e.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Research Explained | Technical Primers | Ananta Labs Research"
        description="Clear, mathematically rigorous engineering primers explaining YOLO, Computer Vision, Thermal Resistance, ESP32 Vision, and Industry 4.0."
        canonicalPath="explainers"
      />

      <Breadcrumbs items={[{ label: 'Research Explained' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50/70 border border-amber-200/50 text-amber-700 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational & Technical Primers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Research Explained
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Deep, mathematically grounded engineering articles breaking down complex technologies into accessible, rigorous primers. Connected directly to Ananta Labs projects.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-2xl">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search primers (e.g. YOLO, Heat Sink, ESP32, PID)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCat === c
                  ? 'bg-amber-500/20 text-amber-700 border border-amber-500/40'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExplainers.map(article => (
          <article
            key={article.id}
            className="flex flex-col p-6 bg-white hover:bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl transition group"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
              <span className="text-amber-600 font-semibold">{article.category}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readTime}
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition leading-snug mb-3">
              <Link to={`/research/explainer/${article.slug}`}>
                {article.title}
              </Link>
            </h2>

            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6 flex-1">
              {article.summary}
            </p>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">By {article.author}</span>
              <Link
                to={`/research/explainer/${article.slug}`}
                className="font-semibold text-amber-600 group-hover:text-amber-700 transition flex items-center gap-1"
              >
                <span>Read Primer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
