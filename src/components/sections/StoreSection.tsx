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
    <section id="store" className="relative py-16 sm:py-24 md:py-32 bg-slate-50/60 border-t border-slate-200 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0D9488]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0D9488]/30 bg-[#0D9488]/5 text-[11px] font-mono tracking-widest text-[#0D9488] uppercase font-bold">
            <Tag className="w-3.5 h-3.5" />
            {storeData.sectionTag}
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-display">
            {storeData.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {storeData.subheading}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {storeData.products && storeData.products.length > 0 ? (
            storeData.products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 hover:border-[#0D9488] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0D9488] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Image / Visual */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-6 flex items-center justify-center">
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
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                        <Layers className="w-10 h-10 text-[#0D9488]/50" />
                        <span className="text-xs font-mono font-medium">ANANTA HARDWARE</span>
                      </div>
                    )}

                    {/* Stock & Category Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-white/90 border border-slate-200 text-slate-800 font-bold shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0D9488]/15 border border-[#0D9488]/30 text-[#0D9488] shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
                          IN STOCK
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-700 shadow-xs">
                          PRE-ORDER
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="space-y-1.5 mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors font-display">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono text-[#0D9488] tracking-wide uppercase font-semibold">
                      {product.tagline}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Key Specs */}
                  {product.specs && product.specs.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 my-4 pt-4 border-t border-slate-100">
                      {product.specs.slice(0, 4).map((spec, sIdx) => (
                        <div key={sIdx} className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-left">
                          <div className="text-[10px] font-mono text-slate-500 uppercase">{spec.label}</div>
                          <div className="text-xs font-bold text-slate-800 truncate">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features List */}
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                      {product.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Price & Purchase CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-medium">Unit Price</div>
                    <div className="text-xl font-bold font-mono text-slate-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <button
                    onClick={() => openOrderModal(product)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D9488] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#0F766E] active:scale-95 transition-all shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white">
              <p className="text-slate-500 text-sm">No hardware products currently listed in store catalog.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {orderModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl text-left overflow-y-auto max-h-[90dvh] my-auto"
            >
              <button
                onClick={() => setOrderModalOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {orderSuccessId ? (
                <div className="text-center py-6 sm:py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/30 text-[#0D9488] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Order Request Received</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Your institutional order requisition has been recorded. Our clinical hardware desk will review and reach out immediately with invoicing details.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 inline-block font-mono text-xs text-[#0D9488] font-bold">
                    Requisition ID: <strong>{orderSuccessId}</strong>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setOrderModalOpen(false)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-1 mb-5 sm:mb-6 pr-6">
                    <span className="text-[10px] font-mono text-[#0D9488] uppercase tracking-wider font-bold">
                      Commercial Hardware Requisition
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                      Procure {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standard unit price: ₹{selectedProduct.price.toLocaleString("en-IN")} • GST & Delivery calculated upon dispatch
                    </p>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-3.5 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={orderName}
                          onChange={(e) => setOrderName(e.target.value)}
                          placeholder="Dr. Rajesh Sharma"
                          className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-xs focus:bg-white focus:border-[#0D9488] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={orderEmail}
                          onChange={(e) => setOrderEmail(e.target.value)}
                          placeholder="r.sharma@hospital.org"
                          className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-xs focus:bg-white focus:border-[#0D9488] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={orderPhone}
                          onChange={(e) => setOrderPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-xs focus:bg-white focus:border-[#0D9488] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Institution / Org</label>
                        <input
                          type="text"
                          value={orderOrg}
                          onChange={(e) => setOrderOrg(e.target.value)}
                          placeholder="AIIMS / Dept of Anatomy"
                          className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-xs focus:bg-white focus:border-[#0D9488] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={orderQuantity}
                          onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-xs focus:bg-white focus:border-[#0D9488] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Est. Total</label>
                        <div className="px-3 py-2.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 text-[#0D9488] text-sm sm:text-xs font-mono font-bold">
                          ₹{(selectedProduct.price * orderQuantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Shipping & Delivery Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={orderAddress}
                        onChange={(e) => setOrderAddress(e.target.value)}
                        placeholder="Complete lab or hospital delivery address..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-xs focus:bg-white focus:border-[#0D9488] focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1 font-medium">Special Specifications / Invoicing Note</label>
                      <textarea
                        rows={2}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Any custom voltage, cannula sizes, or procurement requirements..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-base sm:text-xs focus:bg-white focus:border-[#0D9488] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl bg-[#0D9488] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0F766E] transition-all disabled:opacity-50 cursor-pointer shadow-sm flex items-center justify-center gap-2"
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
