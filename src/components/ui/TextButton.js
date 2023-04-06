import { View, Button, Text, Pressable, StyleSheet } from "react-native";
import { Typography } from "../../constans/styles";

function TextButton({ pressed, titleButton, titleDescription }) {
  return (
    <View style={styles.container}>
      <Text style={Typography.normalDescription}>{titleDescription}</Text>
      <Pressable>
        <Text style={styles.pressableText}>{titleButton}</Text>
      </Pressable>
    </View>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressableText: {
    fontWeight: "bold",
    marginHorizontal: 4,
  },
});
