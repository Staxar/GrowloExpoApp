import { ScrollView, StyleSheet, Text, View } from "react-native";
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
  return (
    <ScrollView>
      <View style={{ height: 150, flex: 1, justifyContent: "space-between" }}>
        <Text>{selectedImage}</Text>
      </View>
      <View style={{ gap: 10, marginVertical: 5 }}>
        <Text style={Typography.bigDescription}>{title}</Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={Typography.normalTitle}>${prize}</Text>
          <Text style={Typography.normalTitle}>{unit}</Text>
        </View>

        <Text>Description:</Text>
        <Text style={Typography.normalDescription}>{description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 5,
        }}
      >
        <Text style={Typography.smallDescription}>ID: {id}</Text>
        <Text style={[Typography.smallDescription, { color: "red" }]}>
          Report: <Ionicons name="flag-outline" />
        </Text>
      </View>
      {pickedLocation && (
        <View style={{ gap: 5 }}>
          <Text style={Typography.normalDescription}>
            Location: {pickedLocation.address}
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
      )}
    </ScrollView>
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
