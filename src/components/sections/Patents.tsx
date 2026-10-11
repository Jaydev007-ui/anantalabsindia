"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const seals = [
  {
    id: "in-patent",
    category: "INTELLECTUAL PROPERTY",
    title: "IN Patent Filings",
    org: "Indian Patent Office (IPO)",
    desc: "State-filed patents covering automated prevention hardware triggers, sanitization controllers, and edge neural networks.",
    tag: "REG_IN // FILED"
  },
  {
    id: "pct-patent",
    category: "GLOBAL COMPLIANCE",
    title: "PCT Filings",
    org: "World Intellectual Property Org",
    desc: "International PCT patent filings extending local computer vision and diagnostic systems to global jurisdictions.",
    tag: "WIPO_PCT // ACTIVE"
  },
  {
    id: "ieee-pub",
    category: "ACADEMIC LITERATURE",
    title: "IEEE Publications",
    org: "IEEE Xplore Library",
    desc: "Peer-reviewed journals and conference papers in computer vision and health diagnostics, co-authored with Parul University.",
    tag: "IEEE_INDEX // PUBLISHED"
  },
  {
    id: "icreate",
    category: "INCUBATION STAGE",
    title: "iCreate Ecosystem",
    org: "Technology Business Incubator",
    desc: "Official partnership and workspace incubation in Gujarat's premier deep-tech innovation catalyst environment.",
    tag: "IC_GUJ // PARTNER"
  }
];

export default function Patents() {
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
      id="patents"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 bg-transparent overflow-hidden"
    >
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-8 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[#C98A4B]">04 // RECOGNITION & INTELLECTUAL PROPERTY</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        {/* Seals Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seals.map((seal) => (
            <div
              key={seal.id}
              className="panel-border border border-white/5 bg-[#0E1213] p-6 relative flex flex-col justify-between min-h-[340px] rounded-none hover:border-[#C98A4B] transition-colors duration-300 group"
            >
              {/* Hairline top border gradient on active panel */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C98A4B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-6">
                {/* Visual Seal Graphic */}
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-[#C98A4B] tracking-wider uppercase block">
                    {seal.category}
                  </span>
                  
                  {/* Circular Seal Outline */}
                  <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-[#C98A4B] text-[#8A9792] group-hover:text-[#C98A4B] transition-colors duration-300 relative rounded-none">
                    {/* Inner seal pattern */}
                    <svg className="w-6 h-6 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,1" />
                      <path d="M12 4 L12 20 M4 12 L20 12" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="font-display text-base font-bold text-[#E8EDE9] uppercase group-hover:text-[#C98A4B] transition-colors duration-300">
                    {seal.title}
                  </h3>
                  <span className="font-mono text-[10px] text-[#8A9792] block">
                    {seal.org}
                  </span>
                  <p className="font-sans text-[#8A9792] text-xs leading-relaxed pt-2">
                    {seal.desc}
                  </p>
                </div>
              </div>

              {/* Status Code tag */}
              <div className="pt-6 font-mono text-[9px] text-[#7FBFA0] border-t border-white/5 flex items-center gap-2 mt-4">
                <span className="h-1.5 w-1.5 bg-[#7FBFA0] animate-pulse rounded-none" />
                <span>{seal.tag}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
