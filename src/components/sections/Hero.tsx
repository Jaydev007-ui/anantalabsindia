"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Activity, ShieldCheck } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const targetPosition = window.scrollY + el.getBoundingClientRect().top - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-transparent">
      {/* Background Indian Tricolor soft glowing auras */}
      <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF9933]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-[#138808]/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            {/* Tagline & MSME Cert Badge */}
            <div className="flex flex-wrap items-center gap-3">
              {/* R&D Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[10px] font-mono font-bold tracking-widest text-[#00D4FF] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,212,255,0.05)]"
              >
                <Cpu className="h-3 w-3 animate-spin-slow text-[#00D4FF]" />
                DEEP-TECH R&D ORG
              </motion.div>
              
              {/* MSME Certified Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3.5 py-1 text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.05)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#F59E0B]" />
                MSME Registered
              </motion.div>

              {/* Proudly Made in India Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1 text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.05)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                Proudly Made in India
              </motion.div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              >
                Engineering <span className="text-tricolor-gradient">Intelligence</span>.
                <br />
                Building the <span className="text-white relative">
                  Future
                  <span className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full" />
                </span>.
              </motion.h1>
            </div>

            {/* Description Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed"
            >
              Ananta Labs India develops next-generation Artificial Intelligence, Healthcare Technologies, Robotics, and Deep-Tech innovations that solve real-world challenges through research-driven engineering.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleScrollTo("work-area")}
                className="relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-all active:scale-95 group cursor-pointer shadow-sm"
              >
                Explore Innovations
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleScrollTo("contact")}
                className="relative inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                Contact Us
              </button>
            </motion.div>

            {/* Secondary Tags / Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-6 border-t border-white/5 flex flex-wrap gap-8 text-slate-500 text-xs tracking-wider uppercase font-mono"
            >
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                SECURE & PATENTED SYSTEMS
              </div>
            </motion.div>
          </div>

          {/* Right Column: Flat Technical Blueprint SVG Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div 
              style={{
                background: "linear-gradient(to bottom, rgba(255, 153, 51, 0.8) 0%, rgba(255, 153, 51, 0.8) 33.3%, rgba(255, 255, 255, 0.8) 33.3%, rgba(255, 255, 255, 0.8) 66.6%, rgba(19, 136, 8, 0.8) 66.6%, rgba(19, 136, 8, 0.8) 100%)",
                backdropFilter: "blur(12px)"
              }}
              className="relative w-full max-w-[420px] md:max-w-[460px] aspect-square rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_55px_rgba(255,153,51,0.06)] group flex items-center justify-center bg-white/[0.01]"
            >
              {/* Saffron & Green Grid Backglows */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF9933]/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none animate-pulse-slow" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#138808]/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none animate-pulse-slow" />
              
              {/* Technical Grid Lines */}
              <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

              {/* Reactor SVG Core */}
              <svg className="w-4/5 h-4/5 relative z-10" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="chakraGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#000080" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#000080" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Core Ashoka Chakra Blue pulsing sphere */}
                <circle cx="100" cy="100" r="38" fill="url(#chakraGlow)" className="animate-pulse" />

                {/* Ashoka Chakra SVG Structure */}
                <motion.g 
                  style={{ transformOrigin: "100px 100px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {/* Outer Rim */}
                  <circle cx="100" cy="100" r="28" fill="none" stroke="#000080" strokeWidth="1.5" className="opacity-90" />
                  <circle cx="100" cy="100" r="25" fill="none" stroke="#000080" strokeWidth="0.5" className="opacity-70" />
                  
                  {/* 24 Spoke Spokes */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 360) / 24;
                    return (
                      <line
                        key={i}
                        x1="100"
                        y1="100"
                        x2={100 + 28 * Math.cos((angle * Math.PI) / 180)}
                        y2={100 + 28 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#000080"
                        strokeWidth="1.2"
                        className="opacity-90"
                      />
                    );
                  })}
                  {/* Spoke Triangles / Teeth */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i * 360) / 24;
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <circle
                        key={`t-${i}`}
                        cx={100 + 28 * Math.cos(rad)}
                        cy={100 + 28 * Math.sin(rad)}
                        r="1.2"
                        fill="#000080"
                      />
                    );
                  })}
                  {/* Center Hub */}
                  <circle cx="100" cy="100" r="5" fill="#000080" />
                  <circle cx="100" cy="100" r="2" fill="#FFFFFF" />
                </motion.g>

            </svg>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Grid Overlay Pattern */}
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
    </section>
  );
}
