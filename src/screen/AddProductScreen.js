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
    const image = props.selectedImage;
    try {
      const imageUrl = await uploadImages(image);
      const product = await uploadProduct(props, imageUrl, authCtx.uid);
      console.log("Product: ", product);
      navigation.navigate("Welcome");
      // const product = await uploadProduct(props);
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
