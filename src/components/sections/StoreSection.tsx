"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle, ShieldCheck, Tag, X, ArrowRight, Sparkles, Layers, Sliders } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";
import { ProductItem } from "@/lib/siteContent";

export default function StoreSection() {
  const { content } = useSiteContent();
  const storeData = content.store || {
    sectionTag: "[ 04 // COMMERCIAL HARDWARE ]",
    heading: "Ananta Precision Store",
    subheading: "Laboratory-grade biostasis, fluidics, and organ perfusion hardware available for institutional procurement.",
    products: [],
  };

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderOrg, setOrderOrg] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const openOrderModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setOrderQuantity(1);
    setOrderSuccessId(null);
    setOrderModalOpen(true);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setSubmitting(true);
    const orderId = `AN-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      customerName: orderName,
      email: orderEmail,
      phone: orderPhone,
      organization: orderOrg || "Institutional / Private",
      address: orderAddress,
      capacity: selectedProduct.name.includes("15L") ? "15L" : "10L",
      quantity: Number(orderQuantity) || 1,
      comments: `Product: ${selectedProduct.name}. Notes: ${orderNotes}`,
      unitPrice: selectedProduct.price,
      totalPrice: selectedProduct.price * (Number(orderQuantity) || 1),
      status: "Pending",
      date: new Date().toISOString(),
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      setOrderSuccessId(orderId);
      // Reset form fields
      setOrderName("");
      setOrderEmail("");
      setOrderPhone("");
      setOrderOrg("");
      setOrderAddress("");
      setOrderNotes("");
    } catch (err) {
      console.error("Order submission failed", err);
      alert("Failed to submit order. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="store" className="relative py-28 md:py-36 bg-[#07090A] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#7FBFA0]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7FBFA0]/20 bg-[#7FBFA0]/5 text-[11px] font-mono tracking-widest text-[#7FBFA0] uppercase">
            <Tag className="w-3 h-3" />
            {storeData.sectionTag}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
            {storeData.heading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {storeData.subheading}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {storeData.products && storeData.products.length > 0 ? (
            storeData.products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#7FBFA0]/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xl overflow-hidden backdrop-blur-sm"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7FBFA0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Image / Visual */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-6 flex items-center justify-center">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                        <Layers className="w-10 h-10 text-[#7FBFA0]/50" />
                        <span className="text-xs font-mono">ANANTA HARDWARE</span>
                      </div>
                    )}

                    {/* Stock & Category Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-black/80 border border-white/10 text-white backdrop-blur-md">
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#7FBFA0]/20 border border-[#7FBFA0]/40 text-[#7FBFA0] backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7FBFA0] animate-pulse" />
                          IN STOCK
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400 backdrop-blur-md">
                          PRE-ORDER
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#7FBFA0] transition-colors font-display">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono text-[#7FBFA0]/80 tracking-wide uppercase">
                      {product.tagline}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Specs */}
                  {product.specs && product.specs.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 my-4 pt-4 border-t border-white/5">
                      {product.specs.slice(0, 4).map((spec, sIdx) => (
                        <div key={sIdx} className="bg-white/[0.02] border border-white/5 rounded-lg p-2 text-left">
                          <div className="text-[10px] font-mono text-slate-500 uppercase">{spec.label}</div>
                          <div className="text-xs font-bold text-slate-200 truncate">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features List */}
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-400">
                      {product.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#7FBFA0] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Price & Purchase CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 mt-auto">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Unit Price</div>
                    <div className="text-xl font-bold font-mono text-white">
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <button
                    onClick={() => openOrderModal(product)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7FBFA0] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#97d4b6] active:scale-95 transition-all shadow-lg shadow-[#7FBFA0]/20 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 border border-dashed border-white/10 rounded-2xl">
              <p className="text-slate-400 text-sm">No hardware products currently listed in store catalog.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {orderModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0C0F12] p-6 sm:p-8 shadow-2xl text-left overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setOrderModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {orderSuccessId ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#7FBFA0]/10 border border-[#7FBFA0]/30 text-[#7FBFA0] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">Order Request Received</h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto">
                    Your institutional order requisition has been recorded. Our clinical hardware desk will review and reach out immediately with invoicing details.
                  </p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 inline-block font-mono text-xs text-[#7FBFA0]">
                    Requisition ID: <strong>{orderSuccessId}</strong>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setOrderModalOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-1 mb-6">
                    <span className="text-[10px] font-mono text-[#7FBFA0] uppercase tracking-wider">
                      Commercial Requisition
                    </span>
                    <h3 className="text-xl font-bold text-white font-display">
                      Procure {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Standard unit price: ₹{selectedProduct.price.toLocaleString("en-IN")} • GST & Delivery calculated upon dispatch
                    </p>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={orderName}
                          onChange={(e) => setOrderName(e.target.value)}
                          placeholder="Dr. Rajesh Sharma"
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={orderEmail}
                          onChange={(e) => setOrderEmail(e.target.value)}
                          placeholder="r.sharma@hospital.org"
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={orderPhone}
                          onChange={(e) => setOrderPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Institution / Org</label>
                        <input
                          type="text"
                          value={orderOrg}
                          onChange={(e) => setOrderOrg(e.target.value)}
                          placeholder="AIIMS / Dept of Anatomy"
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={orderQuantity}
                          onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Est. Total</label>
                        <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#7FBFA0] text-xs font-mono font-bold">
                          ₹{(selectedProduct.price * orderQuantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Shipping & Delivery Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={orderAddress}
                        onChange={(e) => setOrderAddress(e.target.value)}
                        placeholder="Complete lab or facility address..."
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Special Specifications / Invoicing Note</label>
                      <textarea
                        rows={2}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Any custom voltage, cannula sizes, or procurement requirements..."
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-[#7FBFA0]/20 flex items-center justify-center gap-2"
                      >
                        {submitting ? "Transmitting Requisition..." : "Submit Institutional Purchase Order"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
