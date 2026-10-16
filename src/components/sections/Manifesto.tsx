"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "@/lib/useSiteContent";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();
  const manifestoData = content?.manifesto;

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
      className="relative py-16 sm:py-24 border-t border-slate-200 bg-transparent overflow-hidden"
    >
      <div className="hidden md:block absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />
      <div className="hidden md:block absolute right-4 md:right-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <span className="font-mono text-xs text-[#B45309] font-semibold">
            {manifestoData?.tagline || "01 // MANIFESTO"}
          </span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        {/* Large Pull-Quote */}
        <div className="max-w-5xl mb-10 sm:mb-16">
          <blockquote className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-snug sm:leading-tight uppercase break-words">
            {manifestoData?.pullQuote ||
              `"We engineer intelligence for the physical world. Where pixels meet hardware, and algorithms drive real-world impact."`}
          </blockquote>
        </div>

        {/* Philosophy Narrative */}
        <div className="max-w-4xl space-y-4 sm:space-y-6 font-sans text-slate-600 leading-relaxed text-sm sm:text-base">
          <p>
            {manifestoData?.p1 ||
              "Ananta Labs India is a founder-led, deep-tech research and development laboratory based in Vadodara, Gujarat. We operate at the convergence of advanced software intelligence and high-precision physical hardware, rejecting speculative hype in favor of deployed, verifiable solutions."}
          </p>
          <p>
            {manifestoData?.p2 ||
              "Our research team specializes in building lightweight, state-of-the-art computer vision models, medical diagnostics hardware, embedded control modules, and mechanical automation systems. We collaborate closely with premier academic institutions and manufacturing leaders to deploy production-ready technology directly to the field."}
          </p>
          <p>
            {manifestoData?.p3 ||
              "From automated healthcare fluidics and computerized pulse diagnostics (Prakriti Parikshan) to high-speed visual inspection pipelines, our focus is absolute: engineering robust intelligence that works under noisy, variable real-world conditions."}
          </p>
        </div>

      </div>
    </section>
  );
}
