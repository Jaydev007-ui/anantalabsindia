"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return Math.min(100, prev + step);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] font-display"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* Futuristic background layout grid */}
          <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

          {/* Pulsing circular core */}
          <div className="absolute h-96 w-96 rounded-full bg-primary/5 blur-30vw animate-pulse-glow" />

          <div className="relative flex flex-col items-center">
            {/* Animated Logo Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* Outer pulsing rings */}
              <div className="absolute h-28 w-28 rounded-full border border-primary/20 animate-ping opacity-60" />
              <div className="absolute h-24 w-24 rounded-full border border-secondary/15 animate-spin-slow" />
              
              {/* Image Logo Frame */}
              <div className="relative h-20 w-20 rounded-2xl border border-white/10 overflow-hidden bg-[#0B0F19] shadow-sm flex items-center justify-center">
                <img
                  src="/logo.jpg?v=2"
                  alt="Ananta Labs Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 text-xl tracking-[0.3em] font-black uppercase text-white"
            >
              ANANTA LABS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="text-xs tracking-[0.4em] font-sans text-slate-400 uppercase mt-2"
            >
              ENGINEERING INTELLIGENCE
            </motion.p>

            {/* Loading Bar */}
            <div className="relative mt-12 h-0.5 w-64 overflow-hidden rounded-full bg-white/5 border border-white/5">
              <motion.div
                className="absolute h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage Text */}
            <span className="mt-4 font-mono text-sm tracking-wider text-primary font-bold">
              {Math.floor(progress).toString().padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
