"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  Square, 
  RotateCcw, 
  Languages, 
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  Handshake,
  MessageSquare
} from 'lucide-react';
import { FlyingRobotCompanion } from './FlyingRobotCompanion';
import { ChatMessage, MessageProps } from './ChatMessage';
import { WelcomeScreen } from './WelcomeScreen';
import { LeadConfirmationModal } from './LeadConfirmationModal';
import { SupportedLanguage } from '@/lib/ai/multilingual';

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadInitialDesc, setLeadInitialDesc] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll on new tokens/messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Load conversation history from session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ananta_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {}
  }, []);

  // Save conversation history to session
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem('ananta_chat_history', JSON.stringify(messages));
      }
    } catch {}
  }, [messages]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || isStreaming) return;

    setInput('');

    // Check if user is asking to discuss a project
    const lower = prompt.toLowerCase();
    if (lower.includes('discuss a project') || lower.includes('consultation') || lower.includes('hire') || lower.includes('quote')) {
      setLeadInitialDesc(prompt);
      setIsLeadModalOpen(true);
    }

    const userMessage: MessageProps = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Placeholder for assistant stream
    const assistantMessageId = `msg-reply-${Date.now()}`;
    const assistantPlaceholder: MessageProps = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    setMessages([...updatedMessages, assistantPlaceholder]);
    setIsStreaming(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          language: selectedLanguage,
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || 'Server connection error.');
      }

      if (!response.body) throw new Error('No streaming body returned.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const raw = decoder.decode(value, { stream: true });
        const lines = raw.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') break;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                streamedContent += parsed.text;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantMessageId
                      ? { ...m, content: streamedContent }
                      : m
                  )
                );
              } else if (parsed.error) {
                streamedContent += `\n\n*Error: ${parsed.error}*`;
              }
            } catch {}
          }
        }
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMessageId
            ? { ...m, isStreaming: false }
            : m
        )
      );

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream aborted by user.');
      } else {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMessageId
              ? { ...m, content: `Apologies, I encountered an issue connecting to the reasoning pipeline. Please check your connection or contact our team directly at anantalabsindia@gmail.com.`, isStreaming: false }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear entire conversation history?')) {
      handleStopGeneration();
      setMessages([]);
      try {
        sessionStorage.removeItem('ananta_chat_history');
      } catch {}
    }
  };

  const handleRegenerate = () => {
    if (messages.length < 2 || isStreaming) return;
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (lastUser) {
      // Remove last assistant message
      setMessages(prev => prev.slice(0, -1));
      handleSendMessage(lastUser.content);
    }
  };

  return (
    <>
      {/* 1. FLOATING LAUNCHER & ROBOT COMPANION (Seated on top of launcher) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-center">
        {/* Cute Flying Robot Companion Seated on the Chat Icon */}
        <div className="mb-[-8px] z-10">
          <FlyingRobotCompanion
            isOpen={isOpen}
            onToggleChat={() => setIsOpen(prev => !prev)}
          />
        </div>

        {/* Circular Floating Launcher Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(prev => !prev)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(13,148,136,0.35)] transition-all cursor-pointer border ${
            isOpen
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-gradient-to-tr from-slate-950 via-slate-900 to-[#0F766E] border-cyan-500/50 text-cyan-300 hover:border-cyan-400'
          }`}
          aria-label={isOpen ? "Close Ananta AI Chat" : "Open Ananta AI Chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-300" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6 text-cyan-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            </div>
          )}
        </motion.button>
      </div>

      {/* 2. EXPANDABLE CHAT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={`fixed z-[110] bg-[#0A0E11]/95 backdrop-blur-xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'inset-3 sm:inset-6 md:inset-12 rounded-3xl'
                : 'bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[420px] md:w-[460px] h-[640px] max-h-[85vh] rounded-3xl'
            }`}
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-white tracking-wider">ANANTA AI</span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      R&D AGENT
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Digital Intelligence Interface</span>
                  </div>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-400">
                {/* Language Switcher */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[10px] font-mono mr-1">
                  {(['en', 'hi', 'gu'] as SupportedLanguage[]).map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-1.5 py-0.5 rounded transition uppercase cursor-pointer ${
                        selectedLanguage === lang
                          ? 'bg-cyan-500/30 text-cyan-300 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title={`Switch language to ${lang.toUpperCase()}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Project Consultation Shortcut */}
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="hidden xs:flex p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition cursor-pointer"
                  title="Discuss a Project (Lead Consultation)"
                >
                  <Handshake className="w-3.5 h-3.5" />
                </button>

                {/* Expand / Minimize Toggle */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="hidden sm:flex p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                  title={isExpanded ? "Collapse Window" : "Full Screen Window"}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages Scroll View */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain scrollbar-thin scrollbar-thumb-slate-800">
              {messages.length === 0 ? (
                <WelcomeScreen onSelectAction={(prompt) => handleSendMessage(prompt)} />
              ) : (
                messages.map((msg) => (
                  <ChatMessage key={msg.id} {...msg} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Actions Bar (Regenerate / Stop / Clear) */}
            <div className="px-4 py-1.5 bg-slate-950/60 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500 shrink-0">
              <div className="flex items-center gap-3">
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={handleStopGeneration}
                    className="flex items-center gap-1 text-rose-400 hover:text-rose-300 cursor-pointer transition font-bold"
                  >
                    <Square className="w-2.5 h-2.5 fill-current" />
                    <span>Stop generation</span>
                  </button>
                ) : (
                  messages.length > 1 && (
                    <button
                      type="button"
                      onClick={handleRegenerate}
                      className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Regenerate response</span>
                    </button>
                  )
                )}
                {messages.length > 0 && !isStreaming && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    className="flex items-center gap-1 hover:text-slate-300 cursor-pointer transition"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>Clear chat</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-slate-500">
                <Sparkles className="w-3 h-3 text-cyan-400/80" />
                <span className="hidden sm:inline">Grounded RAG Pipeline</span>
              </div>
            </div>

            {/* Input Composer Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center bg-slate-900 border border-slate-750 focus-within:border-cyan-500/70 rounded-2xl transition shadow-inner overflow-hidden"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    selectedLanguage === 'hi'
                      ? 'अनंता लैब्स तकनीक या प्रोजेक्ट के बारे में पूछें...'
                      : selectedLanguage === 'gu'
                      ? 'અનંતા લેબ્સ ટેકનોલોજી કે પ્રોજેક્ટ વિશે પૂછો...'
                      : 'Ask about our AI vision, clinical fluidics, or consult...'
                  }
                  className="w-full py-3 pl-4 pr-12 bg-transparent text-xs text-white placeholder-slate-500 outline-none font-sans"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="absolute right-2 p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white disabled:text-slate-600 transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. STRUCTURED LEAD CONSULTATION MODAL */}
      <LeadConfirmationModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialDescription={leadInitialDesc}
        onSuccess={(refId) => {
          setMessages(prev => [
            ...prev,
            {
              id: `lead-confirm-${Date.now()}`,
              role: 'assistant',
              content: `### **Project Consultation Registered**\n\nYour engineering consultation brief has been recorded directly into the Ananta Labs Directorship queue with Reference ID: **${refId}**.\n\nOur directorship will review your technical specifications and contact you via your preferred channel within 24 hours.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }}
      />
    </>
  );
}
