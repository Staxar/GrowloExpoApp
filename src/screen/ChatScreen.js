import { StyleSheet, Text, View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import UserAvatar from "../components/ui/UserAvatar";
import { Colors, Typography } from "../constans/styles";
import Message from "../components/ui/Message";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { sendMessage } from "../util/messages";
import { getUser } from "../util/user";
export default function ChatScreen({ navigation, route }) {
  const [routeParams, setRouteParams] = useState({});
  const [message, setMessage] = useState("");
  const [recipient, setRecipiet] = useState({});

  async function getData(recipient) {
    await getUser(recipient)
      .then((response) => setRecipiet(response))
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    setRouteParams(route.params);
    if (route.params) getData(route.params.author);
  }, [navigation, route]);

  function sendMessageHandler() {
    sendMessage(routeParams, message);
    setMessage("");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <UserAvatar userName={recipient.username} />,
    });
  }, [recipient]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {recipient && (
          <Text style={[Typography.bigTitle, { color: "black" }]}>
            {recipient.username}
          </Text>
        )}
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
              onChangeText={setMessage}
              value={message}
            />
            <View style={{ flex: 1 }}>
              <OutlinedButton onPress={sendMessageHandler}>
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
