// apps/web/components/prototype/SimulationControls.tsx
"use client";

import { useSimulationStore } from "@/stores/simulation";
import { Play, Pause, Square, RotateCcw } from "lucide-react";

export default function SimulationControls() {
  const { isRunning, isPaused, start, pause, resume, stop, reset } =
    useSimulationStore();

  return (
    <div className="flex items-center gap-2 flex-wrap pb-3 border-b border-[#FF6200]/10">
      <button
        onClick={isRunning && !isPaused ? pause : isPaused ? resume : start}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
          isRunning && !isPaused
            ? "bg-amber-500 text-black hover:bg-amber-600"
            : isPaused
            ? "bg-[#FF6200] text-white hover:bg-[#FF8A00]"
            : "bg-gradient-to-r from-[#FF6200] to-[#FFB300] text-black hover:scale-[1.02]"
        }`}
      >
        {isRunning && !isPaused ? (
          <><Pause size={16} /> Pause</>
        ) : isPaused ? (
          <><Play size={16} /> Resume</>
        ) : (
          <><Play size={16} /> Run</>
        )}
      </button>

      <button
        onClick={stop}
        className="rounded-lg border border-[#FF6200]/30 px-4 py-2 text-sm text-white hover:bg-[#FF6200]/10 transition flex items-center gap-2"
      >
        <Square size={16} /> Stop
      </button>

      <button
        onClick={reset}
        className="rounded-lg border border-[#FF6200]/30 px-4 py-2 text-sm text-white hover:bg-[#FF6200]/10 transition flex items-center gap-2"
      >
        <RotateCcw size={16} /> Reset
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-white">1x</span>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          defaultValue="1"
          className="w-20 h-1 bg-[#1F1F1F] rounded-lg appearance-none cursor-pointer accent-[#FF6200]"
        />
        <span className="text-xs text-white/70">
          {isRunning ? "▶" : "⏹"} {useSimulationStore.getState().simulationTime.toFixed(1)}s
        </span>
      </div>
    </div>
  );
}