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
      setIsScrolled(window.scrollY > 40);

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
      // Direct navigation to /admin or /research
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
          ? "bg-white/95 backdrop-blur-md border-slate-200/90 py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-slate-100 py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with /logo.jpg */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="relative flex h-10 w-10 items-center justify-center border border-slate-200 bg-slate-50 overflow-hidden transition-all group-hover:border-[#0D9488] rounded-xl shadow-xs">
              <img
                src="/logo.jpg?v=2"
                alt="Ananta Labs India Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.2em] font-bold text-slate-900 uppercase leading-none">
                ANANTA LABS
              </span>
              <span className="text-[8px] tracking-[0.45em] text-[#0D9488] font-mono uppercase font-bold leading-none mt-1.5">
                INDIA
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.filter((i) => i.name !== "Admin Panel").map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link-underline font-mono text-[11px] uppercase tracking-wider transition-colors pb-1 cursor-pointer font-medium ${
                    isActive ? "text-[#0D9488] font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Admin Portal & Partner */}
          <div className="hidden min-[900px]:flex items-center gap-3">
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 border border-[#0D9488]/40 bg-[#0D9488]/10 hover:bg-[#0D9488] hover:text-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#0D9488] transition-all font-bold rounded-lg cursor-pointer shadow-xs"
            >
              <Key className="w-3 h-3" />
              Admin Panel
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center justify-center bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all rounded-lg cursor-pointer shadow-xs"
            >
              Partner With Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="min-[901px]:hidden flex items-center gap-2">
            <a
              href="/admin"
              className="inline-flex items-center gap-1 border border-[#0D9488]/40 bg-[#0D9488]/10 text-[#0D9488] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider font-bold rounded-md"
            >
              <Key className="w-2.5 h-2.5" />
              Admin
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-slate-700 hover:text-slate-950 rounded-lg focus:outline-none cursor-pointer shadow-xs"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[65px] bg-white z-[60] transition-all duration-300 min-[901px]:hidden border-t border-slate-200 flex flex-col justify-between p-6 shadow-xl ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100 pointer-events-auto visible"
            : "translate-x-full opacity-0 pointer-events-none invisible"
        }`}
      >
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-mono text-xs uppercase tracking-wider py-2.5 border-b border-slate-100 flex items-center justify-between transition-colors cursor-pointer ${
                  item.name === "Admin Panel"
                    ? "text-[#0D9488] font-bold bg-[#0D9488]/5 px-2 rounded-lg"
                    : isActive
                    ? "text-[#0D9488] font-bold"
                    : "text-slate-700"
                }`}
              >
                <span>{item.name}</span>
                {item.name === "Admin Panel" && <ShieldCheck className="h-4 w-4 text-[#0D9488]" />}
                {isActive && item.name !== "Admin Panel" && <div className="h-1.5 w-1.5 bg-[#0D9488] rounded-full" />}
              </a>
            );
          })}
        </nav>
        
        <div className="mb-6 space-y-2">
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
