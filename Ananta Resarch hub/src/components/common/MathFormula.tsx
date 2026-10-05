import React, { useMemo } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  displayMode = true,
  className = ""
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode,
        throwOnError: false,
        strict: false
      });
    } catch {
      return null;
    }
  }, [formula, displayMode]);

  if (!html) {
    return (
      <code className={`font-mono text-sky-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 ${className}`}>
        {formula}
      </code>
    );
  }

  return (
    <div
      className={`overflow-x-auto py-2 text-slate-900 ${displayMode ? 'text-center my-3' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
