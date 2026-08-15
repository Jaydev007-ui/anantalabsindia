"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Work Area", href: "/#work-area" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => {
        const id = item.href.includes("#") ? item.href.split("#")[1] : "";
        return id ? document.getElementById(id) : null;
      });
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = window.scrollY + section.getBoundingClientRect().top - 120;
          if (sectionTop <= scrollPosition) {
            setActiveSection(navItems[i].name.toLowerCase().replace(" ", "-"));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isMobile = mobileMenuOpen;
    setMobileMenuOpen(false);
    
    const isRootPath = typeof window !== "undefined" && window.location.pathname === "/";
    const targetId = href.includes("#") ? href.split("#")[1] : "";
    
    if (targetId && isRootPath) {
      e.preventDefault();
      const doScroll = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const targetPosition = window.scrollY + targetElement.getBoundingClientRect().top - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      };

      if (isMobile) {
        setTimeout(doScroll, 250); // Wait for mobile drawer collapse animation to settle
      } else {
        doScroll();
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with /logo.jpg */}
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="group flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0B0F19] overflow-hidden transition-all group-hover:border-primary/50 shadow-sm">
              <img
                src="/logo.jpg?v=2"
                alt="Ananta Labs India Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.2em] font-bold text-white uppercase leading-none">
                ANANTA LABS
              </span>
              <span className="text-[9px] tracking-[0.35em] text-slate-400 font-sans uppercase leading-none mt-1">
                INDIA
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const normalizedName = item.name.toLowerCase().replace(" ", "-");
              const isActive = activeSection === normalizedName;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative font-sans text-xs uppercase tracking-widest transition-colors hover:text-white ${
                    isActive ? "text-primary font-semibold" : "text-slate-400"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-medium uppercase tracking-widest text-slate-300 transition-all hover:bg-white/10 hover:border-primary/30 group shadow-sm"
            >
              Inquire
              <ArrowUpRight className="h-3 w-3 text-slate-400 group-hover:text-primary transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0B0F19]/80 text-slate-400 hover:text-white shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-nav border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col gap-4 px-6 py-6 bg-[#020617]">
              {navItems.map((item) => {
                const normalizedName = item.name.toLowerCase().replace(" ", "-");
                const isActive = activeSection === normalizedName;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-sans text-xs uppercase tracking-widest py-2 border-b border-white/5 flex items-center justify-between ${
                      isActive ? "text-primary font-bold" : "text-slate-400"
                    }`}
                  >
                    {item.name}
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-200 shadow-sm"
              >
                Inquire Now
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
