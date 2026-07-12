// apps/web/stores/simulation.ts
import { create } from "zustand";
import { SimulationEngine, PhysicsBody, Joint } from "@/lib/simulation/SimulationEngine";
import { Project, Simulation, ResearchData } from "@/lib/simulation/types";

// Mock Projects with Research Status
const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Mars Rover v2",
    description: "Next-gen rover for Martian terrain exploration",
    status: "Active",
    researchCompleted: true,
    researchData: {
      id: "res-1",
      projectId: "proj-1",
      status: "completed",
      findings: "Aluminum alloy frame with carbon fiber reinforcements shows optimal performance. Thermal analysis suggests active cooling needed above 60°C.",
      parameters: {
        material: "Aluminum",
        forceApplied: 500,
        ambientTemperature: 25,
        frictionCoefficient: 0.3,
        maxStressTolerance: 276,
        thermalLimit: 80,
      },
      recommendations: [
        "Use Titanium for high-stress joints",
        "Add active cooling system",
        "Reduce weight by 18%",
      ],
      completedAt: "2026-07-10T14:30:00Z",
    },
    simulationCount: 6,
    lastSimulated: "2026-07-12T10:00:00Z",
  },
  {
    id: "proj-2",
    name: "Sensor Array",
    description: "High-precision environmental sensor network",
    status: "Completed",
    researchCompleted: true,
    researchData: {
      id: "res-2",
      projectId: "proj-2",
      status: "completed",
      findings: "Optimal sensor placement requires vibration isolation. Temperature fluctuations affect calibration.",
      parameters: {
        material: "Steel (Stainless)",
        forceApplied: 200,
        ambientTemperature: 20,
        frictionCoefficient: 0.15,
        maxStressTolerance: 215,
        thermalLimit: 60,
      },
      recommendations: [
        "Use vibration-dampening mounts",
        "Implement temperature compensation",
      ],
      completedAt: "2026-06-28T09:15:00Z",
    },
    simulationCount: 12,
    lastSimulated: "2026-07-11T16:20:00Z",
  },
  {
    id: "proj-3",
    name: "Thermal Analysis",
    description: "Heat dissipation simulation for satellite components",
    status: "On Hold",
    researchCompleted: false,
    simulationCount: 2,
  },
  {
    id: "proj-4",
    name: "AI Assistant",
    description: "LLM-powered engineering assistant for design optimization",
    status: "Active",
    researchCompleted: false,
    simulationCount: 0,
  },
  {
    id: "proj-5",
    name: "Battery Pack",
    description: "High-capacity lithium-ion battery for space applications",
    status: "Active",
    researchCompleted: true,
    researchData: {
      id: "res-5",
      projectId: "proj-5",
      status: "completed",
      findings: "Thermal runaway risk at high discharge rates. Active cooling required.",
      parameters: {
        material: "Copper",
        forceApplied: 300,
        ambientTemperature: 25,
        frictionCoefficient: 0.2,
        maxStressTolerance: 210,
        thermalLimit: 70,
      },
      recommendations: [
        "Add thermal management system",
        "Use nickel-plated connectors",
      ],
      completedAt: "2026-07-01T11:45:00Z",
    },
    simulationCount: 4,
    lastSimulated: "2026-07-09T13:10:00Z",
  },
];

// Mock Simulations
const mockSimulations: Simulation[] = [
  {
    id: "sim-1",
    projectId: "proj-1",
    name: "Mars Rover Arm Stress Test",
    status: "completed",
    parameters: {
      material: "Aluminum",
      forceApplied: 500,
      ambientTemperature: 25,
      frictionCoefficient: 0.3,
    },
    results: {
      maxStress: 245,
      maxTemperature: 62,
      factorOfSafety: 1.13,
      displacement: 2.4,
      efficiency: 88.5,
    },
    logs: ["[12:34:01] Simulation started", "[12:34:07] Max stress detected at joint 3", "[12:35:45] Simulation completed"],
    duration: 104,
    startedAt: "2026-07-12T10:00:00Z",
    completedAt: "2026-07-12T10:01:44Z",
  },
];

interface SimulationState {
  // Engine
  engine: SimulationEngine | null;
  bodies: PhysicsBody[];
  joints: Joint[];
  
  // Projects & Simulations
  projects: Project[];
  simulations: Simulation[];
  selectedProject: Project | null;
  currentSimulation: Simulation | null;
  researchData: ResearchData | null;
  
  // Simulation status
  isRunning: boolean;
  isPaused: boolean;
  simulationTime: number;
  selectedBody: string | null;
  viewMode: "solid" | "wireframe" | "thermal" | "stress" | "xray" | "exploded";
  logs: string[];
  
  // UI State
  isNewSimulationModalOpen: boolean;
  selectedProjectId: string | null;

  // Actions
  initialize: () => void;
  step: () => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
  
  // Project & Simulation actions
  selectProject: (projectId: string) => void;
  createSimulation: (projectId: string, name: string) => void;
  loadSimulation: (simulationId: string) => void;
  openNewSimulationModal: () => void;
  closeNewSimulationModal: () => void;
  
  // Decomposition
  decompose: (id: string) => void;
  decomposeAll: () => void;
  reassemble: (id: string) => void;
  reassembleAll: () => void;
  
  // UI
  selectBody: (id: string | null) => void;
  setViewMode: (mode: any) => void;
  applyForce: (id: string, force: { x: number; y: number; z: number }) => void;
  setMaterial: (id: string, material: string) => void;
  clearLogs: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  engine: null,
  bodies: [],
  joints: [],
  projects: mockProjects,
  simulations: mockSimulations,
  selectedProject: null,
  currentSimulation: null,
  researchData: null,
  isRunning: false,
  isPaused: false,
  simulationTime: 0,
  selectedBody: null,
  viewMode: "solid",
  logs: [],
  isNewSimulationModalOpen: false,
  selectedProjectId: null,

  initialize: () => {
    const engine = new SimulationEngine();
    set({
      engine,
      bodies: engine.getBodies(),
      joints: engine.getJoints(),
      logs: engine.getLogs(),
    });
  },

  step: () => {
    const { engine } = get();
    if (!engine) return;
    engine.step();
    set({
      bodies: engine.getBodies(),
      joints: engine.getJoints(),
      simulationTime: engine.getSimulationTime(),
      logs: engine.getLogs(),
    });
  },

  start: () => {
    const { engine } = get();
    if (!engine) return;
    engine.start();
    set({ isRunning: true, isPaused: false });
  },

  pause: () => {
    const { engine } = get();
    if (!engine) return;
    engine.pause();
    set({ isPaused: true });
  },

  resume: () => {
    const { engine } = get();
    if (!engine) return;
    engine.resume();
    set({ isPaused: false });
  },

  stop: () => {
    const { engine } = get();
    if (!engine) return;
    engine.stop();
    set({ isRunning: false, isPaused: false });
  },

  reset: () => {
    const { engine } = get();
    if (!engine) return;
    engine.reset();
    set({
      bodies: engine.getBodies(),
      joints: engine.getJoints(),
      simulationTime: 0,
      isRunning: false,
      isPaused: false,
      logs: engine.getLogs(),
    });
  },

  selectProject: (projectId: string) => {
    const { projects } = get();
    const project = projects.find(p => p.id === projectId);
    if (project) {
      // If research is completed, load research data
      if (project.researchCompleted && project.researchData) {
        set({ 
          selectedProject: project, 
          researchData: project.researchData 
        });
        // Auto-load simulation parameters from research
        const engine = get().engine;
        if (engine) {
          engine.updateParameter("forceApplied", project.researchData.parameters.forceApplied);
          engine.updateParameter("ambientTemperature", project.researchData.parameters.ambientTemperature);
          engine.updateParameter("frictionCoefficient", project.researchData.parameters.frictionCoefficient);
          engine.updateParameter("material", project.researchData.parameters.material);
        }
      } else {
        set({ selectedProject: project, researchData: null });
      }
    }
  },

  createSimulation: (projectId: string, name: string) => {
    const { projects, simulations, selectedProject } = get();
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.researchCompleted) return;

    // Use research parameters
    const researchData = project.researchData;
    const newSimulation: Simulation = {
      id: `sim-${Date.now()}`,
      projectId: projectId,
      name: name || `${project.name} - Simulation ${project.simulationCount + 1}`,
      status: "draft",
      parameters: {
        material: researchData?.parameters.material || "Aluminum",
        forceApplied: researchData?.parameters.forceApplied || 500,
        ambientTemperature: researchData?.parameters.ambientTemperature || 25,
        frictionCoefficient: researchData?.parameters.frictionCoefficient || 0.3,
      },
      logs: [],
      duration: 0,
    };

    const updatedSimulations = [...simulations, newSimulation];
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return { ...p, simulationCount: p.simulationCount + 1 };
      }
      return p;
    });

    set({
      simulations: updatedSimulations,
      projects: updatedProjects,
      currentSimulation: newSimulation,
      selectedProject: project,
    });

    // Update engine with research parameters
    const engine = get().engine;
    if (engine && researchData) {
      engine.updateParameter("forceApplied", researchData.parameters.forceApplied);
      engine.updateParameter("ambientTemperature", researchData.parameters.ambientTemperature);
      engine.updateParameter("frictionCoefficient", researchData.parameters.frictionCoefficient);
      engine.updateParameter("material", researchData.parameters.material);
    }
  },

  loadSimulation: (simulationId: string) => {
    const { simulations } = get();
    const sim = simulations.find(s => s.id === simulationId);
    if (sim) {
      set({ currentSimulation: sim });
      // Update engine with simulation parameters
      const engine = get().engine;
      if (engine) {
        engine.updateParameter("forceApplied", sim.parameters.forceApplied);
        engine.updateParameter("ambientTemperature", sim.parameters.ambientTemperature);
        engine.updateParameter("frictionCoefficient", sim.parameters.frictionCoefficient);
        engine.updateParameter("material", sim.parameters.material);
      }
    }
  },

  openNewSimulationModal: () => set({ isNewSimulationModalOpen: true }),
  closeNewSimulationModal: () => set({ isNewSimulationModalOpen: false }),

  decompose: (id: string) => {
    const { engine } = get();
    if (!engine) return;
    engine.decompose(id);
    set({ bodies: engine.getBodies(), logs: engine.getLogs() });
  },

  decomposeAll: () => {
    const { engine } = get();
    if (!engine) return;
    engine.decomposeAll();
    set({ bodies: engine.getBodies(), logs: engine.getLogs() });
  },

  reassemble: (id: string) => {
    const { engine } = get();
    if (!engine) return;
    engine.reassemble(id);
    set({ bodies: engine.getBodies(), logs: engine.getLogs() });
  },

  reassembleAll: () => {
    const { engine } = get();
    if (!engine) return;
    engine.reassembleAll();
    set({ bodies: engine.getBodies(), logs: engine.getLogs() });
  },

  selectBody: (id: string | null) => set({ selectedBody: id }),
  setViewMode: (mode) => set({ viewMode: mode }),

  applyForce: (id: string, force: { x: number; y: number; z: number }) => {
    const { engine } = get();
    if (!engine) return;
    engine.applyForce(id, force);
  },

  setMaterial: (id: string, material: string) => {
    const { engine } = get();
    if (!engine) return;
    engine.setMaterial(id, material);
    set({ bodies: engine.getBodies() });
  },

  clearLogs: () => {
    const { engine } = get();
    if (!engine) return;
    engine.clearLogs();
    set({ logs: engine.getLogs() });
  },
}));