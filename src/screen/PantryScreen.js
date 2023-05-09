import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import ProductCard from "../components/ui/ProductCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { getProduct, getUserProducts } from "../util/getProducts";
import { FlatList } from "react-native";
import { get, getDatabase, onChildAdded, ref } from "firebase/database";

export default function PantryScreen({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    const db = getDatabase();
    const getFilteredProductsRef = ref(db, `users/${authCtx.uid}/products/`);
    onChildAdded(getFilteredProductsRef, (data) => {
      getProduct(data.val()).then((res) =>
        setData((prevState) => [...prevState, res])
      );
    });
  }, [navigation, route]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Your products: {data.length}</Text>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              productName={item.data.title}
              productPrize={item.data.prize}
              productUnit={item.data.unit}
              productAmount={item.data.amount}
              productId={item.id}
              productImage={item.data.selectedImage}
            />
          )}
          style={styles.fullWidth}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 10,
    marginLeft: "6%",
  },
});
