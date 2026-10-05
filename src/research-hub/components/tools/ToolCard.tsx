import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight, Calculator } from 'lucide-react';
import { EngineeringTool } from '../../types';

interface ToolCardProps {
  tool: EngineeringTool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group relative flex flex-col bg-white hover:bg-slate-50/50 border border-slate-200/90 hover:border-emerald-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg shadow-xs">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-mono font-medium text-emerald-700 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
          {tool.category}
        </span>
        <Calculator className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
      </div>

      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-2">
        <Link to={`/research/tools/${tool.slug}`} className="focus:outline-none">
          {tool.title}
        </Link>
      </h3>

      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] text-slate-400">
          Client-Side Computation
        </span>
        <Link
          to={`/research/tools/${tool.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-emerald-600 group-hover:text-emerald-700 transition"
        >
          <span>Open Tool</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
