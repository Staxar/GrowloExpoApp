import { View, Text, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, Typography } from "../../constans/styles";
function LeftIconInput({
  textValue,
  iconName,
  contentType,
  secure,
  keyboardType,
  onUpdateValue,
  value,
  maxLength,
}) {
  return (
    <View style={styles.container}>
      <Text style={Typography.normalDescription}>{textValue}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={iconName} style={styles.icon} />
        <TextInput
          style={styles.inputText}
          textContentType={contentType}
          secureTextEntry={secure}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onUpdateValue}
          value={value}
        />
      </View>
    </View>
  );
}

export default LeftIconInput;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary500,
  },
  inputText: {
    padding: 4,
    marginLeft: 4,
    width: "80%",
  },
  icon: {
    width: 12,
    height: 12,
    marginHorizontal: 4,
  },
});
