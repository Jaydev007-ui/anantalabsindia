"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Ananta Preserv-1 Embalming Machine",
    category: "Medical Hardware",
    status: "Active Deployment",
    desc: "Precision clinical preservation system combining computerized pressure monitors and automated microfluidic injectors.",
    tag: "Preserv_1",
  },
  {
    id: 2,
    title: "Swachh Vision Spitting Detection",
    category: "Computer Vision / Smart City",
    status: "Active Deployment",
    desc: "An advanced spitting detection system powered by computer vision algorithms for smart cities and clean industrial campuses.",
    tag: "Swachh_Vision",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Background soft glows */}
      <div className="absolute top-1/3 left-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold">
            R&D PORTFOLIO
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Active Projects
          </h3>
          <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-base">
            Explore our deployed systems and active hardware-software integrations.
          </p>
        </div>

        {/* Projects Grid - Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                {/* Header Tag and Category */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest text-[#0088FF] uppercase font-bold">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono border border-green-500/20 bg-green-500/5 text-green-600 font-bold uppercase">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                    {proj.status}
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-display text-base font-bold text-white group-hover:text-primary transition-colors">
                  {proj.title}
                </h4>

                {/* Description */}
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              {/* Bottom detail action */}
              <div className="mt-8 pt-4 border-t border-white/5/85 flex items-center justify-between">
                <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                  TAG: {proj.tag}
                </span>

                <a
                  href="#contact"
                  className="text-[10px] font-bold text-slate-300 flex items-center gap-1 uppercase tracking-widest font-mono group-hover:text-primary transition-colors cursor-pointer"
                >
                  INQUIRE
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
