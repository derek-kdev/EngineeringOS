// apps/web/components/ui/UniversalSearch.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UniversalSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
        setQuery("");
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
      setIsExpanded(false);
      setQuery("");
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        relative flex items-center transition-all duration-300 ease-in-out
        ${isExpanded ? "w-80 md:w-96" : "w-10"}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        if (!inputRef.current?.value) {
          setIsExpanded(false);
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className={`
          flex items-center w-full rounded-full
          border border-white/10 bg-white/5
          transition-all duration-300
          ${isExpanded ? "pl-4 pr-3 py-1.5 shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "p-1.5 justify-center"}
          hover:border-white/30 focus-within:border-white/40
        `}
      >
        <Search
          size={18}
          className={`
            text-white/50 transition-all duration-300
            ${isExpanded ? "mr-2" : ""}
          `}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, papers, prototypes..."
          className={`
            bg-transparent text-sm text-white placeholder-white/40
            outline-none transition-all duration-300
            ${isExpanded ? "w-full opacity-100" : "w-0 opacity-0"}
          `}
          onFocus={() => setIsExpanded(true)}
        />
        {isExpanded && query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="ml-1 text-white/40 hover:text-white transition"
          >
            <X size={14} />
          </button>
        )}
      </form>
      {!isExpanded && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/30 opacity-0 group-hover:opacity-100 transition">
          ⌘K
        </span>
      )}
    </div>
  );
}