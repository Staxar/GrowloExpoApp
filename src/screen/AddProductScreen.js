import { DevSettings, SafeAreaView, StyleSheet } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";
import { getDatabase, push, ref, set } from "firebase/database";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native";
function AddProductScreen({ navigation, route }) {
  const authCtx = useContext(AuthContext);

  function updateValues(props) {
    const db = getDatabase();
    const postListRef = ref(db, "products");
    const newPostRef = push(postListRef);
    try {
      set(newPostRef, {
        uid: authCtx.uid,
        description: props.description,
        timestamp: props.timestamp,
        selectedImage: props.selectedImage,
        pickedImages: props.pickedImages,
        pickedLocation: props.pickedLocation,
        unit: props.selectedUnit,
        category: props.selectedCategory,
        phoneCode: props.selectedPhoneCode,
        phoneNumber: props.phoneNumber,
        amount: props.amount,
        prize: props.prize,
        title: props.enteredTitle,
      });
      DevSettings.reload();
      navigation.navigate("Welcome");
    } catch (err) {
      Alert.alert(console.error(err));
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
