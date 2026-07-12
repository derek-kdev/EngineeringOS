// apps/web/components/prototype/NewSimulationModal.tsx
"use client";

import { useState } from "react";
import { useSimulationStore } from "@/stores/simulation";
import { CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface NewSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSimulationModal({ isOpen, onClose }: NewSimulationModalProps) {
  const { projects, createSimulation } = useSimulationStore();
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [simulationName, setSimulationName] = useState("");
  const [error, setError] = useState("");

  const selectedProjectData = projects.find(p => p.id === selectedProjectId);
  const canSimulate = selectedProjectData?.researchCompleted;

  const handleCreate = () => {
    if (!selectedProjectId) {
      setError("Please select a project");
      return;
    }
    if (!simulationName.trim()) {
      setError("Please enter a simulation name");
      return;
    }
    if (!canSimulate) {
      setError("Research must be completed before running simulations");
      return;
    }

    createSimulation(selectedProjectId, simulationName);
    setError("");
    onClose();
    setSimulationName("");
    setSelectedProjectId("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Simulation"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Project Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Select Project
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setError("");
                }}
                className={`
                  w-full flex items-center justify-between rounded-lg p-3 text-left
                  transition-all duration-200
                  ${selectedProjectId === project.id 
                    ? "border-2 border-[#FF8A00] bg-[#FF6200]/10" 
                    : "border border-[#FF6200]/20 bg-[#1F1F1F]/50 hover:border-[#FF6200]/40"
                  }
                `}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{project.name}</span>
                    {project.researchCompleted ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle size={12} /> Research Done
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-400">
                        <AlertCircle size={12} /> Research Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">{project.description}</p>
                  <div className="flex gap-4 mt-1 text-xs text-zinc-500">
                    <span>Status: {project.status}</span>
                    <span>Simulations: {project.simulationCount}</span>
                  </div>
                </div>
                {selectedProjectId === project.id && (
                  <div className="ml-2 h-4 w-4 rounded-full bg-[#FF8A00]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Research Status */}
        {selectedProjectData && (
          <div className={`rounded-lg p-3 ${
            canSimulate ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-amber-500/10 border border-amber-500/30"
          }`}>
            <div className="flex items-start gap-3">
              {canSimulate ? (
                <CheckCircle size={18} className="text-emerald-400 mt-0.5" />
              ) : (
                <AlertCircle size={18} className="text-amber-400 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium text-white">
                  {canSimulate ? "Research Completed ✅" : "Research Required ⚠️"}
                </p>
                {canSimulate && selectedProjectData.researchData && (
                  <div className="mt-1 text-xs text-zinc-400">
                    <p>Material: {selectedProjectData.researchData.parameters.material}</p>
                    <p>Force: {selectedProjectData.researchData.parameters.forceApplied}N</p>
                    <p>Temperature: {selectedProjectData.researchData.parameters.ambientTemperature}°C</p>
                    {selectedProjectData.researchData.recommendations.length > 0 && (
                      <div className="mt-1">
                        <p className="text-zinc-500">Recommendations:</p>
                        <ul className="list-disc pl-4">
                          {selectedProjectData.researchData.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {!canSimulate && (
                  <p className="text-xs text-zinc-400 mt-1">
                    Complete research for this project before running simulations.
                    Visit the Research Library to get started.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Simulation Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Simulation Name
          </label>
          <input
            type="text"
            value={simulationName}
            onChange={(e) => {
              setSimulationName(e.target.value);
              setError("");
            }}
            placeholder="e.g., Stress Test v2, Thermal Analysis..."
            disabled={!canSimulate}
            className="
              w-full rounded-lg border border-[#FF6200]/20 
              bg-[#1F1F1F]/60 px-4 py-2.5 text-sm text-white 
              placeholder-zinc-500 focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-[#FF6200]/10 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#FF6200]/20 px-4 py-2 text-sm text-zinc-400 hover:bg-[#FF6200]/10 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!canSimulate || !selectedProjectId || !simulationName.trim()}
            className="
              flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] 
              px-6 py-2 text-sm font-semibold text-black transition-all 
              hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,138,0,0.3)]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            <Plus size={16} /> Create Simulation
          </button>
        </div>
      </div>
    </Modal>
  );
}