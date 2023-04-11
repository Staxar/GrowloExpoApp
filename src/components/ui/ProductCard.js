import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../constans/styles";

function ProductCard({
  productPrize,
  productName,
  productWeight,
  productImage,
}) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerCardContainer}>
        <Image
          source={productImage}
          style={{ width: "100%", height: 100, borderRadius: 8 }}
        />
        <Text style={Typography.smallTitle}>{productName}</Text>
        <Text style={Typography.normalDescription}>$ {productPrize}</Text>

        <View style={styles.bottomCardContainer}>
          <Text style={Typography.normalDescription}>{productWeight}kg</Text>
          <Pressable>
            <Text
              style={[
                Typography.smallDescription,
                {
                  borderWidth: 1,
                  borderColor: Colors.primary100,
                  borderRadius: 8,
                  padding: 2,
                  width: 40,
                  textAlign: "center",
                  color: Colors.primary100,
                },
              ]}
            >
              +ADD
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  outerContainer: {
    padding: 6,
    backgroundColor: "white",
    borderRadius: 8,
    width: 130,
    height: 220,
    marginHorizontal: 5,
  },
  innerCardContainer: {
    padding: 4,
    flex: 1,
    justifyContent: "flex-start",
    gap: 15,
  },
  bottomCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
