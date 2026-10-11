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
      setStats({ precision: 96.8, recall: 94.2, f1: 95.5, map50: 97.1 });
      setDosha({ vata: 34.5, pitta: 41.2, kapha: 24.3 });
      return;
    }

    // Spit detection counter
    const objStats = { precision: 0, recall: 0, f1: 0, map50: 0 };
    gsap.to(objStats, {
      precision: 96.8,
      recall: 94.2,
      f1: 95.5,
      map50: 97.1,
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
      className="relative py-16 sm:py-24 border-t border-slate-200 bg-transparent overflow-hidden"
    >
      <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />
      <div className="hidden md:block absolute right-8 top-0 bottom-0 w-[1px] bg-slate-200 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 w-full space-y-16 sm:space-y-24">
        
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#B45309] font-semibold">02 // FLAGSHIP SYSTEMS</span>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>

        {/* Case Study A: Spitting Detection */}
        <div
          ref={spitRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
        >
          {/* Left Column: Pipeline & Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#B45309] font-bold block">
                CASE STUDY A // INDUSTRIAL AI
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
                AI-Based Spitting Detection & Prevention
              </h3>
            </div>
            
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
              An end-to-end edge-computed artificial intelligence system designed for sanitary compliance and real-world civic enforcement. Utilizing a custom-trained lightweight object detection architecture, the system operates on low-resource hardware to identify compliance violations in real time.
            </p>

            {/* Pipeline flowchart */}
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-800 font-bold">
                INSPECTION PIPELINE FLOW
              </h4>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[9px]">
                <span className="border border-[#0D9488] text-[#0D9488] px-2.5 py-1 bg-[#0D9488]/10 rounded-md font-bold">
                  DETECT
                </span>
                <span className="text-slate-400">→</span>
                <span className="border border-slate-200 text-slate-700 bg-white px-2.5 py-1 rounded-md">VERIFY</span>
                <span className="text-slate-400">→</span>
                <span className="border border-slate-200 text-slate-700 bg-white px-2.5 py-1 rounded-md">IDENTIFY</span>
                <span className="text-slate-400">→</span>
                <span className="border border-slate-200 text-slate-700 bg-white px-2.5 py-1 rounded-md">RECORD</span>
                <span className="text-slate-400">→</span>
                <span className="border border-[#B45309] text-[#B45309] px-2.5 py-1 bg-[#B45309]/10 rounded-md font-bold">
                  ACT
                </span>
              </div>
            </div>

            {/* Academic Notes */}
            <div className="border-l-2 border-[#B45309] pl-4 space-y-2 font-sans text-xs text-slate-600">
              <p>
                <strong className="text-slate-900">Face Re-Identification:</strong> Robust tracking vectors are built under variable lighting conditions using spatial and facial feature mappings to match actors across camera fields.
              </p>
              <p>
                <strong className="text-slate-900">Academic Partnership & Framework:</strong> Conducted in collaboration with <strong>Parul University</strong>, deployed as a field pilot within the national <strong>GATI 4.0</strong> system guidelines.
              </p>
            </div>
          </div>

          {/* Right Column: Instrument Readout Panel */}
          <div className="lg:col-span-6 w-full">
            <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-2xl shadow-sm font-mono space-y-5 sm:space-y-6">
              {/* Header bar */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-[10px]">
                <span className="text-slate-900 font-bold truncate">INSTRUMENT READOUT // DETECT_MODE</span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse" />
                  <span className="text-[#0D9488] font-bold">LIVE_FEED</span>
                </span>
              </div>

              {/* Graphical Matrix Grid Overlay */}
              <div className="h-40 sm:h-44 border border-slate-200 relative bg-slate-50 overflow-hidden flex items-center justify-center rounded-xl">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Bounding box visual simulation */}
                <div className="absolute top-6 left-6 sm:top-10 sm:left-12 border border-[#0D9488] bg-[#0D9488]/10 p-2 w-28 sm:w-32 h-16 sm:h-20 flex flex-col justify-between rounded-lg shadow-xs">
                  <span className="text-[7px] text-[#0D9488] font-bold tracking-widest leading-none">VIOLATOR: 98.4%</span>
                  <span className="text-[6px] text-right text-slate-500 leading-none">LOC: 422,912</span>
                </div>
                
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-10 border border-[#B45309] bg-[#B45309]/10 p-2 w-24 h-12 flex flex-col justify-between rounded-lg">
                  <span className="text-[7px] text-[#B45309] font-bold tracking-widest leading-none">COMPLIANCE: OK</span>
                </div>

                <div className="absolute top-2.5 left-3 sm:top-3 sm:left-4 text-[7px] text-slate-500 font-medium">MODEL: YOLOv11s_EDGE</div>
                <div className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 text-[7px] text-slate-500 font-medium">FPS: 45.2 // THRESHOLD: 0.75</div>
              </div>

              {/* Stats parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="border border-slate-100 bg-slate-50 p-2.5 sm:p-3 text-center rounded-xl">
                  <span className="text-[8px] text-slate-500 block uppercase">PRECISION</span>
                  <span className="text-sm font-bold text-[#0D9488] font-mono">{stats.precision}%</span>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-2.5 sm:p-3 text-center rounded-xl">
                  <span className="text-[8px] text-slate-500 block uppercase">RECALL</span>
                  <span className="text-sm font-bold text-[#0D9488] font-mono">{stats.recall}%</span>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-2.5 sm:p-3 text-center rounded-xl">
                  <span className="text-[8px] text-slate-500 block uppercase">F1 SCORE</span>
                  <span className="text-sm font-bold text-[#0D9488] font-mono">{stats.f1}%</span>
                </div>
                <div className="border border-slate-100 bg-slate-50 p-2.5 sm:p-3 text-center rounded-xl">
                  <span className="text-[8px] text-slate-500 block uppercase">mAP@50</span>
                  <span className="text-sm font-bold text-[#0D9488] font-mono">{stats.map50}%</span>
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
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#B45309] font-bold block">
                CASE STUDY B // HEALTHCARE SYSTEMS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
                AyurAI Veda: Prakriti Parikshan (Dosha)
              </h3>
            </div>
            
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
              An algorithmic diagnostics engine mapping physiological optical inputs to classical Ayurvedic constitutions (Doshas). Using structural landmark extractors and physical texture normalizers, the platform runs local inference to perform automated Prakriti Parikshan.
            </p>

            {/* Pipeline flowchart */}
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-800 font-bold">
                DIAGNOSTICS PROCESSING STEPS
              </h4>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[9px]">
                <span className="border border-[#0D9488] text-[#0D9488] px-2.5 py-1 bg-[#0D9488]/10 rounded-md font-bold">INPUT</span>
                <span className="text-slate-400">→</span>
                <span className="border border-slate-200 text-slate-700 bg-white px-2.5 py-1 rounded-md">LANDMARK</span>
                <span className="text-slate-400">→</span>
                <span className="border border-slate-200 text-slate-700 bg-white px-2.5 py-1 rounded-md">NORMALIZE</span>
                <span className="text-slate-400">→</span>
                <span className="border border-slate-200 text-slate-700 bg-white px-2.5 py-1 rounded-md">CLASSIFY</span>
                <span className="text-slate-400">→</span>
                <span className="border border-[#B45309] text-[#B45309] px-2.5 py-1 bg-[#B45309]/10 rounded-md font-bold">CHAT</span>
              </div>
            </div>

            {/* Scientific Details */}
            <div className="border-l-2 border-[#B45309] pl-4 space-y-2 font-sans text-xs text-slate-600">
              <p>
                <strong className="text-slate-900">Landmarking & Conversational Chatbot:</strong> Combines MediaPipe facial-mesh markers for physical taxonomy identification with a TF-IDF clinical chatbot trained on authentic Ayurvedic texts.
              </p>
              <p>
                <strong className="text-slate-900">Shine-Normalization Correction:</strong> The team is integrating dynamic illumination correction vectors to counter varying shadow bias and skin reflectivity differences under natural sun vs artificial LED bulbs.
              </p>
            </div>
          </div>

          {/* Right Column: Instrument Readout Panel */}
          <div className="lg:col-span-6 w-full">
            <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-2xl shadow-sm font-mono space-y-5 sm:space-y-6">
              {/* Header bar */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-[10px]">
                <span className="text-slate-900 font-bold truncate">PHYSIOLOGICAL MESH // LANDMARK_MODE</span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
                  <span className="text-[#B45309] font-bold">INDEXING_NODES</span>
                </span>
              </div>

              {/* Landmarks and live coordinate logs side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Facial coordinate simulation */}
                <div className="h-40 sm:h-44 border border-slate-200 relative bg-slate-50 overflow-hidden flex items-center justify-center p-4 rounded-xl">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.06)_1.5px,transparent_1.5px)] bg-[size:12px_12px]" />
                  
                  {/* Facial landmark simulation drawing */}
                  <svg className="w-full h-full text-[#0D9488] opacity-60" viewBox="0 0 100 100">
                    <path d="M50 20 L40 35 L45 42 L55 42 L60 35 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="40" cy="35" r="1.5" fill="currentColor" />
                    <circle cx="60" cy="35" r="1.5" fill="currentColor" />
                    <circle cx="50" cy="20" r="1.5" fill="currentColor" />
                    <line x1="50" y1="20" x2="50" y2="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    <path d="M50 45 L48 55 L52 55 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <path d="M42 70 Q50 78 58 70" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                  
                  <div className="absolute top-2 left-2 text-[6px] text-slate-500 font-medium">MEDIAPIPE MESH CORE v2</div>
                  <div className="absolute bottom-2 left-2 text-[6px] text-[#B45309] font-bold">SHINE_NORM: 1.024</div>
                </div>

                {/* Coordinate stream logs */}
                <div className="h-40 sm:h-44 border border-slate-200 bg-slate-50 p-3 text-[8px] text-slate-600 overflow-hidden space-y-1.5 rounded-xl font-mono">
                  <span className="text-slate-900 uppercase block font-bold border-b border-slate-200 pb-1 mb-2">VERTEX DATA STREAM</span>
                  {landmarks.map((mark) => (
                    <div key={mark.id} className="flex justify-between">
                      <span className="font-semibold text-slate-800">VTX_{mark.id}</span>
                      <span className="text-slate-500">X:{mark.x} Y:{mark.y} Z:{mark.z}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats parameters */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-slate-100 pt-4">
                <div className="text-center bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[7px] sm:text-[8px] text-slate-500 block uppercase">VATA</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">{dosha.vata}%</span>
                </div>
                <div className="text-center bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[7px] sm:text-[8px] text-slate-500 block uppercase">PITTA</span>
                  <span className="text-xs sm:text-sm font-bold text-[#B45309]">{dosha.pitta}%</span>
                </div>
                <div className="text-center bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[7px] sm:text-[8px] text-slate-500 block uppercase">KAPHA</span>
                  <span className="text-xs sm:text-sm font-bold text-[#0D9488]">{dosha.kapha}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
