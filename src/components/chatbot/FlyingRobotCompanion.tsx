"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface FlyingRobotCompanionProps {
  isOpen: boolean;
  onToggleChat: () => void;
}

const GESTURES = [
  "👋 Hi! I'm Ananta AI",
  "🔬 Need R&D or Vision assistance?",
  "👋 Hello from Ananta Labs!",
  "💡 Ask me about our technology!",
  "👋 नमस्ते / નમસ્તે!",
  "⚡ Exploring SwachhVision & Fluidics?"
];

export const FlyingRobotCompanion: React.FC<FlyingRobotCompanionProps> = ({
  isOpen,
  onToggleChat
}) => {
  const [isFlying, setIsFlying] = useState(false);
  const [gestureText, setGestureText] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    // Random flight trigger every 28 to 42 seconds when chat is closed
    const scheduleFlight = () => {
      const delay = Math.floor(Math.random() * (40000 - 25000)) + 25000;
      return setTimeout(() => {
        if (!isOpen && !reducedMotion && typeof window !== 'undefined') {
          triggerFlight();
        }
      }, delay);
    };

    let timer = scheduleFlight();
    return () => clearTimeout(timer);
  }, [isOpen, reducedMotion]);

  const triggerFlight = () => {
    if (isFlying || isOpen) return;
    
    // Choose a random playful gesture
    const randomGesture = GESTURES[Math.floor(Math.random() * GESTURES.length)];
    setGestureText(randomGesture);
    setIsFlying(true);

    // Choose target floating coordinates within viewport boundaries
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const targetX = -Math.min(width * 0.55, 450) + (Math.random() * 120 - 60);
      const targetY = -Math.min(height * 0.45, 360) + (Math.random() * 80 - 40);
      setCoords({ x: targetX, y: targetY });
    }

    // Return to perch after 7 seconds
    setTimeout(() => {
      setGestureText(null);
      setCoords({ x: 0, y: 0 });
      setTimeout(() => {
        setIsFlying(false);
      }, 1000);
    }, 6500);
  };

  return (
    <div className="relative pointer-events-auto select-none">
      {/* Floating Animated Robot */}
      <motion.div
        animate={
          isFlying
            ? {
                x: [0, coords.x * 0.4, coords.x, coords.x + 10, coords.x],
                y: [0, coords.y * 0.6 - 30, coords.y, coords.y - 15, coords.y],
                rotate: [0, -8, 6, -4, 0],
              }
            : {
                x: 0,
                y: [0, -4, 0],
                rotate: [0, 1.5, -1.5, 0],
              }
        }
        transition={
          isFlying
            ? { duration: 6, ease: "easeInOut" }
            : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative cursor-pointer z-50 flex flex-col items-center"
        onClick={() => {
          if (isFlying) {
            setIsFlying(false);
            setCoords({ x: 0, y: 0 });
          }
          onToggleChat();
        }}
        title="Ananta AI Assistant (Click to open chat)"
      >
        {/* Playful Floating Speech Bubble during flight or hover */}
        <AnimatePresence>
          {gestureText && isFlying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              className="absolute -top-12 whitespace-nowrap bg-slate-900/95 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-2xl shadow-xl text-xs font-mono font-medium backdrop-blur-md flex items-center gap-1.5"
            >
              <span>{gestureText}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Small Cute Cartoon Robot Body (approx 44x46px) */}
        <div className="relative w-11 h-12 flex flex-col items-center drop-shadow-[0_4px_12px_rgba(13,148,136,0.35)]">
          {/* Head & Antenna */}
          <div className="relative w-9 h-7 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-cyan-400/60 rounded-xl flex items-center justify-center shadow-inner">
            {/* Antenna with pulsing blue tip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <span className="w-[1.5px] h-2 bg-cyan-500/80" />
            </div>

            {/* Glowing Visor Screen */}
            <div className="w-7 h-4 bg-slate-950 rounded-lg flex items-center justify-around px-1 border border-cyan-500/30 overflow-hidden">
              {/* Cute Left Eye */}
              <motion.div
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.95, 1] }}
                className="w-1.5 h-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"
              />
              {/* Cute Right Eye */}
              <motion.div
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.95, 1] }}
                className="w-1.5 h-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"
              />
            </div>
          </div>

          {/* Robot Torso / Chassis */}
          <div className="w-7 h-4 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-600 rounded-b-lg flex items-center justify-center -mt-0.5">
            {/* Core Energy Reactor Arc */}
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          </div>

          {/* Left Little Arm */}
          <motion.div
            animate={isFlying ? { rotate: [-20, 25, -20] } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute top-4 -left-1.5 w-1.5 h-3 bg-slate-700 border border-cyan-500/30 rounded-full origin-top"
          />

          {/* Right Little Arm (Waving during flight) */}
          <motion.div
            animate={isFlying ? { rotate: [45, 95, 45] } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="absolute top-4 -right-1.5 w-1.5 h-3 bg-slate-700 border border-cyan-500/30 rounded-full origin-top"
          />

          {/* Dual Ion Thrusters with soft animated fire/glow */}
          <div className="flex gap-2 -mt-0.5">
            <motion.div
              animate={{ height: isFlying ? [6, 12, 6] : [3, 6, 3] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
              className="w-1.5 bg-gradient-to-b from-cyan-400 to-transparent rounded-b-full shadow-[0_0_6px_#22d3ee]"
            />
            <motion.div
              animate={{ height: isFlying ? [6, 12, 6] : [3, 6, 3] }}
              transition={{ repeat: Infinity, duration: 0.3, delay: 0.15 }}
              className="w-1.5 bg-gradient-to-b from-cyan-400 to-transparent rounded-b-full shadow-[0_0_6px_#22d3ee]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
