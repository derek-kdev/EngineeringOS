// apps/web/constants/dashboard/roles.ts
//
// No role system existed anywhere in the codebase before this file — this
// establishes the convention. NOTE: the live backend response for
// /auth/login and /auth/register does not currently populate `user.role`
// (confirmed via curl against a real account), so anything gated on this
// will be invisible for every account until that's added on the API side.

export type Role = "owner" | "admin" | "member";

/** Roles allowed to see/use admin-only areas of the dashboard. */
export const ADMIN_ROLES: Role[] = ["owner", "admin"];

export function isAdminRole(role?: string | null): boolean {
  // TEMP DEV BYPASS — uncomment while the backend doesn't populate `role`
  // yet, so the Admin tab is actually visible to test against. Remove once
  // real roles are coming back from the API.
  // if (process.env.NEXT_PUBLIC_DEV_SHOW_ADMIN === "true") return true;

  if (!role) return false;
  const normalized = role.toLowerCase() as Role;
  return ADMIN_ROLES.includes(normalized);
}