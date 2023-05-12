import { Image, StyleSheet, View } from "react-native";

function Banner({ imageSrc }) {
  return (
    <View style={styles.container} testID="banner-container">
      <Image source={imageSrc} style={styles.image} testID="banner-image" />
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
});
