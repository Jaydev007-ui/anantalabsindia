import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { useHubData } from '../data/store';
import { ToolRunner } from '../components/tools/ToolRunner';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ToolDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tools } = useHubData();

  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Tool Not Found</h2>
        <Link to="/research/tools" className="text-emerald-600 hover:underline">
          Return to Engineering Tools
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SeoHead
        title={`${tool.title} | Engineering Calculator | Ananta Labs`}
        description={tool.description}
        canonicalPath={`tools/${tool.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Engineering Tools', url: '/research/tools' },
          { label: tool.title }
        ]}
      />

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50/70 border border-emerald-200/50 text-emerald-700 text-xs font-mono">
          <Wrench className="w-3.5 h-3.5" />
          <span>{tool.category}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {tool.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Tool Runner */}
      <ToolRunner tool={tool} />
    </div>
  );
};
