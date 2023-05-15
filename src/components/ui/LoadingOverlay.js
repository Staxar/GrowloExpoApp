import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer} testID="loadingOverlay-container">
      <Text style={styles.message} testID="loadingOverlay-text">
        {message}
      </Text>
      <ActivityIndicator size="large" testID="loadingOverlay-indicator" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
