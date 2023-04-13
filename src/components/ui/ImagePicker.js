import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import OutlinedButton from "./OutlinedButton";
import { Colors } from "../../constans/styles";

function ImagePickerExample({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] =
    ImagePicker.useCameraPermissions();
  const [pickedimage, setPickedImage] = useState();

  async function verifyPermissions() {
    if (
      cameraPermissionInformation.status ===
      ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (
      cameraPermissionInformation.status === ImagePicker.PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    let image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image.assets);
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedimage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedimage }} />;
  }

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePickerExample;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary800,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
