import { View, StyleSheet } from "react-native";
import AuthContent from "../../../components/Auth/AuthContent";

function LoginScreen() {
  console.log("LoginScreen");
  return (
    <View style={styles.container}>
      <AuthContent
        title={"Let's Sign You In"}
        description={"Welcome back, you've been miessed!"}
        type={"login"}
      />
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
