import { View, StyleSheet, Image, Text } from "react-native";
import * as Location from "expo-location";
import { Colors } from "../../constans/styles";
import OutlinedButton from "./OutlinedButton";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";

function LocationPicker({ onPickLocation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      console.log("SetLocation: ", mapPickedLocation);
      setLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (location) {
        const address = await getAddress(location.lat, location.lng);
        onPickLocation({ ...location, address: address });
      }
    }
    handleLocation();
  }, [location, onPickLocation]);

  async function getLocationHandler() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  let text = "No location taken yet.";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Waiting...";
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>{text}</Text>;

  if (location) {
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(location.lat, location.lng),
        }}
        style={styles.mapPreviewImage}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary800,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
