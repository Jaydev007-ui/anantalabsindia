"use client";

import { useState, useEffect, useCallback } from "react";
import { INITIAL_SITE_CONTENT, SiteContentData } from "./siteContent";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContentData>(INITIAL_SITE_CONTENT);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setContent(json.data);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch live content, using default initial content", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();

    // Custom listener for instant same-tab updates
    const handleUpdate = () => {
      fetchContent();
    };

    window.addEventListener("ananta_content_updated", handleUpdate);
    return () => window.removeEventListener("ananta_content_updated", handleUpdate);
  }, [fetchContent]);

  const updateContent = async (newContent: SiteContentData): Promise<boolean> => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContent),
      });
      if (res.ok) {
        setContent(newContent);
        window.dispatchEvent(new Event("ananta_content_updated"));
        return true;
      }
    } catch (e) {
      console.error("Failed to update site content", e);
    }
    return false;
  };

  return { content, loading, updateContent, refresh: fetchContent };
}
