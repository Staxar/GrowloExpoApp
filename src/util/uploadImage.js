import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

async function upload2(blob, storageRef, metadata) {
  const firstStep = await uploadBytes(storageRef, blob, metadata);
  const secondStep = await getDownloadURL(firstStep.ref);
  return secondStep;
  // uploadBytes(storageRef, blob, metadata).then((snapshot) => {
  //   console.log("uploadBytesResumable");
  //   getDownloadURL(snapshot.ref).then((downloadURL) => {
  //     console.log("File available at: ", downloadURL);
  //     return downloadURL;
  //   });
  // });
}

export async function uploadImage(file) {
  let fileUrl = "";
  const fileName = file.substring(file.lastIndexOf("/") + 1);
  const response = await fetch(file);
  const blob = await response.blob();
  const storage = getStorage();

  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, "images/" + fileName);
  const res = await upload2(blob, storageRef, metadata);
  return res;
}

export async function uploadImages(files) {
  const imageUrls = [];
  for (const file of files) {
    const fileUrl = await uploadImage(file);
    imageUrls.push(fileUrl);
  }
  return imageUrls;
}

// export async function uploadImages(file) {
//   const fileName = file.substring(file.lastIndexOf("/") + 1);
//   console.log("uploadImages: ", file, "FILENAME: ", fileName);
//   const response = await fetch(file);
//   const blob = await response.blob();
//   console.log("BLOB: ", blob);
//   const storage = getStorage();
//   const storageRef = ref(storage, `images/${fileName}`);
//   uploadBytes(storageRef, blob).then((snapshot) => {
//     getDownloadURL(snapshot.ref).then((downloadURL) => {
//       const imageUrl = downloadURL;
//       return imageUrl;
//     });
//   });
// }
