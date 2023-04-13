import { StyleSheet, View } from "react-native";
import ImageViewer from "./ImageViewer";

export default function PagesGallery({ imageUri }) {
  return (
    <View style={styles.container}>
      <ImageViewer selectedImage={imageUri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
