"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
};

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(sectionRef.current, { y: 0, opacity: 1 });
      return;
    }

    gsap.fromTo(
      sectionRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const inquiryId = `AN-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry = {
      ...data,
      id: inquiryId,
      date: new Date().toISOString(),
      status: "Unread",
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (e) {
      console.error("API submission failed", e);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 border-t border-slate-200 bg-transparent overflow-hidden"
    >
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 w-full">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[#B45309] font-semibold">05 // PARTNER WITH US</span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Headline and Info */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight uppercase leading-tight">
                Let's engineer the future of deep-tech.
              </h2>
              <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you want to deploy our edge visual prevention systems in your facilities, integrate clinical-grade diagnostics algorithms, or procure custom hardware — our team is ready.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-8 font-mono text-xs text-slate-600">
              <div>
                <span className="text-[#B45309] block uppercase tracking-wider mb-1 font-semibold">LAB ENQUIRIES</span>
                <a href="mailto:anantalabsindia@gmail.com" className="text-slate-900 hover:text-[#0D9488] font-medium transition-colors">
                  anantalabsindia@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[#B45309] block uppercase tracking-wider mb-1 font-semibold">TELEMETRY RELAY</span>
                <span className="text-slate-900 font-medium">+91 89807 41150</span>
              </div>
              <div>
                <span className="text-[#B45309] block uppercase tracking-wider mb-1 font-semibold">LAB COORDINATES</span>
                <span className="text-slate-900 block font-medium">Vadodara, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-6 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border border-slate-200 bg-white p-6 sm:p-8 space-y-6 rounded-2xl shadow-sm"
            >
              <h3 className="font-display text-xs uppercase tracking-widest text-slate-900 font-bold border-b border-slate-100 pb-3">
                TRANSMIT // INQUIRY DATA
              </h3>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 block font-medium">
                    Full Name / Identifier *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Dr. Rajesh Sharma"
                    className="w-full bg-slate-50 border border-slate-300 px-4 py-2.5 font-sans text-sm text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:border-[#0D9488]"
                    {...register("name", { required: true })}
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className="font-mono text-[8px] text-red-500 font-bold">Required field.</span>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 block font-medium">
                    Secure Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="r.sharma@hospital.org"
                    className="w-full bg-slate-50 border border-slate-300 px-4 py-2.5 font-sans text-sm text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:border-[#0D9488]"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="font-mono text-[8px] text-red-500 font-bold">Invalid email layout.</span>}
                </div>

                {/* Phone & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 block font-medium">
                      Contact Node / Phone *
                    </label>
                    <input
                      id="phone"
                      type="text"
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 px-4 py-2.5 font-sans text-sm text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:border-[#0D9488]"
                      {...register("phone", { required: true })}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <span className="font-mono text-[8px] text-red-500 font-bold">Required field.</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="organization" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 block font-medium">
                      Organization / Entity *
                    </label>
                    <input
                      id="organization"
                      type="text"
                      placeholder="AIIMS / Research Institute"
                      className="w-full bg-slate-50 border border-slate-300 px-4 py-2.5 font-sans text-sm text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:border-[#0D9488]"
                      {...register("organization", { required: true })}
                      disabled={isSubmitting}
                    />
                    {errors.organization && <span className="font-mono text-[8px] text-red-500 font-bold">Required field.</span>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-wider text-slate-600 block font-medium">
                    Brief Description of Requirements *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe collaboration or technology procurement scope..."
                    className="w-full bg-slate-50 border border-slate-300 px-4 py-2.5 font-sans text-sm text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:border-[#0D9488] resize-none"
                    {...register("message", { required: true })}
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className="font-mono text-[8px] text-red-500 font-bold">Required field.</span>}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#0D9488] hover:bg-[#0F766E] text-white px-7 py-3 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 rounded-xl cursor-pointer font-bold shadow-sm disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "TRANSMITTING..." : "TRANSMIT INQUIRY"}
                </button>

                {submitStatus === "success" && (
                  <span className="font-mono text-[10px] text-[#0D9488] font-bold">
                    ✓ TRANSMISSION RECEIVED // RECORDED TO ADMIN LOG
                  </span>
                )}
                {submitStatus === "error" && (
                  <span className="font-mono text-[10px] text-red-500 font-bold">
                    SYS_REPLY // PACKET ERROR
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
