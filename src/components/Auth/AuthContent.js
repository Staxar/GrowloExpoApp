import { StyleSheet, View } from "react-native";
import TitleWithDescription from "../ui/TitleWithDescription";
import AuthForm from "./AuthForm";
import { useState } from "react";

function AuthContent({ title, description, type, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  function submitHandler(credencials) {
    let { email, password } = credencials;

    email.trim();
    password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    setCredentialsInvalid({
      email: !emailIsValid,
      password: !passwordIsValid,
    });
    //Validation
    onAuthenticate({ email, password });
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
