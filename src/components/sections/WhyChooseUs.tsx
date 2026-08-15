"use client";

import { motion } from "framer-motion";
import { Award, Zap, Users, GraduationCap, CheckCircle, Target } from "lucide-react";

const items = [
  {
    icon: GraduationCap,
    title: "Research Driven",
    desc: "Every system we deploy is grounded in scientific papers, validated datasets, and verified diagnostic methodology.",
  },
  {
    icon: Zap,
    title: "Innovation Focused",
    desc: "We prioritize building original Intellectual Properties (IPs), designing proprietary algorithms instead of repackaging existing models.",
  },
  {
    icon: Users,
    title: "Industry Collaboration",
    desc: "Active partnerships with medical hospitals, tech institutes, and electronic manufacturers to secure end-to-end integration.",
  },
  {
    icon: Target,
    title: "Future Ready",
    desc: "Building low-latency designs compatible with edge-computing standards, prepped for the next decade of deep tech.",
  },
  {
    icon: Award,
    title: "Quality Engineering",
    desc: "Rigorous hardware testing and ISO certification compliance ensure every medical-grade device is highly robust.",
  },
  {
    icon: CheckCircle,
    title: "Real World Impact",
    desc: "We focus on solving practical problems: scaling rural medical accessibility and boosting processing speeds.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Visual Accent */}
      <div className="absolute top-1/2 left-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-[#0088FF] font-bold">
            OUR PILLARS
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Why Choose Us
          </h3>
          <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-base">
            Ananta Labs bridges the gap between complex research and robust deployment.
            Here is what defines our commitment to technological excellence.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#0088FF]/20 shadow-sm animate-float"
                style={{ animationDelay: `${idx * 0.5}s`, animationDuration: "8s" }}
              >
                {/* Accent glow line left border */}
                <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-primary/30 to-transparent opacity-50 group-hover:from-secondary group-hover:to-primary transition-all duration-300" />
                
                {/* Icon Circle */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/5 group-hover:bg-[#0088FF]/10 group-hover:border-[#0088FF]/40 transition-all duration-300">
                  <Icon className="h-5.5 w-5.5 text-slate-500 group-hover:text-[#0088FF] transition-colors" />
                </div>

                <h4 className="font-display text-base font-bold text-slate-100 mt-6 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>

                <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
