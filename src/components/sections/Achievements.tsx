"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SiteStatsData, INITIAL_SITE_STATS } from "@/lib/siteContent";

interface CounterProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function Counter({ value, suffix, label, delay }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) {
        setCount(end);
        return;
      }

      const duration = 1.6;
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
      className="border border-slate-200 bg-white rounded-2xl p-6 text-center flex flex-col justify-center items-center h-36 sm:h-40 relative overflow-hidden group hover:border-[#0D9488]/40 hover:shadow-md transition-all"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#0D9488]/10 via-[#0D9488]/40 to-[#0D9488]/10 opacity-60" />
      <span className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-mono group-hover:text-[#0D9488] transition-colors">
        {count}
        {suffix}
      </span>
      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 mt-2 font-bold leading-normal">
        {label}
      </span>
    </motion.div>
  );
}

function parseStat(raw: string, fallbackNum: number, fallbackSuffix: string) {
  if (!raw) return { value: fallbackNum, suffix: fallbackSuffix };
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      suffix: match[2] || "",
    };
  }
  return { value: fallbackNum, suffix: raw };
}

export default function Achievements() {
  const [stats, setStats] = useState<SiteStatsData>(INITIAL_SITE_STATS);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/stats", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json?.success && json?.data) {
          setStats(json.data);
        }
      })
      .catch((e) => console.warn("Live stats fetch fallback to local:", e));

    const handleUpdate = (e: any) => {
      if (e?.detail) {
        setStats(e.detail);
      }
    };

    window.addEventListener("ananta_stats_updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("ananta_stats_updated", handleUpdate);
    };
  }, []);

  const p = parseStat(stats.projectsCount, 18, "+");
  const pat = parseStat(stats.patentsIpCount, 5, "+");
  const exp = parseStat(stats.experimentalStudiesCount, 8, "+");
  const res = parseStat(stats.researchAreasCount, 6, "+");

  const statItems = [
    { value: p.value, suffix: p.suffix, label: "Research Projects", delay: 0.05 },
    { value: pat.value, suffix: pat.suffix, label: "Patents & IP Disclosures", delay: 0.1 },
    { value: exp.value, suffix: exp.suffix, label: "Experimental Studies", delay: 0.15 },
    { value: res.value, suffix: res.suffix, label: "Active Research Areas", delay: 0.2 },
  ];

  return (
    <section className="relative py-16 sm:py-24 border-t border-slate-200 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-[10px] font-mono font-semibold uppercase tracking-wider text-[#B45309]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-pulse" />
            TRACK RECORD // LIVE METRICS
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 uppercase">
            Engineering Track Record
          </h2>
          <p className="font-sans text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Real-time technological metrics documenting deployed prototypes, intellectual property filings, and industrial testbeds.
          </p>
        </div>

        {/* Counter Grid - 4 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {statItems.map((item) => (
            <Counter
              key={item.label}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              delay={item.delay}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
