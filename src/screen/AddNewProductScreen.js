import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
function AddNewProductScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Input</Text>
        <Text>Input</Text>
      </View>
    </SafeAreaView>
  );
}

export default AddNewProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
  },
});
