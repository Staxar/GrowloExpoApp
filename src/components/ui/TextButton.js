import { View, Button, Text } from "react-native";

function TextButton({ pressed, titleButton, titleDescription }) {
  return (
    <View>
      <Text>{titleDescription}</Text>
      <Button onPress={pressed} title={titleButton} />
    </View>
  );
}

export default TextButton;
