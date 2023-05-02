import { StyleSheet, Text, View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import UserAvatar from "../components/ui/UserAvatar";
import { Colors, Typography } from "../constans/styles";
import Message from "../components/ui/Message";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { createMessage, getMessages } from "../util/messages";
import { getUser } from "../util/user";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
export default function ChatScreen({ navigation, route }) {
  const [routeParams, setRouteParams] = useState({});
  const [message, setMessage] = useState("");
  const [recipient, setRecipiet] = useState({});
  const [messageData, setMessageData] = useState();
  const [gettingData, setGetingData] = useState(false);

  async function getData(recipient) {
    await getUser(recipient)
      .then((response) => setRecipiet(response))
      .catch((e) => console.error(e));
  }

  // async function getMessagesData(params) {
  //   console.log("getMessagesData: ", route.params);
  //   await getMessages(params)
  //     .then((res) => setMessageData(res))
  //     .catch((err) => console.error(err));
  // }
  useEffect(() => {
    getMessages(route.params)
      .then((res) => setMessageData(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setGetingData(false);
    setRouteParams(route.params);
    if (route.params) getData(route.params.recipient);
    setGetingData(true);
  }, [navigation, route]);

  async function sendMessageHandler() {
    await createMessage(routeParams, message);
    setMessage("");
    getMessages(routeParams);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <UserAvatar
          userName={recipient.displayName}
          userImage={recipient.photoURL}
        />
      ),
    });
  }, [recipient]);

  let view = <ActivityIndicator size={"large"} />;

  if (gettingData && messageData) {
    view = (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {recipient && (
            <Text style={[Typography.bigTitle, { color: "black" }]}>
              {recipient.displayName}
            </Text>
          )}
          {messageData && (
            <FlatList
              data={messageData}
              renderItem={({ item }) => (
                <Message
                  message={item.content}
                  right={item.author === route.params.author ? true : false}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
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
  return view;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "10%",
  },
  innerContainer: {
    flex: 1,
  },
});
