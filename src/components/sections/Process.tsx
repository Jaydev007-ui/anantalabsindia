"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Cpu, Sliders, CheckSquare, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Research",
    desc: "Literature reviews, dataset gathering, algorithm exploration, and setting theoretical baselines.",
  },
  {
    step: "02",
    icon: PenTool,
    title: "Design",
    desc: "Schematic routing, CAD enclosure modeling, interface blueprints, and system architecture mapping.",
  },
  {
    step: "03",
    icon: Cpu,
    title: "Prototype",
    desc: "SMD assembly, micro-controller flashing, local firmware integration, and initial hardware casing tests.",
  },
  {
    step: "04",
    icon: Sliders,
    title: "Testing",
    desc: "Signal integrity checks, thermal imaging trials, unit code coverage, and stress environment simulation.",
  },
  {
    step: "05",
    icon: CheckSquare,
    title: "Validation",
    desc: "Clinical trials mapping, third-party certification checks, and double-blind diagnostic cross-checks.",
  },
  {
    step: "06",
    icon: Rocket,
    title: "Deployment",
    desc: "Cloud sync hooks, EHR API releases, medical compliance signoff, and production line manufacturing.",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Background neon elements */}
      <div className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20 md:mb-28">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold">
            WORKFLOW
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Development Process
          </h3>
          <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-base">
            How we translate complex scientific equations into medical-grade hardware and software.
          </p>
        </div>

        {/* Process Timeline Flex/Grid */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/10 via-secondary/30 to-primary/10 -translate-y-1/2 hidden xl:block z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8 xl:gap-4 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circle Node */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-sm group-hover:border-primary/50 group-hover:bg-transparent transition-all duration-300">
                    <span className="absolute -top-1.5 -right-1.5 font-mono text-[9px] font-bold text-slate-500 bg-transparent px-1.5 py-0.5 rounded-md border border-white/10 shadow-sm">
                      {item.step}
                    </span>
                    <Icon className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
                    
                    {/* Pulsing ring inside circle on hover */}
                    <div className="absolute inset-1 rounded-full border border-dashed border-primary/0 group-hover:border-primary/20 group-hover:animate-spin-slow" />
                  </div>

                  {/* Text Content */}
                  <h4 className="font-display text-sm font-bold text-slate-100 mt-5 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="font-sans text-[11px] text-slate-500 mt-2 leading-relaxed max-w-[200px]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
