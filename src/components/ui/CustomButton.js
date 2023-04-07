import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constans/styles";

function CustomButton({ titleButton }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.pressableText}>{titleButton}</Text>
      </Pressable>
    </View>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  pressableContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: Colors.primary100,
    borderRadius: 16,
    flexDirection: "row",
  },
  pressableText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginHorizontal: 4,
    alignSelf: "center",
  },
});
