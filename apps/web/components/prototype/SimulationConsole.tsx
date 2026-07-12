// apps/web/components/prototype/SimulationConsole.tsx
"use client";

import { useEffect, useRef } from "react";
import { useSimulationStore } from "@/stores/simulation";

export default function SimulationConsole() {
  const { logs } = useSimulationStore();
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when logs update
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white">Console Log</h3>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1 text-xs text-white hover:bg-[#FF6200]/10 transition">CSV</button>
          <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1 text-xs text-white hover:bg-[#FF6200]/10 transition">STL</button>
          <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1 text-xs text-white hover:bg-[#FF6200]/10 transition">MP4</button>
          <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1 text-xs text-white hover:bg-[#FF6200]/10 transition">PDF</button>
        </div>
      </div>
      <div
        ref={consoleRef}
        className="h-24 overflow-y-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs text-white/70"
      >
        {logs.length === 0 ? (
          <p className="text-white/30">Ready. Press "Run" to start simulation.</p>
        ) : (
          logs.slice(-50).map((log, i) => (
            <div key={i} className={log.includes("⚠️") ? "text-amber-400" : ""}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}