import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../store/auth-context";
import Banner from "../components/ui/Banner";
import ProductGroup from "../components/ui/ProductGroup";
import { SafeAreaView } from "react-native-safe-area-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Banner />
        <ProductGroup title={"Best Deals"} />
        <Text>WelcomeScreen</Text>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 24,
  },
});
