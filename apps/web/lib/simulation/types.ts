// apps/web/lib/simulation/types.ts

export interface ResearchData {
  id: string;
  projectId: string;
  status: "draft" | "in_progress" | "completed";
  findings: string;
  parameters: {
    material: string;
    forceApplied: number;
    ambientTemperature: number;
    frictionCoefficient: number;
    maxStressTolerance: number;
    thermalLimit: number;
  };
  recommendations: string[];
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "On Hold" | "Completed" | "Archived";
  researchCompleted: boolean;
  researchData?: ResearchData;
  simulationCount: number;
  lastSimulated?: string;
}

export interface Simulation {
  id: string;
  projectId: string;
  name: string;
  status: "draft" | "running" | "paused" | "completed" | "failed";
  parameters: {
    material: string;
    forceApplied: number;
    ambientTemperature: number;
    frictionCoefficient: number;
  };
  results?: {
    maxStress: number;
    maxTemperature: number;
    factorOfSafety: number;
    displacement: number;
    efficiency: number;
  };
  logs: string[];
  startedAt?: string;
  completedAt?: string;
  duration: number;
}