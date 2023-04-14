import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constans/styles";

const SearchBar = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
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
    flex: 1,
    marginVertical: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.primary800,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    margin: 10,
    height: "100%",
    width: "100%",
  },
});
