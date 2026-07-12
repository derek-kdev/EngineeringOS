// apps/web/components/prototype/SimulationParameters.tsx
"use client";

import { useSimulationStore } from "@/stores/simulation";
import { materials } from "@/lib/simulation/materials";
import { Scissors, Wrench, Ruler, Sparkles, BookOpen } from "lucide-react";

export default function SimulationParameters() {
  const {
    bodies,
    selectedBody,
    selectBody,
    decompose,
    reassemble,
    decomposeAll,
    reassembleAll,
    setViewMode,
    viewMode,
    selectedProject,
    researchData,
  } = useSimulationStore();

  const selected = bodies.find(b => b.id === selectedBody);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Parameters</h3>
        <span className="text-xs text-white/50">{bodies.length} components</span>
      </div>

      {/* Research Status */}
      {selectedProject && (
        <div className={`p-2 rounded-lg text-xs ${
          selectedProject.researchCompleted 
            ? "bg-emerald-500/10 border border-emerald-500/30" 
            : "bg-amber-500/10 border border-amber-500/30"
        }`}>
          <div className="flex items-center gap-2">
            <BookOpen size={14} className={selectedProject.researchCompleted ? "text-emerald-400" : "text-amber-400"} />
            <span className="text-white">
              {selectedProject.researchCompleted ? "Research Complete" : "Research Required"}
            </span>
          </div>
          {researchData && (
            <div className="mt-1 text-[10px] text-zinc-400 space-y-0.5">
              <p>Material: {researchData.parameters.material}</p>
              <p>Force: {researchData.parameters.forceApplied}N</p>
              <p>Temp: {researchData.parameters.ambientTemperature}°C</p>
            </div>
          )}
        </div>
      )}

      <div>
        <label className="text-xs text-white">Render Mode</label>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as any)}
          className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-3 py-2 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
        >
          <option value="solid">Solid</option>
          <option value="wireframe">Wireframe</option>
          <option value="thermal">Thermal</option>
          <option value="stress">Stress</option>
          <option value="xray">X-Ray</option>
          <option value="exploded">Exploded</option>
        </select>
      </div>

      {selected && (
        <div className="mt-2 p-3 rounded-lg bg-[#1F1F1F]/50 border border-[#FF6200]/10">
          <p className="text-xs font-semibold text-white">{selected.name}</p>
          <div className="grid grid-cols-2 gap-1 mt-2 text-xs text-white/70">
            <span>Mass: {selected.mass}kg</span>
            <span>Material: {selected.material}</span>
            <span>Temp: {selected.temperature.toFixed(1)}°C</span>
            <span>Stress: {selected.stress.toFixed(1)} MPa</span>
          </div>
          <div className="flex gap-1 mt-2">
            <button
              onClick={() => decompose(selected.id)}
              className="flex-1 rounded-lg border border-[#FF6200]/20 px-2 py-1 text-xs text-white hover:bg-[#FF6200]/10 transition"
            >
              Decompose
            </button>
            <button
              onClick={() => reassemble(selected.id)}
              className="flex-1 rounded-lg border border-[#FF6200]/20 px-2 py-1 text-xs text-white hover:bg-[#FF6200]/10 transition"
            >
              Reassemble
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-[#1F1F1F]/50 border border-[#FF6200]/10">
        <button
          onClick={decomposeAll}
          className="rounded-lg border border-[#FF6200]/30 px-3 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition flex items-center gap-1"
        >
          <Scissors size={12} /> Explode
        </button>
        <button
          onClick={reassembleAll}
          className="rounded-lg border border-[#FF6200]/30 px-3 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition flex items-center gap-1"
        >
          <Wrench size={12} /> Reassemble
        </button>
      </div>

      <div className="border-t border-[#FF6200]/10 pt-3">
        <p className="text-xs text-white/70 mb-2">Tools</p>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition flex items-center gap-1">
            <Ruler size={12} /> Measure
          </button>
          <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition flex items-center gap-1">
            <Sparkles size={12} /> AI Optimize
          </button>
        </div>
      </div>

      <div className="p-2 rounded-lg bg-[#1F1F1F]/50 border border-[#FF6200]/10">
        <p className="text-[10px] text-white/70">Material database: {materials.length} materials</p>
      </div>
    </div>
  );
}