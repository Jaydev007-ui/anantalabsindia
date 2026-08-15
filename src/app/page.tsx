"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import BackgroundParticles from "@/components/ui/BackgroundParticles";
import LoadingScreen from "@/components/ui/LoadingScreen";
import BackToTop from "@/components/ui/BackToTop";
import UnifyEngine from "@/components/ui/UnifyEngine";

// Homepage Sections
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WorkArea from "@/components/sections/WorkArea";
import Products from "@/components/sections/Products";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Achievements from "@/components/sections/Achievements";
import Technologies from "@/components/sections/Technologies";
import Ecosystem from "@/components/sections/Ecosystem";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
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

          {/* Modular Scrolling Layout Sections */}
          <main>
            <Hero />
            <About />
            <WorkArea />
            <WhyChooseUs />
            <Process />
            <Portfolio />
            <Achievements />
            <Technologies />
            <Ecosystem />
            <Contact />
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
