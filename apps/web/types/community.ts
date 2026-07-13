// apps/web/types/community.ts

export type ChannelId = "all" | "general" | "engineering" | "ideas" | "showcase" | "help";

export interface Channel {
  id: ChannelId;
  label: string;
}

export type ReactionType = "like" | "insight" | "fire" | "rocket" | "handshake";

export interface ReactionCounts {
  like?: number;
  insight?: number;
  fire?: number;
  rocket?: number;
  handshake?: number;
}

export interface Attachment {
  type: "paper" | "prototype" | "project";
  title: string;
  href: string;
}

export interface CommunityAuthor {
  name: string;
  role: string;
  initial: string;
}

export interface CommunityPost {
  id: string;
  author: CommunityAuthor;
  channel: ChannelId;
  pinned?: boolean;
  timestamp: string;
  content: string;
  tags?: string[];
  attachment?: Attachment;
  reactions: ReactionCounts;
  commentCount: number;
}

export interface CommunityMember {
  id: string;
  name: string;
  initial: string;
  online: boolean;
}

export interface TrendingTopic {
  id: string;
  label: string;
  count: number;
}