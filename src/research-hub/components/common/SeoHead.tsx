import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article' | 'scholarly' | 'profile';
  publishedDate?: string;
  authors?: string[];
  jsonLd?: Record<string, any>;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath = "",
  type = 'website',
  publishedDate,
  authors,
  jsonLd
}) => {
  useEffect(() => {
    // Set page title
    const fullTitle = title.includes("Ananta Labs")
      ? title
      : `${title} | Ananta Labs Research & Innovation Hub`;
    document.title = fullTitle;

    // Set or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      let el = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', type === 'scholarly' || type === 'article' ? 'article' : 'website', true);
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);

    // Canonical link
    const baseUrl = 'https://anantalabsindia.org/research';
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath.slice(1) : canonicalPath;
    const fullUrl = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullUrl);
    updateMeta('og:url', fullUrl, true);

    // Google AdSense
    const adsenseScriptId = 'google-adsense-script';
    let adsenseEl = document.getElementById(adsenseScriptId) as HTMLScriptElement | null;
    if (!adsenseEl && !document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      adsenseEl = document.createElement('script');
      adsenseEl.id = adsenseScriptId;
      adsenseEl.async = true;
      adsenseEl.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9120686810691111";
      adsenseEl.crossOrigin = "anonymous";
      document.head.appendChild(adsenseEl);
    }

    // JSON-LD Structured Data
    const scriptId = 'ananta-json-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const defaultJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://anantalabsindia.org/#organization",
          "name": "Ananta Labs India",
          "url": "https://anantalabsindia.org",
          "logo": "https://anantalabsindia.org/logo.png",
          "description": "Indian deep-tech engineering and applied research laboratory inventing solutions in computer vision, precision electromechanics, and industrial automation."
        },
        {
          "@type": "WebSite",
          "@id": "https://anantalabsindia.org/research/#website",
          "url": "https://anantalabsindia.org/research",
          "name": "Ananta Labs Research & Innovation Hub",
          "publisher": { "@id": "https://anantalabsindia.org/#organization" }
        },
        ...(jsonLd ? [jsonLd] : [])
      ]
    };

    scriptEl.textContent = JSON.stringify(defaultJsonLd);
  }, [title, description, canonicalPath, type, publishedDate, authors, jsonLd]);

  return null;
};
