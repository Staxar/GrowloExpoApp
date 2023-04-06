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

          <CustomButton
            titleButton={"Sign In"}
            iconName={"arrow-forward-outline"}
          />
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
          <CustomButton titleButton={"Sign Up"} />
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

const styles = StyleSheet.create({});
