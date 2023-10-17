import {
  equalTo,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";

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

export async function setFavorites(productId, uid, favorite, favoriteKey) {
  console.log(productId, uid, favorite, favoriteKey);
  let result;
  const db = getDatabase();
  const ProductFavListRef = ref(db, `products/${productId}/favorites`);
  const ProductFavRemoveListRef = ref(
    db,
    `products/${productId}/favorites/${favoriteKey}`
  );
  if (!favorite) {
    console.log("Adding to DB");
    await push(ProductFavListRef, uid)
      .then((snapshot) => {
        result = snapshot.key;
        alert("User added to favorites Successfully!");
      })
      .catch((err) => console.log("Error adding user to favorites!", err));
  } else {
    remove(ProductFavRemoveListRef);
  }
  return result;
}
