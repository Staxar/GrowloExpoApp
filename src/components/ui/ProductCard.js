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
      <Pressable android_ripple={true} style={{ flex: 1 }}>
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
      </Pressable>
    </View>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  outerContainer: {
    padding: 4,
    backgroundColor: "white",
    borderRadius: 8,
    width: 130,
    height: 220,
    marginHorizontal: 6,
  },
  innerCardContainer: {
    padding: 4,
    flex: 1,
    justifyContent: "flex-start",
    gap: 14,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  bottomCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
