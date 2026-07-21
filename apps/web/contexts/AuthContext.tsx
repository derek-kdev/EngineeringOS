"use client";

import {
  createContext,
  useContext,
  useMemo,
} from "react";

import {
  useAuthStore,
} from "@/stores/auth.store";



interface AuthContextType {

  user: ReturnType<typeof useAuthStore>["user"];

  accessToken: ReturnType<typeof useAuthStore>["accessToken"];

  refreshToken: ReturnType<typeof useAuthStore>["refreshToken"];

  hydrated: boolean;

  loading: boolean;

  login: ReturnType<typeof useAuthStore>["login"];

  logout: ReturnType<typeof useAuthStore>["logout"];

  setUser: ReturnType<typeof useAuthStore>["setUser"];

  isAuthenticated: ReturnType<typeof useAuthStore>["isAuthenticated"];

}



const AuthContext =
  createContext<AuthContextType | null>(null);





export function AuthProvider({

  children,

}: {

  children: React.ReactNode;

}) {



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


  const isAuthenticated =
    useAuthStore(
      (state) => state.isAuthenticated
    );




  const authValue =
    useMemo(
      () => ({

        user,

        accessToken,

        refreshToken,

        hydrated,

        loading,

        login,

        logout,

        setUser,

        isAuthenticated,

      }),

      [
        user,
        accessToken,
        refreshToken,
        hydrated,
        loading,
        login,
        logout,
        setUser,
        isAuthenticated,
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