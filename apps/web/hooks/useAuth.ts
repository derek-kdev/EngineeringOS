"use client";


import {
  useAuthStore,
} from "@/stores/auth.store";



export function useAuth(){


  const auth = useAuthStore();



  return {


    user:
      auth.user,


    accessToken:
      auth.accessToken,


    refreshToken:
      auth.refreshToken,


    hydrated:
      auth.hydrated,


    loading:
      auth.loading,



    login:
      auth.login,



    logout:
      auth.logout,



    setUser:
      auth.setUser,



    setLoading:
      auth.setLoading,



    setHydrated:
      auth.setHydrated,



    isAuthenticated:
      auth.isAuthenticated,


  };


}