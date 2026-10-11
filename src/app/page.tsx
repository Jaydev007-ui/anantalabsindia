"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom Components
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import FlagshipSystems from "@/components/sections/FlagshipSystems";
import Capabilities from "@/components/sections/Capabilities";
import Patents from "@/components/sections/Patents";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Refresh ScrollTrigger to calculate exact section positions once mounted
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return () => clearTimeout(refreshTimer);

    // Background Grid subtle parallax scroll scrub
    gsap.to("#grid-bg", {
      backgroundPositionY: "-120px",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    return () => clearTimeout(refreshTimer);
  }, []);

  return (
    <>
      {/* 1. Preloader overlay: only rendered while loading */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      <div className="relative min-h-screen text-[#E8EDE9] bg-[#07090A] selection:bg-[#7FBFA0]/20 selection:text-white">
        {/* Subtle Parallax Background Grid */}
        <div id="grid-bg" className="fixed inset-0 grid-noise-bg z-0 pointer-events-none" />

        {/* Header Navbar */}
        <Navbar />

        {/* Main sections layout */}
        <main className="relative z-10">
          <Hero />
          <Manifesto />
          <FlagshipSystems />
          <Capabilities />
          <Patents />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
