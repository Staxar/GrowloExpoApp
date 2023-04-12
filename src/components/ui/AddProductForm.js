import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import ImagePickerExample from "./ImagePicker";
import LeftIconInput from "./LeftIconInput";
import LocationPicker from "./LocationPicker";

export default function AddProductForm() {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={styles.innerContainer}>
          <LeftIconInput textValue={"Name"} />
          <LeftIconInput textValue={"Quantity"} />
          <LeftIconInput textValue={"Weight"} />
          <LeftIconInput textValue={"Prize"} />
          <LeftIconInput textValue={"Phone number"} />
          <ImagePickerExample />
          <LocationPicker />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    width: "100%",
    height: "100%",
  },
});
