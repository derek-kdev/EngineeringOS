// apps/web/app/dashboard/workspace/page.tsx
"use client";

import { useState } from "react";
import { useOrganizations } from "@/hooks/useOrganizations";
import WorkspaceSettings from "@/components/dashboard/workspace/WorkspaceSettings";

export default function WorkspacePage() {
  const { organizations, isLoading } = useOrganizations();
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(
    organizations?.[0]?.id || null
  );

  if (isLoading) {
    return <div className="flex justify-center p-8 text-white">Loading...</div>;
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="p-8 text-center text-white">
        <p className="text-white/60">You are not a member of any workspace.</p>
        <button className="mt-4 rounded-full bg-[#00D2FF] px-6 py-2 text-black">
          Create Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WorkspaceSettings
        organizationId={selectedOrgId || organizations[0].id}
        organizations={organizations}
        onSwitchOrg={setSelectedOrgId}
      />
    </div>
  );
}