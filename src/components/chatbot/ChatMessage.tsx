"use client";

import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink, Bot, User } from 'lucide-react';

export interface MessageProps {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export const ChatMessage: React.FC<MessageProps> = ({
  role,
  content,
  timestamp,
  isStreaming
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = role === 'user';

  // Basic lightweight Markdown parser for headers, bold, code blocks, bullet points, and links
  const renderFormattedContent = (text: string) => {
    // Split into code blocks and normal paragraphs
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: text.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'code', lang: match[1] || 'code', value: match[2] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push({ type: 'text', value: text.substring(lastIndex) });
    }

    return parts.map((part, pIdx) => {
      if (part.type === 'code') {
        return (
          <div key={pIdx} className="my-2.5 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 uppercase font-bold text-cyan-400">
                <Terminal className="w-3 h-3" />
                {part.lang}
              </span>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(part.value)}
                className="hover:text-white transition flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-2.5 h-2.5" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-emerald-300 scrollbar-none font-mono text-[11px] leading-relaxed">
              <code>{part.value}</code>
            </pre>
          </div>
        );
      }

      // Format text lines: Headings, bullets, links, bold
      const lines = part.value.split('\n');
      return (
        <div key={pIdx} className="space-y-1.5 leading-relaxed">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={lIdx} className="h-1" />;

            // Markdown Headings
            if (trimmed.startsWith('### ')) {
              return (
                <h4 key={lIdx} className="text-xs font-bold text-cyan-300 font-mono tracking-wider pt-2 border-b border-slate-800 pb-1">
                  {trimmed.replace(/^###\s+/, '')}
                </h4>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h3 key={lIdx} className="text-sm font-bold text-white font-mono tracking-tight pt-2">
                  {trimmed.replace(/^##\s+/, '')}
                </h3>
              );
            }

            // Bullet lists
            const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ');
            const cleanLine = isBullet ? trimmed.replace(/^[•\-*]\s+/, '') : line;

            // Render inline markdown: bold, code, links
            const formatInline = (str: string) => {
              // Parse links [text](url)
              const linkRegex = /\[(.*?)\]\((.*?)\)/g;
              const linkParts = [];
              let linkLast = 0;
              let lMatch;

              while ((lMatch = linkRegex.exec(str)) !== null) {
                if (lMatch.index > linkLast) {
                  linkParts.push(str.substring(linkLast, lMatch.index));
                }
                const label = lMatch[1];
                const href = lMatch[2];
                linkParts.push(
                  <a
                    key={lMatch.index}
                    href={href}
                    className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5"
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                  >
                    {label}
                    {href.startsWith('http') && <ExternalLink className="w-2.5 h-2.5 inline" />}
                  </a>
                );
                linkLast = lMatch.index + lMatch[0].length;
              }
              if (linkLast < str.length) {
                linkParts.push(str.substring(linkLast));
              }

              return linkParts.map((item, idx) => {
                if (typeof item !== 'string') return item;
                // Parse bold **text**
                const boldParts = item.split(/\*\*(.*?)\*\*/g);
                return boldParts.map((bChunk, bIdx) => {
                  if (bIdx % 2 === 1) {
                    return <strong key={bIdx} className="font-bold text-slate-100">{bChunk}</strong>;
                  }
                  return bChunk;
                });
              });
            };

            if (isBullet) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-1">
                  <span className="text-cyan-400 text-xs mt-0.5">•</span>
                  <div className="flex-1 text-slate-300">{formatInline(cleanLine)}</div>
                </div>
              );
            }

            return <div key={lIdx} className="text-slate-200">{formatInline(cleanLine)}</div>;
          })}
        </div>
      );
    });
  };

  return (
    <div className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Avatar Icon */}
      <div
        className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center text-xs font-mono shadow-xs border ${
          isUser
            ? 'bg-slate-800 border-slate-700 text-slate-300'
            : 'bg-gradient-to-br from-slate-900 to-cyan-950 border-cyan-500/40 text-cyan-400'
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Message Box */}
      <div className={`max-w-[85%] sm:max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl text-xs font-sans border transition-all ${
            isUser
              ? 'bg-[#0F766E] text-white border-teal-600 rounded-tr-xs shadow-md'
              : 'bg-slate-900/90 text-slate-200 border-slate-800/90 rounded-tl-xs shadow-md backdrop-blur-sm'
          }`}
        >
          {renderFormattedContent(content)}

          {/* Typing pulse indicator during streaming */}
          {isStreaming && (
            <span className="inline-block w-2 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle" />
          )}
        </div>

        {/* Message Footer Actions */}
        <div className="flex items-center gap-2 mt-1 px-1 text-[10px] font-mono text-slate-500">
          <span>{timestamp}</span>
          {!isUser && !isStreaming && (
            <button
              type="button"
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 hover:text-cyan-400 transition flex items-center gap-1 cursor-pointer"
              title="Copy answer"
            >
              {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
