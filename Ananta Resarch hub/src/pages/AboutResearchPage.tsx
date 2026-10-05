import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, ShieldCheck, Microscope, Users, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const AboutResearchPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SeoHead
        title="About Our Research | Ananta Labs Research & Innovation Hub"
        description="Learn how Ananta Labs India conducts applied research, prototype validation, and engineering inventions across vision systems, fluidics, and embedded hardware."
        canonicalPath="about"
      />

      <Breadcrumbs items={[{ label: 'About Our Research' }]} />

      <header className="space-y-4 pb-8 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200/50 text-sky-700 text-xs font-mono">
          <Atom className="w-3.5 h-3.5" />
          <span>Institutional Overview</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About Ananta Labs Research
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Ananta Labs Research & Innovation Hub functions as the official digital R&D and technological knowledge repository of <strong>Ananta Labs India</strong>.
        </p>
      </header>

      <div className="space-y-10 text-slate-600 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Our Core Mission</h2>
          <p>
            The primary objective of Ananta Labs R&D is to bridge the gap between abstract academic research and functional, deployable hardware and software. We invent, prototype, stress-test, and commercialize systems that solve pressing societal, industrial, and clinical problems.
          </p>
        </section>

        {/* Operational Tenets */}
        <section className="p-8 bg-white border border-slate-200 rounded-3xl space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-600 font-bold">
            How Research is Conducted at Ananta Labs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Physical Prototyping First
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe simulations must be corroborated with CNC-machined cold plates, optical test benches, and custom PCBs. Every project page features real empirical metrics.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Edge Autonomy & Privacy
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                In civic computer vision (SwachhVision) and industrial telemetry (PredictEdge), our models run directly on edge silicon, preserving citizen privacy and operating without cloud bandwidth reliance.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Intellectual Property Protection
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ananta Labs files provisional and non-provisional patent disclosures for novel electromechanical arrangements and algorithmic pipelines through Indian and international patent offices.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Open Engineering Calculators
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We share free, client-side engineering tools with equations and assumptions to empower practicing engineers, universities, and students.
              </p>
            </div>
          </div>
        </section>

        {/* Section 32 & 34 Trust & Transparency */}
        <section className="p-8 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Trust & Scientific Integrity</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Originality & Content Governance
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            All research projects presented on this platform represent original work conducted or directed by Ananta Labs personnel. <strong>This is NOT a third-party academic journal</strong> and does not accept unsolicited external manuscript submissions. External literature is cited strictly for scholarly context with transparent attribution.
          </p>
        </section>

        {/* Computing & Hardware Alliance */}
        <section className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4 text-sky-600" />
            <span>Hardware & Computing Ecosystem</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 p-2 shrink-0 shadow-xs">
              <img src="/intel-partner.jpg" alt="Intel Partner Alliance" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Official Intel Partner Alliance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ananta Labs collaborates within the Intel Partner Alliance ecosystem to accelerate edge AI inferencing, OpenVINO computational pipelines, and high-throughput embedded architectures. Our civic surveillance and telemetry testbeds leverage Intel silicon for real-time localized inference.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div className="pt-4 flex items-center justify-between">
          <Link
            to="/research/philosophy"
            className="text-sky-600 hover:text-sky-700 font-semibold text-sm flex items-center gap-1.5"
          >
            <span>Read Research Philosophy & Tenets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/research/contact"
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white text-xs font-semibold transition"
          >
            Collaborate With Us
          </Link>
        </div>
      </div>
    </div>
  );
};
