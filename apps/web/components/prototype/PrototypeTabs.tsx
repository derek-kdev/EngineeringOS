// apps/web/components/prototype/PrototypeTabs.tsx
"use client";

import { useState } from "react";
import {
  PenTool,
  Zap,
  Beaker,
  BarChart3,
  RefreshCw,
  Plus,
} from "lucide-react";
import PrototypeLab from "./PrototypeLab";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

type TabId = "design" | "simulate" | "test" | "results" | "iterate";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "design", label: "Design", icon: <PenTool size={16} /> },
  { id: "simulate", label: "Simulate", icon: <Zap size={16} /> },
  { id: "test", label: "Test", icon: <Beaker size={16} /> },
  { id: "results", label: "Results", icon: <BarChart3 size={16} /> },
  { id: "iterate", label: "Iterate", icon: <RefreshCw size={16} /> },
];

export default function PrototypeTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("simulate");

  return (
    <div className="space-y-4">
      {/* Project Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Prototype Lab</h1>
          <p className="text-sm text-white/60">Mars Rover v2 • Active</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]">
          <Plus size={16} /> New Prototype
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-1 backdrop-blur-xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                transition-all duration-200
                ${isActive
                  ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,138,0,0.1)]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === "design" && <DesignTab />}
        {activeTab === "simulate" && <PrototypeLab />}
        {activeTab === "test" && <TestTab />}
        {activeTab === "results" && <ResultsTab />}
        {activeTab === "iterate" && <IterateTab />}
      </div>
    </div>
  );
}

// ---- Placeholder Tab Components ----

function DesignTab() {
  return (
    <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <PenTool size={20} className="text-[#FFB300]" />
        <h2 className="text-lg font-semibold text-white">CAD & 3D Design</h2>
      </div>
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[#FF6200]/30 bg-[#1F1F1F]/50">
        <div className="text-center">
          <div className="text-4xl mb-2">📐</div>
          <p className="text-sm text-white/60">3D Model Viewer</p>
          <p className="text-xs text-white/40 mt-1">Upload or import CAD files</p>
          <button className="mt-4 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white hover:bg-white/20 transition">
            Upload STEP / STL
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-xs text-white/40">Dimensions</p>
          <p className="text-white">250 × 120 × 80 mm</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Material</p>
          <p className="text-white">Aluminum 6061</p>
        </div>
        <div>
          <p className="text-xs text-white/40">Weight</p>
          <p className="text-white">2.4 kg</p>
        </div>
      </div>
    </AnimatedCard>
  );
}

function TestTab() {
  return (
    <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <Beaker size={20} className="text-[#FFB300]" />
        <h2 className="text-lg font-semibold text-white">Physical Testing</h2>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Latest Test Run</span>
            <span className="text-xs text-white/40">2026-07-13 14:32</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-xs text-white/40">Load</span>
              <p className="text-white">500 N</p>
            </div>
            <div>
              <span className="text-xs text-white/40">Displacement</span>
              <p className="text-white">2.1 mm</p>
            </div>
            <div>
              <span className="text-xs text-white/40">Temperature</span>
              <p className="text-white">42 °C</p>
            </div>
            <div>
              <span className="text-xs text-white/40">Result</span>
              <p className="text-emerald-400">Pass ✅</p>
            </div>
          </div>
        </div>
        <button className="rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-1.5 text-sm font-semibold text-black">
          + Log New Test
        </button>
      </div>
    </AnimatedCard>
  );
}

function ResultsTab() {
  return (
    <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 size={20} className="text-[#FFB300]" />
        <h2 className="text-lg font-semibold text-white">Simulation Results</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-4">
          <p className="text-xs text-white/40">Max Stress</p>
          <p className="text-xl font-semibold text-white">245 MPa</p>
          <p className="text-xs text-white/40 mt-1">Safety Factor: 1.13</p>
        </div>
        <div className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-4">
          <p className="text-xs text-white/40">Max Temperature</p>
          <p className="text-xl font-semibold text-white">62 °C</p>
          <p className="text-xs text-white/40 mt-1">Thermal Limit: 80 °C</p>
        </div>
        <div className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-4">
          <p className="text-xs text-white/40">Displacement</p>
          <p className="text-xl font-semibold text-white">2.4 mm</p>
          <p className="text-xs text-white/40 mt-1">Within tolerance ✅</p>
        </div>
        <div className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-4">
          <p className="text-xs text-white/40">Efficiency</p>
          <p className="text-xl font-semibold text-white">88.5%</p>
          <p className="text-xs text-white/40 mt-1">Mechanical efficiency</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button className="rounded-lg border border-[#FF6200]/20 px-4 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition">
          Export CSV
        </button>
        <button className="rounded-lg border border-[#FF6200]/20 px-4 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition">
          Export PDF
        </button>
        <button className="rounded-lg border border-[#FF6200]/20 px-4 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition">
          Generate Report
        </button>
      </div>
    </AnimatedCard>
  );
}

function IterateTab() {
  return (
    <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <RefreshCw size={20} className="text-[#FFB300]" />
        <h2 className="text-lg font-semibold text-white">Version History & Iterations</h2>
      </div>
      <div className="space-y-3">
        {[
          { version: "v1.2", date: "2026-07-13", changes: "Updated material to Titanium", status: "Current" },
          { version: "v1.1", date: "2026-07-10", changes: "Reduced weight by 15%", status: "Archived" },
          { version: "v1.0", date: "2026-07-05", changes: "Initial prototype", status: "Archived" },
        ].map((item) => (
          <div
            key={item.version}
            className={`flex items-center justify-between rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-3 ${
              item.status === "Current" ? "border-[#FFB300]/40" : ""
            }`}
          >
            <div>
              <p className="text-sm font-medium text-white">{item.version}</p>
              <p className="text-xs text-white/40">{item.changes}</p>
              <p className="text-xs text-white/30">{item.date}</p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                item.status === "Current"
                  ? "bg-[#FFB300]/20 text-[#FFB300]"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-4 rounded-lg border border-[#FF6200]/20 px-4 py-1.5 text-xs text-white hover:bg-[#FF6200]/10 transition">
        + Create New Iteration
      </button>
    </AnimatedCard>
  );
}