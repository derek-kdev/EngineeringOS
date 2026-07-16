/*
|--------------------------------------------------------------------------
| Avatar Storage Adapter
|--------------------------------------------------------------------------
|
| Frontend-only abstraction for avatar uploads.
|
| Currently:
| - Generates a local preview URL.
|
| Later:
| - Replace this implementation with:
|   Cloudinary
|   AWS S3
|   Cloudflare R2
|   Supabase Storage
|
| ProfileSection.tsx should not need changes
| when the storage provider changes.
|
|--------------------------------------------------------------------------
*/


export async function uploadAvatar(
  file: File
): Promise<string> {


  /*
  |--------------------------------------------------------------------------
  | Temporary Development Implementation
  |--------------------------------------------------------------------------
  |
  | Creates a browser preview URL.
  |
  | This does NOT upload permanently.
  |
  |--------------------------------------------------------------------------
  */


  const previewUrl =
    URL.createObjectURL(file);



  return previewUrl;

}
