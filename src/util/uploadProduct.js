import { getDatabase, push, ref, set } from "firebase/database";

export async function uploadProduct(payload, uid) {
  const db = getDatabase();
  const ProductListRef = ref(db, "products");
  const newProductRef = push(ProductListRef);
  const AddProductRef = ref(db, `users/${uid}/products`);
  const addProductRef = push(AddProductRef);
  await set(newProductRef, payload)
    .then(() => {
      set(addProductRef, newProductRef.key).catch((err) => {
        console.error(err);
        return false;
      });
      console.log("Data saved successfully!");
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
  return true;
}
