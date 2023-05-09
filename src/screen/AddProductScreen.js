import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";
import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { uploadImages } from "../util/uploadImage";
import { uploadProduct } from "../util/uploadProduct";
import { Colors } from "../constans/styles";
import { View } from "react-native";

function AddProductScreen({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  async function updateValues(props) {
    setUploading(true);
    let image = props.selectedImage;
    try {
      const imageUrl = await uploadImages(image);
      const payload = {
        uid: authCtx.uid,
        description: props.description,
        timestamp: props.timestamp,
        selectedImage: imageUrl,
        pickedLocation: props.pickedLocation,
        unit: props.selectedUnit,
        category: props.selectedCategory,
        phoneNumber: props.phoneNumber,
        amount: props.amount,
        prize: props.prize,
        title: props.enteredTitle,
      };
      await uploadProduct(payload, authCtx.uid);
      setUploading(false);
      navigation.navigate("Welcome");
    } catch (e) {
      setUploading(false);
      console.log(e);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {uploading ? (
            <ActivityIndicator size="large" color={Colors.primary100} />
          ) : (
            <AddProductForm update={updateValues} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
