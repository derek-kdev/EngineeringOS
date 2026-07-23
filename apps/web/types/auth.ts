export interface RegisterPayload {


  email:string;


  firstName:string;


  lastName:string;


  password:string;


  organization?: {

    create?:boolean;

    name?:string;

    slug?:string;

  };


  sendVerificationEmail?:boolean;


}







export interface LoginPayload {


  email:string;


  password:string;


}








export interface AuthUser {


  id:string;


  email:string;


  firstName:string;


  lastName:string;


  displayName?:string | null;


  avatarUrl?:string | null;


  role?:string;


  emailVerifiedAt?:string | null;


  createdAt?:string;


  updatedAt?:string;


}








export interface AuthTokens {


  accessToken:string;


  refreshToken:string;


}









/*
|--------------------------------------------------------------------------
| Register Response
|--------------------------------------------------------------------------
|
| User account created.
| Verification required before login.
|
|--------------------------------------------------------------------------
*/


export interface RegisterResponse {


  user:AuthUser;


  message?:string;


}










/*
|--------------------------------------------------------------------------
| Login Response
|--------------------------------------------------------------------------
|
| Returned only after successful authentication.
|
|--------------------------------------------------------------------------
*/


export interface LoginResponse {


  user:AuthUser;


  tokens:AuthTokens;


}









export interface VerifyEmailPayload {


  token:string;


}








export interface ResendVerificationPayload {


  email:string;


}








export interface ForgotPasswordPayload {


  email:string;


}








export interface ResetPasswordPayload {


  token:string;


  newPassword:string;


}








export interface ChangePasswordPayload {


  currentPassword:string;


  newPassword:string;


}








export interface RefreshTokenPayload {


  refreshToken:string;


}