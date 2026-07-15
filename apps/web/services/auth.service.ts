import api from "@/lib/api";

import {
  LoginPayload,
  RegisterPayload,
  AuthResponse
} from "@/types/auth";



export const authService = {


  register: async (
    data:RegisterPayload
  ) => {

    const response =
      await api.post<AuthResponse>(
        "/auth/register",
        data
      );


    return response.data;

  },



  login: async (
    data:LoginPayload
  ) => {

    const response =
      await api.post<AuthResponse>(
        "/auth/login",
        data
      );


    return response.data;

  },



  logout: async () => {

    const response =
      await api.post(
        "/auth/logout"
      );


    return response.data;

  },


  getMe: async()=>{

    const response =
      await api.get(
        "/auth/me"
      );


    return response.data;

  }

};