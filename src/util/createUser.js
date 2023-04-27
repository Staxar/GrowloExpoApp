import { getDatabase, ref, set } from "firebase/database";

export async function createUser(uid) {
  const db = getDatabase();
  set(ref(db, "users/" + uid)).catch((e) => {
    console.error(e);
  });
}
