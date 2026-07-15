export interface RegisterPayload {

  email:string;

  firstName:string;

  lastName:string;

}



export interface LoginPayload {

  email:string;

  password:string;

}



export interface AuthResponse {

  accessToken:string;

  refreshToken:string;

}