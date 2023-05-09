import { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { StyleSheet, View } from "react-native";
import ProductCard from "../components/ui/ProductCard";
import { Text } from "react-native";
import { Typography } from "../constans/styles";
import { getProducts } from "../util/getProducts";

export default function AllProductsScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setCategory(route.params.itemParams);
    const getData = async () => {
      await getProducts()
        .then((res) => setData(res))
        .catch((e) => console.error(e));
    };

    getData().catch((err) => console.error(err));
  }, [navigation, route]);

  const filteredProducts = data.filter((product) =>
    category === "" ? product : product.category === category
  );
  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={{ padding: 20 }}>
        {category !== "" && (
          <Text style={Typography.smallTitle}>Category: {category}</Text>
        )}
      </View>

      <View style={styles.innerContainer}>
        {filteredProducts && (
          <FlatList
            data={filteredProducts}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard
                productName={item.title}
                productPrize={item.prize}
                productUnit={item.unit}
                productAmount={item.amount}
                productId={item.id}
                productImage={item.selectedImage}
              />
            )}
            style={styles.fullWidth}
            keyExtractor={(item) => item.id}
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
    alignItems: "center",
    marginLeft: "6%",
  },
  fullWidth: {
    width: "100%",
  },
});
