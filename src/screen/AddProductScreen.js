import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";

function AddProductScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AddProductForm />
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
