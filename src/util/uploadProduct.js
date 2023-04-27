import { getDatabase, push, ref, set } from "firebase/database";

export async function uploadProduct(payload) {
  const db = getDatabase();
  const ProductListRef = ref(db, "products");
  const newProductRef = push(ProductListRef);
  set(newProductRef, payload)
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
  return true;
}
