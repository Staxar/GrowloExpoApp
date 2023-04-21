import { useEffect, useState } from "react";
import { get, getDatabase, query, ref } from "firebase/database";
import { FlatList, SafeAreaView } from "react-native";
import { StyleSheet, View } from "react-native";
import ProductCard from "../components/ui/ProductCard";

export default function AllProductsScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    setCategory(route.params.itemParams);
    const db = getDatabase();
    const getCategoryData = query(ref(db, "products"));

    get(getCategoryData)
      .then((snapshot) => {
        if (snapshot.exists()) {
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
  }, [navigation, route]);
  const filteredProducts = data.filter(
    (product) => product.selectedCategory === category
  );
  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
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
            style={{ width: "100%" }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    width: "100%",
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
});
