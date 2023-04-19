import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESETS,
} from "@env";

export async function uploadImage(image) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
  console.log("URL: ", url);
  console.log("IMAGE: ", image);
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "da6yzf6d");
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  console.log("RESPONSE: ", response);

  if (!response.ok) {
    throw new Error("Failed to fetch adress!");
  }

  const data = await response.json();
  console.log("DATA: ", data);
  return address;
}
