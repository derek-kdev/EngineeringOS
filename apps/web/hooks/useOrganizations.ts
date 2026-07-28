"use client";

import useSWR from "swr";

import {
  organizationsApi,
} from "@/lib/api/organizations";

import {
  Organization,
  Membership,
} from "@/types/organization";

import {
  useAuthStore,
} from "@/stores/auth.store";



export function useOrganizations() {


  const hydrated =
    useAuthStore(
      (state)=>state.hydrated
    );


  const user =
    useAuthStore(
      (state)=>state.user
    );


  const accessToken =
    useAuthStore(
      (state)=>state.accessToken
    );


  const isAuthenticated =
    Boolean(
      user &&
      accessToken
    );



  const {
    data,
    error,
    mutate,
  } =
  useSWR<Organization[]>(

    hydrated && isAuthenticated
      ? "/organizations"
      : null,

    organizationsApi.list

  );


  return {

    organizations:data,

    isLoading:
      hydrated &&
      isAuthenticated &&
      !error &&
      !data,


    isError:error,


    mutate,

  };

}




export function useOrganization(
  id:string
){


  const hydrated =
    useAuthStore(
      (state)=>state.hydrated
    );


  const user =
    useAuthStore(
      (state)=>state.user
    );


  const accessToken =
    useAuthStore(
      (state)=>state.accessToken
    );


  const isAuthenticated =
    Boolean(
      user &&
      accessToken
    );



  const {
    data,
    error,
    mutate,
  } =
  useSWR<Organization>(

    hydrated &&
    isAuthenticated &&
    id
      ? `/organizations/${id}`
      : null,


    ()=>organizationsApi.getOne(id)

  );



  return {

    organization:data,

    isLoading:
      hydrated &&
      isAuthenticated &&
      !error &&
      !data,


    isError:error,


    mutate,

  };

}





export function useOrganizationMembers(
  organizationId:string
){


  const hydrated =
    useAuthStore(
      (state)=>state.hydrated
    );


  const user =
    useAuthStore(
      (state)=>state.user
    );


  const accessToken =
    useAuthStore(
      (state)=>state.accessToken
    );


  const isAuthenticated =
    Boolean(
      user &&
      accessToken
    );



  const {
    data,
    error,
    mutate,
  } =
  useSWR<Membership[]>(


    hydrated &&
    isAuthenticated &&
    organizationId
      ? `/organizations/${organizationId}/members`
      : null,


    ()=>organizationsApi.listMembers(
      organizationId
    )

  );



  return {

    members:data,

    isLoading:
      hydrated &&
      isAuthenticated &&
      !error &&
      !data,


    isError:error,


    mutate,

  };

}




/**
 * Backwards compatibility alias
 */

export function useMembers(
  organizationId:string
){

  return useOrganizationMembers(
    organizationId
  );

}
