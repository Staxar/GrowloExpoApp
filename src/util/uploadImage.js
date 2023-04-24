import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESETS } from "@env";

export async function uploadImage(image) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  console.log("IMAGE: ", image[0]);
  const formData = new FormData();
  formData.append("file", image[0]);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESETS);
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  }).then((response) => {
    console.log("RESPONSE: ", response);
  });

  if (!response.ok) {
    throw new Error("Failed to fetch adress!");
  }
}
