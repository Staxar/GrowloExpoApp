import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import LocationPicker from "../components/ui/LocationPicker";
import { Colors, Typography } from "../constans/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../components/ui/CustomButton";
export default function AddressSettingsScreen() {
  const [pickedLocation, setPickedLocation] = useState();
  const [addresses, setAddresses] = useState([]);
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function saveLocationHandler() {
    if (pickedLocation) {
      if (addresses.length < 1) {
        setAddresses((prevState) => [...prevState, pickedLocation]);
      } else if (addresses.find((e) => e.address !== pickedLocation.address)) {
        setAddresses((prevState) => [...prevState, pickedLocation]);
      } else {
        Alert.alert("Address already exist!");
      }
    }
  }
  return (
    <View style={styles.container}>
      <LocationPicker
        onPickLocation={pickLocationHandler}
        link={"AddressSettingsScreen"}
      />
      <View style={styles.innerContainer}>
        <Text style={Typography.normalTitle}>Your current addresses</Text>
        <View style={styles.innerContainer}>
          <FlatList
            data={addresses}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color={Colors.error800}
                  style={styles.icon}
                  onPress={() => {}}
                />

                <Text
                  style={[Typography.normalDescription, { flex: 0.9 }]}
                  numberOfLines={2}
                >
                  {item.address}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />

          <CustomButton titleButton={"Save"} onPress={saveLocationHandler} />
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
    flex: 1,
    marginVertical: 10,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 0.7,
    borderRadius: 8,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {
    marginHorizontal: 20,
    flex: 0.1,
  },
});
