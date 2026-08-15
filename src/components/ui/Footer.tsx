"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";

type NewsletterForm = {
  email: string;
};

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>();

  const onSubscribe = async (data: NewsletterForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Subscribed email:", data.email);
    setSubscribed(true);
    reset();
    setTimeout(() => setSubscribed(false), 5000);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = window.scrollY + targetElement.getBoundingClientRect().top - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-[#080808] border-t border-white/5 pt-20 pb-10 overflow-hidden text-slate-300">
      
      {/* Background glowing particles overlay */}
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-white/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          
          {/* Logo & Intro Column */}
          <div className="md:col-span-4 space-y-6">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#121212] overflow-hidden shadow-sm">
                <img
                  src="/logo.jpg?v=2"
                  alt="Ananta Labs Logo"
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
            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-sm">
              Ananta Labs India is a research-driven technology corporation engineering deep-tech hardware systems, clinical fluidics systems, and mobile software.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-[10px] font-bold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="font-sans text-xs space-y-2.5">
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="text-slate-400 hover:text-white transition-colors">
                  About Org
                </a>
              </li>
              <li>
                <a href="#work-area" onClick={(e) => handleNavClick(e, "#work-area")} className="text-slate-400 hover:text-white transition-colors">
                  Work Areas
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleNavClick(e, "#products")} className="text-slate-400 hover:text-white transition-colors">
                  Featured Products
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Research & Tech Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-[10px] font-bold text-white uppercase tracking-widest">
              Work Domains
            </h4>
            <ul className="font-sans text-xs space-y-2.5">
              <li>
                <a href="#work-area" onClick={(e) => handleNavClick(e, "#work-area")} className="text-slate-400 hover:text-white transition-colors">
                  Manufacturing
                </a>
              </li>
              <li>
                <a href="#work-area" onClick={(e) => handleNavClick(e, "#work-area")} className="text-slate-400 hover:text-white transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#work-area" onClick={(e) => handleNavClick(e, "#work-area")} className="text-slate-400 hover:text-white transition-colors">
                  App Development
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display text-[10px] font-bold text-white uppercase tracking-widest">
              Newsletter Subscription
            </h4>
            <p className="font-sans text-xs text-slate-400 leading-normal">
              Subscribe to receive updates on clinical device releases, product updates, and work milestones.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3 text-xs text-green-400 font-mono">
                <Check className="h-4 w-4 shrink-0" />
                SUBSCRIBED SUCCESSFULLY
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubscribe)} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    className="flex-1 rounded-lg border border-white/10 bg-[#121212] px-4 py-2.5 font-sans text-xs text-white placeholder-neutral-550 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Enter email address"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-white px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-200 transition-colors cursor-pointer shadow-sm"
                  >
                    Subscribe
                  </button>
                </div>
                {errors.email && (
                  <span className="text-[10px] text-red-400 font-mono mt-0.5 block">{errors.email.message}</span>
                )}
              </form>
            )}

            <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono">
              <ShieldCheck className="h-3 w-3 text-white" />
              NO SPAM. SECURE TRANSACTIONS.
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-slate-500">
          <div className="flex flex-wrap gap-6">
            <span>© {new Date().getFullYear()} Ananta Labs India. All rights reserved.</span>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          
          {/* MSME Certified logo badge */}
          <div className="flex items-center gap-2 rounded border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 text-[9px] font-mono text-amber-500 font-bold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#F59E0B]" />
            MSME Registered
          </div>
        </div>

      </div>
    </footer>
  );
}
