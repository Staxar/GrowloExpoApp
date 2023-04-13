import { Image, ScrollView, StyleSheet, View } from "react-native";
import ImagePickerExample from "./ImagePicker";
import LeftIconInput from "./LeftIconInput";
import LocationPicker from "./LocationPicker";
import Button from "./Button";
import { useCallback, useState } from "react";

export default function AddProductForm() {
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  function savePlaceHandler() {
    console.log(selectedImage, "image");
    console.log(pickedLocation, "location");
  }

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={styles.innerContainer}>
          <LeftIconInput textValue={"Title"} />
          <LeftIconInput textValue={"Description"} />
          <LeftIconInput textValue={"Quantity"} />
          <LeftIconInput textValue={"Weight"} />
          <LeftIconInput textValue={"Unit"} />
          <LeftIconInput textValue={"Prize"} />
          <LeftIconInput textValue={"Phone number"} />
          <ImagePickerExample onTakeImage={takeImageHandler} />
          <LocationPicker onPickLocation={pickLocationHandler} />
          <Button onPress={savePlaceHandler}>Add Place</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    padding: 20,
    width: "100%",
    height: "100%",
  },
});
