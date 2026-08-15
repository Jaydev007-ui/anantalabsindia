"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Cpu, BatteryCharging, Thermometer, Sliders, Activity, Settings, X, ShoppingCart } from "lucide-react";

type OrderFormData = {
  customerName: string;
  email: string;
  phone: string;
  organization: string;
  address: string;
  capacity: "10L" | "15L";
  quantity: number;
  comments?: string;
};

const productFeatures = [
  {
    icon: Cpu,
    title: "Compact Size",
    desc: "Designed for a small footprint in laboratories, clinical research desks, and easy transport portability.",
  },
  {
    icon: BatteryCharging,
    title: "Dual Power Mode",
    desc: "Supports standard AC mains power and seamless DC battery backup for operations during power fluctuations.",
  },
  {
    icon: Thermometer,
    title: "Tank Capacity: 10-15 L",
    desc: "High-capacity fluid reservoir engineered for continuous preservation operations without reloading.",
  },
  {
    icon: Sliders,
    title: "Precise Regulated Control",
    desc: "Empirical control feedback loops adjusting pump pressure and fluid volume flow with high accuracy.",
  },
  {
    icon: Activity,
    title: "Smooth Flow",
    desc: "Vibration-damped pump assembly delivering laminar fluid flow without vascular or cell micro-shocks.",
  },
  {
    icon: Settings,
    title: "Easy to Operate",
    desc: "One-touch dashboard buttons for inject, rinse, and standby modes with quick physical adjustments.",
  },
];

export default function Products() {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormData>({
    defaultValues: {
      capacity: "10L",
      quantity: 1,
    },
  });

  // Watch capacity and quantity for live price computations
  const selectedCapacity = watch("capacity", "10L");
  const quantity = Number(watch("quantity", 1) || 1);
  const unitPrice = selectedCapacity === "15L" ? 27000 : 25000;
  const totalPrice = unitPrice * quantity;

  const onPlaceOrder = async (data: OrderFormData) => {
    const calcUnitPrice = data.capacity === "15L" ? 27000 : 25000;
    const calcTotalPrice = calcUnitPrice * Number(data.quantity || 1);

    const orderId = `AN-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      ...data,
      id: orderId,
      date: new Date().toISOString(),
      status: "Pending",
      unitPrice: calcUnitPrice,
      totalPrice: calcTotalPrice,
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
    } catch (e) {
      console.error("API write failed", e);
    }

    setOrderConfirmed(orderId);
    reset();
  };

  return (
    <section id="products" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold"
          >
            FLAGSHIP PRODUCT
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Embalming Machine
          </motion.h3>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/10 bg-primary/5 text-xs font-bold tracking-wide text-primary uppercase">
              <ShieldCheck className="h-3.5 w-3.5" />
              Ananta Preserv-1 Fluidics Platform
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#F59E0B]" />
              Launching Soon
            </div>
          </div>
        </div>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 max-w-6xl mx-auto">
          
          {/* Left Column: High-Res Photo only */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Visual Frame */}
            <div className="relative w-full max-w-[450px] aspect-square rounded-2xl border border-white/5 bg-white/5 shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src="/embalming_machine.jpg"
                alt="Ananta Preserv-1 Embalming Machine Chassis"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Spec copy and Order placement triggers */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#0088FF] font-bold">
                SYSTEM SPECIFICATIONS
              </h4>
              <h5 className="font-display text-2xl font-bold text-white">
                Precision Mortuary Infusion Engineering
              </h5>
              <p className="font-sans text-slate-400 leading-relaxed text-sm">
                The Ananta Preserv-1 is built for medical labs, hospitals, and universities requiring precise, reliable preservation methods. Its automated fluidics engine reduces procedural errors while providing maximum sanitization security.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-4">
              <button
                onClick={() => setIsOrdering(true)}
                className="relative inline-flex items-center justify-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-amber-400 hover:bg-amber-500/20 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                Launching Soon
              </button>
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all cursor-pointer shadow-sm"
              >
                Request Technical Info
              </a>
            </div>
          </div>

        </div>

        {/* Features 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto border-t border-white/5 pt-16">
          {productFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="glass-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group shadow-sm hover:border-primary/20"
              >
                {/* Left accent indicator */}
                <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-primary/10 group-hover:bg-primary transition-all" />
                
                <div className="flex gap-4 items-start">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/5 group-hover:bg-primary/5 transition-colors">
                    <Icon className="h-5 w-5 text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display text-sm font-bold text-white group-hover:text-primary transition-colors">
                      {feat.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Slide-over order drawer panel */}
      <AnimatePresence>
        {isOrdering && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOrdering(false);
                setOrderConfirmed(null);
              }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide drawer container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-[#080808]/95 backdrop-blur-md shadow-2xl border-l border-white/10 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Place Machine Order</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Ananta Preserv-1 Fluidics Platform</p>
                </div>
                <button
                  onClick={() => {
                    setIsOrdering(false);
                    setOrderConfirmed(null);
                  }}
                  className="h-8 w-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-slate-100 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {orderConfirmed ? (
                  /* Success Screen layout */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col justify-center items-center text-center space-y-6"
                  >
                    <div className="h-16 w-16 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-display text-lg font-bold text-white">Order Placed Successfully</h4>
                      <p className="font-mono text-xs text-[#0088FF] font-bold">TICKET ID: {orderConfirmed}</p>
                    </div>

                    <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-sm">
                      We have received your preservation requisition. An engineering manager from our Vadodara HQ will contact you within 24 hours to confirm invoicing, dispatch schedule, and technical specifications.
                    </p>

                    <button
                      onClick={() => {
                        setIsOrdering(false);
                        setOrderConfirmed(null);
                      }}
                      className="px-8 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer shadow-sm"
                    >
                      Close Portal
                    </button>
                  </motion.div>
                ) : (
                  /* Order Form view */
                  <form onSubmit={handleSubmit(onPlaceOrder)} className="space-y-5 text-left">
                    
                    {/* Tank Capacity Selection */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Tank Capacity Selection *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {["10L", "15L"].map((cap) => {
                          const isActive = selectedCapacity === cap;
                          return (
                            <label
                              key={cap}
                              className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${
                                isActive
                                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                                  : "border-white/10 bg-transparent hover:border-neutral-300"
                              }`}
                            >
                              <input
                                type="radio"
                                value={cap}
                                {...register("capacity", { required: "Please select capacity" })}
                                className="sr-only"
                              />
                              <span className="font-display text-lg font-extrabold text-slate-100">{cap}trs</span>
                              <span className="font-sans text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
                                {cap === "10L" ? "₹25,000 Core" : "₹27,000 Extended"}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.capacity && (
                        <span className="text-[10px] text-red-500 font-mono block mt-1">{errors.capacity.message}</span>
                      )}
                    </div>

                    {/* Quantity selection */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Requisition Quantity *
                      </label>
                      <input
                        type="number"
                        min={1}
                        {...register("quantity", { required: "Quantity required", min: 1 })}
                        className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 font-sans text-xs text-slate-100 focus:outline-none focus:border-primary/50"
                      />
                    </div>

                    {/* Customer Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        {...register("customerName", { required: "Contact name is required" })}
                        className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 ${
                          errors.customerName ? "border-red-500/40" : "border-white/10"
                        }`}
                        placeholder=""
                      />
                      {errors.customerName && (
                        <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.customerName.message}</span>
                      )}
                    </div>

                    {/* Organization / Institution */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Hospital / Laboratory Name *
                      </label>
                      <input
                        type="text"
                        {...register("organization", { required: "Organization name is required" })}
                        className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-primary/50 ${
                          errors.organization ? "border-red-500/40" : "border-white/10"
                        }`}
                        placeholder=""
                      />
                      {errors.organization && (
                        <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.organization.message}</span>
                      )}
                    </div>

                    {/* Contact Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
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
                          className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 ${
                            errors.email ? "border-red-500/40" : "border-white/10"
                          }`}
                          placeholder=""
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.email.message}</span>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          {...register("phone", { required: "Phone is required" })}
                          className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 ${
                            errors.phone ? "border-red-500/40" : "border-white/10"
                          }`}
                          placeholder=""
                        />
                        {errors.phone && (
                          <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.phone.message}</span>
                        )}
                      </div>

                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Dispatch / Shipping Address *
                      </label>
                      <textarea
                        rows={3}
                        {...register("address", { required: "Shipping address is required" })}
                        className={`w-full rounded-lg border bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50 ${
                          errors.address ? "border-red-500/40" : "border-white/10"
                        }`}
                        placeholder=""
                      />
                      {errors.address && (
                        <span className="text-[10px] text-red-500 font-mono mt-0.5 block">{errors.address.message}</span>
                      )}
                    </div>

                    {/* Special requirements */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Special Requisition Notes
                      </label>
                      <textarea
                        rows={2}
                        {...register("comments")}
                        className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 font-sans text-xs text-slate-100 placeholder-neutral-400 focus:outline-none focus:border-primary/50"
                        placeholder=""
                      />
                    </div>

                    {/* Valuation Summary Card */}
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-2 font-mono text-slate-300">
                      <div className="flex justify-between text-[11px]">
                        <span>Selected Model:</span>
                        <span className="font-bold text-slate-100">
                          {selectedCapacity} Reservoir (₹{unitPrice.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Quantity:</span>
                        <span className="font-bold text-slate-100">x {quantity}</span>
                      </div>
                      <div className="border-t border-white/10 pt-2 flex justify-between items-baseline">
                        <span className="text-[11px] font-bold text-slate-100 uppercase">Total Requisition Cost:</span>
                        <span className="text-base text-primary font-bold">₹{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Submit Order button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative inline-flex items-center justify-center gap-2 rounded-lg bg-white py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? "TRANSMITTING REQUISITION..." : "TRANSMIT DISPATCH REQUISITION"}
                    </button>

                  </form>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
