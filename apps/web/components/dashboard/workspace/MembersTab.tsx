// components/dashboard/workspace/MembersTab.tsx
"use client";

import { useState } from "react";
import { useMembers } from "@/hooks/useOrganizations";
import { organizationsApi } from "@/lib/api/organizations";
import { OrganizationRole, MembershipStatus } from "@/types/organization";

export default function MembersTab({ organizationId }: { organizationId: string }) {
  const { members, mutate } = useMembers(organizationId);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, role: OrganizationRole) => {
    setUpdating(userId);
    try {
      await organizationsApi.updateMemberRole(organizationId, userId, { role });
      await mutate();
    } catch (error) {
      console.error("Failed to update role");
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    setUpdating(userId);
    try {
      await organizationsApi.removeMember(organizationId, userId);
      await mutate();
    } catch (error) {
      console.error("Failed to remove member");
    } finally {
      setUpdating(null);
    }
  };

  if (!members) return <div>Loading members...</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold text-white">Members</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/60">
              <th className="pb-2">User</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((membership) => (
              <tr key={membership.id} className="border-b border-white/5">
                <td className="py-3 text-white">
                  {membership.user?.firstName} {membership.user?.lastName}
                  <div className="text-xs text-white/40">{membership.user?.email}</div>
                </td>
                <td>
                  <select
                    value={membership.role}
                    onChange={(e) =>
                      handleRoleChange(membership.userId, e.target.value as OrganizationRole)
                    }
                    disabled={updating === membership.userId}
                    className="rounded bg-[#0B132B] px-2 py-1 text-white"
                  >
                    {Object.values(OrganizationRole).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-white/60">{membership.status}</td>
                <td>
                  {membership.role !== OrganizationRole.OWNER && (
                    <button
                      onClick={() => handleRemove(membership.userId)}
                      disabled={updating === membership.userId}
                      className="rounded bg-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/30"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}