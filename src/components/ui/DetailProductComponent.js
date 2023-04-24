import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, Typography } from "../../constans/styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { getMapPreview } from "../../util/location";
export default function DetailProductComponent({
  selectedImage,
  title,
  prize,
  unit,
  description,
  id,
  pickedLocation,
}) {
  console.log("Location", pickedLocation);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "30%" }}>
        <Text>{selectedImage}</Text>
      </View>
      <View>
        <Text style={Typography.normalTitle}>{title}</Text>
        <Text style={Typography.normalTitle}>${prize}</Text>
        <Text style={Typography.normalTitle}>{unit}</Text>
        <Text>Description</Text>
        <Text style={Typography.normalDescription}>{description}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={Typography.smallDescription}>ID: {id}</Text>
        <Text style={[Typography.smallDescription, { color: "red" }]}>
          Zgłoś: <Ionicons name="flag-outline" />
        </Text>
      </View>
      <View>
        <Text style={Typography.normalDescription}>
          Location: {pickedLocation && pickedLocation.address}
        </Text>
        <View style={styles.mapPreview}>
          <Image
            source={{
              uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
            }}
            style={styles.mapPreviewImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreviewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary800,
    borderRadius: 4,
  },
});
