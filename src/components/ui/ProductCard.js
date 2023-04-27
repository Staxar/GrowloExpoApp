import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Typography } from "../../constans/styles";
import AddCustomButton from "./AddCustomButton";
import { useNavigation } from "@react-navigation/native";

function ProductCard({
  productPrize,
  productName,
  productAmount,
  productImage,
  productUnit,
  productSpecialPrize,
  productId,
}) {
  const navigation = useNavigation();
  function navigateToDetailsHandler(id) {
    navigation.navigate("Details", id);
  }
  let image = productImage[0];
  return (
    <View style={styles.rootContainer}>
      <Pressable
        android_ripple={true}
        onPress={() => navigateToDetailsHandler(productId)}
      >
        <View style={styles.outerContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={
                image !== undefined
                  ? {
                      uri: image,
                    }
                  : require("../../../assets/Images/imagePlaceholder.png")
              }
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={Typography.smallDescription}>{productName}</Text>
            <View style={styles.rowPrizeContainer}>
              {productSpecialPrize ? (
                <>
                  <Text style={[Typography.smallTitle, { marginRight: 5 }]}>
                    ${productSpecialPrize}
                  </Text>
                  <Text
                    style={[
                      Typography.smallDescription,
                      {
                        textDecorationLine: "line-through",
                      },
                    ]}
                  >
                    ${productPrize}
                  </Text>
                </>
              ) : (
                <Text style={[Typography.smallTitle, { marginRight: 5 }]}>
                  ${productPrize}
                </Text>
              )}
            </View>

            <View style={styles.rowContentContainer}>
              <Text style={Typography.smallDescription}>
                {productAmount} {productUnit}
              </Text>
              <AddCustomButton />
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  outerContainer: {
    width: 150,
    height: 250,
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
