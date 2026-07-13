// apps/web/types/research.ts

export interface ExtractedParameter {
  id: string;
  name: string;
  value: number | string;
  unit?: string;
  source: string; // document ID or "user"
  confidence: number; // 0-1
  verified: boolean;
}

export interface ResearchDocument {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  content: string; // plain text extracted
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  category: "material_science" | "thermodynamics" | "aerodynamics" | "structural" | "electrical" | "software" | "other";
  uploadedAt: string;
  updatedAt: string;
  tags: string[];
  citations: number;
  extractedParams: ExtractedParameter[];
  linkedProjects: string[];
  linkedPrototypes: string[];
  isProcessing: boolean;
  processingError?: string;
}

export interface ResearchChat {
  id: string;
  documentId?: string; // if null, chat is across all documents
  question: string;
  answer: string;
  citations: Array<{
    documentId: string;
    title: string;
    snippet: string;
  }>;
  createdAt: string;
}

export interface ResearchStats {
  totalDocuments: number;
  totalCitations: number;
  extractedParamsCount: number;
  categories: Record<string, number>;
  recentUploads: ResearchDocument[];
  topDocuments: ResearchDocument[];
}

export interface GenerateProjectData {
  name: string;
  description: string;
  material: string;
  forceApplied: number;
  ambientTemperature: number;
  frictionCoefficient: number;
  parameters: Record<string, any>;
  sourceDocuments: string[];
}