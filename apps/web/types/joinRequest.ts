// apps/web/types/joinRequest.ts
export interface JoinRequest {
  id: string;
  targetType: "project" | "idea";
  targetId: string;
  requestorId: string;
  creatorId: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  createdAt: string;
  updatedAt: string;
  requestor: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
  };
}