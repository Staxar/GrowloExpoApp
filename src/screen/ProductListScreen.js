import { child, get, getDatabase, ref } from "firebase/database";
import { View, Text } from "react-native";

export default function ProductListScreen() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <View>
      <Text>ProductListScreen</Text>
    </View>
  );
}
