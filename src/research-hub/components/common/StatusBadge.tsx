import React from 'react';
import { ResearchStatus } from '../../types';

interface StatusBadgeProps {
  status: ResearchStatus;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true
}) => {
  const getColors = (s: ResearchStatus) => {
    switch (s) {
      case 'Concept':
        return {
          bg: 'bg-slate-100',
          border: 'border-slate-300',
          text: 'text-slate-700',
          dot: 'bg-slate-500'
        };
      case 'Development':
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-200',
          text: 'text-indigo-700',
          dot: 'bg-indigo-500'
        };
      case 'Experimental':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          dot: 'bg-amber-500'
        };
      case 'Validation':
        return {
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          text: 'text-sky-700',
          dot: 'bg-sky-500'
        };
      case 'Published':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          dot: 'bg-blue-500'
        };
      case 'Deployed':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          dot: 'bg-emerald-500'
        };
      case 'Commercialized':
        return {
          bg: 'bg-emerald-100/80',
          border: 'border-emerald-300',
          text: 'text-emerald-800',
          dot: 'bg-emerald-600'
        };
      default:
        return {
          bg: 'bg-slate-100',
          border: 'border-slate-200',
          text: 'text-slate-700',
          dot: 'bg-slate-500'
        };
    }
  };

  const style = getColors(status);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${style.bg} ${style.border} ${style.text} ${sizeClasses[size]}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      )}
      <span>{status}</span>
    </span>
  );
};
