"use client";

import {
  createContext,
  useContext,
  useMemo,
} from "react";

import {
  useAuthStore,
} from "@/stores/auth.store";

import type {
  User,
} from "@/stores/auth.store";



interface AuthContextType {

  user: User | null;

  accessToken: string | null;

  refreshToken: string | null;

  hydrated: boolean;

  loading: boolean;

  login: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => void;

  logout: () => Promise<void>;

  setUser: (
    user: User | null
  ) => void;

  setTokens: (
    accessToken: string,
    refreshToken: string
  ) => void;

  clearAuth: () => void;

  isAuthenticated: () => boolean;

}



const AuthContext =
  createContext<AuthContextType | null>(null);





export function AuthProvider({

  children,

}: {

  children: React.ReactNode;

}) {


  const authState =
    useAuthStore();



  const authValue =
    useMemo<AuthContextType>(

      () => ({

        user:
          authState.user,


        accessToken:
          authState.accessToken,


        refreshToken:
          authState.refreshToken,


        hydrated:
          authState.hydrated,


        loading:
          authState.loading,


        login:
          authState.login,


        logout:
          authState.logout,


        setUser:
          authState.setUser,


        setTokens:
          authState.setTokens,


        clearAuth:
          authState.clearAuth,


        isAuthenticated:
          authState.isAuthenticated,


      }),

      [

        authState.user,

        authState.accessToken,

        authState.refreshToken,

        authState.hydrated,

        authState.loading,

        authState.login,

        authState.logout,

        authState.setUser,

        authState.setTokens,

        authState.clearAuth,

        authState.isAuthenticated,

      ]

    );





  return (

    <AuthContext.Provider
      value={authValue}
    >

      {children}

    </AuthContext.Provider>

  );

}





export function useAuth() {


  const context =
    useContext(AuthContext);



  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }



  return context;


}