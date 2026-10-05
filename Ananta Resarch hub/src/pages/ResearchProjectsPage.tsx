import React, { useState, useMemo } from 'react';
import { Search, Filter, Cpu, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useHubData } from '../data/store';
import { ResearchCard } from '../components/research/ResearchCard';
import { SeoHead } from '../components/common/SeoHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ResearchAreaCategory, ResearchStatus } from '../types';

export const ResearchProjectsPage: React.FC = () => {
  const { projects, trackPageView } = useHubData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  React.useEffect(() => {
    trackPageView('/research/projects');
  }, []);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Mechanical Engineering',
    'Healthcare Technology',
    'Industry 4.0',
    'IoT & Embedded Systems',
    'Sustainable Technology'
  ];

  const statuses = [
    'All',
    'Concept',
    'Development',
    'Experimental',
    'Validation',
    'Published',
    'Deployed',
    'Commercialized'
  ];

  const years = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.year.toString()));
    return ['All', ...Array.from(set).sort().reverse()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.researchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
      const matchYear = selectedYear === 'All' || p.year.toString() === selectedYear;

      return matchSearch && matchCategory && matchStatus && matchYear;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus, selectedYear]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Research Projects | Ananta Labs Research & Innovation Hub"
        description="Browse all engineering inventions, applied AI prototypes, and precision electromechanical research projects published by Ananta Labs India."
        canonicalPath="projects"
      />

      <Breadcrumbs items={[{ label: 'Projects' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200/50 text-sky-700 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5" />
          <span>Ananta Labs Research Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Research Projects
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Discover our original engineering research, from autonomous edge vision systems to medical perfusion machines and high-flux microchannel heatsinks.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by ID (e.g. ALR-2026-001), keywords, technology, or abstract..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-500 mb-1">Research Area</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
            >
              {categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-500 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
            >
              {statuses.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-500 mb-1">Publication Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
            >
              {years.map((y, i) => (
                <option key={i} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 font-mono border-t border-slate-200">
          <span>Showing {filteredProjects.length} of {projects.length} research projects</span>
          {(searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All' || selectedYear !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSelectedYear('All');
              }}
              className="text-sky-600 hover:text-sky-700"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 p-8 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-slate-600 font-medium">No projects match the selected criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try broadening your search query or clearing active filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <ResearchCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
