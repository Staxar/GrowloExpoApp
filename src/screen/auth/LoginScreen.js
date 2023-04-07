import { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";

function LoginScreen({ navigation, route }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        const user = userCredencial.user;
        authCtx.authenticate(user.stsTokenManager.accessToken);
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
    "CONTEXT LOGNI: ", authCtx;
  }
  return (
    <View style={styles.container}>
      {isAuthenticating ? (
        <LoadingOverlay message={"Logging you in..."} />
      ) : (
        <AuthContent
          title={"Let's Sign You In"}
          description={"Welcome back, you've been miessed!"}
          type={"login"}
          onAuthenticate={loginHandler}
        />
      )}
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 24,
  },
});
