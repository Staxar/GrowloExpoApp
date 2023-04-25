import { getStorage, ref, uploadBytes } from "firebase/storage";

// export async function uploadImage(image) {
//   const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
//   console.log("IMAGE: ", image[0]);
//   const formData = new FormData();
//   formData.append("file", image[0]);
//   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESETS);
//   const response = await fetch(url, {
//     method: "POST",
//     body: formData,
//   }).then((response) => {
//     console.log("RESPONSE: ", response);
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch adress!");
//   }
// }

export async function uploadImages(file) {
  const fileName = file.substring(file.lastIndexOf("/") + 1);
  console.log("uploadImages: ", file, "FILENAME: ", fileName);
  const response = await fetch(file);
  const blob = await response.blob();
  console.log("BLOB: ", blob);
  const storage = getStorage();
  const storageRef = ref(storage, `images/${fileName}`);
  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log(snapshot);
  });
}
