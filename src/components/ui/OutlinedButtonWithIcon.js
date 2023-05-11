import { StyleSheet, Text, View } from "react-native";

import { Typography } from "../../constans/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function OutlinedButtonWithIcon({ textValue, iconName }) {
  return (
    <View style={styles.container}>
      <Text style={Typography.normalDescription}>{textValue}</Text>
      <Ionicons name={iconName} size={14} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
