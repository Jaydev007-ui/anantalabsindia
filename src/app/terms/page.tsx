"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, Link2, Printer, Check, ChevronRight } from "lucide-react";
import UnifyEngine from "@/components/ui/UnifyEngine";

type Section = {
  id: string;
  title: string;
  content: string;
  details: string[];
};

const sections: Section[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: "By accessing, browsing, or utilizing the web portal, mechatronics requisitions systems, and research documentation of Ananta Labs India, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.",
    details: [
      "If you do not agree to these structural terms, you must discontinue platform usage immediately.",
      "These terms represent a legally binding agreement between you and Ananta Labs India."
    ]
  },
  {
    id: "about-us",
    title: "2. About Us",
    content: "Ananta Labs India is an independent deep-tech and research corporation focused on pioneering solutions in multiple advanced fields:",
    details: [
      "Artificial Intelligence systems and deep learning diagnostic architectures.",
      "Healthcare Technologies and automated fluidic preservation engineering (e.g. Ananta Preserv-1).",
      "Medical Devices, Robotics, and customized clinical hardware subassemblies.",
      "Embedded Systems, full-stack software development, and mobile applications."
    ]
  },
  {
    id: "usage",
    title: "3. Website Usage",
    content: "Users agree to access and utilize the website and its modules solely for lawful research, purchasing, and institutional informational operations.",
    details: [
      "Accuracy: You agree to submit truthful, accurate details in all inquiry and requisition forms.",
      "Prohibitions: You must not attempt unauthorized database access (e.g., trying to bypass secure /admin panels).",
      "Security: Do not introduce malicious scripts, viruses, or coordinate DDoS actions aimed at degrading site speed."
    ]
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property",
    content: "All assets, research outputs, mechatronic layouts, and digital content hosted on this platform are protected under intellectual property laws.",
    details: [
      "Proprietary Contents: Logos, branding elements, patent layouts, software packages, schematic diagrams, typography, source code, and design specifications are the exclusive property of Ananta Labs India.",
      "Restrictions: Reproduction, reverse engineering, redistribution, or modification of any components is strictly prohibited without explicit written permission from our corporate desk."
    ]
  },
  {
    id: "research-disclaimer",
    title: "5. Research Disclaimer",
    content: "Information regarding clinical research, medical technologies, and systems under development is provided strictly for academic and informational guidance.",
    details: [
      "No Medical Advice: Contents do not constitute professional medical diagnostics, treatments, or clinical advice.",
      "R&D Evolution: Specifications of mechatronic units under active development may be revised without notice."
    ]
  },
  {
    id: "product-info",
    title: "6. Product Information",
    content: "Regarding our flagship mechatronic units (e.g., Ananta Preserv-1 Embalming Machine) and clinical systems:",
    details: [
      "Requisitions: Form submittals indicate a purchase inquiry and dispatch request. Final pricing is confirmed via direct corporate invoice.",
      "Service Delivery: We do not guarantee that the website or requisition databases will operate uninterrupted or error-free at all times."
    ]
  },
  {
    id: "external-links",
    title: "7. External Links",
    content: "The platform may contain redirects to third-party web portals or institutional collaborators.",
    details: [
      "We do not endorse, manage, or take liability for content, security protocols, or privacy practices on external sites."
    ]
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: "To the maximum extent permitted by applicable laws of India, Ananta Labs India shall not be liable for any direct, indirect, consequential, or punitive damages.",
    details: [
      "This covers database connection interruptions, server downtimes, data packet losses, or business disruptions arising out of platform access.",
      "The user assumes complete operational responsibility for testing and installing mechatronic units."
    ]
  },
  {
    id: "user-content",
    title: "9. User Content",
    content: "For any inquiries, requisition comments, or feedback files you transmit through our forms:",
    details: [
      "You warrant that you own or hold the necessary rights to submit the content and that it does not infringe third-party rights.",
      "We reserve the right to audit and remove comments containing inappropriate or malicious texts."
    ]
  },
  {
    id: "privacy-ref",
    title: "10. Privacy Policy",
    content: "Your access to this portal is simultaneously governed by our Privacy Policy, which details personal and device data compilation strategies.",
    details: [
      "Please review the Privacy Policy page to understand our technical security layers."
    ]
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Jurisdiction",
    content: "These Terms of Service are compiled, interpreted, and governed in accordance with the laws of India.",
    details: [
      "Jurisdiction: All disputes, litigations, or claims arising under these terms shall be subject to the exclusive jurisdiction of the courts of Vadodara, Gujarat, India."
    ]
  },
  {
    id: "changes-terms",
    title: "12. Changes to Terms",
    content: "Ananta Labs India reserves the right to modify these Terms of Service at any time.",
    details: [
      "Modifications are effective immediately upon loading on this route. Your continued access indicates agreement to the modified terms."
    ]
  },
  {
    id: "contact-terms",
    title: "13. Contact Info",
    content: "For questions, licensing requests, or clarification of these terms, contact our legal wing:",
    details: [
      "Company: Ananta Labs India",
      "Email: contact@anantalabsindia.com",
      "Support Portal: www.anantalabsindia.com"
    ]
  }
];

export default function TermsOfService() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Monitor scroll progress for top indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/terms#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Filter sections by search text
  const filteredSections = sections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.details.some((det) => det.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#080808] text-slate-200 font-sans selection:bg-primary/10 relative">
      
      {/* JSON-LD WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service - Ananta Labs India",
            "description": "Terms governing the usage of Ananta Labs India website and research platforms.",
            "publisher": {
              "@type": "Organization",
              "name": "Ananta Labs India"
            }
          }),
        }}
      />

      {/* Top scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#2563EB] z-50 transition-all duration-75 print:hidden"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/10 z-40 py-4 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              Ananta Labs India // TERMS
            </span>
            <button
              onClick={handlePrint}
              className="h-8 w-8 rounded-lg border border-white/10 bg-[#0B0F19] flex items-center justify-center text-slate-500 hover:text-slate-200 shadow-xs cursor-pointer"
              title="Print Document"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="border-b border-white/5 bg-[#0B0F19]/50 py-16 print:bg-[#0B0F19] print:border-none print:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-600 uppercase tracking-wider print:hidden">
            <a href="/" className="hover:text-slate-400">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-400">Legal</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-200">Terms of Service</span>
          </nav>

          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Terms of Service
            </h1>
            <p className="font-sans text-sm text-slate-500 font-semibold uppercase tracking-wider">
              Terms governing the use of Ananta Labs India website and services.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-[10px] font-mono text-slate-600">
            <span>LAST UPDATED: JULY 31, 2026</span>
            <span>JURISDICTION: VADODARA, GUJARAT, INDIA</span>
          </div>

        </div>
      </section>

      {/* Main page content body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Floating Table of Contents & Search (Desktop only) */}
        <aside className="lg:col-span-3 lg:block hidden sticky top-28 h-fit space-y-8 print:hidden">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0B0F19] pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-neutral-400 focus:outline-none focus:border-primary/50"
              placeholder="Search terms..."
            />
          </div>

          {/* Table of Contents */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">
              Table of Contents
            </h3>
            <ul className="text-xs space-y-2.5 font-sans">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="block text-slate-500 hover:text-primary transition-colors leading-tight font-semibold"
                  >
                    {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </aside>

        {/* Right Column: Legal Clauses Content */}
        <main className="lg:col-span-9 space-y-12 text-left print:col-span-12">
          
          {/* Mobile search bar */}
          <div className="relative lg:hidden print:hidden mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0B0F19] pl-9 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none"
              placeholder="Search terms..."
            />
          </div>

          {filteredSections.length === 0 ? (
            <div className="text-center py-12 text-slate-600 font-mono text-xs">
              NO MATCHES FOUND FOR YOUR SEARCH QUERY.
            </div>
          ) : (
            filteredSections.map((sec) => (
              <article
                key={sec.id}
                id={sec.id}
                className="scroll-mt-32 space-y-4 pb-8 border-b border-white/5 last:border-none print:pb-4 print:border-white/10"
              >
                {/* Heading row */}
                <div className="flex items-center justify-between group">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                    {sec.title}
                  </h2>
                  <button
                    onClick={() => handleCopyLink(sec.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 rounded bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-slate-200 cursor-pointer shadow-xs print:hidden"
                    title="Copy Anchor Link"
                  >
                    {copiedId === sec.id ? (
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <Link2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Core description text */}
                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {sec.content}
                </p>

                {/* Details list */}
                <ul className="space-y-2.5 pl-4 border-l border-white/10">
                  {sec.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0 print:bg-black" />
                      <span className="font-sans text-xs text-slate-400 leading-relaxed">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

              </article>
            ))
          )}

          {/* Footer copyright */}
          <div className="pt-8 border-t border-white/10 text-center text-[10px] font-mono text-slate-600">
            © 2026 Ananta Labs India. All Rights Reserved.
          </div>

        </main>

      </div>

      {/* Inline styles for custom print styling */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          h1, h2, h3, h4, h5, h6 {
            color: #000000 !important;
          }
          article {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <UnifyEngine />
    </div>
  );
}
