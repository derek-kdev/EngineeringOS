"use client";

import PrototypeHeader from "@/components/dashboard/prototype/PrototypeHeader";
import PrototypeStats from "@/components/dashboard/prototype/PrototypeStats";
import ParameterPanel from "@/components/dashboard/prototype/ParameterPanel";
import PrototypeViewport from "@/components/dashboard/prototype/PrototypeViewport";
import SimulationMetrics from "@/components/dashboard/prototype/SimulationMetrics";
import SimulationControls from "@/components/dashboard/prototype/SimulationControls";
import ConsoleLog from "@/components/dashboard/prototype/ConsoleLog";
import MaterialLibrary from "@/components/dashboard/prototype/MaterialLibrary";
import RenderModes from "@/components/dashboard/prototype/RenderModes";
import PrototypeHistory from "@/components/dashboard/prototype/PrototypeHistory";
import AssemblyTree from "@/components/dashboard/prototype/AssemblyTree";
import BOMPanel from "@/components/dashboard/prototype/BOMPanel";
import ExportPanel from "@/components/dashboard/prototype/ExportPanel";
import AIAssistant from "@/components/dashboard/prototype/AIAssistant";

export default function PrototypePage() {
  return (
    <div className="space-y-8">

      <PrototypeHeader />

      <PrototypeStats />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        <div className="xl:col-span-3 space-y-6">
          <ParameterPanel />
          <MaterialLibrary />
          <RenderModes />
        </div>

        <div className="xl:col-span-6 space-y-6">
          <PrototypeViewport />
          <SimulationControls />
          <ConsoleLog />
        </div>

        <div className="xl:col-span-3 space-y-6">
          <SimulationMetrics />
          <PrototypeHistory />
          <AssemblyTree />
          <BOMPanel />
          <ExportPanel />
          <AIAssistant />
        </div>

      </div>

    </div>
  );
}