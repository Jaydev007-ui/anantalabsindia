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
    id: "info-collect",
    title: "1. Information We Collect",
    content: "We collect information to provide better services to our users and collaborators. This is split into personal credentials you submit and technical device parameters logged automatically during access.",
    details: [
      "Personal Information: Name, Email Address, Phone Number, Company/Organization Name, Dispatch/Shipping Address, and Job Title provided during inquiries or newsletter subscriptions.",
      "Technical Details: IP Address, Browser User Agent, Operating System details, Device type, Screen resolution parameters, Cookie identifiers, Analytics metrics, and standard server log archives."
    ]
  },
  {
    id: "use-info",
    title: "2. How We Use Your Information",
    content: "Ananta Labs India utilizes collected telemetry data for organizational, regulatory, and research operations.",
    details: [
      "Maintaining, analyzing, and improving overall website loading speeds and responsiveness.",
      "Responding to clinical inquiries, mechatronic requests, and customer support requisitions.",
      "Facilitating clinical research collaborations with academic institutions and clinical partners.",
      "Processing recruitment applications and managing active talent acquisitions.",
      "Sending product release bulletins, safety updates, and legal/regulatory compliance warnings."
    ]
  },
  {
    id: "cookies",
    title: "3. Cookies Policy",
    content: "Cookies are small text structures stored on your device. We use them for core session handling, setting performance states, and understanding site navigation patterns.",
    details: [
      "Essential Cookies: Mandatory session structures required to navigate secure dashboards (e.g., /admin console keys).",
      "Analytics Cookies: Track page visitation duration and bounce ratios anonymously.",
      "Management: You can inspect, block, or clear cookies through your browser settings. Restricting them may disable certain operational sections."
    ]
  },
  {
    id: "third-parties",
    title: "4. Third Party Services",
    content: "We engage verified external partners to support website delivery. These third parties operate under independent privacy regulations.",
    details: [
      "Analytics & Assets: Google Analytics (visitation metrics), Google Fonts (typography structures).",
      "Network Infrastructure: Cloudflare (content delivery network and DDoS security shielding).",
      "Note: We do not sell or trade personal information data files to external brokers."
    ]
  },
  {
    id: "security",
    title: "5. Data Security",
    content: "We enforce high-security standards to safeguard customer data against unauthorized access, alterations, or destruction.",
    details: [
      "SSL/TLS secure socket layer encryption across all active routes and API headers.",
      "Restricted role-based database authentication permissions (e.g. secure admin login tokens).",
      "Regular automated data backups and persistent server scanning protocols."
    ]
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: "We store personal parameters only as long as necessary to fulfill specific operational inquiries, research contracts, or standard legal/auditing requirements.",
    details: [
      "Requisition details remain archived in local databases for customer support references.",
      "Marketing newsletter identifiers are retained until you trigger the unsubscribe check."
    ]
  },
  {
    id: "rights",
    title: "7. User Rights",
    content: "Under applicable Indian data protection frameworks, you hold structural rights regarding your personal information records.",
    details: [
      "Right to access, correct, or request the deletion of your archived records.",
      "Right to withdraw consent for active data processing or opt-out of marketing circulars.",
      "To execute these options, submit a request directly to our clinical operations team."
    ]
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: "Our services are engineered for adult researchers, medical students, and clinical institutions. We do not intentionally compile information from individuals under 13 years of age.",
    details: [
      "If we discover records of children under 13, they are permanently purged from database files."
    ]
  },
  {
    id: "international",
    title: "9. International Users",
    content: "Ananta Labs India is based in India. By accessing this platform, international visitors acknowledge that information transfers are governed under the laws of India.",
    details: [
      "Data hosting and encryption architectures strictly follow local IT laws."
    ]
  },
  {
    id: "changes",
    title: "10. Changes to Policy",
    content: "We periodically modify this policy to align with clinical product rollouts or legislative shifts.",
    details: [
      "All updates are marked with a revised date at the top of this document. Continued usage constitutes acceptance."
    ]
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: "For inquiries regarding this privacy framework or to inspect archived data, contact our operations desk:",
    details: [
      "Company: Ananta Labs India",
      "Email Address: contact@anantalabsindia.com",
      "Corporate Portal: www.anantalabsindia.com"
    ]
  }
];

export default function PrivacyPolicy() {
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
      const url = `${window.location.origin}/privacy#${id}`;
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
      
      {/* JSON-LD Legal Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy - Ananta Labs India",
            "description": "Privacy policy and data safeguarding guidelines of Ananta Labs India.",
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
              Ananta Labs India // LEGAL
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
            <span className="text-slate-200">Privacy Policy</span>
          </nav>

          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="font-sans text-sm text-slate-500 font-semibold uppercase tracking-wider">
              Your privacy is important to us.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-[10px] font-mono text-slate-600">
            <span>LAST UPDATED: JULY 31, 2026</span>
            <span>JURISDICTION: INDIA</span>
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
              placeholder="Search policy..."
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
              placeholder="Search policy..."
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
          /* Remove borders of card grids */
          article {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <UnifyEngine />
    </div>
  );
}
