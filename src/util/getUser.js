import { child, get, getDatabase, ref } from "firebase/database";

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
