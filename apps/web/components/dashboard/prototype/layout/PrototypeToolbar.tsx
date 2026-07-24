"use client";

import {
  Save,
  Camera,
  Share2,
  MessageSquare,
  GitBranch,
  Play,
  Ruler,
  Link2,
  Box,
  Download,
  Square,
  PanelLeft,
} from "lucide-react";

interface PrototypeToolbarProps {
  running: boolean;
  onRun: () => void;
  onStop: () => void;
  onToggleSidePanels: () => void;
}

export default function PrototypeToolbar({
  running,
  onRun,
  onStop,
  onToggleSidePanels,
}: PrototypeToolbarProps) {
  const actions = [
    { label: "Save", icon: Save },
    { label: "Snapshot", icon: Camera },
    { label: "Share", icon: Share2 },
    { label: "Comment", icon: MessageSquare },
    { label: "New Version", icon: GitBranch },
    { label: "Measure", icon: Ruler },
    { label: "Constraint", icon: Link2 },
    { label: "Export", icon: Download },
  ];

  return (
    <div className="flex flex-col items-center gap-1.5 bg-[#0B132B]/60 backdrop-blur-sm border border-white/10 rounded-xl p-2 shadow-2xl">
      {/* Actions */}
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            title={action.label}
            className="group relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <Icon size={18} />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-[#1c1c1c] border border-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
              {action.label}
            </span>
          </button>
        );
      })}

      {/* Divider */}
      <div className="w-6 h-px bg-white/10 my-1" />

      {/* Side panels toggle */}
      <button
        title="Toggle Side Panels"
        onClick={onToggleSidePanels}
        className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
      >
        <PanelLeft size={18} />
      </button>

      {/* Divider */}
      <div className="w-6 h-px bg-white/10 my-1" />

      {/* Run / Stop Simulation */}
      {running ? (
        <button
          title="Stop Simulation"
          onClick={onStop}
          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
        >
          <Square size={18} />
        </button>
      ) : (
        <button
          title="Run Simulation"
          onClick={onRun}
          className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
        >
          <Play size={18} />
        </button>
      )}

      {/* Assembly mode indicator */}
      <div className="mt-1 text-[10px] text-white/30 flex items-center gap-1">
        <Box size={12} />
        <span>Assembly</span>
      </div>
    </div>
  );
}