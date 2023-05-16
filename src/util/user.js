import { child, get, getDatabase, ref, set, update } from "firebase/database";

import { Alert } from "react-native";
import { uploadImage } from "./uploadImage";

export async function createUser(uid, email, displayName) {
  const db = getDatabase();
  set(ref(db, "users/" + uid), {
    email: email,
    phone: "",
    displayName: displayName,
  }).catch((e) => {
    console.error(e);
  });
  return;
}

export async function getUser(userId) {
  let result;
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        result = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

export async function getUsers() {
  let result;
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        result = userArray;
        return result;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}
export async function updateUserImage(photoURL, uid) {
  let response = await uploadImage(photoURL);
  const db = getDatabase();
  await update(ref(db, `users/${uid}`), { photoURL: response })
    .then(() => Alert.alert("Update successfully!"))
    .catch((err) => console.error(err));
}

export async function getUserByName(displayName) {
  let response = true;
  const dbRef = ref(getDatabase());
  await get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const uid = childSnapshot.key;
          const userData = childSnapshot.val();
          if (
            userData.displayName.toLowerCase() === displayName.toLowerCase()
          ) {
            response = false;
            Alert.alert("User already exist!");
            return response;
          }
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}
