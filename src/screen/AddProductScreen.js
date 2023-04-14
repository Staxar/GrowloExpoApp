import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AddProductForm from "../components/ui/AddProductForm";

function AddProductScreen() {
  function updateValues(props) {
    console.log(props);
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
