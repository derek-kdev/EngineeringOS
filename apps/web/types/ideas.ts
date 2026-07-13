// apps/web/types/ideas.ts

export type IdeaStatus = "draft" | "under_review" | "planned" | "in_progress" | "implemented" | "archived";

export type IdeaCategory = "hardware" | "software" | "process" | "research" | "other";

export interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: IdeaCategory;
  status: IdeaStatus;
  tags: string[];
  author: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  votes: number;
  userVote?: "up" | "down" | null;
  commentCount: number;
  comments: Comment[];
  attachments?: string[];
  isPinned?: boolean;
}

export interface IdeaStats {
  total: number;
  byStatus: Record<IdeaStatus, number>;
  byCategory: Record<IdeaCategory, number>;
  topContributors: Array<{ name: string; count: number }>;
}

export type SortOption = "latest" | "most_voted" | "most_commented" | "trending";
export type FilterOption = "all" | IdeaStatus;