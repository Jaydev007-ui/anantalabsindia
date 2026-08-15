"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-display">
      
      {/* Background cybernetic grid */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute h-96 w-96 rounded-full bg-[#0A84FF]/5 blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 text-center max-w-md px-6 space-y-8">
        
        {/* Animated Warning Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        >
          <ShieldAlert className="h-8 w-8 text-red-500 animate-pulse" />
        </motion.div>

        {/* Header content */}
        <div className="space-y-3">
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl font-extrabold tracking-widest text-white font-mono"
          >
            404
          </motion.h1>
          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-bold"
          >
            ACCESS RESTRICTED
          </motion.h2>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-sans text-xs text-neutral-400 leading-relaxed pt-2"
          >
            The deep-tech resource coordinate you are attempting to locate is either archived, under diagnostic maintenance, or restricted.
          </motion.p>
        </div>

        {/* Back to Home CTA */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-4"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white hover:shadow-[0_0_20px_rgba(10,132,255,0.3)] transition-all active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            RETURN TO NEXUS
          </a>
        </motion.div>

      </div>
    </div>
  );
}
