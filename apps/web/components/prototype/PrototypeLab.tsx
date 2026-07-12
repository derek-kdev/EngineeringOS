// apps/web/components/prototype/PrototypeLab.tsx
"use client";

import { useEffect } from "react";
import { useSimulationStore } from "@/stores/simulation";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Plus } from "lucide-react";
import SimulationControls from "./SimulationControls";
import SimulationViewport from "./SimulationViewport";
import SimulationParameters from "./SimulationParameters";
import SimulationLiveData from "./SimulationLiveData";
import SimulationConsole from "./SimulationConsole";
import NewSimulationModal from "./NewSimulationModal";

export default function PrototypeLab() {
  const { 
    initialize, 
    step, 
    stop,
    selectedProject,
    currentSimulation,
    openNewSimulationModal,
    isNewSimulationModalOpen,
    closeNewSimulationModal,
  } = useSimulationStore();

  // Initialize engine on mount
  useEffect(() => {
    initialize();
    return () => stop();
  }, []);

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      step();
    }, 100);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Prototype Lab</h1>
          <p className="text-sm text-white/70">
            {selectedProject 
              ? `Project: ${selectedProject.name}`
              : 'Select a project to begin simulation'
            }
            {currentSimulation && ` • ${currentSimulation.name}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openNewSimulationModal}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-2 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,138,0,0.3)]"
          >
            <Plus size={16} /> New Simulation
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#FF6200]/20 px-3 py-2 text-sm text-white hover:bg-[#FF6200]/10 transition">
            <span>Share</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#FF6200]/20 px-3 py-2 text-sm text-white hover:bg-[#FF6200]/10 transition">
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#FF6200]/20 px-3 py-2 text-sm text-white hover:bg-[#FF6200]/10 transition">
            <span>Snapshot</span>
          </button>
        </div>
      </div>

      {/* Main layout: 4 columns */}
      <div className="grid grid-cols-1 gap-4 flex-1 lg:grid-cols-4">
        <AnimatedCard
          className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4 backdrop-blur-xl"
          direction="right"
          glow={true}
        >
          <SimulationParameters />
        </AnimatedCard>

        <div className="lg:col-span-2">
          <AnimatedCard
            className="h-full rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4 backdrop-blur-xl flex flex-col"
            direction="up"
            glow={true}
          >
            <SimulationControls />
            <SimulationViewport />
            <div className="mt-3 p-2 rounded-lg bg-[#1F1F1F]/50 border border-[#FF6200]/10 max-h-16 overflow-y-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#FFB300]">⚠️</span>
                <span className="text-white/70">Alert Feed</span>
                {selectedProject && !selectedProject.researchCompleted && (
                  <span className="text-amber-400">• Research required before simulation</span>
                )}
                {selectedProject && selectedProject.researchCompleted && (
                  <span className="text-emerald-400">• Research complete ✅</span>
                )}
              </div>
            </div>
          </AnimatedCard>
        </div>

        <AnimatedCard
          className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4 backdrop-blur-xl"
          direction="left"
          glow={true}
        >
          <SimulationLiveData />
        </AnimatedCard>
      </div>

      <AnimatedCard
        className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4 backdrop-blur-xl"
        direction="up"
        glow={true}
      >
        <SimulationConsole />
      </AnimatedCard>

      {/* New Simulation Modal */}
      <NewSimulationModal
        isOpen={isNewSimulationModalOpen}
        onClose={closeNewSimulationModal}
      />
    </div>
  );
}