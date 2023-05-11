import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import LocationPicker from "../components/ui/LocationPicker";

export default function AddressSettingsScreen() {
  const [pickedLocation, setPickedLocation] = useState();

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  return (
    <View style={styles.container}>
      <LocationPicker
        onPickLocation={pickLocationHandler}
        goBack={"AddressSettingsScreen"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
