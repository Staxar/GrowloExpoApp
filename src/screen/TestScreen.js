import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import TestComponent from "../components/ui/TestComponent";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
export default function TestScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let backGroundStatus = await Location.requestBackgroundPermissionsAsync();
      console.log(backGroundStatus);
      if (backGroundStatus.status !== "granted") {
        console.log("Not granted!");
        setErrorMsg("Permission to background location was denied");
        return;
      }
      TaskManager.defineTask(
        "REGION_LOCATION",
        ({ data: { eventType, region }, error }) => {
          if (error) {
            console.log(error);
            return;
          }
          if (eventType === Location.GeofencingEventType.Enter) {
            console.log("You've entered region:");
          } else if (eventType === Location.GeofencingEventType.Exit) {
            console.log("You've left region:");
          }
        }
      );

      let region = {
        identifier: 1,
        latitude: 51.5572754,
        longitude: -0.2702119,
        radius: 10,
      };
      Location.startGeofencingAsync("REGION_LOCATION", [region]);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
