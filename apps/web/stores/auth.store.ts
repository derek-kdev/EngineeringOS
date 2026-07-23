"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import api from "@/lib/api";



export interface User {

  id:string;

  email:string;

  firstName:string;

  lastName:string;

  displayName?:string | null;

  avatarUrl?:string | null;

  role?:string;

  createdAt?:string;

  updatedAt?:string;

}





interface AuthState {


  user:User | null;


  accessToken:string | null;


  refreshToken:string | null;



  hydrated:boolean;


  loading:boolean;





  setHydrated:(value:boolean)=>void;


  setLoading:(value:boolean)=>void;





  login:(

    user:User,

    accessToken:string,

    refreshToken:string

  )=>void;





  setUser:(

    user:User|null

  )=>void;





  setTokens:(

    accessToken:string,

    refreshToken:string

  )=>void;





  clearAuth:()=>void;





  logout:()=>Promise<void>;





  isAuthenticated:()=>boolean;


}








export const useAuthStore =
create<AuthState>()(

persist(



(set,get)=>({




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

)=>


set({

  user,

  accessToken,

  refreshToken,

}),







setUser:(user)=>


set({

  user,

}),







setTokens:(

  accessToken,

  refreshToken,

)=>

set({

  accessToken,

  refreshToken,

}),







clearAuth:()=>


set({

  user:null,

  accessToken:null,

  refreshToken:null,

}),







logout:async()=>{


try{


  await api.post(
    "/auth/logout"
  );


}

catch(error){


  console.warn(

    "Logout request failed:",

    error

  );


}

finally{


  get().clearAuth();


}


},







isAuthenticated:()=>{


const state =
get();



return Boolean(

  state.hydrated &&

  state.user &&

  state.accessToken

);


},





}),



{

name:"engineeringos-auth",





onRehydrateStorage:()=>{


return ()=>{


  useAuthStore
    .getState()
    .setHydrated(true);


};


},


}



)

);