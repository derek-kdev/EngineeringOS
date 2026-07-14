// apps/web/app/dashboard/projects/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth.providers";
import { ArrowLeft, Users, Calendar, FolderKanban } from "lucide-react";
import JoinRequestButton from "@/components/join/JoinRequestButton";
import PendingRequestsPanel from "@/components/join/PendingRequestsPanel";


const fetchProject = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const mockProjects: Record<string, any> = {
    "1": {
      id: "1",
      name: "Mars Rover v2",
      description: "Next-gen rover for Martian terrain exploration.",
      creatorId: "user-1",
      createdAt: "2026-07-01T10:00:00Z",
      members: 5,
      status: "active",
    },
    "2": {
      id: "2",
      name: "Sensor Array",
      description: "High-precision environmental sensor network.",
      creatorId: "user-2",
      createdAt: "2026-06-15T14:30:00Z",
      members: 3,
      status: "completed",
    },
    "3": {
      id: "3",
      name: "Thermal Analysis",
      description: "Heat dissipation simulation for satellite components.",
      creatorId: "user-1",
      createdAt: "2026-06-20T09:00:00Z",
      members: 2,
      status: "on_hold",
    },
    "4": {
      id: "4",
      name: "AI Assistant",
      description: "LLM-powered engineering assistant for design optimization.",
      creatorId: "user-3",
      createdAt: "2026-07-05T11:00:00Z",
      members: 4,
      status: "active",
    },
    "5": {
      id: "5",
      name: "Battery Pack",
      description: "High-capacity lithium-ion battery for space applications.",
      creatorId: "user-1",
      createdAt: "2026-06-28T13:00:00Z",
      members: 6,
      status: "active",
    },
    "6": {
      id: "6",
      name: "Structural Analysis",
      description: "Finite element analysis for launch vehicle structure.",
      creatorId: "user-2",
      createdAt: "2026-05-15T08:00:00Z",
      members: 2,
      status: "completed",
    },
  };

  return mockProjects[id] || null;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      const data = await fetchProject(params.id as string);
      setProject(data);
      setLoading(false);
    };
    loadProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF6200] border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <FolderKanban size={48} className="text-white/20" />
        <h2 className="mt-4 text-xl font-medium text-white">Project not found</h2>
        <p className="mt-1 text-sm text-white/40">The project you're looking for doesn't exist.</p>
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="mt-4 rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2 text-sm font-semibold text-black"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const isCreator = user?.id === project.creatorId;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
      >
        <ArrowLeft size={16} /> Back to Projects
      </button>

      <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-8 backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <Users size={14} />
                {project.members} members
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${
                  project.status === "active" ? "bg-emerald-400" :
                  project.status === "completed" ? "bg-blue-400" :
                  "bg-amber-400"
                }`} />
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
          </div>

          {!isCreator && (
            <JoinRequestButton
              targetId={project.id}
              targetType="project"
              creatorId={project.creatorId}
            />
          )}
        </div>

        <p className="mt-4 text-white/80 leading-relaxed">{project.description}</p>
      </div>

      {isCreator && (
        <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
          <PendingRequestsPanel targetId={project.id} targetType="project" />
        </div>
      )}
    </div>
  );
}