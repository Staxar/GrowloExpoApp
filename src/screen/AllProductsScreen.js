import { useEffect, useState } from "react";
import {
  child,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { Button, FlatList, SafeAreaView, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import ProductCard from "../components/ui/ProductCard";

export default function AllProductsScreen({ route, navigation }) {
  const [filteredData, setFilteredData] = useState({});
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(route.params.itemParams);

  useEffect(() => {
    const db = getDatabase();
    const getCategoryData = query(ref(db, "products"));

    get(getCategoryData)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // const response = Object.values(snapshot.val());
          const data = snapshot.val();
          const productArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
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
  }, []);
  const filteredProducts = data.filter(
    (product) => product.selectedCategory === category
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 10,
          margin: 10,
        }}
      >
        {filteredProducts && (
          <FlatList
            data={filteredProducts}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard
                productName={item.enteredTitle}
                productPrize={item.prize}
                productWeight={item.weight}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
