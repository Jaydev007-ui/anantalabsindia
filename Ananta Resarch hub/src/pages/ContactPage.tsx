import React, { useState } from 'react';
import { Mail, MapPin, Building, ShieldCheck, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useHubData } from '../data/store';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SeoHead } from '../components/common/SeoHead';

export const ContactPage: React.FC = () => {
  const { addLead, trackPageView } = useHubData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interestType: 'Research Collaboration' as const,
    relatedProject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    trackPageView('/research/contact');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      addLead(formData);
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SeoHead
        title="Contact & Collaborate | Ananta Labs Research & Innovation Hub"
        description="Collaborate with Ananta Labs India on research partnerships, bespoke technology development, prototyping, and intellectual property licensing."
        canonicalPath="contact"
      />

      <Breadcrumbs items={[{ label: 'Contact & Collaboration' }]} />

      <header className="space-y-4 pb-8 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200/50 text-sky-700 text-xs font-mono">
          <Building className="w-3.5 h-3.5" />
          <span>R&D Directorship & Partnerships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Collaborate With Ananta Labs
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          We partner with universities, government bodies, municipal corporations, healthcare institutions, and technology enterprises worldwide.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Information Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Partnership Pathways
            </h2>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-sky-700 block mb-0.5">1. Joint R&D & Prototyping</strong>
                Collaborative experimental design and custom hardware proof-of-concept builds.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-blue-700 block mb-0.5">2. Technology Development</strong>
                Full-cycle industrialization of vision systems, firmware, and electromechanics.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-emerald-700 block mb-0.5">3. IP & Patent Licensing</strong>
                Commercial licensing of patented Ananta Labs technologies and blueprints.
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-600" />
              <span>research@anantalabsindia.org</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Ananta Labs India • Research Labs</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NDA protected technical exchanges</span>
            </div>
          </div>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Inquiry Submitted Successfully
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you for your interest in Ananta Labs engineering. A principal investigator or technical lead will review your submission and respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-medium text-slate-900 transition mt-4"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Initiate a Technical Inquiry
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Verma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Organization / University *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. IIT Delhi / Municipal Corp"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Engagement Nature</label>
                  <select
                    value={formData.interestType}
                    onChange={(e) => setFormData({ ...formData, interestType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Research Collaboration">Research Collaboration</option>
                    <option value="Technology Development">Technology Development</option>
                    <option value="R&D Support">Need R&D Support</option>
                    <option value="IP Licensing">IP Licensing / Commercialization</option>
                    <option value="General">General Technical Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Specific Research Project (Optional)</label>
                <input
                  type="text"
                  value={formData.relatedProject}
                  onChange={(e) => setFormData({ ...formData, relatedProject: e.target.value })}
                  placeholder="e.g. SwachhVision, Embalming Machine, ThermoShield..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Project Scope / Technical Requirements *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your engineering objectives, testing timelines, or prototyping specifications..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold rounded-xl text-sm shadow-xl shadow-sky-600/20 transition flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Collaboration Request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
