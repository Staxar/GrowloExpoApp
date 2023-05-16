import { Alert, StyleSheet, View } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebaseConfig";
import { SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native";
function SignupScreen({ navigation, route }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password, displayName }) {
    setIsAuthenticating(true);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        updateProfile(user, {
          displayName: displayName,
        }).catch((e) => console.log(e));
      })
      .catch((error) => {
        return Alert.alert(
          "Authentication failed!",
          "Could not log you in. Please check your credentials or try again later!",
          console.error(error.code, error.message)
        );
      });
    setIsAuthenticating(false);
    navigation.navigate("Login");
    Alert.alert("Account created!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {isAuthenticating ? (
          <>
            <LoadingOverlay message={"Creating user..."} />
            <ActivityIndicator size={"large"} />
          </>
        ) : (
          <AuthContent
            title={"Getting Started"}
            description={"Create an account to continue"}
            type={"signup"}
            onAuthenticate={signupHandler}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    padding: 12,
    marginHorizontal: 24,
    marginVertical: 24,
  },
});
