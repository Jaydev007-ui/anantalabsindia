"use client";

import { motion } from "framer-motion";
import { Compass, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Compass,
    title: "Our Mission",
    desc: "To bridge advanced R&D with robust systems engineering, creating deep-tech solutions that elevate industry standards and enhance human lives.",
    color: "from-[#0A84FF]/10 to-blue-600/5",
  },
  {
    icon: Target,
    title: "Our Vision",
    desc: "To establish Ananta Labs India as a global epicenter of technology innovation, pioneering paradigms in AI-healthcare convergence and robotic automation.",
    color: "from-[#00D4FF]/10 to-cyan-500/5",
  },
  {
    icon: Heart,
    title: "Core Values",
    desc: "Relentless curiosity, rigorous scientific integrity, user-centric empathy, and an unyielding commitment to safety, accessibility, and quality.",
    color: "from-purple-500/10 to-indigo-500/5",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Visual Accent */}
      <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold"
          >
            ORGANIZATION PROFILE
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            About Ananta Labs India
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-slate-400 leading-relaxed text-base sm:text-lg"
          >
            Ananta Labs India is an independent research and technology company dedicated to creating impactful innovations in Artificial Intelligence, Medical Engineering, Robotics, Automation, Embedded Systems, and Smart Healthcare.
            <br className="hidden md:inline" />
            <span className="mt-4 block text-sm text-slate-500">
              Our mission is to bridge advanced research with practical engineering solutions that improve industries and human lives.
            </span>
          </motion.p>
        </div>

        {/* Mission, Vision, Core Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card border border-white/5 rounded-2xl p-8 flex flex-col items-start gap-4 relative overflow-hidden group shadow-sm"
              >
                {/* Background color bleed */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${val.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                
                {/* Icon Circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:border-primary/40 transition-colors">
                  <Icon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
                </div>
                
                <h4 className="font-display text-lg font-bold text-white mt-2 group-hover:text-primary transition-colors">
                  {val.title}
                </h4>
                
                <p className="font-sans text-sm text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
