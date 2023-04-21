import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProductDetailsScreen({ navigation, route }) {
  return (
    <View>
      <Text>{route.params}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
