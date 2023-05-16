import { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { SafeAreaView } from "react-native";
import { createUser, getUser } from "../../util/user";

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
        authCtx.authenticate(user.stsTokenManager.accessToken, user.uid);
        getUser(user.uid)
          .then((response) =>
            response === undefined
              ? createUser(user.uid, user.email, user.displayName)
              : console.log("User Exist!", response)
          )
          .catch((e) => Alert.alert("'Could't get user data!", e));
      })
      .catch((error) => {
        setIsAuthenticating(false);
        Alert.alert(
          `Authentication failed! ${error.code}`,
          "Could not log you in. Please check your credentials or try again later!"
        );
      });
    setIsAuthenticating(false);
    "CONTEXT LOGNI: ", authCtx;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
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
    </SafeAreaView>
  );
}

export default LoginScreen;

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
