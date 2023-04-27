import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constans/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchBar = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} style={styles.icon} />
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.primary800,
  },
  text: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
});
