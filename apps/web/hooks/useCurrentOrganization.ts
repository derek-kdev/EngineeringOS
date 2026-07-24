"use client";

import { useOrganizations } from "@/hooks/useOrganizations";

export function useCurrentOrganization() {

  const {
    organizations,
    isLoading,
    isError,
  } = useOrganizations();


  const hasOrganization =
    Boolean(
      organizations &&
      organizations.length > 0
    );


  const currentOrganization =
    organizations?.[0] ?? null;


  return {

    organizations,

    currentOrganization,

    hasOrganization,

    isLoading,

    isError,

  };
}
