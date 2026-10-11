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

    const finish = () => {
      if (containerRef.current) {
        containerRef.current.style.pointerEvents = "none";
      }
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
          if (onComplete) onComplete();
        },
      });
    };

    if (prefersReducedMotion) {
      setProgress(100);
      finish();
      return;
    }

    const obj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: finish,
    });

    tl.to(obj, {
      value: 100,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      },
    });

    if (wordmarkRef.current) {
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    // Safety timeout ensures user is NEVER blocked if GSAP stalls
    const timer = setTimeout(() => {
      finish();
    }, 1800);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090A] grid-noise-bg font-mono select-none transition-opacity"
      style={{ pointerEvents: "auto" }}
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
            className="absolute top-0 left-0 h-full bg-[#7FBFA0] transition-all duration-75"
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
