import api from "./axios";


/*
|--------------------------------------------------------------------------
| User Types
|--------------------------------------------------------------------------
*/

export interface UserProfile {

  id: string;

  email: string;

  firstName: string;

  lastName: string;

  role: string;

  avatarUrl: string | null;

  locale: string;

  timezone: string;

  isActive: boolean;

  emailVerifiedAt: string | null;

  lastLoginAt: string | null;

  createdAt: string;

  updatedAt: string;

}





/*
|--------------------------------------------------------------------------
| Update Payload
|--------------------------------------------------------------------------
|
| Matches backend:
|
| apps/api/src/users/dto/update-user.dto.ts
|
|--------------------------------------------------------------------------
*/

export interface UpdateUserPayload {

  firstName?: string;

  lastName?: string;

  avatarUrl?: string;

  timezone?: string;

  locale?: string;

}





/*
|--------------------------------------------------------------------------
| Get Current Authenticated User
|--------------------------------------------------------------------------
|
| GET /api/v1/auth/me
|
|--------------------------------------------------------------------------
*/

export async function getCurrentUser(): Promise<UserProfile> {


  const response =
    await api.get<UserProfile>(
      "/auth/me"
    );


  return response.data;

}







/*
|--------------------------------------------------------------------------
| Update Current User Profile
|--------------------------------------------------------------------------
|
| PATCH /api/v1/users/me
|
|--------------------------------------------------------------------------
*/

export async function updateCurrentUser(
  data: UpdateUserPayload
): Promise<UserProfile> {


  const response =
    await api.patch<UserProfile>(
      "/users/me",
      data
    );


  return response.data;

}







/*
|--------------------------------------------------------------------------
| Delete Current User Account
|--------------------------------------------------------------------------
|
| DELETE /api/v1/users/me
|
|--------------------------------------------------------------------------
*/

export async function deleteCurrentUser(): Promise<void> {


  await api.delete(
    "/users/me"
  );


}







/*
|--------------------------------------------------------------------------
| Admin User Update
|--------------------------------------------------------------------------
|
| PATCH /api/v1/users/:id
|
|--------------------------------------------------------------------------
*/

export async function updateUser(
  id: string,
  data: UpdateUserPayload
): Promise<UserProfile> {


  const response =
    await api.patch<UserProfile>(
      `/users/${id}`,
      data
    );


  return response.data;

}







/*
|--------------------------------------------------------------------------
| Admin Delete User
|--------------------------------------------------------------------------
|
| DELETE /api/v1/users/:id
|
|--------------------------------------------------------------------------
*/

export async function deleteUser(
  id:string
):Promise<void>{


  await api.delete(
    `/users/${id}`
  );


}