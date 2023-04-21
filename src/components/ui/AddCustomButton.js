import { StyleSheet, Text } from "react-native";
import React from "react";
import { Colors, Typography } from "../../constans/styles";
import { Pressable } from "react-native";

export default function AddCustomButton() {
  return (
    <Pressable style={styles.container}>
      <Text style={[Typography.smallDescription, styles.text]}>+ADD</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.6,
    borderRadius: 2,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary100,
  },
  text: {
    color: Colors.primary100,
    padding: 1,
  },
});
