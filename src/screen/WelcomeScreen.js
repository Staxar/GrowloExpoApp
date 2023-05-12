import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../components/ui/Banner";
import ProductGroup from "../components/ui/ProductGroup";
import { getLastProducts } from "../util/getProducts";
import { useEffect, useState } from "react";
import { Text } from "react-native";

function WelcomeScreen({ navigation, route }) {
  const [productData, setProductData] = useState({});
  const [gettingData, setGettingData] = useState(false);
  async function getData() {
    setGettingData(false);
    getLastProducts()
      .then((res) => setProductData(res))
      .then(() => setGettingData(true))
      .catch((err) => console.error(err));
    return;
  }

  useEffect(() => {
    getData();
    return;
  }, [navigation, route]);
  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView style={styles.innerContainer}>
        <Banner
          imageSrc={require("../../assets/Images/Banners/GrowloBanner.png")}
        />
        <Banner
          imageSrc={require("../../assets/Images/Banners/WelcomeBanner.png")}
        />
        {gettingData ? (
          <ProductGroup title={"Best Deals"} data={productData} />
        ) : (
          <ActivityIndicator size={"large"} testID="loading-indicator" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    marginVertical: 12,
  },
});
