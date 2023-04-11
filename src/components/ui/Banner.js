import { Image, StyleSheet, View } from "react-native";

function Banner({ imageSrc }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Images/Banners/WelcomeBanner.png")}
        style={{ width: "100%", height: 100, borderRadius: 8 }}
      />
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
