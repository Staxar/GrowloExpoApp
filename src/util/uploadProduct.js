import { getDatabase, push, ref, set } from "firebase/database";

export async function uploadProduct(props, item, uid) {
  console.log("PROPS: ", props);
  console.log("item: ", item);
  console.log("uid: ", uid);
  const db = getDatabase();
  const ProductListRef = ref(db, "products");
  const newProductRef = push(ProductListRef);
  set(newProductRef, {
    uid: uid,
    description: props.description,
    timestamp: props.timestamp,
    selectedImage: item,
    pickedLocation: props.pickedLocation,
    unit: props.selectedUnit,
    category: props.selectedCategory,
    phoneCode: props.selectedPhoneCode,
    phoneNumber: props.phoneNumber,
    amount: props.amount,
    prize: props.prize,
    title: props.enteredTitle,
  })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
  return true;
}
