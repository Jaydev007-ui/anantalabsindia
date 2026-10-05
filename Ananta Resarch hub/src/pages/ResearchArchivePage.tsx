import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Filter, ArrowRight, FileText, Search } from 'lucide-react';
import { useHubData } from '../data/store';
import { StatusBadge } from '../components/common/StatusBadge';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResearchArchivePage: React.FC = () => {
  const { projects, researchers, trackPageView } = useHubData();
  const [filterYear, setFilterYear] = useState('All');
  const [filterArea, setFilterArea] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterResearcher, setFilterResearcher] = useState('All');

  React.useEffect(() => {
    trackPageView('/research/archive');
  }, []);

  const years = useMemo(() => {
    const list = Array.from(new Set(projects.map(p => p.year))).sort((a, b) => b - a);
    return list;
  }, [projects]);

  const areas = [
    'All',
    'Artificial Intelligence',
    'Mechanical Engineering',
    'Healthcare Technology',
    'Industry 4.0',
    'IoT & Embedded Systems',
    'Sustainable Technology'
  ];

  const statuses = ['All', 'Concept', 'Development', 'Experimental', 'Validation', 'Published', 'Deployed', 'Commercialized'];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchYear = filterYear === 'All' || p.year.toString() === filterYear;
      const matchArea = filterArea === 'All' || p.category === filterArea;
      const matchStatus = filterStatus === 'All' || p.status === filterStatus;
      const matchResearcher = filterResearcher === 'All' || p.authors.some(a => a.toLowerCase().includes(filterResearcher.toLowerCase()));
      return matchYear && matchArea && matchStatus && matchResearcher;
    });
  }, [projects, filterYear, filterArea, filterStatus, filterResearcher]);

  // Group filtered projects by Year
  const groupedByYear = useMemo(() => {
    const map: Record<number, typeof projects> = {};
    filteredProjects.forEach(p => {
      if (!map[p.year]) map[p.year] = [];
      map[p.year].push(p);
    });
    return map;
  }, [filteredProjects]);

  const sortedGroupYears = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SeoHead
        title="Research Archive | Ananta Labs Research & Innovation Hub"
        description="Chronological scientific archive of all research inventions, prototypes, and technical reports by Ananta Labs India."
        canonicalPath="archive"
      />

      <Breadcrumbs items={[{ label: 'Archive' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-sky-600" />
          <span>Chronological Scientific Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Research Archive
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Historical record of Ananta Labs engineering development, indexed chronologically by publication and milestone years.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-[11px] font-mono text-slate-500 mb-1">Year</label>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Years</option>
            {years.map(y => (
              <option key={y} value={y.toString()}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 mb-1">Research Area</label>
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
          >
            {areas.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 mb-1">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 mb-1">Lead Researcher</label>
          <select
            value={filterResearcher}
            onChange={(e) => setFilterResearcher(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Researchers</option>
            {researchers.map(r => (
              <option key={r.id} value={r.name}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chronological Archive Display */}
      {sortedGroupYears.length === 0 ? (
        <div className="text-center py-16 p-8 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-slate-600">No archival records match the selected parameters.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {sortedGroupYears.map(yr => (
            <div key={yr} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-extrabold font-mono text-sky-600">
                  {yr}
                </span>
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs font-mono text-slate-500">
                  {groupedByYear[yr].length} {groupedByYear[yr].length === 1 ? 'Publication' : 'Publications'}
                </span>
              </div>

              <div className="space-y-3">
                {groupedByYear[yr].map(proj => (
                  <div
                    key={proj.id}
                    className="p-5 bg-white hover:bg-white border border-slate-200 hover:border-sky-300 rounded-2xl transition flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-sky-600 font-semibold">{proj.researchId}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{proj.category}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{proj.publicationDate}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition">
                        <Link to={`/research/project/${proj.slug}`}>
                          {proj.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Authors: {proj.authors.join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <StatusBadge status={proj.status} size="sm" />
                      <Link
                        to={`/research/project/${proj.slug}`}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 rounded-lg transition flex items-center gap-1.5"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
