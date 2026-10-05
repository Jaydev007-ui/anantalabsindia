"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setProgress(100);
      if (onComplete) onComplete();
      return;
    }

    const obj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    tl.to(obj, {
      value: 100,
      duration: 2.0,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      }
    });

    gsap.fromTo(
      wordmarkRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090A] grid-noise-bg font-mono select-none"
    >
      <div className="w-full max-w-xs px-6 flex flex-col items-start gap-3">
        {/* Wordmark */}
        <div 
          ref={wordmarkRef}
          className="flex flex-col items-start font-display text-xl sm:text-2xl tracking-[0.25em] font-bold text-[#E8EDE9] uppercase"
        >
          <span>ANANTA LABS</span>
          <span className="text-[9px] tracking-[0.45em] text-[#8A9792] font-sans mt-0.5">
            DEEP-TECH R&D INDIA
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#7FBFA0]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter */}
        <div className="w-full flex items-center justify-between text-[10px] text-[#8A9792]">
          <span className="tracking-wider">INITIALIZING R&D SYSTEM</span>
          <span className="font-mono text-[#7FBFA0] font-medium tracking-widest">
            {progress.toString().padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
