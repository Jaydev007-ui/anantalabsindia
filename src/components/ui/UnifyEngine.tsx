"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export default function UnifyEngine() {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const reportThreat = async (type: string, details: string) => {
    try {
      await fetch("/api/threats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          source: `${typeof window !== "undefined" ? window.location.pathname : "Client"} Console`,
          details,
          date: new Date().toISOString()
        })
      });
    } catch (e) {
      console.error("Failed to post threat report to Unify core", e);
    }
  };

  const triggerWarning = (msg: string, type: string = "Security Event") => {
    setWarningMessage(msg);
    setShowWarning(true);
    reportThreat(type, msg);
  };

  useEffect(() => {
    // 1. Disable text selection, touch callouts, and dragstart globally via CSS
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      img {
        -webkit-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // 2. Intercept Context Menu (Right Click & Mobile Long Press)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarning(
        "UNIFY ENGINE: COPYRIGHT WARNING\n\nAll content, mechatronic diagrams, and source code are the proprietary intellectual property of Ananta Labs India. Copying, printing, or extracting text and images is strictly prohibited under trade secret regulations.",
        "Right-Click Violation"
      );
    };

    // 3. Intercept Keydowns (F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
        triggerWarning(
          "UNIFY ENGINE: DEVTOOLS DETECTED\n\nF12 developer console access has been restricted. Code inspection and asset extraction on this portal are prohibited under security policy guidelines.",
          "F12 Developer Shortcut"
        );
        return;
      }

      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      if (isCmdOrCtrl) {
        if (e.shiftKey && e.key.toLowerCase() === "i") {
          e.preventDefault();
          triggerWarning("UNIFY ENGINE: INSPECTOR DETECTED\n\nInspect mode keyboard combinations have been intercepted and blocked.", "Inspect Shortcut Trigger");
        } else if (e.shiftKey && e.key.toLowerCase() === "j") {
          e.preventDefault();
          triggerWarning("UNIFY ENGINE: CONSOLE BLOCKED\n\nDeveloper console shortcuts have been intercepted and restricted.", "Console Shortcut Trigger");
        } else if (e.shiftKey && e.key.toLowerCase() === "c") {
          e.preventDefault();
          triggerWarning("UNIFY ENGINE: SELECTOR BLOCKED\n\nElement selection tool key binds have been restricted.", "Element Selector Shortcut");
        } else if (e.key.toLowerCase() === "u") {
          e.preventDefault();
          triggerWarning("UNIFY ENGINE: SOURCE SHIELDED\n\nView-Source command has been restricted. Raw HTML and JS bundles are encrypted.", "View-Source Violation");
        } else if (e.key.toLowerCase() === "s") {
          e.preventDefault();
          triggerWarning("UNIFY ENGINE: SAVING BLOCKED\n\nPage caching and offline saving commands are restricted.", "Save-Page Violation");
        }
      }
    };

    // 4. Intercept dragstart on document
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault();
      }
    };

    // 5. Intercept selectstart on document
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    // 6. Detect Window DevTools Docking (Resize difference)
    let devtoolsOpen = false;
    const threshold = 160;
    const checkDevToolsDock = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
        devtoolsOpen = true;
        reportThreat(
          "DevTools Docked Detection",
          `Inspection console detected docked inside browser window. Width diff: ${window.outerWidth - window.innerWidth}px, Height diff: ${window.outerHeight - window.innerHeight}px`
        );
      }
    };

    // Add listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("resize", checkDevToolsDock);

    // Run initial size check
    checkDevToolsDock();

    return () => {
      // Cleanup
      document.head.removeChild(style);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("resize", checkDevToolsDock);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#0A0A0A]/95 border border-red-500/20 rounded-2xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.1)] text-center relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4 animate-pulse">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="font-display text-sm font-black tracking-widest text-white uppercase mb-2">
                Unify Engine is Activated
              </h3>
              <p className="font-mono text-[10px] text-slate-400 leading-relaxed whitespace-pre-wrap text-left border border-white/5 bg-white/2 rounded-lg p-4 w-full">
                {warningMessage}
              </p>
              <button
                onClick={() => setShowWarning(false)}
                className="mt-5 w-full rounded-xl bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-bold uppercase tracking-widest py-3 transition-colors shadow-lg cursor-pointer"
              >
                Acknowledge Security Protocol
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
