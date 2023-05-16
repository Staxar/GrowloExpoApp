import { StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import LocationPicker from "../components/ui/LocationPicker";
import { Colors, Typography } from "../constans/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function AddressSettingsScreen() {
  const [pickedLocation, setPickedLocation] = useState();

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  return (
    <View style={styles.container}>
      <LocationPicker
        onPickLocation={pickLocationHandler}
        link={"AddressSettingsScreen"}
      />
      <View style={styles.innerContainer}>
        <Text style={Typography.normalTitle}>Your current addresses</Text>
        <View style={styles.innerContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.itemContainer}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color={Colors.error800}
                style={{ marginHorizontal: 20 }}
              />

              <Text style={Typography.normalDescription}>Adress</Text>
            </View>
            <View style={styles.itemContainer}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color={Colors.error800}
                style={{ marginHorizontal: 20 }}
              />

              <Text style={Typography.normalDescription}>Adress</Text>
            </View>
            <View style={styles.itemContainer}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color={Colors.error800}
                style={{ marginHorizontal: 20 }}
              />

              <Text style={Typography.normalDescription}>Adress</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    marginVertical: 20,
  },
  contentContainer: {
    width: "100%",
    gap: 20,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 0.7,
    borderRadius: 8,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
