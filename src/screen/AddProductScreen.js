import { SafeAreaView, StyleSheet } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { uploadImages } from "../util/uploadImage";
import { uploadProduct } from "../util/uploadProduct";

function AddProductScreen({ navigation, route }) {
  const authCtx = useContext(AuthContext);

  async function updateValues(props) {
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
        phoneCode: props.selectedPhoneCode,
        phoneNumber: props.phoneNumber,
        amount: props.amount,
        prize: props.prize,
        title: props.enteredTitle,
      };
      await uploadProduct(payload, imageUrl);
      navigation.navigate("Welcome");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AddProductForm update={updateValues} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
