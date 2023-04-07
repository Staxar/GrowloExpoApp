import { Pressable, StyleSheet, Text, View } from "react-native";
import TitleWithDescription from "../ui/TitleWithDescription";
import AuthForm from "./AuthForm";
import TextButton from "../ui/TextButton";
import CustomButton from "../ui/CustomButton";

function AuthContent({ title, description, type }) {
  return (
    <View style={styles.rootContainer}>
      <TitleWithDescription title={title} description={description} />
      <AuthForm type={type} />
      {type === "login" ? (
        <>
          <Pressable>
            <Text>Forgot password?"</Text>
          </Pressable>

          <CustomButton titleButton={"Sign In"} />

          <TextButton
            titleButton={"Sign Up"}
            titleDescription={"Don't have an account?"}
          />
        </>
      ) : type === "signup" ? (
        <View style={styles.outerContainer}>
          <TextButton
            titleDescription={"By creating an account, you agree to our"}
            titleButton={"Term & Condition"}
          />

          <CustomButton titleButton={"Sign Up"} />

          <TextButton
            titleButton={"Sign In"}
            titleDescription={"Already have an account?"}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 24,
  },
  outerContainer: {
    flexDirection: "column",
    gap: 24,
  },
});
