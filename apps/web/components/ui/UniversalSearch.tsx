// apps/web/components/ui/UniversalSearch.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="
          flex items-center w-full rounded-full
          border border-white/10 bg-white/5
          pl-4 pr-3 py-1.5
          transition-all duration-300
          hover:border-white/30 focus-within:border-white/40
          focus-within:shadow-[0_0_30px_rgba(255,255,255,0.05)]
        "
      >
        <Search size={18} className="mr-2 text-white/50" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, papers, prototypes..."
          className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
        />
        {query && (
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
    </div>
  );
}