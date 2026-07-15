"use client";


import {
  createContext,
  useContext,
} from "react";


import {
  useAuthStore
} from "@/stores/auth.store";



const AuthContext = createContext<any>(null);



export function AuthProvider({

children

}:{

children:React.ReactNode

}) {



const auth = useAuthStore();



return (

<AuthContext.Provider value={auth}>

{children}

</AuthContext.Provider>

);


}





export function useAuth(){


return useContext(AuthContext);


}