import { Alert, StyleSheet, View } from "react-native";
import TitleWithDescription from "../ui/TitleWithDescription";
import AuthForm from "./AuthForm";
import { useEffect, useState } from "react";
import { getUserByName } from "../../util/user";

function AuthContent({ title, description, type, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    displayName: false,
  });

  function emailValidation(email) {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.includes("@")) {
      return Alert.alert("Email should includes @ character!");
    }
    if (!email.match(mailFormat)) {
      return Alert.alert("It looks you type wrong email format!");
    }
    return true;
  }
  function passwordValidation(password, confirmPassword) {
    let passwordFormat =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password !== confirmPassword) {
      return Alert.alert("Passwords are not equal!");
    } else if (!password.match(passwordFormat)) {
      return Alert.alert(
        "It looks you type wrong password format!",
        "Password should have between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
    }
    return true;
  }

  async function displayNameValidation(displayName) {
    if (displayName.length < 4) {
      return Alert.alert("Username should have at list 4 characters!");
    }
    if (!isNaN(displayName)) {
      return Alert.alert("Username should't be numeric!");
    }
    let response = await getUserByName(displayName);
    if (!response) {
      return false;
    } else {
      return true;
    }
  }

  async function submitHandler(credencials) {
    let { email, password, confirmPassword, displayName } = credencials;

    email = email.trim().toLowerCase();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    displayName = displayName.trim();

    let emailIsOK = emailValidation(email);
    let passwordIsOK = passwordValidation(password, confirmPassword);
    let displayNameIsOK = await displayNameValidation(displayName);

    if (emailIsOK && passwordIsOK && displayNameIsOK) {
      onAuthenticate({ email, password, displayName });
    }
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
