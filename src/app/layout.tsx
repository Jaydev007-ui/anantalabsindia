import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ananta Labs India | AI Research, Healthcare Technology & Innovation",
  description:
    "Ananta Labs India is a research-driven technology company developing Artificial Intelligence, Medical Devices, Robotics, Embedded Systems, Healthcare Technologies, and next-generation innovations for real-world impact.",
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
    title: "Ananta Labs India | AI Research, Healthcare Technology & Innovation",
    description:
      "Developing next-generation AI, healthcare diagnostic interfaces, embedded systems, and robotics modules for industrial impact.",
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
    title: "Ananta Labs India | AI Research, Healthcare Technology & Innovation",
    description:
      "Developing next-generation AI, healthcare diagnostic interfaces, embedded systems, and robotics modules for industrial impact.",
    images: ["https://anantalabs.in/og-image.jpg"],
  },
  alternates: {
    canonical: "https://anantalabs.in",
  },
  icons: {
    icon: "/favicon/favicon.ico?v=3",
    shortcut: "/favicon/favicon.ico?v=3",
    apple: "/favicon/favicon.ico?v=3",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
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
    "logo": "https://anantalabs.in/logo.png",
    "description":
      "Ananta Labs India is a research-driven technology corporation engineering deep-tech hardware systems, artificial intelligence diagnostics, and medical robotics.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indiranagar, Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560038",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-white font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
