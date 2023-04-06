import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthContent from "../../../components/Auth/AuthContent";

function LoginScreen() {
  console.log("LoginScreen");
  return (
    <AuthContent
      title={"Let's Sign You In"}
      description={"Welcome back, you've been miessed!"}
      type={"login"}
    />
  );
}

export default LoginScreen;
