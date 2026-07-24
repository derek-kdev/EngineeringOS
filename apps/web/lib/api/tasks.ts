import api from "@/lib/api";

import {
  EngineeringTask,
  CreateTaskDto,
  UpdateTaskDto,
} from "@/types/task";


export const tasksApi = {


  create: async (
    data:CreateTaskDto
  ):Promise<EngineeringTask>=>{

    const response =
      await api.post<EngineeringTask>(
        "/tasks",
        data
      );

    return response.data;

  },



  listOrganizationTasks: async (
    organizationId:string
  ):Promise<EngineeringTask[]>=>{

    const response =
      await api.get<EngineeringTask[]>(
        `/tasks/organization/${organizationId}`
      );

    return response.data;

  },



  update: async (
    id:string,
    data:UpdateTaskDto
  ):Promise<EngineeringTask>=>{

    const response =
      await api.patch<EngineeringTask>(
        `/tasks/${id}`,
        data
      );

    return response.data;

  },



  delete: async(
    id:string
  )=>{

    const response =
      await api.delete(
        `/tasks/${id}`
      );

    return response.data;

  }


};
