import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import UnifyEngine from "@/components/ui/UnifyEngine";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ananta Labs India | Founder-Led Deep-Tech R&D Lab",
  description:
    "Ananta Labs India is a founder-led deep-tech R&D lab based in Vadodara, Gujarat, India, developing intelligence for real-world systems across AI, computer vision, medical technology, and manufacturing.",
  keywords: [
    "Artificial Intelligence India",
    "Healthcare AI",
    "Medical Technology",
    "Research Company",
    "Innovation Lab",
    "Deep Tech India",
    "Embedded Systems",
    "Medical Devices",
    "Machine Learning",
    "Computer Vision",
    "Robotics",
    "Healthcare Innovation",
    "AI Research",
    "Ananta Labs India",
    "Vadodara",
    "Gujarat"
  ],
  authors: [{ name: "Ananta Labs India" }],
  creator: "Ananta Labs India",
  publisher: "Ananta Labs India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Ananta Labs India | Founder-Led Deep-Tech R&D Lab",
    description:
      "Developing next-generation AI, healthcare diagnostic interfaces, embedded systems, and computer vision systems for industrial impact.",
    url: "https://anantalabs.in",
    siteName: "Ananta Labs India",
    images: [
      {
        url: "https://anantalabs.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ananta Labs India R&D Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananta Labs India | Founder-Led Deep-Tech R&D Lab",
    description:
      "Developing next-generation AI, healthcare diagnostic interfaces, embedded systems, and computer vision systems for industrial impact.",
    images: ["https://anantalabs.in/og-image.jpg"],
  },
  alternates: {
    canonical: "https://anantalabs.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon.png?v=2", type: "image/png" },
      { url: "/icon.png?v=2", type: "image/png" },
      { url: "/logo.jpg?v=2", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-icon.png?v=2",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Ananta Labs India",
    "url": "https://anantalabs.in",
    "logo": "https://anantalabs.in/logo.jpg",
    "description":
      "Ananta Labs India is a founder-led deep-tech R&D lab based in Vadodara, Gujarat, India, developing intelligence for real-world systems across AI, computer vision, medical technology, and manufacturing.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "postalCode": "390001",
      "addressCountry": "IN",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-89807-41150",
      "contactType": "corporate communications",
      "email": "anantalabsindia@gmail.com",
      "availableLanguage": ["English", "Hindi"],
    },
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9120686810691111"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-foreground">
        <UnifyEngine />
        {children}
      </body>
    </html>
  );
}
