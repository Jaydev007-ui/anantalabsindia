import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResearchPhilosophyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SeoHead
        title="Research Philosophy | Ananta Labs Research & Innovation Hub"
        description="The foundational engineering tenets and research philosophy guiding Ananta Labs India's inventions and scientific experimentation."
        canonicalPath="philosophy"
      />

      <Breadcrumbs items={[{ label: 'Research Philosophy' }]} />

      <header className="space-y-4 pb-8 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50/70 border border-indigo-200/50 text-indigo-700 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>Foundational Principles</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Research Philosophy
        </h1>
        <p className="text-base sm:text-lg font-mono text-sky-700">
          Research. Engineer. Innovate.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Exploring ideas. Engineering solutions. Documenting innovation. How Ananta Labs approaches deep-tech problem solving from first principles.
        </p>
      </header>

      <div className="space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
        <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">1. First-Principles Engineering</h2>
          <p className="text-slate-600">
            We avoid building on assumptions or superficial abstraction layers. When developing heat sinks (ThermoShield), we calculate boundary-layer Navier-Stokes shear before selecting fin pitch. When building civic detection cameras (SwachhVision), we examine photon noise on silicon photodiodes and spatial optical flow rather than relying on black-box cloud APIs.
          </p>
        </div>

        <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">2. Empirical Ground Truth Over Hype</h2>
          <p className="text-slate-600">
            Software simulations must survive physical laboratory trials. Every claim made in our research project publications is anchored by calibrated instrumentation: thermocouples, differential pressure transducers, high-speed shadowgraphy, or global shutter cameras.
          </p>
        </div>

        <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">3. Edge Autonomy & Citizen Privacy</h2>
          <p className="text-slate-600">
            Modern connected technology frequently over-relies on centralized cloud infrastructure, introducing security risks, recurring operational costs, and surveillance vulnerabilities. We engineer edge systems that think, decide, and act locally on microcontrollers and embedded neural processing units.
          </p>
        </div>

        <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">4. Open Scientific Knowledge Sharing</h2>
          <p className="text-slate-600">
            While our proprietary electromechanical hardware is protected through patents, we believe in freely sharing foundational engineering knowledge. Our <em>Research Explained</em> primers and client-side engineering tools serve as educational resources for the broader technical community.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            to="/research/ethics"
            className="text-sky-600 hover:text-sky-700 font-semibold text-sm flex items-center gap-1.5"
          >
            <span>Research Ethics & Transparency</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/research/contact"
            className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition"
          >
            Collaborate With Us
          </Link>
        </div>
      </div>
    </div>
  );
};
