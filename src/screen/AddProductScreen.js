import { StyleSheet, Text, View } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";

function AddProductScreen() {
  return (
    <View style={styles.container}>
      <AddProductForm />
    </View>
  );
}

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
