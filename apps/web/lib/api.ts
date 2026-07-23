import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/stores/auth.store";


const api = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api/v1",

  withCredentials: true,

  headers: {

    "Content-Type": "application/json",

    Accept: "application/json",

  },

  timeout: 30000,

});



/*
|--------------------------------------------------------------------------
| Access Token Resolver
|--------------------------------------------------------------------------
|
| Retrieves JWT access token from:
|
| 1. Zustand memory state
| 2. Persisted Zustand storage
|
|--------------------------------------------------------------------------
*/

function getAccessToken(): string | null {


  const zustandToken =
    useAuthStore.getState().accessToken;



  if(zustandToken){

    return zustandToken;

  }



  if(typeof window === "undefined"){

    return null;

  }



  try {


    const storedAuth =
      localStorage.getItem(
        "engineeringos-auth"
      );



    if(!storedAuth){

      return null;

    }



    const parsed =
      JSON.parse(storedAuth);



    return (
      parsed?.state?.accessToken ??
      null
    );



  } catch(error){


    console.error(
      "Unable to read authentication storage:",
      error
    );


    return null;

  }


}







/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(

  (
    config: InternalAxiosRequestConfig
  )=>{


    const token =
      getAccessToken();



    if(token){


      config.headers.Authorization =
        `Bearer ${token}`;


    }



    return config;


  },


  (error)=>{


    return Promise.reject(error);


  }

);







/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
|
| Handles API errors globally.
|
| Refresh-token flow will be added here later.
|
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(

  (response)=>{


    return response;


  },


  async (
    error: AxiosError
  )=>{


    const status =
      error.response?.status;



    if(status === 401){


      console.warn(
        "Unauthorized request:",
        error.config?.url
      );


    }



    console.error(
      "API ERROR STATUS:",
      status
    );


    console.error(
      "API ERROR URL:",
      error.config?.url
    );


    console.error(
      "API ERROR DATA:",
      error.response?.data
    );



    return Promise.reject(error);


  }

);



export default api;