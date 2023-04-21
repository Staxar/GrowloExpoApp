import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { child, get, getDatabase, query, ref } from "firebase/database";

export default function ProductDetailsScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState(route.params);

  useEffect(() => {
    const db = getDatabase();
    const getCategoryData = query(ref(db, "products/" + id));

    get(getCategoryData)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          //   const productArray = Object.keys(data).map((key) => ({
          //     id: key,
          //     ...data[key],
          //   }));

          try {
            setData(productArray);
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        return error(error);
      });
  }, [navigation, route]);

  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
