import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../constans/styles";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";

function ProductGroup({ title, data }) {
  const navigation = useNavigation();

  function nav() {
    navigation.navigate("AllProducts", { itemParams: "" });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={Typography.normalTitle}>{title}</Text>
        <Pressable onPress={nav}>
          <Text
            style={[Typography.normalDescription, { color: Colors.primary100 }]}
          >
            View All
          </Text>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          horizontal
          data={data.slice(0, 5)}
          renderItem={({ item }) => (
            <ProductCard
              productPrize={item.count}
              productName={item.title}
              productUnit={item.unit}
              productAmount={item.count}
              productImage={item.img}
              productSpecialPrize={item.specialPrize}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default ProductGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopColor: Colors.primary800,
    marginVertical: 4,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    margin: 10,
  },
});
