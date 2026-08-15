"use client";

import { motion } from "framer-motion";

export default function Partners() {
  return (
    <section className="relative py-24 overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-16">
          <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#0088FF] font-bold">
            TRUSTED NETWORK
          </h2>
          <h3 className="font-display text-xl font-bold text-white tracking-tight uppercase">
            Clinical & Academic Collaboration
          </h3>
        </div>

        {/* Center aligned Single Partner Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card border border-white/5 rounded-2xl p-8 text-center flex flex-col justify-center items-center h-36 max-w-sm w-full group hover:border-primary/30 shadow-sm"
          >
            <div className="h-7 w-7 rounded bg-white/5 border border-white/5 flex items-center justify-center font-display text-[9px] font-bold text-[#0088FF] mb-3 group-hover:bg-[#0A84FF]/10 group-hover:text-[#0A84FF] transition-colors">
              01
            </div>
            <h4 className="font-display text-xs font-black text-white tracking-widest leading-tight uppercase group-hover:text-primary transition-colors">
              Parul University
            </h4>
            <span className="font-sans text-[9px] text-slate-500 uppercase tracking-widest mt-1.5 font-semibold">
              Primary Academic & Research Partner
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
