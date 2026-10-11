"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lock,
  ShoppingBag,
  ShieldCheck,
  Cpu,
  Sliders,
  Users,
  FileText,
  CheckCircle2,
  Calendar,
  Target,
  BarChart3,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Search,
  RefreshCw,
  Key,
  LogOut,
  Download,
  AlertCircle,
  Copy,
  Check,
  Clock,
  Eye,
  FileCode,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiteContentData,
  TeamMember,
  RDResearchItem,
  AttendanceRecord,
  TargetTask,
  ProductItem,
  PatentItem,
  JAYDEV_ADMIN,
  INITIAL_SITE_CONTENT,
} from "@/lib/siteContent";

export default function AdminPage() {
  // Session & Auth
  const [passkeyInput, setPasskeyInput] = useState("");
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);
  const [loginError, setLoginError] = useState("");
  const [copiedPasskey, setCopiedPasskey] = useState<string | null>(null);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    "store" | "patents" | "flagship" | "manifesto" | "orders" | "team" | "rd" | "attendance" | "targets" | "analytics"
  >("store");

  // Live Data Stores
  const [siteContent, setSiteContent] = useState<SiteContentData>(INITIAL_SITE_CONTENT);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([JAYDEV_ADMIN]);
  const [rdItems, setRdItems] = useState<RDResearchItem[]>([]);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>([]);
  const [targets, setTargets] = useState<TargetTask[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Team Member Creation State
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<TeamMember["role"]>("Senior Researcher");
  const [newMemberDept, setNewMemberDept] = useState("Hardware & Fluidics R&D");
  const [customPasskey, setCustomPasskey] = useState("");

  // R&D Upload Form State
  const [rdTitle, setRdTitle] = useState("");
  const [rdPurpose, setRdPurpose] = useState("");
  const [rdDescription, setRdDescription] = useState("");
  const [rdFile, setRdFile] = useState<{ name: string; data: string; size: string; type: string } | null>(null);
  const [rdDesignFile, setRdDesignFile] = useState<{ name: string; data: string; size: string; type: string } | null>(null);

  // Attendance Form State
  const [attendanceWorkDone, setAttendanceWorkDone] = useState("");
  const [attendanceError, setAttendanceError] = useState("");

  // Target Assignment Form State
  const [targetTitle, setTargetTitle] = useState("");
  const [targetAssigneeId, setTargetAssigneeId] = useState("");
  const [targetDuration, setTargetDuration] = useState("3 Days");
  const [targetDeadline, setTargetDeadline] = useState("");
  const [targetDescription, setTargetDescription] = useState("");

  // Complete Target Modal State
  const [completingTarget, setCompletingTarget] = useState<TargetTask | null>(null);
  const [completeNote, setCompleteNote] = useState("");
  const [completeFile, setCompleteFile] = useState<{ name: string; data: string } | null>(null);

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Patent Edit Modal State
  const [editingPatent, setEditingPatent] = useState<PatentItem | null>(null);
  const [isNewPatent, setIsNewPatent] = useState(false);

  // Clear session on load to ensure passkey is asked every single time
  useEffect(() => {
    try {
      localStorage.removeItem("ananta_admin_session");
      sessionStorage.removeItem("ananta_admin_session");
    } catch {}
  }, []);

  // Fetch all live records
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [cRes, tRes, rdRes, attRes, tarRes, oRes, iRes] = await Promise.all([
        fetch("/api/content", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/team", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/rd", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/attendance", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/targets", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/orders", { cache: "no-store" }).then((r) => r.json()).catch(() => []),
        fetch("/api/inquiries", { cache: "no-store" }).then((r) => r.json()).catch(() => []),
      ]);

      if (cRes?.data) setSiteContent(cRes.data);
      if (tRes?.data) setTeamMembers(tRes.data);
      if (rdRes?.data) setRdItems(rdRes.data);
      if (attRes?.data) setAttendanceLogs(attRes.data);
      if (tarRes?.data) setTargets(tarRes.data);
      if (Array.isArray(oRes)) setOrders(oRes);
      if (Array.isArray(iRes)) setInquiries(iRes);
    } catch (e) {
      console.error("Error loading admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadAllData();
    }
  }, [currentUser]);

  // Handle Passkey Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const key = passkeyInput.trim();
    if (!key) {
      setLoginError("Please enter your passkey.");
      return;
    }

    // Check fixed master passkey for Jaydev Zala
    if (key === "9099093188") {
      setCurrentUser(JAYDEV_ADMIN);
      setPasskeyInput("");
      return;
    }

    // Check team members list from server
    try {
      const res = await fetch("/api/team");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const found = json.data.find((m: TeamMember) => m.passkey === key);
        if (found) {
          setCurrentUser(found);
          setPasskeyInput("");
          return;
        }
      }
    } catch {}

    setLoginError("Invalid Passkey. Please verify your clearance credentials.");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("ananta_admin_session");
      sessionStorage.removeItem("ananta_admin_session");
    } catch {}
  };

  const triggerSuccessAlert = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // Convert uploaded file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  // Format file size
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // ---------------- Site Content Save ----------------
  const saveContentChanges = async (updated: SiteContentData) => {
    setSiteContent(updated);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        window.dispatchEvent(new Event("ananta_content_updated"));
        triggerSuccessAlert("Site content updated & live on website!");
      }
    } catch {
      alert("Failed to save content changes.");
    }
  };

  // ---------------- Team Member Generation (Jaydev Only) ----------------
  const handleGenerateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.passkey !== "9099093188") {
      alert("Only Jaydev Zala can generate team passkeys.");
      return;
    }

    try {
      const generated = customPasskey.trim() || Math.floor(10000000 + Math.random() * 90000000).toString();
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMemberName,
          email: newMemberEmail,
          phone: newMemberPhone,
          role: newMemberRole,
          department: newMemberDept,
          passkey: generated,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setTeamMembers(json.data);
        setNewMemberName("");
        setNewMemberEmail("");
        setNewMemberPhone("");
        setCustomPasskey("");
        triggerSuccessAlert(`New admin profile created! Passkey: ${generated}`);
      } else {
        alert(json.error || "Failed to create team member");
      }
    } catch {
      alert("Network error creating team member");
    }
  };

  const handleDeleteMember = async (passkey: string) => {
    if (passkey === "9099093188") {
      alert("Master admin Jaydev Zala cannot be deleted.");
      return;
    }
    if (!confirm("Are you sure you want to remove this admin?")) return;

    try {
      const res = await fetch(`/api/team?passkey=${passkey}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setTeamMembers(json.data);
        triggerSuccessAlert("Team member removed.");
      }
    } catch {}
  };

  // ---------------- Order & Inquiry Status Actions ----------------
  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
        triggerSuccessAlert(`Order ${id} status set to ${newStatus}`);
      }
    } catch {}
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to remove this order from records?")) return;
    try {
      const res = await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
        triggerSuccessAlert(`Order ${id} removed.`);
      }
    } catch {}
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
        triggerSuccessAlert(`Inquiry status set to ${newStatus}`);
      }
    } catch {}
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to remove this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        triggerSuccessAlert("Inquiry removed.");
      }
    } catch {}
  };

  // ---------------- R&D Internal Submission ----------------
  const handleRDSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rdTitle || !rdDescription || !rdPurpose) {
      alert("Please fill in Title, Description, and Purpose of research.");
      return;
    }

    try {
      const payload = {
        title: rdTitle,
        description: rdDescription,
        purpose: rdPurpose,
        authorId: currentUser?.id || currentUser?.passkey,
        authorName: currentUser?.name || "Admin",
        fileName: rdFile?.name,
        fileData: rdFile?.data,
        fileType: rdFile?.type,
        fileSize: rdFile?.size,
        designFileName: rdDesignFile?.name,
        designFileData: rdDesignFile?.data,
        designFileType: rdDesignFile?.type,
        designFileSize: rdDesignFile?.size,
      };

      const res = await fetch("/api/rd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setRdItems(json.data);
        setRdTitle("");
        setRdPurpose("");
        setRdDescription("");
        setRdFile(null);
        setRdDesignFile(null);
        triggerSuccessAlert("Internal R&D research document submitted successfully!");
      }
    } catch {
      alert("Failed to submit R&D research");
    }
  };

  // ---------------- Attendance Marking ----------------
  const handleMarkAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttendanceError("");

    if (!attendanceWorkDone.trim()) {
      setAttendanceError("You must write a description of the work you completed today before marking attendance.");
      return;
    }

    if (!currentUser) return;

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: currentUser.id,
          memberName: currentUser.name,
          passkey: currentUser.passkey,
          workDone: attendanceWorkDone.trim(),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setAttendanceLogs(json.data);
        setAttendanceWorkDone("");
        triggerSuccessAlert("Attendance successfully marked for today!");
      } else {
        setAttendanceError(json.error || "Failed to mark attendance.");
      }
    } catch {
      setAttendanceError("Failed to reach attendance server.");
    }
  };

  // ---------------- Targets Management ----------------
  const handleAssignTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetTitle || !targetDescription || !targetAssigneeId) {
      alert("Please fill in Target Title, Assignee, and Description.");
      return;
    }

    const assignee = teamMembers.find((m) => m.id === targetAssigneeId || m.passkey === targetAssigneeId);
    if (!assignee) {
      alert("Assignee not found.");
      return;
    }

    try {
      const res = await fetch("/api/targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: targetTitle,
          description: targetDescription,
          duration: targetDuration,
          deadline: targetDeadline || new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
          assignedToId: assignee.id,
          assignedToName: assignee.name,
          assignedById: currentUser?.id || "unknown",
          assignedByName: currentUser?.name || "Admin",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setTargets(json.data);
        setTargetTitle("");
        setTargetDescription("");
        setTargetDeadline("");
        triggerSuccessAlert(`Target assigned to ${assignee.name}!`);
      }
    } catch {
      alert("Failed to assign target");
    }
  };

  const handleCompleteTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completingTarget) return;

    try {
      const res = await fetch("/api/targets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: completingTarget.id,
          status: "Completed",
          completionNote: completeNote,
          completionFileName: completeFile?.name,
          completionFileData: completeFile?.data,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setTargets(json.data);
        setCompletingTarget(null);
        setCompleteNote("");
        setCompleteFile(null);
        triggerSuccessAlert("Target task marked as Completed!");
      }
    } catch {
      alert("Failed to complete target task");
    }
  };

  // ---------------- Product Save (Store) ----------------
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const currentProducts = [...(siteContent.store?.products || [])];
    if (isNewProduct) {
      currentProducts.push(editingProduct);
    } else {
      const idx = currentProducts.findIndex((p) => p.id === editingProduct.id);
      if (idx >= 0) currentProducts[idx] = editingProduct;
    }

    const updated: SiteContentData = {
      ...siteContent,
      store: {
        ...siteContent.store,
        products: currentProducts,
      },
    };

    await saveContentChanges(updated);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product from the store?")) return;
    const currentProducts = (siteContent.store?.products || []).filter((p) => p.id !== id);
    const updated: SiteContentData = {
      ...siteContent,
      store: {
        ...siteContent.store,
        products: currentProducts,
      },
    };
    await saveContentChanges(updated);
  };

  // ---------------- Patent Save ----------------
  const handleSavePatent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatent) return;

    const currentPatents = [...(siteContent.patents?.items || [])];
    if (isNewPatent) {
      currentPatents.push(editingPatent);
    } else {
      const idx = currentPatents.findIndex((p) => p.id === editingPatent.id);
      if (idx >= 0) currentPatents[idx] = editingPatent;
    }

    const updated: SiteContentData = {
      ...siteContent,
      patents: {
        ...siteContent.patents,
        items: currentPatents,
      },
    };

    await saveContentChanges(updated);
    setEditingPatent(null);
  };

  const handleDeletePatent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patent seal?")) return;
    const currentPatents = (siteContent.patents?.items || []).filter((p) => p.id !== id);
    const updated: SiteContentData = {
      ...siteContent,
      patents: {
        ...siteContent.patents,
        items: currentPatents,
      },
    };
    await saveContentChanges(updated);
  };

  // ==========================================
  // 1. LOGIN SCREEN (ROLE-BASED PASSKEY)
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#07090A] text-white flex items-center justify-center p-4 relative selection:bg-[#7FBFA0]/20 selection:text-white">
        {/* Subtle background glow */}
        <div className="absolute w-[600px] h-[600px] bg-[#7FBFA0]/5 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0E1213] p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#7FBFA0]/10 border border-[#7FBFA0]/30 text-[#7FBFA0] flex items-center justify-center mx-auto shadow-inner">
              <Key className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#7FBFA0] uppercase">
                SECURITY CLEARANCE LEVEL 4
              </span>
              <h1 className="text-2xl font-bold font-display text-white mt-1">Ananta Executive Portal</h1>
              <p className="text-xs text-slate-400 mt-1">Enter your assigned biometric passkey to access operational controls.</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Biometric Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter security passkey"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-sm tracking-wider focus:border-[#7FBFA0] focus:ring-1 focus:ring-[#7FBFA0] focus:outline-none transition-all placeholder:text-slate-600"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#7FBFA0] text-black font-bold font-sans text-xs uppercase tracking-widest hover:bg-[#98d6b7] active:scale-98 transition-all cursor-pointer shadow-lg shadow-[#7FBFA0]/20 flex items-center justify-center gap-2"
            >
              Authenticate Clearance
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-500 font-mono">
              Restricted Area. Authorized administrative credentials required for session access.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const isMasterAdmin = currentUser.passkey === "9099093188";

  return (
    <div className="min-h-screen bg-[#07090A] text-slate-200 selection:bg-[#7FBFA0]/20 selection:text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0A0D0F]/90 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#7FBFA0]/40 bg-[#7FBFA0]/10 flex items-center justify-center text-[#7FBFA0] shrink-0">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-white uppercase truncate">
                ANANTA LABS
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono bg-[#7FBFA0]/20 text-[#7FBFA0] border border-[#7FBFA0]/40 font-bold uppercase shrink-0">
                ADMIN CONSOLE
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 truncate max-w-[200px] xs:max-w-xs sm:max-w-none">
              Session: <strong className="text-white">{currentUser.name}</strong> •{" "}
              <span className="text-[#7FBFA0]">{currentUser.role}</span> ({currentUser.department})
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={loadAllData}
            title="Refresh All Records"
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? "animate-spin text-[#7FBFA0]" : ""}`} />
          </button>
          <a
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-[11px] sm:text-xs font-mono transition-colors cursor-pointer"
          >
            <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Action Success Toast */}
      <AnimatePresence>
        {actionSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 sm:top-16 right-4 sm:right-6 z-50 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#7FBFA0] text-black text-xs font-bold shadow-2xl flex items-center gap-2 max-w-[90vw]"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="truncate">{actionSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#090C0E] p-2.5 sm:p-4 flex flex-row lg:flex-col gap-1.5 sm:gap-1 overflow-x-auto lg:overflow-visible shrink-0 no-scrollbar">
          <div className="hidden lg:block text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-2">
            Site Content & Systems
          </div>

          <button
            onClick={() => setActiveTab("store")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "store"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Store Products</span>
            <span className="ml-1 sm:ml-auto text-[10px] font-mono opacity-80">
              ({siteContent.store?.products?.length || 0})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("patents")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "patents"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Patents & IP</span>
            <span className="ml-1 sm:ml-auto text-[10px] font-mono opacity-80">
              ({siteContent.patents?.items?.length || 0})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("flagship")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "flagship"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Flagship Systems</span>
          </button>

          <button
            onClick={() => setActiveTab("manifesto")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "manifesto"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sliders className="w-4 h-4 shrink-0" />
            <span>Manifesto & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "orders"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Orders & Inquiries</span>
            <span className="ml-1 sm:ml-auto text-[10px] font-mono opacity-80">({orders.length})</span>
          </button>

          <div className="hidden lg:block text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 pt-6 pb-2">
            Team & Operations
          </div>

          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "team"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Team & Passkeys</span>
            <span className="ml-1 sm:ml-auto text-[10px] font-mono opacity-80">({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("rd")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "rd"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileCode className="w-4 h-4 shrink-0" />
            <span>Internal R&D</span>
            <span className="ml-1 sm:ml-auto text-[10px] font-mono opacity-80">({rdItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "attendance"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Attendance Marker</span>
          </button>

          <button
            onClick={() => setActiveTab("targets")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "targets"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Target className="w-4 h-4 shrink-0" />
            <span>Targets & Tasks</span>
            <span className="ml-1 sm:ml-auto text-[10px] font-mono opacity-80">({targets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer text-left whitespace-nowrap shrink-0 ${
              activeTab === "analytics"
                ? "bg-[#7FBFA0] text-black font-bold shadow-md shadow-[#7FBFA0]/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Analytics & Progress</span>
          </button>
        </aside>

        {/* Content Body Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {/* ==================================================== */}
          {/* TAB 1: STORE / PRODUCTS                              */}
          {/* ==================================================== */}
          {activeTab === "store" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">Store Products Management</h2>
                  <p className="text-xs text-slate-400">
                    Add and update biostasis hardware products shown in the website store section (#store).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now()}`,
                      name: "",
                      category: "PRECISION FLUIDICS",
                      tagline: "",
                      description: "",
                      price: 25000,
                      specs: [
                        { label: "Tank Capacity", value: "10-15 L" },
                        { label: "Flow Rate", value: "0.2 - 2.8 L/min" },
                        { label: "Power", value: "Dual AC/DC 12V" },
                      ],
                      features: ["Smooth laminar flow pump", "Dual AC/DC power"],
                      imageUrl: "/embalming_machine.jpg",
                      inStock: true,
                    });
                    setIsNewProduct(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer shadow-lg shadow-[#7FBFA0]/20"
                >
                  <Plus className="w-4 h-4" />
                  Add New Product
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(siteContent.store?.products || []).map((prod) => (
                  <div
                    key={prod.id}
                    className="p-5 rounded-2xl border border-white/10 bg-[#0E1213] flex flex-col justify-between space-y-4 shadow-lg hover:border-[#7FBFA0]/40 transition-all"
                  >
                    <div>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-4">
                        {prod.imageUrl && (
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                            onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                          />
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/80 text-white border border-white/10">
                          {prod.category}
                        </span>
                        <span
                          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                            prod.inStock
                              ? "bg-[#7FBFA0]/20 border-[#7FBFA0]/40 text-[#7FBFA0]"
                              : "bg-red-500/20 border-red-500/40 text-red-400"
                          }`}
                        >
                          {prod.inStock ? "IN STOCK" : "OUT OF STOCK"}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white font-display">{prod.name}</h3>
                      <p className="text-[11px] font-mono text-[#7FBFA0]">{prod.tagline}</p>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">{prod.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-lg font-bold font-mono text-white">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct({ ...prod });
                            setIsNewProduct(false);
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: PATENTS & RECOGNITION                         */}
          {/* ==================================================== */}
          {activeTab === "patents" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">Patents & IP Management</h2>
                  <p className="text-xs text-slate-400">
                    Manage intellectual property filings and regulatory certifications displayed on (#patents).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingPatent({
                      id: `pat-${Date.now()}`,
                      category: "INTELLECTUAL PROPERTY",
                      title: "",
                      org: "Indian Patent Office (IPO)",
                      desc: "",
                      tag: "REG_IN // FILED",
                    });
                    setIsNewPatent(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer shadow-lg shadow-[#7FBFA0]/20"
                >
                  <Plus className="w-4 h-4" />
                  Add Patent Seal
                </button>
              </div>

              {/* Patent Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(siteContent.patents?.items || []).map((seal) => (
                  <div
                    key={seal.id}
                    className="p-5 rounded-2xl border border-white/10 bg-[#0E1213] flex flex-col justify-between min-h-[280px] shadow-lg hover:border-[#7FBFA0]/40 transition-all"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-[#C98A4B] uppercase tracking-wider block">
                        {seal.category}
                      </span>
                      <h3 className="text-base font-bold text-white uppercase">{seal.title}</h3>
                      <span className="text-[11px] font-mono text-slate-400 block">{seal.org}</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{seal.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#7FBFA0] font-bold">{seal.tag}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingPatent({ ...seal });
                            setIsNewPatent(false);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Patent"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePatent(seal.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          title="Delete Patent"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: FLAGSHIP SYSTEMS                              */}
          {/* ==================================================== */}
          {activeTab === "flagship" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white font-display">Flagship Systems Overview</h2>
                <p className="text-xs text-slate-400">
                  Real-time engineering and pipeline definitions displayed on (#flagship-systems).
                </p>
              </div>

              <div className="space-y-6">
                {(siteContent.flagship?.systems || []).map((sys, idx) => (
                  <div key={sys.id || idx} className="p-6 rounded-2xl border border-white/10 bg-[#0E1213] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#7FBFA0] uppercase tracking-wider">
                          {sys.category} • {sys.code}
                        </span>
                        <h3 className="text-lg font-bold text-white font-display">{sys.title}</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                        {sys.partnerInfo || "Core Engineering Unit"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{sys.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                      {sys.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</div>
                          <div className="text-sm font-bold font-mono text-white mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Pipeline */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">
                        Execution Pipeline Stages
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {sys.pipeline.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#7FBFA0]/10 text-[#7FBFA0] border border-[#7FBFA0]/20"
                          >
                            {pIdx + 1}. {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: MANIFESTO & HERO                              */}
          {/* ==================================================== */}
          {activeTab === "manifesto" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white font-display">Manifesto & Hero Section Content</h2>
                <p className="text-xs text-slate-400">
                  Update primary copy, pull quotes, and technical specs displayed on the home page.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hero Form */}
                <div className="p-6 rounded-2xl border border-white/10 bg-[#0E1213] space-y-4">
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7FBFA0]" />
                    Hero Presentation
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Eyebrow Tagline</label>
                    <input
                      type="text"
                      value={siteContent.hero.eyebrow}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: { ...siteContent.hero, eyebrow: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Title Line 1</label>
                      <input
                        type="text"
                        value={siteContent.hero.titleLine1}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, titleLine1: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Title Line 2</label>
                      <input
                        type="text"
                        value={siteContent.hero.titleLine2}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, titleLine2: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Mission Description</label>
                    <textarea
                      rows={3}
                      value={siteContent.hero.description}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: { ...siteContent.hero, description: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => saveContentChanges(siteContent)}
                    className="w-full py-2.5 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer"
                  >
                    Save Hero Changes
                  </button>
                </div>

                {/* Manifesto Form */}
                <div className="p-6 rounded-2xl border border-white/10 bg-[#0E1213] space-y-4">
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#7FBFA0]" />
                    Manifesto Copy & Quotes
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Pull Quote</label>
                    <textarea
                      rows={2}
                      value={siteContent.manifesto.pullQuote}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          manifesto: { ...siteContent.manifesto, pullQuote: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Core Philosophy (P1)</label>
                    <textarea
                      rows={3}
                      value={siteContent.manifesto.p1}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          manifesto: { ...siteContent.manifesto, p1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => saveContentChanges(siteContent)}
                    className="w-full py-2.5 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer"
                  >
                    Save Manifesto Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: ORDERS & INQUIRIES                            */}
          {/* ==================================================== */}
          {activeTab === "orders" && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">Orders & Inquiries Central</h2>
                  <p className="text-xs text-slate-400">
                    Live client queue: Review store hardware orders and incoming partnership inquiries in real time.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#7FBFA0]/15 text-[#7FBFA0] border border-[#7FBFA0]/30 font-bold">
                    Orders: {orders.length}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold">
                    Inquiries: {inquiries.length}
                  </span>
                </div>
              </div>

              {/* SECTION A: HARDWARE ORDERS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#7FBFA0]" />
                    Commercial Hardware Orders ({orders.length})
                  </h3>
                </div>

                {orders.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-xs text-slate-500">
                    No active commercial orders in queue.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((ord: any) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl border border-white/10 bg-[#0E1213] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm hover:border-[#7FBFA0]/40 transition-all"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#7FBFA0]">{ord.id}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {ord.date ? new Date(ord.date).toLocaleString() : "Recent"}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">
                            {ord.customerName} <span className="font-normal text-slate-400">({ord.organization || "Private"})</span>
                          </h4>
                          <p className="text-xs text-slate-300">
                            ✉ {ord.email} • 📞 {ord.phone}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Specs: <strong className="text-white">{ord.capacity}</strong> • Qty: <strong className="text-white">{ord.quantity}</strong> • Ship To: {ord.address}
                          </p>
                          {ord.comments && (
                            <p className="text-xs text-[#7FBFA0]/90 font-mono mt-1 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                              {ord.comments}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 shrink-0">
                          <div className="text-right">
                            <div className="text-base font-mono font-bold text-white">
                              ₹{(ord.totalPrice || 25000).toLocaleString("en-IN")}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status Selector */}
                            <select
                              value={ord.status || "Pending"}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/5 border border-white/10 text-white focus:border-[#7FBFA0] focus:outline-none cursor-pointer"
                            >
                              <option value="Pending" className="bg-[#0C0F12]">Pending</option>
                              <option value="Processing" className="bg-[#0C0F12]">Processing</option>
                              <option value="Shipped" className="bg-[#0C0F12]">Shipped</option>
                              <option value="Completed" className="bg-[#0C0F12]">Completed</option>
                              <option value="Cancelled" className="bg-[#0C0F12]">Cancelled</option>
                            </select>

                            <button
                              onClick={() => handleDeleteOrder(ord.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION B: CONTACT INQUIRIES */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Incoming Partnership Inquiries ({inquiries.length})
                  </h3>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-xs text-slate-500">
                    No inquiries recorded yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq: any) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl border border-white/10 bg-[#0E1213] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm hover:border-blue-400/40 transition-all"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-400">{inq.id}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {inq.date ? new Date(inq.date).toLocaleString() : "Recent"}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">
                            {inq.name} <span className="font-normal text-slate-400">({inq.organization || "Independent"})</span>
                          </h4>
                          <p className="text-xs text-slate-300">
                            ✉ {inq.email} • 📞 {inq.phone}
                          </p>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200 mt-2 font-sans">
                            {inq.message}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                          {/* Status Selector */}
                          <select
                            value={inq.status || "Unread"}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white/5 border border-white/10 text-white focus:border-blue-400 focus:outline-none cursor-pointer"
                          >
                            <option value="Unread" className="bg-[#0C0F12]">Unread</option>
                            <option value="Read" className="bg-[#0C0F12]">Read</option>
                            <option value="Replied" className="bg-[#0C0F12]">Replied</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 6: TEAM MANAGEMENT & PASSKEYS (JAYDEV ADMIN)     */}
          {/* ==================================================== */}
          {activeTab === "team" && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white font-display">Team Directory & Passkey Authority</h2>
                <p className="text-xs text-slate-400">
                  {isMasterAdmin
                    ? "Jaydev Zala Executive Console: Generate new admin profiles, passkeys, and manage team access."
                    : "Team Directory: All listed administrators, roles, and operational clearance."}
                </p>
              </div>

              {/* Passkey & Profile Generation Form (Jaydev Only) */}
              {isMasterAdmin && (
                <div className="p-6 rounded-2xl border border-[#7FBFA0]/30 bg-[#0E1213] relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7FBFA0] to-transparent" />

                  <div className="flex items-center gap-2 mb-4">
                    <Key className="w-5 h-5 text-[#7FBFA0]" />
                    <h3 className="text-base font-bold text-white font-display">
                      Generate New Admin Clearance & Passkey
                    </h3>
                  </div>

                  <form onSubmit={handleGenerateMember} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          placeholder="e.g. Dr. Aryan Mehta"
                          className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="aryan.mehta@anantalabsindia.org"
                          className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={newMemberPhone}
                          onChange={(e) => setNewMemberPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Role *</label>
                        <select
                          value={newMemberRole}
                          onChange={(e) => setNewMemberRole(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        >
                          <option value="Senior Researcher">Senior Researcher</option>
                          <option value="Hardware Engineer">Hardware Engineer</option>
                          <option value="AI Specialist">AI Specialist</option>
                          <option value="Operations">Operations</option>
                          <option value="Associate">Associate</option>
                          <option value="Main Admin">Main Admin</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Department</label>
                        <input
                          type="text"
                          value={newMemberDept}
                          onChange={(e) => setNewMemberDept(e.target.value)}
                          placeholder="e.g. Cryogenics & Biostasis"
                          className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Custom Passkey (Optional)
                        </label>
                        <input
                          type="text"
                          value={customPasskey}
                          onChange={(e) => setCustomPasskey(e.target.value)}
                          placeholder="Leave blank to auto-generate 8 digits"
                          className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono focus:border-[#7FBFA0] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer shadow-lg shadow-[#7FBFA0]/20 flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      Generate Profile & Passkey
                    </button>
                  </form>
                </div>
              )}

              {/* Team Members List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Listed Administrators & Team Members ({teamMembers.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {teamMembers.map((member) => {
                    const isJaydev = member.passkey === "9099093188";
                    return (
                      <div
                        key={member.id}
                        className="p-5 rounded-2xl border border-white/10 bg-[#0E1213] relative space-y-4 shadow-lg hover:border-[#7FBFA0]/40 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black text-sm"
                              style={{ backgroundColor: member.avatarColor || "#7FBFA0" }}
                            >
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">{member.name}</h4>
                              <span className="text-[10px] font-mono text-[#7FBFA0] block">{member.role}</span>
                            </div>
                          </div>
                          {isJaydev && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              FOUNDER
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-400 space-y-1">
                          <p>Dept: {member.department}</p>
                          <p>Email: {member.email}</p>
                          {member.phone && <p>Phone: {member.phone}</p>}
                        </div>

                        {/* Passkey display & copy */}
                        <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono text-slate-500 uppercase block">Passkey</span>
                            <span className="font-mono text-xs text-[#7FBFA0] font-bold tracking-wider">
                              {member.passkey}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(member.passkey);
                              setCopiedPasskey(member.passkey);
                              setTimeout(() => setCopiedPasskey(null), 2000);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Copy Passkey"
                          >
                            {copiedPasskey === member.passkey ? (
                              <Check className="w-3.5 h-3.5 text-[#7FBFA0]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Jaydev delete member action */}
                        {isMasterAdmin && !isJaydev && (
                          <div className="pt-2 border-t border-white/5 flex justify-end">
                            <button
                              onClick={() => handleDeleteMember(member.passkey)}
                              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove Admin
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 7: INTERNAL R&D (ADMIN RESEARCH ONLY)            */}
          {/* ==================================================== */}
          {activeTab === "rd" && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white font-display">Internal R&D Repository</h2>
                <p className="text-xs text-slate-400">
                  Confidential deep-tech research submissions visible strictly to authenticated administrators.
                </p>
              </div>

              {/* R&D Submission Form */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0E1213] space-y-5 shadow-xl">
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#7FBFA0]" />
                  Submit New R&D Research Paper / Blueprint
                </h3>

                <form onSubmit={handleRDSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Research Title *</label>
                    <input
                      type="text"
                      required
                      value={rdTitle}
                      onChange={(e) => setRdTitle(e.target.value)}
                      placeholder="e.g. Cryoprotectant Perfusion Dynamics in Microvascular Bed Models"
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Purpose of this Research *
                    </label>
                    <input
                      type="text"
                      required
                      value={rdPurpose}
                      onChange={(e) => setRdPurpose(e.target.value)}
                      placeholder="e.g. Eliminating cryo-crystallization damage in whole-organ retrieval"
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Description & Findings *</label>
                    <textarea
                      rows={3}
                      required
                      value={rdDescription}
                      onChange={(e) => setRdDescription(e.target.value)}
                      placeholder="Detailed methodology, empirical metrics, pressure ranges, and clinical notes..."
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Multi-type file upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Main Document / Data File */}
                    <div className="p-4 rounded-xl border border-dashed border-white/10 bg-black/20 text-center">
                      <label className="block text-xs font-mono text-slate-300 mb-2 cursor-pointer">
                        Main File Upload (All types: PDF, DOCX, ZIP, PY, CSV...)
                      </label>
                      <input
                        type="file"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const b64 = await fileToBase64(file);
                            setRdFile({
                              name: file.name,
                              data: b64,
                              size: formatBytes(file.size),
                              type: file.type || "application/octet-stream",
                            });
                          }
                        }}
                        className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-[#7FBFA0]/20 file:text-[#7FBFA0] cursor-pointer"
                      />
                      {rdFile && (
                        <div className="mt-2 text-[11px] font-mono text-[#7FBFA0] truncate">
                          ✓ {rdFile.name} ({rdFile.size})
                        </div>
                      )}
                    </div>

                    {/* Optional Design File Upload */}
                    <div className="p-4 rounded-xl border border-dashed border-white/10 bg-black/20 text-center">
                      <label className="block text-xs font-mono text-slate-300 mb-2 cursor-pointer">
                        Design File Upload (Optional: CAD, STEP, STL, FIGMA, DWG, PNG...)
                      </label>
                      <input
                        type="file"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const b64 = await fileToBase64(file);
                            setRdDesignFile({
                              name: file.name,
                              data: b64,
                              size: formatBytes(file.size),
                              type: file.type || "application/octet-stream",
                            });
                          }
                        }}
                        className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-amber-500/20 file:text-amber-400 cursor-pointer"
                      />
                      {rdDesignFile && (
                        <div className="mt-2 text-[11px] font-mono text-amber-400 truncate">
                          ✓ {rdDesignFile.name} ({rdDesignFile.size})
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer shadow-lg shadow-[#7FBFA0]/20"
                  >
                    Submit Research to Repository
                  </button>
                </form>
              </div>

              {/* R&D Submissions Feed */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Archived R&D Research ({rdItems.length})
                </h3>

                {rdItems.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-xs text-slate-500">
                    No confidential R&D research submissions filed yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rdItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-2xl border border-white/10 bg-[#0E1213] space-y-3 shadow-lg"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="text-base font-bold text-white font-display">{item.title}</h4>
                            <div className="text-[11px] font-mono text-[#7FBFA0] mt-0.5">
                              Author: {item.authorName} • {new Date(item.date).toLocaleDateString()}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#7FBFA0]/10 text-[#7FBFA0] border border-[#7FBFA0]/30 font-bold">
                            INTERNAL REVIEWED
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono text-slate-500 uppercase block">
                            Purpose of Research
                          </span>
                          <p className="text-xs font-mono text-slate-200">{item.purpose}</p>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>

                        {/* File Downloads */}
                        <div className="pt-3 border-t border-white/5 flex flex-wrap gap-3">
                          {item.fileData && (
                            <a
                              href={item.fileData}
                              download={item.fileName || "research_document"}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                            >
                              <Download className="w-3.5 h-3.5 text-[#7FBFA0]" />
                              Download {item.fileName} {item.fileSize ? `(${item.fileSize})` : ""}
                            </a>
                          )}
                          {item.designFileData && (
                            <a
                              href={item.designFileData}
                              download={item.designFileName || "design_blueprint"}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono text-amber-400 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download Design: {item.designFileName}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 8: DAILY ATTENDANCE MARKER                       */}
          {/* ==================================================== */}
          {activeTab === "attendance" && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white font-display">Daily Attendance Console</h2>
                <p className="text-xs text-slate-400">
                  Mark your presence. You must fill out the description of what work you accomplished today before marking attendance.
                </p>
              </div>

              {/* Attendance Marker Form */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0E1213] max-w-2xl space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#7FBFA0]" />
                  <h3 className="text-base font-bold text-white font-display">Mark Today's Attendance</h3>
                </div>

                <form onSubmit={handleMarkAttendance} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      What work did you complete today? * (Required)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={attendanceWorkDone}
                      onChange={(e) => {
                        setAttendanceWorkDone(e.target.value);
                        setAttendanceError("");
                      }}
                      placeholder="e.g. Calibrated the 15L fluidics pump assembly, tested pressure threshold alarms, updated patient perfusion flow charts..."
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none placeholder:text-slate-600"
                    />
                  </div>

                  {attendanceError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{attendanceError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer shadow-lg shadow-[#7FBFA0]/20 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Attendance
                  </button>
                </form>
              </div>

              {/* Attendance Records Table */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Attendance History ({attendanceLogs.length})
                </h3>

                {attendanceLogs.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-xs text-slate-500">
                    No attendance records logged yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {attendanceLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 rounded-xl border border-white/10 bg-[#0E1213] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{log.memberName}</span>
                            <span className="text-[10px] font-mono text-[#7FBFA0]">({log.date} at {log.time})</span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans">{log.workDone}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/20 self-start sm:self-center font-bold">
                          PRESENT
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 9: TARGETS & TASKS                               */}
          {/* ==================================================== */}
          {activeTab === "targets" && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white font-display">Target Assignments & Milestones</h2>
                <p className="text-xs text-slate-400">
                  Admins can assign targets to each other with durations and descriptions. When completed, submit descriptions and file deliverables.
                </p>
              </div>

              {/* Assign New Target Form */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0E1213] space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#7FBFA0]" />
                  Assign New Target to Team Member
                </h3>

                <form onSubmit={handleAssignTarget} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Target Title *</label>
                      <input
                        type="text"
                        required
                        value={targetTitle}
                        onChange={(e) => setTargetTitle(e.target.value)}
                        placeholder="e.g. Complete 15L Pressure Sensor PCB Schematics"
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Assign To Admin *</label>
                      <select
                        required
                        value={targetAssigneeId}
                        onChange={(e) => setTargetAssigneeId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                      >
                        <option value="">-- Select Team Member --</option>
                        {teamMembers.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} ({m.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Duration & Deadline</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={targetDuration}
                          onChange={(e) => setTargetDuration(e.target.value)}
                          placeholder="3 Days"
                          className="w-full px-2.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none font-mono"
                        />
                        <input
                          type="date"
                          value={targetDeadline}
                          onChange={(e) => setTargetDeadline(e.target.value)}
                          className="w-full px-2 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Description & Target Objectives *</label>
                    <textarea
                      rows={2}
                      required
                      value={targetDescription}
                      onChange={(e) => setTargetDescription(e.target.value)}
                      placeholder="Specify precision criteria, deliverables, tolerances, or file expectations..."
                      className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer shadow-lg shadow-[#7FBFA0]/20"
                  >
                    Assign Target
                  </button>
                </form>
              </div>

              {/* Targets List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Target Tasks & Milestones ({targets.length})
                </h3>

                {targets.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center text-xs text-slate-500">
                    No targets assigned yet. Assign a target using the form above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {targets.map((task) => {
                      const isCompleted = task.status === "Completed";
                      return (
                        <div
                          key={task.id}
                          className={`p-5 rounded-2xl border ${
                            isCompleted ? "border-green-500/30 bg-green-500/[0.02]" : "border-white/10 bg-[#0E1213]"
                          } flex flex-col justify-between space-y-4 shadow-lg`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-[#7FBFA0] font-bold">
                                Assigned by {task.assignedByName}
                              </span>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                  isCompleted
                                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                                    : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                                }`}
                              >
                                {task.status}
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-white font-display">{task.title}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>

                            <div className="flex flex-wrap gap-3 pt-2 text-[11px] font-mono text-slate-400">
                              <span>Assignee: <strong className="text-white">{task.assignedToName}</strong></span>
                              <span>Duration: {task.duration}</span>
                              <span>Deadline: {task.deadline}</span>
                            </div>

                            {/* Completed Deliverables Note */}
                            {isCompleted && task.completionNote && (
                              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-1">
                                <span className="text-[10px] font-mono text-green-400 uppercase font-bold block">
                                  Completion Report:
                                </span>
                                <p>{task.completionNote}</p>
                                {task.completionFileData && (
                                  <a
                                    href={task.completionFileData}
                                    download={task.completionFileName || "deliverable"}
                                    className="inline-flex items-center gap-1.5 text-xs text-[#7FBFA0] hover:underline pt-1"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    Download Deliverable: {task.completionFileName}
                                  </a>
                                )}
                              </div>
                            )}
                          </div>

                          {!isCompleted && (
                            <div className="pt-3 border-t border-white/5 flex justify-end">
                              <button
                                onClick={() => {
                                  setCompletingTarget(task);
                                  setCompleteNote("");
                                  setCompleteFile(null);
                                }}
                                className="px-4 py-2 rounded-xl bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#97d4b6] transition-all cursor-pointer flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Submit Work & Mark Complete
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 10: ANALYTICS & TEAM PROGRESS                    */}
          {/* ==================================================== */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white font-display">System Analytics & Team Progress</h2>
                <p className="text-xs text-slate-400">
                  Comprehensive telemetry, store performance, internal research count, and admin activity metrics.
                </p>
              </div>

              {/* High-level KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 rounded-xl border border-white/10 bg-[#0E1213]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Store Products</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {siteContent.store?.products?.length || 0}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-[#0E1213]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Total Orders</span>
                  <div className="text-2xl font-bold font-mono text-[#7FBFA0] mt-1">{orders.length}</div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-[#0E1213]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">R&D Documents</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">{rdItems.length}</div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-[#0E1213]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Active Admins</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">{teamMembers.length}</div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-[#0E1213]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Attendance Logs</span>
                  <div className="text-2xl font-bold font-mono text-[#7FBFA0] mt-1">{attendanceLogs.length}</div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-[#0E1213]">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Targets Done</span>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {targets.filter((t) => t.status === "Completed").length} / {targets.length}
                  </div>
                </div>
              </div>

              {/* Team Progress Table */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Admin Performance & Activity Matrix
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0E1213]">
                  <table className="w-full min-w-[650px] text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 font-mono text-slate-400">
                      <tr>
                        <th className="p-3.5">Admin Name</th>
                        <th className="p-3.5">Role & Dept</th>
                        <th className="p-3.5">Targets Assigned</th>
                        <th className="p-3.5">Completed</th>
                        <th className="p-3.5">R&D Submissions</th>
                        <th className="p-3.5">Attendance Days</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {teamMembers.map((m) => {
                        const mTargets = targets.filter(
                          (t) => t.assignedToId === m.id || t.assignedToName === m.name
                        );
                        const mCompleted = mTargets.filter((t) => t.status === "Completed").length;
                        const mRd = rdItems.filter((r) => r.authorName === m.name || r.authorId === m.id).length;
                        const mAtt = attendanceLogs.filter(
                          (a) => a.memberName === m.name || a.passkey === m.passkey
                        ).length;

                        return (
                          <tr key={m.id} className="hover:bg-white/[0.02]">
                            <td className="p-3.5 font-bold text-white flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: m.avatarColor || "#7FBFA0" }}
                              />
                              {m.name}
                            </td>
                            <td className="p-3.5 text-slate-400">
                              {m.role} • {m.department}
                            </td>
                            <td className="p-3.5 font-mono text-slate-300">{mTargets.length}</td>
                            <td className="p-3.5 font-mono text-[#7FBFA0] font-bold">{mCompleted}</td>
                            <td className="p-3.5 font-mono text-white">{mRd}</td>
                            <td className="p-3.5 font-mono text-white">{mAtt}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/20">
                                ACTIVE
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================== */}
      {/* MODAL 1: EDIT / CREATE PRODUCT                       */}
      {/* ==================================================== */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0C0F12] p-5 sm:p-6 shadow-2xl max-h-[90dvh] overflow-y-auto my-auto"
            >
              <h3 className="text-lg font-bold text-white font-display mb-4">
                {isNewProduct ? "Add New Hardware Product" : "Edit Hardware Product"}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="e.g. Ananta Preserv-1 (10L)"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      placeholder="PRECISION FLUIDICS"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Price (INR ₹) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingProduct.tagline}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                    placeholder="Automated clinical mortuary embalming system"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={editingProduct.imageUrl}
                    onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                    placeholder="/embalming_machine.jpg"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="stockCheck"
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="rounded text-[#7FBFA0] focus:ring-[#7FBFA0]"
                  />
                  <label htmlFor="stockCheck" className="text-xs font-mono text-white">
                    In Stock (Commercial procurement open)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MODAL 2: EDIT / CREATE PATENT                        */}
      {/* ==================================================== */}
      <AnimatePresence>
        {editingPatent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0C0F12] p-5 sm:p-6 shadow-2xl max-h-[90dvh] overflow-y-auto my-auto"
            >
              <h3 className="text-lg font-bold text-white font-display mb-4">
                {isNewPatent ? "Add New Patent Seal" : "Edit Patent Seal"}
              </h3>

              <form onSubmit={handleSavePatent} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPatent.title}
                    onChange={(e) => setEditingPatent({ ...editingPatent, title: e.target.value })}
                    placeholder="e.g. IN Patent Filings"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingPatent.category}
                      onChange={(e) => setEditingPatent({ ...editingPatent, category: e.target.value })}
                      placeholder="INTELLECTUAL PROPERTY"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Organization</label>
                    <input
                      type="text"
                      value={editingPatent.org}
                      onChange={(e) => setEditingPatent({ ...editingPatent, org: e.target.value })}
                      placeholder="Indian Patent Office (IPO)"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Tag / Status Code</label>
                  <input
                    type="text"
                    value={editingPatent.tag}
                    onChange={(e) => setEditingPatent({ ...editingPatent, tag: e.target.value })}
                    placeholder="REG_IN // FILED"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingPatent.desc}
                    onChange={(e) => setEditingPatent({ ...editingPatent, desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setEditingPatent(null)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider"
                  >
                    Save Patent
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MODAL 3: COMPLETE TARGET SUBMISSION                  */}
      {/* ==================================================== */}
      <AnimatePresence>
        {completingTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0C0F12] p-5 sm:p-6 shadow-2xl max-h-[90dvh] overflow-y-auto my-auto"
            >
              <h3 className="text-lg font-bold text-white font-display mb-2">Complete Target Milestone</h3>
              <p className="text-xs text-slate-400 mb-4">
                Submitting deliverables for: <strong className="text-white">{completingTarget.title}</strong>
              </p>

              <form onSubmit={handleCompleteTarget} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Completion Work Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={completeNote}
                    onChange={(e) => setCompleteNote(e.target.value)}
                    placeholder="Describe how the objective was accomplished, validation tests passed, or results..."
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:border-[#7FBFA0] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Upload Deliverable File (Optional: All file types supported)
                  </label>
                  <input
                    type="file"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const b64 = await fileToBase64(file);
                        setCompleteFile({ name: file.name, data: b64 });
                      }
                    }}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-[#7FBFA0]/20 file:text-[#7FBFA0]"
                  />
                  {completeFile && (
                    <div className="mt-1 text-xs font-mono text-[#7FBFA0]">✓ {completeFile.name}</div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setCompletingTarget(null)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#7FBFA0] text-black font-bold text-xs uppercase tracking-wider"
                  >
                    Mark Target as Complete
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
