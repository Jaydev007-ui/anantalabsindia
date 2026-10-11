"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck, Key } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Manifesto", href: "#manifesto" },
  { name: "Flagship", href: "#flagship-systems" },
  { name: "Store", href: "#store" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Patents", href: "#patents" },
  { name: "Research Hub", href: "/research" },
  { name: "Contact", href: "#contact" },
  { name: "Admin Panel", href: "/admin" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
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
            {/* Admin Portal Button - always accessible on all screen sizes */}
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 border border-[#0D9488]/40 bg-[#0D9488]/10 hover:bg-[#0D9488] hover:text-white px-2.5 sm:px-3.5 py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#0D9488] transition-all font-bold rounded-lg cursor-pointer shadow-xs shrink-0"
            >
              <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">Admin</span>
              <span className="hidden sm:inline">Panel</span>
            </a>

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
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none cursor-pointer shadow-xs shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      <div
        className={`fixed inset-0 top-[57px] sm:top-[65px] bg-white/98 backdrop-blur-xl z-[60] transition-all duration-300 lg:hidden border-t border-slate-200 flex flex-col justify-between p-5 sm:p-8 shadow-2xl max-h-[calc(100dvh-57px)] sm:max-h-[calc(100dvh-65px)] overflow-y-auto ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100 pointer-events-auto visible"
            : "translate-x-full opacity-0 pointer-events-none invisible"
        }`}
      >
        <nav className="flex flex-col gap-1 sm:gap-2">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-mono text-xs sm:text-sm uppercase tracking-wider py-3 px-3 rounded-xl border-b border-slate-100/80 flex items-center justify-between transition-colors cursor-pointer ${
                  item.name === "Admin Panel"
                    ? "text-[#0D9488] font-bold bg-[#0D9488]/10 border-[#0D9488]/30 my-1"
                    : isActive
                    ? "text-[#0D9488] font-bold bg-slate-50"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{item.name}</span>
                {item.name === "Admin Panel" && <ShieldCheck className="h-4 w-4 text-[#0D9488]" />}
                {isActive && item.name !== "Admin Panel" && (
                  <div className="h-2 w-2 bg-[#0D9488] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>
        
        <div className="pt-6 pb-2 space-y-3">
          <a
            href="/admin"
            className="flex items-center justify-center gap-2 border border-[#0D9488] bg-[#0D9488]/10 py-3 font-mono text-xs uppercase tracking-wider text-[#0D9488] font-bold rounded-xl"
          >
            <Key className="w-4 h-4" />
            Enter Admin Portal
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center justify-center bg-[#0F172A] py-3 font-mono text-xs uppercase tracking-wider text-white font-bold rounded-xl"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </header>
  );
}
