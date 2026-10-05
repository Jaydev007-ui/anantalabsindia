import type { Metadata } from "next";
import Script from "next/script";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "Ananta Labs Research & Innovation Hub | Research. Engineer. Innovate.",
  description:
    "Official digital R&D and knowledge platform of Ananta Labs India. Discover original research, engineering inventions, experiments, and open engineering tools.",
  alternates: {
    canonical: "https://anantalabsindia.org/research",
  },
  openGraph: {
    title: "Ananta Labs Research & Innovation Hub",
    description:
      "Exploring ideas. Engineering solutions. Documenting innovation. Official digital R&D platform of Ananta Labs India.",
    url: "https://anantalabsindia.org/research",
    siteName: "Ananta Labs Research & Innovation Hub",
    type: "website",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9120686810691111"
          crossOrigin="anonymous"
        />
      </head>
      <Script
        id="google-adsense-research"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9120686810691111"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className="research-hub-root min-h-screen bg-slate-50 text-slate-900">
        {children}
      </div>
    </>
  );
}
