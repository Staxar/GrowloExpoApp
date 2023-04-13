import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../../constans/styles";

export default function TitleForm({ children, title }) {
  return (
    <View style={styles.container}>
      <Text style={[Typography.bigDescription, { marginBottom: 4 }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    width: "100%",
  },
});
