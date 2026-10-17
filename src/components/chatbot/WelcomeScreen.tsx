"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Layers, Handshake, HelpCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onSelectAction: (prompt: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectAction }) => {
  const actions = [
    {
      label: "Explore Our Products",
      icon: <Layers className="w-3.5 h-3.5 text-cyan-400" />,
      prompt: "What products and hardware systems does Ananta Labs India develop?"
    },
    {
      label: "Understand Our Technology",
      icon: <Cpu className="w-3.5 h-3.5 text-teal-400" />,
      prompt: "Explain SwachhVision and the Automated Embalming Machine technology."
    },
    {
      label: "Discuss a Project",
      icon: <Handshake className="w-3.5 h-3.5 text-amber-400" />,
      prompt: "I want to discuss an engineering collaboration or custom prototyping project."
    },
    {
      label: "Ask a Technical Question",
      icon: <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />,
      prompt: "What is your architecture for Edge Computer Vision and TinyML on ESP32?"
    }
  ];

  return (
    <div className="py-6 px-3 flex flex-col items-center text-center space-y-6">
      {/* Brand Accent Shield */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950 border border-cyan-500/40 p-2 shadow-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Required Heading & Subheading */}
      <div className="space-y-2 max-w-sm">
        <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight leading-snug">
          Intelligence, engineered for you.
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Explore our technology, discover our capabilities, or discuss your next engineering challenge.
        </p>
      </div>

      {/* 4 Suggested Action Pills */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2">
        {actions.map((act, idx) => (
          <motion.button
            key={idx}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => onSelectAction(act.prompt)}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-start gap-2.5 group cursor-pointer text-left shadow-xs"
          >
            <div className="p-1 rounded-lg bg-slate-950 border border-slate-800 shrink-0 group-hover:border-cyan-500/40 transition">
              {act.icon}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition leading-tight">
                {act.label}
              </div>
              <div className="text-[10px] text-slate-500 truncate max-w-[150px] mt-0.5 font-mono">
                Click to explore →
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
