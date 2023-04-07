import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../../constans/styles";
function TitleWithDescription({ title, description }) {
  return (
    <View style={styles.container}>
      <Text style={[Typography.bigTitle, styles.text]}>{title}</Text>
      <Text style={[Typography.normalDescription, styles.text]}>
        {description}
      </Text>
    </View>
  );
}

export default TitleWithDescription;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
  },
  text: {
    marginVertical: 8,
  },
});
