import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, Typography } from "../../constans/styles";
import TitleForm from "./TitleForm";
function LeftIconInput({
  textValue,
  iconName,
  contentType,
  secure,
  keyboardType,
  onUpdateValue,
  value,
  maxLength,
  multiline,
  placeholder,
  autoCapitalize,
}) {
  return (
    <TitleForm title={textValue}>
      <View style={styles.inputContainer}>
        {iconName && <Ionicons name={iconName} style={styles.icon} size={12} />}
        <TextInput
          style={[
            styles.inputText,
            Typography.normalTitle,
            multiline ? styles.multiline : null,
          ]}
          textContentType={contentType}
          secureTextEntry={secure}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onUpdateValue}
          value={value}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={Colors.primary800}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </TitleForm>
  );
}

export default LeftIconInput;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: Colors.primary600,
    borderRadius: 8,
  },
  inputText: {
    padding: 4,
    marginLeft: 4,
    width: "100%",
  },
  icon: {
    width: 12,
    height: 12,
    marginHorizontal: 4,
  },
  multiline: {
    height: 120,
  },
});
