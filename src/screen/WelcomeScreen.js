import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DATA } from "../../assets/Data/DATA";
import Banner from "../components/ui/Banner";
import ProductGroup from "../components/ui/ProductGroup";
function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView style={styles.innerContainer}>
        <Banner
          imageSrc={require("../../assets/Images/Banners/GrowloBanner.png")}
        />
        <Banner
          imageSrc={require("../../assets/Images/Banners/WelcomeBanner.png")}
        />
        <ProductGroup title={"Best Deals"} data={DATA} />
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
