import { Alert, StyleSheet, View } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebaseConfig";
function SignupScreen({ navigation, route }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    "SignUp: ", email, password;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        "Create user: ", user;
      })
      .catch((error) => {
        Alert.alert(
          "Authentication failed!",
          "Could not log you in. Please check your credentials or try again later!"
        );
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    setIsAuthenticating(false);
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      {isAuthenticating ? (
        <LoadingOverlay message={"Creating user..."} />
      ) : (
        <AuthContent
          title={"Getting Started"}
          description={"Create an account to continue"}
          type={"signup"}
          onAuthenticate={signupHandler}
        />
      )}
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 24,
  },
});
