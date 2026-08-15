"use client";

import { motion } from "framer-motion";

export default function Ecosystem() {
  return (
    <section className="relative py-24 overflow-hidden bg-transparent border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-16">
          <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#0088FF] font-bold">
            GLOBAL TECHNOLOGY ECOSYSTEM
          </h2>
          <h3 className="font-display text-xl font-bold text-white tracking-tight uppercase">
            Accelerated Compute & Infrastructure
          </h3>
        </div>

        {/* Dynamic Partner Ecosystem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: AWS Activate */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-[20px] p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              {/* Logo block */}
              <div className="flex items-center justify-between mb-6">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-auto fill-[#232F3E] transition-colors duration-300 group-hover:fill-black"
                >
                  <title>Amazon AWS</title>
                  <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
                </svg>
                
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-neutral-100 rounded px-2.5 py-1 border border-neutral-200">
                  Startup Program
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-display text-sm font-bold text-neutral-900 uppercase tracking-wider">
                AWS Activate Startup
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-4">
                Supported by Amazon Web Services through the AWS Activate program, enabling access to enterprise-grade cloud infrastructure, AI services, technical resources, and startup development tools.
              </p>
            </div>
          </motion.div>

          {/* Card 2: NVIDIA Developer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-[20px] p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              {/* Logo block */}
              <div className="flex items-center justify-between mb-6">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-auto fill-[#76B900] transition-transform duration-500 group-hover:scale-105"
                >
                  <title>NVIDIA</title>
                  <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" />
                </svg>
                
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-neutral-100 rounded px-2.5 py-1 border border-neutral-200">
                  Developer Ecosystem
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-display text-sm font-bold text-neutral-900 uppercase tracking-wider">
                NVIDIA Developer
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-4">
                Member of the NVIDIA Developer Program with access to accelerated computing resources, AI development frameworks, SDKs, and technical ecosystems for building next-generation intelligent solutions.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Intel Partner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-gradient-to-br from-white to-neutral-50 border border-neutral-200 rounded-[20px] p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              {/* Logo block */}
              <div className="flex items-center justify-between mb-6">
                <img
                  src="/intel_partner.jpg"
                  alt="Intel Partner"
                  className="h-8.5 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-neutral-100 rounded px-2.5 py-1 border border-neutral-200">
                  Partner Alliance
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-display text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Intel Partner
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed mt-4">
                Member of the Intel Partner Alliance, collaborating on advanced computing architectures, optimized hardware integration, and intelligent edge solutions.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Centered Ecosystem Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center max-w-2xl mx-auto mt-12"
        >
          <p className="font-sans text-[10px] sm:text-xs text-slate-500 leading-relaxed">
            Ananta Labs India is building within globally recognized technology ecosystems, leveraging industry-leading cloud computing, accelerated AI platforms, and research-driven development resources to deliver reliable, scalable, and future-ready innovations.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
