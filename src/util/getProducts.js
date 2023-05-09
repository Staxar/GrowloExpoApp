import {
  equalTo,
  get,
  getDatabase,
  limitToFirst,
  onChildAdded,
  orderByChild,
  query,
  ref,
} from "firebase/database";
const db = getDatabase();

export async function getProducts() {
  let result = "";
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

export async function getUserProducts(uid) {
  let result;
  const getFilteredProductsRef = ref(db, `users/${uid}/products/`);
  onChildAdded(getFilteredProductsRef, (data) => {
    result = data.val();
  });
  return result;
}

export async function getLastProducts() {
  let result;
  const getCategoryData = query(ref(db, "products"), limitToFirst(5));

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

export async function getProduct(id) {
  let result;
  const getCategoryData = query(ref(db, "products/" + id));

  await get(getCategoryData)
    .then((snapshot) => {
      if (snapshot.exists()) {
        result = { id: snapshot.key, data: snapshot.val() };
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
