import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from "react-native";
import ProductCard from "../components/ui/ProductCard";
import { Typography } from "../constans/styles";
import { getProducts } from "../util/getProducts";

export default function AllProductsScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
    setRefreshing(false);
  }, []);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setPage(page + 1);

    const newData = await getProducts(page)
      .then((res) => res)
      .catch((e) => {
        console.error(e);
        return [];
      });

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      // Filter out existing items to maintain uniqueness
      const uniqueNewData = newData.filter(
        (newItem) =>
          !data.some((existingItem) => existingItem.id === newItem.id)
      );

      // Update state with unique new items
      setData((prevData) => [...prevData, ...uniqueNewData]);
    }

    setLoading(false);
  };

  useEffect(() => {
    setData([]);
    setCategory(route.params.itemParams);
    setHasMore(true);
    setPage(1);
    loadMore();
  }, [navigation, route, refreshing]);

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
                productPrice={item.price}
                productUnit={item.unit}
                productAmount={item.amount}
                productId={item.id}
                productImage={item.selectedImage}
              />
            )}
            style={styles.fullWidth}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
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
