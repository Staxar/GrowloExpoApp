import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../../constans/styles";
function TitleWithDescription({ title, description }) {
  return (
    <View style={styles.container}>
      <Text style={Typography.bigTitle}>{title}</Text>
      <Text style={Typography.normalDescription}>{description}</Text>
    </View>
  );
}

export default TitleWithDescription;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
  },
});
