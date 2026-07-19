// components/dashboard/workspace/InvitationsTab.tsx
"use client";

import { useState } from "react";
import { useMembers } from "@/hooks/useOrganizations";
import { organizationsApi } from "@/lib/api/organizations";
import { OrganizationRole } from "@/types/organization";

export default function InvitationsTab({ organizationId }: { organizationId: string }) {
  const { mutate } = useMembers(organizationId);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<OrganizationRole>(OrganizationRole.MEMBER);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("");
    try {
      await organizationsApi.invite(organizationId, { email, role });
      setStatus(`✅ Invitation sent to ${email}`);
      setEmail("");
      await mutate();
    } catch (error) {
      setStatus("❌ Failed to send invitation.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white">Invite Members</h3>
      <form onSubmit={handleInvite} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/60">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-[#0B132B] px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/60">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as OrganizationRole)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-[#0B132B] px-4 py-2 text-white"
          >
            {Object.values(OrganizationRole).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="rounded-full bg-[#00D2FF] px-6 py-2 font-medium text-black transition hover:bg-[#00D2FF]/80 disabled:opacity-50"
        >
          {isSending ? "Sending..." : "Send Invitation"}
        </button>
        {status && <p className="text-sm text-white/80">{status}</p>}
      </form>
    </div>
  );
}