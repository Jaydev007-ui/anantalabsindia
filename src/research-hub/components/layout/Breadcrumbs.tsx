import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-mono">
        <li className="flex items-center gap-1.5">
          <Link to="/research" className="hover:text-sky-600 transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Research</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              {isLast || !item.url ? (
                <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-sm" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.url} className="hover:text-sky-600 transition truncate max-w-xs">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
