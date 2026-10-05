"use client";

import React from "react";
import dynamic from "next/dynamic";

const ResearchHubApp = dynamic(
  () => import("@research/App").then((mod) => mod.App),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-sm text-slate-600">Initializing Ananta Labs Research Hub...</p>
        </div>
      </div>
    ),
  }
);

export default function ResearchClient() {
  return <ResearchHubApp />;
}
