"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Manifesto", href: "#manifesto" },
  { name: "Flagship", href: "#flagship-systems" },
  { name: "Store", href: "#store" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Patents", href: "#patents" },
  { name: "Research Hub", href: "/research" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const anchorItems = navItems.filter((item) => item.href.startsWith("#"));
      const sections = anchorItems.map((item) => {
        const id = item.href.replace("#", "");
        return document.getElementById(id);
      });

      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollPosition) {
            setActiveSection(anchorItems[i].href.replace("#", ""));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    if (!href.startsWith("#")) {
      return;
    }

    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", href);
    } else {
      window.location.href = `/${href}`;
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200/90 py-2.5 sm:py-3 shadow-xs"
            : "bg-white/85 backdrop-blur-sm border-slate-100 py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo with /logo.jpg */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0"
            >
              <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border border-slate-200 bg-slate-50 overflow-hidden transition-all group-hover:border-[#0D9488] rounded-xl shadow-xs shrink-0">
                <img
                  src="/logo.jpg?v=2"
                  alt="Ananta Labs India Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.2em] font-bold text-slate-900 uppercase leading-none">
                  ANANTA LABS
                </span>
                <span className="text-[7px] sm:text-[8px] tracking-[0.35em] sm:tracking-[0.45em] text-[#0D9488] font-mono uppercase font-bold leading-none mt-1 sm:mt-1.5">
                  INDIA
                </span>
              </div>
            </a>

            {/* Desktop Nav Items (visible on lg screens >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
              {navItems.filter((i) => i.name !== "Admin Panel").map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`nav-link-underline font-mono text-[11px] xl:text-xs uppercase tracking-wider transition-colors pb-1 cursor-pointer font-medium whitespace-nowrap ${
                      isActive ? "text-[#0D9488] font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop & Tablet Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Partner With Us Button (hidden on small mobile, visible on tablet and desktop) */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="hidden md:inline-flex items-center justify-center bg-[#0F172A] hover:bg-[#1E293B] text-white px-3.5 sm:px-4 py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all rounded-lg cursor-pointer shadow-xs whitespace-nowrap"
              >
                Partner With Us
              </a>

              {/* Mobile & Tablet Drawer Hamburger Button (visible below lg < 1024px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none cursor-pointer shadow-xs shrink-0"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile & Tablet Drawer Menu (placed outside header to prevent backdrop-filter containing block issues) */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col h-full transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                <img src="/logo.jpg?v=2" alt="Ananta Labs India" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xs tracking-[0.18em] font-bold text-slate-900 uppercase leading-none">
                  ANANTA LABS
                </span>
                <span className="text-[7px] tracking-[0.35em] text-[#0D9488] font-mono uppercase font-bold leading-none mt-1">
                  INDIA MENU
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer shrink-0"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Navigation List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-1.5 overscroll-contain">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-3 py-1 mb-1">
              Navigation Index
            </div>

            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              const isResearch = item.name === "Research Hub";

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-slate-100 border-slate-200 text-[#0D9488] font-bold"
                      : "bg-transparent border-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-100 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isResearch && <span className="text-sky-600 font-bold">●</span>}
                    <span>{item.name}</span>
                  </div>

                  {isActive ? (
                    <span className="h-2 w-2 rounded-full bg-[#0D9488]" />
                  ) : (
                    <span className="text-slate-300 font-mono text-xs">→</span>
                  )}
                </a>
              );
            })}

            {/* Quick Action Buttons & Footer Info */}
            <div className="pt-5 pb-8 space-y-3 border-t border-slate-100 mt-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center justify-center bg-[#0F172A] py-3 font-mono text-xs uppercase tracking-wider text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-sm"
              >
                Partner With Us
              </a>

              <div className="pt-3 text-center font-mono text-[9px] text-slate-400 space-y-1">
                <div>anantalabsindia@gmail.com</div>
                <div>Vadodara, Gujarat, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
