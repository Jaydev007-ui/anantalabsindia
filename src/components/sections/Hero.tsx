"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          eyebrowRef.current,
          titleLine1Ref.current,
          titleLine2Ref.current,
          subheadRef.current,
          ctaRef.current,
          scrollCueRef.current,
        ],
        {
          y: 0,
          opacity: 1,
        }
      );
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      eyebrowRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    )
      .fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { y: "105%" },
        { y: "0%", duration: 0.7, stagger: 0.12, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(
        subheadRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

    if (scrollCueRef.current) {
      gsap.fromTo(
        scrollCueRef.current.querySelector("span:first-child"),
        { y: 0 },
        { y: 4, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" }
      );
    }
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[90dvh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 bg-transparent overflow-hidden"
    >
      {/* Decorative vertical lines on sides (hidden on mobile, visible on desktop) */}
      <div className="hidden md:block absolute left-4 md:left-8 top-32 bottom-16 w-[1px] bg-slate-200 pointer-events-none" />
      <div className="hidden md:block absolute right-4 md:right-8 top-32 bottom-16 w-[1px] bg-slate-200 pointer-events-none" />

      <div className="flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 z-10 py-6 sm:py-0">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#B45309] font-semibold flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
            <span>Deep-Tech R&D · Vadodara, Gujarat, India</span>
          </div>

          {/* Masked Headline */}
          <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.05] uppercase break-words">
            <span className="block overflow-hidden pb-1">
              <span ref={titleLine1Ref} className="block">
                Engineering intelligence
              </span>
            </span>
            <span className="block overflow-hidden pb-1 text-[#0D9488]">
              <span ref={titleLine2Ref} className="block">
                for real-world systems.
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="font-sans text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-normal"
          >
            Developing state-of-the-art computer vision models, medical diagnostics hardware, and automated manufacturing pipelines for industry and academia.
          </p>

          {/* Responsive CTAs (full width on small phones, auto on tablet/desktop) */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
          >
            <button
              type="button"
              onClick={() => handleScrollTo("flagship-systems")}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-[#0D9488] bg-[#0D9488] text-white hover:bg-[#0F766E] px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-xl cursor-pointer shadow-xs font-semibold text-center"
            >
              View Flagship Systems
            </button>
            <button
              type="button"
              onClick={() => handleScrollTo("store")}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-slate-300 bg-white hover:border-[#0D9488] hover:text-[#0D9488] px-6 sm:px-8 py-3 sm:py-3.5 font-mono text-xs uppercase tracking-widest text-slate-700 transition-all duration-300 rounded-xl cursor-pointer shadow-xs text-center"
            >
              Hardware Store
            </button>
            <button
              type="button"
              onClick={() => handleScrollTo("patents")}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-slate-200 bg-slate-50 hover:border-[#B45309] hover:text-[#B45309] px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-xs uppercase tracking-widest text-slate-600 transition-all duration-300 rounded-xl cursor-pointer text-center"
            >
              Patents & IP
            </button>
          </div>
        </div>
      </div>

      {/* Bottom section with scroll cue */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 z-10 flex items-end">
        <div
          ref={scrollCueRef}
          onClick={() => handleScrollTo("manifesto")}
          className="group inline-flex items-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 hover:text-[#0D9488] transition-colors cursor-pointer select-none"
        >
          <span className="w-4 h-4 flex items-center justify-center border border-slate-300 group-hover:border-[#0D9488] transition-colors rounded-full text-[9px] font-bold">
            ↓
          </span>
          <span>Scroll to Explore</span>
        </div>
      </div>
    </section>
  );
}
