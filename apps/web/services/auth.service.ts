import api from "@/lib/api";

import {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth";



export interface VerifyEmailPayload {

  token:string;

}



export interface ResendVerificationPayload {

  email:string;

}



export interface ForgotPasswordPayload {

  email:string;

}



export interface ResetPasswordPayload {

  token:string;

  newPassword:string;

}



export interface ChangePasswordPayload {

  currentPassword:string;

  newPassword:string;

}



export interface RefreshTokenPayload {

  refreshToken:string;

}



export interface MessageResponse {

  message:string;

}







export const authService = {



  register: async(
    data:RegisterPayload
  ):Promise<RegisterResponse>=>{


    const response =
      await api.post<RegisterResponse>(
        "/auth/register",
        data
      );


    return response.data;


  },







  login: async(
    data:LoginPayload
  ):Promise<LoginResponse>=>{


    const response =
      await api.post<LoginResponse>(
        "/auth/login",
        data
      );


    return response.data;


  },







  logout: async():Promise<MessageResponse>=>{


    const response =
      await api.post<MessageResponse>(
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


  },







  refreshToken: async(
    data:RefreshTokenPayload
  )=>{


    const response =
      await api.post(
        "/auth/refresh",
        data
      );


    return response.data;


  },







  verifyEmail: async(
    data:VerifyEmailPayload
  ):Promise<MessageResponse>=>{


    const response =
      await api.post<MessageResponse>(
        "/auth/verify-email",
        data
      );


    return response.data;


  },







  resendVerification: async(
    data:ResendVerificationPayload
  ):Promise<MessageResponse>=>{


    const response =
      await api.post<MessageResponse>(
        "/auth/resend-verification",
        data
      );


    return response.data;


  },







  forgotPassword: async(
    data:ForgotPasswordPayload
  ):Promise<MessageResponse>=>{


    const response =
      await api.post<MessageResponse>(
        "/auth/forgot-password",
        data
      );


    return response.data;


  },







  resetPassword: async(
    data:ResetPasswordPayload
  ):Promise<MessageResponse>=>{


    const response =
      await api.patch<MessageResponse>(
        "/auth/reset-password",
        data
      );


    return response.data;


  },







  changePassword: async(
    data:ChangePasswordPayload
  ):Promise<MessageResponse>=>{


    const response =
      await api.patch<MessageResponse>(
        "/auth/change-password",
        data
      );


    return response.data;


  },


};