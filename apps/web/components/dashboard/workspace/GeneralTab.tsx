// components/dashboard/workspace/GeneralTab.tsx
"use client";

import { useState } from "react";
import { useOrganization } from "@/hooks/useOrganizations";
import { organizationsApi } from "@/lib/api/organizations";
import { UpdateOrganizationDto } from "@/types/organization";

export default function GeneralTab({ organizationId }: { organizationId: string }) {
  const { organization, mutate } = useOrganization(organizationId);
  const [name, setName] = useState(organization?.name || "");
  const [description, setDescription] = useState(organization?.description || "");
  const [industry, setIndustry] = useState(organization?.industry || "");
  const [website, setWebsite] = useState(organization?.website || "");
  const [size, setSize] = useState(organization?.size || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    const data: UpdateOrganizationDto = { name, description, industry, website, size };
    try {
      await organizationsApi.update(organizationId, data);
      await mutate();
      setMessage("✅ Workspace updated successfully.");
    } catch (error) {
      setMessage("❌ Failed to update workspace.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!organization) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/60">Workspace Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-[#0B132B] px-4 py-2 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/60">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-white/10 bg-[#0B132B] px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/60">Industry</label>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-[#0B132B] px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/60">Website</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-[#0B132B] px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/60">Company Size</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-[#0B132B] px-4 py-2 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className="rounded-full bg-[#00D2FF] px-6 py-2 font-medium text-black transition hover:bg-[#00D2FF]/80 disabled:opacity-50"
      >
        {isUpdating ? "Updating..." : "Update Workspace"}
      </button>
      {message && <p className="text-sm text-white/80">{message}</p>}
    </form>
  );
}