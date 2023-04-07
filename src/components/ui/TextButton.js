import { View, Text, Pressable, StyleSheet } from "react-native";
import { Typography } from "../../constans/styles";
import { useNavigation } from "@react-navigation/native";

function TextButton({ type, titleButton, titleDescription }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={Typography.normalDescription}>{titleDescription}</Text>
      <Pressable
        onPress={() =>
          navigation.navigate(type === "login" ? "Signup" : "Login")
        }
      >
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
