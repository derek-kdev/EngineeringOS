// apps/web/app/dashboard/projects/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link"; // ✅ Added for navigation
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Upload,
  Download,
  Calendar,
  Users,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

// Types & Mock Data (unchanged)
interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "On Hold" | "Completed" | "Archived";
  progress: number;
  members: number;
  dueDate: string;
  team: string[];
  accessCode: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Mars Rover v2",
    description: "Next-gen rover for Martian terrain exploration",
    status: "Active",
    progress: 72,
    members: 5,
    dueDate: "2026-07-20",
    team: ["Kingsley", "Sarah", "Michael", "Emily", "David"],
    accessCode: "MARS-42A9",
  },
  {
    id: "2",
    name: "Sensor Array",
    description: "High-precision environmental sensor network",
    status: "Completed",
    progress: 100,
    members: 3,
    dueDate: "2026-06-30",
    team: ["Kingsley", "Sarah", "Michael"],
    accessCode: "SENS-7F3E",
  },
  {
    id: "3",
    name: "Thermal Analysis",
    description: "Heat dissipation simulation for satellite components",
    status: "On Hold",
    progress: 40,
    members: 2,
    dueDate: "2026-08-05",
    team: ["Kingsley", "Emily"],
    accessCode: "THER-9B2D",
  },
  {
    id: "4",
    name: "AI Assistant",
    description: "LLM-powered engineering assistant for design optimization",
    status: "Active",
    progress: 60,
    members: 4,
    dueDate: "2026-08-12",
    team: ["Kingsley", "Michael", "David", "Sarah"],
    accessCode: "AIAS-5C8F",
  },
  {
    id: "5",
    name: "Battery Pack",
    description: "High-capacity lithium-ion battery for space applications",
    status: "Active",
    progress: 55,
    members: 6,
    dueDate: "2026-09-01",
    team: ["Kingsley", "Sarah", "Emily", "Michael", "David", "Anonymous"],
    accessCode: "BATT-3E7A",
  },
  {
    id: "6",
    name: "Structural Analysis",
    description: "Finite element analysis for launch vehicle structure",
    status: "Archived",
    progress: 50,
    members: 2,
    dueDate: "2026-05-15",
    team: ["Kingsley", "Michael"],
    accessCode: "STRU-1D4C",
  },
];

const statusColors = {
  Active: "border-l-emerald-400",
  "On Hold": "border-l-amber-400",
  Completed: "border-l-blue-400",
  Archived: "border-l-zinc-500",
};

const statusBadges = {
  Active: "🟢 Active",
  "On Hold": "⏸ On Hold",
  Completed: "✅ Completed",
  Archived: "📦 Archived",
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [projects] = useState(mockProjects);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    return statusBadges[status as keyof typeof statusBadges] || status;
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-sm text-white/70">{filteredProjects.length} projects found</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 rounded-lg border border-[#FF6200]/20 bg-[#111111]/80 px-9 py-2 text-sm text-white placeholder-white focus:border-[#FF8A00] focus:outline-none focus:ring-1 focus:ring-[#FF8A00]/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-white" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-[#FF6200]/20 bg-[#111111]/80 px-4 py-2 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-[#FF6200]/20 px-4 py-2 text-sm text-white hover:bg-[#FF6200]/10 hover:text-[#FFB300] transition">
            <Upload size={16} /> Import
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#FF6200]/20 px-4 py-2 text-sm text-white hover:bg-[#FF6200]/10 hover:text-[#FFB300] transition">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-5 py-2 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,138,0,0.3)]">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <AnimatedCard
            key={project.id}
            delay={index * 0.06}
            direction="up"
            glow={true}
            className={`
              rounded-xl border border-[#FF6200]/20
              bg-[#111111]/80 p-5 backdrop-blur-xl
              transition-all hover:border-[#FF8A00]/40
              ${statusColors[project.status as keyof typeof statusColors]}
              border-l-4
            `}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white truncate group-hover:text-[#FFB300] transition">
                    {project.name}
                  </h3>
                  <p className="text-sm text-white/80 truncate">{project.description}</p>
                </div>
                <span className="text-xs font-medium text-white whitespace-nowrap ml-2">
                  {getStatusBadge(project.status)}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#1F1F1F]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-white">Code:</span>
                <code className="rounded bg-[#1F1F1F] px-2 py-0.5 text-xs font-mono text-[#FFB300]">
                  {project.accessCode}
                </code>
                <button
                  onClick={() => handleCopy(project.accessCode, project.id)}
                  className="rounded bg-[#FF6200]/20 p-1 text-xs text-[#FFB300] hover:bg-[#FF6200]/40 transition"
                  aria-label="Copy access code"
                >
                  {copiedId === project.id ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-white">
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>{project.members}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{project.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[#FF6200]/10 pt-3">
                {/* ✅ FIXED: "View" button now links to the detail page */}
                <Link href={`/dashboard/projects/${project.id}`}>
                  <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1 text-xs text-white transition hover:bg-[#FF6200]/10 hover:border-[#FF8A00]">
                    View
                  </button>
                </Link>
                <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1 text-xs text-white transition hover:bg-[#FF6200]/10 hover:border-[#FF8A00]">
                  Edit
                </button>
                <button className="rounded-lg border border-[#FF6200]/20 px-3 py-1 text-xs text-white transition hover:bg-[#FF6200]/10 hover:text-[#FFB300]">
                  Duplicate
                </button>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-16 text-center">
          <div className="text-5xl mb-4">📁</div>
          <h3 className="text-xl font-medium text-white">No projects found</h3>
          <p className="mt-1 text-sm text-white/80">Try adjusting your search or filter.</p>
          <button className="mt-6 rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,138,0,0.3)]">
            + Create New Project
          </button>
        </div>
      )}
    </div>
  );
}