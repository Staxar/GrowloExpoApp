import { Button, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
function RightIconButton({ titleButton, iconName }) {
  return (
    <View>
      <Button title={titleButton} />
      <Ionicons name={iconName} />
    </View>
  );
}

export default RightIconButton;
