"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface LeadFormState {
  name: string;
  email: string;
  organization: string;
  projectDescription: string;
  desiredOutcome: string;
  techRequirements: string;
  budgetRange: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  phone?: string;
}

interface LeadConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (referenceId: string) => void;
  initialDescription?: string;
}

export const LeadConfirmationModal: React.FC<LeadConfirmationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialDescription = ''
}) => {
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string>('');

  const [formData, setFormData] = useState<LeadFormState>({
    name: '',
    email: '',
    organization: '',
    projectDescription: initialDescription,
    desiredOutcome: '',
    techRequirements: 'Edge AI / Vision',
    budgetRange: '₹1L - ₹5L (Prototyping)',
    preferredContact: 'email',
    phone: '',
  });

  if (!isOpen) return null;

  const handleSubmitToBackend = async () => {
    setLoading(true);
    setError(null);

    try {
      const generatedRef = `AL-INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        organization: formData.organization || 'Independent Researcher',
        project: `${formData.techRequirements} - ${formData.projectDescription}`,
        budget: formData.budgetRange,
        timeline: 'Immediate / Next Quarter',
        referenceId: generatedRef,
        notes: `Desired Outcome: ${formData.desiredOutcome} | Contact via: ${formData.preferredContact}`,
        timestamp: new Date().toISOString()
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to record inquiry on server.');
      }

      setReferenceId(generatedRef);
      setStep('success');
      onSuccess(generatedRef);
    } catch (err: any) {
      console.error('Lead submission error:', err);
      setError(err.message || 'Network error submitting consultation request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-slate-200 relative overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              {step === 'form' && 'Engineering Project Consultation'}
              {step === 'confirm' && 'Review & Confirm Consultation Brief'}
              {step === 'success' && 'Inquiry Confirmed'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="my-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            {error}
          </div>
        )}

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!formData.name.trim() || !formData.email.trim()) {
                setError('Name and Email are required.');
                return;
              }
              setStep('confirm');
            }}
            className="space-y-3.5 pt-4 text-xs font-mono"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Patel"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-cyan-400 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Organization / Lab</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Company, University, or Hospital"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-cyan-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-cyan-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Project Description & Engineering Challenge *</label>
              <textarea
                required
                rows={2}
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                placeholder="Outline your vision model, medical fluidic sensor, or automation goals..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-cyan-400 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Technology Scope</label>
                <select
                  value={formData.techRequirements}
                  onChange={(e) => setFormData({ ...formData, techRequirements: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-cyan-400 outline-none"
                >
                  <option>Edge AI / Computer Vision</option>
                  <option>Medical Device & Fluidics</option>
                  <option>ESP32 / Embedded RTOS</option>
                  <option>Microchannel Thermal Cooling</option>
                  <option>Custom Industrial Prototyping</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Target Budget Tier</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-cyan-400 outline-none"
                >
                  <option>₹1L - ₹5L (Prototyping)</option>
                  <option>₹5L - ₹15L (Pilot Validation)</option>
                  <option>₹15L+ (Enterprise / Full System)</option>
                  <option>Academic Research Grant</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: CONFIRMATION SUMMARY */}
        {step === 'confirm' && (
          <div className="space-y-4 pt-4 text-xs font-mono">
            <p className="text-slate-300 leading-relaxed font-sans text-xs">
              Please review your consultation brief before submitting directly to Director Jaydevsinh Zala and the Ananta Labs engineering directorship:
            </p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-[11px]">
              <div><span className="text-slate-500">Contact:</span> <strong className="text-white">{formData.name}</strong> ({formData.email})</div>
              {formData.organization && <div><span className="text-slate-500">Organization:</span> <span className="text-slate-300">{formData.organization}</span></div>}
              <div><span className="text-slate-500">Scope:</span> <span className="text-cyan-400 font-bold">{formData.techRequirements}</span></div>
              <div><span className="text-slate-500">Budget Tier:</span> <span className="text-emerald-400">{formData.budgetRange}</span></div>
              <div className="pt-1 text-slate-300 border-t border-slate-850 italic font-sans">
                "{formData.projectDescription}"
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Protected under Ananta Labs confidentiality and nondisclosure terms.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => setStep('form')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition cursor-pointer"
              >
                Back to Edit
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmitToBackend}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{loading ? 'Submitting...' : 'Confirm & Dispatch Inquiry'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 'success' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-2xl mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-mono">Consultation Brief Dispatched</h4>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Your engineering inquiry has been registered in the Ananta Labs Directorship queue.
              </p>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-cyan-400">
              Inquiry Reference: <strong>{referenceId}</strong>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
            >
              Return to Conversation
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
