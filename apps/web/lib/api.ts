import axios from "axios";


const api = axios.create({

  baseURL: "http://localhost:3001/api/v1",

  headers: {

    "Content-Type": "application/json",

  },

});





/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
| Attach JWT access token automatically
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(

  (config) => {


    if (typeof window !== "undefined") {


      const authState = localStorage.getItem(
        "engineeringos-auth"
      );


      if (authState) {


        try {


          const parsed = JSON.parse(authState);



          const token =
            parsed?.state?.accessToken;



          if (token) {


            config.headers.Authorization =
              `Bearer ${token}`;


          }


        } catch(error){


          console.error(
            "Failed to parse authentication state",
            error
          );


        }


      }


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
| Handle expired sessions
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(


  (response)=>response,



  async(error)=>{


    if(

      error.response?.status === 401 &&

      typeof window !== "undefined"

    ){



      const currentPath =
        window.location.pathname;



      /*
      Prevent redirect loop
      */

      if(currentPath !== "/signin"){



        localStorage.removeItem(
          "engineeringos-auth"
        );



        window.location.href="/signin";


      }



    }



    return Promise.reject(error);


  }



);





export default api;