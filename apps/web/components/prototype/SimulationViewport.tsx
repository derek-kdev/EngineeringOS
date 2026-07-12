// apps/web/components/prototype/SimulationViewport.tsx
"use client";

import { useSimulationStore } from "@/stores/simulation";

export default function SimulationViewport() {
  const { bodies, viewMode, selectedBody, selectBody } = useSimulationStore();

  return (
    <div className="relative flex-1 bg-[#0A0A0A] rounded-lg border border-[#FF6200]/10 overflow-hidden min-h-[300px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">🤖</div>
          <p className="text-white/50 text-sm">Robotic Gearbox Assembly</p>
          <p className="text-white/30 text-xs mt-1">
            {bodies.length} components • {viewMode} view
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {bodies.slice(0, 8).map((body) => (
              <button
                key={body.id}
                onClick={() => selectBody(body.id)}
                className={`px-3 py-1 rounded-full text-[10px] transition ${
                  selectedBody === body.id
                    ? "bg-[#FF6200] text-black"
                    : "bg-[#1F1F1F] text-white/70 hover:bg-[#FF6200]/20"
                } ${body.isDecomposed ? "opacity-50" : ""}`}
              >
                {body.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 flex gap-1">
        <span className="text-[10px] text-white/30 border-l border-white/10 pl-2">
          Solid • {bodies.filter(b => !b.isDecomposed).length} assembled
        </span>
      </div>
      <div className="absolute top-3 right-3 flex gap-1">
        <button className="rounded bg-[#1F1F1F]/80 p-1.5 text-white/50 hover:text-white transition">
          <span className="text-xs">🔲</span>
        </button>
        <button className="rounded bg-[#1F1F1F]/80 p-1.5 text-white/50 hover:text-white transition">
          <span className="text-xs">🔍+</span>
        </button>
        <button className="rounded bg-[#1F1F1F]/80 p-1.5 text-white/50 hover:text-white transition">
          <span className="text-xs">🔍-</span>
        </button>
      </div>
      <div className="absolute bottom-3 right-3 flex gap-3 text-[10px] text-white/30">
        <span>🔄 Rotate</span>
        <span>🔍 Zoom</span>
        <span>✋ Pan</span>
      </div>
    </div>
  );
}