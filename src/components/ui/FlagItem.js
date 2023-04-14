import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import CountryFlag from "react-native-country-flag";

const FlagItem = ({ isoCode, dial, countryName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CountryFlag isoCode={isoCode} size={24} />
        <Text>{dial}</Text>
      </View>
      {countryName && <Text style={{ marginLeft: 20 }}>{countryName}</Text>}
    </View>
  );
};

export default FlagItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
});
