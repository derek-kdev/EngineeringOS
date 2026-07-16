import axios from "axios";
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
| Attach JWT Access Token
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(

  (config) => {


    const token =
      useAuthStore.getState().accessToken;


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  (error) => {

    return Promise.reject(error);

  }

);





/*
|--------------------------------------------------------------------------
| Response Error Logging
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(

  (response) => response,


  (error) => {


    console.error(
      "API ERROR STATUS:",
      error.response?.status
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