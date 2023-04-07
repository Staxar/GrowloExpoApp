import { StyleSheet, View } from "react-native";
import TitleWithDescription from "../ui/TitleWithDescription";
import AuthForm from "./AuthForm";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
function AuthContent({ title, description, type }) {
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
    createUser(email, password);
  }

  function createUser(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.email;
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
