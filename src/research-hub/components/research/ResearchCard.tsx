import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Cpu, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { ResearchProject } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface ResearchCardProps {
  project: ResearchProject;
  compact?: boolean;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ project, compact = false }) => {
  return (
    <article className="group relative flex flex-col bg-white hover:bg-slate-50/50 border border-slate-200/90 hover:border-sky-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg shadow-xs overflow-hidden">
      {/* Background blueprint subtle texture */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-tech-dots opacity-20 pointer-events-none" />

      {/* Top Header: ID, Year & Status */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-sky-700 px-2 py-0.5 rounded bg-sky-50 border border-sky-200">
            {project.researchId}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {project.year}
          </span>
        </div>
        <StatusBadge status={project.status} size="sm" />
      </div>

      {/* Category */}
      <div className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
        <Cpu className="w-3.5 h-3.5 text-slate-400" />
        <span>{project.category}</span>
        {project.subCategory && (
          <>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{project.subCategory}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-3">
        <Link to={`/research/project/${project.slug}`} className="focus:outline-none">
          {project.title}
        </Link>
      </h3>

      {/* Abstract */}
      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-5 flex-1">
        {project.abstract}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
          >
            #{tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-[11px] font-mono px-1.5 py-0.5 text-slate-400">
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer / CTA Actions */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="text-slate-500 font-mono text-[11px]">
          {project.authors.length > 0 && `Lead: ${project.authors[0]}`}
        </div>
        <Link
          to={`/research/project/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-semibold text-sky-600 group-hover:text-sky-700 group-hover:translate-x-0.5 transition-all"
        >
          <span>Explore Research</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
