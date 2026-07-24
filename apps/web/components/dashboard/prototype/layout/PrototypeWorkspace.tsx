"use client";

import { useState, useEffect, useRef } from "react";
import PrototypeViewport from "./PrototypeViewport";
import PrototypeMenuBar from "./PrototypeMenuBar";
import PrototypeToolbar from "./PrototypeToolbar";
import AssemblyTree from "./AssemblyTree";
import SpecificationPanel from "./SpecificationPanel";
import PrototypeStatusBar from "./PrototypeStatusBar";
import usePrototypeEngine from "@/hooks/usePrototypeEngine";

export default function PrototypeWorkspace() {
  const { running, wireframe, toggleWireframe, startSimulation, stopSimulation } =
    usePrototypeEngine();

  // UI visibility states – auto‑hide after 3s of inactivity
  const [menuVisible, setMenuVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [sidePanelsVisible, setSidePanelsVisible] = useState(false); // hidden by default
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  // Reset the auto‑hide timer and show UI
  const showUI = () => {
    setMenuVisible(true);
    setToolbarVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setMenuVisible(false);
      setToolbarVisible(false);
    }, 3000);
  };

  // Toggle side panels (AssemblyTree + SpecificationPanel) with a keyboard shortcut (e.g., ⌘B)
  const toggleSidePanels = () => {
    setSidePanelsVisible((prev) => !prev);
  };

  // Set up event listeners for mouse/keyboard activity
  useEffect(() => {
    const handleActivity = () => showUI();
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidePanels();
      }
      showUI();
    };
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleKey);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#0B132B] text-white select-none"
      onMouseMove={showUI}
      onKeyDown={showUI}
    >
      {/* ===== FULL‑SCREEN 3D VIEWPORT ===== */}
      <PrototypeViewport
        running={running}
        wireframe={wireframe}
        onToggleWireframe={toggleWireframe}
      />

      {/* ===== SUBTLE GRID OVERLAY (drawn on the background) ===== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 210, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 210, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ===== TOP MENU – AUTO‑HIDE ===== */}
      <div
        className={`
          absolute top-0 left-0 right-0 z-50
          transition-all duration-300
          ${menuVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"}
        `}
      >
        <PrototypeMenuBar />
      </div>

      {/* ===== RIGHT TOOLBAR – ICON ONLY, AUTO‑HIDE ===== */}
      <div
        className={`
          absolute right-3 top-1/2 -translate-y-1/2 z-50
          transition-all duration-300
          ${toolbarVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}
        `}
      >
        <PrototypeToolbar
          running={running}
          onRun={startSimulation}
          onStop={stopSimulation}
          onToggleSidePanels={toggleSidePanels} // pass toggle function to toolbar
        />
      </div>

      {/* ===== SIDE PANELS (AssemblyTree + SpecificationPanel) – TOGGLED ===== */}
      {sidePanelsVisible && (
        <>
          <div className="absolute left-3 top-16 bottom-16 z-40 w-64 bg-[#0B132B]/80 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
            <AssemblyTree />
          </div>
          <div className="absolute right-16 top-16 bottom-16 z-40 w-80 bg-[#0B132B]/80 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
            <SpecificationPanel />
          </div>
        </>
      )}

      {/* ===== KEYBOARD SHORTCUT HINT ===== */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-xs text-white/20 pointer-events-none">
        Press ⌘B to toggle side panels · ⌘1–9 for tools
      </div>

      {/* ===== STATUS HUD – THIN, ALWAYS VISIBLE ===== */}
      <div className="absolute bottom-0 left-0 right-0 z-40">
        <PrototypeStatusBar />
      </div>
    </div>
  );
}