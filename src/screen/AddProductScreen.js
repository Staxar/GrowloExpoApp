import { SafeAreaView, StyleSheet } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getAuth } from "@firebase/auth";
function AddProductScreen() {
  function updateValues(props) {
    const auth = getAuth();
    const db = getDatabase();
    const postListRef = ref(db, "products");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      uid: auth.currentUser.uid,
      description: props.description,
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <AddProductForm update={updateValues} />
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
