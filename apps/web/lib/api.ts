import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";


// =====================================
// Axios Configuration
// =====================================

const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api/v1",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});


// =====================================
// JWT Request Interceptor
// =====================================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    if (typeof window !== "undefined") {

      const token =
        localStorage.getItem("access_token");

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);



// =====================================
// Response Error Handling
// =====================================

api.interceptors.response.use(

  response => response,

  (error: AxiosError) => {

    if (error.response?.status === 401) {

      console.warn(
        "Authentication expired"
      );

    }

    return Promise.reject(error);

  }

);



// =====================================
// Types
// =====================================

export interface User {

  id: string;

  email: string;

  firstName?: string;

  lastName?: string;

  avatarUrl?: string;

  timezone?: string;

  locale?: string;

}


export interface AuthResponse {

  accessToken: string;

  refreshToken: string;

  user?: User;

}


export interface ApiMetadata {

  message?: string;

}


export interface HealthResponse {

  status?: string;

}



// =====================================
// DTO Types
// =====================================

export interface RegisterDto {

  email: string;

  firstName: string;

  lastName: string;

}


export interface LoginDto {

  email: string;

  password: string;

}


export interface RefreshTokenDto {

  refreshToken: string;

}


export interface UpdateUserDto {

  firstName?: string;

  lastName?: string;

  avatarUrl?: string;

  timezone?: string;

  locale?: string;

}


export interface ForgotPasswordDto {

  email: string;

}


export interface ResetPasswordDto {

  token: string;

  password: string;

}


export interface VerifyEmailDto {

  email: string;

}



// =====================================
// App API
// =====================================

export const appApi = {


  getInformation:
    async () => {

      const response =
        await api.get<ApiMetadata>(
          "/"
        );

      return response.data;

    },


  health:
    async () => {

      const response =
        await api.get<HealthResponse>(
          "/health"
        );

      return response.data;

    },


};



// =====================================
// Authentication API
// =====================================

export const authApi = {


  register:
    async (
      data: RegisterDto
    ) => {

      const response =
        await api.post<AuthResponse>(
          "/auth/register",
          data
        );

      return response.data;

    },


  login:
    async (
      data: LoginDto
    ) => {

      const response =
        await api.post<AuthResponse>(
          "/auth/login",
          data
        );

      return response.data;

    },


  refresh:
    async (
      data: RefreshTokenDto
    ) => {

      const response =
        await api.post<AuthResponse>(
          "/auth/refresh",
          data
        );

      return response.data;

    },


  logout:
    async () => {

      const response =
        await api.post(
          "/auth/logout"
        );

      return response.data;

    },


  forgotPassword:
    async (
      data: ForgotPasswordDto
    ) => {

      const response =
        await api.post(
          "/auth/forgot-password",
          data
        );

      return response.data;

    },


  resetPassword:
    async (
      data: ResetPasswordDto
    ) => {

      const response =
        await api.patch(
          "/auth/reset-password",
          data
        );

      return response.data;

    },


  verifyEmail:
    async (
      data: VerifyEmailDto
    ) => {

      const response =
        await api.post(
          "/auth/verify-email",
          data
        );

      return response.data;

    },


  verifyEmailToken:
    async (
      token: string
    ) => {

      const response =
        await api.get(
          `/auth/verify-email/${token}`
        );

      return response.data;

    },

};



// =====================================
// Users API
// =====================================

export const usersApi = {


  getById:
    async (
      id: string
    ) => {

      const response =
        await api.get<User>(
          `/users/${id}`
        );

      return response.data;

    },


  update:
    async (
      id: string,
      data: UpdateUserDto
    ) => {

      const response =
        await api.patch<User>(
          `/users/${id}`,
          data
        );

      return response.data;

    },


  remove:
    async (
      id: string
    ) => {

      const response =
        await api.delete(
          `/users/${id}`
        );

      return response.data;

    },

};



// =====================================
// Export Axios Client
// =====================================

export default api;