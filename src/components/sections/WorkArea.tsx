"use client";

import { motion } from "framer-motion";
import { Wrench, Globe, Smartphone, ArrowUpRight } from "lucide-react";

const areas = [
  {
    icon: Wrench,
    title: "Manufacturing",
    tag: "HARDWARE & SYSTEMS",
    desc: "Precision engineering, hardware-in-the-loop systems, high-reliability PCB prototyping, custom CNC routing, and mechatronics assembly compliant with clinical and industrial standards.",
    features: ["SMD Component Placement", "CAD Enclosure Engineering", "Diagnostic Sensors Assembly", "Stress & Thermal Testing"],
    color: "from-blue-500/10 to-primary/5",
    border: "group-hover:border-primary/40",
    iconColor: "text-primary",
  },
  {
    icon: Globe,
    title: "Web Development",
    tag: "CLOUD & BACKEND ARCH",
    desc: "Building low-latency, scalable web architectures, full-stack interfaces, dashboard portals, secure cloud API connections, and real-time medical-telemetry tracking databases.",
    features: ["High-Security EHR Portals", "Real-Time Websockets", "Optimized Database Queries", "Next.js Engine Integration"],
    color: "from-cyan-500/10 to-secondary/5",
    border: "group-hover:border-secondary/40",
    iconColor: "text-secondary",
  },
  {
    icon: Smartphone,
    title: "App Development",
    tag: "MOBILE TELEMETRY",
    desc: "Developing native-quality iOS and Android mobile software leveraging Flutter and React Native, tailored for patient vitals tracking, device telemetry Sync, and practitioner workflows.",
    features: ["Bluetooth IoT Connection", "Offline-First Telemetry Sync", "ISO Compliant Security", "Intuitive Practitioner UI"],
    color: "from-purple-500/10 to-purple-600/5",
    border: "group-hover:border-purple-400/40",
    iconColor: "text-purple-600",
  },
];

export default function WorkArea() {
  return (
    <section id="work-area" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Background soft gradients (Light Theme) */}
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

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
            OUR DOMAINS
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Core Work Areas
          </motion.h3>
          <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-base">
            Ananta Labs India bridges precision physical fabrication with modern software engineering. 
            We organize our production lines into three key work areas.
          </p>
        </div>

        {/* 3 Work Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {areas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="tricolor-border-card rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm"
              >
                {/* Background soft color bleed on hover */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                <div className="space-y-6">
                  {/* Header Row */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors font-bold uppercase">
                      {area.tag}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/5 transition-colors group-hover:bg-transparent`}>
                      <Icon className={`h-5.5 w-5.5 ${area.iconColor}`} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h4 className="font-display text-lg font-bold text-slate-100 group-hover:text-[#FF9933] transition-colors">
                      {area.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                      {area.desc}
                    </p>
                  </div>

                  {/* Micro-Features Bullets */}
                  <div className="space-y-2 pt-4 border-t border-white/5/60">
                    <span className="block text-[8px] font-mono tracking-wider text-slate-600 group-hover:text-slate-400 transition-colors uppercase font-bold">Capabilities</span>
                    <div className="grid grid-cols-2 gap-2">
                      {area.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-1.5 text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#138808]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action link */}
                <div className="mt-8 pt-4 border-t border-white/5/60 flex items-center justify-end">
                  <a
                    href="#contact"
                    className="text-[10px] font-bold text-slate-300 group-hover:text-[#FF9933] transition-colors flex items-center gap-1 uppercase tracking-widest font-mono cursor-pointer"
                  >
                    Discuss Project
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
