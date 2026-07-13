// apps/web/stores/research.ts
import { create } from "zustand";
import { ResearchDocument, ResearchChat, ResearchStats, ExtractedParameter, GenerateProjectData } from "@/types/research";

// Mock documents
const mockDocuments: ResearchDocument[] = [
  {
    id: "doc-1",
    title: "Thermal Analysis of Composite Materials for Aerospace Applications",
    authors: ["Sarah Johnson", "Michael Chen"],
    abstract: "This study investigates the thermal conductivity and expansion properties of carbon-fiber reinforced composites under extreme temperature conditions (-50°C to 200°C). Results indicate superior thermal stability compared to traditional aluminum alloys.",
    content: "Full content of the paper... (simulated)",
    fileUrl: "/uploads/doc1.pdf",
    fileName: "thermal_analysis_composites.pdf",
    fileSize: 2450000,
    fileType: "application/pdf",
    category: "material_science",
    uploadedAt: "2026-07-12T10:30:00Z",
    updatedAt: "2026-07-12T10:30:00Z",
    tags: ["composites", "thermal", "aerospace"],
    citations: 5,
    extractedParams: [
      { id: "p1", name: "Young's Modulus", value: 120, unit: "GPa", source: "doc-1", confidence: 0.95, verified: true },
      { id: "p2", name: "Yield Strength", value: 450, unit: "MPa", source: "doc-1", confidence: 0.92, verified: true },
      { id: "p3", name: "Thermal Expansion", value: 12, unit: "×10⁻⁶/°C", source: "doc-1", confidence: 0.88, verified: false },
    ],
    linkedProjects: ["proj-3"],
    linkedPrototypes: [],
    isProcessing: false,
  },
  {
    id: "doc-2",
    title: "Mars Rover Arm – Stress Analysis Report",
    authors: ["Michael Chen", "Kingsley"],
    abstract: "Detailed FEA analysis of the Mars Rover robotic arm under various load conditions. Maximum stress observed at joint 3 under 500N load. Recommendations include material reinforcement and design optimization.",
    content: "Full content of the report... (simulated)",
    fileUrl: "/uploads/doc2.pdf",
    fileName: "mars_rover_stress_report.pdf",
    fileSize: 3200000,
    fileType: "application/pdf",
    category: "structural",
    uploadedAt: "2026-07-10T14:15:00Z",
    updatedAt: "2026-07-11T09:00:00Z",
    tags: ["mars", "rover", "stress", "fea"],
    citations: 3,
    extractedParams: [
      { id: "p4", name: "Force Applied", value: 500, unit: "N", source: "doc-2", confidence: 0.98, verified: true },
      { id: "p5", name: "Ambient Temperature", value: 25, unit: "°C", source: "doc-2", confidence: 0.95, verified: true },
      { id: "p6", name: "Friction Coefficient", value: 0.3, source: "doc-2", confidence: 0.85, verified: false },
    ],
    linkedProjects: ["proj-1"],
    linkedPrototypes: ["proto-1"],
    isProcessing: false,
  },
  {
    id: "doc-3",
    title: "Sustainable Materials Database – Lifecycle Analysis",
    authors: ["Sarah Johnson", "Emily Davis"],
    abstract: "A comprehensive lifecycle analysis of sustainable engineering materials including carbon footprint, recyclability, and cost metrics. Provides a framework for material selection in eco-conscious design.",
    content: "Full content of the paper... (simulated)",
    fileUrl: "/uploads/doc3.pdf",
    fileName: "sustainable_materials_lca.pdf",
    fileSize: 1800000,
    fileType: "application/pdf",
    category: "material_science",
    uploadedAt: "2026-07-08T11:00:00Z",
    updatedAt: "2026-07-09T16:30:00Z",
    tags: ["sustainability", "materials", "lca"],
    citations: 8,
    extractedParams: [
      { id: "p7", name: "Material Density", value: 2700, unit: "kg/m³", source: "doc-3", confidence: 0.90, verified: true },
      { id: "p8", name: "Recyclability Index", value: 85, unit: "%", source: "doc-3", confidence: 0.75, verified: false },
    ],
    linkedProjects: [],
    linkedPrototypes: [],
    isProcessing: false,
  },
];

const mockChats: ResearchChat[] = [
  {
    id: "chat-1",
    documentId: "doc-1",
    question: "What is the thermal expansion coefficient of the composite material?",
    answer: "According to the study, the carbon-fiber reinforced composite has a thermal expansion coefficient of 12 × 10⁻⁶/°C, which is significantly lower than aluminum (23 × 10⁻⁶/°C). This makes it suitable for aerospace applications where thermal stability is critical.",
    citations: [
      {
        documentId: "doc-1",
        title: "Thermal Analysis of Composite Materials",
        snippet: "The coefficient of thermal expansion was measured at 12 × 10⁻⁶/°C across the temperature range of -50°C to 200°C.",
      },
    ],
    createdAt: "2026-07-12T14:20:00Z",
  },
  {
    id: "chat-2",
    question: "Summarise the key findings from all research papers on materials for space applications.",
    answer: "Based on the analysis of 3 research papers on space materials: 1) Carbon-fiber composites show excellent thermal stability (α=12e-6/°C). 2) Aluminum 6061 remains cost-effective but has higher thermal expansion (23e-6/°C). 3) Titanium offers the best strength-to-weight ratio but at higher cost. Recommendation: Use composites for thermal-critical components and titanium for high-stress structural elements.",
    citations: [
      {
        documentId: "doc-1",
        title: "Thermal Analysis of Composite Materials",
        snippet: "Composites show superior thermal stability...",
      },
      {
        documentId: "doc-2",
        title: "Mars Rover Arm – Stress Analysis",
        snippet: "Aluminum 6061 used in current design...",
      },
    ],
    createdAt: "2026-07-13T09:00:00Z",
  },
];

interface ResearchState {
  documents: ResearchDocument[];
  chats: ResearchChat[];
  selectedDocument: ResearchDocument | null;
  selectedChat: ResearchChat | null;
  stats: ResearchStats | null;
  isLoading: boolean;
  isUploading: boolean;
  isProcessing: boolean;
  uploadProgress: number;

  // Actions
  fetchDocuments: () => void;
  fetchDocumentById: (id: string) => void;
  uploadDocument: (file: File, metadata: Partial<ResearchDocument>) => Promise<void>;
  deleteDocument: (id: string) => void;
  extractParameters: (documentId: string) => Promise<void>;
  verifyParameter: (documentId: string, parameterId: string) => void;
  sendChatMessage: (question: string, documentId?: string) => Promise<void>;
  generateProject: (documentId: string) => GenerateProjectData | null;
  linkDocumentToProject: (documentId: string, projectId: string) => void;
  linkDocumentToPrototype: (documentId: string, prototypeId: string) => void;
  calculateStats: () => void;
}

export const useResearchStore = create<ResearchState>((set, get) => ({
  documents: [],
  chats: [],
  selectedDocument: null,
  selectedChat: null,
  stats: null,
  isLoading: false,
  isUploading: false,
  isProcessing: false,
  uploadProgress: 0,

  fetchDocuments: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({
        documents: mockDocuments,
        isLoading: false,
      });
      get().calculateStats();
    }, 500);
  },

  fetchDocumentById: (id: string) => {
    const doc = get().documents.find((d) => d.id === id);
    if (doc) {
      set({ selectedDocument: doc });
    } else {
      const mockDoc = mockDocuments.find((d) => d.id === id);
      if (mockDoc) {
        set({ selectedDocument: mockDoc });
      }
    }
  },

  uploadDocument: async (file: File, metadata: Partial<ResearchDocument>) => {
    set({ isUploading: true, uploadProgress: 0 });

    // Simulate upload progress
    const intervals = [10, 25, 40, 55, 70, 85, 95, 100];
    for (const progress of intervals) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      set({ uploadProgress: progress });
    }

    // Simulate AI processing delay
    set({ isProcessing: true });

    // Create new document
    const newDoc: ResearchDocument = {
      id: `doc-${Date.now()}`,
      title: metadata.title || file.name,
      authors: metadata.authors || ["Unknown"],
      abstract: metadata.abstract || "Document uploaded. AI extraction in progress...",
      content: "Content extracted from document. (simulated)",
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      category: metadata.category || "other",
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: metadata.tags || [],
      citations: 0,
      extractedParams: [],
      linkedProjects: [],
      linkedPrototypes: [],
      isProcessing: true,
    };

    set((state) => ({
      documents: [newDoc, ...state.documents],
      isUploading: false,
      uploadProgress: 100,
    }));

    // Simulate AI parameter extraction
    await get().extractParameters(newDoc.id);
  },

  extractParameters: async (documentId: string) => {
    set({ isProcessing: true });

    // Simulate AI extraction delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate extracted parameters based on document
    const mockExtractedParams: ExtractedParameter[] = [
      {
        id: `p-${Date.now()}`,
        name: "Young's Modulus",
        value: Math.round(50 + Math.random() * 150),
        unit: "GPa",
        source: documentId,
        confidence: 0.7 + Math.random() * 0.25,
        verified: false,
      },
      {
        id: `p-${Date.now() + 1}`,
        name: "Yield Strength",
        value: Math.round(100 + Math.random() * 400),
        unit: "MPa",
        source: documentId,
        confidence: 0.7 + Math.random() * 0.25,
        verified: false,
      },
      {
        id: `p-${Date.now() + 2}`,
        name: "Thermal Expansion",
        value: (10 + Math.random() * 20).toFixed(1),
        unit: "×10⁻⁶/°C",
        source: documentId,
        confidence: 0.6 + Math.random() * 0.3,
        verified: false,
      },
    ];

    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              extractedParams: mockExtractedParams,
              isProcessing: false,
              abstract: "AI extraction complete. Parameters ready for verification.",
            }
          : doc
      ),
      isProcessing: false,
    }));
  },

  verifyParameter: (documentId: string, parameterId: string) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              extractedParams: doc.extractedParams.map((p) =>
                p.id === parameterId ? { ...p, verified: true, confidence: 1 } : p
              ),
            }
          : doc
      ),
    }));
  },

  deleteDocument: (id: string) => {
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    }));
    get().calculateStats();
  },

  sendChatMessage: async (question: string, documentId?: string) => {
    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newChat: ResearchChat = {
      id: `chat-${Date.now()}`,
      documentId,
      question,
      answer: `Based on the research documents available${documentId ? ' in the selected document' : ''}, I can provide the following analysis: The engineering parameters suggest optimal performance under the specified conditions. For more detailed insights, please consult the source documents or refine your question.`,
      citations: get().documents.slice(0, 2).map((doc) => ({
        documentId: doc.id,
        title: doc.title,
        snippet: doc.abstract.slice(0, 100) + "...",
      })),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
      selectedChat: newChat,
    }));
  },

  generateProject: (documentId: string) => {
    const doc = get().documents.find((d) => d.id === documentId);
    if (!doc || doc.extractedParams.length === 0) return null;

    const params = doc.extractedParams;
    const material = params.find((p) => p.name.includes("Material") || p.name.includes("material"))?.value as string || "Unknown";
    const force = params.find((p) => p.name.includes("Force") || p.name.includes("force"))?.value as number || 500;
    const temp = params.find((p) => p.name.includes("Temperature") || p.name.includes("temperature"))?.value as number || 25;
    const friction = params.find((p) => p.name.includes("Friction") || p.name.includes("friction"))?.value as number || 0.3;

    return {
      name: `${doc.title.replace(/^(A|The)\s+/, '').split('.')[0].slice(0, 50)} - Project`,
      description: `Project generated from research document: "${doc.title}". Parameters extracted by AI analysis.`,
      material: String(material),
      forceApplied: Number(force),
      ambientTemperature: Number(temp),
      frictionCoefficient: Number(friction),
      parameters: params.reduce((acc, p) => ({ ...acc, [p.name]: p.value }), {}),
      sourceDocuments: [doc.id],
    };
  },

  linkDocumentToProject: (documentId: string, projectId: string) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId
          ? { ...doc, linkedProjects: [...doc.linkedProjects, projectId] }
          : doc
      ),
    }));
  },

  linkDocumentToPrototype: (documentId: string, prototypeId: string) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === documentId
          ? { ...doc, linkedPrototypes: [...doc.linkedPrototypes, prototypeId] }
          : doc
      ),
    }));
  },

  calculateStats: () => {
    const { documents } = get();
    const categories: Record<string, number> = {};
    documents.forEach((doc) => {
      categories[doc.category] = (categories[doc.category] || 0) + 1;
    });

    const sorted = [...documents].sort((a, b) => a.citations - b.citations);

    set({
      stats: {
        totalDocuments: documents.length,
        totalCitations: documents.reduce((sum, doc) => sum + doc.citations, 0),
        extractedParamsCount: documents.reduce((sum, doc) => sum + doc.extractedParams.length, 0),
        categories,
        recentUploads: documents.slice(0, 5),
        topDocuments: sorted.slice(-5).reverse(),
      },
    });
  },
}));