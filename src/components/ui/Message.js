import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../constans/styles";

export default function Message({ message, right, left }) {
  return (
    <View style={styles.container} testID="message-container">
      <View
        style={[styles.innerContainer, right && styles.right]}
        testID="message-innerContainer"
      >
        {right ? (
          <View
            style={[styles.text, styles.textRight]}
            testID="message-rightContainer"
          >
            <Text style={Typography.normalDescription} testID="message-text">
              {message}
            </Text>
          </View>
        ) : (
          <View
            style={[styles.text, styles.textLeft]}
            testID="message-leftContainer"
          >
            <Text style={Typography.normalDescription} testID="message-text">
              {message}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  innerContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  right: {
    alignItems: "flex-end",
  },
  text: {
    padding: 8,
    borderRadius: 8,
  },
  textLeft: {
    backgroundColor: Colors.primary800,
  },
  textRight: {
    backgroundColor: Colors.primary100,
  },
});
