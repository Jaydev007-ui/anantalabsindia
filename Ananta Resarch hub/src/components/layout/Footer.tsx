import React from 'react';
import { Link } from 'react-router-dom';
import { Atom, Shield, Mail, MapPin, ArrowRight, ExternalLink, FileCode, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenLeadModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadModal }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-sm">
      {/* Strategic Pre-Footer Call to Action Banner */}
      <div className="border-b border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-mono text-sky-600 uppercase tracking-wider font-semibold">Applied Engineering & Industrial R&D</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Ready to engineer innovative hardware or vision systems?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              From edge AI vision nodes like SwachhVision to high-density thermal and medical fluid systems, partner with Ananta Labs India.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenLeadModal}
              className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-sky-600/20 transition flex items-center gap-2"
            >
              <span>Collaborate With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/research/contact"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 transition"
            >
              Need R&D Support?
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/research" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
                <img src="/ananta-logo.jpg" alt="Ananta Labs Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base tracking-tight block">Ananta Labs India</span>
                <span className="text-xs text-slate-500">Research & Innovation Hub</span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              <strong className="text-slate-800">Research. Engineer. Innovate.</strong>
              <br />
              Exploring ideas. Engineering solutions. Documenting innovation. The official digital R&D and technological knowledge repository of Ananta Labs India.
            </p>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Ananta Labs India • Engineering Laboratories</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>research@anantalabsindia.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Primary Base URL: anantalabsindia.org/research</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                <img src="/intel-partner.jpg" alt="Intel Partner Alliance" className="w-full h-full object-contain" />
              </div>
              <div className="text-xs font-sans">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold leading-tight">
                  Computing Ecosystem
                </span>
                <span className="font-bold text-slate-900 leading-tight block">
                  Intel Partner Alliance
                </span>
                <span className="text-[11px] text-slate-500">
                  OpenVINO & Edge AI Hardware Acceleration
                </span>
              </div>
            </div>
          </div>

          {/* Research Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-semibold">Research</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/research" className="hover:text-sky-600 transition">Research Overview</Link></li>
              <li><Link to="/research/projects" className="hover:text-sky-600 transition">Research Projects</Link></li>
              <li><Link to="/research/project/swachhvision" className="hover:text-sky-600 transition">SwachhVision AI</Link></li>
              <li><Link to="/research/project/embalming-machine" className="hover:text-sky-600 transition">Arterial Embalming System</Link></li>
              <li><Link to="/research/project/thermoshield-heatsink" className="hover:text-sky-600 transition">ThermoShield Microchannels</Link></li>
              <li><Link to="/research/areas" className="hover:text-sky-600 transition">Research Areas</Link></li>
              <li><Link to="/research/archive" className="hover:text-sky-600 transition">Research Archive</Link></li>
            </ul>
          </div>

          {/* Knowledge & Engineering Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-semibold">Knowledge & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/research/exams" className="text-sky-700 hover:text-sky-800 font-semibold transition">MCQ Exams & Certification</Link></li>
              <li><Link to="/research/explainers" className="hover:text-sky-600 transition">Research Explained</Link></li>
              <li><Link to="/research/explainer/what-is-yolo-object-detection" className="hover:text-sky-600 transition">YOLO Explained</Link></li>
              <li><Link to="/research/explainer/how-computer-vision-works" className="hover:text-sky-600 transition">Computer Vision Guide</Link></li>
              <li><Link to="/research/knowledge-base" className="hover:text-sky-600 transition">Knowledge Base</Link></li>
              <li><Link to="/research/tools" className="hover:text-sky-600 transition">Engineering Calculators</Link></li>
              <li><Link to="/research/experiments" className="hover:text-sky-600 transition">Laboratory Experiments</Link></li>
              <li><Link to="/research/briefs" className="hover:text-sky-600 transition">Research Briefs</Link></li>
              <li><Link to="/research/trends" className="hover:text-sky-600 transition">Technology Trends</Link></li>
            </ul>
          </div>

          {/* Institutional, Trust & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-semibold">Institutional</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/research/researchers" className="hover:text-sky-600 transition">Researchers Directory</Link></li>
              <li><Link to="/research/researcher/jaydev-zala" className="hover:text-sky-600 transition">Jaydev Zala (Lead)</Link></li>
              <li><Link to="/research/about" className="hover:text-sky-600 transition">About Our Research</Link></li>
              <li><Link to="/research/philosophy" className="hover:text-sky-600 transition">Research Philosophy</Link></li>
              <li><Link to="/research/ethics" className="hover:text-sky-600 transition">Research Ethics & Rigor</Link></li>
              <li><Link to="/research/corrections" className="hover:text-sky-600 transition">Correction Policy</Link></li>
              <li><Link to="/research/privacy" className="hover:text-sky-600 transition">Privacy & Data Policy</Link></li>
              <li><Link to="/research/terms" className="hover:text-sky-600 transition">Terms of Use & Copyright</Link></li>
              <li><Link to="/research/admin" className="text-sky-600 hover:text-sky-700 transition font-mono font-medium">Admin CMS Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* UNIFY Security Engine Official Brand Banner */}
        <div className="mt-12 p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-1 shrink-0 shadow-lg flex items-center justify-center overflow-hidden">
              <img
                src="/unify-engine-logo.jpg"
                alt="UNIFY Engine - The Security Intelligence Engine"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-sky-400/30">
                  Infrastructure Defense
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  ● E2EE Cryptographic Enclave Active
                </span>
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                Protected by UNIFY Security Intelligence Engine
              </h4>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                End-to-End Encryption, real-time shortcut blocking (F12, inspect, scraping), and automated intellectual property defense enforced across Ananta Labs Research Hub.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>UNIFY Engine v3.4 Armed</span>
          </div>
        </div>

        {/* Transparency Disclosure */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-slate-700">Institutional Transparency Notice:</strong> Ananta Labs Research & Innovation Hub documents original internal engineering, technological inventions, and experimental prototypes developed by Ananta Labs India. This is an official digital R&D platform and not an academic paper-submission journal. External research is referenced strictly with attribution.
          </p>
          <div className="shrink-0 text-slate-500 font-mono">
            © {new Date().getFullYear()} Ananta Labs India. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
