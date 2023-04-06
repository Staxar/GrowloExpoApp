import { View } from "react-native";
import LeftIconInput from "../ui/LeftIconInput";
function AuthForm() {
  return (
    <View>
      <LeftIconInput
        textValue={"Username or Email"}
        iconName={"person-outline"}
        contentType={"username"}
      />

      <LeftIconInput
        textValue={"Password"}
        iconName={"lock-open-outline"}
        contentType={"password"}
        secure={true}
      />
    </View>
  );
}

export default AuthForm;
