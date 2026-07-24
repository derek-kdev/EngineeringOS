import api from "@/lib/api";

export interface CreateOrganizationDto {
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  size?: string;
}

export const organizationService = {
  async create(data: CreateOrganizationDto) {
    const response = await api.post("/organizations", data);
    return response.data;
  },

  async list() {
    const response = await api.get("/organizations");
    return response.data;
  },

  async get(id: string) {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  },

  async update(id: string, data: Partial<CreateOrganizationDto>) {
    const response = await api.patch(`/organizations/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/organizations/${id}`);
    return response.data;
  },
};
