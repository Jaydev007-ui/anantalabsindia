"use client";

import { useState, useEffect } from "react";
import { Lock, FileText, Trash2, Search, SlidersHorizontal, LogOut, CheckCircle, Mail, MessageSquare, Calculator, Download, RefreshCw, Users, ShieldAlert, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UnifyEngine from "@/components/ui/UnifyEngine";

type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  organization: string;
  address: string;
  capacity: "10L" | "15L";
  quantity: number;
  comments?: string;
  status: "Pending" | "Processing" | "Shipped" | "Completed" | "Cancelled";
  date: string;
  unitPrice?: number;
  totalPrice?: number;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization: string;
  message: string;
  status: "Unread" | "Read" | "Replied";
  date: string;
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"orders" | "inquiries" | "calculator" | "staff" | "threats">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [staffUsers, setStaffUsers] = useState<any[]>([]);
  const [threatLogs, setThreatLogs] = useState<any[]>([]);
  const [userPermissions, setUserPermissions] = useState<{
    is_admin: boolean;
    access_orders: boolean;
    access_inquiries: boolean;
  } | null>(null);

  // Staff creation form states
  const [newStaffUsername, setNewStaffUsername] = useState("");
  const [newStaffPassword, setNewStaffPassword] = useState("");
  const [newStaffAccessOrders, setNewStaffAccessOrders] = useState(true);
  const [newStaffAccessInquiries, setNewStaffAccessInquiries] = useState(true);

  // Manual Calculator States
  const [calc10LQty, setCalc10LQty] = useState<number>(5);
  const [calc15LQty, setCalc15LQty] = useState<number>(3);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dbProvider, setDbProvider] = useState("Checking...");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Load database items from Next.js server APIs
  const loadData = async () => {
    try {
      const oRes = await fetch("/api/orders", { cache: "no-store" });
      const oData = await oRes.json();
      setOrders(Array.isArray(oData) ? oData : []);

      const iRes = await fetch("/api/inquiries", { cache: "no-store" });
      const iData = await iRes.json();
      setInquiries(Array.isArray(iData) ? iData : []);

      const sRes = await fetch("/api/staff", { cache: "no-store" });
      const sData = await sRes.json();
      setStaffUsers(Array.isArray(sData) ? sData : []);

      const tRes = await fetch("/api/threats", { cache: "no-store" });
      const tData = await tRes.json();
      setThreatLogs(Array.isArray(tData) ? tData : []);

      const dbRes = await fetch("/api/db-status", { cache: "no-store" });
      const dbData = await dbRes.json();
      setDbProvider(dbData.provider || "ExtendsClass (Cloud Fallback)");
    } catch (e) {
      console.error("Failed to load records from server APIs", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "ananta_admin") {
      setIsLoggedIn(true);
      setUserPermissions({ is_admin: true, access_orders: true, access_inquiries: true });
      setLoginError("");
      setActiveTab("orders");
    } else {
      const staffMatch = staffUsers.find(
        (u) => u.username === username && u.password === password
      );
      if (staffMatch) {
        setIsLoggedIn(true);
        const p = {
          is_admin: false,
          access_orders: staffMatch.access_orders === 1 || staffMatch.access_orders === true,
          access_inquiries: staffMatch.access_inquiries === 1 || staffMatch.access_inquiries === true
        };
        setUserPermissions(p);
        setLoginError("");
        if (p.access_orders) {
          setActiveTab("orders");
        } else {
          setActiveTab("inquiries");
        }
      } else {
        setLoginError("Invalid username or password");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPermissions(null);
    setUsername("");
    setPassword("");
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffUsername || !newStaffPassword) return;
    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newStaffUsername,
          password: newStaffPassword,
          access_orders: newStaffAccessOrders,
          access_inquiries: newStaffAccessInquiries
        })
      });
      if (res.ok) {
        setNewStaffUsername("");
        setNewStaffPassword("");
        await loadData();
      }
    } catch (err) {
      console.error("Failed to add staff member:", err);
    }
  };

  const handleDeleteStaff = async (uname: string) => {
    if (confirm(`Remove access permissions for staff user: ${uname}?`)) {
      try {
        const res = await fetch(`/api/staff?username=${uname}`, { method: "DELETE" });
        if (res.ok) {
          await loadData();
        }
      } catch (err) {
        console.error("Failed to delete staff user:", err);
      }
    }
  };

  // Requisitions PUT & DELETE operations
  const handleOrderStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    
    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
    } catch (e) {
      console.error("Failed to update status on server", e);
    }

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleOrderDelete = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order file?")) {
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      
      try {
        await fetch(`/api/orders?id=${orderId}`, {
          method: "DELETE",
        });
      } catch (e) {
        console.error("Failed to delete order from server", e);
      }
    }
  };

  // Inquiries PUT & DELETE operations
  const handleInquiryStatusChange = async (inqId: string, newStatus: Inquiry["status"]) => {
    const updated = inquiries.map((i) => (i.id === inqId ? { ...i, status: newStatus } : i));
    setInquiries(updated);
    
    try {
      await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inqId, status: newStatus }),
      });
    } catch (e) {
      console.error("Failed to update inquiry status on server", e);
    }

    if (selectedInquiry && selectedInquiry.id === inqId) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleInquiryDelete = async (inqId: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      const updated = inquiries.filter((i) => i.id !== inqId);
      setInquiries(updated);
      
      try {
        await fetch(`/api/inquiries?id=${inqId}`, {
          method: "DELETE",
        });
      } catch (e) {
        console.error("Failed to delete inquiry from server", e);
      }
    }
  };

  // Filter listings
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInquiries = inquiries.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;
  const totalInquiries = inquiries.length;
  const unreadInquiries = inquiries.filter((i) => i.status === "Unread").length;

  const totalValuation = orders.reduce((acc, curr) => {
    const val = curr.totalPrice || curr.quantity * (curr.capacity === "15L" ? 27000 : 25000);
    return acc + val;
  }, 0);

  // Manual calculator values
  const calc10LRevenue = calc10LQty * 25000;
  const calc15LRevenue = calc15LQty * 27000;
  const calcTotalQty = calc10LQty + calc15LQty;
  const calcTotalRevenue = calc10LRevenue + calc15LRevenue;

  // Format Exporter Handlers
  const exportCalcXLS = () => {
    let content = "\uFEFF";
    content += "Ananta Labs India - Sales & Revenue Calculator Report\r\n";
    content += `Generated on: ${new Date().toLocaleString()}\r\n\r\n`;
    content += "Metric,Quantity,Unit Price (INR),Total Revenue (INR)\r\n";
    content += `10L Tank Models,${calc10LQty},25000,${calc10LRevenue}\r\n`;
    content += `15L Tank Models,${calc15LQty},27000,${calc15LRevenue}\r\n`;
    content += `Combined Projections,${calcTotalQty},-,${calcTotalRevenue}\r\n`;

    const blob = new Blob([content], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ananta_Revenue_Projections.xls");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCalcDOC = () => {
    let content = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>`;
    content += `<head><title>Revenue Projections Report</title><style>body { font-family: sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 10px; text-align: left; } th { background-color: #f5f5f5; }</style></head>`;
    content += `<body>`;
    content += `<h2>Ananta Labs India - Sales & Revenue Calculator Report</h2>`;
    content += `<p>Generated on: ${new Date().toLocaleString()}</p>`;
    content += `<table>`;
    content += `<tr><th>Model Specification</th><th>Quantity Count</th><th>Unit Price</th><th>Aggregate Revenue</th></tr>`;
    content += `<tr><td>10L Preservation Machine</td><td>${calc10LQty} units</td><td>INR 25,000</td><td>INR ${calc10LRevenue.toLocaleString()}</td></tr>`;
    content += `<tr><td>15L Preservation Machine</td><td>${calc15LQty} units</td><td>INR 27,000</td><td>INR ${calc15LRevenue.toLocaleString()}</td></tr>`;
    content += `<tr style="font-weight: bold; background-color: #f9f9f9;"><td>Cumulative Summary</td><td>${calcTotalQty} units</td><td>-</td><td>INR ${calcTotalRevenue.toLocaleString()}</td></tr>`;
    content += `</table></body></html>`;

    const blob = new Blob([content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ananta_Revenue_Projections.doc");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCalcPDF = () => {
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    printWin.document.write(`<html><head><title>Revenue Calculator Report</title><style>body { font-family: monospace; padding: 40px; background-color: #ffffff; color: #000000; } h1 { border-bottom: 2px solid #000; padding-bottom: 10px; font-size: 18px; text-transform: uppercase; } table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { border: 1px solid #000; padding: 10px; text-align: left; font-size: 11px; } th { background-color: #f0f0f0; }</style></head><body>`);
    printWin.document.write(`<h1>ANANTA LABS - PROSPECTIVE REVENUE REPORT</h1>`);
    printWin.document.write(`<p>Generated on: ${new Date().toLocaleString()}</p>`);
    printWin.document.write(`<table>`);
    printWin.document.write(`<tr><th>Preservation Spec</th><th>Quantity</th><th>Unit Price (INR)</th><th>Total Sum (INR)</th></tr>`);
    printWin.document.write(`<tr><td>10L Fluidics Tank</td><td>${calc10LQty}</td><td>25,000</td><td>${calc10LRevenue.toLocaleString()}</td></tr>`);
    printWin.document.write(`<tr><td>15L Fluidics Tank</td><td>${calc15LQty}</td><td>27,000</td><td>${calc15LRevenue.toLocaleString()}</td></tr>`);
    printWin.document.write(`<tr style="font-weight: bold;"><td>Combined Projections</td><td>${calcTotalQty}</td><td>-</td><td>${calcTotalRevenue.toLocaleString()}</td></tr>`);
    printWin.document.write(`</table></body></html>`);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  // Orders Exporters
  const exportOrdersXLS = () => {
    let content = "\uFEFF";
    content += "Ananta Labs India - Machine Orders Database Export\r\n";
    content += `Export Date: ${new Date().toLocaleString()}\r\n\r\n`;
    content += "Order ID,Customer Name,Organization,Date,Specification,Quantity,Valuation (INR),Status\r\n";
    orders.forEach((o) => {
      const price = o.totalPrice || o.quantity * (o.capacity === "15L" ? 27000 : 25000);
      content += `"${o.id}","${o.customerName}","${o.organization}","${new Date(o.date).toLocaleDateString()}","${o.capacity}",${o.quantity},${price},"${o.status}"\r\n`;
    });

    const blob = new Blob([content], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ananta_Orders_Database.xls");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportOrdersDOC = () => {
    let content = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>`;
    content += `<head><title>Orders Registry Export</title><style>body { font-family: Arial, sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; font-size: 11px; } th { background-color: #f7f7f7; text-transform: uppercase; }</style></head>`;
    content += `<body>`;
    content += `<h2>Ananta Labs India - Machine Orders Registry</h2>`;
    content += `<p>Database Export Date: ${new Date().toLocaleString()}</p>`;
    content += `<table>`;
    content += `<tr><th>Order ID</th><th>Customer Name</th><th>Institution</th><th>Spec</th><th>Qty</th><th>Valuation</th><th>Status</th></tr>`;
    orders.forEach((o) => {
      const price = o.totalPrice || o.quantity * (o.capacity === "15L" ? 27000 : 25000);
      content += `<tr><td>${o.id}</td><td>${o.customerName}</td><td>${o.organization}</td><td>${o.capacity}</td><td>${o.quantity}</td><td>INR ${price.toLocaleString()}</td><td>${o.status}</td></tr>`;
    });
    content += `</table></body></html>`;

    const blob = new Blob([content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ananta_Orders_Database.doc");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportOrdersPDF = () => {
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    printWin.document.write(`<html><head><title>Orders Registry Report</title><style>body { font-family: monospace; padding: 40px; background-color: #ffffff; color: #000000; } h1 { border-bottom: 2px solid #000; padding-bottom: 10px; font-size: 16px; } table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 10px; } th { background-color: #f2f2f2; }</style></head><body>`);
    printWin.document.write(`<h1>ANANTA LABS - CLIENT ORDERS REGISTRY</h1>`);
    printWin.document.write(`<p>Export Timestamp: ${new Date().toLocaleString()}</p>`);
    printWin.document.write(`<table>`);
    printWin.document.write(`<tr><th>Order ID</th><th>Client / Org</th><th>Date</th><th>Model</th><th>Qty</th><th>Valuation</th><th>Status</th></tr>`);
    orders.forEach((o) => {
      const price = o.totalPrice || o.quantity * (o.capacity === "15L" ? 27000 : 25000);
      printWin.document.write(`<tr><td>${o.id}</td><td>${o.customerName}<br/>(${o.organization})</td><td>${new Date(o.date).toLocaleDateString()}</td><td>${o.capacity}</td><td>${o.quantity}</td><td>${price.toLocaleString()}</td><td>${o.status}</td></tr>`);
    });
    printWin.document.write(`</table></body></html>`);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center relative overflow-hidden font-display px-6">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

        <div className="relative w-full max-w-sm glass-card bg-transparent border border-white/5 rounded-2xl p-8 shadow-sm">
          <div className="text-center space-y-3 mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 border border-primary/10 text-primary">
              <Lock className="h-5.5 w-5.5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-zinc-950 uppercase tracking-widest leading-none">
                ANANTA LABS
              </h2>
              <span className="text-[8px] font-sans text-zinc-500 uppercase tracking-[0.3em] font-semibold mt-1 block">
                Security Access Portal
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                Username ID
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0B0F19] px-4 py-2.5 font-sans text-xs text-white focus:outline-none focus:border-primary/30 border border-white/10"
                placeholder="Enter admin username"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                Access Code
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0B0F19] px-4 py-2.5 font-sans text-xs text-white focus:outline-none focus:border-primary/30 border border-white/10"
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <span className="text-[10px] text-red-500 font-mono block text-center bg-red-955 border border-red-950 rounded py-1.5">
                {loginError}
              </span>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors cursor-pointer shadow-sm"
            >
              UNLOCK CONSOLE
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
              CREDENTIALS: admin / ananta_admin
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-slate-100 font-sans p-6 sm:p-10 relative">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#121212] overflow-hidden shadow-sm">
              <img src="/logo.jpg?v=2" alt="Ananta Labs" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white uppercase tracking-widest leading-none">
                Ananta Admin Workspace
              </h1>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold block mt-1">
                Clinical Telemetry Requisitions Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#121212] px-3.5 py-2.5 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {dbProvider}
            </div>

            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#121212] px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-white/5 shadow-sm cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#121212] px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-white/5 shadow-sm cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Panels */}
        {/* Dashboard Statistics Panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {userPermissions?.access_orders && (
            <>
              <div className="glass-card bg-transparent rounded-2xl p-5 border border-white/5 shadow-sm">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Total Requisitions</span>
                <span className="block font-display text-2xl font-black text-white mt-2 font-mono">{totalOrders}</span>
              </div>

              <div className="glass-card bg-transparent rounded-2xl p-5 border border-white/5 shadow-sm">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Total Pipeline Value</span>
                <span className="block font-display text-2xl font-black text-white mt-2 font-mono">₹{totalValuation.toLocaleString()}</span>
              </div>
            </>
          )}

          {userPermissions?.access_inquiries && (
            <>
              <div className="glass-card bg-transparent rounded-2xl p-5 border border-white/5 shadow-sm">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Secure Inquiries</span>
                <span className="block font-display text-2xl font-black text-white mt-2 font-mono">{totalInquiries}</span>
              </div>

              <div className="glass-card bg-transparent rounded-2xl p-5 border border-white/5 shadow-sm">
                <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">Unread Messages</span>
                <span className="block font-display text-2xl font-black text-[#FF3B30] mt-2 font-mono">{unreadInquiries}</span>
              </div>
            </>
          )}
        </div>

        {/* Console Tab Toggles */}
        <div className="flex border-b border-white/5">
          {userPermissions?.access_orders && (
            <button
              onClick={() => {
                setActiveTab("orders");
                setStatusFilter("All");
                setSearchQuery("");
              }}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                activeTab === "orders" ? "border-white text-white" : "border-transparent text-slate-500 hover:text-white"
              }`}
            >
              <Mail className="h-4 w-4" />
              Machine Orders ({orders.length})
            </button>
          )}
          {userPermissions?.access_inquiries && (
            <button
              onClick={() => {
                setActiveTab("inquiries");
                setStatusFilter("All");
                setSearchQuery("");
              }}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                activeTab === "inquiries" ? "border-white text-white" : "border-transparent text-slate-500 hover:text-white"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Secure Inquiries ({inquiries.length})
            </button>
          )}
          {userPermissions?.access_orders && (
            <button
              onClick={() => {
                setActiveTab("calculator");
                setSearchQuery("");
              }}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                activeTab === "calculator" ? "border-white text-white" : "border-transparent text-slate-500 hover:text-white"
              }`}
            >
              <Calculator className="h-4 w-4" />
              Revenue Calculator
            </button>
          )}
          {userPermissions?.is_admin && (
            <>
              <button
                onClick={() => {
                  setActiveTab("staff");
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  activeTab === "staff" ? "border-white text-white" : "border-transparent text-slate-500 hover:text-white"
                }`}
              >
                <Users className="h-4 w-4" />
                Staff Access ({staffUsers.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab("threats");
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  activeTab === "threats" ? "border-white text-white" : "border-transparent text-slate-500 hover:text-white"
                }`}
              >
                <ShieldAlert className="h-4 w-4" />
                Threat Log ({threatLogs.length})
              </button>
            </>
          )}
        </div>

        {/* Search, Filter & Global Export Toolbar */}
        {(activeTab === "orders" || activeTab === "inquiries") && (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#121212] rounded-xl border border-white/5 p-4 shadow-sm">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#0B0F19] pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none border border-white/10"
                placeholder={activeTab === "orders" ? "Search orders by ID, Name, or Hospital..." : "Search inquiries by ID, Sender, or Text..."}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {activeTab === "orders" && (
                <div className="flex items-center border border-white/10 rounded-lg bg-[#0B0F19] p-1 gap-1 text-[10px] font-mono">
                  <span className="px-2 text-slate-500 uppercase tracking-widest">Database:</span>
                  <button onClick={exportOrdersPDF} className="p-1 px-2 hover:bg-white/5 rounded text-white flex items-center gap-1 cursor-pointer">
                    PDF
                  </button>
                  <button onClick={exportOrdersXLS} className="p-1 px-2 hover:bg-white/5 rounded text-white flex items-center gap-1 cursor-pointer">
                    XLS
                  </button>
                  <button onClick={exportOrdersDOC} className="p-1 px-2 hover:bg-white/5 rounded text-white flex items-center gap-1 cursor-pointer">
                    DOC
                  </button>
                </div>
              )}

              <SlidersHorizontal className="h-4 w-4 text-slate-500 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#0B0F19] px-3 py-2 text-xs text-slate-300 focus:outline-none border border-white/10"
              >
                {activeTab === "orders" ? (
                  <>
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </>
                ) : (
                  <>
                    <option value="All">All Inquiries</option>
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                  </>
                )}
              </select>
            </div>
          </div>
        )}

        {/* Database Tables and Calculator Canvas */}
        <div className="glass-card bg-transparent border border-white/5 rounded-2xl overflow-hidden shadow-sm">
          {activeTab === "orders" ? (
            /* Orders Requisitions Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0B0F19] border-b border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <th className="p-4 pl-6">Order ID</th>
                    <th className="p-4">Customer / Organization</th>
                    <th className="p-4">Placement Date</th>
                    <th className="p-4 text-center">Spec</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Valuation</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-sans text-slate-300">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-10 text-center text-slate-500 font-mono">
                        NO ACTIVE TELEMETRY REQUISITIONS FOUND.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const price = ord.totalPrice || ord.quantity * (ord.capacity === "15L" ? 27000 : 25000);
                      return (
                        <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 pl-6 font-mono font-bold text-[#0088FF]">{ord.id}</td>
                          <td className="p-4">
                            <span className="block font-bold text-white">{ord.customerName}</span>
                            <span className="block text-[10px] text-slate-500">{ord.organization}</span>
                          </td>
                          <td className="p-4 text-slate-500 font-mono">{new Date(ord.date).toLocaleString()}</td>
                          <td className="p-4 text-center font-bold font-mono text-white">{ord.capacity}</td>
                          <td className="p-4 text-center font-mono text-white font-bold">{ord.quantity}</td>
                          <td className="p-4 text-right font-mono font-bold text-white">₹{price.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono border uppercase font-bold ${
                              ord.status === "Pending" && "border-amber-500/20 bg-amber-500/5 text-amber-500"
                            } ${
                              ord.status === "Processing" && "border-blue-500/20 bg-blue-500/5 text-blue-400"
                            } ${
                              ord.status === "Shipped" && "border-indigo-500/20 bg-indigo-500/5 text-indigo-400"
                            } ${
                              ord.status === "Completed" && "border-green-500/20 bg-green-500/5 text-green-400"
                            } ${
                              ord.status === "Cancelled" && "border-red-500/20 bg-red-500/5 text-red-400"
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-4 text-right pr-6 flex items-center justify-end gap-3 h-full">
                            <select
                              value={ord.status}
                              onChange={(e) => handleOrderStatusChange(ord.id, e.target.value as any)}
                              className="rounded border border-white/10 bg-[#0B0F19] px-2 py-1 text-[10px] text-slate-350 focus:outline-none border border-white/10"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="h-7 w-7 rounded bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white shadow-sm cursor-pointer"
                              title="View Details"
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleOrderDelete(ord.id)}
                              className="h-7 w-7 rounded bg-red-500/5 border border-red-200/60 flex items-center justify-center text-red-400 hover:bg-red-500/10 shadow-sm cursor-pointer"
                              title="Delete Requisition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          ) : activeTab === "inquiries" ? (
            /* Secure Inquiries Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0B0F19] border-b border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <th className="p-4 pl-6">Inquiry ID</th>
                    <th className="p-4">Sender / Organization</th>
                    <th className="p-4">Submission Date</th>
                    <th className="p-4">Message Snippet</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-sans text-slate-300">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-slate-500 font-mono">
                        NO ACTIVE SECURE INQUIRIES FOUND.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 pl-6 font-mono font-bold text-white">{inq.id}</td>
                        <td className="p-4">
                          <span className="block font-bold text-white">{inq.name}</span>
                          <span className="block text-[10px] text-slate-500">{inq.organization}</span>
                        </td>
                        <td className="p-4 text-slate-500 font-mono">{new Date(inq.date).toLocaleString()}</td>
                        <td className="p-4 max-w-[240px] truncate text-slate-550">{inq.message}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-mono border uppercase font-bold ${
                            inq.status === "Unread" && "border-red-500/20 bg-red-500/5 text-red-400"
                          } ${
                            inq.status === "Read" && "border-blue-500/20 bg-blue-500/5 text-blue-400"
                          } ${
                            inq.status === "Replied" && "border-green-500/20 bg-green-500/5 text-green-400"
                          }`}>
                            {inq.status}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6 flex items-center justify-end gap-3 h-full">
                          <select
                            value={inq.status}
                            onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                            className="rounded border border-white/10 bg-[#0B0F19] px-2 py-1 text-[10px] text-slate-350 focus:outline-none border border-white/10"
                          >
                            <option value="Unread">Unread</option>
                            <option value="Read">Read</option>
                            <option value="Replied">Replied</option>
                          </select>
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="h-7 w-7 rounded bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white shadow-sm cursor-pointer"
                            title="View Message Details"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleInquiryDelete(inq.id)}
                            className="h-7 w-7 rounded bg-red-500/5 border border-red-200/60 flex items-center justify-center text-red-400 hover:bg-red-550/10 shadow-sm cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : activeTab === "calculator" ? (
            /* Revenue Calculator Screen */
            <div className="p-6 md:p-8 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Interactive Sales & Revenue calculator</h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">Compute custom sales target scenarios and download clinical pipeline logs.</p>
                </div>
                
                {/* Document Exporters */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Export Report:</span>
                  <button
                    onClick={exportCalcPDF}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer shadow-sm"
                  >
                    <Download className="h-3 w-3" />
                    PDF
                  </button>
                  <button
                    onClick={exportCalcXLS}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer shadow-sm"
                  >
                    <Download className="h-3 w-3" />
                    XLS (Excel)
                  </button>
                  <button
                    onClick={exportCalcDOC}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer shadow-sm"
                  >
                    <Download className="h-3 w-3" />
                    Word DOC
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Inputs card */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/2 space-y-6">
                  <h4 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    Manual Sales Parameters
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        <span>10L Reservoir Units Count</span>
                        <span className="text-[#0088FF]">₹25,000 / unit</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={calc10LQty}
                        onChange={(e) => setCalc10LQty(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-lg border border-[#0B0F19] bg-[#0B0F19] px-4 py-3 font-sans text-xs text-white focus:outline-none focus:border-white/30 border border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        <span>15L Reservoir Units Count</span>
                        <span className="text-[#0088FF]">₹27,000 / unit</span>
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={calc15LQty}
                        onChange={(e) => setCalc15LQty(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full rounded-lg border border-[#0B0F19] bg-[#0B0F19] px-4 py-3 font-sans text-xs text-white focus:outline-none focus:border-white/30 border border-white/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Outputs card */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#121212] space-y-6">
                  <h4 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    Calculator Projections Summary
                  </h4>
                  
                  <div className="space-y-4 text-xs font-sans text-slate-350">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span>Total 10L Model Revenue:</span>
                      <span className="font-mono font-bold text-white">₹{calc10LRevenue.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span>Total 15L Model Revenue:</span>
                      <span className="font-mono font-bold text-white">₹{calc15LRevenue.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span>Combined Unit Count:</span>
                      <span className="font-mono font-bold text-white">{calcTotalQty} units</span>
                    </div>

                    <div className="flex justify-between items-center pt-4 text-base font-bold text-white">
                      <span>Total Cumulative Revenue:</span>
                      <span className="font-mono text-white text-xl">₹{calcTotalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : activeTab === "staff" ? (
            /* Staff User Management Screen */
            <div className="p-6 md:p-8 space-y-8 text-slate-300">
              <div>
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Unify Engine: Staff Accounts Generator</h3>
                <p className="text-xs text-slate-500 font-sans mt-1">Provision staff access keys and restrict role-based read/write access.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generation Form */}
                <form onSubmit={handleCreateStaff} className="glass-card border border-white/5 rounded-2xl p-6 bg-[#0B0F19]/50 space-y-4">
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">Generate Credentials</h4>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Username ID</label>
                    <input
                      type="text"
                      required
                      value={newStaffUsername}
                      onChange={(e) => setNewStaffUsername(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#0B0F19] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary/30"
                      placeholder="e.g. staff_reception"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Access Password</label>
                    <input
                      type="password"
                      required
                      value={newStaffPassword}
                      onChange={(e) => setNewStaffPassword(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#0B0F19] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary/30"
                      placeholder="Enter staff password"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Configure Scope Access</span>
                    <label className="flex items-center gap-2.5 text-xs text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStaffAccessOrders}
                        onChange={(e) => setNewStaffAccessOrders(e.target.checked)}
                        className="rounded border-white/10 bg-transparent text-primary focus:ring-0 focus:ring-offset-0"
                      />
                      Access Machine Orders
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStaffAccessInquiries}
                        onChange={(e) => setNewStaffAccessInquiries(e.target.checked)}
                        className="rounded border-white/10 bg-transparent text-primary focus:ring-0 focus:ring-offset-0"
                      />
                      Access Secure Inquiries
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-white py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm mt-4"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Generate Access Keys
                  </button>
                </form>

                {/* Staff List Table */}
                <div className="lg:col-span-2 glass-card border border-white/5 rounded-2xl overflow-hidden bg-[#0B0F19]/20">
                  <div className="p-4 bg-[#0B0F19] border-b border-white/5 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0088FF]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Active Staff Members ({staffUsers.length})</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                          <th className="p-3 pl-4">Staff Username</th>
                          <th className="p-3">Password</th>
                          <th className="p-3 text-center">Orders Access</th>
                          <th className="p-3 text-center">Inquiries Access</th>
                          <th className="p-3 text-right pr-4">Revoke Keys</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs font-sans">
                        {staffUsers.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500 font-mono">
                              NO ACTIVE STAFF CREDENTIALS PROVISIONED.
                            </td>
                          </tr>
                        ) : (
                          staffUsers.map((user) => (
                            <tr key={user.username} className="hover:bg-white/5 transition-colors">
                              <td className="p-3 pl-4 font-mono font-bold text-white">{user.username}</td>
                              <td className="p-3 font-mono text-slate-500">••••••••</td>
                              <td className="p-3 text-center">
                                <span className={`inline-block h-2 w-2 rounded-full ${user.access_orders ? "bg-green-500" : "bg-red-500"}`} />
                              </td>
                              <td className="p-3 text-center">
                                <span className={`inline-block h-2 w-2 rounded-full ${user.access_inquiries ? "bg-green-500" : "bg-red-500"}`} />
                              </td>
                              <td className="p-3 text-right pr-4">
                                <button
                                  onClick={() => handleDeleteStaff(user.username)}
                                  className="h-7 w-7 rounded bg-red-500/5 border border-red-200/60 flex items-center justify-center text-red-400 hover:bg-red-550/10 shadow-sm cursor-pointer ml-auto"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Threats Monitoring Screen */
            <div className="p-6 md:p-8 space-y-8 text-slate-350">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <h3 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#EF4444]" />
                    Unify Threat Detection Dashboard
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">Real-time surveillance of network probes, code injection vectors, and inspection attempts.</p>
                </div>
                
                <div className="text-[10px] font-mono text-slate-400 border border-red-500/20 bg-red-500/5 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-red-500 animate-bounce" />
                  SHIELD ACTIVE: 24/7 ENFORCEMENT
                </div>
              </div>

              <div className="glass-card border border-white/5 rounded-2xl overflow-hidden bg-[#0B0F19]/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0B0F19] border-b border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        <th className="p-3.5 pl-6">Incident ID</th>
                        <th className="p-3.5">Threat Type</th>
                        <th className="p-3.5">Detection Time</th>
                        <th className="p-3.5">Source Node</th>
                        <th className="p-3.5 pr-6">Surveillance Details / Input Traces</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs font-sans text-slate-300">
                      {threatLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-slate-500 font-mono">
                            NO SECURITY ANOMALIES DETECTED. SYSTEM STATE: SECURE.
                          </td>
                        </tr>
                      ) : (
                        threatLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-3.5 pl-6 font-mono font-bold text-red-500">{log.id}</td>
                            <td className="p-3.5 font-bold text-white">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                {log.type}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-500 font-mono">{new Date(log.date).toLocaleString()}</td>
                            <td className="p-3.5 text-sky-400 font-mono">{log.source}</td>
                            <td className="p-3.5 font-mono text-[10px] text-amber-500 max-w-sm truncate pr-6" title={log.details}>
                              {log.details}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Requisition Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 m-auto h-fit w-full max-w-lg bg-[#0B0F19] rounded-2xl border border-white/5 shadow-2xl p-6 overflow-hidden space-y-6"
            >
              <div className="flex items-start justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Requisition Details</h3>
                  <span className="font-mono text-xs text-[#0088FF] font-bold mt-1 block">{selectedOrder.id}</span>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="h-8 w-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white cursor-pointer"
                >
                  <XIcon className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-4 text-left text-xs font-sans text-slate-350">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Customer Details</span>
                    <span className="block font-bold text-white mt-1">{selectedOrder.customerName}</span>
                    <span className="block text-slate-450 mt-0.5">{selectedOrder.email}</span>
                    <span className="block text-slate-450">{selectedOrder.phone}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Institution</span>
                    <span className="block font-bold text-white mt-1">{selectedOrder.organization}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Tank Capacity</span>
                    <span className="block font-bold text-white mt-1">{selectedOrder.capacity} model</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Quantity</span>
                    <span className="block font-bold text-white mt-1">{selectedOrder.quantity} units</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Total Price</span>
                    <span className="block font-bold text-white mt-1 font-mono">
                      ₹{(selectedOrder.totalPrice || selectedOrder.quantity * (selectedOrder.capacity === "15L" ? 27000 : 25000)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Shipping Address</span>
                  <p className="font-sans leading-relaxed text-slate-350">{selectedOrder.address}</p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Requisition Notes</span>
                  <p className="font-sans leading-relaxed text-slate-450 italic">
                    {selectedOrder.comments || "No custom instructions provided."}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 rounded-lg bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Dismiss Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 m-auto h-fit w-full max-w-lg bg-[#0B0F19] rounded-2xl border border-white/5 shadow-2xl p-6 overflow-hidden space-y-6"
            >
              <div className="flex items-start justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Inquiry Message</h3>
                  <span className="font-mono text-xs text-slate-500 font-bold mt-1 block">{selectedInquiry.id}</span>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="h-8 w-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white cursor-pointer"
                >
                  <XIcon className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-4 text-left text-xs font-sans text-slate-350">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Sender Details</span>
                    <span className="block font-bold text-white mt-1">{selectedInquiry.name}</span>
                    <span className="block text-slate-450 mt-0.5">{selectedInquiry.email}</span>
                    {selectedInquiry.phone && <span className="block text-slate-450">{selectedInquiry.phone}</span>}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Organization</span>
                    <span className="block font-bold text-white mt-1">{selectedInquiry.organization}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Date Transmitted</span>
                  <span className="block text-slate-300 mt-1 font-mono">{new Date(selectedInquiry.date).toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Message Text</span>
                  <p className="font-sans leading-relaxed text-slate-300 whitespace-pre-line p-3 rounded-lg border border-white/10 bg-[#0B0F19]">
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-6 py-2 rounded-lg bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Dismiss Message
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <UnifyEngine />
    </div>
  );
}

// Simple Helper X close icon
function XIcon({ className, ...props }: any) {
  return (
    <svg className={className} {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
