import { Pressable, StyleSheet, View, Text } from "react-native";
import LeftIconInput from "../ui/LeftIconInput";
import { useState } from "react";
import CustomButton from "../ui/CustomButton";
import TextButton from "../ui/TextButton";

function AuthForm({ type, onsubmit }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "username":
        setEnteredUsername(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitSignInHandler() {
    onsubmit({
      email: enteredEmail,
      password: enteredPassword,
    });
  }

  function submitSignUpHandler() {
    onsubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      displayName: enteredUsername,
    });
  }

  return (
    <View style={styles.container}>
      {type === "login" ? (
        <>
          <LeftIconInput
            textValue={"Email"}
            iconName={"mail-outline"}
            contentType={"emailAddress"}
            keyboardType="email-address"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            autoCapitalize="none"
          />

          <LeftIconInput
            textValue={"Password"}
            iconName={"lock-open-outline"}
            contentType={"password"}
            secure={true}
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            value={enteredPassword}
            autoCapitalize="none"
          />

          <View style={styles.outerContainer}>
            <Pressable>
              <Text>Forgot password?"</Text>
            </Pressable>

            <CustomButton
              titleButton={"Sign In"}
              onPress={submitSignInHandler}
            />

            <TextButton
              titleButton={"Sign Up"}
              titleDescription={"Don't have an account?"}
              type={type}
            />
          </View>
        </>
      ) : (
        <>
          <LeftIconInput
            textValue={"Email"}
            iconName={"mail-outline"}
            contentType={"emailAddress"}
            keyboardType="email-address"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            autoCapitalize="none"
          />
          <LeftIconInput
            textValue={"Username"}
            iconName={"person-outline"}
            contentType={"username"}
            onUpdateValue={updateInputValueHandler.bind(this, "username")}
            value={enteredUsername}
          />
          <LeftIconInput
            textValue={"Password"}
            iconName={"lock-open-outline"}
            contentType={"password"}
            secure={true}
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            value={enteredPassword}
            autoCapitalize="none"
          />
          <LeftIconInput
            textValue={"Confirm password"}
            iconName={"lock-open-outline"}
            contentType={"password"}
            secure={true}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            value={enteredConfirmPassword}
            autoCapitalize="none"
          />
          <View style={styles.outerContainer}>
            <TextButton
              titleDescription={"By creating an account, you agree to our"}
              titleButton={"Term & Condition"}
            />

            <CustomButton
              titleButton={"Sign Up"}
              onPress={submitSignUpHandler}
            />

            <TextButton
              titleButton={"Sign In"}
              titleDescription={"Already have an account?"}
              type={type}
            />
          </View>
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
  outerContainer: {
    flexDirection: "column",
    gap: 24,
  },
});
