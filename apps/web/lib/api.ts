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
| Attach Access Token
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(

  (
    config: InternalAxiosRequestConfig
  ) => {


    const token =
      useAuthStore.getState().accessToken;



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
| Response Handler
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(

  (response)=>{

    return response;

  },


  async(error:AxiosError)=>{


    const status =
      error.response?.status;



    if(status === 401){


      const requestUrl =
        error.config?.url;



      console.warn(
        "Unauthorized request:",
        requestUrl
      );


      /*
      |--------------------------------------------------------------------------
      | Clear invalid authentication state
      |--------------------------------------------------------------------------
      */

      useAuthStore
        .getState()
        .clearAuth();


    }



    return Promise.reject(error);


  }

);



export default api;