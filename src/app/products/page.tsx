"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import BackgroundParticles from "@/components/ui/BackgroundParticles";
import LoadingScreen from "@/components/ui/LoadingScreen";
import BackToTop from "@/components/ui/BackToTop";
import UnifyEngine from "@/components/ui/UnifyEngine";
import Products from "@/components/sections/Products";
import Footer from "@/components/ui/Footer";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Premium Loading Preloader */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div className="relative min-h-screen bg-background text-primary selection:bg-primary/20 selection:text-white">
          {/* Futuristic Interactive Backdrop */}
          <BackgroundParticles />
          
          {/* Core Sticky Navbar */}
          <Navbar />

          {/* Dedicated Products Page Content */}
          <main className="pt-20">
            <Products />
          </main>

          {/* Unified Footer with Newsletter */}
          <Footer />

          {/* Floating Back To Top Indicator */}
          <BackToTop />

          {/* Unify Content Protection Engine */}
          <UnifyEngine />
        </div>
      )}
    </>
  );
}
