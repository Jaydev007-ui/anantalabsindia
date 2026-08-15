"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Python", category: "AI & Data Science" },
  { name: "TensorFlow", category: "Machine Learning" },
  { name: "PyTorch", category: "Deep Learning" },
  { name: "OpenCV", category: "Computer Vision" },
  { name: "Arduino", category: "Microcontrollers" },
  { name: "Raspberry Pi", category: "SBC Systems" },
  { name: "Flutter", category: "Mobile Apps" },
  { name: "React", category: "Frontend Dev" },
  { name: "Next.js", category: "Web Apps" },
  { name: "Node.js", category: "Backend Servers" },
  { name: "C++", category: "Systems Programming" },
  { name: "Embedded C", category: "Firmware" },
  { name: "ESP32", category: "IoT Wireless" },
  { name: "Azure", category: "Cloud Arch" },
  { name: "Docker", category: "Containers" },
];

export default function Technologies() {
  // Duplicate list to make scrolling loop seamless
  const duplicatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <section className="relative py-20 overflow-hidden bg-transparent">
      
      {/* Top and Bottom Horizontal Borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-10">
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-primary font-bold mb-2">
          INTEGRATION MATRIX
        </h2>
        <h3 className="font-display text-xl font-bold text-white tracking-tight uppercase">
          Supported Technology Stack
        </h3>
      </div>

      {/* Infinite scrolling slider */}
      <div className="flex select-none overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        
        {/* Row 1 - Left direction */}
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex gap-4 pr-4 whitespace-nowrap"
        >
          {duplicatedTechs.map((tech, idx) => (
            <div
              key={`${tech.name}-row1-${idx}`}
              className="inline-flex flex-col justify-center px-6 py-4 rounded-xl border border-white/10 bg-transparent/70 backdrop-blur-sm min-w-[160px] text-left hover:border-primary/40 transition-colors shadow-sm"
            >
              <span className="font-display text-sm font-extrabold text-slate-100 tracking-wide">
                {tech.name}
              </span>
              <span className="font-mono text-[8px] text-[#0088FF] uppercase tracking-widest mt-1">
                {tech.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right direction */}
      <div className="flex select-none overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] mt-4">
        <motion.div
          animate={{ x: [-1920, 0] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          className="flex gap-4 pr-4 whitespace-nowrap"
        >
          {duplicatedTechs.map((tech, idx) => (
            <div
              key={`${tech.name}-row2-${idx}`}
              className="inline-flex flex-col justify-center px-6 py-4 rounded-xl border border-white/10 bg-transparent/70 backdrop-blur-sm min-w-[160px] text-left hover:border-secondary/40 transition-colors shadow-sm"
            >
              <span className="font-display text-sm font-extrabold text-slate-100 tracking-wide">
                {tech.name}
              </span>
              <span className="font-mono text-[8px] text-primary uppercase tracking-widest mt-1">
                {tech.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
