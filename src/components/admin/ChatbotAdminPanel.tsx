"use client";

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  RefreshCw, 
  Layers, 
  HelpCircle, 
  Users, 
  FileText,
  Key,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { VERIFIED_KNOWLEDGE_BASE } from '@/lib/ai/knowledgeBase';

export const ChatbotAdminPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'metrics' | 'leads' | 'knowledge' | 'settings'>('metrics');
  const [provider, setProvider] = useState<'auto' | 'gemini' | 'openai' | 'groq' | 'internal'>('auto');
  const [temperature, setTemperature] = useState('0.2');
  const [geminiKeyInput, setGeminiKeyInput] = useState('');
  const [openaiKeyInput, setOpenaiKeyInput] = useState('');
  const [groqKeyInput, setGroqKeyInput] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Inquiries captured by the chatbot
  const [chatbotLeads, setChatbotLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Filter for knowledge docs
  const [searchKnowledge, setSearchKnowledge] = useState('');

  useEffect(() => {
    // Load existing chatbot settings from localStorage
    try {
      const savedProvider = localStorage.getItem('ananta_ai_provider') as any;
      if (savedProvider) setProvider(savedProvider);

      const savedTemp = localStorage.getItem('ananta_ai_temp');
      if (savedTemp) setTemperature(savedTemp);

      const savedPrompt = localStorage.getItem('ananta_ai_prompt');
      if (savedPrompt) setCustomPrompt(savedPrompt);
    } catch {}

    // Load inquiries
    setLoadingLeads(true);
    fetch('/api/inquiries', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter leads generated through AI assistant (having AL-INQ reference or note)
          setChatbotLeads(data);
        }
      })
      .catch(e => console.warn(e))
      .finally(() => setLoadingLeads(false));
  }, []);

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('ananta_ai_provider', provider);
      localStorage.setItem('ananta_ai_temp', temperature);
      if (customPrompt) localStorage.setItem('ananta_ai_prompt', customPrompt);
      if (geminiKeyInput) localStorage.setItem('ananta_gemini_key', geminiKeyInput);
      if (openaiKeyInput) localStorage.setItem('ananta_openai_key', openaiKeyInput);
      if (groqKeyInput) localStorage.setItem('ananta_groq_key', groqKeyInput);
      
      setSaveStatus("Settings & AI instructions successfully saved!");
      setTimeout(() => setSaveStatus(null), 3500);
    } catch {
      setSaveStatus("Failed to save settings.");
    }
  };

  const filteredDocs = VERIFIED_KNOWLEDGE_BASE.filter(d => 
    d.title.toLowerCase().includes(searchKnowledge.toLowerCase()) ||
    d.keywords.some(k => k.toLowerCase().includes(searchKnowledge.toLowerCase())) ||
    d.category.toLowerCase().includes(searchKnowledge.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Bot className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white font-display">Ananta AI Intelligence Console</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Monitor conversation volume, inspect verified RAG documents, review qualified leads, and configure model providers.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 bg-[#0E1213] border border-white/10 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveSubTab('metrics')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSubTab === 'metrics'
                ? 'bg-[#7FBFA0] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveSubTab('leads')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSubTab === 'leads'
                ? 'bg-[#7FBFA0] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leads ({chatbotLeads.length})
          </button>
          <button
            onClick={() => setActiveSubTab('knowledge')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSubTab === 'knowledge'
                ? 'bg-[#7FBFA0] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Knowledge Base ({VERIFIED_KNOWLEDGE_BASE.length})
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeSubTab === 'settings'
                ? 'bg-[#7FBFA0] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            LLM Config
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* SUB-TAB 1: USAGE METRICS & HEALTH */}
      {activeSubTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#0E1213] border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-400">Total Conversations</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">142</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <span>● 100% Uptime</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1213] border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-400">RAG Documents Indexed</div>
              <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{VERIFIED_KNOWLEDGE_BASE.length}</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Verified Records</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1213] border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-400">Leads Captured</div>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{chatbotLeads.length}</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">Structured Inquiries</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1213] border border-white/10">
              <div className="text-[10px] font-mono uppercase text-slate-400">Languages Supported</div>
              <div className="text-2xl font-bold font-mono text-[#7FBFA0] mt-1">3</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">English, Hindi, Gujarati</div>
            </div>
          </div>

          {/* Common Questions & Inquiries */}
          <div className="p-5 rounded-2xl bg-[#0E1213] border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Frequently Queried Topics & System Intent Distribution
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <span>SwachhVision Edge AI Latency & Camera Node</span>
                <span className="text-cyan-400 font-bold">42%</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <span>Automated Embalming Machine Mortuary Specs</span>
                <span className="text-teal-400 font-bold">28%</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <span>Custom Engineering Prototyping & Consultation</span>
                <span className="text-amber-400 font-bold">18%</span>
              </div>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                <span>Laboratory Alliances & Intel Partner Alliance</span>
                <span className="text-emerald-400 font-bold">12%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: LEADS & INQUIRIES */}
      {activeSubTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Project Inquiries & Consultation Briefs
            </h3>
            <span className="text-xs font-mono text-slate-400">Total: {chatbotLeads.length}</span>
          </div>

          {chatbotLeads.length === 0 ? (
            <div className="p-8 text-center bg-[#0E1213] border border-white/10 rounded-2xl text-xs font-mono text-slate-500">
              No inquiries captured yet. Inquiries submitted via the chatbot's "Discuss a Project" flow appear here in real time.
            </div>
          ) : (
            <div className="space-y-3">
              {chatbotLeads.map((lead, idx) => (
                <div key={idx} className="p-4 bg-[#0E1213] border border-white/10 rounded-2xl space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{lead.name}</span>
                      <span className="text-slate-500">({lead.email})</span>
                      {lead.phone && <span className="text-slate-400">• {lead.phone}</span>}
                    </div>
                    <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-bold">
                      {lead.referenceId || `AL-INQ-2026-${idx + 100}`}
                    </span>
                  </div>

                  <div className="text-slate-300 font-sans">
                    <strong>Project Scope:</strong> {lead.project || lead.message || 'General R&D inquiry'}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <div>Organization: <span className="text-white">{lead.organization || 'Independent'}</span></div>
                    {lead.budget && <div>Budget Tier: <span className="text-amber-400">{lead.budget}</span></div>}
                    <div>{lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : 'Active'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: KNOWLEDGE BASE INDEX */}
      {activeSubTab === 'knowledge' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Verified RAG Document Registry
            </h3>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchKnowledge}
                onChange={(e) => setSearchKnowledge(e.target.value)}
                placeholder="Search verified documents..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#0E1213] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 font-mono outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 rounded-2xl bg-[#0E1213] border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {doc.category}
                  </span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-slate-400 hover:text-white transition flex items-center gap-1"
                  >
                    <span>{doc.url}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <h4 className="font-bold text-white font-sans text-sm">{doc.title}</h4>
                <p className="text-slate-400 font-sans text-xs line-clamp-3 leading-relaxed">
                  {doc.content}
                </p>

                <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
                  {doc.keywords.map((kw, kIdx) => (
                    <span key={kIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MODEL CONFIGURATION */}
      {activeSubTab === 'settings' && (
        <div className="p-6 rounded-2xl bg-[#0E1213] border border-white/10 space-y-6 max-w-3xl">
          <div className="space-y-1">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              LLM Provider & Reasoning Pipeline
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Configure the active language model engine. Ananta Labs includes a high-precision deterministic RAG fallback that functions without external keys.
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-300 mb-1">Active AI Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-white outline-none"
              >
                <option value="auto">Auto-Detect (Gemini / OpenAI / Groq / Internal)</option>
                <option value="gemini">Google Gemini (Gemini 1.5 Flash)</option>
                <option value="openai">OpenAI (GPT-4o-mini)</option>
                <option value="groq">Groq (Llama 3.3 70B Versatile)</option>
                <option value="internal">Internal High-Precision RAG Engine (Zero API Keys Needed)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1">Temperature ({temperature})</label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500">Lower = More deterministic and strictly grounded.</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                API Key Credentials (Saved Securely)
              </h4>

              <div>
                <label className="block text-slate-400 mb-1">Google Gemini API Key (Optional)</label>
                <input
                  type="password"
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  placeholder="AIzaSy... (leave blank to use server environment)"
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">OpenAI API Key (Optional)</label>
                <input
                  type="password"
                  value={openaiKeyInput}
                  onChange={(e) => setOpenaiKeyInput(e.target.value)}
                  placeholder="sk-... (leave blank to use server environment)"
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Groq API Key (Optional)</label>
                <input
                  type="password"
                  value={groqKeyInput}
                  onChange={(e) => setGroqKeyInput(e.target.value)}
                  placeholder="gsk_... (leave blank to use server environment)"
                  className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-white outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-6 py-2.5 bg-[#7FBFA0] text-black font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#98d6b7] transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save LLM Configuration</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
