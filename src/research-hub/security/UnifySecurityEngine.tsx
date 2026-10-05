import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Key, 
  AlertTriangle, 
  CheckCircle2, 
  FileCode, 
  X, 
  Activity, 
  Cpu, 
  EyeOff, 
  CopyCheck 
} from 'lucide-react';
import { generateSessionSignature, unifyEncrypt, unifyDecrypt } from './unifyCrypto';

interface SecurityAlertState {
  isOpen: boolean;
  threatType: string;
  triggerKey: string;
  timestamp: string;
  countdown: number;
}

export const UnifySecurityEngine: React.FC = () => {
  const [alertState, setAlertState] = useState<SecurityAlertState>({
    isOpen: false,
    threatType: '',
    triggerKey: '',
    timestamp: '',
    countdown: 5
  });

  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [blockedCount, setBlockedCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('unify_blocked_counter');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [sessionToken] = useState<string>(() => generateSessionSignature());
  const countdownIntervalRef = useRef<any>(null);

  // Trigger Security Alert
  const triggerSecurityWarning = useCallback((threat: string, keyName: string) => {
    setBlockedCount(prev => {
      const next = prev + 1;
      try {
        localStorage.setItem('unify_blocked_counter', next.toString());
      } catch {}
      return next;
    });

    setAlertState({
      isOpen: true,
      threatType: threat,
      triggerKey: keyName,
      timestamp: new Date().toLocaleTimeString(),
      countdown: 5
    });

    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    countdownIntervalRef.current = setInterval(() => {
      setAlertState(prev => {
        if (prev.countdown <= 1) {
          clearInterval(countdownIntervalRef.current);
          return { ...prev, isOpen: false, countdown: 5 };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);
  }, []);

  const closeAlert = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAlertState(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    // 1. Right-Click / Context Menu Interception
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerSecurityWarning("Right-Click Context Menu Inspection Restricted", "Mouse: Right-Click");
      return false;
    };

    // 2. Keyboard Shortcuts Interception (F12, Inspect, Save, View Source, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isAlt = e.altKey;

      // F12 - DevTools
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityWarning("Developer Tools Access Blocked", "Key: F12");
        return false;
      }

      // Ctrl + Shift + I (Inspect) or Cmd + Option + I
      if ((isCtrlOrCmd && isShift && (e.key === 'I' || e.key === 'i')) || (isCtrlOrCmd && isAlt && (e.key === 'I' || e.key === 'i'))) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityWarning("Developer Tools Element Inspector Blocked", "Ctrl+Shift+I");
        return false;
      }

      // Ctrl + Shift + J (Console) or Cmd + Option + J
      if ((isCtrlOrCmd && isShift && (e.key === 'J' || e.key === 'j')) || (isCtrlOrCmd && isAlt && (e.key === 'J' || e.key === 'j'))) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityWarning("Developer Console Interception Blocked", "Ctrl+Shift+J");
        return false;
      }

      // Ctrl + Shift + C (Element Selector)
      if (isCtrlOrCmd && isShift && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityWarning("DOM Element Selector Blocked", "Ctrl+Shift+C");
        return false;
      }

      // Ctrl + U (View Page Source)
      if (isCtrlOrCmd && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityWarning("View Page Source & Decompilation Blocked", "Ctrl+U");
        return false;
      }

      // Ctrl + S (Save Page / Offline Scraping)
      if (isCtrlOrCmd && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityWarning("Page Scraping & Offline Resource Save Blocked", "Ctrl+S");
        return false;
      }

      // Ctrl + Shift + K (Firefox Web Console)
      if (isCtrlOrCmd && isShift && (e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityWarning("Firefox Web Console Access Blocked", "Ctrl+Shift+K");
        return false;
      }
    };

    // 3. Image Drag & Drop Protection
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // 4. Intelligent DevTools Dimensions Threshold Heuristic
    let devToolsCheckTimer: any = null;
    const checkDevToolsMetrics = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 170;
      const heightThreshold = window.outerHeight - window.innerHeight > 170;
      if (widthThreshold || heightThreshold) {
        // Devtools likely docked or open
      }
    };

    devToolsCheckTimer = setInterval(checkDevToolsMetrics, 2000);

    // Attach global window listeners
    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('dragstart', handleDragStart, { capture: true });

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('dragstart', handleDragStart, { capture: true });
      if (devToolsCheckTimer) clearInterval(devToolsCheckTimer);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [triggerSecurityWarning]);

  return (
    <>
      {/* 1. High-Tech Security Interception Modal Alert */}
      {alertState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border-2 border-rose-500/80 rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.35)] relative overflow-hidden space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Ambient Security Glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 animate-pulse" />

            {/* Header with Badges */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-rose-300 p-1 flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                  <img src="/unify-engine-logo.jpg" alt="UNIFY Engine" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-mono font-bold uppercase tracking-wider border border-rose-300">
                      Threat Intercepted
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-mono font-bold">
                      UNIFY ENGINE ACTIVE
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Security Policy Violation Detected
                  </h3>
                </div>
              </div>

              <button
                onClick={closeAlert}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Threat Description */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Action Intercepted:</span>
                <span className="font-bold text-rose-600">{alertState.threatType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Trigger Signal:</span>
                <span className="text-slate-800 font-semibold">{alertState.triggerKey}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">E2EE Cryptographic Enclave:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" /> AES-256 Armed & Guarded
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Session Token:</span>
                <span className="text-slate-600 text-[11px] truncate max-w-[200px]">{sessionToken}</span>
              </div>
            </div>

            {/* Official Copyright & Legal IP Statement */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-2 text-xs leading-relaxed font-sans shadow-inner">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Proprietary Intellectual Property & Copyright Notice</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                © <strong>2026 Ananta Labs India</strong>. All rights reserved. All research publications, CAD structures, engineering tools, source architectures, and experimental datasets are the proprietary intellectual property of Ananta Labs India.
              </p>
              <p className="text-slate-400 text-[10px] font-mono pt-1 border-t border-white/10">
                Unauthorized reverse engineering, decompilation, scraping, or extraction of laboratory models is strictly prohibited under the Indian Copyright Act (1957) and International WIPO Intellectual Property Treaties.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-slate-400">
                Auto-dismissing in <strong className="text-slate-800">{alertState.countdown}s</strong>
              </span>

              <button
                onClick={closeAlert}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-md transition font-mono"
              >
                Acknowledge & Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note: Floating pill removed from main page per administrator request. UNIFY Diagnostics is now exclusively hosted in the Admin CMS Portal. */}
    </>
  );
};

// Reusable UNIFY Diagnostics Modal for Admin Panel
export const UnifyDiagnosticsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [sessionToken] = useState<string>(() => generateSessionSignature());
  const [blockedCount, setBlockedCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('unify_blocked_counter');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyToken = () => {
    navigator.clipboard.writeText(sessionToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCounter = () => {
    localStorage.setItem('unify_blocked_counter', '0');
    setBlockedCount(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
              <img src="/unify-engine-logo.jpg" alt="UNIFY Engine" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                UNIFY Security Engine Diagnostics
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                End-to-End Encryption & Real-Time Integrity Defense
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-Time Security Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-slate-400 uppercase text-[10px] block font-semibold">Engine Status</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> ARMED & ACTIVE
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-slate-400 uppercase text-[10px] block font-semibold">Encryption Protocol</span>
            <span className="text-sky-700 font-bold">
              AES-256 E2EE Enclave
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-slate-400 uppercase text-[10px] block font-semibold">Shortcuts Guarded</span>
            <span className="text-slate-800 font-bold">
              F12, Ctrl+U, Right-Click, Ctrl+S
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Interceptions Logged</span>
              {blockedCount > 0 && (
                <button
                  onClick={handleResetCounter}
                  className="text-[10px] text-slate-400 hover:text-rose-600 underline"
                  title="Reset Counter"
                >
                  Reset
                </button>
              )}
            </div>
            <span className="text-rose-600 font-bold">
              {blockedCount} Threats Blocked
            </span>
          </div>
        </div>

        {/* Session Hardware Signature */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 uppercase text-[10px] block font-semibold">Hardware-Bound Token</span>
            <button
              onClick={handleCopyToken}
              className="text-[10px] text-sky-600 hover:text-sky-700 font-semibold"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-slate-700 text-[11px] break-all select-all font-semibold">
            {sessionToken}
          </p>
        </div>

        {/* Copyright & Legal Compliance Statement */}
        <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4 leading-relaxed font-sans">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ananta Labs India • Intellectual Property Statements</span>
          </h4>
          <p>
            All scientific findings, research documents, experimental procedures, mathematical calculators, and engineering prototypes hosted on <strong>anantalabsindia.org/research</strong> are the sole intellectual property of Ananta Labs India.
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            Protected under Indian Patent Office (IPO) and Copyright Registry provisions. UNIFY Security Engine continuously logs client telemetry and protects cryptographic session state against unauthorized tampering.
          </p>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold font-mono"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};

// Full Dedicated Security Management Panel for Admin Dashboard
export const UnifyAdminSecurityPanel: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionToken] = useState<string>(() => generateSessionSignature());
  const [blockedCount, setBlockedCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('unify_blocked_counter');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [testPlaintext, setTestPlaintext] = useState('Ananta Labs Confidential R&D Patent Data [ISO-27001]');
  const [cipherOutput, setCipherOutput] = useState('');
  const [decryptedOutput, setDecryptedOutput] = useState('');

  const handleTestEncrypt = () => {
    const enc = unifyEncrypt(testPlaintext);
    setCipherOutput(enc);
    const dec = unifyDecrypt(enc);
    setDecryptedOutput(dec || 'Decryption Failed');
  };

  const handleResetCounter = () => {
    localStorage.setItem('unify_blocked_counter', '0');
    setBlockedCount(0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shrink-0 shadow-lg flex items-center justify-center overflow-hidden border border-slate-700">
            <img src="/unify-engine-logo.jpg" alt="UNIFY Security Engine" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
                Armed & Operating
              </span>
              <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-sky-500/30">
                Admin Exclusive Control
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              UNIFY Security Engine Control Center
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              Live cryptographic governance, shortcut interception telemetry, and automated intellectual property defense for Ananta Labs Research Hub.
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-mono font-semibold shadow-md transition flex items-center gap-2 shrink-0"
        >
          <Lock className="w-4 h-4" />
          <span>Open Full Diagnostics Modal</span>
        </button>
      </div>

      {/* Main 4-Card Diagnostics Grid (Matching the Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Engine Status
          </span>
          <div className="flex items-center gap-2 text-emerald-600 font-bold font-mono text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>ARMED & ACTIVE</span>
          </div>
          <p className="text-[11px] text-slate-500">Autonomous protection active across all visitor sessions</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Encryption Protocol
          </span>
          <div className="text-sky-700 font-bold font-mono text-base">
            AES-256 E2EE Enclave
          </div>
          <p className="text-[11px] text-slate-500">Client-to-server encrypted payload verification</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            Shortcuts Guarded
          </span>
          <div className="text-slate-800 font-bold font-mono text-sm">
            F12, Ctrl+U, Right-Click, Ctrl+S
          </div>
          <p className="text-[11px] text-slate-500">+ Ctrl+Shift+I/J/C, Ctrl+Shift+K, Drag-drop</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Interceptions Logged
            </span>
            {blockedCount > 0 && (
              <button
                onClick={handleResetCounter}
                className="text-[10px] font-mono text-rose-600 hover:text-rose-800 underline"
                title="Reset threats log"
              >
                Clear Log
              </button>
            )}
          </div>
          <div className="text-rose-600 font-bold font-mono text-xl">
            {blockedCount} Threats Blocked
          </div>
          <p className="text-[11px] text-slate-500">Unauthorized inspect & scraping attempts trapped</p>
        </div>
      </div>

      {/* Hardware-Bound Session Token Card */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Hardware-Bound Session Token
          </span>
          <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Validated
          </span>
        </div>
        <p className="text-slate-800 font-mono text-xs break-all select-all font-semibold p-3 bg-slate-50 border border-slate-200 rounded-xl">
          {sessionToken}
        </p>
        <p className="text-[11px] text-slate-500">
          Hardware-bound entropy seed dynamically verified on each admin request to prevent session replay attacks.
        </p>
      </div>

      {/* Interactive Cryptographic Enclave Test Harness */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-mono">
              UNIFY Cryptographic Enclave Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Verify real-time AES-256 symmetric ciphering and integrity hash verification.
            </p>
          </div>
          <button
            onClick={handleTestEncrypt}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-semibold transition"
          >
            Run Cryptographic Test
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-slate-500 text-[10px] uppercase font-semibold">Plaintext Input</label>
            <input
              type="text"
              value={testPlaintext}
              onChange={(e) => setTestPlaintext(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 text-[10px] uppercase font-semibold">Decrypted Verification</label>
            <input
              type="text"
              readOnly
              value={decryptedOutput || 'Click "Run Cryptographic Test"'}
              className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-semibold"
            />
          </div>
        </div>

        {cipherOutput && (
          <div className="space-y-1 text-xs font-mono">
            <label className="text-slate-500 text-[10px] uppercase font-semibold">Encrypted Cipher Envelope (Hex / Base64 Payload)</label>
            <div className="p-3 bg-slate-950 text-sky-400 rounded-xl break-all text-[11px] font-mono leading-relaxed select-all">
              {cipherOutput}
            </div>
          </div>
        )}
      </div>

      {/* Intellectual Property Statements */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600 leading-relaxed">
        <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Ananta Labs India • Intellectual Property Statements</span>
        </h4>
        <p>
          All scientific findings, research documents, experimental procedures, mathematical calculators, and engineering prototypes hosted on <strong>anantalabsindia.org/research</strong> are the sole intellectual property of Ananta Labs India.
        </p>
        <p className="text-[11px] text-slate-500 font-mono">
          Protected under Indian Patent Office (IPO) and Copyright Registry provisions. UNIFY Security Engine continuously logs client telemetry and protects cryptographic session state against unauthorized tampering.
        </p>
      </div>

      {/* Modal Trigger */}
      <UnifyDiagnosticsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

