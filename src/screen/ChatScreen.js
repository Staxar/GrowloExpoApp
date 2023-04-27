import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import UserAvatar from "../components/ui/UserAvatar";
import { Colors, Typography } from "../constans/styles";
import Message from "../components/ui/Message";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
export default function ChatScreen({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <UserAvatar
            userImage={
              "https://www.dariuszkempny.pl/wp-content/uploads/2022/03/en-face.jpg"
            }
          />
          <View>
            <Text style={Typography.smallDescription}>Adriane Watson</Text>
            <Text style={Typography.smallDescription}>Online</Text>
          </View>
        </View>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Message right={true} left={false} message={"Some message"} />
        <Message
          right={false}
          left={true}
          message={
            "When the component gets mounted, it starts a GET request to our API to receive the user data for the corresponding userId that we'll get from the props."
          }
        />
        <Message right={false} left={true} message={"Some message"} />
        <Message right={true} left={false} message={"Some message"} />
        <Message
          right={true}
          left={false}
          message={
            "When the component gets mounted, it starts a GET request to our API to receive the user data for the corresponding userId that we'll get from the props."
          }
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            borderWidth: 0.7,
            borderRadius: 8,
            borderColor: Colors.primary800,
            justifyContent: "center",
            backgroundColor: "#ffff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                margin: 8,
                width: "70%",
              }}
              placeholder="Type somethnig!"
              multiline={true}
            />
            <View style={{ flex: 1 }}>
              <OutlinedButton>
                Send <Ionicons name="send" size={12} />
              </OutlinedButton>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
  },
});
