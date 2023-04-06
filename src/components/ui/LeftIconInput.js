import { View, Text, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
function LeftIconInput({ textValue, iconName, contentType, secure }) {
  return (
    <View>
      <Text>{textValue}</Text>
      <View>
        <Ionicons name={iconName} />
      </View>
      <TextInput textContentType={contentType} secureTextEntry={secure} />
    </View>
  );
}

export default LeftIconInput;
