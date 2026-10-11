"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(sectionRef.current, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      sectionRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-24 border-t border-white/5 bg-transparent overflow-hidden"
    >
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-8 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-[#C98A4B]">01 // MANIFESTO</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        {/* Large Pull-Quote */}
        <div className="max-w-5xl mb-20">
          <blockquote className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#E8EDE9] leading-tight uppercase">
            "We engineering intelligence for the physical world. Where pixels meet hardware, and algorithms drive real-world impact."
          </blockquote>
        </div>

        {/* Two-Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Philosophy Narrative */}
          <div className="lg:col-span-7 space-y-6 font-sans text-[#8A9792] leading-relaxed text-sm sm:text-base">
            <p>
              Ananta Labs India is a founder-led, deep-tech research and development laboratory based in Vadodara, Gujarat. We operate at the convergence of advanced software intelligence and high-precision physical hardware, rejecting speculative hype in favor of deployed, verifiable solutions.
            </p>
            <p>
              Our research team specializes in building lightweight, state-of-the-art computer vision models, medical diagnostics hardware, embedded control modules, and mechanical automation systems. We collaborate closely with premier academic institutions and manufacturing leaders to deploy production-ready technology directly to the field.
            </p>
            <p>
              From automated healthcare fluidics and computerized pulse diagnostics (Prakriti Parikshan) to high-speed visual inspection pipelines, our focus is absolute: engineering robust intelligence that works under noisy, variable real-world conditions.
            </p>
          </div>

          {/* Right: Technical Fact Sheet */}
          <div className="lg:col-span-5">
            <div className="panel-border border border-white/5 bg-[#0E1213] p-6 space-y-6 rounded-none hairline-top-gradient">
              <h3 className="font-display text-xs uppercase tracking-widest text-[#E8EDE9] font-bold border-b border-white/5 pb-3">
                LAB SHEET // SPECIFICATIONS
              </h3>
              
              <dl className="space-y-4 font-mono text-[11px]">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-[#8A9792]">BASE LOCATION</dt>
                  <dd className="text-[#7FBFA0] text-right font-medium">VADODARA, GUJARAT, IN</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-[#8A9792]">FOCUS AREAS</dt>
                  <dd className="text-[#E8EDE9] text-right max-w-[240px]">AI, CV, MED-TECH, MANUFACTURING</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-[#8A9792]">ACADEMIC ALIGNMENT</dt>
                  <dd className="text-[#E8EDE9] text-right">PARUL UNIVERSITY CO-AUTHORSHIP</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-[#8A9792]">INTELLECTUAL PROPERTY</dt>
                  <dd className="text-[#C98A4B] text-right font-medium">ACTIVE INDIAN & INTERNATIONAL FILINGS</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#8A9792]">INCUBATION & HUBS</dt>
                  <dd className="text-[#E8EDE9] text-right">iCREATE ECOSYSTEM PARTNER</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
