import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../constans/styles";
import ProductCard from "./ProductCard";
import { DATA } from "../../../assets/Data/DATA";

function ProductGroup({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={Typography.normalTitle}>{title}</Text>
        <Text style={Typography.normalDescription}>View All</Text>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          horizontal
          data={DATA.slice(0, 5)}
          renderItem={({ item }) => (
            <ProductCard
              productPrize={item.count}
              productName={item.title}
              productWeight={item.count}
              productImage={item.img}
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
    borderTopWidth: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopColor: Colors.primary800,
    marginHorizontal: 12,
    marginVertical: 24,
    borderRadius: 8,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2,
  },
  contentContainer: {
    padding: 1,
  },
});
