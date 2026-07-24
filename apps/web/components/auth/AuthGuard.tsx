"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuthStore,
} from "@/stores/auth.store";

import {
  authService,
} from "@/services/auth.service";

import {
  EngineeringLoader,
} from "@/components/loading";





export default function AuthGuard({

  children,

}: {

  children: React.ReactNode;

}) {



  const router =
    useRouter();



  const hydrated =
    useAuthStore(
      (state) => state.hydrated
    );



  const accessToken =
    useAuthStore(
      (state) => state.accessToken
    );



  const setUser =
    useAuthStore(
      (state) => state.setUser
    );



  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth
    );



  const setLoading =
    useAuthStore(
      (state) => state.setLoading
    );



  const [
    checking,
    setChecking
  ] = useState(true);








  useEffect(() => {


    if (!hydrated) {

      return;

    }





    async function validateSession() {



      if (!accessToken) {



        clearAuth();



        router.replace(
          "/signin"
        );



        setChecking(false);



        return;

      }







      try {



        setLoading(true);



        const profile =
          await authService.getMe();



        setUser(
          profile
        );



      } catch(error) {



        clearAuth();



        router.replace(
          "/signin"
        );



      } finally {



        setLoading(false);



        setChecking(false);



      }


    }







    validateSession();



  }, [

    hydrated,

    accessToken,

    router,

    clearAuth,

    setUser,

    setLoading,

  ]);








  if (

    !hydrated ||

    checking

  ) {


    return (

      <EngineeringLoader />

    );


  }







  return children;


}