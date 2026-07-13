// apps/web/lib/community-mock-data.ts
// TODO: replace with real API calls (see docs/ Community backend tasks — post CRUD,
// realtime updates via WebSocket/SSE, full-text search, @mention notifications).

import type { Channel, CommunityMember, CommunityPost, TrendingTopic } from "@/types/community";

export const CHANNELS: Channel[] = [
  { id: "all", label: "All" },
  { id: "general", label: "#general" },
  { id: "engineering", label: "#engineering" },
  { id: "ideas", label: "#ideas" },
  { id: "showcase", label: "#showcase" },
  { id: "help", label: "#help" },
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: { name: "Sarah Chen", role: "Materials Engineer", initial: "S" },
    channel: "showcase",
    pinned: true,
    timestamp: "2h ago",
    content:
      "Just published our thermal analysis on composite layups under sustained load. Findings suggest a 12% margin improvement over the previous panel spec.",
    tags: ["research", "materials"],
    attachment: {
      type: "paper",
      title: "Thermal Analysis of Composite Materials",
      href: "/dashboard/research",
    },
    reactions: { fire: 12, insight: 5 },
    commentCount: 7,
  },
  {
    id: "post-2",
    author: { name: "Michael Osei", role: "Manufacturing Lead", initial: "M" },
    channel: "help",
    timestamp: "4h ago",
    content:
      "Does anyone have solid experience with Inconel 718 machining parameters? Getting excessive tool wear at our current feed rate and could use a second opinion.",
    tags: ["manufacturing", "material-science"],
    reactions: { like: 3, insight: 2 },
    commentCount: 4,
  },
  {
    id: "post-3",
    author: { name: "Kingsley", role: "Lead Engineer", initial: "K" },
    channel: "showcase",
    timestamp: "6h ago",
    content:
      "Stress test v2 on the Mars Rover arm is done — cleared 3x the expected torque load before yield. Video and full data attached.",
    tags: ["prototype", "mars-rover"],
    attachment: {
      type: "prototype",
      title: "Mars Rover Arm — Stress Test v2",
      href: "/dashboard/prototypes",
    },
    reactions: { rocket: 23, fire: 9 },
    commentCount: 12,
  },
  {
    id: "post-4",
    author: { name: "Emily Zhao", role: "Simulation Engineer", initial: "E" },
    channel: "engineering",
    timestamp: "1d ago",
    content:
      "Wrote up a short guide on setting mesh density for FEA runs so we stop over-refining and burning compute on non-critical regions.",
    tags: ["simulation", "best-practices"],
    reactions: { insight: 15, like: 6 },
    commentCount: 9,
  },
  {
    id: "post-5",
    author: { name: "Daniel Osei", role: "Prototype Technician", initial: "D" },
    channel: "ideas",
    timestamp: "1d ago",
    content:
      "Brainstorming: what if the sensor array used a modular mount so we could swap payloads between the rover and the drone chassis?",
    tags: ["ideas", "sensor-array"],
    reactions: { handshake: 4, insight: 3 },
    commentCount: 6,
  },
];

export const ACTIVE_MEMBERS: CommunityMember[] = [
  { id: "m-1", name: "Kingsley", initial: "K", online: true },
  { id: "m-2", name: "Sarah", initial: "S", online: true },
  { id: "m-3", name: "Michael", initial: "M", online: true },
  { id: "m-4", name: "Emily", initial: "E", online: false },
  { id: "m-5", name: "Daniel", initial: "D", online: true },
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { id: "t-1", label: "Simulation best practices", count: 15 },
  { id: "t-2", label: "CAD file formats", count: 8 },
  { id: "t-3", label: "AI in engineering", count: 6 },
];