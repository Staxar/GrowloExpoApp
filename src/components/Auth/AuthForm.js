import { StyleSheet, View } from "react-native";
import LeftIconInput from "../ui/LeftIconInput";
function AuthForm({ type }) {
  return (
    <View style={styles.container}>
      {type === "login" ? (
        <>
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
        </>
      ) : (
        <>
          <LeftIconInput
            textValue={"Email"}
            iconName={"mail-outline"}
            contentType={"emailAddress"}
          />
          <LeftIconInput
            textValue={"Username"}
            iconName={"person-outline"}
            contentType={"username"}
          />
          <LeftIconInput
            textValue={"Password"}
            iconName={"lock-open-outline"}
            contentType={"password"}
            secure={true}
          />
        </>
      )}
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
});
