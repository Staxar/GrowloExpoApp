import { get, getDatabase, query, ref } from "firebase/database";

export async function getProducts() {
  let result = "";
  const db = getDatabase();
  const getCategoryData = query(ref(db, "products"));

  await get(getCategoryData)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        result = productArray;
        return;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      return error(error);
    });
  return result;
}
