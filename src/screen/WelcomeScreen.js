import { useEffect, useState, useContext } from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../components/ui/Banner";
import ProductGroup from "../components/ui/ProductGroup";
import { getLastProducts } from "../util/getProducts";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen({ navigation, route }) {
  const [productData, setProductData] = useState({});
  const [gettingData, setGettingData] = useState(false);
  const authCtx = useContext(AuthContext);
  async function getData() {
    setGettingData(false);
    getLastProducts()
      .then((res) => setProductData(res))
      .then(() => setGettingData(true));
    return;
  }

  useEffect(() => {
    if (authCtx.isAuthenticated) {
      getData();
    } else {
      navigation.navigate("Login");
    }

    return;
  }, [navigation, route, authCtx]);
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
