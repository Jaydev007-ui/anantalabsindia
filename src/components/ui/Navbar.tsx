"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Manifesto", href: "#manifesto" },
  { name: "Flagship Systems", href: "#flagship-systems" },
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
      setIsScrolled(window.scrollY > 150);

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
      // Normal browser navigation for /research or external paths
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? "bg-[#07090A]/95 backdrop-blur-md border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with /logo.jpg */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="relative flex h-10 w-10 items-center justify-center border border-white/10 bg-[#0E1213] overflow-hidden transition-all group-hover:border-[#7FBFA0] rounded-none">
              <img
                src="/logo.jpg?v=2"
                alt="Ananta Labs India Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.25em] font-bold text-[#E8EDE9] uppercase leading-none">
                ANANTA LABS
              </span>
              <span className="text-[8px] tracking-[0.45em] text-[#8A9792] font-mono uppercase leading-none mt-1.5">
                INDIA
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden min-[900px]:flex items-center gap-8">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link-underline font-mono text-[10px] uppercase tracking-widest transition-colors pb-1 cursor-pointer ${
                    isActive ? "text-[#7FBFA0] font-medium" : "text-[#8A9792] hover:text-[#E8EDE9]"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden min-[900px]:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center justify-center border border-[#7FBFA0] bg-transparent hover:bg-[#7FBFA0] hover:text-[#07090A] px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-[#7FBFA0] transition-all rounded-none cursor-pointer"
            >
              Partner With Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="min-[901px]:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center border border-white/10 bg-[#0E1213] text-[#8A9792] hover:text-[#E8EDE9] rounded-none focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[65px] bg-[#07090A] z-[60] transition-all duration-300 min-[901px]:hidden border-t border-white/5 flex flex-col justify-between p-8 ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100 pointer-events-auto visible"
            : "translate-x-full opacity-0 pointer-events-none invisible"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-mono text-xs uppercase tracking-widest py-3 border-b border-white/5 flex items-center justify-between transition-colors cursor-pointer ${
                  isActive ? "text-[#7FBFA0] font-bold" : "text-[#8A9792]"
                }`}
              >
                {item.name}
                {isActive && <div className="h-1.5 w-1.5 bg-[#7FBFA0] rounded-none" />}
              </a>
            );
          })}
        </nav>
        
        <div className="mb-10">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center justify-center border border-[#7FBFA0] bg-[#7FBFA0] py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#07090A] hover:bg-transparent hover:text-[#7FBFA0] transition-all rounded-none cursor-pointer"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </header>
  );
}
