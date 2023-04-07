import { StyleSheet, View } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";

function SignupScreen() {
  return (
    <View style={styles.container}>
      <AuthContent
        title={"Getting Started"}
        description={"Create an account to continue"}
        type={"signup"}
      />
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
