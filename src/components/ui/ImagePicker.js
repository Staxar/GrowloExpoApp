import { Alert, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import OutlinedButton from "./OutlinedButton";
import { Colors } from "../../constans/styles";
import PagerView from "react-native-pager-view";
import ImageViewer from "./ImageViewer";

function ImagePickerExample({ onTakeImage, onPickedImage }) {
  const [cameraPermissionInformation, requestPermission] =
    ImagePicker.useCameraPermissions();
  const [takenImage, setTakenImage] = useState();
  const [pickedImage, setPickedImage] = useState([]);

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

  async function takeImageHandler(props) {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    if (props === "camera") {
      let image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (image.canceled) {
        return;
      }
      setPickedImage([]);
      setTakenImage(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    } else if (props === "image") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 3,
        aspect: [4, 3],
        quality: 0.1,
      });
      if (result.canceled) {
        return;
      }
      setTakenImage(null);
      setPickedImage([]);
      {
        result.assets.map((image) => {
          return setPickedImage((current) => [...current, image.uri]);
        });
      }
    } else {
      throw new Error("Something went wrong!");
    }
  }

  function ImagePreview() {
    let imagePreview = <Text>No image taken yet.</Text>;

    if (takenImage) {
      // console.log(takenImage);
      return (imagePreview = (
        <Image style={styles.image} source={{ uri: takenImage }} />
      ));
    } else if (pickedImage.length > 0) {
      return (imagePreview = (
        <PagerView initialPage={0} style={{ height: "100%", width: "100%" }}>
          {pickedImage.map((image, index) => {
            return (
              <View key={index * 10} style={styles.image}>
                <ImageViewer selectedImage={image} key={index} />
                <Text></Text>
              </View>
            );
          })}
        </PagerView>
      ));
    }
    return imagePreview;
  }

  useEffect(() => {
    if (pickedImage) {
      onPickedImage(pickedImage);
    } else {
      console.log("Something went wrong!");
    }
  }, [pickedImage, takenImage, takeImageHandler]);

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.imagePreview}>{ImagePreview()}</View>
      <OutlinedButton icon="camera" onPress={() => takeImageHandler("camera")}>
        Take Image
      </OutlinedButton>
      <Text style={{ alignSelf: "center" }}>Or</Text>
      <OutlinedButton
        icon="image-outline"
        onPress={() => takeImageHandler("image")}
      >
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
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
