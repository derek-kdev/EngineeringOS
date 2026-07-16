import api from "./axios";



/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
|
| Backend:
|
| POST /api/v1/auth/forgot-password
|
| Payload:
| {
|   email:string
| }
|
|--------------------------------------------------------------------------
*/

export async function forgotPassword(
  email:string
){

  const response =
    await api.post(
      "/auth/forgot-password",
      {
        email,
      }
    );


  return response.data;

}






/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
|
| Backend:
|
| PATCH /api/v1/auth/reset-password
|
| Payload:
| {
|   token:string,
|   password:string
| }
|
|--------------------------------------------------------------------------
*/

export async function resetPassword(
  token:string,
  password:string
){

  const response =
    await api.patch(
      "/auth/reset-password",
      {
        token,

        password,

      }
    );


  return response.data;

}