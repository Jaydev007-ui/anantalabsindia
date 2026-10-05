import React, { useState } from 'react';
import { Wrench, Search, Calculator, ArrowRight } from 'lucide-react';
import { useHubData } from '../data/store';
import { ToolCard } from '../components/tools/ToolCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const EngineeringToolsPage: React.FC = () => {
  const { tools, trackPageView } = useHubData();
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  React.useEffect(() => {
    trackPageView('/research/tools');
  }, []);

  const categories = ['All', 'General Engineering', 'Mechanical Engineering', 'Fluid Power', 'Fluid Dynamics', 'Thermal Engineering', 'AI & Embedded Systems'];

  const filteredTools = tools.filter(t => {
    const matchQ =
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase());
    const matchC = selectedCat === 'All' || t.category === selectedCat;
    return matchQ && matchC;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Engineering Tools & Calculators | Ananta Labs Research & Innovation Hub"
        description="Free, client-side engineering calculators for torque, thermal resistance, Reynolds numbers, hydraulic cylinders, heat transfer, and edge computer vision."
        canonicalPath="tools"
      />

      <Breadcrumbs items={[{ label: 'Engineering Tools' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50/70 border border-emerald-200/50 text-emerald-700 text-xs font-mono">
          <Wrench className="w-3.5 h-3.5" />
          <span>Interactive Computational Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ananta Labs Engineering Tools
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          High-performance, zero-latency engineering calculators operating completely client-side. Complete with governing mathematical formulas and physical assumptions.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-2xl">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools (e.g. Reynolds, Torque, Pressure, Heat Sink)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCat === c
                  ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/40'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};
