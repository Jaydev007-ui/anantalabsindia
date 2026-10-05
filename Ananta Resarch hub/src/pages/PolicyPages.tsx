import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ResearchEthicsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SeoHead
        title="Research Ethics & Scientific Integrity | Ananta Labs"
        description="Ethics policies and reproducibility standards for experimental research and data logging at Ananta Labs India."
        canonicalPath="ethics"
      />
      <Breadcrumbs items={[{ label: 'Research Ethics' }]} />

      <header className="space-y-3 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Research Ethics & Scientific Rigor
        </h1>
        <p className="text-sm text-slate-500">
          Last reviewed: February 2026 • Ananta Labs Scientific Oversight Council
        </p>
      </header>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Data Authenticity & Empirical Recording</h2>
          <p>
            Ananta Labs upholds zero tolerance for data falsification, selective reporting, or fabrication of experimental results. Sensor logs and calibration datasets must originate from physical instruments or documented hardware testbeds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Medical & Cadaveric Research Ethics</h2>
          <p>
            For medical device prototypes such as our Automated Arterial Embalming System (ALR-2025-004), all anatomical trials are conducted strictly in partnership with accredited institutional anatomy departments and medical colleges in full compliance with the Anatomy Act and relevant biomedical guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Public Vision & Privacy Safeguards</h2>
          <p>
            In civic computer vision deployments like SwachhVision, video streams are evaluated on-device in temporary volatile memory buffers. No facial recognition or citizen biometric databases are created; detections produce anonymized bounding boxes and vector trajectories solely for public hygiene deterrence.
          </p>
        </section>
      </div>
    </div>
  );
};

export const CorrectionPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SeoHead
        title="Correction Policy | Ananta Labs Research Hub"
        description="Official procedure for reporting and issuing corrections, errata, and updates to Ananta Labs research publications."
        canonicalPath="corrections"
      />
      <Breadcrumbs items={[{ label: 'Correction Policy' }]} />

      <header className="space-y-3 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Correction & Errata Policy
        </h1>
        <p className="text-sm text-slate-500">
          Transparency in scientific literature and technical reporting.
        </p>
      </header>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <p>
          Ananta Labs is committed to correcting errors of fact or calculation promptly and transparently.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">How to Submit a Scientific Correction</h2>
          <p>
            If you detect a mathematical discrepancy, incorrect citation, or reproducible error in any of our technical reports or calculator formulas, please submit details to:
            <code className="text-sky-600 font-mono ml-1">research@anantalabsindia.org</code> with the subject line <em>"Technical Errata: [Research ID / Tool Name]"</em>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">Correction Handling Protocol</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Minor typographical adjustments are amended directly in digital documents.</li>
            <li>Substantive numerical revisions result in a version increment (e.g. v1.1) and a prominent erratum note detailing the delta.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SeoHead
        title="Privacy & Data Policy | Ananta Labs Research Hub"
        description="Privacy policy and data handling principles of the Ananta Labs Research Hub."
        canonicalPath="privacy"
      />
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <header className="space-y-3 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: 2026 • Ananta Labs India
        </p>
      </header>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <p>
          Ananta Labs respects your privacy. Our engineering calculators execute 100% client-side in your browser; your input values are not transmitted to or stored on our servers.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">Inquiry Data Collection</h2>
          <p>
            When you submit a collaboration or R&D request through our contact forms, your name, email, organization, and message are used solely to evaluate technical partnerships. We never sell or distribute partner information to third parties.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SeoHead
        title="Terms of Use & Copyright | Ananta Labs Research Hub"
        description="Terms of use, intellectual property disclosures, and citation guidelines for Ananta Labs Research Hub."
        canonicalPath="terms"
      />
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <header className="space-y-3 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Terms of Use & Intellectual Property
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: 2026 • Ananta Labs India
        </p>
      </header>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Intellectual Property & Patents</h2>
          <p>
            All original research, architectural designs, hardware schematics, and patent disclosures published under the Ananta Labs Research & Innovation Hub are the exclusive intellectual property of Ananta Labs India and its contributing inventors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Permissible Educational & Academic Citation</h2>
          <p>
            Researchers and students are permitted to cite Ananta Labs research papers, briefs, and explainers with proper attribution:
            <code className="block p-3 bg-slate-50 rounded-lg text-xs font-mono text-sky-700 mt-2">
              Ananta Labs India, "[Research Title]", Ananta Labs Research Report [Research ID], https://anantalabsindia.org/research/project/[slug]
            </code>
          </p>
        </section>
      </div>
    </div>
  );
};
