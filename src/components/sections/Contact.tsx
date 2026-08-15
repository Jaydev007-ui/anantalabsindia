"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const inquiryId = `AN-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry = {
      ...data,
      id: inquiryId,
      date: new Date().toISOString(),
      status: "Unread",
    };

    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry),
      });
    } catch (e) {
      console.error("API write failed", e);
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Background neon glows */}
      <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold">
            COMMUNICATION
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Connect With Our Lab
          </h3>
          <p className="font-sans text-slate-400 leading-relaxed text-sm md:text-base">
            Establish communication for R&D integrations, device licensing, partnerships, or project requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact details & Map Mockup */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card border border-white/5 rounded-2xl p-8 space-y-6 shadow-sm">
              
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                Ananta Labs India
              </h4>

              <div className="space-y-4 text-xs font-sans text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#0088FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-white font-bold">Laboratory HQ</span>
                    Vadodara, Gujarat, India
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <span className="block text-white font-bold">Inquiries</span>
                    anantalabsindia@gmail.com
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#0088FF] shrink-0" />
                  <div>
                    <span className="block text-white font-bold">Contact Line</span>
                    +91 89807 41150
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-white/5 flex gap-4">
                <a href="#" className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-500 hover:text-[#0088FF] hover:border-[#0088FF] transition-all">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-500 hover:text-black hover:border-black transition-all">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-500 hover:text-[#0088FF] hover:border-[#0088FF] transition-all">
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Real Google Map visual (Vadodara, Gujarat) */}
            <div className="glass-card border border-white/5 rounded-2xl overflow-hidden h-60 relative shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.81619358249!2d73.10304618796541!3d22.2854730030588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1e57002!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="glass-card border border-white/5 rounded-2xl p-8 shadow-sm">
              
              <h4 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-wider">
                Send a Secure Inquiry
              </h4>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center space-y-2"
                >
                  <h5 className="font-display text-sm font-bold text-green-600 uppercase tracking-wider">
                    Transmission Successful
                  </h5>
                  <p className="font-sans text-xs text-slate-400">
                    Your inquiry has been encrypted and routed directly to our R&D communications queue. A lab associate will respond shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 transition-colors ${
                          errors.name ? "border-red-500/40" : "border-white/10"
                        }`}
                        placeholder=""
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                        })}
                        className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 transition-colors ${
                          errors.email ? "border-red-500/40" : "border-white/10"
                        }`}
                        placeholder=""
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.email.message}</span>
                      )}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder=""
                      />
                    </div>

                    {/* Organization */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Organization *
                      </label>
                      <input
                        type="text"
                        {...register("organization", { required: "Organization is required" })}
                        className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 transition-colors ${
                          errors.organization ? "border-red-500/40" : "border-white/10"
                        }`}
                        placeholder=""
                      />
                      {errors.organization && (
                        <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.organization.message}</span>
                      )}
                    </div>

                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      {...register("message", { required: "Message is required" })}
                      className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.message ? "border-red-500/40" : "border-white/10"
                      }`}
                      placeholder=""
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border border-white border-t-transparent" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          TRANSMIT REQUEST
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
