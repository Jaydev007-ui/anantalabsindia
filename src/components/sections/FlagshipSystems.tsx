"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FlagshipSystems() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spitRef = useRef<HTMLDivElement>(null);
  const vedaRef = useRef<HTMLDivElement>(null);

  // Spitting System Stats
  const [stats, setStats] = useState({
    precision: 0,
    recall: 0,
    f1: 0,
    map50: 0,
  });

  // AyurAI Dosha Classification Metrics
  const [dosha, setDosha] = useState({
    vata: 0,
    pitta: 0,
    kapha: 0,
  });

  // Simulated MediaPipe Coordinates
  const [landmarks, setLandmarks] = useState<{ id: number; x: string; y: string; z: string }[]>([]);

  useEffect(() => {
    // Generate static landmarks initially
    const initialLandmarks = Array.from({ length: 5 }).map((_, i) => ({
      id: i + 120,
      x: (0.45 + Math.random() * 0.1).toFixed(4),
      y: (0.62 + Math.random() * 0.1).toFixed(4),
      z: (-0.12 - Math.random() * 0.05).toFixed(4),
    }));
    setLandmarks(initialLandmarks);

    // Live update stream for coordinates
    const interval = setInterval(() => {
      setLandmarks((prev) =>
        prev.map((item) => ({
          ...item,
          x: (parseFloat(item.x) + (Math.random() - 0.5) * 0.005).toFixed(4),
          y: (parseFloat(item.y) + (Math.random() - 0.5) * 0.005).toFixed(4),
          z: (parseFloat(item.z) + (Math.random() - 0.5) * 0.002).toFixed(4),
        }))
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setStats({ precision: 89.7, recall: 94.3, f1: 91.9, map50: 93.0 });
      setDosha({ vata: 34.5, pitta: 41.2, kapha: 24.3 });
      gsap.set([spitRef.current, vedaRef.current], { y: 0, opacity: 1 });
      return;
    }

    // Scroll reveals
    gsap.fromTo(
      spitRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: spitRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      vedaRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: vedaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Stats counter
    const objStats = { precision: 0, recall: 0, f1: 0, map50: 0 };
    gsap.to(objStats, {
      precision: 89.7,
      recall: 94.3,
      f1: 91.9,
      map50: 93.0,
      duration: 2.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: spitRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setStats({
          precision: parseFloat(objStats.precision.toFixed(1)),
          recall: parseFloat(objStats.recall.toFixed(1)),
          f1: parseFloat(objStats.f1.toFixed(1)),
          map50: parseFloat(objStats.map50.toFixed(1)),
        });
      },
    });

    // Dosha counter
    const objDosha = { vata: 0, pitta: 0, kapha: 0 };
    gsap.to(objDosha, {
      vata: 34.5,
      pitta: 41.2,
      kapha: 24.3,
      duration: 2.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: vedaRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setDosha({
          vata: parseFloat(objDosha.vata.toFixed(1)),
          pitta: parseFloat(objDosha.pitta.toFixed(1)),
          kapha: parseFloat(objDosha.kapha.toFixed(1)),
        });
      },
    });
  }, []);

  return (
    <section
      id="flagship-systems"
      ref={containerRef}
      className="relative py-24 border-t border-white/5 bg-transparent overflow-hidden"
    >
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-8 md:px-12 w-full space-y-32">
        
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#C98A4B]">02 // FLAGSHIP SYSTEMS</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        {/* Case Study A: Spitting Detection */}
        <div
          ref={spitRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
        >
          {/* Left Column: Pipeline & Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C98A4B] block">CASE STUDY A // INDUSTRIAL AI</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#E8EDE9] uppercase tracking-tight">
                AI-Based Spitting Detection & prevention
              </h3>
            </div>
            
            <p className="font-sans text-[#8A9792] text-sm sm:text-base leading-relaxed">
              An end-to-end edge-computed artificial intelligence system designed for sanitary compliance and real-world civic enforcement. Utilizing a custom-trained lightweight object detection architecture, the system operates on low-resource hardware to identify compliance violations in real time.
            </p>

            {/* Pipeline flowchart */}
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#E8EDE9]">
                INSPECTION PIPELINE FLOW
              </h4>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[9px]">
                <span className="border border-[#7FBFA0] text-[#7FBFA0] px-2 py-1 bg-[#7FBFA0]/5">DETECT</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-white/10 text-[#E8EDE9] px-2 py-1">VERIFY</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-white/10 text-[#E8EDE9] px-2 py-1">IDENTIFY</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-white/10 text-[#E8EDE9] px-2 py-1">RECORD</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-[#C98A4B] text-[#C98A4B] px-2 py-1 bg-[#C98A4B]/5">ACT</span>
              </div>
            </div>

            {/* Academic Notes */}
            <div className="border-l border-[#C98A4B] pl-4 space-y-2 font-sans text-xs text-[#8A9792]">
              <p>
                <strong>Face Re-Identification:</strong> Robust tracking vectors are built under variable lighting conditions using spatial and facial feature mappings to match actors across camera fields.
              </p>
              <p>
                <strong>Academic Partnership & Framework:</strong> Conducted in collaboration with <strong>Parul University</strong>, deployed as a field pilot within the national <strong>GATI 4.0</strong> system guidelines.
              </p>
            </div>
          </div>

          {/* Right Column: Instrument Readout Panel */}
          <div className="lg:col-span-6 w-full">
            <div className="panel-border border border-white/5 bg-[#0E1213] p-6 rounded-none hairline-top-gradient font-mono space-y-6">
              {/* Header bar */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3 text-[10px]">
                <span className="text-[#E8EDE9] font-bold">INSTRUMENT READOUT // DETECT_MODE</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-none bg-[#7FBFA0] animate-pulse" />
                  <span className="text-[#7FBFA0]">LIVE_FEED</span>
                </span>
              </div>

              {/* Graphical Matrix Grid Overlay */}
              <div className="h-44 border border-white/5 relative bg-[#07090A] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Bounding box visual simulation */}
                <div className="absolute top-12 left-16 border border-[#7FBFA0] bg-[#7FBFA0]/5 p-2 w-32 h-20 flex flex-col justify-between">
                  <span className="text-[7px] text-[#7FBFA0] font-bold tracking-widest leading-none">VIOLATOR: 98.4%</span>
                  <span className="text-[6px] text-right text-[#8A9792] leading-none">LOC: 422,912</span>
                </div>
                
                <div className="absolute bottom-8 right-12 border border-[#C98A4B] bg-[#C98A4B]/5 p-2 w-24 h-12 flex flex-col justify-between">
                  <span className="text-[7px] text-[#C98A4B] font-bold tracking-widest leading-none">COMPLIANCE: OK</span>
                </div>

                <div className="absolute top-3 left-4 text-[7px] text-[#8A9792]">MODEL: YOLOv11s_EDGE</div>
                <div className="absolute bottom-3 left-4 text-[7px] text-[#8A9792]">FPS: 45.2 // THRESHOLD: 0.75</div>
              </div>

              {/* Stats parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border border-white/5 bg-[#07090A] p-3 text-center">
                  <span className="text-[8px] text-[#8A9792] block uppercase">PRECISION</span>
                  <span className="text-sm font-bold text-[#7FBFA0]">{stats.precision}%</span>
                </div>
                <div className="border border-white/5 bg-[#07090A] p-3 text-center">
                  <span className="text-[8px] text-[#8A9792] block uppercase">RECALL</span>
                  <span className="text-sm font-bold text-[#7FBFA0]">{stats.recall}%</span>
                </div>
                <div className="border border-white/5 bg-[#07090A] p-3 text-center">
                  <span className="text-[8px] text-[#8A9792] block uppercase">F1 SCORE</span>
                  <span className="text-sm font-bold text-[#7FBFA0]">{stats.f1}%</span>
                </div>
                <div className="border border-white/5 bg-[#07090A] p-3 text-center">
                  <span className="text-[8px] text-[#8A9792] block uppercase">mAP@50</span>
                  <span className="text-sm font-bold text-[#7FBFA0]">{stats.map50}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study B: AyurAI Veda */}
        <div
          ref={vedaRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
        >
          {/* Left Column: Pipeline & Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C98A4B] block">CASE STUDY B // HEALTHCARE SYSTEMS</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#E8EDE9] uppercase tracking-tight">
                AyurAI Veda: Prakriti Parikshan (Dosha)
              </h3>
            </div>
            
            <p className="font-sans text-[#8A9792] text-sm sm:text-base leading-relaxed">
              An algorithmic diagnostics engine mapping physiological optical inputs to classical Ayurvedic constitutions (Doshas). Using structural landmark extractors and physical texture normalizers, the platform runs local inference to perform automated Prakriti Parikshan.
            </p>

            {/* Pipeline flowchart */}
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#E8EDE9]">
                DIAGNOSTICS PROCESSING STEPS
              </h4>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[9px]">
                <span className="border border-[#7FBFA0] text-[#7FBFA0] px-2 py-1 bg-[#7FBFA0]/5">INPUT</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-white/10 text-[#E8EDE9] px-2 py-1">LANDMARK</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-white/10 text-[#E8EDE9] px-2 py-1">NORMALIZE</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-white/10 text-[#E8EDE9] px-2 py-1">CLASSIFY</span>
                <span className="text-[#8A9792]">→</span>
                <span className="border border-[#C98A4B] text-[#C98A4B] px-2 py-1 bg-[#C98A4B]/5">CHAT</span>
              </div>
            </div>

            {/* Scientific Details */}
            <div className="border-l border-[#C98A4B] pl-4 space-y-2 font-sans text-xs text-[#8A9792]">
              <p>
                <strong>Landmarking & Conversational Chatbot:</strong> Combines MediaPipe facial-mesh markers for physical taxonomy identification with a TF-IDF clinical chatbot trained on authentic Ayurvedic texts.
              </p>
              <p>
                <strong>Shine-Normalization Correction:</strong> The team is integrating dynamic illumination correction vectors (shine-normalization) to counter varying shadow bias and skin reflectivity differences under natural sun vs artificial LED bulbs.
              </p>
            </div>
          </div>

          {/* Right Column: Instrument Readout Panel */}
          <div className="lg:col-span-6 w-full">
            <div className="panel-border border border-white/5 bg-[#0E1213] p-6 rounded-none hairline-top-gradient font-mono space-y-6">
              {/* Header bar */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3 text-[10px]">
                <span className="text-[#E8EDE9] font-bold">PHYSIOLOGICAL MESH // LANDMARK_MODE</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-none bg-[#C98A4B] animate-pulse" />
                  <span className="text-[#C98A4B]">INDEXING_NODES</span>
                </span>
              </div>

              {/* Landmarks and live coordinate logs side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bounding facial coordinate simulation */}
                <div className="h-44 border border-white/5 relative bg-[#07090A] overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] bg-[size:12px_12px]" />
                  
                  {/* Facial landmark simulation drawing */}
                  <svg className="w-full h-full text-[#7FBFA0] opacity-40" viewBox="0 0 100 100">
                    <path d="M50 20 L40 35 L45 42 L55 42 L60 35 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="40" cy="35" r="1.5" fill="currentColor" />
                    <circle cx="60" cy="35" r="1.5" fill="currentColor" />
                    <circle cx="50" cy="20" r="1.5" fill="currentColor" />
                    <line x1="50" y1="20" x2="50" y2="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    {/* Nose & Mouth */}
                    <path d="M50 45 L48 55 L52 55 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <path d="M42 70 Q50 78 58 70" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                  
                  <div className="absolute top-2 left-2 text-[6px] text-[#8A9792]">MEDIAPIPE MESH CORE v2</div>
                  <div className="absolute bottom-2 left-2 text-[6px] text-[#C98A4B] font-bold">SHINE_NORM: 1.024</div>
                </div>

                {/* Coordinate stream logs */}
                <div className="h-44 border border-white/5 bg-[#07090A] p-3 text-[8px] text-[#8A9792] overflow-hidden space-y-1.5">
                  <span className="text-[#E8EDE9] uppercase block font-bold border-b border-white/5 pb-1 mb-2">VERTEX DATA STREAM</span>
                  {landmarks.map((mark) => (
                    <div key={mark.id} className="flex justify-between">
                      <span>VTX_{mark.id}</span>
                      <span>X:{mark.x} Y:{mark.y} Z:{mark.z}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats parameters */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                <div className="text-center">
                  <span className="text-[8px] text-[#8A9792] block uppercase">VATA CONSTITUTION</span>
                  <span className="text-sm font-bold text-[#E8EDE9]">{dosha.vata}%</span>
                </div>
                <div className="text-center">
                  <span className="text-[8px] text-[#8A9792] block uppercase">PITTA CONSTITUTION</span>
                  <span className="text-sm font-bold text-[#C98A4B]">{dosha.pitta}%</span>
                </div>
                <div className="text-center">
                  <span className="text-[8px] text-[#8A9792] block uppercase">KAPHA CONSTITUTION</span>
                  <span className="text-sm font-bold text-[#7FBFA0]">{dosha.kapha}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
