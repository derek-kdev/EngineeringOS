"use client";

import {
  useAuthStore,
} from "@/stores/auth.store";



export function useAuth() {


  const user =
    useAuthStore(
      (state) => state.user
    );


  const accessToken =
    useAuthStore(
      (state) => state.accessToken
    );


  const refreshToken =
    useAuthStore(
      (state) => state.refreshToken
    );


  const hydrated =
    useAuthStore(
      (state) => state.hydrated
    );


  const loading =
    useAuthStore(
      (state) => state.loading
    );


  const login =
    useAuthStore(
      (state) => state.login
    );


  const logout =
    useAuthStore(
      (state) => state.logout
    );


  const setUser =
    useAuthStore(
      (state) => state.setUser
    );


  const setTokens =
    useAuthStore(
      (state) => state.setTokens
    );


  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth
    );


  const setLoading =
    useAuthStore(
      (state) => state.setLoading
    );


  const setHydrated =
    useAuthStore(
      (state) => state.setHydrated
    );


  const isAuthenticated =
    useAuthStore(
      (state) => state.isAuthenticated
    );



  return {

    user,

    accessToken,

    refreshToken,

    hydrated,

    loading,

    login,

    logout,

    setUser,

    setTokens,

    clearAuth,

    setLoading,

    setHydrated,

    isAuthenticated,

  };


}