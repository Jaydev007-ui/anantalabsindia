"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, HeartPulse, Cpu, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: "cv",
    icon: Eye,
    title: "Computer Vision",
    description: "Custom edge object detection models, temporal violator tracking, face re-identification under noise, and illumination-insensitive structural mapping.",
    metric: "INFERENCE SPEED // 45.2 FPS"
  },
  {
    id: "med",
    icon: HeartPulse,
    title: "Medical & Health Technology",
    description: "Automated diagnostics fluidics control, physiological landmark mesh mapping, dosha classification (Prakriti Parikshan), and optical skin normalizations.",
    metric: "MESH COMPLIANCE // 98.4%"
  },
  {
    id: "embedded",
    icon: Cpu,
    title: "Embedded Systems",
    description: "Low-power firmware for microcontroller nodes, sensory aggregation, telemetry relays, and automated prevention hardware trigger relays.",
    metric: "HARDWARE RUNTIME // 99.998%"
  },
  {
    id: "research",
    icon: BookOpen,
    title: "Research & Publication",
    description: "High-impact IEEE conference papers, co-authored clinical validation trials, GATI 4.0 methodology compliance, and open-source R&D datasets.",
    metric: "IEEE INDEXED // GATI 4.0"
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      containerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="capabilities"
      ref={containerRef}
      className="relative py-16 sm:py-24 border-t border-slate-200 bg-transparent overflow-hidden"
    >
      <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />
      <div className="hidden md:block absolute right-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 sm:mb-16">
          <span className="font-mono text-xs text-[#B45309] font-semibold">03 // CAPABILITIES</span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        {/* 4-Item Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
          {capabilities.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`group p-5 sm:p-8 md:p-10 transition-all duration-300 hover:bg-slate-50/70 border-slate-200 relative flex flex-col justify-between min-h-[250px] sm:min-h-[290px]
                  ${index % 2 === 0 ? "md:border-r" : ""}
                  ${index < 2 ? "md:border-b" : ""}
                  ${index > 0 ? "border-t md:border-t-0" : ""}
                `}
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0D9488] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="space-y-6">
                  {/* Icon and label */}
                  <div className="flex items-center justify-between">
                    <div className="border border-slate-200 group-hover:border-[#0D9488] p-2.5 bg-slate-50 group-hover:bg-[#0D9488]/10 text-slate-700 group-hover:text-[#0D9488] transition-colors rounded-xl shadow-xs">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[9px] text-slate-400 font-semibold tracking-widest">
                      SYS_SEC_0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Technical Metric Row */}
                <div className="pt-6 font-mono text-[9px] text-slate-500 border-t border-slate-100 flex justify-between items-center mt-6">
                  <span>{item.metric}</span>
                  <span className="text-[#B45309] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ACTIVE_CORE // OK
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
