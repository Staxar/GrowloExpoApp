import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function CategoryItem(props) {
  console.log(props.item.icon_name);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={props.item.icon_name}
        size={34}
        color={"black"}
      />
      <Text>{props.item.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
