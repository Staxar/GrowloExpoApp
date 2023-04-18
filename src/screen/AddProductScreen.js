import { SafeAreaView, StyleSheet } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";
import { getDatabase, push, ref, set } from "firebase/database";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
function AddProductScreen() {
  const authCtx = useContext(AuthContext);
  function updateValues(props) {
    const db = getDatabase();
    const postListRef = ref(db, "products");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      uid: authCtx.uid,
      description: props.description,
      date: props.date,
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
