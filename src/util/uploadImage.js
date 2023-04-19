import { CLOUDINARY_URL } from "@env";
export const uploadImage = async (file) => {
  console.log("Uploading image...", file);
  let response = await fetch("/api/upload");
  console.log("RESPONSE", response);
  let data = await response.json();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", data.api_key);
  formData.append("timestamp", data.timestamp);
  formData.append("signature", data.sig);

  response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_URL}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  data = response.json();
  console.log("Data response: ", data);
  return data;
};
