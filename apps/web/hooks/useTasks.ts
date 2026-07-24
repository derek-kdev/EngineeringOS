import useSWR from "swr";

import { tasksApi } from "@/lib/api/tasks";

import {
  EngineeringTask,
} from "@/types/task";


export function useOrganizationTasks(
  organizationId: string
) {

  const {
    data,
    error,
    mutate,
  } = useSWR<EngineeringTask[]>(
    organizationId
      ? `/tasks/organization/${organizationId}`
      : null,

    () =>
      tasksApi.listOrganizationTasks(
        organizationId
      )
  );


  return {

    tasks: data,

    isLoading: !error && !data,

    isError: error,

    mutate,

  };

}
