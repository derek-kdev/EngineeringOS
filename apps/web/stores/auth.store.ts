"use client";

import { create } from "zustand";
import api from "@/lib/api";


export interface User {

  id: string;

  email: string;

  firstName: string;

  lastName: string;

  displayName?: string | null;

  avatarUrl?: string | null;

  phone?: string | null;

  jobTitle?: string | null;

  role?: string;

  locale?: string;

  timezone?: string;

  isActive?: boolean;

  emailVerifiedAt?: string | null;

  lastLoginAt?: string | null;

  createdAt?: string;

  updatedAt?: string;

}



interface AuthState {


  user: User | null;


  accessToken: string | null;


  refreshToken: string | null;


  hydrated: boolean;


  loading: boolean;



  setHydrated:(
    value:boolean
  ) => void;



  setLoading:(
    value:boolean
  ) => void;



  login:(
    user:User,
    accessToken:string,
    refreshToken:string
  ) => void;



  logout:() => Promise<void>;



  setUser:(
    user:User | null
  ) => void;



  isAuthenticated:() => boolean;


}





export const useAuthStore =
create<AuthState>((set,get)=>({



  user:null,


  accessToken:null,


  refreshToken:null,


  hydrated:false,


  loading:false,




  setHydrated:(value)=>

    set({

      hydrated:value,

    }),





  setLoading:(value)=>

    set({

      loading:value,

    }),






  login:(

    user,

    accessToken,

    refreshToken,

  ) =>

    set({

      user,

      accessToken,

      refreshToken,

    }),






  logout: async()=>{


    try{


      await api.post("/auth/logout");


    }catch(error){


      console.error(
        "Logout API failed:",
        error
      );


    }



    set({

      user:null,

      accessToken:null,

      refreshToken:null,

    });



    if(typeof window !== "undefined"){


      localStorage.removeItem(
        "engineeringos-auth"
      );


      localStorage.removeItem(
        "accessToken"
      );


      localStorage.removeItem(
        "refreshToken"
      );


      window.location.href = "/";


    }


  },






  setUser:(user)=>

    set({

      user,

    }),






  isAuthenticated:()=>{


    const state =
      get();


    return Boolean(
      state.user
    );


  },



}));