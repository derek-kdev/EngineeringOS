// apps/web/lib/api/organizations.ts

import api from "@/lib/api";

import {
  Organization,
  Membership,
  Invitation,
  CreateOrganizationDto,
  UpdateOrganizationDto,
  UpdateMemberRoleDto,
  InviteMemberDto,
} from "@/types/organization";



export const organizationsApi = {


  /*
  |--------------------------------------------------------------------------
  | Organizations
  |--------------------------------------------------------------------------
  */


  create: async (
    data: CreateOrganizationDto
  ): Promise<Organization> => {

    const response =
      await api.post<Organization>(
        "/organizations",
        data
      );

    return response.data;

  },



  list: async (): Promise<Organization[]> => {

    const response =
      await api.get<Organization[]>(
        "/organizations"
      );

    return response.data;

  },



  getOne: async (
    id: string
  ): Promise<Organization> => {

    const response =
      await api.get<Organization>(
        `/organizations/${id}`
      );

    return response.data;

  },



  update: async (
    id: string,
    data: UpdateOrganizationDto
  ): Promise<Organization> => {

    const response =
      await api.patch<Organization>(
        `/organizations/${id}`,
        data
      );

    return response.data;

  },



  deleteOrganization: async (
    id: string
  ) => {

    const response =
      await api.delete(
        `/organizations/${id}`
      );

    return response.data;

  },





  /*
  |--------------------------------------------------------------------------
  | Members
  |--------------------------------------------------------------------------
  */


  listMembers: async (
    organizationId: string
  ): Promise<Membership[]> => {

    const response =
      await api.get<Membership[]>(
        `/organizations/${organizationId}/members`
      );

    return response.data;

  },



  getMember: async (
    organizationId: string,
    userId: string
  ): Promise<Membership> => {

    const response =
      await api.get<Membership>(
        `/organizations/${organizationId}/members/${userId}`
      );

    return response.data;

  },



  updateMemberRole: async (
    organizationId: string,
    userId: string,
    data: UpdateMemberRoleDto
  ): Promise<Membership> => {

    const response =
      await api.patch<Membership>(
        `/organizations/${organizationId}/members/${userId}`,
        data
      );

    return response.data;

  },



  removeMember: async (
    organizationId: string,
    userId: string
  ) => {

    const response =
      await api.delete(
        `/organizations/${organizationId}/members/${userId}`
      );

    return response.data;

  },





  /*
  |--------------------------------------------------------------------------
  | Invitations
  |--------------------------------------------------------------------------
  */


  invite: async (
    organizationId: string,
    data: InviteMemberDto
  ): Promise<Invitation> => {

    const response =
      await api.post<Invitation>(
        `/organizations/${organizationId}/invitations`,
        data
      );

    return response.data;

  },



  accept: async (
    token: string
  ) => {

    const response =
      await api.post(
        "/organizations/invitations/accept",
        {
          token,
        }
      );

    return response.data;

  },



  decline: async (
    token: string
  ) => {

    const response =
      await api.post(
        "/organizations/invitations/decline",
        {
          token,
        }
      );

    return response.data;

  },

};