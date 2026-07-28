"use client";

import { useOrganizations } from "@/hooks/useOrganizations";
import { useOrganizationStore } from "@/stores/organization.store";
import type { Organization } from "@/types/organization";
import { useMemo } from "react";

export function useCurrentOrganization() {
  const { organizations, isLoading, isError } = useOrganizations();
  const currentOrganizationId = useOrganizationStore(
    (s) => s.currentOrganizationId
  );
  const setCurrentOrganizationId = useOrganizationStore(
    (s) => s.setCurrentOrganizationId
  );

  const currentOrganization: Organization | null = useMemo(() => {
    if (!organizations || organizations.length === 0) return null;

    if (currentOrganizationId) {
      return (
        organizations.find((org) => org.id === currentOrganizationId) ?? null
      );
    }

    // No ID selected yet – default to the first organization
    return organizations[0];
  }, [organizations, currentOrganizationId]);

  return {
    organizations,
    currentOrganization,
    hasOrganization: Boolean(currentOrganization),
    isLoading,
    isError,
    setCurrentOrganizationId,
  };
}
