import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import CountryFlag from "react-native-country-flag";
const FlagItem = ({ isoCode, dial, countryName }) => {
  return (
    <View style={styles.container}>
      <CountryFlag isoCode={isoCode} size={24} style={{ width: 35 }} />
      <Text style={{ width: 45 }}>{dial}</Text>
      <Text style={{ flex: 1 }}>{countryName}</Text>
    </View>
  );
};

export default FlagItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    gap: 20,
  },
});
