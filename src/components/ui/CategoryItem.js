import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function CategoryItem({ id, category, icon_name, nav }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      android_ripple={true}
      onPress={() => nav({ id, category })}
    >
      <MaterialCommunityIcons name={icon_name} size={34} />
      <Text>{category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7cc47c",
    opacity: 0.6,
  },
  pressed: {
    opacity: 1,
  },
});
