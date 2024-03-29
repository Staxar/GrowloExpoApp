import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../../constans/styles";

export default function TitleForm({ children, title }) {
  return (
    <View style={styles.container}>
      <Text style={[Typography.normalDescription, { marginBottom: 4 }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    margin: 8,
    width: "100%",
  },
});
