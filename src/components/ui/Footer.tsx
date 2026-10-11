"use client";

import { Key } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const targetPosition = window.scrollY + el.getBoundingClientRect().top - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative border-t border-slate-200 bg-white py-10 sm:py-12 overflow-hidden text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        
        {/* Left: Brand copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span 
            onClick={() => handleScrollTo("home")}
            className="font-display text-sm tracking-[0.2em] font-bold text-slate-900 uppercase cursor-pointer hover:text-[#0D9488] transition-colors"
          >
            ANANTA LABS
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase">
            © {currentYear} ALL RIGHTS RESERVED. DEEP-TECH R&D
          </span>
        </div>

        {/* Center: Admin Portal shortcut */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono">
          <a
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-[#0D9488]/10 hover:text-[#0D9488] hover:border-[#0D9488]/40 transition-colors text-slate-700"
          >
            <Key className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Admin Executive Portal</span>
          </a>
          <a
            href="/research"
            className="hover:text-[#0D9488] transition-colors"
          >
            Research Hub
          </a>
        </div>

        {/* Right: Technical Location Coordinates */}
        <div className="font-mono text-[9px] text-slate-400 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 text-center sm:text-right">
          <span>LOC // VADODARA, GUJARAT, INDIA</span>
          <span className="hidden sm:inline text-slate-300">/</span>
          <span className="text-[#B45309]">LAT: 22.3072° N // LON: 73.1812° E</span>
        </div>

      </div>
    </footer>
  );
}
