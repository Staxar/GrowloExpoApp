import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constans/styles";

export default function ContainerOutlinedButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
