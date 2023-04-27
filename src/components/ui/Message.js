import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../constans/styles";

export default function Message({ message, right, left }) {
  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, right && styles.right]}>
        {right ? (
          <View style={[styles.text, styles.textRight]}>
            <Text style={Typography.normalDescription}>{message}</Text>
          </View>
        ) : (
          <View style={[styles.text, styles.textLeft]}>
            <Text style={Typography.normalDescription}>{message}</Text>
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
