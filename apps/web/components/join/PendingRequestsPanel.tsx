// apps/web/components/join/PendingRequestsPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { Check, X, User, Loader2 } from "lucide-react";

interface JoinRequest {
  id: string;
  targetType: "project" | "idea";
  targetId: string;
  requestorId: string;
  creatorId: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  createdAt: string;
  requestor: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
  };
}

interface PendingRequestsPanelProps {
  targetId: string;
  targetType: "project" | "idea";
}

// Mock data – used as fallback when API is not ready
const mockRequests: JoinRequest[] = [
  {
    id: "req-1",
    targetType: "project",
    targetId: "1",
    requestorId: "user-2",
    creatorId: "user-1",
    status: "pending",
    message: "I'd love to contribute to this project!",
    createdAt: new Date().toISOString(),
    requestor: {
      id: "user-2",
      fullName: "Sarah Johnson",
      email: "sarah@engineering.com",
    },
  },
  {
    id: "req-2",
    targetType: "project",
    targetId: "1",
    requestorId: "user-3",
    creatorId: "user-1",
    status: "pending",
    message: "I have experience with similar designs.",
    createdAt: new Date().toISOString(),
    requestor: {
      id: "user-3",
      fullName: "Michael Chen",
      email: "michael@engineering.com",
    },
  },
];

export default function PendingRequestsPanel({
  targetId,
  targetType,
}: PendingRequestsPanelProps) {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [useMock, setUseMock] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${targetType}s/${targetId}/requests`);
      if (!response.ok) throw new Error("API not ready");
      const data = await response.json();
      setRequests(data.filter((r: JoinRequest) => r.status === "pending"));
      setUseMock(false);
    } catch {
      // Silently fallback to mock data – no console errors
      setRequests(
        mockRequests.filter(
          (r) => r.targetId === targetId && r.targetType === targetType
        )
      );
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [targetId]);

  const handleDecision = async (requestId: string, action: "approve" | "reject") => {
    setProcessing(requestId);
    try {
      // If we're using mock data, just update locally
      if (useMock) {
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
        setProcessing(null);
        return;
      }

      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" }),
      });
      if (!response.ok) throw new Error("API not ready");

      // Refresh list after decision
      await fetchRequests();
    } catch {
      // Silently remove the request from the list (optimistic update)
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 size={24} className="animate-spin text-[#FFB300]" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-6 text-center">
        <p className="text-sm text-white/40">No pending join requests.</p>
        {useMock && (
          <p className="mt-1 text-xs text-white/20">(Using mock data – API not connected)</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">
        Pending Join Requests ({requests.length})
        {useMock && (
          <span className="ml-2 text-xs text-white/30">(mock data)</span>
        )}
      </h3>
      {requests.map((request) => (
        <div
          key={request.id}
          className="flex items-center justify-between rounded-xl border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6200]/20 text-xs font-bold text-[#FFB300]">
              {request.requestor.fullName?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {request.requestor.fullName || request.requestor.email}
              </p>
              {request.message && (
                <p className="text-xs text-white/40 italic">"{request.message}"</p>
              )}
              <p className="text-xs text-white/30">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDecision(request.id, "approve")}
              disabled={processing === request.id}
              className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400 hover:bg-emerald-500/30 transition disabled:opacity-50"
              title="Admit"
            >
              {processing === request.id ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
            </button>
            <button
              onClick={() => handleDecision(request.id, "reject")}
              disabled={processing === request.id}
              className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500/30 transition disabled:opacity-50"
              title="Reject"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}