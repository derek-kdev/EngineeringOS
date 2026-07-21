// apps/web/hooks/useOrganizations.ts
import useSWR from "swr";
import { organizationsApi } from "@/lib/api/organizations";
import { Organization, Membership } from "@/types/organization";

export function useOrganizations() {
  const { data, error, mutate } = useSWR<Organization[]>(
    "/organizations",
    organizationsApi.list
  );
  return {
    organizations: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useOrganization(id: string) {
  const { data, error, mutate } = useSWR<Organization>(
    id ? `/organizations/${id}` : null,
    () => organizationsApi.getOne(id)
  );
  return {
    organization: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useMembers(organizationId: string) {
  const { data, error, mutate } = useSWR<Membership[]>(
    organizationId ? `/organizations/${organizationId}/members` : null,
    () => organizationsApi.listMembers(organizationId)
  );
  return {
    members: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}