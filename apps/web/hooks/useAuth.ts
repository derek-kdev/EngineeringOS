"use client";


import { useAuthStore } from "@/stores/auth.store";



export function useAuth(){


const user = useAuthStore(
(state)=>state.user
);



const loading = useAuthStore(
(state)=>state.loading
);



const login = useAuthStore(
(state)=>state.login
);



const logout = useAuthStore(
(state)=>state.logout
);



const isAuthenticated = useAuthStore(
(state)=>state.isAuthenticated
);



return {

user,

loading,

login,

logout,

isAuthenticated,

};


}