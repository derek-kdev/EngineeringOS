// apps/web/components/prototype/SimulationLiveData.tsx
"use client";

import { useSimulationStore } from "@/stores/simulation";

export default function SimulationLiveData() {
  const { bodies } = useSimulationStore();

  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-3">Live Data</h3>
      <div className="space-y-2">
        {bodies.slice(0, 6).map((body) => (
          <div key={body.id} className="flex justify-between items-center py-1 border-b border-[#FF6200]/5">
            <span className="text-xs text-white/70">{body.name}</span>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] ${body.temperature > 60 ? "text-amber-400" : "text-white/50"}`}>
                {body.temperature.toFixed(1)}°C
              </span>
              <span className={`text-[10px] ${body.stress > 80 ? "text-red-400" : "text-white/50"}`}>
                {body.stress.toFixed(1)} MPa
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 rounded-lg bg-[#1F1F1F]/50 border border-[#FF6200]/10">
        <div className="flex justify-between text-xs text-white/50">
          <span>FPS: 60</span>
          <span>Components: {bodies.length}</span>
          <span>Joints: {useSimulationStore.getState().joints.length}</span>
        </div>
      </div>
    </div>
  );
}