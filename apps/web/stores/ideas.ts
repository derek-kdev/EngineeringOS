// apps/web/stores/ideas.ts
import { create } from "zustand";
import { Idea, IdeaStats, SortOption, FilterOption, Comment } from "@/types/ideas";

// Mock Data
const mockIdeas: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Thermal Management",
    description:
      "Use machine learning to predict overheating before it happens, reducing prototype failure by 40%. The system would learn from historical simulation data and provide early warnings with suggested corrective actions.",
    category: "software",
    status: "under_review",
    tags: ["AI", "Thermal", "Predictive"],
    author: "Sarah",
    createdAt: "2026-07-11T10:30:00Z",
    updatedAt: "2026-07-11T10:30:00Z",
    votes: 24,
    userVote: null,
    commentCount: 12,
    comments: [
      {
        id: "c1",
        author: "Michael",
        content:
          "This is brilliant. We could integrate this with the existing simulation engine.",
        createdAt: "2026-07-11T14:20:00Z",
        replies: [
          {
            id: "c1r1",
            author: "Sarah",
            content: "Exactly my thought! I've already started prototyping the ML model.",
            createdAt: "2026-07-11T16:00:00Z",
          },
        ],
      },
    ],
    isPinned: true,
  },
  {
    id: "2",
    title: "Modular Battery System",
    description:
      "Design a swappable battery pack for space applications. Standardised connectors and hot-swappable functionality with built-in health monitoring.",
    category: "hardware",
    status: "planned",
    tags: ["Battery", "Space", "Modular"],
    author: "Michael",
    createdAt: "2026-07-08T09:15:00Z",
    updatedAt: "2026-07-09T11:00:00Z",
    votes: 18,
    userVote: null,
    commentCount: 8,
    comments: [],
  },
  {
    id: "3",
    title: "Advanced Sensor Fusion",
    description:
      "Combine LIDAR, radar, and thermal cameras for autonomous navigation in extreme environments. Focus on low-latency data fusion and redundancy.",
    category: "hardware",
    status: "draft",
    tags: ["Sensors", "Autonomous", "Navigation"],
    author: "Emily",
    createdAt: "2026-07-05T08:00:00Z",
    updatedAt: "2026-07-06T10:00:00Z",
    votes: 10,
    userVote: null,
    commentCount: 5,
    comments: [],
  },
  {
    id: "4",
    title: "Digital Twin for Manufacturing",
    description:
      "Create a real-time digital twin of the manufacturing floor to simulate production changes before deployment, reducing downtime by 30%.",
    category: "process",
    status: "in_progress",
    tags: ["Digital Twin", "Manufacturing", "Simulation"],
    author: "Kingsley",
    createdAt: "2026-07-01T13:00:00Z",
    updatedAt: "2026-07-10T09:00:00Z",
    votes: 32,
    userVote: null,
    commentCount: 15,
    comments: [],
  },
  {
    id: "5",
    title: "Quantum-Resistant Encryption",
    description:
      "Prepare our communication protocols for the post-quantum era by implementing NIST-recommended quantum-resistant algorithms.",
    category: "software",
    status: "implemented",
    tags: ["Security", "Quantum", "Encryption"],
    author: "David",
    createdAt: "2026-06-20T11:00:00Z",
    updatedAt: "2026-07-12T08:00:00Z",
    votes: 45,
    userVote: null,
    commentCount: 20,
    comments: [],
  },
  {
    id: "6",
    title: "Sustainable Materials Database",
    description:
      "Build a searchable database of sustainable engineering materials with full lifecycle analysis, carbon footprint, and recyclability metrics.",
    category: "research",
    status: "under_review",
    tags: ["Sustainability", "Materials", "Database"],
    author: "Sarah",
    createdAt: "2026-07-09T14:00:00Z",
    updatedAt: "2026-07-09T14:00:00Z",
    votes: 15,
    userVote: null,
    commentCount: 4,
    comments: [],
  },
];

interface IdeasState {
  ideas: Idea[];
  selectedIdea: Idea | null;
  sort: SortOption;
  filter: FilterOption;
  searchQuery: string;
  stats: IdeaStats | null;
  isLoading: boolean;

  // Actions
  fetchIdeas: () => void;
  fetchIdeaById: (id: string) => void;
  createIdea: (idea: Omit<Idea, "id" | "createdAt" | "updatedAt" | "votes" | "commentCount" | "comments">) => void;
  updateIdea: (id: string, updates: Partial<Idea>) => void;
  deleteIdea: (id: string) => void;
  vote: (id: string, direction: "up" | "down") => void;
  addComment: (ideaId: string, content: string, parentId?: string) => void;
  setSort: (sort: SortOption) => void;
  setFilter: (filter: FilterOption) => void;
  setSearchQuery: (query: string) => void;
  promoteToProject: (id: string) => void;
}

export const useIdeasStore = create<IdeasState>((set, get) => ({
  ideas: [],
  selectedIdea: null,
  sort: "latest",
  filter: "all",
  searchQuery: "",
  stats: null,
  isLoading: false,

  fetchIdeas: () => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
      set({
        ideas: mockIdeas,
        isLoading: false,
      });
      get().calculateStats();
    }, 500);
  },

  fetchIdeaById: (id: string) => {
    const idea = get().ideas.find((i) => i.id === id);
    if (idea) {
      set({ selectedIdea: idea });
    } else {
      // Simulate API fetch
      const mockIdea = mockIdeas.find((i) => i.id === id);
      if (mockIdea) {
        set({ selectedIdea: mockIdea });
      }
    }
  },

  createIdea: (ideaData) => {
    const newIdea: Idea = {
      ...ideaData,
      id: `idea-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      votes: 0,
      commentCount: 0,
      comments: [],
    };
    set((state) => ({
      ideas: [newIdea, ...state.ideas],
    }));
    get().calculateStats();
  },

  updateIdea: (id: string, updates: Partial<Idea>) => {
    set((state) => ({
      ideas: state.ideas.map((idea) =>
        idea.id === id ? { ...idea, ...updates, updatedAt: new Date().toISOString() } : idea
      ),
    }));
    get().calculateStats();
  },

  deleteIdea: (id: string) => {
    set((state) => ({
      ideas: state.ideas.filter((idea) => idea.id !== id),
    }));
    get().calculateStats();
  },

  vote: (id: string, direction: "up" | "down") => {
    set((state) => ({
      ideas: state.ideas.map((idea) => {
        if (idea.id !== id) return idea;
        const currentVote = idea.userVote;
        let newVotes = idea.votes;
        let newUserVote: "up" | "down" | null = direction;

        if (currentVote === direction) {
          // Remove vote
          newVotes -= direction === "up" ? 1 : -1;
          newUserVote = null;
        } else if (currentVote === null) {
          // New vote
          newVotes += direction === "up" ? 1 : -1;
        } else {
          // Switch vote
          newVotes += direction === "up" ? 2 : -2;
        }

        return {
          ...idea,
          votes: newVotes,
          userVote: newUserVote,
        };
      }),
    }));
  },

  addComment: (ideaId: string, content: string, parentId?: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: "Kingsley", // This would come from auth
      content,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    set((state) => ({
      ideas: state.ideas.map((idea) => {
        if (idea.id !== ideaId) return idea;

        let updatedComments = [...idea.comments];

        if (parentId) {
          // Find parent comment and add reply
          updatedComments = updatedComments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              };
            }
            return comment;
          });
        } else {
          updatedComments = [...updatedComments, newComment];
        }

        return {
          ...idea,
          comments: updatedComments,
          commentCount: updatedComments.length,
        };
      }),
    }));
  },

  setSort: (sort: SortOption) => set({ sort }),
  setFilter: (filter: FilterOption) => set({ filter }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),

  promoteToProject: (id: string) => {
    set((state) => ({
      ideas: state.ideas.map((idea) =>
        idea.id === id ? { ...idea, status: "in_progress", updatedAt: new Date().toISOString() } : idea
      ),
    }));
    get().calculateStats();
  },

  calculateStats: () => {
    const { ideas } = get();
    const byStatus: Record<IdeaStatus, number> = {
      draft: 0,
      under_review: 0,
      planned: 0,
      in_progress: 0,
      implemented: 0,
      archived: 0,
    };
    const byCategory: Record<IdeaCategory, number> = {
      hardware: 0,
      software: 0,
      process: 0,
      research: 0,
      other: 0,
    };
    const authorMap: Record<string, number> = {};

    ideas.forEach((idea) => {
      byStatus[idea.status] = (byStatus[idea.status] || 0) + 1;
      byCategory[idea.category] = (byCategory[idea.category] || 0) + 1;
      authorMap[idea.author] = (authorMap[idea.author] || 0) + 1;
    });

    const topContributors = Object.entries(authorMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    set({
      stats: {
        total: ideas.length,
        byStatus,
        byCategory,
        topContributors,
      },
    });
  },
}));