import api from "./axios";



/*
|--------------------------------------------------------------------------
| Notification Types
|--------------------------------------------------------------------------
*/


export interface Notification {

  id:string;

  userId:string;

  organizationId?:string | null;

  type:
    | "SYSTEM"
    | "SECURITY"
    | "ORGANIZATION"
    | "ACCOUNT"
    | "UPDATE"
    | "ALERT";

  title:string;

  message:string;

  actionUrl?:string | null;

  readAt:string | null;

  dismissedAt:string | null;

  archivedAt:string | null;

  createdAt:string;

  updatedAt:string;

}









/*
|--------------------------------------------------------------------------
| Get Notifications
|--------------------------------------------------------------------------
|
| Future Backend:
|
| GET /api/v1/notifications
|
|--------------------------------------------------------------------------
*/


export async function getNotifications()
:Promise<Notification[]> {


  /*
  |--------------------------------------------------------------------------
  | Temporary Frontend Adapter
  |--------------------------------------------------------------------------
  |
  | Backend notification controller
  | does not exist yet.
  |
  | When backend is ready replace
  | this mock with:
  |
  | const response =
  |   await api.get("/notifications");
  |
  | return response.data;
  |
  |--------------------------------------------------------------------------
  */


  return [];

}










/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
|
| Future Backend:
|
| PATCH /api/v1/notifications/:id/read
|
|--------------------------------------------------------------------------
*/


export async function markNotificationRead(
  id:string
){



  /*
  |--------------------------------------------------------------------------
  | Temporary Adapter
  |--------------------------------------------------------------------------
  */


  console.log(
    "Mark notification read:",
    id
  );



  return true;


}









/*
|--------------------------------------------------------------------------
| Dismiss Notification
|--------------------------------------------------------------------------
|
| Future Backend:
|
| PATCH /api/v1/notifications/:id/dismiss
|
|--------------------------------------------------------------------------
*/


export async function dismissNotification(
  id:string
){



  /*
  |--------------------------------------------------------------------------
  | Temporary Adapter
  |--------------------------------------------------------------------------
  */


  console.log(
    "Dismiss notification:",
    id
  );



  return true;


}