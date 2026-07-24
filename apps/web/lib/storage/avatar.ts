export async function uploadAvatar(
  file: File | Blob
): Promise<string> {


  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;


  const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;



  if(!cloudName){

    throw new Error(
      "Cloudinary configuration missing"
    );

  }



  if(!uploadPreset){

    throw new Error(
      "Cloudinary upload configuration missing"
    );

  }






  const formData =
    new FormData();



  formData.append(
    "file",
    file
  );


  formData.append(
    "upload_preset",
    uploadPreset
  );






  const response =
    await fetch(

      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

      {

        method:"POST",

        body:formData,

      }

    );








  if(!response.ok){


    let message =
      "Avatar upload failed";


    try{


      const error =
        await response.json();


      message =
        error?.error?.message
        ||
        message;


    }

    catch{

      // ignore parsing errors

    }



    throw new Error(message);


  }







  const data =
    await response.json();




  if(!data.secure_url){

    throw new Error(
      "Invalid upload response"
    );

  }



  return data.secure_url;


}