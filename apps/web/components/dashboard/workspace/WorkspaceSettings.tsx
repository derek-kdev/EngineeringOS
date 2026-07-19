// apps/web/components/dashboard/workspace/WorkspaceSettings.tsx
"use client";

import { useState } from "react";
import { Organization } from "@/types/organization";
import GeneralTab from "./GeneralTab";
import MembersTab from "./MembersTab";
import InvitationsTab from "./InvitationsTab";

interface WorkspaceSettingsProps {
  organizationId: string;
  organizations: Organization[];
  onSwitchOrg: (id: string) => void;
}

export default function WorkspaceSettings({
  organizationId,
  organizations,
  onSwitchOrg,
}: WorkspaceSettingsProps) {
  const [activeTab, setActiveTab] = useState<"general" | "members" | "invitations">("general");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B132B]/80 backdrop-blur-2xl p-6">
      {/* Org Switcher */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm text-white/60">Workspace:</label>
          <select
            value={organizationId}
            onChange={(e) => onSwitchOrg(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0B132B] px-3 py-2 text-white"
          >
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("general")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === "general"
              ? "bg-[#00D2FF]/10 text-[#00D2FF]"
              : "text-white/60 hover:text-white"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === "members"
              ? "bg-[#00D2FF]/10 text-[#00D2FF]"
              : "text-white/60 hover:text-white"
          }`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab("invitations")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === "invitations"
              ? "bg-[#00D2FF]/10 text-[#00D2FF]"
              : "text-white/60 hover:text-white"
          }`}
        >
          Invitations
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "general" && <GeneralTab organizationId={organizationId} />}
        {activeTab === "members" && <MembersTab organizationId={organizationId} />}
        {activeTab === "invitations" && <InvitationsTab organizationId={organizationId} />}
      </div>
    </div>
  );
}