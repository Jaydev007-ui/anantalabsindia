"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function Counter({ value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 1.5; // seconds
      const totalSteps = 60;
      const stepTime = (duration * 1000) / totalSteps;
      const increment = end / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-6 text-center flex flex-col justify-center items-center h-40 border border-white/5 relative overflow-hidden group hover:border-primary/30 shadow-sm"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/10 via-secondary/30 to-primary/10 opacity-50" />
      <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono group-hover:text-primary transition-colors">
        {count}
        {suffix}
      </span>
      <span className="font-sans text-xs uppercase tracking-widest text-slate-500 mt-2 font-bold leading-normal">
        {label}
      </span>
    </motion.div>
  );
}

const stats = [
  { value: 18, suffix: "+", label: "Research Projects", delay: 0.05 },
  { value: 3, suffix: "+", label: "Patents Filed", delay: 0.1 },
];

export default function Achievements() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-[#0088FF] font-bold">
            TRACK RECORD
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Research Achievements
          </h3>
          <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-base">
            Indicators showcasing our technological focus and patent record.
          </p>
        </div>

        {/* Counter Grid - Center-aligned 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
          {stats.map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
