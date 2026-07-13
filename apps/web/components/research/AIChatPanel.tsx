// apps/web/components/research/AIChatPanel.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useResearchStore } from "@/stores/research";
import { Send, Loader2, MessageSquare, FileText } from "lucide-react";

export default function AIChatPanel() {
  const { chats, documents, sendChatMessage } = useResearchStore();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!question.trim() || isLoading) return;
    setIsLoading(true);
    await sendChatMessage(question, selectedDocumentId);
    setQuestion("");
    setIsLoading(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4 backdrop-blur-xl flex flex-col h-[600px]">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare size={18} className="text-[#FFB300]" />
        <h3 className="text-sm font-semibold text-white">AI Research Assistant</h3>
      </div>

      {/* Document Context Selector */}
      <div className="mb-3">
        <select
          value={selectedDocumentId || ""}
          onChange={(e) => setSelectedDocumentId(e.target.value || undefined)}
          className="w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-3 py-1.5 text-xs text-white focus:border-[#FF8A00] focus:outline-none"
        >
          <option value="">All Documents</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.title.slice(0, 40)}...
            </option>
          ))}
        </select>
      </div>

      {/* Chat Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
        {chats.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageSquare size={32} className="text-white/20" />
            <p className="mt-2 text-sm text-white/40">Ask a question about your research</p>
            <p className="text-xs text-white/20 mt-1">Example: "What materials are recommended for high-temperature applications?"</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div key={chat.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6200]/20 text-[10px] font-bold text-[#FFB300]">
                  Q
                </div>
                <div className="flex-1 rounded-lg bg-[#1F1F1F]/50 px-3 py-2 text-sm text-white">
                  {chat.question}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB300]/20 text-[10px] font-bold text-[#FFB300]">
                  A
                </div>
                <div className="flex-1 rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/30 px-3 py-2 text-sm text-white/80">
                  <p>{chat.answer}</p>
                  {chat.citations.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-white/30">📚 Sources:</p>
                      {chat.citations.map((citation, i) => (
                        <div key={i} className="flex items-start gap-1 text-xs text-white/40">
                          <FileText size={12} className="mt-0.5 text-[#FFB300]" />
                          <span>{citation.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Loader2 size={16} className="animate-spin" />
            Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-[#FF6200]/10 pt-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your research..."
          className="flex-1 rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!question.trim() || isLoading}
          className="rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] p-2 text-black transition hover:scale-[1.02] disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}