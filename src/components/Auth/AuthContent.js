import { Alert, StyleSheet, View } from "react-native";
import TitleWithDescription from "../ui/TitleWithDescription";
import AuthForm from "./AuthForm";
import { useState } from "react";

function AuthContent({ title, description, type, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    displayName: false,
  });

  function submitHandler(credencials) {
    let { email, password, displayName } = credencials;

    email.trim();
    password.trim();
    displayName.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const displayNameValid = displayName.length > 3;

    setCredentialsInvalid({
      email: !emailIsValid,
      password: !passwordIsValid,
      displayName: !displayNameValid,
    });
    //Validation

    onAuthenticate({ email, password, displayName });
  }

  return (
    <View style={styles.rootContainer}>
      <TitleWithDescription title={title} description={description} />
      <AuthForm type={type} onsubmit={submitHandler} />
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 24,
  },
});
