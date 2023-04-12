import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../store/auth-context";
import Banner from "../components/ui/Banner";
import ProductGroup from "../components/ui/ProductGroup";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationPicker from "../components/ui/LocationPicker";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView style={styles.innerContainer}>
        <Banner />
        <Banner />
        <ProductGroup title={"Best Deals"} />
        {/* <ProductGroup title={"Newtest"} /> */}
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
    marginVertical: 24,
  },
});
