import { child, get, getDatabase, ref, set } from "firebase/database";

export async function createUser(uid, email, displayName) {
  const db = getDatabase();
  set(ref(db, "users/" + uid), {
    email: email,
    phone: "",
    displayName: displayName,
  }).catch((e) => {
    console.error(e);
  });
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
