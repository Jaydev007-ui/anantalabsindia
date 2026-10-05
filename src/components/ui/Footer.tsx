"use client";

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
    <footer className="relative border-t border-white/5 bg-[#07090A] py-12 overflow-hidden">
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-8 md:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span 
            onClick={() => handleScrollTo("home")}
            className="font-display text-sm tracking-[0.2em] font-bold text-[#E8EDE9] uppercase cursor-pointer hover:text-[#7FBFA0] transition-colors"
          >
            ANANTA LABS
          </span>
          <span className="hidden md:inline text-white/10">|</span>
          <span className="font-mono text-[9px] text-[#8A9792] tracking-wider uppercase">
            © {currentYear} ALL RIGHTS RESERVED. REGISTERED DEEP-TECH ORG
          </span>
        </div>

        {/* Right: Technical Location Coordinates */}
        <div className="font-mono text-[9px] text-[#8A9792] flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>LOC // VADODARA, GUJARAT, INDIA</span>
          <span className="hidden sm:inline text-white/10">/</span>
          <span className="text-[#C98A4B]">LAT: 22.3072° N // LON: 73.1812° E</span>
        </div>

      </div>
    </footer>
  );
}
