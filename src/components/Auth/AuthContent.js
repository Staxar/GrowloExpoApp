import { StyleSheet, Text, View } from "react-native";
import TitleWithDescription from "../ui/TitleWithDescription";
import AuthForm from "./AuthForm";
import TextButton from "../ui/TextButton";
import RightIconButton from "../ui/RightIconButton";

function AuthContent({ title, description, type }) {
  return (
    <View style={styles.rootContainer}>
      <TitleWithDescription title={title} description={description} />
      <AuthForm />
      {type === "login" ? (
        <>
          <TextButton titleButton={"Forgot password?"} />
          <RightIconButton titleButton={"Sign In"} />
          <TextButton
            titleButton={"Sign up"}
            titleDescription={"Don't have an account?"}
          />
        </>
      ) : type === "signup" ? (
        <>
          <TextButton
            titleDescription={"By creating an account, you agree to our"}
            titleButton={"Term & Condition"}
          />
          <RightIconButton titleButton={"Sign Up"} />
          <TextButton
            titleButton={"Sign Up"}
            titleDescription={"Already have an account?"}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
