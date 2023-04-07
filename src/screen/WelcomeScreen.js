import { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);

  return (
    <View>
      <Text>WelcomeScreen</Text>
    </View>
  );
}

export default WelcomeScreen;
