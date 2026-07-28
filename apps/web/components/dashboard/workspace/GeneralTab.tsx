// components/dashboard/workspace/GeneralTab.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useOrganization } from "@/hooks/useOrganizations";
import { useOrganizationStore } from "@/stores/organization.store";
import { useAuthStore } from "@/stores/auth.store";
import { organizationsApi } from "@/lib/api/organizations";
import { UpdateOrganizationDto, OrganizationRole } from "@/types/organization";

export default function GeneralTab({ organizationId }: { organizationId: string }) {
  const { organization, mutate } = useOrganization(organizationId);
  const router = useRouter();
  const clearCurrentOrganization = useOrganizationStore(
    (s) => s.clearCurrentOrganization
  );
  const currentUser = useAuthStore((s) => s.user);

  const [name, setName] = useState(organization?.name || "");
  const [description, setDescription] = useState(organization?.description || "");
  const [industry, setIndustry] = useState(organization?.industry || "");
  const [website, setWebsite] = useState(organization?.website || "");
  const [size, setSize] = useState(organization?.size || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "success" | "error">("idle");
  const [deleteMessage, setDeleteMessage] = useState("");

  // Determine if the current user is the owner of this organization
  const isOwner = useMemo(() => {
    if (!organization || !currentUser) return false;
    const membership = organization.memberships?.find(
      (m) => m.userId === currentUser.id || m.user?.id === currentUser.id
    );
    return membership?.role === OrganizationRole.OWNER;
  }, [organization, currentUser]);

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this workspace? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(true);
    setDeleteStatus("idle");
    setDeleteMessage("");

    try {
      await organizationsApi.deleteOrganization(organizationId);
      setDeleteStatus("success");
      setDeleteMessage("✅ Workspace deleted successfully. Redirecting...");
      setTimeout(() => {
        clearCurrentOrganization();
        router.push("/dashboard/organization");
      }, 2000);
    } catch (error: any) {
      setDeleteStatus("error");
      setDeleteMessage(error?.response?.data?.message || "❌ Failed to delete workspace.");
      setIsDeleting(false);
    }
  };

  // Ensure website has a protocol on blur (if not empty)
  const handleWebsiteBlur = () => {
    const trimmed = website.trim();
    if (trimmed && !/^https?:\/\//i.test(trimmed)) {
      setWebsite(`https://${trimmed}`);
    }
  };

  // If deletion succeeded, we show the success message even if organization fetch 404s
  if (deleteStatus === "success") {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-green-400">{deleteMessage}</p>
      </div>
    );
  }

  if (!organization) return <div className="text-white/60 p-4">Loading...</div>;

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
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          onBlur={handleWebsiteBlur}
          placeholder="https://example.com"
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

      {/* Danger Zone – only visible to owner */}
      {isOwner && (
        <div className="mt-8 border-t border-white/10 pt-6">
          <h4 className="text-sm font-semibold text-red-400">Danger Zone</h4>
          <p className="text-xs text-white/40 mb-3">
            Permanently delete this workspace and all associated data. This action cannot be undone.
          </p>
          {deleteStatus === "error" && (
            <p className="text-sm text-red-400 mt-2">{deleteMessage}</p>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-full bg-red-500/20 px-6 py-2 font-medium text-red-400 transition hover:bg-red-500/30 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Workspace"}
          </button>
        </div>
      )}
    </form>
  );
}
