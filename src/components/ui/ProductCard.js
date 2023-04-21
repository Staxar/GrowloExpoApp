import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Typography } from "../../constans/styles";
import AddCustomButton from "./AddCustomButton";

function ProductCard({
  productPrize,
  productName,
  productWeight,
  productImage,
  productUnit,
  productSpecialPrize,
}) {
  return (
    <Pressable style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        <Image source={productImage} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={Typography.smallDescription}>{productName}</Text>
        <View style={styles.rowPrizeContainer}>
          <Text style={[Typography.smallTitle, { marginRight: 5 }]}>
            ${productSpecialPrize}
          </Text>
          <Text
            style={[
              Typography.smallDescription,
              { textDecorationLine: "line-through" },
            ]}
          >
            ${productPrize}
          </Text>
        </View>

        <View style={styles.rowContentContainer}>
          <Text style={Typography.smallDescription}>
            {productWeight}
            {productUnit}
          </Text>
          <AddCustomButton />
        </View>
      </View>
    </Pressable>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  outerContainer: {
    width: 130,
    height: 200,
    backgroundColor: "#ffff",
    margin: 4,
    padding: 4,
    borderRadius: 8,
  },
  imageContainer: {
    width: "100%",
    height: "50%",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: 4,
  },
  rowPrizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },
});
